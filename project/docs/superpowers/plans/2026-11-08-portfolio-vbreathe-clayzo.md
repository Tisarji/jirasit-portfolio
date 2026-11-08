# Portfolio refresh — Vbreathe content + Clayzo motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every employment claim on the portfolio true as of November 2026, and replace its inert CSS keyframes with a working two-layer motion system — DOM reveal/pointer for content, Clayzo documents for authored signature motion in every section.

**Architecture:** Content facts move out of JSX into one typed module so the tenure arithmetic can be tested. Motion splits in two because Clayzo draws to canvas and cannot touch DOM: a small hook pair drives scroll-reveal and pointer response on the existing cards, while three Clayzo documents — a per-section rule, a pointer-reactive hero, and the nav mark — carry the authored motion. Tailwind's unloaded v3-style config is replaced by CSS-first `@theme` in `globals.css`.

**Tech Stack:** Next.js 15.3.8 (App Router, Turbopack), React 19, TypeScript 5, Tailwind v4, MUI 7, `@clayzo/animation` + `@clayzo/webgl-player` 0.3.21, `clayzo` CLI 0.3.21. Vitest + jsdom + @testing-library/react added dev-only for the testable logic.

**Spec:** `docs/superpowers/specs/2026-11-08-portfolio-vbreathe-clayzo-design.md`

## Global Constraints

- Indentation is **tabs**, matching every existing file in `src/`.
- Employment facts, verbatim: Sati Co., Ltd. — Software Engineer, **Jun 2025 – Aug 2026**. Vbreathe — **Software and Firmware Engineer**, **1 Oct 2026 – present**. Do not write around the September 2026 gap.
- Publishable project names: **Audit Workspace (Nex)**, **CardLight**, **Vbreathe App**. Publishable detail is what each product does. Never publish version numbers, Jira keys (AW-120, CRA), stack names, commit counts, or AI spend.
- Renderer is `@clayzo/webgl-player` only. Never make the page able to load `@clayzo/canvaskit-player` as well; it stays installed but unimported.
- `checkCoverage(document, loaders)` must pass for every shipped document, run in the build.
- Never wrap `ClayzoPlayer` in your own `matchMedia`, `IntersectionObserver`, or poster crossfade — it does all three.
- Every Clayzo document authored in **TypeScript against the types**, never JSON by hand; `assertValidAnimationDocument` then `withComputedRevision` before writing.
- Author at 60 fps on a 240 tick/second base: **every keyframe tick is a multiple of 4**.
- No new runtime dependencies. New dev dependencies are allowed only where a task names them.
- End every commit message with:
  `Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>`

## Review Focus

1. **`prefers-reduced-motion: reduce`** — every section must reach a complete, readable rest state; no content left mid-transition or invisible. Pinned in Task 4 and Task 5.
2. **No WebGL2** (old device, or disabled in the browser) — `ClayzoPlayer` must show its `fallback`, never a blank box where a section rule should be. Pinned in Task 6.
3. **First paint and JS-disabled** — the reveal system is additive: content is visible by default and `data-revealed` only animates it in. A reader with JS off must still read everything. Pinned in Task 4.
4. **Tenure arithmetic at boundaries** — an end-dated role, a start in the current month (0 months), and a start in the future must each produce sane copy rather than "-1 months". Pinned in Task 1.
5. **No pointer at all** (touch, keyboard-only) — the hero must read correctly with the pointer away, which is also what the poster and first paint show. Author the rest pose into the document and let bindings *add*. Pinned in Task 7.

---

### Task 1: Employment data module and tenure arithmetic

Content facts currently live inline in JSX, and `Career.tsx:23-30` computes an open-ended duration that cannot express a finished job. Extract and test both.

