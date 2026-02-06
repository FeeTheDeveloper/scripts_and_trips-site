import type { BrandPalette } from "./palette";
import type { Gradients } from "./gradients";
import { brandPalette } from "./palette";
import { gradients } from "./gradients";

export const brand = {
  name: "Scripts & Trips",
  fullName: "Scripts and Trips Delivery",
  palette: brandPalette as BrandPalette,
  gradients: gradients as Gradients,
  assets: {
    logo: {
      primary: "/brand/logo/logo.png",
      sizes: {
        512: "/brand/logo/logo-512.png",
        256: "/brand/logo/logo-256.png",
        128: "/brand/logo/logo-128.png",
        64: "/brand/logo/logo-64.png",
      },
    },
    icons: {
      icon512: "/brand/icons/icon-512.png",
      icon192: "/brand/icons/icon-192.png",
      appleTouchIcon: "/brand/icons/apple-touch-icon.png",
    },
    favicons: {
      ico: "/brand/favicons/favicon.ico",
      png32: "/brand/favicons/favicon-32.png",
      png16: "/brand/favicons/favicon-16.png",
    },
  },
};

export type BrandConfig = typeof brand;
