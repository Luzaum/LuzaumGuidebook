import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../UI/Button'
import { Card } from '../UI/Card'
import { Slider } from '../UI/Slider'
import { Dog, Cat } from 'lucide-react'
import type { Patient } from '../../stores/caseStore'
import type { ComorbidityKey, ComorbidityItem } from '../../stores/caseStore'
import { normalizePatient } from '../../lib/validation/normalizePatient'

interface Step1Props {
  patient: Patient
  setPatient: (patch: Partial<Patient>) => void
}

const COMORBIDITY_CONFIG: Record<
  ComorbidityKey,
  { label: string; description?: string }
> = {
  renal: { label: 'Renopata (DRC/IRA)', description: 'Insuficiência renal crônica ou aguda' },
  hepática: { label: 'Hepatopata', description: 'Doença hepática' },
  cardíaca: { label: 'Cardiopata', description: 'Doença cardíaca' },
  endocrina: { label: 'Endocrinopata', description: 'Distúrbios endócrinos (diabetes, hipotireoidismo, etc.)' },
  respiratória: { label: 'Pneumopata', description: 'Doença respiratória' },
  neuromuscular: { label: 'Neuromuscular', description: 'Doença neuromuscular' },
  neoplasica: { label: 'Neoplasia', description: 'Neoplasia ativa' },
  imunomediada: { label: 'Imunomediada', description: 'Doença imunomediada' },
  hipertensão: { label: 'Hipertensão', description: 'Hipertensão arterial sistêmica' },
  coagulopatia: { label: 'Coagulopatia', description: 'Distúrbio de coagulação' },
}

const COMORBIDITY_KEYS = Object.keys(COMORBIDITY_CONFIG) as ComorbidityKey[]

export function Step1PatientInfo({ patient, setPatient }: Step1Props) {
  const handleSetPatient = (patch: Partial<Patient>) => {
    const normalized = normalizePatient({ ...patient, ...patch })
    setPatient(normalized)
  }

  const toggleComorbidity = (key: ComorbidityKey) => {
    const current = patient.comorbidities
    const existingIndex = current.findIndex((c) => c.key === key)

    let newComorbidities: ComorbidityItem[]
    if (existingIndex >= 0) {
      // Remover
      newComorbidities = current.filter((c) => c.key !== key)
    } else {
      // Adicionar
      const config = COMORBIDITY_CONFIG[key]
      newComorbidities = [
        ...current,
        {
          key,
          label: config.label,
          severity: undefined, // Severidade será definida pelo usuário se necessário
        },
      ]
    }
    setPatient({ comorbidities: newComorbidities })
  }

  const updateComorbiditySeverity = (key: ComorbidityKey, severity: 'leve' | 'moderada' | 'grave' | undefined) => {
    const current = patient.comorbidities
    const existingIndex = current.findIndex((c) => c.key === key)
    if (existingIndex < 0) return

    const newComorbidities = [...current]
    if (severity === undefined) {
      // Remover severity
      newComorbidities[existingIndex] = {
        ...newComorbidities[existingIndex],
        severity: undefined,
      }
    } else {
      // Atualizar severity
      newComorbidities[existingIndex] = {
        ...newComorbidities[existingIndex],
        severity,
      }
    }
    setPatient({ comorbidities: newComorbidities })
  }

  const getComorbiditySeverity = (key: ComorbidityKey): 'leve' | 'moderada' | 'grave' | undefined => {
    const item = patient.comorbidities.find((c) => c.key === key)
    return item?.severity
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
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Comorbidades</h3>
          <p className="text-sm text-neutral-400">
            Selecione todas as comorbidades relevantes. Opcionalmente, defina a severidade.
          </p>
        </div>
        <Card>
          <div className="space-y-3">
            {COMORBIDITY_KEYS.map((key) => {
              const config = COMORBIDITY_CONFIG[key]
              const isSelected = patient.comorbidities.some((c) => c.key === key)
              const severity = getComorbiditySeverity(key)

              return (
                <div
                  key={key}
                  className={`p-3 rounded-lg border transition-all ${isSelected
                      ? 'border-gold/50 bg-gold/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => toggleComorbidity(key)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => { }}
                          className="w-4 h-4 rounded border-neutral-600 text-gold focus:ring-gold bg-transparent"
                        />
                        <span className={`font-medium ${isSelected ? 'text-gold' : 'text-neutral-200'}`}>
                          {config.label}
                        </span>
                      </div>
                      {config.description && (
                        <p className="text-xs text-neutral-400 ml-6">{config.description}</p>
                      )}
                    </button>
                  </div>

                  {/* Seletor de severidade (só aparece se selecionado) */}
                  {isSelected && (
                    <div className="mt-3 ml-6 pt-3 border-t border-white/10">
                      <label className="text-xs text-neutral-400 mb-2 block">Severidade (opcional):</label>
                      <div className="flex gap-2">
                        {(['leve', 'moderada', 'grave'] as const).map((sev) => (
                          <button
                            key={sev}
                            type="button"
                            onClick={() =>
                              updateComorbiditySeverity(key, severity === sev ? undefined : sev)
                            }
                            className={`px-3 py-1 text-xs rounded transition-colors ${severity === sev
                                ? 'bg-gold/20 text-gold border border-gold/40'
                                : 'bg-white/5 text-neutral-400 border border-white/10 hover:border-white/20'
                              }`}
                          >
                            {sev.charAt(0).toUpperCase() + sev.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      </section>
    </div>
  )
}
