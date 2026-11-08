import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SectionRule from "./SectionRule";
import { __resetBundleCache } from "./loadBundle";

afterEach(() => {
	__resetBundleCache();
	vi.unstubAllGlobals();
});

describe("bundle loading", () => {
	// Six SectionRules mount with the page. Six separate fetches for one URL are
	// six round trips and six parses before the reader has scrolled anywhere.
	it("fetches one URL once however many players want it", async () => {
		const fetchMock = vi.fn((url: string) => {
			void url;
			return Promise.resolve({ arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)) });
		});
		vi.stubGlobal("fetch", fetchMock);

		render(
			<>
				<SectionRule variant={0} />
				<SectionRule variant={1} />
				<SectionRule variant={2} />
			</>,
		);

		await waitFor(() => expect(fetchMock).toHaveBeenCalled());
		expect(fetchMock.mock.calls.filter((call) => String(call[0]).endsWith("rule.clayzo"))).toHaveLength(1);
	});
});
