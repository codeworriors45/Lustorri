// Product Types for Lustorri E-commerce

export type JewelryCategory = "rings" | "necklaces" | "earrings" | "bracelets" | "specials";

export type UniverseType = "moment" | "identity";

export type MetalType = "14k-yellow-gold" | "14k-white-gold" | "14k-rose-gold" | "18k-yellow-gold" | "18k-white-gold" | "18k-rose-gold" | "platinum";

export type DiamondShape = "round" | "oval" | "pear" | "marquise" | "emerald" | "cushion" | "princess" | "heart" | "radiant";

export interface ProductImage {
  url: string;
  alt: string;
  is360?: boolean;
}

export interface DiamondSpec {
  shape: DiamondShape;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  certification: "IGI" | "GIA" | "GCAL";
}

export interface ProductVariant {
  id: string;
  metal: MetalType;
  price: number;
  comparePrice?: number;
  inStock: boolean;
  sku: string;
}

export interface Universe {
  id: string;
  slug: string;
  name: string;
  type: UniverseType;
  tagline: string;
  description: string;
  story: string;
  heroImage: string;
  coverImage: string;
  color: string;
  productCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  storyCard: string;
  category: JewelryCategory;
  universeId: string;
  universe: Universe;
  images: ProductImage[];
  variants: ProductVariant[];
  diamond: DiamondSpec;
  features: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  engraving?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

// Filter Types
export interface ProductFilters {
  categories: JewelryCategory[];
  universes: string[];
  universeTypes: UniverseType[];
  metals: MetalType[];
  priceRange: [number, number];
  diamondShapes: DiamondShape[];
  sortBy: "featured" | "newest" | "price-low" | "price-high" | "bestseller";
}

// Helper function to get metal display name
export function getMetalDisplayName(metal: MetalType): string {
  const names: Record<MetalType, string> = {
    "14k-yellow-gold": "14K Yellow Gold",
    "14k-white-gold": "14K White Gold",
    "14k-rose-gold": "14K Rose Gold",
    "18k-yellow-gold": "18K Yellow Gold",
    "18k-white-gold": "18K White Gold",
    "18k-rose-gold": "18K Rose Gold",
    "platinum": "Platinum",
  };
  return names[metal];
}

// Helper function to get category display name
export function getCategoryDisplayName(category: JewelryCategory): string {
  const names: Record<JewelryCategory, string> = {
    rings: "Rings",
    necklaces: "Necklaces",
    earrings: "Earrings",
    bracelets: "Bracelets",
    specials: "Intimate Specials",
  };
  return names[category];
}

// Helper to format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
