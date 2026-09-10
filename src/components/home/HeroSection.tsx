import { Link } from 'react-router-dom';
import { heroBanners } from '../../data/siteConfig';
import { useScrollReveal } from '../../hooks';
import { ArrowRight } from 'lucide-react';
import { festiveSaree } from '../../data/mockImages';

export default function HeroSection() {
  const hero = heroBanners[0];
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-bg-secondary"
    >
      {/* Full-width editorial hero */}
      <div className="relative min-h-[75vh] sm:min-h-[80vh] lg:min-h-[88vh] flex items-center">
        {/* Background Image Container with Editorial Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={festiveSaree}
            alt="Vasthram Handwoven Sarees"
            className="w-full h-full object-cover object-[center_25%] lg:object-[right_center] scale-105"
          />
          {/* Gradient overlay: strong on left for text legibility, subtle fade across screen */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/95 via-45% to-bg-primary/40 lg:to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-bg-primary/30 z-10 lg:hidden" />
        </div>

        {/* Content with generous, balanced horizontal padding */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 2xl:px-44 py-24 sm:py-28 lg:py-36">
          <div className="max-w-xl lg:max-w-2xl pl-1 sm:pl-3">
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Decorative line */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-px bg-warm" />
                <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-warm font-sans font-semibold">
                  {hero.subtitle}
                </p>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-forest font-medium leading-[1.08] mb-6">
                {hero.title}
              </h2>
            </div>

            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <p className="text-text-secondary text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mb-10">
                {hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch sm:items-center">
                <Link
                  to={hero.ctaPrimary.href}
                  className="btn-primary group !py-3.5 !px-8 text-sm tracking-[0.16em]"
                >
                  {hero.ctaPrimary.label}
                  <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
                {hero.ctaSecondary && (
                  <Link
                    to={hero.ctaSecondary.href}
                    className="btn-secondary group !py-3.5 !px-8 text-sm tracking-[0.16em]"
                  >
                    {hero.ctaSecondary.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-text-muted">Scroll</span>
            <div className="w-px h-8 bg-border-medium relative overflow-hidden">
              <div className="w-full h-1/2 bg-forest absolute animate-[slide-down_1.5s_ease-in-out_infinite]" 
                style={{ animation: 'slide-down 1.5s ease-in-out infinite' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
