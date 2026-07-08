import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { NeuroMobileShell } from '../modules/neurologia-mobile/components/NeuroMobileShell'
import { NeuroMobileHomeScreen } from '../modules/neurologia-mobile/screens/NeuroMobileHomeScreen'
import { NeuroMobileFullExamFlow } from '../modules/neurologia-mobile/screens/NeuroMobileFullExamFlow'
import { NeuroMobileDatabaseScreen } from '../modules/neurologia-mobile/screens/NeuroMobileDatabaseScreen'
import { NeuroMobileFindingDetailScreen } from '../modules/neurologia-mobile/screens/NeuroMobileFindingDetailScreen'
import {
  NeuroMobileQuickExamScreen,
  NeuroMobileQuickPatientPage,
  NeuroMobileQuickComplaintPage,
  NeuroMobileQuickSectionPage,
} from '../modules/neurologia-mobile/screens/NeuroMobileQuickExamScreen'
import { NeuroMobileHistoryScreen } from '../modules/neurologia-mobile/screens/NeuroMobileHistoryScreen'
import { NeuroMobileGlasgowScreen } from '../modules/neurologia-mobile/screens/NeuroMobileGlasgowScreen'

export function NeurologiaMobilePage() {
  return (
    <Routes>
      <Route element={<NeuroMobileShell />}>
        <Route index element={<NeuroMobileHomeScreen />} />
        <Route path="exame" element={<NeuroMobileFullExamFlow />} />
        <Route path="base-dados" element={<NeuroMobileDatabaseScreen />} />
        <Route path="base-dados/:slug" element={<NeuroMobileFindingDetailScreen />} />
        <Route path="exame-rapido" element={<NeuroMobileQuickExamScreen />} />
        <Route path="exame-rapido/paciente" element={<NeuroMobileQuickPatientPage />} />
        <Route path="exame-rapido/queixa" element={<NeuroMobileQuickComplaintPage />} />
        <Route path="exame-rapido/secao/:sectionId" element={<NeuroMobileQuickSectionPage />} />
        <Route path="historico" element={<NeuroMobileHistoryScreen />} />
        <Route path="glasgow" element={<NeuroMobileGlasgowScreen />} />
      </Route>
    </Routes>
  )
}
