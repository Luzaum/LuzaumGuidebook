import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FileText, Copy, Check } from 'lucide-react'
import { Button } from './UI/Button'
import { Modal } from './UI/Modal'
import { useCaseStore } from '../stores/caseStore'
import { buildQuickExamReportText, quickReportScopeFromPathname, quickReportScopeHint } from '../lib/quickExamReportText'

export function NeuroQuickReportButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { pathname } = useLocation()
  const patient = useCaseStore((s) => s.patient)
  const complaint = useCaseStore((s) => s.complaint)
  const neuroExam = useCaseStore((s) => s.neuroExam)

  const scope = useMemo(() => quickReportScopeFromPathname(pathname), [pathname])

  const text = useMemo(
    () =>
      buildQuickExamReportText(patient, complaint, neuroExam as Record<string, unknown>, scope),
    [patient, complaint, neuroExam, scope],
  )

  const scopeHint = quickReportScopeHint(scope)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <>
      <Button type="button" variant="primary" className="gap-2 shadow-md" onClick={() => setOpen(true)}>
        <FileText className="h-4 w-4" />
        Gerar relatório rápido
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Relatório rápido" size="full">
        <div className="flex min-h-0 flex-col space-y-4">
          <p className="text-sm text-muted-foreground">{scopeHint} Ajuste manualmente antes de arquivar.</p>
          <textarea
            readOnly
            value={text}
            className="min-h-[min(70vh,36rem)] w-full flex-1 resize-y rounded-xl border border-border bg-background/95 px-3 py-3 font-mono text-xs leading-relaxed text-foreground shadow-inner sm:min-h-[min(72vh,40rem)] sm:text-sm"
            spellCheck={false}
            aria-label="Texto do relatório rápido"
          />
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Fechar
            </Button>
            <Button type="button" variant="primary" className="gap-2" onClick={copy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copiado' : 'Copiar texto'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
