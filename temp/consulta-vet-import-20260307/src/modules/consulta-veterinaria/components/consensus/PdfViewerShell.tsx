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
    <div className={cn('bg-slate-900 dark:bg-slate-950 rounded-2xl overflow-hidden flex flex-col border border-slate-800 shadow-xl', className)}>
      <div className="bg-slate-800 dark:bg-slate-900 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 text-slate-200">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-medium truncate max-w-[200px] sm:max-w-md">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="Abrir em nova aba"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={url}
            download
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="Baixar PDF"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-950 dark:bg-black relative min-h-[500px] md:min-h-[700px] flex items-center justify-center">
        {/* Placeholder for actual PDF viewer */}
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 bg-slate-800 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h4 className="text-lg font-medium text-slate-200 mb-2">Visualizador de PDF</h4>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Esta é uma área de demonstração. Em um ambiente real, um leitor de PDF completo (como react-pdf) seria renderizado aqui, permitindo navegação, zoom e marcação de página.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors"
          >
            Abrir PDF Externamente
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
