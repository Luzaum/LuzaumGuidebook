export const consensosSeed: Array<Record<string, any>> = [
  {
    id: 'con-icatcare-dtuif-felina-2025',
    slug: 'icatcare-dtuif-felina-2025',
    title: '2025 iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats',
    shortTitle: 'DTUIF felina (iCatCare 2025)',
    sourceOrganization: 'International Cat Care / iCatCare Veterinary Society',
    year: 2025,
    species: 'cat',
    category: 'nefrologia-urologia',
    tags: ['DTUIF', 'FIC', 'Obstrução uretral', 'Urolitíase', 'ITU', 'Manejo ambiental'],
    pdfUrl: '/documents/consulta-vet/consensos/icatcare-dtuif-felina-2025.pdf',
    pdfFileName: 'icatcare-dtuif-felina-2025.pdf',
    storagePath: 'consulta-vet/consensos/icatcare-dtuif-felina-2025.pdf',
    summary:
      'Consenso iCatCare 2025 para abordagem de gatos com sinais do trato urinário inferior, com foco em diagnóstico por causa, cistite idiopática felina, urolitíase, ITU, obstrução uretral, manejo ambiental e comunicação com cuidadores.',
    articleSummaryRichText:
      '<p>O consenso iCatCare 2025 recomenda tratar sinais urinários baixos como ponto de partida, não como diagnóstico final. A abordagem central é separar rapidamente obstrução uretral de apresentações não obstrutivas e, em seguida, investigar FIC, urolitíase, ITU e causas menos comuns.</p><p>A ficha de DTUIF no app usa este documento como base editorial e identifica as figuras incorporadas como material do consenso.</p>',
    adminNotesRichText:
      '<p><strong>Alerta editorial:</strong> DTUIF/FLUTD não deve ser usado como diagnóstico definitivo. Macho com bexiga distendida e tentativas improdutivas de urinar deve ser conduzido como emergência por suspeita de obstrução uretral.</p>',
    relatedDiseaseSlugs: ['doencas-trato-urinario-inferior-felino-dtuif'],
    relatedMedicationSlugs: ['amoxicilina-clavulanato', 'sulfametoxazol-trimetoprima', 'pregabalina', 'maropitant'],
    isDemonstrative: false,
  },
  {
    id: 'con-1',
    slug: 'leishmaniose-brasileiro-2020',
    title: 'Diretrizes Brasileiras para o Manejo da Leishmaniose Visceral Canina',
    shortTitle: 'Leishmaniose (Brasileish)',
    sourceOrganization: 'Brasileish',
    year: 2020,
    species: 'dog',
    category: 'infecciosas',
    tags: ['LVC', 'Zoonose', 'Estadiamento'],
    pdfUrl: 'https://www.brasileish.com.br/wp-content/uploads/2020/12/Diretrizes-Brasileish-2020.pdf',
    pdfFileName: 'Diretrizes-Brasileish-2020.pdf',
    summary: 'Atualização das diretrizes para diagnóstico, estadiamento e tratamento da LVC no Brasil.',
    articleSummaryRichText:
      '<p>O consenso da Brasileish (2020) atualiza o estadiamento clínico da Leishmaniose Visceral Canina (LVC), dividindo a doença em 4 estágios baseados em sinais clínicos, achados laboratoriais e carga parasitária.</p>',
    adminNotesRichText:
      '<p><strong>Atenção:</strong> A Miltefosina é o único fármaco leishmanicida aprovado para uso veterinário no Brasil.</p>',
    relatedDiseaseSlugs: ['leishmaniose-visceral-canina'],
    isDemonstrative: true,
    warningLabel: 'Demonstração',
  },
  {
    id: 'con-2',
    slug: 'iris-drc-2023',
    title: 'IRIS Staging of CKD',
    shortTitle: 'Estadiamento DRC (IRIS)',
    sourceOrganization: 'International Renal Interest Society',
    year: 2023,
    species: 'both',
    category: 'nefrologia',
    tags: ['DRC', 'Renal', 'Estadiamento'],
    pdfUrl: 'http://www.iris-kidney.com/pdf/IRIS_Staging_of_CKD_modified_2023.pdf',
    pdfFileName: 'IRIS_Staging_of_CKD_modified_2023.pdf',
    summary: 'Diretrizes internacionais para estadiamento e tratamento da Doença Renal Crônica em cães e gatos.',
    articleSummaryRichText:
      '<p>As diretrizes da IRIS para Doença Renal Crônica (DRC) baseiam-se na avaliação de creatinina sérica ou SDMA.</p>',
    adminNotesRichText:
      '<p>Sempre avaliar o paciente hidratado antes de classificar o estágio da DRC.</p>',
    relatedDiseaseSlugs: ['doenca-renal-cronica'],
    isDemonstrative: true,
    warningLabel: 'Demonstração',
  },
  {
    id: 'con-acvim-cie-caes-2026',
    slug: 'acvim-cie-caes-2026',
    title: 'ACVIM–endorsed statement: consensus statement and systematic review on guidelines for the diagnosis and treatment of chronic inflammatory enteropathy in dogs',
    shortTitle: 'Enteropatia Inflamatória Crônica (ACVIM 2026)',
    sourceOrganization: 'ACVIM',
    year: 2026,
    species: 'dog',
    category: 'gastroenterologia',
    tags: ['CIE', 'PLE', 'EII', 'Dietoterapia', 'Imunomodulação', 'Biomarcadores'],
    pdfUrl: '/documents/consulta-vet/consensos/acvim-cie-caes-2026.pdf',
    pdfFileName: 'acvim-cie-caes-2026.pdf',
    storagePath: 'consulta-vet/consensos/acvim-cie-caes-2026.pdf',
    summary: 'Consenso ACVIM 2026 sobre diagnóstico e tratamento de enteropatia inflamatória crônica (CIE) em cães, incluindo fenótipos clínicos (responsivo a alimento, responsivo a imunossupressor, não responsivo), papel da PLE e diretrizes de manejo e dietoterapia.',
    adminNotesRichText:
      '<p><strong>Importante:</strong> Glicocorticoides e outros imunossupressores só devem ser iniciados após exclusão de outras patologias extra-GI (como hipoadrenocorticismo atípico ou insuficiência pancreática) e após testes terapêuticos dietéticos adequados em cães estáveis.</p>',
    keyPointsText:
      '• Terminologia: O termo Enteropatia Inflamatória Crônica (CIE) deve ser preferido em relação a IBD para evitar confusão com a patologia humana.\n' +
      '• Abordagem em 2 Níveis (CIE-I vs. CIE-II): Permite classificar a gravidade clínica com base no escore CCECAI (CIE-I: ≤ 5, CIE-II: ≥ 6 e/ou perda de peso importante/apetite ruim/alteração de PE).\n' +
      '• Dietoterapia como Primeira Escolha: Testes dietéticos exclusivos com dietas terapêuticas (hidrolisada ou novel protein) devem ser tentados primeiro em cães clinicamente estáveis. Recomenda-se realizar até 3 tentativas dietéticas de no mínimo 2 semanas cada antes de declarar falha.\n' +
      '• Rejeição ao Uso Empírico de Antibióticos: O uso empírico de metronidazol ou tilosina é fortemente desencorajado por induzir disbiose duradoura e apresentar altas taxas de recidiva. Reservado apenas para colites granulomatosas associadas a Escherichia coli invasiva (AIEC) com base em cultura e antibiograma de biópsia.\n' +
      '• Biópsia e Endoscopia: Indicadas na falha dos testes dietéticos ou em cães graves e hipoalbuminêmicos (suspeita de PLE ou linfoma). A colheita deve incluir estômago (n=6), duodeno (n=10-15), íleo (n=3-5) e cólon (n=9-12).',
    practicalApplicationText:
      '• Manejo Inicial: Desparasitação completa e avaliação inicial. Em cães estáveis, conduzir teste com dieta terapêutica de eliminação (hidrolisada ou proteína nova) por no mínimo 2 semanas. Se responsivo, manter por pelo menos 12 semanas antes de transição.\n' +
      '• Manejo de PLE: Dietas com gordura ultra-baixa (< 2 g/100 kcal) e alta digestibilidade são cruciais, principalmente em casos associados a linfangiectasia intestinal.\n' +
      '• Imunomodulação: Indicada em cães com CIE-IR (responsiva a imunossupressor) ou PLE grave. A prednisolona (1-2 mg/kg q24h) é a primeira linha de indução. Casos refratários ou PLE graves podem exigir ciclosporina (3-5 mg/kg q12-24h) ou clorambucil.\n' +
      '• Suporte de Cobalamina (B12): A suplementação oral ou parenteral deve ser instituída sempre que os níveis séricos estiverem baixos.',
    appNotesText:
      '• Alerta de Coagulopatia: Cães com enteropatia perdedora de proteína (PLE) têm alto risco de eventos tromboembólicos. Considerar terapia com anticoagulantes (ex: rivaroxabana).\n' +
      '• Addison Atípico: Sempre realizar cortisol basal ou estimulação por ACTH em cães com sintomas GI crônicos e flutuantes antes de iniciar doses imunossupressoras de corticoides.',
    references: [
      {
        id: 'ref-acvim-cie-2026',
        citationText: 'Heilmann R. M. et al. ACVIM–endorsed statement: consensus statement and systematic review on guidelines for the diagnosis and treatment of chronic inflammatory enteropathy in dogs. Journal of Veterinary Internal Medicine, 2026;40(1):aalaf017.',
        sourceType: 'Consenso ACVIM / Revisão Sistemática',
        url: 'https://doi.org/10.1093/jvimsj/aalaf017',
        notes: 'Diretriz de consenso atualizada e revisão sistemática sobre a abordagem diagnóstica e conduta na enteropatia inflamatória crônica em cães.',
        evidenceLevel: 'Consenso de Especialistas'
      }
    ],
    relatedMedicationSlugs: ['prednisolona'],
    relatedDiseaseSlugs: [],
    isDemonstrative: false
  }
];
