import { BookOpen, Droplet, Eye, Info, Thermometer, Waves } from 'lucide-react';
import { dehydrationScale, puppyElectrolyteTables } from '../../data/clinicalContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

export function GuidePage() {
  return (
    <ScrollArea className="h-full w-full bg-slate-50 p-6 dark:bg-slate-950 lg:p-10">
      <div className="mx-auto w-full space-y-10 pb-20">
        <header>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            <BookOpen className="h-8 w-8 text-teal-500" />
            Guia clínico
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Fisiologia, compartimentos corporais, taxas de manutenção, soluções e monitorização clínica.</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader><CardTitle className="text-lg">Água corporal total</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>A água corporal total representa aproximadamente 60% do peso corporal do paciente.</p>
              <p>Cerca de 67% (dois terços) reside no compartimento intracelular e 33% no extracelular.</p>
              <p>Do extracelular, aproximadamente 25% é líquido intersticial e 8% volume intravascular plasmático.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader><CardTitle className="text-lg">Dinâmica dos fluidos</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Cristaloides isotônicos IV expandem inicialmente o intravascular e redistribuem-se para o interstício em 30 a 60 minutos.</p>
              <p>Por isso a desidratação tecidual requer reposição sustentada e calculada, e não apenas um bolus rápido.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader><CardTitle className="text-lg">Mensagem-chave</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Hipovolemia e desidratação são entidades clínicas distintas que exigem abordagens diferentes.</p>
              <p>A taxa de manutenção nunca substitui a fase de ressuscitação volêmica em choque.</p>
              <p>Fluido é medicamento: tipo de solução, via, taxa e metas de reavaliação contínua são cruciais.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-rose-200 dark:border-rose-900/50">
            <CardHeader className="bg-rose-50/50 dark:bg-rose-900/20">
              <CardTitle className="text-lg text-rose-700 dark:text-rose-300">Hipovolemia</CardTitle>
              <CardDescription>Déficit do compartimento intravascular.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-6 text-sm text-slate-600 dark:text-slate-300">
              <p>Corrige a perfusão tecidual com rapidez, em alíquotas (bolus fracionados) e com reavaliação frequente dos parâmetros vitais.</p>
              <p>Bolus fracionado titulado ao efeito hemodinâmico.</p>
            </CardContent>
          </Card>
          <Card className="border-indigo-200 dark:border-indigo-900/50">
            <CardHeader className="bg-indigo-50/50 dark:bg-indigo-900/20">
              <CardTitle className="text-lg text-indigo-700 dark:text-indigo-300">Desidratação</CardTitle>
              <CardDescription>Déficit dos compartimentos intersticial e intracelular.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-6 text-sm text-slate-600 dark:text-slate-300">
              <p>Reposição gradual e sustentada, geralmente distribuída em 12 a 24 horas em pacientes estáveis.</p>
              <p>Em pacientes cardiopatas, nefropatas ou geriátricos, 24 a 48 horas é a conduta mais segura.</p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Waves className="h-6 w-6 text-blue-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Avaliação visual de desidratação</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/30 dark:bg-emerald-950/20 shadow-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                  <Droplet className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">~ 5%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">Leve</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Mucosas discretamente secas. Turgor cutâneo ainda normal ou levemente reduzido.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50/30 dark:border-amber-900/30 dark:bg-amber-950/20 shadow-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                  <Thermometer className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-700 dark:text-amber-300">~ 8%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">Moderada</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Mucosas secas, turgor cutâneo reduzido, olhos levemente fundos (enoftalmia discreta).</p>
              </CardContent>
            </Card>

            <Card className="border-rose-200 bg-rose-50/30 dark:border-rose-900/30 dark:bg-rose-950/20 shadow-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400">
                  <Waves className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-2xl font-black text-rose-700 dark:text-rose-300">≥ 10%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-500">Grave</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Turgor cutâneo persistente, olhos fundos, mucosas muito secas e sinais de choque iminente.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Tabela clínica de desidratação</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                      <th className="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">Faixa</th>
                      <th className="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">Leitura clínica</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {dehydrationScale.map((item) => (
                      <tr key={item.range} className="bg-white dark:bg-slate-950">
                        <td className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.range}</td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{item.signs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Eye className="h-5 w-5 text-amber-500" /> Monitorização e sobrecarga volêmica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Sinais clássicos: taquipneia, aumento do esforço respiratório, crepitações pulmonares, corrimento nasal seroso, quemose, edema periférico e ganho súbito de peso.</p>
              <p>Queda de hematócrito (VG/HT), proteínas totais (PT) ou densidade urinária em contexto compatível alerta para hemodiluição e sobrecarga.</p>
              <p>Diante de sinais de sobrecarga, reduza ou suspenda a infusão e reavalie a conduta.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Thermometer className="h-5 w-5 text-rose-500" /> Taquipneia térmica, febre e perdas insensíveis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Cães em repouso geralmente apresentam perdas evaporativas abaixo de 1 mL/kg/h.</p>
              <p>Com respiração ofegante intensa, febre ou atividade, as perdas insensíveis aumentam substancialmente.</p>
              <p>Gatos apresentam menor perda evaporativa em ambiente termoneutro.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5 text-indigo-500" /> Referências de sódio e cloro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Em animais adultos e idosos, individualize conforme perfusão, comorbidades e resposta terapêutica.</p>
              <p>Valores médios de referência: sódio sérico canino em torno de 145 mEq/L e felino em torno de 155 mEq/L.</p>
              <p>Cloro corrigido aproximado: cão 107 a 113 mEq/L e gato 117 a 123 mEq/L, respeitando as variações laboratoriais locais.</p>
              <p>Priorize a faixa de referência do laboratório executor, o perfil sequencial e a evolução clínica.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Segurança eletrolítica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Correção de hipernatremia crônica: taxa máxima de 0,5 mEq/L/h (10 a 12 mEq/L em 24h), com reavaliação a cada 4 a 6 horas para prevenir edema cerebral.</p>
              <p>Cálculo de déficit de água livre: [(Na do paciente / Na desejado) - 1] × (0,6 × peso em kg).</p>
              <p>A taxa de infusão de cloreto de potássio (KCl) IV não deve exceder 0,5 mEq/kg/h, nunca deve ser administrada em bolus e a bolsa/frasco deve ser homogeneizada rigorosamente antes do uso.</p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Faixas etárias de eletrólitos em filhotes</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            {(['canine', 'feline'] as const).map((species) => (
              <Card key={species} className="overflow-hidden border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg">{species === 'canine' ? 'Filhotes caninos' : 'Filhotes felinos'}</CardTitle>
                  <CardDescription>Tabela etária pediátrica (Nelson & Couto).</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr>
                          <th className="px-4 py-3 font-bold">Idade</th>
                          <th className="px-4 py-3 font-bold">Cl</th>
                          <th className="px-4 py-3 font-bold">K</th>
                          <th className="px-4 py-3 font-bold">Na</th>
                          <th className="px-4 py-3 font-bold">Mg</th>
                          <th className="px-4 py-3 font-bold">P</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {puppyElectrolyteTables[species].map((row) => (
                          <tr key={`${species}-${row.age}`} className="bg-white dark:bg-slate-950">
                            <td className="px-4 py-3 font-semibold">{row.age}</td>
                            <td className="px-4 py-3">{row.chloride}</td>
                            <td className="px-4 py-3">{row.potassium}</td>
                            <td className="px-4 py-3">{row.sodium}</td>
                            <td className="px-4 py-3">{row.magnesium}</td>
                            <td className="px-4 py-3">{row.phosphorus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </ScrollArea>
  );
}
