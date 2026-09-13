import React from 'react';
import { Stethoscope, Target } from 'lucide-react';
import type { MedicationGeneralInfoData } from '../../types/medication';

interface MedicationPharmacologicalClassificationSectionProps {
  classification?: MedicationGeneralInfoData['pharmacologicalClassification'];
  activeIngredient?: string;
  pharmacologicClass?: string;
}

export function MedicationPharmacologicalClassificationSection({
  classification,
  activeIngredient,
  pharmacologicClass,
}: MedicationPharmacologicalClassificationSectionProps) {
  if (!classification) return null;

  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
      {/* Cabeçalho da Seção */}
      <div className="flex items-center gap-3 border-b border-border/70 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Stethoscope className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Classificação Farmacológica & Mecânica
          </h3>
          <p className="text-xs text-muted-foreground">
            Taxonomia química, ação terapêutica e caracterização aprofundada dos sítios moleculares
          </p>
        </div>
      </div>

      {/* Grid de 2 Cards Amplos de Classificação (Sem código ATCvet) */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Classe Química */}
        <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            Classe Química
          </span>
          <p className="text-sm sm:text-base font-bold text-foreground leading-snug">
            {classification.chemicalClass || pharmacologicClass || 'Derivado pirazolônico'}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed pt-1">
            Estrutura heterocíclica pirazolona hidrossolúvel com rápida hidrólise pré-sistêmica no metabólito ativo 4-MAA.
          </p>
        </div>

        {/* Ação Terapêutica Principal */}
        <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            Ação Terapêutica Principal
          </span>
          <p className="text-sm sm:text-base font-bold text-foreground leading-snug">
            {classification.therapeuticClass || 'Analgésico, antipirético e antiespasmódico'}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed pt-1">
            AINE atípico não-narcótico de ação mista (periférica, espinhal e supraespinhal) com perfil poupador gastrointestinal.
          </p>
        </div>
      </div>

      {/* Sítios & Receptores-Alvo (Cards amplos de largura completa com 100% de visibilidade) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Sítios Moleculares & Receptores-Alvo Detalhados
          </h4>
        </div>

        {classification.detailedTargets && classification.detailedTargets.length > 0 ? (
          <div className="space-y-4">
            {classification.detailedTargets.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/80 bg-muted/20 p-5 sm:p-6 transition hover:border-purple-500/30 hover:bg-muted/30 space-y-4"
              >
                {/* Linha de topo com identificador numérico e título do alvo */}
                <div className="flex items-center gap-3 border-b border-border/60 pb-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-xs font-black text-purple-700 dark:text-purple-300">
                    0{idx + 1}
                  </span>
                  <h5 className="text-sm sm:text-base font-bold text-foreground">
                    {item.target}
                  </h5>
                </div>

                {/* Grid espaçosa de 2 colunas para Ação e Relevância Clínica */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Mecanismo Molecular & Ação Enzimática
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                      {item.action}
                    </p>
                  </div>

                  <div className="rounded-xl border border-purple-500/25 bg-purple-500/5 p-4 dark:bg-purple-950/20 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 block">
                      Relevância & Impacto Clínico Prático
                    </span>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed text-foreground/85">
                      {item.clinicalSignificance}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {classification.receptorTargets?.map((target, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-sm font-semibold text-foreground">{target}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
