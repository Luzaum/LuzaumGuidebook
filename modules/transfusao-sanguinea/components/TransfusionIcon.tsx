import React, { useState } from 'react';
import { Droplets, type LucideIcon } from 'lucide-react';

/** Decorative generated artwork; the adjacent label remains the accessible name. */
export function TransfusionIcon({ name, className = 'h-9 w-9', fallback: Fallback = Droplets }: { name: string; className?: string; fallback?: LucideIcon }) {
  const [failed, setFailed] = useState<string | null>(null);
  return failed === name ? <Fallback aria-hidden="true" className={className} /> : <img src={`/assets/transfusion/icons/${name}.png`} alt="" aria-hidden="true" width={48} height={48} loading="lazy" decoding="async" onError={() => setFailed(name)} className={`shrink-0 object-contain ${className}`} />;
}
