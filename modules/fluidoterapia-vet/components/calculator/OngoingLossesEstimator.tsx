import { ArrowDownToLine, Plus, Trash2 } from 'lucide-react';
import { lossSizePresets } from '../../data/clinicalContent';
import { OngoingLossEvent, OngoingLossEventType, OngoingLossesConfig, PatientProfile } from '../../types';
import { calculateLossEventTotal } from '../../lib/engines/calculations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';

interface Props {
  patient: PatientProfile;
  config: OngoingLossesConfig;
  onChange: (updates: Partial<OngoingLossesConfig>) => void;
}

function createEvent(): OngoingLossEvent {
  return {
    id: Math.random().toString(36).slice(2),
    type: 'vomit',
    animalSize: 'small',
    episodes: 1,
    episodeVolumeMl: 0,
    manualMl24h: 0,
    observation: '',
  };
}

const TYPE_LABELS: Record<OngoingLossEventType, string> = {
  vomit: 'Vômito',
  diarrhea: 'Diarreia',
  polyuria: 'Poliúria',
  drain: 'Dreno',
  third_space: '3º espaço',
  other: 'Outro',
};

export function OngoingLossesEstimator({ patient, config, onChange }: Props) {
  const addEvent = () => onChange({ events: [...config.events, createEvent()] });
  const removeEvent = (id: string) => onChange({ events: config.events.filter((event) => event.id !== id) });
  const updateEvent = (id: string, updates: Partial<OngoingLossEvent>) => onChange({ events: config.events.map((event) => (event.id === id ? { ...event, ...updates } : event)) });

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
              <ArrowDownToLine className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Perdas contínuas</CardTitle>
              <CardDescription>Somar perdas medidas ou estimadas e converter para mL/24 h.</CardDescription>
            </div>
          </div>
          <Switch checked={config.enabled} onCheckedChange={(checked) => onChange({ enabled: checked })} />
        </div>
      </CardHeader>

      {config.enabled ? (
        <CardContent className="space-y-6 p-6">
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => onChange({ type: 'direct' })}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${config.type === 'direct' ? 'bg-white text-amber-600 shadow-sm dark:bg-slate-800 dark:text-amber-400' : 'text-slate-500'}`}
            >
              Volume medido
            </button>
            <button
              type="button"
              onClick={() => onChange({ type: 'events' })}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${config.type === 'events' ? 'bg-white text-amber-600 shadow-sm dark:bg-slate-800 dark:text-amber-400' : 'text-slate-500'}`}
            >
              Por evento
            </button>
          </div>

          {config.type === 'direct' ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <Label className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Volume total medido (mL/24 h)</Label>
              <Input
                type="number"
                min="0"
                value={config.directMl24h || ''}
                onChange={(event) => onChange({ directMl24h: parseFloat(event.target.value) || 0 })}
                className="mt-3 text-lg"
                placeholder="Ex: 250"
              />
              <p className="mt-3 text-sm text-slate-500">
                Drenos, sonda urinária, sonda nasogástrica, dreno torácico e dreno abdominal devem aceitar volume medido em mL sempre que houver dado real.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {config.events.map((event) => {
                const totalMl = calculateLossEventTotal(patient, event);
                const isEstimated = (event.type === 'vomit' || event.type === 'diarrhea') && !(event.episodeVolumeMl && event.episodeVolumeMl > 0);

                return (
                  <div key={event.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Linha de perda</p>
                      <button type="button" onClick={() => removeEvent(event.id)} className="text-slate-400 transition-colors hover:text-rose-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Tipo de perda</Label>
                        <Select value={event.type} onValueChange={(value: OngoingLossEventType) => updateEvent(event.id, { type: value })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Object.entries(TYPE_LABELS).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Porte</Label>
                        <Select value={event.animalSize} onValueChange={(value) => updateEvent(event.id, { animalSize: value as OngoingLossEvent['animalSize'] })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Object.entries(lossSizePresets).map(([value, preset]) => (
                              <SelectItem key={value} value={value}>{preset.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Volume do episódio (mL)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={event.episodeVolumeMl || ''}
                          onChange={(eventInput) => updateEvent(event.id, { episodeVolumeMl: parseFloat(eventInput.target.value) || 0 })}
                          placeholder={event.type === 'vomit' || event.type === 'diarrhea' ? 'Opcional; se vazio, usa estimativa' : 'Use mL/24 h abaixo'}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Número de episódios</Label>
                        <Input
                          type="number"
                          min="0"
                          value={event.episodes || ''}
                          onChange={(eventInput) => updateEvent(event.id, { episodes: parseFloat(eventInput.target.value) || 0 })}
                          disabled={!(event.type === 'vomit' || event.type === 'diarrhea')}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Volume medido em mL/24 h</Label>
                        <Input
                          type="number"
                          min="0"
                          value={event.manualMl24h || ''}
                          onChange={(eventInput) => updateEvent(event.id, { manualMl24h: parseFloat(eventInput.target.value) || 0 })}
                          disabled={event.type === 'vomit' || event.type === 'diarrhea'}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Total mL/dia</Label>
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                          {totalMl.toFixed(1)} mL/dia {isEstimated ? `(estimado: ${lossSizePresets[event.animalSize].mlPerKg} mL/kg/episódio)` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Observação</Label>
                      <Input
                        value={event.observation || ''}
                        onChange={(eventInput) => updateEvent(event.id, { observation: eventInput.target.value })}
                        placeholder="Ex: dreno abdominal, urina mensurada, vômito em jato"
                      />
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={addEvent}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 py-3 font-medium text-slate-500 transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 dark:border-slate-700 dark:hover:border-amber-700 dark:hover:bg-amber-950/30"
              >
                <Plus className="h-4 w-4" />
                Adicionar evento de perda
              </button>
            </div>
          )}

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
            Se o usuário não medir, a estimativa por episódio de vômito ou diarreia fica na faixa grosseira de 2 a 4 mL/kg por episódio. Sempre que houver dado real em mL, ele vale mais do que o porte estimado.
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}
