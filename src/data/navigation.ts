import type { NavItem } from '../types';

export const mainNavigation: NavItem[] = [
  { label: 'New Arrivals', href: '/collection/new-arrivals' },
  { label: 'Most Ordered', href: '/collection/most-ordered' },
  { label: 'Silk Sarees', href: '/collection/silk-sarees' },
  { label: 'Silk Cotton', href: '/collection/silk-cotton' },
  { label: 'Everyday Sarees', href: '/collection/everyday-sarees' },
  { label: 'Half Pure Sarees', href: '/collection/half-pure-sarees' },
  { label: 'Cotton Sarees', href: '/collection/cotton-sarees' },
  { label: 'MAYA — Kurtis & Salwars', href: '/collection/maya-kurtis-salwars' },
  { label: 'IKYEM — Lifestyle', href: '/collection/ikyem-lifestyle' },
  { label: 'Major Rangas', href: '/collection/major-rangas' },
  { label: 'Sareepedia', href: '/collection/sareepedia' },
];

export const footerNavigation = {
  shop: [
    { label: 'New Arrivals', href: '/collection/new-arrivals' },
    { label: 'Silk Sarees', href: '/collection/silk-sarees' },
    { label: 'Cotton Sarees', href: '/collection/cotton-sarees' },
    { label: 'Silk Cotton', href: '/collection/silk-cotton' },
    { label: 'Everyday Sarees', href: '/collection/everyday-sarees' },
    { label: 'Half Pure Sarees', href: '/collection/half-pure-sarees' },
  ],
  help: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Saree Guide', href: '/collection/sareepedia' },
    { label: 'FAQs', href: '/faqs' },
  ],
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/our-story' },
  ],
};
