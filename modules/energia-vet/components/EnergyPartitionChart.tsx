import { useEffect, useState } from 'react'
import { Bean, Drumstick, Droplets } from 'lucide-react'
import type { MacroSlice } from '../types'
import { cn } from '../lib/utils'

const MACRO_ICONS = {
  protein: Drumstick,
  fat: Droplets,
  carb: Bean,
} as const

type Size = 'sm' | 'md' | 'lg'

const SIZE_PX: Record<Size, number> = { sm: 120, md: 152, lg: 220 }
const STROKE: Record<Size, number> = { sm: 13, md: 16, lg: 22 }

export interface EnergyPartitionChartProps {
  totalKcal: number
  macroSplit: MacroSlice[]
  className?: string
  /** Para impressão / testes e2e */
  chartId?: string
  /** Texto abaixo do valor (ex.: `kcal` ou `kcal/dia`) */
  kcalSuffix?: string
  size?: Size
  /** Mostrar título em caixa alta acima do cartão interno */
  showTitle?: boolean
  /** Mostrar kcal por macronutriente junto aos gramas (ex.: resumo) */
  showMacroKcal?: boolean
}

export function EnergyPartitionChart({
  totalKcal,
  macroSplit,
  className,
  chartId,
  kcalSuffix = 'kcal',
  size = 'md',
  showTitle = true,
  showMacroKcal = false,
}: EnergyPartitionChartProps) {
  const dim = SIZE_PX[size]
  const strokeWidth = STROKE[size]
  const pad = 6
  const r = dim / 2 - strokeWidth / 2 - pad
  const cx = dim / 2
  const cy = dim / 2
  const C = 2 * Math.PI * r

  const [drawn, setDrawn] = useState(false)
  const [hoverKey, setHoverKey] = useState<MacroSlice['key'] | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true))
    return () => cancelAnimationFrame(id)
  }, [macroSplit])

  let cumulative = 0
  const rings = macroSplit.map((slice) => {
    const len = (slice.percent / 100) * C
    const dashOffset = -cumulative
    cumulative += len
    return { slice, len, dashOffset }
  })

  const totalKcalRounded = Number.isFinite(totalKcal) ? Math.round(totalKcal) : 0
  const titleSize = size === 'lg' ? 'text-sm' : 'text-xs'

  return (
    <div className={cn('relative', className)}>
      {showTitle ? (
        <p
          className={cn(
            'mb-3 text-center font-semibold uppercase tracking-[0.2em] text-foreground dark:text-white',
            titleSize,
          )}
        >
          Partição energética
        </p>
      ) : null}

      <div
        className={cn(
          'rounded-[1.35rem] border border-border bg-muted/50 p-4 shadow-inner dark:border-white/10 dark:bg-[#141414] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
          size === 'lg' && 'p-6 rounded-[1.75rem]',
        )}
      >
        <div
          className={cn(
            'flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6',
            size === 'lg' && 'gap-8',
          )}
        >
          {/* Donut */}
          <div
            id={chartId}
            className="relative mx-auto shrink-0"
            style={{ width: dim, height: dim }}
          >
            {/* Brilho suave no anel — no wrapper, sem filter no SVG (evita “bolhas” sobre o gráfico) */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-90 shadow-[0_0_22px_rgba(249,115,22,0.12),0_0_28px_rgba(234,179,8,0.08),0_0_24px_rgba(59,130,246,0.1)] dark:opacity-100"
              aria-hidden
            />
            <svg
              width={dim}
              height={dim}
              viewBox={`0 0 ${dim} ${dim}`}
              className="relative z-[1] overflow-visible"
              aria-hidden
            >
              <g transform={`rotate(-90 ${cx} ${cy})`}>
                {rings.map(({ slice, len, dashOffset }) => {
                  const dimmed = hoverKey !== null && hoverKey !== slice.key
                  const dashLen = drawn ? len : 0
                  return (
                    <circle
                      key={slice.key}
                      r={r}
                      cx={cx}
                      cy={cy}
                      fill="none"
                      stroke={slice.color}
                      strokeWidth={strokeWidth}
                      strokeLinecap="butt"
                      strokeDasharray={`${dashLen} ${C}`}
                      strokeDashoffset={dashOffset}
                      opacity={dimmed ? 0.28 : 1}
                      className="transition-[opacity,stroke-dasharray] duration-700 ease-out"
                    />
                  )
                })}
              </g>
            </svg>
            <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center text-center">
              <span
                className={cn(
                  'font-black tabular-nums leading-none text-foreground dark:text-white',
                  size === 'sm' && 'text-xl',
                  size === 'md' && 'text-2xl',
                  size === 'lg' && 'text-4xl',
                )}
              >
                {totalKcalRounded}
              </span>
              <span
                className={cn(
                  'mt-0.5 font-medium text-muted-foreground',
                  size === 'sm' && 'text-[10px]',
                  size === 'md' && 'text-xs',
                  size === 'lg' && 'text-sm',
                )}
              >
                {kcalSuffix}
              </span>
            </div>
          </div>

          {/* Lista — separadores só à direita do bloco ícone+gap (left-12), para não cortar os ícones */}
          <div className="min-w-0 flex-1">
            {macroSplit.map((slice, rowIndex) => {
              const Icon = MACRO_ICONS[slice.key]
              const active = hoverKey === slice.key
              return (
                <div key={slice.key} className="relative">
                  {rowIndex > 0 ? (
                    <div
                      className="pointer-events-none absolute left-12 right-0 top-0 z-0 h-px bg-border/80 dark:bg-white/10"
                      aria-hidden
                    />
                  ) : null}
                  <button
                    type="button"
                    className={cn(
                      'relative z-[1] flex w-full items-center gap-3 py-3 text-left transition-colors',
                      'rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50',
                      active && 'bg-orange-500/5 dark:bg-white/[0.04]',
                    )}
                    onMouseEnter={() => setHoverKey(slice.key)}
                    onMouseLeave={() => setHoverKey(null)}
                    onFocus={() => setHoverKey(slice.key)}
                    onBlur={() => setHoverKey(null)}
                  >
                  <span
                    className={cn(
                      'relative z-[2] flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-gradient-to-br from-muted/80 to-muted/30 shadow-sm dark:border-white/10 dark:from-white/10 dark:to-transparent dark:bg-[#141414]',
                      active && 'border-orange-400/40 dark:border-orange-400/30',
                    )}
                  >
                    <Icon className="h-5 w-5" style={{ color: slice.color }} strokeWidth={2} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium text-foreground dark:text-white">
                    {slice.label}
                  </span>
                  <span className="shrink-0 text-sm font-bold tabular-nums text-foreground dark:text-white">
                    {slice.percent.toFixed(1)}%
                  </span>
                  <span className="min-w-0 shrink-0 text-right text-sm font-bold tabular-nums">
                    <span style={{ color: slice.color }}>{slice.grams.toFixed(1)}g</span>
                    {showMacroKcal ? (
                      <span className="mt-0.5 block text-[10px] font-normal text-muted-foreground">
                        {slice.kcal.toFixed(1)} kcal
                      </span>
                    ) : null}
                  </span>
                </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
