import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { BookOpen, Droplet, AlertTriangle, Info, BrainCircuit, Activity, Eye, Syringe } from 'lucide-react';

export function GuidePage() {
  return (
    <ScrollArea className="h-full w-full bg-slate-50 dark:bg-slate-950 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        <header>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-teal-500" />
            Guia Clínico
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Fundamentos de fluidoterapia, fisiologia e raciocínio clínico baseados no AAHA 2024.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Fisiologia */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
              1. Compartimentos e Fisiologia
            </h3>
            
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-blue-500" />
                  Água Corporal Total (ACT)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-slate-600 dark:text-slate-300">
                  A água corporal total representa cerca de 60% do peso corporal em adultos (maior em neonatos). Ela é dividida em:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
                    <p className="font-bold text-blue-900 dark:text-blue-100">Intracelular (LIC)</p>
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">67% <span className="text-sm font-medium">da ACT</span></p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Dentro das células. Rico em Potássio.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50">
                    <p className="font-bold text-indigo-900 dark:text-indigo-100">Intersticial</p>
                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">25% <span className="text-sm font-medium">da ACT</span></p>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-2">Entre as células. Onde ocorre a desidratação clínica.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50">
                    <p className="font-bold text-rose-900 dark:text-rose-100">Intravascular</p>
                    <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">8% <span className="text-sm font-medium">da ACT</span></p>
                    <p className="text-xs text-rose-700 dark:text-rose-300 mt-2">Dentro dos vasos. Onde ocorre a hipovolemia.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Hipovolemia vs Desidratação */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
              2. Hipovolemia vs Desidratação
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-rose-200 dark:border-rose-900/50 shadow-sm">
                <CardHeader className="bg-rose-50/50 dark:bg-rose-900/20 pb-4">
                  <CardTitle className="text-lg text-rose-700 dark:text-rose-400">Hipovolemia (Choque)</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300"><strong>O que é:</strong> Perda de fluido do espaço intravascular.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Sinais:</strong> Taquicardia, pulsos fracos, mucosas pálidas, TPC prolongado, hipotensão, lactato alto.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Tratamento:</strong> Rápido (minutos). Bolus IV de cristaloides isotônicos, hipertônicos ou coloides.</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-200 dark:border-indigo-900/50 shadow-sm">
                <CardHeader className="bg-indigo-50/50 dark:bg-indigo-900/20 pb-4">
                  <CardTitle className="text-lg text-indigo-700 dark:text-indigo-400">Desidratação</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300"><strong>O que é:</strong> Perda de fluido do espaço intersticial (e intracelular).</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Sinais:</strong> Turgor cutâneo reduzido, mucosas secas, olhos retraídos, perda de peso aguda.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Tratamento:</strong> Lento (12-24h). Reposição gradual para permitir o reequilíbrio entre os compartimentos.</p>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Erro Comum</p>
                <p className="text-sm text-amber-700 dark:text-amber-400/90 mt-1">
                  Tratar desidratação com bolus rápido. O fluido administrado rapidamente no espaço intravascular demora cerca de 30-60 minutos para se redistribuir para o interstício. Um bolus rápido para desidratação apenas causará diurese antes que o interstício seja reidratado.
                </p>
              </div>
            </div>
          </section>

          {/* Sinais de Desidratação */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
              3. Avaliação da Desidratação
            </h3>
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-800">% Estimada</th>
                      <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-800">Sinais Clínicos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="bg-white dark:bg-slate-950">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">&lt; 5%</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Indetectável clinicamente. História de perdas (vômito/diarreia) sem sinais físicos.</td>
                    </tr>
                    <tr className="bg-slate-50/50 dark:bg-slate-900/20">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">5 - 6%</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Leve perda de turgor cutâneo ("tenda" volta lentamente), mucosas levemente secas/pegajosas.</td>
                    </tr>
                    <tr className="bg-white dark:bg-slate-950">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">6 - 8%</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Atraso óbvio no retorno do turgor cutâneo, mucosas secas, leve enoftalmia (olhos fundos), TPC pode estar levemente prolongado.</td>
                    </tr>
                    <tr className="bg-slate-50/50 dark:bg-slate-900/20">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">10 - 12%</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Turgor cutâneo não retorna (tenda permanece), mucosas muito secas, enoftalmia severa, sinais de choque (taquicardia, pulsos fracos) começam a aparecer.</td>
                    </tr>
                    <tr className="bg-rose-50/50 dark:bg-rose-900/10">
                      <td className="px-6 py-4 font-bold text-rose-700 dark:text-rose-400">12 - 15%</td>
                      <td className="px-6 py-4 text-rose-600 dark:text-rose-300">Choque hipovolêmico iminente ou presente. Risco de morte. Requer ressuscitação imediata.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Tipos de Fluidos */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
              4. Tipos de Fluidos
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Syringe className="w-5 h-5 text-teal-500" />
                    Cristaloides Isotônicos de Reposição
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Fluidos de primeira linha. Distribuem-se rapidamente para o interstício (apenas 25% permanece no espaço intravascular após 30-60 min).
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                      <strong>Ringer Lactato (RL):</strong> Alcalinizante (lactato é convertido em bicarbonato no fígado). Excelente para acidose metabólica, diarreia, fluidoterapia geral. Evitar se hipercalcemia severa (contém cálcio).
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                      <strong>NaCl 0.9% (Fisiológica):</strong> Acidificante (alto teor de cloreto). Ideal para alcalose metabólica, hipocloremia (ex: vômito gástrico severo), hipercalcemia, hipercalemia (não contém potássio) e TCE (levemente hiperosmolar em relação ao plasma).
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-500" />
                    Salina Hipertônica (7.2% - 7.5%)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Puxa água do interstício e intracelular para o intravascular por osmose. Expansão de volume rápida com pequenos volumes (4-5 ml/kg).
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    <strong>Indicações:</strong> Choque hipovolêmico (especialmente cães grandes onde grandes volumes de RL são difíceis de dar rápido), TCE (reduz PIC enquanto expande volume).
                  </p>
                  <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">
                    <strong>Contraindicações:</strong> Desidratação severa (não há água no interstício para puxar), hipernatremia. O efeito é transitório (30-60 min), deve ser seguido por cristaloides isotônicos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-orange-500" />
                    Coloides Sintéticos (ex: Hidroxietilamido - Voluven)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Contêm macromoléculas que não cruzam o endotélio capilar facilmente, mantendo a pressão oncótica e retendo fluido no espaço intravascular por mais tempo.
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    <strong>Uso atual:</strong> Seu uso tem diminuído muito na medicina veterinária devido aos riscos associados (Lesão Renal Aguda - AKI, coagulopatias, anafilaxia).
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    <strong>Indicações restritas:</strong> Hipoproteinemia severa com edema/efusão onde cristaloides vazam para o interstício, choque refratário a cristaloides. Dose máxima: 20 ml/kg/dia.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Monitoração */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
              5. Monitoração e Sobrecarga Hídrica
            </h3>
            
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">O que monitorar?</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• <strong>Peso Corporal:</strong> Pesar a cada 6-12h. É o indicador mais sensível. Ganho agudo de peso = retenção de fluidos.</li>
                  <li>• <strong>Exame Físico:</strong> Frequência respiratória (aumento pode indicar edema pulmonar), ausculta (crepitações), turgor cutâneo, mucosas.</li>
                  <li>• <strong>Débito Urinário:</strong> Normal é 1-2 ml/kg/h. Oligúria com fluidoterapia adequada sugere falha renal ou obstrução.</li>
                  <li>• <strong>Sinais de Sobrecarga:</strong> Quemose (edema conjuntival), serosidade nasal, taquipneia, ascite nova, turgor "gelatinoso". Gatos são muito suscetíveis!</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Raciocínio Clínico */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
              6. Raciocínio Clínico e Dicas
            </h3>
            
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">Gatos vs Cães</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Gatos têm um volume sanguíneo menor (aprox. 60 mL/kg) em comparação com cães (aprox. 80-90 mL/kg). Eles também são mais propensos a desenvolver edema pulmonar e efusão pleural com fluidoterapia agressiva. Gatos em choque frequentemente apresentam a "tríade do choque felino": hipotensão, bradicardia e hipotermia. Aquecimento ativo é crucial.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">Anestesia</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  A hipotensão anestésica é frequentemente causada por vasodilatação (fármacos) e não por hipovolemia absoluta. Dar grandes volumes de fluidos para tratar a pressão arterial durante a anestesia pode levar à sobrecarga hídrica. Considere reduzir o anestésico inalatório ou usar vasopressores/inotrópicos se a fluidoterapia inicial (bolus pequeno) não resolver.
                </p>
              </div>
            </div>
          </section>

          <div className="text-xs text-slate-400 text-center pt-8">
            Referências: AAHA 2024 Fluid Therapy Guidelines for Dogs and Cats
          </div>

        </div>
      </div>
    </ScrollArea>
  );
}
