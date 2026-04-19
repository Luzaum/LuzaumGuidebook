import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Step1PatientInfo } from '../components/Steps/Step1PatientInfo'
import { Step2ChiefComplaint } from '../components/Steps/Step2ChiefComplaint'
import { Step3NeuroExam } from '../components/Steps/Step3NeuroExam'
import { useCaseStore } from '../stores/caseStore'
import { NeuroQuickReportButton } from '../components/NeuroQuickReportButton'

function BackToPicker() {
  return (
    <Link
      to="/neurologia/exame-rapido"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"
    >
      <ArrowLeft className="h-4 w-4" />
      Exame rápido
    </Link>
  )
}

function QuickExamToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <BackToPicker />
      <NeuroQuickReportButton />
    </div>
  )
}

export function NeuroQuickPatientPage() {
  const patient = useCaseStore((s) => s.patient)
  const setPatient = useCaseStore((s) => s.setPatient)
  return (
    <div className="relative z-10 w-full space-y-6 pb-16">
      <QuickExamToolbar />
      <Step1PatientInfo patient={patient} setPatient={setPatient} />
    </div>
  )
}

export function NeuroQuickComplaintPage() {
  const complaint = useCaseStore((s) => s.complaint)
  const setComplaint = useCaseStore((s) => s.setComplaint)
  return (
    <div className="relative z-10 w-full space-y-6 pb-16">
      <QuickExamToolbar />
      <Step2ChiefComplaint complaint={complaint} setComplaint={setComplaint} />
    </div>
  )
}

export function NeuroQuickSectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const n = sectionId ? Number.parseInt(sectionId, 10) : NaN
  const neuroExam = useCaseStore((s) => s.neuroExam)
  const setNeuroExam = useCaseStore((s) => s.setNeuroExam)

  if (!Number.isFinite(n) || n < 1 || n > 6) {
    return <Navigate to="/neurologia/exame-rapido" replace />
  }

  return (
    <div className="relative z-10 w-full space-y-6 pb-16">
      <QuickExamToolbar />
      <Step3NeuroExam exam={neuroExam} updateExam={setNeuroExam} lockedSectionId={n} />
    </div>
  )
}
