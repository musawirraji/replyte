# "What it does" visuals — re-render spec + prompts

Replaces `public/marketing/vis-01.png … vis-04.png`. Goal: art that fills the
tall sticky column edge-to-edge (`object-fit: cover`, Sanity-style) **without
clipping the subject** on wide screens.

## Size & composition (the part that actually fixes the cropping)

- **Aspect ratio: 4:5 portrait** (matches the column on most screens).
- **Export size: 1600 × 2000 px**, PNG. (Square 2000 × 2000 is even more
  crop-tolerant if you mostly view on large/ultrawide monitors — pick one and
  keep all four identical.)
- **Safe zone:** keep the glowing UI panel/device inside the **central 60%**.
  Leave **generous empty matte-black margin above and below** (≈20% top, ≈20%
  bottom) and some on the sides. `cover` trims those dark margins, so the panel
  stays centered and uncut at any column width.
- No text or key element within ~12% of any edge.
- Render all four as **one consistent set**: same camera, same lighting, same
  glass material, same black background — only the accent colour and the panel
  contents change.

After dropping the new files in, set the crop back to neutral:
`[data-pin-vis] img { object-fit: cover; object-position: center; }`

## Shared style (prepend to every prompt)

> Premium 3D product render, dark editorial tech aesthetic. Deep matte-black
> background (#0d0f13) filling the entire frame to all edges. A single softly
> glowing translucent frosted-glass UI panel floating and centered, glassmorphism
> with subtle edge highlights, resting above a glossy black reflective floor with
> a soft mirrored reflection. Neon light of ONE accent colour emitting from the
> panel and tracing thin glowing connector lines. Cinematic studio lighting, soft
> volumetric glow, gentle bloom, fine film grain, shallow depth of field, Octane/
> Redshift quality, ultra-detailed, 8k. Minimalist, lots of empty negative space;
> subject occupies the central 60% with wide empty dark margins top and bottom.

Negative (all): `text artifacts, watermark, logo, busy background, clutter,
people, hands, harsh lighting, flat lighting, low contrast, panel touching the
edges, cut-off UI`. Midjourney flags: `--ar 4:5 --style raw --v 6`.

---

## vis-01 — Instant reply (accent: electric blue #2f6bf2 / #5b8dff)

> [shared style] The centered glass panel is a sleek smartphone showing a text-
> message thread: a grey incoming buyer bubble and a glowing blue agency reply
> bubble beneath it. A small floating pill badge reads "Responded in 8s" with a
> tiny check. Electric blue neon glow (#2f6bf2, highlights #5b8dff) radiating from
> the phone, thin blue light streaks. Calm, instant, premium. Central 60%, deep
> black margins top and bottom.

## vis-02 — Qualifies the lead (accent: violet #6d56cf / #a78bff)

> [shared style] The centered glass panel is a translucent contact/lead profile
> card: a circular avatar silhouette at top, a glowing "Qualified" pill badge, and
> three faint data rows each with a small line icon (clock, calendar, heart). Thin
> violet glowing lines feed into the left edge of the card like data flowing in.
> Purple/violet neon glow (#6d56cf, highlights #a78bff). Central 60%, deep black
> margins top and bottom.

## vis-03 — Books the viewing (accent: emerald green #1f9d57 / #3ddc84)

> [shared style] The centered glass panel is a scheduling/calendar UI: a small
> month grid or a column of time-slot chips ("Sat 11:00", "Sun 14:00"), with ONE
> slot highlighted and a glowing green checkmark confirming the booking. Emerald
> green neon glow (#1f9d57, highlights #3ddc84), thin green light tracing to the
> confirmed slot. Clean, satisfying. Central 60%, deep black margins top and bottom.

## vis-04 — Never goes cold (accent: warm coral #e0623f / #f0815f)

> [shared style] The centered glass panel is a vertical "Follow-up sequence"
> timeline: three rounded glass nodes connected by a single glowing vertical line.
> Node 1 a message icon labelled "Day 1", node 2 a house icon labelled "Day 3",
> node 3 a checkmark labelled "Day 5 — Replied". The line and first two nodes glow
> warm coral/orange (#e0623f, highlights #f0815f); the final node glows success
> GREEN (#1f9d57) where the buyer replies. Central 60%, deep black margins top and
> bottom.

---

## Tip if you want them perfectly consistent

Generate vis-01 first, lock the seed / use it as a style reference, then generate
02–04 with the same seed and only swap the panel contents + accent colour. That
keeps the four reading as one family in the scroll.
