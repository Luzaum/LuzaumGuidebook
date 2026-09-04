import React from 'react'
import { motion } from 'framer-motion'
import { SpeciesPortraitCards } from '@/components/SpeciesPortraitCards'
import { Card } from '../UI/Card'
import type { Patient } from '../../stores/caseStore'
import type { LifeStage } from '../../stores/caseStore'
import { normalizePatient } from '../../lib/validation/normalizePatient'

interface Step1Props {
  patient: Patient
  setPatient: (patch: Partial<Patient>) => void
}

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

function hasAge(patient: Patient): boolean {
  return (patient.ageYears ?? 0) > 0 || (patient.ageMonths ?? 0) > 0
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

  const lifeStageLabel = patient.lifeStage ? LIFE_STAGE_LABELS[patient.lifeStage] : 'Informe a idade'
  const ageMissing = !hasAge(patient)

  return (
    <div className="space-y-8 pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-foreground mb-2">Identificação do paciente</h2>
        <p className="text-muted-foreground">Espécie, idade e dados reprodutivos para contextualizar o exame.</p>
      </motion.div>

      <motion.section
        className="w-full"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <SpeciesPortraitCards
          variant="gold"
          canineSelected={patient.species === 'dog'}
          felineSelected={patient.species === 'cat'}
          onSelectCanine={() => handleSetPatient({ species: 'dog' })}
          onSelectFeline={() => handleSetPatient({ species: 'cat' })}
          canineSubtitle="Paciente canino"
          felineSubtitle="Paciente felino"
        />
      </motion.section>

      <Card>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground">Idade</span>
          <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-200">
            Obrigatório
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Anos</label>
            <input
              type="number"
              min={0}
              max={30}
              inputMode="numeric"
              value={patient.ageYears ?? ''}
              onChange={(e) => handleSetPatient({ ageYears: clampInteger(e.target.value, 0, 30) })}
              className={`w-full rounded-xl border bg-background px-3 py-3 text-foreground outline-none focus:ring-2 focus:ring-gold/50 ${
                ageMissing ? 'border-amber-500/50' : 'border-border'
              }`}
              placeholder="Ex.: 8"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Meses (0–11)</label>
            <input
              type="number"
              min={0}
              max={11}
              inputMode="numeric"
              value={patient.ageMonths ?? ''}
              onChange={(e) => handleSetPatient({ ageMonths: clampInteger(e.target.value, 0, 11) })}
              className={`w-full rounded-xl border bg-background px-3 py-3 text-foreground outline-none focus:ring-2 focus:ring-gold/50 ${
                ageMissing ? 'border-amber-500/50' : 'border-border'
              }`}
              placeholder="Ex.: 6"
            />
          </div>
          <div className="rounded-xl border border-gold/35 bg-gold/10 px-4 py-3">
            <div className="text-xs text-muted-foreground">Estágio de vida</div>
            <div className="text-sm font-semibold text-gold">{lifeStageLabel}</div>
          </div>
        </div>

        {ageMissing && (
          <p className="mt-3 text-xs text-amber-200/90">Informe pelo menos anos ou meses para continuar.</p>
        )}
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
                  patient.sex === 'male'
                    ? 'border-gold/65 bg-gold/12 text-gold'
                    : 'border-border bg-background text-foreground hover:border-gold/40'
                }`}
              >
                Macho
              </button>
              <button
                type="button"
                onClick={() => handleSetPatient({ sex: 'female' })}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  patient.sex === 'female'
                    ? 'border-gold/65 bg-gold/12 text-gold'
                    : 'border-border bg-background text-foreground hover:border-gold/40'
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
                  patient.reproStatus === 'intact'
                    ? 'border-gold/65 bg-gold/12 text-gold'
                    : 'border-border bg-background text-foreground hover:border-gold/40'
                }`}
              >
                Inteiro
              </button>
              <button
                type="button"
                onClick={() => handleSetPatient({ reproStatus: 'neutered' })}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  patient.reproStatus === 'neutered'
                    ? 'border-gold/65 bg-gold/12 text-gold'
                    : 'border-border bg-background text-foreground hover:border-gold/40'
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
                    patient.pregnant
                      ? 'border-gold/65 bg-gold/12 text-gold'
                      : 'border-border bg-background text-foreground hover:border-gold/40'
                  }`}
                >
                  Gestante
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPatient({ lactating: !patient.lactating })}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    patient.lactating
                      ? 'border-gold/65 bg-gold/12 text-gold'
                      : 'border-border bg-background text-foreground hover:border-gold/40'
                  }`}
                >
                  Lactante
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
