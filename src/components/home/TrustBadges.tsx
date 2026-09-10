import { Shield, Truck, Phone, RefreshCcw } from 'lucide-react';
import { useScrollReveal } from '../../hooks';

const trustBadges = [
  {
    icon: Shield,
    title: '100% Authentic',
    description: 'Genuine handcrafted sarees from trusted weavers',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary delivery on orders above ₹2,500',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '7-day hassle-free return & exchange policy',
  },
  {
    icon: Phone,
    title: 'WhatsApp Support',
    description: 'Personal styling assistance via WhatsApp',
  },
];

export default function TrustBadges() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 sm:py-32 lg:py-40 border-t border-border-light bg-bg-cream/50">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28">
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-lg border border-border-medium bg-white/80 shadow-2xs flex items-center justify-center text-forest group-hover:border-forest group-hover:shadow-sm group-hover:-translate-y-1 transition-all duration-300">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium text-text-primary mb-2 tracking-wide font-serif text-base">
                  {badge.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed max-w-[220px] mx-auto">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
