import React from 'react';
import { cn } from '../../../../lib/utils';

interface TagPillsProps {
  tags: string[];
  className?: string;
}

export function TagPills({ tags, className }: TagPillsProps) {
  if (!tags?.length) return null;

  const visibleTags = tags.slice(0, 2);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {visibleTags.map((tag) => (
        <span
          key={tag}
          className="max-w-[180px] truncate rounded-md border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
          title={tag}
        >
          {tag}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span className="rounded-md border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
