import React from 'react';
import { Bookmark } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { FavoriteEntityType } from '../../types/favorites';
import { cn } from '../../../../lib/utils';

interface FavoriteButtonProps {
  entityType: FavoriteEntityType;
  entityId: string;
  className?: string;
}

export function FavoriteButton({ entityType, entityId, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(entityType, entityId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(entityType, entityId)}
      className={cn(
        'p-2 rounded-full transition-colors flex items-center justify-center',
        active ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
        className
      )}
      aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Bookmark className={cn('w-5 h-5', active && 'fill-current')} />
    </button>
  );
}
