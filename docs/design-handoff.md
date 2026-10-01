# Handoff: Shadex Art & Interior Design — marketing website

## Overview
A multi-page marketing site for **Shadex Art & Interior Design**, a studio in Kireka (Kampala, Uganda) that paints original artwork and delivers complete interiors: gypsum ceilings & partitions, painting & finishes, artworks & décor, and full interior design.
Contact: **0702 836 405** (call / WhatsApp: `tel:+256702836405`, `https://wa.me/256702836405`). Location: **Kireka, Kampala — Uganda**.

## About the design files
Everything in `pages/` is a **design reference built in HTML** (a prototype of look + behaviour), not production code. Recreate it in the target stack — if none exists, a good fit is **Next.js (App Router) + Tailwind CSS**, or **Astro + Tailwind** for a mostly static site. Keep the page structure, spacing, type and motion described here; replace inline styles with the codebase's own conventions.

`.dc.html` files are templates with `{{ holes }}` + a small logic class at the bottom (`class Component …`). Read them for exact markup, copy and values. They open directly in a browser only inside the design tool; treat them as source to read.

## Fidelity
**High-fidelity.** Colours, type, spacing, layout and motion are final. Copy is placeholder-quality but intentional (replace project names, reviews, team names and journal articles with real content). Images are Pexels placeholders with no people.

---

## Site map & routing

| Route (suggested) | Reference file | Notes |
|---|---|---|
| `/` (Home = "Studio") | `Shadex Studio.dc.html` | The homepage. Header "Studio" link and logo go here. |
| `/services/interior-design` | `Interior Design.dc.html` → `Shadex Service.dc.html` (`slug="interior"`) | One shared template, 4 content variants |
| `/services/gypsum-ceilings` | `Gypsum Ceilings.dc.html` (`slug="gypsum"`) | |
| `/services/artworks-decor` | `Artworks Decor.dc.html` (`slug="artworks"`) | |
| `/services/painting-finishes` | `Painting Finishes.dc.html` (`slug="painting"`) | |
| `/portfolio` | `Shadex Portfolio.dc.html` | Archive grid, data from `portfolio-data.js` |
| `/portfolio/[slug]` | `Shadex Project.dc.html?p=<slug>` | Single project |
| `/reviews` | `Shadex Reviews.dc.html` | |
| `/journal` | `Shadex Journal.dc.html` | Archive, data from `journal-data.js` |
| `/journal/[slug]` | `Shadex Article.dc.html?p=<slug>` | Single article |

`reference-sections/Shadex Home (unlinked sections).dc.html` is an earlier home layout that is **no longer linked**. It's kept only as a source of extra sections (services cards, featured-work carousel, process accordion, review slider, Instagram strip) if wanted later.

Shared parts: **Header** (`Shadex Header.dc.html`) and **Footer** (the `<footer id="contact">` block, identical on every page — copy it from `Shadex Studio.dc.html`).

---

## Design tokens

**Colours**
- Ink / primary text: `#1b1b1a`
- Body text (secondary): `#55534e`
- Muted / labels: `#77756f`
- Body on grey panels: `#3a3935`
- Accent (hover, active states, small numerals): `#8a5a3c`
- Background: `#ffffff`
- Alt section background: `#f5f4f1`
- Hairlines / dividers: `#eceae5` (on white), `#dedbd4` / `#d9d6cf` / `#e3e0da` (on grey)
- Image overlays: `rgba(18,16,14,…)` / `rgba(20,18,16,…)`

**Typography** — single family: **Outfit** (Google Fonts, weights 300/400/500).
- Body default weight 300, `-webkit-font-smoothing: antialiased`.
- Studio page headings weight 400; other pages mostly 300.
- Display (Studio hero H1): `clamp(38px,5vw,76px)`, lh 1.05, ls -0.015em.
- Page H1 (other pages): `clamp(34px,3.6vw,52px)`, lh 1.1.
- Section H2: `clamp(22px,2vw,30px)` to `clamp(26px,2.6vw,38px)`, lh 1.28–1.35.
- Big statement paragraph: `clamp(20px,2vw,28px)`, lh 1.45, weight 400.
- Body: 13–15px, lh 1.7–1.8.
- Eyebrow labels: 10.5–11px, uppercase, letter-spacing 0.22–0.28em, colour `#77756f`/`#55534e`.
- Card titles: 13–17px weight 400.
- Footer CTA: `clamp(32px,3.4vw,52px)`, lh 1.15.

