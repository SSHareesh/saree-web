import { siteConfig } from '../../data/siteConfig';

export default function AnnouncementBar() {
  const messages = siteConfig.announcementMessages;
  const displayText = messages.join(' | ');

  return (
    <div className="bg-forest text-white text-xs tracking-wider py-2.5 overflow-hidden">
      {/* Desktop: static centered */}
      <div className="hidden md:block text-center px-4">
        <p>{displayText}</p>
      </div>

      {/* Mobile: marquee scroll */}
      <div className="md:hidden marquee-container">
        <div className="marquee-content">
          <span className="px-8">{displayText}</span>
          <span className="px-8">{displayText}</span>
          <span className="px-8">{displayText}</span>
          <span className="px-8">{displayText}</span>
        </div>
      </div>
    </div>
  );
}
