"use client";

import { useEffect, useRef } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion(): boolean {
	return typeof matchMedia === "function" && matchMedia(REDUCED_MOTION).matches;
}

/**
 * Marks the element `data-revealed="true"` once it scrolls into view, so CSS can
 * animate it in. Content is readable without this: the entrance offset lives behind
 * `:not([data-revealed])`, so a reader with JS off, or one who asked for reduced
 * motion, gets the final state and never the midpoint.
 */
export function useReveal<T extends HTMLElement>(
	options: { delayMs?: number; once?: boolean } = {},
): React.RefObject<T | null> {
	const { delayMs = 0, once = true } = options;
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
			element.dataset.revealed = "true";
			return;
		}

		if (delayMs > 0) element.style.setProperty("--reveal-delay", `${delayMs}ms`);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					(entry.target as HTMLElement).dataset.revealed = "true";
					if (once) observer.unobserve(entry.target);
				}
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [delayMs, once]);

	return ref;
}
