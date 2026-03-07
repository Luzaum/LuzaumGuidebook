import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../UI/Card'
import type { Patient } from '../../stores/caseStore'
import type { ComorbidityKey, ComorbidityItem, LifeStage } from '../../stores/caseStore'
import { normalizePatient } from '../../lib/validation/normalizePatient'

interface Step1Props {
  patient: Patient
  setPatient: (patch: Partial<Patient>) => void
}

const COMORBIDITY_CONFIG: Record<ComorbidityKey, { label: string; description?: string }> = {
  renal: { label: 'Nefropatia (DRC/IRA)', description: 'Insuficiência renal crônica ou aguda' },
  hepática: { label: 'Hepatopatia', description: 'Doença hepática' },
  cardíaca: { label: 'Cardiopatia', description: 'Doença cardíaca' },
  endocrina: { label: 'Endocrinopatia', description: 'Distúrbios endócrinos' },
  respiratória: { label: 'Pneumopatia', description: 'Doença respiratória' },
  neuromuscular: { label: 'Neuromuscular', description: 'Doença neuromuscular' },
  neoplasica: { label: 'Neoplasia', description: 'Neoplasia ativa' },
  imunomediada: { label: 'Imunomediada', description: 'Doença imunomediada' },
  hipertensão: { label: 'Hipertensão', description: 'Hipertensão arterial sistêmica' },
  coagulopatia: { label: 'Coagulopatia', description: 'Distúrbio de coagulação' },
}

const COMORBIDITY_KEYS = Object.keys(COMORBIDITY_CONFIG) as ComorbidityKey[]

const LIFE_STAGE_LABELS: Record<LifeStage, string> = {
  neonate: 'Neonato',
  pediatric: 'Pediátrico',
  adult: 'Adulto',
  geriatric: 'Geriátrico',
}

function getLifeStageFromAge(ageYears: number | null, ageMonths: number | null): LifeStage | null {
  const years = ageYears ?? 0
  const months = ageMonths ?? 0
  const totalMonths = years * 12 + months

  if (totalMonths <= 0) return null
  if (totalMonths <= 3) return 'neonate'
  if (totalMonths < 12) return 'pediatric'
  if (totalMonths < 96) return 'adult'
  return 'geriatric'
}

function clampInteger(value: string, min: number, max: number): number | null {
  if (value.trim() === '') return null
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed)) return null
  return Math.max(min, Math.min(max, parsed))
}

