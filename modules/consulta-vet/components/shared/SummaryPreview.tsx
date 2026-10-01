import React from 'react';

/** Uma introdução breve seguida da explicação integral, sempre visível. */
export function SummaryPreview({ preview, children, dark = true }: {
  preview?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  if (!preview) return <>{children}</>;
  return <div data-summary-preview className="space-y-2">
    <p>{preview}</p>
      <div className={`space-y-3 border-t pt-3 ${dark ? 'border-white/15 text-white/85' : 'border-border text-foreground/90'}`} data-summary-full>
        {children}
      </div>
  </div>;
}
