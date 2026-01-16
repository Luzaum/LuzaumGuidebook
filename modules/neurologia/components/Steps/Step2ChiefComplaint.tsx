import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../UI/Card'
import {
  Activity,
  AlertCircle,
  EyeOff,
  Footprints,
  Brain,
  Zap,
  MoveDiagonal,
} from 'lucide-react'

interface Step2Props {
  selectedComplaints: string[]
  toggleComplaint: (complaint: string) => void
}

export function Step2ChiefComplaint({
  selectedComplaints,
  toggleComplaint,
}: Step2Props) {
  const complaints = [
    {
      id: 'Convulsão',
      icon: Zap,
      label: 'Convulsão',
    },
    {
      id: 'Ataxia',
      icon: MoveDiagonal,
      label: 'Ataxia / Descoordenação',
    },
    {
      id: 'Paresia',
      icon: Footprints,
      label: 'Paresia / Paralisia',
    },
    {
      id: 'Comportamento',
      icon: Brain,
      label: 'Alteração Comportamental',
    },
    {
      id: 'Dor',
      icon: AlertCircle,
      label: 'Dor Espinhal / Cervical',
    },
    {
      id: 'HeadTilt',
      icon: Activity,
      label: 'Head Tilt (Cabeça Inclinada)',
    },
    {
      id: 'Cegueira',
      icon: EyeOff,
      label: 'Cegueira Aguda',
    },
    {
      id: 'Outros',
      icon: Activity,
      label: 'Outros Sinais',
    },
  ]

  return (
    <div className="space-y-6 pb-24">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Queixa Principal</h2>
        <p className="text-neutral-400">
          Selecione um ou mais sinais observados.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {complaints.map((item) => {
          const isSelected = selectedComplaints.includes(item.id)
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => toggleComplaint(item.id)}
              className="relative"
            >
              <Card
                className={`h-32 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${isSelected ? 'border-gold bg-gold/10 ring-1 ring-gold shadow-[0_0_15px_rgba(245,197,66,0.2)]' : 'hover:border-gold/50 hover:bg-white/5'}`}
              >
                <Icon
                  size={32}
                  className={`transition-colors ${isSelected ? 'text-gold' : 'text-neutral-500'}`}
                />
                <span
                  className={`text-sm font-medium text-center ${isSelected ? 'text-gold' : 'text-neutral-300'}`}
                >
                  {item.label}
                </span>
              </Card>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
