import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Activity, AlertTriangle, ArrowRight, Calculator, FileText, Leaf, Users, Utensils } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { getTopAuditIssues } from '../lib/genutriData'
import { getSavedPatients, getSavedReports } from '../lib/persistence'

const BASE_ROUTE = '/calculadora-energetica'

export default function Dashboard() {
  const savedReports = useMemo(() => getSavedReports().slice(0, 5), [])
  const savedPatients = useMemo(() => getSavedPatients().slice(0, 5), [])
  const auditIssues = useMemo(() => getTopAuditIssues(4), [])

  const destinations = [
    { name: 'Catálogo completo', description: 'Consultar composição e micronutrientes', icon: Utensils, path: `${BASE_ROUTE}/foods` },
    { name: 'Pacientes', description: 'Acessar histórico clínico', icon: Users, path: `${BASE_ROUTE}/patients` },
    { name: 'Base natural', description: 'Ingredientes e suplementos', icon: Leaf, path: `${BASE_ROUTE}/foods/natural` },
  ]

  return (
    <div className="nutrition-page w-full space-y-6 pb-16">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-primary p-6 text-primary-foreground shadow-[0_20px_50px_rgba(29,78,216,0.18)] sm:p-8 lg:p-10">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[44px] border-white/5" aria-hidden />
        <div className="relative z-[1] grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Nutrição clínica veterinária</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-primary-foreground sm:text-4xl lg:text-[2.8rem]">Acompanhamento nutricional baseado em evidências</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80">Um fluxo de cálculos para decidir o melhor plano nutricional para cada paciente.</p>
            <Button size="lg" variant="secondary" className="mt-7 h-14 w-full gap-2 bg-white px-7 text-base text-primary hover:bg-white/90 sm:w-auto" render={<Link to={`${BASE_ROUTE}/new`} />}>
              <Calculator className="h-5 w-5" /> Iniciar novo plano
            </Button>
          </div>
          <div className="relative mx-auto flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64 lg:h-72 lg:w-72">
            <div className="absolute inset-5 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <img src="/nutrition-hero-symbol.png" alt="Tigela com ração e medidor nutricional" className="relative h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(8,33,95,0.28)]" />
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <Card className="gap-0 py-0">
          <CardHeader className="border-b border-border p-5">
            <CardTitle className="text-base">Área de trabalho</CardTitle>
            <CardDescription>Atalhos para as rotinas mais usadas.</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            {destinations.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.name} to={item.path} className="group flex min-h-[72px] cursor-pointer items-center gap-3 rounded-2xl p-3 outline-none transition-colors duration-200 hover:bg-muted/70 focus-visible:ring-3 focus-visible:ring-ring/25">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-foreground">{item.name}</span><span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.description}</span></span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              )
            })}
          </CardContent>
        </Card>

        <div className="grid gap-5 md:grid-cols-2">
          <Card className="gap-0 py-0">
            <CardHeader className="grid grid-cols-[1fr_auto] items-center border-b border-border p-5">
              <div><CardTitle className="flex items-center gap-2 text-base"><Users className="h-4 w-4 text-primary" /> Pacientes recentes</CardTitle><CardDescription>Últimos históricos acessados.</CardDescription></div>
              <Button variant="ghost" size="sm" render={<Link to={`${BASE_ROUTE}/patients`} />}>Ver todos</Button>
            </CardHeader>
            <CardContent className="divide-y divide-border px-5 py-1">
              {savedPatients.length === 0 ? <p className="py-6 text-sm text-muted-foreground">O primeiro plano salvo aparecerá aqui.</p> : savedPatients.map((patient) => (
                <div key={`${patient.name}-${patient.lastReportAt}`} className="flex items-center gap-3 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">{(patient.name ?? 'P').slice(0, 1).toUpperCase()}</span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{patient.name ?? 'Paciente sem nome'}</p><p className="truncate text-xs text-muted-foreground">{patient.species === 'dog' ? 'Cão' : patient.species === 'cat' ? 'Gato' : 'Espécie não informada'} · {patient.reportCount} plano(s)</p></div>
                  <span className="text-xs text-muted-foreground">{new Date(patient.lastReportAt).toLocaleDateString('pt-BR')}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="gap-0 py-0">
            <CardHeader className="grid grid-cols-[1fr_auto] items-center border-b border-border p-5">
              <div><CardTitle className="flex items-center gap-2 text-base"><FileText className="h-4 w-4 text-primary" /> Planos recentes</CardTitle><CardDescription>Prescrições prontas para consulta.</CardDescription></div>
              <Button variant="ghost" size="sm" render={<Link to={`${BASE_ROUTE}/reports`} />}>Histórico</Button>
            </CardHeader>
            <CardContent className="divide-y divide-border px-5 py-1">
              {savedReports.length === 0 ? <p className="py-6 text-sm text-muted-foreground">Nenhum relatório salvo até o momento.</p> : savedReports.map((report) => (
                <div key={report.id} className="flex items-center gap-3 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary"><Activity className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{report.patient.name ?? 'Paciente sem nome'}</p><p className="text-xs text-muted-foreground">{report.diet.targetEnergy.toFixed(0)} kcal/dia · {report.diet.entries.length} alimento(s)</p></div>
                  <span className="text-xs text-muted-foreground">{new Date(report.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {auditIssues.length > 0 && (
        <details className="group rounded-2xl border border-border bg-card">
          <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 text-sm font-medium text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200"><AlertTriangle className="h-4 w-4" /></span>
            Integridade da base nutricional
            <span className="ml-auto text-xs font-normal text-muted-foreground">{auditIssues.length} observações</span>
          </summary>
          <div className="space-y-2 border-t border-border px-5 py-4">{auditIssues.map((issue, index) => <p key={`${issue.sheet}-${issue.cell ?? index}`} className="text-sm leading-relaxed text-muted-foreground">{issue.message}</p>)}</div>
        </details>
      )}
    </div>
  )
}
