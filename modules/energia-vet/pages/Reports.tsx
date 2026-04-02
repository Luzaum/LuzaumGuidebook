import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, FileText, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { exportReportPdf } from '../lib/reportDocument'
import { getSavedReports } from '../lib/persistence'
import { getHumanRequirementLabel } from '../lib/clinicalProfiles'
import { getRequirementById } from '../lib/genutriData'

const BASE_ROUTE = '/calculadora-energetica'

export default function Reports() {
  const [query, setQuery] = useState('')
  const reports = useMemo(() => getSavedReports(), [])

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return reports
    return reports.filter((report) =>
      [report.patient.name, report.patient.ownerName]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [reports, query])

  return (
    <div className="space-y-8 w-full pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-white">
          <FileText className="w-8 h-8 text-orange-300" />
          Relatorios e historico
        </h1>
        <p className="text-muted-foreground mt-2">Relatorios persistidos localmente, com acesso ao detalhe completo e exportacao em PDF textual.</p>
      </div>

      <Card className="border-white/10 bg-[#141010] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <CardHeader>
          <CardTitle className="text-white">Historico do Energia Vet</CardTitle>
          <CardDescription>Busque por paciente ou tutor.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por paciente ou tutor..." className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>

          {filteredReports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-muted-foreground">
              Nenhum relatorio salvo ainda.
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredReports.map((report) => {
                const requirement = getRequirementById(report.diet.requirementProfileId)
                return (
                  <Card key={report.id} className="border-white/10 bg-[#1a1413]">
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold text-white">{report.patient.name ?? 'Paciente sem nome'}</p>
                          <p className="text-sm text-muted-foreground">{report.patient.ownerName ?? 'Tutor nao informado'}</p>
                        </div>
                        <Badge variant="outline">{new Date(report.createdAt).toLocaleDateString('pt-BR')}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                          <p className="text-[11px] text-muted-foreground">Especie</p>
                          <p className="mt-1 font-semibold text-white">{report.patient.species === 'dog' ? 'Cao' : report.patient.species === 'cat' ? 'Gato' : 'Nao informado'}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                          <p className="text-[11px] text-muted-foreground">Energia-alvo</p>
                          <p className="mt-1 font-semibold text-white">{report.target.targetEnergy?.toFixed(0) ?? '—'} kcal/dia</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                          <p className="text-[11px] text-muted-foreground">Plano</p>
                          <p className="mt-1 font-semibold text-white">{report.diet.mealsPerDay} refeicoes · {report.diet.gramsPerMeal?.toFixed(1) ?? '—'} g</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                          <p className="text-[11px] text-muted-foreground">Perfil clinico</p>
                          <p className="mt-1 font-semibold text-white">{getHumanRequirementLabel(requirement)}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Prescricao curta: {report.formula.contributions.map((item) => item.foodName).slice(0, 2).join(' + ') || 'Sem alimentos'}
                        {report.formula.contributions.length > 2 ? ` +${report.formula.contributions.length - 2}` : ''}
                      </p>

                      <div className="flex justify-between gap-2">
                        <Button variant="outline" size="sm" render={<Link to={`${BASE_ROUTE}/reports/${report.id}`} />} className="gap-2">
                          Ver detalhes
                        </Button>
                        <Button size="sm" className="gap-2" onClick={() => exportReportPdf(report)}>
                          <Download className="h-4 w-4" /> Exportar PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
