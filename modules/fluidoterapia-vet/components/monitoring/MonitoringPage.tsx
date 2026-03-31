import { Activity, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { monitoringGeneralChecklist, monitoringIntervals, overloadSigns } from '../../data/clinicalContent';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

export function MonitoringPage() {
  return (
    <ScrollArea className="h-full w-full bg-slate-50 p-6 dark:bg-slate-950 lg:p-10">
      <div className="mx-auto w-full space-y-10 pb-20">
        <header>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            <Activity className="h-8 w-8 text-teal-500" />
            Monitorização e alertas
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Checklist operacional para manter reavaliação contínua como eixo do módulo.</p>
        </header>

        <Card className="border-teal-200 shadow-sm dark:border-teal-900/50">
          <CardHeader className="bg-teal-50/50 dark:bg-teal-900/20">
            <CardTitle className="flex items-center gap-2 text-lg text-teal-700 dark:text-teal-300">
              <CheckCircle2 className="h-5 w-5" />
              O que precisa aparecer no centro da tela
            </CardTitle>
            <CardDescription>Não como detalhe, mas como critério para seguir, reduzir ou parar fluidos.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-6 md:grid-cols-2 xl:grid-cols-3">
            {monitoringGeneralChecklist.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Clock className="h-5 w-5 text-indigo-500" /> Intervalos sugeridos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {monitoringIntervals.map((item) => (
                <div key={item.scenario} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.scenario}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.interval}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Endpoints práticos de ressuscitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Melhora de pulso, mucosas, TPC, pressão arterial e mentação.</p>
              <p>Lactato em queda e diurese adequada ajudam a confirmar resposta perfusional.</p>
              <p>Se a resposta não vier apesar de alíquotas razoáveis, o problema pode não ser volume isolado.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-rose-200 shadow-sm dark:border-rose-900/50">
          <CardHeader className="bg-rose-50/50 dark:bg-rose-900/20">
            <CardTitle className="flex items-center gap-2 text-lg text-rose-700 dark:text-rose-300">
              <AlertTriangle className="h-5 w-5" />
              Sinais de sobrecarga
            </CardTitle>
            <CardDescription>Se ocorrerem, suspender ou reduzir fluidos e reavaliar o contexto clínico.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-6 md:grid-cols-2">
            {overloadSigns.map((item) => (
              <div key={item} className="rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-slate-950 dark:text-rose-300">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">TCE: reavaliação neurológica</CardTitle>
              <CardDescription>No início e após intervenções, geralmente q30-60 min.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {['Consciência', 'Pupilas / PLR', 'Reflexo oculocefálico', 'Padrão respiratório', 'Reflexo de Cushing', 'PA', 'Glicemia', 'Eletrólitos', 'Gasometria/capnografia se disponíveis'].map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">{item}</div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Quando reduzir, parar ou escalar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Suspender ou reduzir fluidos se surgirem sinais respiratórios, ganho agudo de peso, quemoses ou queda de saturação em contexto compatível.</p>
              <p>Considerar diurético conforme o contexto clínico, nunca como reflexo automático.</p>
              <p>Se o paciente continuar mal perfundido sem resposta clara a volume, revisar o diagnóstico fisiológico e considerar vasoativo, hemocomponente ou outro protocolo específico.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">Peso</Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">FR</Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">Ausculta</Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">Diurese</Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">PA</Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">Eletrólitos</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
