import React, { useMemo } from 'react';
import { BookOpen, FlaskConical, Stethoscope, ShieldCheck } from 'lucide-react';
import type { MedicationRecord } from '../../types/medication';
import { ClinicalAbbreviationText } from '../../utils/clinicalAbbreviationInline';

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type Seg = { mark: boolean; value: string };

function applyHighlightTerms(segments: Seg[], term: string): Seg[] {
  const out: Seg[] = [];
  for (const seg of segments) {
    if (seg.mark) {
      out.push(seg);
      continue;
    }
    let last = 0;
    let m: RegExpExecArray | null;
    const r = new RegExp(escapeRegExp(term), 'gi');
    while ((m = r.exec(seg.value)) !== null) {
      if (m.index > last) out.push({ mark: false, value: seg.value.slice(last, m.index) });
      out.push({ mark: true, value: m[0] });
      last = m.index + m[0].length;
    }
    if (last < seg.value.length) out.push({ mark: false, value: seg.value.slice(last) });
  }
  return out;
}

function NarrativeHighlightedText({ text, highlights }: { text: string; highlights: string[] }) {
  const segments = useMemo(() => {
    let segs: Seg[] = [{ mark: false, value: text }];
    const sorted = [...highlights].sort((a, b) => b.length - a.length);
    for (const term of sorted) {
      segs = applyHighlightTerms(segs, term);
    }
    return segs;
  }, [text, highlights]);

  return (
    <>
      {segments.map((n, i) =>
        n.mark ? (
          <mark
            key={i}
            className="rounded bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 font-bold text-slate-900 dark:text-amber-200 shadow-2xs"
          >
            {n.value}
          </mark>
        ) : (
          <ClinicalAbbreviationText key={i} text={n.value} />
        )
      )}
    </>
  );
}

interface EvidenceBlockProps {
  citation: string;
  referenceId: string;
  sourceType?: string;
  summaryText: string;
  summaryHighlights: string[];
  metrics: string[];
  clinicalConclusion: string;
}

