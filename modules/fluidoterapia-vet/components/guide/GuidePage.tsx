import { BookOpen, Droplet, Eye, Info, Thermometer, Waves } from 'lucide-react';
import { dehydrationScale, puppyElectrolyteTables } from '../../data/clinicalContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

export function GuidePage() {
  return (
    <ScrollArea className="h-full w-full bg-slate-50 p-6 dark:bg-slate-950 lg:p-10">
      <div className="mx-auto max-w-5xl space-y-10 pb-20">
        <header>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            <BookOpen className="h-8 w-8 text-teal-500" />
            Guia clinico
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Base conceitual do modulo: fisiologia, diferencas entre compartimentos, manutencao, tipos de fluido, monitorizacao e honestidade clinica.</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader><CardTitle className="text-lg">Agua corporal total</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Agua corporal total gira em torno de 60% do peso.</p>
              <p>Aproximadamente 67% fica no intracelular e 33% no extracelular.</p>
              <p>No extracelular, cerca de 25% e intersticial e 8% vascular.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader><CardTitle className="text-lg">Por que isso importa</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Cristaloide isotônico IV corrige primeiro o intravascular e depois redistribui para o intersticio.</p>
              <p>Por isso desidratacao nao se resolve com um bolus e pronto.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader><CardTitle className="text-lg">Mensagem-chave</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Hipovolemia e desidratacao nao sao sinonimos.</p>
              <p>Manutencao nao substitui ressuscitacao.</p>
              <p>Fluido e droga, entao tipo, via, taxa, metas e reavaliacao importam.</p>
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
              <p>Corrige perfusao com rapidez, em aliquotas e com reavaliacao.</p>
              <p>Bolus fracionado, nao manutencao, e a linguagem correta.</p>
            </CardContent>
          </Card>
          <Card className="border-indigo-200 dark:border-indigo-900/50">
            <CardHeader className="bg-indigo-50/50 dark:bg-indigo-900/20">
              <CardTitle className="text-lg text-indigo-700 dark:text-indigo-300">Desidratacao</CardTitle>
              <CardDescription>Deficit do intersticio e intracelular.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-6 text-sm text-slate-600 dark:text-slate-300">
              <p>Reposicao sustentada, geralmente em 12 a 24 h em estaveis.</p>
              <p>Em cronicos, debilitados e cardiopatas, 24 a 48 h pode ser mais seguro.</p>
            </CardContent>
          </Card>
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
              <CardTitle className="flex items-center gap-2 text-lg"><Droplet className="h-5 w-5 text-teal-500" /> Manutencao como necessidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Manutencao e classe de necessidade, nao sinonimo de "soro de manutencao".</p>
              <p>Fluidos de manutencao costumam ter menos sodio e mais potassio que fluidos de reposicao.</p>
              <p>Usar reposicao como manutencao por muito tempo pode predispor a disturbios de sodio e hipocalemia.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Waves className="h-5 w-5 text-blue-500" /> Reposicao vs manutencao</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>RL, Plasma-Lyte e Normosol-R entram como fluidos de reposicao balanceados.</p>
              <p>0,45% NaCl, 2,5% dextrose em 0,45% NaCl, Normosol-M em 5% dextrose e Plasma-Lyte 56 em 5% dextrose entram como fluidos mais "de manutencao" ou especificos.</p>
              <p>Hipotonicos e manutencao nao servem para ressuscitacao hipovolemica.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Eye className="h-5 w-5 text-amber-500" /> Monitorizacao e sobrecarga</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Sinais classicos: taquipneia, aumento do esforco respiratorio, crepitacoes, corrimento nasal seroso, quemoses, edema periferico e ganho rapido de peso.</p>
              <p>Queda de PCV, TP ou USG em contexto compativel pode ajudar a enxergar excesso de fluido.</p>
              <p>Quando sobrecarga ocorrer, reduzir ou suspender fluidos e reavaliar a estrategia.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Thermometer className="h-5 w-5 text-rose-500" /> Panting, febre e perdas insensiveis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Caes em repouso geralmente ficam abaixo de 1 mL/kg/h de perda evaporativa.</p>
              <p>Com panting intenso ou atividade, isso pode subir bastante.</p>
              <p>Gatos tendem a perder menos por evaporacao em ambiente termoneutro.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5 text-indigo-500" /> Sodio, cloro e honestidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Em adultos e idosos, o modulo nao inventa tabela geriatrica fechada sem fonte robusta.</p>
              <p>Como referencia de raciocinio: sodio medio canino gira em torno de 145 mEq/L e felino em torno de 155 mEq/L.</p>
              <p>Cloro corrigido aproximado: cao 107 a 113 mEq/L e gato 117 a 123 mEq/L, sempre lembrando a variacao entre laboratorios.</p>
              <p>Em adultos e idosos, preferir faixa do laboratorio, tendencia seriada e contexto clinico.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Seguranca eletrolitica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>Correcao de hipernatremia cronica: maximo 0,5 mEq/L/h ou 10 a 12 mEq/L/dia, com rechecagem a cada 4 a 6 h.</p>
              <p>Helper de free water deficit: [(Na do paciente / Na desejado) - 1] x (0,6 x peso).</p>
              <p>KCl em fluidos IV nao pode exceder 0,5 mEq/kg/h, nunca deve ser bolusado e a bolsa precisa ser homogeneizada antes de administrar.</p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Faixas etarias de eletrólitos em filhotes</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            {(['canine', 'feline'] as const).map((species) => (
              <Card key={species} className="overflow-hidden border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg">{species === 'canine' ? 'Filhotes caninos' : 'Filhotes felinos'}</CardTitle>
                  <CardDescription>Tabela etaria do Nelson & Couto.</CardDescription>
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
