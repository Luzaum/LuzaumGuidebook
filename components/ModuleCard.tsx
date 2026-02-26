import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Module } from '../modules/registry'

interface ModuleCardProps {
  module: Module
}

export function ModuleCard({ module }: ModuleCardProps) {
  const navigate = useNavigate()
  const Icon = module.icon
  const isPlanned = module.status === 'planned'
  const isAvailable = module.status === 'internal' || module.status === 'iframe'

  const handleClick = (e: React.MouseEvent) => {
    if (isPlanned) return
    e.stopPropagation()
    navigate(module.route)
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-surface-2/60 dark:bg-surface-2/40 backdrop-blur transition-all duration-300 ${isPlanned
        ? 'opacity-60 cursor-not-allowed'
        : 'cursor-pointer hover:border-primary/50 hover:shadow-lg'
        }`}
      onClick={handleClick}
    >
      <div className="flex flex-col">
        {/* TAG */}
        <div className="px-4 pt-3">
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide uppercase ${module.status === 'internal'
              ? 'bg-sky-100 text-sky-800 dark:bg-white/10 dark:text-white/80'
              : module.status === 'iframe'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-white/10 dark:text-white/80'
                : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-white/60'
              }`}
          >
            {module.status === 'internal'
              ? 'INTERNO'
              : module.status === 'iframe'
                ? 'EXTERNO'
                : 'EM BREVE'}
          </span>
        </div>

        {/* LOGO — altura MAXimizada para preenchimento total do card */}
        <div className="flex items-center justify-center h-[340px] overflow-hidden p-0 relative">
          {module.iconImage ? (
            <img
              src={module.iconImage}
              alt={module.title}
              className="h-full w-full object-contain transform transition-transform duration-500 hover:scale-110"
              draggable={false}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const placeholder = target.parentElement?.querySelector('.logo-placeholder') as HTMLElement
                if (placeholder) placeholder.style.display = 'flex'
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-slate-100 dark:bg-white/5 rounded-lg border border-dashed border-slate-300 dark:border-white/20">
              <Icon className="h-16 w-16 text-slate-400 dark:text-white/40 mb-3" />
              <span className="text-base text-slate-500 dark:text-white/50 text-center px-6">
                Sem logo ainda
              </span>
            </div>
          )}
          {/* Placeholder de fallback (imagem com erro) */}
          <div className="logo-placeholder hidden flex-col items-center justify-center w-full h-full bg-slate-100 dark:bg-white/5 rounded-lg border border-dashed border-slate-300 dark:border-white/20">
            <Icon className="h-16 w-16 text-slate-400 dark:text-white/40 mb-3" />
            <span className="text-base text-slate-500 dark:text-white/50 text-center px-6">
              Sem logo ainda
            </span>
          </div>
        </div>

        {/* TEXTO */}
        <div className="px-5 pt-1 pb-1">
          <h3 className="text-center text-[18px] font-bold leading-tight text-slate-900 dark:text-white">
            {module.title}
          </h3>
          <p className="mt-1 text-center text-[13px] leading-snug text-slate-600 dark:text-white/70 line-clamp-2 min-h-[40px]">
            {module.description}
          </p>
        </div>

        {/* BOTÃO */}
        <div className="px-4 pb-4 pt-3">
          {isAvailable ? (
            <button
              onClick={handleClick}
              className="h-10 w-full rounded-full bg-sky-300/90 font-semibold text-sm text-slate-900 hover:bg-sky-300 transition-colors"
            >
              Abrir
            </button>
          ) : (
            <div className="h-10 w-full rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
              <span className="text-xs text-slate-500 dark:text-white/60">Em breve</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
