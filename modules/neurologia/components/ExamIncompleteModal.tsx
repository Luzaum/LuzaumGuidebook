import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Modal } from './UI/Modal'
import { Button } from './UI/Button'
import {
  groupUnfilledFieldsBySection,
  type UnfilledExamFieldDetail,
} from '../lib/exam/examDefaults'

interface ExamIncompleteModalProps {
  isOpen: boolean
  fields: UnfilledExamFieldDetail[]
  onClose: () => void
  onConfirm: () => void
  compact?: boolean
}

export function ExamIncompleteModal({
  isOpen,
  fields,
  onClose,
  onConfirm,
  compact = false,
}: ExamIncompleteModalProps) {
  const grouped = groupUnfilledFieldsBySection(fields)
  const highImpactCount = fields.filter((f) => f.highImpact).length

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Exame incompleto" size="md">
      <div className="space-y-4">
        <div
          className={`flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 ${
            compact ? 'p-3' : 'p-4'
          }`}
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden />
          <div className="min-w-0 text-sm text-foreground/90">
            <p className="font-medium text-amber-100">
              {fields.length} item(ns) não selecionado(s)
              {highImpactCount > 0 ? ` — ${highImpactCount} de alto impacto diagnóstico` : ''}.
            </p>
            <p className={`mt-2 leading-relaxed ${compact ? 'text-xs' : ''}`}>
              Campos omitidos podem reduzir a confiança da neurolocalização. Ao continuar, cada item abaixo
              receberá o valor indicado (basal ou inferido dos achados já marcados).
            </p>
          </div>
        </div>

        <div className={`overflow-y-auto rounded-xl border border-border bg-background/40 ${compact ? 'max-h-52' : 'max-h-72'} p-3`}>
          <div className="space-y-4">
            {grouped.map(({ sectionTitle, items }) => (
              <section key={sectionTitle}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {sectionTitle}
                </p>
                <ul className="space-y-2">
                  {items.map((field) => (
                    <li
                      key={field.key}
                      className="rounded-lg border border-border/70 bg-background/80 px-3 py-2 text-sm"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-medium text-foreground">{field.label}</span>
                        {field.highImpact && (
                          <span className="rounded-full border border-amber-500/35 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                            Alto impacto
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Será assumido:{' '}
                        <span className="font-semibold text-emerald-200/90">{field.assumedValue}</span>
                        <span className="text-muted-foreground/80"> — {field.assumedHint}</span>
                        {field.inferredFromContext && (
                          <span className="ml-1 text-cyan-300/80">(inferido do exame parcial)</span>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className={`flex gap-2 ${compact ? 'flex-col' : 'flex-col-reverse sm:flex-row sm:justify-end'}`}>
          <Button variant="secondary" onClick={onClose}>
            Voltar e preencher
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Continuar com valores assumidos
          </Button>
        </div>
      </div>
    </Modal>
  )
}
