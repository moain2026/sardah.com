'use client';

/**
 * <GrainOverlay/>
 * ─────────────────────────────────────────────────────────────
 * Procedural film-grain layer rendered with an inline SVG turbulence.
 * Sits on top of any section but below interactive content; gives
 * the entire UI a subtle photographic texture (premium feel).
 */
export interface GrainOverlayProps {
  /** Opacity 0..1 (default 0.06 — barely visible). */
  opacity?: number;
  /** Stick to viewport (default true). */
  fixed?: boolean;
  /** Override z-index. */
  zIndex?: number;
  /** Force light/dark grain tone. */
  tone?: 'light' | 'dark';
}

export function GrainOverlay({
  opacity = 0.07,
  fixed = true,
  zIndex = 1,
  tone = 'light',
}: GrainOverlayProps) {
  const fill = tone === 'dark' ? '#000' : '#fff';

  return (
    <div
      aria-hidden
      className={`${fixed ? 'fixed' : 'absolute'} pointer-events-none inset-0`}
      style={{
        zIndex,
        opacity,
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' fill='${fill}'/></svg>`,
        )}")`,
        mixBlendMode: tone === 'dark' ? 'multiply' : 'overlay',
        backgroundSize: '240px 240px',
      }}
    />
  );
}
