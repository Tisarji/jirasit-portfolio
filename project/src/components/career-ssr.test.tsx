import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Career from "./Career";

describe("Career on the server", () => {
	// `/` is prerendered at build time. A duration computed during render is
	// baked into the HTML, so it disagrees with the client at hydration and
	// then goes stale until someone redeploys.
	it("renders the date range but not a build-time duration", () => {
		const html = renderToStaticMarkup(<Career />);
		expect(html).toContain("Jun 2025");
		expect(html).toContain("Aug 2026");
		expect(html).not.toMatch(/\d+ month/);
		expect(html).not.toMatch(/\d+ year/);
	});
});
