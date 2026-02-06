#!/usr/bin/env node
/**
 * generate-assets.mjs
 * -------------------
 * Reads /public/brand/logo/logo.png and produces all required brand-asset
 * variants (logos, icons, favicons) into their respective folders.
 *
 * Run:  npm run gen:assets
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const SOURCE = path.join(PUBLIC, "brand", "logo", "logo.png");

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Ensure a directory exists before writing into it. */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** Resize the source image and write to `dest` as PNG. */
async function resizePng(size, dest) {
  ensureDir(path.dirname(dest));
  await sharp(SOURCE).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(dest);
  console.log(`  ✓ ${path.relative(ROOT, dest)}`);
}

/** Create an ICO file from one or more PNG buffers (simplified single-image ICO). */
async function createIco(sizes, dest) {
  ensureDir(path.dirname(dest));

  // Build individual PNG buffers at each requested size
  const pngBuffers = await Promise.all(
    sizes.map((s) =>
      sharp(SOURCE)
        .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    )
  );

  // ICO header
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = ICO
  header.writeUInt16LE(numImages, 4);

  const dirEntries = [];
  for (let i = 0; i < numImages; i++) {
    const buf = pngBuffers[i];
    const size = sizes[i] >= 256 ? 0 : sizes[i]; // 0 means 256
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt8(0, 2); // colour palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // offset to data
    offset += buf.length;
    dirEntries.push(entry);
  }

  const ico = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
  fs.writeFileSync(dest, ico);
  console.log(`  ✓ ${path.relative(ROOT, dest)}`);
}

/* ------------------------------------------------------------------ */
/*  Asset definitions                                                  */
/* ------------------------------------------------------------------ */

const LOGO_DIR = path.join(PUBLIC, "brand", "logo");
const ICON_DIR = path.join(PUBLIC, "brand", "icons");
const FAV_DIR = path.join(PUBLIC, "brand", "favicons");

const tasks = [
  // Logos
  { size: 512, dest: path.join(LOGO_DIR, "logo-512.png") },
  { size: 256, dest: path.join(LOGO_DIR, "logo-256.png") },
  { size: 128, dest: path.join(LOGO_DIR, "logo-128.png") },
  { size: 64, dest: path.join(LOGO_DIR, "logo-64.png") },

  // Icons
  { size: 512, dest: path.join(ICON_DIR, "icon-512.png") },
  { size: 192, dest: path.join(ICON_DIR, "icon-192.png") },
  { size: 180, dest: path.join(ICON_DIR, "apple-touch-icon.png") },

  // Favicons (PNG variants)
  { size: 32, dest: path.join(FAV_DIR, "favicon-32.png") },
  { size: 16, dest: path.join(FAV_DIR, "favicon-16.png") },
];

/* ------------------------------------------------------------------ */
/*  Run                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(
      `\n  ✗  Source logo not found at:\n     ${SOURCE}\n\n` +
        `  Place your master logo.png there and re-run.\n`
    );
    process.exit(1);
  }

  console.log("\nGenerating brand assets from logo.png …\n");

  // PNG variants (parallel)
  await Promise.all(tasks.map(({ size, dest }) => resizePng(size, dest)));

  // ICO (contains 16 + 32 px images)
  await createIco([16, 32], path.join(FAV_DIR, "favicon.ico"));

  console.log("\nDone ✓\n");
}

main();
