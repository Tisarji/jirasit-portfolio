# Portfolio refresh — Vbreathe content + Clayzo motion system

Date: 2026-11-08
Owner: Jirasit Karunwong

## Intent

Two jobs, done together.

**The content is out of date and says something false.** The site presents Sati
as the current employer, with a card announcing a promotion that "Starts May 5,
2026". Jirasit left Sati in August 2026 and now works at Vbreathe as a Software
and Firmware Engineer. A portfolio that misstates where someone works is worse
than one that is merely plain.

**Most of the motion does not run at all.** `tailwind.config.ts` defines seven
keyframes (`float`, `fadeInUp`, `slideInRight`, `shimmer`, `spin-slow`,
`bounce-gentle`, `glow`) and eight components reference them. None reach the
browser: Tailwind v4 does not load a JS config unless the CSS entry says
`@config`, and `src/app/globals.css` is five lines that only `@import
"tailwindcss"`. The built stylesheet contains Tailwind's own `spin`, `pulse`
and `bounce` and nothing else — verified by grepping `.next/static/css`.

So `animate-fadeInUp` and its six siblings are inert class names. The only
motion on the page today is `animate-pulse` on two status dots and
`animate-bounce` on the scroll hint. That is the real reason the site reads as
static, and it is worth knowing before concluding that the old design was
merely too quiet. The same silence also drops the config's `fontFamily` and
`colors` extensions.

Jirasit installed Clayzo (`@clayzo/animation`, `@clayzo/webgl-player`,
`@clayzo/canvaskit-player`, plus both agent skills) and asked for the
portfolio's theme to carry motion the way Clayzo's own work does, in every
section.

## Goals

- Every factual claim about employment, role, and project work is true as of
  November 2026.
- Every section carries motion that responds to the reader — on scroll, and
  under the pointer — rather than firing once at load.
- Clayzo is the engine for the authored, signature motion, used in every
  section rather than only the hero.
- The site stays fast, readable, selectable, and accessible. Motion is additive.

## Non-goals

- Redesigning layout, typography, or the monochrome palette. This is motion and
  content, not a visual redesign.
- Rebuilding content sections as canvas. See "Constraints".
- Publishing internal specifics from Vbreathe working documents — version
  numbers, Jira keys, stack names, commit counts, AI spend.
- Copying clayzo.com's visual design. Clayzo is the tool here, not the
  reference style.

## Anti-goals

Things that would make this a failure even if it technically shipped:

- Motion that delays or obscures reading. If a reader has to wait for an
  animation to find out where Jirasit works, the change was a loss.
- A heavier page that scores worse on Lighthouse than the current one.
- Animations authored but never looked at. Clayzo's own guidance is explicit
  that unverified authoring is guessing.
- Motion that ignores `prefers-reduced-motion`.
- Content that reads as internal documentation rather than as a portfolio.

## Constraints

**Clayzo renders to canvas, not DOM.** `ClayzoPlayer` draws an authored
document onto a `<canvas>`. It cannot animate the existing cards, headings, or
grids, because those are DOM nodes. Moving content into canvas would cost text
selection, SEO, and screen-reader access. Therefore the work splits into two
layers, and neither replaces the other:

| Layer | Technology | Covers |
|---|---|---|
| Authored motion | Clayzo documents + `ClayzoPlayer` | Signature pieces: boot, hero, per-section rules |
| Content motion | DOM, CSS custom properties, IntersectionObserver | Scroll reveal, stagger, pointer response on cards and text |

**Renderer: WebGL, not CanvasKit.** `@clayzo/webgl-player` is ~289 KB brotli;
`@clayzo/canvaskit-player` is ~2,535 KB. A portfolio cannot justify the latter.
The documents here are authored in-house, so they can be enumerated and checked.
`checkCoverage(document, loaders)` must pass for every shipped document, and
must run in the build. Do not make the page able to load both players.

**Clayzo sign-in is required to verify work.** `render-frame`, `review`,
`package`, `export` and `preview` all need a signed-in account. `clayzo doctor`
reported signed out when this design was written; Jirasit signed in on
2026-11-08 and `doctor` now confirms it. Phase 3 is unblocked. If a later run
reports `CLAYZO_OFFLINE`, use a render pass in `CLAYZO_TOKEN` rather than
rendering some other way.

