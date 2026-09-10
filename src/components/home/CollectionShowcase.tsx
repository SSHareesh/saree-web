import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedCollections } from '../../data/collections';
import { useScrollReveal } from '../../hooks';

function CollectionCard({
  name,
  slug,
  shortDescription,
  image,
  index,
}: {
  name: string;
  slug: string;
  shortDescription: string;
  image: string;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Link to={`/collection/${slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-5 bg-bg-secondary shadow-sm group-hover:shadow-md transition-shadow">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Luxury dark vignette overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity" />

          {/* Collection initial letter - decorative */}
          <span className="absolute top-4 right-4 font-serif text-5xl lg:text-6xl text-white/20 font-medium leading-none select-none">
            {name.charAt(0)}
          </span>

          {/* Label overlay at bottom */}
          <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/70 font-sans font-medium block mb-1">
              Collection
            </span>
            <span className="font-serif text-lg sm:text-xl text-white font-medium block leading-snug">
              {name}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-text-muted mb-3 leading-relaxed line-clamp-2">
          {shortDescription}
        </p>
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-forest font-medium group-hover:gap-3 transition-all duration-300">
          Explore <ArrowRight size={14} />
        </span>
      </Link>
    </div>
  );
}

export default function CollectionShowcase() {
  const collections = getFeaturedCollections();
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 sm:py-32 lg:py-40 bg-bg-primary">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-border-medium" />
            <p className="text-xs tracking-[0.3em] uppercase text-warm font-sans font-medium">
              Our Collections
            </p>
            <div className="w-12 h-px bg-border-medium" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-forest">
            Explore by Collection
          </h2>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 sm:gap-x-6 sm:gap-y-14 lg:gap-x-8 lg:gap-y-16">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              name={collection.name}
              slug={collection.slug}
              shortDescription={collection.shortDescription}
              image={collection.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
