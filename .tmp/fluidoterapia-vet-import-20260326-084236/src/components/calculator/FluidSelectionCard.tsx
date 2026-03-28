import { FluidSelection } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Droplet, Syringe, Settings2 } from 'lucide-react';

interface Props {
  config: FluidSelection;
  onChange: (updates: Partial<FluidSelection>) => void;
}

export function FluidSelectionCard({ config, onChange }: Props) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-slate-500" />
              Seleção de Fluido e Via
            </CardTitle>
            <CardDescription>Escolha o tipo de fluido e método de administração</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tipo de Fluido */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-teal-500" />
              Tipo de Fluido
            </Label>
            <Select value={config.type} onValueChange={(v) => onChange({ type: v })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione o fluido" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ringer com lactato">Ringer com lactato (RL)</SelectItem>
                <SelectItem value="NaCl 0.9%">NaCl 0.9% (Fisiológico)</SelectItem>
                <SelectItem value="Ringer simples">Ringer simples</SelectItem>
                <SelectItem value="Glicofisiológico">Glicofisiológico</SelectItem>
                <SelectItem value="NaCl 7.5%">NaCl 7.5% (Hipertônica)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Via de Administração */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Syringe className="w-4 h-4 text-indigo-500" />
              Via de Administração
            </Label>
            <Select value={config.route} onValueChange={(v: any) => onChange({ route: v })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione a via" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IV">Intravenosa (IV)</SelectItem>
                <SelectItem value="SC">Subcutânea (SC)</SelectItem>
                <SelectItem value="IO">Intraóssea (IO)</SelectItem>
                <SelectItem value="VO">Via Oral (VO)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Método de Entrega */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Método de Entrega</Label>
            <Select value={config.deliveryMode} onValueChange={(v: any) => onChange({ deliveryMode: v })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Bomba de Infusão (mL/h)</SelectItem>
                <SelectItem value="macro">Equipo Macrogotas (20 gts/mL)</SelectItem>
                <SelectItem value="micro">Equipo Microgotas (60 gts/mL)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Apresentação */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Apresentação da Bolsa</Label>
            <Select value={config.presentationSize.toString()} onValueChange={(v) => onChange({ presentationSize: parseInt(v) })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Tamanho da bolsa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100 mL</SelectItem>
                <SelectItem value="250">250 mL</SelectItem>
                <SelectItem value="500">500 mL</SelectItem>
                <SelectItem value="1000">1000 mL</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
