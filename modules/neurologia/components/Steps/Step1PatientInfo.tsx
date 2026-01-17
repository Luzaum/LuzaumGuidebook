import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../UI/Button'
import { Card } from '../UI/Card'
import { Chip } from '../UI/Chip'
import { Slider } from '../UI/Slider'
import { Dog, Cat } from 'lucide-react'
import type { Patient } from '../../stores/caseStore'
import { normalizePatient } from '../../lib/validation/normalizePatient'

interface Step1Props {
  patient: Patient
  setPatient: (patch: Partial<Patient>) => void
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

const COMORBIDITIES = Object.keys(COMORBIDITY_LABELS) as Array<keyof typeof COMORBIDITY_LABELS>

export function Step1PatientInfo({ patient, setPatient }: Step1Props) {
  const handleSetPatient = (patch: Partial<Patient>) => {
    const normalized = normalizePatient({ ...patient, ...patch })
    setPatient(normalized)
  }

  const toggleComorbidity = (comorbidity: string) => {
    const current = patient.comorbidities
    const newComorbidities = current.includes(comorbidity)
      ? current.filter((c) => c !== comorbidity)
      : [...current, comorbidity]
    setPatient({ comorbidities: newComorbidities })
  }

  return (
    <div className="space-y-8 pb-24">
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
          Identificação do Paciente
        </h2>
        <p className="text-neutral-400">
          Dados básicos para contextualizar o exame.
        </p>
      </motion.div>

      {/* Species */}
      <section className="grid grid-cols-2 gap-4">
        <Button
          variant={patient.species === 'dog' ? 'primary' : 'secondary'}
          onClick={() => handleSetPatient({ species: 'dog' })}
          className="h-24 flex flex-col gap-2"
        >
          <Dog size={32} />
          <span>Cão</span>
        </Button>
        <Button
          variant={patient.species === 'cat' ? 'primary' : 'secondary'}
          onClick={() => handleSetPatient({ species: 'cat' })}
          className="h-24 flex flex-col gap-2"
        >
          <Cat size={32} />
          <span>Gato</span>
        </Button>
      </section>

      {/* Age & Weight */}
      <Card>
        <div className="space-y-6">
          <Slider
            label="Idade (anos)"
            value={patient.ageYears || 0}
            min={0}
            max={20}
            onChange={(v) => handleSetPatient({ ageYears: v })}
            unit="anos"
          />
          <Slider
            label="Idade (meses)"
            value={patient.ageMonths || 0}
            min={0}
            max={11}
            onChange={(v) => handleSetPatient({ ageMonths: v })}
            unit="meses"
          />
          <div className="pt-4 border-t border-white/5">
            <label className="text-sm font-medium text-neutral-300 mb-2 block">
              Peso (kg)
            </label>
            <input
              type="number"
              value={patient.weightKg || ''}
              onChange={(e) =>
                handleSetPatient({
                  weightKg: e.target.value ? parseFloat(e.target.value) : null,
                })
              }
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="0.0 kg"
            />
          </div>
        </div>
      </Card>

      {/* Sex & Reproductive Status */}
      <Card>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-300 mb-2 block">
              Sexo
            </label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={patient.sex === 'male' ? 'primary' : 'secondary'}
                onClick={() => handleSetPatient({ sex: 'male' })}
                className="flex-1"
              >
                Macho
              </Button>
              <Button
                size="sm"
                variant={patient.sex === 'female' ? 'primary' : 'secondary'}
                onClick={() => handleSetPatient({ sex: 'female' })}
                className="flex-1"
              >
                Fêmea
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-300 mb-2 block">
              Estado Reprodutivo
            </label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={patient.reproStatus === 'intact' ? 'primary' : 'secondary'}
                onClick={() => handleSetPatient({ reproStatus: 'intact' })}
                className="flex-1"
              >
                Inteiro
              </Button>
              <Button
                size="sm"
                variant={patient.reproStatus === 'neutered' ? 'primary' : 'secondary'}
                onClick={() => handleSetPatient({ reproStatus: 'neutered' })}
                className="flex-1"
              >
                Castrado
              </Button>
            </div>
          </div>

          {/* Life Stage */}
          <div>
            <label className="text-sm font-medium text-neutral-300 mb-2 block">
              Estágio de Vida
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['neonate', 'pediatric', 'adult', 'geriatric'] as const).map((stage) => {
                const labels: Record<typeof stage, string> = {
                  neonate: 'Neonato',
                  pediatric: 'Pediátrico',
                  adult: 'Adulto',
                  geriatric: 'Geriátrico',
                }
                return (
                  <Button
                    key={stage}
                    size="sm"
                    variant={patient.lifeStage === stage ? 'primary' : 'secondary'}
                    onClick={() => handleSetPatient({ lifeStage: stage })}
                  >
                    {labels[stage]}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Gestante/Lactante (apenas se fêmea) */}
          {patient.sex === 'female' && (
            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">
                Estado Fisiológico
              </label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={patient.pregnant ? 'primary' : 'secondary'}
                  onClick={() =>
                    handleSetPatient({ pregnant: !patient.pregnant })
                  }
                  className="flex-1"
                >
                  Gestante
                </Button>
                <Button
                  size="sm"
                  variant={patient.lactating ? 'primary' : 'secondary'}
                  onClick={() =>
                    handleSetPatient({ lactating: !patient.lactating })
                  }
                  className="flex-1"
                >
                  Lactante
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Comorbidades */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Comorbidades</h3>
        <Card>
          <p className="text-sm text-neutral-400 mb-4">
            Selecione todas as comorbidades relevantes para este paciente.
          </p>
          <div className="flex flex-wrap gap-2">
            {COMORBIDITIES.map((comorbidity) => (
              <Chip
                key={comorbidity}
                label={COMORBIDITY_LABELS[comorbidity]}
                selected={patient.comorbidities.includes(comorbidity)}
                onClick={() => toggleComorbidity(comorbidity)}
              />
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
