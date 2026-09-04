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
    <div className={`relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-b from-card/90 via-card/50 to-muted/30 p-4 sm:p-6 shadow-sm ${className}`}>
      {/* Background subtle soft ambient glow */}
      <div
        className="absolute inset-x-0 top-0 h-48 opacity-20 dark:opacity-25 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${brandTheme.primaryColor}, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Main Image Display: Top-aligned and large, with zero dead space */}
      <div className="relative z-10 flex h-full min-h-[320px] w-full items-center justify-center sm:min-h-[380px] lg:min-h-[440px]">
        {imageUrl && !imageError ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full w-full items-center justify-center p-2"
          >
            <img
              src={imageUrl}
              alt={food.name}
              onError={() => setImageError(true)}
              className="max-h-[360px] w-auto max-w-full sm:max-h-[420px] object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-[1.03]"
            />
          </motion.div>
        ) : (
          /* Clean minimalist fallback */
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-border/80 bg-background/90 p-8 text-center shadow-md backdrop-blur-md max-w-[260px] w-full"
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
