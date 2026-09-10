import type { Collection } from '../types';
import { festiveSaree, silkSaree, weddingSaree } from './mockImages';

export const collections: Collection[] = [
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description:
      'Discover our latest additions — freshly curated sarees that blend tradition with contemporary elegance.',
    shortDescription: 'Freshly curated, just for you',
    image: festiveSaree,
    productPrefix: '',
    featured: true,
    order: 1,
  },
  {
    id: 'most-ordered',
    name: 'Most Ordered',
    slug: 'most-ordered',
    description:
      'Our most loved pieces — the sarees our customers keep coming back to, time and again.',
    shortDescription: 'Customer favourites',
    image: weddingSaree,
    productPrefix: '',
    featured: false,
    order: 2,
  },
  {
    id: 'silk-sarees',
    name: 'Silk Sarees',
    slug: 'silk-sarees',
    description:
      'Luxurious handwoven silk sarees crafted by master weavers. Each piece embodies centuries of tradition and unmatched artistry.',
    shortDescription: 'Luxurious handwoven silk',
    image: silkSaree,
    productPrefix: 'SS',
    featured: true,
    order: 3,
  },
  {
    id: 'silk-cotton',
    name: 'Silk Cotton',
    slug: 'silk-cotton',
    description:
      'The perfect blend of silk\'s sheen and cotton\'s comfort. Ideal for those who want elegance without compromise.',
    shortDescription: 'Silk sheen, cotton comfort',
    image: festiveSaree,
    productPrefix: 'SC',
    featured: true,
    order: 4,
  },
  {
    id: 'everyday-sarees',
    name: 'Everyday Sarees',
    slug: 'everyday-sarees',
    description:
      'Lightweight, breathable, and effortlessly stylish. Designed for the woman who wears grace every day.',
    shortDescription: 'Effortless daily elegance',
    image: silkSaree,
    productPrefix: 'ES',
    featured: true,
    order: 5,
  },
  {
    id: 'half-pure-sarees',
    name: 'Half Pure Sarees',
    slug: 'half-pure-sarees',
    description:
      'Premium quality at accessible prices. Half pure sarees that don\'t compromise on beauty or drape.',
    shortDescription: 'Premium at accessible prices',
    image: weddingSaree,
    productPrefix: 'HP',
    featured: true,
    order: 6,
  },
  {
    id: 'cotton-sarees',
    name: 'Cotton Sarees',
    slug: 'cotton-sarees',
    description:
      'Pure cotton sarees for ultimate comfort. From handloom classics to modern prints — cotton at its finest.',
    shortDescription: 'Comfort meets tradition',
    image: festiveSaree,
    productPrefix: 'CS',
    featured: true,
    order: 7,
  },
  {
    id: 'maya-kurtis-salwars',
    name: 'MAYA — Kurtis & Salwars',
    slug: 'maya-kurtis-salwars',
    description:
      'Explore MAYA — our curated line of kurtis and salwar sets designed for modern Indian women.',
    shortDescription: 'Kurtis & salwar sets',
    image: silkSaree,
    productPrefix: 'MY',
    featured: false,
    order: 8,
  },
  {
    id: 'ikyem-lifestyle',
    name: 'IKYEM — Lifestyle',
    slug: 'ikyem-lifestyle',
    description:
      'IKYEM brings you curated lifestyle essentials that complement your wardrobe.',
    shortDescription: 'Lifestyle essentials',
    image: weddingSaree,
    productPrefix: 'IK',
    featured: false,
    order: 9,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured).sort((a, b) => a.order - b.order);
}
