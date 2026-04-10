import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Download, FileText, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { exportReportPdf } from '../lib/reportDocument'
import { getSavedReports } from '../lib/persistence'
import { listNutritionReportsFromSupabase, migrateLocalReportsToSupabase } from '../lib/supabaseReports'
import { getHumanRequirementLabel } from '../lib/clinicalProfiles'
import { getRequirementById } from '../lib/genutriData'

const BASE_ROUTE = '/calculadora-energetica'

export default function Reports() {
  const [query, setQuery] = useState('')
  const [reports, setReports] = useState(getSavedReports())

  useEffect(() => {
    const sync = async () => {
      try {
        const localReports = getSavedReports()
        if (localReports.length) {
          await migrateLocalReportsToSupabase(localReports)
        }
        const remote = await listNutritionReportsFromSupabase()
        setReports(remote)
      } catch (e) {
        setReports(getSavedReports())
        const msg = e instanceof Error ? e.message : String(e)
        if (/nutrition_reports|PGRST205|schema cache|Could not find the table/i.test(msg)) {
          toast.warning(
            'Tabela nutrition_reports indisponível no Supabase. A lista mostra só relatórios deste dispositivo até aplicar a migration no projeto.',
            { duration: 9000 },
          )
        } else if (/Cl[ií]nica ativa|Clinica ativa/i.test(msg)) {
          toast.warning('Selecione uma clínica ativa para sincronizar. A lista mostra apenas relatórios locais.', { duration: 7000 })
        } else if (/autenticad|Usuario autenticado|User not found/i.test(msg)) {
          toast.warning('Inicie sessão para carregar o histórico da clínica na nuvem. A lista mostra apenas relatórios locais.', { duration: 7000 })
        } else {
          toast.warning('Não foi possível sincronizar com a nuvem. Mostrando relatórios guardados neste dispositivo.', { duration: 7000 })
        }
      }
    }
    void sync()
  }, [])

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
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-foreground">
          <FileText className="h-8 w-8 text-orange-600 dark:text-orange-300" />
          Relatórios e histórico
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Com sessão iniciada e clínica selecionada, o histórico sincroniza com o Supabase. O PDF não é guardado na nuvem: gera-se na hora a partir dos dados do relatório — pode exportar quantas vezes quiser a partir desta lista ou do detalhe.
        </p>
      </div>

      <Card className="border-border bg-card shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#141010] dark:shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <CardHeader>
          <CardTitle className="text-foreground dark:text-white">Histórico do Energia Vet</CardTitle>
          <CardDescription>
            Busque por paciente ou tutor. O ficheiro PDF segue o padrão{' '}
            <span className="font-mono text-[11px] text-foreground/80">VETIUS_NUTRICAO_PACIENTE_TUTOR_AAAA-MM-DD.pdf</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por paciente ou tutor..." className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>

          {filteredReports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground dark:border-white/10">
              Nenhum relatorio salvo ainda.
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredReports.map((report) => {
                const requirement = getRequirementById(report.diet.requirementProfileId)
                return (
                  <Card
                    key={report.id}
                    className="border-border bg-muted/30 dark:border-white/10 dark:bg-[#1a1413]"
                  >
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold text-foreground dark:text-white">
                            {report.patient.name ?? 'Paciente sem nome'}
                          </p>
                          <p className="text-sm text-muted-foreground">{report.patient.ownerName ?? 'Tutor nao informado'}</p>
                        </div>
                        <Badge variant="outline">{new Date(report.createdAt).toLocaleDateString('pt-BR')}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-border bg-muted/40 p-3 dark:border-white/10 dark:bg-black/10">
                          <p className="text-[11px] text-muted-foreground">Espécie</p>
                          <p className="mt-1 font-semibold text-foreground dark:text-white">
                            {report.patient.species === 'dog' ? 'Cao' : report.patient.species === 'cat' ? 'Gato' : 'Nao informado'}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-muted/40 p-3 dark:border-white/10 dark:bg-black/10">
                          <p className="text-[11px] text-muted-foreground">Energia-alvo</p>
                          <p className="mt-1 font-semibold text-foreground dark:text-white">
                            {report.target.targetEnergy?.toFixed(0) ?? '—'} kcal/dia
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-muted/40 p-3 dark:border-white/10 dark:bg-black/10">
                          <p className="text-[11px] text-muted-foreground">Plano</p>
                          <p className="mt-1 font-semibold text-foreground dark:text-white">
                            {report.diet.mealsPerDay} refeicoes · {report.diet.gramsPerMeal?.toFixed(1) ?? '—'} g
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-muted/40 p-3 dark:border-white/10 dark:bg-black/10">
                          <p className="text-[11px] text-muted-foreground">Perfil clínico</p>
                          <p className="mt-1 font-semibold text-foreground dark:text-white">
                            {getHumanRequirementLabel(requirement)}
                          </p>
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
