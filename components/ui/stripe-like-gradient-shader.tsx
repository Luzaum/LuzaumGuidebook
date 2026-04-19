import { cn } from '@/lib/utils'
import { GradFlow } from 'gradflow'

/** Degradê animado (stripe) — azul escuro → azul claro; opacidade global 50% no wrapper interno. */
export function StripeLikeGradientBackground({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* brightness + véu: ~50% mais escuro que o strip sozinho com opacity-50 */}
      <div className="absolute inset-0 opacity-50 brightness-[0.52]">
        <GradFlow
          className="h-full w-full min-h-full min-w-full"
          config={{
            color1: { r: 4, g: 12, b: 36 },
            color2: { r: 22, g: 58, b: 130 },
            color3: { r: 70, g: 160, b: 210 },
            speed: 0.35,
            scale: 1,
            type: 'stripe',
            noise: 0.08,
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/26" aria-hidden />
    </div>
  )
}

/** Alias para compatibilidade com o snippet da documentação GradFlow. */
export const Component = StripeLikeGradientBackground
