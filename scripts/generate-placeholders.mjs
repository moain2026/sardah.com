#!/usr/bin/env node
/**
 * Generate luxury placeholder images for Sardah Abayas.
 *
 * Creates elegant gradient-and-monogram WebP images for:
 *   • 20 products × 3 angles  → 60 product images
 *   •  6 category covers
 *   •  4 icons (192, 512, apple-touch, favicon)
 *   •  1 OG image (1200×630)
 *
 * Each placeholder is a sophisticated SVG converted to WebP via sharp,
 * with brand colors, soft gradients, grain, gold monogram and
 * sub-label so the boutique feels editorial even before real photos.
 */

import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

// ── Product list (slug, code, name, palette) ────────
const PRODUCTS = [
  { slug: 'abaya-k09',          code: 'K-09', name: 'عباية جاكار',          palette: 'onyx' },
  { slug: 'abaya-lace-s138',    code: 'S-138', name: 'عباية الدانتيل',       palette: 'rose' },
  { slug: 'winter-abaya-s162',  code: 'S-162', name: 'عباية شتوية',         palette: 'midnight' },
  { slug: 'winter-abaya-s161',  code: 'S-161', name: 'عباية شتوية',         palette: 'midnight' },
  { slug: 'winter-abaya-s160',  code: 'S-160', name: 'عباية شتوية',         palette: 'taupe' },
  { slug: 'abaya-s159',         code: 'S-159', name: 'عباية كلاسيك',        palette: 'onyx' },
  { slug: 'abaya-s157',         code: 'S-157', name: 'عباية فاخرة',         palette: 'champagne' },
  { slug: 'abaya-blazer-s155',  code: 'S-155', name: 'عباية بليزر',         palette: 'charcoal' },
  { slug: 'abaya-s154',         code: 'S-154', name: 'عباية مناسبات',       palette: 'rose' },
  { slug: 'abaya-s151',         code: 'S-151', name: 'عباية ملكية',         palette: 'onyx' },
  { slug: 'practical-abaya-s150', code: 'S-150', name: 'عباية عملية',       palette: 'taupe' },
  { slug: 'abaya-s145',         code: 'S-145', name: 'عباية أنيقة',         palette: 'champagne' },
  { slug: 'abaya-s143',         code: 'S-143', name: 'عباية أنيقة',         palette: 'sand' },
  { slug: 'abaya-s136',         code: 'S-136', name: 'عباية يومية',         palette: 'taupe' },
  { slug: 'abaya-s135',         code: 'S-135', name: 'عباية يومية',         palette: 'onyx' },
  { slug: 'abaya-s127',         code: 'S-127', name: 'عباية كلاسيك',        palette: 'charcoal' },
  { slug: 'abaya-s122',         code: 'S-122', name: 'عباية كلاسيك',        palette: 'midnight' },
  { slug: 'abaya-s114',         code: 'S-114', name: 'عباية كلاسيك',        palette: 'onyx' },
  { slug: 'abaya-s164',         code: 'S-164', name: 'عباية فاخرة',         palette: 'champagne' },
  { slug: 'niqab-n330',         code: 'N-330', name: 'نقاب فاخر',           palette: 'onyx' },
];

const CATEGORIES = [
  { slug: 'abayas',    name: 'عبايات',          palette: 'onyx' },
  { slug: 'winter',    name: 'عبايات شتوية',    palette: 'midnight' },
  { slug: 'occasions', name: 'عبايات مناسبات',  palette: 'rose' },
  { slug: 'practical', name: 'عباية عملية',     palette: 'taupe' },
  { slug: 'niqab',     name: 'نقابات',          palette: 'charcoal' },
  { slug: 'sale',      name: 'تخفيضات',         palette: 'champagne' },
];

// ── Palette definitions (deep luxury) ──────────────
const PALETTES = {
  onyx:       { from: '#0d0d0d', via: '#1a1a1a', to: '#2a2520', accent: '#c8a96a', text: '#f5ead4' },
  charcoal:   { from: '#1c1c1c', via: '#252525', to: '#3a342c', accent: '#bd9a5f', text: '#efe2c5' },
  midnight:   { from: '#0a0f1a', via: '#161e2e', to: '#2c2438', accent: '#a4895a', text: '#e8dec3' },
  rose:       { from: '#241419', via: '#3a212a', to: '#5a3a3f', accent: '#cfa687', text: '#f6e6d8' },
  champagne:  { from: '#1a1610', via: '#2c241a', to: '#564123', accent: '#e3c084', text: '#fbeed1' },
  taupe:      { from: '#1f1b16', via: '#2e261e', to: '#4a3d2e', accent: '#c2a373', text: '#f0e3cb' },
  sand:       { from: '#2a2218', via: '#3b2f22', to: '#594632', accent: '#d8b27a', text: '#f8e9cd' },
};

