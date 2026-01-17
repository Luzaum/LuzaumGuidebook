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
      className={`relative overflow-hidden h-full rounded-2xl border bg-surface-2/60 dark:bg-surface-2/40 backdrop-blur transition-all duration-300 ${
        isPlanned
          ? 'opacity-60 cursor-not-allowed'
          : 'cursor-pointer hover:border-primary/50 hover:shadow-lg'
      }`}
      onClick={handleClick}
    >
      <div className="flex h-full flex-col">
        {/* TAG */}
        <div className="px-6 pt-4">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              module.status === 'internal'
                ? 'bg-white/10 text-white/80'
                : module.status === 'iframe'
                ? 'bg-white/10 text-white/80'
                : 'bg-white/5 text-white/60'
            }`}
          >
            {module.status === 'internal'
              ? 'INTERNO'
              : module.status === 'iframe'
              ? 'EXTERNO'
              : 'EM BREVE'}
          </span>
        </div>

        {/* LOGO — SEM RESERVA DE ALTURA */}
        <div className="flex justify-center pt-2 pb-0">
          {module.iconImage ? (
            <img
              src={module.iconImage}
              alt={module.title}
              className={`w-full max-w-[280px] object-contain ${
                module.id === 'escalas-dor' ? 'scale-[1.69]' :
                module.id === 'neurologia' ? 'scale-125' :
                module.id === 'emergencias-veterinarias' ? 'scale-[1.2]' :
                module.id === 'crivet' || module.id === 'transfusao-sanguinea' || module.id === 'fluidoterapia' || module.id === 'calculadora-energetica' || module.id === 'antibioticoterapia' || module.id === 'hemogasometria' ? 'scale-125' : ''
              }`}
              draggable={false}
              loading="lazy"
              onError={(e) => {
                // Se a imagem não carregar, mostra placeholder
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const placeholder = target.parentElement?.querySelector('.logo-placeholder') as HTMLElement
                if (placeholder) placeholder.style.display = 'flex'
              }}
            />
          ) : null}
          {/* Placeholder escondido - aparece se imagem falhar */}
          <div
            className="logo-placeholder hidden flex-col items-center justify-center w-full max-w-[280px] min-h-[100px] bg-white/5 rounded-lg border border-dashed border-white/20"
          >
            <Icon className="h-10 w-10 text-white/40 mb-1" />
            <span className="text-xs text-white/50 text-center px-2">
              Sem logo ainda
            </span>
          </div>
          {/* Placeholder quando não há imagem configurada */}
          {!module.iconImage && (
            <div className="flex flex-col items-center justify-center w-full max-w-[280px] min-h-[100px] bg-white/5 rounded-lg border border-dashed border-white/20">
              <Icon className="h-10 w-10 text-white/40 mb-1" />
              <span className="text-xs text-white/50 text-center px-2">
                Sem logo ainda
              </span>
            </div>
          )}
        </div>

        {/* TEXTO — COLADO NA LOGO */}
        <div className="px-6 pt-0 -mt-1">
          <h3 className="m-0 text-center text-xl font-semibold leading-tight text-white">
            {module.title}
          </h3>
          <p className="mt-0 text-center text-sm leading-snug text-white/70 line-clamp-3">
            {module.description}
          </p>
        </div>

        {/* BOTÃO — EMPURRADO PRA BAIXO */}
        <div className="mt-auto px-6 pb-5 pt-4">
          {isAvailable ? (
            <button
              onClick={handleClick}
              className="h-12 w-full rounded-full bg-sky-300/90 font-semibold text-slate-900 hover:bg-sky-300 transition-colors"
            >
              Abrir
            </button>
          ) : (
            <div className="h-12 w-full rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-xs text-white/60">Em breve</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
