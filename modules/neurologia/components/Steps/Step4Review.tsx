import React from 'react'

import { motion } from 'framer-motion'

import { ActivitySquare, Brain, CheckCircle, Clock3, Edit2, MapPin, PawPrint } from 'lucide-react'

import { Card } from '../UI/Card'

import { SaveToHistoryButton } from '../SaveToHistoryButton'

import { MgcsSummaryBanner } from '../MgcsSummaryBanner'

import { useCaseStore } from '../../stores/caseStore'

import type { ComplaintContext, Patient } from '../../stores/caseStore'

import { CHIEF_COMPLAINT_LABELS, TEMPORAL_LABELS, EVOLUTION_LABELS } from '../../data/complaintDictionaries'

import { buildAlteredExamSections, buildFullExamSections } from '../../lib/exam/examDefaults'



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



function ExamSectionList({

  sections,

  emptyMessage,

  dotClassName,

}: {

  sections: ReturnType<typeof buildFullExamSections>

  emptyMessage: string

  dotClassName: string

}) {

  if (sections.every((s) => s.items.length === 0)) {

    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>

  }



  return (

    <div className="grid gap-4 xl:grid-cols-2">

      {sections.map((section) => (

        <div key={section.title} className="rounded-xl border border-border bg-background/60 p-3">

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{section.title}</p>

          <ul className="space-y-1.5 text-sm text-foreground/90">

            {section.items.map((item) => (

              <li key={item} className="flex items-start gap-2">

                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClassName}`} />

                <span>{item}</span>

              </li>

            ))}

          </ul>

        </div>

      ))}

    </div>

  )

}



export function Step4Review({ patient, complaint, exam, onEditStep }: Step4Props) {

  const mgcs = useCaseStore((s) => s.mgcs)

  const fullExamSections = buildFullExamSections(exam)

  const alteredExamSections = buildAlteredExamSections(exam)

  const hasAlterations = alteredExamSections.length > 0



  const speciesLabel = patient.species === 'dog' ? 'Cão' : patient.species === 'cat' ? 'Gato' : 'Não informado'

  const sexLabel = patient.sex === 'male' ? 'Macho' : patient.sex === 'female' ? 'Fêmea' : 'Não informado'

  const reproLabel =

    patient.reproStatus === 'intact' ? 'Inteiro' : patient.reproStatus === 'neutered' ? 'Castrado' : 'Não informado'

  const lifeStageLabel = patient.lifeStage ? LIFE_STAGE_LABELS[patient.lifeStage] || '—' : '—'

  const ageLabel = `${patient.ageYears || 0}a ${patient.ageMonths || 0}m`



  return (

    <div className="space-y-6 pb-24">

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">

        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Revisão dos achados</h2>

        <p className="max-w-2xl text-muted-foreground">

          Confirme identificação, história e exame antes da análise clínica.

        </p>

      </motion.div>



      <div className="flex flex-wrap gap-2">

        <SaveToHistoryButton />

      </div>



      <MgcsSummaryBanner mgcs={mgcs} />



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

          <h3 className="text-lg font-semibold text-foreground">Identificação</h3>

        </div>



        <div className="grid grid-cols-2 gap-3 text-sm lg:grid-cols-3">

          {[

            ['Espécie', speciesLabel],

            ['Idade', ageLabel],

            ['Fase de vida', lifeStageLabel],

            ['Sexo', sexLabel],

            ['Reprodutivo', reproLabel],

          ].map(([k, v]) => (

            <div key={k} className="rounded-xl border border-border bg-background/70 p-3">

              <div className="text-xs text-muted-foreground">{k}</div>

              <div className="text-sm font-semibold text-foreground mt-1">{v}</div>

            </div>

          ))}

        </div>

      </Card>



      <Card className="relative">

        <button

          onClick={() => onEditStep(2)}

          className="absolute top-4 right-4 text-gold hover:text-foreground"

          aria-label="Editar queixas"

        >

          <Edit2 size={18} />

        </button>



        <div className="flex items-center gap-2 mb-4">

          <Clock3 className="w-5 h-5 text-gold" />

          <h3 className="text-lg font-semibold text-foreground">História e sinais</h3>

        </div>



        <div className="space-y-4">

          {complaint.chiefComplaintIds.length > 0 ? (

            <div>

              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">

                Queixas principais

              </span>

              <div className="flex flex-wrap gap-2">

                {complaint.chiefComplaintIds.map((c) => (

                  <span

                    key={c}

                    className="rounded-lg border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold"

                  >

                    {CHIEF_COMPLAINT_LABELS[c] || c}

                  </span>

                ))}

              </div>

            </div>

          ) : (

            <p className="text-sm text-muted-foreground">Nenhuma queixa selecionada — verifique descrição livre.</p>

          )}



          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div className="rounded-xl border border-border bg-background/70 p-4">

              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Início</div>

              <div className="mt-1 text-sm font-semibold text-foreground">

                {complaint.temporalPattern

                  ? TEMPORAL_LABELS[complaint.temporalPattern] || complaint.temporalPattern

                  : 'Não informado'}

              </div>

            </div>

            <div className="rounded-xl border border-border bg-background/70 p-4">

              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Evolução</div>

              <div className="mt-1 text-sm font-semibold text-foreground">

                {complaint.evolutionPattern

                  ? EVOLUTION_LABELS[complaint.evolutionPattern] || complaint.evolutionPattern

                  : 'Não informado'}

              </div>

            </div>

          </div>



          {complaint.contextNotes && (

            <div className="rounded-xl border border-border bg-background/70 p-4">

              <div className="text-xs font-medium text-muted-foreground">Observações</div>

              <p className="mt-2 text-sm leading-relaxed text-foreground">{complaint.contextNotes}</p>

            </div>

          )}

        </div>

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

          <h3 className="text-lg font-semibold text-foreground">Exame neurológico</h3>

        </div>



        <div className="space-y-6">

          <section>

            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">

              <MapPin className="h-4 w-4 text-cyan-400" />

              Exame completo

            </h4>

            <ExamSectionList

              sections={fullExamSections}

              emptyMessage="Nenhum dado registrado — valores normais serão assumidos na análise."

              dotClassName="bg-slate-400"

            />

          </section>



          <section>

            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">

              <Brain className="h-4 w-4 text-gold" />

              Alterações

            </h4>

            {hasAlterations ? (

              <ExamSectionList sections={alteredExamSections} emptyMessage="" dotClassName="bg-gold" />

            ) : (

              <div className="flex items-center gap-2 text-emerald-400 text-sm">

                <CheckCircle size={18} />

                <span>Nenhuma alteração registrada — exame presumido normal.</span>

              </div>

            )}

          </section>

        </div>

      </Card>

    </div>

  )

}


