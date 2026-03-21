import React from 'react'
import { useNavigate } from 'react-router-dom'
import Hemogasometria from '../modules/hemogasometria/HemogasometriaWorkspace'

export function HemogasometriaPage() {
  const navigate = useNavigate()
  return <Hemogasometria onBack={() => navigate('/')} />
}
