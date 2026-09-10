import { useState, useEffect } from 'react';
import { mockSareeImages } from '../../data/mockImages';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  aspectRatio?: string;
}

// Generate deterministic colors from a string for a nicer placeholder
function stringToColor(str: string): string {
  const colors = [
    '#D4C4B5', '#C4B5A3', '#E2D8CF', '#D0C3B5', '#DDD5CC',
    '#C8BBB0', '#E0D6CC', '#D2C5B6', '#CDBFB0', '#D8CFC5',
    '#BFB3A4', '#C9BDB0', '#D6CEC5', '#E3DCD4', '#CCC2B5',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function LazyImage({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  aspectRatio,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  if (error || !src) {
    let hash = 0;
    const str = alt || 'saree';
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const fallbackImage = mockSareeImages[Math.abs(hash) % mockSareeImages.length];

    return (
      <img
        src={fallbackImage}
        alt={alt}
        className={className}
        loading="lazy"
        style={aspectRatio ? { aspectRatio } : undefined}
      />
    );
  }

  return (
    <div className="relative" style={aspectRatio ? { aspectRatio } : undefined}>
      {!loaded && (
        <div
          className={`absolute inset-0 ${fallbackClassName}`}
          style={{ backgroundColor: stringToColor(alt || src) }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-forest/10 border-t-forest/40 rounded-full" style={{ animation: 'spin-slow 1s linear infinite' }} />
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
