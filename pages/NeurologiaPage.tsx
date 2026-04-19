import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { NeuroShell } from '../modules/neurologia/NeuroShell'
import { NeuroHomePage } from '../modules/neurologia/pages/NeuroHomePage'
import { NeuroFullExamFlow } from '../modules/neurologia/NeuroFullExamFlow'
import { NeuroDatabasePage } from '../modules/neurologia/pages/NeuroDatabasePage'
import { NeuroFindingDetailPage } from '../modules/neurologia/pages/NeuroFindingDetailPage'
import { NeuroQuickExamPage } from '../modules/neurologia/pages/NeuroQuickExamPage'
import {
  NeuroQuickPatientPage,
  NeuroQuickComplaintPage,
  NeuroQuickSectionPage,
} from '../modules/neurologia/pages/NeuroQuickExamRoutes'
import { NeuroHistoryPage } from '../modules/neurologia/pages/NeuroHistoryPage'
import { NeuroGlasgowPage } from '../modules/neurologia/pages/NeuroGlasgowPage'

export function NeurologiaPage() {
  return (
    <Routes>
      <Route element={<NeuroShell />}>
        <Route index element={<NeuroHomePage />} />
        <Route path="exame" element={<NeuroFullExamFlow />} />
        <Route path="base-dados" element={<NeuroDatabasePage />} />
        <Route path="base-dados/:slug" element={<NeuroFindingDetailPage />} />
        <Route path="exame-rapido" element={<NeuroQuickExamPage />} />
        <Route path="exame-rapido/paciente" element={<NeuroQuickPatientPage />} />
        <Route path="exame-rapido/queixa" element={<NeuroQuickComplaintPage />} />
        <Route path="exame-rapido/secao/:sectionId" element={<NeuroQuickSectionPage />} />
        <Route path="historico" element={<NeuroHistoryPage />} />
        <Route path="glasgow" element={<NeuroGlasgowPage />} />
      </Route>
    </Routes>
  )
}
