import { mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { checkCoverage } from "@clayzo/webgl-player";
import type { AnimationDocument } from "@clayzo/animation/authoring";
import { buildRule } from "./rule";

const OUT_DIR = "public/anim";
const checkOnly = process.argv.includes("--check");

/** Every document shipped on the site. The coverage gate runs over all of them. */
const DOCUMENTS: { name: string; build: () => AnimationDocument; posterTick: number }[] = [
	{ name: "rule", build: buildRule, posterTick: 240 },
];

async function main(): Promise<void> {
	mkdirSync(OUT_DIR, { recursive: true });
	let failed = false;

	for (const { name, build, posterTick } of DOCUMENTS) {
		const document = build();
		const path = `${OUT_DIR}/${name}.json`;
		writeFileSync(path, `${JSON.stringify(document, null, "\t")}\n`);

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

		if (!checkOnly) {
			execFileSync(
				"npx",
				["clayzo", "package", path, `${OUT_DIR}/${name}.clayzo`, "--poster", String(posterTick)],
				{ stdio: "inherit" },
			);
		}
	}

	if (failed) process.exit(1);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
