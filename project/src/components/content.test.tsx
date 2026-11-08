import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "./About";
import Footer from "./Footer";
import Intro from "./Intro";
import Skills from "./Skills";

describe("content truth", () => {
	it("claims no availability anywhere", () => {
		for (const C of [Intro, Footer]) {
			const { container } = render(<C />);
			expect(container.textContent).not.toMatch(/Available for/i);
		}
	});
	it("names the current employer in About", () => {
		const { container } = render(<About />);
		expect(container.textContent).toMatch(/Vbreathe/);
		expect(container.textContent).not.toMatch(/Sati/);
	});
	it("states the role as software and firmware in Intro", () => {
		const { container } = render(<Intro />);
		expect(container.textContent).toMatch(/Software & Firmware Engineer/);
	});
	it("lists firmware among the embedded skills", () => {
		const { container } = render(<Skills />);
		expect(container.textContent).toMatch(/Firmware/);
	});
	it("presents AI as shipped work, not as study", () => {
		const { container } = render(<Skills />);
		expect(container.textContent).not.toMatch(/Going deep on|Current focus/i);
		expect(container.textContent).toMatch(/RAG/);
	});
});
