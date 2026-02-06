/**
 * Site-wide constants — domain, name, and contact details.
 *
 * Import from any server or client component:
 *
 *   import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/site/meta";
 */

/** Display name used in titles, OG tags, and footers */
export const SITE_NAME = "Scripts and Trips Delivery";

/** Bare domain (no protocol) — used for canonical URLs and display */
export const SITE_DOMAIN = "scriptsandtripsdelivery.com";

/** Full canonical origin */
export const SITE_URL = `https://${SITE_DOMAIN}`;

/** Primary support / contact email */
export const SUPPORT_EMAIL = "contact@scriptsandtripsdelivery.com";

/** Pre-built mailto: href for convenience */
export const SUPPORT_EMAIL_HREF = `mailto:${SUPPORT_EMAIL}`;
