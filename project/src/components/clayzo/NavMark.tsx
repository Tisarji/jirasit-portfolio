"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ClayzoPlayer } from "@clayzo/webgl-player/react";
import type { PlayerHandle } from "@clayzo/webgl-player";
import type { LoadedClayzo } from "@clayzo/animation/bundle";
import { loadBundle } from "./loadBundle";

/**
 * The mark under the JK logo. The letterforms stay DOM text — crisp, selectable
 * and with no font to ship into the document — and this is the bar system
 * answering alongside them.
 *
 * The state is driven from the anchor rather than from the document's own hit
 * area, so hovering the letters counts, not only the few pixels of bars.
 */
export default function NavMark({ hovered }: { hovered: boolean }) {
	const [bundle, setBundle] = useState<LoadedClayzo | null>(null);
	const player = useRef<PlayerHandle | null>(null);

	useEffect(() => {
		let cancelled = false;
		loadBundle("/anim/mark.clayzo")
			.then((loaded) => {
				if (!cancelled) setBundle(loaded);
			})
			.catch(() => {
				// The fallback rule stays; never throw into the page.
			});
		return () => {
			cancelled = true;
		};
	}, []);

	const onReady = useCallback((handle: PlayerHandle) => {
		player.current = handle;
	}, []);

	useEffect(() => {
		player.current?.setState(hovered ? "hover" : "idle");
	}, [hovered]);

	return (
		<span className="block w-12 mix-blend-difference" aria-hidden>
			<ClayzoPlayer
				document={bundle?.document ?? null}
				options={{ loaders: bundle ?? undefined }}
				onReady={onReady}
				poster="/anim/mark.poster.webp"
				posterTick={0}
				decorative
				fallback={<span className="block h-0.5 w-full bg-white" />}
			/>
		</span>
	);
}
