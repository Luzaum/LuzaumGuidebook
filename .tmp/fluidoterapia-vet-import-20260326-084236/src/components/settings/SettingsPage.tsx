import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Settings, Moon, Sun, Monitor, Info, Database } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

export function SettingsPage() {
  return (
    <ScrollArea className="h-full w-full bg-slate-50 dark:bg-slate-950 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        <header>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <Settings className="w-8 h-8 text-teal-500" />
            Configurações
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Ajustes do módulo Fluidoterapia Vet.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Aparência */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Monitor className="w-5 h-5 text-indigo-500" />
                Aparência
              </CardTitle>
              <CardDescription>Ajustes visuais do aplicativo</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Moon className="w-4 h-4 text-slate-500" />
                    Modo Escuro
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Alternar entre tema claro e escuro.
                  </p>
                </div>
                <Switch 
                  checked={document.documentElement.classList.contains('dark')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }}
                />
              </div>

            </CardContent>
          </Card>

          {/* Sobre */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-teal-500" />
                Sobre o Módulo
              </CardTitle>
              <CardDescription>Informações e referências</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">Fontes Clínicas</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Os cálculos e protocolos são baseados no 2024 AAHA Fluid Therapy Guidelines for Dogs and Cats, e em literatura veterinária padrão (Silverstein, DiBartola).
                    </p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-100 uppercase tracking-wider mb-2">Aviso Legal</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    Este aplicativo é uma ferramenta de suporte à decisão clínica. O julgamento do médico veterinário responsável pelo caso é soberano. As doses devem ser ajustadas individualmente.
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </ScrollArea>
  );
}
