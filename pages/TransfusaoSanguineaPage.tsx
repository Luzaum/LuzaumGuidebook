import React from 'react'
import { useNavigate } from 'react-router-dom'
import TransfusaoSanguinea from '../TransfusaoSanguinea'

export function TransfusaoSanguineaPage() {
  const navigate = useNavigate()
  return <TransfusaoSanguinea onBack={() => navigate('/')} />
}
