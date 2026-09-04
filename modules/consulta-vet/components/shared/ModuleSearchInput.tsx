import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface ModuleSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  compact?: boolean;
}

export function ModuleSearchInput({ value, onChange, placeholder, className, compact = false }: ModuleSearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, onChange, value]);

  return (
    <div className={className}>
      <div className="relative">
        <Search
          className={cn(
            'absolute top-1/2 -translate-y-1/2 text-muted-foreground',
            compact ? 'left-3 h-3.5 w-3.5' : 'left-3 h-4 w-4'
          )}
          aria-hidden
        />
        <input
          type="text"
          value={localValue}
          onChange={(event) => setLocalValue(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className={cn(
            'w-full border border-border bg-card text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20',
            compact ? 'h-9 rounded-lg pl-9 pr-3 text-xs' : 'rounded-xl py-2.5 pl-10 pr-4 text-sm'
          )}
        />
      </div>
    </div>
  );
}
