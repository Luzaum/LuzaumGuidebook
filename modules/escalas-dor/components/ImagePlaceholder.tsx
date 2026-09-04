import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Camera, Maximize2, Minus, Plus, RotateCcw, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ScaleImageProps {
  src?: string;
  alt?: string;
  text?: string;
  className?: string;
  zoomable?: boolean;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;
const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

const ScaleImage: React.FC<ScaleImageProps> = ({
  src,
  alt = 'Ilustração clínica da escala de dor',
  text,
  className = '',
  zoomable = true,
}) => {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragOrigin = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const resetView = () => {
    setZoom(MIN_ZOOM);
    setOffset({ x: 0, y: 0 });
  };

  const closeViewer = () => {
    setOpen(false);
    resetView();
  };

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer();
      if (event.key === '+' || event.key === '=') setZoom((current) => clampZoom(current + ZOOM_STEP));
      if (event.key === '-') setZoom((current) => clampZoom(current - ZOOM_STEP));
      if (event.key === '0') resetView();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (src && !failed) {
    const image = (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        draggable={false}
        className={`w-full rounded-2xl border border-slate-200/80 bg-white object-contain shadow-sm dark:border-slate-800/80 dark:bg-slate-950/40 ${className}`}
      />
    );

    return (
      <>
        {zoomable ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative block w-full overflow-hidden rounded-2xl text-left outline-none ring-offset-2 transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-teal-500 dark:ring-offset-slate-950"
            aria-label={`Ampliar imagem: ${alt}`}
          >
            {image}
            <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-slate-950/75 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md transition-transform group-hover:scale-105">
              <Maximize2 className="h-3.5 w-3.5" />
              Ampliar
            </span>
          </button>
        ) : image}

        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[200] flex flex-col bg-slate-950/95 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-label={`Visualização ampliada: ${alt}`}
              >
                <div className="flex min-h-16 items-center justify-between gap-3 border-b border-white/10 px-3 py-2 text-white sm:px-5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{alt}</p>
                    <p className="text-[11px] text-slate-400">Use os controles, a roda do mouse ou dê dois cliques</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
                    <button type="button" onClick={() => setZoom((current) => clampZoom(current - ZOOM_STEP))} disabled={zoom <= MIN_ZOOM} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-200 hover:bg-white/10 disabled:opacity-35" aria-label="Diminuir zoom">
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="min-w-14 text-center text-xs font-black tabular-nums">{Math.round(zoom * 100)}%</span>
                    <button type="button" onClick={() => setZoom((current) => clampZoom(current + ZOOM_STEP))} disabled={zoom >= MAX_ZOOM} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-200 hover:bg-white/10 disabled:opacity-35" aria-label="Aumentar zoom">
                      <Plus className="h-5 w-5" />
                    </button>
                    <button type="button" onClick={resetView} className="hidden h-11 w-11 items-center justify-center rounded-lg text-slate-200 hover:bg-white/10 sm:inline-flex" aria-label="Redefinir zoom">
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button ref={closeButtonRef} type="button" onClick={closeViewer} className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20" aria-label="Fechar imagem ampliada">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div
                  className={`relative flex min-h-0 flex-1 items-center justify-center overflow-hidden p-3 sm:p-6 ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
                  onWheel={(event) => {
                    event.preventDefault();
                    setZoom((current) => clampZoom(current + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)));
                  }}
                  onDoubleClick={() => { if (zoom > 1) resetView(); else setZoom(2); }}
                  onPointerDown={(event) => {
                    if (zoom <= 1) return;
                    event.currentTarget.setPointerCapture(event.pointerId);
                    dragOrigin.current = { pointerX: event.clientX, pointerY: event.clientY, x: offset.x, y: offset.y };
                  }}
                  onPointerMove={(event) => {
                    if (!dragOrigin.current || zoom <= 1) return;
                    setOffset({
                      x: dragOrigin.current.x + event.clientX - dragOrigin.current.pointerX,
                      y: dragOrigin.current.y + event.clientY - dragOrigin.current.pointerY,
                    });
                  }}
                  onPointerUp={() => { dragOrigin.current = null; }}
                  onPointerCancel={() => { dragOrigin.current = null; }}
                  style={{ touchAction: 'none' }}
                >
                  <motion.img
                    src={src}
                    alt={alt}
                    draggable={false}
                    animate={{ scale: zoom, x: offset.x, y: offset.y }}
                    transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                    className="max-h-full max-w-full select-none rounded-xl bg-white object-contain shadow-2xl"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
      </>
    );
  }

  return (
    <div className={`relative flex min-h-[140px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100/60 px-4 text-center dark:border-slate-700 dark:bg-slate-800/40 ${className}`}>
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 text-slate-400 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-500">
        <Camera className="h-5 w-5" />
      </div>
      <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{text ?? 'Ilustração clínica indisponível'}</span>
      {failed && <span className="mt-1 text-[10px] text-rose-500">Não foi possível carregar a imagem</span>}
    </div>
  );
};

export default ScaleImage;
