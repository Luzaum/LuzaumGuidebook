import React, { useState } from 'react'
import { BookmarkPlus } from 'lucide-react'
import { Button } from './UI/Button'
import { useCaseStore } from '../stores/caseStore'
import { useHistoryStore } from '../stores/historyStore'
import { Modal } from './UI/Modal'

export function SaveToHistoryButton() {
  const [open, setOpen] = useState(false)
  const [label, setLabel] = useState('')
  const patient = useCaseStore((s) => s.patient)
  const complaint = useCaseStore((s) => s.complaint)
  const neuroExam = useCaseStore((s) => s.neuroExam)
  const currentStep = useCaseStore((s) => s.currentStep)
  const addEntry = useHistoryStore((s) => s.addEntry)

  const save = () => {
    addEntry({
      label: label.trim() || undefined,
      patient,
      complaint,
      neuroExam: neuroExam as Record<string, unknown>,
      currentStep,
    })
    setOpen(false)
    setLabel('')
  }

  return (
    <>
      <Button type="button" variant="secondary" className="gap-2" onClick={() => setOpen(true)}>
        <BookmarkPlus className="h-4 w-4" />
        Salvar no histórico local
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Salvar exame" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-foreground/90">
            Os dados ficam armazenados apenas neste navegador (dispositivo). Opcional: nome para
            identificar depois.
          </p>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ex.: Rex — consulta 12/04"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="button" onClick={save}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
