import { OngoingLossesConfig, OngoingLossEventType, OngoingLossEvent } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowDownToLine, Plus, Trash2 } from 'lucide-react';

interface Props {
  config: OngoingLossesConfig;
  onChange: (updates: Partial<OngoingLossesConfig>) => void;
}

export function OngoingLossesEstimator({ config, onChange }: Props) {
  const addEvent = () => {
    const newEvent: OngoingLossEvent = {
      id: Math.random().toString(36).substring(7),
      type: 'vomit',
      volumeSize: 'small',
      episodes: 1,
    };
    onChange({ events: [...config.events, newEvent] });
  };

  const removeEvent = (id: string) => {
    onChange({ events: config.events.filter(e => e.id !== id) });
  };

  const updateEvent = (id: string, updates: Partial<OngoingLossEvent>) => {
    onChange({
      events: config.events.map(e => e.id === id ? { ...e, ...updates } : e)
    });
  };

  return (
    <Card className="border-slate-200 shadow-sm dark:border-slate-800 overflow-hidden">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <ArrowDownToLine className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Perdas Contínuas</CardTitle>
              <CardDescription>Vômitos, diarreia, poliúria, drenos</CardDescription>
            </div>
          </div>
          <Switch checked={config.enabled} onCheckedChange={v => onChange({ enabled: v })} />
        </div>
      </CardHeader>

      {config.enabled && (
        <CardContent className="p-6 space-y-8 animate-in fade-in slide-in-from-top-2">
          
          <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1 mb-6">
            <button
              onClick={() => onChange({ type: 'direct' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                config.type === 'direct'
                  ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Estimativa Direta
            </button>
            <button
              onClick={() => onChange({ type: 'events' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                config.type === 'events'
                  ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Eventos (Vômito/Diarreia)
            </button>
          </div>

          {config.type === 'direct' ? (
            <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Volume Total (mL/24h)</Label>
              <Input 
                type="number" 
                min="0"
                value={config.directMl24h || ''} 
                onChange={e => onChange({ directMl24h: parseFloat(e.target.value) || 0 })}
                className="text-lg h-12"
                placeholder="Ex: 250"
              />
              <p className="text-xs text-slate-500">
                Sempre que possível, mensure as perdas (pesando tapetes higiênicos, medindo drenos) em vez de estimar.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {config.events.map((event, index) => (
                <div key={event.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 relative">
                  <button 
                    onClick={() => removeEvent(event.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-8">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Tipo</Label>
                      <Select 
                        value={event.type} 
                        onValueChange={(v: OngoingLossEventType) => updateEvent(event.id, { type: v })}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vomit">Vômito</SelectItem>
                          <SelectItem value="diarrhea">Diarreia</SelectItem>
                          <SelectItem value="polyuria">Poliúria</SelectItem>
                          <SelectItem value="drain">Dreno</SelectItem>
                          <SelectItem value="third_space">3º Espaço</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(event.type === 'vomit' || event.type === 'diarrhea') ? (
                      <>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Volume</Label>
                          <Select 
                            value={event.volumeSize || 'small'} 
                            onValueChange={(v: 'small' | 'medium' | 'large') => updateEvent(event.id, { volumeSize: v })}
                          >
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Pequeno (~2 mL/kg)</SelectItem>
                              <SelectItem value="medium">Médio (~5 mL/kg)</SelectItem>
                              <SelectItem value="large">Grande (~10 mL/kg)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Episódios</Label>
                          <Input 
                            type="number" 
                            min="1"
                            value={event.episodes || ''} 
                            onChange={e => updateEvent(event.id, { episodes: parseInt(e.target.value) || 0 })}
                            className="h-10"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Volume (mL/24h)</Label>
                        <Input 
                          type="number" 
                          min="0"
                          value={event.manualMl24h || ''} 
                          onChange={e => updateEvent(event.id, { manualMl24h: parseFloat(e.target.value) || 0 })}
                          className="h-10"
                          placeholder="Ex: 150"
                        />
                      </div>
                    )}
                  </div>
                  <Input 
                    placeholder="Observação (opcional)" 
                    value={event.observation || ''}
                    onChange={e => updateEvent(event.id, { observation: e.target.value })}
                    className="h-8 text-sm bg-white dark:bg-slate-950"
                  />
                </div>
              ))}

              <button
                onClick={addEvent}
                className="w-full py-3 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-amber-600 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all font-medium"
              >
                <Plus className="w-4 h-4" />
                Adicionar Evento de Perda
              </button>
            </div>
          )}

        </CardContent>
      )}
    </Card>
  );
}
