import React from 'react'
import { useNavigate } from 'react-router-dom'
import Fluidoterapia from '../Fluidoterapia'
import { PageHeader } from '../components/PageHeader'

export function FluidoterapiaPage() {
  const navigate = useNavigate()
  return (
    <div className="py-10">
      <PageHeader
        title="Calculadora de Fluidoterapia"
        subtitle="Cálculo de taxas para cães e gatos com base em diretrizes clínicas"
      />
      <Fluidoterapia onBack={() => navigate('/')} />
    </div>
  )
}
