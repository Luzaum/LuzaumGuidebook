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
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70 mb-4">{description}</p>

      {(normal || abnormal) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {normal && (
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-emerald-400">Normal</p>
                <p className="text-sm text-white/60">{normal}</p>
              </div>
            </div>
          )}
          {abnormal && (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-400">Alterado</p>
                <p className="text-sm text-white/60">{abnormal}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {tips && tips.length > 0 && (
        <div className="pt-4 border-t border-white/10">
          <p className="text-sm font-medium text-gold mb-2">Dicas rápidas</p>
          <ul className="space-y-1 text-sm text-white/60">
            {tips.map((tip, index) => (
              <li key={`${tip}-${index}`}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
