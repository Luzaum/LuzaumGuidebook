import React from 'react'
import { useNavigate } from 'react-router-dom'
import CalculadoraEnergetica from '../modules/nutricao/CalculadoraEnergetica'

export function CalculadoraEnergeticaPage() {
  const navigate = useNavigate()
  return <CalculadoraEnergetica onBack={() => navigate('/')} />
}
