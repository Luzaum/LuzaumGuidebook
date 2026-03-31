import { useMemo, useState } from 'react';
import { Calculator, Droplets, Syringe } from 'lucide-react';
import { dilutionExamples } from '../../data/clinicalContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';

function calculateDilution(c1: number, c2: number, v2: number, diluent: number) {
  if (c1 <= 0 || c2 <= 0 || v2 <= 0 || c1 <= c2 || c2 <= diluent) {
    return { v1: 0, diluentVolume: 0 };
  }
  const v1 = (v2 * (c2 - diluent)) / (c1 - diluent);
  return { v1, diluentVolume: v2 - v1 };
}

export function DilutionsPage() {
  const [c1, setC1] = useState(20);
  const [c2, setC2] = useState(7.5);
  const [v2, setV2] = useState(100);
  const [diluent, setDiluent] = useState(0);

  const result = useMemo(() => calculateDilution(c1, c2, v2, diluent), [c1, c2, diluent, v2]);
  const explanation = diluent === 0 ? 'Como o diluente nao tem NaCl, a conta pratica se comporta como C1V1 = C2V2.' : 'Como o diluente ja contem NaCl, a conta precisa usar balanco de massa e concentracao.';

  return (
    <ScrollArea className="h-full w-full bg-slate-50 p-6 dark:bg-slate-950 lg:p-10">
      <div className="mx-auto w-full space-y-10 pb-20">
        <header>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            <Syringe className="h-8 w-8 text-teal-500" />
            Diluições e soluções
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Preparo de hipertônica em seringa ou bolsa, calculadora livre, explicação matemática e alertas de segurança.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
              <CardTitle className="flex items-center gap-2 text-lg"><Calculator className="h-5 w-5 text-indigo-500" /> Calculadora livre</CardTitle>
              <CardDescription>Use agua esteril, NaCl 0,9% ou outro diluente informado.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Concentração estoque (C1 %)</Label>
                  <Input type="number" value={c1} onChange={(event) => setC1(Number(event.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Concentração final desejada (C2 %)</Label>
                  <Input type="number" value={c2} onChange={(event) => setC2(Number(event.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Volume final (mL)</Label>
                  <Input type="number" value={v2} onChange={(event) => setV2(Number(event.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Concentração do diluente (%)</Label>
                  <Input type="number" value={diluent} onChange={(event) => setDiluent(Number(event.target.value) || 0)} />
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
                <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">Passo a passo</p>
                <p className="mt-2 text-sm text-indigo-800 dark:text-indigo-200">{explanation}</p>
                <div className="mt-4 space-y-2 text-sm text-indigo-900 dark:text-indigo-100">
                  <p>Aspire {result.v1.toFixed(1)} mL da solução estoque.</p>
                  <p>Complete com {result.diluentVolume.toFixed(1)} mL do diluente informado.</p>
                  <p>Volume final = {v2.toFixed(1)} mL.</p>
                  <p>Concentração final = {c2}%.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                Misturar completamente a bolsa ou seringa antes de administrar. Em TCE, a interface deve ensinar preparo prático da hipertônica, não apenas a dose.
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Droplets className="h-5 w-5 text-teal-500" /> Exemplos obrigatórios</CardTitle>
                <CardDescription>Preparos prontos para consulta rápida.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dilutionExamples.map((example) => (
                  <div key={example.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{example.title}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{example.stock}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{example.diluent}</p>
                    <p className="mt-2 text-sm font-medium text-teal-700 dark:text-teal-300">{example.result}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Preparo em seringa e em bolsa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">Seringa</p>
                  <p className="mt-2">Ideal para volumes pequenos, bolus de hipertônica e preparos pontuais. Aspirar o volume calculado da solução estoque e completar na própria seringa.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">Bolsa</p>
                  <p className="mt-2">Melhor quando voce precisa volume final maior e concentracao homogênea. Remover volume equivalente antes de adicionar o concentrado quando necessario.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