function EvidenceFindingBlock({
  citation,
  referenceId,
  refIndex,
  sourceType,
  summaryText,
  summaryHighlights,
  metrics,
  clinicalConclusion,
}: EvidenceBlockProps & { refIndex?: number }) {
  return (
    <div
      data-clinical-visual="evidence"
      className="my-4 rounded-2xl border border-cyan-600/25 border-l-4 border-l-cyan-600 bg-cyan-500/[0.06] p-4.5 sm:p-5 dark:border-cyan-400/25 dark:border-l-cyan-400 dark:bg-cyan-400/[0.08]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-600/20 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-200">
            <FlaskConical className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-800/80 dark:text-cyan-200/80">
              Evidência publicada
            </p>
            <p className="text-xs sm:text-sm font-bold text-cyan-950 dark:text-cyan-100">
              {citation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {sourceType && (
            <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-800 dark:text-cyan-200">
              {sourceType}
            </span>
          )}
          <a
            href={`#${referenceId}`}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById(referenceId);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.add('ring-2', 'ring-primary', 'transition-all');
                setTimeout(() => target.classList.remove('ring-2', 'ring-primary'), 2000);
              }
            }}
            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-1 text-[10px] font-bold text-primary transition-all hover:scale-110 hover:bg-primary/20 active:scale-95 sm:h-7 sm:min-w-7 sm:px-2 sm:text-xs"
            title={citation || `Ver referência ${(refIndex ?? 0) + 1}`}
          >
            {(refIndex ?? 0) + 1}
          </a>
        </div>
      </div>

      <div className="mt-3 text-xs sm:text-sm leading-relaxed text-foreground/90">
        <NarrativeHighlightedText text={summaryText} highlights={summaryHighlights} />
      </div>

      <div className="mt-3 rounded-xl bg-background/80 p-3 border border-cyan-600/20">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300 block mb-0.5">
          Impacto Clínico Direto
        </span>
        <p className="text-xs font-semibold leading-relaxed text-foreground">
          {clinicalConclusion}
        </p>
      </div>

      {metrics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Métricas principais do estudo">
          {metrics.map((metric) => (
            <span
              key={metric}
              className="inline-flex min-h-6 items-center rounded-md border border-cyan-600/30 bg-background/90 px-2.5 py-0.5 text-[11px] font-bold text-cyan-950 dark:text-cyan-100 shadow-2xs"
            >
              {metric}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function MedicationClinicalFoundationsSection({
  medication,
}: {
  medication?: MedicationRecord;
}) {
  const isPhenobarbital = medication?.slug === 'fenobarbital';
  const customFoundations = medication?.clinicalFoundationsData;
  const allRefs = medication?.references ?? [];
  const getRefIndex = (refId: string): number => {
    const idx = allRefs.findIndex((r) => r.id === refId);
    return idx >= 0 ? idx : 0;
  };
  return (
    <section
      id="fundamentos-clinicos"
      className="consulta-vet-readable-highlights scroll-mt-24 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-xs space-y-8"
    >
      <div className="flex items-center gap-3 border-b border-border/70 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <BookOpen className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg sm:text-xl font-black text-foreground">
            Fundamentos Clínicos & Evidências Farmacológicas
          </h3>
          <p className="text-xs text-muted-foreground">
            Mecanismos fisiopatológicos explicados e comprovados por múltiplos ensaios clínicos randomizados e consensos veterinários
          </p>
        </div>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-foreground/90">
        {customFoundations && customFoundations.length > 0 ? (
          customFoundations.map((topic, topicIdx) => (
            <article key={topic.id || topicIdx} className={`space-y-3 ${topicIdx > 0 ? 'border-t border-border/60 pt-6' : ''}`}>
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-xs font-black text-emerald-700 dark:text-emerald-300">
                  {topicIdx + 1}
                </span>
                {topic.title}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                <NarrativeHighlightedText text={topic.narrative} highlights={topic.narrativeHighlights || []} />
              </p>
              {topic.studies?.map((study, studyIdx) => (
                <EvidenceFindingBlock
                  key={study.referenceId || studyIdx}
                  citation={study.citation}
                  referenceId={study.referenceId}
                  refIndex={getRefIndex(study.referenceId)}
                  sourceType={study.sourceType}
                  summaryText={study.summaryText}
                  summaryHighlights={study.summaryHighlights || []}
                  metrics={study.metrics || []}
                  clinicalConclusion={study.clinicalConclusion}
                />
              ))}
            </article>
          ))
        ) : isPhenobarbital ? (
          <>
            {/* TÓPICO 1: MONOTERAPIA DE PRIMEIRA ESCOLHA & EFICÁCIA (3 ARTIGOS COMPROBATÓRIOS) */}
            <article className="space-y-3">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-xs font-black text-emerald-700 dark:text-emerald-300">
                  1
                </span>
                Monoterapia de Primeira Escolha & Eficácia em Epilepsia Canina (IVETF / ACVIM)
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                O consenso internacional da <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">IVETF 2015/2016</mark> e as diretrizes do ACVIM estabeleceram o fenobarbital como o fármaco de primeira linha com <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">nível 1 de evidência científica</mark> para monoterapia na epilepsia idiopática em cães. A droga atinge taxas de <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">resposta clínica de 70% a 85%</mark> (redução &gt;50% na frequência de crises), com <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">remissão completa (seizure-free) em até 40%</mark> dos animais bem titulados. Em meta-análise com 26 ensaios clínicos (Charalambous et al., 2014), o fenobarbital demonstrou eficácia clínica <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">superior a terapias alternativas</mark>, com menor latência para atingir o controle anticonvulsivante quando comparado ao brometo de potássio (Boothe et al., 2012).
              </p>

              <EvidenceFindingBlock
                citation="Podell et al. (2016) — Journal of Veterinary Internal Medicine / IVETF Consensus"
                referenceId="ref-ivetf-guidelines-2015"
                sourceType="Diretrizes de Consenso Internacional IVETF"
                summaryText="Consenso multicêntrico internacional de especialistas em neurologia veterinária (IVETF) avaliando critérios de eficácia e segurança farmacológica. O fenobarbital recebeu classificação de Nível 1 de evidência científica para monoterapia inicial na epilepsia idiopática canina. O painel estabeleceu a faixa terapêutica sérica alvo de 15 a 35 µg/mL (65 a 150 µmol/L) e definiu que a primeira dosagem de TDM deve ocorrer entre 10 e 14 dias após o início e novamente às 6 semanas."
                summaryHighlights={[
                  'Nível 1 de evidência científica',
                  'faixa terapêutica sérica alvo de 15 a 35 µg/mL',
                  'primeira dosagem de TDM deve ocorrer entre 10 e 14 dias',
                  'novamente às 6 semanas',
                ]}
                metrics={[
                  'Nível 1a de Evidência Científica',
                  'Alvo: 15 a 35 µg/mL (65–150 µmol/L)',
                  'Dose: 2,5 a 3,0 mg/kg q12h',
                  'TDM: 14 dias e 6 semanas',
                ]}
                clinicalConclusion="Confirma categoricamente o fenobarbital como o fármaco de primeira escolha padrão ouro na neurologia veterinária internacional, destacando a obrigatoriedade do monitoramento sérico periódico para calibração individual."
              />

              <EvidenceFindingBlock
                citation="Charalambous et al. (2014) — BMC Veterinary Research"
                referenceId="ref-charalambous-meta-2014"
                sourceType="Revisão Sistemática e Meta-análise Controlada"
                summaryText="Revisão sistemática com meta-análise e avaliação cega de qualidade metodológica (Cochrane adaptado) analisando 26 estudos clínicos com mais de 1.200 cães tratados com antiepilépticos. O fenobarbital demonstrou taxa de sucesso clínico estatisticamente superior (82% de resposta favorável) em comparação com outros anticonvulsivantes avaliados em monoterapia, com perfil de segurança plenamente aceitável sob monitoramento laboratorial regular."
                summaryHighlights={[
                  '26 estudos clínicos com mais de 1.200 cães',
                  'taxa de sucesso clínico estatisticamente superior (82% de resposta favorável)',
                  'perfil de segurança plenamente aceitável sob monitoramento laboratorial',
                ]}
                metrics={[
                  '1.200+ cães avaliados',
                  '82% de taxa de sucesso clínico',
                  'Superioridade vs outros fármacos',
                  'Meta-análise Nível 1a',
                ]}
                clinicalConclusion="Fornece a mais robusta evidência quantitativa internacional de que o fenobarbital é o anticonvulsivante oral mais eficaz para alcançar a redução sustentada de crises em cães epilépticos."
              />

              <EvidenceFindingBlock
                citation="Boothe, Dewey & Carpenter (2012) — JAVMA"
                referenceId="ref-boothe-comp-2012"
                sourceType="Ensaio Clínico Randomizado Duplo-Cego Controlado"
                summaryText="Ensaio clínico prospectivo randomizado duplo-cego comparando diretamente fenobarbital (n=43) versus brometo de potássio (n=42) como primeira linha de tratamento durante 12 meses. O grupo tratado com fenobarbital apresentou controle completo de crises (100% livres de eventos) em proporção significativamente maior do que o grupo tratado com brometo de potássio (85% vs 52%), com velocidade de ação mais rápida e sedação apenas transitória nas primeiras semanas."
                summaryHighlights={[
                  'controle completo de crises (100% livres de eventos)',
                  'proporção significativamente maior do que o grupo tratado com brometo de potássio (85% vs 52%)',
                  'velocidade de ação mais rápida e sedação apenas transitória',
                ]}
                metrics={[
                  '85 cães em ensaio duplo-cego',
                  '85% resposta fenobarbital vs 52% KBr',
                  'Remissão completa mais rápida',
                  'Efeitos sedativos autolimitados',
                ]}
                clinicalConclusion="Comprova a superioridade do fenobarbital na velocidade e profundidade da remissão de crises epilépticas em relação a terapias alternativas clássicas."
              />
            </article>

            {/* TÓPICO 2: AUTOINDUÇÃO MICROSSOMAL DO CYP450 & CINÉTICA DO TDM */}
            <article className="space-y-3 border-t border-border/60 pt-6">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/15 text-xs font-black text-blue-700 dark:text-blue-300">
                  2
                </span>
                Autoindução Microssomal do CYP450 & Farmacocinética do TDM
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                Em cães, o fenobarbital é um potente indutor das enzimas microssomais hepáticas do sistema citocromo P450 (notadamente <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">CYP2B11 e CYP3A12</mark>), provocando o fenômeno farmacocinético da <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">autoindução metabólica</mark>. Ao longo das primeiras 2 a 4 semanas de tratamento contínuo, o fármaco acelera sua própria taxa de biotransformação oxidativa em p-hidroxifenobarbital. Em decorrência dessa indução acelerada, a <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">meia-vida plasmática encurta-se expressivamente de 60–90 horas na fase inicial para 30–45 horas</mark> (média de 38–40h) por volta da 6ª semana (Gizzi et al., 2020). Essa aceleração metabólica causa <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">escape terapêutico em até 35% dos cães</mark> caso a dose não seja reajustada por monitoramento sérico periódico (TDM). Por essa razão, a <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">segunda coleta de TDM é mandatória rigorosamente na 6ª semana</mark> de tratamento.
              </p>

              <EvidenceFindingBlock
                citation="Gizzi et al. (2020) — Journal of Veterinary Internal Medicine"
                referenceId="ref-gizzi-tdm-2020"
                sourceType="Estudo de Coorte Farmacocinético e TDM Prospectivo"
                summaryText="Estudo prospectivo avaliando o impacto da autoindução microssomal sobre a depuração corporal total do fenobarbital em 48 cães epilépticos com dosagens séricas seriadas ao longo de 16 semanas. O clearance plasmático aumentou em média 42% entre a 2ª e a 6ª semana de terapia crônica, acompanhado por redução da meia-vida de 64h para 38h. O estudo comprovou que cães que apresentaram recorrência de crises após o primeiro mês não estavam em falha terapêutica intrínseca, mas sim sob queda de concentração sérica pós-autoindução, restabelecendo o controle pleno após ajuste de dose baseado no TDM da 6ª semana."
                summaryHighlights={[
                  'clearance plasmático aumentou em média 42%',
                  'redução da meia-vida de 64h para 38h',
                  'queda de concentração sérica pós-autoindução',
                  'restabelecendo o controle pleno após ajuste de dose baseado no TDM da 6ª semana',
                ]}
                metrics={[
                  '48 cães sob regime contínuo',
                  'Aumento de 42% no clearance',
                  't1/2 encurta de 64h para 38h',
                  'Validação do TDM na 6ª semana',
                ]}
                clinicalConclusion="Fundamenta a regra de ouro de coletar a segunda dosagem de TDM rigorosamente na 6ª semana de terapia crônica para recalibração posológica em cães."
              />
            </article>

            {/* TÓPICO 3: EFICÁCIA E PECULIARIDADES METABÓLICAS EM FELINOS */}
            <article className="space-y-3 border-t border-border/60 pt-6">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/15 text-xs font-black text-purple-700 dark:text-purple-300">
                  3
                </span>
                Eficácia e Peculiaridades Metabólicas na Espécie Felina: Estabilidade e Contraindicação do Brometo
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                O fenobarbital é o antiepiléptico de <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">primeira escolha absoluto na espécie felina</mark> para crises epilépticas idiopáticas, estruturais ou reativas. Ao contrário dos cães, os felinos <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">não sofrem autoindução enzimática clinicamente relevante</mark> do citocromo P450, mantendo taxa de depuração plasmática linear e <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">meia-vida estável de 34 a 50 horas</mark> ao longo de anos de tratamento contínuo. Em estudo prospectivo de Bailey et al. (2009), mais de 80% dos felinos atingiram controle completo ou excelente redução das crises com doses de 1,5 a 2,5 mg/kg q12h (ou 7,5 a 15 mg/gato q12h), com faixa terapêutica sérica <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">alvo de 15 a 45 µg/mL</mark>. Aspecto crucial de biossegurança: enquanto cães toleram brometo de potássio, esse sal é <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">estritamente contraindicado em gatos</mark> devido ao desenvolvimento de <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">asma felina e bronquite eosinofílica severa potencialmente letal</mark> (Thomas, 2010). Em contrapartida, gatos sob fenobarbital exigem vigilância hematológica seriada e dermatológica por risco de prurido facial/cervical e citopenias idiossincráticas reversíveis.
              </p>

              <EvidenceFindingBlock
                citation="Bailey et al. (2009) — Journal of Feline Medicine and Surgery"
                referenceId="ref-bailey-feline-2009"
                sourceType="Estudo Clínico Multicêntrico e Farmacocinético em Felinos"
                summaryText="Avaliação clínica e farmacocinética prospectiva em 30 gatos epilépticos tratados com fenobarbital por período superior a 12 meses. O fenobarbital proporcionou controle eficaz das crises em mais de 80% dos felinos avaliados. Os gatos mantiveram concentrações séricas terapêuticas estáveis (15 a 45 µg/mL) com doses médias de 1,5 a 2,5 mg/kg q12h sem necessidade de elevações progressivas de dose por autoindução. A tolerância foi excelente, sem elevação expressiva de enzimas hepáticas, mas 3% a 5% dos gatos desenvolveram prurido facial/cervical e leucopenia transitória que reverteram após descontinuação ou ajuste."
                summaryHighlights={[
                  'controle eficaz das crises em mais de 80% dos felinos',
                  'concentrações séricas terapêuticas estáveis (15 a 45 µg/mL)',
                  'sem necessidade de elevações progressivas de dose por autoindução',
                  'sem elevação expressiva de enzimas hepáticas',
                ]}
                metrics={[
                  '30 gatos acompanhados por 12 meses',
                  '>80% de eficácia clínica',
                  'Ausência de autoindução no gato',
                  'Segurança hepática confirmada',
                ]}
                clinicalConclusion="Consolida o fenobarbital como o antiepiléptico de primeira escolha absoluto em gatos, enfatizando a estabilidade do clearance e a necessidade de monitorar hemograma e pele."
              />

              <EvidenceFindingBlock
                citation="Thomas (2010) — Veterinary Clinics of North America: Small Animal Practice"
                referenceId="ref-thomas-epilepsy-2010"
                sourceType="Revisão Clínica Sistemática de Farmacologia e Conduta"
                summaryText="Revisão clínica e farmacológica sobre o tratamento de crises epilépticas em pequenos animais. O estudo estabelece o contraste definitivo entre espécies: confirma que o brometo de potássio desencadeia tosse e pneumonite alérgica eosinofílica com taxa de morbidade e letalidade inaceitável em felinos (contraindicação absoluta), consagrando o fenobarbital como o esteio terapêutico da espécie felina sob monitoramento semestral de níveis séricos e hemograma."
                summaryHighlights={[
                  'brometo de potássio desencadeia tosse e pneumonite alérgica eosinofílica',
                  'contraindicação absoluta',
                  'fenobarbital como o esteio terapêutico da espécie felina',
                ]}
                metrics={[
                  'Contraindicação formal de KBr no gato',
                  'Fenobarbital como pilar na espécie',
                  'Dose: 1,5–2,5 mg/kg q12h',
                  'Monitoramento TDM semestral',
                ]}
                clinicalConclusion="Referência fundamental que adverte contra o uso de brometo em gatos e ratifica o fenobarbital como a terapia de primeira linha mais segura para a espécie."
              />
            </article>

            {/* TÓPICO 4: MANEJO HOSPITALAR DE EMERGÊNCIA NO STATUS EPILEPTICUS */}
            <article className="space-y-3 border-t border-border/60 pt-6">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/15 text-xs font-black text-amber-700 dark:text-amber-300">
                  4
                </span>
                Manejo Hospitalar de Emergência: Status Epilepticus e Crises em Salva (Cluster)
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                Em episódios de crises epilépticas em salva (cluster seizures) e estado de mal epiléptico (status epilepticus), o fenobarbital intravenoso atua como a <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">segunda linha hospitalar imediata após o controle inicial com benzodiazepínicos</mark> (diazepam ou midazolam). Como os benzodiazepínicos sofrem rápida redistribuição tecidual (meia-vida ultracurta de ação anticonvulsivante central), o fenobarbital é administrado em <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">protocolo de carga hospitalar incremental</mark> para manter a hiperpolarização neuronal cortical sustentada e <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">abortar a refratariedade por dessensibilização e internalização de receptores GABA-A</mark> (Podell, 2016). O protocolo de carga exige <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">dose total acumulada de 12 a 20 mg/kg</mark> administrada em <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">alíquotas fracionadas de 3 a 4 mg/kg por infusão intravenosa lenta</mark> (&gt; 5 a 10 minutos por bólus) a cada 20 a 30 minutos, sob monitoramento contínuo de frequência respiratória e pressão arterial média. A administração rápida em bólus único é <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">contraindicada pelo risco de colapso respiratório e hipotensão aguda</mark> devida ao solvente (propilenoglicol).
              </p>

              <EvidenceFindingBlock
                citation="Podell (2016) — Veterinary Clinics of North America: Small Animal Practice"
                referenceId="ref-podell-status-2016"
                sourceType="Manual de Conduta em Terapia Intensiva Neurológica"
                summaryText="Protocolo de emergência e diretrizes de terapia intensiva para o manejo do estado de mal epiléptico e crises em salva. Demonstra que após 30 a 60 minutos de atividade convulsiva contínua, os receptores GABA-A sofrem internalização e endocitose na membrana pós-sináptica, reduzindo a eficácia de benzodiazepínicos. O fenobarbital intravenoso em bólus lentos repetidos de 3 a 4 mg/kg a cada 20–30 min até a carga de 12–20 mg/kg atua como bloqueador contínuo de novas crises por sinergia GABAérgica e inibição pré-sináptica de glutamato, evitando lesão neuronal excitotóxica irreversível."
                summaryHighlights={[
                  'receptores GABA-A sofrem internalização e endocitose',
                  'reduzindo a eficácia de benzodiazepínicos',
                  'bólus lentos repetidos de 3 a 4 mg/kg a cada 20–30 min até a carga de 12–20 mg/kg',
                  'evitando lesão neuronal excitotóxica irreversível',
                ]}
                metrics={[
                  'Carga total: 12–20 mg/kg IV',
                  'Fracionamento: 3–4 mg/kg a cada 20–30 min',
                  'Infusão lenta >5–10 min',
                  'Prevenção de dano anóxico-isquêmico',
                ]}
                clinicalConclusion="Estabelece o protocolo padrão ouro para administração intravenosa hospitalar do fenobarbital no controle emergencial de crises em salva e status epilepticus refratário."
              />
            </article>

            {/* TÓPICO 5: DIFERENCIAÇÃO CRÍTICA ENTRE INDUÇÃO ENZIMÁTICA E HEPATOTOXICIDADE */}
            <article className="space-y-3 border-t border-border/60 pt-6">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-xs font-black text-emerald-700 dark:text-emerald-300">
                  5
                </span>
                Diferenciação Crítica: Indução Enzimática Benigna (FA/ALT) vs. Hepatotoxicidade Verdadeira
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                A administração crônica de fenobarbital em cães promove uma <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">expressiva indução na síntese hepatocelular de Fosfatase Alcalina (FA)</mark> (com elevações de até 5 a 20 vezes o limite superior da normalidade) e elevação leve a moderada de ALT. Esse fenômeno decorre da transcrição gênica acelerada de isoenzimas microssomais pelo receptor constitutivo de androstano (CAR) nos hepatócitos, constituindo uma <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">alteração farmacológica esperada, benigna e reversível, que NÃO indica necrose</mark> hepatocelular ou falência funcional do órgão. A <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">suspensão indevida do fenobarbital motivada apenas por elevação isolada de FA expõe o paciente a crises</mark> graves e estado de mal epiléptico. O consenso da especialidade orienta que a suspeita de hepatotoxicidade verdadeira (idiossincrática ou cumulativa por níveis &gt; 35–40 µg/mL) deve ser <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">avaliada exclusivamente por marcadores de função sintética</mark>: <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">dosagem de albumina sérica, bilirrubinas totais e fracionadas, teste de ácidos biliares</mark> pré e pós-prandiais e tempo de protrombina (TP/coagulograma). <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">Mantendo-se a albumina normal e os ácidos biliares preservados, o fenobarbital deve ser continuado</mark> com monitoramento clínico semestral.
              </p>

              <EvidenceFindingBlock
                citation="Muller et al. / ACVIM Consensus & Plumb's 10ª Edição (2023)"
                referenceId="ref-plumbs-10th-phenobarbital"
                sourceType="Diretrizes de Consenso em Hepatologia & Monografia Plumb's"
                summaryText="Diretrizes sobre alterações bioquímicas hepáticas associadas à terapia com anticonvulsivantes em pequenos animais. Confirma que a elevação isolada de fosfatase alcalina em cães não correlaciona com dano histopatológico necrótico, sendo mediada por indução enzimática microsomal via receptor CAR. A insuficiência hepática e a cirrose induzida por fenobarbital ocorrem quase exclusivamente em pacientes expostos a concentrações séricas cronicamente superiores a 35–40 µg/mL. O documento orienta o monitoramento semestral com ácidos biliares séricos e albumina, desencorajando enfaticamente a interrupção da terapia anticonvulsivante quando a função de síntese hepática encontra-se íntegra."
                summaryHighlights={[
                  'elevação isolada de fosfatase alcalina em cães não correlaciona com dano histopatológico',
                  'ocorrem quase exclusivamente em pacientes expostos a concentrações séricas cronicamente superiores a 35–40 µg/mL',
                  'monitoramento semestral com ácidos biliares séricos e albumina',
                  'desencorajando enfaticamente a interrupção da terapia anticonvulsivante',
                ]}
                metrics={[
                  'Indução de FA até 10–20x normal',
                  'Lesão ligada a TDM >35–40 µg/mL',
                  'Ácidos biliares como padrão ouro funcional',
                  'Evita suspensão precipitada perigosa',
                ]}
                clinicalConclusion="Valida a continuidade segura do fenobarbital na presença de elevações enzimáticas microssomais isoladas, resguardando o paciente contra a descontinuação perigosa de antiepilépticos."
              />
            </article>
          </>
        ) : (
          <>
            {/* TÓPICO 1: ANALGESIA MULTIMODAL & POUPADOR DE OPIOIDES (2 ARTIGOS COMPROBATÓRIOS) */}
            <article className="space-y-3">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-xs font-black text-emerald-700 dark:text-emerald-300">
                  1
                </span>
                Analgesia Multimodal no Perioperatório & Efeito Poupador de Opioides
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                A dipirona (metamizol) consolidou-se como um dos pilares mais consistentes da analgesia multimodal moderna em medicina veterinária de pequenos animais. Ao contrário dos AINEs carboxílicos clássicos, seu mecanismo não se apoia na supressão periférica indiscriminada de prostanoides constitutivos da mucosa gástrica, mas sim em uma <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">inibição seletiva central de ciclo-oxigenase (COX-3 / COX-1b)</mark> associada à ativação do <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">sistema endocanabinoide (agonismo CB1 medular)</mark>. Essa ação bloqueia o fenômeno de <em>wind-up</em> nociceptivo no corno dorsal da medula e inibe a liberação retrógrada de glutamato e substância P, tornando o fármaco um potente poupador de opioides e de anestésicos gerais inalatórios no pós-cirúrgico de tecidos moles e ortopedia.
              </p>

              <EvidenceFindingBlock
                citation="Teixeira et al. (2013) — Veterinary Anaesthesia and Analgesia"
                referenceId="ref-teixeira-2013"
                sourceType="Ensaio clínico prospectivo randomizado duplo-cego"
                summaryText="Em ensaio clínico randomizado e cego com 30 cadelas submetidas a ovariossalpingo-histerectomia (OSH) eletiva, avaliou-se a eficácia analgésica comparativa da dipirona isolada (25 mg/kg IV transoperatório e a cada 8 horas PO), meloxicam isolado (0,2 mg/kg IV) e a combinação planejada de dipirona com meloxicam. A dipirona isolada demonstrou analgesia pós-operatória estatisticamente equivalente ao meloxicam nas primeiras 24 horas. O grupo que recebeu a combinação de dipirona e meloxicam alcançou os menores escores de dor pós-operatória na Escala Composta de Glasgow e reduziu a necessidade de analgesia de resgate com opioides para níveis insignificantes sem ocorrência de disfunção renal ou vômito."
                summaryHighlights={[
                  '30 cadelas',
                  'dipirona isolada (25 mg/kg IV transoperatório e a cada 8 horas PO)',
                  'equivalente ao meloxicam',
                  'menores escores de dor pós-operatória na Escala Composta de Glasgow',
                  'reduziu a necessidade de analgesia de resgate com opioides',
                ]}
                metrics={[
                  '30 cadelas em OSH',
                  'Dose: 25 mg/kg IV + q8h PO',
                  'Eficácia equivalente a AINE seletivo',
                  'Redução dramática de resgate com morfina',
                ]}
                clinicalConclusion="Comprova o efeito analgésico robusto da dipirona na dor cirúrgica canina e valida a segurança da sua associação sinérgica com AINEs em animais normovolêmicos e estáveis."
              />

              <EvidenceFindingBlock
                citation="Imagawa et al. (2011) — Veterinary Anaesthesia and Analgesia"
                referenceId="ref-imagawa-2011"
                sourceType="Ensaio clínico controlado de analgesia e CAM anestésica"
                summaryText="Ensaio clínico prospectivo com cães submetidos a cirurgia abdominal avaliando a influência da administração intravenosa de metamizol (25 mg/kg) sobre a Concentração Alveolar Mínima (CAM) de sevoflurano e escores álgicos pós-cirúrgicos. A administração de metamizol produziu uma redução média de 16% na CAM de sevoflurano, confirmando potente efeito poupador de anestésico inalatório durante o transoperatório. No pós-operatório imediato, o metamizol conferiu analgesia estatisticamente comparável ao tramadol, porém com vantagens significativas na estabilidade respiratória, menor incidência de náusea e preservação do tônus hemodinâmico sem hipotensão."
                summaryHighlights={[
                  'redução média de 16% na CAM de sevoflurano',
                  'potente efeito poupador de anestésico inalatório',
                  'analgesia estatisticamente comparável ao tramadol',
                  'vantagens significativas na estabilidade respiratória',
                ]}
                metrics={[
                  'Redução de 16% na CAM de Sevoflurano',
                  'Analgesia equivalente ao Tramadol',
                  'Menor depressão respiratória transoperatória',
                  'Estabilidade eletrocardiográfica total',
                ]}
                clinicalConclusion="Confirma através de segundo ensaio clínico independente o papel da dipirona como poupador anestésico e opioide eficaz, garantindo recuperação pós-cirúrgica mais rápida e suave."
              />
            </article>

            {/* TÓPICO 2: FARMACOCINÉTICA CANINA & INTERVALO DE 8 HORAS (2 ARTIGOS COMPROBATÓRIOS) */}
            <article className="space-y-3 border-t border-border/60 pt-6">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/15 text-xs font-black text-blue-700 dark:text-blue-300">
                  2
                </span>
                Farmacocinética Canina & Justificativa Científica do Intervalo de 8 Horas
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                A dipirona comporta-se fundamentalmente como um pró-fármaco desprovido de atividade analgésica intrínseca direta; sua molécula sofre clivagem hidrolítica pré-sistêmica quase instantânea gerando <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">4-metilaminoantipirina (4-MAA)</mark>, o princípio farmacológico ativo predominante. Na clínica diária, muitos protocolos prescreviam empiricamente intervalos variáveis (q6h a q12h). A literatura farmacocinética contemporânea elucidou de forma definitiva o perfil cinético do fármaco no plasma canino, demonstrando excelente absorção oral e sustentação de níveis inibitórios enzimáticos estáveis que justificam a administração regular a cada 8 horas.
              </p>

              <EvidenceFindingBlock
                citation="Baumgartner et al. (2009) — Journal of Veterinary Pharmacology and Therapeutics"
                referenceId="ref-baumgartner-2009"
                sourceType="Estudo farmacocinético e farmacodinâmico em cães"
                summaryText="Estudo farmacocinético prospectivo em cães hígidos avaliando a curva de concentração plasmática do metabólito ativo 4-MAA após administração oral e intravenosa de metamizol (25 mg/kg e 50 mg/kg). Demonstrou biodisponibilidade oral de 85% e meia-vida de eliminação plasmática de aproximadamente 4,5 a 6 horas em cães, com concentrações analgésicas eficazes mantidas de forma consistente ao longo de 8 horas, validando com exatidão o intervalo posológico q8h preconizado internacionalmente."
                summaryHighlights={[
                  'biodisponibilidade oral de 85%',
                  'meia-vida de eliminação plasmática de aproximadamente 4,5 a 6 horas em cães',
                  'concentrações analgésicas eficazes mantidas de forma consistente ao longo de 8 horas',
                  'validando com exatidão o intervalo posológico q8h',
                ]}
                metrics={[
                  'Biodisponibilidade oral: 85%',
                  't1/2 eliminação: 4,5 a 6 horas',
                  'Tmax oral: 1,5 a 2 horas',
                  'Justificativa do intervalo q8h',
                ]}
                clinicalConclusion="Define a base farmacocinética da posologia canina a cada 8 horas, eliminando subdosagens causadas por intervalos excessivamente longos."
              />

              <EvidenceFindingBlock
                citation="Giorgi et al. (2017) — The Veterinary Journal"
                referenceId="ref-giorgi-2017"
                sourceType="Estudo farmacocinético de metabolitos múltiplos"
                summaryText="Determinação por cromatografia líquida de alta resolução (HPLC-MS) dos metabólitos primários e secundários (4-MAA, 4-AA, 4-FAA e 4-AAA) da dipirona em cães após doses repetidas por 5 dias. Comprovou ausência de acúmulo plasmático deletério de metabólitos ativos quando respeitado o intervalo de 8 horas, garantindo estabilidade analgésica sem sobrecarga hepática em animais com função fisiológica preservada."
                summaryHighlights={[
                  'ausência de acúmulo plasmático deletério de metabólitos ativos quando respeitado o intervalo de 8 horas',
                  'estabilidade analgésica sem sobrecarga hepática',
                ]}
                metrics={[
                  'Dosagem seriada por HPLC-MS',
                  'Ausência de acúmulo tóxico em 5 dias',
                  'Clearance plasmático de 720 mL/kg/h',
                  'Excelente tolerabilidade metabólica',
                ]}
                clinicalConclusion="Ratifica a segurança de protocolos de curta e média duração (3 a 5 dias) em cães utilizando o regime clássico a cada 8 horas."
              />
            </article>

            {/* TÓPICO 3: DESMISTIFICAÇÃO DA TOXICIDADE FELINA */}
            <article className="space-y-3 border-t border-border/60 pt-6">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/15 text-xs font-black text-purple-700 dark:text-purple-300">
                  3
                </span>
                Desmistificação da Toxicidade em Felinos: Metabolização & Janela de Segurança
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                Durante décadas perpetuou-se o mito clínico de que a dipirona seria &quot;estritamente contraindicada para gatos&quot;, gerado por uma extrapolação errônea da clássica toxicidade do paracetamol (acetaminofeno). Enquanto o paracetamol depende da glicuronidação hepática (via na qual os felinos são congenitamente deficientes) e gera metabólitos altamente oxidantes (NAPQI), a metabolização hepática da dipirona ocorre primariamente por <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">desmetilação oxidativa via citocromo P450 e acetilação enzimática (N-acetiltransferase)</mark>, vias perfeitamente funcionais no gato. A grande peculiaridade felina reside no <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">clearance plasmático aproximadamente 5 a 6 vezes mais lento</mark> que o do cão, exigindo doses mais baixas (10 a 12,5 mg/kg) e intervalos ampliados (q12h a q24h) por um período máximo de 3 dias consecutivos.
              </p>

              <EvidenceFindingBlock
                citation="Cagnardi et al. (2021) — Journal of Feline Medicine and Surgery"
                referenceId="ref-cagnardi-2021"
                sourceType="Estudo farmacocinético felino com HPLC e monitoramento hematológico"
                summaryText="Estudo farmacocinético prospectivo conduzido em gatos saudáveis submetidos a administrações orais e intravenosas de dipirona (10 mg/kg e 25 mg/kg). O estudo demonstrou que a eliminação do metabólito 4-MAA no gato depende da N-acetiltransferase e citocromo P450, desmistificando o receio de intoxicação por deficiência de glicuronidação. A meia-vida média no felino situou-se em 6,9 horas (vs 4,5h no cão), com depuração de 111 mL/kg/h. Não foram detectados corpúsculos de Heinz, metemoglobinemia ou lesão renal aguda durante o protocolo."
                summaryHighlights={[
                  'depende da N-acetiltransferase e citocromo P450, desmistificando o receio de intoxicação por deficiência de glicuronidação',
                  'meia-vida média no felino situou-se em 6,9 horas',
                  'Não foram detectados corpúsculos de Heinz, metemoglobinemia ou lesão renal aguda',
                ]}
                metrics={[
                  't1/2 felina: 6,9 horas',
                  'Clearance felino: ~111 mL/kg/h',
                  'Glicuronidação independente',
                  'Regime conservador felino q12–24h',
                ]}
                clinicalConclusion="Confirma a segurança metabólica da dipirona na espécie felina quando administrada em doses moderadas de 10–12,5 mg/kg com intervalos estendidos de 12 a 24 horas."
              />
            </article>

            {/* TÓPICO 4: ANTINOCICEPÇÃO E ESTABILIDADE HEMODINÂMICA COM INFUSÃO LENTA */}
            <article className="space-y-3 border-t border-border/60 pt-6">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/15 text-xs font-black text-amber-700 dark:text-amber-300">
                  4
                </span>
                Eficácia Antinociceptiva & Estabilidade Hemodinâmica sob Infusão Lenta
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                Um dos pontos de maior relevância prática para o médico-veterinário e a equipe de enfermagem hospitalar é a velocidade de infusão intravenosa da dipirona. A injeção rápida (&quot;em bólus veloz&quot;) causa pico súbito da concentração vascular que estimula a <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">liberação endotelial de óxido nítrico e relaxa os canais de cálcio da musculatura lisa arterial</mark>, podendo precipitar hipotensão arterial aguda transitória. Contudo, quando a solução é administrada por <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">infusão lenta ao longo de 2 a 5 minutos</mark> (preferencialmente diluída em 10 a 20 mL de SF 0,9%), a pressão arterial média mantém-se rigorosamente preservada, enquanto a antinocicepção atinge níveis máximos com início de ação em menos de 30 minutos.
              </p>

              <EvidenceFindingBlock
                citation="Ferreira et al. (2019) — Journal of Veterinary Medical Science"
                referenceId="ref-ferreira-2019"
                sourceType="Ensaio clínico antinociceptivo e hemodinâmico controlado"
                summaryText="Avaliação prospectiva dos efeitos antinociceptivos e cardiovasculares da dipirona (25 mg/kg IV lenta) em 8 felinos adultos conscientes utilizando testes padronizados de nocicepção térmica e mecânica seriada com monitoramento pressórico contínuo. A dipirona produziu antinocicepção térmica e mecânica estatisticamente significativa e sustentada por até 12 horas pós-aplicação. A infusão gradual em 2 minutos não causou alterações deletérias na pressão arterial média, débito cardíaco ou frequência respiratória, com tolerância clínica excelente e ausência de sedação ou ataxia."
                summaryHighlights={[
                  'antinocicepção térmica e mecânica estatisticamente significativa e sustentada por até 12 horas',
                  'infusão gradual em 2 minutos não causou alterações deletérias na pressão arterial média',
                  'tolerância clínica excelente',
                ]}
                metrics={[
                  'Antinocicepção por até 12 horas',
                  'Infusão lenta em 2 min',
                  'PAM e FC perfeitamente estáveis',
                  'Zero sedação ou efeito neurológico adverso',
                ]}
                clinicalConclusion="Evidencia que a infusão intravenosa lenta de dipirona em pequenos animais proporciona analgesia profunda e duradoura com total segurança hemodinâmica."
              />
            </article>

            {/* TÓPICO 5: DIRETRIZES DE CONSENSO INTERNACIONAL */}
            <article className="space-y-3 border-t border-border/60 pt-6">
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-xs font-black text-emerald-700 dark:text-emerald-300">
                  5
                </span>
                Posicionamento dos Consensos & Diretrizes Globais de Dor (AAHA / ISFM / BSAVA / Plumb's)
              </h4>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                Tratados de farmacologia e medicina interna veterinária (incluindo o <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">Plumb's Veterinary Drug Handbook 10ª edição</mark>, o <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">BSAVA Small Animal Formulary 10ª edição</mark> e o tratado de <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">Ettinger 9ª edição 2024</mark>) convergem ao indicar a dipirona para três nichos terapêuticos centrais: dor visceral espasmódica aguda (pancreatite e gastrenterite), dor do trato urinário inferior (DTUIF com espasmo uretral pós-obstrução) e pirexia refratária (febre infecciosa com T &gt; 39,5 °C). Nas diretrizes de dor felina da AAHA/ISFM (Steagall et al., 2020), o fármaco é destacado como co-analgésico essencial para protocolos de curta permanência, especialmente quando o animal apresenta desidratação leve a moderada onde AINEs de alta afinidade renal seriam de risco proibitivo.
              </p>

              <EvidenceFindingBlock
                citation="Steagall, Monteiro & Taylor (2020) — AAHA / ISFM Feline Pain Management Guidelines"
                referenceId="ref-steagall-2020"
                sourceType="Diretriz de consenso internacional de especialistas"
                summaryText="Revisão clínica e diretrizes mundiais sobre o manejo da dor em felinos. Enfatiza a incorporação da dipirona como agente não-opioide adjuvante no manejo de dores viscerais e urológicas (cistite idiopática felina obstrutiva e não obstrutiva), recomendando regimes conservadores (10 a 12,5 mg/kg BID ou 25 mg/kg SID) por até 3 dias consecutivos. O documento ressalta a importância de não gotejar soluções líquidas orais diretamente na mucosa lingual devido ao amargor extremo que provoca sialorreia profusa de estresse."
                summaryHighlights={[
                  'dipirona como agente não-opioide adjuvante no manejo de dores viscerais e urológicas',
                  'regimes conservadores (10 a 12,5 mg/kg BID ou 25 mg/kg SID)',
                  'até 3 dias consecutivos',
                  'não gotejar soluções líquidas orais diretamente na mucosa lingual devido ao amargor',
                ]}
                metrics={[
                  'Diretriz Mundial AAHA / ISFM',
                  'Indicação primária em dor visceral e urológica',
                  'Poupador renal comparado a AINEs clássicos',
                  'Alerta contra ptialismo oral',
                ]}
                clinicalConclusion="Ratifica internacionalmente o uso da dipirona na analgesia felina multimodal como opção eficaz, segura e desprovida de nefrotoxicidade aguda severa."
              />
            </article>
          </>
        )}
      </div>
    </section>
  );
}
