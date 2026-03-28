import { Link } from 'react-router-dom';
import { Calculator, FileText, Stethoscope, Users, Utensils, Leaf, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const BASE_ROUTE = '/calculadora-energetica';
const MODULE_NAME = 'NutriçãoVET';
const MODULE_LOGO = '/apps/nutricaovet.png';

export default function Dashboard() {
  const quickActions = [
    { name: 'Novo Cálculo', description: 'Iniciar avaliação nutricional', icon: Calculator, path: `${BASE_ROUTE}/new`, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
    { name: 'Pacientes', description: 'Gerenciar cadastros', icon: Users, path: `${BASE_ROUTE}/patients`, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { name: 'Histórico', description: 'Relatórios e PDFs', icon: FileText, path: `${BASE_ROUTE}/reports`, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
    { name: 'Alimentos Comerciais', description: 'Banco de rações', icon: Utensils, path: `${BASE_ROUTE}/foods`, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    { name: 'Alimentação Natural', description: 'Ingredientes e dietas', icon: Leaf, path: `${BASE_ROUTE}/foods/natural`, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
    { name: 'Hospitalização', description: 'Risco e realimentação', icon: Stethoscope, path: `${BASE_ROUTE}/hospitalized`, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col gap-4 rounded-3xl border border-primary/10 bg-gradient-to-r from-primary/10 to-transparent p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img src={MODULE_LOGO} alt={MODULE_NAME} className="h-20 w-20 rounded-3xl bg-white/80 p-1.5 object-contain shadow-sm" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Bem-vindo ao {MODULE_NAME}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Sua ferramenta clínica avançada para nutrição de cães e gatos.
            </p>
          </div>
        </div>
        <Button size="lg" className="gap-2 shadow-lg" render={<Link to={`${BASE_ROUTE}/new`} />}>
          <Calculator className="h-5 w-5" />
          Iniciar Novo Cálculo
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
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
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="border-muted/60 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  Últimos Pacientes
                </CardTitle>
                <CardDescription>Pacientes avaliados recentemente</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" render={<Link to={`${BASE_ROUTE}/patients`} />}>
                Ver todos <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Rex', species: 'Cão', weight: '12.5kg', bcs: '5/9', date: 'Hoje' },
                { name: 'Mia', species: 'Gato', weight: '4.2kg', bcs: '6/9', date: 'Ontem' },
                { name: 'Thor', species: 'Cão', weight: '28kg', bcs: '8/9', date: '25 Mar' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-muted/50 bg-muted/10 p-3 transition-colors hover:bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.species} • {p.weight} • ECC {p.bcs}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                    <Button variant="secondary" size="sm" className="h-8">Abrir</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted/60 bg-gradient-to-br from-card to-muted/20 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Avisos Clínicos & Atualizações
            </CardTitle>
            <CardDescription>Informações importantes para sua prática</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl border border-orange-200 bg-orange-50/50 p-4 dark:border-orange-900/50 dark:bg-orange-950/20">
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-orange-500" />
                <p className="flex items-center gap-2 font-semibold text-orange-800 dark:text-orange-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
                  Diretrizes FEDIAF 2025
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-orange-700/80 dark:text-orange-400/80">
                  Os cálculos de energia e necessidades nutricionais estão atualizados com as recomendações mais recentes da FEDIAF (2025).
                </p>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-blue-500" />
                <p className="font-semibold text-blue-800 dark:text-blue-300">Dica de Uso Clínico</p>
                <p className="mt-1.5 text-sm leading-relaxed text-blue-700/80 dark:text-blue-400/80">
                  Use o modo <strong>Paciente Hospitalizado</strong> para calcular o risco de síndrome de realimentação e gerar protocolos de progressão alimentar em 3 ou 4 dias.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
