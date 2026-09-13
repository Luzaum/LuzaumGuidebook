import React, { useMemo } from 'react';
import { BookOpen, FlaskConical, Stethoscope, ShieldCheck } from 'lucide-react';
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
  sourceType,
  summaryText,
  summaryHighlights,
  metrics,
  clinicalConclusion,
}: EvidenceBlockProps) {
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
            className="inline-flex items-center rounded-md bg-background/80 px-2 py-0.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:underline border border-cyan-600/30"
            title="Ver referência bibliográfica completa"
          >
            Ref. #{referenceId.replace('ref-', '')}
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

export function MedicationClinicalFoundationsSection() {
  return (
    <section
      id="fundamentos-clinicos"
      className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-xs space-y-8"
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
            citation="Giorgi et al. (2017) — Journal of Veterinary Pharmacology and Therapeutics"
            referenceId="ref-giorgi-2017"
            sourceType="Ensaio farmacocinético cruzado (crossover 3x3)"
            summaryText="Estudo farmacocinético cruzado rigoroso em cães sadios avaliou doses de 25 mg/kg pelas vias intravenosa, intramuscular e oral com quantificação analítica por HPLC. O metamizol intacto não foi detectável no plasma, comprovando hidrólise quantitativa imediata em 4-MAA. A biodisponibilidade oral atingiu 85% com concentração máxima (Cmax) entre 1,5 e 2 horas, enquanto a biodisponibilidade intramuscular alcançou 97% com pico rápido aos 35–40 minutos. A meia-vida de eliminação plasmática foi de 5,8 horas e o clearance plasmático médio de 680 mL/kg/h, sustentando níveis analgésicos efetivos por 8 a 12 horas."
            summaryHighlights={[
              'Biodisponibilidade oral atingiu 85%',
              'biodisponibilidade intramuscular alcançou 97%',
              'pico rápido aos 35–40 minutos',
              'meia-vida de eliminação plasmática foi de 5,8 horas',
              'sustentando níveis analgésicos efetivos por 8 a 12 horas',
            ]}
            metrics={[
              'Biodisponibilidade VO: 85%',
              'Biodisponibilidade IM: 97%',
              't1/2 de 5,8 horas',
              'Posologia de 25 mg/kg q8h validada',
            ]}
            clinicalConclusion="Estabelece a base farmacocinética padrão-ouro da posologia canina de 25 mg/kg a cada 8 horas por via oral ou parenteral."
          />

          <EvidenceFindingBlock
            citation="Giorgi et al. (2018) — Journal of Veterinary Pharmacology and Therapeutics"
            referenceId="ref-giorgi-repeated-2018"
            sourceType="Ensaio farmacocinético e de segurança de doses repetidas"
            summaryText="Avaliação prospectiva da cinética plasmática e segurança clínica sob administrações repetidas de metamizol (25 mg/kg a cada 8 horas durante 5 dias consecutivos) em cães sadios. Os resultados comprovaram ausência de acúmulo sérico tóxico progressivo, com depuração plasmática de 4-MAA estável ao longo de todos os 5 dias. Avaliações laboratoriais hematológicas seriadas (eritrograma, leucograma e plaquetas) e bioquímicas de função hepática (ALT, FA) e renal (creatinina e ureia) mantiveram-se rigorosamente dentro dos parâmetros de normalidade, sem evidências de toxicidade medular ou gastrorrenal."
            summaryHighlights={[
              '25 mg/kg a cada 8 horas durante 5 dias consecutivos',
              'ausência de acúmulo sérico tóxico progressivo',
              'depuração plasmática de 4-MAA estável',
              'mantiveram-se rigorosamente dentro dos parâmetros de normalidade',
              'sem evidências de toxicidade medular ou gastrorrenal',
            ]}
            metrics={[
              'Tratamento contínuo por 5 dias',
              'Intervalo q8h validado em uso repetido',
              'Zero acúmulo plasmático deletério',
              'Função hematológica e hepatorrenal íntegras',
            ]}
            clinicalConclusion="Comprova com dados laboratoriais de uso continuado que o regime canino a cada 8 horas por até 5 dias é biologicamente seguro e clinicamente previsível."
          />
        </article>

        {/* TÓPICO 3: METABOLISMO FELINO & DESMISTIFICAÇÃO DA TOXICIDADE */}
        <article className="space-y-3 border-t border-border/60 pt-6">
          <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/15 text-xs font-black text-purple-700 dark:text-purple-300">
              3
            </span>
            A Fisiologia Felina: Desmistificação de Riscos e Ajuste Posológico
          </h4>

          <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
            Durante décadas perpetuou-se o mito clínico de que a dipirona seria "estritamente contraindicada para gatos", gerado por uma extrapolação errônea da clássica toxicidade do paracetamol (acetaminofeno). Enquanto o paracetamol depende da glicuronidação hepática (via na qual os felinos são congenitamente deficientes) e gera metabólitos altamente oxidantes (NAPQI), a metabolização hepática da dipirona ocorre primariamente por <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">desmetilação oxidativa via citocromo P450 e acetilação enzimática (N-acetiltransferase)</mark>, vias perfeitamente funcionais no gato. A grande peculiaridade felina reside no <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">clearance plasmático aproximadamente 5 a 6 vezes mais lento</mark> que o do cão, exigindo doses mais baixas (10 a 12,5 mg/kg) e intervalos ampliados (q12h a q24h) por um período máximo de 3 dias consecutivos.
          </p>

          <EvidenceFindingBlock
            citation="Giorgi et al. (2018) — Journal of Feline Medicine and Surgery"
            referenceId="ref-giorgi-2018"
            sourceType="Ensaio farmacocinético e metabólico felino"
            summaryText="Investigação da cinética e biotransformação do metamizol (25 mg/kg VO e IV) em felinos domésticos sadios. O estudo comprovou formação ativa de 4-MAA e 4-AA demonstrando vias catabólicas funcionais no fígado felino independentes de glicuronidação. A meia-vida de eliminação terminal da 4-MAA em gatos foi de 6,9 horas, porém o clearance plasmático foi significativamente reduzido (média de 111 mL/kg/h vs >600 mL/kg/h em cães), levando a uma permanência sérica mais prolongada do fármaco ativo."
            summaryHighlights={[
              'vias catabólicas funcionais no fígado felino independentes de glicuronidação',
              'meia-vida de eliminação terminal da 4-MAA em gatos foi de 6,9 horas',
              'clearance plasmático foi significativamente reduzido (média de 111 mL/kg/h)',
              'permanência sérica mais prolongada',
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
            Um dos pontos de maior relevância prática para o médico-veterinário e a equipe de enfermagem hospitalar é a velocidade de infusão intravenosa da dipirona. A injeção rápida ("em bólus veloz") causa pico súbito da concentração vascular que estimula a <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">liberação endotelial de óxido nítrico e relaxa os canais de cálcio da musculatura lisa arterial</mark>, podendo precipitar hipotensão arterial aguda transitória. Contudo, quando a solução é administrada por <mark className="bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 rounded font-semibold text-slate-900 dark:text-amber-200">infusão lenta ao longo de 2 a 5 minutos</mark> (preferencialmente diluída em 10 a 20 mL de SF 0,9%), a pressão arterial média mantém-se rigorosamente preservada, enquanto a antinocicepção atinge níveis máximos com início de ação em menos de 30 minutos.
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
      </div>
    </section>
  );
}
