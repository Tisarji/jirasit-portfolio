import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { digestFiles } from "./sourceDigest";

function fixture(contents: Record<string, string>): string[] {
	const dir = mkdtempSync(join(tmpdir(), "digest-"));
	return Object.entries(contents).map(([name, body]) => {
		const path = join(dir, name);
		writeFileSync(path, body);
		return path;
	});
}

describe("source digest", () => {
	it("is stable for unchanged bytes", () => {
		const files = fixture({ "a.ts": "alpha", "b.ts": "beta" });
		expect(digestFiles(files)).toBe(digestFiles(files));
	});

	it("changes when any source changes", () => {
		const files = fixture({ "a.ts": "alpha", "b.ts": "beta" });
		const before = digestFiles(files);
		writeFileSync(files[1], "beta!");
		expect(digestFiles(files)).not.toBe(before);
	});

	it("depends on file identity, not just on concatenated content", () => {
		const split = fixture({ "a.ts": "ab", "b.ts": "c" });
		const joined = fixture({ "a.ts": "a", "b.ts": "bc" });
		expect(digestFiles(split)).not.toBe(digestFiles(joined));
	});
});
