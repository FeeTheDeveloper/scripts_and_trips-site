import type { Metadata } from "next";
import React from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site/meta";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import EntryGate from "@/components/entry/EntryGate";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "Scripts & Trips — fast, reliable delivery.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/brand/favicons/favicon.ico", sizes: "any" },
      { url: "/brand/favicons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicons/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/brand/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  themeColor: "#6B2FA0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EntryGate>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </EntryGate>
      </body>
    </html>
  );
}