**Files:**
- Create: `src/content/career.ts`
- Create: `src/content/career.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (add `test` script; devDeps `vitest`, `jsdom`, `@testing-library/react`, `@vitejs/plugin-react`)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type Tenure = { startYear: number; startMonth: number; endYear?: number; endMonth?: number }`
  - `formatTenure(t: Tenure, now?: Date): string` — "5 months", "1 year 3 months", "1 year"; `"Less than a month"` when the span is 0; `"Not started"` when the start is in the future.
  - `formatTenureRange(t: Tenure): string` — `"Jun 2025 – Aug 2026"`, or `"Oct 2026 – Present"` when end is absent.
  - `type Involvement = { name: string; summary: string; plainDescription: string; role: string; methodology: string; tech: string[]; action?: { label: string; href: string; type: "website" | "email" } }`
  - `type Role = { company: string; industry: string; title: string; location: string; arrangement: string; tenure: Tenure; current: boolean; plainEnglish: string; involvements: Involvement[]; skills: string[] }`
  - `ROLES: Role[]` — Vbreathe first, Sati second.

- [ ] **Step 1: Add Vitest and write the failing tests**

Install dev-only: `npm i -D vitest jsdom @testing-library/react @vitejs/plugin-react`. Add `"test": "vitest run"` and `"test:watch": "vitest"` to scripts. `vitest.config.ts` uses the react plugin, `environment: "jsdom"`, and resolves the `@/` alias to `src/` to match `tsconfig.json`.

```ts
import { describe, expect, it } from "vitest";
import { formatTenure, formatTenureRange, ROLES } from "./career";

const NOW = new Date(2026, 10, 8); // 2026-11-08

describe("formatTenure", () => {
	it("counts a closed range from its own end, not from today", () => {
		expect(formatTenure({ startYear: 2025, startMonth: 6, endYear: 2026, endMonth: 8 }, NOW))
			.toBe("1 year 2 months");
	});
	it("counts an open range up to today", () => {
		expect(formatTenure({ startYear: 2026, startMonth: 10 }, NOW)).toBe("1 month");
	});
	it("says 'Less than a month' in the starting month", () => {
		expect(formatTenure({ startYear: 2026, startMonth: 11 }, NOW)).toBe("Less than a month");
	});
	it("never renders a negative span", () => {
		expect(formatTenure({ startYear: 2027, startMonth: 3 }, NOW)).toBe("Not started");
	});
	it("drops the month when the span is whole years", () => {
		expect(formatTenure({ startYear: 2024, startMonth: 11 }, NOW)).toBe("2 years");
	});
});

describe("formatTenureRange", () => {
	it("renders a closed range", () => {
		expect(formatTenureRange({ startYear: 2025, startMonth: 6, endYear: 2026, endMonth: 8 }))
			.toBe("Jun 2025 – Aug 2026");
	});
	it("renders an open range as Present", () => {
		expect(formatTenureRange({ startYear: 2026, startMonth: 10 })).toBe("Oct 2026 – Present");
	});
});

describe("ROLES", () => {
	it("leads with the current role", () => {
		expect(ROLES[0].company).toBe("Vbreathe");
		expect(ROLES[0].current).toBe(true);
	});
	it("records Sati as finished", () => {
		const sati = ROLES.find((r) => r.company.startsWith("Sati"))!;
		expect(sati.current).toBe(false);
		expect(sati.tenure.endMonth).toBe(8);
		expect(sati.tenure.endYear).toBe(2026);
	});
	it("publishes no internal identifiers", () => {
		const text = JSON.stringify(ROLES);
		for (const leak of ["AW-120", "CRA", "v0.1", "cardlight-dev", "staging", "Bedrock spend"]) {
			expect(text).not.toContain(leak);
		}
	});
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `src/content/career.ts` does not exist.

- [ ] **Step 3: Implement `src/content/career.ts`**

`formatTenure` counts whole months between start and `end ?? now`, then renders years and months. The Vbreathe role's three involvements, written at the level the existing Sati cards use — what it does and who it helps, in plain English:

- *Audit Workspace (Nex)* — role "Full Loop Developer", methodology "Agile", tech `["Next.js", "NestJS", "PostgreSQL", "LLM / RAG", "AWS"]`. Describe: audits company financial statements against Hong Kong reporting standards (HKFRS); recomputes the primary statements from a trial balance and ties them against the client's draft, flagging the lines the draft is missing; an AI standards check answers each requirement with a reason that cites the standard by number.
- *CardLight* — role "Developer", methodology "Agile Scrum", tech `["React Native", "NestJS", "PostgreSQL", "AWS Bedrock"]`. Describe: a one-stop card platform — a mobile app on Google Play plus an admin console, with an AI layer.
- *Vbreathe App* — role "Firmware Contributor", methodology "Agile", tech `["C", "Embedded", "Mobile"]`. Describe: the device-side firmware behind Vbreathe's own product and the app that talks to it. Two sentences at most; this is the newest and least-owned of the three.

Vbreathe `skills`: `["Full-Stack", "Firmware", "LLM / RAG", "System Design", "AWS"]`. Sati's existing three involvements and `skills` array move across verbatim from `Career.tsx:33-87`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 10 tests.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/content/
git commit -m "feat: extract career data and tenure arithmetic into a tested module"
```

