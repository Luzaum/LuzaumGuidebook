import React from 'react';
import { Syringe } from 'lucide-react';
import { cn } from '../lib/utils';
interface CrivetLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { box: 'h-8 w-8', icon: 'h-4 w-4', text: 'text-sm' },
  md: { box: 'h-10 w-10', icon: 'h-5 w-5', text: 'text-base' },
  lg: { box: 'h-14 w-14', icon: 'h-7 w-7', text: 'text-lg' },
};

export const CrivetLogo: React.FC<CrivetLogoProps> = ({
  size = 'md',
  showLabel = true,
  className,
}) => {
  const s = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25',
          s.box,
        )}
      >
        <Syringe className={s.icon} />
      </div>
      {showLabel && (
        <div className="min-w-0 text-left">
          <p className={cn('font-bold leading-none tracking-tight text-white', s.text)}>CRI VET</p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Infusão contínua
          </p>
        </div>
      )}
    </div>
  );
};
