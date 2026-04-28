#!/usr/bin/env node
/**
 * Convert downloaded AI-generated PNGs into optimized WebP versions
 * for both category covers and (later) product images.
 */
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, basename, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, 'tmp', 'ai-images');
const OUT_CATS = join(ROOT, 'public', 'images', 'categories');
const OUT_PROD = join(ROOT, 'public', 'images', 'products');

// Mapping for category covers (filename → output path)
const CATEGORY_MAP = {
  'abayas-cover.png':    'abayas-cover.webp',
  'winter-cover.png':    'winter-cover.webp',
  'occasions-cover.png': 'occasions-cover.webp',
  'practical-cover.png': 'practical-cover.webp',
  'niqab-cover.png':     'niqab-cover.webp',
  'sale-cover.png':      'sale-cover.webp',
};

// Mapping for product images (filename → product folder/image)
// e.g. 'abaya-k09-1.png' → 'k09/k09-1.webp'
function parseProductFilename(filename) {
  // Pattern: <slug>-<index>.png  (e.g. abaya-k09-1.png, niqab-n330-2.png)
  const m = filename.match(/^(.+?)-(\d+)\.(?:png|jpg|jpeg|webp)$/i);
  if (!m) return null;
  const slug = m[1];
  const index = parseInt(m[2], 10);

  // Convert slug → folder code (last hyphenated token, lowercased + alnum only)
  const tail = slug.split('-').pop();
  const folder = tail.toLowerCase().replace(/[^a-z0-9]/g, '');
  return { folder, index };
}

async function convertCategory(srcPath, outName) {
  const out = join(OUT_CATS, outName);
  await mkdir(dirname(out), { recursive: true });
  await sharp(srcPath)
    .resize(1200, 1500, { fit: 'cover', position: 'center' })
    .webp({ quality: 86, effort: 5 })
    .toFile(out);
  const s = await stat(out);
  console.log(`   ✓ ${outName.padEnd(28)} ${(s.size / 1024).toFixed(0)} KB`);
}

async function convertProduct(srcPath, folder, index) {
  const out = join(OUT_PROD, folder, `${folder}-${index}.webp`);
  await mkdir(dirname(out), { recursive: true });
  await sharp(srcPath)
    .resize(900, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 88, effort: 5 })
    .toFile(out);
  const s = await stat(out);
  console.log(`   ✓ ${folder}/${folder}-${index}.webp  ${(s.size / 1024).toFixed(0)} KB`);
}

(async () => {
  console.log('🎬  Converting AI images → WebP...');
  const t0 = Date.now();

  const files = await readdir(TMP).catch(() => []);
  let cats = 0, prods = 0;

  for (const file of files) {
    const src = join(TMP, file);
    const ext = extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;

    // Category?
    if (CATEGORY_MAP[file]) {
      await convertCategory(src, CATEGORY_MAP[file]);
      cats++;
      continue;
    }

    // Product image?
    const parsed = parseProductFilename(file);
    if (parsed) {
      await convertProduct(src, parsed.folder, parsed.index);
      prods++;
      continue;
    }

    console.log(`   · skipped ${file} (unknown pattern)`);
  }

  console.log(`\n✨  Converted ${cats} category covers + ${prods} product images in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
})();
