import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Career from "./Career";

describe("Career", () => {
	it("shows Vbreathe as the current role", () => {
		render(<Career />);
		expect(screen.getByText("Vbreathe")).toBeDefined();
		expect(screen.getAllByText("Current").length).toBe(1);
	});
	it("shows Sati with a closed date range and no Current badge", () => {
		render(<Career />);
		expect(screen.getByText(/Jun 2025 – Aug 2026/)).toBeDefined();
	});
	it("makes no forward-looking promotion claim", () => {
		const { container } = render(<Career />);
		expect(container.textContent).not.toMatch(/Starts May|Will lead|What I'll own/);
	});
	it("names all three Vbreathe involvements", () => {
		render(<Career />);
		for (const n of ["Audit Workspace (Nex)", "CardLight", "Vbreathe App"]) {
			expect(screen.getByText(n)).toBeDefined();
		}
	});
});
