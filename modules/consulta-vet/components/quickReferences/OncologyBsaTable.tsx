import React, { useMemo, useState } from 'react';
import { Search, ArrowUpDown, Check } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import {
  BSAVA_CAT_BSA_TABLE,
  BSAVA_DOG_BSA_TABLE,
  BsaTableRow,
  Species,
} from '../../data/quickReferencesData';

interface OncologyBsaTableProps {
  currentWeightKg: number;
  species: Species;
  onSelectWeight: (weight: number) => void;
  onSpeciesChange: (species: Species) => void;
}

export function OncologyBsaTable({
  currentWeightKg,
  species,
  onSelectWeight,
  onSpeciesChange,
}: OncologyBsaTableProps) {
  const [filterQuery, setFilterQuery] = useState('');

  const tableData: BsaTableRow[] = useMemo(() => {
    return species === 'canine' ? BSAVA_DOG_BSA_TABLE : BSAVA_CAT_BSA_TABLE;
  }, [species]);

  const filteredData = useMemo(() => {
    const q = filterQuery.trim().replace(',', '.');
    if (!q) return tableData;
    return tableData.filter((row) => {
      const weightStr = row.weightKg.toString();
      const bsaStr = row.bsaM2.toString();
      return weightStr.includes(q) || bsaStr.includes(q);
    });
  }, [tableData, filterQuery]);

  // Encontra a linha mais próxima do peso atual
  const closestWeight = useMemo(() => {
    if (currentWeightKg <= 0) return null;
    let closest = tableData[0];
    let minDiff = Math.abs(currentWeightKg - closest.weightKg);

    for (const row of tableData) {
      const diff = Math.abs(currentWeightKg - row.weightKg);
      if (diff < minDiff) {
        minDiff = diff;
        closest = row;
      }
    }
    return minDiff <= 1.0 ? closest.weightKg : null;
  }, [currentWeightKg, tableData]);

  return (
    <div className="space-y-4">
      {/* Barra de Ações da Tabela */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Alternador de Espécie */}
        <div className="flex rounded-xl border border-border/80 bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => onSpeciesChange('canine')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
              species === 'canine'
                ? 'bg-background text-foreground shadow-sm ring-1 ring-border/60'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Tabela Canina (0,5 a 60 kg)
          </button>
          <button
            type="button"
            onClick={() => onSpeciesChange('feline')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
              species === 'feline'
                ? 'bg-background text-foreground shadow-sm ring-1 ring-border/60'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Tabela Felina (0,5 a 10 kg)
          </button>
        </div>

        {/* Campo de Busca Rápida na Tabela */}
        <div className="relative w-full sm:w-60">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Buscar peso ou m²..."
            className="h-9 w-full rounded-xl border border-border/80 bg-background pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Tabela de Conversão */}
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
        <div className="max-h-[520px] overflow-y-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="sticky top-0 z-10 border-b border-border/80 bg-muted/90 backdrop-blur-md">
              <tr>
                <th className="px-4 py-3 font-bold text-foreground">Peso Corporal (kg)</th>
                <th className="px-4 py-3 font-bold text-foreground">Área de Superfície (m²)</th>
                <th className="hidden px-4 py-3 font-bold text-foreground md:table-cell">Fórmula Aplicada</th>
                <th className="px-4 py-3 text-right font-bold text-foreground">Ação Rápida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredData.map((row) => {
                const isSelected = closestWeight === row.weightKg;
                const isSmall = (species === 'canine' && row.weightKg < 10) || (species === 'feline' && row.weightKg <= 2);

                return (
                  <tr
                    key={row.weightKg}
                    className={cn(
                      'transition-colors hover:bg-muted/50',
                      isSelected && 'bg-primary/10 font-semibold text-primary dark:bg-primary/[0.15]'
                    )}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{row.weightKg.toFixed(1)} kg</span>
                        {isSmall && (
                          <span
                            title="Animal pequeno: atentar para doses ponderais (mg/kg) em antraciclinas."
                            className="rounded bg-amber-500/10 px-1 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400"
                          >
                            &lt;10 kg
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-sm font-bold text-foreground">
                      {row.bsaM2.toFixed(3)} m²
                    </td>
                    <td className="hidden px-4 py-2.5 font-mono text-muted-foreground md:table-cell">
                      {species === 'canine'
                        ? `0,101 × (${row.weightKg})²⁄³`
                        : `0,100 × (${row.weightKg})²⁄³`}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => onSelectWeight(row.weightKg)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'border border-border/80 bg-background text-foreground hover:bg-muted'
                        )}
                      >
                        {isSelected ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Selecionado</span>
                          </>
                        ) : (
                          'Calcular'
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Fonte: BSAVA Manual of Canine and Feline Oncology (3ª Edição, Fig. 7.3 e 7.4) e BSAVA Formulary (10ª Edição).
        </p>
        <p>Exibindo {filteredData.length} faixas de peso.</p>
      </div>
    </div>
  );
}
