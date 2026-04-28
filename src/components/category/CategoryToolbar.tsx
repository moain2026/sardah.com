'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Product, ProductFilterState, ProductSortOption } from '@/types/product';
import { filterProducts, sortProducts } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';

/**
 * CategoryToolbar — شريط فرز وفلترة + شبكة منتجات
 * ─────────────────────────────────────────────────────
 * The single client interaction surface for /categories/[slug].
 * Owns: sort key + filters + an off-canvas drawer for filters
 * (mobile) or persistent sidebar (desktop ≥ lg).
 *
 * Accepts the full pre-narrowed product list from the page (server),
 * applies sort/filter in-memory, and renders the grid.
 */

export interface CategoryToolbarProps {
  products: readonly Product[];
  /** All distinct fabrics in the category (from server) */
  fabrics: readonly string[];
  /** All cuts available in this category (from server) */
  cuts: readonly { cut: string; label: string }[];
  /** Min/max price bounds in the category */
  priceBounds: { min: number; max: number };
  className?: string;
}

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: 'recommended', label: 'الأكثر ملاءمة' },
  { value: 'best-selling', label: 'الأكثر طلباً' },
  { value: 'top-rated', label: 'الأعلى تقييماً' },
  { value: 'newest', label: 'الأحدث' },
  { value: 'price-asc', label: 'السعر: من الأقل' },
  { value: 'price-desc', label: 'السعر: من الأعلى' },
];

export function CategoryToolbar({
  products,
  fabrics,
  cuts,
  priceBounds,
  className,
}: CategoryToolbarProps) {
  const [sort, setSort] = useState<ProductSortOption>('recommended');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedCuts, setSelectedCuts] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(priceBounds.max);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  // Lock scroll while drawer is open
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const filters: ProductFilterState = useMemo(
    () => ({
      fabrics: selectedFabrics.length ? selectedFabrics : undefined,
      // The store's filter expects AbayaCut[], but we keep it loose here
      // and rely on the lib filter's runtime check.
      cuts: selectedCuts.length ? (selectedCuts as never) : undefined,
      priceMin: priceBounds.min,
      priceMax,
      inStockOnly: inStockOnly || undefined,
      onSaleOnly: onSaleOnly || undefined,
    }),
    [
      selectedFabrics,
      selectedCuts,
      priceMax,
      inStockOnly,
      onSaleOnly,
      priceBounds.min,
    ],
  );

  const visible = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sort);
  }, [products, filters, sort]);

  const activeFilterCount =
    selectedFabrics.length +
    selectedCuts.length +
    (priceMax < priceBounds.max ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0);

  const resetFilters = () => {
    setSelectedFabrics([]);
    setSelectedCuts([]);
    setPriceMax(priceBounds.max);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const toggleFromArray = (
    arr: string[],
    setter: (v: string[]) => void,
    value: string,
  ) => {
    if (arr.includes(value)) setter(arr.filter((v) => v !== value));
    else setter([...arr, value]);
  };

  /* ───────── render ───────── */

  return (
    <div className={cn('grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-10', className)}>
      {/* Sidebar — desktop only */}
      <aside className="hidden lg:block">
        <FilterPanel
          fabrics={fabrics}
          cuts={cuts}
          priceBounds={priceBounds}
          selectedFabrics={selectedFabrics}
          selectedCuts={selectedCuts}
          priceMax={priceMax}
          inStockOnly={inStockOnly}
          onSaleOnly={onSaleOnly}
          onToggleFabric={(f) =>
            toggleFromArray(selectedFabrics, setSelectedFabrics, f)
          }
          onToggleCut={(c) => toggleFromArray(selectedCuts, setSelectedCuts, c)}
          onPriceMax={setPriceMax}
          onInStock={setInStockOnly}
          onSale={setOnSaleOnly}
          onReset={resetFilters}
        />
      </aside>

      {/* Right column */}
      <div className="min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-onyx/8">
          <div className="flex items-center gap-2">
            {/* Mobile filter button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 rounded-luxe border border-onyx/15 bg-pearl px-3.5 py-2 text-sm hover:border-onyx transition-colors"
              aria-label="فتح الفلاتر"
            >
              <SlidersHorizontal size={14} strokeWidth={1.7} />
              فلاتر
              {activeFilterCount > 0 && (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-onyx text-pearl text-[0.6rem] font-semibold px-1 nums-latin">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <span className="text-xs text-onyx-500 nums-latin">
              {visible.length} {visible.length === 1 ? 'منتج' : 'منتج'}
            </span>
          </div>

          {/* Sort dropdown */}
          <label className="relative inline-flex items-center">
            <span className="sr-only">ترتيب المنتجات</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as ProductSortOption)}
              className="appearance-none cursor-pointer rounded-luxe border border-onyx/15 bg-pearl ps-3 pe-9 py-2 text-sm font-tajawal hover:border-onyx focus:outline-none focus:border-champagne-500 transition-colors"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              strokeWidth={1.7}
              className="absolute end-3 pointer-events-none text-onyx-500"
            />
          </label>
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7">
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="filter-overlay"
              className="fixed inset-0 z-[70] bg-onyx/55 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <motion.aside
              key="filter-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="فلاتر المنتجات"
              className="fixed inset-y-0 end-0 z-[80] w-[88%] max-w-[360px] bg-pearl shadow-editorial overflow-hidden lg:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between p-5 border-b border-onyx/8">
                <span className="font-ruqaa text-2xl">فلاتر</span>
                <button
                  type="button"
                  className="p-2 -me-2 rounded-luxe hover:bg-onyx/5"
                  aria-label="إغلاق"
                  onClick={() => setDrawerOpen(false)}
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <FilterPanel
                  fabrics={fabrics}
                  cuts={cuts}
                  priceBounds={priceBounds}
                  selectedFabrics={selectedFabrics}
                  selectedCuts={selectedCuts}
                  priceMax={priceMax}
                  inStockOnly={inStockOnly}
                  onSaleOnly={onSaleOnly}
                  onToggleFabric={(f) =>
                    toggleFromArray(selectedFabrics, setSelectedFabrics, f)
                  }
                  onToggleCut={(c) =>
                    toggleFromArray(selectedCuts, setSelectedCuts, c)
                  }
                  onPriceMax={setPriceMax}
                  onInStock={setInStockOnly}
                  onSale={setOnSaleOnly}
                  onReset={resetFilters}
                />
              </div>
              <div className="p-5 border-t border-onyx/8 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="rounded-luxe border border-onyx/15 py-3 text-sm hover:bg-onyx/5"
                  onClick={resetFilters}
                >
                  إعادة الضبط
                </button>
                <button
                  type="button"
                  className="rounded-luxe bg-onyx text-pearl py-3 text-sm hover:bg-onyx-700"
                  onClick={() => setDrawerOpen(false)}
                >
                  عرض {visible.length} منتج
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Filter panel (shared between sidebar and drawer)
   ───────────────────────────────────────────────────── */

