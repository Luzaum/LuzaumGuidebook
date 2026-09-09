import React from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Card } from './Card'

interface TestIntroProps {
  title: string
  description: string
  normal?: string
  abnormal?: string
  tips?: string[]
}

export function TestIntro({
  title,
  description,
  normal,
  abnormal,
  tips,
}: TestIntroProps) {
  return (
    <Card className="mb-6">
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{description}</p>

      {(normal || abnormal) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {normal && (
            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Normal</p>
                <p className="text-xs sm:text-sm text-foreground/80 mt-0.5">{normal}</p>
              </div>
            </div>
          )}
          {abnormal && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">Alterado</p>
                <p className="text-xs sm:text-sm text-foreground/80 mt-0.5">{abnormal}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {tips && tips.length > 0 && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs sm:text-sm font-semibold text-gold uppercase tracking-wide mb-2">Dicas rápidas</p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
            {tips.map((tip, index) => (
              <li key={`${tip}-${index}`} className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
