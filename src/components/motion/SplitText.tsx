'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { EASE_LUXE, viewportOnce } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface SplitTextProps {
  text: string;
  /** Split per-word (default) or per-char (heavier, use sparingly). */
  mode?: 'word' | 'char';
  /** Stagger between sub-elements in seconds. */
  stagger?: number;
  /** Initial delay before the sequence starts. */
  delay?: number;
  /** Per-element animation duration. */
  duration?: number;
  /** Hidden Y offset, in % of element height. */
  yOffset?: string;
  /** HTML element to render the wrapper as. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  /** Optional className applied to every word/char span. */
  itemClassName?: string;
  /** Replay each time it enters viewport. */
  repeat?: boolean;
}

/**
 * <SplitText/>
 * ─────────────────────────────────────────────────────────────
 * Editorial kinetic typography: each word/char rises from below an
 * invisible mask. Used in hero headlines, section titles & quotes.
 *
 * RTL-safe: spaces are preserved as &nbsp;, words are styled inline-block.
 */
export function SplitText({
  text,
  mode = 'word',
  stagger = 0.06,
  delay = 0,
  duration = 0.9,
  yOffset = '110%',
  as: Tag = 'span',
  className,
  itemClassName,
  repeat = false,
}: SplitTextProps) {
  const reduced = usePrefersReducedMotion();

  const tokens = useMemo(() => {
    return text.split(' ').map((word, wi) => ({
      type: 'word' as const,
      word,
      chars: mode === 'char' ? Array.from(word) : null,
      wi,
    }));
  }, [text, mode]);

  if (reduced) {
    const Static = Tag as 'span';
    return <Static className={className}>{text}</Static>;
  }

  const Wrapper = motion[Tag as 'span'] as typeof motion.span;

  return (
    <Wrapper
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={repeat ? { once: false, margin: '0px 0px -10% 0px' } : viewportOnce}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      aria-label={text}
    >
      {tokens.map((tok, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          aria-hidden="true"
        >
          {mode === 'char' && tok.chars
            ? tok.chars.map((ch, ci) => (
                <motion.span
                  key={ci}
                  className={cn('inline-block will-change-transform', itemClassName)}
                  variants={{
                    hidden: { y: yOffset, opacity: 0 },
                    show: {
                      y: '0%',
                      opacity: 1,
                      transition: { duration, ease: EASE_LUXE },
                    },
                  }}
                >
                  {ch}
                </motion.span>
              ))
            : (
              <motion.span
                className={cn('inline-block will-change-transform', itemClassName)}
                variants={{
                  hidden: { y: yOffset, opacity: 0 },
                  show: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration, ease: EASE_LUXE },
                  },
                }}
              >
                {tok.word}
              </motion.span>
            )}
          {/* preserve spacing between words */}
          {i < tokens.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Wrapper>
  );
}