interface FilterPanelProps {
  fabrics: readonly string[];
  cuts: readonly { cut: string; label: string }[];
  priceBounds: { min: number; max: number };
  selectedFabrics: string[];
  selectedCuts: string[];
  priceMax: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  onToggleFabric: (f: string) => void;
  onToggleCut: (c: string) => void;
  onPriceMax: (n: number) => void;
  onInStock: (v: boolean) => void;
  onSale: (v: boolean) => void;
  onReset: () => void;
}

function FilterPanel({
  fabrics,
  cuts,
  priceBounds,
  selectedFabrics,
  selectedCuts,
  priceMax,
  inStockOnly,
  onSaleOnly,
  onToggleFabric,
  onToggleCut,
  onPriceMax,
  onInStock,
  onSale,
  onReset,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-7 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between hidden lg:flex">
        <h3 className="font-ruqaa text-xl">الفلاتر</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-champagne-700 hover:text-champagne-500 transition-colors"
        >
          إعادة الضبط
        </button>
      </div>

      {/* Quick toggles */}
      <section className="flex flex-col gap-2">
        <CheckRow
          label="المتوفر فقط"
          checked={inStockOnly}
          onChange={onInStock}
        />
        <CheckRow
          label="المخفّض فقط"
          checked={onSaleOnly}
          onChange={onSale}
        />
      </section>

      <div className="gold-divider" />

      {/* Price */}
      <section>
        <h4 className="font-tajawal text-xs font-semibold tracking-wider mb-3">
          السعر الأقصى
        </h4>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={5}
          value={priceMax}
          onChange={(e) => onPriceMax(Number(e.target.value))}
          aria-label="السعر الأقصى"
          className="w-full accent-champagne-500"
        />
        <div className="flex justify-between mt-2 text-xs text-onyx-500 nums-latin">
          <span>{priceBounds.min} ر.س</span>
          <span className="font-medium text-onyx">حتى {priceMax} ر.س</span>
        </div>
      </section>

      {/* Fabrics */}
      {fabrics.length > 0 && (
        <section>
          <h4 className="font-tajawal text-xs font-semibold tracking-wider mb-3">
            القماش
          </h4>
          <ul className="flex flex-col gap-1.5">
            {fabrics.map((f) => (
              <li key={f}>
                <CheckRow
                  label={f}
                  checked={selectedFabrics.includes(f)}
                  onChange={() => onToggleFabric(f)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Cuts */}
      {cuts.length > 0 && (
        <section>
          <h4 className="font-tajawal text-xs font-semibold tracking-wider mb-3">
            القصة
          </h4>
          <ul className="flex flex-col gap-1.5">
            {cuts.map((c) => (
              <li key={c.cut}>
                <CheckRow
                  label={c.label}
                  checked={selectedCuts.includes(c.cut)}
                  onChange={() => onToggleCut(c.cut)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2.5 py-1 cursor-pointer group">
      <span
        className={cn(
          'inline-flex h-4 w-4 items-center justify-center rounded-[3px] border transition-colors',
          checked
            ? 'border-onyx bg-onyx text-pearl'
            : 'border-onyx/30 bg-pearl group-hover:border-onyx',
        )}
        aria-hidden
      >
        {checked && (
          <svg
            viewBox="0 0 12 12"
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M2.5 6.5L5 9L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="text-sm text-onyx-700 group-hover:text-onyx transition-colors">
        {label}
      </span>
    </label>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="font-ruqaa text-3xl text-onyx">لم نجد نتائج مطابقة</div>
      <p className="max-w-sm text-sm text-onyx-500 leading-loose">
        جرّبي تخفيف الفلاتر للاطلاع على المزيد من القطع المتاحة.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="magnetic-button magnetic-button-outline"
      >
        إعادة ضبط الفلاتر
      </button>
    </div>
  );
}
