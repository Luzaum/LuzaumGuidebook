import { endocrinologiaConsensosSeed } from './consensos.endocrinologia.seed';
import { cardiologiaConsensosSeed } from './consensos.cardiologia.seed';
import { nefrologiaUrologiaConsensosSeed } from './consensos.nefrologia-urologia.seed';
import { sepseAhimConsensosSeed } from './consensos.sepse-ahim.seed';

const localClinicalDetailsBySlug: Record<string, Record<string, string>> = {
  'icatcare-dtuif-felina-2025': {
    summary:
      'O consenso iCatCare 2025 organiza a investigação dos sinais do trato urinário inferior em gatos por causa, e não pelo rótulo genérico DTUIF/FLUTD. Primeiro deve-se separar obstrução uretral, uma emergência dolorosa e potencialmente fatal, das apresentações não obstrutivas. Depois, a investigação diferencia cistite idiopática felina (FIC), urolitíase, infecção urinária, alterações anatômicas e causas menos comuns.\n\nA FIC permanece diagnóstico de exclusão: não existe teste único confirmatório. História, ambiente, episódios anteriores, urinálise, cultura quando indicada e imagem orientam a decisão. O manejo é multimodal e inclui analgesia, aumento de ingestão hídrica, dieta coerente com o diagnóstico, redução de estressores e modificação ambiental multimodal (MEMO). Bacteriúria subclínica não deve ser tratada automaticamente e antibiótico não é rotina em gatos jovens com sinais urinários sem cultura compatível.\n\nNa obstrução uretral, o consenso detalha estabilização, correção de hipercalemia, analgesia, sedação, cateterização, fluidoterapia, cuidados pós-desobstrução e prevenção de recorrência. Uretróstomia perineal reduz novas obstruções mecânicas em casos selecionados, mas não trata a doença vesical de base.',
    keyPointsText:
      'DIAGNÓSTICO E CLASSIFICAÇÃO\n- Confirmar produção de urina, tamanho/dor da bexiga e estabilidade cardiovascular logo na triagem.\n- FIC: diagnóstico de exclusão; recorrência em 2-7 dias é comum e tratamento isolado raramente resolve o componente ambiental.\n- Urolitíase: estruvita e oxalato de cálcio são os cálculos mais comuns; composição do cristal não confirma a composição do urólito.\n- ITU é menos frequente em adultos jovens saudáveis. Indicar cultura em gatos idosos, com DRC, diabetes, instrumentação prévia ou urinálise sugestiva.\n- Obstrução uretral: avaliar potássio, ECG, azotemia, hidratação, temperatura e pressão antes/durante a desobstrução.\n\nDOSES CITADAS NO CONSENSO\n- Analgesia/sedação: metadona 0,2 mg/kg IV ou IM; midazolam 0,25 mg/kg IV ou IM em protocolos selecionados.\n- Epidural/lombossacra: bupivacaína 0,22 mg/kg, com ou sem morfina 0,1 mg/kg, conforme experiência e monitorização.\n- Hipercalemia: terbutalina 0,01 mg/kg IV lenta ou IM é uma das medidas temporizadoras citadas; cálcio IV é reservado à estabilização de membrana quando há alteração eletrocardiográfica.\n- Dor neuropática/pós-obstrução: gabapentina 5-10 mg/kg q8-12h ou pregabalina 1-3 mg/kg q8-12h são opções descritas; ajustar ao paciente e à sedação.\n- Atonia vesical com uretra patente: betanecol 1,25-5 mg/gato VO q12h pode ser considerado, nunca diante de obstrução persistente.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Macho com tentativas improdutivas, bexiga grande/dolorosa ou deterioração sistêmica: tratar como obstrução até prova em contrário.\n2. Estabilizar primeiro quando houver hipercalemia, choque, hipotermia ou arritmia; analgesia deve começar cedo.\n3. Desobstruir com técnica atraumática, sistema fechado quando possível e plano de fluidoterapia guiado por hidratação, eletrólitos e diurese pós-obstrutiva.\n4. Após retirar o cateter, confirmar micção espontânea e orientar retorno imediato se houver esforço sem urina.\n5. Nos não obstruídos, usar urinálise, cultura e imagem de forma direcionada; evitar antibiótico empírico sem evidência de ITU.\n6. Para FIC, documentar recursos por gato, caixas sanitárias, conflitos, previsibilidade da rotina, água, dieta e dor/comorbidades.\n\nAs doses são referências do consenso e exigem avaliação de perfusão, rim, eletrólitos, comorbidades, interações e monitorização.',
  },
  'leishmaniose-brasileiro-2020': {
    summary:
      'As diretrizes Brasileish estruturam diagnóstico, estadiamento, tratamento e acompanhamento da leishmaniose visceral canina no contexto brasileiro. A doença pode variar de infecção subclínica a comprometimento sistêmico grave, com dermatopatia, linfadenomegalia, alterações oculares, anemia, hiperglobulinemia, proteinúria e doença renal. O diagnóstico combina epidemiologia, sinais, sorologia e demonstração do parasito ou material genético quando indicada.\n\nO rim é determinante para prognóstico e escolha terapêutica. Creatinina/SDMA, urinálise, RPCU e pressão arterial devem ser avaliadas antes do protocolo e durante o seguimento. O tratamento reduz sinais e carga parasitária, mas não garante eliminação definitiva; controle vetorial e monitorização longitudinal continuam obrigatórios.',
    keyPointsText:
      '- Classificar gravidade clínica e renal antes de tratar.\n- Miltefosina: 2 mg/kg VO q24h por 28 dias, preferencialmente com alimento.\n- Alopurinol: 10 mg/kg VO q12h por 6-12 meses; monitorar cristalúria e urolitíase por xantina.\n- Proteinúria, hipertensão e DRC exigem tratamento paralelo e podem modificar o protocolo.\n- Resposta clínica não equivale a cura parasitológica; recidiva é possível.',
    practicalApplicationText:
      'Solicitar hemograma, bioquímica, proteínas/albumina, creatinina/SDMA, urinálise, RPCU e pressão; confirmar infecção por método apropriado; estadiar; tratar o parasito e as lesões orgânicas; manter repelente/coleira e controle ambiental. Reavaliar clínica, rim, fígado, proteínas, RPCU e urina nas primeiras semanas e depois periodicamente.',
  },
  'iris-drc-2023': {
    summary:
      'O IRIS 2026 classifica a doença renal crônica somente depois de confirmar alteração renal persistente em paciente estável e adequadamente hidratado. O estágio usa creatinina e SDMA; depois o paciente é subestadiado por proteinúria e pressão arterial, porque ambos alteram prognóstico e conduta independentemente da creatinina.\n\nA revisão de 2026 preserva o raciocínio por estágios e atualiza recomendações terapêuticas, incluindo abordagem da anemia. A classificação deve ser revista após estabilização, tratamento antiproteinúrico ou anti-hipertensivo e mudanças clínicas. Sarcopenia pode mascarar gravidade pela creatinina, enquanto SDMA persistentemente discordante pode justificar manejo pelo estágio mais alto.',
    keyPointsText:
      'ESTADIAMENTO IRIS 2026\n- O quadro clínico do app reproduz a matriz oficial com os estágios 1–4 em colunas, cães e gatos em subcolunas e creatinina/SDMA em linhas.\n- Proteinúria por RPCU e pressão arterial são apresentadas separadamente porque constituem subestadiamentos independentes.\n- Não estadiar definitivamente durante desidratação, obstrução, LRA ou alteração rápida da função renal.\n- Reavaliar creatinina, SDMA, RPCU, pressão, fósforo, potássio, bicarbonato, hematócrito, peso e massa muscular.',
    practicalApplicationText:
      'Confirmar DRC e estabilidade; estadiar por creatinina/SDMA; subestadiar por RPCU e pressão; procurar causa tratável e complicações. Nos estágios 2-4, organizar dieta renal, controle de fósforo, hidratação, náusea/apetite, potássio, acidose e massa muscular conforme exames. Nos estágios 3-4, avaliar anemia, uremia, desnutrição e necessidade de suporte intensivo. A revisão de 2026 propõe considerar tratamento da anemia em cães com hematócrito <30% ou persistentemente entre 30-35%, e em gatos <25% ou persistentemente entre 25-28%, sempre após procurar causas corrigíveis e ponderar sinais clínicos.',
  },
  'acvim-cie-caes-2026': {
    summary:
      'A diretriz ACVIM 2026 propõe uma sequência para enteropatia inflamatória crônica canina: confirmar sinais gastrointestinais persistentes, excluir doença extraintestinal e parasitária, avaliar gravidade e perda proteica, realizar teste dietético adequado e reservar antibióticos, endoscopia/biópsia e imunomodulação para indicações específicas.\n\nA classificação deve refletir fenótipo e resposta: enteropatia responsiva à dieta, responsiva a antimicrobiano, responsiva a imunossupressor e não responsiva. Enteropatia com perda proteica (PLE) é um fenótipo de maior risco, com hipoalbuminemia, perda de peso, efusões e risco tromboembólico. Histologia isolada não mede toda a atividade clínica; resposta, albumina, escore corporal/muscular e biomarcadores devem ser acompanhados.\n\nDietoterapia é a primeira intervenção terapêutica em cães estáveis. Imunossupressores só entram após exclusões e teste dietético adequados, salvo gravidade que exija ação mais rápida. Antibióticos não são terapia empírica de rotina, pois evidência e impacto sobre microbiota/resistência devem ser considerados.',
    keyPointsText:
      'CLASSIFICAÇÃO E INDICAÇÕES\n- CIE responsiva à dieta: melhora/remissão com dieta de eliminação, hidrolisada, proteína nova ou formulação altamente digestível.\n- CIE responsiva a antimicrobiano: categoria de exceção, após avaliação crítica; recidiva e resistência limitam uso.\n- CIE responsiva a imunossupressor: falha de dieta/exclusões e melhora com glicocorticoide ou outro imunomodulador.\n- CIE não responsiva: persistência apesar de abordagem adequada; revisar diagnóstico, adesão, dieta, histologia e comorbidades.\n- PLE: priorizar albumina, eletrólitos, estado nutricional, efusões e risco trombótico.\n\nDOSES CITADAS\n- Prednisona/prednisolona: indução 1-2 mg/kg VO q24h; reduzir progressivamente após resposta.\n- Budesonida: 1-5 mg/cão VO q24h conforme porte, em casos selecionados; ainda pode causar supressão adrenal.\n- Ciclosporina: 3-5 mg/kg VO q12-24h por pelo menos 6 semanas; alternativa ou associação em refratários.\n- Tilosina: 25 mg/kg q24h por 7 dias nos estudos citados; cães responsivos podem manter resposta com 5-16 mg/kg q24h.\n- Metronidazol: 10-15 mg/kg q12h por 21 dias nos estudos; não usar empiricamente sem indicação.\n- Rifaximina: 25 mg/kg q12h por 21 dias; evidência e disponibilidade devem ser consideradas.\n- Oxitetraciclina: 10 mg/kg q8h por 4 semanas em estudos antigos/específicos.',
    practicalApplicationText:
      'ALGORITMO\n1. História alimentar/medicamentosa, escore clínico, peso, condição muscular, hemograma, bioquímica, urinálise, coproparasitológico e avaliação pancreática/hepática/endócrina conforme o caso.\n2. Dosar albumina, cobalamina e folato; ultrassom quando houver perda de peso, dor, massa, PLE ou suspeita de doença estrutural.\n3. Cão estável: teste dietético exclusivo e bem controlado antes de imunossupressão.\n4. Biópsia quando o resultado puder mudar conduta, houver PLE, sinais de alarme, suspeita de neoplasia ou falha terapêutica.\n5. Imunomodular apenas após revisar adesão e exclusões; monitorar resposta clínica, albumina, peso/músculo e efeitos adversos.\n6. Em PLE, individualizar tromboprofilaxia, suporte nutricional, cobalamina e manejo de efusões.\n\nAs doses refletem regimes estudados no consenso e não substituem ajuste por gravidade, formulação, interações, função hepática/renal e monitorização.',
  },
}

