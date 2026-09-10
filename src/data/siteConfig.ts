import type { SiteConfig, HeroBanner } from '../types';

export const siteConfig: SiteConfig = {
  brandName: 'VASTHRAM',
  tagline: 'Timeless Elegance, Woven for You',
  whatsappNumber: '919876543210',
  currency: 'INR',
  currencySymbol: '₹',
  announcementMessages: [
    'Free Shipping Across India Above ₹2,500',
    'International Shipping Starts at ₹999',
  ],
  promoMessages: [
    'Free Shipping Across India Above ₹2,500',
    'International Shipping Starting at ₹999',
    'Handpicked Sarees for Every Occasion',
    'New Collection Now Available',
    'Crafted with Love — From Loom to You',
    'Celebrate Every Moment in Elegance',
  ],
  socialLinks: {
    instagram: 'https://instagram.com/vasthram',
    facebook: 'https://facebook.com/vasthram',
    whatsapp: 'https://wa.me/919876543210',
  },
  contact: {
    email: 'hello@vasthram.com',
    phone: '+91 98765 43210',
  },
  seo: {
    title: 'VASTHRAM — Premium Handcrafted Sarees',
    description:
      'Discover timeless elegance with VASTHRAM. Shop premium handwoven silk sarees, cotton sarees, and designer collections crafted for every occasion.',
    keywords: [
      'sarees',
      'silk sarees',
      'cotton sarees',
      'handwoven sarees',
      'Indian fashion',
      'premium sarees',
      'wedding sarees',
      'designer sarees',
    ],
  },
};

export const heroBanners: HeroBanner[] = [
  {
    id: 'hero-1',
    title: 'Timeless Silk',
    subtitle: 'Crafted for Celebrations',
    description:
      'Explore our curated collection of handwoven silk sarees — each piece a testament to the artistry of Indian weavers.',
    ctaPrimary: {
      label: 'Shop Silk Sarees',
      href: '/collection/silk-sarees',
    },
    ctaSecondary: {
      label: 'Explore Collection',
      href: '/collection/new-arrivals',
    },
    image: '/images/banners/hero-1.jpg',
  },
  {
    id: 'hero-2',
    title: 'Everyday Elegance',
    subtitle: 'Effortless Style',
    description:
      'Lightweight, comfortable, and endlessly graceful — our cotton and everyday sarees are designed for the modern woman.',
    ctaPrimary: {
      label: 'Shop Cotton Sarees',
      href: '/collection/cotton-sarees',
    },
    ctaSecondary: {
      label: 'View New Arrivals',
      href: '/collection/new-arrivals',
    },
    image: '/images/banners/hero-2.jpg',
  },
];
