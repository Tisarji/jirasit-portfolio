import { describe, expect, it } from "vitest";
import { formatTenure, formatTenureRange, ROLES } from "./career";

/** The spec forbids publishing version numbers, issue keys, stack names, commit counts and spend. */
const FORBIDDEN: [string, RegExp][] = [
	["issue key", /\b[A-Z]{2,6}-\d{1,6}\b/],
	["version", /\bv?\d+\.\d+\.\d+\b/],
	["stack or env name", /\b[a-z0-9]+-(?:dev|prod|staging|uat|qa)\b/i],
	["commit count", /\b\d+\s+commits?\b/i],
	["spend", /(?:[$€£]\s?\d|\b\d+(?:\.\d+)?\s?(?:USD|THB|EUR)\b)/i],
];

function leaks(text: string): string[] {
	return FORBIDDEN.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
}

const NOW = new Date(2026, 10, 8); // 2026-11-08

describe("formatTenure", () => {
	it("counts a closed range from its own end, not from today", () => {
		expect(formatTenure({ startYear: 2025, startMonth: 6, endYear: 2026, endMonth: 8 }, NOW))
			.toBe("1 year 2 months");
	});
	it("counts an open range up to today", () => {
		expect(formatTenure({ startYear: 2026, startMonth: 10 }, NOW)).toBe("1 month");
	});
	it("says 'Less than a month' in the starting month", () => {
		expect(formatTenure({ startYear: 2026, startMonth: 11 }, NOW)).toBe("Less than a month");
	});
	it("never renders a negative span", () => {
		expect(formatTenure({ startYear: 2027, startMonth: 3 }, NOW)).toBe("Not started");
	});
	it("drops the month when the span is whole years", () => {
		expect(formatTenure({ startYear: 2024, startMonth: 11 }, NOW)).toBe("2 years");
	});
});

describe("formatTenureRange", () => {
	it("renders a closed range", () => {
		expect(formatTenureRange({ startYear: 2025, startMonth: 6, endYear: 2026, endMonth: 8 }))
			.toBe("Jun 2025 – Aug 2026");
	});
	it("renders an open range as Present", () => {
		expect(formatTenureRange({ startYear: 2026, startMonth: 10 })).toBe("Oct 2026 – Present");
	});
});

describe("ROLES", () => {
	it("leads with the current role", () => {
		expect(ROLES[0].company).toBe("Vbreathe");
		expect(ROLES[0].current).toBe(true);
	});
	it("records Sati as finished", () => {
		const sati = ROLES.find((r) => r.company.startsWith("Sati"))!;
		expect(sati.current).toBe(false);
		expect(sati.tenure.endMonth).toBe(8);
		expect(sati.tenure.endYear).toBe(2026);
	});
	// The previous form asserted that six invented literals were absent. None was
	// ever present and no plausible edit introduces any of them verbatim, so it
	// could not fail. These match the SHAPE of the things the spec forbids, and
	// the detector is exercised against a leaky sample below so it can fail.
	it("publishes nothing shaped like an internal identifier", () => {
		expect(leaks(JSON.stringify(ROLES))).toEqual([]);
	});
});

describe("the confidentiality detector itself", () => {
	it("catches each forbidden shape, so the guard above can fail", () => {
		expect(leaks('worked on AW-120')).toEqual(["issue key"]);
		expect(leaks('shipped v0.17.1')).toEqual(["version"]);
		expect(leaks('deployed to cardlight-dev')).toEqual(["stack or env name"]);
		expect(leaks('36 commits')).toEqual(["commit count"]);
		expect(leaks('$420 of Bedrock')).toEqual(["spend"]);
	});
});
