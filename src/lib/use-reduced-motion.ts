'use client';

import { useEffect, useState } from 'react';

/**
 * Reactive hook that mirrors the `(prefers-reduced-motion)` media query.
 * Used by all animation primitives so we ship a calm experience for users
 * who request it (motion-sensitivity, vestibular disorders, ...).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  return reduced;
}
