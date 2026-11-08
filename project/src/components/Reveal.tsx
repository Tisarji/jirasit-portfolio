"use client";

import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";

const STAGGER_MS = 60;
const STAGGER_CEILING_MS = 360;

/** Grid children trail each other — but a long grid must not trail forever. */
export function staggerDelay(index: number): number {
	return Math.min(index * STAGGER_MS, STAGGER_CEILING_MS);
}

type RevealProps = ComponentPropsWithoutRef<"div"> & {
	index?: number;
	distance?: string;
};

/**
 * A block that animates in when it reaches the viewport. The animation is the
 * exception, not the base: see the [data-reveal] rules in globals.css.
 */
export default function Reveal({ index = 0, distance, style, children, ...rest }: RevealProps) {
	const ref = useReveal<HTMLDivElement>();
	const vars = {
		"--reveal-delay": `${staggerDelay(index)}ms`,
		...(distance ? { "--reveal-distance": distance } : {}),
	} as CSSProperties;

	return (
		<div ref={ref} data-reveal="" style={{ ...vars, ...style }} {...rest}>
			{children}
		</div>
	);
}
