import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FileText, Download, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { cn } from '../../../../lib/utils';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerShellProps {
  url: string;
  title: string;
  className?: string;
}

const MIN_ZOOM = 0.8;
const MAX_ZOOM = 2.2;
const ZOOM_STEP = 0.2;

export function PdfViewerShell({ url, title, className }: PdfViewerShellProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(920);

  useEffect(() => {
    if (!containerRef.current) return;

    const target = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      const nextWidth = entries[0]?.contentRect.width || 920;
      setContainerWidth(Math.max(280, Math.floor(nextWidth)));
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const pageWidth = useMemo(() => {
    // Mantém margem lateral confortável em desktop e mobile.
    return Math.max(260, Math.min(1200, containerWidth - 24));
  }, [containerWidth]);

  const canGoPrev = pageNumber > 1;
  const canGoNext = numPages > 0 && pageNumber < numPages;

  const handlePrevious = () => {
    setPageNumber((current) => Math.max(1, current - 1));
  };

  const handleNext = () => {
    setPageNumber((current) => Math.min(numPages || 1, current + 1));
  };

  const handleZoomOut = () => {
    setZoom((current) => Math.max(MIN_ZOOM, Number((current - ZOOM_STEP).toFixed(1))));
  };

  const handleZoomIn = () => {
    setZoom((current) => Math.min(MAX_ZOOM, Number((current + ZOOM_STEP).toFixed(1))));
  };

  return (
    <section className={cn('overflow-hidden rounded-2xl border border-border bg-card shadow-sm', className)}>
      <header className="flex flex-col gap-3 border-b border-border bg-muted/40 p-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2 text-foreground">
            <FileText className="h-5 w-5 shrink-0 text-primary" />
            <h3 className="truncate text-sm font-semibold sm:text-base" title={title}>{title}</h3>
          </div>
          <p className="text-xs text-muted-foreground">Leitor PDF integrado</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!canGoPrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            title="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="min-w-[120px] text-center text-xs font-medium text-muted-foreground">
            Página {numPages ? pageNumber : '-'} de {numPages || '-'}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            title="Próxima página"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="mx-1 h-6 w-px bg-border" />

          <button
            type="button"
            onClick={handleZoomOut}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
            title="Diminuir zoom"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          <span className="min-w-[52px] text-center text-xs font-medium text-muted-foreground">{Math.round(zoom * 100)}%</span>

          <button
            type="button"
            onClick={handleZoomIn}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
            title="Aumentar zoom"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
            title="Abrir em nova aba"
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          <a
            href={url}
            download
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
            title="Baixar PDF"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>
      </header>

      <div ref={containerRef} className="min-h-[520px] bg-slate-900/95 p-3 md:p-4">
        {loadingError ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <p className="mb-2 text-sm font-semibold text-red-300">Não foi possível carregar o PDF</p>
            <p className="mb-4 text-xs text-red-200/80">{loadingError}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
            >
              Abrir em nova aba
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : (
          <div className="flex justify-center">
            <Document
              file={url}
              onLoadSuccess={({ numPages: loadedPages }) => {
                setNumPages(loadedPages);
                setPageNumber((current) => Math.min(Math.max(1, current), loadedPages));
                setLoadingError(null);
              }}
              onLoadError={(error) => {
                setLoadingError(error.message || 'Erro ao carregar arquivo PDF.');
              }}
              loading={<p className="py-20 text-sm text-slate-300">Carregando PDF...</p>}
              error={null}
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth}
                scale={zoom}
                renderTextLayer
                renderAnnotationLayer
                loading="Carregando página..."
              />
            </Document>
          </div>
        )}
      </div>
    </section>
  );
}
