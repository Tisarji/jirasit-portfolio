"use client";

import { useEffect, useState } from "react";
import { ClayzoPlayer } from "@clayzo/webgl-player/react";
import type { LoadedClayzo } from "@clayzo/animation/bundle";
import { loadBundle } from "./loadBundle";

/**
 * The hero field: three depth planes of the bar system, parallaxing under the
 * pointer. The parallax `add`s to an authored wave, so the field reads the same
 * with the pointer away — which is what the poster, the first paint and every
 * touch device show for the whole visit.
 */
export default function HeroField() {
	const [bundle, setBundle] = useState<LoadedClayzo | null>(null);

	useEffect(() => {
		let cancelled = false;
		loadBundle("/anim/hero.clayzo")
			.then((loaded) => {
				if (!cancelled) setBundle(loaded);
			})
			.catch(() => {
				// Never throw into the page; the section reads without this.
			});
		return () => {
			cancelled = true;
		};
	}, []);

	return (
		/* -z-10 already keeps this behind the content column, so it needs no
		   pointer-events guard — and pointer-events: none would inherit to the
		   canvas and silently kill the parallax the piece exists for. */
		<div className="absolute inset-x-0 bottom-0 -z-10 mix-blend-difference" style={{ aspectRatio: "1600 / 900" }}>
			<ClayzoPlayer
				document={bundle?.document ?? null}
				options={{ loaders: bundle ?? undefined }}
				poster="/anim/hero.poster.webp"
				posterTick={480}
				decorative
				fallback={null}
			/>
		</div>
	);
}
