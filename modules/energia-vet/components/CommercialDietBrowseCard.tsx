import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Bean, Droplets, Drumstick, ExternalLink, ImageOff, ZoomIn } from 'lucide-react'
import type { CommercialDietMetadata } from '../lib/commercialDietClassifier'
import { getCommercialDietImageUrl, getCommercialDietProductUrl } from '../lib/commercialDietImages'

interface CommercialDietBrowseCardProps {
  metadata: CommercialDietMetadata
  onSelect: () => void
  onZoomImage: () => void
  index?: number
}

export function CommercialDietBrowseCard({ metadata, onSelect, onZoomImage, index = 0 }: CommercialDietBrowseCardProps) {
  const [imageError, setImageError] = useState(false)
  const imageUrl = getCommercialDietImageUrl(metadata.food.id, metadata.food.name)
  const productUrl = getCommercialDietProductUrl(metadata.food.id, metadata.food.name)
  const categoryLabel = metadata.dietType === 'therapeutic'
    ? metadata.specialtyLabel
    : metadata.maintenanceCategoryLabel

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min((index % 12) * 0.025, 0.25),
      }}
      className="group flex min-w-0 self-start flex-col overflow-hidden rounded-2xl border border-border/80 bg-card text-left shadow-sm transition-[border-color,box-shadow] hover:border-primary/35 hover:shadow-[0_12px_30px_rgba(15,23,42,0.09)]"
    >
      {/* 1. Photo Container (Click triggers Zoom Modal lightbox) */}
      <div
        role="button"
        tabIndex={0}
        onClick={onZoomImage}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onZoomImage()
          }
        }}
        aria-label={`Ampliar foto da embalagem de ${metadata.food.name}`}
        title="Clique para ampliar a foto da embalagem"
        className="group/photo relative flex h-52 w-full shrink-0 cursor-zoom-in items-center justify-center overflow-hidden border-b border-border/60 bg-gradient-to-b from-white to-slate-50/90 p-4 transition-colors hover:bg-slate-100/50 sm:h-60 lg:h-64 dark:from-slate-900/80 dark:to-slate-950/80"
      >
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={metadata.food.name}
            onError={() => setImageError(true)}
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover/photo:scale-105 select-none"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2.5 text-slate-400">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-inner">
              <ImageOff className="h-7 w-7 text-slate-400" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Foto faltando</span>
          </div>
        )}

        {/* Brand Badge (Left) */}
        <span className="absolute left-3 top-3 rounded-full border border-border/70 bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-sm dark:bg-slate-900/90 dark:text-slate-200">
          {metadata.brand}
        </span>

        {/* Dedicated "Consultar Fabricante" Button (Right) */}
        {productUrl && (
          <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={`Abrir página oficial da fabricante (${metadata.brand})`}
            style={{ color: '#ffffff' }}
            className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-[10px] font-bold !text-white shadow-md transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <span style={{ color: '#ffffff' }} className="!text-white font-bold">Consultar Fabricante</span>
            <ExternalLink className="h-3 w-3 shrink-0 !text-white" style={{ color: '#ffffff' }} />
          </a>
        )}

        {/* Zoom Overlay Hint on Hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2.5 z-10 flex justify-center opacity-0 transition-opacity duration-200 group-hover/photo:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-slate-950/90 px-3 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm border border-white/20">
            <ZoomIn className="h-3.5 w-3.5 text-white" />
            <span className="text-white">Clique para ampliar foto</span>
          </span>
        </div>
      </div>

      {/* 2. Card Content & Details (Click opens clinical sheet) */}
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect()
          }
        }}
        aria-label={`Abrir ficha clínica de ${metadata.food.name}`}
        className="flex flex-1 flex-col p-3.5 cursor-pointer outline-none transition-colors hover:bg-muted/20 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:rounded-b-2xl"
      >
        <span className="mb-1 line-clamp-1 text-[8px] font-bold uppercase tracking-[0.14em] text-primary">
          {categoryLabel ?? metadata.lineName}
        </span>
        <h3 className="line-clamp-2 text-[13px] font-extrabold leading-snug text-foreground sm:text-sm group-hover:text-primary transition-colors">
          {metadata.food.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 min-h-8 text-[10px] leading-4 text-muted-foreground">
          {metadata.clinicalIndications[0] ?? metadata.summaryPt}
        </p>

        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          <div className="rounded-lg border border-blue-500/15 bg-blue-500/[0.06] px-2 py-1 text-blue-700 dark:text-blue-300">
            <span className="flex items-center gap-1 text-[8px] font-bold"><Bean className="h-2.5 w-2.5" /> Carboidrato</span>
            <strong className="block text-[11px] tabular-nums">
              {metadata.carbPctDm != null ? `${metadata.carbPctDm.toFixed(1)}%` : '—'}
            </strong>
          </div>
          <div className="rounded-lg border border-orange-500/15 bg-orange-500/[0.06] px-2 py-1 text-orange-700 dark:text-orange-300">
            <span className="flex items-center gap-1 text-[8px] font-bold"><Drumstick className="h-2.5 w-2.5" /> PB</span>
            <strong className="block text-[11px] tabular-nums">
              {metadata.proteinPctDm != null ? `${metadata.proteinPctDm.toFixed(1)}%` : '—'}
            </strong>
          </div>
          <div className="rounded-lg border border-amber-500/15 bg-amber-500/[0.06] px-2 py-1 text-amber-700 dark:text-amber-300">
            <span className="flex items-center gap-1 text-[8px] font-bold"><Droplets className="h-2.5 w-2.5" /> EE</span>
            <strong className="block text-[11px] tabular-nums">
              {metadata.fatPctDm != null ? `${metadata.fatPctDm.toFixed(1)}%` : '—'}
            </strong>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2 text-[10px] font-bold text-primary">
          <span>Ver ficha completa</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  )
}
