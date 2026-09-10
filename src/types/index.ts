// ============================================================
// Product Types
// ============================================================

export interface ProductDetails {
  sareeLength: string;
  blouseLength: string;
  blouseIncluded: boolean;
  weight?: string;
  careInstructions?: string;
  work?: string;
  border?: string;
  weave?: string;
}

export interface Product {
  id: string;
  productNumber: string;
  name: string;
  collection: string;
  collectionSlug: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  fabric: string;
  color: string;
  secondaryColors: string[];
  design: string;
  style: string;
  occasion: string[];
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  description: string;
  details: ProductDetails;
  images: string[];
  tags: string[];
  featured: boolean;
  newArrival: boolean;
  mostOrdered: boolean;
  dateAdded: string;
}

// ============================================================
// Collection Types
// ============================================================

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  productPrefix: string;
  featured: boolean;
  order: number;
}

// ============================================================
// Filter Types
// ============================================================

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterCategory {
  id: string;
  name: string;
  key: keyof Product | 'priceRange' | 'occasion';
  options: FilterOption[];
  type: 'checkbox' | 'range';
}

export interface ActiveFilters {
  [key: string]: string[];
}

export interface PriceRange {
  min: number;
  max: number;
  label: string;
}

// ============================================================
// Cart Types
// ============================================================

export interface CartItem {
  product: Product;
  quantity: number;
}

// ============================================================
// Sort Types
// ============================================================

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'name-az'
  | 'most-ordered';

export interface SortOptionConfig {
  value: SortOption;
  label: string;
}

// ============================================================
// Navigation Types
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ============================================================
// Site Config Types
// ============================================================

export interface SiteConfig {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  currency: string;
  currencySymbol: string;
  announcementMessages: string[];
  promoMessages: string[];
  socialLinks: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// ============================================================
// Hero / Banner Types
// ============================================================

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
  image: string;
  overlayColor?: string;
}
