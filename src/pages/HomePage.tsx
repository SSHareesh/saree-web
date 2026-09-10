import HeroSection from '../components/home/HeroSection';
import PromoCarousel from '../components/home/PromoCarousel';
import CollectionShowcase from '../components/home/CollectionShowcase';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TrustBadges from '../components/home/TrustBadges';
import { siteConfig } from '../data/siteConfig';

export default function HomePage() {
  return (
    <>
      <title>{siteConfig.seo.title}</title>
      <meta name="description" content={siteConfig.seo.description} />

      <HeroSection />
      <PromoCarousel />
      <CollectionShowcase />
      <FeaturedProducts />
      <TrustBadges />
    </>
  );
}
