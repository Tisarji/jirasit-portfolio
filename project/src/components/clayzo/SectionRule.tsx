"use client";

import { useCallback, useEffect, useState } from "react";
import { ClayzoPlayer } from "@clayzo/webgl-player/react";
import type { PlayerHandle } from "@clayzo/webgl-player";
import { readClayzoBundle, type LoadedClayzo } from "@clayzo/animation/bundle";

/**
 * The rule under a section heading. One document, six variants: each section
 * passes a different number and gets a different slice of the same wave, so
 * the set reads as one system rather than six unrelated pieces.
 *
 * The document draws white on transparent and the wrapper composites it with
 * `difference`, which lands as pure black on the light page and pure white on
 * the dark one — one document, both themes, no third colour.
 */
export default function SectionRule({
	variant = 0,
	className = "mx-auto",
}: {
	variant?: number;
	className?: string;
}) {
	const [bundle, setBundle] = useState<LoadedClayzo | null>(null);

	useEffect(() => {
		let cancelled = false;
		fetch("/anim/rule.clayzo")
			.then((response) => response.arrayBuffer())
			.then((bytes) => readClayzoBundle(new Uint8Array(bytes)))
			.then((loaded) => {
				if (!cancelled) setBundle(loaded);
			})
			.catch(() => {
				// The fallback rule is already on screen; leaving it there is the
				// right outcome, and never throwing into the page is the contract.
			});
		return () => {
			cancelled = true;
		};
	}, []);

	const onReady = useCallback(
		(player: PlayerHandle) => {
			player.setInput("variant", variant);
		},
		[variant],
	);

	return (
		<div className={`w-full max-w-xs mix-blend-difference ${className}`}>
			<ClayzoPlayer
				document={bundle?.document ?? null}
				options={{ loaders: bundle ?? undefined }}
				onReady={onReady}
				poster="/anim/rule.poster.webp"
				posterTick={240}
				decorative
				fallback={
					<div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white to-transparent" />
				}
			/>
		</div>
	);
}
