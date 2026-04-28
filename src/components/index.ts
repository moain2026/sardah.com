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

// Marketing — luxury 2026 upgrade
export { HeroCinematic } from './marketing/HeroCinematic';
export type { HeroCinematicProps } from './marketing/HeroCinematic';
export { EditorialStory } from './marketing/EditorialStory';
export { CollectionShowcase } from './marketing/CollectionShowcase';
export type { CollectionShowcaseProps } from './marketing/CollectionShowcase';
export { FeaturedSelection } from './marketing/FeaturedSelection';
export type { FeaturedSelectionProps } from './marketing/FeaturedSelection';
export { MarqueeStatement } from './marketing/MarqueeStatement';
export type { MarqueeStatementProps } from './marketing/MarqueeStatement';
export { ReviewsCinema } from './marketing/ReviewsCinema';
export type { ReviewsCinemaProps } from './marketing/ReviewsCinema';
export { CtaCinematic } from './marketing/CtaCinematic';
export type { CtaCinematicProps } from './marketing/CtaCinematic';
export { SaleSpotlight } from './marketing/SaleSpotlight';
export type { SaleSpotlightProps } from './marketing/SaleSpotlight';

// Motion primitives
export {
  Reveal,
  SplitText,
  Marquee,
  ParallaxImage,
  MagneticDeep,
  ScrollProgress,
  CustomCursor,
  PageTransition,
  GrainOverlay,
  GradientMesh,
} from './motion';
export type {
  RevealProps,
  RevealDirection,
  SplitTextProps,
  MarqueeProps,
  ParallaxImageProps,
  MagneticDeepProps,
  GrainOverlayProps,
  GradientMeshProps,
} from './motion';