/* ────────────────────────────────────────────────────
 *  SVG generator — luxury editorial card
 * ────────────────────────────────────────────────────*/
function makeProductSVG({ width, height, code, name, palette, angle }) {
  const p = PALETTES[palette] ?? PALETTES.onyx;
  const id = code.replace(/[^a-zA-Z0-9]/g, '');

  // Different visual variation per angle (1 front, 2 side, 3 detail)
  const angleHints = {
    1: { silhouette: 'front', label: 'لقطة أمامية' },
    2: { silhouette: 'side',  label: 'لقطة جانبية' },
    3: { silhouette: 'detail', label: 'تفاصيل القماش' },
  };
  const hint = angleHints[angle] ?? angleHints[1];

  // Silhouette path (stylized abaya)
  const silhouettes = {
    front: `M ${width*0.5} ${height*0.18}
            C ${width*0.42} ${height*0.18}, ${width*0.36} ${height*0.22}, ${width*0.34} ${height*0.28}
            L ${width*0.20} ${height*0.42}
            L ${width*0.18} ${height*0.92}
            L ${width*0.82} ${height*0.92}
            L ${width*0.80} ${height*0.42}
            L ${width*0.66} ${height*0.28}
            C ${width*0.64} ${height*0.22}, ${width*0.58} ${height*0.18}, ${width*0.5} ${height*0.18} Z`,
    side: `M ${width*0.45} ${height*0.18}
           C ${width*0.38} ${height*0.18}, ${width*0.34} ${height*0.22}, ${width*0.34} ${height*0.30}
           L ${width*0.28} ${height*0.45}
           Q ${width*0.32} ${height*0.65}, ${width*0.36} ${height*0.92}
           L ${width*0.66} ${height*0.92}
           Q ${width*0.62} ${height*0.65}, ${width*0.58} ${height*0.45}
           L ${width*0.55} ${height*0.30}
           C ${width*0.55} ${height*0.22}, ${width*0.52} ${height*0.18}, ${width*0.45} ${height*0.18} Z`,
    detail: `M ${width*0.20} ${height*0.20}
             L ${width*0.80} ${height*0.20}
             L ${width*0.80} ${height*0.80}
             L ${width*0.20} ${height*0.80} Z`,
  };

  // Detail-mode pattern (woven texture lines)
  const detailPattern =
    hint.silhouette === 'detail'
      ? Array.from({ length: 28 }, (_, i) => {
          const y = height * 0.22 + i * (height * 0.56 / 28);
          return `<line x1="${width*0.22}" y1="${y}" x2="${width*0.78}" y2="${y}"
            stroke="${p.accent}" stroke-width="0.6" opacity="${0.18 + (i%3)*0.04}"/>`;
        }).join('')
      : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <defs>
      <linearGradient id="bg-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p.from}"/>
        <stop offset="55%" stop-color="${p.via}"/>
        <stop offset="100%" stop-color="${p.to}"/>
      </linearGradient>
      <radialGradient id="halo-${id}" cx="50%" cy="38%" r="55%">
        <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="${p.accent}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grain-${id}" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.4" fill="${p.text}" opacity="0.05"/>
        <circle cx="3" cy="2.5" r="0.3" fill="${p.text}" opacity="0.04"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg-${id})"/>
    <rect width="${width}" height="${height}" fill="url(#halo-${id})"/>
    <rect width="${width}" height="${height}" fill="url(#grain-${id})"/>

    <!-- Inner editorial frame -->
    <rect x="${width*0.04}" y="${height*0.04}" width="${width*0.92}" height="${height*0.92}"
          fill="none" stroke="${p.accent}" stroke-opacity="0.32" stroke-width="0.8"/>
    <rect x="${width*0.06}" y="${height*0.06}" width="${width*0.88}" height="${height*0.88}"
          fill="none" stroke="${p.accent}" stroke-opacity="0.16" stroke-width="0.4"/>

    <!-- Silhouette / pattern -->
    ${detailPattern}
    ${hint.silhouette !== 'detail' ? `
      <path d="${silhouettes[hint.silhouette]}"
            fill="${p.from}" fill-opacity="0.55"
            stroke="${p.accent}" stroke-opacity="0.28" stroke-width="1"/>
      <!-- soft drape lines -->
      <line x1="${width*0.5}" y1="${height*0.32}" x2="${width*0.5}" y2="${height*0.88}"
            stroke="${p.accent}" stroke-opacity="0.18" stroke-width="0.7"/>
      <line x1="${width*0.42}" y1="${height*0.40}" x2="${width*0.40}" y2="${height*0.88}"
            stroke="${p.accent}" stroke-opacity="0.12" stroke-width="0.6"/>
      <line x1="${width*0.58}" y1="${height*0.40}" x2="${width*0.60}" y2="${height*0.88}"
            stroke="${p.accent}" stroke-opacity="0.12" stroke-width="0.6"/>
    ` : ''}

    <!-- Top monogram -->
    <g transform="translate(${width/2}, ${height*0.12})">
      <circle r="22" fill="none" stroke="${p.accent}" stroke-opacity="0.4" stroke-width="0.8"/>
      <text x="0" y="6" text-anchor="middle"
        font-family="Georgia, serif" font-size="20" font-style="italic"
        fill="${p.accent}" letter-spacing="2">S</text>
    </g>

    <!-- Brand mark -->
    <text x="${width/2}" y="${height*0.94}" text-anchor="middle"
      font-family="'Aref Ruqaa', Georgia, serif" font-size="${Math.max(14, width*0.026)}"
      fill="${p.text}" opacity="0.78" letter-spacing="3">SARDAH</text>

    <!-- Code & label (bottom) -->
    <text x="${width*0.5}" y="${height*0.50}" text-anchor="middle"
      font-family="Helvetica, sans-serif" font-size="${Math.max(10, width*0.02)}"
      fill="${p.accent}" letter-spacing="6" opacity="0.85">${code}</text>
    <text x="${width*0.5}" y="${height*0.535}" text-anchor="middle"
      font-family="'Aref Ruqaa', Georgia, serif" font-size="${Math.max(11, width*0.022)}"
      fill="${p.text}" opacity="0.65" letter-spacing="2">${name}</text>

    <!-- Angle ribbon (top right) -->
    <text x="${width*0.94}" y="${height*0.07}" text-anchor="end"
      font-family="Helvetica, sans-serif" font-size="${Math.max(8, width*0.012)}"
      fill="${p.accent}" opacity="0.65" letter-spacing="3">${hint.label}</text>
  </svg>`;
}

function makeCategorySVG({ width, height, name, palette }) {
  const p = PALETTES[palette] ?? PALETTES.onyx;
  const id = palette;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <defs>
      <linearGradient id="cat-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p.from}"/>
        <stop offset="50%" stop-color="${p.via}"/>
        <stop offset="100%" stop-color="${p.to}"/>
      </linearGradient>
      <radialGradient id="cat-halo-${id}" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.30"/>
        <stop offset="100%" stop-color="${p.accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#cat-${id})"/>
    <rect width="${width}" height="${height}" fill="url(#cat-halo-${id})"/>

    <!-- Decorative lines -->
    <g stroke="${p.accent}" stroke-opacity="0.30" stroke-width="0.6" fill="none">
      <line x1="${width*0.10}" y1="${height*0.20}" x2="${width*0.90}" y2="${height*0.20}"/>
      <line x1="${width*0.10}" y1="${height*0.80}" x2="${width*0.90}" y2="${height*0.80}"/>
    </g>

    <!-- Monogram -->
    <g transform="translate(${width/2}, ${height*0.42})">
      <circle r="32" fill="none" stroke="${p.accent}" stroke-opacity="0.55" stroke-width="1.2"/>
      <text x="0" y="9" text-anchor="middle"
        font-family="Georgia, serif" font-size="28" font-style="italic"
        fill="${p.accent}" letter-spacing="3">S</text>
    </g>

    <!-- Category name -->
    <text x="${width/2}" y="${height*0.62}" text-anchor="middle"
      font-family="'Aref Ruqaa', Georgia, serif" font-size="${Math.max(20, width*0.04)}"
      fill="${p.text}" letter-spacing="4">${name}</text>
    <text x="${width/2}" y="${height*0.70}" text-anchor="middle"
      font-family="Helvetica, sans-serif" font-size="${Math.max(10, width*0.014)}"
      fill="${p.accent}" opacity="0.75" letter-spacing="6">SARDAH BOUTIQUE</text>
  </svg>`;
}

