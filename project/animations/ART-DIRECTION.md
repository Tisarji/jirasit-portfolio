# Art direction — portfolio motion

Written before any node, per the authoring skill.

## The choice

1. **Graphic verb: stripe.** A travelling wave runs through a field of bars.
   One verb, applied to one system, in every piece.
2. **Geometry language: the bar.** The site is built from hairlines — 1px
   borders, a 0.5px gradient rule under every heading, a 20px dot grid. The
   bar is that hairline promoted to a system. Nothing else is introduced.
3. **Palette: two values.** Pure white on transparent, composited with
   `mix-blend-mode: difference`. On the light page white inverts to pure
   black; on the dark page it stays pure white. One document, maximum
   contrast in both themes, and no third colour anywhere.
4. **Scale.** The bars span the full height of their frame at the wave crest
   and never drop below the baseline rule, so the system *is* the frame
   rather than decoration inside it.
5. **Words: none.** The rule carries no text. Only the nav mark draws
   letterforms, and it draws them from this same bar geometry.
6. **One punch, then flow.** The wave front enters from the left inside the
   first half second, then settles into a continuous travelling wave that
   loops seamlessly.

## Why transparent, not a full-canvas field

`authoring-scripts.md` says to draw a full-canvas rect as the first root node
so exports do not come out on black. These documents are never exported as
video — they are played by `ClayzoPlayer` over a live page, where an opaque
field would paint over the section behind it. The first root node is instead
the baseline rule itself, which is what makes the settled frame read as a
rule rather than as a row of disconnected ticks.
