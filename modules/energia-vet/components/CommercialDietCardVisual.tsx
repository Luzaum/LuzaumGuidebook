import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Package, ZoomIn } from 'lucide-react'
import type { CommercialDietMetadata } from '../lib/commercialDietClassifier'
import { getCommercialDietImageUrl, getCommercialDietProductUrl } from '../lib/commercialDietImages'

interface CommercialDietCardVisualProps {
  metadata: CommercialDietMetadata
  className?: string
  onZoomImage?: () => void
}

export function CommercialDietCardVisual({ metadata, className = '', onZoomImage }: CommercialDietCardVisualProps) {
  const { food, brand, brandTheme } = metadata
  const [imageError, setImageError] = useState(false)
  
  const imageUrl = getCommercialDietImageUrl(food.id, food.name)
  const productUrl = getCommercialDietProductUrl(food.id, food.name)

  return (
    <div className={`flex flex-col items-center justify-center self-center w-full ${className}`}>
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900/80 dark:to-slate-950/80 p-3 sm:p-4 shadow-xs">
        {/* Fundo adaptativo neutro para acomodar imagens transparentes e opacas */}
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-white dark:bg-card/70">
          {imageUrl && !imageError ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full w-full items-center justify-center"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={onZoomImage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onZoomImage?.()
                  }
                }}
                className="group/photo relative flex h-full w-full items-center justify-center cursor-zoom-in transition-transform duration-300 hover:scale-[1.03]"
                title={`Clique para ampliar a foto da embalagem de ${food.name}`}
              >
                <img
                  src={imageUrl}
                  alt={food.name}
                  onError={() => setImageError(true)}
                  className="max-h-[82%] w-auto max-w-[88%] object-contain drop-shadow-sm select-none"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center opacity-0 transition-opacity duration-200 group-hover/photo:opacity-100 z-10">
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                    <ZoomIn className="h-3.5 w-3.5" />
                    <span>Ampliar embalagem</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Clean minimalist fallback */
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex w-full max-w-[230px] flex-col items-center justify-center rounded-xl border border-border/80 bg-white p-6 text-center"
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl text-white shadow-inner mb-4"
                style={{ backgroundColor: brandTheme.primaryColor }}
              >
                <Package className="h-10 w-10 text-white drop-shadow-sm" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                {brand}
              </span>
              <span className="text-sm font-extrabold text-foreground line-clamp-2">
                {food.name}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {productUrl && (
        <a
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
        >
          <span className="text-white">Consultar Fabricante ({brand})</span>
          <ExternalLink className="h-3.5 w-3.5 text-white shrink-0" />
        </a>
      )}
    </div>
  )
}

