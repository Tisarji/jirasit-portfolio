import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReveal } from "./useReveal";

let observed: Element[] = [];
let trigger: ((e: IntersectionObserverEntry[]) => void) | null = null;
const unobserve = vi.fn();

function installObserver() {
	observed = [];
	unobserve.mockClear();
	vi.stubGlobal("IntersectionObserver", class {
		constructor(cb: (e: IntersectionObserverEntry[]) => void) { trigger = cb; }
		observe(el: Element) { observed.push(el); }
		unobserve = unobserve;
		disconnect() {}
	});
}
function setReducedMotion(reduce: boolean) {
	vi.stubGlobal("matchMedia", (q: string) => ({
		matches: reduce && q.includes("reduce"),
		addEventListener() {}, removeEventListener() {},
	}));
}
afterEach(() => vi.unstubAllGlobals());

function Probe() {
	const ref = useReveal<HTMLDivElement>();
	return <div ref={ref} data-testid="probe" />;
}

describe("useReveal", () => {
	it("leaves content present and unrevealed before it intersects", () => {
		installObserver(); setReducedMotion(false);
		const { getByTestId } = render(<Probe />);
		expect(getByTestId("probe").getAttribute("data-revealed")).toBe(null);
		expect(observed.length).toBe(1);
	});
	it("marks revealed once it intersects, then stops observing", () => {
		installObserver(); setReducedMotion(false);
		const { getByTestId } = render(<Probe />);
		const el = getByTestId("probe");
		act(() => trigger!([{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry]));
		expect(el.getAttribute("data-revealed")).toBe("true");
		expect(unobserve).toHaveBeenCalledOnce();
	});
	it("reveals immediately and observes nothing under reduced motion", () => {
		installObserver(); setReducedMotion(true);
		const { getByTestId } = render(<Probe />);
		expect(getByTestId("probe").getAttribute("data-revealed")).toBe("true");
		expect(observed.length).toBe(0);
	});
});
