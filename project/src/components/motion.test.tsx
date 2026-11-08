import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "./About";
import Career from "./Career";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Projects from "./Projects";
import Skills from "./Skills";

const SECTIONS = { About, Skills, Career, Projects, Gallery, Footer };

describe("motion layer", () => {
	for (const [name, C] of Object.entries(SECTIONS)) {
		it(`${name} marks its content for reveal`, () => {
			const { container } = render(<C />);
			expect(container.querySelectorAll("[data-reveal]").length).toBeGreaterThan(0);
		});
		it(`${name} renders its text before anything reveals`, () => {
			const { container } = render(<C />);
			expect(container.textContent!.trim().length).toBeGreaterThan(50);
		});
	}
	it("staggers grid children by index", () => {
		const { container } = render(<Skills />);
		const delays = [...container.querySelectorAll("[data-reveal][style*='--reveal-delay']")]
			.map((el) => (el as HTMLElement).style.getPropertyValue("--reveal-delay"));
		expect(new Set(delays).size).toBeGreaterThan(1);
	});
});
