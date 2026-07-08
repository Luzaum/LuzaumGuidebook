import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Beaker,
  Calculator,
  CheckCircle2,
  Droplet,
  FlaskConical,
  Info,
  ListChecks,
  ShieldAlert,
  Syringe,
} from 'lucide-react';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';

const PRESETS = [
  { bag: 100, d25: 5, d5: 10 },
  { bag: 250, d25: 12.5, d5: 25 },
  { bag: 500, d25: 25, d5: 50 },
  { bag: 1000, d25: 50, d5: 100 },
];

const INDICATIONS = [
  'Hipoglicemia persistente ou recorrente apos bolus de dextrose, com bomba e rechecagem seriada.',
  'Neonatos, filhotes, pacientes toy, septicemicos, anoreticos ou hepatopatas com pouca reserva de glicogenio.',
  'Suspeita de insulinoma, sobredose de insulina ou intoxicacoes que cursam com hipoglicemia.',
  'Suporte calorico parcial quando o paciente precisa de fluido isotonicamente guiado e glicose continua.',
];

const CONTRAINDICATIONS = [
  'Hiperglicemia relevante, diabetes descompensado, cetoacidose diabetica ou estado hiperosmolar.',
  'Uso como fluido de ressuscitacao primaria em choque: primeiro corrija perfusao com cristaloide/coloide apropriado.',
  'TCE, convulsao, sepse grave ou isquemia: usar somente se houver hipoglicemia documentada ou risco muito alto.',
  'Risco de sobrecarga, oliguria/anuria ou cardiopatia: ajustar taxa, volume e monitorizacao antes de glicolisar a bolsa.',
];

const MACETES = [
  'D50% tem 0,5 g/mL. Para D2,5% em bolsa, adicione 5% do volume final como D50%. Para D5%, adicione 10%.',
  'Melhor pratica: retire da bolsa exatamente o mesmo volume que vai adicionar de D50%, mantendo o volume final igual ao rotulo.',
  'Homogeneize de verdade: inverta a bolsa 10 a 15 vezes antes de conectar ao equipo. Bolsa mal misturada entrega glicose irregular.',
  'Rotule grande: concentracao final, diluente base, mL de D50 adicionados, horario, responsavel e meta glicemica.',
  'Se o paciente tambem precisa de KCl, calcule KCl separadamente e nunca ultrapasse 0,5 mEq/kg/h.',
];

const MONITORING = [
  'Glicemia: a cada 15 a 30 min no inicio se instavel; depois a cada 1 a 4 h conforme tendencia.',
  'Eletrólitos e gasometria quando disponivel: glicose pode puxar potassio para dentro da celula e mascarar piora clinica.',
  'Estado de perfusao e hidratacao: mucosas, pulso, TRC, peso, diurese, ausculta pulmonar e esforco respiratorio.',
  'Bomba de infusao: evite gotejamento manual, principalmente em pacientes pequenos.',
];

function formatMl(value: number) {
  if (!Number.isFinite(value)) return '0 mL';
  const rounded = Math.round(value * 10) / 10;
  return `${rounded.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mL`;
}

function calculateDextrose(stockPercent: number, targetPercent: number, finalVolumeMl: number, maintainFinalVolume: boolean) {
  if (stockPercent <= 0 || targetPercent <= 0 || finalVolumeMl <= 0 || stockPercent <= targetPercent) {
    return { addMl: 0, removeMl: 0, actualFinalVolumeMl: finalVolumeMl, glucoseGrams: 0 };
  }

  const addMl = maintainFinalVolume
    ? (targetPercent * finalVolumeMl) / stockPercent
    : (targetPercent * finalVolumeMl) / (stockPercent - targetPercent);
  const actualFinalVolumeMl = maintainFinalVolume ? finalVolumeMl : finalVolumeMl + addMl;
  const glucoseGrams = (stockPercent / 100) * addMl;

  return {
    addMl,
    removeMl: maintainFinalVolume ? addMl : 0,
    actualFinalVolumeMl,
    glucoseGrams,
  };
}

