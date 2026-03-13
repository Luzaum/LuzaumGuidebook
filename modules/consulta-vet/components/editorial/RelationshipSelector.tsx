import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

interface RelationshipOption {
  slug: string;
  label: string;
  meta?: string;
}

interface RelationshipSelectorProps {
  title: string;
  searchPlaceholder: string;
  options: RelationshipOption[];
  value: string[];
  onChange: (nextValue: string[]) => void;
}

export function RelationshipSelector({
  title,
  searchPlaceholder,
  options,
  value,
  onChange,
}: RelationshipSelectorProps) {
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter((option) => {
      return (
        option.label.toLowerCase().includes(normalized) ||
        option.slug.toLowerCase().includes(normalized) ||
        String(option.meta || '').toLowerCase().includes(normalized)
      );
    });
  }, [options, query]);

  const toggleValue = (slug: string) => {
    if (value.includes(slug)) {
      onChange(value.filter((item) => item !== slug));
      return;
    }
    onChange([...value, slug]);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{value.length} selecionado(s)</p>
        </div>
        {value.length > 0 ? (
          <button
            type="button"
            onClick={() => onChange([])}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <X className="h-3.5 w-3.5" />
            Limpar
          </button>
        ) : null}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-xl border border-border bg-card px-10 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="max-h-64 space-y-2 overflow-y-auto">
        {filteredOptions.map((option) => {
          const selected = value.includes(option.slug);
          return (
            <label
              key={option.slug}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 transition-colors ${
                selected ? 'border-primary/40 bg-primary/5' : 'border-border bg-card hover:bg-muted/40'
              }`}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleValue(option.slug)}
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{option.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {option.slug}
                  {option.meta ? ` • ${option.meta}` : ''}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
