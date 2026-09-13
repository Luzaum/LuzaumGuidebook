import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Calculator,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import {
  BSAVA_ONCOLOGY_DRUGS,
  BSAVA_SAFETY_GUIDELINES,
  calculateBsa,
  OncologyDrug,
  Species,
} from '../../data/quickReferencesData';

interface OncologyBsaCalculatorProps {
  currentWeightKg: number;
  species: Species;
  onWeightChange: (weight: number) => void;
  onSpeciesChange: (species: Species) => void;
}

const PRESET_WEIGHTS: Record<Species, number[]> = {
  canine: [2, 5, 8, 12, 15, 20, 25, 30, 40],
  feline: [1.5, 2.5, 3.5, 4, 4.5, 5, 6, 7],
};

export function OncologyBsaCalculator({
  currentWeightKg,
  species,
  onWeightChange,
  onSpeciesChange,
}: OncologyBsaCalculatorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDrugId, setExpandedDrugId] = useState<string | null>(null);
  const [showAllGuidelines, setShowAllGuidelines] = useState(false);

  const bsa = useMemo(() => calculateBsa(currentWeightKg, species), [currentWeightKg, species]);

  const isUnder10Kg = currentWeightKg > 0 && currentWeightKg < 10;
  const isUnder15Kg = currentWeightKg > 0 && currentWeightKg < 15;

  const filteredDrugs = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return BSAVA_ONCOLOGY_DRUGS.filter((d) => {
      if (!d.applicableSpecies.includes(species)) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.class.toLowerCase().includes(q) ||
        d.route.toLowerCase().includes(q) ||
        d.standardDoseDisplay.toLowerCase().includes(q)
      );
    });
  }, [searchTerm, species]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!Number.isNaN(val) && val >= 0) {
      onWeightChange(Math.min(val, 120));
    } else if (e.target.value === '') {
      onWeightChange(0);
    }
  };

  const handleStep = (delta: number) => {
    const next = Math.max(0.2, Number((currentWeightKg + delta).toFixed(1)));
    onWeightChange(Math.min(next, 100));
  };

  return (
    <div className="space-y-6">
      {/* Bloco Central: Calculadora de Superfície Corporal */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur-md md:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Coluna Esquerda: Entrada de Dados */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Calculadora de Superfície Corpórea (BSA)</h3>
                  <p className="text-xs text-muted-foreground">Fórmula oficial BSAVA: K × Peso²⁄³ (m²)</p>
                </div>
              </div>

              {/* Seletor Cão / Gato */}
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
                  Cão (K=10.1)
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
                  Gato (K=10.0)
                </button>
              </div>
            </div>

            {/* Input de Peso e Controles de Passo */}
            <div className="space-y-2">
              <label htmlFor="patient-weight-input" className="block text-xs font-medium text-muted-foreground">
                Peso do Paciente (kg)
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    id="patient-weight-input"
                    type="number"
                    step="0.1"
                    min="0.2"
                    max="100"
                    value={currentWeightKg || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: 12.5"
                    className="h-12 w-full rounded-2xl border border-border/90 bg-background px-4 text-lg font-bold text-foreground shadow-inner outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                    kg
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleStep(-1)}
                    disabled={currentWeightKg <= 0.5}
                    className="flex h-12 w-11 items-center justify-center rounded-2xl border border-border/80 bg-background text-foreground transition-colors hover:bg-muted active:scale-95 disabled:opacity-40"
                    title="-1 kg"
                  >
                    -1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStep(1)}
                    className="flex h-12 w-11 items-center justify-center rounded-2xl border border-border/80 bg-background text-foreground transition-colors hover:bg-muted active:scale-95"
                    title="+1 kg"
                  >
                    +1
                  </button>
                </div>
              </div>

              {/* Botões de Peso Rápido */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-medium text-muted-foreground">Predefinições:</span>
                {PRESET_WEIGHTS[species].map((pw) => (
                  <button
                    key={pw}
                    type="button"
                    onClick={() => onWeightChange(pw)}
                    className={cn(
                      'rounded-lg border px-2 py-1 text-xs font-medium transition-colors',
                      currentWeightKg === pw
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border/70 bg-background/60 text-muted-foreground hover:border-border hover:text-foreground'
                    )}
                  >
                    {pw} kg
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita: Painel de Exibição de BSA */}
          <div className="flex shrink-0 flex-col justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-transparent p-6 text-center lg:min-w-[280px]">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Área de Superfície Corpórea
            </span>
            <div className="my-2 flex items-baseline justify-center gap-1.5">
              <span className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                {bsa > 0 ? bsa.toFixed(3) : '0.000'}
              </span>
              <span className="text-xl font-bold text-muted-foreground">m²</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {species === 'canine'
                ? `BSA = 0,101 × (${currentWeightKg > 0 ? currentWeightKg : 0})²⁄³`
                : `BSA = 0,100 × (${currentWeightKg > 0 ? currentWeightKg : 0})²⁄³`}
            </p>
          </div>
        </div>

        {/* Alerta de Paciente Pequeno (<10kg ou <15kg) */}
        <AnimatePresence>
          {isUnder15Kg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 overflow-hidden"
            >
              <div
                className={cn(
                  'rounded-2xl border p-4 text-xs leading-relaxed',
                  isUnder10Kg
                    ? 'border-amber-500/30 bg-amber-500/[0.08] text-amber-950 dark:text-amber-100'
                    : 'border-sky-500/30 bg-sky-500/[0.08] text-sky-950 dark:text-sky-100'
                )}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div className="space-y-1">
                    <p className="font-bold">
                      {isUnder10Kg
                        ? 'Alerta Crítico BSAVA: Paciente < 10 kg'
                        : 'Alerta Farmacológico BSAVA: Paciente < 15 kg'}
                    </p>
                    <p className="text-muted-foreground dark:text-amber-200/80">
                      {isUnder10Kg
                        ? 'Animais pequenos apresentam maior toxicidade e mielossupressão grave se dosados estritamente por m². O BSAVA recomenda conversão para dosagem ponderal (mg/kg) para Doxorrubicina (1 mg/kg) e redução de faixas para Vincristina e Lomustina.'
                        : 'Para Doxorrubicina e Epirrubicina, cães com menos de 15 kg devem receber 1 mg/kg em vez de 30 mg/m² para evitar toxicidade aguda grave.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Seção de Fármacos Oncológicos e Doses Calculadas */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Doses Oncológicas Calculadas</h3>
            <p className="text-xs text-muted-foreground">
              Valores calculados em tempo real para {currentWeightKg > 0 ? `${currentWeightKg} kg` : 'o peso inserido'}{' '}
              ({bsa > 0 ? `${bsa} m²` : '0 m²'})
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar quimioterápico..."
              className="h-9 w-full rounded-xl border border-border/80 bg-background pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Lista de Cards de Fármacos */}
        <div className="grid gap-3.5 md:grid-cols-2">
          {filteredDrugs.map((drug) => {
            const isExpanded = expandedDrugId === drug.id;
            const doseResult = drug.calculateDose({ weightKg: currentWeightKg, bsaM2: bsa, species });

            return (
              <div
                key={drug.id}
                className={cn(
                  'relative rounded-2xl border bg-card/80 p-4 transition-all duration-200',
                  doseResult.isSmallPatientAdjusted
                    ? 'border-amber-500/30 shadow-[0_4px_20px_-10px_rgba(245,158,11,0.15)]'
                    : 'border-border/80 hover:border-primary/30 hover:shadow-sm'
                )}
              >
                {/* Cabeçalho do Fármaco */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-foreground">{drug.name}</h4>
                      {drug.vesicant && (
                        <span
                          title="Vesicante: Extravasamento causa necrose grave. Punção única recomendada."
                          className="flex items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400"
                        >
                          <ShieldAlert className="h-3 w-3" />
                          Vesicante
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{drug.class}</p>
                  </div>

                  {/* Valor Calculado em Destaque */}
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-xl font-black text-foreground">
                        {currentWeightKg > 0 ? doseResult.calculatedDose : '—'}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground">{doseResult.unit}</span>
                    </div>
                    <p className="text-[10px] font-medium text-muted-foreground">{drug.frequency}</p>
                  </div>
                </div>

                {/* Fórmula e Regra Utilizada */}
                <div className="mt-3 rounded-xl border border-border/60 bg-muted/40 p-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="font-semibold text-foreground">{doseResult.doseFormulaUsed}</p>
                      {doseResult.note && (
                        <p className="text-[11px] text-amber-700 dark:text-amber-300">{doseResult.note}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Via e Nadir */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-2.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-foreground">Via:</span>
                    <span>{drug.route}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Nadir: {drug.nadirDays}</span>
                  </div>
                </div>

                {/* Botão de Expansão para Detalhes / Cuidados */}
                <button
                  type="button"
                  onClick={() => setExpandedDrugId(isExpanded ? null : drug.id)}
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10"
                >
                  {isExpanded ? (
                    <>
                      <span>Menos detalhes</span>
                      <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Ver notas clínicas & precauções BSAVA</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>

                {/* Painel Expansível de Detalhes */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-2 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                        <div>
                          <p className="font-bold text-foreground">Notas Clínicas:</p>
                          <ul className="mt-1 list-disc space-y-0.5 pl-4">
                            {drug.keyNotes.map((note, idx) => (
                              <li key={idx}>{note}</li>
                            ))}
                          </ul>
                        </div>
                        {drug.precautions.length > 0 && (
                          <div>
                            <p className="font-bold text-amber-700 dark:text-amber-400">Precauções Críticas:</p>
                            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-amber-900/90 dark:text-amber-200/90">
                              {drug.precautions.map((prec, idx) => (
                                <li key={idx}>{prec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {filteredDrugs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
            Nenhum quimioterápico encontrado para a busca "{searchTerm}".
          </div>
        )}
      </div>

      {/* Diretrizes de Biossegurança e Regras de Ouro */}
      <div className="rounded-3xl border border-border/80 bg-card/70 p-5 backdrop-blur-sm md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-bold text-foreground">Regras de Ouro & Biossegurança BSAVA</h4>
          </div>
          <button
            type="button"
            onClick={() => setShowAllGuidelines((v) => !v)}
            className="text-xs font-semibold text-primary hover:underline"
          >
            {showAllGuidelines ? 'Recolher' : 'Expandir todas'}
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(showAllGuidelines ? BSAVA_SAFETY_GUIDELINES : BSAVA_SAFETY_GUIDELINES.slice(0, 3)).map((g, idx) => (
            <div key={idx} className="rounded-2xl border border-border/70 bg-background/50 p-3.5 text-xs space-y-1.5">
              <p className="font-bold text-foreground">{g.title}</p>
              <p className="text-muted-foreground leading-relaxed">{g.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
