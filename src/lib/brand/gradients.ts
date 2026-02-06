/**
 * Brand gradient definitions for Scripts & Trips Delivery.
 *
 * Each gradient is exported as a plain CSS `linear-gradient(…)` /
 * `radial-gradient(…)` string so it can be used in:
 *   - inline styles     → style={{ backgroundImage: heroGradient }}
 *   - CSS modules / css → background-image: var(--gradient-hero);
 *   - Tailwind arbitrary → bg-[image:var(--gradient-hero)]
 *
 * ─── Tailwind integration ───────────────────────────────────────────
 * In tailwind.config.ts:
 *
 *   import { gradients } from "./src/lib/brand/gradients";
 *
 *   export default {
 *     theme: {
 *       extend: {
 *         backgroundImage: {
 *           "gradient-hero":   gradients.heroGradient,
 *           "gradient-card":   gradients.cardGlowGradient,
 *           "gradient-button": gradients.buttonGradient,
 *           "gradient-mesh":   gradients.backgroundMeshGradient,
 *         },
 *       },
 *     },
 *   };
 * ────────────────────────────────────────────────────────────────────
 */

import { brandPrimary, brandSecondary, brandAccent } from "./palette";

// ── Gradients ───────────────────────────────────────────────────────

/**
 * Hero gradient — full-width hero banners and splash sections.
 * Deep purple → indigo, angled for drama.
 */
export const heroGradient =
  `linear-gradient(135deg, ${brandPrimary} 0%, ${brandSecondary} 50%, #2E1052 100%)`;

/**
 * Card glow gradient — subtle glow behind feature cards.
 * Soft radial fade from accent gold → transparent purple.
 */
export const cardGlowGradient =
  `radial-gradient(ellipse at 30% 0%, ${brandAccent}22 0%, ${brandPrimary}11 50%, transparent 80%)`;

/**
 * Button gradient — primary action buttons.
 * Vibrant purple sweep with a warm highlight edge.
 */
export const buttonGradient =
  `linear-gradient(90deg, ${brandPrimary} 0%, #8B3FD9 60%, ${brandAccent} 100%)`;

/**
 * Background mesh gradient — decorative page background layer.
 * Multi-stop mesh using brand purples/indigo at low opacity.
 * Layer behind a translucent `paper` surface for depth.
 */
export const backgroundMeshGradient =
  `radial-gradient(ellipse at 20% 80%, ${brandSecondary}33 0%, transparent 50%), ` +
  `radial-gradient(ellipse at 80% 20%, ${brandPrimary}22 0%, transparent 50%), ` +
  `radial-gradient(ellipse at 50% 50%, #2E105218 0%, transparent 70%)`;

// ── Convenience object ──────────────────────────────────────────────

export const gradients = {
  heroGradient,
  cardGlowGradient,
  buttonGradient,
  backgroundMeshGradient,
} as const;

export type Gradients = typeof gradients;
