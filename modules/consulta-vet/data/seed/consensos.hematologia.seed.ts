type ConsensusSeed = Record<string, unknown>;

/** Hematologia e hemoterapia — consensos e diretrizes transfusionais. */
export const hematologiaConsensosSeed: ConsensusSeed[] = [
  {
    id: 'con-isfm-transfusao-felina-2021',
    slug: 'isfm-transfusao-felina-2021',
    title: 'Coleta e administração de sangue e hemocomponentes em gatos',
    shortTitle: 'Transfusão felina — ISFM 2021',
    sourceOrganization: 'ISFM / AAFP',
    year: 2021,
    species: 'cat',
    category: 'hematologia',
    tags: [
      'Transfusão sanguínea',
      'Hemocomponentes',
      'Tipagem sanguínea',
      'Crossmatch',
      'Doadores',
      'Reação transfusional',
      'Xenotransfusão',
    ],
    pdfUrl: '/documents/consulta-vet/consensos/isfm-transfusao-felina-2021.pdf',
    pdfFileName: 'isfm-transfusao-felina-2021.pdf',
    storagePath: 'documents/consulta-vet/consensos/isfm-transfusao-felina-2021.pdf',
    summary:
      'Diretrizes ISFM 2021 para seleção de doadores, tipagem e compatibilidade, escolha de sangue total ou hemocomponentes, coleta, administração e monitorização de transfusões em gatos. A decisão de transfundir deve integrar causa e velocidade da anemia, perdas em curso, perfusão e sinais clínicos; não há um hematócrito/PCV isolado que funcione como gatilho universal. Como gatos possuem aloanticorpos naturais, incompatibilidades podem causar reação grave já na primeira transfusão.',
    articleSummaryRichText:
      '<p>As diretrizes ISFM 2021 organizam a hemoterapia felina desde a seleção e triagem infecciosa do doador até o reconhecimento de reações agudas e tardias. O eixo de segurança é <strong>tipar doador e receptor</strong>, usar sangue compatível e realizar <strong>crossmatch sempre que possível</strong>, sobretudo após transfusão anterior ou reação transfusional.</p><p>A indicação de concentrado de hemácias ou sangue total deve ser baseada no quadro clínico e na causa da anemia, não apenas no PCV. Plasma é reservado principalmente à hemorragia associada a coagulopatia; não é expansor volêmico de escolha. A administração requer via dedicada, filtro próprio para sangue, início lento e monitorização próxima.</p>',
    keyPointsText:
      'COMPATIBILIDADE\n- Tipar sempre doador e receptor antes da transfusão: tipo A recebe A, tipo B recebe B e tipo AB recebe preferencialmente AB; se AB não estiver disponível, hemácias tipo A são a alternativa descrita.\n- Gatos têm aloanticorpos naturais; uma incompatibilidade AB pode causar hemólise grave já na primeira transfusão.\n- Fazer crossmatch idealmente antes de toda transfusão e obrigatoriamente quando houver transfusão prévia, reação anterior ou histórico desconhecido relevante. O crossmatch não substitui a tipagem.\n\nINDICAÇÃO E PRODUTO\n- Não existe PCV/hematócrito gatilho universal. Considerar velocidade e causa da anemia, perdas em curso, taquicardia ou bradicardia, fraqueza, colapso, alteração de pulsos, taquipneia e perfusão.\n- Sangue total fresco e concentrado de hemácias aumentam a capacidade de transporte de oxigênio; preferir concentrado quando for importante reduzir carga de volume.\n- Plasma fresco/FFP: principal indicação é sangramento por coagulopatia hereditária ou adquirida. Benefício profilático em coagulopatia sem sangramento é incerto; plasma é pouco eficiente para expansão volêmica.\n\nADMINISTRAÇÃO E MONITORIZAÇÃO\n- Usar acesso exclusivo e filtro apropriado para sangue; não administrar na mesma linha com soluções contendo cálcio ou glicose. Salina 0,9% ou Plasma-Lyte são compatíveis conforme a diretriz.\n- Sem necessidade de reposição rápida: iniciar em 0,5 ml/kg/h por 15 min; se estável, 1 ml/kg/h por 15 min e então ajustar para concluir, em geral, dentro de 4 h.\n- Registrar sinais vitais basais e monitorar inicialmente a cada 5 min por 30-60 min: temperatura, FC, pulsos, PA, mucosas, FR/esforço, SpO2 e estado mental.\n- Vocalização/agitação, febre, hipersalivação, vômito, diarreia, edema facial/urticária, pigmentúria, hipotensão ou desconforto respiratório podem indicar reação.',
    practicalApplicationText:
      'CHECKLIST PRÁTICO\n1. Confirmar indicação clínica e escolher o produto: hemácias para capacidade de transporte de oxigênio; sangue total quando também houver necessidade dos demais componentes; plasma principalmente se houver sangramento por coagulopatia.\n2. Tipar doador e receptor; realizar crossmatch sempre que possível e não omiti-lo em paciente previamente transfundido ou com reação anterior.\n3. Confirmar doador saudável, 1-8 anos, peso magro >4,5 kg, sem transfusão prévia, com hemograma/bioquímica e triagem infecciosa. Testar FeLV, FIV, hemoplasmas e Bartonella; acrescentar agentes vetoriais conforme epidemiologia local.\n4. Planejar volume individualmente. A estimativa citada é: aumento do PCV (%) = volume transfundido (ml) / [2 × peso (kg)], reconhecendo que fórmulas podem errar. Em termos práticos, a diretriz cita 10 ml/kg para receptores muito pequenos.\n5. Usar linha dedicada e filtro; iniciar lentamente. Colher parâmetros basais e monitorar continuamente, com registros a cada 5 min nos primeiros 30-60 min.\n6. Em sinais leves, reduzir a velocidade e reavaliar. Em reação marcada, interromper imediatamente, substituir o sangue por cristalóide compatível e tratar conforme o fenótipo da reação.\n\nXENOTRANSFUSÃO\nSangue canino é recurso excepcional quando sangue felino compatível não está disponível e o risco de morte é imediato. Pode estabilizar por curto prazo, mas deve ser uma única transfusão: anticorpos surgem em 4-7 dias, hemólise tardia é frequente e repetir sangue canino pode causar anafilaxia grave e morte.',
    appNotesText:
      'VIGENTE — referência prática para hemoterapia felina. Não usar PCV isoladamente como gatilho. Tipagem é obrigatória e crossmatch deve ser realizado sempre que possível. Xenotransfusão canina é medida de resgate, única e não repetível.',
    references: [
      {
        id: 'ref-isfm-transfusao-felina-2021',
        citationText:
          'Taylor S, Spada E, Callan MB, et al. 2021 ISFM Consensus Guidelines on the Collection and Administration of Blood and Blood Products in Cats. J Feline Med Surg. 2021;23(5):410-432. doi:10.1177/1098612X211007071.',
        sourceType: 'Diretriz de consenso ISFM, endossada pela AAFP',
        url: 'https://doi.org/10.1177/1098612X211007071',
        notes:
          'Tipagem e crossmatch, seleção e triagem de doadores, coleta, hemocomponentes, administração, monitorização e reações transfusionais em gatos.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
];
