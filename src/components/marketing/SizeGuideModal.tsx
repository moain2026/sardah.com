'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Info } from 'lucide-react';
import { useEffect } from 'react';
import { SIZE_GUIDE, CUT_EXPLANATIONS, SIZE_TIPS } from '@/lib/sizeGuide';
import { cn } from '@/lib/utils';

/**
 * SizeGuideModal — دليل المقاسات
 * ─────────────────────────────────────────────────────
 * Display-only modal that surfaces the Sardah size table,
 * cut explanations, and sizing tips. Open/close fully controlled.
 */

export interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  /** Highlight the size the customer currently has selected */
  highlightedSize?: number;
}

export function SizeGuideModal({
  open,
  onClose,
  highlightedSize,
}: SizeGuideModalProps) {
  // Lock body scroll while open + ESC to close
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="size-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-onyx/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Dialog */}
          <motion.div
            key="size-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex items-end md:items-center justify-center p-0 md:p-6"
          >
            <div className="relative w-full md:max-w-3xl bg-pearl rounded-t-sheet md:rounded-sheet shadow-editorial overflow-hidden flex flex-col max-h-[92vh]">
              {/* Header */}
              <div className="relative flex items-center justify-between px-6 md:px-8 py-5 border-b border-onyx/8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-onyx text-champagne-300">
                    <Ruler size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h2
                      id="size-guide-title"
                      className="font-ruqaa text-2xl text-onyx leading-none"
                    >
                      دليل المقاسات
                    </h2>
                    <span className="block text-[0.7rem] tracking-[0.28em] uppercase text-taupe mt-1">
                      Sardah Size Guide
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="إغلاق"
                  className="p-2 -me-2 rounded-luxe hover:bg-onyx/5 transition-colors"
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>

              {/* Body — scrollable */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-9">
                {/* Size table */}
                <section>
                  <h3 className="font-ruqaa text-xl mb-4 text-onyx">جدول المقاسات</h3>
                  <div className="overflow-x-auto rounded-luxe border border-onyx/8">
                    <table className="w-full text-sm text-start nums-latin">
                      <thead className="bg-onyx text-pearl">
                        <tr>
                          <th className="px-4 py-3 text-start font-tajawal font-semibold text-xs tracking-wider">
                            المقاس
                          </th>
                          <th className="px-4 py-3 text-start font-tajawal text-xs tracking-wider">
                            الطول (سم)
                          </th>
                          <th className="px-4 py-3 text-start font-tajawal text-xs tracking-wider">
                            الصدر
                          </th>
                          <th className="px-4 py-3 text-start font-tajawal text-xs tracking-wider hidden sm:table-cell">
                            الكم
                          </th>
                          <th className="px-4 py-3 text-start font-tajawal text-xs tracking-wider hidden md:table-cell">
                            الكتف
                          </th>
                          <th className="px-4 py-3 text-start font-tajawal text-xs tracking-wider hidden md:table-cell">
                            الطول المقترح
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-onyx/8">
                        {SIZE_GUIDE.map((row) => {
                          const isActive = highlightedSize === row.size;
                          return (
                            <tr
                              key={row.size}
                              className={cn(
                                'transition-colors',
                                isActive
                                  ? 'bg-champagne/12 font-medium'
                                  : 'hover:bg-onyx/3',
                              )}
                            >
                              <td className="px-4 py-3.5 font-semibold text-onyx">
                                {row.label}{' '}
                                <span className="text-[0.65rem] text-taupe ms-1">
                                  ({row.size})
                                </span>
                              </td>
                              <td className="px-4 py-3.5 text-onyx-700">{row.length}</td>
                              <td className="px-4 py-3.5 text-onyx-700">{row.chest}</td>
                              <td className="px-4 py-3.5 text-onyx-700 hidden sm:table-cell">
                                {row.sleeve}
                              </td>
                              <td className="px-4 py-3.5 text-onyx-700 hidden md:table-cell">
                                {row.shoulder}
                              </td>
                              <td className="px-4 py-3.5 text-onyx-500 hidden md:table-cell text-xs">
                                {row.recommendedHeight}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Cut explanations */}
                <section>
                  <h3 className="font-ruqaa text-xl mb-4 text-onyx">شرح القصات</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {CUT_EXPLANATIONS.map((c) => (
                      <div
                        key={c.cut}
                        className="rounded-luxe border border-onyx/8 p-4 hover:border-champagne-400/40 transition-colors duration-500"
                      >
                        <h4 className="font-tajawal font-semibold text-onyx mb-1.5 flex items-center gap-2">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-champagne-500" />
                          {c.label}
                        </h4>
                        <p className="text-xs text-onyx-500 leading-loose">
                          {c.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tips */}
                <section className="rounded-luxe bg-sand/40 border border-champagne/30 p-5">
                  <h3 className="font-ruqaa text-lg text-onyx mb-3 flex items-center gap-2">
                    <Info size={16} className="text-champagne-700" />
                    نصائح لاختيار المقاس
                  </h3>
                  <ul className="space-y-2 text-sm text-onyx-700 leading-loose">
                    {SIZE_TIPS.map((tip, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-champagne-700 select-none">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