function makeIconSVG(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#1a1a1a"/>
        <stop offset="100%" stop-color="#080808"/>
      </radialGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${size*0.20}" fill="url(#bg)"/>
    <circle cx="${size/2}" cy="${size*0.46}" r="${size*0.30}" fill="none" stroke="#c8a96a" stroke-width="${size*0.012}" stroke-opacity="0.85"/>
    <text x="${size/2}" y="${size*0.55}" text-anchor="middle"
      font-family="Georgia, serif" font-size="${size*0.42}" font-style="italic"
      fill="#c8a96a">S</text>
    <text x="${size/2}" y="${size*0.82}" text-anchor="middle"
      font-family="Helvetica, sans-serif" font-size="${size*0.09}" letter-spacing="3"
      fill="#f5ead4" opacity="0.9">SARDAH</text>
  </svg>`;
}

function makeOgSVG(width = 1200, height = 630) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="og-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0d0d0d"/>
        <stop offset="50%" stop-color="#1a1a1a"/>
        <stop offset="100%" stop-color="#2a2520"/>
      </linearGradient>
      <radialGradient id="og-halo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#c8a96a" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#c8a96a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#og-bg)"/>
    <rect width="${width}" height="${height}" fill="url(#og-halo)"/>

    <!-- frame -->
    <rect x="40" y="40" width="${width-80}" height="${height-80}"
          fill="none" stroke="#c8a96a" stroke-opacity="0.5" stroke-width="1.5"/>

    <g transform="translate(${width/2}, 220)">
      <circle r="60" fill="none" stroke="#c8a96a" stroke-opacity="0.7" stroke-width="2"/>
      <text x="0" y="22" text-anchor="middle"
        font-family="Georgia, serif" font-size="70" font-style="italic"
        fill="#c8a96a">S</text>
    </g>

    <text x="${width/2}" y="380" text-anchor="middle"
      font-family="'Aref Ruqaa', Georgia, serif" font-size="84" letter-spacing="6"
      fill="#f5ead4">عبايات سـردة</text>
    <text x="${width/2}" y="450" text-anchor="middle"
      font-family="Helvetica, sans-serif" font-size="26" letter-spacing="8"
      fill="#c8a96a" opacity="0.9">SARDAH BOUTIQUE</text>
    <text x="${width/2}" y="510" text-anchor="middle"
      font-family="Helvetica, sans-serif" font-size="22"
      fill="#f5ead4" opacity="0.7" letter-spacing="3">فخامة التفاصيل وأناقة الحضور</text>
  </svg>`;
}

/* ────────────────────────────────────────────────────
 *  Main pipeline
 * ────────────────────────────────────────────────────*/
async function svgToWebp(svg, outPath, { width, height, quality = 88 } = {}) {
  await mkdir(dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: 'cover' })
    .webp({ quality, effort: 4 })
    .toFile(outPath);
}

