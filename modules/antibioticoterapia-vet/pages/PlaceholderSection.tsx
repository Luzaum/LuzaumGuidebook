import { Construction } from 'lucide-react'
import type { AbvTab } from '../types'

const COPY: Partial<
  Record<
    AbvTab,
    { title: string; body: string; foot?: string }
  >
> = {
  perioperative: {
    title: 'Perioperatório',
    body:
      'Profilaxia antimicrobiana, classificação de contaminação cirúrgica e cruzamento com contexto do paciente (ASA, comorbidades) virão na engine determinística.',
    foot: 'Em construção — modelo de dados e regras na ETAPA 3.',
  },
  'patient-context': {
    title: 'Alertas por paciente',
    body:
      'Motor de contexto (espécie, idade, comorbidades, gravidade) com badges, restrições e explicação do porquê de cada alerta — sem prescrição automática oculta.',
    foot: 'Engine de regras explícitas na ETAPA 3.',
  },
}

interface PlaceholderSectionProps {
  tab: AbvTab
}

export default function PlaceholderSection({ tab }: PlaceholderSectionProps) {
  const c = COPY[tab]
  if (!c) return null

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="abv-panel rounded-3xl p-8 shadow-lg">
        <div className="mb-6 flex items-start gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
            style={{
              background: 'color-mix(in srgb, var(--chart-5) 18%, hsl(var(--card)))',
              borderColor: 'hsl(var(--border))',
              color: 'var(--chart-5)',
            }}
          >
            <Construction className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-serif text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              {c.title}
            </h1>
            <p className="mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {c.body}
            </p>
            {c.foot && (
              <p
                className="mt-6 rounded-xl border border-dashed px-4 py-3 text-sm"
                style={{
                  borderColor: 'hsl(var(--border))',
                  background: 'color-mix(in srgb, hsl(var(--muted)) 40%, hsl(var(--card)))',
                  color: 'hsl(var(--foreground))',
                }}
              >
                {c.foot}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
