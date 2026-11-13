import React from 'react';
import { Stethoscope } from 'lucide-react';
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
  const chemicalClass =
    classification?.chemicalClass ||
    activeIngredient ||
    pharmacologicClass ||
    'Composto Farmacológico';
  const chemicalClassDescription = classification?.chemicalClassDescription;
  const therapeuticClass =
    classification?.therapeuticClass ||
    pharmacologicClass ||
    'Ação Terapêutica Veterinária';
  const therapeuticClassDescription = classification?.therapeuticClassDescription;

  if (!classification && !pharmacologicClass && !activeIngredient) return null;

  return (
    <section id="classificacao-farmacologica" className="scroll-mt-24 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
      {/* Cabeçalho da Seção */}
      <div className="flex items-center gap-3 border-b border-border/70 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Stethoscope className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Classificação Farmacológica
          </h3>
          <p className="text-xs text-muted-foreground">
            Taxonomia química e ação terapêutica principal
          </p>
        </div>
      </div>

      {/* Grid de 2 Cards Amplos de Classificação */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Classe Química */}
        <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            Classe Química
          </span>
          <p className="text-sm sm:text-base font-bold text-foreground leading-snug">
            {chemicalClass}
          </p>
          {chemicalClassDescription && (
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              {chemicalClassDescription}
            </p>
          )}
        </div>

        {/* Ação Terapêutica Principal */}
        <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            Ação Terapêutica Principal
          </span>
          <p className="text-sm sm:text-base font-bold text-foreground leading-snug">
            {therapeuticClass}
          </p>
          {therapeuticClassDescription && (
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              {therapeuticClassDescription}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
