import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/app/globals.css", "utf8");
const layout = readFileSync("src/app/layout.tsx", "utf8");

describe("reveal CSS degrades safely", () => {
	// `scripting: enabled` says scripting is PERMITTED, not that this page's
	// JavaScript ran. If a chunk 404s behind a proxy or a blocker, scripting is
	// still "enabled" and every section stays at opacity 0 — permanently.
	// html[data-js] is set by a blocking inline script, so the hidden state only
	// exists once this document's JS has actually executed.
	it("scopes the hidden state to a document whose JS has run", () => {
		const hide = css.indexOf("[data-reveal]:not([data-revealed])");
		expect(hide).toBeGreaterThan(-1);
		const rule = css.slice(css.lastIndexOf("\n", hide), hide + 40);
		expect(rule).toMatch(/html\[data-js\]/);
	});

	it("sets data-js from a blocking inline script, before first paint", () => {
		expect(layout).toMatch(/data-js/);
		expect(layout).toMatch(/dangerouslySetInnerHTML/);
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

describe("reduced motion", () => {
	// Tailwind's animate-pulse and animate-bounce keep running under the OS
	// preference; nothing disables them for free. The page still carries five.
	it("stops every animation for readers who asked for less motion", () => {
		const block = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
		expect(block).toMatch(/animation[^;]*:\s*none/);
		expect(block).toMatch(/transition[^;]*:\s*none/);
	});
});

describe("fonts", () => {
	// layout.tsx sets --font-geist-sans/mono on <body>, but deleting
	// tailwind.config.ts took the fontFamily mapping with it, so `font-sans`
	// resolves to Tailwind's default stack and two Geist families are fetched
	// on every load without rendering a single glyph.
	it("maps the Tailwind font stacks onto the loaded Geist faces", () => {
		expect(css).toMatch(/--font-sans:\s*var\(--font-geist-sans\)/);
		expect(css).toMatch(/--font-mono:\s*var\(--font-geist-mono\)/);
	});
});