async function svgToPng(svg, outPath, { width, height } = {}) {
  await mkdir(dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

async function generateProducts() {
  let count = 0;
  for (const product of PRODUCTS) {
    const folder = product.code.toLowerCase().replace(/[^a-z0-9]/g, '');
    const dir = join(PUBLIC, 'images', 'products', folder);
    for (let angle = 1; angle <= 3; angle++) {
      const svg = makeProductSVG({
        width: 900, height: 1200,
        code: product.code,
        name: product.name,
        palette: product.palette,
        angle,
      });
      const out = join(dir, `${folder}-${angle}.webp`);
      await svgToWebp(svg, out, { width: 900, height: 1200 });
      count++;
    }
  }
  return count;
}

async function generateCategories() {
  for (const cat of CATEGORIES) {
    const svg = makeCategorySVG({
      width: 1200, height: 1500,
      name: cat.name,
      palette: cat.palette,
    });
    const out = join(PUBLIC, 'images', 'categories', `${cat.slug}-cover.webp`);
    await svgToWebp(svg, out, { width: 1200, height: 1500 });
  }
  return CATEGORIES.length;
}

async function generateIcons() {
  const sizes = [
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon.png', size: 64 },
  ];
  for (const { name, size } of sizes) {
    const svg = makeIconSVG(size);
    const out = join(PUBLIC, 'icons', name);
    await svgToPng(svg, out, { width: size, height: size });
  }

  // Also write a favicon.ico-equivalent at root (PNG renamed)
  const favSvg = makeIconSVG(64);
  await svgToPng(favSvg, join(PUBLIC, 'favicon.ico'), { width: 64, height: 64 });

  return sizes.length;
}

async function generateOg() {
  const svg = makeOgSVG();
  const out = join(PUBLIC, 'og-image.png');
  await svgToPng(svg, out, { width: 1200, height: 630 });
  return 1;
}

async function generateManifest() {
  const manifest = {
    name: 'عبايات سردة',
    short_name: 'سردة',
    description: 'بوتيك سردة الرقمي للعبايات الفاخرة',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F8F5EF',
    theme_color: '#080808',
    lang: 'ar',
    dir: 'rtl',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  };
  await writeFile(join(PUBLIC, 'manifest.json'), JSON.stringify(manifest, null, 2));
}

(async () => {
  console.log('🎨  Generating Sardah luxury placeholders...');
  const t0 = Date.now();
  const products = await generateProducts();
  console.log(`   ✓ ${products} product images`);
  const cats = await generateCategories();
  console.log(`   ✓ ${cats} category covers`);
  const icons = await generateIcons();
  console.log(`   ✓ ${icons} icons + favicon`);
  const og = await generateOg();
  console.log(`   ✓ ${og} OG image`);
  await generateManifest();
  console.log(`   ✓ manifest.json`);
  console.log(`✨  Done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
})();
