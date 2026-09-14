import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ExternalLink,
  FileText,
  Building2,
  Copy,
  Check,
  Droplets,
  Pill,
  Syringe,
  ArrowRight,
  ChevronDown,
  Info,
  CheckCircle2,
} from 'lucide-react';
import type { MedicationRecord, MedicationPresentation } from '../../types/medication';

export function MedicationMarketTab({
  medication,
}: {
  medication: MedicationRecord;
}) {
  const [copiedPrescription, setCopiedPrescription] = useState(false);

  const samplePrescription =
    medication.samplePrescriptionText ||
    (medication.slug === 'fenobarbital'
      ? 'RECEITUÁRIO DE CONTROLE ESPECIAL (LISTA C1 - 2 VIAS)\n\n' +
        'USO ORAL:\n' +
        '1. Convless® Solução Oral 20 mg/mL (Agener União) ------------ 1 frasco (100 mL)\n' +
        '   Administrar 1,25 mL (25 mg) por via oral, utilizando a seringa dosadora graduada, a cada 12 horas (rigorosamente nos horários das 08h e 20h), de uso contínuo.\n\n' +
        'OU EM COMPRIMIDOS:\n' +
        '1. Gardenal® 100 mg (Sanofi) -------------------------------- 1 caixa (20 comprimidos)\n' +
        '   Administrar 1/4 de comprimido (25 mg para cão de 10 kg) por via oral a cada 12 horas, de uso contínuo.\n\n' +
        'ORIENTAÇÕES OBRIGATÓRIAS AO TUTOR:\n' +
        '• NUNCA interromper ou atrasar as doses pelo risco de crises refratárias em salva ou status epilepticus.\n' +
        '• Retornar em 14 a 21 dias para dosagem sérica de fenobarbital (TDM) e perfil bioquímico hepático.'
      : 'USO ORAL:\n' +
        '1. Novalgina® Gotas 500 mg/mL ------------------------- 1 frasco\n' +
        '   Administrar 1 gota por kg de peso corporal (25 mg/kg) por via oral a cada 8 horas, durante 3 dias seguidos para controle de dor e febre.\n\n' +
        'OU EM COMPRIMIDOS:\n' +
        '1. Novalgina® Comprimidos 500 mg --------------------- 1 caixa\n' +
        '   Administrar 1/2 comprimido (para cão de 10 kg) por via oral a cada 8 horas, durante 3 dias.');

  const handleCopyPrescription = () => {
    navigator.clipboard.writeText(samplePrescription);
    setCopiedPrescription(true);
    setTimeout(() => setCopiedPrescription(false), 2500);
  };

  const defaultWeightHeaders = [
    'Peso do Animal',
    'Dose Total (25 mg/kg)',
    'Gotas 500 mg/mL (1 gota/kg)',
    'Comprimidos 500 mg',
    'Injetável 500 mg/mL (0,05 mL/kg)',
  ];

  const defaultWeightRows = [
    { weight: '2 kg', totalDose: '50 mg', col1: '2 gotas (0,10 mL)', col2: 'Inadequado (usar gotas)', col3: '0,10 mL' },
    { weight: '5 kg', totalDose: '125 mg', col1: '5 gotas (0,25 mL)', col2: '1/4 comprimido', col3: '0,25 mL' },
    { weight: '10 kg', totalDose: '250 mg', col1: '10 gotas (0,50 mL)', col2: '1/2 comprimido', col3: '0,50 mL' },
    { weight: '15 kg', totalDose: '375 mg', col1: '15 gotas (0,75 mL)', col2: '3/4 comprimido', col3: '0,75 mL' },
    { weight: '20 kg', totalDose: '500 mg', col1: '20 gotas (1,00 mL)', col2: '1 comprimido inteiro', col3: '1,00 mL' },
    { weight: '30 kg', totalDose: '750 mg', col1: '30 gotas (1,50 mL)', col2: '1 + 1/2 comprimido', col3: '1,50 mL' },
    { weight: '40 kg', totalDose: '1.000 mg', col1: '40 gotas (2,00 mL)', col2: '2 comprimidos (ou 1 comp de 1g)', col3: '2,00 mL' },
  ];

  const tableHeaders = medication.practicalWeightTable?.headers || defaultWeightHeaders;
  const tableRows = medication.practicalWeightTable?.rows || defaultWeightRows;
  const calibrator = medication.practicalWeightTable?.dropletCalibrator;

  const getFormLabel = (pres: MedicationPresentation) => {
    const formLower = pres.form.toLowerCase();
    if (formLower.includes('gota') || (pres.dropsPerMl && pres.dropsPerMl > 0)) {
      return 'Solução Oral em Gotas';
    }
    if (formLower.includes('injet') || pres.channel === 'veterinary') {
      return 'Solução Injetável Estéril';
    }
    if (formLower.includes('comprim')) {
      return 'Comprimido Sulcado';
    }
    return pres.form;
  };

  const getConcentrationDisplay = (pres: MedicationPresentation) => {
    const isDrops = pres.form.toLowerCase().includes('gota') || (pres.dropsPerMl && pres.dropsPerMl > 0);
    if (isDrops) {
      const drops = pres.dropsPerMl || 20;
      const mgPerDrop = (pres.concentrationValue / drops).toFixed(1).replace('.0', '');
      return `${pres.concentrationValue} mg/mL • ${drops} gotas = 1 mL (${mgPerDrop} mg/gota)`;
    }
    if (pres.form.toLowerCase().includes('solu') && pres.concentrationUnit?.toLowerCase().includes('ml')) {
      return `${pres.concentrationValue} mg/mL (Solução oral com seringa graduada)`;
    }
    if (pres.concentrationUnit?.includes('comprimido')) {
      return `${pres.concentrationValue} mg por comprimido`;
    }
    return `${pres.concentrationValue} ${pres.concentrationUnit}`;
  };

  const getCommercialSearchUrl = (pres: MedicationPresentation) => {
    if (pres.commercialProductSlug) {
      return `/consulta-vet/apresentacoes-comerciais?q=${encodeURIComponent(pres.commercialProductSlug)}`;
    }
    return `/consulta-vet/apresentacoes-comerciais?q=${encodeURIComponent(medication.slug)}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Banner Minimalista de Apresentações Comerciais */}
      <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40">
            <ShoppingBag className="h-6 w-6" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Catálogo Terapêutico & Dispensação
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Apresentações Comerciais
            </h2>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          Apresentações de referência humana e formulações veterinárias registradas no MAPA, canais de aquisição,
          teores por gota ou comprimido e integração direta com a seção de comerciais.
        </p>
      </div>

      {/* SEÇÃO 1 (VEM PRIMEIRO): Apresentações Comerciais Disponíveis no Mercado */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Pill className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Apresentações Comerciais Disponíveis no Mercado
            </h3>
            <p className="text-xs text-muted-foreground">
              Tabela de formulações com teores por dose, embalagem, via e navegação direta para o catálogo de comerciais
            </p>
          </div>
        </div>

        {/* Tabela de Apresentações Comerciais com Detalhes Expansíveis */}
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/50 divide-y divide-border/60">
          {medication.presentations.map((pres, idx) => {
            const isVet = pres.channel === 'veterinary';
            const formLabel = getFormLabel(pres);
            const concentrationDisplay = getConcentrationDisplay(pres);
            const searchUrl = getCommercialSearchUrl(pres);

            return (
              <details
                key={pres.id}
                className="group transition-colors hover:bg-muted/20"
              >
                <summary className="flex cursor-pointer list-none flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          isVet
                            ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isVet ? (
                          <>
                            <Syringe className="h-3 w-3" />
                            Veterinário (MAPA)
                          </>
                        ) : (
                          <>
                            <Pill className="h-3 w-3" />
                            Farmácia Humana
                          </>
                        )}
                      </span>
                      <span className="text-[11px] font-semibold text-muted-foreground">
                        {formLabel}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                      {pres.label}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {concentrationDisplay}
                      </span>
                      {pres.route && (
                        <span>
                          • Via {pres.route}
                        </span>
                      )}
                      {pres.packInfo && (
                        <span>
                          • {pres.packInfo}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Ações por Apresentação: Link direto para Comerciais e Botão para Expandir */}
                  <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
                    <Link
                      to={searchUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 transition hover:bg-indigo-500/20 hover:border-indigo-500/50"
                      title="Abrir detalhes deste produto na seção de Comerciais"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Ver na Seção de Comerciais</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>

                    <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-muted/40 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition group-hover:border-primary/40 group-hover:text-foreground">
                      <span className="hidden md:inline">Mais detalhes</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
                    </div>
                  </div>
                </summary>

                {/* Bloco de Informações Completas da Apresentação */}
                <div className="border-t border-border/60 bg-muted/30 p-4 sm:p-5 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Informações Técnicas & Orientações Práticas
                  </span>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {pres.scoringInfo && (
                      <div className="rounded-xl bg-background/80 p-3.5 border border-border/70 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                          Fracionamento & Posologia Prática
                        </span>
                        <p className="text-xs leading-relaxed text-foreground/90">
                          {pres.scoringInfo}
                        </p>
                      </div>
                    )}

                    <div className="rounded-xl bg-background/80 p-3.5 border border-border/70 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Canal & Regulamentação
                      </span>
                      <p className="text-xs leading-relaxed text-foreground/80">
                        {isVet
                          ? 'Produto registrado no MAPA para uso médico-veterinário. Adquirido em distribuidoras agropecuárias ou farmácias veterinárias.'
                          : 'Especialidade farmacêutica de uso humano aprovada pela ANVISA. Prescrição veterinária sob regime extrabula legal.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs">
                    <span className="text-muted-foreground">
                      Identificador de catálogo: <code className="font-mono text-[11px] text-foreground">{pres.id}</code>
                    </span>
                    <Link
                      to={searchUrl}
                      className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>Abrir ficha completa no Catálogo Comercial</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* SEÇÃO 2 (VEM NO FINAL): Guia de Conversão Rápida / Tabela Prática */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Droplets className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {calibrator?.title || 'Guia de Conversão Rápida (Gotas & Posologia)'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {calibrator?.note || medication.practicalWeightTable?.standardDoseText || 'Relação de gotejamento padrão e tabela de posologia prática por peso corporal'}
            </p>
          </div>
        </div>

        {/* 3 Cards com a Relação Matemática */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
              Equivalência / Concentração
            </span>
            <p className="text-base font-black text-foreground">
              {calibrator?.concentration || '1 mL = 20 gotas'}
            </p>
            <p className="text-xs text-muted-foreground">
              {calibrator ? 'Apresentação comercial e veículo de dispensação' : 'Gotejador calibrado oficial para soluções líquidas 500 mg/mL'}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
              Teor por Unidade / Gota
            </span>
            <p className="text-base font-black text-amber-600 dark:text-amber-400">
              {calibrator?.dropletRatio || '1 gota = 25 mg'}
            </p>
            <p className="text-xs text-muted-foreground">
              {calibrator ? 'Cálculo exato de princípio ativo por volume fracionado' : 'Cálculo: 500 mg ÷ 20 gotas = exatamente 25 mg por gota'}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
              Regra Prática de Dosagem
            </span>
            <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
              {calibrator?.practicalRule || '1 gota para cada 1 kg'}
            </p>
            <p className="text-xs text-muted-foreground">
              {medication.practicalWeightTable?.standardDoseText || 'Para dose padrão recomendada calculada por quilograma'}
            </p>
          </div>
        </div>

        {/* Tabela de correspondência prática por peso */}
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/60 border-b border-border text-muted-foreground font-semibold">
                {tableHeaders.map((header, idx) => (
                  <th
                    key={idx}
                    className={`py-3 px-4 ${
                      idx === 0
                        ? ''
                        : idx === 1
                        ? ''
                        : idx === 2
                        ? 'text-amber-700 dark:text-amber-300'
                        : idx === 3
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-purple-700 dark:text-purple-300'
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {tableRows.map((row, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-foreground">{row.weight}</td>
                  <td className="py-2.5 px-4 font-mono text-muted-foreground">{row.totalDose}</td>
                  <td className="py-2.5 px-4 font-semibold text-amber-800 dark:text-amber-200">{row.col1}</td>
                  <td className="py-2.5 px-4 text-foreground/90">{row.col2}</td>
                  <td className="py-2.5 px-4 font-mono text-foreground/80">{row.col3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEÇÃO 3: Bulas Oficiais, Links de Fabricantes & Prescrição Pronta */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bulas & Links Oficiais */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-border/70 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Bulas & Fontes Oficiais
              </h3>
              <p className="text-xs text-muted-foreground">Documentos regulatórios e bulário ANVISA</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {medication.leafletUrl && (
              <a
                href={medication.leafletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-sky-500/20 bg-sky-500/5 p-3.5 transition hover:bg-sky-500/10"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-sky-500" />
                  <div>
                    <span className="font-bold text-foreground block">
                      {medication.slug === 'fenobarbital'
                        ? 'Bula Técnica Oficial do Convless® 20 mg/mL (MAPA)'
                        : `Bula Oficial de ${medication.title} (PDF ANVISA)`}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Bula completa para o paciente e profissional de saúde
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-sky-500 shrink-0" />
              </a>
            )}

            {medication.officialSiteUrl && (
              <a
                href={medication.officialSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3.5 transition hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <span className="font-bold text-foreground block">
                      {medication.slug === 'fenobarbital'
                        ? 'Portal Fabricante / Linha Convless® (Agener União)'
                        : `Portal Oficial de ${medication.title}`}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Linha de produtos, apresentações e farmacovigilância
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              </a>
            )}

            <div className="rounded-xl bg-muted/40 p-3.5 space-y-1 text-muted-foreground">
              <span className="font-bold text-foreground block">
                Marcas Registradas & Genéricos
              </span>
              <p className="text-[11px]">
                {medication.genericBrandsNote ||
                  (medication.slug === 'fenobarbital'
                    ? 'O fenobarbital conta com formulação de uso veterinário exclusivo com seringa dosadora (Convless® 20 mg/mL - Agener União) e formulações de uso humano sob receita de controle especial (Gardenal® 50/100 mg - Sanofi, Fenocris® injetável - Cristália, além de genéricos União Química, Teuto e EMS).'
                    : `${medication.title} é amplamente produzida por laboratórios farmacêuticos certificados, mantendo formulações orais e parenterais sob estrito controle analítico.`)}
              </p>
            </div>
          </div>
        </section>

        {/* Modelo de Prescrição Veterinária Pronta para Cópia */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Prescrição Modelo Pronta
                </h3>
                <p className="text-xs text-muted-foreground">Copie ou use como base na prescrição</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyPrescription}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-accent"
            >
              {copiedPrescription ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          <div className="relative rounded-2xl bg-muted/50 p-4 font-mono text-xs text-foreground/90 border border-border whitespace-pre-line leading-relaxed">
            {samplePrescription}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>Texto pronto e formatado para colar em prontuário ou receituário impresso.</span>
          </div>
        </section>
      </div>
    </div>
  );
}
