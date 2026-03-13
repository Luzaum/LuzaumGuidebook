import React from 'react';

interface EditorialFieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function EditorialField({ label, hint, children, className }: EditorialFieldProps) {
  return (
    <label className={`block space-y-2 ${className || ''}`.trim()}>
      <div>
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {children}
    </label>
  );
}
