import { CommercialMedicationProduct } from '../types/commercialMedication';

export const pilocarpinaCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'pilocan-2-cristalia',
    slug: 'pilocan-2-solucao-oftalmica',
    name: 'Pilocan 2%',
    manufacturer: 'Cristália',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_glaucoma',
    commercialSubclasses: ['ophthalmic_glaucoma'],
    species: ['dog', 'cat'],
    presentations: ['Frasco plástico conta-gotas 10 mL (20 mg/mL = 2%)'],
    activeComponents: ['cloridrato de pilocarpina'],
    searchAliases: ['pilocan', 'pilocarpina', 'cloridrato de pilocarpina', 'cristalia'],
    labelCompositionSummary:
      'Cada mL (equivalente a 27 gotas na calibração de bula) contém 20 mg de cloridrato de pilocarpina (≈ 0,74 mg por gota). Excipientes: ácido bórico, citrato de sódio di-hidratado, cloreto de benzalcônio, hietelose, edetato dissódico e água purificada (pH ácido 3,5–5,5).',
    labelDirections:
      'Uso oftálmico humano adulto: instilar 1 a 2 gotas no saco conjuntival até 3 a 4 vezes ao dia. Na Medicina Veterinária (uso extrabula em cães com CCS neurogênica): iniciar com 1 gota por 10 kg VO a cada 12 horas misturada diretamente a alimento úmido, titulando lentamente; nunca pingar a solução concentrada diretamente na boca sem alimento.',
    eligibility: {
      minAge: 'Uso adulto e pediátrico (humano); sem faixa etária mínima estabelecida em bula veterinária',
      pregnancyLactation: 'Usar apenas quando os benefícios superarem potenciais riscos colinérgicos maternos e fetais',
      restrictions:
        'Contraindicada em uveíte anterior, glaucoma secundário à uveíte ou luxação de cristalino, asma felina/broncoespasmo, bradiarritmias e obstrução mecânica gastrointestinal ou urinária.',
    },
    dosageGuidance: {
      labelDose:
        'Uso veterinário extrabula: CCS neurogênica canina — 1 gota da solução a 2% por 10 kg VO q12h no alimento úmido (ou 2 gotas/9,1 kg no regime alternativo), titulando até resposta do STT-I ou sinais colinérgicos leves.',
      plumbs: {
        dog: [
          {
            title: 'CCS neurogênica canina (titulação oral no alimento)',
            dose: 'Iniciar com 1 gota/10 kg VO q12h (≈ 0,074 mg/kg; protocolo alternativo inicia com 2 gotas/9,1 kg) misturada em alimento úmido; incrementar lentamente até aumento do STT-I ou sinais colinérgicos leves.',
            note: 'Em cães < 5 kg, considerar formulação comercial a 1% ou manipulada diluída.',
          },
          {
            title: 'Glaucoma primário de ângulo aberto (papel histórico / 3ª linha)',
            dose: '1 gota por olho q8h–q12h apenas na indisponibilidade de prostaglandinas ou inibidores da anidrase carbônica.',
            note: 'Descartar uveíte e subluxação de cristalino antes de instilar.',
          },
        ],
        cat: [
          {
            title: 'Teste diagnóstico ou suporte paliativo excepcional',
            dose: 'Para teste de desnervação pupilar (disautonomia), NÃO usar 2% puro — manipular/diluir para 0,05%–0,1%.',
            note: 'Uso oftálmico de rotina a 2% desencorajado em felinos por irritação local e absorção sistêmica.',
          },
        ],
      },
      notes: [
        'Calibração de bula Pilocan® 2%: 27 gotas/mL (≈ 0,74 mg de cloridrato/gota).',
        'Aguardar mínimo de 5 minutos entre este colírio e outros fármacos oftálmicos.',
      ],
    },
    plumbsContext:
      'Agonista colinérgico muscarínico direto usado principalmente na CCS neurogênica canina por titulação oral em alimento úmido e no preparo de testes diagnósticos pupilares diluídos.',
    clinicalUse:
      'Ceratoconjuntivite seca (CCS) neurogênica canina (extrabula VO), investigação de desnervação parassimpática ocular e papel antiglaucomatoso histórico restrito em cães.',
    reassessment:
      'Reavaliar Teste Lacrimal de Schirmer tipo I (STT-I), fluoresceína corneana e presença de vômito, diarreia ou hipersalivação a cada 7–14 dias no início da titulação.',
    prescriptionExample:
      'Receituário simples (Uso Humano / Extrabula Veterinário): Pilocan® 2% (Cristália, frasco 10 mL — 20 mg/mL; 27 gotas/mL). Administrar ___ gota(s) misturada(s) em pequena quantidade de alimento úmido a cada 12 horas. Suspender por 24 h e contatar o médico-veterinário se houver vômito, diarreia ou salivação intensa.',
    safetyAlert:
      'Risco real de síndrome colinérgica (SLUDDE) durante a titulação oral ou após uso oftálmico em gatos. Nunca pingar diretamente na boca sem alimento; contraindicado na uveíte e na luxação do cristalino.',
    price: {
      averageLabel: 'R$ 25 a R$ 45 (estimativa de mercado em farmácia humana)',
      rangeLabel: 'R$ 22 – R$ 55',
      sourceDate: 'Referência editorial 2026',
      notes: 'Valor ilustrativo de farmácia humana para frasco de 10 mL; confirmar preço local.',
    },
    evidenceLevel: 'Série clínica retrospectiva e formulários veterinários (CCS neurogênica)',
    productPageUrl: 'https://www.cristalia.com.br/produto/solucao-oftalmica-esteril-20-mgml-20',
    isControlled: false,
    catalogMedicationId: 'pilocarpina',
  },
  {
    id: 'pilocarpina-allergan',
    slug: 'pilocarpina-cloridrato-allergan',
    name: 'Pilocarpina Allergan (1%, 2% e 4%)',
    manufacturer: 'Allergan / AbbVie',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_glaucoma',
    commercialSubclasses: ['ophthalmic_glaucoma'],
    species: ['dog', 'cat'],
    presentations: [
      'Frasco conta-gotas 10 mL a 1% (10 mg/mL)',
      'Frasco conta-gotas 10 mL a 2% (20 mg/mL)',
      'Frasco conta-gotas 10 mL a 4% (40 mg/mL)',
    ],
    activeComponents: ['cloridrato de pilocarpina'],
    searchAliases: ['pilocarpina', 'allergan', 'abbvie', 'cloridrato de pilocarpina', 'colirio'],
    labelCompositionSummary:
      'Soluções oftálmicas estéreis de cloridrato de pilocarpina a 10, 20 ou 40 mg/mL. Calibração de bula: 25 gotas/mL (1% ≈ 0,40 mg/gota; 2% ≈ 0,80 mg/gota; 4% ≈ 1,60 mg/gota). Excipientes incluem álcool polivinílico e cloreto de benzalcônio.',
    labelDirections:
      'Bula humana oftálmica; uso em Medicina Veterinária é extrabula. A versão a 1% (0,40 mg/gota) facilita titulação inicial em cães de pequeno porte (< 5 kg) por via oral no alimento. Descartar após 90 dias de aberto (15–30 °C).',
    eligibility: {
      minAge: 'Uso adulto e pediátrico humano; uso veterinário sob critério clínico',
      pregnancyLactation: 'Avaliar risco-benefício sistêmico antes de instituir terapia contínua',
      restrictions:
        'Contraindicada em iridociclite/uveíte anterior, glaucoma por luxação do cristalino, asma brônquica felina e bradiarritmias.',
    },
    dosageGuidance: {
      labelDose: 'Uso veterinário extrabula — escolher a concentração (1% vs. 2%) conforme o peso do paciente.',
      plumbs: {
        dog: [
          {
            title: 'CCS neurogênica em cães pequenos (< 5 kg) com versão 1%',
            dose: '1 gota da apresentação a 1% (0,40 mg) em alimento úmido q12h como ponto de partida conservador para cães de ~5 kg, com ajuste lento.',
            note: 'Evita usar 4% por via oral ou oftálmica rotineira devido ao alto risco de toxicidade aguda e irritação ciliar.',
          },
          {
            title: 'CCS neurogênica padrão com versão 2%',
            dose: '1 gota da solução a 2% (0,80 mg) por 10 kg VO q12h no alimento (ou 2 gotas/9,1 kg no regime alternativo), titulando conforme STT-I e tolerância.',
          },
        ],
        cat: [
          {
            title: 'Suporte paliativo pontual na disautonomia (1%) ou teste diagnóstico (diluída)',
            dose: 'Suporte: 1 gota a 1% q6h–q12h sob vigília rígida. Diagnóstico: diluir para 0,05%–0,1% em farmácia estéril.',
          },
        ],
      },
      notes: [
        'Atenção à diferença de gotejador: Allergan = 25 gotas/mL (≈ 0,80 mg/gota na concentração 2%), ligeiramente mais concentrado por gota que Pilocan® 2% (27 gotas/mL ≈ 0,74 mg/gota).',
        'Validade após abertura declarada em bula: 90 dias.',
      ],
    },
    plumbsContext:
      'Solução oftálmica de cloridrato de pilocarpina disponível em três teores (1%, 2% e 4%), sendo a versão a 1% particularmente útil para titulação precisa em cães de porte miniatura.',
    clinicalUse:
      'Titulação oral extrabula na CCS neurogênica canina (sobretudo versão 1% e 2%), suporte lacrimal/fotofobia na disautonomia (1%) e base de diluição diagnóstica.',
    reassessment:
      'STT-I a cada 2–4 semanas, pesquisa de úlceras corneanas e triagem contínua para sinais colinérgicos sistêmicos.',
    prescriptionExample:
      'Receituário simples (Uso Humano / Extrabula Veterinário): Pilocarpina® 1% (Allergan, frasco 10 mL — 10 mg/mL; 25 gotas/mL). Misturar ___ gota(s) em pequena porção de alimento úmido a cada 12 horas. Descartar 90 dias após abertura.',
    safetyAlert:
      'Concentração a 4% (1,60 mg/gota) apresenta alto potencial de toxicidade se confundida com frascos de 1% ou 2%. Sempre especificar claramente a porcentagem na prescrição.',
    price: {
      averageLabel: 'R$ 30 a R$ 65 (conforme concentração 1%, 2% ou 4%)',
      rangeLabel: 'R$ 26 – R$ 75',
      sourceDate: 'Referência editorial 2026',
      notes: 'Valor ilustrativo em farmácias humanas brasileiras.',
    },
    evidenceLevel: 'Série clínica retrospectiva e formulários veterinários',
    labelUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/PILOCARPINA.pdf',
    isControlled: false,
    catalogMedicationId: 'pilocarpina',
  },
];
