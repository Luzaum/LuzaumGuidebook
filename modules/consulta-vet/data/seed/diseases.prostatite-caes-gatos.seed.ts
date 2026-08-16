import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Prostatite em cães e gatos — síntese editorial Vetius.
 * Prioridade: Weese et al. ISCAID 2019 > Kutzler Merck 2025 > Lea et al. 2022 > Palmieri et al. 2022 > Nelson & Couto 2020.
 */
export const prostatiteCaesGatosRecord: DiseaseRecord = {
  id: 'disease-prostatite-caes-gatos',
  slug: 'prostatite-caes-gatos',
  title: 'Prostatite em cães e gatos',
  synonyms: [
    'Prostatite bacteriana',
    'Infecção prostática',
    'Inflamação prostática',
    'Bacterial prostatitis',
    'Prostatite abscedativa',
    'Prostatite crônica',
  ],
  species: ['dog', 'cat'],
  category: 'nefrologia-urologia',
  tags: [
    'Próstata',
    'BPH',
    'Urocultura',
    'Ultrassom',
    'Enrofloxacina',
    'Finasterida',
    'Cão inteiro',
    'ITU recorrente',
    'Abscesso prostático',
    'ISCAID',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['prostatite-caes-gatos'],
  quickSummary:
    'A prostatite canina é predominantemente infecção bacteriana da próstata em cães machos inteiros, fortemente relacionada à hiperplasia prostática benigna (BPH) e à ascensão de uropatógenos pela uretra. A forma aguda pode causar febre, dor intensa, sepse e abscesso; a crônica pode ser silenciosa e manifestar-se apenas como infecção urinária (ITU) recorrente, hemospermia ou infertilidade. O diagnóstico combina toque retal, urinálise, urocultura por cistocentese, ultrassonografia e — nos casos crônicos ou refratários — citologia e cultura prostática. Urocultura negativa não exclui prostatite: culturas urinária e prostática concordaram em apenas 50% na série de Lea et al. (2022). O tratamento exige antimicrobiano com penetração prostática adequada e controle da BPH (castração ou finasterida). O consenso ISCAID recomenda ~4 semanas na aguda e 4–6 semanas na crônica; Kutzler (Merck 2025) e outras referências descrevem ≥6 até 8–12 semanas em casos selecionados (Weese et al., 2019; Lea et al., 2022). Em gatos, a prostatite é extremamente rara — prostatomegalia felina exige investigação agressiva de neoplasia (Palmieri et al., 2022; Bloomfield et al., 2026).',
  quickDecisionStrip: [
    'Todo cão macho inteiro com bacteriúria ou cistite bacteriana merece avaliação prostática — especialmente se a ITU recorre (Weese et al., 2019).',
    'Prostatite aguda: NÃO massagear a próstata — risco de bacteremia e sepse (Kutzler, Merck 2025).',
    'Urocultura negativa NÃO exclui prostatite — concordância urina × próstata foi de apenas 50% (Lea et al., 2022).',
    'Escolher antimicrobiano pelo antibiograma urinário sem considerar penetração prostática favorece recidiva na forma crônica (Weese et al., 2019; Nelson & Couto, 2020).',
    'Prostatite crônica + hiperplasia prostática benigna (BPH): tratar infecção E BPH — castração é fundamental no cão sem interesse reprodutivo (Weese et al., 2019; Kutzler, Merck 2025).',
    'Enrofloxacina 10 mg/kg VO q24h é dose prática principal; Merck 2025 descreve 5 mg/kg q12h (mesma dose diária total) (Nelson & Couto, 2020; Allerton, BSAVA Formulary 2020).',
    'NÃO usar ciprofloxacina como substituto da enrofloxacina no cão — biodisponibilidade imprevisível e penetração prostática inferior (Weese et al., 2019).',
    'Duração: ≥4 semanas na aguda (ISCAID); 4–6 semanas na crônica (ISCAID), podendo chegar a 8–12 semanas se persistência ou abscesso (Kutzler, Merck 2025).',
    'Abscesso prostático: avaliar drenagem percutânea ou cirúrgica + controle de foco — antimicrobiano isolado pode falhar (Weese et al., 2019; Lea et al., 2022).',
    'Esterase prostática específica canina (CPSE) elevada indica doença prostática, não confirma prostatite nem distingue BPH de neoplasia (Melandri & Alonge, 2021).',
    'Gato com próstata aumentada: prostatite é rara — priorizar neoplasia e abscesso no diferencial (Palmieri et al., 2022; Bloomfield et al., 2026).',
    'Investigar Brucella canis em reprodutor, canil ou prostatite crônica refratária — zoonose ocupacional (Weese et al., 2019).',
  ],
  quickSummaryRich: {
    lead:
      'Prostatite não é “mais uma ITU”. Pergunte: o cão é inteiro? A próstata doi ao toque? A ITU sempre volta? O erro mais caro é tratar cistite com antibiótico de curta duração e baixa penetração prostática, sem ultrassom, sem cultura e sem tratar hiperplasia prostática benigna (BPH) — enquanto se massageia uma próstata aguda febril.',
    leadHighlights: ['cão inteiro', 'BPH', 'urocultura', 'ultrassom', '≥4 semanas'],
    pillars: [
      {
        title: 'Aguda × crônica',
        body:
          'Aguda: febre, dor prostática, sepse possível, barreira sangue–próstata parcialmente alterada — NÃO massagear. Crônica: pode ser assintomática; ITU recorrente é pista clássica; barreira íntegra exige antimicrobiano com excelente penetração (Weese et al., 2019; Kutzler, Merck 2025).',
        highlights: ['febre', 'ITU recorrente', 'barreira'],
      },
      {
        title: 'Diagnóstico',
        body:
          'Hemograma + bioquímica + urinálise + urocultura por cistocentese + ultrassom prostático. Crônica/refratária: terceira fração do ejaculado ou aspirado guiado por ultrassom + citologia/cultura prostática (Weese et al., 2019; Lea et al., 2022).',
        highlights: ['cistocentese', 'ultrassom', '3ª fração'],
      },
      {
        title: 'Tratamento',
        body:
          'Antimicrobiano com penetração prostática + duração prolongada + controle da BPH (castração ou finasterida 0,1–0,5 mg/kg q24h no reprodutor) + drenagem de abscesso quando indicada (Weese et al., 2019; Sirinarumitr et al., 2001).',
        highlights: ['enrofloxacina', 'castração', 'finasterida'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo diagnóstico',
      steps: [
        {
          label: 'Suspeita clínica',
          timing: 'Primeira consulta',
          detail:
            'Cão macho inteiro + febre/dor prostática/LUTS/ITU recorrente/infertilidade — construir probabilidade pré-teste (Weese et al., 2019; Kutzler, Merck 2025).',
        },
        {
          label: 'Laboratório + imagem',
          timing: 'Sempre',
          detail:
            'Hemograma, bioquímica, urinálise, urocultura por cistocentese, ultrassom prostático — procurar cistos, abscesso, assimetria (Lea et al., 2022).',
        },
        {
          label: 'Aguda febril',
          timing: 'Emergência',
          detail:
            'NÃO massagear próstata; estabilizar sepse; colher culturas antes do antimicrobiano se não atrasar terapia; avaliar abscesso (Kutzler, Merck 2025).',
        },
        {
          label: 'Crônica/refratária',
          timing: 'Se ITU persiste',
          detail:
            'Terceira fração do ejaculado ou aspirado ultrassom-guidado + citologia/cultura prostática; investigar Brucella canis se contexto reprodutivo (Weese et al., 2019; Phongphaew et al., 2021).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Algoritmo terapêutico',
      steps: [
        {
          label: 'Cultura + antimicrobiano',
          dose: 'Enrofloxacina 10 mg/kg VO q24h empírico enquanto aguarda (ajustar por CIM sérica)',
          duration: '≥4 semanas aguda; 4–6+ semanas crônica',
          detail:
            'Cobrir Enterobacterales empiricamente; interpretar antibiograma pensando em concentração tecidual prostática, não urinária (Weese et al., 2019).',
        },
        {
          label: 'Controlar BPH',
          detail:
            'Castração precoce após estabilização se não reprodutor; finasterida 0,1–0,5 mg/kg q24h se preservar reprodução (Weese et al., 2019; Sirinarumitr et al., 2001).',
        },
        {
          label: 'Abscesso',
          detail:
            'Drenagem percutânea ou cirúrgica + omentalização se grande/recidivante; ruptura = emergência cirúrgica (Weese et al., 2019; Lea et al., 2022).',
        },
        {
          label: 'Reavaliar',
          timing: '48–72 h aguda; 2–4 semanas crônica',
          reassess: 'Clínica, ultrassom, urina; cultura pós-terapia se recorrente/refratário',
          detail:
            'ISCAID prioriza resposta clínica e ultrassonográfica sobre culturas seriadas de rotina (Weese et al., 2019).',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'Prostatite é inflamação do parênquima prostático. Em cães, a forma clinicamente relevante é predominantemente infecciosa e bacteriana, frequentemente supurativa. Prostatite asséptica verdadeira é extremamente rara (Kutzler, Merck 2025; Palmieri et al., 2022).',
    formasClinicas: [
      'Prostatite bacteriana aguda — febre, dor, possível sepse e abscesso.',
      'Prostatite bacteriana crônica — ITU recorrente, infertilidade, hemospermia/piospermia.',
      'Prostatite com microabscessos ou abscesso prostático.',
      'Formas atípicas: granulomatosa, fúngica, *Brucella canis*, *Leishmania*, *Mycoplasma*.',
      'Raramente prostatite linfoplasmocítica não infecciosa (diagnóstico histológico) (Palmieri et al., 2022).',
    ],
    viaAscendente:
      'Via mais importante: flora urogenital ou infecção urinária inferior → uretra → ductos prostáticos → ácinos → inflamação neutrofílica (Weese et al., 2019; Greene, 2012).',
    viaHematogena:
      'Bacteremia → vasculatura prostática → inoculação hematógena — descrita especialmente em formas agudas (Kutzler, Merck 2025).',
    microbiologia:
      '*Escherichia coli* é agente clássico e um dos mais importantes, mas *Staphylococcus* spp. e diversos uropatógenos Gram-negativos e Gram-positivos são frequentes — cultura define o agente no indivíduo (Weese et al., 2019; Phongphaew et al., 2021; Lea et al., 2022). Anaeróbios são incomuns salvo abscesso/necrose (Kutzler, Merck 2025).',
    brucella:
      '*Brucella canis*: red flag em reprodutor, canil, infertilidade, prostatite crônica — zoonose; investigação específica quando risco epidemiológico (Weese et al., 2019).',
  },
  epidemiology: {
    caes: [
      'Segunda doença prostática mais comum em cães machos inteiros, após hiperplasia prostática benigna (BPH) (Kutzler, Merck 2025; Weese et al., 2019).',
      'Muito mais frequente em inteiros; incomum após castração — castrado não exclui, mas neoplasia ganha peso se próstata anormal (Kutzler, Merck 2025).',
      'Lea et al. (2022), 82 cães: idade mediana 9 anos; 63% aguda, 37% crônica, 40% abscesso — distribuição depende da população estudada.',
      'Possível maior ocorrência em Pastor Alemão e Doberman (literatura clínica); efeito da raça é menor que idade, BPH e ITU predisponente.',
    ],
    gatos: [
      'Extremamente rara — evidência baseada em relatos de caso e revisões patológicas (Palmieri et al., 2022; Roura et al., 2002).',
      'BPH felina é incomum; doença prostática em gato deve gerar investigação agressiva de neoplasia (Palmieri et al., 2022).',
      'Bloomfield et al. (2026): abscesso prostático em gato castrado com urocultura negativa e cultura positiva do líquido prostático — compartimento prostático pode divergir da bexiga.',
    ],
  },
  pathogenesisTransmission: {
    cascata: [
      'Hiperplasia prostática benigna (BPH) → aumento de volume, cistos, estase de secreção → ambiente favorável à colonização (Kutzler, Merck 2025).',
      'Ascensão bacteriana pela uretra → ductos prostáticos → ácinos → quimiotaxia neutrofílica, edema, exsudato purulento (Greene, 2012).',
      'Inflamação severa → microabscessos → abscesso; próstata vascularizada → bacteremia, sepse, choque (Kutzler, Merck 2025).',
      'Forma crônica: inflamação persistente → fibrose → drenagem deficiente → reservatório bacteriano → ITU recorrente (Nelson & Couto, 2020).',
      'Antimicrobiano sem penetração prostática ou duração curta → aparente melhora urinária → foco prostático persistente → recidiva (Weese et al., 2019).',
    ],
    relacaoBph:
      'BPH não é sinônimo de prostatite, mas favorece fortemente persistência e recidiva — tratar apenas infecção sem controlar BPH aumenta probabilidade de falha (Weese et al., 2019; Kutzler, Merck 2025).',
  },
  pathophysiology: {
    anatomiaCanina:
      'A próstata canina circunda a uretra prostática, caudal ao colo vesical, com dois lobos — explica LUTS, tenesmo, constipação e dor lombossacra por compressão uretral/retal (Davidson, BSAVA Nephrology 2017; Nelson & Couto, 2020).',
    barreiraSangueProstata:
      'Na crônica, a barreira sangue–próstata limita antimicrobianos hidrofílicos — favorece lipossolúveis com alta fração não ionizada (fluoroquinolonas, trimetoprim, clindamicina*). *Quando cultura justificar. Sensível no antibiograma ≠ concentração terapêutica garantida na próstata (Weese et al., 2019; Nelson & Couto, 2020).',
    figuraHistopatologia: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/prostatite-caes-gatos/prostatite-espectro-histopatologia-palmieri-2022.webp',
      alt: 'Espectro citológico e histopatológico da prostatite canina — aguda, piogranulomatosa e crônica',
      caption:
        'Espectro citológico e histopatológico da prostatite canina: aguda com neutrófilos (A), piogranulomatosa com destruição glandular (B), citologia com neutrófilos (C), crônica linfoplasmocítica (D). Palmieri C, Fonseca-Alves CE, Laufer-Amorim R. Front Vet Sci. 2022;9:881232. Licença CC BY 4.0.',
    },
    tabelaAgudaCronica: {
      kind: 'clinicalTable' as const,
      title: 'Prostatite aguda × crônica',
      headers: ['Característica', 'Aguda', 'Crônica'],
      rows: [
        ['Estado geral', 'Frequentemente comprometido', 'Geralmente normal'],
        ['Febre', 'Frequente', 'Incomum'],
        ['Dor prostática', 'Marcante', 'Ausente ou discreta'],
        ['Infecção urinária (ITU) recorrente', 'Pode ocorrer', 'Muito característica'],
        ['Próstata ao toque', 'Dolorosa, amolecida/irregular', 'Pode ser firme e indolor'],
        ['Barreira sangue–próstata', 'Parcialmente alterada', 'Preservada'],
        ['Massagem prostática', 'Contraindicada', 'Possível; ejaculado preferível'],
        ['Duração antimicrobiano', '≥4 semanas', '4–6+ semanas; individualizar'],
        ['Abscesso', 'Possível', 'Possível'],
      ],
    },
    tabelaPenetracao: {
      kind: 'clinicalTable' as const,
      title: 'Penetração antimicrobiana na próstata',
      headers: ['Fármaco', 'Penetração prostática', 'Uso prático'],
      rows: [
        ['Enrofloxacina', 'Excelente', 'Opção empírica importante enquanto aguarda cultura'],
        ['Marbofloxacina', 'Boa a excelente', 'Alternativa conforme cultura'],
        ['Trimetoprim–sulfonamida', 'Boa', 'Alternativa; monitorar toxicidade prolongada'],
        ['Clindamicina', 'Boa', 'Somente se cultura; cobertura Gram-negativo empírica inadequada'],
        ['Ciprofloxacina', 'Imprevisível no cão', 'Evitar como substituto da enrofloxacina'],
        ['Penicilinas/cefalosporinas', 'Ruim na crônica', 'Não confiar isoladamente na forma crônica'],
        ['Aminoglicosídeos', 'Ruim', 'Não ideal para foco prostático'],
      ],
    },
    cpse:
      'Esterase prostática específica canina (CPSE) é biomarcador de doença prostática — elevada em BPH, prostatite e carcinoma — não confirma prostatite nem distingue etiologias (Melandri & Alonge, 2021).',
    mineralizacao:
      'Mineralização prostática aumenta preocupação com neoplasia, especialmente em castrado, mas ocorreu em 20% dos cães com prostatite na série de Lea et al. (2022) — não é patognomônica.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general/dog',
      findings: [
        {
          finding: 'Febre e letargia',
          mechanism: 'Resposta inflamatória sistêmica à infecção prostática aguda — citocinas e possível bacteremia.',
          clinicalMeaning: 'Internar se instável; NÃO massagear próstata; colher culturas e iniciar antimicrobiano com penetração prostática (Kutzler, Merck 2025).',
          priority: 'emergency',
        },
        {
          finding: 'Infecção urinária (ITU) recorrente sem outra causa',
          mechanism: 'Próstata infectada funciona como reservatório — secreção prostática reflui para bexiga.',
          clinicalMeaning: 'Investigar próstata mesmo com hemograma normal — forma crônica clássica (Weese et al., 2019).',
          priority: 'common',
        },
        {
          finding: 'Infertilidade, hemospermia ou piospermia',
          mechanism: 'Inflamação ductal e destruição acinar alteram qualidade seminal.',
          clinicalMeaning: 'Avaliar terceira fração do ejaculado + ultrassom em reprodutor (Davidson, BSAVA Nephrology 2017).',
          priority: 'common',
        },
      ],
    },
    {
      system: 'urinary',
      findings: [
        {
          finding: 'Hematúria, disúria, estrangúria, polaciúria',
          mechanism: 'Compressão/inflamação da uretra prostática + cistite concomitante por refluxo de secreção infectada.',
          clinicalMeaning: 'Urocultura por cistocentese + ultrassom prostático — tratar foco prostático, não só bexiga (Weese et al., 2019).',
          priority: 'common',
        },
        {
          finding: 'Secreção uretral ou prepucial',
          mechanism: 'Exsudato prostático e uretrite associada.',
          clinicalMeaning: 'Citologia/cultura prostática se crônica/refratária (Lea et al., 2022).',
          priority: 'common',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Tenesmo, disquezia, constipação',
          mechanism: 'Prostatomegalia comprime reto ventralmente.',
          clinicalMeaning: 'Diferenciar de obstrução colônica pura — toque retal + imagem pélvica (Nelson & Couto, 2020).',
          priority: 'common',
        },
      ],
    },
    {
      system: 'musculoskeletal',
      findings: [
        {
          finding: 'Marcha rígida, dor lombossacra, relutância locomotor',
          mechanism: 'Dor pélvica profunda e inflamação periprostática.',
          clinicalMeaning: 'Não confundir com doença discal isolada — examinar próstata em cão inteiro (Kutzler, Merck 2025).',
          priority: 'common',
        },
      ],
    },
    {
      system: 'critical',
      findings: [
        {
          finding: 'Sepse, choque, peritonite séptica',
          mechanism: 'Bacteremia por próstata altamente vascularizada; ruptura de abscesso intraperitoneal.',
          clinicalMeaning: 'Emergência — fluidoterapia, antimicrobiano IV, source control cirúrgico (Kutzler, Merck 2025).',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'general/cat',
      findings: [
        {
          finding: 'LUTS + prostatomegalia em gato macho',
          mechanism: 'Doença prostática felina rara — abscesso, prostatite ou neoplasia.',
          clinicalMeaning: 'Neoplasia prostática tem prioridade alta no diferencial; não copiar protocolo canino (Palmieri et al., 2022; Bloomfield et al., 2026).',
          priority: 'uncommon',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticReasoning:
      'O diagnóstico integra sexo/estado reprodutivo, sinais clínicos, toque retal cuidadoso, laboratório, urocultura por cistocentese e ultrassonografia prostática. Urocultura positiva comprova bacteriúria, não confirma sozinha prostatite; urocultura negativa não exclui — concordância urina × próstata foi 50% (Lea et al., 2022). Phongphaew et al. (2021) encontraram perfil semelhante quando prostatite e cistite coexistem claramente, mas isso não dispensa amostragem prostática em refratários (Weese et al., 2019).',
    tabelaDiferencial: {
      kind: 'clinicalTable' as const,
      title: 'Hiperplasia prostática benigna (BPH) × prostatite × neoplasia',
      headers: ['', 'BPH', 'Prostatite aguda', 'Prostatite crônica', 'Neoplasia'],
      rows: [
        ['Cão inteiro', '+++', '+++', '+++', '±'],
        ['Dor', 'Geralmente não', '+++', '±', '+/++'],
        ['Febre', 'Não', 'Frequente', 'Rara', 'Incomum'],
        ['ITU recorrente', 'Pode coexistir', 'Frequente', 'Muito característica', 'Pode coexistir'],
        ['Tratamento central', 'Controle androgênico', 'Antimicrobiano + suporte', 'Antimicrobiano + BPH', 'Oncologia'],
      ],
    },
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'Exame físico e toque retal',
        purpose: 'Detectar prostatomegalia, dor, assimetria.',
        description:
          'Próstata dolorosa e irregular sugere aguda; próstata normal NÃO exclui crônica. Evitar manipulação vigorosa se febre/sepse (Kutzler, Merck 2025).',
        interpretation: 'Achado prostático anormal em cão inteiro com LUTS aumenta probabilidade de doença prostática.',
        limitations: 'Toque normal não exclui prostatite crônica.',
      },
      {
        stepNumber: 2,
        title: 'Hemograma e bioquímica',
        purpose: 'Avaliar resposta inflamatória sistêmica e gravidade.',
        description:
          'Aguda: leucocitose, neutrofilia, desvio à esquerda possíveis. Crônica: frequentemente normal (Nelson & Couto, 2020).',
        interpretation: 'Hemograma normal não exclui prostatite crônica.',
        limitations: 'Achados inespecíficos.',
      },
      {
        stepNumber: 3,
        title: 'Urinálise e urocultura por cistocentese',
        purpose: 'Detectar bacteriúria e orientar terapia.',
        description:
          'Cistocentese reduz contaminação. Interpretar antibiograma pensando em breakpoint sérico/tecidual prostático, não concentração urinária (Weese et al., 2019).',
        interpretation: 'Positiva apoia ITU/prostatite; negativa não exclui foco prostático (Lea et al., 2022).',
        limitations: 'Concordância urina × próstata ~50% na série de Lea et al. (2022).',
        isGoldStandard: false,
      },
      {
        stepNumber: 4,
        title: 'Ultrassonografia prostática',
        purpose: 'Caracterizar tamanho, ecotextura, cistos, abscessos.',
        description:
          'Prostatomegalia, heterogeneidade, cavidades — achados não específicos (Lea et al., 2022; Kutzler, Merck 2025).',
        interpretation: 'Abscesso = cavidade intraprostática; mineralização presente em 20% dos casos de prostatite na série de Lea et al. (2022).',
        limitations: 'Não distingue sozinha BPH, prostatite e neoplasia.',
      },
      {
        stepNumber: 5,
        title: 'Citologia e cultura prostática',
        purpose: 'Confirmar infecção e guiar terapia em crônicos/refratários.',
        description:
          'Crônica: terceira fração do ejaculado preferível quando disponível; alternativas: lavado prostático, aspirado ultrassom-guidado (Weese et al., 2019; Kutzler, Merck 2025).',
        interpretation: 'Neutrófilos degenerados + bactérias intracelulares sustentam prostatite bacteriana aguda.',
        limitations: 'Massagem contraindicada na aguda febril; contaminação uretral possível.',
        isGoldStandard: true,
      },
      {
        stepNumber: 6,
        title: 'Histopatologia',
        purpose: 'Excluir neoplasia ou confirmar forma atípica.',
        description:
          'Indicada se massa focal, mineralização em castrado, falha terapêutica ou suspeita neoplásica (Palmieri et al., 2022).',
        interpretation: 'Aguda: neutrófilos, necrose, bactérias. Crônica: linfócitos/plasmócitos, fibrose.',
        limitations: 'Invasiva; reservar para casos selecionados.',
      },
    ],
  },
  treatment: {
    principios: [
      'Quatro pilares: controlar infecção; garantir penetração prostática; tratar hiperplasia prostática benigna (BPH); drenar abscesso quando indicado (Weese et al., 2019; Lea et al., 2022).',
      'Colher cultura antes da primeira dose quando possível — não atrasar antimicrobiano em paciente séptico (Weese et al., 2019).',
      '29% dos isolados com resistência a um antimicrobiano e 52% a ≥2 na série de Lea et al. (2022) — terapia empírica prolongada “no escuro” é arriscada.',
    ],
    tabelaAntimicrobianos: {
      kind: 'clinicalTable' as const,
      title: 'Antimicrobianos — doses práticas (cão)',
      headers: ['Fármaco', 'Dose', 'Observações'],
      rows: [
        ['Enrofloxacina', '10 mg/kg VO q24h', 'Dose prática principal; Merck 2025: 5 mg/kg q12h = mesma dose diária (Nelson & Couto, 2020)'],
        ['Marbofloxacina', '2 mg/kg VO q24h', 'Dose usual BSAVA; ajustar conforme CIM e produto (Allerton, BSAVA Formulary 2020)'],
        ['Trimetoprim–sulfonamida', '15–30 mg/kg VO q12h (soma TMP+ sulfa)', 'Monitorar efeitos adversos em tratamentos prolongados; cautela em Dobermann'],
        ['Finasterida (BPH)', '0,1–0,5 mg/kg VO q24h', 'Não é antimicrobiano — reprodutor; ou 5 mg/cão q24h em 10–50 kg (Sirinarumitr et al., 2001)'],
      ],
    },
    duracao: [
      'Aguda: ≥4 semanas (Weese et al., 2019; Kutzler, Merck 2025).',
      'Crônica: 4–6 semanas (ISCAID/Weese et al., 2019); frequentemente ≥6 semanas, podendo chegar a 8–12 semanas se persistência, abscesso ou BPH não controlada (Kutzler, Merck 2025; Davidson, BSAVA Nephrology 2017).',
      'Individualizar por resposta clínica, ultrassom e controle do foco — não encurtar como cistite simples.',
    ],
    castracao:
      'Recomendada em cães sem interesse reprodutivo — reduz estímulo androgênico, trata BPH, diminui recidiva (Weese et al., 2019). Estabilizar sepse antes; castrar o mais precocemente possível quando risco anestésico aceitável (Weese et al., 2019; Davidson, BSAVA Nephrology 2017).',
    abscesso: [
      'ISCAID recomenda drenar abscessos — baixa probabilidade de cura só com antimicrobiano (Weese et al., 2019).',
      'Opções: drenagem percutânea ultrassom-guidada, cirúrgica + omentalização intracapsular em grandes abscessos (Kutzler, Merck 2025).',
      'Lea et al. (2022): antimicrobiano isolado, drenagem por agulha ou cirúrgica foram opções na população retrospectiva — individualizar.',
      'Ruptura com peritonite séptica = cirurgia de emergência.',
    ],
    suporteAguda: [
      'Internação se sistêmico: fluidoterapia, analgesia multimodal, correção eletrolítica, monitorização de perfusão/lactato, antieméticos, source control de abscesso (Kutzler, Merck 2025).',
      'Anti-inflamatório não esteroidal (AINE) somente após estabilização hidroeletrolítica — evitar em choque/desidratação (Davidson, BSAVA Nephrology 2017).',
    ],
    gatos:
      'Não extrapolar dose/duração canina — enrofloxacina máxima ~5 mg/kg/dia em gatos (Allerton, BSAVA Formulary 2020). Prostatite felina: cultura + antibiograma + penetração tecidual individualizados; neoplasia sempre no diferencial (Bloomfield et al., 2026).',
  },
  prevention: {
    manejoReprodutor: [
      'Castração de cães pet reduz drasticamente risco de doença prostática (Kutzler, Merck 2025).',
      'Em reprodutores: monitorar qualidade seminal, investigar prostatite ante infertilidade; considerar finasterida para BPH concomitante (Sirinarumitr et al., 2001).',
      'Testar Brucella canis em canis/reprodutores com risco — zoonose (Weese et al., 2019).',
    ],
    ituRecorrente: [
      'Em cão inteiro com ITU recorrente: ultrassom prostático + considerar cultura prostática antes de ciclos repetidos de antibiótico curto (Weese et al., 2019).',
      'Tratar BPH concomitante — antimicrobiano isolado na crônica associada à BPH tem baixo rendimento (Kutzler, Merck 2025).',
    ],
    errosComuns: [
      'Tratar toda infecção urinária (ITU) de cão macho inteiro sem examinar próstata.',
      'Massagear próstata agudamente dolorosa/febril.',
      'Confiar que urocultura negativa exclui prostatite.',
      'Escolher antibiótico só porque “sai sensível” na urina, ignorando penetração prostática.',
      'Usar amoxicilina/cefalosporina como terapia definitiva de prostatite crônica.',
      'Usar ciprofloxacina como enrofloxacina barata no cão.',
      'Não tratar hiperplasia prostática benigna (BPH) — finasterida não substitui antimicrobiano.',
      'Interpretar esterase prostática específica canina (CPSE) elevada como diagnóstico de prostatite.',
      'Excluir prostatite porque próstata tem tamanho normal ou hemograma é normal.',
      'Copiar protocolo canino para gato — especialmente dose de fluoroquinolona.',
    ],
  },
  relatedConsensusSlugs: ['iscaid-itu-caes-gatos-2019'],
  relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos', 'doencas-trato-urinario-inferior-felino-dtuif'],
  relatedMedicationSlugs: ['sulfametoxazol-trimetoprima', 'amoxicilina-clavulanato', 'ampicilina'],
  references: [
    {
      id: 'ref-prostatite-weese-iscaid-2019',
      citationText:
        'Weese JS, Blondeau J, Boothe D, Guardabassi LG, Gumley N, Papich M, et al. International Society for Companion Animal Infectious Diseases guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8–25.',
      sourceType: 'Diretriz ISCAID',
      url: 'https://doi.org/10.1016/j.tvjl.2019.02.008',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-prostatite-kutzler-merck-2025',
      citationText:
        'Kutzler MA. Prostatitis in Dogs. Merck Veterinary Manual. Full review September 2025.',
      sourceType: 'Manual / referência clínica',
      url: 'https://www.merckvetmanual.com/reproductive-system/prostatic-diseases-in-small-animals/prostatitis-in-dogs',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-prostatite-lea-2022',
      citationText:
        'Lea C, Walker D, Blazquez CA, Zaghloul O, Tappin S, Kelly D. Prostatitis and prostatic abscessation in dogs: retrospective study of 82 cases. Aust Vet J. 2022;100:223–229.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://doi.org/10.1111/avj.13150',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-prostatite-phongphaew-2021',
      citationText:
        'Phongphaew W, Kongtia M, Kim K, Sirinarumitr K, Sirinarumitr T. Association of bacterial isolates and antimicrobial susceptibility between prostatic fluid and urine samples in canine prostatitis with concurrent cystitis. Theriogenology. 2021;173:202–210.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1016/j.theriogenology.2021.07.026',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-prostatite-palmieri-2022',
      citationText:
        'Palmieri C, Fonseca-Alves CE, Laufer-Amorim R. A Review on Canine and Feline Prostate Pathology. Front Vet Sci. 2022;9:881232.',
      sourceType: 'Revisão patológica',
      url: 'https://doi.org/10.3389/fvets.2022.881232',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-prostatite-nelson-couto-2020',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 42 — Bacterial Cystitis, Pyelonephritis, and Prostatitis.',
      sourceType: 'Capítulo de livro-texto',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-prostatite-davidson-bsava-2017',
      citationText:
        'Davidson AP. Management of prostatic disease. In: Elliott J, Grauer GF, Westropp JL, eds. BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. BSAVA; 2017. Chapter 25.',
      sourceType: 'Capítulo de manual',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-prostatite-sirinarumitr-2001',
      citationText:
        'Sirinarumitr K, Johnston SD, Root Kustritz MV, Johnston GR, Sarkar DK, Memon MA. Effects of finasteride on size of the prostate gland and semen quality in dogs with benign prostatic hypertrophy. JAVMA. 2001;218:1275–1280.',
      sourceType: 'Ensaio clínico',
      url: 'https://doi.org/10.2460/javma.2001.218.1275',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-prostatite-melandri-2021',
      citationText:
        'Melandri M, Alonge S. Highlights on the Canine Prostatic Specific Esterase (CPSE): A diagnostic and screening tool in veterinary andrology. Vet Med Sci. 2021;7:35–40.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.1002/vms3.349',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-prostatite-roura-2002',
      citationText:
        'Roura X, Camps-Palau MA, Lloret A, García F, Espada I. Bacterial prostatitis in a cat. J Vet Intern Med. 2002;16:593–597.',
      sourceType: 'Relato de caso',
      url: 'https://doi.org/10.1111/j.1939-1676.2002.tb02378.x',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-prostatite-bloomfield-2026',
      citationText:
        'Bloomfield L, May N, Holmes A, Frykfors von Hekkel A. Presentation, diagnosis and treatment of a prostatic abscess in an adult, male, neutered cat. Vet Rec Case Rep. 2026;14:e70253.',
      sourceType: 'Relato de caso',
      url: 'https://doi.org/10.1002/vrc2.70253',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-prostatite-greene-2012',
      citationText:
        'Greene CE, ed. Infectious Diseases of the Dog and Cat. 4th ed. Elsevier; 2012. Genitourinary bacterial infections.',
      sourceType: 'Capítulo de livro-texto',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-prostatite-bsava-formulary-2020',
      citationText:
        'Allerton F, ed. BSAVA Small Animal Formulary. Part A: Canine and Feline. 10th ed. BSAVA; 2020.',
      sourceType: 'Formulário',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
