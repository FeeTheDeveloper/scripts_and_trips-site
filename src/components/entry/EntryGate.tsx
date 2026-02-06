"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import LogoSplash from "@/components/entry/LogoSplash";

/* -------------------------------------------------------------------------- */
/*  EntryGate                                                                  */
/*  Decides whether to show the LogoSplash or render the site directly.        */
/*                                                                             */
/*  SEO safety:                                                                */
/*  • The `children` (header, main, footer) are ALWAYS rendered in the DOM     */
/*    so crawlers / SSR see the full page.                                     */
/*  • The splash is a fixed overlay that sits on top; once dismissed the       */
/*    overlay unmounts and the underlying content is revealed.                  */
/*  • sessionStorage is client-only — bots never execute it, so the splash    */
/*    overlay will not interfere with indexing.                                 */
/* -------------------------------------------------------------------------- */

const GATE_KEY = "enteredSite";

export default function EntryGate({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const [needsSplash, setNeedsSplash] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;          // skip entirely

    try {
      if (!sessionStorage.getItem(GATE_KEY)) {
        setNeedsSplash(true);
      }
    } catch {
      /* SSR / storage blocked — fall through to normal render */
    }
  }, [prefersReduced]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(GATE_KEY, "1");
    } catch { /* noop */ }
    setNeedsSplash(false);
  };

  /*
   * If the splash isn't needed we just render children directly —
   * no wrapper div, no framer-motion overhead.
   */
  if (!needsSplash) {
    return <>{children}</>;
  }

  /*
   * Splash IS needed:
   * Pass `onComplete` so LogoSplash can notify us when it's done.
   * Children are still rendered underneath (visibility: hidden until
   * the splash fades) so the full DOM is always present for SEO.
   */
  return (
    <LogoSplash onComplete={handleComplete}>
      {children}
    </LogoSplash>
  );
}
