#!/usr/bin/env node
/**
 * Sardah Image Optimization Pipeline
 * ─────────────────────────────────────────────────────────
 * Reads raw product images from /public/images/raw/<code>/*.{jpg,jpeg,png}
 * and emits optimized AVIF + WebP variants at multiple sizes into
 * /public/images/products/<slug>/, plus a generated `lqip.json` that
 * maps each output to a base64 LQIP placeholder for use with
 * next/image's `placeholder="blur"` API.
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # process everything
 *   node scripts/optimize-images.mjs K-09       # only one product code
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const RAW_DIR = path.join(ROOT, 'public', 'images', 'raw');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'products');
const LQIP_FILE = path.join(ROOT, 'public', 'images', 'lqip.json');

/** Output widths — covers card / gallery / hero variants. */
const SIZES = [400, 800, 1200, 1600];

const VARIANTS = [
  { ext: 'avif', options: { quality: 55, effort: 6 } },
  { ext: 'webp', options: { quality: 78, effort: 5 } },
];

/* ─────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────── */

function codeToSlug(code) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function listRawProducts(filter) {
  if (!(await exists(RAW_DIR))) return [];
  const entries = await fs.readdir(RAW_DIR, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  if (filter) return dirs.filter((d) => d.toLowerCase() === filter.toLowerCase());
  return dirs;
}

async function listRawImages(productDir) {
  const files = await fs.readdir(productDir);
  return files
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => path.join(productDir, f));
}

async function generateLqip(inputPath) {
  const buffer = await sharp(inputPath)
    .resize(20, 28, { fit: 'inside' })
    .webp({ quality: 30 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

async function processImage(inputPath, slug, indexLabel) {
  const baseName = `${slug}-${indexLabel}`;
  const outDir = path.join(OUT_DIR, slug);
  await ensureDir(outDir);

  const meta = await sharp(inputPath).metadata();
  const intrinsicWidth = meta.width ?? 1200;
  const intrinsicHeight = meta.height ?? 1600;

  for (const size of SIZES) {
    if (size > intrinsicWidth * 1.5) continue;

    for (const variant of VARIANTS) {
      const outPath = path.join(
        outDir,
        `${baseName}-${size}.${variant.ext}`,
      );
      const pipeline = sharp(inputPath).resize({
        width: size,
        withoutEnlargement: true,
      });
      if (variant.ext === 'avif') pipeline.avif(variant.options);
      else if (variant.ext === 'webp') pipeline.webp(variant.options);
      await pipeline.toFile(outPath);
    }
  }

  // Default 1×1 reference (largest webp) used as `src` fallback
  await sharp(inputPath)
    .resize({
      width: Math.min(intrinsicWidth, 1600),
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toFile(path.join(outDir, `${baseName}.webp`));

  const lqip = await generateLqip(inputPath);

  return {
    key: `${slug}/${baseName}`,
    width: intrinsicWidth,
    height: intrinsicHeight,
    lqip,
  };
}

/* ─────────────────────────────────────────────────────
   Main
   ───────────────────────────────────────────────────── */

async function main() {
  const filter = process.argv[2];
  const codes = await listRawProducts(filter);

  if (codes.length === 0) {
    console.log(
      `\n[optimize-images] No raw images found at ${RAW_DIR}. ` +
        `Place product photos under /public/images/raw/<CODE>/*.jpg ` +
        `then re-run.\n`,
    );
    return;
  }

  await ensureDir(OUT_DIR);

  /** Existing LQIP map (merged) */
  let lqipMap = {};
  if (await exists(LQIP_FILE)) {
    try {
      lqipMap = JSON.parse(await fs.readFile(LQIP_FILE, 'utf8'));
    } catch {
      lqipMap = {};
    }
  }

  let totalImages = 0;

  for (const code of codes) {
    const slug = codeToSlug(code);
    const productRaw = path.join(RAW_DIR, code);
    const images = await listRawImages(productRaw);
    if (images.length === 0) {
      console.log(`  · ${code}: no images, skipping`);
      continue;
    }
    console.log(`\n→ ${code} (${images.length} image${images.length > 1 ? 's' : ''})`);

    for (let i = 0; i < images.length; i++) {
      const indexLabel = String(i + 1);
      const result = await processImage(images[i], slug, indexLabel);
      lqipMap[result.key] = {
        width: result.width,
        height: result.height,
        lqip: result.lqip,
      };
      totalImages++;
      console.log(`   ✓ ${path.basename(images[i])} → ${slug}/${slug}-${indexLabel}.{webp,avif}`);
    }
  }

  await fs.writeFile(LQIP_FILE, JSON.stringify(lqipMap, null, 2), 'utf8');
  console.log(
    `\n[optimize-images] Done. ${totalImages} image${totalImages !== 1 ? 's' : ''} processed across ${codes.length} product${codes.length !== 1 ? 's' : ''}.`,
  );
  console.log(`[optimize-images] LQIP map written → ${path.relative(ROOT, LQIP_FILE)}`);
}

main().catch((err) => {
  console.error('[optimize-images] Fatal:', err);
  process.exit(1);
});
