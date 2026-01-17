import type { HelpTopic } from '../../types/helpTopics'

export const section6DorNocicepcao: HelpTopic[] = [
  {
    id: 'sec6-intro-dor-nocicepcao',
    title: 'Dor e nocicepção: visão geral',
    whatItAssesses:
      'Avaliação de dor espinhal (dor à palpação) e de nocicepção, especialmente dor profunda, que tem grande valor prognóstico em mielopatias compressivas graves.',
    neuroanatomy:
      'Dor profunda envolve vias nociceptivas profundas (incluindo tratos espinotalâmicos e outras vias ascendentes) e requer integração central para resposta dirigida. A dor espinhal sugere inflamação/compressão meníngea, radiculopatia ou lesão vertebral/discal.',
    howToPerform:
      'Avalie dor de forma segura e graduada. Diferencie reflexo de retirada (medular) de resposta consciente (vocalizar, virar a cabeça, tentar morder). Para palpação de coluna, aplique pressão progressiva e observe postura, tensão e vocalização.',
    interpretation:
      'Perda de dor profunda em pélvicos com plegia é red flag e muda urgência/prognóstico em compressões medulares. Dor espinhal focal ajuda a direcionar segmento suspeito (cervical vs toracolombar vs lombossacra).',
    pitfalls:
      'Ansiedade e manipulação podem causar vocalização sem dor real. Sedação pode mascarar dor. Sempre correlacione com exame ortopédico e histórico. Quando aparece: IVDD, trauma, meningite, neoplasias espinhais, instabilidades vertebrais.',
  },
  {
    id: 'sec6-dorprofunda-oquee',
    title: 'Dor profunda (nocicepção): o que avalia',
    whatItAssesses:
      'Percepção consciente de estímulo doloroso intenso em estruturas profundas (ex.: falange) — diferente do reflexo de retirada.',
    neuroanatomy:
      'Aferência nociceptiva profunda ascende pela medula para centros superiores. Requer integridade significativa da medula (múltiplas vias) e processamento central para resposta consciente.',
    howToPerform:
      'Aplique estímulo nociceptivo intenso e seguro (pressão firme em dígito com pinça hemostática protegida, evitando lesão). Observe resposta dirigida: virar a cabeça, vocalizar de forma específica, tentar morder. Não interpretar apenas retirada do membro.',
    interpretation:
      'Presente: melhor prognóstico em compressões graves (quando comparado à ausência). Ausente: prognóstico mais reservado e urgência maior em casos compressivos agudos. "Duvidoso" indica necessidade de repetição e avaliação por examinador experiente.',
    pitfalls:
      'Retirada reflexa NÃO é dor profunda. Sedação, choque, hipotermia e estupor reduzem resposta consciente. Quando aparece: Principalmente em avaliação de paraplegia/tetraplegia por lesões medulares graves.',
  },
  {
    id: 'sec6-dorprofunda-presente',
    title: 'Dor profunda: Presente',
    whatItAssesses: 'Há resposta consciente dirigida ao estímulo doloroso intenso.',
    neuroanatomy: 'Indica preservação de vias nociceptivas profundas e integração central.',
    howToPerform: 'Confirme com estímulo adequado e observe resposta dirigida (não apenas retirada).',
    interpretation:
      'Em mielopatias compressivas graves, presença de dor profunda é um dos melhores marcadores prognósticos funcionais quando comparado à ausência.',
    pitfalls: 'Interpretação pode variar; se dúvida, marque como duvidoso e repita. Quando aparece: Paraparesia/paraplegia com preservação parcial medular.',
  },
  {
    id: 'sec6-dorprofunda-ausente',
    title: 'Dor profunda: Ausente',
    whatItAssesses: 'Não há resposta consciente dirigida ao estímulo nociceptivo profundo, apesar de técnica adequada.',
    neuroanatomy: 'Sugere comprometimento medular severo (vias profundas) ou depressão central importante.',
    howToPerform:
      'Confirme técnica e evite lesão. Verifique se o paciente está sedado/estuporoso. Diferencie retirada reflexa de resposta consciente.',
    interpretation:
      'Red flag: em compressões agudas graves, ausência de dor profunda está associada a pior prognóstico e aumenta urgência diagnóstica/terapêutica. Documente tempo de evolução e progressão.',
    pitfalls:
      'Sedação, hipotermia e choque podem abolir resposta. Reavaliar após estabilização. Quando aparece: IVDD grave, trauma medular severo, mielite extensa.',
  },
  {
    id: 'sec6-dorprofunda-duvidoso',
    title: 'Dor profunda: Duvidoso',
    whatItAssesses: 'Não é possível confirmar resposta consciente dirigida com segurança no momento.',
    neuroanatomy:
      'A interpretação depende de distinguir reflexo de retirada (medular) de percepção consciente (central).',
    howToPerform:
      'Repita com técnica padronizada, em ambiente calmo, com avaliador experiente. Considere analgesia prévia e estabilização hemodinâmica/temperatura.',
    interpretation:
      'Use como alerta: planeje reavaliação seriada e priorize outros dados (reflexos, tônus, propriocepção, imagem) para conduzir o caso.',
    pitfalls:
      'Vocalização inespecífica por medo pode confundir. A resposta deve ser dirigida ao estímulo. Quando aparece: Pacientes muito estressados, sedados, doloridos ou com consciência alterada.',
  },
  {
    id: 'sec6-palpacao-cervical-ausente',
    title: 'Palpação de coluna: Dor cervical ausente',
    whatItAssesses: 'Não há evidência de dor à palpação/manipulação cervical.',
    neuroanatomy: 'Ausência de dor não exclui mielopatia cervical (pode existir compressão sem dor).',
    howToPerform:
      'Palpe musculatura paravertebral e processos espinhosos cervicais com pressão progressiva. Observe resistência, vocalização, rigidez e postura antálgica.',
    interpretation:
      'Se há tetraparesia/ataxia com dor cervical ausente, ainda considere mielopatia cervical compressiva/degenerativa. Integre com marcha e reflexos torácicos.',
    pitfalls: 'Paciente ansioso pode "travar" sem dor. Faça movimentos suaves. Quando aparece: Mielopatias cervicais sem componente doloroso evidente.',
  },
  {
    id: 'sec6-palpacao-cervical-leve',
    title: 'Palpação de coluna: Dor cervical leve',
    whatItAssesses: 'Desconforto discreto à palpação cervical.',
    neuroanatomy: 'Pode indicar doença discal cervical leve, dor muscular ou irritação meníngea inicial.',
    howToPerform: 'Pressão progressiva e observação de sinais sutis (tensão, evitar movimento, olhar para o local).',
    interpretation:
      'Com déficits neurológicos em torácicos/pélvicos, aumenta suspeita de origem cervical. Com sinais sistêmicos (febre), considere meningite/meningoencefalite.',
    pitfalls: 'Dor miofascial não é sempre neurológica. Correlacione com exame ortopédico. Quando aparece: IVDD cervical inicial, dor muscular, meningite.',
  },
  {
    id: 'sec6-palpacao-cervical-moderada',
    title: 'Palpação de coluna: Dor cervical moderada',
    whatItAssesses: 'Dor evidente com resistência e/ou vocalização ao palpar/manipular região cervical.',
    neuroanatomy: 'Compatível com radiculopatia cervical, IVDD cervical, meningite ou trauma.',
    howToPerform: 'Evite manipulação excessiva. Observe postura (cabeça baixa, rigidez). Considere analgesia antes de testes adicionais.',
    interpretation:
      'Com déficits neurológicos e dor cervical moderada, priorize lesão cervical. Se febre/rigidez generalizada, investigue meningite/meningoencefalite.',
    pitfalls: 'Dor pode ser referida de ombro/torácica. Correlacione com exame ortopédico. Quando aparece: IVDD cervical, meningite, trauma cervical.',
  },
  {
    id: 'sec6-palpacao-cervical-severa',
    title: 'Palpação de coluna: Dor cervical severa',
    whatItAssesses: 'Dor intensa com vocalização forte, espasmo e resistência marcante.',
    neuroanatomy: 'Sugere doença discal/instabilidade/trauma severo, ou meningite importante. Pode acompanhar déficits neurológicos graves.',
    howToPerform: 'Interrompa manipulação agressiva. Priorize analgesia e segurança. Considere emergência (risco de compressão severa/instabilidade).',
    interpretation:
      'Red flag. Direciona investigação urgente (imagem) e manejo analgésico. Se houver tetraparesia progressiva, suspeite compressão grave.',
    pitfalls:
      'Reatividade por medo pode aumentar vocalização, mas severidade com rigidez e postura antálgica sustenta dor real. Quando aparece: IVDD cervical grave, fraturas/luxações, meningite severa.',
  },
  {
    id: 'sec6-palpacao-tl-ausente',
    title: 'Palpação de coluna: Dor toracolombar ausente',
    whatItAssesses: 'Sem dor evidente à palpação toracolombar.',
    neuroanatomy: 'Mielopatias toracolombares podem ocorrer sem dor (ex.: algumas compressões crônicas/degenerativas).',
    howToPerform:
      'Palpe processos espinhosos e musculatura paravertebral T3–L3 com pressão progressiva, observando sinais sutis.',
    interpretation:
      'Se há paresia/ataxia pélvica com dor ausente, ainda considere T3–L3 e use reflexos (patelar/panniculus) para sustentar localização.',
    pitfalls: 'Palpação muito suave pode perder dor discreta. Repita com técnica consistente. Quando aparece: Mielopatias toracolombares sem componente doloroso.',
  },
  {
    id: 'sec6-palpacao-tl-leve',
    title: 'Palpação de coluna: Dor toracolombar leve',
    whatItAssesses: 'Desconforto discreto em T3–L3.',
    neuroanatomy: 'Pode indicar doença discal toracolombar inicial ou dor muscular.',
    howToPerform: 'Pressão progressiva e observação de sinais sutis (tensão/evitação).',
    interpretation: 'Com ataxia/paresia pélvica, reforça segmento toracolombar como fonte provável.',
    pitfalls: 'Dor ortopédica de quadril/lombo pode ser confundida. Quando aparece: IVDD inicial, dor muscular, instabilidade leve.',
  },
  {
    id: 'sec6-palpacao-tl-moderada',
    title: 'Palpação de coluna: Dor toracolombar moderada',
    whatItAssesses: 'Dor evidente à palpação toracolombar com resistência/vocalização.',
    neuroanatomy: 'Compatível com IVDD toracolombar, trauma local, meningite focal, neoplasia espinhal.',
    howToPerform: 'Evite excessos. Registre nível aproximado de maior dor. Considere analgesia e investigação direcionada.',
    interpretation: 'Com paresia/ataxia pélvica e patelar aumentado, reforça T3–L3 compressivo/inflamatório.',
    pitfalls: 'Dor pode ser referida. Correlacione com panniculus e propriocepção. Quando aparece: IVDD T3–L3, trauma, tumores.',
  },
  {
    id: 'sec6-palpacao-tl-severa',
    title: 'Palpação de coluna: Dor toracolombar severa',
    whatItAssesses: 'Dor intensa com espasmo e vocalização marcante em região toracolombar.',
    neuroanatomy: 'Sugere compressão/lesão severa (IVDD grave, fratura/luxação, compressão tumoral aguda).',
    howToPerform: 'Priorize analgesia e segurança. Evite manipulação vigorosa. Se déficit neurológico progressivo, trate como emergência.',
    interpretation:
      'Red flag, especialmente se associada a paraparesia/paraplegia. Direciona necessidade de imagem e intervenção rápida quando indicado.',
    pitfalls:
      'Ansiedade pode amplificar resposta, mas severidade com espasmo e postura antálgica sustenta dor real. Quando aparece: IVDD extrusiva grave, trauma, instabilidade vertebral.',
  },
  {
    id: 'sec6-palpacao-ls-ausente',
    title: 'Palpação de coluna: Dor lombossacra ausente',
    whatItAssesses: 'Sem dor evidente em região lombossacra.',
    neuroanatomy: 'Síndrome lombossacra pode existir com dor variável; ausência não exclui.',
    howToPerform: 'Palpe L7–S1 e músculos adjacentes. Avalie dor à extensão de quadril e manipulação suave da cauda (se aplicável).',
    interpretation:
      'Se há sinais LMN pélvicos (patelar diminuído) e disfunção urinária, considere lombossacra mesmo sem dor marcante.',
    pitfalls: 'Dor pode ser intermitente; correlacione com história de dor ao levantar/subir. Quando aparece: Alguns casos crônicos ou compensados.',
  },
  {
    id: 'sec6-palpacao-ls-leve',
    title: 'Palpação de coluna: Dor lombossacra leve',
    whatItAssesses: 'Desconforto discreto em região lombossacra.',
    neuroanatomy: 'Pode indicar síndrome lombossacra inicial/cauda equina ou dor muscular local.',
    howToPerform: 'Pressão progressiva e avaliação de postura. Teste extensão de quadril com cuidado.',
    interpretation: 'Com sinais LMN pélvicos (reflexos diminuídos) e/ou dor ao levantar, aumenta suspeita de cauda equina.',
    pitfalls: 'Dor de quadril/joelho pode ser confundida com lombossacra. Quando aparece: Doença lombossacra inicial.',
  },
  {
    id: 'sec6-palpacao-ls-moderada',
    title: 'Palpação de coluna: Dor lombossacra moderada',
    whatItAssesses: 'Dor evidente em L7–S1 com resistência/vocalização.',
    neuroanatomy: 'Compatível com compressão radicular/cauda equina, instabilidade lombossacra, estenose.',
    howToPerform: 'Evite manipulação excessiva. Documente nível e reproduza com técnica consistente. Considere analgesia antes de testes adicionais.',
    interpretation:
      'Com reflexos pélvicos diminuídos e disfunção urinária, reforça L4–S3/cauda equina como localização provável.',
    pitfalls: 'Dor pode ser de quadril; diferencie com exame ortopédico. Quando aparece: Síndrome da cauda equina, estenose lombossacra.',
  },
  {
    id: 'sec6-palpacao-ls-severa',
    title: 'Palpação de coluna: Dor lombossacra severa',
    whatItAssesses: 'Dor intensa em região lombossacra, frequentemente com espasmo e aversão à extensão de quadril.',
    neuroanatomy: 'Sugere compressão severa de raízes/cauda equina ou instabilidade importante.',
    howToPerform: 'Priorize analgesia e contenção segura. Evite provocar dor repetidamente. Planeje investigação direcionada (imagem).',
    interpretation:
      'Red flag, especialmente se houver déficits LMN, cauda flácida ou alterações urinárias. Direciona manejo mais agressivo e imagem.',
    pitfalls: 'Dor severa pode impedir exame completo. Reavaliar após analgesia. Quando aparece: Estenose lombossacra grave, compressões radiculares severas.',
  },
]
