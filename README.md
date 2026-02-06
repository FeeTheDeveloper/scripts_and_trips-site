# Scripts and Trips Delivery — Site

A veteran-owned medical courier service in the Dallas–Fort Worth metroplex.  
Built with **Next.js 14** (App Router), **TypeScript**, and **Framer Motion**.

---

## Quick Start

```bash
npm install          # install dependencies
npm run dev          # start Next.js dev server (localhost:3000)
npm run gen:assets   # generate resized logo variants (requires logo.PNG in public/)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4 |
| Animation | Framer Motion 12 |
| Styling | CSS custom properties + inline `React.CSSProperties` |
| Asset pipeline | Sharp (logo resizing script) |

---

## Project Structure

```
scripts_and_trips-site/
├── public/
│   ├── brand/
│   │   ├── favicons/          # Generated favicon sizes
│   │   ├── icons/             # PWA / app icons
│   │   ├── logo/              # Resized logo variants
│   │   └── README.md          # Brand asset guidelines
│   ├── images/
│   │   ├── backgrounds/       # Full-bleed backgrounds
│   │   ├── hero/              # Hero section imagery
│   │   ├── patterns/          # Repeating patterns / textures
│   │   └── vehicles/          # Van SVG illustrations
│   │       ├── van-side.svg
│   │       ├── van-3quarter.svg
│   │       └── van-line.svg
│   ├── lottie/                # Lottie animation JSON files
│   ├── logo.PNG               # Source logo file
│   └── manifest.json          # PWA web manifest
│
├── scripts/
│   └── generate-assets.mjs    # Sharp-based logo / favicon generator
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (metadata, header, footer, entry gate)
│   │   └── page.tsx           # Homepage — assembles all sections
│   │
│   ├── components/
│   │   ├── contact/
│   │   │   └── ContactCTA.tsx          # Email call-to-action block
│   │   ├── entry/
│   │   │   ├── EntryGate.tsx           # Session-gated splash wrapper
│   │   │   └── LogoSplash.tsx          # Cinematic logo reveal animation
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx          # Sticky top header
│   │   │   └── SiteFooter.tsx          # Three-column footer
│   │   ├── sections/
│   │   │   ├── MedicalHero.tsx         # Hero with headline, CTAs, backdrop
│   │   │   ├── MedicalServices.tsx     # Five-card animated service grid
│   │   │   └── CoverageArea.tsx        # DFW coverage region list
│   │   ├── trust/
│   │   │   └── ComplianceStrip.tsx     # Horizontal compliance badges
│   │   ├── vehicles/
│   │   │   ├── VanMarquee.tsx          # Infinite CSS van scroll
│   │   │   ├── VanMarqueeMedical.tsx   # Medical-themed marquee variant
│   │   │   ├── VanParallax.tsx         # Scroll-driven parallax van
│   │   │   ├── VanStreak.tsx           # Burst-on-load van animation
│   │   │   └── VanStreakMedical.tsx    # Medical van glide animation
│   │   └── visuals/
│   │       └── HeroBackdrop.tsx        # Gradient mesh + blobs + grain overlay
│   │
│   └── lib/
│       ├── brand/
│       │   ├── palette.ts     # Named color constants (primary, accent, ink…)
│       │   ├── gradients.ts   # Reusable CSS gradient strings
│       │   ├── brand.ts       # Master brand config re-export
│       │   └── tokens.css     # CSS custom properties (:root)
│       └── site/
│           └── meta.ts        # Site name, domain, URLs, contact email
│
├── tsconfig.json
└── package.json
```

---

## Brand System

All colors, gradients, and design tokens live under `src/lib/brand/`:

| Token | Value | Usage |
|-------|-------|-------|
| `brandPrimary` | `#6B2FA0` | Purple — buttons, headers, accents |
| `brandSecondary` | `#4A1D7A` | Deep indigo — footer, dark sections |
| `brandAccent` | `#FFB400` | Gold — highlights, badges |
| `ink` | `#1A1A1A` | Body text |
| `paper` | `#F6F4F1` | Page background |
| `muted` | `#8B8B8B` | Secondary text |

CSS custom properties are available globally via `tokens.css` (imported in the root layout).

---

## Homepage Sections (render order)

1. **LogoSplash** — one-time cinematic entry (session-gated)
2. **MedicalHero** — headline, sub-headline, five icon bullets, two CTAs, van marquee backdrop
3. **ComplianceStrip** — HIPAA, OSHA, licensed/insured trust badges
4. **MedicalServices** — five animated service cards (stat delivery, route, lab, equipment, on-demand)
5. **CoverageArea** — Dallas–Fort Worth region breakdown (core, extended, metro-wide)
6. **ContactCTA** — email link with gradient button

---

## Asset Generation

Drop a source `logo.PNG` into `public/` and run:

```bash
npm run gen:assets
```

This produces resized PNGs in `public/brand/logo/`, icons in `public/brand/icons/`, and favicons in `public/brand/favicons/`.

---

## License

Private — all rights reserved.