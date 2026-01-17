import type { HelpTopic } from '../../types/helpTopics'

export const section5ReflexosEspinhais: HelpTopic[] = [
  {
    id: 'sec5-intro-reflexos-espinhais',
    title: 'Reflexos espinhais: visão geral',
    whatItAssesses:
      'Reflexos segmentares avaliam integridade do arco reflexo (nervo periférico → medula segmentar → nervo periférico) e ajudam a diferenciar lesões de neurônio motor superior (UMN) versus neurônio motor inferior (LMN).',
    neuroanatomy:
      'UMN (lesão acima do segmento) tende a aumentar reflexos e tônus (desinibição). LMN (lesão no segmento/raiz/nervo) reduz reflexos e tônus e causa atrofia neurogênica.',
    howToPerform:
      'Avalie com o animal relaxado, em decúbito lateral quando necessário. Compare esquerda vs direita. Documente: normal/aumentado/diminuído/ausente. Sempre correlacione com tônus, atrofia, propriocepção e marcha.',
    interpretation:
      'Reflexos aumentados com paresia sugerem UMN (ex.: T3–L3 para pélvicos). Reflexos diminuídos/ausentes sugerem LMN (ex.: L4–S3 para pélvicos; C6–T2 para torácicos).',
    pitfalls:
      'Ansiedade, dor e tensão muscular podem aumentar resistência e confundir tônus/reflexo. Sedação pode reduzir reflexos. Reavalie se necessário. Quando aparece: Mielopatias segmentares, radiculopatias, neuropatias periféricas, doenças neuromusculares.',
  },
  {
    id: 'sec5-retirada-oquee',
    title: 'Reflexo flexor/retirada (membro torácico): o que avalia',
    whatItAssesses:
      'Reflexo de retirada do membro em resposta a estímulo nociceptivo. Avalia arco reflexo periférico/segmentar e integridade de LMN do membro.',
    neuroanatomy:
      'Aferência: nociceptores → nervos periféricos. Integração: segmentos medulares cervicais (principalmente C6–T2 para torácicos). Eferência: LMN → músculos flexores.',
    howToPerform:
      'Aplique estímulo nociceptivo apropriado em dígitos (pressão firme) e observe flexão de múltiplas articulações (ombro/cotovelo/cárpica). Compare lados. Evite lesão tecidual.',
    interpretation:
      'Retirada diminuída/ausente sugere LMN (C6–T2, raiz/plexo/nervo) ou sedação profunda. Retirada aumentada pode ocorrer com UMN acima do segmento por desinibição, mas também por hiperexcitabilidade/dor.',
    pitfalls:
      'A retirada é um reflexo e não prova percepção consciente de dor. Diferencie retirada reflexa de resposta dirigida (vocalizar, virar a cabeça). Quando aparece: Lesões C6–T2, plexopatias, neuropatias, mielopatias UMN acima de C6.',
  },
  {
    id: 'sec5-retirada-esq-normal',
    title: 'Retirada torácico esquerdo: Normal',
    whatItAssesses: 'Resposta de flexão normal do membro torácico esquerdo ao estímulo nociceptivo.',
    neuroanatomy: 'Arco reflexo e LMN do membro torácico esquerdo preservados (C6–T2/plexo/nervos).',
    howToPerform: 'Estímulo firme em dígitos e observar flexão coordenada. Compare com o lado direito.',
    interpretation: 'Se há paresia com retirada normal e tônus aumentado, aumenta suspeita de UMN (lesão acima de C6).',
    pitfalls:
      'Estimulação insuficiente pode parecer normal fraco; padronize intensidade. Quando aparece: Normalidade ou lesões UMN acima do segmento.',
  },
  {
    id: 'sec5-retirada-esq-aumentado',
    title: 'Retirada torácico esquerdo: Aumentado',
    whatItAssesses: 'Resposta exagerada ou muito rápida de retirada.',
    neuroanatomy: 'Pode ocorrer por desinibição UMN acima do segmento ou por hiperexcitabilidade associada à dor/ansiedade.',
    howToPerform: 'Padronize estímulo. Observe se há hiperreflexia consistente. Correlacione com dor local e ansiedade.',
    interpretation:
      'Se associado a outros sinais UMN (tônus aumentado, propriocepção alterada), favorece lesão acima de C6. Se isolado com dor local, pode ser reatividade dolorosa.',
    pitfalls: 'Animais ansiosos reagem exageradamente. Reavalie em ambiente calmo. Quando aparece: Mielopatias cervicais altas (UMN), dor intensa.',
  },
  {
    id: 'sec5-retirada-esq-diminuido',
    title: 'Retirada torácico esquerdo: Diminuído',
    whatItAssesses: 'Retirada fraca, lenta ou incompleta do membro torácico esquerdo.',
    neuroanatomy: 'Sugere disfunção LMN (C6–T2, raiz, plexo braquial, nervos periféricos) ou efeito de sedação/fadiga.',
    howToPerform: 'Repita e compare com lado direito. Avalie tônus, atrofia e dor/lesão ortopédica.',
    interpretation:
      'Com paresia e tônus baixo, reforça LMN. Combine com achados de marcha: fraqueza flácida e diminuição de reflexos segmentares.',
    pitfalls:
      'Dor ortopédica severa pode reduzir resposta por proteção. Avalie dor e função articular. Quando aparece: Plexopatia, radiculopatia, neuropatia periférica, mielopatia C6–T2.',
  },
  {
    id: 'sec5-retirada-esq-ausente',
    title: 'Retirada torácico esquerdo: Ausente',
    whatItAssesses: 'Ausência de retirada do membro torácico esquerdo ao estímulo nociceptivo.',
    neuroanatomy: 'Indica falha importante do arco reflexo/LMN (C6–T2/plexo/nervo) ou depressão neurológica severa.',
    howToPerform: 'Confirmar com estímulo adequado e comparar com o outro lado. Avaliar sedação e nível de consciência.',
    interpretation:
      'Forte evidência para lesão LMN do membro. Correlacione com tônus baixo e possível atrofia. Se mentação gravemente alterada, pode haver supressão global.',
    pitfalls:
      'Não confundir com falta de resposta dirigida; aqui é ausência do reflexo motor. Checar técnica e sedação. Quando aparece: Avulsão/lesão grave de plexo braquial, neuropatia severa, lesão segmentar C6–T2.',
  },
  {
    id: 'sec5-retirada-dir-normal',
    title: 'Retirada torácico direito: Normal',
    whatItAssesses: 'Resposta de flexão normal do membro torácico direito ao estímulo nociceptivo.',
    neuroanatomy: 'Arco reflexo e LMN do membro torácico direito preservados.',
    howToPerform: 'Estimule dígitos e observe flexão. Compare com esquerdo.',
    interpretation: 'Retirada normal com paresia pode indicar UMN (lesão acima de C6) ou déficit não motor periférico.',
    pitfalls: 'Padronize estímulo para evitar falso normal. Quando aparece: Normalidade ou UMN acima do segmento.',
  },
  {
    id: 'sec5-retirada-dir-aumentado',
    title: 'Retirada torácico direito: Aumentado',
    whatItAssesses: 'Retirada exagerada no membro torácico direito.',
    neuroanatomy: 'Pode refletir desinibição UMN acima do segmento ou reatividade dolorosa.',
    howToPerform: 'Padronize estímulo e observe consistência. Correlacione com dor e ansiedade.',
    interpretation: 'Se houver outros sinais UMN, favorece lesão acima de C6. Isolado pode ser dor/ansiedade.',
    pitfalls: 'Ambiente e contenção aumentam reatividade. Quando aparece: Mielopatias cervicais altas, dor intensa.',
  },
  {
    id: 'sec5-retirada-dir-diminuido',
    title: 'Retirada torácico direito: Diminuído',
    whatItAssesses: 'Retirada fraca/lenta no membro torácico direito.',
    neuroanatomy: 'Sugere disfunção LMN (C6–T2/plexo/nervo) ou efeito de sedação.',
    howToPerform: 'Repita, compare e avalie tônus/atrofia/dor local.',
    interpretation: 'Com tônus baixo e paresia flácida, reforça LMN. Integre com marcha e outros reflexos.',
    pitfalls: 'Dor ortopédica pode reduzir resposta. Quando aparece: Plexopatia, neuropatia periférica, mielopatia C6–T2.',
  },
  {
    id: 'sec5-retirada-dir-ausente',
    title: 'Retirada torácico direito: Ausente',
    whatItAssesses: 'Sem retirada do membro torácico direito ao estímulo.',
    neuroanatomy: 'Indica falha grave do arco reflexo/LMN (C6–T2/plexo/nervo) ou depressão severa.',
    howToPerform: 'Confirmar com técnica adequada e comparar com o lado esquerdo. Avaliar sedação/consciência.',
    interpretation: 'Forte evidência de lesão LMN do membro. Correlacione com atrofia e perda de tônus.',
    pitfalls: 'Checar intensidade do estímulo e condição do paciente. Quando aparece: Lesões graves de plexo, neuropatias severas, lesão segmentar C6–T2.',
  },
  {
    id: 'sec5-patelar-oquee',
    title: 'Reflexo patelar (pélvico): o que avalia',
    whatItAssesses:
      'Extensão do joelho após percussão do tendão patelar. Avalia arco reflexo femoral e segmentos L4–L6 (principalmente L4–L5).',
    neuroanatomy:
      'Aferência/eferência via nervo femoral (LMN) com integração em L4–L6. Lesões UMN craniais (T3–L3) removem inibição e aumentam reflexo; lesões LMN (L4–S3) reduzem/abolam.',
    howToPerform:
      'Com o animal em decúbito lateral, mantenha o membro em leve flexão. Percuta o tendão patelar e observe extensão do joelho. Compare lados. Evite tensão excessiva.',
    interpretation:
      'Patelar aumentado sugere UMN para pélvicos (lesão T3–L3). Patelar diminuído/ausente sugere LMN (L4–S3, femoral). Combine com propriocepção e tônus.',
    pitfalls:
      'Ansiedade e tensão muscular podem aumentar reflexo. Dor no joelho ou ortopedia interfere. Patelar pode estar normal com outras disfunções (não é teste único). Quando aparece: Mielopatias toracolombares (aumentado), radiculopatias/neuropatias (diminuído), lesões lombossacras.',
  },
  {
    id: 'sec5-patelar-esq-normal',
    title: 'Patelar pélvico esquerdo: Normal',
    whatItAssesses: 'Extensão do joelho apropriada e simétrica no lado esquerdo.',
    neuroanatomy: 'Arco reflexo femoral e segmentos L4–L6 funcionais no lado esquerdo.',
    howToPerform: 'Percuta tendão patelar com membro relaxado e compare com lado direito.',
    interpretation:
      'Se há paresia pélvica com patelar normal, considere lesões UMN leves, dor, ou problemas não femorais; integre com propriocepção e nocicepção.',
    pitfalls: 'Tensão muscular pode mascarar. Ajuste posição do membro. Quando aparece: Normalidade ou lesões fora de L4–L6.',
  },
  {
    id: 'sec5-patelar-esq-aumentado',
    title: 'Patelar pélvico esquerdo: Aumentado',
    whatItAssesses: 'Extensão exagerada/repetitiva no lado esquerdo.',
    neuroanatomy: 'Sugerindo desinibição UMN acima de L4 (tipicamente T3–L3) para pélvicos.',
    howToPerform: 'Padronize percussão, compare com direito e correlacione com tônus aumentado.',
    interpretation:
      'Com paresia e propriocepção alterada em pélvicos, aumenta suspeita de lesão T3–L3. Se há também ataxia proprioceptiva, reforça mielopatia toracolombar.',
    pitfalls: 'Ansiedade pode aumentar reflexos. Reavaliar com paciente relaxado. Quando aparece: IVDD T3–L3, mielopatias compressivas/degenerativas.',
  },
  {
    id: 'sec5-patelar-esq-diminuido',
    title: 'Patelar pélvico esquerdo: Diminuído',
    whatItAssesses: 'Extensão fraca/lenta no lado esquerdo.',
    neuroanatomy: 'Sugere envolvimento LMN em L4–S3, nervo femoral ou musculatura do quadríceps.',
    howToPerform: 'Confirme com repetição, compare com direito e avalie tônus/atrofia de quadríceps.',
    interpretation:
      'Com paresia flácida, propriocepção alterada e patelar diminuído, reforça lesão L4–S3/LMN. Considere também radiculopatia lombar.',
    pitfalls: 'Dor no joelho ou ruptura de ligamento pode interferir na resposta. Quando aparece: Doença lombossacra, neuropatia femoral, polineuropatia.',
  },
  {
    id: 'sec5-patelar-esq-ausente',
    title: 'Patelar pélvico esquerdo: Ausente',
    whatItAssesses: 'Sem extensão do joelho no lado esquerdo.',
    neuroanatomy: 'Indica falha do arco reflexo femoral/LMN (L4–L6) ou lesão muscular severa.',
    howToPerform: 'Confirme técnica/posição, compare com outro lado, avalie atrofia e tônus.',
    interpretation:
      'Fortemente sugestivo de lesão LMN (L4–S3) no lado afetado. Integre com bexiga e cauda se houver sinais lombossacros.',
    pitfalls: 'Sedação intensa e dor podem reduzir resposta. Reavaliar se necessário. Quando aparece: Lesão severa lombar/raízes, neuropatia femoral grave, trauma.',
  },
  {
    id: 'sec5-patelar-dir-normal',
    title: 'Patelar pélvico direito: Normal',
    whatItAssesses: 'Resposta patelar apropriada e simétrica no lado direito.',
    neuroanatomy: 'Arco reflexo femoral e segmentos L4–L6 preservados no lado direito.',
    howToPerform: 'Percuta tendão patelar e compare com esquerdo.',
    interpretation: 'Paresia com patelar normal exige integração com propriocepção e dor profunda para localização/prognóstico.',
    pitfalls: 'Posicionamento inadequado pode gerar falso normal. Quando aparece: Normalidade ou lesões fora de L4–L6.',
  },
  {
    id: 'sec5-patelar-dir-aumentado',
    title: 'Patelar pélvico direito: Aumentado',
    whatItAssesses: 'Resposta patelar exagerada no lado direito.',
    neuroanatomy: 'Sugere desinibição UMN para pélvicos (lesão T3–L3).',
    howToPerform: 'Padronize estímulo e compare. Correlacione com tônus aumentado e propriocepção.',
    interpretation: 'Com déficits posturais pélvicos e dor toracolombar, reforça T3–L3.',
    pitfalls: 'Tensão/ansiedade aumentam reflexo. Quando aparece: Mielopatias toracolombares.',
  },
  {
    id: 'sec5-patelar-dir-diminuido',
    title: 'Patelar pélvico direito: Diminuído',
    whatItAssesses: 'Resposta patelar reduzida no lado direito.',
    neuroanatomy: 'Sugere LMN (L4–S3) ou nervo femoral no lado direito.',
    howToPerform: 'Repita, compare e avalie quadríceps/tônus.',
    interpretation: 'Com paresia flácida e possível atrofia, reforça lesão lombossacra/LMN.',
    pitfalls: 'Dor no joelho interfere. Quando aparece: Doenças lombossacras e neuropatias.',
  },
  {
    id: 'sec5-patelar-dir-ausente',
    title: 'Patelar pélvico direito: Ausente',
    whatItAssesses: 'Sem resposta patelar no lado direito.',
    neuroanatomy: 'Falha severa do arco reflexo femoral (L4–L6) / LMN no lado direito.',
    howToPerform: 'Confirme técnica, compare lado oposto e avalie sinais de LMN.',
    interpretation: 'Fortemente sugestivo de lesão LMN direita. Integre com sinais urinários/cauda se presentes.',
    pitfalls: 'Sedação intensa e dor podem reduzir reflexo. Quando aparece: Trauma, radiculopatias graves, neuropatia femoral severa.',
  },
  {
    id: 'sec5-panniculus-oquee',
    title: 'Reflexo cutâneo do tronco (panniculus): o que avalia',
    whatItAssesses:
      'Contração do músculo cutâneo do tronco após estímulo cutâneo; usado para localizar nível aproximado de lesão medular toracolombar (cutoff).',
    neuroanatomy:
      'Aferência entra nos segmentos toracolombares; eferência via nervo torácico lateral para o músculo cutâneo. Lesões medulares interrompem vias ascendentes, criando "cutoff" alguns segmentos caudal ao local real da lesão.',
    howToPerform:
      'Com o animal em estação ou decúbito, pinçe levemente a pele ao longo do tronco de caudal para cranial (bilateral). Observe contração/tremor cutâneo. Identifique ponto onde a resposta "retorna" (cutoff caudal à lesão).',
    interpretation:
      'Presença de cutoff sugere lesão entre T3–L3. O nível do cutoff é geralmente 1–2 segmentos caudal ao local da lesão (estimativa, não exata).',
    pitfalls:
      'Obesidade, pelagem espessa, ansiedade e estímulo fraco dificultam. Não confundir com tremor por estresse. Quando aparece: IVDD toracolombar, trauma, mielites/tumores toracolombares.',
  },
  {
    id: 'sec5-panniculus-normal',
    title: 'Panniculus: Normal',
    whatItAssesses: 'Contração cutânea presente ao estímulo ao longo do tronco, sem ponto de corte.',
    neuroanatomy:
      'Sugere integridade funcional do circuito do panniculus e ausência de interrupção significativa das vias ascendentes no tronco.',
    howToPerform: 'Estimule do caudal ao cranial bilateralmente e observe resposta consistente.',
    interpretation:
      'Não exclui mielopatia (especialmente se lesão não toracolombar ou se técnica limitada). Integre com propriocepção e marcha.',
    pitfalls: 'Estimulação inadequada pode dar falso normal. Padronize. Quando aparece: Normalidade ou lesões fora do eixo toracolombar significativo.',
  },
  {
    id: 'sec5-panniculus-cutoff',
    title: 'Panniculus: Corte (cutoff)',
    whatItAssesses:
      'Presença de um ponto no tronco a partir do qual a contração cutânea não ocorre caudalmente, mas volta a ocorrer cranialmente.',
    neuroanatomy:
      'Indica interrupção das vias ascendentes associadas à lesão medular. O cutoff costuma ser observado caudal ao nível real da lesão por anatomia segmentar.',
    howToPerform:
      'Marque mentalmente o nível onde a resposta retorna (cutoff). Repita dos dois lados para confirmar. Registre o nível aproximado (região/vertebra).',
    interpretation: 'Sugere fortemente lesão toracolombar (T3–L3). Use para guiar imagem e palpação direcionada.',
    pitfalls:
      'Pode ser impreciso por variação anatômica e técnica. Não use como única forma de localizar. Quando aparece: IVDD T3–L3, trauma toracolombar, tumores/mielites nessa região.',
  },
  {
    id: 'sec5-panniculus-ausente',
    title: 'Panniculus: Ausente',
    whatItAssesses: 'Ausência de contração cutânea ao estímulo ao longo do tronco.',
    neuroanatomy:
      'Pode indicar lesão extensa/difusa, falha do circuito periférico (nervo torácico lateral/músculo cutâneo) ou depressão global (sedação).',
    howToPerform:
      'Confirme com estímulo adequado e paciente relaxado. Verifique se há resposta cranial (perto de escápulas) e se o animal está sedado.',
    interpretation:
      'Se compatível com outros sinais de mielopatia grave, aumenta gravidade. Se isolado, revise técnica e considere sedação ou fatores periféricos.',
    pitfalls:
      'Muito comum falso negativo por técnica/pelagem/obesidade. Repetir e correlacionar. Quando aparece: Lesões extensas, polineuropatias, sedação profunda.',
  },
]
