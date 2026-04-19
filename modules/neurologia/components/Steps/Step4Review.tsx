import React from 'react'
import { motion } from 'framer-motion'
import { ActivitySquare, AlertTriangle, CheckCircle, Clock3, Edit2, PawPrint, ShieldAlert } from 'lucide-react'
import { EvaluationStatus } from '../../types'
import { Card } from '../UI/Card'
import { SaveToHistoryButton } from '../SaveToHistoryButton'
import type { ComplaintContext, Patient } from '../../stores/caseStore'
import {
  CHIEF_COMPLAINT_LABELS,
  RED_FLAG_LABELS,
  TEMPORAL_LABELS,
  EVOLUTION_LABELS,
} from '../../data/complaintDictionaries'

interface Step4Props {
  patient: Patient
  complaint: ComplaintContext
  exam: Record<string, any>
  onEditStep: (step: number) => void
}

const LIFE_STAGE_LABELS: Record<string, string> = {
  neonate: 'Neonato',
  pediatric: 'Pediátrico',
  adult: 'Adulto',
  geriatric: 'Geriátrico',
}

export function Step4Review({ patient, complaint, exam, onEditStep }: Step4Props) {
  const alteredFindings = Object.entries(exam).filter(
    ([_, val]) =>
      val !== EvaluationStatus.Normal &&
      val !== 'Ausente' &&
      val !== 'Presente' &&
      val !== undefined &&
      val !== null,
  )

  const speciesLabel = patient.species === 'dog' ? 'Cão' : patient.species === 'cat' ? 'Gato' : 'Não informado'
  const sexLabel = patient.sex === 'male' ? 'Macho' : patient.sex === 'female' ? 'Fêmea' : 'Não informado'
  const reproLabel = patient.reproStatus === 'intact' ? 'Inteiro' : patient.reproStatus === 'neutered' ? 'Castrado' : 'Não informado'
  const lifeStageLabel = patient.lifeStage ? LIFE_STAGE_LABELS[patient.lifeStage] || 'Não informado' : 'Não informado'

  return (
    <div className="space-y-6 pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Revisão dos achados</h2>
        <p className="max-w-2xl text-muted-foreground">
          Confirme anamnese, curso temporal e exame antes da análise. Estrutura alinhada ao fluxo clínico do livro-base
          (história → exame → síntese).
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2">
        <SaveToHistoryButton />
      </div>

      <Card className="relative overflow-hidden">
        <button
          onClick={() => onEditStep(1)}
          className="absolute top-4 right-4 text-gold hover:text-foreground"
          aria-label="Editar dados do paciente"
        >
          <Edit2 size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <PawPrint className="w-5 h-5 text-gold" />
          <h3 className="text-lg font-semibold text-foreground">Perfil do paciente</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          {[
            ['Espécie', speciesLabel],
            ['Idade', `${patient.ageYears || 0}a ${patient.ageMonths || 0}m`],
            ['Sexo', sexLabel],
            ['Reprodutivo', reproLabel],
            ['Fase de vida', lifeStageLabel],
            ['Peso', `${patient.weightKg || 'Não informado'} kg`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-background/70 p-3">
              <div className="text-xs text-muted-foreground">{k}</div>
              <div className="text-sm font-semibold text-foreground mt-1">{v}</div>
            </div>
          ))}
        </div>

        {patient.comorbidities.length > 0 && (
          <div className="mt-4 rounded-xl border border-border bg-background/60 p-3">
            <div className="text-xs text-muted-foreground mb-1">Comorbidades</div>
            <div className="flex flex-wrap gap-2">
              {patient.comorbidities.map((c) => (
                <span key={c.key} className="px-2 py-1 rounded-full text-xs border border-gold/35 bg-gold/10 text-gold">
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card className="relative">
        <button
          onClick={() => onEditStep(2)}
          className="absolute top-4 right-4 text-gold hover:text-foreground"
          aria-label="Editar queixas e contexto"
        >
          <Edit2 size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Clock3 className="w-5 h-5 text-gold" />
          <h3 className="text-lg font-semibold text-foreground">Queixas e contexto clínico</h3>
        </div>

        <div className="space-y-5">
          {complaint.chiefComplaintIds.length > 0 && (
            <div>
              <span className="mb-2 block text-sm font-medium text-muted-foreground">Queixas / sinais relatados</span>
              <div className="flex flex-wrap gap-2">
                {complaint.chiefComplaintIds.map((c) => (
                  <span
                    key={c}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {CHIEF_COMPLAINT_LABELS[c] || c}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-background/70 p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Padrão temporal</div>
              <div className="mt-1 text-sm font-semibold text-foreground">
                {complaint.temporalPattern
                  ? TEMPORAL_LABELS[complaint.temporalPattern] || complaint.temporalPattern
                  : 'Não informado'}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-4 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Evolução</div>
              <div className="mt-1 text-sm font-semibold text-foreground">
                {complaint.evolutionPattern
                  ? EVOLUTION_LABELS[complaint.evolutionPattern] || complaint.evolutionPattern
                  : 'Não informado'}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-4 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Contexto marcado</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  complaint.trauma && 'Trauma',
                  complaint.toxin && 'Toxina',
                  complaint.fever && 'Febre',
                  complaint.ectoparasiticideExposure && 'Ectoparasiticida',
                  complaint.systemicDisease && 'Doença sistêmica',
                  complaint.recentSurgeryAnesthesia && 'Cirurgia/anestesia',
                  complaint.vaccinationOrTravel && 'Vacina/viagem',
                  complaint.videoOfEpisode && 'Vídeo',
                  complaint.respiratoryGiSigns && 'Resp./GI',
                  complaint.anticonvulsantOrNeuroMeds && 'Anticonvulsivante/neuro',
                  complaint.recentMedChange && 'Mudança de meds',
                ]
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={String(tag)}
                      className="rounded-md border border-gold/25 bg-gold/10 px-2 py-0.5 text-[11px] font-medium text-gold"
                    >
                      {tag}
                    </span>
                  ))}
                {!complaint.trauma &&
                  !complaint.toxin &&
                  !complaint.fever &&
                  !complaint.ectoparasiticideExposure &&
                  !complaint.systemicDisease &&
                  !complaint.recentSurgeryAnesthesia &&
                  !complaint.vaccinationOrTravel &&
                  !complaint.videoOfEpisode &&
                  !complaint.respiratoryGiSigns &&
                  !complaint.anticonvulsantOrNeuroMeds &&
                  !complaint.recentMedChange && (
                    <span className="text-xs text-muted-foreground">Nenhum item marcado</span>
                  )}
              </div>
            </div>
          </div>

          {complaint.contextNotes && (
            <div className="rounded-xl border border-border bg-background/70 p-4">
              <div className="text-xs font-medium text-muted-foreground">Observações livres</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{complaint.contextNotes}</p>
            </div>
          )}
        </div>

        {complaint.redFlags.length > 0 && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
            <div className="flex items-center gap-2 text-red-300 mb-2">
              <ShieldAlert size={16} />
              <span className="font-bold text-xs uppercase">Red flags</span>
            </div>
            <ul className="list-inside list-disc text-sm text-red-100">
              {complaint.redFlags.map((flag) => (
                <li key={flag}>{RED_FLAG_LABELS[flag as keyof typeof RED_FLAG_LABELS] || flag}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <Card className="relative">
        <button
          onClick={() => onEditStep(3)}
          className="absolute top-4 right-4 text-gold hover:text-foreground"
          aria-label="Editar exame neurológico"
        >
          <Edit2 size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <ActivitySquare className="w-5 h-5 text-gold" />
          <h3 className="text-lg font-semibold text-foreground">Resumo visual do exame neurológico</h3>
        </div>

        {alteredFindings.length === 0 ? (
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle size={20} />
            <span>Nenhuma alteração relevante registrada.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {alteredFindings.map(([key, val]) => (
              <div key={key} className="rounded-xl border border-gold/35 bg-gold/10 p-3">
                <div className="text-xs text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</div>
                <div className="text-sm font-semibold text-gold mt-1">{String(val)}</div>
              </div>
            ))}
          </div>
        )}

        {alteredFindings.length > 0 && (
          <div className="mt-4 rounded-xl border border-amber-500/35 bg-amber-500/10 p-3 text-amber-100 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-semibold">Resumo clínico</span>
            </div>
            Achados alterados identificados em {alteredFindings.length} item(ns). Revise antes de prosseguir para aumentar a confiança da análise.
          </div>
        )}
      </Card>
    </div>
  )
}
