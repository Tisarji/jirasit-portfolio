import { assertValidAnimationDocument } from "@clayzo/animation/authoring";
import { describe, expect, it } from "vitest";
import { buildMark } from "./mark";

type AnyDoc = { stateMachine?: { states?: { id: string; name: string }[]; initialStateId?: string } };

describe("mark document", () => {
	it("validates", () => {
		expect(() => assertValidAnimationDocument(buildMark())).not.toThrow();
	});

	it("declares idle and hover states, and rests in idle", () => {
		const machine = (buildMark() as unknown as AnyDoc).stateMachine;
		// stateMachine() derives ids as `state-<name>`; the name is what the brief
		// is naming, and what setState() accepts either way.
		const names = (machine?.states ?? []).map((state) => state.name);
		expect(names).toContain("idle");
		expect(names).toContain("hover");
		const initial = machine?.states?.find((state) => state.id === machine?.initialStateId);
		expect(initial?.name).toBe("idle");
	});

	// layout.tsx loads Geist through next/font, which self-hosts a face for the
	// page and gives Clayzo nothing. A text node naming a family the player
	// cannot load draws nothing at all, with no error.
	it("carries no font dependency", () => {
		expect(JSON.stringify(buildMark())).not.toMatch(/"type"\s*:\s*"text"/);
	});
});
