import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number; // pixels
}

const CANDIDATES = ['/apps/VETIUS.png', '/Vetius.png', '/Vetius.svg', '/Vetius.webp', '/logo-vetius.png'];
const FALLBACK_SRC = 'https://res.cloudinary.com/dwta1roq1/image/upload/w_240,q_auto/LOGOAPP';

const Logo: React.FC<LogoProps> = ({ className = '', size = 60 }) => {
  const [index, setIndex] = useState<number>(0);
  const metaOverride = (typeof document !== 'undefined')
    ? (document.querySelector('meta[name="VITE_LOGO_URL"]') as HTMLMetaElement | null)?.content
    : undefined;
  const sources = metaOverride && metaOverride.length > 0
    ? [metaOverride, ...CANDIDATES]
    : CANDIDATES;
  const src = index < sources.length ? sources[index] : FALLBACK_SRC;
  
  // Detectar se é SVG
  const isSvg = src.toLowerCase().endsWith('.svg') || src.includes('svg');
  
  return (
    <img
      src={src}
      alt="Logo Vetius"
      width={size}
      height={size}
      className={className || 'h-full w-full object-contain select-none'}
      onError={() => setIndex((i) => i + 1)}
    />
  );
};

export default Logo;


