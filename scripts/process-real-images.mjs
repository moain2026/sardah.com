#!/usr/bin/env node
/**
 * Process real AI-generated abaya photos into optimized WebPs.
 * Replaces the SVG placeholders for category covers and key product images.
 */

import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const SRC = '/tmp/abaya-imgs';

// Map source files → destination paths
const CATEGORY_IMAGES = [
  { src: 'abayas.png',    dest: 'images/categories/abayas-cover.webp' },
  { src: 'winter.png',    dest: 'images/categories/winter-cover.webp' },
  { src: 'occasions.png', dest: 'images/categories/occasions-cover.webp' },
  { src: 'practical.png', dest: 'images/categories/practical-cover.webp' },
  { src: 'niqab.png',     dest: 'images/categories/niqab-cover.webp' },
  { src: 'sale.png',      dest: 'images/categories/sale-cover.webp' },
];

// Map products to source images (each photo is reused for products in matching category)
// Each product gets 3 angles: front (full), side (cropped), detail (close-crop)
const PRODUCT_MAP = [
  { code: 'k09',   slug: 'abaya-k09',          src: 'abayas.png' },
  { code: 's138',  slug: 'abaya-lace-s138',    src: 'occasions.png' },
  { code: 's162',  slug: 'winter-abaya-s162',  src: 'winter.png' },
  { code: 's161',  slug: 'winter-abaya-s161',  src: 'winter.png' },
  { code: 's160',  slug: 'winter-abaya-s160',  src: 'winter.png' },
  { code: 's159',  slug: 'abaya-s159',         src: 'abayas.png' },
  { code: 's157',  slug: 'abaya-s157',         src: 'sale.png' },
  { code: 's155',  slug: 'abaya-blazer-s155',  src: 'abayas.png' },
  { code: 's154',  slug: 'abaya-s154',         src: 'occasions.png' },
  { code: 's151',  slug: 'abaya-s151',         src: 'occasions.png' },
  { code: 's150',  slug: 'practical-abaya-s150', src: 'practical.png' },
  { code: 's145',  slug: 'abaya-s145',         src: 'sale.png' },
  { code: 's143',  slug: 'abaya-s143',         src: 'practical.png' },
  { code: 's136',  slug: 'abaya-s136',         src: 'practical.png' },
  { code: 's135',  slug: 'abaya-s135',         src: 'abayas.png' },
  { code: 's127',  slug: 'abaya-s127',         src: 'abayas.png' },
  { code: 's122',  slug: 'abaya-s122',         src: 'winter.png' },
  { code: 's114',  slug: 'abaya-s114',         src: 'abayas.png' },
  { code: 's164',  slug: 'abaya-s164',         src: 'sale.png' },
  { code: 'n330',  slug: 'niqab-n330',         src: 'niqab.png' },
];

async function processCategoryCovers() {
  for (const cat of CATEGORY_IMAGES) {
    const inPath = join(SRC, cat.src);
    const outPath = join(PUBLIC, cat.dest);
    await mkdir(dirname(outPath), { recursive: true });
    await sharp(inPath)
      .resize(1200, 1500, { fit: 'cover', position: 'center' })
      .webp({ quality: 82, effort: 5 })
      .toFile(outPath);
  }
  return CATEGORY_IMAGES.length;
}

async function processProductImages() {
  let count = 0;
  for (const product of PRODUCT_MAP) {
    const folder = join(PUBLIC, 'images', 'products', product.code);
    await mkdir(folder, { recursive: true });
    const inPath = join(SRC, product.src);

    // Get original image metadata
    const meta = await sharp(inPath).metadata();
    const w = meta.width;
    const h = meta.height;

    // Angle 1: Full front (3:4 portrait, full image)
    await sharp(inPath)
      .resize(900, 1200, { fit: 'cover', position: 'center' })
      .webp({ quality: 82, effort: 5 })
      .toFile(join(folder, `${product.code}-1.webp`));

    // Angle 2: Side / cropped to upper-right (different look)
    await sharp(inPath)
      .extract({
        left: Math.floor(w * 0.10),
        top: Math.floor(h * 0.05),
        width: Math.floor(w * 0.70),
        height: Math.floor(h * 0.85),
      })
      .resize(900, 1200, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 0.95, saturation: 1.05 })
      .webp({ quality: 82, effort: 5 })
      .toFile(join(folder, `${product.code}-2.webp`));

    // Angle 3: Detail crop (zoomed center / lower portion = fabric detail)
    await sharp(inPath)
      .extract({
        left: Math.floor(w * 0.20),
        top: Math.floor(h * 0.30),
        width: Math.floor(w * 0.55),
        height: Math.floor(h * 0.55),
      })
      .resize(900, 1200, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 1.05, saturation: 1.10 })
      .webp({ quality: 85, effort: 5 })
      .toFile(join(folder, `${product.code}-3.webp`));

    count += 3;
  }
  return count;
}

async function main() {
  console.log('🎨  Replacing placeholders with real AI photography...');
  const t0 = Date.now();
  const cats = await processCategoryCovers();
  console.log(`   ✓ ${cats} category covers replaced`);
  const products = await processProductImages();
  console.log(`   ✓ ${products} product images replaced (3 angles × 20 products)`);
  console.log(`✨  Done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
