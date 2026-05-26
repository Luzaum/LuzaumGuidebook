import React, { useState } from 'react';
import { FlaskConical, AlertTriangle, Check, BookOpen, AlertOctagon, X } from 'lucide-react';

export const CrossmatchPage: React.FC = React.memo(() => {
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="text-white/80 text-xs font-semibold bg-white/10 px-3 py-1 rounded-xl backdrop-blur-sm">
              {zoomImage.title}
            </span>
            <button 
              onClick={() => setZoomImage(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all focus:outline-none"
              aria-label="Fechar zoom"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <img 
            src={zoomImage.src} 
            alt={zoomImage.title} 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
          />
        </div>
      )}

      {/* Container Principal */}
      <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-500"><FlaskConical className="h-5 w-5" /></span>
            Prova de Compatibilidade Cruzada (Cross-match)
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Rede de segurança final antes da transfusão. Protocolo padrão-ouro em tubo de ensaio.
          </p>
        </div>

        {/* Materiais e Passo 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-muted/40 p-4 border border-border/40 rounded-xl space-y-2">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-red-500" /> Materiais Necessários:
              </h4>
              <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1 leading-relaxed">
                <li>Sangue em EDTA (tampa roxa) e Tubo Seco (tampa vermelha) do <strong>DOADOR</strong> e <strong>RECEPTOR</strong>.</li>
                <li>Tubos de ensaio de vidro (12x75 mm), micropipetas ou pipetas Pasteur.</li>
                <li>Centrífuga de laboratório, solução salina isotônica (NaCl 0.9%).</li>
                <li>Lâminas de vidro, lamínulas e microscópio.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-base text-foreground">Passo 1: Preparo das Hemácias Lavadas (Doador e Receptor)</h4>
              <ol className="text-xs text-muted-foreground list-decimal pl-4 space-y-2.5 leading-relaxed">
                <li>Centrifugue o sangue em EDTA para separar o plasma das hemácias. Descarte o plasma.</li>
                <li>Adicione 2 a 3 gotas do concentrado de hemácias depositado no fundo a um tubo de ensaio novo.</li>
                <li><strong>Lave as hemácias:</strong> Adicione salina isotônica até preencher o tubo, tampe e inverta suavemente. Centrifugue a ~1000g (~3000 RPM) por 1 minuto. Aspire e descarte o sobrenadante. <strong>Repita mais duas vezes (total de 3 lavagens)</strong> para remover proteínas plasmáticas.</li>
                <li>Prepare a <strong>suspensão de hemácias a 3-5%:</strong> adicione 0.1 mL de hemácias lavadas a 2.0 mL de salina isotônica (a cor final deve assemelhar-se a um vermelho-cereja translúcido).</li>
              </ol>
            </div>

          </div>

          {/* Imagem de Aglutinação */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="border border-border/60 bg-muted/20 p-4 rounded-2xl flex flex-col items-center">
              <h5 className="text-xs font-bold text-foreground mb-3 text-center flex items-center gap-1">
                🔬 Graus de Aglutinação Macroscópica
              </h5>
              <div 
                onClick={() => setZoomImage({ 
                  src: "https://res.cloudinary.com/dwta1roq1/image/upload/q_auto,f_auto/aglutinacao/transfusão-2", 
                  title: "Graus de Aglutinação Macroscópica" 
                })}
                className="relative group overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center max-h-[190px] w-full cursor-zoom-in"
                title="Clique para ampliar"
              >
                <img 
                  src="https://res.cloudinary.com/dwta1roq1/image/upload/q_auto,f_auto/aglutinacao/transfusão-2" 
                  alt="Graus de aglutinação macroscópica em compatibilidade sanguínea" 
                  className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2 leading-relaxed">
                Reações de aglutinação de intensidade 2+ ou superiores são consideradas indicativos formais de incompatibilidade.
              </p>
            </div>
          </div>
        </div>

        {/* Provas e Controles */}
        <div className="space-y-4 pt-4 border-t border-border/50">
          <h4 className="font-bold text-base text-foreground">Passo 2: Montagem das Provas e Controles</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Monte os tubos de ensaio adicionando os reagentes na seguinte ordem estrita:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="border border-red-500/20 bg-red-500/5 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-xs text-red-500 uppercase tracking-wider">Prova Maior (Crítica)</h5>
                <p className="text-xs mt-1 text-muted-foreground leading-relaxed">
                  Avalia a presença de aloanticorpos pré-existentes no receptor contra eritrócitos do doador.
                </p>
              </div>
              <div className="mt-3 text-xs font-bold text-foreground bg-red-500/10 p-2.5 rounded-lg border border-red-500/10">
                2 gotas de Plasma/Soro do RECEPTOR <br />
                + 1 gota de Hemácias do DOADOR (3-5%)
              </div>
            </div>

            <div className="border border-blue-500/20 bg-blue-500/5 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-xs text-blue-500 uppercase tracking-wider">Prova Menor</h5>
                <p className="text-xs mt-1 text-muted-foreground leading-relaxed">
                  Detecta anticorpos no plasma do doador direcionados contra as hemácias do receptor.
                </p>
              </div>
              <div className="mt-3 text-xs font-bold text-foreground bg-blue-500/10 p-2.5 rounded-lg border border-blue-500/10">
                2 gotas de Plasma/Soro do DOADOR <br />
                + 1 gota de Hemácias do RECEPTOR (3-5%)
              </div>
            </div>

            <div className="border border-border/60 bg-muted/20 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-xs text-muted-foreground uppercase tracking-wider">Controle do Receptor</h5>
                <p className="text-xs mt-1 text-muted-foreground leading-relaxed">
                  Detecta autoaglutinação e reações autoimunes no próprio paciente receptor.
                </p>
              </div>
              <div className="mt-3 text-xs font-bold text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border/30">
                2 gotas de Plasma/Soro do RECEPTOR <br />
                + 1 gota de Hemácias do RECEPTOR (3-5%)
              </div>
            </div>

            <div className="border border-border/60 bg-muted/20 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-xs text-muted-foreground uppercase tracking-wider">Controle do Doador</h5>
                <p className="text-xs mt-1 text-muted-foreground leading-relaxed">
                  Detecta autoaglutinação nas hemácias do doador selecionado.
                </p>
              </div>
              <div className="mt-3 text-xs font-bold text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border/30">
                2 gotas de Plasma/Soro do DOADOR <br />
                + 1 gota de Hemácias do DOADOR (3-5%)
              </div>
            </div>

          </div>
          
          <p className="text-[10px] text-amber-500 font-semibold bg-amber-500/5 p-2 rounded-lg border border-amber-500/10 flex items-center gap-1.5">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0" /> Controles positivos invalidam os testes. Autoaglutinação nas hemácias deve ser investigada.
          </p>
        </div>

        {/* Leitura e Interpretação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
          <div className="space-y-3">
            <h4 className="font-bold text-base text-foreground">Passo 3: Incubação e Leitura</h4>
            <ol className="text-xs text-muted-foreground list-decimal pl-4 space-y-2 leading-relaxed">
              <li>Misture suavemente os tubos e incube-os por 15-30 minutos à temperatura ambiente.</li>
              <li>Centrifugue brevemente (~1000g por 15 segundos) para aglomerar as células no fundo.</li>
              <li>
                <strong>Leitura Macroscópica:</strong> Avalie contra a luz balançando delicadamente o tubo. 
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li><strong>Hemólise:</strong> Plasma avermelhado.</li>
                  <li><strong>Aglutinação:</strong> Formação de pequenos grãos suspensos que não dispersam.</li>
                </ul>
              </li>
              <li><strong>Leitura Microscópica:</strong> Coloque uma gota em lâmina e confirme agregados sob microscópio para afastar falso-negativos por aglutinação muito leve.</li>
            </ol>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-base text-foreground">Passo 4: Interpretação e Decisão</h4>
            
            <div className="space-y-2.5">
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 p-3 rounded-xl flex gap-2.5 items-start">
                <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mt-0.5"><Check className="h-4.5 w-4.5 stroke-[3]" /></span>
                <div className="text-xs">
                  <span className="font-bold">✅ Compatível:</span> Nenhuma hemólise ou aglutinação nas Provas Maior e Menor, e controles negativos. A transfusão pode prosseguir de forma segura.
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 text-red-800 dark:text-red-400 p-3 rounded-xl flex gap-2.5 items-start">
                <span className="p-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 mt-0.5"><AlertOctagon className="h-4.5 w-4.5 stroke-[2.5]" /></span>
                <div className="text-xs">
                  <span className="font-bold">🚨 Incompatível (Maior):</span> Presença de aglutinação ou hemólise na Prova Maior. <strong>NÃO TRANSFUNDIR!</strong> Risco altíssimo de choque transfusional imediato e óbito do paciente.
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 p-3 rounded-xl flex gap-2.5 items-start">
                <span className="p-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 mt-0.5"><AlertTriangle className="h-4.5 w-4.5 stroke-[2.5]" /></span>
                <div className="text-xs">
                  <span className="font-bold">⚠️ Incompatibilidade Menor:</span> Reação positiva somente na Prova Menor. O plasma do doador contém anticorpos contra o receptor. Diluição diminui o risco, infunda com extremo cuidado e lentidão.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
});

CrossmatchPage.displayName = 'CrossmatchPage';
export default CrossmatchPage;
