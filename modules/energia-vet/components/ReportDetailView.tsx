import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Download, Printer } from 'lucide-react'
import type { StoredCalculationReport } from '../types'
import { getFoodById, getRequirementById } from '../lib/genutriData'
import { exportReportPdf } from '../lib/reportDocument'
import { getHumanRequirementLabel } from '../lib/clinicalProfiles'
import { getPhysiologicStateById } from '../lib/nutrition'

function getGoalLabel(goal?: string) {
  if (goal === 'weight_loss') return 'Perda de peso'
  if (goal === 'weight_gain') return 'Ganho de peso'
  return 'Manutencao'
}

function getDietTypeLabel(dietType?: string) {
  if (dietType === 'commercial') return 'Comercial'
  if (dietType === 'natural') return '100% natural'
  if (dietType === 'hybrid') return 'Hibrida'
  return 'Nao informado'
}

export default function ReportDetailView({ report }: { report: StoredCalculationReport }) {
  const requirement = getRequirementById(report.diet.requirementProfileId)
  const physiologicState = getPhysiologicStateById(report.energy.stateId ?? '')?.label ?? 'Nao informado'
  const programmedFeeding = report.formula.programmedFeeding ?? report.diet.programmedFeeding
  const macroChartStyle = (() => {
    const [protein, fat, carb] = report.formula.evaluation.macroSplit
    const proteinEnd = protein.percent
    const fatEnd = protein.percent + fat.percent
    return {
      background: `conic-gradient(${protein.color} 0% ${proteinEnd}%, ${fat.color} ${proteinEnd}% ${fatEnd}%, ${carb.color} ${fatEnd}% 100%)`,
    }
  })()

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-[#141010] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <CardHeader className="border-b border-white/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-2xl text-white">{report.patient.name || 'Paciente sem nome'}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Relatorio salvo em {new Date(report.createdAt).toLocaleString('pt-BR')}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
                <Printer className="h-4 w-4" /> Imprimir
              </Button>
              <Button size="sm" className="gap-2" onClick={() => exportReportPdf(report)}>
                <Download className="h-4 w-4" /> Exportar PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Paciente e energia</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {[
                  ['Tutor', report.patient.ownerName || 'Nao informado'],
                  ['Especie', report.patient.species === 'dog' ? 'Cao' : report.patient.species === 'cat' ? 'Gato' : 'Nao informado'],
                  ['Sexo', report.patient.sex === 'female' ? 'Femea' : report.patient.sex === 'male' ? 'Macho' : 'Nao informado'],
                  ['Peso atual', report.patient.currentWeight != null ? `${report.patient.currentWeight.toFixed(2)} kg` : 'Nao informado'],
                  ['Peso usado', report.energy.weightUsed != null ? `${report.energy.weightUsed.toFixed(2)} kg` : 'Nao informado'],
                  ['RER', report.energy.rer != null ? `${report.energy.rer.toFixed(0)} kcal/dia` : 'Nao informado'],
                  ['Energia final', report.energy.mer != null ? `${report.energy.mer.toFixed(0)} kcal/dia` : 'Nao informado'],
                  ['Energia-alvo', report.target.targetEnergy != null ? `${report.target.targetEnergy.toFixed(0)} kcal/dia` : 'Nao informado'],
                  ['Perfil energetico', physiologicState],
                  ['Modo energia', report.energy.energyProfileMode === 'clinical' ? 'Clinica customizada' : 'FEDIAF oficial'],
                  ['Objetivo', getGoalLabel(report.target.goal)],
                  ['Peso-alvo', report.target.targetWeight != null ? `${report.target.targetWeight.toFixed(2)} kg` : 'Nao informado'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-1 font-semibold text-white">{value}</p>
                  </div>
                ))}
                <div className="md:col-span-2 flex flex-wrap gap-2">
                  <Badge variant="outline">{report.patient.isNeutered ? 'Castrado' : 'Nao castrado'}</Badge>
                  <Badge variant="outline">{report.patient.isHospitalized ? 'Hospitalizado' : 'Ambulatorial'}</Badge>
                  <Badge variant="outline">ECC {report.patient.bcs ?? 5}/9</Badge>
                  <Badge variant="outline">{getHumanRequirementLabel(requirement)}</Badge>
                  <Badge variant="outline">{report.diet.formulationMode === 'complement' ? 'Complementar outras %' : 'Modo manual'}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Particao energetica e resumo nutricional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="relative h-40 w-40 rounded-full border border-white/10" style={macroChartStyle}>
                    <div className="absolute inset-[24%] rounded-full border border-white/10 bg-[#171212]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Macro</p>
                      <p className="text-2xl font-black text-white">{report.diet.targetEnergy.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">kcal/dia</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {report.formula.evaluation.macroSplit.map((slice) => (
                      <div key={slice.key} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                          <span className="text-sm text-white">{slice.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-white">{slice.percent.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                  {[
                    ['Proteina', report.formula.evaluation.totalDelivered.crudeProteinPct != null ? `${report.formula.evaluation.totalDelivered.crudeProteinPct.toFixed(1)} g/dia` : 'Nao informado'],
                    ['Gordura', report.formula.evaluation.totalDelivered.etherExtractPct != null ? `${report.formula.evaluation.totalDelivered.etherExtractPct.toFixed(1)} g/dia` : 'Nao informado'],
                    ['Carboidrato', report.formula.evaluation.totalDelivered.nitrogenFreeExtractPct != null ? `${report.formula.evaluation.totalDelivered.nitrogenFreeExtractPct.toFixed(1)} g/dia` : 'Nao informado'],
                    ['Fibra', report.formula.evaluation.totalDelivered.crudeFiberPct != null ? `${report.formula.evaluation.totalDelivered.crudeFiberPct.toFixed(1)} g/dia` : 'Nao informado'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="mt-1 font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Formula e contribuicao por alimento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs text-muted-foreground">Tipo de dieta</p>
                  <p className="mt-1 font-semibold text-white">{getDietTypeLabel(report.diet.dietType)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs text-muted-foreground">Refeicoes por dia</p>
                  <p className="mt-1 font-semibold text-white">{report.diet.mealsPerDay}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs text-muted-foreground">Quantidade por refeicao</p>
                  <p className="mt-1 font-semibold text-white">{report.diet.gramsPerMeal != null ? `${report.diet.gramsPerMeal.toFixed(1)} g` : 'Nao informado'}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs text-muted-foreground">Perfil de exigencia</p>
                  <p className="mt-1 font-semibold text-white">{getHumanRequirementLabel(requirement)}</p>
                </div>
              </div>

              {report.formula.contributions.map((item) => {
                const food = getFoodById(item.foodId)
                const rawEntry = report.diet.entries.find((entry) => entry.foodId === item.foodId)
                return (
                  <div key={item.foodId} className="grid gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 md:grid-cols-5">
                    <div>
                      <p className="font-semibold text-white">{item.foodName}</p>
                      <p className="text-xs text-muted-foreground">{food?.categoryNormalized ?? 'Sem categoria'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">% da formula</p>
                      <p className="font-medium text-white">{rawEntry?.inclusionPct?.toFixed(1) ?? item.inclusionPct.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Oferta diaria</p>
                      <p className="font-medium text-white">{item.gramsAsFed.toFixed(1)} g</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Energia por alimento</p>
                      <p className="font-medium text-white">{item.deliveredKcal.toFixed(1)} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Por refeicao</p>
                      <p className="font-medium text-white">{report.diet.mealsPerDay > 0 ? `${(item.gramsAsFed / report.diet.mealsPerDay).toFixed(1)} g` : 'Nao informado'}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Adequacao frente ao perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {report.formula.evaluation.adequacy.map((item) => (
                <div key={`${item.profileId}-${item.key}`} className="grid gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 md:grid-cols-[1.1fr_0.7fr_0.5fr]">
                  <div>
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.profileLabel ?? 'Perfil clinico'}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.reason}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Entregue</p>
                    <p className="mt-1 font-semibold text-white">{item.deliveredValue != null ? item.deliveredValue.toFixed(2) : 'Nao informado'}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Alvo: {item.target?.raw != null ? String(item.target.raw) : 'Nao informado'}</p>
                  </div>
                  <div className="flex items-center justify-start md:justify-end">
                    <Badge variant="outline">
                      {item.status === 'adequate'
                        ? 'Adequado'
                        : item.status === 'below'
                        ? 'Abaixo do alvo'
                        : item.status === 'above'
                        ? 'Acima do alvo'
                        : item.status === 'manual'
                        ? 'Manual'
                        : 'Dados insuficientes'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {programmedFeeding && (
            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Alimentacao programada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{programmedFeeding.roundingRule}</p>
                {programmedFeeding.meals.map((meal) => (
                  <div key={meal.id} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{meal.label}</p>
                        <p className="text-xs text-muted-foreground">{meal.time}</p>
                      </div>
                      <p className="text-lg font-black text-orange-300">{meal.totalGrams} g</p>
                    </div>
                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full min-w-[460px] text-sm">
                        <thead>
                          <tr className="text-left text-muted-foreground">
                            <th className="pb-2 font-medium">Ingrediente</th>
                            <th className="pb-2 font-medium">Qtd.</th>
                            <th className="pb-2 font-medium">Comeu?</th>
                            <th className="pb-2 font-medium">Sobra</th>
                          </tr>
                        </thead>
                        <tbody>
                          {meal.items.map((item) => (
                            <tr key={`${meal.id}-${item.foodId}`} className="border-t border-white/5">
                              <td className="py-2 text-white">{item.foodName}</td>
                              <td className="py-2 text-white">{item.gramsAsFed} g</td>
                              <td className="py-2 text-muted-foreground">Sim / Nao</td>
                              <td className="py-2 text-muted-foreground">Pesar sobra</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
