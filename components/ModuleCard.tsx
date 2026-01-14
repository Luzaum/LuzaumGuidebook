import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Module } from '../modules/registry'
import { Button } from './ui/button'

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
      className={`h-full rounded-2xl border bg-surface-2/60 dark:bg-surface-2/40 backdrop-blur transition-all duration-300 ${
        isPlanned
          ? 'opacity-60 cursor-not-allowed'
          : 'cursor-pointer hover:border-primary/50 hover:shadow-lg'
      }`}
      onClick={handleClick}
    >
      <div className="flex h-full flex-col p-6">
        {/* Badge */}
        <div className="mb-3">
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              module.status === 'internal'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                : module.status === 'iframe'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {module.status === 'internal'
              ? 'INTERNO'
              : module.status === 'iframe'
              ? 'EXTERNO'
              : 'EM BREVE'}
          </span>
        </div>

        {/* Icon */}
        <div className="p-3 bg-surface/50 rounded-lg inline-block text-primary w-fit">
          {module.iconImage ? (
            <img 
              src={module.iconImage} 
              alt={`${module.title} logo`}
              className="h-6 w-6 object-contain dark:invert dark:brightness-0 dark:contrast-200"
            />
          ) : (
            <Icon className="h-6 w-6" />
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-semibold leading-snug line-clamp-1 text-foreground">
          {module.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {module.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-6">
          {isAvailable ? (
            <Button
              variant="primary"
              className="w-full rounded-full"
              onClick={handleClick}
            >
              Abrir
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-full rounded-full opacity-0" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">Em breve</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
