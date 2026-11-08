"use client";

import { useEffect, useRef } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Publishes the pointer's position over the element as `--px` / `--py` (0–1), so
 * children can respond in CSS without a JavaScript frame loop. The properties are
 * removed on leave, which is also the state every touch and keyboard reader sees.
 */
export function usePointerField<T extends HTMLElement>(): React.RefObject<T | null> {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		if (typeof matchMedia === "function" && matchMedia(REDUCED_MOTION).matches) return;

		const onMove = (event: PointerEvent) => {
			const rect = element.getBoundingClientRect();
			if (rect.width === 0 || rect.height === 0) return;
			element.style.setProperty("--px", clamp01((event.clientX - rect.left) / rect.width).toFixed(4));
			element.style.setProperty("--py", clamp01((event.clientY - rect.top) / rect.height).toFixed(4));
		};
		const onLeave = () => {
			element.style.removeProperty("--px");
			element.style.removeProperty("--py");
		};

		element.addEventListener("pointermove", onMove, { passive: true });
		element.addEventListener("pointerleave", onLeave);
		return () => {
			element.removeEventListener("pointermove", onMove);
			element.removeEventListener("pointerleave", onLeave);
		};
	}, []);

	return ref;
}
