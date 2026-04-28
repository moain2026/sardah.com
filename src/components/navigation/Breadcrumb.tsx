import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Breadcrumb — مسار التنقّل
 * ─────────────────────────────────────────────────────
 * Editorial RTL breadcrumb with optional gold separator and inverse variant.
 * Pure server component. The chevron is naturally pointing-left
 * (RTL forward direction).
 */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Render on dark backgrounds */
  inverse?: boolean;
  className?: string;
}

export function Breadcrumb({ items, inverse = false, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="مسار التنقّل"
      className={cn(
        'flex items-center flex-wrap gap-1 text-[0.7rem] tracking-[0.18em] uppercase',
        inverse ? 'text-pearl/65' : 'text-onyx-500',
        className,
      )}
    >
      <Link
        href="/"
        aria-label="الرئيسية"
        className={cn(
          'inline-flex items-center gap-1 hover:text-champagne-600 transition-colors duration-300',
          inverse && 'hover:text-champagne-300',
        )}
      >
        <Home size={11} strokeWidth={1.7} />
        <span className="hidden sm:inline">الرئيسية</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-1">
            <ChevronLeft
              size={11}
              strokeWidth={1.6}
              className={cn(
                'opacity-50',
                inverse ? 'text-champagne-300/70' : 'text-champagne-600',
              )}
              aria-hidden
            />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  'hover:text-champagne-600 transition-colors duration-300',
                  inverse && 'hover:text-champagne-300',
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'truncate max-w-[12rem] sm:max-w-[18rem]',
                  isLast
                    ? inverse
                      ? 'text-pearl'
                      : 'text-onyx font-medium'
                    : '',
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
