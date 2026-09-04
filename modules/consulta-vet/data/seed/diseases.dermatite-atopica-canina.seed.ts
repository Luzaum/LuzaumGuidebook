import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Dermatite Atópica Canina (CAD) — Ficha clínica estruturada ConsultaVET.
 * Fontes: VINcyclopedia (05/08/2024) > ICADA Guidelines (Hensel 2015, Olivry 2015) > ISCAID Pyoderma 2025 > WAVD Malassezia 2020 > Plumb's 10ª ed. (Oclacitinib, Lokivetmab, Ciclosporina) > FDA Labels (Zenrelia 2025/2026, Numelvi 2026).
 */
export const dermatiteAtopicaCaninaRecord: DiseaseRecord = {
  id: 'disease-dermatite-atopica-canina',
  slug: 'dermatite-atopica-canina',
  title: 'Dermatite Atópica Canina',
  synonyms: [
    'CAD',
    'Canine Atopic Dermatitis',
    'Atopia canina',
    'Dermatite atópica em cães',
    'Dermatite alérgica inalante',
  ],
  species: ['dog'],
  category: 'dermatologia',
  tags: [
    'Apoquel',
    'Oclacitinib',
    'Cytopoint',
    'Lokivetmab',
    'Zenrelia',
    'Ilunocitinib',
    'Numelvi',
    'Atinvicitinib',
    'Ciclosporina',
    'ASIT',
    'Favrot',
    'ICADA',
    'ISCAID',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['dermatite-atopica-canina'],
  quickSummary:
    'A dermatite atópica canina (DAC) é uma doença inflamatória e pruriginosa crônica, geneticamente predisposta, associada a alterações da barreira epidérmica, disbiose cutânea e resposta imunológica anormal a alérgenos ambientais. Muitos cães apresentam sensibilização IgE-mediada, mas uma síndrome clinicamente indistinguível ocorre sem demonstração de IgE específica (dermatite atópica-like canina). O diagnóstico é obrigatoriamente de exclusão clínica — testes alérgicos (teste intradérmico [TID] ou IgE sérica) não diagnosticam atopia e servem apenas para selecionar alérgenos para a imunoterapia alérgeno-específica (ITE). Exacerbações frequentemente resultam de infecção secundária por *Staphylococcus pseudintermedius* ou *Malassezia*, ectoparasitas ou exposição alérgica; por isso, a citologia e reavaliação de fatores desencadeantes devem anteceder o simples aumento de antipruriginosos. A crise é manejada com glucocorticoide tópico em lesões focalizadas ou oclacitinib, ilunocitinib, atinvicitinib, lokivetmab e glucocorticoides orais curtos em prurido generalizado. A manutenção exige suporte de barreira, profilaxia infecciosa/parasitária, imunoterapia ou imunomodulação continuada (1–15,21).',
  quickDecisionStrip: [
    'Diagnóstico de Exclusão: Não existe exame de sangue que comprove atopia. IDT e IgE sérica servem para formular ASIT, não para diagnosticar (1,2).',
    'Alertas de Exacerbação: Piora súbita exige citologia cutânea/auricular e pente de pulga; infecções secundárias por Staph e Malassezia são os maiores vilões (1,3,6,7).',
    'Antipruriginoso Não Trata Infecção: Controlar IL-31/JAK alivia o prurido, mas a piodermite ou malasseziose exige tratamento específico em paralelo (1,3,6,7).',
    'Ciclosporina e ASIT Não São Resgate: A ciclosporina exige 4 a 6 semanas e a ASIT de 6 a 12 meses para demonstrar eficácia máxima (1,3,14,15).',
    'Critérios de Favrot: Início <3 anos, cão indoor, prurido responsivo a esteroides, lesão inicial ausente, patas anteriores e orelhas afetadas (1,4).',
    'Oclacitinib (Apoquel®): 0,4–0,6 mg/kg PO q12h por até 14 dias → q24h em cães ≥12 meses. Início de ação em poucas horas (8,9).',
    'Ilunocitinib (Zenrelia®): 0,6–0,8 mg/kg PO q24h (≥12m). Alerta vacinal FDA: suspender 28d a 3 meses antes da vacinação e não vacinar durante o uso (11,12).',
    'Atinvicitinib (Numelvi®): 0,8–1,2 mg/kg PO q24h COM ALIMENTO em cães ≥6 meses (aprovação FDA 2026) (13).',
    'Lokivetmab (Cytopoint®): Anticorpo monoclonal anti-IL-31 canino ≥2 mg/kg SC q4–8 sem (10). Início em 1–3 dias (10). NUNCA USAR EM GATOS (10).',
    'ISCAID 2025 Piodermite: Citologia prévia obrigatória. Terapia tópica (clorexidina/miconazol) é primeira escolha para piodermite superficial (6,7).',
  ],
  quickSummaryRich: {
    lead:
      'A dermatite atópica canina (CAD) é uma dermatose inflamatória crônica e pruriginosa desencadeada pela interação entre disfunção da barreira cutânea, disbiose e resposta neuroimune anormal mediada por citocinas como a IL-31. O diagnóstico exige exclusão rigorosa de parasitas, infecções e alergia alimentar; a conduta mescla controle de crises, restauração da barreira e imunoterapia/imunomodulação de longo prazo.',
    leadHighlights: ['disfunção da barreira', 'IL-31', 'exclusão rigorosa', 'restauração da barreira'],
    pillars: [
      {
        title: 'Barreira & Disbiose',
        body: 'Falhas no estrato córneo aumentam a perda transepidérmica de água (TEWL) e a penetração de alérgenos. A disbiose com *Staphylococcus* e *Malassezia* amplifica o prurido.',
        highlights: ['perda transepidérmica de água', 'Staphylococcus', 'Malassezia'],
      },
      {
        title: 'Eixo IL-31 & Vias JAK',
        body: 'A IL-31 liberada por células T ativadas estimula neurônios sensoriais via JAK1/2. Oclacitinib, Ilunocitinib e Atinvicitinib bloqueiam a cascata JAK, enquanto Lokivetmab neutraliza a IL-31.',
        highlights: ['IL-31', 'JAK1/2', 'Oclacitinib', 'Lokivetmab'],
      },
      {
        title: 'Manejo Estruturado de Crises',
        body: 'Identificar a causa da exacerbação (infecção, pulga, dieta) e aplicar terapia direcionada. Não substituir a citologia ou o tratamento antisséptico pelo simples aumento de antipruriginosos.',
        highlights: ['causa da exacerbação', 'citologia', 'tratamento antisséptico'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (exclusão)',
      steps: [
        {
          label: '1. História e distribuição',
          detail:
            'Início tipicamente <3 anos; prurido recorrente em face, orelhas, axilas, virilhas e patas. Aplicar critérios de Favrot como apoio, não como prova isolada (Olivry et al., ICADA 2015).',
        },
        {
          label: '2. Excluir ectoparasitas',
          detail:
            'Tratamento rigoroso contra pulgas (DAPP) por ≥4–8 semanas e raspado/pente para Sarcoptes, Demodex e outros. Pulga pode ser o único gatilho ou co-fator (Hensel et al., 2015).',
        },
        {
          label: '3. Excluir alergia alimentar',
          detail:
            'Dieta de eliminação exclusiva por 8–12 semanas com desafio opcional. Resposta alimentar não exclui atopia concomitante (Olivry et al., 2015).',
        },
        {
          label: '4. Excluir infecção secundária',
          detail:
            'Citologia cutânea/auricular antes de rotular “falha de antipruriginoso”. Piodermite por Staphylococcus e Malassezia amplificam prurido (ISCAID Pyoderma 2025).',
        },
        {
          label: '5. Confirmar DAC clinicamente',
          detail:
            'Após exclusões, o diagnóstico é clínico. Teste intradérmico (TID) ou IgE sérica NÃO diagnosticam — servem apenas para selecionar alérgenos da imunoterapia alérgeno-específica (ASIT) (Olivry et al., 2015).',
          limitations: 'IgE sérica tem sensibilidade/especificidade limitadas para diagnóstico primário.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico',
      steps: [
        {
          label: '1. Crise aguda',
          detail:
            'Identificar e tratar gatilho (infecção, pulga). Prurido focal: glucocorticoide tópico. Generalizado: oclacitinib 0,4–0,6 mg/kg q12h até 14 dias → q24h; lokivetmab ≥2 mg/kg SC q4–8 sem; ou glucocorticoide oral curto (Plumb\'s 10ª ed.).',
          reassess: 'Reavaliar em 2–4 semanas; citologia se piora.',
        },
        {
          label: '2. Infecção secundária',
          detail:
            'Piodermite superficial: terapia tópica antisséptica (clorexidina ± miconazol) como primeira linha (ISCAID 2025). Sistêmico se profunda, generalizada ou falha tópica.',
        },
        {
          label: '3. Manutenção de barreira',
          detail:
            'Shampoo/condicionador emoliente, ácidos graxos essenciais e controle ambiental de alérgenos. Base contínua independentemente do antipruriginoso sistêmico.',
        },
        {
          label: '4. Imunomodulação de longo prazo',
          detail:
            'ASIT após TID/IgE para formulação; ciclosporina 5 mg/kg q24h (4–6 sem para efeito máximo); ou oclacitinib/lokivetmab/ilunocitinib conforme perfil do paciente (Olivry et al., 2015).',
          duration: 'ASIT: 6–12 meses para resposta máxima; ciclosporina: manutenção após indução.',
        },
        {
          label: '5. Monitorização',
          detail:
            'Revisar otite, recidiva infecciosa, efeitos adversos de JAK/inibidores e adesão ambiental. Documentar vacinação se ilunocitinib (suspender 28 d–3 meses antes de vacinas — FDA Zenrelia).',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'A CAD é uma doença inflamatória e pruriginosa crônica da pele com predisposição genética, associada a alterações da barreira epidérmica, disbiose cutânea e resposta imunológica anormal a alérgenos ambientais (1,2,5).',
    disfunçãoBarreira:
      'O estrato córneo atópico apresenta falha nos lipídios intercelulares (cerâmicas, ácidos graxos) e corneócitos, levando a aumento da perda transepidérmica de água (TEWL), ressecamento e aumento da permeabilidade a alérgenos ambientais e microrganismos (1,5).',
    imunopatogeneseIL31:
      'A exposição transcutânea a alérgenos ativa queratinócitos e células apresentadoras de antígenos, induzindo resposta imune de perfil Th2 inicial com liberação de IL-4, IL-5, IL-13 e IL-31. A IL-31 liga-se a receptores em neurônios sensoriais periféricos ativando a via JAK/STAT, que transmite o sinal de PRURIDO diretamente ao SNC (1,5,8,10). Em fases crônicas, o perfil inflamatório expande-se para respostas Th1, Th17 e Th22 (1).',
    microbiomaEDisbiose:
      'Cães atópicos sofrem disbiose cutânea caracterizada pela queda da diversidade microbiana e expansão de *Staphylococcus pseudintermedius* e *Malassezia pachydermatis*, formando um ciclo vicioso de infecção secundária, inflamação e autotrauma (1,6,7).',
  },
  epidemiology: {
    prevalencia:
      'Dermatose muito frequente no cão. Os primeiros sinais aparecem tipicamente entre 6 meses e 3 anos de idade (1,2). Raças predispostas incluem West Highland White Terrier, Labrador, Golden Retriever, Bulldog Francês (variante SLAMF1 associada a risco elevado), Pastor Alemão, Cocker Spaniel, Shih-tzu e Poodle (1).',
  },
  pathogenesisTransmission: {
    cascata: [
      'Penetração percutânea de alérgenos ambientais através da barreira córnea alterada (1,2,5).',
      'Ativação de queratinócitos e células dendríticas epidérmicas (1,5).',
      'Apresentação antigênica e polarização de linfócitos T de perfil Th2 (1,5).',
      'Secreção de citocinas pró-inflamatórias e pruritogênicas, com destaque para IL-31 (5,8,10).',
      'Ligação da IL-31 ao receptor neurosensorial e ativação da sinalização intracelular via JAK1/STAT (5,8,10).',
      'Transmissão do estímulo pruritogênico das fibras C amielínicas ao corno dorsal da medula e ao córtex (5,8,10).',
      'Autotrauma por lambedura, coceira e mordedura → lesão epitelial mecânica e quebra adicional de barreira (1,5).',
      'Disbiose e colonização por *Staphylococcus pseudintermedius* e *Malassezia pachydermatis* (1,6,7).',
      'Amplificação da inflamação secundária, cronicidade, liquenificação e hiperhiperpigmentação (1).',
    ],
    transmissao:
      'Enfermidade endógena não contagiosa.',
  },
  pathophysiology:
    'A dermatite atópica canina resulta da ruptura da integridade da barreira epidérmica combinada com resposta imunológica de viés Th2/Th17. O dano de barreira facilita a proliferação microbiana e a penetração de alérgenos de ácaros (*Dermatophagoides farinae*, *D. pteronyssinus*, ácaros de estocagem), pólen e fungos. A IL-31 é o mediador central do prurido no cão, atuando diretamente em receptores neuronais periféricos dependentes das janus quinases (JAK1). O ato de coçar gera traumas mecânicos que promovem o extravasamento de alarminas, agravam a perda transepidérmica de água e favorecem piodermites superficiais e dermatites por *Malassezia*, que retroalimentam o prurido através da elevação do limiar de prurido (1,3,5–7).',
  clinicalSignsPathophysiology: [
    {
      system: 'dermatologico',
      findings: [
        {
          finding: 'Prurido e Eritema em Face, Pátas, Axilas, Virilhas e Orelhas',
          mechanism:
            'Distribuição anatômica clássica de sensibilização percutânea e densidade de receptores neuronais de IL-31 (1,2,5).',
          clinicalMeaning: 'Padrão característico atópico canino (Critérios de Favrot) (1,4).',
          priority: 'common',
        },
        {
          finding: 'Otite Externa Eritematosa e Ceruminosa Recorrente',
          mechanism:
            'O conduto auditivo externo é extensão da pele; a inflamação atópica favorece disbiose por *Malassezia* e *Staphylococcus* (1,7).',
          clinicalMeaning: 'Pode ser a primeira ou única manifestação da CAD em alguns cães (1,2).',
          priority: 'common',
        },
        {
          finding: 'Piodermite Superficial (Colaretes, Pústulas, Pápulas) e Malasseziose',
          mechanism:
            'Quebra de barreira e alteração do pH e lipídios da pele permitindo sobrecrescimento oportunista (1,6,7).',
          clinicalMeaning: 'Principal causa de exacerbação e piora aguda do prurido em cães sob tratamento (1,3,6).',
          priority: 'common',
        },
        {
          finding: 'Liquenificação, Hiperpigmentação e Alopecia Secundária',
          mechanism:
            'Autotrauma crônico repetitivo (coçar, lamber, mastigar) e deposição de colágeno/melanina no estrato córneo (1).',
          clinicalMeaning: 'Marcadores de doença crônica longa não controlada (1).',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: {
    triadeDiagnostica:
      'História compatível + Fenótipo clínico típico + Exclusão sistemática de ectoparasitoses, infecções e reação cutânea adversa ao alimento (1,2). Testes alérgicos (IDT ou IgE) NÃO diagnosticam atopia (1,2).',
    criteriosDeFavrot:
      'Critérios clínicos de Favrot (1,4): 1) Início antes dos 3 anos; 2) Cão que vive no ambiente interno; 3) Prurido responsivo a glucocorticoides; 4) Prurido inicial sem lesão visível; 5) Afetamento de patas anteriores; 6) Afetamento de orelhas; 7) Margem das orelhas não afetada; 8) Região dorsolombar não afetada. A presença de 5/8 itens confere Sensibilidade de ~85% e Especificidade de ~79% (1,4).',
    examesIniciais:
      'Citologia de impressão/fita adesiva da pele e conduto auditivo (pesquisa de *Staphylococcus* e *Malassezia*), pente de pulgas, raspados cutâneos superficiais e profundos (excluir *Demodex* e *Sarcoptes*), tricograma e cultura fúngica se indicado (1,2,6,7).',
    dietaDeEliminacao:
      'Recomendada para prurido não sazonal ou perene. Duração mínima de 8 semanas com proteína hidrolisada veterinária ou dieta caseira formulada (2). O diagnóstico de alergia alimentar exige provocação/desafio alimentar posterior para confirmação (1,2).',
    testesAlergicosIDTIgE:
      'O Teste Intradérmico (TID) e a sorologia para IgE específica são utilizados APENAS após o diagnóstico clínico de DAC para selecionar os alérgenos da Imunoterapia Alérgeno-Específica (ITE) (1,2). Cães saudáveis também apresentam testes positivos (1,2).',
  },
  treatment: {
    decisaoInicial:
      'Tratar as infecções secundárias ativas e afastar ectoparasitas antes ou em paralelo ao controle do prurido. O tratamento da crise exige rapidez, enquanto a manutenção requer um plano multimodal sustentável (1,3,6,7).',
    ordemDePrioridadeEstruturada: [
      {
        priority: 1,
        title: 'Manejo de Crise Localizada ou Generalizada',
        summary:
          'Localizada: Hidrocortisona aceponato 0,0584% spray q24h por 1–2 semanas (3,21). Generalizada: Oclacitinib (Apoquel®) 0,4–0,6 mg/kg PO q12h por até 14 dias (8,9); Ilunocitinib (Zenrelia®) 0,6–0,8 mg/kg q24h (11,12); Atinvicitinib (Numelvi®) 0,8–1,2 mg/kg q24h com comida (13); Prednisona 0,5–1 mg/kg/dia curso curto (3); ou Lokivetmab (Cytopoint®) ≥2 mg/kg SC (10).',
      },
      {
        priority: 2,
        title: 'Tratamento de Infecções Secundárias (ISCAID 2025 & WAVD 2020)',
        summary:
          'Piodermite superficial: banhos antissépticos tópicos com Clorexidina 2–4% (6). Malasseziose: shampoo Miconazol 2% + Clorexidina 2% 2×/semana (7). Reservar antibiótico sistêmico para piodermite profunda ou falha tópica comprovada por cultura (6).',
      },
      {
        priority: 3,
        title: 'Terapia de Manutenção de Longo Prazo',
        summary:
          'Oclacitinib 0,4–0,6 mg/kg PO q24h (8,9); Lokivetmab SC a cada 4–8 semanas (10); ou Ciclosporina modificada 5 mg/kg PO q24h por 4–6 semanas (14) com redução para q48h ou 2×/semana conforme resposta (14). Tacrolimus 0,1% tópico para lesões focalizadas (3,14).',
      },
      {
        priority: 4,
        title: 'Suporte de Barreira Cutânea & Banhos',
        summary:
          'Banhos com shampoos hidratantes contendo ceramidas, ácidos graxos essenciais (AGE) ou fitoesfingosina (1,3). Remoção física de alérgenos ambientais da pelagem após passeios. Suplementação oral de AGE (efeito modesto em semanas) (1,3,5).',
      },
      {
        priority: 5,
        title: 'Imunoterapia Alérgeno-Específica (ITE)',
        summary:
          'Única intervenção capaz de modificar o curso da doença através da indução de tolerância imune Treg/IL-10 (1,15). Eficácia de 60–75% (1). Requer de 6 a 12 meses de acompanhamento continuado para avaliação completa (1,15).',
      },
    ],
    protocoloTerapeutico:
      'Para a crise antipruriginosa rápida em cães ≥12 meses, administrar Oclacitinib 0,4–0,6 mg/kg q12h por 14 dias, passando a q24h na manutenção. Em cães com otite ou lesões bacterianas/fúngicas associadas, associar terapia tópica específica conforme a citologia (1,3,6–9).',
    monitoramento: [
      'Monitorar a escala visual analógica de prurido do tutor (EVAP) e lesões cutâneas (CADESI-4) periodicamente (1,3).',
      'Reavaliar crises em 7 a 14 dias com nova citologia de pele e orelha (1,3,6).',
      'Oclacitinib em uso crônico: exames de rotina (hemograma completo, bioquímica, urinálise) a cada 6 a 12 meses conforme perfil de risco (8).',
      'Ciclosporina: monitorar efeitos gastrointestinais (vômitos/diarreia) e hiperplasia gengival (14).',
    ],
  },
  complications: {
    piodermiteRecorrente:
      'Piodermite superficial/profunda recorrente por *Staphylococcus pseudintermedius* (incluindo MRSP). Requer citologia e cultura com antibiograma (6).',
    malasseziose:
      'Dermatite por sobrecrescimento de *Malassezia pachydermatis* em dobras e patas. Exige citologia e antifúngicos tópicos (7).',
    otiteCronica:
      'Otite externa crônica com estenose do conduto, hiperplasia glandular e calcificação. Exige otoscopia e controle de fundo alérgico (1,3).',
  },
  figures: [
    {
      kind: 'clinicalFigure',
      id: 'fig-icada-diagnosis-cad',
      src: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/canine-atopic-dermatitis-anatomy-diagram-science-photo-library.jpg',
      alt: 'Diagrama de distribuição anatômica da dermatite atópica canina',
      caption:
        'Distribuição clássica das lesões na dermatite atópica canina (CAD): eritema e prurido em face, periocular, orelhas, axilas, virilhas, superfícies flexoras e patas interdigitais. Fonte: ICADA Guidelines (Hensel et al., 2015, CC BY 4.0).',
      display: 'wide',
    },
  ],
  relatedConsensusSlugs: [
    'consensual-dermatologia-icada-cad-diagnosis',
    'consensual-dermatologia-icada-cad-treatment',
  ],
  relatedDiseaseSlugs: [
    'sindrome-cutanea-atopica-felina',
    'otite-externa',
    'escabiose-canina',
    'demodicose-canina',
  ],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-vin-cad-2024',
      citationText:
        'Doerr K, Tater K. Atopic Dermatitis (Canine); Atopic Dermatitis (Feline). VINcyclopedia of Diseases. Revised August 5, 2024.',
      sourceType: 'Enciclopédia Clínica VIN',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-hensel-icada-2015',
      citationText:
        'Hensel P, Santoro D, Favrot C, Hill P, Griffin C. Canine atopic dermatitis: detailed guidelines for diagnosis and allergen identification. BMC Vet Res. 2015;11:196.',
      sourceType: 'Diretriz ICADA Diagnóstico',
      url: 'https://link.springer.com/article/10.1186/s12917-015-0515-5',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-olivry-icada-2015',
      citationText:
        'Olivry T, DeBoer DJ, Favrot C, et al. Treatment of canine atopic dermatitis: 2015 updated guidelines from the International Committee on Allergic Diseases of Animals. BMC Vet Res. 2015;11:210.',
      sourceType: 'Diretriz ICADA Tratamento',
      url: 'https://link.springer.com/article/10.1186/s12917-015-0514-6',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-favrot-2010',
      citationText:
        'Favrot C, Steffan J, Seewald W, et al. A prospective study on the clinical features of chronic canine atopic dermatitis and its diagnosis. Vet Dermatol. 2010;21:23–31.',
      sourceType: 'Estudo Clínico Prospective',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-tizard-immunology-11th',
      citationText:
        'Tizard IR. Veterinary Immunology. 11th ed. Elsevier. Chapter on hypersensitivity and atopic dermatitis.',
      sourceType: 'Tratado de Imunologia',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-iscaid-pyoderma-2025',
      citationText:
        'Loeffler A, et al. Antimicrobial use guidelines for canine pyoderma by the International Society for Companion Animal Infectious Diseases. Vet Dermatol. 2025.',
      sourceType: 'Diretriz ISCAID 2025',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12058580/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-wavd-malassezia-2020',
      citationText:
        'Bond R, Morris DO, Guillot J, et al. Biology, diagnosis and treatment of Malassezia dermatitis in dogs and cats: Clinical Consensus Guidelines of the World Association for Veterinary Dermatology. Vet Dermatol. 2020.',
      sourceType: 'Consenso WAVD 2020',
      url: 'https://wavd.org/wp-content/uploads/summary-of-clinical-consensus-guidelines-biology-diagnosis-treatment-of-malassezia-dermatitis.pdf',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumbs-oclacitinib',
      citationText:
        'Budde JA, McCluskey DM. Plumb\'s Veterinary Drug Handbook. 10th ed. 2023. Oclacitinib monograph.',
      sourceType: 'Guia Farmacológico',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fda-apoquel-foi',
      citationText:
        'FDA. Freedom of Information Summary — Apoquel/oclacitinib. NADA 141-345.',
      sourceType: 'Documento Oficial FDA',
      url: 'https://animaldrugsatfda.fda.gov/adafda/app/search/public/document/downloadFoi/14146',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumbs-lokivetmab',
      citationText:
        'Plumb\'s Veterinary Drug Handbook. 10th ed. 2023. Lokivetmab monograph; Zoetis Brasil product information.',
      sourceType: 'Guia Farmacológico / Bula',
      url: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/dermatologia/cytopoint/cytopoint',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-forster-ilunocitinib-2025',
      citationText:
        'Forster S, Boegel A, Despa S, et al. Comparative efficacy and safety of ilunocitinib and oclacitinib for control of pruritus and associated skin lesions in dogs with atopic dermatitis. Vet Dermatol. 2025.',
      sourceType: 'Ensaio Clínico Randomizado (338 cães)',
      url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/vde.13319',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fda-zenrelia-label-2025',
      citationText:
        'FDA. Zenrelia — Animal Drug Safety-Related Labeling Changes. Revised labeling, 2025/current 2026.',
      sourceType: 'Rotulagem Oficial FDA',
      url: 'https://www.fda.gov/animal-veterinary/drug-labels/animal-drug-safety-related-labeling-changes',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fda-numelvi-2026',
      citationText:
        'FDA. Freedom of Information Summary NADA 141-596. Numelvi (atinvicitinib). Approved February 25, 2026.',
      sourceType: 'Aprovação Oficial FDA 2026',
      url: 'https://animaldrugsatfda.fda.gov/adafda/app/search/public/document/downloadFoi/18155',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumbs-cyclosporine',
      citationText:
        'Budde JA, McCluskey DM. Plumb\'s Veterinary Drug Handbook. 10th ed. 2023. Cyclosporine monograph.',
      sourceType: 'Guia Farmacológico',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-mueller-asit-2023',
      citationText:
        'Mueller RS. A systematic review of allergen immunotherapy, a successful therapy for canine atopic dermatitis and feline atopic skin syndrome. J Am Vet Med Assoc. 2023;261(S1):S30–S35.',
      sourceType: 'Revisão Sistemática JAVMA',
      url: 'https://avmajournals.avma.org/view/journals/javma/261/S1/javma.22.12.0576.xml',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-nuttall-hca-2009',
      citationText:
        'Nuttall T, et al. Efficacy of a 0.0584% hydrocortisone aceponate spray in the management of canine atopic dermatitis. Vet Dermatol. 2009.',
      sourceType: 'Estudo Clínico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19374721/',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
