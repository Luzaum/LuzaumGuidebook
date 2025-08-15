import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number; // pixels
}

const PREFERRED_SRC = '/logo-vetius.png';
const FALLBACK_SRC = 'https://res.cloudinary.com/dwta1roq1/image/upload/w_240,q_auto/LOGOAPP';

const Logo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
  const [src, setSrc] = useState<string>(PREFERRED_SRC);
  return (
    <img
      src={src}
      alt="Logo Vetius"
      width={size}
      height={size}
      className={className}
      onError={() => setSrc(FALLBACK_SRC)}
    />
  );
};

export default Logo;


