import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, UserRound, Stethoscope, ChevronRight } from 'lucide-react'
import { NEURO_EXAM_SECTIONS } from '../../neurologia/data/neuroExamSections'
import { NeuroQuickReportButton } from '../../neurologia/components/NeuroQuickReportButton'
import { Step1PatientInfo } from '../../neurologia/components/Steps/Step1PatientInfo'
import { Step2ChiefComplaint } from '../../neurologia/components/Steps/Step2ChiefComplaint'
import { Step3NeuroExam } from '../../neurologia/components/Steps/Step3NeuroExam'
import { useCaseStore } from '../../neurologia/stores/caseStore'

function BackToPicker() {
  return (
    <Link
      to="/neuro-mobile/exame-rapido"
      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold active:text-gold transition-colors py-1.5 px-2 rounded-lg bg-card/45 border border-border"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Voltar
    </Link>
  )
}

function QuickExamToolbar() {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3.5 mb-4">
      <BackToPicker />
      <div className="scale-90 origin-right">
        <NeuroQuickReportButton />
      </div>
    </div>
  )
}

// 1. Picker Screen
export function NeuroMobileQuickExamScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Exame Rápido</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Foque apenas na queixa, paciente ou em uma seção física do exame.
          </p>
        </div>
        <div className="scale-95 origin-right shrink-0">
          <NeuroQuickReportButton />
        </div>
      </div>

      {/* Pre-Exam Section */}
      <div className="space-y-2.5">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">
          Identificação & Histórico
        </h3>
        
        <Link
          to="/neuro-mobile/exame-rapido/paciente"
          className="flex items-center gap-4 nm-card bg-card"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/25">
            <UserRound className="h-4 w-4" />
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-foreground text-xs">Paciente</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Espécie, idade, peso e comorbidades...
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>

        <Link
          to="/neuro-mobile/exame-rapido/queixa"
          className="flex items-center gap-4 nm-card bg-card"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/25">
            <Stethoscope className="h-4 w-4" />
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-foreground text-xs">Queixa e Contexto</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Motivo principal, temporalidade e red flags...
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>

      {/* Physical Exam Sections */}
      <div className="space-y-2.5">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">
          Exame Físico (6 seções)
        </h3>
        <div className="grid gap-2">
          {NEURO_EXAM_SECTIONS.map((s) => (
            <Link
              key={s.id}
              to={`/neuro-mobile/exame-rapido/secao/${s.id}`}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-left active:bg-muted active:scale-[0.99] transition-all"
            >
              <span className="font-semibold text-xs text-foreground">{s.title}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// 2. Patient Screen wrapper
export function NeuroMobileQuickPatientPage() {
  const patient = useCaseStore((s) => s.patient)
  const setPatient = useCaseStore((s) => s.setPatient)
  return (
    <div className="space-y-4">
      <QuickExamToolbar />
      <Step1PatientInfo patient={patient} setPatient={setPatient} />
    </div>
  )
}

// 3. Complaint Screen wrapper
export function NeuroMobileQuickComplaintPage() {
  const complaint = useCaseStore((s) => s.complaint)
  const setComplaint = useCaseStore((s) => s.setComplaint)
  return (
    <div className="space-y-4">
      <QuickExamToolbar />
      <Step2ChiefComplaint complaint={complaint} setComplaint={setComplaint} />
    </div>
  )
}

// 4. Physical Exam Section Screen wrapper
export function NeuroMobileQuickSectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const n = sectionId ? Number.parseInt(sectionId, 10) : NaN
  const neuroExam = useCaseStore((s) => s.neuroExam)
  const setNeuroExam = useCaseStore((s) => s.setNeuroExam)

  if (!Number.isFinite(n) || n < 1 || n > 6) {
    return <Navigate to="/neuro-mobile/exame-rapido" replace />
  }

  return (
    <div className="space-y-4">
      <QuickExamToolbar />
      <Step3NeuroExam exam={neuroExam} updateExam={setNeuroExam} lockedSectionId={n} />
    </div>
  )
}
