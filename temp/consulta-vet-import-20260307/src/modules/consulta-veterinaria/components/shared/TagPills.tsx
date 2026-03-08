import React from 'react';
import { cn } from '../../../../lib/utils';

interface TagPillsProps {
  tags: string[];
  className?: string;
}

export function TagPills({ tags, className }: TagPillsProps) {
  if (!tags?.length) return null;
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md border border-border"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
