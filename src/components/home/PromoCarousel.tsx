import { siteConfig } from '../../data/siteConfig';

export default function PromoCarousel() {
  const messages = siteConfig.promoMessages;
  // Triple the messages for seamless infinite scroll
  const repeatedMessages = [...messages, ...messages, ...messages];

  return (
    <section className="py-8 sm:py-10 my-16 sm:my-20 lg:my-24 bg-forest/[0.03] border-y border-border-light overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content gap-0">
          {repeatedMessages.map((message, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-5 px-10 text-[13px] tracking-[0.1em] text-text-secondary whitespace-nowrap font-sans"
            >
              <span className="w-1 h-1 bg-warm rounded-full flex-shrink-0" />
              <span className="uppercase">{message}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
