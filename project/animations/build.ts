import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { checkCoverage } from "@clayzo/webgl-player";
import type { AnimationDocument } from "@clayzo/animation/authoring";
import { buildHero } from "./hero";
import { buildMark } from "./mark";
import { buildRule } from "./rule";
import { digestFiles } from "./sourceDigest";

const OUT_DIR = "public/anim";
const MANIFEST = `${OUT_DIR}/manifest.json`;
const checkOnly = process.argv.includes("--check");

const SHARED = ["animations/lattice.ts", "animations/sourceDigest.ts"];

type Entry = {
	name: string;
	build: () => AnimationDocument;
	posterTick: number;
	sources: string[];
};

/** Every document shipped on the site. The coverage gate runs over all of them. */
const DOCUMENTS: Entry[] = [
	{ name: "rule", build: buildRule, posterTick: 240, sources: [...SHARED, "animations/rule.ts"] },
	{ name: "hero", build: buildHero, posterTick: 480, sources: [...SHARED, "animations/hero.ts"] },
	{ name: "mark", build: buildMark, posterTick: 0, sources: [...SHARED, "animations/mark.ts"] },
];

function readManifest(): Record<string, string> {
	if (!existsSync(MANIFEST)) return {};
	return JSON.parse(readFileSync(MANIFEST, "utf8")).sources ?? {};
}

async function main(): Promise<void> {
	mkdirSync(OUT_DIR, { recursive: true });
	const manifest = checkOnly ? readManifest() : {};
	const digests: Record<string, string> = {};
	let failed = false;

	for (const { name, build, posterTick, sources } of DOCUMENTS) {
		const document = build();
		const path = `${OUT_DIR}/${name}.json`;
		digests[name] = digestFiles(sources);

		// The renderer is WebGL and only WebGL. A document the player cannot draw
		// must fail the build, not ship and quietly render nothing. This needs the
		// document but not a reproducible one, so it runs in both modes.
		const coverage = await checkCoverage(document);
		if (!coverage.supported) {
			failed = true;
			console.error(`[coverage] ${name}: UNSUPPORTED by the WebGL player`);
			for (const reason of coverage.reasons) console.error(`   - ${reason}`);
		} else {
			console.log(`[coverage] ${name}: ok`);
		}

		if (checkOnly) {
			// Compare source bytes, never a rebuilt document's revision: packaging
			// needs a signed-in CLI that CI does not have, and the floating point
			// in a generated document is not reproducible across engines.
			const recorded = manifest[name];
			if (!recorded) {
				failed = true;
				console.error(`[stale] ${name}: no entry in ${MANIFEST}. Run: npm run anim:build`);
			} else if (recorded !== digests[name]) {
				failed = true;
				console.error(
					`[stale] ${name}: sources changed since ${name}.clayzo was built. Run: npm run anim:build`,
				);
			} else if (!existsSync(`${OUT_DIR}/${name}.clayzo`)) {
				failed = true;
				console.error(`[stale] ${name}.clayzo is missing. Run: npm run anim:build`);
			} else {
				console.log(`[stale] ${name}: artifact matches its sources`);
			}
			continue;
		}

		writeFileSync(path, `${JSON.stringify(document, null, "\t")}\n`);
		execFileSync(
			"npx",
			["clayzo", "package", path, `${OUT_DIR}/${name}.clayzo`, "--poster", String(posterTick)],
			{ stdio: "inherit" },
		);
	}

	if (!checkOnly) {
		writeFileSync(MANIFEST, `${JSON.stringify({ sources: digests }, null, "\t")}\n`);
		console.log(`[manifest] wrote ${MANIFEST}`);
	}

	if (failed) process.exit(1);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