**Fonts.** The site uses Geist via `next/font`. A Clayzo document that names a
font family needs that face at play time or it draws nothing. Prefer documents
with no text, or package the face into the `.clayzo` bundle. Do not name a
system family such as SF Pro.

**Tailwind v4 is CSS-first.** The repo carries a v3-style
`tailwind.config.ts` that nothing loads. Phase 2 must pick one and commit to it:
add `@config "../../tailwind.config.ts"` to `globals.css` to revive the file, or
move the theme into `globals.css` with `@theme` and delete the dead config.
Prefer the second — the entrance keyframes are being retired anyway, and two
places to declare motion is how this drifted in the first place. Whichever is
chosen, confirm the result in the built CSS rather than in the source.

**Existing stack.** Next.js 15.3.8 (App Router, Turbopack), React 19,
Tailwind v4, MUI 7, TypeScript. Tabs for indentation. No animation library is
installed and none should be added — the DOM layer is small enough to own.

## The design

### Content truth

**Career.tsx** carries the bulk of the change. Today it models one employer with
a two-phase internal path. It becomes two employers, Vbreathe current and Sati
past:

- **Vbreathe — Software and Firmware Engineer** (current). Three involvements:
  - *Audit Workspace (Nex)* — a platform that audits company financial
    statements against Hong Kong reporting standards (HKFRS). It recomputes the
    primary statements from a trial balance and ties them out against the
    client's draft, flagging lines the draft is missing. An AI standards check
    reads each requirement and answers it with a reason that cites the standard
    by number. Full loop, end to end.
  - *CardLight* — a one-stop card platform: a mobile app on Google Play plus an
    admin web console, with an AI layer running on AWS Bedrock.
  - *Vbreathe App* — the firmware side of the company's own product. Keep this
    short and honest; it is the newest and least-owned of the three.
- **Sati Co., Ltd. — Software Engineer** (Jun 2025 – Aug 2026). The existing
  three involvements survive unchanged. The two-phase "Internship → Software
  Engineering" path stays as history, with the forward-looking framing
  ("Will lead…", "What I'll own", "Starts May 5, 2026") rewritten in past tense.

`calculateDuration` currently assumes an open-ended tenure. It needs an optional
end date so Sati shows a fixed span and Vbreathe counts from its start.

**Skills.tsx** gains the new ground: the Embedded & Systems category picks up
firmware work, and the AI block moves from aspiration ("Going deep on…") to
practice — RAG over a standards corpus, rubric scoring, AWS Bedrock.

**Intro.tsx** updates the role line from "Full Stack Developer" to reflect
software *and* firmware, and the "Available for new opportunities" chip needs a
decision (see open questions).

**About.tsx, Projects.tsx, Gallery.tsx, Footer.tsx** need a read-through for
stale claims; changes there are expected to be small.

### Content motion layer

One hook and one stylesheet block, used everywhere.

`useReveal()` returns a ref and attaches an `IntersectionObserver`. When the
element crosses into view it sets `data-revealed="true"`. CSS does the rest,
driven by two custom properties the caller can set: `--reveal-delay` for
stagger and `--reveal-distance` for travel. Items in a grid stagger by index.
The observer unobserves after firing — these reveal once, not on every pass.

`usePointerField()` writes normalised pointer position to `--px` / `--py` on a
container, so cards can respond to the cursor with transforms that cost nothing
in JavaScript per frame.

Both hooks read `prefers-reduced-motion` and become no-ops under it, leaving
content in its final state.

Because the seven keyframes never ran, nothing visible is lost by deciding
their fate on the merits. `float` and `spin-slow` are worth redefining in
`globals.css` for the ambient decorations that suit them. The entrance pair
(`fadeInUp`, `slideInRight`) is replaced by the reveal system — the same
effect, correctly triggered. `shimmer`, `bounce-gentle` and `glow` have no
remaining caller once the hero and rules are rebuilt; delete them rather than
porting them.

### Authored Clayzo motion

Three documents, not nine. A shared motif beats eight unrelated pieces, and it
is a fraction of the work to build and maintain.

