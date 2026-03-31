import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Calculator, FileText, Leaf, Scale, Stethoscope, Users, Utensils } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { getDatasetStats, getDefaultRequirement, getTopAuditIssues } from '../lib/genutriData'
import { getSavedPatients, getSavedReports } from '../lib/persistence'

const BASE_ROUTE = '/calculadora-energetica'
const MODULE_NAME = 'NutriçãoVET'
const MODULE_LOGO = '/apps/nutricaovet.png'

export default function Dashboard() {
  const datasetStats = useMemo(() => getDatasetStats(), [])
  const savedReports = useMemo(() => getSavedReports().slice(0, 4), [])
  const savedPatients = useMemo(() => getSavedPatients().slice(0, 4), [])
  const auditIssues = useMemo(() => getTopAuditIssues(4), [])
  const defaultDogRequirement = useMemo(() => getDefaultRequirement('dog'), [])
  const defaultCatRequirement = useMemo(() => getDefaultRequirement('cat'), [])

  const quickActions = [
    { name: 'Novo cálculo', description: 'Formulação e avaliação dietética', icon: Calculator, path: `${BASE_ROUTE}/new`, color: 'bg-orange-100 text-orange-600' },
    { name: 'Catálogo de alimentos', description: '129 itens importados do GENUTRI', icon: Utensils, path: `${BASE_ROUTE}/foods`, color: 'bg-blue-100 text-blue-600' },
    { name: 'Pacientes', description: 'Histórico persistido dos cálculos', icon: Users, path: `${BASE_ROUTE}/patients`, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Relatórios', description: 'Resumos clínicos salvos no módulo', icon: FileText, path: `${BASE_ROUTE}/reports`, color: 'bg-slate-100 text-slate-700' },
    { name: 'Manejo hospitalar', description: 'Risco e progressão alimentar', icon: Stethoscope, path: `${BASE_ROUTE}/hospitalized`, color: 'bg-red-100 text-red-600' },
    { name: 'Base natural / híbrida', description: 'Ingredientes e suplementos', icon: Leaf, path: `${BASE_ROUTE}/foods/natural`, color: 'bg-lime-100 text-lime-700' },
  ]

  return (
    <div className="space-y-8 w-full pb-20">
      <div className="flex flex-col gap-6 rounded-3xl border border-primary/10 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-4">
          <img src={MODULE_LOGO} alt={MODULE_NAME} className="h-24 w-24 rounded-3xl bg-white/80 p-2 object-contain shadow-sm" />
          <div className="pt-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{MODULE_NAME}</h1>
            <p className="mt-2 max-w-3xl text-base text-muted-foreground">
              Motor de formulação e avaliação reconstruído sobre a planilha GENUTRI, com energia por espécie, comparação contra exigências e plano alimentar fracionado.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">129 alimentos</Badge>
              <Badge variant="outline">43 perfis de exigência</Badge>
              <Badge variant="outline">2 regras energéticas</Badge>
              <Badge variant="outline">{datasetStats.auditWarnings} avisos auditados</Badge>
            </div>
          </div>
        </div>
        <div className="md:pt-4">
          <Button size="lg" className="gap-2 shadow-lg" render={<Link to={`${BASE_ROUTE}/new`} />}>
            <Calculator className="h-5 w-5" />
            Iniciar formulação
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Alimentos importados', value: datasetStats.foods, detail: `${datasetStats.categories} categorias normalizadas` },
          { label: 'Perfis de exigência', value: datasetStats.requirements, detail: 'FEDIAF, SACN, Brunetto e Purina' },
          { label: 'Cálculos salvos', value: savedReports.length, detail: 'Persistidos no módulo localmente' },
          { label: 'Pacientes recentes', value: savedPatients.length, detail: 'Consolidados pelo histórico do app' },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-foreground">{item.value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.name} to={action.path} className="block group">
              <Card className="h-full border-muted transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className={`shrink-0 rounded-xl p-3 ${action.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-none transition-colors group-hover:text-primary">{action.name}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <Card className="border-muted/60 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  Pacientes Recentes
                </CardTitle>
                <CardDescription>Extraídos do histórico salvo do módulo</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" render={<Link to={`${BASE_ROUTE}/patients`} />}>
                Ver todos <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedPatients.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Nenhum paciente foi salvo ainda. O primeiro cálculo concluído passa a aparecer aqui.
              </div>
            ) : (
              savedPatients.map((patient) => (
                <div key={`${patient.name}-${patient.lastReportAt}`} className="flex items-center justify-between rounded-xl border border-muted/50 bg-muted/10 p-3">
                  <div>
                    <p className="text-sm font-semibold">{patient.name ?? 'Paciente sem nome'}</p>
                    <p className="text-xs text-muted-foreground">
                      {patient.species === 'dog' ? 'Cão' : patient.species === 'cat' ? 'Gato' : 'Espécie indefinida'}
                      {' · '}
                      {patient.currentWeight ? `${patient.currentWeight} kg` : 'sem peso'}
                      {' · '}
                      {patient.reportCount} cálculo(s)
                    </p>
                  </div>
                  <Badge variant="outline">{new Date(patient.lastReportAt).toLocaleDateString('pt-BR')}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-muted/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-muted-foreground" />
              Perfis Padrão do Motor
            </CardTitle>
            <CardDescription>Perfis padrão usados ao abrir a formulação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-xl border border-border/60 p-4">
              <p className="font-semibold">Cão</p>
              <p className="mt-1 text-muted-foreground">{defaultDogRequirement?.label ?? 'Perfil não encontrado'}</p>
            </div>
            <div className="rounded-xl border border-border/60 p-4">
              <p className="font-semibold">Gato</p>
              <p className="mt-1 text-muted-foreground">{defaultCatRequirement?.label ?? 'Perfil não encontrado'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <Card className="border-muted/60 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  Relatórios Recentes
                </CardTitle>
                <CardDescription>Últimos planos salvos no módulo</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" render={<Link to={`${BASE_ROUTE}/reports`} />}>
                Abrir histórico <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedReports.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Nenhum relatório salvo. O resumo final do cálculo grava um snapshot utilizável pelo módulo.
              </div>
            ) : (
              savedReports.map((report) => (
                <div key={report.id} className="rounded-xl border border-border/60 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{report.patient.name ?? 'Paciente sem nome'}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.diet.entries.length} item(ns) · {report.diet.targetEnergy.toFixed(0)} kcal/dia
                      </p>
                    </div>
                    <Badge variant="outline">{new Date(report.createdAt).toLocaleDateString('pt-BR')}</Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-muted/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-muted-foreground" />
              Auditoria da Planilha
            </CardTitle>
            <CardDescription>Principais inconsistências neutralizadas no app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {auditIssues.map((issue, index) => (
              <div key={`${issue.sheet}-${issue.cell ?? index}`} className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <p className="font-semibold text-amber-900">
                  {issue.sheet}
                  {issue.cell ? ` · ${issue.cell}` : ''}
                </p>
                <p className="mt-1 text-amber-800/80">{issue.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
