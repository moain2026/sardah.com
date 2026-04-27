'use client';

import { useState } from 'react';
import { Ruler } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SizeGuideModal } from './SizeGuideModal';
import type { MagneticButtonVariant } from '@/components/ui/MagneticButton';

/**
 * SizeGuideTrigger — زر يفتح SizeGuideModal
 * ─────────────────────────────────────────────────────
 * A small client wrapper that owns the open/close state of
 * the size guide modal. Useful both inside product pages and
 * the Phase 3 demo gallery.
 */
export interface SizeGuideTriggerProps {
  label?: string;
  variant?: MagneticButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  /** Pre-highlight a specific size when the modal opens */
  highlightedSize?: number;
}

export function SizeGuideTrigger({
  label = 'دليل المقاسات',
  variant = 'outline',
  size = 'sm',
  highlightedSize,
}: SizeGuideTriggerProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MagneticButton
        variant={variant}
        size={size}
        iconStart={<Ruler size={14} strokeWidth={1.7} />}
        onClick={() => setOpen(true)}
      >
        {label}
      </MagneticButton>
      <SizeGuideModal
        open={open}
        onClose={() => setOpen(false)}
        highlightedSize={highlightedSize}
      />
    </>
  );
}
