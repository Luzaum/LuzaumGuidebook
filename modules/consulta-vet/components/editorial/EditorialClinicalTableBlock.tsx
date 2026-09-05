import React from 'react';
import { cn } from '../../../../lib/utils';
import type { EditorialClinicalTable } from '../../types/common';

interface EditorialClinicalTableBlockProps {
  table: EditorialClinicalTable;
  /** Classes opcionais para o cabeçalho (ex.: tinte por tema de secção) */
  headerTintClass?: string;
  className?: string;
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
      : `${Math.min(80, 18 + table.headers.length * 8)}rem`;

  return (
    <div
      className={cn(
        'max-w-full overflow-x-auto overscroll-x-contain rounded-xl border border-border/55 bg-card/30 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]',
        className
      )}
    >
      {table.caption ? (
        <p className="break-words border-b border-border/55 bg-muted/[0.12] px-4 py-2.5 text-sm font-semibold text-foreground [overflow-wrap:anywhere]">
          {table.caption}
        </p>
      ) : null}
      <table
        className="w-full border-collapse text-left text-[13px] leading-snug md:text-[14px] md:leading-relaxed"
        style={{ minWidth: tableMinWidth }}
      >
        <thead>
          <tr className={cn('border-b border-border/80', headerTintClass)}>
            {table.headers.map((h) => (
              <th
                key={h}
                scope="col"
                className="break-words px-3 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground [overflow-wrap:anywhere] first:pl-4 last:pr-4 md:px-4 md:tracking-[0.12em]"
              >
                {h}
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
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
