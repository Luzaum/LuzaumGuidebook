import { ReadableTable } from '../shared/ReadableTable';
import React from 'react';
import { cn } from '../../../../lib/utils';
import type { EditorialClinicalTable } from '../../types/common';

interface EditorialClinicalTableBlockProps {
  table: EditorialClinicalTable;
  /** Classes opcionais para o cabeçalho (ex.: tinte por tema de secção) */
  headerTintClass?: string;
  className?: string;
}

function renderTableText(text: string) {
  if (!text || (!text.includes('**') && !text.includes('*'))) return text;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part.replace(/\*\*/g, '');
  });
}

/**
 * Tabela clínica reutilizável (doenças, medicamentos) — acessível e consistente claro/escuro.
 */
export function EditorialClinicalTableBlock({
  table,
  headerTintClass = 'bg-muted/[0.18]',
  className,
}: EditorialClinicalTableBlockProps) {
  const tableMinWidth =
    table.headers.length <= 2
      ? '100%'
      : `${table.headers.length * 14}rem`;

  return (
    <div
      className={cn(
        'cv-editorial-table min-w-0 max-w-full overflow-hidden rounded-xl border border-border/55 bg-card/30 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]',
        className
      )}
    >
      {table.caption ? (
        <p className="break-words border-b border-border/55 bg-muted/[0.12] px-4 py-2.5 text-sm font-semibold text-foreground [overflow-wrap:anywhere]">
          {renderTableText(table.caption)}
        </p>
      ) : null}
      <div className="cv-table-cards">
        {table.rows.map((row, index) => (
          <dl key={index} className="space-y-4 border-b border-border/55 p-4 last:border-b-0 even:bg-muted/20">
            {row.map((cell, column) => (
              <div key={column}>
                <dt className="text-xs font-semibold text-muted-foreground">{renderTableText(table.headers[column] || `Coluna ${column + 1}`)}</dt>
                <dd className={cn('mt-1 text-sm leading-6 text-foreground', column === 0 && 'font-semibold')}>{renderTableText(cell)}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
      <ReadableTable
        aria-label={table.caption || 'Tabela clínica'}
        className="w-full border-collapse text-left text-[13px] leading-snug md:text-[14px] md:leading-relaxed"
        style={{ minWidth: tableMinWidth }}
      >
        <thead>
          <tr className={cn('border-b border-border/80', headerTintClass)}>
            {table.headers.map((h, headerIndex) => (
              <th
                key={`${h}-${headerIndex}`}
                scope="col"
                className="break-words px-3 py-3 text-[11px] font-bold tracking-normal text-muted-foreground [overflow-wrap:anywhere] first:pl-4 last:pr-4 md:px-4 "
              >
                {renderTableText(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-b border-border/35 last:border-b-0',
                i % 2 === 0 ? 'bg-background/40' : 'bg-muted/[0.2]'
              )}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    'break-words px-3 py-2.5 align-top text-foreground/90 [overflow-wrap:anywhere] first:pl-4 last:pr-4 md:px-4',
                    j === 0 && 'font-semibold text-foreground'
                  )}
                >
                  {renderTableText(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </ReadableTable>
    </div>
  );
}
