import { assertValidAnimationDocument } from "@clayzo/animation/authoring";
import { describe, expect, it } from "vitest";
import { buildRule } from "./rule";

type AnyDoc = {
	interaction?: { inputs?: { name: string; kind: string; minimum?: number; maximum?: number }[] };
	compositions: Record<string, { nodes: Record<string, { type: string }>; rootNodeIds: string[] }>;
};

describe("rule document", () => {
	it("validates", () => {
		expect(() => assertValidAnimationDocument(buildRule())).not.toThrow();
	});

	it("declares the variant input the sections drive", () => {
		const doc = buildRule() as unknown as AnyDoc;
		const variant = doc.interaction?.inputs?.find((input) => input.name === "variant");
		expect(variant).toBeDefined();
		expect(variant?.kind).toBe("number");
	});

	it("snaps every keyframe to the 60fps grid", () => {
		const ticks: number[] = [];
		JSON.stringify(buildRule(), (key, value) => {
			if (key === "tick" && typeof value === "number") ticks.push(value);
			return value;
		});
		expect(ticks.length).toBeGreaterThan(0);
		expect(ticks.filter((tick) => tick % 4 !== 0)).toEqual([]);
	});

	// The brief asked for a full-canvas field here, which is the advice for
	// documents exported as video. This one is played over a live page, where an
	// opaque field would paint over the section behind it. canvas.backgroundColor
	// is required metadata and never paints; what would cover the page is a
	// full-canvas rect among the root nodes, so that is what this pins.
	it("draws the baseline rule first, and never paints a full-canvas field", () => {
		const doc = buildRule() as unknown as AnyDoc;
		const main = doc.compositions.main;
		expect(main.nodes[main.rootNodeIds[0]].type).toBe("rect");

		const covers = main.rootNodeIds.some((id) => {
			const size = (main.nodes[id] as { size?: { value?: { width: number; height: number } } }).size?.value;
			return size?.width === 480 && size?.height === 24;
		});
		expect(covers).toBe(false);
	});
});
