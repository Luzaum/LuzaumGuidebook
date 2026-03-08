export const consensosSeed: Array<Record<string, any>> = [
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
];
