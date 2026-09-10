import { useState, useRef, useEffect } from 'react';
import type { Product } from '../../types';
import LazyImage from '../common/LazyImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const mainImageRef = useRef<HTMLDivElement>(null);
  const images = product.images;

  // Reset on product change
  useEffect(() => {
    setActiveIndex(0);
    setIsZoomed(false);
  }, [product.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const goToPrev = () => setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const goToNext = () => setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-2.5 lg:w-[76px] flex-shrink-0 overflow-x-auto lg:overflow-y-auto lg:max-h-[650px] pb-1 lg:pb-0">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-16 h-20 lg:w-[76px] lg:h-[95px] rounded-md overflow-hidden flex-shrink-0 transition-all duration-200 ${
                activeIndex === index
                  ? 'ring-2 ring-forest ring-offset-2 shadow-sm'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
            >
              <LazyImage
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                fallbackClassName="w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 relative">
        <div
          ref={mainImageRef}
          className="relative overflow-hidden rounded-lg bg-bg-secondary aspect-[3/4] lg:aspect-auto lg:min-h-[650px] cursor-crosshair shadow-xs"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <LazyImage
            src={images[activeIndex]}
            alt={`${product.name} - Image ${activeIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            fallbackClassName="w-full h-full"
          />

          {/* Zoom lens follows cursor */}
          {isZoomed && (
            <style>{`
              .cursor-crosshair img { transform-origin: ${mousePos.x}% ${mousePos.y}%; }
            `}</style>
          )}

          {/* Navigation arrows for mobile */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all text-forest active:scale-95 lg:hidden"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all text-forest active:scale-95 lg:hidden"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-white/80 px-2.5 py-1 text-[10px] tracking-wider text-text-secondary font-medium">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
