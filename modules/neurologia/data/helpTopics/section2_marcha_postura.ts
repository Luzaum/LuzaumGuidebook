import type { HelpTopic } from '../../types/helpTopics'

export const section2MarchaPostura: HelpTopic[] = [
  {
    id: 'sec2-deambulacao-ambulatorio',
    title: 'Capacidade de deambular: Ambulatório',
    whatItAssesses: 'O paciente consegue caminhar sem apoio, mesmo que com alterações (ataxia/paresia).',
    neuroanatomy:
      'A marcha depende de integração proprioceptiva (vias ascendentes), controle motor (vias descendentes UMN/LMN), cerebelo (coordenação) e sistema vestibular (equilíbrio).',
    howToPerform:
      'Avalie em piso antiderrapante e em linha reta, depois em círculos, mudança de direção e em diferentes superfícies (quando seguro). Observe tropeços, cruzamento de membros e quedas.',
    interpretation:
      'Ser ambulatório não exclui lesão significativa. A qualidade da marcha (ataxia vs paresia, vestibular vs proprioceptiva) é o que direciona a neurolocalização.',
    pitfalls:
      'Dor ortopédica pode simular paresia. Palpe articulações, avalie claudicação e dor à manipulação. Quando aparece: Muitas mielopatias leves/moderadas e síndromes vestibulares compensadas.',
  },
  {
    id: 'sec2-deambulacao-comapoio',
    title: 'Capacidade de deambular: Com apoio',
    whatItAssesses: 'O paciente só consegue caminhar se sustentado (cinta/toalha) ou se apoiando em paredes/móveis.',
    neuroanatomy:
      'Sugere déficit motor significativo (UMN/LMN) e/ou ataxia severa (proprioceptiva/vestibular).',
    howToPerform:
      'Teste com suporte mínimo apenas para evitar queda. Avalie se há tentativa de gerar passos, se há arraste de unhas e se o padrão piora com viradas.',
    interpretation:
      'É marcador de gravidade funcional. A presença/ausência de dor espinhal e o padrão de reflexos ajudam a distinguir medula vs neuromuscular vs vestibular.',
    pitfalls:
      'Animais com medo podem "não colaborar". Reavalie em ambiente mais calmo e após analgesia se dor. Quando aparece: Mielopatias moderadas a graves, vestibular intenso, fraqueza neuromuscular.',
  },
  {
    id: 'sec2-deambulacao-naoambulatorio',
    title: 'Capacidade de deambular: Não ambulatório',
    whatItAssesses: 'O paciente não consegue sustentar-se em estação ou dar passos funcionais.',
    neuroanatomy:
      'Pode ocorrer por lesões medulares graves, neuromusculares, vestibulares severas ou dor intensa. O padrão UMN vs LMN e a nocicepção profunda são críticos para prognóstico.',
    howToPerform:
      'Avalie tentativas de levantar, postura em estação com suporte, e se há movimento voluntário em membros. Em seguida, avance para propriocepção, reflexos espinhais e dor profunda (com técnica adequada).',
    interpretation:
      'Red flag relativa. Se associado a dor espinhal severa e déficits progressivos, priorize imagem (RM/TC) quando possível. Se há perda de dor profunda, isso muda urgência e prognóstico em mielopatias compressivas.',
    pitfalls:
      'Dor ortopédica severa pode impedir deambulação sem déficit neurológico primário. Diferencie por reflexos/propriocepção e dor à manipulação ortopédica. Quando aparece: IVDD grave, trauma, mielite grave, polirradiculoneurite, miastenia grave, botulismo.',
  },
  {
    id: 'sec2-deambulacao-plegia',
    title: 'Capacidade de deambular: Plegia',
    whatItAssesses: 'Paralisia: ausência de movimento voluntário em um segmento (para/tetra-plegia) conforme o conjunto de membros.',
    neuroanatomy:
      'Plegia sugere lesão grave em vias motoras (UMN/LMN), medula espinhal ou doença neuromuscular severa. A presença de reflexos (aumentados vs diminuídos) diferencia UMN vs LMN.',
    howToPerform:
      'Confirme ausência de movimento voluntário (não confundir com tremor/reflexo). Avalie tônus, reflexos segmentares e, se indicado, nocicepção profunda.',
    interpretation:
      'Plegia + reflexos aumentados sugere UMN (lesão acima do segmento). Plegia + reflexos diminuídos/ausentes sugere LMN (segmento/raiz/nervo). Dor profunda é prognóstico-chave em compressões medulares.',
    pitfalls:
      'Paciente muito dolorido pode "não mexer". Verifique se há retirada reflexa e resposta à dor. Quando aparece: Trauma medular, IVDD grave, mielite extensa, polirradiculoneurite, botulismo.',
  },
  {
    id: 'sec2-toracicos-normal',
    title: 'Membros torácicos: Normal',
    whatItAssesses: 'Marcha e suporte dos membros torácicos sem ataxia/paresia/arraste.',
    neuroanatomy:
      'Normalidade em torácicos com alteração em pélvicos sugere lesão caudal a T2 (ex.: T3–L3, L4–S3) ou lesão vestibular/encefálica com predomínio posterior.',
    howToPerform: 'Observe passada, posicionamento das patas, desgaste de unhas e tropeços. Teste viradas e marcha lenta/rápida.',
    interpretation: 'Útil para neurolocalização medular: pélvicos alterados com torácicos normais aponta para T3–S3.',
    pitfalls:
      'Alterações sutis podem passar despercebidas. Use reações posturais para confirmar. Quando aparece: Mielopatias toracolombares e lombossacras.',
  },
  {
    id: 'sec2-toracicos-ataxia',
    title: 'Membros torácicos: Ataxia',
    whatItAssesses: 'Incoordenação dos torácicos: passos cruzados, base alargada/estreita, tropeços e erros de posicionamento.',
    neuroanatomy:
      'Ataxia pode ser proprioceptiva (vias ascendentes), vestibular (equilíbrio) ou cerebelar (coordenação/hipermetria). Em torácicos, sugere envolvimento cervical (C1–T2) ou encefálico/vestibular.',
    howToPerform:
      'Observe em linha reta e em círculos. Procure "knuckling" intermitente e passos hipermétricos. Correlacione com propriocepção.',
    interpretation:
      'Ataxia torácica + pélvica com propriocepção alterada favorece lesão cervical (C1–C5 ou C6–T2). Ataxia torácica com head tilt/nistagmo sugere vestibular.',
    pitfalls:
      'Claudicação ortopédica não é ataxia. Ataxia envolve erro de posicionamento e variabilidade de passos. Quando aparece: Mielopatia cervical, vestibular, cerebelar, encefalites.',
  },
  {
    id: 'sec2-toracicos-paresia',
    title: 'Membros torácicos: Paresia',
    whatItAssesses: 'Fraqueza dos torácicos: redução de força, arraste, incapacidade de sustentar peso adequadamente.',
    neuroanatomy:
      'Paresia pode ser UMN (lesão acima de C6 para torácicos) ou LMN (C6–T2, raízes, nervos periféricos). A diferenciação depende de reflexos (não incluídos no seu step para torácicos além do flexor).',
    howToPerform: 'Observe apoio, extensão do carpo, arraste de unhas, fadiga. Teste estação e marcha curta com mudança de direção.',
    interpretation:
      'Paresia torácica + pélvica sugere lesão cervical ou doença neuromuscular difusa. Se flexor/retirada torácica está diminuído, aumenta suspeita de C6–T2/LMN.',
    pitfalls:
      'Dor ortopédica pode reduzir uso do membro, simulando fraqueza. Diferencie por propriocepção e padrão de reflexos. Quando aparece: Mielopatia cervical, plexopatia, neuropatia periférica, miastenia grave.',
  },
  {
    id: 'sec2-toracicos-plegia',
    title: 'Membros torácicos: Plegia',
    whatItAssesses: 'Paralisia dos torácicos: ausência de movimento voluntário.',
    neuroanatomy:
      'Sugere lesão grave cervical (C1–T2) ou doença neuromuscular severa. Se pélvicos também estão piores, pense em lesão alta (C1–C5) ou difusa.',
    howToPerform: 'Confirme ausência de movimento voluntário. Avalie retirada reflexa, tônus e sensibilidade nociceptiva apropriada.',
    interpretation:
      'Plegia torácica é emergência neurológica. Se houver alteração respiratória, priorize estabilização e suspeite de lesões cervicais altas ou neuromusculares graves.',
    pitfalls:
      'Não confundir com "não cooperação". Verifique reflexos e resposta à dor. Quando aparece: Trauma cervical, IVDD cervical grave, mielite extensa, polirradiculoneurite avançada, botulismo.',
  },
  {
    id: 'sec2-pelvicos-normal',
    title: 'Membros pélvicos: Normal',
    whatItAssesses: 'Marcha e suporte dos pélvicos sem ataxia/paresia/arraste.',
    neuroanatomy:
      'Pélvicos normais com torácicos alterados sugere lesão cervical/encefálica focal, porém é menos comum; em geral, alterações isoladas de torácicos apontam para C6–T2/plexo.',
    howToPerform: 'Observe passada, arraste de unhas e tropeços. Teste viradas e marcha lenta.',
    interpretation: 'Ajuda a segmentar: se torácicos alterados e pélvicos normais, considere C6–T2 ou neuropatia/ortopédico em torácicos.',
    pitfalls: 'Alterações discretas de pélvicos podem surgir somente em testes posturais. Quando aparece: Lesões segmentares em torácicos/plexo.',
  },
  {
    id: 'sec2-pelvicos-ataxia',
    title: 'Membros pélvicos: Ataxia',
    whatItAssesses: 'Incoordenação dos pélvicos: passos cruzados, base anormal, tropeços, erros de posicionamento e arraste ocasional.',
    neuroanatomy:
      'Ataxia pélvica com torácicos normais favorece lesão T3–S3 (medula toracolombar/lombossacra). Se também há vestibular (head tilt/nistagmo), pode ser central/periférico.',
    howToPerform:
      'Observe em linha reta e em círculos; procure "knuckling" e atraso de correção postural. Correlacione com propriocepção dos pélvicos.',
    interpretation:
      'Ataxia proprioceptiva pélvica (tipoAtaxia=proprioceptiva) sugere vias ascendentes em T3–L3. Se reflexo patelar aumentado pode apontar UMN; se diminuído, LMN (L4–S3).',
    pitfalls:
      'Dor ortopédica causa claudicação, não "erro de posicionamento". Teste propriocepção para confirmar. Quando aparece: IVDD toracolombar, mielopatia degenerativa, mielites, tumores espinhais.',
  },
  {
    id: 'sec2-pelvicos-paresia',
    title: 'Membros pélvicos: Paresia',
    whatItAssesses: 'Fraqueza em pélvicos: redução de força, dificuldade de levantar, arraste, colapso parcial.',
    neuroanatomy:
      'Paresia pélvica pode ser UMN (T3–L3) ou LMN (L4–S3). UMN: tônus e reflexos tendem a estar aumentados; LMN: diminuídos.',
    howToPerform: 'Avalie levantar/sentar, sustentação em estação, marcha e capacidade de subir/virar. Correlacione com reflexos (patelar) e dor espinhal.',
    interpretation:
      'Se patelar está aumentado com propriocepção alterada e dor toracolombar, favorece T3–L3. Se patelar diminuído/ausente e dor lombossacra, favorece L4–S3/cauda equina.',
    pitfalls:
      'Fraqueza por doença sistêmica (metabólica) pode ser generalizada. Diferencie pelo padrão segmentar e reflexos. Quando aparece: IVDD, trauma, mielite, neoplasia espinhal, síndrome da cauda equina.',
  },
  {
    id: 'sec2-pelvicos-plegia',
    title: 'Membros pélvicos: Plegia',
    whatItAssesses: 'Paralisia em pélvicos: ausência de movimento voluntário.',
    neuroanatomy:
      'Plegia pélvica sugere lesão medular grave (T3–S3) ou neuropatia severa. A presença/ausência de dor profunda é crítica em compressões medulares para prognóstico.',
    howToPerform:
      'Confirme ausência de movimento voluntário. Avalie tônus, patelar, retirada, e dor profunda (se indicado). Avalie bexiga (retenção) se houver suspeita medular.',
    interpretation:
      'Plegia + dor toracolombar severa sugere compressão discal/trauma. Plegia + patelar diminuído sugere LMN (L4–S3) e pode envolver raízes/cauda equina.',
    pitfalls:
      'Não confundir com incapacidade por dor ortopédica; reflexos e propriocepção ajudam a diferenciar. Quando aparece: IVDD grave, trauma medular, mielite extensa, tumores espinhais, FCE grave.',
  },
  {
    id: 'sec2-ataxia-ausente',
    title: 'Tipo de ataxia: Ausente',
    whatItAssesses:
      'Não há evidência de incoordenação; se há alteração, ela é predominantemente fraqueza (paresia) ou claudicação ortopédica.',
    neuroanatomy: 'Ataxia é defeito de coordenação; paresia é defeito de força. Distinguir melhora a neurolocalização.',
    howToPerform: 'Reavalie em diferentes velocidades e com viradas. Se ainda não há tropeços/erros de posicionamento, marque como ausente.',
    interpretation: 'Paresia sem ataxia pode ocorrer em doenças neuromusculares, lesões motoras puras ou casos iniciais de mielopatia.',
    pitfalls: 'Ataxia leve pode passar despercebida sem testes posturais. Quando aparece: Fraqueza por neuromuscular/metabólico, ou mielopatias iniciais.',
  },
  {
    id: 'sec2-ataxia-proprioceptiva',
    title: 'Tipo de ataxia: Proprioceptiva',
    whatItAssesses:
      'Incoordenação por falha na percepção de posição dos membros: tropeços, arraste de unhas, atraso de correção postural ("knuckling").',
    neuroanatomy:
      'Envolve vias proprioceptivas conscientes (colunas dorsais) e inconscientes, além de integração em tronco e córtex. Lesões medulares são causa comum.',
    howToPerform:
      'Observe marcha, desgaste de unhas e teste reações posturais (colocação proprioceptiva). Procure erros de posicionamento e resposta tardia.',
    interpretation:
      'Se predomina em pélvicos com torácicos normais → T3–S3. Se em todos os membros → lesão cervical (C1–T2) ou encefálica/vestibular central dependendo de outros sinais.',
    pitfalls:
      'Claudicação ortopédica não gera "knuckling" típico nem déficit em reações posturais do mesmo padrão. Quando aparece: Mielopatias (IVDD, mielite, neoplasia), compressões medulares.',
  },
  {
    id: 'sec2-ataxia-vestibular',
    title: 'Tipo de ataxia: Vestibular',
    whatItAssesses: 'Desequilíbrio com tendência a cair/rolar para um lado, base alargada e possível head tilt, nistagmo e náusea.',
    neuroanatomy:
      'Causada por disfunção do sistema vestibular (orelha interna, nervo VIII, núcleos vestibulares no tronco, conexões cerebelares).',
    howToPerform:
      'Observe queda lateral, head tilt, nistagmo em repouso e durante mudança de posição. Avalie se há vômito/hipersalivação.',
    interpretation:
      'Mentação normal e ausência de déficits posturais marcantes favorecem vestibular periférico. Mentação alterada e déficits posturais importantes favorecem vestibular central (tronco/cerebelo).',
    pitfalls:
      'Ataxia proprioceptiva severa pode parecer "desequilíbrio". Procure nistagmo/head tilt e diferencie com reações posturais. Quando aparece: Otite média/interna, vestibular idiopático, AVC de tronco, encefalites.',
  },
  {
    id: 'sec2-ataxia-cerebelar',
    title: 'Tipo de ataxia: Cerebelar',
    whatItAssesses:
      'Incoordenação por falha de modulação cerebelar: hipermetria, passos exagerados, tremor de intenção, base ampla, força relativamente preservada.',
    neuroanatomy:
      'O cerebelo ajusta amplitude, timing e coordenação fina do movimento. Lesões cerebelares geram dismetria e tremor sem fraqueza primária significativa.',
    howToPerform:
      'Observe hipermetria em marcha lenta, tremor ao alcançar alimento, movimentos "saltitantes". Combine com tipoAtaxia e (futuramente) testes cerebelares.',
    interpretation:
      'Se tipoAtaxia=cerebelar, aumentar peso para cerebelo/vestibular central. Procure também nistagmo e sinais de tronco.',
    pitfalls:
      'Ataxia proprioceptiva pode ser confundida. A cerebelar tem hipermetria/tremor de intenção mais típicos. Quando aparece: Malformações, degenerações, neoplasias, cerebelites/encefalites.',
  },
]
