import {
	ANIMATION_DOCUMENT_VERSION,
	assertValidAnimationDocument,
	base,
	constant,
	fill,
	hex,
	marker,
	withComputedRevision,
	withInteraction,
	type AnimationDocument,
	type UnstampedAnimationDocument,
	type SceneNode,
} from "@clayzo/animation/authoring";
import { FRAME_TICKS, lattice, TICKS_PER_SECOND } from "./lattice";

const WIDTH = 480;
const HEIGHT = 24;
const DURATION = 960; // 4s at 240 ticks/second
const INK = hex("#FFFFFF"); // inverted to black on the light page by mix-blend-mode: difference

/** Columns are drawn past the right edge so the variant slide never exposes a gap. */
const COLS = 48;
const BASELINE_HEIGHT = 1.5;
const VARIANT_TRAVEL = -55; // not a multiple of the column pitch, so variants land differently

export function buildRule(): AnimationDocument {
	const bars = lattice({
		id: "bar",
		cols: COLS,
		rows: 1,
		width: (WIDTH / 40) * COLS,
		height: HEIGHT - BASELINE_HEIGHT,
		seed: 0,
		durationTicks: DURATION,
		color: INK,
		thickness: 0.26,
		wavelengthCols: 8,
		minimum: 0.12,
	});

	const nodes: Record<string, SceneNode> = {
		baseline: {
			...base("baseline", { outTick: DURATION, x: WIDTH / 2, y: HEIGHT - BASELINE_HEIGHT / 2 }),
			type: "rect",
			size: constant({ width: WIDTH, height: BASELINE_HEIGHT }),
			cornerRadius: constant(0),
			style: { fill: fill(INK) },
		} as SceneNode,
		field: {
			...base("field", { outTick: DURATION, x: 0, y: 0 }),
			type: "group",
			children: bars.map((node) => node.id),
		} as SceneNode,
	};
	for (const node of bars) nodes[node.id] = node;

	const document = withComputedRevision({
		version: ANIMATION_DOCUMENT_VERSION,
		id: "rule",
		name: "Section rule",
		// backgroundColor is required metadata; it is never painted, and nothing
		// here draws a full-canvas field, so the player composites over the page.
		canvas: { width: WIDTH, height: HEIGHT, pixelAspectRatio: 1, backgroundColor: hex("#000000") },
		timing: {
			ticksPerSecond: TICKS_PER_SECOND,
			frameRate: { numerator: 60, denominator: 1 },
			durationTicks: DURATION,
			displayStartTick: 0,
		},
		assets: {},
		rootCompositionId: "main",
		components: {},
		compositions: {
			main: {
				id: "main",
				name: "Main",
				width: WIDTH,
				height: HEIGHT,
				durationTicks: DURATION,
				nodes,
				// Baseline first: it is the part that has to read when nothing moves.
				rootNodeIds: ["baseline", "field"],
			},
		},
		markers: [marker("crest", DURATION / 4), marker("trough", (DURATION * 3) / 4)],
		design: { tokens: { looping: true } },
		capabilities: { required: [], optional: [], unsupportedPolicy: "warn" },
	} as UnstampedAnimationDocument);

	const interactive = withInteraction(document, [
		{
			input: {
				id: "variant",
				name: "variant",
				kind: "number",
				defaultValue: 0,
				minimum: 0,
				maximum: 5,
				label: "Variant",
				description: "Which slice of the wave this section shows.",
			},
		},
		{
			id: "variant-slide",
			name: "Variant slide",
			target: { kind: "node-property", nodeId: "field", property: "position", axis: "x" },
			// `add`, never `set`: the authored pose has to survive, because the
			// poster, the first paint and every reduced-motion still show it.
			blend: "add",
			steps: [
				{ id: "v", op: "input", input: "variant" },
				{
					id: "slide",
					op: "map-range",
					inputMinimum: 0,
					inputMaximum: 5,
					outputMinimum: 0,
					outputMaximum: VARIANT_TRAVEL,
					clamp: true,
				},
			],
		},
	] as Parameters<typeof withInteraction>[1]);

	assertValidAnimationDocument(interactive);
	return interactive;
}

export const RULE_DURATION_TICKS = DURATION;
export const RULE_FRAME_TICKS = FRAME_TICKS;