export function GlucoseSolutionsPage() {
  const [stockPercent, setStockPercent] = useState(50);
  const [targetPercent, setTargetPercent] = useState(2.5);
  const [finalVolumeMl, setFinalVolumeMl] = useState(500);
  const [maintainFinalVolume, setMaintainFinalVolume] = useState(true);

  const result = useMemo(
    () => calculateDextrose(stockPercent, targetPercent, finalVolumeMl, maintainFinalVolume),
    [finalVolumeMl, maintainFinalVolume, stockPercent, targetPercent],
  );
  const noRemovalVolumeMl = finalVolumeMl + result.addMl;

  return (
    <ScrollArea className="h-full w-full bg-slate-50 p-6 dark:bg-slate-950 lg:p-10">
      <div className="mx-auto w-full space-y-10 pb-20">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <FlaskConical className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Solução glicosada</h2>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Como glicolisar NaCl 0,9% ou Ringer lactato com dextrose concentrada para pacientes caes e gatos.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-emerald-600 text-white">D2,5% e D5%</Badge>
            <Badge variant="outline">NaCl 0,9%</Badge>
            <Badge variant="outline">Ringer lactato</Badge>
            <Badge variant="secondary">Bomba recomendada</Badge>
          </div>
        </header>

        <section className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Calculadora de preparo
              </CardTitle>
              <CardDescription>Padrao mais seguro: retirar volume da bolsa e repor o mesmo volume com D50%.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Dextrose estoque (%)</Label>
                  <Input type="number" min={1} value={stockPercent} onChange={(event) => setStockPercent(Number(event.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Concentração final (%)</Label>
                  <Input type="number" min={0.1} step={0.5} value={targetPercent} onChange={(event) => setTargetPercent(Number(event.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Volume final desejado (mL)</Label>
                  <Input type="number" min={1} value={finalVolumeMl} onChange={(event) => setFinalVolumeMl(Number(event.target.value) || 0)} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[2.5, 5, 10].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTargetPercent(preset)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                      targetPercent === preset
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                    }`}
                  >
                    D{String(preset).replace('.', ',')}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setMaintainFinalVolume((current) => !current)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  {maintainFinalVolume ? 'Mantem volume final' : 'Nao retira da bolsa'}
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Retirar da bolsa</p>
                  <p className="mt-2 text-2xl font-black text-emerald-950 dark:text-emerald-100">{formatMl(result.removeMl)}</p>
                </div>
                <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-700 dark:text-sky-300">Adicionar D{stockPercent}%</p>
                  <p className="mt-2 text-2xl font-black text-sky-950 dark:text-sky-100">{formatMl(result.addMl)}</p>
                </div>
                <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">Glicose adicionada</p>
                  <p className="mt-2 text-2xl font-black text-indigo-950 dark:text-indigo-100">{result.glucoseGrams.toFixed(1).replace('.', ',')} g</p>
                </div>
              </div>

              {maintainFinalVolume ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                  Se voce nao retirar volume antes de adicionar a dextrose, esta mesma preparacao subiria para {formatMl(noRemovalVolumeMl)}.
                  Isso altera taxa, concentracao final e volume entregue, principalmente em pacientes pequenos.
                </div>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                  Modo sem retirada ativo: o volume final sera {formatMl(result.actualFinalVolumeMl)}. Prefira retirar volume equivalente quando a meta for manter a bolsa no volume do rotulo.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Syringe className="h-5 w-5 text-teal-500" />
                Representação visual do melhor preparo
              </CardTitle>
              <CardDescription>Fluxo recomendado para NaCl 0,9% ou Ringer lactato.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid gap-3">
                {[
                  ['1', 'Escolha a bolsa', 'NaCl 0,9% ou Ringer lactato conforme o caso clinico.'],
                  ['2', 'Retire volume igual', `Retire ${formatMl(result.removeMl)} para manter o volume final correto.`],
                  ['3', 'Adicione dextrose', `Adicione ${formatMl(result.addMl)} de D${stockPercent}% com tecnica asseptica.`],
                  ['4', 'Homogeneize e rotule', 'Inverta 10 a 15 vezes, rotule e conecte em bomba.'],
                ].map(([step, title, text], index) => (
                  <div key={step} className="grid grid-cols-[2.5rem_1fr] items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white dark:bg-slate-100 dark:text-slate-950">{step}</div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{title}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{text}</p>
                    </div>
                    {index < 3 && <ArrowRight className="ml-3 h-5 w-5 rotate-90 text-slate-300 dark:text-slate-700" />}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200">
                <strong>Alerta:</strong> nao usar solucao glicosada como atalho para choque. Hipoperfusao precisa de ressuscitacao e reavaliacao; glicose entra quando a glicemia pede.
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 xl:grid-cols-2">
          <Card className="border-emerald-200 dark:border-emerald-900/50">
            <CardHeader className="bg-emerald-50/60 dark:bg-emerald-950/30">
              <CardTitle className="flex items-center gap-2 text-lg text-emerald-800 dark:text-emerald-200">
                <CheckCircle2 className="h-5 w-5" />
                Indicações de uso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              {INDICATIONS.map((item) => (
                <p key={item} className="rounded-xl border border-emerald-100 bg-white p-3 text-sm text-slate-700 dark:border-emerald-900/40 dark:bg-slate-950 dark:text-slate-300">
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="border-rose-200 dark:border-rose-900/50">
            <CardHeader className="bg-rose-50/60 dark:bg-rose-950/30">
              <CardTitle className="flex items-center gap-2 text-lg text-rose-800 dark:text-rose-200">
                <ShieldAlert className="h-5 w-5" />
                Contraindicações e cautelas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              {CONTRAINDICATIONS.map((item) => (
                <p key={item} className="rounded-xl border border-rose-100 bg-white p-3 text-sm text-slate-700 dark:border-rose-900/40 dark:bg-slate-950 dark:text-slate-300">
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-slate-200 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Beaker className="h-5 w-5 text-sky-500" />
                Tabela rapida com D50%
              </CardTitle>
              <CardDescription>Retirar e adicionar o mesmo volume.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                      <th className="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">Bolsa</th>
                      <th className="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">Para D2,5%</th>
                      <th className="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">Para D5%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {PRESETS.map((row) => (
                      <tr key={row.bag} className="bg-white dark:bg-slate-950">
                        <td className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-100">{row.bag} mL</td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300">retirar {formatMl(row.d25)} + adicionar {formatMl(row.d25)}</td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300">retirar {formatMl(row.d5)} + adicionar {formatMl(row.d5)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ListChecks className="h-5 w-5 text-indigo-500" />
                  Macetes de preparação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                {MACETES.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                    <Droplet className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    <p>{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Monitorização minima
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                {MONITORING.map((item) => (
                  <p key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <Card className="border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-slate-500" />
              Referencias e criterio clinico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-6 text-sm text-slate-600 dark:text-slate-300">
            <p>
              Conteudo organizado para consulta rapida com base em principios de fluidoterapia, hipoglicemia e suporte intensivo descritos em textos de medicina interna e emergencia veterinaria, incluindo Ettinger's Textbook of Veterinary Internal Medicine, 9a ed. (2024).
            </p>
            <p>
              A solucao glicosada nao substitui diagnostico, reavaliacao clinica nem ajuste individual de taxa. Use sempre glicemia seriada e metas do paciente.
            </p>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
