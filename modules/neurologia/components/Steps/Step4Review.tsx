import React from 'react'
import { motion } from 'framer-motion'
import { AppState, EvaluationStatus } from '../../types'
import { Card } from '../UI/Card'
import { CheckCircle, AlertTriangle, Edit2 } from 'lucide-react'

interface Step4Props {
  state: AppState
  onEditStep: (step: number) => void
}

export function Step4Review({ state, onEditStep }: Step4Props) {
  const { patient, exam, chiefComplaints } = state
  // Helper to find altered exams
  const alteredFindings = Object.entries(exam.findings).filter(
    ([_, val]) =>
      val !== EvaluationStatus.Normal &&
      val !== 'Ausente' &&
      val !== 'Presente', // Filter out normal binary states if needed, simplified logic here
  )

  return (
    <div className="space-y-6 pb-24">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Revisão dos Achados
        </h2>
        <p className="text-neutral-400">Confirme os dados antes da análise.</p>
      </motion.div>

      {/* Patient Summary */}
      <Card className="relative">
        <button
          onClick={() => onEditStep(1)}
          className="absolute top-4 right-4 text-gold hover:text-white"
        >
          <Edit2 size={18} />
        </button>
        <h3 className="text-lg font-semibold text-white mb-3">Paciente</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-neutral-400">Espécie:</span>
          <span className="text-white">{patient.species}</span>
          <span className="text-neutral-400">Idade:</span>
          <span className="text-white">
            {patient.age.years}a {patient.age.months}m
          </span>
          <span className="text-neutral-400">Sexo:</span>
          <span className="text-white">{patient.sex}</span>
          <span className="text-neutral-400">Peso:</span>
          <span className="text-white">{patient.weight} kg</span>
        </div>

        {patient.redFlags.length > 0 && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertTriangle size={16} />
              <span className="font-bold text-xs uppercase">Red Flags</span>
            </div>
            <ul className="list-disc list-inside text-sm text-red-200">
              {patient.redFlags.map((flag) => (
                <li key={flag}>{flag}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Complaints */}
      <Card className="relative">
        <button
          onClick={() => onEditStep(2)}
          className="absolute top-4 right-4 text-gold hover:text-white"
        >
          <Edit2 size={18} />
        </button>
        <h3 className="text-lg font-semibold text-white mb-3">Queixas</h3>
        <div className="flex flex-wrap gap-2">
          {chiefComplaints.map((c) => (
            <span
              key={c}
              className="px-2 py-1 bg-neutral-800 rounded text-sm text-white border border-white/10"
            >
              {c}
            </span>
          ))}
        </div>
      </Card>

      {/* Exam Highlights */}
      <Card className="relative">
        <button
          onClick={() => onEditStep(3)}
          className="absolute top-4 right-4 text-gold hover:text-white"
        >
          <Edit2 size={18} />
        </button>
        <h3 className="text-lg font-semibold text-white mb-3">
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
                className="flex justify-between items-center text-sm border-b border-white/5 pb-1"
              >
                <span className="text-neutral-300 capitalize">
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
