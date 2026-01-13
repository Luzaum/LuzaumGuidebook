import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'

interface PageHeaderProps {
  title: string
  subtitle?: string
  showBack?: boolean
}

export function PageHeader({ title, subtitle, showBack = true }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="mb-8">
      {showBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      )}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
