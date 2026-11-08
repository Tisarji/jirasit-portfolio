import { describe, expect, it } from "vitest";
import { formatTenure, formatTenureRange, ROLES } from "./career";

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
	it("publishes no internal identifiers", () => {
		const text = JSON.stringify(ROLES);
		for (const leak of ["AW-120", "CRA", "v0.1", "cardlight-dev", "staging", "Bedrock spend"]) {
			expect(text).not.toContain(leak);
		}
	});
});
