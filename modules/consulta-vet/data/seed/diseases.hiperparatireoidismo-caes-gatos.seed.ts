import type { DiseaseRecord } from '../../types/disease';

const ASSET_BASE = '/assets/consulta-vet/diseases/hiperparatireoidismo-caes-gatos';

/**
 * Hiperparatireoidismo em cães e gatos — síntese editorial ConsultaVET.
 * Regra central: PTH autônomo (PHPT) vs compensatório (CKD-MBD, NSHP).
 * Prioridade: IRIS 2026 > Nelson & Couto 2020 > BSAVA Nephrology/Formulary >
 * DiBartola > Travail 2025 > Cordella 2022 > literatura felina/canina PHPT.
 */
export const hiperparatireoidismoCaesGatosRecord: DiseaseRecord = {
  id: 'disease-hiperparatireoidismo-caes-gatos',
  slug: 'hiperparatireoidismo-caes-gatos',
  title: 'Hiperparatireoidismo em cães e gatos',
  subtitle:
    'Hiperparatireoidismo primário, secundário renal/CKD-MBD e secundário nutricional — fisiopatologia, diagnóstico diferencial e manejo',
  synonyms: [
    'PHPT',
    'Hiperparatireoidismo primário',
    'Hiperparatireoidismo secundário renal',
    'Hiperparatireoidismo secundário nutricional',
    'NSHP',
    'CKD-MBD',
    'Hyperparathyroidism',
    'Osteodistrofia renal',
    'Rubber jaw',
    'Mineral and bone disorder',
    'HPT secundário renal',
    'HPT nutricional',
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  tags: [
    'PTH',
    'iCa',
    'CKD-MBD',
    'PHPT',
    'NSHP',
    'FGF23',
    'IRIS',
    'Paratireoidectomia',
    'Hipercalcemia',
    'Hipocalcemia',
    'Osteodistrofia',
    'Quelante de fósforo',
    'Calcitriol',
    'Pamidronato',
    'Rubber jaw',
  ],
  vinReferencePending: true,
  quickSummary:
    'Hiperparatireoidismo é secreção persistentemente aumentada ou inadequadamente não suprimida de paratormônio (PTH) — o significado clínico depende inteiramente do mecanismo. A pergunta inicial não é “PTH alto?”, e sim: **PTH autônomo ou compensatório?** No **PHPT**, tecido paratireoidiano secreta PTH apesar de cálcio ionizado (iCa) elevado — padrão clássico: **iCa ↑ + PTH inadequadamente normal ou ↑ + fósforo baixo/baixo-normal**; tratamento definitivo: paratireoidectomia. No **CKD-MBD** (secundário renal), PTH ↑ compensa retenção de fósforo, queda de calcitriol e elevação precoce de FGF23 — **fósforo normal não exclui** doença mineral precoce; tratamento: dieta renal e quelantes conforme **IRIS 2026**. No **NSHP** (secundário nutricional), dieta Ca:P inadequada estimula PTH para preservar iCa às custas do esqueleto — especialmente filhotes/gatinhos; tratamento: **corrigir dieta completa**, não apenas suplementar cálcio. **Nunca interpretar PTH isolado** — sempre correlacionar com iCa (não cálcio corrigido por fórmula). Em hipercalcêmico, PTH “dentro da referência” pode ser fisiologicamente anormal por não estar suprimido. (6)(7)(8)(9)(10)',
  quickDecisionStrip: [
    'Primeira pergunta: PTH autônomo (PHPT) ou compensatório (CKD-MBD / NSHP)? — o tratamento é oposto. (6)(7)',
    'iCa confirma hipercalcemia biologicamente relevante — **não usar cálcio corrigido por albumina** para decidir PHPT. (6)(8)(11)',
    'Hipercalcêmico com PTH “normal”: ainda pode ser PHPT — valor deveria estar suprimido; “normal” ≠ excluído. (6)(20)',
    'CKD + PTH ↑ = CKD-MBD esperado — **não rotular tumor paratireoidiano** sem iCa elevado e padrão autônomo. (8)(9)(10)',
    'Fósforo sérico normal **não exclui** CKD-MBD precoce — FGF23 e PTH podem subir antes da hiperfosfatemia. (8)(9)(10)',
    'PHPT canino: ~71% podem ter exame físico normal — hipercalcemia incidental é apresentação típica. (6)(20)',
    'PHPT felino: massa cervical palpável é relativamente comum (~38–57%) — palpar tireoide/paratireoides em gato idoso hipercalcêmico. (14)(20)',
    'Furosemida na hipercalcemia: **somente após euvolemia** — 2–4 mg/kg IV/SC/VO q8–24h titulado; nunca em desidratado. (7)(11)',
    'Pamidronato reserva para hipercalcemia grave/refratária — cão 0,65–2 mg/kg IV em 2–4 h; gato 1–2 mg/kg IV em ~4 h; nefrotoxicidade. (7)(11)',
    'Não iniciar prednisona/dexametasona às cegas antes de investigar lymphoma quando é diferencial real — prejudica citologia. (6)(7)',
    'Ultrassom cervical localiza massa (~90–95% em mãos experientes), mas **não substitui histopatologia** adenoma vs carcinoma. (6)(15)',
    'Principal risco pós-paratireoidectomia: **hipocalcemia** — Ca normal na manhã seguinte não elimina queda tardia (3–6 dias). (6)(12)',
    'PTH pré-operatório ≥75 pg/mL: sensibilidade ~96,6% para hipocalcemia pós-op, mas especificidade baixa (~42%) — não regra absoluta. (12)',
    'Calcitriol **não é rotina** no CKD-MBD moderno — especialmente gatos; IRIS 2026 prioriza fósforo/dieta/quelante. (8)(10)',
    'NSHP: Ca sérico pode estar normal enquanto esqueleto está osteopênico — PTH preserva iCa removendo Ca do osso. (7)(17)(18)',
    'NSHP: corrigir **dieta completa balanceada** — suplementar cálcio isolado em receita caseira mal formulada não resolve. (17)(21)',
  ],
  quickSummaryRich: {
    lead:
      'Hiperparatireoidismo não é uma única síndrome bioquímica: PTH autônomo (PHPT) exige paratireoidectomia; PTH compensatório na DRC integra CKD-MBD e responde a controle de fósforo; PTH nutricional reflete dieta Ca:P inadequada e exige reformulação alimentar completa. A armadilha mais cara é interpretar PTH isolado ou usar cálcio corrigido por albumina — sempre medir iCa e classificar o mecanismo antes de tratar. (6)(8)(9)(10)(17)',
    leadHighlights: ['PTH autônomo vs compensatório', 'iCa', 'CKD-MBD', 'NSHP', 'IRIS 2026'],
    pillars: [
      {
        title: 'PHPT — secreção autônoma',
        body:
          'Tecido paratireoidiano secreta PTH apesar de iCa elevado. Padrão: iCa ↑ + PTH inadequadamente normal/↑ + fósforo baixo/baixo-normal. Cão: frequentemente incidental (~71% exame normal). Gato: mais sintomático; massa cervical palpável em ~38–57%. Tratamento definitivo: paratireoidectomia. (6)(14)(20)',
        highlights: ['iCa ↑', 'PTH não suprimido', 'paratireoidectomia'],
      },
      {
        title: 'CKD-MBD — compensação renal',
        body:
          'PTH ↑ responde a retenção de fósforo, FGF23 ↑ precoce e calcitriol ↓. Fósforo sérico normal não exclui doença mineral inicial. Tratamento moderno: dieta renal + quelante conforme metas IRIS 2026; FGF23 guia gatos IRIS 2. Calcitriol não é primeira linha atual. (8)(9)(10)',
        highlights: ['FGF23', 'fósforo', 'IRIS 2026', 'quelante'],
      },
      {
        title: 'NSHP — dieta desequilibrada',
        body:
          'Ca insuficiente ou relação Ca:P inadequada (dietas “só carne”, complementares, caseiras mal formuladas) estimula PTH para preservar iCa às custas do osso. Filhotes/gatinhos <6 meses em crescimento são os mais vulneráveis. Ca sérico pode parecer normal com osteopenia grave. Tratamento: dieta completa balanceada — não apenas “dar cálcio”. (7)(17)(18)(21)',
        highlights: ['Ca:P', 'osteopenia', 'dieta completa', 'filhotes'],
      },
      {
        title: 'Interpretação relacional PTH × iCa',
        body:
          'Em hipercalcêmico, PTH deveria estar suprimido — valor “normal” pode ser fisiologicamente anormal. Matriz: iCa ↑ + PTH ↑/normal-alto → PHPT; iCa normal/↓ + CKD → CKD-MBD; iCa normal-baixo/↓ + dieta inadequada → NSHP. Nunca usar fórmula de cálcio corrigido para decidir PHPT. (6)(8)(20)',
        highlights: ['matriz iCa×PTH', 'não corrigir Ca', 'contexto'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico — classificar o mecanismo',
      steps: [
        {
          label: 'Confirmar iCa e contexto',
          timing: 'Primeira consulta',
          detail:
            'Medir cálcio ionizado (manuseio cuidadoso da amostra — exposição ao ar altera resultado). Correlacionar com cálcio total, albumina, fósforo, creatinina/SDMA. **Não usar cálcio corrigido por fórmula** para decisão de PHPT. (6)(8)(11)',
          reassess: 'iCa limítrofe → repetir com técnica padronizada antes de encaminhar cirurgia.',
        },
        {
          label: 'Dosar PTH intacto',
          timing: 'Com iCa disponível',
          detail:
            'PTH deve ser interpretado **sempre** junto ao iCa. Hipercalcêmico com PTH não suprimido → PHPT provável. Normocalcêmico com CKD e PTH ↑ → CKD-MBD. Normocalcêmico/hipocalcêmico jovem com dieta suspeita → NSHP. (6)(8)(20)',
        },
        {
          label: 'História dirigida',
          timing: 'Paralelo ao laboratório',
          detail:
            'Suplementos, vitamina D, rodenticidas, calcipotrieno tópico, dieta caseira/raw/all-meat, medicamentos, perda ponderal, PU/PD, linfonodomegalia, doença renal prévia. Em jovem: tipo de alimento (completo vs complementar). (6)(7)(17)',
        },
        {
          label: 'Exame físico — espécie-específico',
          timing: 'Antes de imagem',
          detail:
            'Cão hipercalcêmico: linfonodos, cavidade oral, sacos anais, esqueleto, cervical. Gato: palpação tireoidiana/paratireoidiana cuidadosa (massa cervical ~38–57% em PHPT felino). (6)(14)(20)',
        },
        {
          label: 'PTHrP e diferenciais de hipercalcemia',
          timing: 'Quando iCa ↑ e PTH suprimido ou zona cinzenta',
          detail:
            'PTHrP útil para diferenciar PHPT de hipercalcemia humoral da malignidade (lymphoma, adenocarcinoma de saco anal em cães). Gato: incluir hipercalcemia idiopática felina, SCC, lymphoma. Limitação: PTHrP negativo não exclui toda neoplasia hipercalcêmicamente ativa. (6)(7)(20)',
        },
        {
          label: 'Imagem cervical — PHPT',
          timing: 'Após padrão bioquímico compatível',
          detail:
            'US cervical: sensibilidade ~90–95% em mãos experientes para localizar nódulo; concordância imperfeita para doença multiglandular (~66% número, ~72% lateralidade). CT se US negativo/inconclusivo ou ectopia suspeita. US localiza; histopatologia diferencia adenoma vs carcinoma. (6)(13)(15)',
        },
        {
          label: 'Avaliação CKD-MBD ou NSHP',
          timing: 'Quando iCa normal/↓',
          detail:
            'CKD: estadiar IRIS, medir fósforo, considerar FGF23 (gatos IRIS 2). NSHP: radiografias (osteopenia generalizada, fraturas patológicas), ALP, história dietética detalhada. (8)(9)(10)(17)(18)',
          reassess: 'FGF23 >400 pg/mL em gato IRIS 2 com P na meta → considerar restrição dietética de fósforo. (10)',
        },
        {
          label: 'Integrar e planejar tratamento',
          timing: 'Após classificação',
          detail:
            'PHPT → paratireoidectomia (± estabilização hipercalcemia). CKD-MBD → dieta + quelante IRIS. NSHP → dieta completa + repouso ± Ca IV se hipocalcemia sintomática. Documentar mecanismo no prontuário. (6)(9)(10)(17)',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico por mecanismo',
      steps: [
        {
          label: 'PHPT — paratireoidectomia',
          detail:
            'Tratamento definitivo de escolha em cães e gatos quando PHPT confirmado. Ausência de sinais clínicos não exclui indicação — hipercalcemia crônica lesiona rim e trato urinário. Técnicas minimamente invasivas podem ser efetivas quando lesão precisamente localizada. (6)(13)(14)',
          dose: 'Excisão da glândula acometida; multiglandular → reavaliar diagnóstico (secundário?).',
          reassess: 'Se 4 glândulas aumentadas → excluir hiperparatireoidismo secundário antes de ressecção total.',
        },
        {
          label: 'Hipercalcemia grave — estabilização',
          detail:
            '1) Reidratar com cristaloide isotônico (NaCl 0,9% tradicional). 2) Furosemida **somente após euvolemia**: 2–4 mg/kg IV/SC/VO q8–24h. 3) Pamidronato se refratária: cão 0,65–2 mg/kg IV 2–4 h; gato 1–2 mg/kg IV ~4 h. 4) Calcitonina salmon 4–6 UI/kg SC q8–12h — efeito temporário. (7)(11)',
          duration: 'Adjuvantes até terapia definitiva — não substituem paratireoidectomia.',
        },
        {
          label: 'Pós-paratireoidectomia — hipocalcemia',
          detail:
            'Monitorar iCa q12–24h nos primeiros dias; queda tardia possível em 3–6 dias. PTH pré-op ≥75 pg/mL: sensibilidade 96,6% para hipocalcemia pós-op, especificidade 42,3% apenas. Hipocalcemia sintomática: gluconato Ca 10% 0,5–1,5 mL/kg IV lento 20–30 min com ECG. (11)(12)',
          reassess: 'Ca normal na manhã pós-op não elimina risco — orientar retorno imediato se tremores/convulsão.',
        },
        {
          label: 'CKD-MBD — fósforo IRIS 2026',
          detail:
            'Dieta renal restrita em fósforo como primeira intervenção. Se P acima da meta: quelante 30–60 mg/kg/dia dividido nas refeições, titulado. Gato IRIS 2: FGF23 >400 → restrição dietética; >700 → intensificar; <500 → controle excelente. (9)(10)',
          dose: 'Quelante inicial IRIS: 30–60 mg/kg/dia VO com refeições (agente/produto específico importa).',
          duration: 'Ca + P q4–6 semanas até estável → depois ~q12 semanas.',
        },
        {
          label: 'NSHP — correção dietética',
          detail:
            'Alimento comercial **completo** para espécie e estágio de vida, ou dieta caseira formulada por nutricionista. Repouso rigoroso se osteopenia/fraturas. Ca elementar oral 25–50 mg/kg/dia (gato) apenas temporário se necessário. Melhora laboratorial em semanas; mineralização radiográfica 4–8 semanas. (17)(21)',
          reassess: 'Radiografias ~4–8 semanas; deformidades estruturais podem persistir.',
        },
        {
          label: 'Monitorização longitudinal',
          detail:
            'PHPT pós-op: iCa seriado, Mg, função renal. CKD-MBD: P/Ca/FGF23 conforme IRIS. NSHP: clínica 1–2 semanas, Ca/P/PTH, imagem 4–8 semanas. Recorrência PHPT canino até ~8%; Keeshond: maior risco multiglandular. (6)(9)(10)(12)',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable' as const,
      title: 'Decisão clínica rápida — 30 segundos',
      headers: ['Situação', 'Conduta', 'Armadilha'],
      rows: [
        ['iCa ↑ + PTH não suprimido', 'PHPT → US cervical → paratireoidectomia', 'PTH “normal” ≠ excluído em hipercalcêmico'],
        ['CKD + PTH ↑ + iCa normal/↓', 'CKD-MBD → dieta + quelante IRIS', 'Rotular tumor paratireoidiano'],
        ['Filhote + dieta all-meat + osteopenia', 'NSHP → dieta completa balanceada', 'Só suplementar cálcio'],
        ['Hipercalcemia incidental cão idoso', 'Confirmar iCa + PTH → PHPT provável', 'Assumir malignidade sem PTH'],
        ['Gato idoso hipercalcêmico + massa cervical', 'PHPT felino → US + cirurgia', 'Confundir só com tireoide'],
        ['P normal + CKD + PTH/FGF23 ↑', 'CKD-MBD precoce → controle mineral', '“P normal exclui HPT renal”'],
        ['Hipercalcemia + PTH suprimido', 'Malignidade / vit D / granulomatosa', 'Operar paratireoide sem evidência'],
        ['Desidratado hipercalcêmico', 'Reidratar primeiro', 'Furosemida antes de volume'],
        ['Suspeita lymphoma + hipercalcemia', 'Investigar antes de corticoide', 'Prednisona às cegas'],
        ['Pós-paratireoidectomia Ca normal D1', 'Continuar monitorar iCa seriado', 'Alta sem plano tardio (D3–6)'],
      ],
    },
    tabelaComparacaoTresMecanismos: {
      kind: 'clinicalTable' as const,
      title: 'Comparação dos três mecanismos de hiperparatireoidismo',
      headers: ['Característica', 'PHPT (primário)', 'CKD-MBD (secundário renal)', 'NSHP (secundário nutricional)'],
      rows: [
        ['Motivo do PTH ↑', 'Autonomia paratireoidiana', 'Compensação à DRC', 'Compensação dietética Ca:P'],
        ['iCa', '↑', 'Normal ou ↓', 'Normal-baixo ou ↓'],
        ['Fósforo', 'Baixo/baixo-normal', 'Normal inicialmente; ↑ com progressão', 'Variável'],
        ['Calcitriol', 'Normal/↑ variável', '↓', 'Frequentemente normal/↑'],
        ['FGF23', 'Não é marcador principal', '↑ precocemente', 'Não é marcador principal'],
        ['Glândulas', '1 nódulo mais comum', 'Hiperplasia difusa', 'Hiperplasia compensatória'],
        ['Paciente típico', 'Adulto/idoso', 'Paciente com DRC', 'Jovem em crescimento'],
        ['Lesão óssea dominante', 'Menos comum', 'Crânio/mandíbula (rubber jaw)', 'Esqueleto axial e apendicular'],
        ['Tratamento-chave', 'Paratireoidectomia', 'Controlar DRC/fósforo (IRIS)', 'Corrigir dieta completa'],
        ['Exame físico PHPT', 'Cão: ~71% normal; gato: massa cervical comum', 'Sinais de DRC ± mandíbula flexível', 'Dor óssea, deformidade, fraturas'],
      ],
    },
  },

  etiology: {
    pontosChave: [
      'Hiperparatireoidismo = secreção persistentemente aumentada ou inadequadamente não suprimida de PTH — significado clínico depende do mecanismo (autônomo vs compensatório). (6)(7)',
      'PHPT: produção autônoma por adenoma (mais comum), carcinoma (~3–10% cães; ~22% série felina operada) ou hiperplasia multiglandular. (6)(14)(20)',
      'CKD-MBD: PTH ↑ faz parte de síndrome mineral-óssea mais ampla — fósforo, Ca, FGF23, calcitriol, osso e mineralização de tecidos moles. (8)(9)(10)',
      'NSHP: resposta compensatória a balanço cronicamente inadequado de Ca/P — dieta caseira, all-meat, complementares mal utilizados. (7)(17)(18)',
      'Quatro paratireoides normalmente: duas externas (extracapsulares craniolaterais) e duas internas (intratireoidianas caudais). (6)(20)',
      'Tecido ectópico: ~3–6% cães, ~35–50% gatos — relevante quando US cervical negativo com PHPT bioquimicamente confirmado. (6)(20)',
      'PTH secretado por células principais; regulação via CaSR (calcium-sensing receptor) no iCa extracelular. (6)',
      'PTH ↑ → reabsorção renal de Ca ↑, reabsorção tubular de P ↓ (fosfatúria), estimula 1α-hidroxilase → calcitriol ↑. (6)(8)',
      'PTH crônico → reabsorção óssea via eixo RANKL/OPG → osteopenia, osteodistrofia fibrosa, fraturas patológicas. (6)(7)',
      'FGF23 ↑ precocemente na DRC — tenta manter normofosfatemia à custa de calcitriol ↓ e PTH ↑ (trade-off mineral). (8)(9)(10)',
      'Em hipercalcêmico, PTH “normal” pode ser fisiologicamente anormal — deveria estar suprimido; não exclui PHPT. (6)(20)',
      'Nunca interpretar PTH isolado — matriz iCa × PTH × contexto clínico (DRC, dieta, idade) define o fenótipo. (6)(8)(20)',
      'Hiperparatireoidismo terciário (autonomia após estimulação prolongada na DRC) é incomum em pequenos animais — nota avançada apenas. (6)',
      'Outras causas secundárias de PTH ↑ (ex.: hiperadrenocorticismo) existem — classificação principal aqui: PHPT, CKD-MBD, NSHP. (6)',
    ],
    anatomiaParatireoides:
      'Cães e gatos possuem tipicamente **quatro glândulas paratireoides** pequenas associadas à tireoide cervical. Paratireoides **externas** localizam-se extracapsularmente próximas ao polo cranial/craniolateral de cada lobo tireoidiano; **internas** ficam dentro da cápsula/parênquima tireoidiano, mais caudalmente. Tecido ectópico pode localizar-se na cadeia cervical, região do inlet torácico ou mediastino cranial — crítico quando exploração cervical não encontra lesão com PHPT confirmado. (6)(20)',
    fisiologiaPth: {
      rim:
        'PTH aumenta reabsorção tubular de cálcio (menos perda urinária), reduz reabsorção de fósforo (aumenta fosfatúria) e estimula 1α-hidroxilase renal convertendo 25-OH-vitamina D em calcitriol (1,25-(OH)₂-vitamina D), que aumenta absorção intestinal de Ca e P. (6)(8)',
      osso:
        'PTH mobiliza cálcio do esqueleto indiretamente — atua sobre linhagem osteoblástica modificando sinais RANKL/OPG e promovendo diferenciação/ativação osteoclástica. Estimulação **crônica** predomina reabsorção óssea → osteopenia, corticais finas, osteodistrofia fibrosa, fraturas patológicas. (6)(7)',
      intestino:
        'Efeito intestinal predominantemente **indireto** via calcitriol — aumenta absorção de cálcio e fósforo. Em função renal normal, PTH tende a elevar iCa e reduzir fósforo sérico (fosfatúria). (6)',
      resultadoLiquido:
        'Mecanismo clássico PHPT: **iCa ↑ + fósforo baixo/baixo-normal + PTH não suprimido** — PTH reduz reabsorção tubular de P enquanto eleva Ca. (6)(20)',
    },
    fgf23Ckd:
      'FGF23 é produzido principalmente por células ósseas e **aumenta precocemente na DRC** quando a capacidade de eliminar fósforo diminui. FGF23 ↑ → fosfatúria ↑ (preserva normofosfatemia temporariamente), mas também **inibe 1α-hidroxilase** → calcitriol ↓ → menor absorção intestinal de Ca e menor retroalimentação inibitória sobre PTH → PTH ↑. Processo pode iniciar **antes de hiperfosfatemia evidente** — especialmente relevante em gatos (IRIS 2026 incorpora FGF23). (8)(9)(10)',
    cardInterpretacaoPth: {
      kind: 'clinicalTable' as const,
      title: 'Matriz de interpretação — iCa × PTH',
      headers: ['iCa', 'PTH', 'Interpretação principal'],
      rows: [
        ['↑', '↑', 'PHPT altamente provável'],
        ['↑', 'Normal-alto', 'PTH inadequadamente não suprimido → PHPT provável'],
        ['↑', 'Normal-baixo', 'Zona cinzenta — repetir, revisar técnica amostra'],
        ['↑', 'Suprimido', 'Investigar malignidade, vitamina D, granulomatosa, osteólise'],
        ['↓', '↑', 'Resposta secundária apropriada: CKD-MBD, NSHP, outras'],
        ['Normal', '↑', 'Possível HPT secundário — interpretar DRC/dieta/FGF23'],
      ],
    },
    alertaNaoUsarCalcioCorrigido:
      '⚠️ **ALERTA CLÍNICO:** se a decisão depende de saber se o paciente está verdadeiramente hipercalcêmico, **medir cálcio ionizado (iCa)**. Equações de “cálcio corrigido” por albumina apresentam desempenho insuficiente em cães e gatos e **não substituem iCa** para diagnosticar PHPT. Manuseio da amostra de iCa exige cuidado — exposição ao ar aumenta pH e pode reduzir artificialmente o iCa medido. (6)(8)(11)',
    tresFenotipos: {
      phpt:
        '**PHPT:** secreção autônoma apesar de iCa elevado. Adenoma uniglandular mais comum; carcinoma minoritário. Cão: Keeshond (predisposição hereditária AD), incidental frequente. Gato: raro, mais sintomático, carcinoma proporcionalmente maior em séries operadas. Tratamento: paratireoidectomia. (6)(14)(20)',
      ckdMbd:
        '**CKD-MBD:** PTH ↑ compensa retenção de fósforo, FGF23 ↑ e calcitriol ↓ na DRC. Fósforo normal inicialmente não exclui. Osteodistrofia fibrosa avançada → “rubber jaw”, dentes flutuantes. Tratamento: dieta renal + quelante IRIS 2026; calcitriol não rotina. (8)(9)(10)(16)',
      nshp:
        '**NSHP:** dieta Ca:P inadequada → PTH ↑ preserva iCa removendo Ca do osso. Filhotes/gatinhos em crescimento vulneráveis. Ca sérico pode parecer normal com osteopenia grave. Tratamento: dieta completa balanceada — não apenas cálcio isolado. (7)(17)(18)(21)',
    },
  },

  epidemiology: {
    phptCao:
      'PHPT é **incomum** em cães, porém mais frequente que em gatos. Adenoma predomina; carcinoma ~3–10% em séries. Keeshond: predisposição hereditária documentada (inserção cromossômica). Outras raças em excesso: Dachshund, Golden Retriever, Pastor Alemão, Norwegian Elkhound. Idade média ~10–11 anos; maioria >7 anos. Apresentação típica: hipercalcemia incidental — **~71% exame físico normal** em série de 210 cães. (6)(20)',
    phptGato:
      'PHPT **raro** em gatos; idade média ~13 anos. Siamês citado em séries, sem predisposição definitiva. Coorte de 32 gatos operados: adenoma 62,5%, carcinoma 21,9%. Apenas ~19% assintomáticos — maioria clinicamente doente. Massa cervical palpável ~38–57%. Mediana sobrevida pós-cirurgia ~1109 dias na principal coorte. (14)(19)(20)',
    ckdMbdCao:
      'Hiperparatireoidismo renal secundário aumenta com estágio IRIS — estudo de 89 cães: IRIS 1 ~36%, IRIS 2 ~44%, IRIS 3 ~78%, IRIS 4 ~92%. Números refletem população estudada, não prevalência universal. “Rubber jaw” e osteodistrofia fibrosa em DRC avançada. (8)(9)(16)',
    ckdMbdGato:
      'Extremamente comum na DRC felina azotêmica — até ~84% em algumas populações. FGF23 é biomarcador precoce incorporado ao IRIS 2026. Rubber jaw descrito, aparentemente menos frequente que em cães. (10)(16)(20)',
    nshp:
      'NSHP reapareceu com dietas caseiras/raw/all-meat/complementares mal utilizadas. Felinos <6 meses especialmente vulneráveis. Cães: filhotes grandes, Pastor Alemão, dietas BARF inadequadas — também adultos com dieta caseira crônica deficiente. Casos publicados 2023–2025 reforçam osteopenia difusa em gatos jovens. (17)(18)(21)',
    nshpCasoSkarbek2025:
      'Skarbek et al., JSAP 2025: gato jovem com osteopenia difusa em RM, NSHP presumido, hipocobalamina e deficiência de tiamina — reforça avaliação nutricional ampla além de Ca/P. DOI: 10.1111/jsap.13815. https://pmc.ncbi.nlm.nih.gov/articles/PMC12000704/ (18)',
    nshpVsRaquitismo:
      'NSHP: reabsorção excessiva de osso previamente mineralizado por dieta Ca:P inadequada. Raquitismo: mineralização inadequada de osteoide/cartilagem de crescimento — fises alargadas mais sugestivas de raquitismo, mas deficiências podem coexistir; não usar como regra absoluta. (7)(17)',
    phptKeeshondNota:
      'Keeshond: inserção 194 pb cromossomo 20 — PHPT hereditário autossômico dominante; maior risco recorrência e doença multiglandular. Vigilância familiar recomendada. (6)(20)',
    phptRecorrencia:
      'Recorrência PHPT canino até ~8% dependendo da série; monitorar iCa periodicamente pós-tratamento. (6)',
    ckdMbdFosforoNormalCard:
      '🧠 **Fósforo sérico normal NÃO exclui CKD-MBD precoce** — FGF23 e PTH podem compensar antes da hiperfosfatemia evidente, especialmente em gatos. (8)(9)(10)',
    cardOQuePrecisoSaber30Segundos: [
      'Hipercalcemia + PTH não suprimido → PHPT.',
      'CKD + PTH elevado → CKD-MBD, não tumor automaticamente.',
      'Jovem + dieta inadequada + osteopenia → NSHP.',
      'PHPT canino: muitas vezes incidental.',
      'PHPT felino: massa cervical frequentemente palpável.',
      'PHPT definitivo: paratireoidectomia.',
      'Principal risco pós-cirurgia: hipocalcemia.',
      'DRC: tratar fósforo conforme IRIS 2026.',
      'NSHP: corrigir dieta, não só “dar cálcio”. (6)(9)(10)(17)',
    ],
  },

  pathogenesisTransmission: {
    phptMecanismo:
      'PHPT resulta de **perda de feedback negativo** do iCa sobre paratireoides — adenoma, carcinoma ou hiperplasia produzem PTH autonomamente. CaSR nas células principais deixa de suprimir adequadamente a secreção apesar de hipercalcemia. Uma glândula envolvida é mais comum; doença multiglandular ocorre (Keeshond: risco hereditário). Metástase de carcinoma paratireoidiano é incomum. (6)(20)',
    ckdMbdCascata: [
      'Perda de néfrons → GFR ↓ → capacidade de excretar fósforo diminui. (8)(9)',
      'Organismo aumenta FGF23 ↑ para promover fosfatúria pelos néfrons remanescentes. (8)(10)',
      'FGF23 inibe 1α-hidroxilase renal → calcitriol ↓. (8)(9)(10)',
      'Menos calcitriol → menor absorção intestinal de Ca e menor inibição direta do PTH. (6)(8)',
      'Retenção de fósforo estimula PTH; fósforo complexa Ca → iCa ↓. (8)(9)',
      'PTH ↑ mobiliza Ca ósseo, aumenta reabsorção renal de Ca, aumenta fosfatúria. (6)(8)',
      'Inicialmente fósforo sérico pode permanecer normal à custa de FGF23 ↑ + PTH ↑. (9)(10)',
      'Com progressão: hiperfosfatemia + calcitriol baixo + PTH muito elevado → CKD-MBD grave. (8)(9)(10)',
    ],
    nshpMecanismo:
      'Dieta com Ca insuficiente ou relação Ca:P desfavorável (músculo ~1:10 Ca:P) → tendência à queda de iCa → PTH ↑ → rim retém Ca e excreta P → calcitriol ↑ estimula absorção intestinal, mas dieta não fornece Ca suficiente → **organismo mobiliza osso** → reabsorção óssea crônica → osteopenia. Ca sérico pode permanecer normal enquanto esqueleto desmineraliza. (7)(17)(18)',
  },

  pathophysiology: {
    phptHipercalcemia:
      'Hipercalcemia crônica no PHPT interfere na concentração urinária (resistência funcional ao ADH) → PU/PD → hipostenúria → hipercalciúria → urolitíase/ITU (~29% cultura positiva em série canina). Neuromuscular: fraqueza, tremores, fasciculações, atrofia muscular. GI: hiporexia, vômito, constipação, perda ponderal. Cardíaco: alteração de excitabilidade/bradiarritmias em hipercalcemia grave. Neurológico: depressão, letargia, alteração de consciência. (6)(7)(20)',
    phptPuPdMecanismo:
      'A hipercalcemia reduz a capacidade do túbulo coletor de responder ao ADH → poliúria → polidipsia compensatória. Hipercalciúria predispõe urolitíase cálcica e ITU — investigar urina mesmo sem disúria em cão PHPT. Mineralização renal possível quando Ca e P simultaneamente elevados. (6)(7)',
    phptSinaisCaninosDetalhados: [
      'Renal/urinário: PU/PD, hipostenúria, hipercalciúria, urolitíase, hematúria, polaciúria — cultura positiva ~29%. (6)',
      'Neuromuscular: fraqueza, redução de atividade, tremores, fasciculações, intolerância ao exercício. (6)(7)',
      'Gastrointestinal: hiporexia/anorexia, vômito, constipação, perda ponderal. (6)',
      'Neurológico (hipercalcemia importante): depressão, desorientação, alteração de consciência. (7)',
      'Cardíaco: bradicardia/bradiarritmias por alteração de excitabilidade. (7)',
    ],
    phptSinaisFelinosDetalhados: [
      'Letargia ~56%, hiporexia/anorexia ~53%, vômito ~41%, perda ponderal ~31% na coorte de 32 gatos. (14)',
      'PU/PD <20% na mesma coorte — diferente do cão. (14)(20)',
      'Massa cervical palpável ~38–57% — palpar tireoide concomitante (hipertireoidismo comum em idosos). (14)(20)',
      'Carcinoma ~22% na série operada — não assumir benignidade. (14)',
    ],
    ckdMbdOsteodistrofia:
      'Estimulação crônica por PTH → reabsorção óssea + substituição fibrosa → osteodistrofia fibrosa. Mandíbula/maxila/crânio particularmente afetados → “rubber jaw”, dentes frouxos (“floating teeth”), dificuldade mastigar, hipersalivação, fratura patológica facial. Radiografia: osteopenia, perda lamina dura, trabéculas rarefeitas, cortical fina. Mineralização de tecidos moles, nefrocalcinose, fragilidade vascular. PTH cronicamente elevado como toxina urêmica. (8)(16)(20)',
    ckdMbdProgressaoIris: [
      'IRIS 1: ~36% cães com HPT renal em estudo de 89 — PTH/FGF23 podem elevar-se cedo. (8)',
      'IRIS 2: ~44% — fósforo ainda pode parecer normal. (8)(9)',
      'IRIS 3: ~78% — hiperfosfatemia mais frequente. (9)',
      'IRIS 4: ~92% — CKD-MBD grave, rubber jaw possível. (9)(16)',
      'Gatos DRC azotêmica: até ~84% com HPT renal em populações estudadas. (10)(20)',
    ],
    ckdMbdTratamentoPassos: [
      'Estadiar DRC IRIS — tratamento mineral organizado pelo estágio, não por “estágio de hiperparatireoidismo”. (9)(10)',
      'Passo 1: dieta renal restrita em fósforo — reduz necessidade compensação FGF23/PTH. (9)(10)',
      'Passo 2: quelante intestinal se P acima da meta após dieta — 30–60 mg/kg/dia dividido refeições. (9)(10)',
      'Passo 3 (gato IRIS 2): FGF23 >400 com P na meta → restrição dietética adicional. (10)',
      'Monitorar Ca ao usar quelantes com cálcio ou dieta muito restrita — hipercalcemia iatrogênica possível em gatos. (10)',
      'Calcitriol e cinacalcete: não primeira linha IRIS 2026 — ver notas terapêuticas. (8)(10)',
    ],
    figuraRubberJaw: {
      kind: 'clinicalFigure' as const,
      src: `${ASSET_BASE}/van-bruggen-floating-teeth.jpg`,
      alt: 'Radiografia de crânio canino com osteodistrofia fibrosa renal — dentes flutuantes e desmineralização maxilomandibular.',
      caption:
        'Osteodistrofia renal avançada (“floating teeth”) — Van Bruggen et al., Forensic Sci Med Pathol 2022, CC BY. DOI: 10.1007/s12024-022-00501-5. https://pmc.ncbi.nlm.nih.gov/articles/PMC9636077/ (16)',
      display: 'wide',
    },
    nshpOsteopenia:
      'Reabsorção óssea generalizada → cortical fina, trabéculas rarefeitas, fraturas patológicas/galho verde/folding fractures, compressão vertebral, deformidades ossos longos, arqueamento pélvico. ALP ↑ em jovens com alta remodelação. Bioquímica discreta ≠ osso normal. NSHP vs raquitismo: NSHP = reabsorção de osso mineralizado; raquitismo = mineralização inadequada de osteoide — podem coexistir. (7)(17)(18)',
    nshpSinaisDetalhados: [
      'Ortopédicos: relutância locomotor, dor óssea, claudicação alternante, deformidade membros, fraturas espontâneas. (17)(18)',
      'Coluna: cifose, dor cervical/toracolombar, fratura vertebral, compressão medular. (17)(18)',
      'Neurológicos: déficit proprioceptivo, paresia, paralisia, ataxia por colapso vertebral. (18)',
      'Hipocalcemia clínica: tremores, fasciculações, convulsões — nem sempre presente. (7)(17)',
      'Outros: atraso crescimento, constipação, dentes frouxos, dificuldade mastigar. (17)',
    ],
    nshpCasoZambarbieri2023:
      'Gato 6 meses alimentado com complementar + atum: crescimento ruim, osteopenia, hipocalcemia, PTH muito elevado. Transição para alimento **completo balanceado crescimento** → Ca e PTH normalizaram ~2 meses. Lição: “alimento complementar não é alimento completo”. DOI: 10.1177/10406387221143463. (17)',
    tabelaPadroesLaboratoriais: {
      kind: 'clinicalTable' as const,
      title: 'Padrões laboratoriais por mecanismo',
      headers: ['Parâmetro', 'PHPT', 'CKD-MBD', 'NSHP'],
      rows: [
        ['PTH', '↑ / inadequadamente normal', '↑', '↑'],
        ['iCa', '↑', 'Normal / ↓', 'Normal-baixo / ↓'],
        ['Fósforo', '↓ / baixo-normal', 'Normal → ↑ tardiamente', 'Variável'],
        ['Calcitriol', 'Variável', '↓', 'Frequentemente ↑/normal'],
        ['FGF23', 'Não é diagnóstico principal', '↑ precocemente', 'Não é marcador principal'],
        ['Imagem', 'Massa cervical (gato)', 'Rubber jaw / desmineralização craniana', 'Osteopenia generalizada'],
      ],
    },
  },

  clinicalSignsPathophysiology: [
    {
      system: 'endocrine',
      findings: [
        {
          finding: 'Hipercalcemia incidental (PHPT canino)',
          mechanism: 'Secreção autônoma de PTH mantém iCa elevado apesar de feedback negativo.',
          clinicalMeaning: '~71% exame físico normal — não subestimar por ausência de sinais; investigar iCa + PTH. (6)(20)',
          priority: 'common',
          context: ['Cães'],
        },
        {
          finding: 'Massa cervical palpável (PHPT felino)',
          mechanism: 'Adenoma/carcinoma paratireoidiano aumenta volume cervical.',
          clinicalMeaning: 'Palpar tireoide/paratireoides em gato idoso hipercalcêmico (~38–57%). (14)(20)',
          priority: 'common',
          context: ['Gatos'],
        },
        {
          finding: 'PTH elevado com iCa normal (CKD-MBD)',
          mechanism: 'Compensação à retenção de fósforo, FGF23 ↑ e calcitriol ↓ na DRC.',
          clinicalMeaning: 'Esperado na DRC — não confundir com PHPT sem iCa elevado. (8)(9)(10)',
          priority: 'common',
        },
      ],
    },
    {
      system: 'renal',
      findings: [
        {
          finding: 'PU/PD, hipostenúria, urolitíase (PHPT)',
          mechanism: 'Hipercalcemia → resistência renal ao ADH; hipercalciúria.',
          clinicalMeaning: 'Cultura urinária positiva ~29% em série canina. (6)(20)',
          priority: 'common',
        },
        {
          finding: 'Rubber jaw (CKD-MBD)',
          mechanism: 'PTH crônico → osteodistrofia fibrosa maxilomandibular.',
          clinicalMeaning: 'Doença mineral avançada — intensificar controle IRIS. (8)(16)',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'musculoskeletal',
      findings: [
        {
          finding: 'Osteopenia, fraturas patológicas (NSHP)',
          mechanism: 'PTH ↑ crônico mobiliza Ca do osso por dieta Ca:P inadequada.',
          clinicalMeaning: 'Ca sérico normal não exclui — radiografar jovem com dieta suspeita. (17)(18)',
          priority: 'emergency',
        },
        {
          finding: 'Fraqueza, tremores (hiper/hipocalcemia)',
          mechanism: 'Alteração de excitabilidade neuromuscular.',
          clinicalMeaning: 'PHPT: hipercalcemia; pós-op: hipocalcemia — medir iCa. (6)(12)',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Hiporexia, vômito (PHPT felino; hipercalcemia)',
          mechanism: 'Hipercalcemia crônica reduz motilidade GI e apetite.',
          clinicalMeaning: 'Gato PHPT frequentemente sintomático — não esperar só hipercalcemia bioquímica. (14)(20)',
          priority: 'common',
          context: ['Gatos'],
        },
        {
          finding: 'Dificuldade mastigar / hipersalivação (CKD-MBD avançado)',
          mechanism: 'Desmineralização mandibular — rubber jaw.',
          clinicalMeaning: 'Avaliar cavidade oral e imagem craniana em DRC estádio avançado. (16)',
          priority: 'uncommon',
        },
        {
          finding: 'Constipação, dor ao mastigar (NSHP)',
          mechanism: 'Deformidade maxilar/mandibular e dor óssea generalizada.',
          clinicalMeaning: 'Correlacionar com história dietética e radiografias. (17)',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Perda ponderal (PHPT felino; DRC; NSHP)',
          mechanism: 'Anorexia urêmica, hipercalcemia, catabolismo ósseo/muscular.',
          clinicalMeaning: 'Integrar mecanismo — não atribuir só a neoplasia. (14)(17)',
          priority: 'common',
        },
        {
          finding: 'Atraso de crescimento (NSHP filhotes)',
          mechanism: 'Demanda mineral não atendida durante crescimento rápido.',
          clinicalMeaning: 'Investigar dieta antes de rotular parvovírus/parasitas isolados. (17)(18)',
          priority: 'common',
          context: ['Filhotes'],
        },
      ],
    },
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Tetania pós-paratireoidectomia',
          mechanism: 'Queda abrupta de PTH; paratireoides residuais funcionalmente suprimidas/atróficas.',
          clinicalMeaning: 'Gluconato Ca 10% IV se sintomático; monitorar iCa q12–24h até D3–6. (11)(12)',
          priority: 'emergency',
        },
        {
          finding: 'Convulsões / hiperexcitabilidade (hipocalcemia NSHP ou pós-op)',
          mechanism: 'Ca ionizado baixo aumenta excitabilidade neuromuscular.',
          clinicalMeaning: 'Emergência — Ca IV lento com ECG; corrigir causa de base. (7)(11)(17)',
          priority: 'emergency',
        },
        {
          finding: 'Compressão medular por fratura vertebral (NSHP)',
          mechanism: 'Colapso vertebral em osso osteopênico por reabsorção crônica.',
          clinicalMeaning: 'Repouso + dieta antes de estabilização cirúrgica em osso frágil. (17)(18)',
          priority: 'systemic',
        },
        {
          finding: 'Depressão, desorientação (hipercalcemia grave PHPT)',
          mechanism: 'Hipercalcemia altera função neuronal.',
          clinicalMeaning: 'Estabilizar antes de cirurgia eletiva; reidratação prioritária. (6)(7)',
          priority: 'emergency',
        },
      ],
    },
  ],

  diagnosis: {
    diagnosticReasoning:
      'Classificar mecanismo antes de tratar: PHPT (iCa ↑ + PTH autônomo), CKD-MBD (DRC + PTH ↑), NSHP (dieta + osteopenia). PTH nunca isolado; iCa confirma hipercalcemia biológica. (6)(8)(20)',
    matrizInterpretacaoPth: {
      kind: 'clinicalTable' as const,
      title: 'Matriz iCa × PTH',
      headers: ['iCa', 'PTH', 'Próximo passo'],
      rows: [
        ['↑', '↑ ou normal-alto', 'PHPT → US cervical → paratireoidectomia'],
        ['↑', 'Suprimido', 'Malignidade / vit D / granulomatosa'],
        ['Normal/↓', '↑ + CKD', 'CKD-MBD → IRIS + dieta/quelante'],
        ['Normal-baixo/↓', '↑ + dieta inadequada', 'NSHP → radiografias → dieta completa'],
      ],
    },
    tabelaAlvosFosforoIrisCao: {
      kind: 'clinicalTable' as const,
      title: 'Metas de fósforo IRIS 2026 — cães',
      headers: ['Estágio IRIS', 'Alvo após tratamento'],
      rows: [
        ['Estágio 2', '<4,6 mg/dL (<1,5 mmol/L), mas não <2,7 mg/dL (<0,9 mmol/L)'],
        ['Estágio 3', '<5,0 mg/dL (<1,6 mmol/L)'],
        ['Estágio 4', '<6,0 mg/dL (<1,9 mmol/L)'],
      ],
    },
    tabelaAlvosFosforoIrisGato: {
      kind: 'clinicalTable' as const,
      title: 'Metas de fósforo IRIS 2026 — gatos',
      headers: ['Estágio IRIS', 'Alvo após tratamento'],
      rows: [
        ['Estágio 2', '<4,5 mg/dL (<1,5 mmol/L), mas não <2,7 mg/dL (<0,9 mmol/L)'],
        ['Estágio 3', '<5,0 mg/dL (<1,6 mmol/L)'],
        ['Estágio 4', '<6,0 mg/dL (<1,9 mmol/L)'],
      ],
    },
    fgf23IrisGato:
      'Gato IRIS 2 com P na meta: FGF23 >400 pg/mL → considerar restrição dietética; >700 → intensificar; <500 → controle excelente. Ca >12 mg/dL após dieta restrita → dieta menos restrita. (10)',
    jornadaDiagnosticaPhpt:
      'Confirmar iCa → PTH relacional → história/exame → PTHrP se indicado → US/CT cervical → excluir diferenciais. (6)(13)(15)(20)',
    ultrassomParatireoides:
      'Sensibilidade ~90–95%; multiglandular ~66%/72% concordância. Normal <3 mm; tamanho ≠ benignidade. Gato ~92% com massa. (6)(15)',
    ctParatireoidesNota:
      'Cordella et al., 2022 — TC localiza PHPT canino; adenoma/carcinoma sobrepõem características. DOI: 10.3390/vetsci9060273. https://pmc.ncbi.nlm.nih.gov/articles/PMC9228294/ (15)',
    diferenciaisHipercalcemiaCao: [
      'Malignidade (lymphoma, saco anal, PTHrP).',
      'PHPT, hipoadrenocorticismo, DRC, vitamina D, granulomatosa, osteólise. (6)(7)(20)',
    ],
    diferenciaisHipercalcemiaGato: [
      'Hipercalcemia idiopática, neoplasia, DRC, PHPT, vit D, granulomatosa. (20)',
    ],
    diagnosticPlanStepByStep: [
      {
        stepNumber: 1,
        title: 'Confirmar iCa',
        purpose: 'Hipercalcemia biológica.',
        description: 'iCa + fósforo + creatinina. Não usar cálcio corrigido. (6)(8)(11)',
        interpretation: 'iCa ↑ → PHPT provável se PTH autônomo.',
        limitations: 'Artefato de amostra.',
        isGoldStandard: true,
      },
      {
        stepNumber: 2,
        title: 'PTH intacto',
        purpose: 'Autonomia vs compensação.',
        description: 'PTH com iCa — normal em hipercalcêmico pode ser anormal. (6)(20)',
        interpretation: 'Relacional sempre.',
        limitations: 'Assay-dependent.',
      },
      {
        stepNumber: 3,
        title: 'História e exame',
        purpose: 'NSHP, malignidade.',
        description: 'Dieta, suplementos, cervical gato, linfonodos. (17)(20)',
        interpretation: 'Filhote all-meat → NSHP.',
        limitations: '—',
      },
      {
        stepNumber: 4,
        title: 'PTHrP',
        purpose: 'Excluir malignidade.',
        description: 'Quando PTH suprimido ou suspeita clínica. (6)(7)',
        interpretation: 'PTHrP ↑ favorece HHM.',
        limitations: 'Negativo ≠ excluir toda neoplasia.',
      },
      {
        stepNumber: 5,
        title: 'Imagem cervical',
        purpose: 'Localizar PHPT.',
        description: 'US → CT se negativo. (13)(15)',
        interpretation: 'Massa hipoecoica.',
        limitations: 'Histopatologia necessária.',
      },
      {
        stepNumber: 6,
        title: 'CKD-MBD',
        purpose: 'IRIS + mineral.',
        description: 'Estadiar, P, FGF23 gato. (9)(10)',
        interpretation: 'PTH ↑ precoce possível.',
        limitations: 'FGF23 nem sempre disponível.',
      },
      {
        stepNumber: 7,
        title: 'Radiografias NSHP',
        purpose: 'Osteopenia.',
        description: 'Esqueleto jovem dieta inadequada. (17)(18)',
        interpretation: 'Osteopenia generalizada.',
        limitations: 'Raquitismo pode coexistir.',
      },
      {
        stepNumber: 8,
        title: 'Plano terapêutico',
        purpose: 'Mecanismo-correto.',
        description: 'Cirurgia / fósforo IRIS / dieta NSHP. (6)(9)(17)',
        interpretation: 'Evitar tratamento oposto.',
        limitations: 'Comorbidades.',
      },
    ],
    literaturaRuane2025:
      'Ruane et al., JSAP 2025 — PHPT felino pós-I¹³¹; não inferir causalidade. DOI: 10.1111/jsap.13854. https://pmc.ncbi.nlm.nih.gov/articles/PMC12331554/ (19)',
    literaturaSkarbek2025:
      'Skarbek et al., JSAP 2025 — RM osteopenia NSHP felino. DOI: 10.1111/jsap.13815. https://pmc.ncbi.nlm.nih.gov/articles/PMC12000704/ (18)',
    literaturaTravail2025:
      'Travail et al., JVIM 2025 — PTH pré-op ≥75 pg/mL preditor hipocalcemia pós-op. DOI: 10.1111/jvim.70016. https://pmc.ncbi.nlm.nih.gov/articles/PMC11876990/ (12)',
    pthrpInterpretacao:
      'PTH-related peptide diferencia PHPT (indetectável) de hipercalcemia humoral da malignidade. Negativo não exclui neoplasia com outros mecanismos (osteólise local, vitamina D-like). Solicitar quando PTH suprimido com iCa ↑ ou suspeita clínica de neoplasia. (6)(7)(20)',
    vitaminaDInvestigacao:
      '25-OH-vitamina D quando suspeita intoxicação (rodenticidas cholecalciferol, suplementos humanos, calcipotrieno tópico). Fósforo alto + iCa ↑ reduz simplicidade diagnóstico PHPT — pensar DRC, vit D, osteólise. (6)(7)',
    citologiaParatireoide:
      'FNA rotineira de massa paratireoidiana não recomendada. Lesões císticas: aspiração US-guiada com PTH no fluido pode documentar origem funcional. Histopatologia pós-excision diferencia adenoma, carcinoma, hiperplasia — US/CT localizam mas não substituem. (6)(15)',
    estadiamentoNota:
      '**Não criar estadiamento universal de PHPT ou NSHP.** No componente renal, usar exclusivamente **estágio IRIS da DRC** para organizar metas de fósforo e quelantes. (9)(10)',
    tabelaPadroesLaboratoriaisDiagnostico: {
      kind: 'clinicalTable' as const,
      title: 'Padrões laboratoriais — card visual diagnóstico',
      headers: ['Mecanismo', 'PTH', 'iCa', 'P', 'Calcitriol', 'FGF23', 'Imagem-chave'],
      rows: [
        ['PHPT', '↑ / inadeq. normal', '↑', '↓/baixo-normal', 'Variável', 'N/A principal', 'Massa cervical (gato)'],
        ['CKD-MBD', '↑', 'N/↓', 'N→↑', '↓', '↑ precoce', 'Rubber jaw / desmineralização craniana'],
        ['NSHP', '↑', 'N-baixo/↓', 'Variável', '↑/N', 'N/A principal', 'Osteopenia generalizada'],
      ],
    },
    jornadaDiagnosticaPhptDetalhada: [
      {
        etapa: 'Confirmar',
        acao: 'Repetir cálcio total se necessário; medir iCa, fósforo, albumina, creatinina/SDMA.',
        nota: 'Não usar cálcio corrigido. (6)(8)',
      },
      {
        etapa: 'História',
        acao: 'Suplementos, vitamina D, rodenticidas, calcipotrieno, dieta, medicamentos, perda ponderal, PU/PD, DRC prévia.',
        nota: 'Identificar toxinas e dieta caseira. (6)(7)(17)',
      },
      {
        etapa: 'Exame físico',
        acao: 'Cão: linfonodos, oral, sacos anais, esqueleto, cervical. Gato: palpação tireoidiana/paratireoidiana.',
        nota: 'Massa cervical felina ~38–57%. (14)(20)',
      },
      {
        etapa: 'Banco mínimo',
        acao: 'Hemograma, bioquímica, iCa, P, eletrólitos, urinálise, cultura se indicada.',
        nota: 'ITU/urolitíase frequentes no PHPT canino. (6)',
      },
      {
        etapa: 'PTH + iCa',
        acao: 'Diagnóstico hormonal relacional — iCa alto + PTH não suprimido.',
        nota: 'Padrão fundamental PHPT. (6)(20)',
      },
      {
        etapa: 'PTHrP',
        acao: 'Quando malignidade suspeita ou PTH suprimido com hipercalcemia.',
        nota: 'Diferencia HHM. (6)(7)',
      },
      {
        etapa: 'US cervical',
        acao: 'Após padrão bioquímico compatível; CT se negativo.',
        nota: 'Sensibilidade ~90–95% em mãos experientes. (13)(15)',
      },
      {
        etapa: 'Excluir outros',
        acao: 'US abdominal, RX/CT torácica, citologia, saco anal (cão), 25-OH-vit D.',
        nota: 'Conforme apresentação clínica. (6)(7)(20)',
      },
    ],
    monitoramentoResumidoTabela: {
      kind: 'clinicalTable' as const,
      title: 'Monitorização resumida por mecanismo',
      headers: ['Mecanismo', 'Pré-tratamento', 'Seguimento'],
      rows: [
        ['PHPT', 'iCa, P, renal, urinálise, US cervical', 'iCa q12–24h pós-op; risco tardio D3–6'],
        ['CKD-MBD', 'IRIS, P, FGF23 (gato), Ca', 'Ca+P q4–6 sem → ~q12 sem'],
        ['NSHP', 'Ca/P/PTH, RX, dieta', 'Clínica 1–2 sem; RX 4–8 sem'],
      ],
    },
    checklistHipercalcemiaCao: [
      'Confirmar iCa — não confiar só Ca total. (6)(8)',
      'PTH intacto com iCa. (6)(20)',
      'PTHrP se PTH suprimido ou neoplasia. (6)(7)',
      'Palpar saco anal, linfonodos, oral. (6)',
      'US cervical se PHPT. (13)(15)',
      'Imagem abdominal/torácica conforme suspeita. (7)',
      '25-OH-vitamina D se intoxicação. (7)',
    ],
    checklistHipercalcemiaGato: [
      'Confirmar iCa. (6)(8)',
      'Incluir hipercalcemia idiopática felina. (20)',
      'Palpação cervical cuidadosa. (14)',
      'Neoplasia se PTH suprimido. (20)',
      'US cervical se PHPT. (15)',
    ],
  },

  treatment: {
    objetivos: [
      'PHPT: paratireoidectomia (tratamento definitivo) ± estabilização hipercalcemia.',
      'CKD-MBD: controle de fósforo e DRC conforme IRIS 2026.',
      'NSHP: correção dietética completa — não apenas suplemento de cálcio.',
      'Evitar confundir mecanismos — tratamentos são opostos. (6)(9)(10)(17)',
    ],
    ablacaoAlternativas:
      'Cão: etanol percutâneo US-guiado ou ablação térmica/RF — requer lesão visível, operador experiente; riscos: nervo laríngeo recorrente, Horner, paralisia laríngea, necrose; não gera espécime histológico completo. Gato: ablação **não rotineira** — paratireoidectomia preferencial. (6)(13)',
    phptParatireoidectomia:
      'Tratamento de escolha PHPT canino e felino. Excisão glândula acometida; 2–3 anormais → remover afetadas; 4 aumentadas → **reavaliar secundário**. Ausência de sinais não exclui indicação — hipercalcemia crônica lesiona rim/trato urinário. Minimamente invasiva US-guiada efetiva quando lesão localizada (Young & Degner, 2023 — 50 cães). Cintilografia sestamibi **não** recomendada como padrão canino. FNA rotineira não indicada; PTH no fluido de cistos pode ajudar. (6)(13)(14)',
    monitoramentoResumido: {
      phptPreOp: ['iCa', 'P', 'função renal', 'urinálise', 'cultura se indicada', 'imagem cervical'],
      phptPosOp: ['iCa q12–24h inicial', 'Mg', 'P', 'creatinina', 'sinais neuromusculares', 'plano tardio D3–6'],
      ckdMbd: ['Ca + P q4–6 semanas até estável → ~q12 semanas', 'FGF23 gatos quando disponível', 'peso/apetite'],
      nshp: ['clínica 1–2 semanas', 'Ca/P/PTH', 'radiografia 4–8 semanas se osteopenia/fraturas'],
    },
    hiperparatireoidismoTerciarioNota:
      'Nota avançada: após estimulação paratireoidiana muito prolongada na DRC, secreção teoricamente mais autônoma (terciário) — **incomum** em cães/gatos. Não diagnosticar terciário apenas por PTH muito elevado na CKD. (6)',
    outrasCausasPthNota:
      'Nelson & Couto descreve PTH ↑ compensatório também em hiperadrenocorticismo canino. Outras doenças podem elevar PTH secundariamente — classificação principal desta página: PHPT, CKD-MBD, NSHP. (6)',
    nshpTempoRecuperacao:
      'Melhora laboratorial nas primeiras semanas; mineralização RX ~3–4 semanas início, ~4–8 semanas adequada. Deformidades podem persistir. Fraturas: repouso inicial; cirurgia após mineralização parcial. (17)(18)',
    quelantesIrisDetalhe: {
      caes:
        'IRIS 2026 cães: hidróxido/carbonato de alumínio, carbonato/acetato de cálcio, lantânio, citrato férrico. 30–60 mg/kg/dia com refeições — formulação importa. (9)',
      gatos:
        'IRIS 2026 gatos: hidróxido/carbonato de alumínio, carbonato/acetato de cálcio, lantânio. Monitorar Ca com quelantes cálcio. (10)',
    },
    farmacosNaoRotina: [
      'Cinacalcete: experimental/fora da bula — não substituir paratireoidectomia. (6)',
      'Calcitriol CKD-MBD: não rotina IRIS 2026; gatos especialmente. (4)(10)',
      'Glicocorticoide às cegas: prejudica diagnóstico lymphoma. (6)(7)',
      'Cintilografia sestamibi canina: não padrão atual. (6)',
    ],
    carcinomaParatireoidianoNota:
      'Carcinoma canino: metástase incomum; mediana ~2 anos pós-cirurgia (série 100). Felino ~22% coorte — amostra pequena. (6)(14)',
    hipercalcemiaGrave: {
      fluidoterapia:
        'Primeiro: reidratar com cristaloide isotônico (NaCl 0,9% tradicional) — calcular déficit/manutenção; não taxa fixa universal. (7)(11)',
      furosemida:
        '**Somente após euvolemia:** 2–4 mg/kg IV/SC/VO q8–24h titulado. Nunca em desidratado — piora GFR, hipocalemia. Adjuvante, não tratamento PHPT. (7)(11)',
      pamidronato:
        'Hipercalcemia grave/refratária: cão 0,65–2 mg/kg IV 2–4 h; gato 1–2 mg/kg IV ~4 h — nefrotoxicidade, cautela em azotêmicos. (7)(11)',
      calcitonina:
        'Salmon calcitonin 4–6 UI/kg SC q8–12h — efeito temporário, taquifilaxia; reserva selecionada. (7)',
      alertaGlicocorticoide:
        '⚠️ Não iniciar prednisona/dexametasona às cegas antes de investigar lymphoma — prejudica citologia/histologia. (6)(7)',
    },
    hipocalcemiaPosOp: {
      frequencia:
        'Cão ~35–70% hipocalcemia bioquímica pós-op; gato ~30–34%. Queda tardia possível D3–6 — Ca normal manhã seguinte não elimina risco. (6)(12)(14)',
      gluconatoCalcio:
        'Hipocalcemia sintomática: gluconato Ca 10% **0,5–1,5 mL/kg IV** lentamente 20–30 min com monitorização ECG. (11)',
      monitorizacao:
        'iCa q12–24h inicialmente; Mg, P, creatinina. Retorno imediato se tremores/convulsão. (6)(12)',
      suplementacaoOral:
        'Ca oral ± calcitriol se hipocalcemia persistente — meta: Ca baixo-normal assintomático para estimular glândulas residuais. Desmame semanas a meses. (6)(22)',
    },
    atualizacaoPth2025:
      'Travail et al., 2025 (103 cães): PTH pré-op mediano 232 vs 81,5 pg/mL (hipo vs não-hipo). Cutoff **≥75 pg/mL:** sensibilidade 96,6%, especificidade 42,3%, AUC 0,78. Útil para menor risco se <75; ≥75 não obriga hipocalcemia. DOI: 10.1111/jvim.70016. (12)',
    ckdMbdDietaQuelante:
      'Dieta renal restrita em P como primeira linha IRIS 2026. Quelante se P acima da meta: **30–60 mg/kg/dia** dividido nas refeições, titulado (agente específico importa). Monitorar Ca + P q4–6 semanas até estável → ~q12 semanas. Toxicidade alumínio: microcitose, fraqueza (cães CKD avançada). Quelantes com Ca podem causar hipercalcemia. (9)(10)(11)',
    calcitriolNota:
      '🟠 Calcitriol **não é rotina** CKD-MBD moderno — IRIS 2026 não inclui no algoritmo principal. Gatos: benefício não demonstrado rotineiramente. Cães: evidência mista/antiga — consideração especializada após controle de fósforo apenas. Calcitriol profilático pós-paratireoidectomia: Armstrong 2018 — não eliminou risco hipocalcemia. (4)(10)(22)',
    cinacalceteNota:
      '🔬 Cinacalcete (calcimimético): dados preliminares PHPT canino — efeitos adversos frequentes; **experimental/fora da bula**, não substitui paratireoidectomia. Na DRC: insuficiente para rotina IRIS. (6)',
    nshpTratamento:
      '**Primeiro e principal: corrigir dieta** — alimento completo espécie/estágio ou caseira formulada por nutricionista. Ca elementar oral 25–50 mg/kg/dia (gato) temporário se necessário. Repouso rigoroso se osteopenia/fraturas — evitar osteossíntese imediata em osso frágil. Melhora lab semanas; mineralização RX 4–8 semanas. Caso Zambarbieri 2023: gatinho all-meat → dieta completa → normalização ~2 meses. (17)(21)',
    tabelaFarmacos: {
      kind: 'clinicalTable' as const,
      title: 'Medicamentos e intervenções — doses práticas',
      headers: ['Terapia', 'Espécie', 'Dose', 'Contexto', 'Observação'],
      rows: [
        ['Gluconato Ca 10%', 'cão/gato', '0,5–1,5 mL/kg IV 20–30 min', 'Hipocalcemia sintomática', 'ECG contínuo (11)'],
        ['Furosemida', 'cão/gato', '2–4 mg/kg IV/SC/VO q8–24h', 'Hipercalcemia selecionada', 'Após hidratação (11)'],
        ['Pamidronato', 'cão', '0,65–2 mg/kg IV 2–4 h', 'Hipercalcemia grave', 'Nefrotoxicidade (11)'],
        ['Pamidronato', 'gato', '1–2 mg/kg IV ~4 h', 'Hipercalcemia grave', 'Nefrotoxicidade (11)'],
        ['Calcitonina salmon', 'cão/gato', '4–6 UI/kg SC q8–12h', 'Hipercalcemia grave', 'Efeito curto (7)'],
        ['Quelante fósforo', 'cão/gato', '30–60 mg/kg/dia com refeições', 'CKD P acima meta IRIS', 'Titular produto (9)(10)'],
        ['Ca elementar oral', 'gato', '25–50 mg/kg/dia q8–12h', 'NSHP suplemento temporário', 'Dieta é principal (17)'],
      ],
    },
    tabelaCaoVsGato: {
      kind: 'clinicalTable' as const,
      title: 'Comparativo cão × gato',
      headers: ['Aspecto', 'Cão', 'Gato'],
      rows: [
        ['PHPT frequência', 'Incomum', 'Raro'],
        ['PHPT incidental', 'Muito comum (~71% exame normal)', 'Menos (~19% assintomático)'],
        ['Massa cervical PHPT', 'Rara', '~38–57%'],
        ['Carcinoma PHPT', '~3–10%', '~22% série operada'],
        ['PU/PD PHPT', 'Comum', '<20% série'],
        ['CKD-MBD', 'Aumenta com IRIS', '~84% DRC azotêmica'],
        ['FGF23 clínico', 'Menos incorporado', 'IRIS 2026'],
        ['NSHP', 'Filhotes/dieta caseira', 'All-meat/complementares'],
        ['Tratamento PHPT', 'Cirurgia ± ablação', 'Cirurgia preferencial'],
      ],
    },
    errosComuns: [
      'PTH “normal” exclui PHPT em hipercalcêmico — deveria estar suprimido. (6)(20)',
      'Cálcio total alto ≠ iCa elevado — confirmar iCa. (6)(8)',
      'Usar fórmula de cálcio corrigido para decidir PHPT. (6)(11)',
      'DRC + PTH alto = tumor paratireoidiano automaticamente. (8)(9)',
      'Fósforo normal exclui CKD-MBD precoce. (9)(10)',
      'Furosemida em hipercalcêmico desidratado. (7)(11)',
      'Prednisona antes de investigar lymphoma. (6)(7)',
      'US “adenoma” sem histopatologia. (6)(15)',
      'Suplementar só cálcio em NSHP sem reformular dieta. (17)(21)',
      'Ca sérico normal exclui osteopenia NSHP. (17)(18)',
      'Calcitriol rotina em todo gato CKD. (4)(10)',
      'Calcitriol profilático universal pós-paratireoidectomia. (12)(22)',
      'Cinacalcete como primeira linha PHPT. (6)',
      'Assumir PHPT em todo gato hipercalcêmico sem PTH/iCa. (20)',
    ],
    perolasClinicas: [
      'iCa + PTH juntos — card de ouro da página; nunca PTH isolado. (6)(20)',
      'PHPT canino: hipercalcemia incidental é a apresentação — investigar perfil geriátrico. (6)',
      'Gato hipercalcêmico idoso: palpar cervical antes de encaminhar só oncologia. (14)(20)',
      'PTH pré-op <75 pg/mL: grupo menor risco hipocalcemia pós-op (Travail 2025). (12)',
      'Ca normal pós-op D1 não elimina queda D3–6 — orientar tutor. (6)(12)',
      'FGF23 >400 gato IRIS 2: iniciar restrição P mesmo com P sérico na meta. (10)',
      'Quelante IRIS 30–60 mg/kg/dia — produto/formulação específica importa. (9)(10)',
      'NSHP: “alimento complementar não é completo” — caso Zambarbieri 2023. (17)',
      'Rubber jaw = CKD-MBD avançado — Van Bruggen 2022 imagem CC BY. (16)',
      'CT Cordella 2022 localiza PHPT canino — histologia ainda necessária. (15)',
      'Paratireoidectomia minimamente invasiva: 50 cães Young 2023 — equipe experiente. (13)',
      'Keeshond PHPT hereditário — vigilância recorrência multiglandular. (6)',
      'Hiperparatireoidismo terciário incomum — não diagnosticar só por PTH muito alto na DRC. (6)',
      'Pamidronato adjuvante, não substituto cirurgia PHPT operável. (7)(11)',
    ],
    prognosticoPhptCao:
      'Bom após tratamento definitivo; recorrência até ~8%; carcinoma tratado cirurgicamente mediana ~2 anos sobrevida; metástase incomum. (6)',
    prognosticoPhptGato:
      'Bom pós-cirurgia; mediana ~1109 dias coorte 32 gatos; carcinoma amostra pequena — não equivaler biologicamente a adenoma. (14)(19)',
    prognosticoCkdMbd:
      'Determinado por estágio IRIS, progressão DRC, proteinúria, PA, P, anemia — PTH isolado não prognosticar. (9)(10)',
    prognosticoNshp:
      'Bom se precoce; reservado com fraturas/deformidades; ruim com compressão medular irreversível. (17)(18)',
  },

  prevention: {
    nshpPrevencao: [
      'Utilizar alimentos **completos e balanceados** para espécie e estágio de vida (FEDIAF 2025 — linkar, não copiar tabelas). (21)',
      'Receitas caseiras/raw apenas com formulação por nutricionista veterinário.',
      'Nunca alimentar filhotes/gatinhos com “só carne”, “só atum” ou complementares como dieta principal. (17)(18)',
      'Educar tutores: alimento complementar ≠ alimento completo. (17)',
    ],
    alimentoCompleto:
      'Prevenção NSHP depende de Ca, P, relação Ca:P, vitamina D e nutrientes completos — suplementar um mineral isolado em dieta mal formulada não corrige deficiências múltiplas. Preferir dietas comerciais completas certificadas ou formulação profissional. (17)(21)',
    phptScreening:
      'Cães geriátricos: hipercalcemia incidental no perfil bioquímico → confirmar iCa + PTH antes de rotular idiopática. Keeshond: vigilância familiar por predisposição hereditária. (6)',
    ckdMbdPrevencao:
      'DRC: monitorar fósforo e FGF23 (gatos) conforme IRIS; iniciar dieta renal precocemente quando indicado — controlar CKD-MBD retarda complicações ósseas e mineralização. (9)(10)',
    orientacaoTutorPhpt: [
      'Explicar que hipercalcemia incidental pode ser PHPT mesmo com animal “normal” ao exame — especialmente cães idosos. (6)',
      'Pós-paratireoidectomia: Ca normal no dia seguinte **não elimina** risco de hipocalcemia tardia (D3–6) — sinais de alerta: tremores, fasciculações, convulsão. (12)',
      'NSHP: enfatizar dieta **completa** — suplementar cálcio em receita caseira mal formulada não corrige todas as deficiências. (17)(21)',
      'CKD: fósforo normal não significa ausência de doença mineral precoce — seguir IRIS e reavaliar periodicamente. (9)(10)',
    ],
    comunicacaoRiscos: {
      phptPosOp:
        'Principal risco pós-cirurgia: hipocalcemia — orientar retorno imediato se inquietação, marcha rígida, tremores ou convulsão. Suplementação oral pode durar semanas a meses. (6)(11)(12)',
      nshpRecuperacao:
        'Melhora clínica/laboratorial pode ocorrer em semanas; mineralização radiográfica 4–8 semanas; deformidades estruturais podem persistir. (17)',
      ckdMbdLongitudinal:
        'Tratamento mineral é contínuo — adesão à dieta renal e quelantes conforme reavaliações q4–6 semanas inicialmente. (9)(10)',
    },
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'doenca-renal-cronica-caes-gatos',
    'hipoadrenocorticismo-addison',
    'hipertireoidismo-felino',
    'sindrome-cushing-caes',
    'insuficiencia-pancreatica-exocrina-caes-gatos',
  ],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-reconc-phpt-canine',
      citationText: 'Reconciliação editorial interna — Hiperparatireoidismo primário canino (2025).',
      sourceType: 'Reconciliação interna',
      url: null,
      evidenceLevel: null,
      notes: 'Referência interna de reconciliação editorial — não citar na UI.',
    },
    {
      id: 'ref-reconc-phpt-feline',
      citationText: 'Reconciliação editorial interna — Hiperparatireoidismo primário felino (2025).',
      sourceType: 'Reconciliação interna',
      url: null,
      evidenceLevel: null,
      notes: 'Referência interna de reconciliação editorial — não citar na UI.',
    },
    {
      id: 'ref-reconc-rshp-canine',
      citationText: 'Reconciliação editorial interna — Hiperparatireoidismo secundário renal canino (2025).',
      sourceType: 'Reconciliação interna',
      url: null,
      evidenceLevel: null,
      notes: 'Referência interna de reconciliação editorial — não citar na UI.',
    },
    {
      id: 'ref-reconc-rshp-feline',
      citationText: 'Reconciliação editorial interna — Hiperparatireoidismo secundário renal felino (2025).',
      sourceType: 'Reconciliação interna',
      url: null,
      evidenceLevel: null,
      notes: 'Referência interna de reconciliação editorial — não citar na UI.',
    },
    {
      id: 'ref-reconc-nshp-feline',
      citationText: 'Reconciliação editorial interna — Hiperparatireoidismo secundário nutricional felino (2026).',
      sourceType: 'Reconciliação interna',
      url: null,
      evidenceLevel: null,
      notes: 'Referência interna de reconciliação editorial — não citar na UI.',
    },
    {
      id: 'ref-nelson-couto-2020-hpt',
      citationText:
        'Nelson RW, Couto CG. Disorders of the Parathyroid Gland. In: Small Animal Internal Medicine. 6th ed. Elsevier, 2020. p. 758–766.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'PHPT, CKD-MBD, NSHP — fisiologia e clínica.',
    },
    {
      id: 'ref-dibartola-ca',
      citationText:
        'DiBartola SP. Disorders of Calcium: Hypercalcemia and Hypocalcemia. In: Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 4th ed. Elsevier.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Hiper/hipocalcemia, fluidoterapia, bisfosfonatos.',
    },
    {
      id: 'ref-bsava-nephrology-2017',
      citationText:
        'Elliott J, Grauer GF, Westropp JL (eds.). BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. BSAVA, 2017.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Ca/P na DRC; CKD-MBD.',
    },
    {
      id: 'ref-iris-dog-2026',
      citationText:
        'IRIS. Treatment Recommendations for CKD in Dogs. International Renal Interest Society, 2026.',
      sourceType: 'Diretriz',
      url: 'https://www.iris-kidney.com/s/IRIS-DOG-Treatment_Recommendations_may-2026.pdf',
      evidenceLevel: 'Alta',
      notes: 'Metas de fósforo e quelantes — cães.',
    },
    {
      id: 'ref-iris-cat-2026',
      citationText:
        'IRIS. Treatment Recommendations for CKD in Cats. International Renal Interest Society, 2026.',
      sourceType: 'Diretriz',
      url: 'https://www.iris-kidney.com/s/IRIS_CAT_Treatment_Recommendations_-2026.pdf',
      evidenceLevel: 'Alta',
      notes: 'Metas P, FGF23, dieta, quelantes — gatos.',
    },
    {
      id: 'ref-bsava-formulary-2020-hpt',
      citationText:
        'Allerton F (ed.). BSAVA Small Animal Formulary. Part A: Canine and Feline. 10th ed. BSAVA, 2020.',
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Gluconato Ca, furosemida, pamidronato, calcitriol.',
    },
    {
      id: 'ref-travail-2025',
      citationText:
        'Travail V, Motta C, Lea C, et al. Plasma parathyroid hormone as predictor of post-operative hypocalcemia after parathyroidectomy in dogs with PHPT. J Vet Intern Med. 2025;39:e70016.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/jvim.70016',
      evidenceLevel: 'Moderada',
      notes: 'PTH ≥75 pg/mL — sensibilidade 96,6%, especificidade 42,3%.',
    },
    {
      id: 'ref-young-2023',
      citationText:
        'Young KM, Degner DA. Ultrasound-guided minimally invasive parathyroidectomy in 50 dogs with PHPT. Vet Surg. 2023;52(1):18–25.',
      sourceType: 'Estudo clínico',
      url: null,
      evidenceLevel: 'Moderada',
      notes: 'Paratireoidectomia minimamente invasiva.',
    },
    {
      id: 'ref-singh-2019',
      citationText:
        'Singh A, Giuffrida MA, Thomson B, et al. Perioperative characteristics and outcome in cats with PHPT surgery. Vet Surg. 2019;48(3):367–374.',
      sourceType: 'Estudo clínico',
      url: null,
      evidenceLevel: 'Moderada',
      notes: 'Coorte 32 gatos — adenoma/carcinoma, sobrevida.',
    },
    {
      id: 'ref-cordella-2022',
      citationText:
        'Cordella A, Bertaccini J, Rondena M, Zoia A, Bertolini G. CT findings in canine primary parathyroid diseases. Vet Sci. 2022;9:273.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.3390/vetsci9060273',
      evidenceLevel: 'Moderada',
      notes: 'TC paratireoide canina — localização vs histologia.',
    },
    {
      id: 'ref-van-bruggen-2022',
      citationText:
        'Van Bruggen LW, et al. Renal secondary hyperparathyroidism in forensic cases. Forensic Sci Med Pathol. 2022;18:491–496.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1007/s12024-022-00501-5',
      evidenceLevel: 'Moderada',
      notes: 'Osteodistrofia renal — floating teeth — CC BY.',
    },
    {
      id: 'ref-zambarbieri-2023',
      citationText:
        'Zambarbieri J, Fusi E, Bassi J, Scarpa P. NSHP in a kitten with PTH measurement. J Vet Diagn Invest. 2023;35:163–167.',
      sourceType: 'Relato de caso',
      url: 'https://doi.org/10.1177/10406387221143463',
      evidenceLevel: 'Moderada',
      notes: 'Gatinho all-meat — resposta à dieta completa.',
    },
    {
      id: 'ref-skarbek-2025',
      citationText:
        'Skarbek A, Danciu C-G, Fenn J, Klever J. MR osteopenia in cat with presumed NSHP. J Small Anim Pract. 2025;66:296.',
      sourceType: 'Relato de caso',
      url: 'https://doi.org/10.1111/jsap.13815',
      evidenceLevel: 'Moderada',
      notes: 'Osteopenia difusa felina — RM.',
    },
    {
      id: 'ref-ruane-2025',
      citationText:
        'Ruane E, Odatzoglou P, Wong H, Hayes A. PHPT in cat after I131 therapy. J Small Anim Pract. 2025;66:582–586.',
      sourceType: 'Relato de caso',
      url: 'https://doi.org/10.1111/jsap.13854',
      evidenceLevel: 'Moderada',
      notes: 'PHPT felino pós-radioiodoterapia — sem inferir causalidade.',
    },
    {
      id: 'ref-parker-2015',
      citationText:
        'Parker VJ, Gilor C, Chew DJ. Feline hyperparathyroidism: primary and secondary. J Feline Med Surg. 2015;17:427–439.',
      sourceType: 'Revisão',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10816244/',
      evidenceLevel: 'Alta',
      notes: 'Revisão felina PHPT/secundário.',
    },
    {
      id: 'ref-fediaf-2025',
      citationText:
        'FEDIAF. Nutritional Guidelines for Complete and Complementary Pet Food for Cats and Dogs. Version 2025.',
      sourceType: 'Diretriz nutricional',
      url: 'https://europeanpetfood.org/self-regulation/nutritional-guidelines/',
      evidenceLevel: 'Referência',
      notes: 'Prevenção NSHP — não copiar tabelas comercialmente.',
    },
    {
      id: 'ref-armstrong-2018',
      citationText:
        'Armstrong AJ, Hauptman JG, Stanley BJ, et al. Prophylactic calcitriol after parathyroidectomy: 78 cases. J Vet Intern Med. 2018;32:99–106.',
      sourceType: 'Estudo clínico',
      url: null,
      evidenceLevel: 'Moderada',
      notes: 'Calcitriol profilático não eliminou hipocalcemia pós-op.',
    },
    {
      id: 'ref-plumbs-2023-hpt',
      citationText:
        "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook. 10th ed. Wiley/VetMedux, 2023.",
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Conferência farmacológica final.',
    },
  ],
  isPublished: true,
  source: 'seed',
};
