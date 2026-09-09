import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, ImageOff, X, ZoomIn } from 'lucide-react'
import type { CommercialDietMetadata } from '../lib/commercialDietClassifier'
import { getCommercialDietImageUrl, getCommercialDietProductUrl } from '../lib/commercialDietImages'
import { Button } from './ui/button'

interface DietImageZoomModalProps {
  diet: CommercialDietMetadata | null
  isOpen: boolean
  onClose: () => void
}

export function DietImageZoomModal({ diet, isOpen, onClose }: DietImageZoomModalProps) {
  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  if (!diet) return null

  const imageUrl = getCommercialDietImageUrl(diet.food.id, diet.food.name)
  const productUrl = getCommercialDietProductUrl(diet.food.id, diet.food.name)
  const categoryLabel = diet.dietType === 'therapeutic'
    ? diet.specialtyLabel
    : diet.maintenanceCategoryLabel

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-zoom-out"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Foto da embalagem de ${diet.food.name}`}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-card text-foreground shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/80 px-5 py-3.5 bg-muted/30">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="shrink-0 rounded-full border border-border/80 bg-background px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  {diet.brand}
                </span>
                {categoryLabel && (
                  <span className="hidden sm:inline-block truncate text-[11px] font-semibold text-muted-foreground">
                    {categoryLabel}
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 rounded-full p-0 text-muted-foreground hover:bg-muted hover:text-foreground shrink-0"
                aria-label="Fechar zoom da foto"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Image Preview Container */}
            <div className="relative flex min-h-[280px] sm:min-h-[380px] max-h-[62vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`Embalagem de ${diet.food.name}`}
                  className="max-h-[56vh] w-auto max-w-full object-contain drop-shadow-xl select-none transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-inner">
                    <ImageOff className="h-8 w-8 text-slate-400" />
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Foto da embalagem em catalogação
                  </span>
                </div>
              )}

              <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-900/75 px-3 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm">
                <ZoomIn className="h-3 w-3" />
                <span>Foto oficial da embalagem</span>
              </div>
            </div>

            {/* Footer / Info & Action */}
            <div className="flex flex-col gap-3 border-t border-border/80 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-extrabold text-foreground sm:text-base">
                  {diet.food.name}
                </h3>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {diet.clinicalIndications[0] ?? diet.summaryPt}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {productUrl && (
                  <a
                    href={productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffffff' }}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 text-xs font-bold !text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <span style={{ color: '#ffffff' }} className="!text-white font-bold">Consultar Fabricante</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 !text-white" style={{ color: '#ffffff' }} />
                  </a>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="h-9 rounded-xl px-4 text-xs font-semibold"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