**Layout**
- Content max-width `1440px`, side padding `clamp(20px,3vw,40px)`.
- Section vertical rhythm: `clamp(80px,9vw,140px)`.
- Grid gaps: `clamp(12px,1.4vw,20px)` (image grids), `clamp(32px,5vw,96px)` (two-column text/image).
- **No border radius anywhere.** No drop shadows except the Services dropdown (`0 12px 30px rgba(0,0,0,.06)`) and the solid header hairline (`0 1px 0 rgba(0,0,0,.06)`).
- Buttons: rectangular. Filled `#1b1b1a`/white text, or 1px `#1b1b1a` outline; padding `11–14px × 18–24px`; 12–13px weight 400; hover inverts.
- Text links with icon: 12.5–14px weight 400 + Lucide `arrow-right` 15px; "Contact us" has a 1px underline under the label only.

**Logo** — black square (32×32 header, 29×29 footer) + stacked wordmark: `SHADEX` (weight 500, 17px header / 16px footer; letters spread with `justify-content:space-between` so it spans exactly the width of the line below) above `Art & Interior Design` (12px/11px, weight 400, ls 0.04em). Gap 10px between square and wordmark.

**Icons** — [Lucide](https://lucide.dev) throughout, stroke-width 1.5 (1.2 for quote, 1 for the big close X): `chevron-down` (Services dropdown), `arrow-right`, `arrow-left`, `arrow-up` (back to top), `plus`/`minus` (accordions), `quote`, `x` (menu close, 44px), `instagram`, `facebook`, `message-circle` (WhatsApp), `phone`. The two-line hamburger is custom: two 44×1px lines, 7px apart.

---

## Global components

### Header (`Shadex Header.dc.html`)
- Sticky, height ~84px (padding 20px). Left: logo. Right: nav + hamburger.
- Nav links: **Studio · Services ▾ · Portfolio · Reviews · Journal**, 14.5px, ls 0.02em, gap `clamp(16px,3.4vw,64px)`.
- **Active link**: 1px `#1b1b1a` underline, 4px below the text, which **slides in from the left on page load** (`transform: scaleX(0→1)`, origin left, `.6s cubic-bezier(.65,0,.35,1)`).
- **Services dropdown** (hover): white panel, 1px `#eceae5` border, min-width 240px, items 14px with padding 10×20px, hover bg `#f5f4f1`. It links to the four service pages.
- **Transparent mode (homepage only, `overlay` prop)**: over the hero the header is transparent with white logo, text and lines. Once `scrollY > innerHeight − 90` (or while the dropdown is open) it transitions (.45s) to `rgba(255,255,255,.96)` with `backdrop-filter: blur(8px)`, a hairline shadow and dark text. On the homepage the hero is pulled up under the header (`margin-top:-84px`, height `100vh`).
- **Hamburger → full-screen menu** (all breakpoints): white fixed overlay.
  - Top row: logo on the left, large Lucide `x` (44px icon, 64×64 hit area) on the right.
  - Body, two-column grid (stacks on mobile):
    - Left column: "ABOUT SHADEX" label and a large about paragraph `clamp(22px,2.4vw,34px)`.
    - Right column: Call/WhatsApp number, studio address, services line, and "Message on WhatsApp" (filled) + "Call now" (outline) buttons.
  - **≤640px**: the inline nav is hidden. The overlay then also shows the nav links at the top, 32px, **left-aligned**, with a divider under them.
  - Opening the menu locks body scroll.

### Footer (`<footer id="contact">`)
- Logo, 1px `#eceae5` rule.
- Row: nav (Studio, Services, Portfolio, Reviews, Journal) on the left; icons on the right (Instagram, Facebook, WhatsApp, Phone, 18px).
- Two-column block:
  - Left: "Ready to change a room? / Call Shadex." with a "Request a call back" outline button.
  - Right: "WHATSAPP US" (underlined), 0702 836 405, KIREKA, KAMPALA — UGANDA (12.5px, ls .04em).
- Bottom row: back-to-top `arrow-up` on the left, "© 2026 Shadex Art & Interior Design" on the right.

---

## Screens

### 1. Homepage / Studio — `Shadex Studio.dc.html`
1. **Full-viewport hero.** Background photo of an art studio (easel + painting), `object-fit: cover`.
   - Overlays: a top fade `rgba(18,16,14,.45)→0` over the first 22% (for the header), plus a left-to-right fade `.78 → .5 (38%) → .08 (72%)`.
   - Left-aligned white text column, max-width ~760px, vertically centred:
     - Eyebrow: "ART & INTERIOR DESIGN · KIREKA".
     - H1: "Where paintings are made and rooms are finished".
     - Paragraph, max-width 480px.
     - Buttons: "Book a site visit" (white fill) and "See our artworks" (white outline, links to Artworks & Décor).
2. **Centred statement.** Paragraph, max-width 760px, 20–28px weight 400.
3. **Values (grey `#f5f4f1`).** Two columns.
   - Left: image 9:10, **sticky**.
   - Right, max-width 520px:
     - Label "OUR VALUES" and an H2.
     - Four values. Each has a custom line icon (64×40 SVG, stroke 1.2), a 1px divider, an H3 of 18px/400, and 14px body text. The values are separated by big vertical spacing (64–110px).
4. **Two captioned images.** Grid `1fr 2fr`: a tall 7:10 image on the left (offset down slightly) and a 3:2 image on the right. Each has an uppercase 11px caption with ls .24em.
5. **Approach.** Two columns: H2 "How we work. From idea to finished room." with a "Contact us →" link, and a 15px paragraph.
6. **Full-bleed image band.** Height `clamp(360px,52vw,760px)`, with four thin white 28% lines (verticals at 10% and 90%, horizontals at 12% and 88%) as decoration.
7. **Team.** A 2×2 grid of greyscale 5:6 photo slots with "Name / Role" captions. The right column is **sticky** and holds the label "THE TEAM", an H2 and a paragraph. *(Real team photos are needed.)*
8. **Where we work (grey).**
   - Label, H2 "Rooted in Kireka, working across Kampala".
   - Two columns:
     - Left: a paragraph, with a "Contact us →" link at the bottom.
     - Right: a key/value list with 22px row padding and 1px dividers. Keys are 11px uppercase; values are 16px/400.
9. Footer.

### 2. Service pages — `Shadex Service.dc.html` (4 variants via `slug`)
Content for all four lives in the `PAGES` object in the logic class.
1. Hero: two columns. Left has the eyebrow "Studio", an H1 and a lead paragraph; right has a 1:1 image.
2. Centred intro paragraph (17–21px).
3. **Grey section**: a sticky 4:5 image and "HOW WE WORK", with an H2 and three numbered steps (accent numeral, 15px/400 title, 13.5px body, dividers) plus a "Get a quote" outline button.
4. Two images in a `1fr 2fr` grid (3:4 and 16:10). Below them, "Our commitment to quality" with three columns, each containing a title, body text and a bulleted list with accent em-dashes.
5. Full-bleed image band.
6. "Why clients choose Shadex": H2 + link | paragraph.
7. "Explore more from Shadex Studio": cards linking to the other three services (4:5 images).
8. Footer.

### 3. Portfolio archive — `Shadex Portfolio.dc.html`
H1 "Our portfolio" with an intro paragraph. Below, a masonry-feel grid of 8 projects with alternating aspect ratios (`3/4, 4/3, 3/4, 1/1, …`), `align-items:start`. Each has a caption row with the title on the left and the service on the right. Images zoom slightly on hover (`scale(1.04)`, .6s). Each card links to its project page.

### 4. Single project — `Shadex Project.dc.html`
1. Full-width hero image `clamp(420px,62vw,860px)` with a top dark fade. On top of it: a "← Portfolio" link and the title in white.
2. Meta row (4 columns): Client, Location, Year, Service.
3. Images in a `1fr 2fr` grid, then a two-column block with the summary H2 on the left and "The brief" / "Our work" text on the right.
4. Images in a `2fr 1fr` grid, then text beside a 4:3 image.
5. "Related work": 4 cards and an "All projects →" link.
6. Footer.

### 5. Reviews — `Shadex Reviews.dc.html`
1. Hero: two columns, H1 "Reviews" with a paragraph, and a 1:1 image.
2. Six stacked review bands with two alternating layouts:
   - **Centred quote on white**: max-width 760px, quote icon, 15–18px text, attribution.
   - **Image + quote on grey**: a 3:4 image (max 360px) with the quote beside it.

### 6. Journal archive — `Shadex Journal.dc.html`
1. H1 "News, ideas / and practical tips".
2. Featured row using flex-wrap: a lead post (`flex:2 1 520px`, 16:10 image) beside a second post (`flex:1 1 300px`, 4:5 image).
3. A grid of the remaining posts (3:4 images). Each post shows tag · date, title and excerpt.

### 7. Single article — `Shadex Article.dc.html`
- A centred 760px column holding:
  - Tag · date and the title.
  - A 3:2 image.
  - The intro paragraph with a **62px drop cap**.
  - Three H2 sections (20px/400) with body text at 15px lh 1.8, a pair of 3:4 images and a 16:10 image.
  - A grey CTA box ("Planning a project like this?", with a WhatsApp link).
- "Related" row with 3 cards.
- Footer.

---

## Interactions & motion (`shadex-motion.js` — port this carefully)
All of it is skipped under `prefers-reduced-motion`. Header, footer and the menu overlay never animate.

1. **Page open curtain.** A fixed white layer slides up and away (`translateY(0 → -100%)`, 900ms, 150ms delay, `cubic-bezier(.77,0,.18,1)`). Content that is already on screen then reveals top-to-bottom: the delay is based on the element's viewport position (up to +420ms vertically, +160ms horizontally) and starts after the 700ms intro.
2. **Image reveal on scroll.** Every image sits in an `overflow:hidden` wrapper. When the wrapper enters the viewport (IntersectionObserver, rootMargin `0 0 -10% 0`), its **clip-path wipes open top → bottom**: `inset(0 0 100% 0) → inset(0)`, 1400ms, `cubic-bezier(.77,0,.18,1)`. Siblings are staggered by 110ms (max 4).
3. **Parallax glide.** Inside each wrapper, the image is scaled to `1.55` and translated vertically by `p × −24%`. Here `p ∈ [−1, 1]` is the wrapper's centre offset from the viewport centre, updated in a rAF on scroll. The effect is that the frame "glides over" a slower image. The user asked for this to be strong; keep these values.
4. **Text reveal.** `h1, h2, h3, p, figcaption` fade and rise (`opacity 0 → 1`, `translateY(24px → 0)`, 1100ms, `cubic-bezier(.22,.61,.36,1)`), with the same sibling stagger. Once revealed, an element never re-hides.
5. **Sticky columns.** In any two-column row where the columns sit side by side, the **shorter column** gets `position:sticky; top:100px; align-self:start` until the taller one has scrolled past. It is skipped when the height difference is under 160px, when the short column is taller than `100vh − 100px`, or when the columns are stacked. Ancestors must not use `overflow:hidden`; the page root uses `overflow-x:clip` for this reason. In a real build it's simpler to apply `sticky` explicitly on those columns: Studio values image, Studio team text, Service "How we work" image and Studio "Where we work" (auto).
6. **Accordions** (reference home, process): the height animates with `grid-template-rows: 0fr → 1fr` over .5s, and the icon switches between plus and minus.
7. **Carousels** (reference home): the arrows cycle 3 visible items and the review quotes.
8. Hover: links go to `#8a5a3c`, buttons invert, and portfolio images scale by 1.04.

## Responsive rules (from the injected `#shadex-responsive` CSS in `shadex-motion.js`)
Goal: clean, symmetric layouts. A row never leaves one item orphaned on its own line.
- **Grids with 2 or 3 items**: 2 or 3 columns at ≥761px, and 1 column at ≤760px.
- **Grids with 4 items**: 4 columns at ≥1001px, and **2×2** at ≤1000px (including phones).
- **Archive grids (auto-fill)**: 4 columns at ≥1001px, 2 columns from 601–1000px, and 1 column at ≤600px.
- **Asymmetric grids** (`1fr 2fr` / `2fr 1fr`): stack at ≤600px.
- **Header**: the inline nav shows above 640px, with the nav gap reduced to 18px between 641 and 820px. At ≤640px only the hamburger shows.
- **Phone portrait (≤600px) — centre all text**:
  - Headings, paragraphs, labels and buttons are centred.
  - Column flex stacks centre their items.
  - "Space-between" header rows stack and centre.
  - Image wrappers stay full width.
  - Vertical rotated captions are hidden.
- **Exceptions stay left-aligned** (marked `data-left` in the files): numbered steps and accordions, value lists with icons, bulleted commitment lists, the key/value "Where we work" list, the project meta row, and quote blocks with the quote icon. The menu overlay links are also left-aligned.

## State
- Header: `menuOpen`, `drop` (dropdown hover), `solid` (scroll past hero), `shown` (underline animation), viewport width `w`.
- Project and article pages read `?p=<slug>` and look it up in the data files. In a real build, use route params and a CMS or MDX.
- Carousels and accordions: an index in local state.

## Assets
- **Photos**: Pexels placeholders (interiors, no people), e.g. IDs `10322846` (studio hero), `1571460`, `1643383`, `1918291`, `1457842`, `1571463`, `1080721`, `1669799`, `276724`, `1571468`, `1350789`, `1957477`, `1579253`, `271816`, `1080696`, `1571453`. URL pattern: `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=…`. Replace these with the client's real project photos.
- **Team photos**: empty slots (`image-slot.js` in the prototype) to be supplied by the client.
- **Icons**: Lucide (`lucide-react` or `lucide` package).
- **Font**: Outfit from Google Fonts (`next/font/google` recommended).

## Content still needed from the client
Real project names and photos, reviews, team names, roles and photos, journal articles, an email address, and Instagram/Facebook URLs. Projects, reviews and articles are currently fictional placeholders.

## Files
- `pages/` — all design reference files listed above, plus:
  - `shadex-motion.js`: motion engine and responsive CSS.
  - `portfolio-data.js`: 8 projects.
  - `journal-data.js`: 6 articles.
  - `image-slot.js`: the prototype's image placeholder.
  - `support.js`: the prototype runtime (not needed in production).
- `screenshots/` — desktop captures of each page.
