import type { CommercialMedicationPrice, CommercialMedicationProduct } from '../types/commercialMedication';

const SOURCE_DATE = '2026-08-31';

function priceRange(min: number, max: number, sourceNote: string): CommercialMedicationPrice {
  const avg = Math.round(((min + max) / 2) * 100) / 100;
  const brl = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return {
    averageLabel: `${brl(min)} – ${brl(max)} (preço médio ${brl(avg)})`,
    rangeLabel: sourceNote,
    sourceDate: SOURCE_DATE,
  };
}

export const requestedAntiparasiticCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'panacur-10-msd',
    slug: 'panacur-10-fenbendazol',
    name: 'Panacur 10%',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog', 'parasite_giardia'],
    species: ['dog'],
    presentations: [
      'Suspensão oral 100 mg/mL — frasco 20 mL',
      'Suspensão oral 100 mg/mL — frasco 1 L',
    ],
    activeComponents: ['fenbendazol'],
    searchAliases: ['febendazol', 'fembendazol'],
    labelCompositionSummary:
      'Fenbendazol 100 mg/mL (suspensão oral a 10%). A apresentação brasileira é indicada em bula para bovinos e cães.',
    labelDirections:
      'Cães: 100 mg/kg VO em dose única ou 50 mg/kg VO a cada 24 horas durante 3 dias consecutivos. Agitar antes de usar. A bula também inclui giardíase entre as indicações caninas.',
    dosageGuidance: {
      labelDose:
        'Cães: 100 mg/kg VO em dose única (1 mL/kg) OU 50 mg/kg VO q24h por 3 dias (0,5 mL/kg/dose).',
      plumbs: {
        dog: [
          {
            title: 'Helmintos gastrintestinais — esquema usual',
            dose: '50 mg/kg VO q24h por 3 dias, administrado com alimento.',
          },
          {
            title: 'Helmintos — alternativa em cães adultos',
            dose: '100 mg/kg VO em dose única.',
          },
          {
            title: 'Giardia spp.',
            dose: '50 mg/kg VO q24h por 3–5 dias.',
            note: 'Confirmar diagnóstico e associar higiene ambiental para reduzir reinfecção.',
          },
          {
            title: 'Crenosoma vulpis — extrabula',
            dose: '25–50 mg/kg VO q24h por 3–14 dias.',
          },
          {
            title: 'Physaloptera spp. — extrabula',
            dose: '75–90 mg/kg VO q24h por 5 dias + pirantel.',
          },
        ],
        cat: [
          {
            title: 'Ascarídeos adultos / gestantes — extrabula',
            dose: '100 mg/kg VO dose única.',
          },
          {
            title: 'Filhotes <6 meses — extrabula',
            dose: '50 mg/kg VO q24h por 3 dias.',
          },
          {
            title: 'Giardia spp. — extrabula',
            dose: '50 mg/kg VO q24h por 5–7 dias.',
          },
          {
            title: 'Aelurostrongylus abstrusus — extrabula',
            dose: '50 mg/kg VO q24h por 3 dias (até 10–14 dias se necessário).',
          },
        ],
      },
      notes: [
        'Conversão do Panacur 10%: volume (mL) = peso (kg) × dose (mg/kg) ÷ 100.',
        'A espécie comercial cadastrada é cão; uso felino de fenbendazol descrito na literatura não transforma esta apresentação em produto felino de bula.',
      ],
    },
    plumbsContext:
      'Plumb\'s 10ª ed., monografia Fenbendazole (pp. 505–508): 50 mg/kg VO q24h por 3 dias é o regime anti-helmíntico rotulado em cães; há esquemas específicos conforme parasito, inclusive Giardia. Doses felinas são extrabula.',
    clinicalUse:
      'Tratamento e controle de helmintos gastrintestinais em cães e tratamento de giardíase conforme a indicação da bula brasileira, sempre integrado ao diagnóstico coproparasitológico e ao controle ambiental.',
    reassessment:
      'Reavaliar resposta clínica e exame coproparasitológico conforme o parasito e o risco de reinfecção. Em giardíase, revisar banho, limpeza ambiental e contactantes.',
    prescriptionExample:
      'Panacur 10% (100 mg/mL): administrar 0,5 mL/kg por via oral a cada 24 horas, durante 3 dias consecutivos, com alimento. Agitar antes de usar.',
    safetyAlert:
      'Pesar o paciente e calcular pela concentração de 100 mg/mL. Não confundir dose em mg com volume em mL. A página oficial orienta usar imediatamente todo o conteúdo após abrir o frasco.',
    price: priceRange(73.99, 119.99, 'Popular Pet R$ 86,90; Meu Pet Merece R$ 82,90; Agrotela R$ 96,99 — frasco 20 mL'),
    evidenceLevel: 'Bula/página oficial brasileira da MSD + Plumb’s Veterinary Drug Handbook, 10ª ed.',
    imageUrl:
      'https://www.msd-saude-animal.com.br/wp-content/uploads/sites/55/2020/07/panacur-e1594736460208.jpg?crop=1&h=379&w=300',
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/panacur-10/',
    labelUrl: 'https://www.msd-saude-animal.com.br/produto/panacur-10/',
    catalogMedicationId: 'editorial:fenbendazol',
  },
  {
    id: 'marquis-ponazuril-boehringer',
    slug: 'marquis-ponazuril-15',
    name: 'Marquis 15% (ponazuril)',
    manufacturer: 'Boehringer Ingelheim Animal Health USA',
    commercialClass: 'parasiticide',
    commercialSubclass: 'gi_antiprotozoal',
    commercialSubclasses: ['gi_antiprotozoal'],
    species: ['dog', 'cat'],
    presentations: [
      'Pasta oral 15% (150 mg/g) — seringa com 127 g',
      'Cartucho com 1 seringa ou caixa com 4 seringas de 127 g',
    ],
    activeComponents: ['ponazuril'],
    searchAliases: ['poltraazuril'],
    labelCompositionSummary:
      'Pasta oral equina pronta para uso; ponazuril 150 mg/g (15% p/p). Produto aprovado nos EUA exclusivamente para equinos.',
    labelDirections:
      'Bula equina: 15 mg/kg VO como dose de ataque apenas no dia 1; depois 5 mg/kg VO q24h nos dias 2–28 para mieloencefalite protozoária equina. Este esquema NÃO é a dose de cães e gatos.',
    dosageGuidance: {
      labelDose:
        'Equinos (bula dos EUA): 15 mg/kg VO no dia 1; depois 5 mg/kg VO q24h por mais 27 dias.',
      plumbs: {
        dog: [
          {
            title: 'Coccidiose — uso extrabula',
            dose: '20 mg/kg VO q24h por 3 dias.',
            note: 'Plumb’s também descreve 50 mg/kg q24h por 3 dias, com possibilidade de repetir o curso, ou 30 mg/kg nos dias 0 e 7.',
          },
          {
            title: 'Neosporose/toxoplasmose — uso extrabula',
            dose: '7,5–15 mg/kg VO q24h por 28 dias.',
          },
          {
            title: 'Hepatozoonose canina — uso extrabula',
            dose: '10 mg/kg VO q12h por 14 dias.',
          },
        ],
        cat: [
          {
            title: 'Coccidiose — uso extrabula',
            dose: '20 mg/kg VO q24h por 3 dias.',
            note: 'Plumb’s também descreve 50 mg/kg q24h por 3 dias ou 30 mg/kg nos dias 0 e 7, conforme o contexto clínico.',
          },
          {
            title: 'Toxoplasmose — uso extrabula',
            dose: '7,5–15 mg/kg VO q24h por 28 dias.',
          },
        ],
      },
      notes: [
        'Todos os esquemas de cães e gatos são extrabula; a pasta Marquis é rotulada apenas para equinos.',
        'Plumb’s alerta que a pasta equina a 15% é concentrada demais para pequenos animais e deve ser diluída por profissional para permitir medição segura.',
        'Ponazuril é o metabólito sulfona do toltrazuril; não intercambiar os dois produtos nem copiar suas doses.',
      ],
    },
    plumbsContext:
      'Plumb’s 10ª ed., monografia Ponazuril (pp. 1041–1043): lista esquemas extrabula para cães e gatos e alerta expressamente para a necessidade de diluir a pasta equina concentrada antes de medir doses de pequenos animais.',
    clinicalUse:
      'Referência comercial de ponazuril para protocolos antiprotozoários extrabula em cães e gatos. A indicação, a dose e a formulação dispensada dependem do diagnóstico e da avaliação veterinária.',
    reassessment:
      'Acompanhar sinais clínicos e exame coproparasitológico quando aplicável. Em doença sistêmica, reavaliar hemograma, bioquímica e resposta neurológica conforme o diagnóstico.',
    prescriptionExample:
      'Uso extrabula em pequenos animais: calcular a dose de ponazuril em mg/kg conforme o diagnóstico e dispensar diluição veterinária validada. Não orientar o tutor a medir diretamente a pasta equina a 150 mg/g.',
    safetyAlert:
      'Produto equino e muito concentrado. Não usar a regulagem da seringa equina para cães ou gatos, não copiar a dose equina e não confundir ponazuril com toltrazuril. Uso apenas sob prescrição veterinária.',
    price: {
      averageLabel: 'Produto importado; consultar disponibilidade',
      rangeLabel: 'Sem preço brasileiro estável confirmado',
      sourceDate: SOURCE_DATE,
    },
    evidenceLevel: 'Bula oficial FDA/DailyMed do Marquis + Plumb’s Veterinary Drug Handbook, 10ª ed.',
    imageUrl:
      'https://horseowner.boehringer-ingelheim.com/us/sites/default/files/styles/scale_1080/public/2024-03/MARQUIS_4dose_pck_quarter%2Bsyringe_qtr_1080x720.jpg?itok=0e_SA6EH',
    productPageUrl: 'https://horseowner.boehringer-ingelheim.com/us/products/marquis',
    labelUrl:
      'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=888b1dde-fc9b-4022-b24b-7162da32e4e2',
  },
  {
    id: 'baycox-5-toltrazuril-elanco',
    slug: 'baycox-5-toltrazuril',
    name: 'Baycox 5% (toltrazuril)',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'gi_antiprotozoal',
    commercialSubclasses: ['gi_antiprotozoal'],
    species: ['dog', 'cat'],
    presentations: [
      'Solução oral 5% (50 mg/mL) — frasco 100 mL',
      'Solução oral 5% (50 mg/mL) — frasco 250 mL',
      'Solução oral 5% (50 mg/mL) — frasco 1 L',
    ],
    activeComponents: ['toltrazuril'],
    searchAliases: ['toltrazurila'],
    labelCompositionSummary:
      'Cada 100 mL contém 5 g de toltrazuril, equivalente a 50 mg/mL. A bula/página oficial brasileira do Baycox 5% é destinada a bezerros, não a cães ou gatos.',
    labelDirections:
      'Bula bovina: administrar 3 mL/10 kg VO em dose única em bezerros. Esta dose de bula NÃO deve ser aplicada a cães ou gatos; nesses pacientes o uso é extrabula e segue protocolos próprios.',
    dosageGuidance: {
      labelDose: 'Bezerros (bula brasileira): 3 mL/10 kg VO em dose única.',
      plumbs: {
        dog: [
          {
            title: 'Coccidiose — uso extrabula',
            dose: '10–30 mg/kg VO q24h por 1–3 dias.',
            note: 'Plumb\'s alerta: toltrazuril é composto-pai do ponazuril — não copiar doses entre eles.',
          },
        ],
        cat: [
          {
            title: 'Coccidiose — uso extrabula',
            dose: '20–30 mg/kg VO em dose única; repetir após 10 dias pode melhorar a eficácia.',
          },
          {
            title: 'Redução da eliminação de oocistos de Toxoplasma — uso extrabula',
            dose: '5–10 mg/kg VO q24h por 2 dias.',
          },
        ],
      },
      notes: [
        'Conversão do Baycox 5%: volume (mL) = peso (kg) × dose (mg/kg) ÷ 50.',
        'Todos os esquemas em cães e gatos são extrabula; a apresentação brasileira é rotulada para bezerros.',
        'Toltrazuril não é ponazuril. O ponazuril é um metabólito sulfona e possui doses próprias.',
      ],
    },
    plumbsContext:
      'Plumb’s 10ª ed., monografia Toltrazuril (pp. 1255–1257): descreve uso extrabula para coccidiose em cães e gatos e adverte que toltrazuril e ponazuril não devem ser tratados como o mesmo fármaco.',
    clinicalUse:
      'Referência comercial de toltrazuril para protocolos antiprotozoários extrabula em pequenos animais, após confirmação diagnóstica. A indicação oficial brasileira deste produto permanece bovina.',
    reassessment:
      'Reavaliar sinais, hidratação e exame coproparasitológico; corrigir higiene ambiental, superlotação e reinfecção. Em filhotes debilitados, considerar suporte e diagnósticos diferenciais.',
    prescriptionExample:
      'Uso extrabula: Baycox 5% (50 mg/mL), administrar por via oral na dose definida para o diagnóstico. Volume por dose = peso × dose ÷ 50. Registrar no receituário que a apresentação é bovina.',
    safetyAlert:
      'Não usar a dose bovina como dose de cão ou gato. Confirmar a concentração de 50 mg/mL, calcular o volume individualmente e não substituir por ponazuril usando a mesma dose.',
    price: {
      averageLabel: 'R$ 126,14 – R$ 167,00 (preço médio R$ 146,57)',
      rangeLabel: 'Shopping do Agro R$ 126,14; AB Araujo R$ 159,00 — frasco 100 mL',
      sourceDate: SOURCE_DATE,
    },
    evidenceLevel: 'Página oficial brasileira da Elanco + Plumb’s Veterinary Drug Handbook, 10ª ed.',
    imageUrl:
      'https://assets.elanco.com/7eafa302-37b3-00f8-2e74-bb902d1a0ba2/b26e4a42-12f4-4d9a-a485-c3a0afa60461/Baycox.png?auto=format&q=75&w=1600',
    productPageUrl: 'https://agropecuaria.elanco.com/br/produtos/corte/baycox',
    labelUrl: 'https://agropecuaria.elanco.com/br/produtos/corte/baycox',
  },
  {
    id: 'sulfaprim-comprimidos-bravet',
    slug: 'sulfaprim-sulfametoxazol-trimetoprima',
    name: 'Sulfaprim Comprimidos',
    manufacturer: 'Bravet',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    commercialSubclasses: ['infectious_antibiotic'],
    species: ['dog', 'cat'],
    presentations: ['Cartucho com 10 comprimidos; cada comprimido contém 500 mg + 100 mg'],
    activeComponents: ['sulfametoxazol', 'trimetoprima'],
    searchAliases: ['sulfa', 'sulfa trimetoprima', 'sulfa + trimetoprima', 'sulfametoxazol + trimetoprima'],
    labelCompositionSummary:
      'Cada comprimido contém sulfametoxazol 500 mg + trimetoprima 100 mg (600 mg de princípios ativos por comprimido; excipiente q.s.p. 700 mg).',
    labelDirections:
      'Bula: 1 comprimido/20 kg VO a cada 24 horas por 5–7 dias. Tabela: 5–9 kg = 1/4; 10–14 kg = 1/2; 15–19 kg = 3/4; 20 kg ou mais = 1 comprimido por dia, ajustando ao peso sob orientação veterinária.',
    dosageGuidance: {
      labelDose:
        '1 comprimido/20 kg VO q24h por 5–7 dias (equivale a 30 mg/kg da associação sulfametoxazol + trimetoprima).',
      plumbs: {
        dog: [
          {
            title: 'Infecção bacteriana sistêmica sensível',
            dose: '30 mg/kg da associação VO q24h.',
            note: 'Alternativa em infecção grave: 15 mg/kg VO q12h.',
          },
          {
            title: 'Foliculite bacteriana superficial — extrabula',
            dose: '15–30 mg/kg da associação VO q12h.',
          },
          {
            title: 'Cistite bacteriana — extrabula',
            dose: '15 mg/kg VO q12h (não complicada) ou 15–30 mg/kg VO q12h (complicada).',
          },
          {
            title: 'Coccidiose — extrabula',
            dose: '<4 kg: 15–30 mg/kg q12–24h; ≥4 kg: 30–60 mg/kg q24h.',
          },
          {
            title: 'Toxoplasmose — extrabula',
            dose: '15 mg/kg VO q12h por 4 semanas.',
          },
        ],
        cat: [
          {
            title: 'Cistite bacteriana — extrabula',
            dose: '15 mg/kg VO q12h (não complicada) ou 15–30 mg/kg VO q12h (complicada).',
          },
          {
            title: 'Coccidiose — extrabula',
            dose: '15–30 mg/kg VO q12–24h.',
          },
          {
            title: 'Toxoplasmose — extrabula',
            dose: '15 mg/kg VO q12h por 4 semanas.',
          },
        ],
      },
      notes: [
        'As doses do Plumb’s são da soma dos dois princípios ativos.',
        'Não converter automaticamente os esquemas q12h do Plumb’s para a bula do Sulfaprim, que orienta q24h; manter indicação e fonte visíveis.',
      ],
    },
    plumbsContext:
      'Plumb’s 10ª ed., monografia Sulfa-/Trimethoprim (pp. 1193–1197): há controvérsia sobre frequência; a referência lista 30 mg/kg q24h para infecções sensíveis e esquemas q12h específicos. Antimicrobiano deve ser escolhido por diagnóstico e susceptibilidade.',
    clinicalUse:
      'Antimicrobiano potencializado para infecções por bactérias sensíveis em cães e gatos. Não usar empiricamente quando cultura/antibiograma ou diretriz local indicarem alternativa mais apropriada.',
    reassessment:
      'Reavaliar resposta em 48–72 horas. Se o tratamento ultrapassar 7 dias, considerar hemograma e perfil hepatorrenal; em cães, teste de Schirmer basal e acompanhamento conforme risco.',
    prescriptionExample:
      'Sulfaprim Comprimidos (500 mg + 100 mg): administrar 1 comprimido para cada 20 kg por via oral a cada 24 horas, durante 5–7 dias, conforme bula e diagnóstico.',
    safetyAlert:
      'Bula: não administrar a cães ou gatos com menos de 15 meses, a fêmeas prenhes/lactantes ou a pacientes com hipersensibilidade a sulfas/trimetoprima. Plumb’s alerta para KCS, hipersensibilidade, hepatotoxicidade, citopenias e cristalúria; manter hidratação e cautela em doença renal/hepática.',
    price: {
      averageLabel: 'R$ 32,98 – R$ 53,90 (preço médio R$ 43,44)',
      rangeLabel: 'Mednanet R$ 32,98; Caiu na Pet R$ 43,99; Pett Farma/Dog&Cat R$ 53,50 — 10 comprimidos',
      sourceDate: SOURCE_DATE,
    },
    evidenceLevel: 'Bula oficial Bravet + Plumb’s Veterinary Drug Handbook, 10ª ed.',
    imageUrl: 'https://www.bravet.com.br/files/product/photo/30/SULFAPRIM_COMPRIMIDO_660_.png',
    productPageUrl: 'https://www.bravet.com.br/sulfaprim-comprimidos',
    labelUrl:
      'https://www.bravet.com.br/files/product/leaflet/30/Sulfaprim%20Comprimidos%20-%20GG1%20%E2%80%93%20Fourvet.pdf',
    catalogMedicationId: 'editorial:sulfametoxazol-trimetoprima',
  },
];

