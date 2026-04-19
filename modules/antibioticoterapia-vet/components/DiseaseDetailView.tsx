import React, { useMemo, useState } from 'react'
import { BookOpen, Clock, Microscope } from 'lucide-react'
import type { AntibioticClass, ComorbidityState, Disease, PathophysiologyVisual, TreatmentLineBlock } from '../types'
import Icon from './Icon'
import Modal from './Modal'
import RichTextViewer, { InlineRichText } from './RichTextViewer'
import { PathophysiologyVisualView } from './PathophysiologyVisualView'
import { DiseaseTreatmentBlocks } from './DiseaseTreatmentBlocks'

export type DiseaseDetailFooterMode = 'wizard' | 'catalog'

interface DiseaseDetailViewProps {
  disease: Disease
  abDict: AntibioticClass
  comorbidities: ComorbidityState
  onDeepLinkDrug: (drugName: string) => void
  /** Quando true e sem espécie/fase no assistente, mostra aviso com link para completar perfil. */
  showPatientProfilePrompt?: boolean
  onRequestPatientProfile?: () => void
  footerMode: DiseaseDetailFooterMode
  onWizardAnotherCondition?: () => void
  onWizardNewConsult?: () => void
  onCatalogBack?: () => void
}

export const DiseaseDetailView: React.FC<DiseaseDetailViewProps> = ({
  disease,
  abDict,
  comorbidities,
  onDeepLinkDrug,
  showPatientProfilePrompt = false,
  onRequestPatientProfile,
  footerMode,
  onWizardAnotherCondition,
  onWizardNewConsult,
  onCatalogBack,
}) => {
  const [modalInfo, setModalInfo] = useState<{
    title: string
    content: string
    visual?: PathophysiologyVisual
    treatmentAppendix?: TreatmentLineBlock[]
    wide?: boolean
  } | null>(null)

  const drugDetailDedupeSet = useMemo(() => new Set<string>(), [disease.name])

  return (
    <div className="space-y-6">
      {showPatientProfilePrompt ? (
        <div
          className="rounded-lg border p-3 text-sm"
          style={{
            borderColor: 'color-mix(in srgb, hsl(var(--chart-5)) 40%, hsl(var(--border)))',
            background: 'color-mix(in srgb, hsl(var(--chart-5)) 10%, hsl(var(--card)))',
            color: 'hsl(var(--foreground))',
          }}
        >
          <p className="font-medium">Complete o perfil do paciente para ver alertas de dose/comorbidade nos fármacos.</p>
          {onRequestPatientProfile ? (
            <button
              type="button"
              className="mt-2 text-sm font-semibold underline"
              style={{ color: 'hsl(var(--primary))' }}
              onClick={onRequestPatientProfile}
            >
              Definir espécie e fase da vida
            </button>
          ) : null}
        </div>
      ) : null}

      <section
        className="overflow-hidden rounded-2xl border shadow-sm"
        style={{
          borderColor: 'hsl(var(--border))',
          background:
            'linear-gradient(135deg, color-mix(in srgb, hsl(var(--primary)) 14%, hsl(var(--card))) 0%, hsl(var(--card)) 55%)',
        }}
      >
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div className="min-w-0">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              Condição
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'hsl(var(--foreground))' }}>
              {disease.name}
            </h2>
          </div>
          {disease.pathophysiologyFull || disease.pathophysiologyVisual ? (
            <button
              type="button"
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-xl border px-3 py-2.5 text-sm font-semibold shadow-sm transition hover:opacity-90"
              style={{
                borderColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary))',
                background: 'color-mix(in srgb, hsl(var(--primary)) 10%, hsl(var(--card)))',
              }}
              onClick={() =>
                setModalInfo({
                  title: `Fisiopatologia — ${disease.name}`,
                  content: disease.pathophysiologyFull ?? '',
                  visual: disease.pathophysiologyVisual,
                  treatmentAppendix: [disease.firstLine, disease.secondLine, disease.thirdLine].filter(
                    (b): b is TreatmentLineBlock => Boolean(b),
                  ),
                  wide: true,
                })
              }
            >
              <BookOpen className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              Fisiopatologia e quadro clínico
            </button>
          ) : null}
        </div>

        <div
          className="grid gap-3 border-t px-5 pb-5 pt-4 sm:grid-cols-2 sm:px-6 sm:pb-6"
          style={{ borderColor: 'hsl(var(--border))' }}
        >
          <div
            className="flex gap-3 rounded-xl border p-3"
            style={{
              borderColor: 'hsl(var(--border))',
              background: 'color-mix(in srgb, hsl(var(--foreground)) 4%, hsl(var(--card)))',
            }}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: 'color-mix(in srgb, var(--chart-3) 22%, hsl(var(--card)))',
                color: 'hsl(var(--foreground))',
              }}
            >
              <Microscope className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="min-w-0 text-sm">
              <p className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                Patógenos e contexto
              </p>
              <div className="mt-1 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {disease.pathogens ? <InlineRichText text={disease.pathogens} /> : '—'}
              </div>
            </div>
          </div>
          <div
            className="flex gap-3 rounded-xl border p-3"
            style={{
              borderColor: 'hsl(var(--border))',
              background: 'color-mix(in srgb, hsl(var(--foreground)) 4%, hsl(var(--card)))',
            }}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: 'color-mix(in srgb, var(--chart-4) 20%, hsl(var(--card)))',
                color: 'hsl(var(--foreground))',
              }}
            >
              <Clock className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="min-w-0 text-sm">
              <p className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                Duração antimicrobiana (orientativa)
              </p>
              <div className="mt-1 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {disease.duration ? <InlineRichText text={disease.duration} /> : '—'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <h3
          className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Antimicrobianos — fluxo por linha terapêutica
        </h3>
        <div className="space-y-8">
      <DiseaseTreatmentBlocks
        block={disease.firstLine}
        abDict={abDict}
        onSeeGuide={onDeepLinkDrug}
        comorbidities={comorbidities}
        drugDetailDedupeSet={drugDetailDedupeSet}
      />

      {disease.secondLine ? (
        <DiseaseTreatmentBlocks
          block={disease.secondLine}
          abDict={abDict}
          onSeeGuide={onDeepLinkDrug}
          comorbidities={comorbidities}
          drugDetailDedupeSet={drugDetailDedupeSet}
        />
      ) : null}

      {disease.thirdLine ? (
        <DiseaseTreatmentBlocks
          block={disease.thirdLine}
          abDict={abDict}
          onSeeGuide={onDeepLinkDrug}
          comorbidities={comorbidities}
          drugDetailDedupeSet={drugDetailDedupeSet}
        />
      ) : null}
        </div>
      </div>

      {disease.notes ? (
        <div
          className="rounded-2xl border p-4 sm:p-5"
          style={{
            borderColor: 'color-mix(in srgb, hsl(var(--primary)) 28%, hsl(var(--border)))',
            background: 'color-mix(in srgb, hsl(var(--primary)) 6%, hsl(var(--card)))',
          }}
        >
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            <Icon name="help" className="h-4 w-4 shrink-0" />
            Notas clínicas e stewardship
          </h3>
          <div className="text-sm leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
            <RichTextViewer text={disease.notes} />
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-2">
        {footerMode === 'wizard' ? (
          <>
            <button
              type="button"
              onClick={onWizardAnotherCondition}
              className="abv-btn-secondary cursor-pointer rounded-lg px-4 py-2 font-semibold"
            >
              Outra condição
            </button>
            <button
              type="button"
              onClick={onWizardNewConsult}
              className="abv-btn-primary cursor-pointer rounded-lg px-4 py-2 font-semibold"
            >
              Nova consulta
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onCatalogBack}
            className="abv-btn-secondary cursor-pointer rounded-lg px-4 py-2 font-semibold"
          >
            Voltar ao catálogo
          </button>
        )}
      </div>

      <Modal open={!!modalInfo} title={modalInfo?.title || 'Ajuda'} onClose={() => setModalInfo(null)} wide={modalInfo?.wide}>
        {modalInfo?.visual ? (
          <PathophysiologyVisualView
            doc={modalInfo.visual}
            treatmentAppendix={modalInfo.treatmentAppendix}
            treatmentAppendixDedupeKey={disease.name}
          />
        ) : (
          <RichTextViewer text={modalInfo?.content || ''} />
        )}
      </Modal>
    </div>
  )
}
