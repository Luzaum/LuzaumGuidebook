import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Stethoscope, Brain, Heart, Activity, Droplet, AlertCircle, ArrowRight, Flame, Syringe, Baby, Bug, Kidney, Cat } from 'lucide-react';
import { Badge } from '../ui/badge';

export function ProtocolsPage() {
  const protocols = [
    {
      title: 'Parvovirose',
      icon: Bug,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800/50',
      why: 'Causa perdas contínuas massivas (vômito/diarreia), choque hipovolêmico, hipocalemia severa e hipoglicemia (especialmente em filhotes).',
      goals: ['Ressuscitação volêmica agressiva inicial', 'Reposição contínua de perdas (pode exceder a manutenção)', 'Correção de hipocalemia e hipoglicemia'],
      fluids: ['Ringer Lactato (com bolus iniciais se choque)', 'Suplementação agressiva de KCl (até 0.5 mEq/kg/h)', 'Dextrose 2.5-5% se hipoglicêmico'],
      avoid: ['Subestimar perdas contínuas', 'Esquecer de monitorar potássio e glicose', 'Uso excessivo de coloides artificiais'],
      monitor: ['Peso corporal (q6-12h)', 'Glicemia', 'Potássio sérico', 'Frequência cardíaca e pressão arterial'],
      reference: 'AAHA 2024 / Tratado de Medicina Interna'
    },
    {
      title: 'Doença Renal Crônica Agudizada',
      icon: Droplet,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800/50',
      why: 'Rins com função comprometida não conseguem excretar excesso de sódio e água. Reidratação rápida pode causar edema pulmonar fatal.',
      goals: ['Reidratação LENTA (ao longo de 24-48h)', 'Evitar hiper-hidratação', 'Corrigir distúrbios eletrolíticos (K+, P)'],
      fluids: ['Cristaloides balanceados (RL ou Plasmalyte)', 'Fluidos sem potássio se hipercalêmico (fase oligúrica)'],
      avoid: ['Taxas de reidratação rápidas (< 24h)', '"Forçar diurese" com fluidos em pacientes anúricos', 'Fluidos ricos em sódio (NaCl 0.9%) se hipertenso'],
      monitor: ['Produção de urina (pesagem de tapetes/sonda)', 'Peso corporal (q12h)', 'Pressão arterial', 'Frequência respiratória (risco de edema)'],
      reference: 'IRIS Guidelines / AAHA 2024'
    },
    {
      title: 'Obstrução Uretral Felina',
      icon: Cat,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800/50',
      why: 'Causa hipercalemia fatal, acidose metabólica e lesão renal aguda pós-renal. Após a desobstrução, ocorre diurese pós-obstrutiva massiva.',
      goals: ['Tratar hipercalemia (diluição e proteção miocárdica)', 'Repor perdas da diurese pós-obstrutiva', 'Corrigir acidose'],
      fluids: ['NaCl 0.9% (tradicional) ou Ringer Lactato (seguro e corrige acidose melhor)', 'Ajustar taxa de infusão para "empatar" com a produção de urina pós-desobstrução'],
      avoid: ['Fluidos com alto potássio (antes da desobstrução)', 'Ignorar a diurese pós-obstrutiva (risco de hipovolemia e hipocalemia rebote)'],
      monitor: ['ECG (ondas T apiculadas, bradicardia)', 'Potássio sérico', 'Produção de urina (q2-4h pós-desobstrução)', 'Pressão arterial'],
      reference: 'AAHA 2024 / Feline Medicine Guidelines'
    },
    {
      title: 'Cetoacidose Diabética (CAD)',
      icon: Syringe,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800/50',
      why: 'A diurese osmótica pela glicose causa desidratação severa e perda de eletrólitos (K+, P, Mg). A acidose desloca o K+ para fora da célula.',
      goals: ['Restaurar volume intravascular (lentamente)', 'Corrigir desidratação em 24-48h', 'Repor Potássio e Fósforo agressivamente'],
      fluids: ['NaCl 0.9% (inicialmente) ou balanceados', 'Suplementação agressiva de KCl (e Fosfato de Potássio)', 'Adicionar Dextrose quando glicemia < 250 mg/dL'],
      avoid: ['Correção rápida da glicemia (risco de edema cerebral)', 'Insulina antes da fluidoterapia inicial (agrava hipocalemia)', 'Bolus rápidos (exceto em choque)'],
      monitor: ['Glicemia (q1-2h)', 'Eletrólitos (K+, P) (q4-6h)', 'Gásometria venosa', 'Estado mental'],
      reference: 'AAHA 2024 / Endocrine Guidelines'
    },
    {
      title: 'TCE / TBI (Traumatismo Cranioencefálico)',
      icon: Brain,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      border: 'border-indigo-200 dark:border-indigo-800/50',
      why: 'A hipoperfusão sistêmica agrava a lesão cerebral secundária. A manutenção da pressão arterial média (PAM) é crucial para a pressão de perfusão cerebral (PPC).',
      goals: ['Manter PAM > 80-90 mmHg', 'Evitar hipovolemia', 'Reduzir PIC se houver sinais de hipertensão intracraniana'],
      fluids: ['Salina Hipertônica (7.2-7.5%)', 'Cristaloides isotônicos balanceados'],
      avoid: ['Fluidos hipotônicos (ex: NaCl 0.45%)', 'Grandes volumes de cristaloides que possam causar edema'],
      monitor: ['Pressão arterial', 'Mentação (Escala de Coma de Glasgow Modificada)', 'Reflexo pupilar', 'Sinais de Cushing (bradicardia + hipertensão)'],
      reference: 'Brain Trauma Foundation Guidelines / AAHA 2024'
    },
    {
      title: 'Cardiopatia / ICC',
      icon: Heart,
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
      border: 'border-rose-200 dark:border-rose-800/50',
      why: 'O coração doente não consegue lidar com o aumento da pré-carga, levando rapidamente à congestão venosa e edema pulmonar/efusão.',
      goals: ['Manter hidratação sem sobrecarregar o volume intravascular', 'Evitar precipitar insuficiência cardíaca congestiva'],
      fluids: ['Água enteral (preferencial)', 'NaCl 0.45% com Dextrose 2.5% (se IV necessário)'],
      avoid: ['Bolus rápidos', 'Altas taxas de manutenção', 'Fluidos ricos em sódio se houver congestão'],
      monitor: ['Frequência respiratória (FR repouso)', 'Esforço respiratório', 'Ausculta (crepitações)', 'Peso corporal (ganho agudo)'],
      reference: 'ACVIM Consensus Guidelines / AAHA 2024'
    },
    {
      title: 'Sepse / Choque Vasodilatatório',
      icon: Activity,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800/50',
      why: 'A vasodilatação sistêmica e o aumento da permeabilidade capilar levam à hipovolemia relativa e absoluta, com vazamento de fluidos para o interstício.',
      goals: ['Restaurar volume intravascular', 'Melhorar perfusão tecidual e entrega de oxigênio', 'Manter PAM > 65 mmHg'],
      fluids: ['Cristaloides isotônicos balanceados (bolus repetidos)', 'Vasopressores (se refratário a fluidos)'],
      avoid: ['Atraso na ressuscitação', 'Excesso de fluidos após restauração da volemia (risco de edema tecidual)'],
      monitor: ['Lactato', 'Pressão arterial', 'Débito urinário', 'Saturação venosa central (se disponível)'],
      reference: 'Surviving Sepsis Campaign / AAHA 2024'
    },
    {
      title: 'Pancreatite Aguda',
      icon: Flame,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800/50',
      why: 'A inflamação pancreática causa sequestro de fluidos (terceiro espaço), vômitos e diarreia, levando a hipovolemia severa e isquemia pancreática.',
      goals: ['Restaurar perfusão pancreática', 'Corrigir desidratação e perdas contínuas', 'Manter equilíbrio eletrolítico'],
      fluids: ['Cristaloides isotônicos balanceados (ex: Ringer Lactato)'],
      avoid: ['Sub-hidratação (agrava a necrose pancreática)', 'Bolus excessivos de coloides'],
      monitor: ['Perdas contínuas (vômito/diarreia)', 'Dor abdominal', 'Pressão arterial', 'Eletrólitos (K+, Ca++)'],
      reference: 'AAHA Fluid Therapy Guidelines 2024'
    }
  ];

  return (
    <ScrollArea className="h-full w-full bg-slate-50 dark:bg-slate-950 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-10 pb-20">
        <header>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-teal-500" />
            Doenças e Protocolos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Diretrizes específicas para condições clínicas que exigem modificação da fluidoterapia padrão.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {protocols.map((protocol, idx) => {
            const Icon = protocol.icon;
            return (
              <Card key={idx} className={`border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col`}>
                <CardHeader className={`${protocol.bg} border-b ${protocol.border} pb-4`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm ${protocol.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-100">{protocol.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6 flex-1">
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-slate-400" />
                      Por que a fluidoterapia muda?
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {protocol.why}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Objetivos</h4>
                    <ul className="space-y-1.5">
                      {protocol.goals.map((goal, i) => (
                        <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Fluidos Preferidos</h4>
                      <ul className="space-y-1">
                        {protocol.fluids.map((fluid, i) => (
                          <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                            <span>{fluid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">O que Evitar</h4>
                      <ul className="space-y-1">
                        {protocol.avoid.map((avoid, i) => (
                          <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1" />
                            <span>{avoid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Monitorização Chave</h4>
                    <div className="flex flex-wrap gap-2">
                      {protocol.monitor.map((item, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-normal">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                </CardContent>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 text-right">
                  Ref: {protocol.reference}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
