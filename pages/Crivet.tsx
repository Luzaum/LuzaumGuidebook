import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

// TODO: Cole aqui o componente inteiro do Magic Patterns
// Substitua este componente placeholder pelo componente completo do Magic Patterns
const CrivetComponent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <p className="text-muted-foreground">
          Componente do Magic Patterns será inserido aqui
        </p>
      </div>
    </div>
  )
}

export function Crivet() {
  const navigate = useNavigate()
  return (
    <div className="py-10">
      <PageHeader
        title="CRIVET 2.0"
        subtitle="CRI auditável (2.0)"
      />
      <CrivetComponent />
    </div>
  )
}