const DRONTAL_10_KG_LABEL =
  'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/d43f3763-b317-4aa5-ae91-9864b97d975c/Drontal%20Plus%20_%20Sabor_10kg.pdf';

export function enrichRequestedAntiparasiticCommercialProduct(
  product: CommercialMedicationProduct,
): CommercialMedicationProduct {
  if (product.slug === 'nexgard-caes-afoxolaner') {
    return {
      ...product,
      searchAliases: ['nexgard', 'afoxolaner'],
      presentations: [
        '2–4 kg: tablete 0,5 g com afoxolaner 11,3 mg',
        '4,1–10 kg: tablete 1,25 g com afoxolaner 28,3 mg',
        '10,1–25 kg: tablete 3 g com afoxolaner 68 mg',
        '25,1–50 kg: tablete 6 g com afoxolaner 136 mg',
        'Blísteres com 1, 3, 4 ou 6 tabletes; acima de 50 kg, combinar tabletes inteiros.',
      ],
      labelCompositionSummary:
        'Tablete mastigável de afoxolaner para cães. As quatro apresentações fornecem dose mínima de 2,5 mg/kg quando escolhidas pela faixa de peso da bula.',
      labelDirections:
        'Administrar 1 tablete inteiro VO uma vez ao mês conforme a faixa de peso. Pode ser oferecido com ou sem alimento; observar o consumo completo. Se a dose for perdida ou houver vômito em até 2 horas, a bula orienta administrar nova dose completa.',
      dosageGuidance: {
        labelDose: 'Dose mínima de afoxolaner 2,5 mg/kg VO, uma vez ao mês, pela faixa de peso da embalagem.',
        plumbs: {
          dog: [
            {
              title: 'Pulgas e carrapatos',
              dose: 'Mínimo de 2,5 mg/kg VO a cada 30 dias.',
              note: 'Usar o tablete inteiro correspondente à faixa de peso; acima de 50 kg, combinar apresentações.',
            },
          ],
        },
        notes: [
          'Produto indicado apenas para cães com pelo menos 8 semanas e 2 kg, conforme a bula brasileira.',
          'Não é repelente: pulgas e carrapatos precisam picar/alimentar-se para serem expostos ao fármaco.',
        ],
      },
      plumbsContext:
        'Plumb’s 10ª ed., monografia Afoxolaner (pp. 16–17): dose mínima de 2,5 mg/kg VO mensal. A monografia e a bula alertam para eventos neurológicos raros da classe das isoxazolinas.',
      clinicalUse:
        'Tratamento e prevenção de pulgas e tratamento/controle de carrapatos em cães, com repetição mensal e controle integrado dos animais contactantes e do ambiente.',
      reassessment:
        'Confirmar consumo completo, adesão mensal e controle ambiental. Reavaliar imediatamente tremores, ataxia, convulsão ou outra alteração neurológica.',
      prescriptionExample:
        'NexGard: administrar 1 tablete inteiro correspondente à faixa de peso do cão por via oral a cada 30 dias, continuamente enquanto houver risco de exposição.',
      safetyAlert:
        'Não usar em gatos. Bula: cães a partir de 8 semanas e 2 kg. Usar com cautela em histórico de convulsões/doença neurológica; segurança não avaliada em reprodução, gestação ou lactação.',
      evidenceLevel: 'Bula oficial brasileira do NexGard + Plumb’s Veterinary Drug Handbook, 10ª ed.',
      price: {
        ...product.price,
        sourceDate: SOURCE_DATE,
        notes: 'Informações clínicas e apresentações reconferidas na bula oficial; preço permanece variável por faixa.',
      },
    };
  }

  if (product.slug === 'drontal-plus-caes') {
    return {
      ...product,
      name: 'Drontal Plus Mais Sabor 10 kg',
      searchAliases: ['drontal plus', 'drontal mais sabor'],
      presentations: [
        'Comprimido palatável sulcado em formato de osso — apresentação 10 kg',
        'Cartuchos com 2, 4, 6, 24, 102 ou 312 comprimidos',
      ],
      labelCompositionSummary:
        'Cada comprimido contém febantel 150 mg + praziquantel 50 mg + pamoato de pirantel 144 mg. A dose de bula corresponde a 15 mg/kg + 5 mg/kg + 14,4 mg/kg, respectivamente.',
      labelDirections:
        'Administrar 1 comprimido/10 kg VO. Verminoses intestinais: dose única. Giardíase: a mesma dose q24h por 3 dias consecutivos. Tabela da bula: 2–5 kg = 1/2; 5–10 kg = 1; acrescentar 1/2 comprimido a cada 5 kg.',
      dosageGuidance: {
        labelDose:
          '1 comprimido/10 kg VO: dose única para verminoses; q24h por 3 dias para giardíase. Não administrar abaixo de 2 kg.',
        plumbs: {
          dog: [
            {
              title: 'Nematódeos e cestódeos',
              dose: 'Usar a apresentação e a tabela de peso da bula em dose única.',
            },
            {
              title: 'Giardia spp.',
              dose: 'Usar a dose da tabela de peso q24h por 3 dias.',
              note: 'O Plumb’s reproduz este esquema para cães; associar higiene ambiental e reavaliação.',
            },
          ],
        },
        notes: [
          'Por comprimido/10 kg: febantel 150 mg, praziquantel 50 mg e pamoato de pirantel 144 mg.',
          'Não confundir pamoato de pirantel (sal) com quantidade equivalente de pirantel base ao comparar referências.',
        ],
      },
      plumbsContext:
        'Plumb’s 10ª ed., monografia Praziquantel/combinações (pp. 1053–1056): Drontal Plus combina praziquantel, febantel e pamoato de pirantel; para giardíase canina descreve a dose da tabela da apresentação q24h por 3 dias.',
      clinicalUse:
        'Verminoses intestinais por nematódeos/cestódeos e giardíase em cães conforme a bula brasileira. Controle de pulgas é necessário para reduzir reinfecção por Dipylidium caninum.',
      reassessment:
        'Reavaliar exame coproparasitológico conforme risco e resposta. Em giardíase, revisar banho, limpeza com agente efetivo, remoção de fezes e manejo dos contactantes.',
      prescriptionExample:
        'Drontal Plus Mais Sabor 10 kg: administrar 1 comprimido para cada 10 kg por via oral. Para verminoses, dose única; para giardíase, repetir a cada 24 horas por 3 dias.',
      safetyAlert:
        'Não usar em gatos, cães com menos de 3 semanas ou peso inferior a 2 kg. A bula brasileira recomenda não usar nas primeiras 4 semanas de gestação e cautela em disfunção renal/hepática ou animais gravemente debilitados.',
      evidenceLevel: 'Bula oficial brasileira Elanco (revisão 11/03/2025) + Plumb’s Veterinary Drug Handbook, 10ª ed.',
      labelUrl: DRONTAL_10_KG_LABEL,
      price: {
        ...product.price,
        sourceDate: SOURCE_DATE,
        notes: 'Apresentação e composição reconferidas na bula oficial; preço permanece variável por embalagem.',
      },
    };
  }

  return product;
}
