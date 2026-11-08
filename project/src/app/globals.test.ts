import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/app/globals.css", "utf8");

describe("reveal CSS degrades safely", () => {
	// The reveal system hides content until JavaScript marks it revealed. With
	// JavaScript off nothing ever marks it, so the hiding rule must not apply at
	// all — otherwise every section on the page renders at opacity 0 and the
	// reader sees a blank document.
	it("never hides content outside a scripting:enabled guard", () => {
		const hide = css.indexOf("[data-reveal]:not([data-revealed])");
		expect(hide).toBeGreaterThan(-1);

		const enclosing = css.slice(0, hide).lastIndexOf("@media");
		expect(enclosing).toBeGreaterThan(-1);
		expect(css.slice(enclosing, hide)).toMatch(/scripting:\s*enabled/);
	});

	it("still exempts readers who asked for reduced motion", () => {
		const hide = css.indexOf("[data-reveal]:not([data-revealed])");
		const enclosing = css.slice(0, hide).lastIndexOf("@media");
		expect(css.slice(enclosing, hide)).toMatch(/prefers-reduced-motion:\s*no-preference/);
	});

	it("rests at full opacity so the base state is the readable one", () => {
		expect(css).toMatch(/\[data-reveal\]\s*\{[^}]*opacity:\s*1/);
	});
});
