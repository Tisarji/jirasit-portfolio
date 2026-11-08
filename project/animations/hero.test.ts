import { assertValidAnimationDocument } from "@clayzo/animation/authoring";
import { describe, expect, it } from "vitest";
import { buildHero } from "./hero";

type AnyDoc = { interaction?: { bindings?: { blend: string }[] } };

describe("hero document", () => {
	it("validates", () => {
		expect(() => assertValidAnimationDocument(buildHero())).not.toThrow();
	});

	// The brief looked for `"operation": "multiply"`, which is not a field any
	// binding has — the assertion could never fail. The real property is `blend`,
	// and the rule from the shipping guidance is that pointer response must `add`
	// to an authored pose. A `set` or `multiply` binding means the rest pose
	// depends on the cursor, and the rest pose is what the poster, the first
	// paint and every touch device show for the whole visit.
	it("composes pointer response onto a pose that stands without a pointer", () => {
		const bindings = (buildHero() as unknown as AnyDoc).interaction?.bindings ?? [];
		expect(bindings.length).toBeGreaterThan(0);
		expect(bindings.map((binding) => binding.blend)).toEqual(bindings.map(() => "add"));
	});

	it("snaps every keyframe to the 60fps grid", () => {
		const ticks: number[] = [];
		JSON.stringify(buildHero(), (key, value) => {
			if (key === "tick" && typeof value === "number") ticks.push(value);
			return value;
		});
		expect(ticks.length).toBeGreaterThan(0);
		expect(ticks.filter((tick) => tick % 4 !== 0)).toEqual([]);
	});
});
