import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface PdfViewerShellProps {
  url: string;
  title: string;
  className?: string;
}

export function PdfViewerShell({ url, title, className }: PdfViewerShellProps) {
  return (
    <section className={cn('overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl', className)}>
      <header className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-800/90 p-4">
        <div className="min-w-0 text-slate-200">
          <div className="mb-1 flex items-center gap-2">
            <FileText className="h-5 w-5 shrink-0 text-primary" />
            <h3 className="truncate text-sm font-semibold sm:text-base" title={title}>{title}</h3>
          </div>
          <p className="text-xs text-slate-400">Visualização de consenso em PDF</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            title="Abrir em nova aba"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={url}
            download
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            title="Baixar PDF"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>
      </header>

      <div className="relative flex min-h-[460px] items-center justify-center bg-slate-950 p-8 md:min-h-[680px]">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          <h4 className="mb-2 text-lg font-semibold text-slate-100">Leitura em fase de integração</h4>
          <p className="mb-6 text-sm leading-relaxed text-slate-400">
            Nesta etapa, o PDF abre em nova aba ou pode ser baixado.
            O leitor incorporado com paginação e zoom será habilitado na próxima sprint.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Abrir PDF
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
