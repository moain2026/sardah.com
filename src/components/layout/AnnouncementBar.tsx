'use client';

import { Sparkles, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * AnnouncementBar — شريط إعلان فاخر
 * ─────────────────────────────────────────────────────
 * Top-most strip on every page. Marquee on small screens,
 * static centered on large. Onyx with champagne accents.
 */

export interface AnnouncementBarProps {
  className?: string;
}

const MESSAGES = [
  {
    icon: Sparkles,
    text: 'أقمشة كورية مختارة · خياطة نظيفة · بصمتك الخاصة',
  },
  {
    icon: MessageCircle,
    text: 'لطلبك أو استفسارك — تواصلي معنا عبر واتساب',
  },
  {
    icon: Heart,
    text: 'بوتيك سعودي يصنع العباية بهدوء وعناية',
  },
];

export function AnnouncementBar({ className }: AnnouncementBarProps) {
  return (
    <div
      className={cn(
        'relative w-full bg-onyx text-pearl overflow-hidden',
        'h-[var(--announcement-h)] flex items-center',
        className,
      )}
      role="region"
      aria-label="إعلانات المتجر"
    >
      {/* Subtle gold accent line at the bottom */}
      <span className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" aria-hidden />

      {/* Desktop — static centered */}
      <div className="hidden md:flex w-full justify-center items-center gap-10 px-6 text-[0.72rem] tracking-[0.18em]">
        {MESSAGES.map(({ icon: Icon, text }, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <Icon size={12} strokeWidth={1.8} className="text-champagne-300" />
            <span>{text}</span>
          </span>
        ))}
      </div>

      {/* Mobile — marquee */}
      <div className="md:hidden flex w-full overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex shrink-0 items-center gap-10 px-4 text-[0.7rem] tracking-[0.16em]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 28,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...MESSAGES, ...MESSAGES].map(({ icon: Icon, text }, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <Icon size={11} strokeWidth={1.8} className="text-champagne-300" />
              <span>{text}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