export const consensosSeed: Array<Record<string, any>> = [
  ...sepseAhimConsensosSeed,
  ...cardiologiaConsensosSeed,
  ...endocrinologiaConsensosSeed,
  ...nefrologiaUrologiaConsensosSeed,
  {
    id: 'con-icatcare-dtuif-felina-2025',
    slug: 'icatcare-dtuif-felina-2025',
    title: 'Doenças do trato urinário inferior em gatos',
    shortTitle: 'DTUIF felina',
    sourceOrganization: 'iCatCare',
    year: 2025,
    species: 'cat',
    category: 'nefrologia-urologia',
    tags: ['DTUIF', 'FIC', 'Obstrução uretral', 'Urolitíase', 'ITU', 'Manejo ambiental'],
    pdfUrl: '/documents/consulta-vet/consensos/icatcare-dtuif-felina-2025.pdf',
    pdfFileName: 'icatcare-dtuif-felina-2025.pdf',
    storagePath: 'documents/consulta-vet/consensos/icatcare-dtuif-felina-2025.pdf',
    summary:
      'Consenso iCatCare 2025 para abordagem de gatos com sinais do trato urinário inferior, com foco em diagnóstico por causa, cistite idiopática felina, urolitíase, ITU, obstrução uretral, manejo ambiental e comunicação com cuidadores.',
    articleSummaryRichText:
      '<p>O consenso iCatCare 2025 recomenda tratar sinais urinários baixos como ponto de partida, não como diagnóstico final. A abordagem central é separar rapidamente obstrução uretral de apresentações não obstrutivas e, em seguida, investigar FIC, urolitíase, ITU e causas menos comuns.</p>',
    keyPointsText:
      '• Obstrução uretral é emergência e deve ser diferenciada logo na triagem.\n• FIC é diagnóstico de exclusão; não há teste único confirmatório.\n• Urolitíase, ITU e neoplasia exigem investigação direcionada.\n• Hidratação, analgesia e manejo ambiental multimodal reduzem recorrência.',
    practicalApplicationText:
      'Confirmar se o gato elimina urina e palpar a bexiga antes de qualquer conduta. Nos não obstruídos, estruturar investigação por causa e plano de prevenção com água, recursos ambientais, dieta conforme diagnóstico e retorno programado.',
    appNotesText:
      'STATUS: VIGENTE — referência principal para sinais do trato urinário inferior felino.\n\nObstrução uretral é emergência. Antimicrobiano não é rotina em gatos jovens com sinais urinários sem cultura compatível; FIC exige analgesia e manejo ambiental multimodal.',
    references: [
      {
        id: 'ref-icatcare-dtuif-2025',
        citationText:
          'iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats. J Feline Med Surg. 2025.',
        sourceType: 'Guideline iCatCare',
        url: 'https://doi.org/10.1177/1098612X241309176',
        notes: 'Abordagem por causa, FIC, urolitíase, ITU e obstrução uretral.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    adminNotesRichText:
      '<p><strong>Alerta editorial:</strong> DTUIF/FLUTD não deve ser usado como diagnóstico definitivo. Macho com bexiga distendida e tentativas improdutivas de urinar deve ser conduzido como emergência por suspeita de obstrução uretral.</p>',
    relatedDiseaseSlugs: ['doencas-trato-urinario-inferior-felino-dtuif'],
    relatedMedicationSlugs: ['amoxicilina-clavulanato', 'sulfametoxazol-trimetoprima', 'pregabalina', 'maropitant'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-1',
    slug: 'leishmaniose-brasileiro-2020',
    title: 'Leishmaniose visceral canina',
    shortTitle: 'Leishmaniose visceral canina',
    sourceOrganization: 'Brasileish',
    year: 2025,
    species: 'dog',
    category: 'infecciosas',
    tags: ['LVC', 'Zoonose', 'Estadiamento'],
    pdfUrl: '/documents/consulta-vet/consensos/brasileish-leishmaniose-canina-2025.pdf',
    pdfFileName: 'brasileish-leishmaniose-canina-2025.pdf',
    storagePath: 'documents/consulta-vet/consensos/brasileish-leishmaniose-canina-2025.pdf',
    summary: 'Diretrizes Brasileish 2025 para diagnóstico, tratamento e prevenção da leishmaniose canina na América Latina, com foco em diagnóstico integrado, avaliação clínica e renal, tratamento, monitorização e controle vetorial.',
    articleSummaryRichText:
      '<p>As diretrizes Brasileish 2025 atualizam a abordagem da leishmaniose canina na América Latina, integrando diagnóstico, avaliação clínica e renal, tratamento, monitorização longitudinal e prevenção vetorial.</p>',
    keyPointsText:
      '• Integrar clínica, testes específicos e avaliação renal.\n• Estadiar por achados clínicos e laboratoriais antes do tratamento.\n• Monitorar proteinúria e pressão arterial.\n• Combinar tratamento, seguimento e controle vetorial.',
    practicalApplicationText:
      'Usar o estágio para organizar exames iniciais, terapia individualizada, monitorização renal e comunicação com o tutor sobre controle do vetor e necessidade de seguimento.',
    adminNotesRichText:
      '<p><strong>Alerta editorial:</strong> Não inicie protocolo sem avaliar rim, proteinúria e pressão arterial. O manejo deve combinar tratamento, acompanhamento longitudinal e controle de vetor; controle clínico não equivale a cura parasitológica definitiva.</p>',
    relatedDiseaseSlugs: ['leishmaniose-visceral-canina'],
    isDemonstrative: true,
    warningLabel: 'Demonstração',
  },
  {
    id: 'con-2',
    slug: 'iris-drc-2023',
    title: 'Doença renal crônica em cães e gatos',
    shortTitle: 'DRC — IRIS 2026',
    sourceOrganization: 'IRIS',
    year: 2026,
    species: 'both',
    category: 'nefrologia-urologia',
    tags: ['DRC', 'Estadiamento', 'SDMA', 'RPCU', 'Pressão arterial', 'Anemia'],
    pdfUrl: 'https://www.iris-kidney.com/iris-guidelines-1',
    pdfFileName: 'iris-drc-2026',
    storagePath: 'external/iris-drc-2026',
    summary: 'Guideline IRIS 2026 para estadiamento e tratamento da doença renal crônica em cães e gatos, com creatinina/SDMA, RPCU, pressão arterial e manejo por estágio.',
    articleSummaryRichText:
      '<p>As diretrizes IRIS 2026 organizam a DRC por creatinina e SDMA, subestadiamento por RPCU e pressão arterial e tratamento progressivo conforme estágio, complicações e qualidade de vida.</p>',
    keyPointsText:
      '• Estadiar somente DRC estável.\n• Usar creatinina e/ou SDMA persistentes.\n• Subestadiar por RPCU e pressão arterial.\n• Revisar a classificação após mudanças clínicas ou tratamento.',
    practicalApplicationText:
      'Confirmar hidratação e estabilidade antes de estadiar; registrar creatinina, SDMA, urinálise, RPCU e pressão arterial para definir acompanhamento e prioridades terapêuticas.',
    appNotesText:
      'STATUS: VIGENTE — referência principal para DRC em cães e gatos.\n\nNão estadiar definitivamente um paciente desidratado, obstruído ou com lesão renal aguda. A terapia deve ser guiada pelo estágio, subestágios e complicações, não apenas pela creatinina.',
    references: [
      {
        id: 'ref-iris-drc-2026',
        citationText:
          'International Renal Interest Society. IRIS Staging of CKD and Treatment Recommendations for CKD in Dogs and Cats. 2026.',
        sourceType: 'Guideline',
        url: 'https://www.iris-kidney.com/iris-guidelines-1',
        notes: 'Estadiamento, subestadiamento e recomendações terapêuticas atualizadas.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    adminNotesRichText:
      '<p><strong>Alerta editorial:</strong> Não classifique DRC de forma definitiva em paciente desidratado, instável ou com injúria renal aguda sem reavaliação. Proteinúria e hipertensão mudam conduta mesmo dentro do mesmo estágio.</p>',
    relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-acvim-cie-caes-2026',
    slug: 'acvim-cie-caes-2026',
    title: 'Enteropatia inflamatória crônica em cães',
    shortTitle: 'Enteropatia inflamatória crônica',
    sourceOrganization: 'ACVIM',
    year: 2026,
    species: 'dog',
    category: 'gastroenterologia',
    tags: ['CIE', 'PLE', 'EII', 'Dietoterapia', 'Imunomodulação', 'Biomarcadores'],
    pdfUrl: '/documents/consulta-vet/consensos/acvim-cie-caes-2026.pdf',
    pdfFileName: 'acvim-cie-caes-2026.pdf',
    storagePath: 'consulta-vet/consensos/acvim-cie-caes-2026.pdf',
    summary: 'Consenso ACVIM 2026 para diagnóstico e tratamento de enteropatia inflamatória crônica em cães, com foco em exclusão de causas extra-GI, dietoterapia, PLE, biópsia e imunomodulação.',
    articleSummaryRichText:
      '<p>A diretriz propõe uma sequência diagnóstica: confirmar enteropatia crônica, excluir causas extraintestinais e parasitárias, conduzir teste dietético adequado e reservar biópsia e imunomodulação para os casos indicados. Em enteropatia com perda proteica, o risco tromboembólico e o suporte nutricional ganham prioridade.</p>',
    adminNotesRichText:
      '<p><strong>Alerta editorial:</strong> Glicocorticoides e outros imunossupressores só devem ser iniciados após exclusão de patologias extra-GI relevantes e após testes dietéticos adequados em cães estáveis. Em PLE, avalie risco tromboembólico e necessidade de suporte intensivo.</p>',
    keyPointsText: '• Excluir doenças extra-GI, parasitas e outras causas antes de imunossuprimir.\n• Dietoterapia é etapa central em cães estáveis.\n• Biópsia é indicada quando o resultado mudar conduta ou houver sinais de alarme.\n• PLE requer avaliação de gravidade, trombose e suporte intensivo.',
    practicalApplicationText: 'Organizar o atendimento por etapas: perfil clínico-laboratorial, exclusões direcionadas, teste dietético, reavaliação e, quando indicado, endoscopia/biopsia e terapia imunomoduladora. Em PLE, priorizar albumina, eletrólitos, estado nutricional e risco trombótico.',
    appNotesText: '',
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
].map((item) => ({
  ...item,
  ...(localClinicalDetailsBySlug[item.slug] || {}),
}));
