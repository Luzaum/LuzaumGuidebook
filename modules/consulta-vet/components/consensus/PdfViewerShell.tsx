import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  ExternalLink,
  FileText,
  LoaderCircle,
  Maximize2,
  Minimize2,
  Search,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { cn } from '../../../../lib/utils';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PdfViewerShellProps {
  url: string;
  title: string;
  className?: string;
  initialPage?: number;
  onPageChange?: (pageNumber: number) => void;
}

type SearchablePdfDocument = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<{
    getTextContent: () => Promise<{
      items: Array<{ str?: string }>;
    }>;
  }>;
};

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.2;
const ZOOM_STEP = 0.1;
const DEFAULT_ZOOM = 0.65;
const FULLSCREEN_ZOOM = 0.9;

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

export function PdfViewerShell({
  url,
  title,
  className,
  initialPage = 1,
  onPageChange,
}: PdfViewerShellProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(Math.max(1, initialPage));
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [activeSearchResult, setActiveSearchResult] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(920);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pagesToRender, setPagesToRender] = useState<number[]>([
    Math.max(1, initialPage),
  ]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const pdfDocumentRef = useRef<SearchablePdfDocument | null>(null);
  const loadedPdfUrlRef = useRef<string | null>(null);
  const pageTextCacheRef = useRef<Map<number, string>>(new Map());
  const searchRequestRef = useRef(0);
  const lastScrolledSearchRef = useRef('');

  useEffect(() => {
    setPageNumber(Math.max(1, initialPage));
  }, [initialPage]);

  useEffect(() => {
    pageTextCacheRef.current.clear();
    searchRequestRef.current += 1;
    setSearchResults([]);
    setActiveSearchResult(-1);
    setSearchMessage(null);
    setZoom(DEFAULT_ZOOM);
    setPagesToRender([Math.max(1, initialPage)]);
  }, [initialPage, url]);

  useEffect(() => {
    if (!onPageChange) return;
    onPageChange(pageNumber);
  }, [onPageChange, pageNumber]);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      const nextFullscreen = document.fullscreenElement === sectionRef.current;
      setIsFullscreen(nextFullscreen);
      setZoom(nextFullscreen ? FULLSCREEN_ZOOM : DEFAULT_ZOOM);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleArrowNavigation = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTyping) return;

      if (event.key === 'ArrowRight' && pageNumber < numPages) {
        event.preventDefault();
        setPageNumber((current) => Math.min(current + 1, numPages));
      }

      if (event.key === 'ArrowLeft' && pageNumber > 1) {
        event.preventDefault();
        setPageNumber((current) => Math.max(current - 1, 1));
      }
    };

    document.addEventListener('keydown', handleArrowNavigation);
    return () => document.removeEventListener('keydown', handleArrowNavigation);
  }, [numPages, pageNumber]);

  const pageWidth = useMemo(
    () => Math.max(260, Math.min(1100, containerWidth - (containerWidth >= 640 ? 128 : 40))),
    [containerWidth]
  );
  const canGoPrev = pageNumber > 1;
  const canGoNext = numPages > 0 && pageNumber < numPages;
  const applySearchHighlights = useCallback(() => {
    const pageContainer = pageContainerRef.current;
    if (!pageContainer) return;

    const previousHighlights = pageContainer.querySelectorAll<HTMLElement>(
      '[data-pdf-search-highlight="true"]'
    );
    previousHighlights.forEach((element) => {
      element.style.removeProperty('background-color');
      element.style.removeProperty('background-image');
      element.style.removeProperty('border-radius');
      element.style.removeProperty('box-shadow');
      element.removeAttribute('data-pdf-search-highlight');
      element.removeAttribute('title');
    });

    const normalizedQuery = normalizeSearchText(searchQuery.trim());
    if (!normalizedQuery || !searchResults.includes(pageNumber)) return;

    const currentPage = pageContainer.querySelector<HTMLElement>(
      `.react-pdf__Page[data-page-number="${pageNumber}"]`
    );
    if (!currentPage) return;

    const textSpans = Array.from(
      currentPage.querySelectorAll<HTMLElement>('.textLayer span')
    ).filter((element) => !element.querySelector('span'));

    let matches = textSpans.filter((element) =>
      normalizeSearchText(element.textContent || '').includes(normalizedQuery)
    );

    if (!matches.length) {
      const queryTerms = normalizedQuery.split(/\s+/).filter((term) => term.length >= 2);
      matches = textSpans.filter((element) => {
        const spanText = normalizeSearchText(element.textContent || '');
        return queryTerms.some((term) => spanText.includes(term));
      });
    }

    const compactMatches = matches.filter((element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.height <= 48 && bounds.width <= 800;
    });
    if (compactMatches.length) {
      matches = compactMatches;
    } else if (matches.length > 1) {
      matches = [
        matches.reduce((smallest, element) => {
          const smallestBounds = smallest.getBoundingClientRect();
          const elementBounds = element.getBoundingClientRect();
          return elementBounds.width * elementBounds.height <
            smallestBounds.width * smallestBounds.height
            ? element
            : smallest;
        }),
      ];
    }

    matches.forEach((element) => {
      const normalizedSpanText = normalizeSearchText(element.textContent || '');
      const matchStart = normalizedSpanText.indexOf(normalizedQuery);
      const matchEnd = matchStart + normalizedQuery.length;

      element.dataset.pdfSearchHighlight = 'true';
      if (matchStart >= 0 && normalizedSpanText.length) {
        const startPercent = (matchStart / normalizedSpanText.length) * 100;
        const endPercent = (matchEnd / normalizedSpanText.length) * 100;
        element.style.setProperty(
          'background-image',
          `linear-gradient(to right, transparent 0 ${startPercent}%, rgba(250, 204, 21, 0.82) ${startPercent}% ${endPercent}%, transparent ${endPercent}% 100%)`,
          'important'
        );
      } else {
        element.style.setProperty('background-color', 'rgba(250, 204, 21, 0.5)', 'important');
      }
      element.style.setProperty('border-radius', '2px');
      element.title = `Ocorrência de "${searchQuery.trim()}"`;
    });

    const scrollKey = `${activeSearchResult}:${pageNumber}:${normalizedQuery}`;
    if (matches[0] && lastScrolledSearchRef.current !== scrollKey) {
      lastScrolledSearchRef.current = scrollKey;
      const viewer = containerRef.current;
      if (viewer) {
        const viewerBounds = viewer.getBoundingClientRect();
        const matchBounds = matches[0].getBoundingClientRect();
        viewer.scrollTo({
          top:
            viewer.scrollTop +
            matchBounds.top -
            viewerBounds.top -
            viewer.clientHeight / 2 +
            matchBounds.height / 2,
          left:
            viewer.scrollLeft +
            matchBounds.left -
            viewerBounds.left -
            viewer.clientWidth / 2 +
            matchBounds.width / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeSearchResult, pageNumber, searchQuery, searchResults]);

  useEffect(() => {
    const pageContainer = pageContainerRef.current;
    if (!pageContainer) return;

    const runHighlight = () => window.requestAnimationFrame(applySearchHighlights);
    const animationFrame = runHighlight();
    const retryTimers = [150, 500, 1200].map((delay) =>
      window.setTimeout(runHighlight, delay)
    );
    const observer = new MutationObserver(runHighlight);
    observer.observe(pageContainer, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
    };
  }, [applySearchHighlights, zoom]);

  useEffect(() => {
    if (!numPages) return;

    setPagesToRender((current) =>
      current.includes(pageNumber) ? current : [...current, pageNumber]
    );

    const preloadTimer = window.setTimeout(() => {
      setPagesToRender(
        [pageNumber, pageNumber - 1, pageNumber + 1].filter(
          (page, index, pages) =>
            page >= 1 && page <= numPages && pages.indexOf(page) === index
        )
      );
    }, 300);

    return () => window.clearTimeout(preloadTimer);
  }, [numPages, pageNumber]);

  const updatePageNumber = (nextPage: number) => {
    setPageNumber(Math.max(1, Math.min(nextPage, numPages || nextPage)));
  };

  const toggleFullscreen = async () => {
    if (!sectionRef.current) return;

    try {
      if (document.fullscreenElement === sectionRef.current) {
        await document.exitFullscreen();
      } else {
        await sectionRef.current.requestFullscreen();
      }
    } catch {
      setSearchMessage('Não foi possível abrir o modo de tela cheia neste navegador.');
    }
  };

  const clearSearch = () => {
    searchRequestRef.current += 1;
    setSearchQuery('');
    setSearchResults([]);
    setActiveSearchResult(-1);
    setSearchMessage(null);
    setIsSearching(false);
  };

  const selectSearchResult = (nextIndex: number) => {
    if (!searchResults.length) return;
    const normalizedIndex = (nextIndex + searchResults.length) % searchResults.length;
    setActiveSearchResult(normalizedIndex);
    updatePageNumber(searchResults[normalizedIndex]);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pdfDocument = pdfDocumentRef.current;
    const normalizedQuery = normalizeSearchText(searchQuery.trim());
    if (!pdfDocument || loadedPdfUrlRef.current !== url || normalizedQuery.length < 2) {
      setSearchResults([]);
      setActiveSearchResult(-1);
      setSearchMessage(
        normalizedQuery.length < 2 ? 'Digite pelo menos 2 caracteres.' : 'Aguarde o PDF carregar.'
      );
      return;
    }

    const requestId = searchRequestRef.current + 1;
    searchRequestRef.current = requestId;
    setIsSearching(true);
    setSearchMessage(null);

    try {
      const matchedPages: number[] = [];

      for (let page = 1; page <= pdfDocument.numPages; page += 1) {
        if (searchRequestRef.current !== requestId) return;

        let searchableText = pageTextCacheRef.current.get(page);
        if (searchableText === undefined) {
          const pdfPage = await pdfDocument.getPage(page);
          const textContent = await pdfPage.getTextContent();
          searchableText = normalizeSearchText(
            textContent.items
              .map((item) => item.str || '')
              .join(' ')
          );
          pageTextCacheRef.current.set(page, searchableText);
        }

        if (searchableText.includes(normalizedQuery)) {
          matchedPages.push(page);
        }
      }

      if (searchRequestRef.current !== requestId) return;

      setSearchResults(matchedPages);
      setActiveSearchResult(matchedPages.length ? 0 : -1);
      setSearchMessage(
        matchedPages.length
          ? `${matchedPages.length} página${matchedPages.length === 1 ? '' : 's'} encontrada${matchedPages.length === 1 ? '' : 's'}.`
          : 'Nenhuma ocorrência encontrada.'
      );
      if (matchedPages.length) updatePageNumber(matchedPages[0]);
    } catch {
      if (searchRequestRef.current === requestId) {
        setSearchMessage('Não foi possível pesquisar neste documento.');
      }
    } finally {
      if (searchRequestRef.current === requestId) setIsSearching(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        'overflow-hidden border border-border bg-card shadow-sm',
        isFullscreen
          ? 'flex h-dvh w-screen flex-col rounded-none border-0'
          : 'rounded-2xl',
        className
      )}
    >
      <header className="border-b border-border bg-muted/40">
        <div className="flex flex-col gap-3 p-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2 text-foreground">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <h3 className="truncate text-sm font-semibold sm:text-base" title={title}>
                {title}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">Leitor PDF integrado</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => updatePageNumber(pageNumber - 1)}
              disabled={!canGoPrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              title="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="min-w-[108px] text-center text-xs font-medium text-muted-foreground">
              Página {numPages ? pageNumber : '-'} de {numPages || '-'}
            </span>

            <button
              type="button"
              onClick={() => updatePageNumber(pageNumber + 1)}
              disabled={!canGoNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              title="Próxima página"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-border" />

            <button
              type="button"
              onClick={() =>
                setZoom((current) => Math.max(MIN_ZOOM, Number((current - ZOOM_STEP).toFixed(1))))
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
              title="Diminuir zoom"
            >
              <ZoomOut className="h-4 w-4" />
            </button>

            <span className="min-w-[44px] text-center text-xs font-medium text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>

            <button
              type="button"
              onClick={() =>
                setZoom((current) => Math.min(MAX_ZOOM, Number((current + ZOOM_STEP).toFixed(1))))
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
              title="Aumentar zoom"
            >
              <ZoomIn className="h-4 w-4" />
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
              title="Abrir em nova aba"
            >
              <ExternalLink className="h-4 w-4" />
            </a>

            <a
              href={url}
              download
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
              title="Baixar PDF"
            >
              <Download className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
              title={isFullscreen ? 'Sair da tela cheia' : 'Abrir em tela cheia'}
              aria-label={isFullscreen ? 'Sair da tela cheia' : 'Abrir em tela cheia'}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="space-y-2 border-t border-border/70 px-4 py-3"
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchResults([]);
                  setActiveSearchResult(-1);
                  setSearchMessage(null);
                }}
                placeholder="Pesquisar palavra no consenso..."
                className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-12 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  style={{ right: 4 }}
                  title="Limpar pesquisa"
                  aria-label="Limpar pesquisa"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="inline-flex h-11 min-w-[132px] items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
            >
              {isSearching ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {isSearching ? 'Pesquisando...' : 'Pesquisar'}
            </button>
          </div>

          {(searchMessage || searchResults.length > 0) && (
            <div className="flex min-h-10 items-center justify-between gap-3 rounded-lg border border-border/70 bg-background/70 px-3">
              <span className="text-xs font-medium text-muted-foreground">
                {searchResults.length && activeSearchResult >= 0
                  ? `Resultado ${activeSearchResult + 1} de ${searchResults.length} · página ${searchResults[activeSearchResult]}`
                  : searchMessage}
              </span>
              {searchResults.length > 0 && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => selectSearchResult(activeSearchResult - 1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted"
                    title="Resultado anterior"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => selectSearchResult(activeSearchResult + 1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted"
                    title="Próximo resultado"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </header>

      <div
        ref={containerRef}
        className={cn(
          'relative overflow-auto bg-slate-900/95 px-2 py-3 sm:px-16 sm:py-4',
          isFullscreen ? 'min-h-0 flex-1' : 'h-[560px]'
        )}
      >
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
          <div
            className="grid items-start gap-1 sm:gap-2"
            style={{
              gridTemplateColumns:
                '44px minmax(0, 1fr) 44px',
            }}
          >
            <button
              type="button"
              onClick={() => updatePageNumber(pageNumber - 1)}
              disabled={!canGoPrev}
              className="sticky top-[45vh] z-10 inline-flex h-20 w-11 items-center justify-center rounded-md border border-slate-500/40 bg-slate-800/90 text-white shadow-lg transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-25"
              style={{ top: 'calc(50% - 40px)' }}
              title="Página anterior"
              aria-label="Página anterior"
              aria-keyshortcuts="ArrowLeft"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            <div ref={pageContainerRef} className="flex min-w-0 justify-center">
              <Document
                file={url}
                onLoadSuccess={(pdfDocument) => {
                  pdfDocumentRef.current = pdfDocument as unknown as SearchablePdfDocument;
                  loadedPdfUrlRef.current = url;
                  pageTextCacheRef.current.clear();
                  setNumPages(pdfDocument.numPages);
                  setPageNumber((current) =>
                    Math.min(Math.max(1, current), pdfDocument.numPages)
                  );
                  setLoadingError(null);
                }}
                onLoadError={(error) => {
                  setLoadingError(error.message || 'Erro ao carregar arquivo PDF.');
                }}
                loading={<p className="py-20 text-sm text-slate-300">Carregando PDF...</p>}
                error={null}
              >
                {pagesToRender.map((renderedPage) => (
                  <div
                    key={renderedPage}
                    aria-hidden={renderedPage !== pageNumber}
                    style={{ display: renderedPage === pageNumber ? 'block' : 'none' }}
                  >
                    <Page
                      pageNumber={renderedPage}
                      width={pageWidth}
                      scale={zoom}
                      devicePixelRatio={1}
                      renderTextLayer
                      renderAnnotationLayer={false}
                      onRenderTextLayerSuccess={() => {
                        if (renderedPage === pageNumber) {
                          window.requestAnimationFrame(applySearchHighlights);
                        }
                      }}
                      loading="Carregando página..."
                    />
                  </div>
                ))}
              </Document>
            </div>

            <button
              type="button"
              onClick={() => updatePageNumber(pageNumber + 1)}
              disabled={!canGoNext}
              className="sticky top-[45vh] z-10 inline-flex h-20 w-11 items-center justify-center rounded-md border border-slate-500/40 bg-slate-800/90 text-white shadow-lg transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-25"
              style={{ top: 'calc(50% - 40px)' }}
              title="Próxima página"
              aria-label="Próxima página"
              aria-keyshortcuts="ArrowRight"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
