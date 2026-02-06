/**
 * Brand colour palette for Scripts & Trips Delivery.
 *
 * `brandPrimary` is the dominant brand purple used for the theme colour in
 * manifest.json, meta tags, and primary UI accents.  If you update the
 * primary colour here, also update:
 *   - /public/manifest.json        → theme_color & background_color
 *   - src/app/layout.tsx           → meta theme-color
 *   - src/lib/brand/tokens.css     → CSS custom properties
 *
 * ─── Tailwind integration ───────────────────────────────────────────
 * Import these values in tailwind.config.ts:
 *
 *   import { brandPalette } from "./src/lib/brand/palette";
 *
 *   export default {
 *     theme: {
 *       extend: {
 *         colors: {
 *           brand:   brandPalette.brandPrimary,
 *           "brand-secondary": brandPalette.brandSecondary,
 *           accent:  brandPalette.brandAccent,
 *           ink:     brandPalette.ink,
 *           paper:   brandPalette.paper,
 *           muted:   brandPalette.muted,
 *         },
 *       },
 *     },
 *   };
 * ────────────────────────────────────────────────────────────────────
 */

// ── Core palette ────────────────────────────────────────────────────

/** Deep brand purple — hero buttons, links, primary surfaces */
export const brandPrimary = "#6B2FA0";

/** Rich indigo — secondary surfaces, nav backgrounds */
export const brandSecondary = "#4A1D7A";

/** Warm gold accent — CTAs, highlights, badges */
export const brandAccent = "#FFB400";

/** Ink — primary body text */
export const ink = "#1A1A1A";

/** Paper — page background */
export const paper = "#F6F4F1";

/** Muted — secondary text, borders, placeholders */
export const muted = "#8B8B8B";

// ── Convenience object ──────────────────────────────────────────────

export const brandPalette = {
  brandPrimary,
  brandSecondary,
  brandAccent,
  ink,
  paper,
  muted,
} as const;

export type BrandPalette = typeof brandPalette;
