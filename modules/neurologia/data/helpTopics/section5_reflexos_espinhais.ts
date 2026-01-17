import type { HelpTopic } from '../../types/helpTopics'

export const section5ReflexosEspinhais: HelpTopic[] = [
  {
    id: 's5-reflexos-geral',
    title: 'Reflexos espinhais (visão geral) — UMN vs LMN',
    whatItAssesses:
      'Avalia integridade do arco reflexo segmentar (aferência periférica → medula segmentar → eferência periférica) e auxilia a diferenciar sinais de neurônio motor superior (UMN) de neurônio motor inferior (LMN). Reflexos são fundamentais para neurolocalização medular: permitem separar lesão acima do segmento (UMN: reflexos aumentados) de lesão no segmento/raiz/nervo (LMN: reflexos diminuídos/ausentes).',
    neuroanatomy:
      'UMN: vias descendentes (ex.: corticoespinal/reticuloespinal) modulam e inibem arcos reflexos segmentares. LMN: corpo celular no corno ventral, raiz ventral, plexo e nervos periféricos. UMN lesado → perda de inibição → hiperreflexia/hipertonia. LMN lesado → falha do arco reflexo → hiporreflexia/hipotonia/atrofia neurogênica.',
    howToPerform:
      'Paciente preferencialmente em decúbito lateral, relaxado. Executar teste de forma padronizada e comparar lados (E/D). Registrar: normal/aumentado/diminuído/ausente. Correlacionar com tônus, atrofia, marcha e propriocepção.',
    interpretation:
      'Reflexos pélvicos aumentados sugerem lesão cranial a L4 (tipicamente T3–L3). Reflexos pélvicos diminuídos sugerem L4–S3 (LMN). Reflexos torácicos diminuídos sugerem C6–T2. Use sempre em conjunto com propriocepção e nervos cranianos.',
    pitfalls:
      'Ansiedade/dor aumentam reflexos e tônus; sedação reduz reflexos. Posição do membro inadequada altera resposta. Não comparar lados causa erro de interpretação.',
    tags: ['reflexos', 'UMN', 'LMN', 'arco-reflexo', 'segmentar', 'hiperreflexia', 'hiporreflexia'],
    severityWeight: 2,
    localizationHint: ['UMN-T3-L3', 'LMN-L4-S3', 'LMN-C6-T2'],
  },
  {
    id: 's5-retirada-toracico-oquee',
    title: 'Reflexo flexor/retirada (membro torácico) — o que avalia',
    whatItAssesses:
      'Reflexo de flexão do membro em resposta a estímulo nociceptivo distal. Avalia arco reflexo e função LMN do membro torácico. Ajuda a identificar lesões segmentares C6–T2, plexo braquial e nervos periféricos. Também ajuda a diferenciar UMN vs LMN em membros torácicos quando integrado ao tônus e à marcha.',
    neuroanatomy:
      'Aferência nociceptiva periférica → medula cervical (principalmente C6–T2) → interneurônios → LMN → nervos periféricos → músculos flexores. É um reflexo medular: pode ocorrer sem percepção consciente. A intensidade pode aumentar com desinibição UMN ou com dor/ansiedade.',
    howToPerform:
      'Com o animal em decúbito, aplicar estímulo nociceptivo controlado em dígitos (pressão firme, sem lesionar). Observar flexão coordenada de múltiplas articulações. Repetir e comparar lados.',
    interpretation:
      'Diminuído/ausente sugere LMN (C6–T2/plexo/nervo). Aumentado pode ocorrer em lesão UMN acima de C6, mas também por reatividade dolorosa. Não usar retirada como prova de dor profunda.',
    pitfalls:
      'Confundir retirada reflexa com dor profunda; estímulo fraco gera falso "diminuído"; paciente tenso gera falso "aumentado".',
  },
  {
    id: 's5-retirada-toracico-esq-normal',
    title: 'Retirada torácico esquerdo — Normal',
    whatItAssesses:
      'Resposta reflexa de retirada normal do membro torácico esquerdo. Serve como controle lateral e auxilia a definir se há disfunção LMN ipsilateral.',
    neuroanatomy: 'Arco reflexo íntegro envolvendo segmentos C6–T2 e nervos periféricos do lado esquerdo. Reflexo segmentar preservado; não depende do córtex.',
    howToPerform: 'Estimular dígitos do membro esquerdo com intensidade padronizada e observar flexão consistente.',
    interpretation:
      'Se houver paresia com retirada normal e tônus aumentado, sugere UMN (lesão acima de C6). Se retirada normal e sem paresia, compatível com normalidade.',
    pitfalls: 'Não padronizar estímulo e comparar com lado direito.',
  },
  {
    id: 's5-retirada-toracico-esq-aumentado',
    title: 'Retirada torácico esquerdo — Aumentado',
    whatItAssesses:
      'Retirada exagerada/hiperativa do membro torácico esquerdo. Pode apontar desinibição UMN acima de C6, mas precisa ser distinguido de reatividade dolorosa.',
    neuroanatomy:
      'Possível desinibição de vias descendentes (UMN) que normalmente modulam arcos reflexos cervicais. Perda de inibição UMN → hiperreflexia; dor/ansiedade também aumentam resposta.',
    howToPerform: 'Padronizar estímulo e observar se a resposta é consistentemente exagerada. Correlacionar com tônus e outros sinais UMN.',
    interpretation:
      'Se associado a tônus aumentado e déficits posturais, favorece lesão UMN cranial a C6. Se isolado e paciente reativo, pode ser dor/ansiedade.',
    pitfalls: 'Concluir UMN sem avaliar tônus, marcha e propriocepção.',
  },
  {
    id: 's5-retirada-toracico-esq-diminuido',
    title: 'Retirada torácico esquerdo — Diminuído',
    whatItAssesses:
      'Retirada fraca/lenta do membro torácico esquerdo. Sinal clássico de disfunção LMN (C6–T2/plexo/nervo).',
    neuroanatomy: 'Arco reflexo comprometido em C6–T2, raízes/plexo braquial ou nervos periféricos. Falha do arco reflexo → menor recrutamento muscular.',
    howToPerform: 'Repetir teste, avaliar tônus e atrofia. Comparar com lado direito.',
    interpretation: 'Com hipotonia/atrofia, reforça LMN. Se o animal está sedado, considerar efeito farmacológico.',
    pitfalls: 'Dor ortopédica severa pode reduzir uso do membro e parecer déficit neurológico.',
  },
  {
    id: 's5-retirada-toracico-esq-ausente',
    title: 'Retirada torácico esquerdo — Ausente',
    whatItAssesses:
      'Ausência de retirada no membro torácico esquerdo ao estímulo nociceptivo. Sugere lesão LMN severa do membro torácico (plexo/raízes/nervo) ou depressão neurológica global importante.',
    neuroanatomy: 'Falha grave do arco reflexo C6–T2/plexo/nervo periférico. Sem condução aferente/eferente suficiente para gerar resposta motora reflexa.',
    howToPerform: 'Confirmar técnica e intensidade adequada; avaliar sedação/consciência e outros reflexos do mesmo membro.',
    interpretation: 'Forte evidência de LMN no membro. Correlacionar com hipotonia, atrofia e perda de sensibilidade local.',
    pitfalls: 'Estimulação inadequada, paciente sedado ou com dor sistêmica intensa pode confundir.',
  },
  {
    id: 's5-retirada-toracico-dir-normal',
    title: 'Retirada torácico direito — Normal',
    whatItAssesses:
      'Resposta reflexa normal do membro torácico direito. Controle lateral e suporte para interpretação de lateralização.',
    neuroanatomy: 'Arco reflexo C6–T2 direito preservado. Reflexo segmentar íntegro.',
    howToPerform: 'Mesmo método do lado esquerdo, comparando intensidade e velocidade.',
    interpretation: 'Paresia com retirada normal sugere UMN cranial ao segmento; retirada normal não exclui doença encefálica.',
    pitfalls: 'Não comparar com o lado oposto.',
  },
  {
    id: 's5-retirada-toracico-dir-aumentado',
    title: 'Retirada torácico direito — Aumentado',
    whatItAssesses:
      'Resposta exagerada no membro torácico direito. Pode refletir UMN acima de C6 ou reatividade dolorosa/ansiosa.',
    neuroanatomy: 'Desinibição UMN ou hiperexcitabilidade periférica por dor. Hiperreflexia por perda de modulação descendente ou por estímulo exagerado.',
    howToPerform: 'Padronizar estímulo, correlacionar com tônus e reações posturais.',
    interpretation: 'Sustenta UMN se houver hipertonia e déficits posturais; caso contrário considerar dor/ansiedade.',
    pitfalls: 'Concluir UMN sem avaliação global.',
  },
  {
    id: 's5-retirada-toracico-dir-diminuido',
    title: 'Retirada torácico direito — Diminuído',
    whatItAssesses:
      'Retirada reduzida no membro torácico direito. Sinal de LMN (C6–T2/plexo/nervo) no lado direito.',
    neuroanatomy: 'Arco reflexo alterado em C6–T2/plexo/nervo periférico. Recrutamento motor insuficiente por falha reflexa.',
    howToPerform: 'Repetir; avaliar tônus e possível atrofia. Comparar com esquerdo.',
    interpretation: 'Reforça LMN se associado a hipotonia/atrofia. Pode ser influenciado por sedação.',
    pitfalls: 'Dor ortopédica confunde interpretação.',
  },
  {
    id: 's5-retirada-toracico-dir-ausente',
    title: 'Retirada torácico direito — Ausente',
    whatItAssesses:
      'Ausência de retirada do membro torácico direito. Aponta lesão LMN severa do membro torácico direito ou depressão global grave.',
    neuroanatomy: 'Falha grave do arco reflexo em C6–T2/plexo/nervo. Arco reflexo interrompido.',
    howToPerform: 'Confirmar técnica; considerar sedação/estupor; correlacionar com outros reflexos do membro.',
    interpretation: 'Forte evidência de LMN direita; correlacionar com marcha e tônus.',
    pitfalls: 'Estímulo insuficiente ou técnica inconsistente.',
  },
  {
    id: 's5-patelar-oquee',
    title: 'Reflexo patelar (pélvico) — o que avalia',
    whatItAssesses:
      'Extensão do joelho após percussão do tendão patelar. Avalia nervo femoral e segmentos L4–L6 (principalmente L4–L5). É o reflexo mais útil para diferenciar lesões UMN (T3–L3) de LMN (L4–S3) em membros pélvicos.',
    neuroanatomy:
      'Aferência/eferência via nervo femoral; integração em L4–L6. UMN cranial a L4 remove inibição → hiperreflexia. Lesão em L4–L6/femoral reduz arco reflexo → hiporreflexia.',
    howToPerform: 'Animal em decúbito lateral, membro em leve flexão. Percutir tendão patelar e observar extensão do joelho. Comparar lados.',
    interpretation:
      'Aumentado + paresia pélvica → suspeitar T3–L3. Diminuído/ausente → suspeitar L4–S3/femoral/plexo lombar.',
    pitfalls: 'Tensão muscular ou posição errada do membro. Dor articular/ortopédica altera resposta.',
    tags: ['patelar', 'reflexo-pelvico', 'femoral', 'L4-L6', 'UMN', 'LMN', 'T3-L3', 'L4-S3'],
    severityWeight: 3,
    localizationHint: ['UMN-T3-L3', 'LMN-L4-S3', 'femoral', 'plexo-lombar'],
  },
  {
    id: 's5-patelar-esq-normal',
    title: 'Patelar esquerdo — Normal',
    whatItAssesses:
      'Arco reflexo patelar esquerdo preservado. Serve como controle e auxilia na lateralização de LMN.',
    neuroanatomy: 'Nervo femoral e segmentos L4–L6 íntegros no lado esquerdo. Reflexo segmentar funcional.',
    howToPerform: 'Percutir tendão patelar com membro relaxado. Comparar com direito.',
    interpretation:
      'Se há paresia com patelar normal, considerar UMN leve, dor, ou lesões fora de L4–L6. Integrar com propriocepção e panniculus.',
    pitfalls: 'Falso normal por técnica inadequada.',
  },
  {
    id: 's5-patelar-esq-aumentado',
    title: 'Patelar esquerdo — Aumentado',
    whatItAssesses:
      'Hiperreflexia patelar esquerda. Sinal clássico de UMN para membros pélvicos (lesão T3–L3).',
    neuroanatomy:
      'Arco patelar intacto (L4–L6) com perda de modulação descendente (lesão cranial). Desinibição UMN → resposta exagerada.',
    howToPerform: 'Padronizar percussão. Correlacionar com hipertonia e propriocepção alterada.',
    interpretation: 'Com paresia/ataxia pélvica, reforça T3–L3. Se bilateral, sugere lesão midline/compressiva.',
    pitfalls: 'Ansiedade/tensão aumentam reflexo e confundem.',
  },
  {
    id: 's5-patelar-esq-diminuido',
    title: 'Patelar esquerdo — Diminuído',
    whatItAssesses:
      'Hiporreflexia patelar esquerda. Sugere lesão LMN (L4–S3) ou nervo femoral/plexo lombar.',
    neuroanatomy: 'Comprometimento do arco reflexo (femoral/L4–L6) no lado esquerdo. Falha do arco reflexo → contração reduzida do quadríceps.',
    howToPerform: 'Repetir com posicionamento correto; avaliar atrofia de quadríceps e tônus.',
    interpretation:
      'Com paresia flácida e hipotonia, reforça LMN. Integrar com reflexo de retirada pélvico (se disponível) e função urinária.',
    pitfalls: 'Dor de joelho (ortopédica) reduz extensão e simula hiporreflexia.',
  },
  {
    id: 's5-patelar-esq-ausente',
    title: 'Patelar esquerdo — Ausente',
    whatItAssesses:
      'Ausência de reflexo patelar esquerdo. Forte evidência de lesão LMN no arco femoral/L4–L6 ou lesão muscular severa.',
    neuroanatomy: 'Arco reflexo patelar (femoral/L4–L6) interrompido no lado esquerdo. Sem disparo reflexo efetivo do quadríceps.',
    howToPerform: 'Confirmar técnica e posição. Avaliar quadríceps e tônus. Comparar com direito.',
    interpretation:
      'Reforça lesão lombar/plexo/nervo periférico. Se bilateral, pensar em polineuropatia/lesão lombossacra extensa.',
    pitfalls: 'Sedação intensa, hipotermia ou técnica falha podem reduzir reflexo.',
  },
  {
    id: 's5-patelar-dir-normal',
    title: 'Patelar direito — Normal',
    whatItAssesses:
      'Arco patelar direito preservado. Permite comparação lateral e ajuda a detectar lesão unilateral.',
    neuroanatomy: 'Femoral e L4–L6 íntegros no lado direito. Reflexo segmentar funcional.',
    howToPerform: 'Percutir tendão patelar direito e comparar com esquerdo.',
    interpretation: 'Integre com propriocepção e marcha para neurolocalização completa.',
    pitfalls: 'Não relaxar o membro leva a falso normal/alterado.',
  },
  {
    id: 's5-patelar-dir-aumentado',
    title: 'Patelar direito — Aumentado',
    whatItAssesses:
      'Hiperreflexia patelar direita. Sugere UMN cranial a L4 (T3–L3) no controle dos pélvicos.',
    neuroanatomy: 'Arco intacto (L4–L6) com desinibição descendente. Perda de modulação UMN → reflexo exagerado.',
    howToPerform: 'Padronizar percussão; correlacionar com hipertonia e propriocepção.',
    interpretation: 'Com paresia/ataxia pélvica, reforça T3–L3. Bilateral reforça lesão central.',
    pitfalls: 'Ansiedade e dor aumentam resposta.',
  },
  {
    id: 's5-patelar-dir-diminuido',
    title: 'Patelar direito — Diminuído',
    whatItAssesses:
      'Hiporreflexia patelar direita. Sugere LMN direita (L4–S3/femoral/plexo).',
    neuroanatomy: 'Comprometimento do arco femoral/L4–L6 à direita. Falha reflexa reduz extensão do joelho.',
    howToPerform: 'Repetir e comparar. Avaliar quadríceps e tônus.',
    interpretation: 'Com hipotonia/atrofia, reforça LMN. Se bilateral, pensar em doença lombossacra difusa.',
    pitfalls: 'Dor ortopédica confunde.',
  },
  {
    id: 's5-patelar-dir-ausente',
    title: 'Patelar direito — Ausente',
    whatItAssesses:
      'Ausência de reflexo patelar direito. Forte evidência de LMN no arco patelar direito.',
    neuroanatomy: 'Arco reflexo femoral/L4–L6 interrompido. Sem disparo reflexo do quadríceps.',
    howToPerform: 'Confirmar técnica/posição; correlacionar com tônus/atrofia e história.',
    interpretation: 'Refina neurolocalização para L4–S3 (ou femoral/plexo).',
    pitfalls: 'Sedação/hipotermia reduzem reflexos.',
  },
  {
    id: 's5-panniculus-oquee',
    title: 'Reflexo cutâneo do tronco (panniculus) — o que avalia',
    whatItAssesses:
      'Contração do músculo cutâneo do tronco em resposta a estímulo cutâneo; útil para estimar nível de lesão toracolombar por presença de cutoff. Ajuda a localizar segmento suspeito em mielopatias toracolombares (especialmente T3–L3) e orientar imagem/palpação.',
    neuroanatomy:
      'Aferência entra em segmentos toracolombares; eferência via nervo torácico lateral para o músculo cutâneo. Cutoff tende a ocorrer alguns segmentos caudal ao local real. Interrupção de vias ascendentes → ausência caudal ao cutoff; retorno cranial indica segmentos acima preservados.',
    howToPerform:
      'Pinçar pele ao longo do tronco (bilateral) do caudal para cranial até observar retorno da resposta. Registrar nível onde a resposta retorna (cutoff).',
    interpretation: 'Cutoff sugere lesão T3–L3. Usar como estimativa, não localização exata.',
    pitfalls:
      'Falso negativo por pelagem/obesidade, estímulo fraco, ansiedade e técnica inconsistente.',
  },
  {
    id: 's5-panniculus-normal',
    title: 'Panniculus — Normal',
    whatItAssesses:
      'Resposta presente ao longo do tronco sem ponto de corte. Sugere ausência de interrupção significativa das vias avaliadas nessa faixa do tronco.',
    neuroanatomy: 'Circuito periférico e medular preservado ao longo do tronco. Vias ascendentes e eferentes funcionais para o reflexo.',
    howToPerform: 'Pinçar pele bilateralmente do caudal ao cranial e observar contração cutânea.',
    interpretation:
      'Não exclui mielopatia (especialmente se lesão não toracolombar). Integre com propriocepção e marcha.',
    pitfalls: 'Falso normal por observação inadequada do músculo cutâneo.',
  },
  {
    id: 's5-panniculus-cutoff',
    title: 'Panniculus — Corte (cutoff)',
    whatItAssesses:
      'Presença de um nível no tronco onde a resposta está ausente caudalmente e retorna cranialmente. É um dos achados mais práticos para orientar neurolocalização toracolombar.',
    neuroanatomy:
      'Interrupção de vias ascendentes associadas a lesão medular toracolombar. Falha de condução ascendente impede resposta caudal; retorno cranial indica via preservada acima.',
    howToPerform: 'Confirmar bilateralmente, repetir para consistência e registrar nível aproximado.',
    interpretation: 'Sugere fortemente lesão entre T3–L3. Serve para guiar RM/TC/estudo radiográfico.',
    pitfalls: 'Assumir nível exato (é estimativa). Técnica pobre gera cutoff falso.',
  },
  {
    id: 's5-panniculus-ausente',
    title: 'Panniculus — Ausente',
    whatItAssesses:
      'Ausência de resposta ao longo do tronco. Pode sugerir lesão extensa/difusa, falha periférica do circuito ou depressão global.',
    neuroanatomy:
      'Possível envolvimento difuso de vias ou falha periférica do músculo cutâneo/nervo. Sem resposta reflexa por falha do circuito ou supressão global.',
    howToPerform:
      'Confirmar técnica e intensidade, avaliar se há sedação profunda e checar em regiões cranializadas.',
    interpretation: 'Interpretar com cautela; correlacionar com quadro geral e outros reflexos.',
    pitfalls: 'Falso negativo por pelagem/obesidade/estímulo fraco.',
  },
]
