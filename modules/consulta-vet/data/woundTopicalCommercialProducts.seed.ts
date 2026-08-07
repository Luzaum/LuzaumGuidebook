import { CommercialMedicationProduct } from '../types/commercialMedication';

const SOURCE_DATE = '2026-08-06';

const ZINC_INGESTION_ALERT =
  'Utilizar apenas com colar elizabetano, curativo ou outra barreira que impeça completamente a lambedura. Ingestão repetida ou em grande quantidade de pomadas com óxido de zinco pode causar vômito, diarreia, letargia, anemia hemolítica, icterícia, pancreatite e alterações renais em cães e gatos.';

const CORTICOSTEROID_TOPICAL_ALERT =
  'Contém corticoide tópico; pode mascarar infecção e atrasar cicatrização. Não usar indiscriminadamente em ferida aberta, úlcera, demodicose, dermatofitose ou infecção não controlada.';

const SELECTIVE_ANTIMICROBIAL_ALERT =
  'Antimicrobiano tópico de uso seletivo; reservar para infecção localizada documentada ou forte suspeita clínica. Não usar como primeira opção para escoriações simples.';

const PHMB_SOAP_ALERT =
  'Sabonete antisséptico para pele íntegra ou região perilesional. Não depositar no interior de feridas profundas, cavidades ou tecidos expostos. Para irrigação do leito, usar solução específica para feridas, não o sabonete.';

const COLLAGENASE_SILVER_ALERT =
  'Não aplicar colagenase e sulfadiazina de prata juntas diretamente no mesmo leito; produtos à base de prata e alguns antissépticos podem inativar a enzima.';

const COAL_TAR_CAT_ALERT =
  'Não recomendar produtos com coaltar/alcatrão para gatos devido ao maior risco de toxicidade e metabolização deficiente de compostos fenólicos.';

