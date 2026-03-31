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
          <p className="mt-2 text-slate-500 dark:text-slate-400">Base conceitual do módulo: fisiologia, diferenças entre compartimentos, manutenção, tipos de fluido, monitorização e honestidade clínica.</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader><CardTitle className="text-lg">Água corporal total</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Água corporal total gira em torno de 60% do peso.</p>
              <p>Aproximadamente 67% fica no intracelular e 33% no extracelular.</p>
              <p>No extracelular, cerca de 25% é intersticial e 8% vascular.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader><CardTitle className="text-lg">Por que isso importa</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Cristaloide isotônico IV corrige primeiro o intravascular e depois redistribui para o interstício.</p>
              <p>Por isso desidratação não se resolve com um bolus e pronto.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader><CardTitle className="text-lg">Mensagem-chave</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Hipovolemia e desidratação não são sinônimos.</p>
              <p>Manutenção não substitui ressuscitação.</p>
              <p>Fluido é droga, então tipo, via, taxa, metas e reavaliação importam.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-rose-200 dark:border-rose-900/50">
            <CardHeader className="bg-rose-50/50 dark:bg-rose-900/20">
              <CardTitle className="text-lg text-rose-700 dark:text-rose-300">Hipovolemia</CardTitle>
              <CardDescription>Problema do compartimento intravascular.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-6 text-sm text-slate-600 dark:text-slate-300">
              <p>Corrige perfusão com rapidez, em alíquotas e com reavaliação.</p>
              <p>Bolus fracionado, não manutenção, é a linguagem correta.</p>
            </CardContent>
          </Card>
          <Card className="border-indigo-200 dark:border-indigo-900/50">
            <CardHeader className="bg-indigo-50/50 dark:bg-indigo-900/20">
              <CardTitle className="text-lg text-indigo-700 dark:text-indigo-300">Desidratação</CardTitle>
              <CardDescription>Déficit do interstício e intracelular.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-6 text-sm text-slate-600 dark:text-slate-300">
              <p>Reposição sustentada, geralmente em 12 a 24 h em estáveis.</p>
              <p>Em crônicos, debilitados e cardiopatas, 24 a 48 h pode ser mais seguro.</p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Waves className="h-6 w-6 text-blue-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Avaliação Visual de Hidratação</h3>
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
              <CardTitle className="text-lg">Tabela clinica de desidratacao</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                      <th className="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">Faixa</th>
                      <th className="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">Leitura clinica</th>
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
              <CardTitle className="flex items-center gap-2 text-lg"><Eye className="h-5 w-5 text-amber-500" /> Monitorização e sobrecarga</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Sinais clássicos: taquipneia, aumento do esforço respiratório, crepitações, corrimento nasal seroso, quemoses, edema periférico e ganho rápido de peso.</p>
              <p>Queda de PCV, TP ou USG em contexto compatível pode ajudar a enxergar excesso de fluido.</p>
              <p>Quando sobrecarga ocorrer, reduzir ou suspender fluidos e reavaliar a estratégia.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Thermometer className="h-5 w-5 text-rose-500" /> Panting, febre e perdas insensíveis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Cães em repouso geralmente ficam abaixo de 1 mL/kg/h de perda evaporativa.</p>
              <p>Com panting intenso ou atividade, isso pode subir bastante.</p>
              <p>Gatos tendem a perder menos por evaporação em ambiente termoneutro.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5 text-indigo-500" /> Sódio, cloro e honestidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Em adultos e idosos, o módulo não inventa tabela geriátrica fechada sem fonte robusta.</p>
              <p>Como referência de raciocínio: sódio médio canino gira em torno de 145 mEq/L e felino em torno de 155 mEq/L.</p>
              <p>Cloro corrigido aproximado: cão 107 a 113 mEq/L e gato 117 a 123 mEq/L, sempre lembrando a variação entre laboratórios.</p>
              <p>Em adultos e idosos, preferir faixa do laboratório, tendência seriada e contexto clínico.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Segurança eletrolítica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Correção de hipernatremia crônica: máximo 0,5 mEq/L/h ou 10 a 12 mEq/L/dia, com rechecagem a cada 4 a 6 h.</p>
              <p>Helper de free water deficit: [(Na do paciente / Na desejado) - 1] x (0,6 x peso).</p>
              <p>KCl em fluidos IV não pode exceder 0,5 mEq/kg/h, nunca deve ser bolusado e a bolsa precisa ser homogeneizada antes de administrar.</p>
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
                  <CardDescription>Tabela etária do Nelson & Couto.</CardDescription>
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
