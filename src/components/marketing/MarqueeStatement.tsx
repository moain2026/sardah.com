'use client';

import { Marquee } from '@/components/motion/Marquee';
import { GrainOverlay } from '@/components/motion/GrainOverlay';
import { cn } from '@/lib/utils';

export interface MarqueeStatementProps {
  items?: string[];
  speed?: number;
  reverse?: boolean;
  /** Variant: solid onyx (luxe) or pearl (light). */
  tone?: 'onyx' | 'pearl' | 'champagne';
  className?: string;
}

/**
 * <MarqueeStatement/>
 * ─────────────────────────────────────────────────────────────
 * Big editorial marquee strip used between sections — replaces
 * the small <PolicyStrip/> in places where we want a stronger
 * brand-statement moment (à la Saint Laurent / Hermès headers).
 */
export function MarqueeStatement({
  items = [
    'سردة ✦ صنع يد',
    'فخامة بإمضاء سعودي',
    'خياطة نظيفة',
    'أقمشة مختارة',
    'بصمتك الخاصة',
    'شحن مجاني',
  ],
  speed = 40,
  reverse = false,
  tone = 'onyx',
  className,
}: MarqueeStatementProps) {
  const colorMap = {
    onyx: 'bg-onyx-950 text-pearl-50',
    pearl: 'bg-pearl-50 text-onyx-950',
    champagne: 'bg-champagne-400 text-onyx-950',
  };

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden border-y',
        tone === 'onyx' && 'border-pearl-50/10',
        tone === 'pearl' && 'border-onyx-950/10',
        tone === 'champagne' && 'border-onyx-950/15',
        colorMap[tone],
        className,
      )}
      aria-hidden
    >
      {tone === 'onyx' && <GrainOverlay tone="dark" opacity={0.08} fixed={false} />}

      <div className="relative py-7 md:py-10">
        <Marquee speed={speed} reverse={reverse} fadeEdges={false} gap={6}>
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-8 font-ruqaa text-[clamp(1.6rem,3.4vw,3rem)] leading-none"
            >
              <span className="whitespace-nowrap">{item}</span>
              <span
                className={cn(
                  'inline-block text-2xl',
                  tone === 'onyx' && 'text-champagne-300',
                  tone === 'pearl' && 'text-champagne-500',
                  tone === 'champagne' && 'text-onyx-950/70',
                )}
              >
                ✦
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
