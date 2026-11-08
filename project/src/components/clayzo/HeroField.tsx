"use client";

import { useEffect, useState } from "react";
import { ClayzoPlayer } from "@clayzo/webgl-player/react";
import { readClayzoBundle, type LoadedClayzo } from "@clayzo/animation/bundle";

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
		fetch("/anim/hero.clayzo")
			.then((response) => response.arrayBuffer())
			.then((bytes) => readClayzoBundle(new Uint8Array(bytes)))
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
		<div className="absolute inset-x-0 bottom-0 -z-10 mix-blend-difference pointer-events-none">
			<ClayzoPlayer
				document={bundle?.document ?? null}
				options={{ loaders: bundle ?? undefined }}
				poster="/anim/hero.poster.webp"
				posterTick={480}
				label="A field of bars rising and falling in a slow wave"
				fallback={null}
			/>
		</div>
	);
}
