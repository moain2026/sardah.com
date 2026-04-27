// Sardah Components — top-level barrel

// UI primitives
export * from './ui';

// Domain
export { ProductCard } from './product/ProductCard';
export type { ProductCardProps } from './product/ProductCard';
export { ProductImageFrame } from './product/ProductImageFrame';
export type { ProductImageFrameProps } from './product/ProductImageFrame';

export { CategoryCard } from './category/CategoryCard';
export type { CategoryCardProps } from './category/CategoryCard';

export { ReviewCard } from './feedback/ReviewCard';
export type { ReviewCardProps } from './feedback/ReviewCard';

// Layout
export { HeaderLuxury } from './layout/HeaderLuxury';
export { FooterEditorial } from './layout/FooterEditorial';
export { AnnouncementBar } from './layout/AnnouncementBar';

// Marketing
export { PolicyStrip } from './marketing/PolicyStrip';
export type { PolicyStripProps } from './marketing/PolicyStrip';
export { HeroSlide } from './marketing/HeroSlide';
export type { HeroSlideProps } from './marketing/HeroSlide';
export { SizeGuideModal } from './marketing/SizeGuideModal';
export type { SizeGuideModalProps } from './marketing/SizeGuideModal';
export { SizeGuideTrigger } from './marketing/SizeGuideTrigger';
export type { SizeGuideTriggerProps } from './marketing/SizeGuideTrigger';
