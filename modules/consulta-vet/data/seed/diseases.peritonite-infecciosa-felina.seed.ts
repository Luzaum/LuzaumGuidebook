import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Peritonite infecciosa felina (PIF/FIP) — síntese editorial Vetius.
 * Prioridade de fontes: ABCD 2026 > AAFP/EveryCat 2022 > estudos primários (Zuzzi-Krebitz 2024, Pedersen 2019).
 */
export const peritoniteInfecciosaFelinaRecord: DiseaseRecord = {
  id: 'disease-peritonite-infecciosa-felina',
  slug: 'peritonite-infecciosa-felina',
  title: 'Peritonite infecciosa felina (PIF/FIP)',
  synonyms: [
    'PIF',
    'FIP',
    'Feline infectious peritonitis',
    'Peritonite infecciosa do gato',
    'Coronavírus felino',
    'FCoV',
    'FIPV',
  ],
  species: ['cat'],
  category: 'infecciosas',
  tags: [
    'FCoV',
    'GS-441524',
    'Efusão',
    'Rivalta',
    'A:G',
    'RT-qPCR',
    'Uveíte',
    'Neurológica',
    'ABCD',
    'AAFP',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['peritonite-infecciosa-felina'],
  quickSummary:
    'A peritonite infecciosa felina (PIF/FIP) é doença sistêmica grave causada por mutações intrahospedeiro do coronavírus felino (FCoV) que permitem tropismo por macrófagos — a infecção entérica por FCoV é comum e não equivale a PIF (Tasker et al., ABCD 2023). Quando há efusão, a coleta de líquido é o passo diagnóstico de maior rendimento; RT-qPCR, citologia e imunoquímica em efusão superam PCR em fezes ou sangue para confirmar PIF (Thayer et al., 2022). GS-441524 VO é primeira linha: 15 mg/kg q24h na forma efusiva/não neurológica, com taxas de cura frequentemente >90% (Tasker et al., ABCD 2026). Estudo randomizado mostrou 42 dias equivalentes a 84 dias em PIF efusiva estável (Zuzzi-Krebitz et al., 2024); recalcular dose a cada ganho ponderal de 0,5–1 kg (Tasker et al., ABCD 2026).',
  quickDecisionStrip: [
    'Reação em cadeia da polimerase (PCR) para coronavírus felino (FCoV) em fezes ou sangue detecta coronavírus, não confirma peritonite infecciosa felina (PIF) — interpretar com cautela.',
    'Se houver efusão: coletar líquido antes de exames de sangue isolados.',
    'Teste de Rivalta negativo tem alto valor preditivo negativo (VPN), mas positivo tem valor preditivo positivo (VPP) moderado — integrar idade, relação albumina:globulina (A:G) e PCR na efusão (Fischer et al., 2012).',
    'Sensibilidade ≠ valor preditivo positivo (VPP): teste muito específico ainda pode gerar falso positivo se a suspeita pré-teste for baixa (Thayer et al., 2022).',
    'GS-441524 VO 15 mg/kg q24h é primeira linha na peritonite infecciosa felina (PIF) efusiva/não neurológica (Tasker et al., ABCD 2026).',
    'PIF ocular ou neurológica: 20 mg/kg q24h ou 10 mg/kg q12h — barreira hematoencefálica/ocular exige dose maior.',
    '42 dias pode bastar se resposta clínica e laboratorial excelente — não é stop automático em todo caso (Zuzzi-Krebitz et al., 2024).',
    'Prednisolona não é tratamento primário; corticoide adjuvante só em indicações selecionadas (Tasker et al., ABCD 2026).',
    'Pesar a cada 1–2 semanas e recalcular dose — subdosagem por ganho de peso favorece recidiva.',
    'Remdesivir reservado a gatos que não toleram VO; molnupiravir como resgate em falha documentada.',
    'Ultrassom abdominal orienta efusão e lesões amostráveis — linfonodos, fígado, intestino (Müller et al., 2023).',
    'Produtos não regulados variam em concentração real — preferir fontes legalmente prescritas quando disponíveis (Kent et al., 2024).',
  ],
  quickSummaryRich: {
    lead:
      'Peritonite infecciosa felina (PIF) não é “gato positivo para coronavírus”. Pergunte: há efusão ou lesões amostráveis? O índice de suspeita sobe tijolo a tijolo — idade, febre, hipoalbuminemia, hiperglobulinemia, efusão viscosa — e o tratamento antiviral precoce muda o prognóstico de fatal para frequentemente curável (Tasker et al., ABCD 2026).',
    leadHighlights: ['coronavírus', 'efusão', 'tijolo a tijolo', 'GS-441524', 'curável'],
    pillars: [
      {
        title: 'Fenótipos',
        body:
          'Efusiva (úmida): ascite/ derrame pleural/pericárdico, evolução rápida. Não efusiva (seca): granulomas viscerais, neurológica, ocular ou mista — mais insidiosa. Formas mistas são comuns na prática (Thayer et al., 2022).',
        highlights: ['efusiva', 'não efusiva', 'neurológica', 'ocular'],
      },
      {
        title: 'Diagnóstico tijolo a tijolo',
        body:
          'Integrar sinalmento (<2 anos, multicat), exame físico, bioquímica (relação albumina:globulina baixa, hiperbilirrubinemia), efusão (teste de Rivalta, citologia, RT-qPCR) e imagem. Nenhum teste isolado é patognomônico (Thayer et al., 2022; Tasker et al., ABCD 2023).',
        highlights: ['A:G', 'Rivalta', 'RT-qPCR', 'ultrassom'],
      },
      {
        title: 'Tratamento GS',
        body:
          'GS-441524 VO 15 mg/kg q24h ×42–84 dias conforme resposta; ocular/neuro 20 mg/kg q24h ou 10 mg/kg q12h. Pesar e recalcular; monitorar alanina aminotransferase (ALT), hematócrito e sinais neurológicos/oculares (Tasker et al., ABCD 2026; Zuzzi-Krebitz et al., 2024).',
        highlights: ['15 mg/kg', '42 dias', '20 mg/kg', 'recalcular dose'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Suspeita clínica',
          timing: 'Primeira consulta',
          detail:
            'Filhote/jovem, febre, perda de peso, efusão, uveíte ou sinais neurológicos — construir probabilidade pré-teste (Thayer et al., 2022).',
        },
        {
          label: 'Coletar efusão',
          timing: 'Se presente',
          detail:
            'Efusão amarela, viscosa, de alto rendimento para teste de Rivalta, citologia, relação albumina:globulina (A:G), proteína total, α-1-glicoproteína ácida (AGP), amiloide A sérica (SAA) e RT-qPCR para coronavírus felino (FCoV) (Tasker et al., ABCD 2023).',
        },
        {
          label: 'Sangue + imagem',
          timing: 'Sempre',
          detail:
            'Hemograma, bioquímica (relação albumina:globulina, bilirrubinas), leucemia felina (FeLV) e imunodeficiência felina (FIV); ultrassom abdominal e/ou torácico para localizar efusão e lesões amostráveis (Müller et al., 2023).',
        },
        {
          label: 'Confirmar ou tratar empiricamente',
          timing: 'Alta suspeita',
          detail:
            'Imunocitologia (ICC) ou imuno-histoquímica (IHC) positiva, ou RT-qPCR positiva em efusão/tecido confirma; resposta rápida a GS-441524 reforça diagnóstico quando testes são inconclusivos (Thayer et al., 2022; Tasker et al., ABCD 2026).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico',
      steps: [
        {
          label: 'Iniciar GS-441524 VO',
          detail:
            '15 mg/kg q24h (efusiva/não neuro); 20 mg/kg q24h ou 10 mg/kg q12h se ocular/neurológica. Preferir produto de composição conhecida (Tasker et al., ABCD 2026; Taylor et al., 2023).',
        },
        {
          label: 'Suporte e monitoramento',
          detail:
            'Analgesia, nutrição, drenagem terapêutica de efusão sintomática, controle de uveíte com colírios quando indicado; hemograma e bioquímica seriadas (Tasker et al., ABCD 2026).',
        },
        {
          label: 'Recalcular dose e duração',
          detail:
            'Pesar a cada 1–2 semanas; estender para 84 dias se resposta incompleta ao dia 42; neuro/ocular frequentemente exigem curso mais longo (Zuzzi-Krebitz et al., 2024; Tasker et al., ABCD 2026).',
        },
        {
          label: 'Seguimento pós-tratamento',
          detail:
            'Reavaliar clinicamente 4–12 semanas após término; recidiva precoce pode exigir reinício ou dose maior — molnupiravir reservado a falhas documentadas (Tasker et al., ABCD 2026).',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'Peritonite infecciosa felina (PIF) é doença imunomediada desencadeada por variantes do coronavírus felino (FCoV) com tropismo por macrófagos/monócitos, após mutações intrahospedeiro — principalmente no gene S e em ORF3c/7b — que permitem replicação eficiente em células mieloides e disseminação sistêmica (Pedersen, 2014; Tasker et al., ABCD 2023).',
    fcovEntéricoVsPIF: [
      'Coronavírus felino entérico (FECV): infecção intestinal comum, geralmente benigna, eliminação fecal intermitente — não prediz PIF.',
      'Coronavírus com tropismo sistêmico (FIPV): surge por mutação dentro do gato infectado; não é transmitido como “cepa PIF” entre felinos saudáveis (Addie et al., 2009; Tasker et al., ABCD 2023).',
      'Reação em cadeia da polimerase (PCR) positiva em fezes/sangue indica exposição ou viremia, não confirma PIF — diferenciar infecção entérica de doença (Thayer et al., 2022).',
    ],
    serotipos: [
      'FCoV tipo I: predominante em campo; difícil cultivo in vitro; reatividade cruzada em testes variável.',
      'FCoV tipo II: recombinante com coronavírus canino; mais estável em cultivo; ambos podem evoluir para PIF por mutação intrahospedeiro (Pedersen, 2014; Tasker et al., ABCD 2023).',
    ],
    zoonose:
      'FCoV/PIF não são zoonoses — infecção restrita a felídeos; não há transmissão documentada a humanos ou cães como doença natural (Tasker et al., ABCD 2023).',
  },
  epidemiology: {
    idade:
      'Incidência máxima em gatos jovens: 70–80% dos casos <2 anos; possível em qualquer idade, inclusive idosos de ambientes multicat (Thayer et al., 2022; Tasker et al., ABCD 2023).',
    sexo:
      'Machos levemente predispostos em algumas séries; diferença modesta — castração não elimina risco (Pedersen, 2014).',
    racas:
      'Predisposição genética em Abessínio, Bengala, Birmanês, Himalaio, Ragdoll e Devon Rex; SRD também frequentemente afetados (Tasker et al., ABCD 2023).',
    fatoresRisco:
      'Ambientes multicat, alta densidade, FCoV endêmico, stress, primoinfecção recente, filhotes, reinfecções — controle de FCoV reduz incidência de PIF, não apenas de infecção entérica (Addie et al., 2009; Tasker et al., ABCD 2023).',
  },
  pathogenesisTransmission: {
    cascata: [
      'Infecção entérica por FCoV (FECV) — replicação em enterócitos, eliminação fecal, infecção geralmente subclínica (Pedersen, 2014).',
      'Mutações intrahospedeiro no gene S e/ou ORF3c/7b — aquisição de tropismo por monócitos/macrófagos (Tasker et al., ABCD 2023).',
      'Replicação viral intracelular em macrófagos — viremia, disseminação hematogênica a órgãos ricos em tecido retículo-endotelial.',
      'Resposta imune mal adaptada — complexos antígeno-anticorpo, complemento, citocinas pró-inflamatórias; teoria de enhancement dependente de anticorpos (ADE) é plausible mas não exclusiva (Pedersen, 2014; Dewerchin et al., 2005).',
      'Inflamação piogranulomatosa — serosite/efusão (forma efusiva) ou granulomas viscerais, ocular e/ou neurológica (forma não efusiva ou mista) (Kipar et al., 2005).',
    ],
    transmissaoFCoV:
      'Via fecal-oral: ambiente compartilhado, caixas de areia, grooming, mãe-filhote. FCoV resiste dias a semanas no ambiente úmido — higiene e redução de densidade são pilares de controle (Addie et al., 2009; Tasker et al., ABCD 2023).',
    transmissaoPIF:
      'PIF não se transmite diretamente entre gatos — transmissão é de FCoV entérico; apenas uma minoria desenvolve mutação patogênica intrahospedeiro (Pedersen, 2014; Tasker et al., ABCD 2023).',
  },
  pathophysiology: {
    figuraUveite: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/peritonite-infecciosa-felina/fip-uveitis-response-gs441524.jpg',
      alt: 'Uveíte anterior antes e após tratamento com GS-441524 em gato com PIF',
      caption:
        'Resposta ocular à terapia antiviral com GS-441524 em PIF — uveíte anterior antes (esquerda) e após tratamento (direita). Tasker S et al., ABCD 2026. Viruses 18(4):452. Reproduzido sob licença CC BY 4.0.',
      display: 'wide',
    },
    tabelaDosesGS: {
      kind: 'clinicalTable' as const,
      title: 'GS-441524 — doses VO recomendadas (ABCD 2026)',
      headers: ['Apresentação', 'Dose', 'Frequência', 'Observações'],
      rows: [
        ['Efusiva / não neurológica', '15 mg/kg', 'q24h', 'Primeira linha; recalcular com ganho de peso'],
        ['Ocular / neurológica', '20 mg/kg', 'q24h', 'Maior penetração SNC/ocular'],
        ['Ocular / neurológica (alternativa)', '10 mg/kg', 'q12h', 'Equivalente farmacológico a 20 mg/kg q24h'],
        ['Refratária / recidiva precoce', 'Aumentar dose ou estender', 'Individualizar', 'Considerar molnupiravir em falha documentada'],
      ],
    },
    tabelaTesteAmostra: {
      kind: 'clinicalTable' as const,
      title: 'Teste certo para amostra certa — nomenclatura para solicitação laboratorial',
      headers: ['Amostra', 'Exame a solicitar (por extenso)', 'Utilidade', 'Limitação'],
      rows: [
        [
          'Efusão (ascite ou derrame pleural/pericárdico)',
          'Teste de Rivalta (point-of-care) + citologia do líquido de efusão + relação albumina:globulina (A:G) no líquido + proteína total',
          'Alta probabilidade de PIF se Rivalta, citologia inflamatória não séptica e A:G baixa forem concordantes',
          'Não específico — sepse, linfoma e outras exsudatos inflamatórios também podem ser positivos (Fischer et al., 2012)',
        ],
        [
          'Efusão (ascite ou derrame pleural/pericárdico)',
          'RT-qPCR (transcriptase reversa quantitativa) para RNA do coronavírus felino (FCoV) no líquido de efusão',
          'Alta sensibilidade na efusão quando há replicação viral',
          'Detecta RNA viral, mas não distingue sozinho biotipo entérico versus sistêmico (Thayer et al., 2022)',
        ],
        [
          'Efusão ou tecido (biópsia/FNA de linfonodo, baço, fígado)',
          'Imunocoloração (ICC) ou imuno-histoquímica (IHC) para antígeno do coronavírus felino (FCoV) em macrófagos',
          'Padrão-ouro tecidual quando antígeno intracelular em macrófagos é demonstrado',
          'Disponibilidade laboratorial limitada; amostra representativa necessária',
        ],
        [
          'Sangue (soro/plasma)',
          'Relação albumina:globulina (A:G) sérica + α-1-glicoproteína ácida (AGP) + amiloide A sérica (SAA) + bioquímica completa',
          'Suporte à suspeita sistêmica e monitoramento de inflamação',
          'Inespecífico — inflamação crônica de diversas causas altera A:G, AGP e SAA',
        ],
        [
          'Fezes',
          'PCR para coronavírus felino (FCoV) em fezes — detecção de RNA/DNA viral fecal',
          'Triagem de exposição a FCoV entérico e controle ambiental em multicat',
          'Não diagnostica PIF — positivo indica FCoV entérico/exposição, não doença sistêmica (Thayer et al., 2022)',
        ],
        [
          'Sistema nervoso central (SNC)',
          'Ressonância magnética (MRI) encefálica + punção de líquor (LCR) + RT-qPCR para FCoV no LCR',
          'PIF neurológica — combinar achados de imagem, citologia do LCR e detecção viral',
          'Risco de herniação — cautela na punção lombar; contraindicar se sinais de hipertensão intracraniana (Crawford et al., 2017)',
        ],
      ],
    },
    efusao:
      'Efusão rica em proteína (>35 g/L), baixa celularidade (mononuclear), viscosidade elevada por mucina/hialuronato — derrame inflamatório não séptico. A:G no líquido frequentemente <0.4; citologia mostra macrófagos ativados e neutrófilos não degenerados (Hartmann et al., 2003; Fischer et al., 2012).',
    granulomas:
      'Forma não efusiva: nódulos piogranulomatosos em fígado, baço, linfonodos, rins, olhos e sistema nervoso central (SNC) — podem mimetizar neoplasia; ultrassom revela espessamento intestinal assimétrico, linfonodomegalia e lesões focais (Müller et al., 2023).',
    imunidade:
      'Resposta humoral robusta sem clearance viral eficiente; hiperglobulinemia policlonal reflete estimulação imune persistente. Linfopenia com frequência — possível sequestro/depleção (Tasker et al., ABCD 2023).',
    caveatADE:
      'Antibody-dependent enhancement (ADE) explica parcialmente a patogenese em modelos experimentais, mas PIF ocorre também com titulações variadas — não usar nível de anticorpos isolado para diagnosticar ou prognosticar (Pedersen, 2014; Dewerchin et al., 2005).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Febre, anorexia, perda de peso, letargia',
          mechanism: 'Citocinas pró-inflamatórias sistêmicas e inflamação piogranulomatosa multivisceral.',
          clinicalMeaning: 'Sinais inespecíficos — investigar efusão, uveíte e linfonodomegalia em gato jovem febril.',
          priority: 'common',
        },
        {
          finding: 'Abdome globoso ou dificuldade respiratória',
          mechanism: 'Ascite ou derrame pleural/pericárdico por serosite.',
          clinicalMeaning: 'Palpar ballotamento/fluctuação; POCUS ou radiografia antes de punção.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'effusion',
      findings: [
        {
          finding: 'Efusão abdominal ou torácica viscosa, amarela',
          mechanism: 'Exsudação inflamatória rica em proteína e fibrina por lesão vascular e serosite.',
          clinicalMeaning: 'Amostra de efusão é prioridade — Rivalta, citologia, A:G e RT-qPCR (Thayer et al., 2022).',
          priority: 'common',
        },
        {
          finding: 'A:G sérica <0.4 com hiperglobulinemia',
          mechanism: 'Síntese aumentada de globulinas (inflamação crônica) com hipoalbuminemia por perda vascular/serosite.',
          clinicalMeaning: 'Achado de alto valor quando combinado a efusão ou lesões compatíveis — não isoladamente confirmatório.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'ocular',
      findings: [
        {
          finding: 'Uveíte anterior/posterior, hifema, descoloração de íris',
          mechanism: 'Infiltrado piogranulomatoso e vasculite em trato uveal; possível envolvimento retiniano.',
          clinicalMeaning: 'Exame oftalmológico completo; forma ocular exige dose maior de GS-441524 (Tasker et al., ABCD 2026).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Ataxia, convulsões, alteração de consciência, nistagmo',
          mechanism: 'Inflamação meníngea, ventriculite, granulomas periventriculares — barreira hematoencefálica comprometida.',
          clinicalMeaning: 'MRI + LCR quando possível; dose neuro 20 mg/kg q24h ou 10 mg/kg q12h (Crawford et al., 2017; Tasker et al., ABCD 2026).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'hematologic',
      findings: [
        {
          finding: 'Linfopenia, anemia não regenerativa leve',
          mechanism: 'Depleção/sequestro linfocitário e anemia inflamatória crônica.',
          clinicalMeaning: 'Hemograma apoia suspeita; anemia grave exige investigação adicional (FeLV, hemoplasma).',
          priority: 'common',
        },
        {
          finding: 'Neutrofilia ou leucocitose',
          mechanism: 'Inflamação sistêmica e liberação de mediatores.',
          clinicalMeaning: 'Inespecífico — integrar com efusão e bioquímica.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'biochemical',
      findings: [
        {
          finding: 'Hiperglobulinemia, hipoalbuminemia, hiperbilirrubinemia',
          mechanism: 'Resposta imune policlonal, perda proteica e disfunção hepática/hemolítica leve.',
          clinicalMeaning: 'Triade clássica quando presente aumenta probabilidade — excluir hepatopatia primária.',
          priority: 'common',
        },
        {
          finding: 'Aumento de AGP e/ou SAA',
          mechanism: 'Proteínas de fase aguda elevadas na inflamação sistêmica.',
          clinicalMeaning: 'Marcadores de inflamação — úteis em série terapêutica, não confirmatórios isolados (Tasker et al., ABCD 2023).',
          priority: 'systemic',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticReasoning:
      'Peritonite infecciosa felina (PIF) não possui um único teste perfeito. O raciocínio clínico combina três camadas: (1) probabilidade pré-teste — idade, ambiente multicat, efusão, relação albumina:globulina (A:G) baixa, uveíte ou neurológico; (2) desempenho analítico do exame — sensibilidade e especificidade; (3) valor preditivo do resultado naquele paciente — valor preditivo positivo (VPP) e valor preditivo negativo (VPN), que mudam conforme a suspeita inicial (Thayer et al., 2022; Tasker et al., ABCD 2023). Nenhum marcador isolado confirma ou exclui PIF; a diretriz AAFP/EveryCat recomenda construir o diagnóstico “tijolo a tijolo”.',
    conceitosTestes: {
      sensibilidade:
        'Sensibilidade: probabilidade de o teste ser positivo quando o gato realmente tem PIF. Quanto maior a sensibilidade, menor o risco de falso-negativo — útil para triagem quando a suspeita já é alta. Exemplo: Rivalta na efusão apresentou sensibilidade de 91,3% na série de Fischer et al. (2012), ou seja, a maioria dos gatos com PIF terá teste positivo, mas alguns falsos negativos ainda ocorrem.',
      especificidade:
        'Especificidade: probabilidade de o teste ser negativo quando o gato não tem PIF. Quanto maior a especificidade, menor o risco de falso-positivo. Rivalta na mesma série teve especificidade de 65,5% — linfoma, sepse e outras exsudatos inflamatórios também podem ser positivos (Fischer et al., 2012).',
      valorPreditivoPositivo:
        'Valor preditivo positivo (VPP): probabilidade de o gato com resultado positivo realmente ter PIF. Depende fortemente da prevalência local e da suspeita clínica — não é propriedade fixa do kit. No estudo de Fischer et al. (2012), com prevalência de PIF de 34,6% entre gatos com efusão, o VPP do Rivalta foi 58,4%: menos de 6 em cada 10 positivos tinham PIF confirmada. Em gato jovem com efusão e A:G baixa, o VPP sobe; em gato idoso com suspeita baixa, positivos isolados exigem confirmação.',
      valorPreditivoNegativo:
        'Valor preditivo negativo (VPN): probabilidade de o gato com resultado negativo realmente não ter PIF. Rivalta negativo na efusão teve VPN de 93,4% na série de Fischer et al. (2012) — forte para excluir PIF quando a amostra é efusão e o teste foi bem executado, mas não equivale a 100%. Reação em cadeia da polimerase (PCR) negativa em sangue teve VPN de apenas ~47% em Hartmann et al. (2003): metade dos negativos ainda tinham PIF — nunca usar PCR sérica negativa para descartar.',
      probabilidadePreTeste:
        'Probabilidade pré-teste: estimativa clínica antes de qualquer exame — quanto mais “típico” o fenótipo (filhote/jovem, febre, ascite viscosa, hipoalbuminemia, hiperglobulinemia, linfopenia), maior a probabilidade pré-teste e maior o valor preditivo positivo (VPP) de qualquer teste positivo. Thayer et al. (2022) enfatizam que a mesma relação albumina:globulina (A:G) baixa tem valor preditivo distinto em gato de abrigo febril versus gato idoso com neoplasia abdominal — o exame modifica probabilidade, não substitui o contexto.',
    },
    tabelaDesempenho: {
      kind: 'clinicalTable' as const,
      title: 'Desempenho publicado dos principais testes na peritonite infecciosa felina (PIF)',
      headers: ['Exame (por extenso)', 'Amostra', 'Sensibilidade', 'Especificidade', 'Valor preditivo ou interpretação'],
      rows: [
        [
          'Teste de Rivalta (point-of-care)',
          'Efusão',
          '91,3%',
          '65,5%',
          'VPP 58,4% · VPN 93,4% — prevalência PIF 34,6% na população com efusão (Fischer et al., 2012)',
        ],
        [
          'Teste de Rivalta (point-of-care)',
          'Efusão',
          '—',
          '—',
          'VPP 86% · VPN 97% em série com diagnóstico histopatológico (Hartmann et al., 2003)',
        ],
        [
          'Relação albumina:globulina (A:G) baixa',
          'Sangue',
          '~80%',
          '~82%',
          'A:G <0,8 — útil integrado à clínica; isolado não confirma (Thayer et al., 2022)',
        ],
        [
          'Relação albumina:globulina (A:G) baixa',
          'Efusão',
          '86%',
          '74%',
          'A:G <0,9 na efusão — rendimento superior ao sangue quando há líquido (Hartmann et al., 2003)',
        ],
        [
          'Imunofluorescência / imunocitologia (ICC) anti-FCoV',
          'Efusão / tecido',
          'Alta',
          'Alta',
          'VPP até 100% para antígeno em macrófagos; VPN variável se amostra pobre (Hartmann et al., 2003)',
        ],
        [
          'RT-qPCR para RNA do coronavírus felino (FCoV)',
          'Efusão / tecido / líquido cefalorraquidiano (LCR)',
          'Alta',
          'Alta',
          'RNA+ com clínica compatível confirma fortemente; sensibilidade depende de carga viral e primers (Thayer et al., 2022)',
        ],
        [
          'RT-qPCR para RNA do coronavírus felino (FCoV)',
          'Sangue',
          'Baixa–moderada',
          '~88–100%',
          'VPP ~90% · VPN ~47% — negativo não exclui PIF (Hartmann et al., 2003)',
        ],
        [
          'PCR para coronavírus felino (FCoV)',
          'Fezes',
          '—',
          '—',
          'Detecta coronavírus felino entérico/exposição — não diagnostica PIF (Thayer et al., 2022; Tasker et al., ABCD 2023)',
        ],
        [
          'Sorologia — anticorpos anti-coronavírus felino (FCoV)',
          'Sangue',
          'Moderada',
          'Baixa',
          'VPP ~44% · VPN ~90% — anticorpos refletem exposição, não PIF ativa (Hartmann et al., 2003)',
        ],
      ],
    },
    aplicacaoPratica: [
      'Gato <2 anos, febril, ascite viscosa, relação albumina:globulina (A:G) sérica <0,4, teste de Rivalta positivo: probabilidade pré-teste alta → valor preditivo positivo (VPP) do Rivalta sobe acima dos 58% populacionais; iniciar GS-441524 enquanto aguarda RT-qPCR/imunocitologia (ICC) na efusão (Thayer et al., 2022; Tasker et al., ABCD 2026).',
      'Gato idoso com derrame pleural, teste de Rivalta positivo, suspeita de linfoma: especificidade do Rivalta cai — valor preditivo positivo (VPP) pode ser inferior a 50%; citologia, imunofenotipagem e biópsia antes de rotular PIF (Fischer et al., 2012).',
      'Teste de Rivalta negativo em gato jovem ainda altamente suspeito: valor preditivo negativo (VPN) ~93% — PIF menos provável, mas não descartada; prosseguir com RT-qPCR em efusão e imagem se clínica persistir (Fischer et al., 2012).',
      'PCR para coronavírus felino (FCoV) positiva em fezes de gato assintomático de multicat: apenas infecção entérica por FCoV — VPN/VPP para PIF não se aplicam; não iniciar antiviral (Tasker et al., ABCD 2023).',
      'RT-qPCR negativa em sangue, gato com PIF seca/neurológica: valor preditivo negativo (VPN) muito baixo (~47% na série de Hartmann et al., 2003) — amostrar tecido, líquido cefalorraquidiano (LCR) ou efusão se presente; resposta terapêutica a GS reforça diagnóstico (Thayer et al., 2022).',
      'Relação albumina:globulina (A:G) baixa isolada em gato estável sem efusão: sensibilidade ~80% mas valor preditivo positivo (VPP) limitado — aumentar investigação (ultrassom, α-1-glicoproteína ácida, leucemia felina e imunodeficiência felina) antes de conclusão (Thayer et al., 2022).',
    ],
    planoDiagnostico: [
    {
      stepNumber: 1,
      title: 'Construir probabilidade pré-teste',
      purpose: 'Integrar sinalmento, história e exame físico.',
      description:
        'Gato jovem, multicat, febre, perda de peso, efusão, uveíte ou neurológico — aumentar índice de suspeita “tijolo a tijolo” (Thayer et al., 2022).',
      interpretation: 'Probabilidade alta orienta coleta de efusão/tecido antes de exames de baixo rendimento.',
      limitations: 'PIF em gatos idosos ou sem efusão reduz sensibilidade de triagem clínica isolada.',
    },
    {
      stepNumber: 2,
      title: 'Coleta e análise de efusão',
      purpose: 'Passo de maior rendimento quando efusão presente.',
      description:
        'Ultrassom para localizar; aspirar ascite/derrame pleural; avaliar cor, viscosidade, proteína total, A:G, citologia (Hartmann et al., 2003; Müller et al., 2023).',
      interpretation: 'Efusão exsudativa rica em proteína com citologia inflamatória não séptica aumenta fortemente suspeita.',
      limitations: 'Sepse, linfoma e quilotorax podem mimetizar — citologia e PCR auxiliam diferenciação.',
      isGoldStandard: false,
    },
    {
      stepNumber: 3,
      title: 'Teste de Rivalta (point-of-care)',
      purpose: 'Triagem rápida de exsudato inflamatório proteico.',
      description:
        'Gota de efusão em solução ácida — retenção de forma indica positivo (Fischer et al., 2012).',
      interpretation: 'Negativo: VPN ~93% na efusão (Fischer et al., 2012) — PIF improvável, mas confirmar se clínica persistir. Positivo: VPP ~58% na população geral com efusão — aumenta probabilidade, não confirma.',
      limitations: 'Subjetivo; positivo em peritonite séptica e algumas neoplasias (Fischer et al., 2012).',
    },
    {
      stepNumber: 4,
      title: 'Relação albumina:globulina (A:G) sérica',
      purpose: 'Marcador bioquímico de inflamação crônica com perda proteica.',
      description: 'A:G <0.4 com hiperglobulinemia é achado frequente na PIF (Tasker et al., ABCD 2023).',
      interpretation: 'Concordante com efusão/achados clínicos aumenta probabilidade — valor preditivo positivo moderado.',
      limitations: 'Inflamação crônica de outras causas (FIP-like, FeLV) pode reduzir A:G.',
    },
    {
      stepNumber: 5,
      title: 'Proteínas de fase aguda (AGP, SAA)',
      purpose: 'Documentar inflamação sistêmica e monitorar resposta terapêutica.',
      description: 'α-1-glicoproteína ácida e amiloide A sérica frequentemente elevadas (Tasker et al., ABCD 2023).',
      interpretation: 'Queda com tratamento antiviral eficaz; persistência sugere resposta incompleta.',
      limitations: 'Não específicas para PIF.',
    },
    {
      stepNumber: 6,
      title: 'RT-qPCR para RNA FCoV',
      purpose: 'Detectar replicação viral na amostra adequada.',
      description:
        'Efusão, tecido (FNA de linfonodo, baço) ou LCR — maior sensibilidade que sangue/fezes (Thayer et al., 2022; Tasker et al., ABCD 2023).',
      interpretation: 'RNA positivo em efusão/tecido com contexto clínico compatível confirma fortemente PIF.',
      limitations: 'RNA negativo não exclui PIF seca; PCR em fezes não diagnostica PIF.',
    },
    {
      stepNumber: 7,
      title: 'Imunocoloração (ICC/IHC) ou imunofluorescência',
      purpose: 'Demonstrar antígeno viral em macrófagos — padrão-ouro tecidual.',
      description: 'Biópsia ou citologia de efusão/tecido com anticorpo anti-FCoV em laboratório de referência.',
      interpretation: 'Antígeno intracelular em macrófagos é altamente específico em contexto clínico adequado.',
      limitations: 'Disponibilidade limitada; amostra representativa necessária.',
      isGoldStandard: true,
    },
    {
      stepNumber: 8,
      title: 'Imagem — ultrassom e MRI',
      purpose: 'Localizar efusão, linfonodos e lesões para amostragem.',
      description:
        'US abdominal: efusão, linfonodomegalia, fígado hipoecogênico, espessamento intestinal (Müller et al., 2023). MRI: PIF neurológica — realce meníngeo, ventriculomegalia (Crawford et al., 2017).',
      interpretation: 'Achados múltiplos aumentam suspeita; guiam punção/biópsia.',
      limitations: 'Não patognomônicos — linfoma e outras inflamações podem mimetizar.',
    },
    {
      stepNumber: 9,
      title: 'Resposta terapêutica a GS-441524',
      purpose: 'Reforço diagnóstico em casos de alta suspeita com testes inconclusivos.',
      description:
        'Melhora clínica e laboratorial em 7–14 dias com antiviral adequado sugere fortemente PIF (Pedersen et al., 2019; Tasker et al., ABCD 2026).',
      interpretation: 'Resposta rápida apoia diagnóstico; ausência de resposta exige reavaliar diagnóstico, dose e qualidade do produto.',
      limitations: 'Não substitui diagnóstico definitivo quando eutanásia ou investigação legal exigem confirmação.',
    },
    ],
  },
  treatment: {
    principios: [
      'PIF tratável e frequentemente curável com antiviral nucleosídeo — GS-441524 VO é primeira linha (Tasker et al., ABCD 2026).',
      'Prednisolona não substitui antiviral; imunossupressão isolada piora desfecho. Suporte nutricional, analgesia e manejo de efusão sintomática são adjuntos essenciais.',
    ],
    gs441524: {
      kind: 'clinicalTable' as const,
      title: 'GS-441524 — esquema terapêutico',
      headers: ['Indicação', 'Dose VO', 'Duração', 'Monitoramento'],
      rows: [
        ['PIF efusiva / não neurológica', '15 mg/kg q24h', '42 dias se resposta excelente; 84 se incompleta (Zuzzi-Krebitz et al., 2024)', 'Peso q1–2 sem; ALT; hematócrito'],
        ['PIF ocular / neurológica', '20 mg/kg q24h ou 10 mg/kg q12h', 'Frequentemente 84 dias; estender se sinais residuais', 'Exame ocular/neurológico seriado'],
        ['Recidiva precoce', 'Reiniciar ou aumentar dose', 'Individualizar; investigar subdosagem/produto', 'PCR/contagem viral se disponível'],
      ],
    },
    duracao42vs84:
      'RCT em PIF efusiva: 42 dias de GS-441524 15 mg/kg q24h equivalente a 84 dias quando gato estável ao dia 42 — remissão mantida até 168 dias (Zuzzi-Krebitz et al., 2024). Neuro/ocular e resposta incompleta: preferir 84 dias ou estender (Tasker et al., ABCD 2026).',
    ocularNeurologica: [
      'Barreira hematoencefálica e blood-aqueous barrier exigem doses maiores — 20 mg/kg q24h ou 10 mg/kg q12h (Tasker et al., ABCD 2026).',
      'Colírios anti-inflamatórios/cicloplégicos para uveíte conforme gravidade; avaliação oftalmológica seriada.',
      'MRI e LCR auxiliam estadiamento neurológico; evitar punção se sinais de hipertensão intracraniana (Crawford et al., 2017).',
    ],
    remdesivir:
      'Reservado a gatos gravemente doentes que não toleram VO — loading 5 mg/kg IV, depois 5 mg/kg q24h IV; transicionar para GS-441524 VO assim que possível (Taylor et al., 2023; Tasker et al., ABCD 2026).',
    molnupiravir:
      'Resgate em falha documentada a GS-441524 — evidência limitada; usar apenas quando antiviral primário falhou e alternativas legais esgotadas (Tasker et al., ABCD 2026).',
    corticoide:
      'Adjuvante apenas — prednisolona pode ser considerada para uveíte grave ou edema SNC enquanto antiviral faz efeito; não monoterapia (Tasker et al., ABCD 2026). Evitar corticoide prolongado sem antiviral.',
    suporte: [
      'Nutrição enteral/parenteral se anorexia; analgesia (buprenorfina, gabapentina em neuro).',
      'Toracocentese/abdominocentese terapêutica se distúrbio ventilatório ou desconforto — evitar drenagem profilática excessiva.',
      'Suplementação vitamina B12 e controle de anemia sintomática quando indicado.',
    ],
    monitoramento: [
      'Peso q1–2 semanas — recalcular dose a cada 0,5–1 kg ganho (Tasker et al., ABCD 2026).',
      'Hemograma e bioquímica (ALT, bilirrubinas, A:G) a cada 2–4 semanas durante tratamento.',
      'Reavaliação clínica 4, 8 e 12 semanas pós-tratamento — recidiva geralmente nas primeiras 12 semanas.',
      'Preferir produtos legalmente prescritos com concentração verificada — produtos não regulados variam em teor e pH (Kent et al., 2024).',
    ],
  },
  prevention: {
    controleFCoV: [
      'Reduzir densidade felina — ideal ≤4–5 gatos por grupo com recursos duplicados (Addie et al., 2009; Tasker et al., ABCD 2023).',
      'Caixas de areia individuais ou múltiplas, limpeza diária, desinfecção com detergentes — FCoV resiste no ambiente úmido.',
      'Testar e separar filhotes de mães eliminadoras quando possível; evitar introdução de gatos FCoV+ em colônias livres.',
    ],
    vacina: [
      'Vacina intranasal contra FCoV (bivalente) disponível em alguns países — uso restrito a ambientes FCoV endêmicos com histórico de PIF (Tasker et al., ABCD 2023).',
      'Não indicada em gatos já FCoV positivos ou em gatos isolados indoor sem exposição — eficácia e necessidade variam regionalmente.',
    ],
    biossegurancaProdutos: [
      'Tratar com antivirais de composição conhecida e prescrição veterinária — produtos “black market” têm concentração imprevisível (Kent et al., 2024; Taylor et al., 2023).',
      'Orientar tutores sobre risco de subdosagem, recidiva e resistência viral com produtos não caracterizados.',
      'Higiene de mãos e superfícies após manipular gatos com PIF — FCoV entérico, não PIF, é o agente ambiental relevante para outros felinos.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['leucemia-viral-felina', 'granuloma-eosinofilico-felino', 'imunodeficiencia-felina-fiv'],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-pif-abcd-2026',
      citationText:
        'Tasker S, Spiri AM, Hartmann K, et al. Update on Treatment of Feline Infectious Peritonitis: European Advisory Board on Cat Diseases (ABCD) Guidelines. Viruses. 2026;18(4):452.',
      sourceType: 'Guideline / consenso',
      url: 'https://doi.org/10.3390/v18040452',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-pif-abcd-2023',
      citationText:
        'Tasker S, Hosie MJ, Hartmann K, et al. Feline Infectious Peritonitis: European Advisory Board on Cat Diseases Guidelines. Viruses. 2023;15(9):1847.',
      sourceType: 'Guideline / consenso',
      url: 'https://doi.org/10.3390/v15091847',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-pif-thayer-aafp-2022',
      citationText:
        'Thayer V, Gogolski S, Felten S, et al. 2022 AAFP/EveryCat Feline Infectious Peritonitis Diagnosis Guidelines. J Feline Med Surg. 2022;24(9):905–933.',
      sourceType: 'Guideline',
      url: 'https://doi.org/10.1177/1098612X221118761',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-pif-taylor-2023',
      citationText:
        'Taylor SS, Spiri AM, Dillon AR, et al. Retrospective study and outcome of 307 cats with feline infectious peritonitis treated with legally sourced veterinary compounded preparations of remdesivir and GS-441524 (2020–2022). J Feline Med Surg. 2023;25(12):1098612X231194460.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1177/1098612X231194460',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-pif-zuzzi-krebitz-2024',
      citationText:
        'Zuzzi-Krebitz AM, Buchta K, Bergmann M, et al. Short Treatment of 42 Days with Oral GS-441524 Results in Equal Efficacy as the Recommended 84-Day Treatment in Cats Suffering from Feline Infectious Peritonitis with Effusion—A Prospective Randomized Controlled Study. Viruses. 2024;16(7):1144.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://doi.org/10.3390/v16071144',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-pif-fischer-rivalta-2012',
      citationText:
        'Fischer Y, Sauter-Louis C, Hartmann K. Diagnostic accuracy of the Rivalta test for feline infectious peritonitis. Vet Clin Pathol. 2012;41(4):558–567.',
      sourceType: 'Estudo diagnóstico',
      url: 'https://doi.org/10.1111/j.1939-165X.2012.00464.x',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-pif-pedersen-gs-2019',
      citationText:
        'Pedersen NC, Perron M, Bannasch M, et al. Efficacy and safety of the nucleoside analog GS-441524 for treatment of cats with naturally occurring feline infectious peritonitis. J Feline Med Surg. 2019;21(4):271–281.',
      sourceType: 'Ensaio clínico',
      url: 'https://doi.org/10.1177/1098612X19825701',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-pif-kent-product-2024',
      citationText:
        'Kent M, Redding L, Alwood AJ, et al. Unlicensed antiviral products used for the at-home treatment of feline infectious peritonitis contain GS-441524 at significantly different amounts than advertised. J Am Vet Med Assoc. 2024;262(4):489–497.',
      sourceType: 'Estudo analítico',
      url: 'https://doi.org/10.2460/javma.23.08.0466',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-pif-crawford-mri-2017',
      citationText:
        'Crawford AH, Stoll AL, Sanchez-Masian D, et al. Clinicopathologic Features and Magnetic Resonance Imaging Findings in 24 Cats With Histopathologically Confirmed Neurologic Feline Infectious Peritonitis. J Vet Intern Med. 2017;31(5):1477–1486.',
      sourceType: 'Série clínica',
      url: 'https://doi.org/10.1111/jvim.14791',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-pif-muller-ultrasound-2023',
      citationText:
        'Müller TR, Penninck DG, Webster CRL, Conrado FO. Abdominal ultrasonographic findings of cats with feline infectious peritonitis: an update. J Feline Med Surg. 2023;25(12):1098612X231216000.',
      sourceType: 'Série clínica',
      url: 'https://doi.org/10.1177/1098612X231216000',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-pif-hartmann-effusion-2003',
      citationText:
        'Hartmann K, Binder C, Hirschberger J, et al. Comparison of different tests to diagnose feline infectious peritonitis. J Vet Intern Med. 2003;17(6):781–790.',
      sourceType: 'Estudo diagnóstico',
      url: 'https://doi.org/10.1111/j.1939-1676.2003.tb02581.x',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
