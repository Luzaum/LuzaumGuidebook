import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowRight, CalendarDays, Download, FileText, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
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
            'A sincronização do histórico está indisponível. A lista mostra os relatórios salvos neste dispositivo.',
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

  const uniquePatients = useMemo(() => new Set(reports.map((report) => report.patientKey ?? report.patient.name)).size, [reports])

  return (
    <div className="nutrition-page w-full space-y-6 pb-16">
      <header className="nutrition-page-header">
        <div><p className="nutrition-eyebrow">Documentação clínica</p><h1>Relatórios</h1><p>Consulte prescrições salvas, revise a composição do plano e gere novamente o documento em PDF.</p></div>
        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto"><div className="nutrition-header-stat"><span>Relatórios</span><strong>{reports.length}</strong></div><div className="nutrition-header-stat"><span>Pacientes</span><strong>{uniquePatients}</strong></div></div>
      </header>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b border-border p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Histórico de planos</CardTitle><CardDescription className="mt-1">Dados locais e sincronizados são exibidos em ordem cronológica.</CardDescription></div>
            <div className="relative w-full lg:max-w-md"><Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" /><Input aria-label="Buscar relatórios" placeholder="Paciente ou tutor" className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          {filteredReports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Nenhum relatório salvo ainda.</div>
          ) : (
            <div className="space-y-3">
              {filteredReports.map((report) => {
                const requirement = getRequirementById(report.diet.requirementProfileId)
                const prescription = report.formula.contributions.map((item) => item.foodName).slice(0, 2).join(' + ') || 'Sem alimentos'
                return (
                  <article key={report.id} className="grid gap-4 rounded-2xl border border-border bg-card p-4 transition-colors duration-200 hover:border-primary/25 lg:grid-cols-[minmax(180px,0.7fr)_minmax(260px,1.2fr)_repeat(3,minmax(110px,0.45fr))_auto] lg:items-center">
                    <div className="min-w-0"><p className="truncate text-base font-semibold text-foreground">{report.patient.name ?? 'Paciente sem nome'}</p><p className="mt-1 truncate text-sm text-muted-foreground">{report.patient.ownerName ?? 'Tutor não informado'}</p><p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" /> {new Date(report.createdAt).toLocaleDateString('pt-BR')}</p></div>
                    <div className="min-w-0"><p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Prescrição</p><p className="mt-1 truncate text-sm font-medium text-foreground">{prescription}{report.formula.contributions.length > 2 ? ` +${report.formula.contributions.length - 2}` : ''}</p><p className="mt-1 truncate text-xs text-muted-foreground">{getHumanRequirementLabel(requirement)}</p></div>
                    <div><p className="text-[11px] text-muted-foreground">Espécie</p><p className="mt-1 text-sm font-semibold">{report.patient.species === 'dog' ? 'Cão' : report.patient.species === 'cat' ? 'Gato' : 'Não informado'}</p></div>
                    <div><p className="text-[11px] text-muted-foreground">Energia-alvo</p><p className="mt-1 text-sm font-semibold tabular-nums">{report.target.targetEnergy?.toFixed(0) ?? '—'} kcal</p></div>
                    <div><p className="text-[11px] text-muted-foreground">Rotina</p><p className="mt-1 text-sm font-semibold">{report.diet.mealsPerDay} refeições</p></div>
                    <div className="flex items-center justify-end gap-2"><Button variant="outline" size="sm" onClick={() => exportReportPdf(report)} aria-label={`Exportar relatório de ${report.patient.name ?? 'paciente'}`}><Download className="h-4 w-4" /></Button><Button size="sm" render={<Link to={`${BASE_ROUTE}/reports/${report.id}`} />} className="gap-2">Abrir <ArrowRight className="h-4 w-4" /></Button></div>
                  </article>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