export function Step1PatientInfo({ patient, setPatient }: Step1Props) {
  const handleSetPatient = (patch: Partial<Patient>) => {
    const merged = { ...patient, ...patch }

    if ('ageYears' in patch || 'ageMonths' in patch) {
      merged.lifeStage = getLifeStageFromAge(merged.ageYears, merged.ageMonths)
    }

    const normalized = normalizePatient(merged)
    setPatient(normalized)
  }

  const toggleComorbidity = (key: ComorbidityKey) => {
    const current = patient.comorbidities
    const existingIndex = current.findIndex((c) => c.key === key)

    let newComorbidities: ComorbidityItem[]
    if (existingIndex >= 0) {
      newComorbidities = current.filter((c) => c.key !== key)
    } else {
      const config = COMORBIDITY_CONFIG[key]
      newComorbidities = [...current, { key, label: config.label }]
    }

    setPatient({ comorbidities: newComorbidities })
  }

  const lifeStageLabel = patient.lifeStage ? LIFE_STAGE_LABELS[patient.lifeStage] : 'Não definido'

  return (
    <div className="space-y-8 pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-foreground mb-2">Identificação do paciente</h2>
        <p className="text-muted-foreground">Dados básicos para contextualizar o exame neurológico.</p>
      </motion.div>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSetPatient({ species: 'dog' })}
          className={`h-28 rounded-2xl border p-4 transition-all ${
            patient.species === 'dog'
              ? 'border-gold/70 bg-gold/12 shadow-[0_10px_30px_rgba(245,197,66,0.2)]'
              : 'border-border bg-card hover:border-gold/45'
          }`}
        >
          <div className="flex items-center justify-center gap-3 h-full">
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-4xl">
              🐶
            </motion.span>
            <div className="text-left">
              <div className="text-lg font-semibold text-foreground">Cão</div>
              <div className="text-xs text-muted-foreground">Paciente canino</div>
            </div>
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSetPatient({ species: 'cat' })}
          className={`h-28 rounded-2xl border p-4 transition-all ${
            patient.species === 'cat'
              ? 'border-gold/70 bg-gold/12 shadow-[0_10px_30px_rgba(245,197,66,0.2)]'
              : 'border-border bg-card hover:border-gold/45'
          }`}
        >
          <div className="flex items-center justify-center gap-3 h-full">
            <motion.span animate={{ rotate: [0, -6, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="text-4xl">
              🐱
            </motion.span>
            <div className="text-left">
              <div className="text-lg font-semibold text-foreground">Gato</div>
              <div className="text-xs text-muted-foreground">Paciente felino</div>
            </div>
          </div>
        </motion.button>
      </section>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Idade (anos)</label>
            <input
              type="number"
              min={0}
              max={30}
              inputMode="numeric"
              value={patient.ageYears ?? ''}
              onChange={(e) => handleSetPatient({ ageYears: clampInteger(e.target.value, 0, 30) })}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-foreground outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="Ex.: 12"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Idade (meses)</label>
            <input
              type="number"
              min={0}
              max={11}
              inputMode="numeric"
              value={patient.ageMonths ?? ''}
              onChange={(e) => handleSetPatient({ ageMonths: clampInteger(e.target.value, 0, 11) })}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-foreground outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="0 a 11"
            />
          </div>
          <div className="rounded-xl border border-gold/35 bg-gold/10 px-4 py-3">
            <div className="text-xs text-muted-foreground">Estágio de vida</div>
            <div className="text-sm font-semibold text-gold">{lifeStageLabel}</div>
          </div>
        </div>

        <div className="pt-5 mt-5 border-t border-border">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Peso (kg)</label>
          <input
            type="number"
            value={patient.weightKg || ''}
            onChange={(e) =>
              handleSetPatient({
                weightKg: e.target.value ? Number.parseFloat(e.target.value) : null,
              })
            }
            className="w-full bg-background border border-border rounded-xl p-3 text-foreground focus:ring-2 focus:ring-gold/50 outline-none"
            placeholder="0,0 kg"
          />
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Sexo</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSetPatient({ sex: 'male' })}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  patient.sex === 'male' ? 'border-gold/65 bg-gold/12 text-gold' : 'border-border bg-background text-foreground hover:border-gold/40'
                }`}
              >
                Macho
              </button>
              <button
                type="button"
                onClick={() => handleSetPatient({ sex: 'female' })}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  patient.sex === 'female' ? 'border-gold/65 bg-gold/12 text-gold' : 'border-border bg-background text-foreground hover:border-gold/40'
                }`}
              >
                Fêmea
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Estado reprodutivo</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSetPatient({ reproStatus: 'intact' })}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  patient.reproStatus === 'intact' ? 'border-gold/65 bg-gold/12 text-gold' : 'border-border bg-background text-foreground hover:border-gold/40'
                }`}
              >
                Inteiro
              </button>
              <button
                type="button"
                onClick={() => handleSetPatient({ reproStatus: 'neutered' })}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  patient.reproStatus === 'neutered' ? 'border-gold/65 bg-gold/12 text-gold' : 'border-border bg-background text-foreground hover:border-gold/40'
                }`}
              >
                Castrado
              </button>
            </div>
          </div>

          {patient.sex === 'female' && (
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Estado fisiológico</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSetPatient({ pregnant: !patient.pregnant })}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    patient.pregnant ? 'border-gold/65 bg-gold/12 text-gold' : 'border-border bg-background text-foreground hover:border-gold/40'
                  }`}
                >
                  Gestante
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPatient({ lactating: !patient.lactating })}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    patient.lactating ? 'border-gold/65 bg-gold/12 text-gold' : 'border-border bg-background text-foreground hover:border-gold/40'
                  }`}
                >
                  Lactante
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Comorbidades</h3>
          <p className="text-sm text-muted-foreground">Selecione as comorbidades relevantes. A severidade foi removida desta etapa.</p>
        </div>

        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMORBIDITY_KEYS.map((key) => {
              const config = COMORBIDITY_CONFIG[key]
              const isSelected = patient.comorbidities.some((c) => c.key === key)

              return (
                <motion.button
                  key={key}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleComorbidity(key)}
                  className={`text-left rounded-xl border p-3 transition ${
                    isSelected
                      ? 'border-gold/65 bg-gold/12'
                      : 'border-border bg-background hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 h-5 w-5 rounded border ${isSelected ? 'border-gold bg-gold/30' : 'border-border bg-background'}`} />
                    <div>
                      <div className={`font-medium ${isSelected ? 'text-gold' : 'text-foreground'}`}>{config.label}</div>
                      {config.description && <p className="text-xs text-muted-foreground mt-1">{config.description}</p>}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </Card>
      </section>
    </div>
  )
}
