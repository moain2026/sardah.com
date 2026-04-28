// Sardah Components — top-level barrel

// UI primitives
export * from './ui';

// Domain — product
export { ProductCard } from './product/ProductCard';
export type { ProductCardProps } from './product/ProductCard';
export { ProductImageFrame } from './product/ProductImageFrame';
export type { ProductImageFrameProps } from './product/ProductImageFrame';
export { ProductGallery } from './product/ProductGallery';
export type { ProductGalleryProps } from './product/ProductGallery';
export { ProductPurchasePanel } from './product/ProductPurchasePanel';
export type { ProductPurchasePanelProps } from './product/ProductPurchasePanel';
export { CutSelector } from './product/CutSelector';
export type { CutSelectorProps } from './product/CutSelector';
export { SizeSelector } from './product/SizeSelector';
export type { SizeSelectorProps } from './product/SizeSelector';

// Domain — category
export { CategoryCard } from './category/CategoryCard';
export type { CategoryCardProps } from './category/CategoryCard';
export { CategoryToolbar } from './category/CategoryToolbar';
export type { CategoryToolbarProps } from './category/CategoryToolbar';

// Domain — cart
export { QuantityStepper } from './cart/QuantityStepper';
export type { QuantityStepperProps } from './cart/QuantityStepper';
export { CartDrawer } from './cart/CartDrawer';
export { CartLineItem } from './cart/CartLineItem';
export type { CartLineItemProps } from './cart/CartLineItem';
export { CartSummary } from './cart/CartSummary';
export type { CartSummaryProps } from './cart/CartSummary';
export { CartView } from './cart/CartView';
export { CheckoutForm } from './cart/CheckoutForm';
export { OrderConfirmationView } from './cart/OrderConfirmationView';

// Navigation
export { Breadcrumb } from './navigation/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './navigation/Breadcrumb';

// Feedback
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
