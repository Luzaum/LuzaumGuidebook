import { Droplet, Settings2, Syringe } from 'lucide-react';
import { FluidSelection } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {
  config: FluidSelection;
  onChange: (updates: Partial<FluidSelection>) => void;
}

export function FluidSelectionCard({ config, onChange }: Props) {
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4 dark:border-slate-800 dark:bg-slate-900/50">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings2 className="h-5 w-5 text-slate-500" />
          Prescricao do fluido
        </CardTitle>
        <CardDescription>Fluido e droga: tipo, via e modo de entrega devem ficar explicitos.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 p-6 md:grid-cols-2">
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Droplet className="h-4 w-4 text-teal-500" />
            Tipo de fluido
          </Label>
          <Select value={config.type} onValueChange={(value) => onChange({ type: value })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Ringer com lactato">Ringer com lactato</SelectItem>
              <SelectItem value="Plasma-Lyte / Normosol-R">Plasma-Lyte / Normosol-R</SelectItem>
              <SelectItem value="NaCl 0.9%">NaCl 0.9%</SelectItem>
              <SelectItem value="NaCl 0.45%">NaCl 0.45%</SelectItem>
              <SelectItem value="2.5% dextrose em 0.45% NaCl">2.5% dextrose em 0.45% NaCl</SelectItem>
              <SelectItem value="Normosol-M em 5% dextrose">Normosol-M em 5% dextrose</SelectItem>
              <SelectItem value="Plasma-Lyte 56 em 5% dextrose">Plasma-Lyte 56 em 5% dextrose</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Syringe className="h-4 w-4 text-indigo-500" />
            Via
          </Label>
          <Select value={config.route} onValueChange={(value) => onChange({ route: value as FluidSelection['route'] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="IV">IV</SelectItem>
              <SelectItem value="IO">IO</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="VO">VO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Modo de entrega</Label>
          <Select value={config.deliveryMode} onValueChange={(value) => onChange({ deliveryMode: value as FluidSelection['deliveryMode'] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Bomba de infusao</SelectItem>
              <SelectItem value="macro">Equipo macrogotas</SelectItem>
              <SelectItem value="micro">Equipo microgotas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Apresentacao</Label>
          <Select value={String(config.presentationSize)} onValueChange={(value) => onChange({ presentationSize: Number(value) })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="100">100 mL</SelectItem>
              <SelectItem value="250">250 mL</SelectItem>
              <SelectItem value="500">500 mL</SelectItem>
              <SelectItem value="1000">1000 mL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
