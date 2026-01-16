import React from 'react'
import { motion } from 'framer-motion'
import {
  PatientProfile,
  Species,
  Sex,
  PhysiologicState,
  TimeCourse,
  Course,
} from '../../types'
import { Button } from '../UI/Button'
import { Card } from '../UI/Card'
import { Chip } from '../UI/Chip'
import { Slider } from '../UI/Slider'
import { Dog, Cat, AlertTriangle } from 'lucide-react'

interface Step1Props {
  data: PatientProfile
  updateData: (data: Partial<PatientProfile>) => void
}

export function Step1PatientInfo({ data, updateData }: Step1Props) {
  const toggleArrayItem = <T extends string>(current: T[], item: T): T[] => {
    return current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item]
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
          variant={data.species === Species.Dog ? 'primary' : 'secondary'}
          onClick={() =>
            updateData({
              species: Species.Dog,
            })
          }
          className="h-24 flex flex-col gap-2"
        >
          <Dog size={32} />
          <span>Cão</span>
        </Button>
        <Button
          variant={data.species === Species.Cat ? 'primary' : 'secondary'}
          onClick={() =>
            updateData({
              species: Species.Cat,
            })
          }
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
            value={data.age.years}
            min={0}
            max={20}
            onChange={(v) =>
              updateData({
                age: {
                  ...data.age,
                  years: v,
                },
              })
            }
            unit="anos"
          />
          <Slider
            label="Idade (meses)"
            value={data.age.months}
            min={0}
            max={11}
            onChange={(v) =>
              updateData({
                age: {
                  ...data.age,
                  months: v,
                },
              })
            }
            unit="meses"
          />
          <div className="pt-4 border-t border-white/5">
            <label className="text-sm font-medium text-neutral-300 mb-2 block">
              Peso (kg)
            </label>
            <input
              type="number"
              value={data.weight || ''}
              onChange={(e) =>
                updateData({
                  weight: parseFloat(e.target.value),
                })
              }
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="0.0 kg"
            />
          </div>
        </div>
      </Card>

      {/* Sex & State */}
      <Card>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={data.sex === Sex.Male ? 'primary' : 'secondary'}
              onClick={() =>
                updateData({
                  sex: Sex.Male,
                })
              }
              className="flex-1"
            >
              Macho
            </Button>
            <Button
              size="sm"
              variant={data.sex === Sex.Female ? 'primary' : 'secondary'}
              onClick={() =>
                updateData({
                  sex: Sex.Female,
                })
              }
              className="flex-1"
            >
              Fêmea
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.values(PhysiologicState).map((state) => (
              <Chip
                key={state}
                label={state}
                selected={data.physiologicState.includes(state)}
                onClick={() =>
                  updateData({
                    physiologicState: toggleArrayItem(
                      data.physiologicState,
                      state,
                    ),
                  })
                }
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Clinical Context */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Contexto Clínico</h3>

        <Card>
          <label className="text-sm font-medium text-neutral-300 mb-3 block">
            Padrão Temporal (Obrigatório)
          </label>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(TimeCourse).map((tc) => (
              <button
                key={tc}
                onClick={() =>
                  updateData({
                    temporalPattern: tc,
                  })
                }
                className={`text-left p-3 rounded-lg border transition-all ${data.temporalPattern === tc ? 'bg-gold/20 border-gold text-gold' : 'bg-neutral-800 border-transparent text-neutral-400 hover:bg-neutral-700'}`}
              >
                {tc}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <label className="text-sm font-medium text-neutral-300 mb-3 block">
            Evolução
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.values(Course).map((c) => (
              <Chip
                key={c}
                label={c}
                selected={data.course === c}
                onClick={() =>
                  updateData({
                    course: c,
                  })
                }
              />
            ))}
          </div>
        </Card>
      </section>

      {/* Red Flags */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-red-400">
          <AlertTriangle size={20} />
          <h3 className="text-lg font-semibold">
            Sinais de Alerta (Red Flags)
          </h3>
        </div>
        <Card className="border-red-900/30 bg-red-900/5">
          <div className="space-y-2">
            {[
              'Coma / Estupor',
              'Convulsão ativa / Status',
              'Dispneia / Choque',
              'Suspeita de herniação',
              'Tetraplegia aguda',
              'Ausência de nocicepção',
              'Dor severa',
            ].map((flag) => (
              <label
                key={flag}
                className="flex items-center gap-3 p-2 hover:bg-red-900/20 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={data.redFlags.includes(flag)}
                  onChange={() =>
                    updateData({
                      redFlags: toggleArrayItem(data.redFlags, flag),
                    })
                  }
                  className="w-5 h-5 rounded border-red-500 text-red-500 focus:ring-red-500 bg-transparent"
                />
                <span className="text-neutral-200">{flag}</span>
              </label>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
