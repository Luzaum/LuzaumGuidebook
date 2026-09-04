import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Síndrome Cutânea Atópica Felina (FASS) — Ficha clínica estruturada ConsultaVET.
 * Fontes: VINcyclopedia (05/08/2024) > ICADA Feline Consensus (Halliwell 2021, Santoro 2021, Mueller 2021) > Plumb's 10ª ed. (Atopica for Cats, Oclacitinib felino) > WAVD Malassezia 2020.
 */
export const sindromeCutaneaAtopicaFelinaRecord: DiseaseRecord = {
  id: 'disease-sindrome-cutanea-atopica-felina',
  slug: 'sindrome-cutanea-atopica-felina',
  title: 'Síndrome Cutânea Atópica Felina',
  synonyms: [
    'FASS',
    'Feline Atopic Skin Syndrome',
    'Atopia felina',
    'FAS',
    'Dermatite atópica felina',
    'Non-flea non-food hypersensitivity dermatitis',
  ],
  species: ['cat'],
  category: 'dermatologia',
  tags: [
    'FASS',
    'FAS',
    'Ciclosporina',
    'AtopicaCats',
    'Prednisolona',
    'Eosinofilico',
    'DermatiteMiliar',
    'AlopeciaAutoinduzida',
    'Plantigradia',
    'iCatCare',
    'ICADA',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindrome-cutanea-atopica-felina'],
  quickSummary:
    'A síndrome cutânea atópica felina (FASS) é uma síndrome alérgica cutânea inflamatória e pruriginosa associada principalmente a alérgenos ambientais, cuja imunopatogênese difere substancialmente da dermatite atópica canina e cuja associação com IgE é inconsistente. Manifesta-se clinicamente através de quatro grandes padrões reacionais felinos: 1) Alopecia autoinduzida/simétrica; 2) Dermatite miliar pápulocrostosa; 3) Complexo granuloma eosinofílico (placa eosinofílica, úlcera indolente, granuloma); 4) Prurido e escoriações de cabeça e pescoço. Nenhum desses quatro padrões é etiologia específica — pulgas (DAPP), ectoparasitas (Demodex gatoi, Notoedres, Otodectes), dermatofitose e alergia alimentar produzem lesões idênticas. Portanto, FASS é obrigatoriamente um diagnóstico de exclusão clínica. Na crise, a prednisolona oral curta é a primeira linha. Para manutenção, a ciclosporina modificada (7 mg/kg PO q24h com desmame gradual) possui a melhor evidência. Lokivetmab (Cytopoint®) é CONTRAINDICADO em gatos. Oclacitinib permanece fora da bula com evidência limitada (1,16–20).',
  quickDecisionStrip: [
    'Nomenclatura Oficial ICADA: Denominada Síndrome Cutânea Atópica Felina (FASS), parte da Síndrome Atópica Felina (FAS) (1,16,17).',
    'Os 4 Padrões Reacionais: 1) Alopecia autoinduzida; 2) Dermatite miliar; 3) Complexo granuloma eosinofílico; 4) Escoriações de cabeça/pescoço (1,17).',
    'Padrão Não É Diagnóstico: NENHUM padrão confirma FASS isoladamente. DAPP, alimento, Demodex gatoi e dermatofitose geram lesões idênticas (1,17).',
    'Auto-lambeção Escondida: O gato coça e arranca pelos à noite e escondido. Ausência de relato de coceira pelo tutor não exclui prurido (1,17).',
    'Diagnóstico Por Exclusão: Excluir pulgas, ectoparasitas (D. gatoi/Notoedres), infecções fúngicas/bacterianas e alergia alimentar (dieta + desafio) (1,17).',
    'Crise Aguda Felina: Prednisolona oral 1 mg/kg q12–24h (1). Usar PREDNISOLONA em vez de prednisona devido à conversão hepática felina reduzida (1).',
    'Manutenção Preferida: Ciclosporina modificada (Atopica® Gatos) 7 mg/kg PO q24h por ≥4–6 semanas → desmame para q48h e 2×/semana (~75% dos gatos) (19).',
    'PROIBIDO EM GATOS: Lokivetmab (Cytopoint®) é anticorpo caninizado para IL-31 canina — NUNCA APLICAR EM FELINOS (10).',
    'Oclacitinib no Gato (Fora da Bula): Evidência limitada (Mueller 2021). ~1 mg/kg PO q12–24h em refratários. Atenção a risco de toxoplasmose (18,20).',
    'Cuidado Imunossupressor: Testar FeLV/FIV e evitar carne crua/caça (risco de toxoplasmose sistêmica durante uso de ciclosporina) (19).',
  ],
  quickSummaryRich: {
    lead:
      'A síndrome cutânea atópica felina (FASS) abrange as manifestações cutâneas alérgicas ambientais em felinos, expressas por quatro padrões de reação típicos. Devido ao mimetismo de doenças parasitárias e alimentares, o diagnóstico depende de rigoroso protocolo de exclusão e a manutenção fundamenta-se no uso da ciclosporina modificada ou prednisolona.',
    leadHighlights: ['FASS', 'quatro padrões de reação', 'protocolo de exclusão', 'ciclosporina modificada'],
    pillars: [
      {
        title: 'Os 4 Padrões Reacionais Felinos',
        body: 'Alopecia autoinduzida simétrica, dermatite miliar, complexo granuloma eosinofílico e prurido de cabeça/pescoço representam reações da pele felina a múltiplos estímulos, não apenas atopia.',
        highlights: ['Alopecia autoinduzida', 'Dermatite miliar', 'Complexo granuloma eosinofílico', 'cabeça e pescoço'],
      },
      {
        title: 'Imunoterapia & Terapia Sistêmica',
        body: 'Prednisolona oral na crise e Ciclosporina 7 mg/kg q24h na manutenção formam a espinha dorsal de evidência (ICADA 2021). Cytopoint é totalmente contraindicado em gatos.',
        highlights: ['Prednisolona', 'Ciclosporina 7 mg/kg', 'Cytopoint contraindicado'],
      },
      {
        title: 'Vigilância Imunológica',
        body: 'Antes da ciclosporina crônica, checar sorologia para *Toxoplasma gondii* e retroviroses (FeLV/FIV), orientando a eliminação de carne crua e acesso à rua.',
        highlights: ['Toxoplasma gondii', 'FeLV/FIV', 'carne crua'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (exclusão)',
      steps: [
        {
          label: '1. Reconhecer padrão reacional',
          detail:
            'Quatro padrões: alopecia autoinduzida, dermatite miliar, complexo granuloma eosinofílico, prurido de cabeça/pescoço. Nenhum confirma FASS isoladamente (Halliwell et al., ICADA 2021).',
        },
        {
          label: '2. Excluir DAPP e ectoparasitas',
          detail:
            'Controle rigoroso de pulgas + investigar Demodex gatoi, Notoedres, Otodectes e dermatofitose. Lesões mimetizam FASS (Mueller et al., 2021).',
        },
        {
          label: '3. Excluir alergia alimentar',
          detail:
            'Dieta de eliminação exclusiva por 8–12 semanas. Resposta parcial não exclui sensibilização ambiental concomitante.',
        },
        {
          label: '4. Tricograma e citologia',
          detail:
            'Tricograma confirma pelo quebrado por auto-lambeção. Citologia descarta infecção bacteriana/Malassezia secundária.',
        },
        {
          label: '5. Confirmar FASS clinicamente',
          detail:
            'Após exclusões, diagnóstico é clínico. TID/IgE sérica têm correlação fraca no gato — não usar para diagnóstico primário (Halliwell et al., 2021).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico',
      steps: [
        {
          label: '1. Crise aguda',
          detail:
            'Prednisolona 1 mg/kg PO q12–24h (preferir prednisolona, não prednisona, pela conversão hepática felina reduzida). Taper após controle em 2–4 semanas.',
          reassess: 'Reavaliar prurido, efeitos adversos e peso.',
        },
        {
          label: '2. Manutenção preferencial',
          detail:
            'Ciclosporina modificada (Atopica® Gatos) 7 mg/kg PO q24h por ≥4–6 semanas → desmame para q48h ou 2×/semana em ~75% dos casos (Santoro et al., 2021).',
          duration: 'Manutenção mínima eficaz após indução.',
        },
        {
          label: '3. Alternativas refratárias',
          detail:
            'Oclacitinib ~1 mg/kg q12–24h — fora da bula, evidência limitada; cautela com toxoplasmose. Lokivetmab (Cytopoint®) é CONTRAINDICADO em gatos.',
        },
        {
          label: '4. Vigilância pré-imunossupressor',
          detail:
            'FeLV/FIV, Toxoplasma; evitar carne crua/caça durante ciclosporina crônica. Monitorar função renal e PA.',
        },
        {
          label: '5. Controle ambiental',
          detail:
            'Redução de alérgenos (ácaros, pólen), enriquecimento ambiental e manejo de estresse — especialmente se asma felina concomitante.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'A Síndrome Atópica Cutânea Felina (SACF) é uma síndrome alérgica cutânea inflamatória e pruriginosa não parasitária e não alimentar, associada principalmente a alérgenos ambientais (1,16,17).',
    imunopatogeneseFelina:
      'A imunopatogênese felina é predominantemente Th2 com infiltração de eosinófilos e linfócitos CD4+, mas o papel da barreira epidérmica e a concordância de IgE sérica/teste intradérmico (TID) são substancialmente menos consistentes do que no cão (1,16,17).',
    osQuatroPadroesReacionais:
      '1) Alopecia autoinduzida (auto-lambeção excessiva sem lesão inflamatória óbvia); 2) Dermatite miliar (pápulas eritematocrostosas multifocais); 3) Complexo granuloma eosinofílico (placa eosinofílica pruriginosa, úlcera indolente labial, granuloma eosinofílico linear); 4) Prurido e escoriações de cabeça e pescoço (1,16,17).',
  },
  epidemiology: {
    prevalencia:
      'Início frequente em gatos jovens e adultos (a partir de 6 meses de idade). Sem predisposição sexual evidente (1,17). Pode vir acompanhada de manifestações alérgicas respiratórias (asma felina) em parte dos pacientes (1,16).',
  },
  pathogenesisTransmission: {
    cascata: [
      'Deposição de glicoproteínas salivares na superfície do esmalte felino e formação da película em minutos.',
      'Sensibilização imunológica a alérgenos ambientais (ácaros, pólen, fungos) (1,16).',
      'Ativação de linfócitos CD4+ e desregulação citocínica de perfil Th2 (1,16).',
      'Recrutamento e desgranulação de eosinófilos e mastócitos na derme felina (1,16).',
      'Sinalização pruritogênica periférica induzindo comportamento compulsivo de auto-lambeção (1,17).',
      'Produção dos padrões reacionais: alopecia mecânica por língua abrasiva, pápulas miliares ou lesões eosinofílicas (1,17).',
      'Dano tecidual secundário por autotrauma com unhas e dentes → crostas, escoriações e úlceras (1,17).',
      'Infecção secundária ocasional por *Staphylococcus* ou *Malassezia* agravando o prurido (1,7,17).',
    ],
    transmissao:
      'Enfermidade endógena não contagiosa.',
  },
  pathophysiology:
    'No gato alérgico, a pele responde ao estresse imunológico através de padrões estereotipados. A língua áspera e filiforme do felino atua como uma lixa que arranca fios de cabelo na junção folicular (gerando alopecia autoinduzida com tricograma demonstrando hastes fraturadas). A desgranulação eosinofílica tecidual gera placas eritematotas elevadas (placas eosinofílicas) ou lesões ulceradas no bordo labial (úlcera indolente). Ao contrário do cão, a demonstração de IgE sérica específica possui fraca correlação clínica no gato, tornando os alérgotestes inapropriados para diagnóstico primário. Além disso, medicamentos desenvolvidos para cães, como o anticorpo monoclonal caninizado Lokivetmab (Cytopoint®), são ineficazes e imuno-incompatíveis em felinos (1,10,16,17).',
  clinicalSignsPathophysiology: [
    {
      system: 'dermatologico',
      findings: [
        {
          finding: 'Alopecia Autoinduzida Simétrica (Abdome, Flancos, Coxas)',
          mechanism:
            'Auto-lambeção compulsiva secundária a prurido. Fisiologicamente, o pelo fratura pela ação mecânica da língua felina (1,17).',
          clinicalMeaning: 'Padrão clássico. Exige tricograma para confirmar que o pelo foi quebrado e não caiu espontaneamente (1,17).',
          priority: 'common',
        },
        {
          finding: 'Dermatite Miliar (Pápulas Crostosas no Pescoço e Dorso)',
          mechanism:
            'Microabscessos eosinofílicos e espongiose folicular com crostas serofibrinosas punctiformes (1,17).',
          clinicalMeaning: 'Fácil de palpar. Excluir DAPP, Demodex gatoi e dermatofitose (1,17).',
          priority: 'common',
        },
        {
          finding: 'Placa Eosinofílica e Úlcera Indolente Labial',
          mechanism:
            'Infiltração eosinofílica massiva da derme e epiderme com úlceração tecidual imuno-mediada (1,17).',
          clinicalMeaning: 'Manifestações do Complexo Granuloma Eosinofílico. Exigem exclusão alérgica ampla (1,17).',
          priority: 'common',
        },
        {
          finding: 'Prurido Severo com Escoriações em Cabeça e Pescoço',
          mechanism:
            'Hipersensibilidade de mastócitos e eosinófilos locais levando a trauma com as garras pélvicas (1,17).',
          clinicalMeaning: 'Excluir Otodectes cynotis, Notoedres cati e alergia alimentar antes de concluir FASS (1,17).',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: {
    triadeDiagnostica:
      'Presença de 1 ou mais dos 4 padrões reacionais felinos + Exclusão estrita de DAPP, ectoparasitas (Demodex gatoi, Notoedres, Otodectes), dermatofitose, infecções e Reação Cutânea Adversa ao Alimento (1,17).',
    examesIniciais:
      'Pente de pulgas em todos os contactantes, citologia cutânea por fita/imprint para pesquisa de *Staphylococcus* e *Malassezia*, raspados superficiais múltiplos para Demodex gatoi e Notoedres cati, otoscopia e citologia ceruminosa, tricograma (verificar hastes quebradas), exame sob Lâmpada de Wood e cultura/PCR fúngico para Microsporum canis (1,17).',
    dietaDeEliminacaoFelina:
      'Indispensável para sinais não sazonais, dermatite de cabeça/pescoço ou lesões eosinofílicas. Duração de 8 semanas com proteína hidrolisada felina veterinária exclusiva, seguida obrigatoriamente de desafio alimentar para confirmação (1,17).',
    testesAlergicosFelinos:
      'IDT ou IgE sérica felina NUNCA são utilizados para diagnosticar FASS (1,17). Apresentam baixa concordância e servem unicamente para selecionar os alérgenos da ASIT felina em gatos com diagnóstico clínico já estabelecido (1,15,17).',
  },
  treatment: {
    decisaoInicial:
      'Garantir controle antiparasitário de pulgas e ácaros em 100% dos gatos da casa. Tratar infecções bacterianas ou fúngicas concomitantes. Escolher entre Prednisolona na crise aguda e Ciclosporina modificada na manutenção crônica (1,17–19).',
    ordemDePrioridadeEstruturada: [
      {
        priority: 1,
        title: 'Manejo de Crise Aguda (Prednisolona Oral)',
        summary:
          'Prednisolona 1 mg/kg PO q12–24h por curso curto (1–2 semanas) até redução do prurido e cicatrizamento das escoriações (1). Usar PREDNISOLONA em vez de prednisona devido à deficiência metabólica hepática de conversão no gato (1). Evitar glicocorticoides de depósito injetáveis de longa duração sempre que possível (1).',
      },
      {
        priority: 2,
        title: 'Terapia de Manutenção de Escolha (Ciclosporina Modificada)',
        summary:
          'Ciclosporina modificada (Atopica® para Gatos 100 mg/mL): 7 mg/kg PO q24h durante 4 a 6 semanas (19). Após controle, reduzir para q48h e depois para 2×/semana (aproximadamente 75% dos gatos mantêm controle com frequência reduzida) (18,19).',
      },
      {
        priority: 3,
        title: 'Segurança Imunológica Antes da Ciclosporina',
        summary:
          'Testar sorologia para *Toxoplasma gondii* e FeLV/FIV antes do uso prolongado de ciclosporina (19). Gatos soronegativos para *T. gondii* não devem consumir carne crua nem ter acesso à caça durante o tratamento imunossupressor (19).',
      },
      {
        priority: 4,
        title: 'Fármacos Fora da Bula e Alternativas (Oclacitinib Felino)',
        summary:
          'Oclacitinib (Apoquel®) no gato: uso fora da bula com evidência limitada (18,20). Protocolos estudados utilizam ~1 mg/kg PO q12–24h (20). Reservar exclusivamente para casos refratários onde prednisolona e ciclosporina falharam ou são contraindicadas (18,20).',
      },
      {
        priority: 5,
        title: 'Imunoterapia Alérgeno-Específica Felina (ASIT)',
        summary:
          'ASIT por via injetável (SCIT) ou sublingual (SLIT) possui resposta clinicamente relevante em ~60% dos gatos atópicos (1,15). Exige de 6 a 12 meses de acompanhamento continuado para consolidação da resposta tolerogênica (1,15).',
      },
    ],
    protocoloTerapeutico:
      'Para a crise felina intensa, iniciar Prednisolona 1 mg/kg q24h PO por 10 a 14 dias com desmame rápido. Para a manutenção de longo prazo, prescrever Ciclosporina 7 mg/kg q24h PO com alimento ou na boca por 4 a 6 semanas, passando para q48h assim que as lesões cicatrizarem (1,18,19).',
    monitoramento: [
      'Acompanhar padrão de auto-lambeção, cicatrizamento de placas/crostas e ganho de peso corporal (1,17).',
      'Monitorar tolerância gastrointestinal da ciclosporina (vômitos e diarreia são os efeitos colaterais mais comuns nas primeiras semanas) (19).',
      'Glicemia de jejum e urinálise periódicas em gatos sob corticoides prolongados para afastar diabetes iatrogênico (1,2).',
      'Reavaliar citologia cutânea a cada exacerbação (1,7,17).',
    ],
  },
  complications: {
    placasEosinofilicasRecorrentes:
      'Placas pruriginosas e exsudativas em região ventral e medial de coxas. Exigem exclusão alimentar e parasitária estrita (1,17).',
    dermatofitoseSecundária:
      'Infecção por Microsporum canis facilitada pelo autotrauma e uso de esteroides. Confirma-se por cultura ou PCR fúngico (1,17).',
    toxoplasmoseDisseminada:
      'Complicação rara em gatos sob imunossupressão intensa por ciclosporina ou oclacitinib que caçam ou consomem carne crua (19,20).',
  },
  figures: [
    {
      kind: 'clinicalFigure',
      id: 'fig-fass-patterns',
      src: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/feline-atopic-syndrome-reaction-patterns-diagram-science-photo-library.jpg',
      alt: 'Quatro padrões reacionais da Síndrome Cutânea Atópica Felina',
      caption:
        'Os 4 padrões reacionais clássicos da FASS: alopecia autoinduzida, dermatite miliar, complexo granuloma eosinofílico e prurido de cabeça/pescoço. Fonte: ICADA Feline Guidelines (Santoro et al., 2021).',
      display: 'wide',
    },
  ],
  relatedConsensusSlugs: [
    'consensual-dermatologia-icada-fass-diagnosis',
    'consensual-dermatologia-icada-fass-treatment',
  ],
  relatedDiseaseSlugs: [
    'dermatite-atopica-canina',
    'asma-felina',
    'granuloma-eosinofilico-felino',
    'gengivoestomatite-cronica-felina',
  ],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-vin-fass-2024',
      citationText:
        'Doerr K, Tater K. Atopic Dermatitis (Canine); Atopic Dermatitis (Feline). VINcyclopedia of Diseases. Revised August 5, 2024.',
      sourceType: 'Enciclopédia Clínica VIN',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumbs-prednisolona-feline',
      citationText:
        "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook. 10th ed. 2023. Prednisolone/prednisone monographs — metabolismo hepático felino e monitorização de glicemia sob corticoide.",
      sourceType: 'Guia Farmacológico',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-halliwell-feline-immunopathogenesis-2021',
      citationText:
        'Halliwell R, Banovic F, Mueller RS, Olivry T. Immunopathogenesis of the feline atopic syndrome. Vet Dermatol. 2021;32:13-e4.',
      sourceType: 'Diretriz ICADA Imunopatogenese Felina',
      url: 'https://doi.org/10.1111/vde.12927',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-prost-feline-food-allergy-2021',
      citationText:
        'Prost C, Nuttall T, Costello M, et al. Food allergy in cats: diagnosis and treatment. Vet Dermatol. 2021;32:23-e6.',
      sourceType: 'Diretriz ICADA Alergia Alimentar Felina',
      url: 'https://doi.org/10.1111/vde.12934',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumbs-cyclosporine',
      citationText:
        "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook. 10th ed. 2023. Cyclosporine monograph.",
      sourceType: 'Guia Farmacológico',
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
      id: 'ref-wavd-malassezia-cat-2020',
      citationText:
        'Bond R, Morris DO, Guillot J, et al. Biology, diagnosis and treatment of Malassezia dermatitis in dogs and cats: Clinical Consensus Guidelines of the World Association for Veterinary Dermatology. Vet Dermatol. 2020.',
      sourceType: 'Consenso WAVD 2020',
      url: 'https://wavd.org/wp-content/uploads/summary-of-clinical-consensus-guidelines-biology-diagnosis-treatment-of-malassezia-dermatitis.pdf',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-pucheu-haston-flea-feline-2021',
      citationText:
        'Pucheu-Haston CM, Prost C, Jackson H, et al. Flea allergy dermatitis in the cat: guidelines for diagnosis and treatment. Vet Dermatol. 2021;32:39-e4.',
      sourceType: 'Diretriz ICADA DAPP Felina',
      url: 'https://doi.org/10.1111/vde.12932',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-bizikova-cyclosporine-cat-2008',
      citationText:
        'Bizikova P, Olivry T. Cyclosporine in the treatment of feline atopic dermatitis: a systematic review. Vet Dermatol. 2008;19(6):324-332.',
      sourceType: 'Revisão Ciclosporina Felina',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19012701/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-plumbs-lokivetmab-contraindication',
      citationText:
        "Plumb's Veterinary Drug Handbook. Lokivetmab monograph; Zoetis Brasil product information — Cytopoint® contraindicado em felinos.",
      sourceType: 'Bula Oficial Cytopoint',
      url: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/dermatologia/cytopoint/cytopoint',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-jackson-feline-atopic-overview-2021',
      citationText:
        'Jackson H, Santoro D, Prost C, Mueller RS. Feline atopic syndrome: an overview. Vet Dermatol. 2021;32:18-e3.',
      sourceType: 'Revisão ICADA Felina',
      url: 'https://doi.org/10.1111/vde.12931',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-schulz-feline-dermatophytosis-2021',
      citationText:
        'Schulz B, Mueller RS, Nuttall T. Dermatophytosis in cats: diagnosis and treatment. Vet Dermatol. 2021;32:35-e5.',
      sourceType: 'Diretriz ICADA Dermatofitose Felina',
      url: 'https://doi.org/10.1111/vde.12930',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-nuttall-feline-topical-2021',
      citationText:
        'Nuttall T, Mueller RS, Prost C. Topical therapy in the cat: a systematic review. Vet Dermatol. 2021;32:48-e9.',
      sourceType: 'Revisão ICADA Terapia Tópica Felina',
      url: 'https://doi.org/10.1111/vde.12937',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-banovic-feline-parasites-2021',
      citationText:
        'Banovic F, Pucheu-Haston CM, Santoro D. Ectoparasitic infestations in cats: diagnosis and treatment. Vet Dermatol. 2021;32:31-e7.',
      sourceType: 'Diretriz ICADA Ectoparasitas Felinos',
      url: 'https://doi.org/10.1111/vde.12929',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-mueller-asit-2023-cat',
      citationText:
        'Mueller RS. A systematic review of allergen immunotherapy, a successful therapy for canine atopic dermatitis and feline atopic skin syndrome. J Am Vet Med Assoc. 2023;261(S1):S30–S35.',
      sourceType: 'Revisão Sistemática JAVMA — ASIT Felina',
      url: 'https://avmajournals.avma.org/view/journals/javma/261/S1/javma.22.12.0576.xml',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-halliwell-feline-nomenclature-2021',
      citationText:
        'Halliwell R, Pucheu-Haston CM, Olivry T, et al. Feline allergic diseases: introduction and proposed nomenclature. Vet Dermatol. 2021;32:8-e2.',
      sourceType: 'Nomenclatura Oficial ICADA Felina',
      url: 'https://doi.org/10.1111/vde.12899',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-santoro-fass-diagnosis-2021',
      citationText:
        'Santoro D, Pucheu-Haston CM, Prost C, Mueller RS, Jackson H. Clinical signs and diagnosis of feline atopic syndrome: detailed guidelines for a correct diagnosis. Vet Dermatol. 2021;32:26-e6.',
      sourceType: 'Diretriz ICADA Diagnóstico Felino',
      url: 'https://pubmed.ncbi.nlm.nih.gov/33470017/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-mueller-fass-treatment-2021',
      citationText:
        'Mueller RS, Nuttall T, Prost C, Schulz B, Bizikova P. Treatment of the feline atopic syndrome — a systematic review. Vet Dermatol. 2021;32:43-e8.',
      sourceType: 'Revisão Sistemática ICADA Tratamento Felino — ciclosporina e desmame',
      url: 'https://pubmed.ncbi.nlm.nih.gov/33470011/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-atopica-cats-fda',
      citationText:
        'Atopica for Cats — cyclosporine modified oral solution 100 mg/mL. FDA/DailyMed prescribing information (dose 7 mg/kg, toxoplasma/FeLV/FIV, carne crua).',
      sourceType: 'Bula Oficial FDA Atopica® Gatos',
      url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=47f70173-a1d9-4156-9a7f-0f296e5dd64b',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumbs-oclacitinib-cat',
      citationText:
        "Plumb's Veterinary Drug Handbook. 10th ed. 2023. Oclacitinib monograph; Ortalda C, Noli C, Colombo S, et al. Oclacitinib in cats with allergic dermatitis. Vet Dermatol. 2015;26:235-e52.",
      sourceType: 'Guia Farmacológico / Estudo Fora da Bula Felino',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25906425/',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
