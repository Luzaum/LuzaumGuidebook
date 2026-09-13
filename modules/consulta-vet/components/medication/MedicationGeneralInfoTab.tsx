import React from 'react';
import {
  Info,
  Syringe,
  FileText,
  BookmarkCheck,
  AlertCircle,
  HelpCircle,
  Droplets,
  CheckCircle2,
  XCircle,
  Clock,
  Warehouse,
} from 'lucide-react';
import type { MedicationRecord } from '../../types/medication';
import catPlayful from '@/components/assets/species/cat-playful.webp';
import dogPlayful from '@/components/assets/species/dog-playful.webp';

export function MedicationGeneralInfoTab({
  medication,
}: {
  medication: MedicationRecord;
}) {
  const generalInfo = medication.generalInfoData;
  const dilutionGuide = generalInfo?.dilutionGuide || medication.attentionData?.dilutionGuide;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Banner de Apresentação da Aba */}
      <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/40">
            <Info className="h-6 w-6" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Módulo de Informações Gerais
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Vias, Compatibilidade, Espécies & Prescrição
            </h2>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          Diretrizes técnicas de administração por via, compatibilidade de infusão hospitalar e armazenamento,
          particularidades fisiometabólicas comparadas entre caninos e felinos, e fundamentação regulatória de prescrição.
        </p>
      </div>

      {/* SEÇÃO 1: Formas de Administração */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Syringe className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Formas de Administração
            </h3>
            <p className="text-xs text-muted-foreground">
              Técnica de infusão, cuidados de diluição e prevenção de reações adversas agudas
            </p>
          </div>
        </div>

        {generalInfo?.routesDetailed && generalInfo.routesDetailed.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {generalInfo.routesDetailed.map((r, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-border/80 bg-muted/20 p-5 transition hover:border-blue-500/30 hover:bg-muted/40"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                      <Syringe className="h-3.5 w-3.5" />
                      {r.route}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">#{idx + 1}</span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Técnica de Aplicação
                    </h4>
                    <p className="text-xs leading-relaxed text-foreground/90">
                      {r.technique}
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 dark:bg-amber-500/10">
                    <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Cuidados de Enfermagem
                    </h4>
                    <p className="text-xs leading-relaxed text-foreground/80">
                      {r.nursingCare}
                    </p>
                  </div>
                </div>

                {r.limitations && (
                  <div className="mt-3 pt-3 border-t border-border/60 text-[11px] text-muted-foreground">
                    <strong className="text-foreground/80">Limitações:</strong> {r.limitations}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            {medication.routes.map((rt, i) => (
              <div key={i} className="rounded-xl border border-border p-4 bg-muted/20">
                <p className="text-sm font-semibold text-foreground">{rt}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SEÇÃO 2: Compatibilidade e Armazenamento (Trazido para Info, logo abaixo de Formas de Administração) */}
      {dilutionGuide && (
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-border/70 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Droplets className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Compatibilidade e Armazenamento
              </h3>
              <p className="text-xs text-muted-foreground">
                Diretrizes de diluição hospitalar, fluidos compatíveis, incompatibilidades físico-químicas e conservação
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Soluções Compatíveis */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-3">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Soluções de Infusão Compatíveis
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                {dilutionGuide.compatibleFluids.map((fluid, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{fluid}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Incompatibilidades */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-3">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                <XCircle className="h-4 w-4" />
                Incompatibilidades Físico-Químicas & Alertas
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                {dilutionGuide.incompatibleFluids.map((fluid, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{fluid}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Taxa de Infusão e Notas de Conservação / Armazenamento */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 space-y-2">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                <Clock className="h-4 w-4" />
                Diretriz de Velocidade de Infusão
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                {dilutionGuide.infusionRateGuidance}
              </p>
            </div>

            <div className="rounded-2xl bg-muted/40 border border-border p-5 space-y-2">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Warehouse className="h-4 w-4" />
                Armazenamento, Inspeção & Estabilidade
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                {dilutionGuide.preparationNotes}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SEÇÃO 3: Peculiaridades das Espécies (Cão vs. Gato) com Ícone de Seleção de Espécie Nutrição Vet Centralizado */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <HelpCircle className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Peculiaridades Comparadas entre Espécies
            </h3>
            <p className="text-xs text-muted-foreground">
              Diferenças fisiometabólicas, clearance, susceptibilidade e segurança clínica
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {generalInfo?.speciesPeculiarities?.map((pec, idx) => {
            const isCat = pec.species === 'cat';

            return (
              <div
                key={idx}
                className={`rounded-3xl border p-6 space-y-5 transition shadow-xs ${
                  isCat
                    ? 'border-purple-500/30 bg-purple-500/5 dark:bg-purple-950/20'
                    : 'border-blue-500/30 bg-blue-500/5 dark:bg-blue-950/20'
                }`}
              >
                {/* Ícone de Seleção da Espécie do Nutrição Vet Centralizado no Card */}
                <div className="flex flex-col items-center justify-center pt-2 pb-1 text-center">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl p-2 shadow-xs transition-transform duration-200 hover:scale-105 ${
                      isCat
                        ? 'bg-white/85 dark:bg-purple-950/50 ring-2 ring-purple-500/30 shadow-purple-500/10'
                        : 'bg-white/85 dark:bg-blue-950/50 ring-2 ring-blue-500/30 shadow-blue-500/10'
                    }`}
                  >
                    <img
                      src={isCat ? catPlayful : dogPlayful}
                      alt={isCat ? 'Gato' : 'Cão'}
                      className="h-16 w-16 object-contain select-none"
                      draggable={false}
                    />
                  </div>
                  <span
                    className={`mt-2.5 text-xs font-black uppercase tracking-wider ${
                      isCat ? 'text-purple-700 dark:text-purple-300' : 'text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {isCat ? 'Felinos (Gatos)' : 'Caninos (Cães)'}
                  </span>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-foreground text-center sm:text-left">
                    {pec.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-foreground/90">
                    {pec.description}
                  </p>
                </div>

                <div className="rounded-2xl bg-background/80 p-4 border border-border/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Conduta Clínica Prática
                  </span>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-foreground">
                    {pec.clinicalImplications}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEÇÃO 4: Regulamentação & Prescrição - Posicionado no Final da Página */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Regulamentação & Prescrição
            </h3>
            <p className="text-xs text-muted-foreground">Exigências cartoriais e normativas federais (MAPA / ANVISA)</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-5 space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                Categoria de Prescrição
              </span>
              <span className="text-base font-bold text-emerald-950 dark:text-emerald-100">
                {generalInfo?.prescriptionType?.category || 'Receita Médica Veterinária Simples'}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-emerald-500/20 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <BookmarkCheck className="h-4 w-4" />
              <span>Dispensação em via única ao tutor</span>
            </div>
          </div>

          <div className="rounded-2xl bg-muted/30 border border-border/80 p-5 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Base Normativa
            </span>
            <p className="text-sm font-semibold text-foreground">
              {generalInfo?.prescriptionType?.ordinanceOrLaw || 'Instrução Normativa MAPA nº 35/2017'}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enquadramento nas normas federais do MAPA para produtos veterinários e RDC ANVISA para fármacos humanos.
            </p>
          </div>

          <div className="rounded-2xl bg-muted/30 border border-border/80 p-5 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Exigência de Retenção Farmacêutica
            </span>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {generalInfo?.prescriptionType?.retentionRequired
                ? 'Retenção Obrigatória de 1 via'
                : 'NÃO exige retenção de receita'}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sem controle especial sob Portaria SVS/MS nº 344/1998; dispensa notificação ou talonário de controle.
            </p>
          </div>
        </div>

        {generalInfo?.prescriptionType?.guidelines && (
          <div className="rounded-2xl bg-muted/20 border border-border p-4 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground font-semibold">Orientações de Prescrição: </strong>
            {generalInfo.prescriptionType.guidelines}
          </div>
        )}
      </section>
    </div>
  );
}
