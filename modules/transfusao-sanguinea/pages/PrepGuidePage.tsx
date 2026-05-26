import React, { useState } from 'react';
import { HelpButton } from '../components/HelpButton';
import { 
  CheckCircle2, 
  Flame, 
  Syringe, 
  Activity,
  Heart,
  Thermometer,
  Eye,
  Wind,
  TrendingUp,
  BrainCircuit,
  X
} from 'lucide-react';

interface PrepGuidePageProps {
  onOpenModal: (term: string) => void;
}

export const PrepGuidePage: React.FC<PrepGuidePageProps> = React.memo(({ onOpenModal }) => {
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

      {/* Guia de Preparo */}
      <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-500">📋</span>
            Guia Prático de Preparo Transfusional
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            A segurança transfusional começa antes da primeira gota. Cada etapa é um ponto de controle crucial.
          </p>
        </div>

        {/* Stepper com passos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            
            {/* Passo 1 */}
            <div className="flex gap-4 items-start relative group">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20 group-hover:scale-105 transition-transform">1</span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-foreground flex items-center">
                  Verificação e Compatibilidade
                  <HelpButton term="visual_inspection" onOpenModal={onOpenModal} />
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Confirme a identidade do paciente, o tipo sanguíneo e o teste de compatibilidade. Inspecione visualmente a bolsa: descarte se houver vazamentos, descoloração (pode indicar contaminação ou hemólise) ou coágulos grosseiros.
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="flex gap-4 items-start relative group">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20 group-hover:scale-105 transition-transform">2</span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-foreground flex items-center">
                  Aquecimento do Hemocomponente
                  <HelpButton term="warming_blood" onOpenModal={onOpenModal} />
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Aqueça gradualmente eritrócitos (CH, ST) até a temperatura corporal (~37°C) usando banho-maria ou aquecedor de fluidos dedicado. <strong>NUNCA</strong> utilize micro-ondas ou água fervente para evitar lise celular.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="flex gap-4 items-start relative group">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20 group-hover:scale-105 transition-transform">3</span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-foreground flex items-center">
                  Acesso Venoso e Equipo
                  <HelpButton term="filter_use" onOpenModal={onOpenModal} />
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Estabeleça um acesso intravenoso dedicado exclusivo, com calibre apropriado. Use obrigatoriamente um <strong>equipo com filtro de transfusão</strong> (170-260 mícrons) para remover microagregados prejudiciais.
                </p>
              </div>
            </div>

            {/* Passo 4 */}
            <div className="flex gap-4 items-start relative group">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20 group-hover:scale-105 transition-transform">4</span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-foreground flex items-center">
                  Compatibilidade de Fluidos
                  <HelpButton term="fluid_compatibility" onOpenModal={onOpenModal} />
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Use apenas <strong>NaCl 0.9% (salina isotônica)</strong> para diluir ou na mesma linha. Fluidos com cálcio (ex: Ringer com Lactato) são <strong>proibidos</strong> por reativarem a cascata de coagulação na bolsa.
                </p>
              </div>
            </div>

          </div>

          {/* Infográficos */}
          <div className="space-y-4">
            <div className="border border-border/60 bg-muted/20 p-4 rounded-2xl flex flex-col items-center">
              <h5 className="text-xs font-bold text-foreground mb-3 text-center flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-red-500" /> Transfusão Canina
              </h5>
              <div 
                onClick={() => setZoomImage({ 
                  src: "https://res.cloudinary.com/dwta1roq1/image/upload/q_auto,f_auto/transfusão/cao", 
                  title: "Princípios da Transfusão em Cães" 
                })}
                className="relative group overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center max-h-[190px] w-full cursor-zoom-in"
                title="Clique para ampliar"
              >
                <img 
                  src="https://res.cloudinary.com/dwta1roq1/image/upload/q_auto,f_auto/transfusão/cao" 
                  alt="Princípios da Transfusão em Cães" 
                  className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>

            <div className="border border-border/60 bg-muted/20 p-4 rounded-2xl flex flex-col items-center">
              <h5 className="text-xs font-bold text-foreground mb-3 text-center flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-red-500" /> Transfusão Felina
              </h5>
              <div 
                onClick={() => setZoomImage({ 
                  src: "https://res.cloudinary.com/dwta1roq1/image/upload/q_auto,f_auto/transfusão/gato", 
                  title: "Princípios da Transfusão em Gatos" 
                })}
                className="relative group overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center max-h-[190px] w-full cursor-zoom-in"
                title="Clique para ampliar"
              >
                <img 
                  src="https://res.cloudinary.com/dwta1roq1/image/upload/q_auto,f_auto/transfusão/gato" 
                  alt="Princípios da Transfusão em Gatos" 
                  className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monitoramento Clínico */}
      <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-500">🩺</span>
            Protocolo de Monitoramento Clínico
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Avalie os parâmetros a cada 15 min no início (primeira hora) e depois a cada 30-60 min até o fim da infusão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Temperatura */}
          <div className="bg-muted/40 p-5 rounded-2xl border border-border/40 space-y-2 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <span className="p-1 rounded bg-amber-500/10 text-amber-500"><Thermometer className="h-4 w-4" /></span>
                Temperatura Retal
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Como:</strong> Use termômetro retal lubrificado. <br />
                <strong>Alvo:</strong> 38.0°C a 39.2°C (cães/gatos).
              </p>
            </div>
            <p className="text-[10px] text-red-500 font-semibold bg-red-500/5 p-2 rounded-lg mt-2 border border-red-500/10">
              🚨 Variações &gt; 1°C indicam possível reação imunológica ou bacteriana.
            </p>
          </div>

          {/* FC */}
          <div className="bg-muted/40 p-5 rounded-2xl border border-border/40 space-y-2 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <span className="p-1 rounded bg-red-500/10 text-red-500"><Heart className="h-4 w-4" /></span>
                Frequência Cardíaca
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Como:</strong> Ausculte tórax e palpe pulso femoral. <br />
                <strong>Alvo:</strong> Cães: 60-140 bpm | Gatos: 140-220 bpm.
              </p>
            </div>
            <p className="text-[10px] text-red-500 font-semibold bg-red-500/5 p-2 rounded-lg mt-2 border border-red-500/10">
              🚨 Taquicardia é sinal precoce de reação hemolítica, anafilaxia ou sobrecarga.
            </p>
          </div>

          {/* FR */}
          <div className="bg-muted/40 p-5 rounded-2xl border border-border/40 space-y-2 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <span className="p-1 rounded bg-blue-500/10 text-blue-500"><Wind className="h-4 w-4" /></span>
                Frequência Respiratória
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Como:</strong> Observe movimentos torácicos e crepitações. <br />
                <strong>Alvo:</strong> Cães: 10-30 mpm | Gatos: 20-40 mpm.
              </p>
            </div>
            <p className="text-[10px] text-red-500 font-semibold bg-red-500/5 p-2 rounded-lg mt-2 border border-red-500/10">
              🚨 Dispneia/Taquipneia sinaliza sobrecarga volumétrica (TACO) ou TRALI.
            </p>
          </div>

          {/* Mucosas */}
          <div className="bg-muted/40 p-5 rounded-2xl border border-border/40 space-y-2 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <span className="p-1 rounded bg-pink-500/10 text-pink-500"><Eye className="h-4 w-4" /></span>
                Mucosas e TPC
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Como:</strong> Inspecione lábios e faça pressão gengival. <br />
                <strong>Alvo:</strong> Róseas, úmidas e TPC &lt; 2s.
              </p>
            </div>
            <p className="text-[10px] text-red-500 font-semibold bg-red-500/5 p-2 rounded-lg mt-2 border border-red-500/10">
              🚨 Palidez (choque), icterícia (hemólise) ou hiperemia requerem atenção imediata.
            </p>
          </div>

          {/* Pressão */}
          <div className="bg-muted/40 p-5 rounded-2xl border border-border/40 space-y-2 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <span className="p-1 rounded bg-indigo-500/10 text-indigo-500"><TrendingUp className="h-4 w-4" /></span>
                Pressão Arterial
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Como:</strong> Doppler ou oscilométrico. <br />
                <strong>Alvo:</strong> Sistólica entre 110 e 160 mmHg.
              </p>
            </div>
            <p className="text-[10px] text-red-500 font-semibold bg-red-500/5 p-2 rounded-lg mt-2 border border-red-500/10">
              🚨 Hipotensão severa (&lt;90 mmHg) é indicativo de choque anafilático ou sepse.
            </p>
          </div>

          {/* Estado mental */}
          <div className="bg-muted/40 p-5 rounded-2xl border border-border/40 space-y-2 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <span className="p-1 rounded bg-purple-500/10 text-purple-500"><BrainCircuit className="h-4 w-4" /></span>
                Estado Mental
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Como:</strong> Avalie interatividade e reatividade a estímulos. <br />
                <strong>Alvo:</strong> Alerta e comportamentalmente normal.
              </p>
            </div>
            <p className="text-[10px] text-red-500 font-semibold bg-red-500/5 p-2 rounded-lg mt-2 border border-red-500/10">
              🚨 Inquietação, vocalização e salivação precedem frequentemente reações agudas.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
});

PrepGuidePage.displayName = 'PrepGuidePage';
export default PrepGuidePage;
