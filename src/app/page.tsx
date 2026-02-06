import React from "react";
import MedicalHero from "@/components/sections/MedicalHero";
import ComplianceStrip from "@/components/trust/ComplianceStrip";
import MedicalServices from "@/components/sections/MedicalServices";
import CoverageArea from "@/components/sections/CoverageArea";
import ContactCTA from "@/components/contact/ContactCTA";

/* -------------------------------------------------------------------------- */
/*  Homepage                                                                   */
/*  Section order:                                                             */
/*    1. LogoSplash  — handled by EntryGate in layout.tsx                      */
/*    2. MedicalHero                                                           */
/*    3. ComplianceStrip                                                       */
/*    4. MedicalServices                                                       */
/*    5. CoverageArea (Dallas focus)                                           */
/*    6. Call to Action                                                         */
/*    7. Footer       — handled by SiteFooter in layout.tsx                    */
/*                                                                             */
/*  Spacing between sections uses the .page-spacer utility so rhythm stays     */
/*  consistent and "medical-grade" clean.                                      */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      {/* Global section-spacing utility */}
      <style>{pageCSS}</style>

      {/* 2 — Hero */}
      <MedicalHero />

      {/* 3 — Trust strip (flush under hero, no extra spacing) */}
      <ComplianceStrip />

      {/* 4 — Services */}
      <div className="page-spacer" />
      <MedicalServices />

      {/* 5 — Coverage area */}
      <div className="page-spacer" />
      <CoverageArea />

      {/* 6 — Call to action */}
      <div className="page-spacer-lg" />
      <ContactCTA
        heading="Ready to Streamline Your Medical Deliveries?"
        description="Get a same-day quote or speak directly with our dispatch team — veteran-owned reliability, every run."
      />
      <div className="page-spacer" />
    </>
  );
}

/* ── Page-level spacing utilities ────────────────────────────────────────── */

const pageCSS = /* css */ `
.page-spacer {
  height: clamp(2rem, 4vw, 3.5rem);
}
.page-spacer-lg {
  height: clamp(3rem, 6vw, 5rem);
}
`;
