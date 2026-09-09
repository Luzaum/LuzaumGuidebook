import React, { Component, ErrorInfo, ReactNode } from 'react'
import { CommercialDietsShowcase } from '../components/CommercialDietsShowcase'
import { Button } from '../components/ui/button'
import { AlertCircle, RotateCcw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class CommercialDietsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro em CommercialDietsPage:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-border/80 bg-card p-8 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Não foi possível carregar as Rações Comerciais</h2>
          <p className="mt-1 max-w-md text-xs text-muted-foreground">
            Ocorreu uma instabilidade pontual ao processar o catálogo de alimentos.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={this.handleReset}
            className="mt-5 gap-2 rounded-xl text-xs font-semibold"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Recarregar catálogo
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default function CommercialDietsPage() {
  return (
    <div className="nutrition-page w-full pb-16">
      <CommercialDietsErrorBoundary>
        <CommercialDietsShowcase />
      </CommercialDietsErrorBoundary>
    </div>
  )
}

