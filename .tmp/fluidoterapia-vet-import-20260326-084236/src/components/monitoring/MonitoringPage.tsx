import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Droplet, Activity, HeartPulse, Scale, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';

export function MonitoringPage() {
  const checklist = [
    {
      title: 'Peso Corporal',
      icon: Scale,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      desc: 'O indicador mais sensível de ganho ou perda de fluidos.',
      freq: 'q6-12h',
      details: 'Ganho agudo > 5-10% indica sobrecarga hídrica (edema intersticial antes de sinais clínicos). Perda aguda indica desidratação contínua.'
    },
    {
      title: 'Balanço Hídrico (Entradas/Saídas)',
      icon: Droplet,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      desc: 'Comparação entre o que entra e o que sai do paciente.',
      freq: 'q4-6h',
      details: 'Entradas: IV, VO, SC, medicamentos. Saídas: Urina (sonda/tapete), vômito, diarreia, drenos. Balanço positivo excessivo = risco de sobrecarga.'
    },
    {
      title: 'Frequência e Esforço Respiratório',
      icon: Activity,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      desc: 'Sinal precoce de edema pulmonar ou efusão pleural.',
      freq: 'q1-2h',
      details: 'Aumento da FR em repouso, taquipneia, ortopneia, respiração abdominal. Ausculta: crepitações (tardio). US: B-lines.'
    },
    {
      title: 'Parâmetros Cardiovasculares',
      icon: HeartPulse,
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
      desc: 'Avaliação da resposta ao bolus e perfusão.',
      freq: 'q15-30m (crítico) / q4h (estável)',
      details: 'FC (taquicardia melhora com hidratação, mas gatos em choque podem ter bradicardia), PA, qualidade do pulso, TPC, cor das mucosas.'
    },
    {
      title: 'Sinais Físicos de Sobrecarga',
      icon: Eye,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      desc: 'Avaliação visual de edema tecidual.',
      freq: 'q4-6h',
      details: 'Quemose (edema conjuntival), serosidade nasal (corrimento claro), edema subcutâneo (patas, região ventral), ascite nova, turgor gelatinoso.'
    }
  ];

  return (
    <ScrollArea className="h-full w-full bg-slate-50 dark:bg-slate-950 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        <header>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <Activity className="w-8 h-8 text-teal-500" />
            Monitorização e Alertas
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Checklist clínico para acompanhamento da fluidoterapia e prevenção de sobrecarga.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          
          {/* Metas de Ressuscitação */}
          <Card className="border-teal-200 dark:border-teal-900/50 shadow-sm">
            <CardHeader className="bg-teal-50/50 dark:bg-teal-900/20 pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-teal-700 dark:text-teal-400">
                <CheckCircle2 className="w-5 h-5" />
                Metas de Ressuscitação (Endpoints)
              </CardTitle>
              <CardDescription>O bolus foi efetivo se atingir:</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                    <strong>Frequência Cardíaca:</strong> Normalização (Cães: 70-120 bpm, Gatos: 160-200 bpm)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                    <strong>Qualidade do Pulso:</strong> Forte e síncrono
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                    <strong>Mucosas e TPC:</strong> Rosadas, TPC 1-2 segundos
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                    <strong>Pressão Arterial:</strong> PAS &gt; 90 mmHg ou PAM &gt; 65 mmHg
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                    <strong>Lactato:</strong> Redução &gt; 50% em 2-4h ou normalização (&lt; 2 mmol/L)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                    <strong>Débito Urinário:</strong> &gt; 1-2 mL/kg/h
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Sinais de Sobrecarga (Fluid Overload) */}
          <Card className="border-rose-200 dark:border-rose-900/50 shadow-sm">
            <CardHeader className="bg-rose-50/50 dark:bg-rose-900/20 pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                Sinais Precoces de Sobrecarga Hídrica
              </CardTitle>
              <CardDescription>Pare os fluidos e reavalie imediatamente se notar:</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  Ganho de peso agudo &gt; 5-10%
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  Aumento da FR em repouso / Taquipneia
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  Quemose (edema conjuntival)
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  Corrimento nasal seroso claro
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  Novo sopro cardíaco ou ritmo de galope (gatos)
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  B-lines no ultrassom pulmonar (TFAST)
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Checklist */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2 mt-4">
            Checklist de Monitorização
          </h3>

          <div className="space-y-4">
            {checklist.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className={`${item.bg} p-6 md:w-64 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800`}>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-6 h-6 ${item.color}`} />
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                      </div>
                      <Badge variant="outline" className="w-fit bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700">
                        {item.freq}
                      </Badge>
                    </div>
                    <div className="p-6 flex-1 space-y-2">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.desc}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.details}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

        </div>
      </div>
    </ScrollArea>
  );
}
