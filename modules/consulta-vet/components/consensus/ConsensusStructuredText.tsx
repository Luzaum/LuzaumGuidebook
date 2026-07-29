import React from 'react';
import { sanitizeHTML } from '../../../../utils/sanitize';

type ParsedItem = {
  marker: 'ordered' | 'unordered';
  order?: number;
  text: string;
  tableLabel?: string;
  tableDetail?: string;
};

type TableLabels = {
  first: string;
  second: string;
};

function hasHtmlTags(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function isSectionHeading(value: string): boolean {
  const normalized = value.trim();
  if (!normalized || normalized.length > 90) return false;
  if (/^[-•*]|\d+[.)]\s/.test(normalized)) return false;
  if (!/[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(normalized)) return false;

  const letters = normalized.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, '');
  return letters.length >= 3 && normalized === normalized.toLocaleUpperCase('pt-BR');
}

function parseListItem(line: string): ParsedItem | null {
  const ordered = line.match(/^(\d+)[.)]\s+(.+)$/);
  const unordered = line.match(/^[-•*]\s*(.+)$/);
  if (!ordered && !unordered) return null;

  const marker = ordered ? 'ordered' : 'unordered';
  const order = ordered ? Number(ordered[1]) : undefined;
  const text = String(ordered?.[2] || unordered?.[1] || '').trim();
  const colon = text.match(/^([^:]{1,76}):\s+(.+)$/);

  if (colon) {
    return {
      marker,
      order,
      text,
      tableLabel: colon[1].trim(),
      tableDetail: colon[2].trim(),
    };
  }

  if (ordered) {
    return {
      marker,
      order,
      text,
      tableLabel: String(order),
      tableDetail: text,
    };
  }

  return { marker, text };
}

function inferTableLabels(heading: string | null): TableLabels {
  const normalized = String(heading || '').toLocaleUpperCase('pt-BR');

  if (normalized.includes('DOSE') || normalized.includes('REGIME')) {
    return { first: 'Medicamento / intervenção', second: 'Regime citado' };
  }
  if (normalized.includes('PRESSÃO')) {
    return { first: 'Pressão sistólica', second: 'Classificação e risco' };
  }
  if (normalized.includes('HOLTER')) {
    return { first: 'Resultado do Holter', second: 'Interpretação' };
  }
  if (normalized.includes('MECANISMO')) {
    return { first: 'Tipo de trombo', second: 'Estratégia predominante' };
  }
  if (normalized.includes('ESTÁG') || normalized.includes('ESTADI')) {
    return { first: 'Estágio', second: 'Definição e conduta' };
  }
  if (normalized.includes('GRAU') || normalized.includes('GRADUA')) {
    return { first: 'Grau', second: 'Definição clínica' };
  }
  if (normalized.includes('GRUPO')) {
    return { first: 'Grupo', second: 'Descrição' };
  }
  if (normalized.includes('FENÓTIP')) {
    return { first: 'Fenótipo', second: 'Características' };
  }
  if (normalized.includes('CLASSIFICA')) {
    return { first: 'Categoria', second: 'Definição prática' };
  }
  if (normalized.includes('CRITÉRIO')) {
    return { first: 'Critério', second: 'Interpretação' };
  }
  if (normalized.includes('FLUXO') || normalized.includes('ALGORITMO')) {
    return { first: 'Etapa', second: 'Conduta prática' };
  }

  return { first: 'Item', second: 'Interpretação prática' };
}

function StructuredTable({
  items,
  heading,
}: {
  items: ParsedItem[];
  heading: string | null;
}) {
  const labels = inferTableLabels(heading);

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-border bg-background/70">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead className="bg-muted/80 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th scope="col" className="w-[28%] px-4 py-3 font-semibold">
                {labels.first}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {labels.second}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {items.map((item, index) => (
              <tr key={`${item.tableLabel}-${index}`} className="align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-foreground">
                  {item.tableLabel}
                </th>
                <td className="px-4 py-3 leading-relaxed text-foreground/85">
                  {item.tableDetail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlainList({ items }: { items: ParsedItem[] }) {
  const ordered = items.every((item) => item.marker === 'ordered');
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag
      className={
        ordered
          ? 'my-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90'
          : 'my-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90'
      }
    >
      {items.map((item, index) => (
        <li key={`${item.order || 'bullet'}-${index}`}>{item.text}</li>
      ))}
    </Tag>
  );
}

function StructuredList({
  items,
  heading,
}: {
  items: ParsedItem[];
  heading: string | null;
}) {
  const groups: Array<{ kind: 'table' | 'list'; items: ParsedItem[] }> = [];

  for (const item of items) {
    const tableReady = Boolean(item.tableLabel && item.tableDetail);
    const previous = groups[groups.length - 1];
    const kind = tableReady ? 'table' : 'list';

    if (previous?.kind === kind) {
      previous.items.push(item);
    } else {
      groups.push({ kind, items: [item] });
    }
  }

  return (
    <>
      {groups.map((group, index) => {
        if (group.kind === 'table' && group.items.length >= 2) {
          return <StructuredTable key={`table-${index}`} items={group.items} heading={heading} />;
        }
        return <PlainList key={`list-${index}`} items={group.items} />;
      })}
    </>
  );
}

function PlainTextBlock({ value }: { value: string }) {
  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) return null;

  const heading = isSectionHeading(lines[0]) ? lines.shift() || null : null;
  const items = lines.map(parseListItem);
  const isList = lines.length > 0 && items.every(Boolean);

  return (
    <section className="space-y-2">
      {heading && (
        <h4 className="pt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {heading}
        </h4>
      )}
      {isList ? (
        <StructuredList items={items as ParsedItem[]} heading={heading} />
      ) : (
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
          {lines.join('\n')}
        </p>
      )}
    </section>
  );
}

export function ConsensusStructuredText({
  text,
}: {
  text: string | null | undefined;
}) {
  const parsed = String(text || '').trim();
  if (!parsed) return null;

  if (hasHtmlTags(parsed)) {
    return (
      <div
        className="prose prose-slate max-w-none text-sm leading-relaxed text-foreground/90 dark:prose-invert prose-p:my-0 prose-p:leading-relaxed prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(parsed) }}
      />
    );
  }

  const blocks = parsed.split(/\r?\n\s*\r?\n/).filter((block) => block.trim());

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <PlainTextBlock key={`${block.slice(0, 30)}-${index}`} value={block} />
      ))}
    </div>
  );
}