export const woundTopicalCommercialProductsSeed: CommercialMedicationProduct[] = [
  // ── PHMB — limpeza perilesional ──────────────────────────────────────────
  {
    id: 'pielsana-sabonete-phmb-dbs',
    slug: 'pielsana-sabonete-phmb',
    name: 'Pielsana Sabonete Antisséptico com PHMB',
    manufacturer: 'DBS / Pielsana',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Sabonete líquido 500 mL', 'Sabonete líquido 100 mL'],
    activeComponents: ['polihexametileno biguanida (PHMB / polihexanida)'],
    labelCompositionSummary:
      'Sabonete antisséptico com PHMB. Concentração exata de PHMB não encontrada de forma suficientemente clara em fonte pública consultada; não presumir concentração no cadastro.',
    labelDirections:
      'Molhar a pele, aplicar quantidade suficiente para produzir espuma, massagear suavemente, remover sujidades e enxaguar completamente. Secar sem fricção excessiva.',
    plumbsContext:
      'Não há monografia específica de sabonete PHMB no Plumb\'s consultado. Usar modo de aplicação do fabricante e protocolo de feridas.',
    clinicalUse:
      'Limpeza da pele ao redor de feridas, higienização de pacientes com incontinência, limpeza perineal, banho localizado de áreas contaminadas e higiene de pele íntegra ou superficialmente irritada.',
    reassessment:
      'Reavaliar se houver irritação, maceração ou piora da lesão perilesional.',
    prescriptionExample:
      'Aplicar sabonete com PHMB na pele ao redor da ferida, massagear suavemente, enxaguar completamente e secar. Repetir conforme necessidade de higienização perilesional.',
    safetyAlert: PHMB_SOAP_ALERT,
    price: {
      averageLabel: 'R$ 36,20',
      rangeLabel: '500 mL: R$ 32,50 a R$ 39,90',
      sourceDate: SOURCE_DATE,
      notes: 'https://www.drogasil.com.br/pielsana-sabonete-antisseptico-com-phmb-dbs-500ml-1235379.html',
    },
    productPageUrl:
      'https://www.drogasil.com.br/pielsana-sabonete-antisseptico-com-phmb-dbs-500ml-1235379.html',
    imageUrl:
      'https://www.drogasil.com.br/_next/image?q=75&url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F13490263.webp&w=3840',
    evidenceLevel: 'Produto para saúde/higiene; uso veterinário extrapolado.',
  },

  // ── PHMB — irrigação do leito ────────────────────────────────────────────
  {
    id: 'curatec-solucao-phmb-lm-farma',
    slug: 'curatec-solucao-phmb',
    name: 'Curatec Solução com PHMB e EDTA',
    manufacturer: 'LM Farma / Curatec',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Solução 350 mL'],
    activeComponents: ['PHMB 0,1%', 'EDTA', 'betaína 0,1%'],
    labelCompositionSummary: 'PHMB 0,1%, EDTA e betaína 0,1%. Solução para limpeza e irrigação de feridas agudas ou crônicas, superficiais ou cavitárias.',
    labelDirections:
      'Irrigar a ferida diretamente ou umedecer gaze estéril, mantendo contato com a superfície por até aproximadamente 15 minutos conforme necessidade clínica. Pode ser utilizada em cada troca de curativo. Frasco aberto: até 8 semanas conforme fabricante.',
    plumbsContext:
      'Não há monografia específica para esta marca no Plumb\'s consultado. Usar conforme instruções do fabricante e protocolo de troca do curativo.',
    clinicalUse:
      'Feridas traumáticas contaminadas, deiscência, feridas crônicas, úlceras de pressão, queimaduras, fístulas, feridas com suspeita de biofilme e limpeza antes da aplicação de gel ou cobertura.',
    reassessment:
      'Reavaliar leito, exsudato e necessidade de desbridamento ou mudança de cobertura a cada troca.',
    prescriptionExample:
      'Irrigar toda a superfície da ferida com solução PHMB 0,1% durante cada troca de curativo. Quando houver crostas ou biofilme aderido, manter gaze estéril umedecida em contato por até 10–15 minutos.',
    safetyAlert:
      'Solução para irrigação do leito da ferida; não confundir com sabonete PHMB, que deve ser enxaguado e não permanece no interior da ferida.',
    price: {
      averageLabel: 'R$ 131,39',
      rangeLabel: '350 mL: R$ 122,78 a R$ 140,00',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.curatec.com.br/curatec-solucao-com-phmb',
    labelUrl: 'https://www.curatec.com.br/curatec-solucao-com-phmb',
    imageUrl:
      'https://static.wixstatic.com/media/78b27d_e1391fd1c346422896a00aee29eeffc9~mv2.png/v1/fill/w_180%2Ch_506%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/Produto%20Novo%20Curatec_Lateral.png',
  },
  {
    id: 'prontosan-solucao-bbraun',
    slug: 'prontosan-solucao',
    name: 'Prontosan Solução',
    manufacturer: 'B. Braun',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Solução 350 mL'],
    activeComponents: ['polihexanida 0,1%', 'undecilenamidopropil betaína 0,1%'],
    labelCompositionSummary: 'Polihexanida 0,1%, undecilenamidopropil betaína 0,1% e água purificada.',
    labelDirections:
      'Irrigar e limpar o leito da ferida conforme protocolo de curativos. Mesma lógica clínica do Curatec Solução: irrigação, redução de biofilme e preparo do leito.',
    plumbsContext: 'Usar conforme instruções do fabricante e protocolo de feridas.',
    clinicalUse:
      'Limpeza e irrigação de feridas crônicas ou com biofilme; não substitui coleta para cultura nem desbridamento quando necessário.',
    reassessment: 'Reavaliar leito, contaminação e necessidade de gel ou cobertura secundária.',
    prescriptionExample:
      'Irrigar a ferida com Prontosan Solução a cada troca de curativo, mantendo contato conforme necessidade clínica antes da cobertura prescrita.',
    safetyAlert: 'Solução para irrigação do leito; não confundir com sabonete PHMB.',
    price: {
      averageLabel: 'R$ 174,47',
      rangeLabel: '350 mL: aproximadamente R$ 174,47',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl:
      'https://www.cliquefarma.com.br/acessorios-de-saude/primeiros-socorros/alcool-e-antissepticos/prontosan-solucao-350ml',
    imageUrl:
      'https://www.cliquefarma.com.br/cdn-cgi/imagedelivery/HWe2hc9laId8jMwJ0Cw8sw/prontosan-solucao-350ml.png/standard',
  },

  // ── PHMB — gel umectante no leito ─────────────────────────────────────────
  {
    id: 'curatec-gel-phmb-lm-farma',
    slug: 'curatec-gel-phmb',
    name: 'Curatec Gel com PHMB e EDTA',
    manufacturer: 'LM Farma / Curatec',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Gel 30 mL', 'Gel 100 mL', 'Gel 150 mL'],
    activeComponents: ['PHMB 0,1%', 'EDTA', 'betaína'],
    labelCompositionSummary: 'PHMB 0,1%, EDTA, betaína e veículo em gel.',
    labelDirections:
      'Aplicar camada de aproximadamente 3 a 5 mm sobre o leito limpo. Cobrir com cobertura secundária adequada. Pode permanecer por até aproximadamente 3 dias; frequência real depende de exsudato, contaminação e evolução. Frasco aberto: até 8 semanas.',
    plumbsContext: 'Usar conforme instruções do fabricante e protocolo de curativos.',
    clinicalUse:
      'Leito ressecado ou pouco exsudativo, desbridamento autolítico, ferida com biofilme, lesão crônica, proteção úmida do leito e preenchimento superficial de cavidades.',
    reassessment:
      'Ajustar frequência conforme volume de exsudato, contaminação e condição do curativo.',
    prescriptionExample:
      'Após limpeza, aplicar camada de 3 a 5 mm recobrindo o leito da ferida. Cobrir com gaze não aderente e curativo secundário. Trocar conforme volume de secreção.',
    safetyAlert:
      'Não usar como sabonete, substituto de desbridamento cirúrgico ou tratamento isolado de abscesso fechado sem drenagem.',
    price: {
      averageLabel: 'R$ 119,00',
      rangeLabel: '100 mL: aproximadamente R$ 119,00; 30 e 150 mL com preço menos estável',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.curatec.com.br/curatec-gel-com-phmb',
    imageUrl:
      'https://static.wixstatic.com/media/b23326_018df80eb6ef4a25b39065a7cda1a090~mv2.png/v1/fill/w_386%2Ch_795%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/Produto.png',
  },
  {
    id: 'prontosan-gel-bbraun',
    slug: 'prontosan-gel',
    name: 'Prontosan Gel',
    manufacturer: 'B. Braun',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Gel 30 mL'],
    activeComponents: ['polihexanida 0,1%', 'undecilenamidopropil betaína 0,1%'],
    labelCompositionSummary: 'Gel com polihexanida 0,1% e surfactante para permanência no leito da ferida.',
    labelDirections:
      'Aplicar sobre leito limpo após irrigação com solução compatível. Cobrir com curativo secundário quando indicado.',
    plumbsContext: 'Mesma lógica clínica do gel PHMB: permanência no leito, umidade e ação antimicrobiana prolongada.',
    clinicalUse: 'Feridas crônicas ou com biofilme; gel para permanência no leito após limpeza com solução.',
    reassessment: 'Reavaliar exsudato e necessidade de troca do curativo.',
    prescriptionExample:
      'Após limpeza com solução PHMB, aplicar camada uniforme do gel sobre o leito e cobrir com curativo não aderente.',
    safetyAlert: 'Não confundir com solução de irrigação ou sabonete PHMB.',
    price: {
      averageLabel: 'R$ 175,08',
      rangeLabel: '30 mL: aproximadamente R$ 175,08',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://catalogs.bbraun.com.br/pt-BR/p/PRID00001941/prontosan-gel',
  },

  // ── Sulfadiazina de prata 1% — antimicrobiano tópico ─────────────────────
  {
    id: 'dermazine-30g-silvestre',
    slug: 'dermazine-sulfadiazina-prata',
    name: 'Dermazine 1% Creme',
    manufacturer: 'Silvestre Labs',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Creme 30 g', 'Creme 50 g', 'Pote 400 g'],
    activeComponents: ['sulfadiazina de prata 1% (10 mg/g)'],
    labelCompositionSummary: 'Sulfadiazina de prata 10 mg/g — 1%. Antimicrobiano tópico, não cicatrizante universal.',
    labelDirections:
      'Após higienização, aplicar camada fina de 1 a 2 mm recobrindo toda a superfície afetada, geralmente uma vez ao dia; em lesões muito exsudativas, algumas bulas permitem reaplicação duas vezes ao dia.',
    dosageGuidance: {
      labelDose: 'Aplicar camada fina recobrindo completamente a lesão, geralmente 1x/dia.',
      plumbs: {
        dog: [
          { title: 'Queimaduras', dose: '1–2x/dia, camada de 1–2 mm' },
          { title: 'Infecção bacteriana localizada', dose: '1–2x/dia sobre região limpa' },
        ],
        cat: [
          { title: 'Queimaduras', dose: '1–2x/dia, camada de 1–2 mm' },
          { title: 'Infecção bacteriana localizada', dose: '1–2x/dia sobre região limpa' },
        ],
      },
      notes: [
        'BSAVA: película fina 2x/dia após limpeza; absorção pode atingir ~10% em áreas extensas.',
        'Reavaliar quando carga microbiana estiver controlada; pode prejudicar granulação se mantida indefinidamente.',
      ],
    },
    plumbsContext:
      'Plumb\'s: queimaduras e infecção bacteriana localizada — 1–2x/dia, camada de 1–2 mm. Impedir lambedura por 20–30 minutos.',
    clinicalUse:
      'Queimaduras, feridas contaminadas, infecção superficial localizada, lesões com bacilos Gram-negativos (destaque Pseudomonas) e dermatites úmidas infectadas selecionadas.',
    reassessment:
      'Suspender ou substituir quando leito estiver limpo e com granulação saudável; não manter automaticamente após controle da infecção.',
    prescriptionExample:
      'Após higienização, aplicar camada fina de 1 a 2 mm sobre toda a lesão, a cada 12 ou 24 horas, durante ___ dias. Impedir lambedura.',
    safetyAlert:
      'Antimicrobiano tópico, não cicatrizante universal. Contraindicado em hipersensibilidade a sulfonamidas, gestação avançada, neonatos, doença renal/hepática importante, grandes áreas, uso prolongado e contato ocular. ' +
      COLLAGENASE_SILVER_ALERT,
    price: {
      averageLabel: 'R$ 48,14',
      rangeLabel: '30 g: R$ 48,14',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.panvel.com/panvel/dermazine-1-creme-dermatologico-30g/p-895050',
    labelUrl: 'https://www.cristalia.com.br/produto/407/bula-profissional',
  },
  {
    id: 'silglos-30g-silvestre',
    slug: 'silglos-sulfadiazina-prata',
    name: 'Silglós 1% Creme',
    manufacturer: 'Silvestre Labs',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Creme 30 g', 'Creme 50 g'],
    activeComponents: ['sulfadiazina de prata 1% (10 mg/g)'],
    labelCompositionSummary: 'Sulfadiazina de prata 10 mg/g — 1%. Equivalente terapêutico ao Dermazine.',
    labelDirections:
      'Aplicar camada fina recobrindo completamente a lesão após limpeza, geralmente uma vez ao dia.',
    dosageGuidance: {
      plumbs: {
        dog: [{ title: 'Infecção localizada / queimaduras', dose: '1–2x/dia, camada de 1–2 mm' }],
        cat: [{ title: 'Infecção localizada / queimaduras', dose: '1–2x/dia, camada de 1–2 mm' }],
      },
    },
    plumbsContext: 'Mesma orientação de sulfadiazina de prata tópica no Plumb\'s e BSAVA.',
    clinicalUse: 'Mesmas indicações de sulfadiazina de prata 1% como antimicrobiano tópico.',
    reassessment: 'Reavaliar necessidade de continuidade quando infecção estiver controlada.',
    prescriptionExample:
      'Após higienização, aplicar camada fina de sulfadiazina de prata 1% sobre toda a lesão, a cada 12 ou 24 horas. Impedir lambedura.',
    safetyAlert:
      'Antimicrobiano tópico seletivo; cautela com sulfonamidas sistêmicas, grandes áreas e gestação. ' + COLLAGENASE_SILVER_ALERT,
    price: {
      averageLabel: 'R$ 52,70',
      rangeLabel: '30 g: R$ 52,70; média Dermazine/Silglós 30 g: R$ 50,42',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/silglos-creme-10mg-30g.html',
  },
  {
    id: 'sulfadiazina-prata-generico-uniao-quimica',
    slug: 'sulfadiazina-prata-generico',
    name: 'Sulfadiazina de Prata 1% — Genérico União Química',
    manufacturer: 'União Química',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Creme 30 g'],
    activeComponents: ['sulfadiazina de prata 1% (10 mg/g)'],
    labelCompositionSummary: 'Genérico de sulfadiazina de prata 10 mg/g — 1%.',
    labelDirections: 'Aplicar camada fina sobre lesão limpa, conforme bula humana e orientação veterinária.',
    plumbsContext: 'Mesma orientação de sulfadiazina de prata tópica.',
    clinicalUse: 'Alternativa genérica para queimaduras e infecção superficial localizada.',
    reassessment: 'Reavaliar quando leito estiver limpo e granulando.',
    prescriptionExample:
      'Aplicar sulfadiazina de prata 1% em camada fina, a cada 12 ou 24 horas, sobre lesão previamente limpa.',
    safetyAlert: 'Mesmas cautelas de sulfonamidas tópicas. ' + COLLAGENASE_SILVER_ALERT,
    price: {
      averageLabel: 'Variável',
      rangeLabel: 'Preço não estável na data da pesquisa',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl:
      'https://www.drogal.com.br/sulfadiazina-de-prata-10mgg-uniao-quimica-bisnaga-30g-creme-de-uso-dermatologico/p',
  },
  {
    id: 'dermacerium-30g-silvestre',
    slug: 'dermacerium-sulfadiazina-cerio',
    name: 'Dermacerium 1% Creme',
    manufacturer: 'Silvestre Labs',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Creme 30 g'],
    activeComponents: ['sulfadiazina de prata 1%', 'nitrato de cério 0,4%'],
    labelCompositionSummary:
      'Associação de sulfadiazina de prata 1% com nitrato de cério 0,4%. Produto diferente da sulfadiazina pura; não intercambiável automaticamente.',
    labelDirections: 'Aplicar conforme bula sobre lesão limpa.',
    plumbsContext: 'Usar lógica de sulfadiazina de prata com ressalva da associação com cério.',
    clinicalUse: 'Lesões selecionadas com indicação de sulfadiazina de prata; avaliar se associação com cério é desejável.',
    reassessment: 'Reavaliar resposta e necessidade de continuidade.',
    prescriptionExample:
      'Aplicar Dermacerium em camada fina sobre lesão limpa, conforme orientação veterinária.',
    safetyAlert:
      'Não intercambiável automaticamente com sulfadiazina de prata pura. ' + COLLAGENASE_SILVER_ALERT,
    price: {
      averageLabel: 'Confirmar varejo',
      rangeLabel: 'Preço variável conforme estoque',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogariaspacheco.com.br/dermacerium-creme-1-silvestre-30g/p',
  },

  // ── Hematoma / edema — Topcoid ───────────────────────────────────────────
  {
    id: 'topcoid-gel-uniao-quimica',
    slug: 'topcoid-gel',
    name: 'Topcoid Gel 500',
    manufacturer: 'União Química',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Gel 40 g'],
    activeComponents: ['polissulfato de mucopolissacarídeo 5 mg/g'],
    labelCompositionSummary: 'Polissulfato de mucopolissacarídeo 5 mg/g — heparinoide tópico/antiedematoso. Bula humana; uso veterinário extra-label.',
    labelDirections:
      'Aplicar camada fina sobre a região, normalmente 3 a 4 vezes ao dia, massageando suavemente quando não houver contraindicação.',
    plumbsContext:
      'Não há monografia veterinária específica no Plumb\'s ou BSAVA consultados. Uso extra-label; frequência baseada na bula humana.',
    clinicalUse:
      'Hematoma fechado, equimose, edema traumático localizado, flebite superficial e edema subcutâneo selecionado após excluir sangramento ativo.',
    reassessment: 'Suspender se hematoma expandir, houver dor intensa ou irritação local.',
    prescriptionExample:
      'Aplicar camada fina de Topcoid sobre a região afetada, 3 a 4 vezes ao dia, somente sobre pele íntegra. Impedir lambedura.',
    safetyAlert:
      'BLOQUEIO: não indicar para ferida aberta, abscesso, celulite, hemorragia ativa ou hematoma crescente. Não aplicar em mucosa. Cautela em anticoagulados e coagulopatias.',
    price: {
      averageLabel: 'R$ 35,65',
      rangeLabel: '40 g: R$ 34,59 a R$ 37,43',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/topcoid-5mg-g-gel-40g.html',
    labelUrl: 'https://www.uniaoquimica.com.br/wp-content/uploads/2020/01/BULA-TOPCOID.pdf',
    imageUrl:
      'https://www.drogasil.com.br/_next/image?q=75&url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F3712708.webp&w=3840',
    evidenceLevel: 'Uso extra-label; evidência clínica veterinária limitada.',
  },

  // ── Barreiras cutâneas ───────────────────────────────────────────────────
  {
    id: 'hipoglos-original-pg',
    slug: 'hipoglos-original',
    name: 'Hipoglós Original',
    manufacturer: 'Procter & Gamble',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_barrier',
    commercialSubclasses: ['skin_barrier'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 45 g'],
    activeComponents: ['óxido de zinco 15%', 'vitamina A', 'vitamina D', 'óleo de fígado de bacalhau'],
    labelCompositionSummary:
      'Óxido de zinco 150 mg/g (15%), vitamina A 5.000 UI/g, vitamina D 900 UI/g, óleo de fígado de bacalhau 86,6 mg/g.',
    labelDirections:
      'Aplicar película fina sobre pele limpa e seca, principalmente ao redor da região exposta à urina ou fezes. Reaplicar após nova higienização.',
    plumbsContext: 'Creme-barreira com óxido de zinco descrito no manejo de dermatite por urina em pacientes neurológicos.',
    clinicalUse:
      'Dermatite por urina/fezes, incontinência, proteção perilesional e barreira cutânea após limpeza e secagem completas.',
    reassessment: 'Reavaliar se maceração persistir apesar da barreira; corrigir contato persistente com urina/fezes.',
    prescriptionExample:
      'Aplicar camada fina de creme-barreira com óxido de zinco na pele limpa e seca ao redor da região exposta. Reaplicar após cada higienização.',
    safetyAlert: ZINC_INGESTION_ALERT,
    price: {
      averageLabel: 'R$ 28,92',
      rangeLabel: '45 g: R$ 28,16 a R$ 29,68',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://apppharma.com.br/produto/hipoglos-pom-original-g-41303',
    imageUrl: 'https://back.apppharma.com.br/public/imagem/d7204721-bd02-4410-8128-df38109c33c7.jpg',
  },
  {
    id: 'desitin-maximum-strength-kenvue',
    slug: 'desitin-maximum-strength',
    name: 'Desitin Máxima Proteção',
    manufacturer: 'Kenvue / Johnson & Johnson',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_barrier',
    commercialSubclasses: ['skin_barrier'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 57 g'],
    activeComponents: ['óxido de zinco 40%'],
    labelCompositionSummary: 'Óxido de zinco 40% — barreira robusta.',
    labelDirections:
      'Aplicar película fina sobre pele limpa e seca. Reaplicar após higienização.',
    plumbsContext: 'Barreira cutânea com alta concentração de zinco.',
    clinicalUse: 'Dermatite por umidade, incontinência e proteção perilesional quando barreira mais robusta é necessária.',
    reassessment: 'Confirmar que lambedura está completamente impedida.',
    prescriptionExample:
      'Aplicar camada fina de barreira com óxido de zinco 40% na pele seca perilesional. Manter colar elizabetano permanentemente.',
    safetyAlert:
      'Concentração elevada aumenta zinco disponível se ingerido. Usar somente quando acesso oral estiver fisicamente impedido. ' +
      ZINC_INGESTION_ALERT,
    price: {
      averageLabel: 'R$ 62,40',
      rangeLabel: '57 g: R$ 45,80 a R$ 78,99',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl:
      'https://www.drogasil.com.br/desitin-original-57g-maxima-duracao-1169702.html',
    imageUrl: 'https://product-data.raiadrogasil.io/images/12309311.webp',
  },
  {
    id: 'dermodex-tratamento',
    slug: 'dermodex-tratamento',
    name: 'Dermodex Tratamento',
    manufacturer: 'Dermodex',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_barrier',
    commercialSubclasses: ['skin_barrier', 'skin_antifungal_shampoo'],
    species: ['dog', 'cat'],
    presentations: ['Creme 60 g'],
    activeComponents: ['nistatina 100.000 UI/g', 'óxido de zinco 20%'],
    labelCompositionSummary: 'Nistatina 100.000 UI/g associada a óxido de zinco 200 mg/g (20%).',
    labelDirections: 'Aplicar conforme bula humana sobre pele limpa e seca.',
    plumbsContext: 'Considerar somente quando citologia compatível com leveduras.',
    clinicalUse:
      'Assadura com componente por Candida, intertrigo com componente fúngico e dermatite úmida superficial com indicação de nistatina — não para qualquer assadura.',
    reassessment: 'Reavaliar com citologia se não houver resposta.',
    prescriptionExample:
      'Aplicar camada fina sobre pele limpa e seca, 2 a 3 vezes ao dia, quando citologia indicar componente fúngico.',
    safetyAlert:
      'Não usar empiricamente em toda assadura. Não monoterapia de piodermite bacteriana. ' + ZINC_INGESTION_ALERT,
    price: {
      averageLabel: 'R$ 109,57',
      rangeLabel: '60 g: R$ 109,57 (marca); genérico equivalente ~R$ 12,98',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/dermodex-creme-de-tratamento-contra-assadura-60-g.html',
    imageUrl:
      'https://www.drogasil.com.br/_next/image?q=75&url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F12793438.webp&w=3840',
  },
  {
    id: 'dermodex-prevent',
    slug: 'dermodex-prevent',
    name: 'Dermodex Prevent',
    manufacturer: 'Dermodex',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_barrier',
    commercialSubclasses: ['skin_barrier'],
    species: ['dog', 'cat'],
    presentations: ['Creme 60 g'],
    activeComponents: ['creme protetor de barreira'],
    labelCompositionSummary:
      'Creme protetor de barreira. Composição quantitativa completa não encontrada de forma suficientemente confiável; não cadastrar ingredientes presumidos.',
    labelDirections: 'Aplicar camada fina sobre pele limpa e seca como prevenção de assaduras.',
    plumbsContext: 'Barreira preventiva; não substitui tratamento de infecção.',
    clinicalUse: 'Prevenção de dermatite por umidade e proteção perilesional.',
    reassessment: 'Se assadura instalar, investigar causa e considerar versão Tratamento se houver componente fúngico.',
    prescriptionExample:
      'Aplicar camada fina de barreira preventiva na pele limpa e seca perilesional após cada higienização.',
    safetyAlert: 'Impedir lambedura. Composição completa não confirmada publicamente.',
    price: {
      averageLabel: 'R$ 45,90',
      rangeLabel: '60 g: aproximadamente R$ 45,90',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl:
      'https://www.drogasil.com.br/creme-para-prevencao-de-assaduras-dermodex-prevent-60g-1431181.html',
    imageUrl:
      'https://www.drogasil.com.br/_next/image?q=75&url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F18309236.webp&w=3840',
  },
  {
    id: 'bepantol-baby-bayer',
    slug: 'bepantol-baby',
    name: 'Bepantol Baby',
    manufacturer: 'Bayer',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_barrier',
    commercialSubclasses: ['skin_barrier', 'skin_hydration'],
    species: ['dog', 'cat'],
    presentations: ['Creme 30 g'],
    activeComponents: ['dexpanthenol'],
    labelCompositionSummary: 'Dexpanthenol associado a veículo protetor.',
    labelDirections: 'Aplicar camada fina sobre pele limpa; reaplicar após higienização.',
    plumbsContext: 'Suporte à barreira e hidratação leve; sem ação antibacteriana ou antifúngica relevante.',
    clinicalUse:
      'Hidratação, suporte à barreira, prevenção de maceração leve e pele íntegra ou superficialmente irritada.',
    reassessment: 'Não substitui tratamento de infecção documentada.',
    prescriptionExample:
      'Aplicar camada fina de barreira com dexpanthenol na pele limpa e seca perilesional.',
    safetyAlert: 'Impedir lambedura. Não possui ação antimicrobiana relevante.',
    price: {
      averageLabel: 'R$ 16,90',
      rangeLabel: '30 g: aproximadamente R$ 16,90',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/bepantol-baby-creme-contra-assadura-30g-15-off.html',
    imageUrl: 'https://product-data.raiadrogasil.io/images/14629081.webp',
  },

  // ── Cicatrizantes e produtos para feridas ────────────────────────────────
  {
    id: 'regepil-spray-ourofino',
    slug: 'regepil-cicatrizante',
    name: 'Regepil',
    manufacturer: 'Ourofino Saúde Animal',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Spray 50 mL'],
    activeComponents: ['tartarato de ketanserina 0,345 g/100 mL', 'asiaticosídeo 0,200 g/100 mL'],
    labelCompositionSummary:
      'Por 100 mL: tartarato de ketanserina 0,345 g e asiaticosídeo 0,200 g. Bula veterinária para cães e gatos.',
    labelDirections:
      'Aplicar quantidade suficiente para cobrir toda a superfície e bordas da ferida: diariamente, até 3x/dia, ou a cada higienização/troca de curativo, até cicatrização completa.',
    plumbsContext: 'Não há monografia específica desta associação no Plumb\'s consultado.',
    clinicalUse:
      'Adjuvante da cicatrização em ferida limpa e controlada; estimula microcirculação e granulação.',
    reassessment: 'Reavaliar se ferida não evoluir; não substitui desbridamento, drenagem ou controle de infecção.',
    prescriptionExample:
      'Aplicar Regepil sobre ferida limpa, 1 a 3 vezes ao dia ou a cada troca de curativo, até cicatrização completa.',
    safetyAlert:
      'Contraindicado em sangramento ativo, mucosas e animais com menos de 2 meses. Cadastrar como adjuvante, não substituto de manejo da causa.',
    price: {
      averageLabel: 'R$ 130,00',
      rangeLabel: '50 mL: R$ 115,00 a R$ 145,00; referência R$ 127,10',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.cobasi.com.br/regepil-ourofino-50ml-3846244/p',
    labelUrl:
      'https://ourofino.com/wp-content/uploads/2024/07/BUL_50005548_1022_OF00_REGEPIL-VD-1.pdf',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/Regepil_04.png',
    evidenceLevel: 'Licença provisória; estudos conduzidos pelo fabricante.',
  },
  {
    id: 'furanil-pet-vetnil',
    slug: 'furanil-pet',
    name: 'Furanil Pet',
    manufacturer: 'Vetnil',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing', 'skin_pyoderma'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 50 g', 'Pomada 500 g', 'Solução 500 mL', 'Solução spray 60 mL'],
    activeComponents: ['digluconato de clorexidina 0,7 g/100 mL ou g'],
    labelCompositionSummary: 'Digluconato de clorexidina 0,7 g/100 mL ou g. Bula veterinária.',
    labelDirections:
      '1) Realizar assepsia com o produto; 2) deixar agir 10 minutos; 3) enxaguar; 4) reaplicar deixando camada sobre a lesão; 5) cobrir com gaze se indicado; 6) repetir diariamente até cura.',
    plumbsContext:
      'Primeiro uso = limpeza antisséptica (enxaguar); segunda aplicação permanece como camada tópica.',
    clinicalUse:
      'Piodermite, foliculite, pododermatite, feridas, escoriações, abscessos, fístulas e úlceras de decúbito conforme bula.',
    reassessment: 'Avaliar citotoxicidade, exsudato e fase da cicatrização; não usar indiscriminadamente em tecido profundo.',
    prescriptionExample:
      'Limpar com Furanil, deixar agir 10 minutos, enxaguar e reaplicar camada fina sobre a lesão 1x/dia.',
    safetyAlert: 'Evitar contato com olhos. Primeira aplicação deve ser enxaguada antes da camada de permanência.',
    price: {
      averageLabel: 'R$ 161,48',
      rangeLabel: 'Pote 500 g: ~R$ 161,48; demais apresentações com preço menos estável',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.cobasi.com.br/furanil-pomada-50g-vetnil-3297984/p',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/947025-1500-1500.webp',
  },
  {
    id: 'vetaglos-pomada-vetnil',
    slug: 'vetaglos-pomada',
    name: 'Vetaglós Pomada',
    manufacturer: 'Vetnil',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing', 'skin_pyoderma'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 20 g', 'Pomada 50 g'],
    activeComponents: [
      'gentamicina 0,5 g/100 g',
      'sulfanilamida 5 g/100 g',
      'sulfadiazina 5 g/100 g',
      'ureia 5 g/100 g',
      'vitamina A 120.000 UI/100 g',
    ],
    labelCompositionSummary:
      'Por 100 g: gentamicina 0,5 g, sulfanilamida 5 g, sulfadiazina 5 g, ureia 5 g, vitamina A 120.000 UI.',
    labelDirections:
      'Aplicar fina camada após limpeza, 1 a 2 vezes ao dia; manter por 48 h após desaparecimento dos sinais clínicos.',
    plumbsContext: 'Combinação de três antimicrobianos; uso seletivo.',
    clinicalUse: 'Feridas superficiais infectadas com indicação antimicrobiana documentada.',
    reassessment: 'Usar citologia/cultura em infecções profundas ou recorrentes.',
    prescriptionExample:
      'Aplicar camada fina de Vetaglós sobre lesão limpa, 1 a 2 vezes ao dia, por ___ dias.',
    safetyAlert:
      'Três antimicrobianos — não recomendação padrão para toda ferida. Cautela em nefropatas (gentamicina), grandes superfícies e lambedura. Risco de seleção de resistência.',
    price: {
      averageLabel: 'R$ 63,52 a R$ 66,26',
      rangeLabel: '20 g: R$ 55,97–71,06; 50 g: R$ 57,52–74,99',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://terrazoo.com.br/produto/vetaglos-pomada-20g-vetnil/',
    imageUrl: 'https://files.terrazoo.com.br/uploads/2023/11/205567.jpg.webp',
  },
  {
    id: 'alantol-pomada-vetnil',
    slug: 'alantol-pomada',
    name: 'Alantol Pomada',
    manufacturer: 'Vetnil',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing', 'skin_barrier'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 25 g', 'Pomada 60 g', 'Pomada 250 g'],
    activeComponents: ['alantoína 3%', 'óxido de zinco 3%'],
    labelCompositionSummary: 'Alantoína 3% e óxido de zinco 3%.',
    labelDirections:
      'Após limpeza, aplicar camada sobre toda a superfície, 1 a 3 vezes ao dia, até cicatrização completa.',
    plumbsContext: 'Alantoína favorece epitelização; óxido de zinco cria barreira adstringente.',
    clinicalUse: 'Feridas superficiais limpas, úlceras e lesões em fase de epitelização.',
    reassessment: 'Confirmar espécie indicada no rótulo da apresentação selecionada.',
    prescriptionExample:
      'Aplicar Alantol em camada fina sobre ferida limpa, 1 a 3 vezes ao dia, até cicatrização.',
    safetyAlert:
      'Sem atividade antimicrobiana suficiente para infecção estabelecida. ' + ZINC_INGESTION_ALERT,
    price: {
      averageLabel: 'R$ 47,90 a R$ 82,64',
      rangeLabel: '25 g: ~R$ 47,90; 60 g: ~R$ 82,64',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.petz.com.br/produto/pomada-cicatrizante-vetnil-alantol',
    imageUrl: 'https://images.petz.com.br/fotos/10007230000518-1.jpg',
  },
  {
    id: 'ganadol-pomada-zoetis',
    slug: 'ganadol-pomada',
    name: 'Ganadol Pomada',
    manufacturer: 'Zoetis',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 50 g'],
    activeComponents: [
      'penicilina G benzatina 1.250.000 UI/50 g',
      'penicilina G procaína 1.250.000 UI/50 g',
      'di-hidroestreptomicina 1,25 g/50 g',
      'ureia 2,5 g/50 g',
    ],
    labelCompositionSummary:
      'Por 50 g: penicilina G benzatina e procaína 1.250.000 UI cada, di-hidroestreptomicina 1,25 g, ureia 2,5 g.',
    labelDirections:
      'Lavar a região, aplicar quantidade suficiente para recobrir a ferida e realizar curativo. Reaplicar na troca do curativo.',
    plumbsContext: 'Formulação antibiótica antiga; não primeira escolha moderna para pequenos animais.',
    clinicalUse: 'Uso seletivo em feridas superficiais quando alternativas mais modernas não estiverem disponíveis.',
    reassessment: 'Preferir cultura e antimicrobiano direcionado quando possível.',
    prescriptionExample:
      'Aplicar Ganadol sobre ferida limpa na troca do curativo, conforme evolução clínica.',
    safetyAlert:
      'Não recomendar automaticamente: combinação de antibióticos sem cultura, estreptomicina, risco de resistência, lambedura e reação de contato.',
    price: {
      averageLabel: 'R$ 65,41',
      rangeLabel: '50 g: R$ 54,90 a R$ 75,91',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.cobasi.com.br/pomada-anti-infecciosa-e-cicatrizante-ganadol-zoetis-3922323/p',
    labelUrl: 'https://www.zoetis.com.br/global-assets/private/ganadol-bula_08.05.15_.pdf',
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/1068907-1500-1500/Ganadol-Pomada-Cicatrizante-50g.png.webp?v=638829223143300000',
  },
  {
    id: 'bactroban-2-gsk',
    slug: 'bactroban-mupirocina',
    name: 'Bactroban 2% Pomada',
    manufacturer: 'GSK',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pyoderma',
    commercialSubclasses: ['skin_pyoderma', 'skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 10 g', 'Pomada 30 g'],
    activeComponents: ['mupirocina 2% (20 mg/g)'],
    labelCompositionSummary: 'Mupirocina 20 mg/g — 2%. Apresentação humana; uso veterinário seletivo.',
    labelDirections:
      'Após limpeza, aplicar cobrindo completamente a lesão. Permitir pelo menos 10 minutos de contato.',
    dosageGuidance: {
      plumbs: {
        dog: [
          { title: 'Piodermite localizada', dose: '2x/dia; contato mínimo 10 min; máx. 30 dias' },
        ],
        cat: [
          { title: 'Acne de queixo / piodermite focal', dose: '1–2x/dia; contato mínimo 10 min' },
        ],
      },
      notes: ['BSAVA: camada fina a cada 8 h, preferencialmente até 7 dias, reservando para infecções resistentes.'],
    },
    plumbsContext:
      'Plumb\'s: baixa absorção sistêmica; boa penetração em piodermites localizadas e MRSP selecionado.',
    clinicalUse:
      'Piodermite localizada, intertrigo, acne canina/felina, piodermite de calo, furunculose focal e infecção por Staphylococcus pseudintermedius resistente.',
    reassessment: 'Reservar para infecção documentada; reavaliar em 7–14 dias.',
    prescriptionExample:
      'Aplicar mupirocina 2% em camada fina apenas sobre região infectada, a cada 8–12 horas, durante ___ dias. Impedir lambedura por 20 minutos.',
    safetyAlert: SELECTIVE_ANTIMICROBIAL_ALERT,
    price: {
      averageLabel: 'R$ 114,87',
      rangeLabel: '10 g: ~R$ 114,87; genéricos variam significativamente',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogariasaopaulo.com.br/bactroban-20mg-g-pomada-gsk-10g/p',
  },
  {
    id: 'verutex-2-ache',
    slug: 'verutex-acido-fusidico',
    name: 'Verutex 2% Creme',
    manufacturer: 'Aché',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pyoderma',
    commercialSubclasses: ['skin_pyoderma', 'skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Creme 15 g'],
    activeComponents: ['ácido fusídico 2% (20 mg/g)'],
    labelCompositionSummary: 'Ácido fusídico 20 mg/g — 2%. Verutex puro, sem corticoide (não confundir com Verutex B).',
    labelDirections: 'Aplicar na pele a cada 12 horas por aproximadamente 5 dias; reavaliar resposta.',
    dosageGuidance: {
      notes: ['BSAVA: aplicar a cada 12 h por ~5 dias; reavaliar resposta.'],
    },
    plumbsContext: 'Boa atividade contra Gram-positivos, especialmente Staphylococcus pseudintermedius.',
    clinicalUse: 'Intertrigo, piodermite focal, acne e lesões superficiais estafilocócicas.',
    reassessment: 'Uso seletivo para preservar eficácia.',
    prescriptionExample:
      'Aplicar ácido fusídico 2% em camada fina sobre lesão limpa, a cada 12 horas, durante 5 dias.',
    safetyAlert: SELECTIVE_ANTIMICROBIAL_ALERT,
    price: {
      averageLabel: 'R$ 89,94',
      rangeLabel: '15 g: ~R$ 89,94',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogal.com.br/verutex-20mg-g-creme-dermatologico-15g/p',
  },
  {
    id: 'iruxol-mono-colagenase-abbott',
    slug: 'iruxol-mono-colagenase',
    name: 'Iruxol Mono',
    manufacturer: 'Abbott',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 15 g', 'Pomada 30 g'],
    activeComponents: ['colagenase 1,2 U/g'],
    labelCompositionSummary: 'Colagenase 1,2 U/g — desbridamento enzimático seletivo de tecido desvitalizado.',
    labelDirections:
      'Aplicar camada fina, normalmente 1x/dia, após umedecer/limpar o tecido conforme protocolo. Reaplicar a cada troca se cobertura saturar.',
    plumbsContext: 'Não há monografia veterinária específica no Plumb\'s consultado.',
    clinicalUse: 'Escara, necrose aderida, tecido desvitalizado e feridas em que desbridamento cirúrgico não possa ser completo.',
    reassessment: 'Suspender quando leito estiver limpo e com granulação saudável; não manter durante epitelização.',
    prescriptionExample:
      'Aplicar colagenase em camada fina sobre tecido desvitalizado, 1x/dia, após limpeza do leito.',
    safetyAlert: COLLAGENASE_SILVER_ALERT,
    price: {
      averageLabel: 'R$ 78,71',
      rangeLabel: '15 g: ~R$ 78,71',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.extrafarma.com.br/iruxol-mono-pomada-15g/p',
    labelUrl: 'https://www.abbottbrasil.com.br/nossas-bulas/iruxol-mono-colagenase.html',
  },
  {
    id: 'nebacetin-pomada-ache',
    slug: 'nebacetin-pomada',
    name: 'Nebacetin Pomada',
    manufacturer: 'Aché',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_wound_healing',
    commercialSubclasses: ['skin_wound_healing'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 15 g'],
    activeComponents: ['sulfato de neomicina 5 mg/g', 'bacitracina zíncica 250 UI/g'],
    labelCompositionSummary: 'Neomicina 5 mg/g + bacitracina zíncica 250 UI/g.',
    labelDirections: 'Aplicar camada fina sobre lesões superficiais selecionadas.',
    plumbsContext: 'Uso seletivo; espectro limitado e risco de dermatite de contato por neomicina.',
    clinicalUse: 'Pequenas lesões superficiais selecionadas; não recomendação automática para feridas.',
    reassessment: 'Suspender se irritação ou falta de resposta.',
    prescriptionExample:
      'Aplicar camada fina sobre lesão superficial limpa, 2 a 3 vezes ao dia, por ___ dias.',
    safetyAlert:
      'Risco de dermatite de contato por neomicina, seleção de resistência e baixa utilidade em infecção profunda. Impedir lambedura.',
    price: {
      averageLabel: 'R$ 87,69',
      rangeLabel: '15 g: R$ 87,69 (marca); genérico EMS ~R$ 14,94',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/nebacetin-pomada-15-g.html',
    imageUrl:
      'https://www.drogasil.com.br/_next/image?q=75&url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F16632340.webp&w=3840',
  },

  // ── Associações com corticoide ───────────────────────────────────────────
  {
    id: 'panolog-15ml-elanco',
    slug: 'panolog-otologico-topico',
    name: 'Panolog',
    manufacturer: 'Elanco',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pyoderma',
    commercialSubclasses: ['skin_pyoderma', 'otic_antibacterial', 'otic_corticosteroid'],
    species: ['dog', 'cat'],
    presentations: ['Frasco 15 mL', 'Frasco 7,5 mL'],
    activeComponents: [
      'nistatina 100.000 UI/mL',
      'neomicina 2.500 UI/mL',
      'tiostreptona 2.500 UI/mL',
      'acetonida de triancinolona 1 mg/mL',
    ],
    labelCompositionSummary:
      'Nistatina + neomicina + tiostreptona + triancinolona. Bula veterinária para cães e gatos.',
    labelDirections: 'Usar conforme bula veterinária para dermatoses/otite específicas.',
    plumbsContext: 'Não cadastrar como cicatrizante universal.',
    clinicalUse: 'Dermatoses específicas, otite e inflamações com componente bacteriano/fúngico sensível.',
    reassessment: 'Reavaliar integridade timpânica em uso otológico.',
    prescriptionExample: 'Aplicar Panolog conforme orientação veterinária sobre lesão diagnosticada.',
    safetyAlert: CORTICOSTEROID_TOPICAL_ALERT,
    price: {
      averageLabel: 'Confirmar varejo',
      rangeLabel: 'Preço confiável não localizado na data da pesquisa',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.amorepets.com.br/produto/panolog-pomada-15ml-elanco.html',
    imageUrl: 'https://cdn.awsli.com.br/600x450/1300/1300473/produto/1121575552b971b2959.jpg',
  },
  {
    id: 'crema-6a-labyes',
    slug: 'crema-6a',
    name: 'Crema 6A',
    manufacturer: 'Labyes',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pyoderma',
    commercialSubclasses: ['skin_pyoderma'],
    species: ['dog', 'cat'],
    presentations: ['Pomada 15 g', 'Pomada 30 g', 'Pomada 50 g'],
    activeComponents: [
      'dexametasona 0,025 g/100 g',
      'sulfato de neomicina 0,25 g/100 g',
      'bacitracina-zinco 50.000 UI/100 g',
      'griseofulvina 0,18 g/100 g',
      'benzocaína 1 g/100 g',
    ],
    labelCompositionSummary:
      'Dexametasona + neomicina + bacitracina + griseofulvina + benzocaína. Bula veterinária.',
    labelDirections: 'Usar conforme bula veterinária em dermatoses específicas.',
    plumbsContext: 'Combina antibióticos, antifúngico e corticoide.',
    clinicalUse: 'Dermatoses inflamatórias selecionadas com diagnóstico confirmado.',
    reassessment: 'Especial cautela em gatos.',
    prescriptionExample: 'Aplicar Crema 6A conforme orientação veterinária sobre lesão diagnosticada.',
    safetyAlert:
      CORTICOSTEROID_TOPICAL_ALERT +
      ' Benzocaína pode causar reações e representa risco se ingerida.',
    price: {
      averageLabel: 'R$ 86,90',
      rangeLabel: '15 g: ~R$ 86,90 (estoque comercial pouco confiável na data da pesquisa)',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.cobasi.com.br/crema-6a-labyes-3940992/p',
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/211596-1500-1500/Crema-6-A.webp?v=638437113440270000',
  },
  {
    id: 'dermotrat-creme-ourofino',
    slug: 'dermotrat-creme',
    name: 'Dermotrat Creme',
    manufacturer: 'Ourofino',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pyoderma',
    commercialSubclasses: ['skin_pyoderma'],
    species: ['dog', 'cat'],
    presentations: ['Creme 20 g'],
    activeComponents: ['gentamicina', 'miconazol', 'betametasona'],
    labelCompositionSummary: 'Gentamicina + miconazol + betametasona. Bula veterinária.',
    labelDirections: 'Usar conforme bula em dermatoses inflamatórias associadas a bactérias ou fungos sensíveis.',
    plumbsContext: 'Não usar automaticamente em feridas cirúrgicas, úlceras ou demodicose.',
    clinicalUse: 'Dermatoses inflamatórias com componente bacteriano ou fúngico sensível.',
    reassessment: 'Evitar em áreas que o animal consegue lamber.',
    prescriptionExample: 'Aplicar Dermotrat em camada fina sobre lesão diagnosticada, conforme bula.',
    safetyAlert: CORTICOSTEROID_TOPICAL_ALERT,
    price: {
      averageLabel: 'Confirmar varejo',
      rangeLabel: 'Preço variável conforme apresentação',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.petz.com.br/produto/dermotrat-creme-ourofino-20-g',
    imageUrl: 'https://images.petz.com.br/fotos/1554813213356.jpg',
  },

  // ── Shampoos terapêuticos adicionais ─────────────────────────────────────
  {
    id: 'peroxydex-spherulites-virbac',
    slug: 'peroxydex-spherulites',
    name: 'Peroxydex Spherulites',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_seborrhea',
    commercialSubclasses: ['skin_seborrhea', 'skin_pyoderma'],
    species: ['dog', 'cat'],
    presentations: ['Shampoo 125 mL'],
    activeComponents: ['peróxido de benzoíla'],
    labelCompositionSummary: 'Shampoo dermatológico com peróxido de benzoíla e sistema Spherulites.',
    labelDirections:
      'Molhar, aplicar, massagear e manter contato por 5 a 10 minutos antes de enxaguar. Frequência conforme doença.',
    dosageGuidance: {
      plumbs: {
        dog: [
          { title: 'Shampoo', dose: 'Diariamente até semanalmente; contato 5–10 min' },
          { title: 'Gel (referência)', dose: '1–2x/dia' },
        ],
        cat: [{ title: 'Shampoo', dose: 'Diariamente até semanalmente; contato 5–10 min' }],
      },
    },
    plumbsContext:
      'Antibacteriano, queratolítico, comedolítico e antisseborreico. Pode clarear pelos e irritar pele sensível.',
    clinicalUse:
      'Piodermite superficial/profunda, foliculite, furunculose, demodicose, comedões, acne canina e seborréia oleosa.',
    reassessment: 'Reduzir frequência se ressecamento ou eritema; suspender se irritação importante.',
    prescriptionExample:
      'Dar banho com Peroxydex, manter contato por 10 minutos e enxaguar. Repetir conforme protocolo dermatológico.',
    safetyAlert:
      'Pode causar ressecamento, eritema, dor, clareamento de pelos e fotossensibilidade. Evitar contato com olhos.',
    price: {
      averageLabel: 'R$ 102,96',
      rangeLabel: '125 mL: R$ 92,50 a R$ 113,41',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl:
      'https://www.magazineluiza.com.br/shampoo-peroxydex-spherulites-125ml-virbac/p/kbc8k43j8f/pe/shcs/',
    imageUrl:
      'https://a-static.mlcdn.com.br/420x420/shampoo-peroxydex-spherulites-125ml-virbac/petshoplateemia/045/22a48889f94d4adf383e36562692cf51.jpeg',
  },
  {
    id: 'sebotrat-s-agener-uniao',
    slug: 'sebotrat-s-shampoo',
    name: 'Sebotrat S',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_seborrhea',
    commercialSubclasses: ['skin_seborrhea'],
    species: ['dog', 'cat'],
    presentations: ['Shampoo 200 mL'],
    activeComponents: ['ácido salicílico 2,3%', 'enxofre 2%', 'queratina hidrolisada 0,5%'],
    labelCompositionSummary: 'Ácido salicílico 2,3%, enxofre 2%, queratina hidrolisada 0,5%.',
    labelDirections:
      'Banho 1 a 2 vezes por semana, mantendo contato por aproximadamente 10 minutos antes do enxágue.',
    plumbsContext: 'Antisseborreico para seborréia seca ou mista, descamação e hiperqueratose.',
    clinicalUse: 'Seborréia seca/mista, descamação, hiperqueratose e distúrbios de renovação epidérmica.',
    reassessment: 'Ajustar frequência conforme resposta.',
    prescriptionExample:
      'Dar banho com Sebotrat S, manter contato por 10 minutos e enxaguar. Usar 1 a 2 vezes por semana.',
    safetyAlert: 'Evitar contato com olhos e mucosas.',
    price: {
      averageLabel: 'R$ 110,11',
      rangeLabel: '200 mL: R$ 104,31 a R$ 115,90',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.laboraves.com.br/sebotrat-s-200ml-37356',
    imageUrl:
      'https://img.irroba.com.br/fit-in/600x600/filters%3Aformat%28webp%29%3Afill%28fff%29%3Aquality%2880%29/laborave/catalog/api/laborave_integrac/6718eaf7650d6.jpg',
  },
  {
    id: 'sebotrat-o-agener-uniao',
    slug: 'sebotrat-o-shampoo',
    name: 'Sebotrat O',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_seborrhea',
    commercialSubclasses: ['skin_seborrhea'],
    species: ['dog'],
    presentations: ['Shampoo 200 mL'],
    activeComponents: ['ácido salicílico 2%', 'enxofre 2%', 'coaltar/alcatrão 4,5%'],
    labelCompositionSummary: 'Ácido salicílico 2%, enxofre 2%, coaltar 4,5%. Indicado para cães.',
    labelDirections:
      'Banhos 2 a 3 vezes por semana, com contato por aproximadamente 10 minutos.',
    plumbsContext: 'Seborréia oleosa e distúrbios de renovação epidérmica em cães.',
    clinicalUse: 'Seborréia oleosa, descamação oleosa e hiperqueratose em cães.',
    reassessment: 'Monitorar irritação cutânea.',
    prescriptionExample:
      'Dar banho com Sebotrat O, manter contato por 10 minutos e enxaguar. Usar 2 a 3 vezes por semana.',
    safetyAlert: COAL_TAR_CAT_ALERT,
    price: {
      averageLabel: 'R$ 128,16',
      rangeLabel: '200 mL: R$ 121,41 a R$ 134,90',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/dermatologicos/sebotrat-o/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/sebostrat-o.jpg',
  },
  {
    id: 'allerdog-hipoalergenico-cepav',
    slug: 'allerdog-hipoalergenico',
    name: 'Allerdog Hipoalergênico',
    manufacturer: 'CEPAV',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_hydration',
    commercialSubclasses: ['skin_hydration', 'skin_atopy'],
    species: ['dog', 'cat'],
    presentations: ['Shampoo 230 mL'],
    activeComponents: ['shampoo hipoalergênico'],
    labelCompositionSummary: 'Shampoo hipoalergênico para higiene de pacientes atópicos.',
    labelDirections: 'Usar conforme necessidade de higiene; enxaguar completamente.',
    plumbsContext: 'Adjuvante de higiene; não substitui terapia antimicrobiana quando há infecção documentada.',
    clinicalUse:
      'Higiene de pacientes atópicos, redução de ressecamento, recuperação da barreira e manutenção entre banhos medicamentosos.',
    reassessment: 'Se infecção documentada, associar terapia específica.',
    prescriptionExample:
      'Dar banho com Allerdog Hipoalergênico conforme frequência de higiene orientada; enxaguar completamente.',
    safetyAlert: 'Não substitui clorexidina, miconazol ou outro agente quando existe infecção documentada.',
    price: {
      averageLabel: 'Confirmar varejo',
      rangeLabel: 'Preço variável conforme volume e estoque',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.cobasi.com.br/shampoo-allerdog-hipoalergenico-cepav-3201081/p',
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/189253-368-368/Allerdog-hipoalergenico-shampoo-230-ml-Cepav.jpg?v=638134522420170000',
  },
  {
    id: 'sebocalm-spherulites-virbac',
    slug: 'sebocalm-spherulites',
    name: 'Sebocalm Spherulites',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_hydration',
    commercialSubclasses: ['skin_hydration', 'skin_seborrhea'],
    species: ['dog', 'cat'],
    presentations: ['Shampoo 250 mL'],
    activeComponents: ['shampoo hipoalergênico / seborreia'],
    labelCompositionSummary: 'Shampoo Virbac Spherulites para seborreia e pelagem sensível.',
    labelDirections: 'Usar conforme rótulo; enxaguar completamente.',
    plumbsContext: 'Hidratação e higiene em pele sensível/seborreica.',
    clinicalUse: 'Seborreia leve, pelagem sensível e manutenção dermatológica.',
    reassessment: 'Associar terapia específica se infecção ou prurido intenso persistirem.',
    prescriptionExample:
      'Dar banho com Sebocalm Spherulites conforme orientação; enxaguar completamente.',
    safetyAlert: 'Adjuvante; não substitui terapia antimicrobiana documentada.',
    price: {
      averageLabel: 'Confirmar varejo',
      rangeLabel: '250 mL: preço variável conforme varejo',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl:
      'https://www.magazineluiza.com.br/shampoo-virbac-sebocalm-spherulites-para-seborreia-250-ml/p/akf569dkb2/pe/shcs/',
    imageUrl:
      'https://a-static.mlcdn.com.br/90x90/shampoo-virbac-sebocalm-spherulites-para-seborreia-250-ml/postodasracoes/ts000760/084545f23430ea8093b4b249e5e8c925.jpeg',
  },
];
