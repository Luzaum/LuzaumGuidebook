import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, X, ExternalLink, Move } from 'lucide-react';

export interface ClinicalImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
  title?: string;
}

export function ClinicalImageZoomModal({
  isOpen,
  onClose,
  src,
  alt,
  caption,
  title,
}: ClinicalImageZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showCaption, setShowCaption] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan when image changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
      setShowCaption(true);
    }
  }, [isOpen, src]);

  // Handle ESC and keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale((prev) => Math.min(prev + 0.5, 4));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setScale((prev) => {
          const next = Math.max(prev - 0.5, 1);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === '0' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Toggle zoom on double click
  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 1), 4);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || scale <= 1) return;
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, scale, dragStart]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile pan & pinch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/85 backdrop-blur-md">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 cursor-zoom-out"
          aria-hidden="true"
        />

        {/* Floating Top Toolbar */}
        <header className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-white shadow-xl backdrop-blur-md">
            <span className="text-xs font-bold tracking-wide text-slate-200">
              {title ? title : 'Visualizador Clínico de Imagem'}
            </span>
            {caption ? (
              <button
                type="button"
                onClick={() => setShowCaption((prev) => !prev)}
                className="ml-2 rounded-lg border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-300 hover:bg-white/15 hover:text-white transition-colors"
              >
                {showCaption ? 'Ocultar legenda' : 'Ver legenda'}
              </button>
            ) : null}
          </div>

          <div className="pointer-events-auto flex items-center gap-1.5 rounded-2xl border border-white/10 bg-slate-900/85 p-1.5 text-white shadow-xl backdrop-blur-md">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={scale <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-white/15 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
              title="Reduzir zoom (-)"
              aria-label="Reduzir zoom"
            >
              <ZoomOut className="h-4 w-4" />
            </button>

            <span className="min-w-[48px] text-center text-xs font-semibold tabular-nums text-slate-200 select-none">
              {Math.round(scale * 100)}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={scale >= 4}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-white/15 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
              title="Aumentar zoom (+)"
              aria-label="Aumentar zoom"
            >
              <ZoomIn className="h-4 w-4" />
            </button>

            <div className="mx-1 h-4 w-[1px] bg-white/20" />

            <button
              type="button"
              onClick={handleReset}
              disabled={scale === 1 && position.x === 0 && position.y === 0}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-white/15 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
              title="Redefinir tamanho (R)"
              aria-label="Redefinir tamanho"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-white/15 hover:text-white"
              title="Abrir imagem original em nova aba"
              aria-label="Abrir imagem original"
            >
              <ExternalLink className="h-4 w-4" />
            </a>

            <div className="mx-1 h-4 w-[1px] bg-white/20" />

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300 transition-colors hover:bg-rose-500 hover:text-white"
              title="Fechar (Esc)"
              aria-label="Fechar visualizador"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Center Interactive Canvas */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-8 select-none ${
            scale > 1
              ? isDragging
                ? 'cursor-grabbing'
                : 'cursor-grab'
              : 'cursor-zoom-in'
          }`}
          onDoubleClick={handleDoubleClick}
        >
          <motion.img
            src={src}
            alt={alt}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="max-h-[82vh] max-w-[92vw] object-contain rounded-xl shadow-2xl pointer-events-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
            draggable={false}
          />
        </div>

        {/* Floating Bottom Info & Controls Hint */}
        <footer className="absolute bottom-4 left-4 right-4 z-20 flex flex-col items-center pointer-events-none gap-2">
          {scale > 1 ? (
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/80 px-3.5 py-1 text-xs font-medium text-sky-200 shadow-lg backdrop-blur-md animate-in fade-in duration-200">
              <Move className="h-3.5 w-3.5" />
              <span>Arraste para mover e inspecionar detalhes</span>
            </div>
          ) : (
            <div className="pointer-events-auto hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3.5 py-1 text-[11px] font-medium text-slate-300 shadow-lg backdrop-blur-md">
              <ZoomIn className="h-3.5 w-3.5 text-primary" />
              <span>Clique duplo ou role o mouse para dar zoom</span>
            </div>
          )}

          {caption && showCaption ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="pointer-events-auto max-w-2xl w-full rounded-2xl border border-white/15 bg-slate-900/90 px-4 py-3 text-xs leading-relaxed text-slate-200 shadow-2xl backdrop-blur-md"
            >
              <p>{caption}</p>
            </motion.div>
          ) : null}
        </footer>
      </div>
    </AnimatePresence>
  );
}
