import { AlertCircle, ArrowRight, Stethoscope } from 'lucide-react';
import { protocols } from '../../data/clinicalContent';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

const getProtocolIcon = (id: string) => {
  switch (id) {
    case 'hypovolemia': return '🏥';
    case 'dehydration': return '💧';
    case 'cardiac': return '❤️';
    case 'renal': return '🧪';
    case 'tce': return '🧠';
    case 'sepsis': return '🌡️';
    case 'hypoalbuminemia': return '🌊';
    case 'anemia': return '🩸';
    case 'vomit-alkalosis': return '🤮';
    case 'diarrhea-acidosis': return '🚽';
    case 'dka': return '💉';
    case 'hyponatremia': return '🧂';
    case 'hypernatremia': return '🔥';
    case 'anesthesia': return '💤';
    case 'neonate-puppy': return '👶';
    case 'pancreatitis': return '🌋';
    default: return '📋';
  }
};

export function ProtocolsPage() {
  return (
    <ScrollArea className="h-full w-full bg-slate-50 p-6 dark:bg-slate-950 lg:p-10">
      <div className="mx-auto w-full space-y-10 pb-20">
        <header>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            <Stethoscope className="h-8 w-8 text-teal-500" />
            Doenças e protocolos
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Protocolos clínicos completos para cenários onde fluidoterapia não pode ser pensada como taxa única e cega.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {protocols.map((protocol) => (
            <Card key={protocol.id} className="flex flex-col overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="text-xl text-slate-800 dark:text-slate-100">{protocol.title}</CardTitle>
                  <span className="text-3xl">{getProtocolIcon(protocol.id)}</span>
                </div>
                <CardDescription>{protocol.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6 p-6">
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <AlertCircle className="h-4 w-4" />
                    Por que a fluidoterapia muda
                  </h4>
                  {protocol.why.map((item) => (
                    <p key={item} className="text-sm text-slate-600 dark:text-slate-300">{item}</p>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Objetivos</h4>
                  {protocol.goals.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Preferir</h4>
                    <ul className="mt-3 space-y-2 text-sm text-emerald-900 dark:text-emerald-100">
                      {protocol.preferred.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">Evitar</h4>
                    <ul className="mt-3 space-y-2 text-sm text-rose-900 dark:text-rose-100">
                      {protocol.avoid.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Monitorização chave</h4>
                  <div className="flex flex-wrap gap-2">
                    {protocol.monitor.map((item) => (
                      <Badge key={item} variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
