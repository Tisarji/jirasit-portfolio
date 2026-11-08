import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { checkCoverage } from "@clayzo/webgl-player";
import { readClayzoBundle } from "@clayzo/animation/bundle";
import type { AnimationDocument } from "@clayzo/animation/authoring";
import { buildHero } from "./hero";
import { buildMark } from "./mark";
import { buildRule } from "./rule";

const OUT_DIR = "public/anim";
const checkOnly = process.argv.includes("--check");

/** Every document shipped on the site. The coverage gate runs over all of them. */
const DOCUMENTS: { name: string; build: () => AnimationDocument; posterTick: number }[] = [
	{ name: "rule", build: buildRule, posterTick: 240 },
	{ name: "hero", build: buildHero, posterTick: 480 },
	{ name: "mark", build: buildMark, posterTick: 0 },
];

async function main(): Promise<void> {
	mkdirSync(OUT_DIR, { recursive: true });
	let failed = false;

	for (const { name, build, posterTick } of DOCUMENTS) {
		const document = build();
		const path = `${OUT_DIR}/${name}.json`;

		// The renderer is WebGL and only WebGL. A document the player cannot draw
		// must fail the build, not ship and quietly render nothing.
		const coverage = await checkCoverage(document);
		if (!coverage.supported) {
			failed = true;
			console.error(`[coverage] ${name}: UNSUPPORTED by the WebGL player`);
			for (const reason of coverage.reasons) console.error(`   - ${reason}`);
		} else {
			console.log(`[coverage] ${name}: ok`);
		}

		if (checkOnly) {
			// Coverage on a freshly built document says nothing about the artifact
			// the browser actually fetches. Edit an animation, run the build, and
			// without this the gate passes while readers keep getting the old one.
			try {
				const shipped = await readClayzoBundle(
					new Uint8Array(readFileSync(`${OUT_DIR}/${name}.clayzo`)),
				);
				if (shipped.document.revision !== document.revision) {
					failed = true;
					console.error(
						`[stale] ${name}.clayzo is revision ${shipped.document.revision}, ` +
							`sources build ${document.revision}. Run: npm run anim:build`,
					);
				} else {
					console.log(`[stale] ${name}: shipped bundle matches source`);
				}
			} catch (error) {
				failed = true;
				console.error(`[stale] ${name}.clayzo is missing or unreadable:`, String(error));
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

	if (failed) process.exit(1);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
