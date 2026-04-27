'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { forwardRef, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * MagneticButton — زر مغناطيسي فاخر
 * ─────────────────────────────────────────────────────
 * Sardah-grade CTA with optional magnetic hover (mouse follows
 * the button slightly), four visual variants, and three sizes.
 *
 * Renders as <button>, <a> (external), or <Link> (internal route)
 * via discriminated `href` / `onClick` props.
 */

export type MagneticButtonVariant =
  | 'onyx' // dark filled (default)
  | 'gold' // champagne gradient
  | 'outline' // transparent → onyx on hover
  | 'light' // pearl on dark backgrounds
  | 'ghost'; // text-only with underline reveal

export type MagneticButtonSize = 'sm' | 'md' | 'lg';

export interface MagneticButtonProps {
  variant?: MagneticButtonVariant;
  size?: MagneticButtonSize;
  /** Disable the magnetic hover effect (e.g. for keyboard-only users) */
  noMagnet?: boolean;
  /** Internal route (Next Link) */
  href?: string;
  /** External URL — uses native <a target="_blank"> */
  externalHref?: string;
  /** Render full width */
  block?: boolean;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /** Disable button */
  disabled?: boolean;
  /** Optional icon at the start (right side in RTL) */
  iconStart?: ReactNode;
  /** Optional icon at the end (left side in RTL) */
  iconEnd?: ReactNode;
  /** Aria label override */
  ariaLabel?: string;
  /** Type override (button only) */
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<MagneticButtonVariant, string> = {
  onyx: 'magnetic-button',
  gold: 'magnetic-button magnetic-button-gold',
  outline: 'magnetic-button magnetic-button-outline',
  light: 'magnetic-button magnetic-button-light',
  ghost:
    'inline-flex items-center gap-2 text-sm font-medium tracking-wide text-onyx hover:text-champagne-600 transition-colors duration-300 group',
};

const SIZE_CLASSES: Record<MagneticButtonSize, string> = {
  sm: 'text-xs px-5 py-2.5',
  md: 'text-sm px-7 py-3',
  lg: 'text-base px-9 py-4',
};

/* ─────────────────────────────────────────────────────
   Magnetic motion controller
   ───────────────────────────────────────────────────── */

function useMagnet(strength = 14) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set((px / rect.width) * strength);
    y.set((py / rect.height) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { sx, sy, onMove, onLeave };
}

/* ─────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────── */

export const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(
  function MagneticButton(
    {
      variant = 'onyx',
      size = 'md',
      noMagnet = false,
      href,
      externalHref,
      block = false,
      onClick,
      disabled = false,
      iconStart,
      iconEnd,
      ariaLabel,
      type = 'button',
      className,
      children,
    },
    ref,
  ) {
    const { sx, sy, onMove, onLeave } = useMagnet();
    const innerX = useTransform(sx, (v) => v * 0.4);
    const innerY = useTransform(sy, (v) => v * 0.4);
    const containerRef = useRef<HTMLElement>(null);

    const classes = cn(
      VARIANT_CLASSES[variant],
      variant !== 'ghost' && SIZE_CLASSES[size],
      block && 'w-full justify-center',
      disabled && 'pointer-events-none opacity-50',
      className,
    );

    const inner = (
      <motion.span
        className="relative inline-flex items-center gap-2"
        style={!noMagnet ? { x: innerX, y: innerY } : undefined}
      >
        {iconStart && (
          <span className="inline-flex items-center" aria-hidden>
            {iconStart}
          </span>
        )}
        <span>{children}</span>
        {iconEnd && (
          <span className="inline-flex items-center transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
            {iconEnd}
          </span>
        )}
        {variant === 'ghost' && (
          <span className="absolute -bottom-0.5 inset-x-0 h-px bg-current scale-x-0 origin-left transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
        )}
      </motion.span>
    );

    const motionProps = !noMagnet
      ? {
          style: { x: sx, y: sy },
          onMouseMove: onMove,
          onMouseLeave: onLeave,
        }
      : {};

    if (externalHref) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
          onClick={onClick}
          {...motionProps}
        >
          {inner}
        </motion.a>
      );
    }

    if (href) {
      return (
        <motion.span ref={ref} {...motionProps} className="inline-flex">
          <Link
            href={href}
            className={classes}
            aria-label={ariaLabel}
            onClick={onClick}
          >
            {inner}
          </Link>
        </motion.span>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        disabled={disabled}
        aria-label={ariaLabel}
        onClick={onClick}
        {...motionProps}
      >
        {inner}
      </motion.button>
    );
  },
);
