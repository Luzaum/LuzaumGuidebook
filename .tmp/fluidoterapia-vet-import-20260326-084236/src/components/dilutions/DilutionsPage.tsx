import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Syringe, Calculator, Droplets, ArrowRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function DilutionsPage() {
  const [c1, setC1] = useState<number>(20);
  const [c2, setC2] = useState<number>(7.5);
  const [v2, setV2] = useState<number>(100);
  const [cDiluent, setCDiluent] = useState<number>(0);

  const calculateDilution = () => {
    if (c1 <= 0 || c2 <= 0 || v2 <= 0) return { v1: 0, diluent: 0 };
    if (c1 <= c2) return { v1: 0, diluent: 0 };
    if (c2 <= cDiluent) return { v1: 0, diluent: 0 };
    
    // Formula: V1 = V2 * (C2 - C_diluent) / (C1 - C_diluent)
    const v1 = (v2 * (c2 - cDiluent)) / (c1 - cDiluent);
    const diluent = v2 - v1;
    return { v1, diluent };
  };

  const { v1, diluent } = calculateDilution();

  return (
    <ScrollArea className="h-full w-full bg-slate-50 dark:bg-slate-950 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        <header>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <Syringe className="w-8 h-8 text-teal-500" />
            Diluições e Soluções
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Calculadora avançada de misturas de soluções e preparo de soluções hipertônicas.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Calculadora Livre */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-500" />
                Calculadora de Misturas
              </CardTitle>
              <CardDescription>Calcule o volume de concentrado e diluente</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Concentração Inicial (C1) %</Label>
                  <Input 
                    type="number" 
                    value={Number.isFinite(c1) ? c1 : ''} 
                    onChange={e => setC1(parseFloat(e.target.value) || 0)}
                    className="h-12 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Concentração do Diluente %</Label>
                  <Input 
                    type="number" 
                    value={Number.isFinite(cDiluent) ? cDiluent : ''} 
                    onChange={e => setCDiluent(parseFloat(e.target.value) || 0)}
                    className="h-12 text-lg"
                    placeholder="0 para Água Destilada"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Concentração Desejada (C2) %</Label>
                  <Input 
                    type="number" 
                    value={Number.isFinite(c2) ? c2 : ''} 
                    onChange={e => setC2(parseFloat(e.target.value) || 0)}
                    className="h-12 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Volume Final (V2) mL</Label>
                  <Input 
                    type="number" 
                    value={Number.isFinite(v2) ? v2 : ''} 
                    onChange={e => setV2(parseFloat(e.target.value) || 0)}
                    className="h-12 text-lg"
                  />
                </div>
              </div>

              {c1 > c2 && c2 > cDiluent ? (
                <div className="p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 space-y-4">
                  <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-100 uppercase tracking-wider">Preparo</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-indigo-500" />
                      <span className="text-slate-700 dark:text-slate-300">Solução Concentrada ({c1}%)</span>
                    </div>
                    <span className="font-bold text-lg text-indigo-700 dark:text-indigo-400">{Number.isFinite(v1) ? v1.toFixed(1) : '0'} mL</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span className="text-slate-700 dark:text-slate-300">Diluente ({cDiluent === 0 ? 'Água Destilada' : `${cDiluent}%`})</span>
                    </div>
                    <span className="font-bold text-lg text-slate-700 dark:text-slate-300">{Number.isFinite(diluent) ? diluent.toFixed(1) : '0'} mL</span>
                  </div>

                  <div className="pt-4 border-t border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-between">
                    <span className="font-bold text-indigo-900 dark:text-indigo-100">Volume Total Final</span>
                    <span className="font-black text-xl text-indigo-700 dark:text-indigo-400">{Number.isFinite(v2) ? v2 : '0'} mL</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-400 text-sm font-medium">
                  A concentração desejada (C2) deve estar entre a concentração do diluente e a concentração inicial (C1).
                </div>
              )}

            </CardContent>
          </Card>

          {/* Exemplos Prontos */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
              Preparo de Salina Hipertônica
            </h3>
            
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-teal-500" />
                  NaCl 20% → NaCl 7.5% (com Água Destilada)
                </CardTitle>
                <CardDescription>Para 100 mL de solução final</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">NaCl 20%</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">37.5 mL</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Água Destilada</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">62.5 mL</span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-bold text-teal-600 dark:text-teal-400">
                  <span>Total</span>
                  <span>100 mL</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-teal-500" />
                  NaCl 20% → NaCl 7.5% (com NaCl 0.9%)
                </CardTitle>
                <CardDescription>Para 100 mL de solução final</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">NaCl 20%</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">34.5 mL</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">NaCl 0.9% (Fisiológica)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">65.5 mL</span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-bold text-teal-600 dark:text-teal-400">
                  <span>Total</span>
                  <span>100 mL</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-teal-500" />
                  NaCl 20% → NaCl 7.2% (com Água Destilada)
                </CardTitle>
                <CardDescription>Para 100 mL de solução final</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">NaCl 20%</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">36.0 mL</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Água Destilada</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">64.0 mL</span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-bold text-teal-600 dark:text-teal-400">
                  <span>Total</span>
                  <span>100 mL</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </ScrollArea>
  );
}
