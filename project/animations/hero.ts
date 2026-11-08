import {
	ANIMATION_DOCUMENT_VERSION,
	assertValidAnimationDocument,
	base,
	hex,
	marker,
	parallaxLayersMacro,
	withComputedRevision,
	withInteraction,
	type AnimationDocument,
	type SceneNode,
	type UnstampedAnimationDocument,
} from "@clayzo/animation/authoring";
import { lattice, TICKS_PER_SECOND } from "./lattice";

const WIDTH = 1600;
const HEIGHT = 900;
const DURATION = 1920; // 8s at 240 ticks/second
const INK = hex("#FFFFFF");

/**
 * Three depth planes of the same bar field, each a single row standing on the
 * bottom edge, so the frame reads as one layered skyline rather than a grid.
 * The upper half stays clear: the name sits there in extralight 9xl type, and
 * texture behind it would cost more legibility than the motion is worth.
 *
 * Depth comes from unit scale and fill opacity, never node opacity — a field
 * this size cannot afford a layer per unit per frame.
 */
const LAYERS = [
	{ id: "back", cols: 14, band: 0.52, seed: 0.0, opacity: 0.1, thickness: 0.34, minimum: 0.3 },
	{ id: "mid", cols: 24, band: 0.4, seed: 0.37, opacity: 0.16, thickness: 0.26, minimum: 0.26 },
	{ id: "front", cols: 40, band: 0.27, seed: 0.74, opacity: 0.26, thickness: 0.18, minimum: 0.2 },
];

export function buildHero(): AnimationDocument {
	const nodes: Record<string, SceneNode> = {};
	const groupIds: string[] = [];

	for (const layer of LAYERS) {
		const band = HEIGHT * layer.band;
		const cells = lattice({
			id: layer.id,
			cols: layer.cols,
			rows: 1,
			width: WIDTH,
			height: band,
			seed: layer.seed,
			durationTicks: DURATION,
			color: INK,
			thickness: layer.thickness,
			wavelengthCols: Math.max(5, Math.round(layer.cols / 2.5)),
			minimum: layer.minimum,
			fillOpacity: layer.opacity,
		});
		for (const cell of cells) nodes[cell.id] = cell;

		const groupId = `${layer.id}-plane`;
		nodes[groupId] = {
			// lattice stands its bars on y = band; drop the plane so they stand
			// on the bottom edge of the canvas instead.
			...base(groupId, { outTick: DURATION, x: 0, y: HEIGHT - band }),
			type: "group",
			children: cells.map((cell) => cell.id),
		} as SceneNode;
		groupIds.push(groupId);
	}

	const document = withComputedRevision({
		version: ANIMATION_DOCUMENT_VERSION,
		id: "hero",
		name: "Hero field",
		// backgroundColor is metadata and never paints; no full-canvas node is
		// drawn, so the player composites over the page.
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
				rootNodeIds: groupIds, // back to front
			},
		},
		markers: [marker("crest", DURATION / 4), marker("trough", (DURATION * 3) / 4)],
		design: { tokens: { looping: true } },
		capabilities: { required: [], optional: [], unsupportedPolicy: "warn" },
	} as UnstampedAnimationDocument);

	// The macro blends `add`, so the authored wave keeps running underneath and
	// the field reads correctly with the pointer away — which is what the poster,
	// the first paint, and every touch device show.
	const interactive = withInteraction(document, [
		parallaxLayersMacro({ nodeIds: groupIds, span: 420, reach: 48 }),
	]);

	assertValidAnimationDocument(interactive);
	return interactive;
}
