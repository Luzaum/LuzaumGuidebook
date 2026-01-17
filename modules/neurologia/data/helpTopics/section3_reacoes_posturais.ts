import type { HelpTopic } from '../../types/helpTopics'

export const section3ReacoesPosturais: HelpTopic[] = [
  {
    id: 'sec3-intro-propriocepcao',
    title: 'Reações posturais: visão geral (propriocepção)',
    whatItAssesses:
      'As reações posturais avaliam a integração sensório-motora: detecção de posição (propriocepção), processamento central e resposta motora para reposicionar o membro.',
    neuroanatomy:
      'Essas reações dependem de receptores proprioceptivos periféricos, nervos periféricos, medula espinhal (vias ascendentes), tronco encefálico e, para respostas conscientes, prosencéfalo. O retorno motor envolve vias descendentes (UMN/LMN).',
    howToPerform:
      'Realize o teste com o paciente em estação, em superfície antiderrapante. Faça comparações lado a lado, repita 2–3 vezes por membro e anote lateralidade. Se o animal estiver ansioso, reavalie após alguns minutos e com contenção mínima.',
    interpretation:
      'Déficit de reação postural indica disfunção em qualquer ponto do arco (periférico, medular ou encefálico). A lateralidade e o padrão (apenas pélvicos vs todos os membros) ajudam a segmentar a lesão (T3–S3 vs C1–T2 vs central).',
    pitfalls:
      'Ansiedade, dor ortopédica, sedação e piso escorregadio podem simular déficits. Não interprete sem correlacionar com marcha e reflexos. Quando aparece: Mielopatias (compressivas/inflamatórias/degenerativas), lesões encefálicas (especialmente prosencéfalo) e neuropatias periféricas significativas.',
  },
  {
    id: 'sec3-colocacao-proprioceptiva-como-fazer',
    title: 'Colocação proprioceptiva (knuckling): como executar',
    whatItAssesses:
      'Teste em que a face dorsal da pata é colocada no solo para avaliar se o animal reconhece posição anormal e corrige rapidamente.',
    neuroanatomy:
      'Exige aferência proprioceptiva periférica, condução pela medula e integração central (inclui processamento consciente) para disparar a resposta motora corretiva via vias descendentes.',
    howToPerform:
      'Flexione suavemente o carpo/tarso e coloque o dorso da pata em contato com o chão. Solte a pata e observe se o animal recoloca imediatamente na posição normal. Faça bilateralmente. Em cães grandes, pode ser útil sustentar levemente o tronco para evitar queda.',
    interpretation:
      'Correção rápida = normal. Correção lenta/ausente sugere déficit proprioceptivo (medular/central) ou fraqueza importante que impede correção. Compare com reflexos para diferenciar UMN vs LMN.',
    pitfalls:
      'Dor ortopédica e medo podem reduzir correção. Se o membro está muito fraco, pode haver "falso déficit" por incapacidade motora. Quando aparece: Lesões medulares (T3–L3 e C1–T2), lesões prosencefálicas (déficits contralaterais) e neuropatias periféricas severas.',
  },
  {
    id: 'sec3-torE-normal',
    title: 'Propriocepção torácico esquerdo: Normal',
    whatItAssesses: 'Correção rápida e consistente do posicionamento do membro torácico esquerdo em testes posturais.',
    neuroanatomy: 'Sinaliza integridade da aferência proprioceptiva, integração medular e resposta motora para o membro torácico esquerdo.',
    howToPerform:
      'Realize colocação proprioceptiva/posicionamento de apoio em 2–3 repetições. Anote se há correção imediata e simétrica ao lado direito.',
    interpretation:
      'Normalidade em torácicos com déficit em pélvicos favorece lesão caudal a T2 (T3–S3), desde que outros achados suportem.',
    pitfalls:
      'Repetições rápidas podem fatigar ou irritar o animal; mantenha técnica consistente. Quando aparece: Mielopatias toracolombares/lombossacras ou alterações restritas aos pélvicos.',
  },
  {
    id: 'sec3-torE-diminuido',
    title: 'Propriocepção torácico esquerdo: Diminuído',
    whatItAssesses: 'Correção tardia, incompleta ou inconsistente do membro torácico esquerdo.',
    neuroanatomy:
      'Pode indicar lesão em vias proprioceptivas (periférico/medular) ou integração central. Em torácicos, aumenta suspeita de lesão cervical (C1–T2) ou encefálica dependendo de outros sinais.',
    howToPerform:
      'Repita 2–3 vezes, compare com torácico direito e correlacione com marcha e reflexo de retirada torácico. Documente lateralidade e consistência.',
    interpretation:
      'Déficit apenas em torácico esquerdo com outros sinais laterais (NC, mentação) pode sugerir lesão central lateralizada. Déficit em ambos torácicos sugere lesão cervical ou encefálica difusa.',
    pitfalls:
      'Fraqueza grave pode impedir correção. Diferencie com avaliação de força e reflexos. Quando aparece: Mielopatias cervicais, lesões prosencefálicas contralaterais, neuropatias periféricas.',
  },
  {
    id: 'sec3-torE-ausente',
    title: 'Propriocepção torácico esquerdo: Ausente',
    whatItAssesses: 'Incapacidade de corrigir o posicionamento do membro torácico esquerdo.',
    neuroanatomy:
      'Sugere disfunção significativa em vias proprioceptivas/integração ou incapacidade motora severa. Em torácicos, aumenta a gravidade e a probabilidade de lesão cervical/central.',
    howToPerform:
      'Confirme com múltiplas tentativas. Avalie se o animal está consciente e se há fraqueza extrema. Correlacione com retirada torácica e sinais encefálicos.',
    interpretation:
      'Déficits severos em torácicos + pélvicos apontam para lesão cervical (C1–C5/C6–T2) ou encefálica com envolvimento motor amplo.',
    pitfalls:
      'Não confundir com paciente sedado, hipotérmico ou pós-ictal. Reavalie quando estável. Quando aparece: Trauma cervical grave, IVDD cervical importante, mielite extensa, lesões encefálicas severas.',
  },
  {
    id: 'sec3-torD-normal',
    title: 'Propriocepção torácico direito: Normal',
    whatItAssesses: 'Correção rápida e consistente do posicionamento do membro torácico direito.',
    neuroanatomy: 'Indica integridade funcional das vias proprioceptivas e resposta motora do lado direito.',
    howToPerform: 'Teste e compare com torácico esquerdo. Registre simetria.',
    interpretation: 'Torácicos normais com déficit em pélvicos reforça lesão T3–S3 (quando consistente com outros achados).',
    pitfalls:
      'Contenção excessiva pode mascarar resposta; use suporte mínimo. Quando aparece: Mielopatia toracolombar/lombossacra.',
  },
  {
    id: 'sec3-torD-diminuido',
    title: 'Propriocepção torácico direito: Diminuído',
    whatItAssesses: 'Correção tardia/inconsistente no membro torácico direito.',
    neuroanatomy:
      'Em torácicos, sugere disfunção cervical (C1–T2), encefálica (prosencéfalo contralateral) ou periférica dependendo do conjunto de sinais.',
    howToPerform: 'Repita, compare com o lado esquerdo e correlacione com marcha e retirada torácica direita.',
    interpretation:
      'Se associado a outros sinais cranianos/mentação, aumente peso para central. Se associado a retirada torácica diminuída, aumenta suspeita de C6–T2/LMN.',
    pitfalls:
      'Fraqueza/ortopédico podem reduzir correção sem déficit proprioceptivo real. Quando aparece: Mielopatias cervicais, lesões encefálicas lateralizadas, neuropatias.',
  },
  {
    id: 'sec3-torD-ausente',
    title: 'Propriocepção torácico direito: Ausente',
    whatItAssesses: 'Sem correção do posicionamento no torácico direito.',
    neuroanatomy: 'Indica déficit severo (central/medular/periférico) ou incapacidade motora grave.',
    howToPerform: 'Confirme com múltiplas tentativas e avalie nível de consciência, força e reflexos associados.',
    interpretation: 'Déficits severos bilaterais sugerem lesão cervical/encefálica importante ou doença difusa.',
    pitfalls:
      'Sedação e pós-ictal podem simular ausência. Correlacione com história. Quando aparece: Trauma/IVDD cervical grave, mielite extensa, doença encefálica grave.',
  },
  {
    id: 'sec3-pelE-normal',
    title: 'Propriocepção pélvico esquerdo: Normal',
    whatItAssesses: 'Correção rápida e consistente do posicionamento do membro pélvico esquerdo.',
    neuroanatomy: 'Indica vias proprioceptivas e resposta motora preservadas para o segmento pélvico esquerdo.',
    howToPerform: 'Teste colocação proprioceptiva do pélvico esquerdo e compare com o direito. Repita 2–3 vezes.',
    interpretation:
      'Pélvicos normais com déficits em torácicos sugere lesão cervical/plexo (menos comum em seu conjunto atual).',
    pitfalls:
      'Teste inadequado (animal sentado/deitado) pode gerar falso normal. Preferir em estação. Quando aparece: Normalidade ou alterações não envolvendo vias pélvicas.',
  },
  {
    id: 'sec3-pelE-diminuido',
    title: 'Propriocepção pélvico esquerdo: Diminuído',
    whatItAssesses: 'Correção tardia/incompleta no membro pélvico esquerdo.',
    neuroanatomy: 'Sugere disfunção em vias proprioceptivas dos pélvicos (T3–S3) ou lesão central que afete integração.',
    howToPerform: 'Repita, compare com pélvico direito e avalie associação com ataxia proprioceptiva e patelar.',
    interpretation:
      'Se apenas pélvicos têm déficit e torácicos estão normais, favorece T3–S3. Reflexo patelar aumentado sugere UMN (T3–L3); diminuído sugere LMN (L4–S3).',
    pitfalls:
      'Dor pélvica/joelho pode reduzir cooperação. Correlacione com exame ortopédico. Quando aparece: IVDD toracolombar, mielites, neoplasias espinhais, mielopatia degenerativa.',
  },
  {
    id: 'sec3-pelE-ausente',
    title: 'Propriocepção pélvico esquerdo: Ausente',
    whatItAssesses: 'Sem correção do posicionamento no pélvico esquerdo.',
    neuroanatomy:
      'Indica déficit proprioceptivo severo e/ou incapacidade motora. Em mielopatias compressivas graves, pode coexistir com perda de dor profunda.',
    howToPerform:
      'Confirme com repetição e suporte mínimo. Avalie força, patelar e nocicepção profunda se houver plegia.',
    interpretation:
      'Déficit severo em pélvicos com torácicos normais aponta para lesão T3–S3. A presença de dor profunda orienta urgência e prognóstico em compressões.',
    pitfalls:
      'Não confundir com falha por dor ortopédica; use reflexos e avaliação de dor profunda. Quando aparece: IVDD grave, trauma medular, mielite extensa, neoplasia compressiva.',
  },
  {
    id: 'sec3-pelD-normal',
    title: 'Propriocepção pélvico direito: Normal',
    whatItAssesses: 'Correção rápida e consistente no pélvico direito.',
    neuroanatomy: 'Indica integridade de vias proprioceptivas e resposta motora do lado direito nos pélvicos.',
    howToPerform: 'Teste e compare com pélvico esquerdo para avaliar simetria.',
    interpretation:
      'Normalidade bilateral nos pélvicos reduz probabilidade de mielopatia toracolombar/lombossacra significativa, mas não exclui dor espinhal isolada.',
    pitfalls:
      'Animais muito ansiosos podem "corrigir" por movimentação generalizada; mantenha contenção mínima e consistente. Quando aparece: Doenças sem acometimento proprioceptivo dos pélvicos.',
  },
  {
    id: 'sec3-pelD-diminuido',
    title: 'Propriocepção pélvico direito: Diminuído',
    whatItAssesses: 'Correção tardia/inconsistente do pélvico direito.',
    neuroanatomy:
      'Sugere disfunção das vias proprioceptivas dos pélvicos e auxilia na localização T3–S3 quando torácicos estão preservados.',
    howToPerform: 'Repita 2–3 vezes, compare com o pélvico esquerdo e integre com marcha, patelar e dor espinhal.',
    interpretation: 'Patelar aumentado sugere UMN (T3–L3). Patelar diminuído sugere LMN (L4–S3/raízes).',
    pitfalls:
      'Claudicação ortopédica não gera padrão típico de déficit postural. Confirme com outros testes. Quando aparece: IVDD, mielopatia degenerativa, mielites, tumores espinhais.',
  },
  {
    id: 'sec3-pelD-ausente',
    title: 'Propriocepção pélvico direito: Ausente',
    whatItAssesses: 'Sem correção no pélvico direito em testes posturais.',
    neuroanatomy: 'Indica disfunção grave em vias proprioceptivas/integração ou incapacidade motora severa do membro.',
    howToPerform: 'Confirme, documente lateralidade e correlacione com força/reflexos e dor profunda quando indicado.',
    interpretation:
      'Se pélvicos severamente afetados e torácicos preservados, reforça lesão T3–S3. A dor profunda define urgência/prognóstico em compressões.',
    pitfalls:
      'Sedação e dor intensa podem reduzir resposta. Reavalie após estabilização/analgesia. Quando aparece: IVDD grave, trauma, mielite extensa, compressão tumoral.',
  },
]