---

### Task 2: Rewrite the Career section against the data module

`Career.tsx` hardcodes one employer and a promotion that has not happened. It becomes a list rendered from `ROLES`.

**Files:**
- Modify: `src/components/Career.tsx:1-590`
- Test: `src/components/Career.test.tsx`

**Interfaces:**
- Consumes: `ROLES`, `formatTenure`, `formatTenureRange`, `Role`, `Involvement` from Task 1.
- Produces: nothing other tasks consume.

- [ ] **Step 1: Write the failing test**

```tsx
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Career.test.tsx`
Expected: FAIL — Vbreathe is not rendered.

- [ ] **Step 3: Rewrite `Career.tsx` to map over `ROLES`**

Delete the local `calculateDuration`, the `involvements` and `skills` consts, and the entire "Career Path" block at `Career.tsx:195-371` including both Phase cards and the connector. Extract the per-employer card into a local `function RoleCard({ role }: { role: Role })` in the same file, so the two employers share one markup path. The "Current" badge and its pulsing dot render only when `role.current`. Keep the existing Education block untouched.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/Career.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/Career.tsx src/components/Career.test.tsx
git commit -m "feat: show Vbreathe as current role and Sati as past"
```

---

### Task 3: Remaining content truth, and delete dead code

Stale claims outside Career — availability, employer, role, and a Skills section that still frames AI as something being learned rather than shipped — plus a component nothing renders.

**Files:**
- Modify: `src/components/Intro.tsx:31-37` (remove chip), `:69`, `:85`
- Modify: `src/components/About.tsx:10`, `:107`
- Modify: `src/components/Skills.tsx:48-66` (Embedded & Systems), `:88-97` (aiTopics), `:196-205` (the "Current focus" block)
- Modify: `src/components/Footer.tsx:150-160`
- Delete: `src/components/LoadingScreen.tsx`
- Test: `src/components/content.test.tsx`

**Interfaces:**
- Consumes: `ROLES` from Task 1, for the About "Currently" fact.
- Produces: nothing.

- [ ] **Step 1: Write the failing test**

```tsx
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/content.test.tsx`
Expected: FAIL — availability text present, About says Sati, Skills says "Going deep on".

- [ ] **Step 3: Apply the content changes**

Intro: delete the availability chip element entirely and check the `space-y-10` rhythm still reads with the row gone. `Full Stack Developer` → `Software & Firmware Engineer`. The `Full-Stack` highlight tile → `Full-Stack + Firmware`. About: the "Currently" fact reads from `ROLES[0]` rather than a literal, so it cannot go stale again; the portrait `alt` drops "Full Stack Developer" for the new role. Footer: remove the "Available for Work" badge and its wrapper.

Skills: the Embedded & Systems category gains `Firmware` and keeps its existing entries. The closing block stops reading as a study plan — the eyebrow "Current focus" and the heading "Going deep on AI & Machine Learning" are replaced by a statement of shipped work, and `aiTopics` is re-pointed from a syllabus (Deep Learning, Computer Vision, Prompt Engineering) at the techniques actually used on Audit Workspace and CardLight: LLMs, Retrieval-Augmented Generation, rubric scoring, AWS Bedrock, Natural Language Processing. A skills section that claims Computer Vision with nothing behind it is a liability in an interview; cut what the work does not support.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/content.test.tsx`
Expected: PASS, 5 tests.

- [ ] **Step 5: Delete `LoadingScreen.tsx` and confirm nothing referenced it**

Run: `grep -rn "LoadingScreen" src/ ; npx tsc --noEmit`
Expected: no matches, and a clean typecheck.

