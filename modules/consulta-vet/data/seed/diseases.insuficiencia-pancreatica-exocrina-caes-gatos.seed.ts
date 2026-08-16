import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Insuficiência pancreática exócrina (IPE/EPI) — síntese editorial Vetius.
 * Prioridade de fontes: Cridge et al. 2024 > Texas A&M GI Lab 2024 > Steiner, Merck 2025 > estudos primários (Chang 2022/2024, Xenoulis 2016, Soetart 2019).
 */
export const insuficienciaPancreaticaExocrinaCaesGatosRecord: DiseaseRecord = {
  id: 'disease-insuficiencia-pancreatica-exocrina-caes-gatos',
  slug: 'insuficiencia-pancreatica-exocrina-caes-gatos',
  title: 'Insuficiência pancreática exócrina (IPE/EPI)',
  synonyms: [
    'IPE',
    'EPI',
    'Exocrine pancreatic insufficiency',
    'Insuficiência exócrina do pâncreas',
    'Atrofia acinar pancreática',
    'PAA',
    'Pancreatic acinar atrophy',
  ],
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  tags: [
    'TLI',
    'cTLI',
    'fTLI',
    'PERT',
    'Cobalamina',
    'B12',
    'PAA',
    'Pancreatite crônica',
    'Maldigestão',
    'Malabsorção',
    'Texas A&M',
    'GI Lab',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['insuficiencia-pancreatica-exocrina-caes-gatos'],
  quickSummary:
    'A insuficiência pancreática exócrina (IPE/EPI) é síndrome de maldigestão/malabsorção por perda de massa acinar funcional — sinais clássicos incluem perda de peso e diarreia volumosa; cães frequentemente apresentam polifagia, enquanto gatos podem manter apetite normal (Xenoulis et al., 2016). O diagnóstico padrão-ouro é TLI sérico específico por espécie: cTLI ≤5,5 µg/L (Texas A&M GI Lab, março 2024; cutoff ≤2,5 µg/L está desatualizado) e fTLI ≤8 µg/L (Steiner, Merck 2025). Tratamento vitalício: terapia de reposição enzimática pancreática (PERT) em toda refeição + cobalamina (suplementar sempre que baixa ou empiricamente) + dieta individualizada — dieta universalmente hipolipídica não é necessária (Cridge et al., 2024). Prognóstico geralmente bom com adesão terapêutica (Cridge et al., 2024; Steiner, Merck 2025).',
  quickDecisionStrip: [
    'Suspeitar insuficiência pancreática exócrina (IPE) em cão com perda de peso + polifagia + fezes volumosas/malformadas — triagem inicial com hemograma, bioquímica e imunorreatividade tipo tripsina (TLI).',
    'Gatos podem não ter polifagia: perda de peso + diarreia/anorexia/lethargia bastam para incluir IPE no diferencial (Xenoulis et al., 2016).',
    'Imunorreatividade tipo tripsina canina (cTLI) ≤5,5 µg/L ou imunorreatividade tipo tripsina felina (fTLI) ≤8 µg/L confirma IPE — usar laboratório com imunoensaio validado por espécie (Texas A&M GI Lab, 2024; Steiner, Merck 2025).',
    'Cutoff de cTLI ≤2,5 µg/L está desatualizado após shift de ensaio Siemens — não usar referência antiga (Texas A&M GI Lab, março 2024).',
    'Terapia de reposição enzimática pancreática (PERT) em TODA refeição — misturar enzima à comida; pré-incubação não é necessária (Steiner, Merck 2025). Dose inicial: ~1 colher de chá/10 kg (cães) ou ~1 colher de chá/gato.',
    'Medir cobalamina no diagnóstico; suplementar cobalamina (B12) sempre que baixa — hipocobalaminemia piora prognóstico e resposta (Soetart et al., 2019; Xenoulis et al., 2016).',
    'Cobalamina (B12) oral é eficaz — não restringir a via parenteral (Chang et al., 2022 em cães; Chang et al., 2024 em gatos).',
    'Dieta hipolipídica universal NÃO é obrigatória — preferir dieta de baixo resíduo com teor moderado de gordura conforme tolerância (Cridge et al., 2024).',
    'Antibióticos de rotina NÃO são indicados — tilosina só após otimização de PERT + cobalamina + dieta em casos refratários (Cridge et al., 2024).',
    'Lipase pancreática canina/felina (cPLI/fPLI) avaliam pancreatite, não IPE — não substituem TLI para diagnóstico de insuficiência exócrina.',
    'Elastase fecal canina tem sensibilidade/especificidade inferiores ao TLI — não usar como teste primário (Cridge et al., 2024).',
    'PCR/fezes e coproparasitológico não diagnosticam IPE — úteis para comorbidades, não para TLI.',
  ],
  quickSummaryRich: {
    lead:
      'Insuficiência pancreática exócrina (IPE) não é “diarreia crônica sem causa”. Pergunte: há perda de peso desproporcional, fezes volumosas e imunorreatividade tipo tripsina (TLI) baixa em jejum de 12–18 h? O erro mais caro é usar cutoff antigo (≤2,5 µg/L), omitir cobalamina ou iniciar dieta hipolipídica rígida antes de terapia de reposição enzimática pancreática (PERT) adequada — enquanto se confunde pancreatite aguda (cPLI/fPLI) com insuficiência exócrina (TLI).',
    leadHighlights: ['TLI', '≤5,5 µg/L', 'PERT', 'cobalamina', 'polifagia'],
    pillars: [
      {
        title: 'Diagnóstico por imunorreatividade tipo tripsina (TLI)',
        body:
          'Imunorreatividade tipo tripsina (TLI) sérica reflete massa acinar funcional — padrão-ouro por espécie. Imunorreatividade tipo tripsina canina (cTLI) ≤5,5 µg/L (Texas A&M, 2024) ou imunorreatividade tipo tripsina felina (fTLI) ≤8 µg/L confirmam insuficiência pancreática exócrina (IPE) após jejum 12–18 h. Faixa 5,6–7,5 µg/L: trial de terapia de reposição enzimática pancreática (PERT) se clínica compatível; repetir TLI em 1–2 meses (Texas A&M GI Lab, 2024; Cridge et al., 2024).',
        highlights: ['cTLI ≤5,5', 'fTLI ≤8', 'jejum 12–18 h', 'padrão-ouro'],
      },
      {
        title: 'Tratamento PERT + cobalamina',
        body:
          'Terapia de reposição enzimática pancreática (PERT) vitalícia em cada refeição (~1 tsp/10 kg cães; ~1 tsp/gato) + cobalamina (cães 25 µg/kg SC q7d ou VO q24h; gatos 250 µg VO q24h ou SC semanal — Chang et al., 2022/2024). Dieta de baixo resíduo, gordura moderada conforme tolerância (Cridge et al., 2024).',
        highlights: ['PERT', 'cobalamina', 'baixo resíduo', 'vitalício'],
      },
      {
        title: 'Cão × Gato',
        body:
          'Cães: atrofia acinar pancreática (PAA) em Pastor Alemão/Collie (1–4 anos), polifagia clássica. Gatos: pancreatite crônica terminal mais comum; 91% perda de peso, apenas 42% polifagia, 77% cobalamina (B12) baixa (Xenoulis et al., 2016). Mesmo tratamento base, apresentação difere.',
        highlights: ['PAA', 'polifagia', 'gatos', 'pancreatite crônica'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Suspeita clínica',
          timing: 'Primeira consulta',
          detail:
            'Perda de peso, fezes volumosas/malformadas, polifagia (cães) ou anorexia/lethargia (gatos), pelagem ruim — construir probabilidade pré-teste (Cridge et al., 2024; Xenoulis et al., 2016).',
        },
        {
          label: 'Triagem laboratorial',
          timing: 'Antes ou com TLI',
          detail:
            'Hemograma, bioquímica, urinálise; cobalamina e folato séricos; coproparasitológico se diarreia (Cridge et al., 2024; Soetart et al., 2019).',
        },
        {
          label: 'TLI em jejum',
          timing: 'Padrão-ouro',
          detail:
            'Jejum 12–18 h; cTLI ≤5,5 µg/L ou fTLI ≤8 µg/L confirma IPE. Subnormal (5,6–7,5 cTLI): trial PERT + repetir TLI (Texas A&M GI Lab, 2024).',
        },
        {
          label: 'Excluir comorbidades',
          timing: 'Contextual',
          detail:
            'Ultrassom abdominal (pâncreas fino, enteropatia associada — Pelligra et al., 2022); cPLI/fPLI se suspeita de pancreatite concomitante; monitorar diabetes se insulinopenia (Cridge et al., 2024).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico',
      steps: [
        {
          label: 'Iniciar PERT',
          dose: '~1 colher de chá/10 kg (cães) ou ~1 colher de chá/gato por refeição',
          duration: 'Vitalício — toda refeição',
          detail:
            'Misturar enzimas à comida e oferecer — pré-incubação não é necessária; titular dose pela resposta clínica e aparência das fezes (Cridge et al., 2024; Steiner, Merck 2025).',
        },
        {
          label: 'Suplementar cobalamina',
          dose: 'Cães 25 µg/kg SC q7d ×6 sem ou VO q24h; gatos 250 µg VO q24h ×12 sem ou SC semanal',
          detail:
            'Sempre medir no diagnóstico; suplementar se baixa ou empiricamente — oral equivalente a SC (Chang et al., 2022; Chang et al., 2024).',
        },
        {
          label: 'Dieta individualizada',
          detail:
            'Baixo resíduo, digestibilidade alta, gordura moderada — NÃO impor hipolipídia universal; ajustar pela tolerância (Cridge et al., 2024).',
        },
        {
          label: 'Reavaliar e escalar',
          timing: '2–4 semanas; depois q3–6 meses',
          reassess: 'Peso, condição corporal, fezes, cobalamina, TLI subclínico se indicado',
          detail:
            'Se refratário após 4–8 semanas de PERT otimizada + B12: tilosina trial; investigar enteropatia, disbiose, HAC, hipertireoidismo felino (Cridge et al., 2024).',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'IPE/EPI é síndrome de maldigestão e malabsorção causada por secreção insuficiente de enzimas digestivas (lipase, tripsina, quimotripsina, amilase) pelos ácinos pancreáticos — clinicamente manifesta-se quando >85–90% da massa acinar funcional está perdida (Cridge et al., 2024; Steiner, Merck 2025).',
    reservaFuncional:
      'O pâncreas exócrino possui ampla reserva funcional (~90%): sinais clínicos só aparecem após destruição maciça do parênquima acinar — por isso TLI baixo reflete perda avançada, não disfunção leve (Cridge et al., 2024).',
    paa: [
      'Atrofia acinar pancreática (PAA): principal causa em cães — especialmente Pastor Alemão, Rough Collie, Chow, Cavalier King Charles Spaniel (Batchelor et al., 2007).',
      'Mecanismo proposto: pancreatite linfocítica imunomediada → destruição progressiva de ácinos → atrofia (Wiberg et al., 1999).',
      'Início frequentemente entre 1–4 anos em raças predispostas; PAA subclínica (TLI baixo antes de sinais) documentada (Wiberg et al., 1999; Cridge et al., 2024).',
      'Predisposição genética — aconselhamento reprodutivo recomendado em linhagens afetadas (Cridge et al., 2024).',
    ],
    pancreatiteCronicaTerminal:
      'Pancreatite crônica com destruição acinar terminal é a causa mais comum em gatos e causa secundária relevante em cães — fibrose e perda acinar substituem parênquima funcional (Xenoulis et al., 2016; Cridge et al., 2024).',
    causasMenores: [
      'Neoplasia pancreática, obstrução ductal, trauma pancreático, fibrose congênita (raro).',
      'Diabetes mellitus concomitante por destruição de ilhotas/islet amyloidosis em gatos — monitorar glicemia ao iniciar PERT (Cridge et al., 2024).',
      'EPI iatrogênica pós-pancreatectomia parcial — excepcional na prática clínica.',
    ],
  },
  epidemiology: {
    caes: [
      'PAA predomina em Pastor Alemão, Rough Collie, Chow, CKCS — GSD mediana ~36 meses ao diagnóstico; Chow mais precoce (~16 meses) (Batchelor et al., 2007).',
      'Boxer, Golden, Labrador, Rottweiler e Weimaraner sub-representados — possível proteção racial (Batchelor et al., 2007).',
      'Idade típica PAA: 1–4 anos; EPI por pancreatite crônica tende a cães mais velhos (Cridge et al., 2024).',
      'Prevalência exata desconhecida — subdiagnóstico provável por confusão com enteropatia crônica.',
    ],
    gatos: [
      'Estudo Xenoulis et al. (2016) — 150 gatos com IPE confirmada por fTLI: mediana 7,7 anos; ampla faixa etária (muitos ≤5 anos).',
      '91% perda de peso; 62% fezes malformadas; 50% pelagem ruim; 45% anorexia; 42% polifagia; 40% lethargia; 28% diarreia aquosa; 19% vômito.',
      '77% hipocobalaminemia; 47% folato elevado; 58% doença concomitante (Xenoulis et al., 2016).',
      'Resposta ao tratamento: boa 60%, parcial 27%, ruim 13% — cobalamina associada a melhor resposta (OR 3,0; Xenoulis et al., 2016).',
    ],
  },
  pathogenesisTransmission: {
    cascata: [
      'Perda de ácinos pancreáticos (PAA imunomediada, pancreatite crônica ou outras causas) — redução da massa secretora funcional (Wiberg et al., 1999; Cridge et al., 2024).',
      'Deficiência de lipase, proteases e amilase pancreáticas → maldigestão intraluminal de lipídios, proteínas e carboidratos.',
      'Substratos mal digeridos chegam ao intestino delgado → osmose luminal, distensão, diarreia volumosa e flatulência.',
      'Malabsorção de ácidos graxos, aminoácidos, vitaminas lipossolúveis e cobalamina → perda de peso, hipoproteinemia, deficiências nutricionais.',
      'Disbiose intestinal secundária (EMD) perpetua diarreia e má resposta parcial à PERT isolada (Cridge et al., 2024).',
      'Deficiência de fator intrínseco pancreático → hipocobalaminemia → anemia, neuropatia, piora de enteropatia (Soetart et al., 2019; Chang et al., 2022).',
    ],
  },
  pathophysiology: {
    tabelaTLICao: {
      kind: 'clinicalTable' as const,
      title: 'Interpretação do cTLI canino (Texas A&M GI Lab, março 2024)',
      headers: ['cTLI (µg/L)', 'Interpretação', 'Conduta'],
      rows: [
        ['≤5,5', 'Diagnóstico de IPE', 'Iniciar PERT + cobalamina + dieta; confirmar com clínica compatível'],
        ['5,6–7,5', 'Subnormal — IPE possível', 'Trial de PERT se sinais compatíveis; repetir cTLI em 1–2 meses (jejum 12–18 h)'],
        ['7,6–10,8', 'Subnormal — IPE improvável', 'Investigar enteropatia, disbiose, parasitas, HAC — não rotular IPE'],
        ['≥10,9', 'Intervalo de referência', 'IPE excluída; prosseguir diferencial de diarreia crônica/malabsorção'],
      ],
    },
    tabelaTLIGato: {
      kind: 'clinicalTable' as const,
      title: 'Interpretação do fTLI felino (Texas A&M GI Lab)',
      headers: ['fTLI (µg/L)', 'Interpretação', 'Conduta'],
      rows: [
        ['≤8', 'Diagnóstico de IPE', 'PERT + cobalamina — suplementação B12 associada a melhor resposta (Xenoulis et al., 2016)'],
        ['8,1–11,9', 'Subnormal — IPE possível', 'Trial PERT se clínica compatível; repetir fTLI em 1–2 meses'],
        ['12–82', 'Intervalo de referência', 'IPE improvável — investigar IBD, alimentar, parasitária, hipertireoidismo'],
      ],
    },
    tabelaCaoVsGato: {
      kind: 'clinicalTable' as const,
      title: 'Comparativo IPE — cão vs gato',
      headers: ['Aspecto', 'Cão', 'Gato'],
      rows: [
        ['Causa principal', 'PAA (Pastor Alemão, Collie)', 'Pancreatite crônica terminal'],
        ['Idade típica', '1–4 anos (PAA); mais velho se pancreatite', 'Mediana 7,7 anos; ampla faixa (Xenoulis et al., 2016)'],
        ['Polifagia', 'Muito comum', 'Apenas ~42% (Xenoulis et al., 2016)'],
        ['Cutoff TLI', 'cTLI ≤5,5 µg/L (2024)', 'fTLI ≤8 µg/L'],
        ['Hipocobalaminemia', '~67% (Soetart et al., 2019)', '~77% (Xenoulis et al., 2016)'],
        ['Dose PERT inicial', '~1 tsp/10 kg/refeição', '~1 tsp/gato/refeição'],
        ['Diabetes associada', 'Menos comum', 'Monitorar ao iniciar PERT (destruição isletas)'],
      ],
    },
    tabelaSinaisFelinos: {
      kind: 'clinicalTable' as const,
      title: 'Sinais clínicos em 150 gatos com IPE (Xenoulis et al., 2016)',
      headers: ['Sinal', 'Prevalência', 'Nota clínica'],
      rows: [
        ['Perda de peso', '91%', 'Sinal mais consistente — IPE em todo gato magro com diarreia'],
        ['Fezes malformadas', '62%', 'Pode ser intermitente; não excluir IPE se episódica'],
        ['Pelagem ruim', '50%', 'Má absorção de ácidos graxos e proteínas'],
        ['Anorexia', '45%', 'Diferencia de cão clássico polifágico'],
        ['Polifagia', '42%', 'Menos que em cães — não usar ausência para descartar IPE'],
        ['Lethargia', '40%', 'Inespecífico — integrar com TLI'],
        ['Diarreia aquosa', '28%', 'Fezes podem parecer “normais” em subset'],
        ['Vômito', '19%', 'Menos proeminente que em enteropatias puras'],
      ],
    },
    cobalamin:
      'Hipocobalaminemia ocorre em >65% dos cães e ~77% dos gatos com IPE — mecanismos: deficiência de fator intrínseco pancreático, disbiose, enteropatia concomitante. Baixa cobalamina piora prognóstico em cães (Soetart et al., 2019) e reduz resposta terapêutica em gatos (Xenoulis et al., 2016). Suplementação oral ou SC normaliza cobalamina e MMA (Chang et al., 2022; Chang et al., 2024).',
    disbiose:
      'Disbiose do microbiota entérico (EMD) persiste em subset de pacientes apesar de PERT — contribui para diarreia refratária, flatulência e perda de peso residual (Cridge et al., 2024). Manejo inclui otimização de PERT/B12, dieta, e em casos selecionados tilosina ou investigação de enteropatia concomitante.',
    fatorIntrinseco:
      'Fator intrínseco é produzido parcialmente por ácinos pancreáticos — sua deficiência na IPE compromete absorção ileal de cobalamina independentemente de dieta. Por isso B12 deve ser medida e suplementada rotineiramente (Cridge et al., 2024; Steiner, Merck 2025).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general/dog',
      findings: [
        {
          finding: 'Perda de peso progressiva com polifagia (polifagia clássica)',
          mechanism: 'Malabsorção calórica apesar de ingestão aumentada — sinal cardinal em cães com IPE.',
          clinicalMeaning: 'Triagem com TLI em jejum — diferencial inclui HAC, diabetes, hipertireoidismo (felino).',
          priority: 'common',
        },
        {
          finding: 'Pelagem seca, opaca, descamação',
          mechanism: 'Deficiência de ácidos graxos essenciais e zinco por malabsorção.',
          clinicalMeaning: 'Melhora com PERT adequada — persistência sugere dose insuficiente ou comorbidade.',
          priority: 'common',
        },
        {
          finding: 'Apetite voraz com condição corporal baixa',
          mechanism: 'Desnutrição crônica com demanda calórica aumentada — catabolismo proteico.',
          clinicalMeaning: 'Diferencia IPE de anorexia pura; polifagia + magreza = alto índice de suspeita.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'general/cat',
      findings: [
        {
          finding: 'Perda de peso (91% na série Xenoulis) — polifagia ausente em >50%',
          mechanism: 'Malabsorção crônica; apetite variável — gatos podem ser anoréticos ou normofágicos.',
          clinicalMeaning: 'Não descartar IPE pela ausência de polifagia — TLI é mandatório em gato magro com diarreia.',
          priority: 'common',
        },
        {
          finding: 'Lethargia, anorexia intermitente, pelagem ruim',
          mechanism: 'Desnutrição, deficiência de cobalamina, doença concomitante (58% na série).',
          clinicalMeaning: 'Investigar comorbidades (IBD, hipertireoidismo, DM) além de IPE.',
          priority: 'common',
        },
        {
          finding: 'Doença concomitante em 58% dos casos',
          mechanism: 'IBD, hepatopatia, DM, pancreatite crônica — espectro sobreposto.',
          clinicalMeaning: 'Tratar IPE não exclui manejo de segunda doença — ultrassom e laboratório ampliado.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Diarreia volumosa, gordurosa (esteatorreia), flatulência intensa',
          mechanism: 'Maldigestão de lipídios e carboidratos — osmose luminal e fermentação bacteriana.',
          clinicalMeaning: 'Fezes frequentemente claras, mal cheirosas, difíceis de recolher — melhora em 3–7 dias com PERT.',
          priority: 'common',
        },
        {
          finding: 'Fezes “normais” ou intermitentes apesar de IPE confirmada',
          mechanism: 'Variabilidade de digestão residual e dieta — especialmente em gatos.',
          clinicalMeaning: 'Fezes normais NÃO excluem IPE se TLI baixo e perda de peso presente.',
          priority: 'common',
        },
        {
          finding: 'Coprofagia (cães)',
          mechanism: 'Tentativa de compensar deficiência enzimática/nutricional — comportamento secundário.',
          clinicalMeaning: 'Orientar tutor; melhora com PERT — não confundir com causa primária.',
          priority: 'uncommon',
        },
        {
          finding: 'Vômito (19% gatos; variável cães)',
          mechanism: 'Distensão intestinal, disbiose, enteropatia concomitante.',
          clinicalMeaning: 'Vômito isolado sem perda de peso/TLI baixo — IPE menos provável.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'hematologic',
      findings: [
        {
          finding: 'Anemia macrocítica ou normocítica (deficiência de cobalamina)',
          mechanism: 'Hipocobalaminemia → distúrbio de maturação eritrocitária; EMD associada.',
          clinicalMeaning: 'Medir cobalamina no diagnóstico; suplementar — anemia pode ser parcialmente reversível.',
          priority: 'common',
        },
        {
          finding: 'Hipoproteinemia, hipoalbuminemia leve',
          mechanism: 'Malabsorção proteica crônica — perda enterica e síntese hepática reduzida.',
          clinicalMeaning: 'Diferenciar de enteropatia perdedora de proteínas — urinálise e albumina sérica seriada.',
          priority: 'systemic',
        },
        {
          finding: 'Folato sérico elevado em ~47% dos gatos (Xenoulis et al., 2016)',
          mechanism: 'Proliferação bacteriana proximal com síntese bacteriana de folato.',
          clinicalMeaning: 'Folato alto não exclui IPE — pode coexistir; interpretar com cobalamina.',
          priority: 'uncommon',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticReasoning:
      'Insuficiência pancreática exócrina (IPE) é diagnóstico funcional baseado em massa acinar — imunorreatividade tipo tripsina (TLI) sérica em jejum é padrão-ouro por espécie. O raciocínio combina: (1) probabilidade pré-teste — raça, idade, perda de peso, polifagia (cães) ou diarreia crônica (gatos); (2) desempenho analítico — TLI tem alta sensibilidade/especificidade para IPE clínica quando cutoff atualizado é usado; (3) valor preditivo — em cão Pastor Alemão magro com polifagia, cTLI ≤5,5 µg/L tem valor preditivo positivo (VPP) muito alto; em gato idoso magro com hipertireoidismo, TLI baixo exige integrar comorbidades (Cridge et al., 2024; Texas A&M GI Lab, 2024). Lipase pancreática canina/felina (cPLI/fPLI) e elastase fecal NÃO substituem TLI para IPE.',
    conceitosTestes: {
      sensibilidade:
        'Sensibilidade do TLI para IPE clínica é alta quando massa acinar >85–90% está perdida — poucos falsos negativos em pacientes sintomáticos com cutoff correto (cTLI ≤5,5; fTLI ≤8). Subclínico (TLI baixo, sem sinais) existe especialmente em PAA — sensibilidade para “doença clínica” difere de “perda acinar detectável” (Wiberg et al., 1999; Cridge et al., 2024).',
      especificidade:
        'Especificidade do TLI para IPE é alta — TLI baixo reflete diretamente massa acinar funcional. Enteropatias sem destruição pancreática mantêm TLI normal. Faixa subnormal (5,6–7,5 cTLI) reduz especificidade diagnóstica isolada — exige integração clínica (Texas A&M GI Lab, 2024).',
      valorPreditivoPositivo:
        'Valor preditivo positivo (VPP): probabilidade de IPE real quando imunorreatividade tipo tripsina (TLI) está abaixo do cutoff. Em cão jovem Pastor Alemão com polifagia e diarreia, cTLI ≤5,5 µg/L tem VPP muito elevado. Em paciente com comorbidade intestinal grave, trial de terapia de reposição enzimática pancreática (PERT) na faixa subnormal aumenta confiança diagnóstica (Texas A&M GI Lab, 2024).',
      valorPreditivoNegativo:
        'Valor preditivo negativo (VPN): probabilidade de não ter IPE quando TLI normal (≥10,9 cTLI; fTLI ≥12). VPN alto para excluir IPE clínica — porém IPE subclínica com TLI limítrofe pode existir; repetir em 1–2 meses se suspeita persiste (Texas A&M GI Lab, 2024).',
      probabilidadePreTeste:
        'Probabilidade pré-teste sobe com: raça predisposta, idade 1–4 anos (atrofia acinar pancreática), polifagia + magreza (cães), perda de peso + diarreia crônica (gatos). Cai em paciente idoso com múltiplas comorbidades — mesmo TLI baixo exige investigação paralela (Cridge et al., 2024; Xenoulis et al., 2016).',
    },
    tabelaDesempenho: {
      kind: 'clinicalTable' as const,
      title: 'Desempenho relativo dos testes pancreáticos na insuficiência pancreática exócrina (IPE)',
      headers: ['Exame (por extenso)', 'Espécie', 'Uso na IPE', 'Sensibilidade/Especificidade', 'Limitação'],
      rows: [
        [
          'Imunorreatividade tipo tripsina (TLI) sérica — jejum 12–18 h',
          'Cão/Gato',
          'Padrão-ouro para IPE',
          'Alta sensibilidade/especificidade para IPE clínica com cutoff atualizado',
          'Cutoff cTLI ≤2,5 desatualizado; faixa subnormal requer clínica (Texas A&M, 2024)',
        ],
        [
          'Lipase pancreática canina (cPLI) / lipase pancreática felina (fPLI)',
          'Cão/Gato',
          'Pancreatite — NÃO IPE',
          'Alta para inflamação pancreática aguda/crônica',
          'Normal em IPE pura — não usar para diagnosticar insuficiência exócrina (Cridge et al., 2024)',
        ],
        [
          'Elastase fecal canina',
          'Cão',
          'Triagem alternativa',
          'Sensibilidade/especificidade inferiores ao TLI',
          'Falsos positivos/negativos — não substituir TLI (Cridge et al., 2024)',
        ],
        [
          'Ultrassom abdominal',
          'Cão/Gato',
          'Contextual',
          'Pâncreas fino em ~68% normais ao US; 85% alterações intestinais',
          'US normal NÃO exclui IPE — diagnóstico funcional (Pelligra et al., 2022)',
        ],
        [
          'Coproparasitológico / PCR fecal',
          'Cão/Gato',
          'Comorbidades',
          'N/A para TLI',
          'Giardia, tricomoníase etc. — não diagnosticam IPE',
        ],
      ],
    },
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'Hemograma, bioquímica e urinálise',
        purpose: 'Triagem sistêmica e comorbidades.',
        description:
          'Avaliar anemia, hipoproteinemia, alterações hepáticas/renais, glicemia (DM concomitante), eletrólitos (Cridge et al., 2024).',
        interpretation: 'Achados inespecíficos — apoiam gravidade e comorbidades, não confirmam IPE.',
        limitations: 'Laboratório normal não exclui IPE.',
      },
      {
        stepNumber: 2,
        title: 'TLI sérico — padrão-ouro',
        purpose: 'Confirmar perda de massa acinar funcional.',
        description:
          'Jejum 12–18 h; cTLI ≤5,5 µg/L (cão) ou fTLI ≤8 µg/L (gato). Laboratório Texas A&M GI Lab ou equivalente validado (Texas A&M GI Lab, 2024; Steiner, Merck 2025).',
        interpretation: 'Abaixo do cutoff = IPE confirmada. Subnormal: trial PERT + repetir em 1–2 meses.',
        limitations: 'Cutoff antigo ≤2,5 µg/L obsoleto; ensaios não validados por espécie inválidos.',
        isGoldStandard: true,
      },
      {
        stepNumber: 3,
        title: 'Cobalamina e folato séricos',
        purpose: 'Identificar deficiência vitamínica e disbiose.',
        description:
          'Cobalamina baixa em 67% cães (Soetart et al., 2019) e 77% gatos (Xenoulis et al., 2016); folato elevado sugere proliferação bacteriana proximal.',
        interpretation: 'Hipocobalaminemia = suplementar B12; folato isolado alto não exclui IPE.',
        limitations: 'Referência varia entre laboratórios — usar limiar clínico (<400 ng/L cães; <290 ng/L gatos).',
      },
      {
        stepNumber: 4,
        title: 'Coproparasitológico e exames fecais',
        purpose: 'Excluir parasitas e causas infecciosas de diarreia.',
        description:
          'Giardia, helmintos, tricomoníase felina — comorbidades frequentes que pioram resposta à PERT.',
        interpretation: 'Positivo = tratar; negativo não confirma IPE.',
        limitations: 'Não substitui TLI.',
      },
      {
        stepNumber: 5,
        title: 'Ultrassom abdominal',
        purpose: 'Contexto anatômico e comorbidades.',
        description:
          'Pâncreas de espessura reduzida, alterações intestinais sugestivas de IBD (Pelligra et al., 2022); excluir massas, linfadenomegalia.',
        interpretation: 'Pâncreas fino + enteropatia sonográfica aumenta suspeita; US normal não exclui IPE.',
        limitations: 'Diagnóstico de IPE é funcional (TLI), não morfológico.',
      },
      {
        stepNumber: 6,
        title: 'cPLI ou fPLI se suspeita de pancreatite',
        purpose: 'Diferenciar inflamação pancreática ativa de IPE isolada.',
        description:
          'cPLI/fPLI elevados indicam pancreatite — podem coexistir com IPE por pancreatite crônica terminal (Cridge et al., 2024).',
        interpretation: 'PLI normal + TLI baixo = IPE sem inflamação aguda detectável.',
        limitations: 'PLI normal não exclui pancreatite crônica histológica.',
      },
      {
        stepNumber: 7,
        title: 'Monitoramento subclínico (PAA)',
        purpose: 'Detectar progressão antes de sinais clínicos.',
        description:
          'Cães de raça predisposta com TLI limítrofe ou história familiar — repetir TLI seriado (Wiberg et al., 1999; Cridge et al., 2024).',
        interpretation: 'Queda progressiva de TLI antecede sinais clínicos em meses.',
        limitations: 'Não iniciar PERT automaticamente em subclínico sem sinais — individualizar.',
      },
      {
        stepNumber: 8,
        title: 'Investigar comorbidades endócrinas e metabólicas',
        purpose: 'Doenças que mimetizam ou coexistem.',
        description:
          'HAC (cães), hipertireoidismo (gatos), diabetes mellitus — especialmente ao iniciar PERT em gato com história de poliúria/polidipsia (Cridge et al., 2024).',
        interpretation: 'Tratar comorbidade melora resposta global — IPE não exclui segunda doença.',
        limitations: 'Múltiplas condições reduzem resposta parcial à PERT isolada.',
      },
    ],
  },
  treatment: {
    pert: {
      kind: 'clinicalTable' as const,
      title: 'Terapia de reposição enzimática pancreática (PERT)',
      headers: ['Parâmetro', 'Cão', 'Gato', 'Observações'],
      rows: [
        ['Dose inicial', '~1 colher de chá/10 kg/refeição', '~1 colher de chá/gato/refeição', 'Ajustar pela resposta clínica e aparência das fezes (Cridge et al., 2024)'],
        ['Frequência', 'Toda refeição', 'Toda refeição', 'Vitalício — omitir refeição = recidiva de sinais'],
        ['Administração', 'Misturar à comida; sem pré-incubação', 'Idem', 'Evitar aquecimento excessivo que inativa enzimas'],
        ['Produto', 'Pancreatina porcina (pó ou microesferas)', 'Idem', 'Preferir preparações veterinárias ou pancreatina USP de qualidade'],
        ['Ajuste', 'Aumentar 25–50% se fezes gordurosas persistem', 'Idem', 'Reavaliar em 2–4 semanas antes de escalar para antibiótico'],
      ],
    },
    cobalamin: {
      kind: 'clinicalTable' as const,
      title: 'Suplementação de cobalamina (B12)',
      headers: ['Via', 'Cão', 'Gato', 'Evidência'],
      rows: [
        ['SC', '25 µg/kg q7d ×6 semanas', '250 µg/gato q7d ×6 semanas', 'Tradicional; normaliza cobalamina e MMA (Chang et al., 2022/2024)'],
        ['VO', '25 µg/kg q24h ×12 semanas (ou tiers do RCT)', '250 µg/gato q24h ×12 semanas', 'Equivalente a SC — preferível se tutor aceita (Chang et al., 2022/2024)'],
        ['Indicação', 'Sempre se hipocobalaminemia; empírico se IPE confirmada', 'Idem — 77% hipocobalaminemia na série felina', 'Xenoulis et al., 2016; Soetart et al., 2019'],
        ['Monitoramento', 'Repetir cobalamina/MMA ao final do curso', 'Idem', 'Manter suplementação se permanecer baixa'],
      ],
    },
    dieta: [
      'Dieta de baixo resíduo, altamente digestível, com teor MODERADO de gordura — NÃO impor hipolipídia universal (Cridge et al., 2024).',
      'Ajustar gordura pela tolerância: se esteatorreia persiste apesar de PERT adequada, reduzir gordura gradualmente.',
      'Fracionar refeições pequenas e frequentes melhora digestão em subset de pacientes.',
      'Evitar petiscos não contabilizados — cada ingestão requer PERT proporcional.',
    ],
    algoritmoFalha: [
      '1. Confirmar adesão: PERT em TODA refeição, mistura correta, produto dentro da validade.',
      '2. Aumentar dose PERT 25–50%; reavaliar fezes e peso em 2–4 semanas.',
      '3. Otimizar cobalamina — medir e suplementar se não feito; preferir curso completo oral/SC.',
      '4. Ajustar dieta (resíduo, gordura); investigar enteropatia (IBD, alimentar) por ultrassom/biópsia se indicado.',
      '5. Trial tilosina 25 mg/kg q24h VO ×2–4 semanas (Cridge et al., 2024) — após otimização completa acima.',
      '6. Considerar omeprazol em casos refratários se suspeita de inativação ácida de enzimas (evidência limitada).',
      '7. Reavaliar comorbidades: HAC, hipertireoidismo, DM, parasitas.',
    ],
    antibioticoRefratario:
      'Tilosina 25 mg/kg q24h VO por 2–4 semanas após falha de PERT otimizada + B12 + dieta — evidência para disbiose associada (Cridge et al., 2024). Esquemas históricos q12h por 6–8 semanas (literatura mais antiga) não são primeira linha atual. Antibióticos de amplo espectro de rotina NÃO são indicados.',
    omeprazolRefratario:
      'Omeprazol 0,7–1,0 mg/kg VO q12h pode ser tentado em subset refratário após PERT + B12 + dieta otimizados — evidência limitada; não é componente obrigatório do protocolo inicial (Steiner, Merck 2025; Cridge et al., 2024).',
    ipeDiabetes:
      'Gatos com IPE podem desenvolver diabetes por destruição isletas — monitorar glicemia ao iniciar PERT. Cães diabéticos com IPE: ajustar insulina quando digestão/absorção melhora com PERT — risco de hipoglicemia se dose insulinica não for reavaliada (Cridge et al., 2024; Steiner, Merck 2025).',
    monitoramento: [
      'Peso e condição corporal q2–4 semanas até estabilização; depois q3–6 meses.',
      'Aparência e consistência fecal — objetivo: fezes formadas, não gordurosas.',
      'Cobalamina sérica ao final do curso de suplementação; repetir se sinais recidivam.',
      'TLI de controle opcional em casos subclínicos ou dúvida diagnóstica inicial.',
      'Glicemia em gatos ao iniciar PERT e em diabéticos com IPE — ajustar insulina conforme resposta.',
      'Investigar recidiva: adesão PERT, dose, comorbidade nova, disbiose refratária.',
    ],
  },
  prevention: {
    paaBreeding: [
      'Em raças predispostas (Pastor Alemão, Rough Collie, Chow), evitar reprodução de linhagens com histórico de IPE/PAA ou TLI subclínico documentado (Cridge et al., 2024; Wiberg et al., 1999).',
      'Triagem de TLI em cães de criação de raças afetadas pode identificar portadores subclínicos — interpretar com cautela e aconselhamento genético.',
      'Não existe vacina ou profilaxia farmacológica para PAA — prevenção é seleção reprodutiva responsável.',
    ],
    subclinicoNoAutoPert: [
      'TLI baixo subclínico (sem sinais) NÃO exige PERT automático — monitorar peso, fezes e repetir TLI seriado (Wiberg et al., 1999; Cridge et al., 2024).',
      'Iniciar PERT quando sinais clínicos aparecem ou TLI cai abaixo do cutoff diagnóstico com progressão documentada.',
      'Orientar tutores de raças predispostas sobre sinais precoces: polifagia, fezes volumosas, perda de peso.',
    ],
    errosComuns: [
      'Usar cutoff cTLI ≤2,5 µg/L — obsoleto desde março 2024 (Texas A&M GI Lab); usar ≤5,5 µg/L.',
      'Prescrever dieta hipolipídica universal — maioria tolera gordura moderada com PERT adequada (Cridge et al., 2024).',
      'Antibiótico de rotina (metronidazol, amoxicilina) sem trial de otimização prévia — reservar tilosina para refratários.',
      'Recusar B12 oral por mito de ineficácia — RCTs demonstram equivalência (Chang et al., 2022/2024).',
      'Ultrassom normal exclui IPE — diagnóstico é TLI, não morfológico (Pelligra et al., 2022).',
      'Fezes normais excluem IPE — especialmente gatos; TLI manda na conduta.',
      'Confundir pancreatite aguda (cPLI/fPLI elevado) com IPE (TLI baixo) — testes distintos, propósitos distintos.',
      'Trial de enzimas como teste diagnóstico — resposta parcial ocorre em enteropatia sem IPE; TLI confirma.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'diabetes-mellitus-canina',
    'diabetes-mellitus-felina',
    'sindrome-cushing-caes',
    'sindrome-cushing-gatos',
    'hipertireoidismo-felino',
  ],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-ipe-cridge-2024',
      citationText:
        'Cridge H, Williams DA, Barko PC. Exocrine pancreatic insufficiency in dogs and cats. J Am Vet Med Assoc. 2024;262(2):246-255.',
      sourceType: 'Revisão narrativa',
      url: 'https://doi.org/10.2460/javma.23.09.0505',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-ipe-chang-dogs-2022',
      citationText:
        'Chang CH, Lidbury JA, Suchodolski JS, Steiner JM. Effect of oral or injectable supplementation with cobalamin in dogs with hypocobalaminemia caused by chronic enteropathy or exocrine pancreatic insufficiency. J Vet Intern Med. 2022;36(5):1607-1621.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://doi.org/10.1111/jvim.16528',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-ipe-chang-cats-2024',
      citationText:
        'Chang CH, Lidbury J, Suchodolski JS, Steiner JM. Effect of oral or subcutaneous administration of cyanocobalamin in hypocobalaminemic cats with chronic gastrointestinal disease or exocrine pancreatic insufficiency. J Vet Intern Med. 2024;38(5):2464-2479.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://doi.org/10.1111/jvim.17195',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-ipe-xenoulis-2016',
      citationText:
        'Xenoulis PG, Zoran DL, Fosgate GT, Suchodolski JS, Steiner JM. Feline exocrine pancreatic insufficiency: a retrospective study of 150 cases. J Vet Intern Med. 2016;30(6):1790-1797.',
      sourceType: 'Série clínica',
      url: 'https://doi.org/10.1111/jvim.14560',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ipe-soetart-2019',
      citationText:
        'Soetart N, Rochel D, Drut A, Jaillardon L. Serum cobalamin and folate as prognostic factors in canine exocrine pancreatic insufficiency: an observational cohort study of 299 dogs. Vet J. 2019;243:15-20.',
      sourceType: 'Coorte observacional',
      url: 'https://doi.org/10.1016/j.tvjl.2018.11.003',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ipe-batchelor-2007-breed',
      citationText:
        'Batchelor DJ, Noble PJ, Taylor RH, Cripps PJ, McLean L, Leibl MA, German AJ. Breed associations for canine exocrine pancreatic insufficiency. J Vet Intern Med. 2007;21(2):207-214.',
      sourceType: 'Estudo epidemiológico',
      url: 'https://doi.org/10.1111/j.1939-1676.2007.tb02950.x',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ipe-batchelor-2007-prognosis',
      citationText:
        'Batchelor DJ, Noble PJ, Taylor RH, Cripps PJ, German AJ. Prognostic factors in canine exocrine pancreatic insufficiency: prolonged survival is likely if clinical remission is achieved. J Vet Intern Med. 2007;21(1):54-60.',
      sourceType: 'Série clínica',
      url: 'https://doi.org/10.1111/j.1939-1676.2007.tb02928.x',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ipe-pelligra-2022',
      citationText:
        'Pelligra T, Puccinelli C, Marchetti V, Citi S. Ultrasonographic findings of exocrine pancreatic insufficiency in dogs. Vet Sci. 2022;9(8):407.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://doi.org/10.3390/vetsci9080407',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-ipe-tamu-tli-2024',
      citationText:
        'Texas A&M University Gastrointestinal Laboratory. Serum Trypsin-Like Immunoreactivity (TLI) — interpretação cTLI/fTLI e cutoff atualizado março 2024.',
      sourceType: 'Referência laboratorial',
      url: 'https://vetmed.tamu.edu/gilab/service/assays/tli/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-ipe-steiner-merck-2025',
      citationText:
        'Steiner JM. Exocrine pancreatic insufficiency in dogs and cats. Merck Veterinary Manual. Full review Sept 2025.',
      sourceType: 'Manual / referência clínica',
      url: 'https://www.merckvetmanual.com/digestive-system/the-exocrine-pancreas/exocrine-pancreatic-insufficiency-in-dogs-and-cats',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ipe-wiberg-1999',
      citationText:
        'Wiberg ME, Saari SAM, Westermarck E. Exocrine pancreatic atrophy in German Shepherd Dogs and Rough-coated Collies: an end result of lymphocytic pancreatitis. Vet Pathol. 1999;36(6):530-541.',
      sourceType: 'Estudo histopatológico',
      url: 'https://doi.org/10.1354/vp.36-6-530',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ipe-barko-williams-2026',
      citationText:
        'Barko PC, Williams DA. Exocrine pancreatic insufficiency. In: Ettinger SJ, Feldman EC, Côté E, eds. Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2026.',
      sourceType: 'Capítulo de livro-texto',
      url: 'https://www.merckvetmanual.com/digestive-system/the-exocrine-pancreas/exocrine-pancreatic-insufficiency-in-dogs-and-cats',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
