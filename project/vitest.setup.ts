import { vi } from "vitest";

// jsdom ships no IntersectionObserver. Components under test construct one
// directly (Gallery's video lazy-load does), so give them an inert stand-in.
// Tests that need to drive observation install their own via vi.stubGlobal.
if (typeof globalThis.IntersectionObserver === "undefined") {
	globalThis.IntersectionObserver = class {
		readonly root = null;
		readonly rootMargin = "";
		readonly thresholds: ReadonlyArray<number> = [];
		observe = vi.fn();
		unobserve = vi.fn();
		disconnect = vi.fn();
		takeRecords = vi.fn(() => []);
	} as unknown as typeof IntersectionObserver;
}
