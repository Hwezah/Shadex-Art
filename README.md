# Shadex Art & Interior Design

Marketing site for Shadex, an art and interior design studio in Kireka, Kampala.

**Stack:** Next.js 16 (App Router) · Tailwind CSS 4 · shadcn/ui conventions · Context API · Motion (Framer Motion) · Lucide.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # all routes are statically prerendered
pnpm lint
```

## Structure

```
src/
  app/                      routes: /, /services/[slug], /portfolio(/[slug]), /reviews, /journal(/[slug])
    template.tsx            page-open curtain (replays on every navigation)
  components/
    layout/                 header, full-screen menu, footer, logo
    motion/                 intro curtain, <Reveal> (text fade-up), <Media> (wipe + parallax image)
    ui/                     shadcn-style primitives (Button, ArrowLink)
  context/menu-context.tsx  menu open state + body scroll lock
  context/theme-context.tsx light/dark theme (data-theme on <html>, saved in localStorage)
  lib/data/                 typed content: services, projects, posts, reviews, studio, site
```

**Theming:** palette colours are CSS variables in `src/app/globals.css`, with light (`:root`) and pitch-black dark (`[data-theme="dark"]`) values. An inline head script applies the saved theme before first paint. The toggle sits bottom-right on every page.

The design handoff (tokens, motion specs, responsive rules) lives in [`docs/design-handoff.md`](docs/design-handoff.md).

## Content still needed from the client

All content is in `src/lib/data/`:

- real project names and photos (`projects.ts`)
- reviews (`reviews.ts`)
- team names, roles and photos (`studio.ts`; put photos in `public/team/` and set `photo`)
- journal articles (`posts.ts`)
- an email address and Instagram/Facebook URLs (`site.ts`)

Photos are Pexels placeholders, allowed in `next.config.ts`. Remove that `remotePatterns` entry once the real photos live in `public/`.
