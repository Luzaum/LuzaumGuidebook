import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import type { CommercialDietMetadata } from '../lib/commercialDietClassifier'
import { getCommercialDietImageUrl } from '../lib/commercialDietImages'

interface CommercialDietCardVisualProps {
  metadata: CommercialDietMetadata
  className?: string
}

export function CommercialDietCardVisual({ metadata, className = '' }: CommercialDietCardVisualProps) {
  const { food, brand, brandTheme } = metadata
  const [imageError, setImageError] = useState(false)
  
  const imageUrl = getCommercialDietImageUrl(food.id, food.name)

  return (
    <div className={`flex aspect-square w-full items-center justify-center self-center rounded-2xl border border-border/70 bg-white p-3 sm:p-4 ${className}`}>
      {/* Fundo branco neutro para acomodar também imagens sem transparência. */}
      <div className="flex h-full w-full items-center justify-center bg-white">
        {imageUrl && !imageError ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full w-full items-center justify-center"
          >
            <img
              src={imageUrl}
              alt={food.name}
              onError={() => setImageError(true)}
              className="max-h-[82%] w-auto max-w-[88%] object-contain"
            />
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
  )
}
