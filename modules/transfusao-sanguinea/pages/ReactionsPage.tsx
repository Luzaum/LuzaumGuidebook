import React, { useState } from 'react';
import { reactionsData, type TransfusionReaction } from '../data/reactions';
import { ShieldAlert, AlertTriangle, Info, ChevronDown, CheckCircle2 } from 'lucide-react';

export const ReactionsPage: React.FC = React.memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getSeverityStyles = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: <ShieldAlert className="h-5 w-5 text-red-500" />,
          badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
          labelText: 'Severidade Alta',
          accentBorder: 'border-l-4 border-l-red-500 border-border/80'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
          labelText: 'Severidade Média',
          accentBorder: 'border-l-4 border-l-amber-500 border-border/80'
        };
      default:
        return {
          icon: <Info className="h-5 w-5 text-blue-500" />,
          badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
          labelText: 'Severidade Leve',
          accentBorder: 'border-l-4 border-l-blue-500 border-border/80'
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Alerta Principal */}
      <div className="bg-red-500/10 border-l-4 border-l-red-500 text-red-800 dark:text-red-400 p-5 rounded-r-2xl shadow-md flex items-start gap-3">
        <span className="p-1 rounded bg-red-500/20 text-red-600 dark:text-red-400 mt-0.5">⚠️</span>
        <div className="space-y-1 text-sm">
          <p className="font-bold text-base">Procedimento de Emergência Padrão (TRACS):</p>
          <p className="leading-relaxed">
            Ao menor sinal ou suspeita de reação transfusional, a primeira conduta clínica é <strong>IMEDIATAMENTE PARAR A INFUSÃO SANGUÍNEA</strong> e manter a via intravenosa patente infundindo solução salina isotônica (NaCl 0.9%).
          </p>
        </div>
      </div>

      {/* Seção das Reações */}
      <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-500">🚨</span>
            Gerenciador de Reações Transfusionais Agudas
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Reações mais comuns classificadas por relevância clínica e severidade de manifestação.
          </p>
        </div>

        <div className="space-y-3.5">
          {reactionsData.map((reaction: TransfusionReaction, index: number) => {
            const isOpen = openIndex === index;
            const styles = getSeverityStyles(reaction.severity);

            return (
              <div 
                key={reaction.name} 
                className={`bg-background border rounded-xl overflow-hidden shadow-sm transition-all duration-200 ${styles.accentBorder} ${
                  isOpen ? 'ring-1 ring-red-500/15 shadow' : 'hover:shadow-md'
                }`}
              >
                
                {/* Header Accordion */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    {styles.icon}
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-foreground leading-snug">
                        {reaction.name}
                      </h4>
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded mt-1 uppercase tracking-wide ${styles.badge}`}>
                        {styles.labelText}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-foreground' : ''}`} />
                </button>

                {/* Conteúdo Accordion */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-border/50' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 space-y-4 text-xs md:text-sm">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="space-y-1 bg-muted/20 p-3 rounded-lg border border-border/30">
                        <strong className="text-foreground font-semibold flex items-center gap-1">
                          🔍 Sinais Clínicos:
                        </strong>
                        <p className="text-muted-foreground leading-relaxed">{reaction.signs}</p>
                      </div>

                      <div className="space-y-1 bg-muted/20 p-3 rounded-lg border border-border/30">
                        <strong className="text-foreground font-semibold flex items-center gap-1">
                          🛠️ Tratamento Imediato:
                        </strong>
                        <p className="text-muted-foreground leading-relaxed">{reaction.treatment}</p>
                      </div>

                    </div>

                    <div className="bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10 text-emerald-800 dark:text-emerald-400 flex items-start gap-2 text-xs">
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-500 mt-0.5" />
                      <div>
                        <strong>Medidas de Prevenção:</strong>
                        <p className="mt-0.5 text-muted-foreground dark:text-emerald-400/80 leading-relaxed">
                          {reaction.prevention}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
});

ReactionsPage.displayName = 'ReactionsPage';
export default ReactionsPage;
