import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

/**
 * A digest of the source files that produce a document.
 *
 * This exists instead of comparing a freshly built document's `revision`
 * against the shipped bundle's. That comparison required a different machine
 * to reproduce the document's floating point bit for bit, which the generator
 * was never built to do — `Math.sin` is not specified by IEEE 754 and is free
 * to differ in its last bits between engines. The hero document, with 424
 * distinct sine arguments against the rule's 31, is the one that drew the
 * short straw on the deploy machine.
 *
 * The real question is "were the artifacts rebuilt after the sources changed",
 * and file bytes answer it exactly, on every machine.
 */
export function digestFiles(paths: readonly string[]): string {
	const hash = createHash("sha256");
	for (const path of [...paths].sort()) {
		// The name is hashed too, so moving bytes between files is still a change.
		hash.update(basename(path));
		hash.update("\0");
		hash.update(readFileSync(path));
		hash.update("\0");
	}
	return `sha256:${hash.digest("hex")}`;
}
