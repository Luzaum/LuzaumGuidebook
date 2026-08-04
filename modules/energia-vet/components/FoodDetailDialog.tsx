import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'
import {
  buildFoodIdentityRows,
  countReportedNutrients,
  FOOD_DETAIL_DISCLAIMERS,
  formatFoodNutrient,
  getAllNutrientDefinitions,
  getMissingNutrientLabels,
  parseAllFoodNotes,
} from '../lib/foodDetailPresentation'
import { getFoodDisplayName } from '../lib/genutriData'
import { cn } from '../lib/utils'
import type { FoodItem } from '../types'

type FoodDetailDialogProps = {
  food: FoodItem | null | undefined
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-muted/20 p-4 sm:p-5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </section>
  )
}

function DetailGrid({ rows }: { rows: Array<{ label: string; value: string }> }) {
  if (!rows.length) return null
  return (
    <dl className="grid gap-2 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={`${row.label}-${row.value}`} className="min-w-0">
          <dt className="text-[11px] text-muted-foreground">{row.label}</dt>
          <dd className="break-words text-sm font-medium leading-snug">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function NutrientTable({ food, basis }: { food: FoodItem; basis: 'asFed' | 'dryMatter' }) {
  const nutrients = basis === 'asFed' ? food.nutrientsAsFed : food.nutrientsDryMatter
  const title = basis === 'asFed' ? 'Matéria natural (como fornecido)' : 'Matéria seca'
  const definitions = getAllNutrientDefinitions()

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold sm:text-base">{title}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="py-2 pr-3 font-semibold">Nutriente</th>
              <th className="py-2 pr-3 font-semibold">Valor</th>
              <th className="py-2 font-semibold">Unidade</th>
            </tr>
          </thead>
          <tbody>
            {definitions.map((nutrient) => {
              const value = nutrients[nutrient.key as keyof typeof nutrients]
              return (
                <tr key={nutrient.key} className="border-b border-border/50 last:border-0">
                  <td className="py-2 pr-3 text-muted-foreground">{nutrient.label}</td>
                  <td className={value == null ? 'py-2 pr-3 text-muted-foreground/70' : 'py-2 pr-3 font-medium tabular-nums text-foreground'}>
                    {formatFoodNutrient(value, null, nutrient.unit?.includes('%') ? 2 : 3)}
                  </td>
                  <td className="py-2 text-muted-foreground">{nutrient.unit ?? '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {definitions.filter((n) => nutrients[n.key as keyof typeof nutrients] != null).length} de {definitions.length} campos informados
      </p>
    </div>
  )
}

export function FoodDetailDialog({ food, open, onOpenChange }: FoodDetailDialogProps) {
  if (!food) return null

  const displayName = getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType })
  const identityRows = buildFoodIdentityRows(food)
  const { structured, freeText, flags } = parseAllFoodNotes(food.notes ?? [])
  const missingLabels = getMissingNutrientLabels(food)
  const counts = countReportedNutrients(food)
  const sourceType = structured.find((r) => r.label === 'Tipo de fonte')?.value

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[min(92vh,960px)] w-[min(98vw,1200px)] max-w-[min(98vw,1200px)] sm:!max-w-[min(98vw,1200px)] flex-col gap-4 overflow-hidden p-5 sm:p-6">
        <DialogHeader className="shrink-0 pr-10 text-left">
          <DialogTitle className="text-xl leading-snug sm:text-2xl">{displayName}</DialogTitle>
          <p className="text-sm text-muted-foreground sm:text-base">{food.presentation || 'Apresentação não informada'}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant="outline">{food.categoryNormalized ?? food.category ?? 'Sem categoria'}</Badge>
            {sourceType && <Badge variant="secondary">{sourceType}</Badge>}
            <Badge variant="secondary">{food.foodType}</Badge>
            <Badge variant="outline">
              {counts.asFed}/{counts.catalogTotal} nutrientes MN
            </Badge>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-y-contain pr-1 [-webkit-overflow-scrolling:touch]">
          <DetailSection title="Identificação">
            <DetailGrid rows={identityRows} />
          </DetailSection>

          {(structured.length > 0 || flags.length > 0) && (
            <DetailSection title="Fonte, metadados e regras clínicas">
              <DetailGrid rows={structured} />
              {flags.length > 0 && (
                <div className="mt-3">
                  <p className="text-[11px] text-muted-foreground">Flags e alertas</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {flags.flatMap((f) => f.split(',')).map((flag) => (
                      <Badge key={flag} variant="outline" className="text-[10px]">
                        {flag.trim().replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </DetailSection>
          )}

          {freeText.length > 0 && (
            <DetailSection title="Observações adicionais">
              <ul className="list-disc space-y-1 pl-4 text-sm leading-relaxed">
                {freeText.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </DetailSection>
          )}

          <DetailSection title="Composição nutricional completa">
            <div className="grid gap-4 lg:grid-cols-2">
              <NutrientTable food={food} basis="asFed" />
              <NutrientTable food={food} basis="dryMatter" />
            </div>
          </DetailSection>

          {missingLabels.length > 0 && (
            <DetailSection title="Nutrientes não informados pela fonte">
              <p className="mb-2 text-xs text-muted-foreground">
                {missingLabels.length} campo(s) ausente(s) — exibidos como "—" na tabela (não foram convertidos em zero).
              </p>
              <div className="flex flex-wrap gap-1.5">
                {missingLabels.map((label) => (
                  <Badge key={label} variant="outline" className="text-[10px] font-normal">
                    {label}
                  </Badge>
                ))}
              </div>
            </DetailSection>
          )}

          <DetailSection title="Avisos">
            <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground">
              {FOOD_DETAIL_DISCLAIMERS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </DetailSection>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type FoodInfoButtonProps = {
  food: FoodItem
  onOpen: () => void
}

export function FoodInfoButton({ onOpen }: FoodInfoButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        'h-9 w-9 shrink-0 rounded-full',
        'text-blue-600 hover:bg-blue-100 hover:text-blue-700',
        'dark:text-blue-400 dark:hover:bg-blue-500/20 dark:hover:text-blue-300',
        'focus-visible:ring-2 focus-visible:ring-blue-500/40',
      )}
      onClick={onOpen}
      aria-label="Ver todas as informações do alimento"
    >
      <Info className="h-4 w-4" strokeWidth={2.25} />
    </Button>
  )
}