- [ ] **Step 6: Commit**

```bash
git add -A src/components/
git commit -m "fix: correct stale employment claims and drop unused LoadingScreen"
```

---

### Task 4: Motion foundation — Tailwind v4 theme and the two hooks

`tailwind.config.ts` is a v3-style config that v4 never loads; its seven keyframes have never reached the browser. Replace it with CSS-first theme, and add the hooks the content layer needs.

**Files:**
- Modify: `src/app/globals.css`
- Delete: `tailwind.config.ts`
- Create: `src/hooks/useReveal.ts`
- Create: `src/hooks/usePointerField.ts`
- Test: `src/hooks/useReveal.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `useReveal<T extends HTMLElement>(options?: { delayMs?: number; once?: boolean }): React.RefObject<T | null>` — observes the element, sets `data-revealed="true"` when it intersects, unobserves after firing when `once` (default `true`). A no-op returning the ref when `prefers-reduced-motion: reduce` or `IntersectionObserver` is unavailable.
  - `usePointerField<T extends HTMLElement>(): React.RefObject<T | null>` — writes `--px` and `--py` (0–1, clamped) on the element from `pointermove`, removes them on `pointerleave`, and never attaches under reduced motion.

- [ ] **Step 1: Write the failing test**

```tsx
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
		act(() => trigger!([{ target: el, isIntersecting: true } as IntersectionObserverEntry]));
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/hooks/useReveal.test.tsx`
Expected: FAIL — `./useReveal` does not exist.

- [ ] **Step 3: Implement the hooks and the CSS theme**

Hooks per the signatures above. The reduced-motion case sets `data-revealed="true"` on mount so the CSS rest state is the final state, and never constructs an observer.

`globals.css` gains, after `@import "tailwindcss"`:
- `@theme` re-declaring only the keyframes worth keeping — `float` and `spin-slow` from the old config, used by the ambient decorations. `shimmer`, `bounce-gentle`, `glow`, `fadeInUp` and `slideInRight` are not ported: the first three have no caller left and the last two are replaced by the reveal system.
- A `[data-reveal]` rule: `opacity: 1` and `transform: none` by **default**, with the entrance offset applied only while `:not([data-revealed])` *and* only inside `@media (prefers-reduced-motion: no-preference)`. This is what keeps the content readable with JS off and under reduced motion — the animated state is the exception, not the base.
- `--reveal-delay` (default `0ms`) and `--reveal-distance` (default `1.5rem`) consumed by that rule.

Delete `tailwind.config.ts`. The `fontFamily` and `colors` extensions it declared were never loaded either; `layout.tsx` already applies the Geist CSS variables on `<body>`, and the palette is written with literal Tailwind utilities throughout, so nothing depends on them.

- [ ] **Step 4: Run the test and confirm the keyframes reach the browser**

Run: `npx vitest run src/hooks/ && rm -rf .next && npm run build && grep -ohE "@keyframes [a-zA-Z-]+" .next/static/css/*.css | sort -u`
Expected: tests PASS; the grep lists `float` and `spin-slow` alongside Tailwind's own. This check is the point of the task — the previous config failed silently in exactly this way.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/hooks/ && git rm tailwind.config.ts
git commit -m "feat: move motion theme to Tailwind v4 CSS-first and add reveal hooks"
```

---

### Task 5: Apply the motion layer across every section

**Files:**
- Modify: `src/components/Intro.tsx`, `About.tsx`, `Skills.tsx`, `Career.tsx`, `Projects.tsx`, `Gallery.tsx`, `Footer.tsx`, `Navigation.tsx`
- Test: `src/components/motion.test.tsx`

**Interfaces:**
- Consumes: `useReveal`, `usePointerField` from Task 4.
- Produces: the convention `data-reveal` + inline `--reveal-delay` on every card in a grid, staggered by index.

- [ ] **Step 1: Write the failing test**

```tsx
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/motion.test.tsx`
Expected: FAIL — no `[data-reveal]` nodes.

- [ ] **Step 3: Apply the hooks section by section**

Each section heading block and each grid child gets `data-reveal` and a ref from `useReveal`. Grid children set `--reveal-delay` from their index, capped so a long grid does not trail — 60ms per item to a 360ms ceiling. `usePointerField` goes on the card grids in `Skills` and `Projects`, where the existing `hover:-translate-y-1` already implies pointer response; the cards read `--px`/`--py` for a small parallax that costs no JS per frame. Drop the now-dead `animate-fadeInUp` / `animate-slideInRight` / `animate-shimmer` class names and their `animationDelay` inline styles as you go.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/motion.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/
git commit -m "feat: scroll reveal and pointer response across every section"
```

---

### Task 6: Clayzo pipeline and the per-section rule

The first Clayzo document establishes the whole pipeline: authoring script, build step, coverage gate, React wrapper. It is the rule under every section heading — currently a static `w-24 h-0.5` gradient div.

**Files:**
- Create: `animations/rule.ts`, `animations/lattice.ts`, `animations/build.ts`
- Create: `src/components/clayzo/SectionRule.tsx`
- Create: `animations/rule.test.ts`
- Modify: `package.json` (scripts `anim:build`, `anim:check`; `build` runs `anim:check` first)
- Modify: the six sections' divider markup

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `buildRule(): AnimationDocument` in `animations/rule.ts` — canvas 480×24, `durationTicks` 960, one number input `variant` (range 0–5).
  - `lattice(opts: { id: string; cols: number; rows: number; width: number; height: number; seed: number }): SceneNode[]` in `animations/lattice.ts` — the shared motif, reused by Tasks 7 and 8.
  - `<SectionRule variant={0..5} />` in `src/components/clayzo/SectionRule.tsx`.

- [ ] **Step 1: Write the failing test**

```ts
import { assertValidAnimationDocument } from "@clayzo/animation/authoring";
import { describe, expect, it } from "vitest";
import { buildRule } from "./rule";

describe("rule document", () => {
	it("validates", () => {
		expect(() => assertValidAnimationDocument(buildRule())).not.toThrow();
	});
	it("declares the variant input the sections drive", () => {
		const doc = buildRule() as any;
		expect(doc.interaction?.inputs?.variant).toBeDefined();
	});
	it("snaps every keyframe to the 60fps grid", () => {
		const doc = buildRule() as any;
		const ticks: number[] = [];
		JSON.stringify(doc, (k, v) => (k === "tick" && typeof v === "number" && ticks.push(v), v));
		expect(ticks.filter((t) => t % 4 !== 0)).toEqual([]);
	});
	it("draws a full-canvas base node first so exports are not transparent", () => {
		const doc = buildRule() as any;
		const main = doc.compositions.main;
		expect(main.nodes[main.rootNodeIds[0]].type).toBe("rect");
	});
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run animations/rule.test.ts`
Expected: FAIL — `./rule` does not exist.

- [ ] **Step 3: Author the lattice and the rule**

Read `.agents/skills/clayzo-animation-authoring/references/` — `authoring-scripts.md`, `art-direction.md`, `motion-fundamentals.md` are required for any authoring task, plus `pattern-systems.md` for the lattice and `effect-parameters.md` for any effect. Write the art-direction choice (verb, geometry, palette, scale, words) down before authoring a node.

The motif: a monochrome lattice of hairline units, matching the site's existing dot grid and 1px borders. Pure black on transparent for light, handled by the player's own compositing against the page. Per `authoring-scripts.md`, animate `style.fill.opacity` on solid shapes rather than node `opacity`, and merge units into a few `path` nodes — a field of individually-faded units is a layer per unit per frame.

`variant` shifts phase and unit density so the six sections differ without becoming six unrelated pieces.

- [ ] **Step 4: Run the test, then look at the result**

Run: `npx vitest run animations/rule.test.ts && npx tsx animations/build.ts && npx clayzo render-frame public/anim/rule.json /tmp/rule-sheet.png --samples 6 --max-dimension 320`
Expected: tests PASS; the sheet shows the lattice actually moving across the six samples. A blank or static sheet is a bug, not a boring moment — fix it before continuing.

- [ ] **Step 5: Package, check coverage, and wire the component**

`animations/build.ts` writes `public/anim/rule.json`, runs `packageClayzoBundle` to `public/anim/rule.clayzo` with `--poster`, and fails the process if `checkCoverage` reports any unsupported construct against the WebGL player. Add `"anim:build": "tsx animations/build.ts"` and `"anim:check": "tsx animations/build.ts --check"`, and make `build` run `anim:check` first.

`SectionRule.tsx` is `"use client"`, fetches `/anim/rule.clayzo`, reads it with `readClayzoBundle`, and renders `ClayzoPlayer` with `decorative` (it is ornament, not content), the poster, and a `fallback` of the current static gradient div. Replace the divider markup in About, Skills, Career, Projects, Gallery and Footer with `<SectionRule variant={n} />`, n distinct per section.

- [ ] **Step 6: Verify coverage and the no-WebGL path**

Run: `npm run anim:check && npm run build`
Expected: coverage passes and the build succeeds. Then load the page with WebGL disabled in the browser and confirm every section still shows a rule — the `fallback`, not a blank box (Review Focus 2).

- [ ] **Step 7: Commit**

```bash
git add animations/ src/components/clayzo/ src/components/ package.json public/anim/
git commit -m "feat: animate the section rule with Clayzo in every section"
```

---

### Task 7: The hero document

The signature piece, and the only pointer-bound one. Replaces the four blurred blobs and four floating MUI icons at `Intro.tsx:17-28` and `:160-183`.

**Files:**
- Create: `animations/hero.ts`, `animations/hero.test.ts`
- Create: `src/components/clayzo/HeroField.tsx`
- Modify: `src/components/Intro.tsx`, `animations/build.ts`

**Interfaces:**
- Consumes: `lattice()` from Task 6.
- Produces: `buildHero(): AnimationDocument`; `<HeroField />`.

- [ ] **Step 1: Write the failing test**

```ts
import { assertValidAnimationDocument } from "@clayzo/animation/authoring";
import { describe, expect, it } from "vitest";
import { buildHero } from "./hero";

describe("hero document", () => {
	it("validates", () => {
		expect(() => assertValidAnimationDocument(buildHero())).not.toThrow();
	});
	it("has a rest pose that does not depend on a pointer binding", () => {
		const doc = buildHero() as any;
		const bindings = JSON.stringify(doc.interaction ?? {});
		expect(bindings).not.toMatch(/"operation"\s*:\s*"multiply"/);
	});
	it("snaps every keyframe to the 60fps grid", () => {
		const doc = buildHero() as any;
		const ticks: number[] = [];
		JSON.stringify(doc, (k, v) => (k === "tick" && typeof v === "number" && ticks.push(v), v));
		expect(ticks.filter((t) => t % 4 !== 0)).toEqual([]);
	});
});
```

The second test pins Review Focus 5 and the spec's shipping rule: a property authored at full strength and multiplied down by proximity has no rest state, and the poster, the first paint, and every touch device show exactly that rest state. Author the resting pose and let pointer bindings `add` to it.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run animations/hero.test.ts`
Expected: FAIL — `./hero` does not exist.

- [ ] **Step 3: Author the hero**

Read `pointer-interaction.md` and `orbit-camera-25d.md` before writing bindings; reach for a pointer macro rather than hand-writing a binding graph. The lattice from Task 6 at hero scale, with parallax depth bound to pointer position.

- [ ] **Step 4: Look at it, with and without the pointer**

Run: `npx tsx animations/build.ts && npx clayzo render-frame public/anim/hero.json /tmp/hero-sheet.png --samples 6 --max-dimension 480`
Expected: a composed, legible field at rest across all six samples — this is what a touch user sees for the entire visit.

- [ ] **Step 5: Wire it into Intro and check the page**

`HeroField.tsx` mirrors `SectionRule.tsx` but passes a `label` rather than `decorative`, since it is the hero's subject. Delete the blob and floating-icon markup it replaces, and the now-unused `BoltIcon`, `ComputerIcon`, `RocketLaunchIcon`, `AutoAwesomeIcon` imports.

Run: `npx vitest run && npm run build && npx tsc --noEmit`
Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add animations/ src/components/clayzo/HeroField.tsx src/components/Intro.tsx public/anim/
git commit -m "feat: pointer-reactive Clayzo hero field"
```

---

### Task 8: The nav mark

The third piece, and the one present on every screen. `Navigation.tsx:38-46` renders "JK" as gradient text with a blur div behind it.

**Files:**
- Create: `animations/mark.ts`, `animations/mark.test.ts`
- Create: `src/components/clayzo/NavMark.tsx`
- Modify: `src/components/Navigation.tsx:36-47`, `animations/build.ts`

**Interfaces:**
- Consumes: `lattice()` from Task 6.
- Produces: `buildMark(): AnimationDocument` with a state machine over `idle` and `hover`; `<NavMark />`.

- [ ] **Step 1: Write the failing test**

```ts
import { assertValidAnimationDocument } from "@clayzo/animation/authoring";
import { describe, expect, it } from "vitest";
import { buildMark } from "./mark";

describe("mark document", () => {
	it("validates", () => {
		expect(() => assertValidAnimationDocument(buildMark())).not.toThrow();
	});
	it("declares idle and hover states", () => {
		const names = ((buildMark() as any).stateMachine?.states ?? []).map((s: any) => s.id);
		expect(names).toContain("idle");
		expect(names).toContain("hover");
	});
	it("carries no font dependency", () => {
		expect(JSON.stringify(buildMark())).not.toMatch(/"type"\s*:\s*"text"/);
	});
});
```

The third test matters: `layout.tsx` loads Geist through `next/font/google`, which gives the page a self-hosted face but gives Clayzo nothing. A `text` node naming a family the player cannot load draws nothing at all. Build "JK" from path geometry via `shape-construction.md` instead.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run animations/mark.test.ts`
Expected: FAIL — `./mark` does not exist.

- [ ] **Step 3: Author the mark**

Read `product-microinteractions.md` for the state machine and `shape-construction.md` for drawing the letterforms. `idle` holds; `hover` plays once as the lattice resolves into the mark.

- [ ] **Step 4: Look at it**

Run: `npx tsx animations/build.ts && npx clayzo render-frame public/anim/mark.json /tmp/mark-sheet.png --samples 6 --max-dimension 240`
Expected: "JK" legible at nav size — 32px tall on screen — in every sample.

- [ ] **Step 5: Wire into Navigation and commit**

`NavMark.tsx` drives `setState("hover")` / `setState("idle")` from the anchor's pointer handlers via the `PlayerHandle` from `onReady`. `fallback` is the existing gradient "JK" text.

```bash
git add animations/ src/components/clayzo/NavMark.tsx src/components/Navigation.tsx public/anim/
git commit -m "feat: Clayzo nav mark with hover state"
```

---

### Task 9: Whole-site verification

**Files:**
- Modify: none expected; fix what the checks surface.

**Interfaces:**
- Consumes: everything.
- Produces: nothing.

- [ ] **Step 1: Run the full suite and the build**

Run: `npx vitest run && npx tsc --noEmit && npm run lint && rm -rf .next && npm run build`
Expected: all PASS.

- [ ] **Step 2: Review every Clayzo document on the exact shipped revision**

Read `.agents/skills/clayzo-animation-authoring/references/self-review.md` and `previewing-work.md` first, then:

Run: `npx clayzo review public/anim/rule.json && npx clayzo review public/anim/hero.json && npx clayzo review public/anim/mark.json`
Expected: no web-playback warnings. Fix any `performance.not_drawn` or `performance.download_size` before continuing.

- [ ] **Step 3: Walk the page under each degraded condition**

Run `npm run dev`, then check in the browser:
- `prefers-reduced-motion: reduce` forced — every section settles complete and readable, no content stuck mid-transition (Review Focus 1).
- WebGL disabled — every Clayzo slot shows its fallback (Review Focus 2).
- JavaScript disabled — all text readable, nothing invisible (Review Focus 3).
- A touch device or emulated touch — the hero reads correctly with no pointer (Review Focus 5).

- [ ] **Step 4: Confirm performance did not regress**

Run Lighthouse against `npm run build && npm start` on `/`, and compare Performance and Accessibility against the same run on `main`.
Expected: neither score is lower. If Performance dropped, the usual cause is the player loading above the fold — check `HeroField` is the only piece near the top.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: address verification findings across motion and content"
```
