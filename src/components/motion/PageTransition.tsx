'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { pageVariants } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

/**
 * <PageTransition/>
 * ─────────────────────────────────────────────────────────────
 * Wraps children with a smooth route-change animation:
 *   • subtle fade + 12px upward drift on enter
 *   • brief opacity-only exit
 *   • respects prefers-reduced-motion
 * Mounted once globally inside <RootLayout/>.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
