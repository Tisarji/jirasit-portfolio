import {
	ANIMATION_DOCUMENT_VERSION,
	assertValidAnimationDocument,
	base,
	constant,
	fill,
	hex,
	keyed,
	marker,
	stateMachine,
	withComputedRevision,
	withStateMachine,
	type AnimationDocument,
	type SceneNode,
	type UnstampedAnimationDocument,
} from "@clayzo/animation/authoring";
import { TICKS_PER_SECOND } from "./lattice";

const WIDTH = 120;
const HEIGHT = 32;
const BARS = 14;
const PITCH = WIDTH / BARS;
const BAR_WIDTH = PITCH * 0.3;
const INK = hex("#FFFFFF");

/** Timeline: a held rest segment, then the hover pulse. */
const REST_END = 120;
const PULSE_END = 600;
const DURATION = PULSE_END;

/** The resting silhouette — a shallow arc, so the mark reads as a mark at rest. */
function restingScale(index: number): number {
	const t = index / (BARS - 1);
	return 0.3 + 0.45 * Math.sin(Math.PI * t);
}

/**
 * The nav mark. It sits in a fixed header, so it is on screen for the entire
 * visit: `idle` holds a still frame rather than looping, and only `hover`
 * moves. A permanently-animating canvas in the nav is the one placement that
 * would cost real battery and Lighthouse for pure ornament.
 */
export function buildMark(): AnimationDocument {
	const nodes: Record<string, SceneNode> = {};
	const barIds: string[] = [];

	for (let index = 0; index < BARS; index += 1) {
		const rest = restingScale(index);
		// The pulse travels left to right, then every bar returns to its rest
		// value by PULSE_END so leaving hover never jumps.
		const lead = Math.round((index / BARS) * 160 * 0.25) * 4;
		const peakTick = REST_END + 40 + lead;
		const settleTick = Math.min(peakTick + 240, PULSE_END);
		const id = `bar-${index}`;
		barIds.push(id);

		nodes[id] = {
			...base(id, {
				outTick: DURATION,
				x: PITCH * (index + 0.5),
				y: HEIGHT,
				anchor: { x: 0, y: HEIGHT / 2 },
				scale: keyed(`${id}.scale`, [
					[0, { x: 1, y: rest, z: 1 }],
					[REST_END, { x: 1, y: rest, z: 1 }],
					[peakTick, { x: 1, y: 1, z: 1 }],
					[settleTick, { x: 1, y: rest, z: 1 }],
					[PULSE_END, { x: 1, y: rest, z: 1 }],
				]),
			}),
			type: "rect",
			size: constant({ width: BAR_WIDTH, height: HEIGHT }),
			cornerRadius: constant(0),
			style: { fill: fill(INK) },
		} as SceneNode;
	}

	nodes.field = {
		...base("field", { outTick: DURATION, x: 0, y: 0 }),
		type: "group",
		children: barIds,
	} as SceneNode;

	const document = withComputedRevision({
		version: ANIMATION_DOCUMENT_VERSION,
		id: "mark",
		name: "Nav mark",
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
				rootNodeIds: ["field"],
			},
		},
		markers: [marker("idle", 0), marker("hover", REST_END), marker("end", PULSE_END)],
		design: { tokens: { looping: false } },
		capabilities: { required: [], optional: [], unsupportedPolicy: "warn" },
	} as UnstampedAnimationDocument);

	const machined = withStateMachine(
		document,
		stateMachine({ initial: "idle" })
			.state("idle", { marker: "idle", exitMarker: "hover", playback: "once" })
			.state("hover", { marker: "hover", exitMarker: "end", playback: "once" })
			.on("pointerenter", "idle", "hover", { hitArea: "mark" })
			.on("pointerleave", "hover", "idle", { hitArea: "mark" }),
		{ hitAreas: { mark: { nodeId: "field" } } },
	);

	assertValidAnimationDocument(machined);
	return machined;
}
