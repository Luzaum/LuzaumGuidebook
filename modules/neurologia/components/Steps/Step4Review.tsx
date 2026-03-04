import React from 'react'
import { motion } from 'framer-motion'
import { EvaluationStatus } from '../../types'
import { Card } from '../UI/Card'
import { CheckCircle, AlertTriangle, Edit2, Search } from 'lucide-react'
import type { Patient } from '../../stores/caseStore'
import type { ComplaintContext } from '../../stores/caseStore'

interface Step4Props {
  patient: Patient
  complaint: ComplaintContext
  exam: Record<string, any>
  onEditStep: (step: number) => void
}

const COMORBIDITY_LABELS: Record<string, string> = {
  renal: 'Renopata',
  hepatic: 'Hepatopata',
  cardiac: 'Cardiopata',
  endocrine: 'Endocrinopata',
  respiratory: 'Pneumopata',
  neoplasia: 'Neoplasia',
  immunosuppressed: 'Imunossuprimido',
  coagulopathy: 'Coagulopata',
  hypertension: 'Hipertensão',
  toxin_exposure: 'Exposição a toxinas',
  recent_trauma: 'Trauma recente',
  infectious_risk: 'Risco infeccioso',
}

const TEMPORAL_LABELS: Record<string, string> = {
  peragudo: 'Peragudo (<24h)',
  agudo: 'Agudo (24-48h)',
  subagudo: 'Subagudo (dias)',
  cronico: 'Crônico (semanas/meses)',
  episodico: 'Episódico',
}

const EVOLUTION_LABELS: Record<string, string> = {
  melhorando: 'Melhorando',
  estático: 'Estático',
  flutuante: 'Flutuante',
  progressivo: 'Progressivo',
}

const RED_FLAG_LABELS: Record<string, string> = {
  coma_estupor: 'Coma / Estupor',
  status_epilepticus: 'Status Epilepticus / Cluster Grave',
  severe_progression_24h: 'Piora Neurológica Rápida (<24h)',
  acute_nonambulatory: 'Não Ambulatório Agudo',
  respiratory_compromise: 'Sinais Respiratórios / Aspiração',
  deep_pain_loss: 'Dor Profunda Ausente',
  severe_cervical_pain: 'Cervicalgia Intensa',
  anisocoria_acute: 'Anisocoria Aguda',
  dysphagia_aspiration_risk: 'Disfagia com Risco de Aspiração',
}

export function Step4Review({ patient, complaint, exam, onEditStep }: Step4Props) {
  // Helper to find altered exams
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
  const lifeStageLabel =
    patient.lifeStage === 'neonate'
      ? 'Neonato'
      : patient.lifeStage === 'pediatric'
        ? 'Pediátrico'
        : patient.lifeStage === 'adult'
          ? 'Adulto'
          : patient.lifeStage === 'geriatric'
            ? 'Geriátrico'
            : 'Não informado'

  return (
    <div className="space-y-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8 bg-muted/30 p-4 rounded-2xl border border-border/40"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
          <Search className="w-7 h-7 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Revisão dos Achados
          </h2>
          <p className="text-muted-foreground text-sm">
            Confirme os dados antes de iniciar a simulação neural.
          </p>
        </div>
      </motion.div>

      {/* Patient Summary */}
      <Card className="relative">
        <button
          onClick={() => onEditStep(1)}
          className="absolute top-4 right-4 text-gold hover:text-white"
          aria-label="Editar dados do paciente"
        >
          <Edit2 size={18} />
        </button>
        <h3 className="text-lg font-semibold text-foreground mb-3">Paciente</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-muted-foreground">Espécie:</span>
          <span className="text-foreground">{speciesLabel}</span>
          <span className="text-muted-foreground">Idade:</span>
          <span className="text-foreground">
            {patient.ageYears || 0}a {patient.ageMonths || 0}m
          </span>
          <span className="text-muted-foreground">Sexo:</span>
          <span className="text-foreground">{sexLabel}</span>
          <span className="text-muted-foreground">Estado Reprodutivo:</span>
          <span className="text-foreground">{reproLabel}</span>
          <span className="text-muted-foreground">Estágio de Vida:</span>
          <span className="text-foreground">{lifeStageLabel}</span>
          {patient.sex === 'female' && (
            <>
              <span className="text-muted-foreground">Gestante:</span>
              <span className="text-foreground">{patient.pregnant ? 'Sim' : 'Não'}</span>
              <span className="text-muted-foreground">Lactante:</span>
              <span className="text-foreground">{patient.lactating ? 'Sim' : 'Não'}</span>
            </>
          )}
          <span className="text-muted-foreground">Peso:</span>
          <span className="text-foreground">{patient.weightKg || 'Não informado'} kg</span>
          {patient.comorbidities.length > 0 && (
            <>
              <span className="text-muted-foreground">Comorbidades:</span>
              <span className="text-foreground">
                {patient.comorbidities.map((c) => COMORBIDITY_LABELS[c.key] || c.label).join(', ')}
              </span>
            </>
          )}
        </div>
      </Card>

      {/* Complaints & Context */}
      <Card className="relative">
        <button
          onClick={() => onEditStep(2)}
          className="absolute top-4 right-4 text-gold hover:text-white"
          aria-label="Editar queixas e contexto"
        >
          <Edit2 size={18} />
        </button>
        <h3 className="text-lg font-semibold text-foreground mb-3">Queixas e Contexto Clínico</h3>
        <div className="space-y-3">
          {complaint.chiefComplaintIds.length > 0 && (
            <div>
              <span className="text-neutral-400 text-sm block mb-2">Queixas Principais:</span>
              <div className="flex flex-wrap gap-2">
                {complaint.chiefComplaintIds.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-1 bg-muted rounded text-sm text-foreground border border-border/40"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
          {complaint.temporalPattern && (
            <div>
              <span className="text-muted-foreground text-sm block mb-1">Padrão Temporal:</span>
              <span className="text-foreground">{TEMPORAL_LABELS[complaint.temporalPattern] || complaint.temporalPattern}</span>
            </div>
          )}
          {complaint.evolutionPattern && (
            <div>
              <span className="text-muted-foreground text-sm block mb-1">Evolução:</span>
              <span className="text-foreground">{EVOLUTION_LABELS[complaint.evolutionPattern] || complaint.evolutionPattern}</span>
            </div>
          )}
          {complaint.contextNotes && (
            <div>
              <span className="text-muted-foreground text-sm block mb-1">Contexto Clínico:</span>
              <p className="text-foreground text-sm">{complaint.contextNotes}</p>
            </div>
          )}
        </div>

        {complaint.redFlags.length > 0 && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertTriangle size={16} />
              <span className="font-bold text-xs uppercase">Red Flags</span>
            </div>
            <ul className="list-disc list-inside text-sm text-red-200">
              {complaint.redFlags.map((flag) => (
                <li key={flag}>{RED_FLAG_LABELS[flag] || flag}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Exam Highlights */}
      <Card className="relative">
        <button
          onClick={() => onEditStep(3)}
          className="absolute top-4 right-4 text-gold hover:text-white"
          aria-label="Editar exame neurológico"
        >
          <Edit2 size={18} />
        </button>
        <h3 className="text-lg font-semibold text-foreground mb-3">
          Exame Neurológico
        </h3>

        {alteredFindings.length === 0 ? (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle size={20} />
            <span>Nenhuma alteração registrada.</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {alteredFindings.map(([key, val]) => (
              <li
                key={key}
                className="flex justify-between items-center text-sm border-b border-border/40 pb-1"
              >
                <span className="text-muted-foreground capitalize">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className="text-gold font-medium">{String(val)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