The motif comes from what is already on the page: the fixed dot grid behind
everything, and the thin gradient rule under every section heading. Monochrome,
geometric, precise — matching the extralight type and hairline borders rather
than fighting them.

1. **`mark.clayzo`** — the nav mark. The "JK" logo in `Navigation.tsx` becomes
   a lattice that resolves into the letterforms on hover, as a two-state
   machine over `idle` and `hover`.

   *This replaces an earlier `boot.clayzo` for the LoadingScreen, for two
   reasons found while planning. `LoadingScreen.tsx` is dead code — it is
   defined but never imported, and `page.tsx` does not render it, so no
   visitor has ever seen it. Reviving it would mean adding an artificial gate
   in front of the content, which the anti-goals rule out and which costs LCP.
   The nav mark is a better home for the same brand moment: present on every
   screen, gating nothing. The LoadingScreen file is deleted.*

2. **`hero.clayzo`** — Intro. The signature piece: a lattice in 2.5D that
   parallaxes under the pointer, replacing the four blurred blobs and four
   floating MUI icons currently there. Pointer-bound, so it must be a document
   played by a runtime rather than an export. Per Clayzo's shipping guidance,
   author the resting pose into the document and let pointer bindings *add* to
   it — a document whose rest state depends on a binding has no rest state, and
   the first paint and the poster both show the rest state.

3. **`rule.clayzo`** — the section rule, used by About, Skills, Career,
   Projects, Gallery and Footer. One document with a number input; each section
   passes a different value and gets a different variation of the same lattice.
   This is what makes "every section" coherent rather than noisy. It replaces
   the static `w-24 h-0.5` gradient divider.

Each is wrapped in a small React component in `src/components/clayzo/` so the
`.clayzo` fetch, bundle read, poster and label live in one place per piece.
`ClayzoPlayer` already handles lazy-loading near the viewport, poster display,
and reduced motion — do not wrap it in a second `IntersectionObserver`,
`matchMedia`, or poster crossfade.

Bundles are packaged with `clayzo package --poster <tick>` and served from
`public/`.

### Verification

- `checkCoverage` passes for all three documents against the WebGL player, run
  as a build gate.
- `clayzo review` runs clean on the exact revision shipped, with web-playback
  warnings fixed.
- Frames sampled with `clayzo render-frame --samples 6` after every meaningful
  authoring change, not once at the end.
- The page is read end to end with `prefers-reduced-motion: reduce` forced, and
  with JavaScript disabled, and with WebGL disabled.
- Lighthouse performance does not regress against the current `main`.

## Order of work

1. **Content truth** — Career, Skills, Intro, and a sweep of the rest. No
   dependency on Clayzo; ships value immediately and can land alone.
2. **Content motion layer** — the two hooks, applied across all eight
   components. Independent of Clayzo sign-in.
3. **Authored Clayzo motion** — blocked on `clayzo login`. boot, hero, rule.
4. **Verification** — the checks above.

## Left to the builder

- The lattice's exact geometry, easing, and tick counts. The brief is
  "monochrome, geometric, precise, matches hairline borders and extralight
  type"; the specific construction is a craft decision to make against rendered
  frames, not to specify here.
- How many variations `rule.clayzo` needs before they stop reading as distinct.
- Whether the ambient per-section blurred blobs become a fourth Clayzo document
  or simply get deleted once the rules carry the motion. Decide after seeing
  the rules in place.
- Component file organisation under `src/components/clayzo/`.

## Decisions (answered 2026-11-08)

1. **Vbreathe start date: 1 October 2026.** Sati ran Jun 2025 – Aug 2026, so the
   timeline shows a gap through September. Present both spans plainly and do not
   write around the gap.
2. **The "Available for new opportunities" chip comes out.** Remove the element
   rather than rewording it; the hero loses a row and the spacing below the
   name needs re-checking once it is gone.
3. **The project names may be published.** *Audit Workspace (Nex)*, *CardLight*
   and *Vbreathe App* can be named. This covers names and what each product
   does — not the internal specifics already excluded in Non-goals.
4. `clayzo login` — done 2026-11-08, confirmed by `clayzo doctor`.
