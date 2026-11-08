import { base, constant, fill, keyed, type Color, type SceneNode } from "@clayzo/animation/authoring";

/** 240 ticks per second, authored at 60fps: every tick must be a multiple of 4. */
export const TICKS_PER_SECOND = 240;
export const FRAME_TICKS = 4;

/** Samples per cell across the loop. 16 reads as continuous without bloating the document. */
const SAMPLES = 16;

export type LatticeOptions = {
	id: string;
	cols: number;
	rows: number;
	width: number;
	height: number;
	/** Shifts the wave's starting phase, so two lattices from one helper differ. */
	seed: number;
	durationTicks: number;
	color: Color;
	/** Bar width as a fraction of the column pitch. */
	thickness?: number;
	/** How far the crest travels per column, in turns. */
	wavelengthCols?: number;
	/** Floor of the scale range — never 0, so the field keeps a readable base. */
	minimum?: number;
};

/**
 * A field of bars whose heights run as a travelling wave. Heights are animated
 * through `scale`, never node `opacity`: an opacity track allocates an
 * offscreen layer per node per frame, which a field of this size cannot afford.
 */
export function lattice(options: LatticeOptions): SceneNode[] {
	const {
		id,
		cols,
		rows,
		width,
		height,
		seed,
		durationTicks,
		color,
		thickness = 0.25,
		wavelengthCols = 8,
		minimum = 0.18,
	} = options;

	const pitchX = width / cols;
	const pitchY = rows > 1 ? height / rows : height;
	const barWidth = Math.max(1, pitchX * thickness);
	const step = Math.round(durationTicks / SAMPLES / FRAME_TICKS) * FRAME_TICKS;
	const nodes: SceneNode[] = [];

	for (let row = 0; row < rows; row += 1) {
		for (let col = 0; col < cols; col += 1) {
			const cellHeight = rows > 1 ? pitchY * 0.72 : height;
			// Phase advances along the row, and down the rows, so the crest
			// travels diagonally when there is more than one row.
			const phase = (col / wavelengthCols + row / Math.max(1, rows) + seed) % 1;
			const keys: [number, { x: number; y: number; z: number }][] = [];

			for (let sample = 0; sample <= SAMPLES; sample += 1) {
				const tick = Math.min(sample * step, durationTicks);
				const turn = sample / SAMPLES;
				const wave = 0.5 + 0.5 * Math.sin(2 * Math.PI * (turn - phase));
				keys.push([tick, { x: 1, y: minimum + (1 - minimum) * wave, z: 1 }]);
			}

			const cellId = `${id}-${row}-${col}`;
			nodes.push({
				...base(cellId, {
					outTick: durationTicks,
					x: pitchX * (col + 0.5),
					// Bars stand on the bottom edge of their row.
					y: rows > 1 ? pitchY * (row + 1) : height,
					anchor: { x: 0, y: cellHeight / 2 },
					scale: keyed(`${cellId}.scale`, keys),
				}),
				type: "rect",
				size: constant({ width: barWidth, height: cellHeight }),
				cornerRadius: constant(0),
				style: { fill: fill(color) },
			} as SceneNode);
		}
	}

	return nodes;
}
