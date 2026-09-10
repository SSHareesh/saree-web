import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { siteConfig } from '../../data/siteConfig';

function InstagramIcon({ size = 17, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 17, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-white/80">
      {/* Newsletter / Brand Section */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl text-white mb-3">
                {siteConfig.brandName}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-md">
                {siteConfig.tagline}. Discover premium handwoven sarees crafted by master weavers —
                each piece a testament to India's rich textile heritage.
              </p>
            </div>
            <div className="flex items-center gap-5 lg:justify-end">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon size={17} strokeWidth={1.5} />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon size={17} strokeWidth={1.5} />
              </a>
              <a
                href={siteConfig.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Shop */}
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-white font-sans font-medium mb-6">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerNavigation.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[13px] text-white/40 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-white font-sans font-medium mb-6">
              Help
            </h3>
            <ul className="space-y-3">
              {footerNavigation.help.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[13px] text-white/40 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-white font-sans font-medium mb-6">
              About
            </h3>
            <ul className="space-y-3">
              {footerNavigation.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[13px] text-white/40 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-white font-sans font-medium mb-6">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block text-[13px] text-white/40 hover:text-white/80 transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="block text-[13px] text-white/40 hover:text-white/80 transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/25 tracking-wide">
            <p>© {currentYear} {siteConfig.brandName}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-white/50 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white/50 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
