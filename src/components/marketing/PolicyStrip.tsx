'use client';

import { Clock, Wallet, Shield, Sparkles, Truck, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PolicyPoint } from '@/lib/policy';
import { POLICY_STRIP } from '@/lib/policy';
import { cn } from '@/lib/utils';

/**
 * PolicyStrip — شريط ضمانات البوتيك
 * ─────────────────────────────────────────────────────
 * Shown on the homepage and inside the cart drawer to communicate
 * the four/five reassurance points (delivery, payment, exchange…).
 */

export interface PolicyStripProps {
  variant?: 'light' | 'onyx';
  /** Limit number of points (default = all in POLICY_STRIP) */
  limit?: number;
  /** Compact mode for cart sidebar */
  dense?: boolean;
  className?: string;
}

const ICON_MAP: Record<PolicyPoint['icon'], typeof Clock> = {
  clock: Clock,
  wallet: Wallet,
  shield: Shield,
  sparkles: Sparkles,
  truck: Truck,
  lock: Lock,
};

export function PolicyStrip({
  variant = 'light',
  limit,
  dense = false,
  className,
}: PolicyStripProps) {
  const points = limit ? POLICY_STRIP.slice(0, limit) : POLICY_STRIP;

  return (
    <ul
      className={cn(
        'grid gap-px overflow-hidden rounded-luxe',
        dense
          ? 'grid-cols-2'
          : 'grid-cols-2 md:grid-cols-4',
        variant === 'onyx'
          ? 'bg-pearl/12 border border-pearl/15'
          : 'bg-onyx/8 border border-onyx/8',
        className,
      )}
      aria-label="ضمانات سردة"
    >
      {points.map((point, i) => {
        const Icon = ICON_MAP[point.icon];
        return (
          <motion.li
            key={point.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'flex flex-col items-center text-center gap-2.5',
              dense ? 'p-4' : 'p-6 md:p-7',
              variant === 'onyx' ? 'bg-onyx text-pearl' : 'bg-pearl text-onyx',
            )}
          >
            <span
              className={cn(
                'inline-flex items-center justify-center rounded-full',
                dense ? 'h-9 w-9' : 'h-11 w-11',
                variant === 'onyx'
                  ? 'bg-pearl/8 text-champagne-300'
                  : 'bg-onyx/5 text-champagne-700',
              )}
            >
              <Icon size={dense ? 16 : 18} strokeWidth={1.6} />
            </span>
            <h4
              className={cn(
                'font-tajawal font-semibold leading-tight',
                dense ? 'text-xs' : 'text-sm',
              )}
            >
              {point.title}
            </h4>
            <p
              className={cn(
                'leading-loose text-balance',
                dense ? 'text-[0.7rem]' : 'text-xs',
                variant === 'onyx' ? 'text-pearl/70' : 'text-onyx-500',
              )}
            >
              {point.body}
            </p>
          </motion.li>
        );
      })}
    </ul>
  );
}
