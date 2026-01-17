import type { HelpTopic } from '../../types/helpTopics'

export const section6DorNocicepcao: HelpTopic[] = [
  {
    id: 's6-dor-nocicepcao-geral',
    title: 'Dor e nocicepção (visão geral) — por que isso muda tudo',
    whatItAssesses:
      'Avalia (1) dor à palpação/manipulação da coluna (dor espinhal/radicular) e (2) percepção dolorosa profunda (nocicepção consciente), com alto valor prognóstico em mielopatias compressivas graves. Dor espinhal direciona segmento suspeito e sugere etiologias compressivas/inflamatórias/traumáticas. Dor profunda é um dos marcadores mais relevantes para prognóstico e urgência em paraplegia/tetraplegia por lesão medular aguda.',
    neuroanatomy:
      'Dor superficial/profunda: nociceptores periféricos → nervos periféricos → medula → vias ascendentes (incluindo tratos espinotalâmicos e vias multissinápticas) → tronco/tálamo/córtex. Dor espinhal envolve estruturas vertebrais, discos, ligamentos, meninges e raízes nervosas (radiculopatia). Nocicepção profunda exige condução ascendente suficiente e integração central para produzir resposta comportamental dirigida. Retirada é reflexo segmentar e pode persistir sem percepção consciente.',
    howToPerform:
      'Faça de forma progressiva e segura. Diferencie retirada reflexa (medular) de resposta consciente dirigida (vira a cabeça, vocaliza de forma específica, tenta morder). Registre lateralidade, segmento e intensidade (leve/moderada/severa).',
    interpretation:
      'Dor espinhal focal + déficits neurológicos = priorizar lesão compressiva local (ex.: IVDD, fratura/luxação, neoplasia). Dor profunda ausente em paciente paraplégico sugere comprometimento medular grave e pior prognóstico, elevando urgência diagnóstica/terapêutica.',
    pitfalls:
      'Confundir vocalização por medo com dor verdadeira; confundir retirada reflexa com dor profunda; estimular demais e causar lesão; avaliar sob sedação intensa sem considerar efeito.',
  },
  {
    id: 's6-dor-profunda-oquee',
    title: 'Dor profunda (nocicepção) — o que avalia e como testar corretamente',
    whatItAssesses:
      'Percepção consciente de estímulo doloroso intenso aplicado em estruturas profundas (ex.: falange), distinguindo de reflexos medulares. Em compressões medulares graves, a presença/ausência de dor profunda é um dos principais indicadores prognósticos e influencia urgência e escolha terapêutica.',
    neuroanatomy:
      'Aferência nociceptiva profunda → medula → vias ascendentes profundas/multissinápticas → tronco/tálamo/córtex. A resposta dirigida depende de integração central. Retirada = reflexo segmentar (não prova consciência). Dor profunda = percepção cortical (ou pelo menos subcortical integrada) com comportamento dirigido.',
    howToPerform:
      'Aplicar estímulo nociceptivo intenso e controlado em dígito (pressão firme na falange com instrumento protegido). Observar resposta dirigida: virar a cabeça, vocalizar de forma específica, tentativa de morder/retirar o corpo. Não considerar apenas retirada do membro.',
    interpretation:
      'Presente: sugere preservação de vias profundas e prognóstico funcional melhor que ausência. Ausente: sugere lesão medular severa (ou depressão global), com prognóstico mais reservado em muitos quadros compressivos agudos.',
    pitfalls:
      'Interpretar retirada como dor profunda; aplicar estímulo fraco; testar em paciente sedado/hipotérmico/choque e concluir ausência.',
  },
  {
    id: 's6-dor-profunda-presente',
    title: 'Dor profunda — Presente',
    whatItAssesses:
      'Confirma que o paciente percebe conscientemente o estímulo doloroso profundo. Melhora estratificação prognóstica e ajuda a priorizar investigação conforme gravidade.',
    neuroanatomy: 'Vias nociceptivas profundas preservadas, com integração central. Condução ascendente e processamento central suficientes para comportamento dirigido.',
    howToPerform: 'Confirmar resposta dirigida (vira a cabeça/vocaliza dirigida/tenta morder). Repetir rapidamente no outro lado se necessário.',
    interpretation:
      'Em paraplegia por mielopatia compressiva aguda, presença geralmente se associa a chance maior de recuperação funcional do que ausência.',
    pitfalls: 'Considerar qualquer vocalização como dirigida; o comportamento deve estar claramente relacionado ao estímulo.',
  },
  {
    id: 's6-dor-profunda-ausente',
    title: 'Dor profunda — Ausente (RED FLAG)',
    whatItAssesses:
      'Não há resposta consciente dirigida ao estímulo nociceptivo profundo (com técnica correta). É red flag prognóstica e pode indicar necessidade de ação rápida em casos compressivos agudos severos.',
    neuroanatomy:
      'Vias nociceptivas profundas comprometidas ou depressão central importante. Falha de transmissão/integração das vias profundas impede percepção consciente.',
    howToPerform:
      'Confirmar técnica, avaliar se o paciente está sedado/estuporoso/hipotérmico. Diferenciar retirada reflexa de percepção. Idealmente confirmar por examinador experiente.',
    interpretation:
      'Sugere comprometimento medular severo em muitos cenários. Associar ao tempo de evolução e progressão. Eleva urgência para imagem e decisão terapêutica quando indicado.',
    pitfalls: 'Concluir ausência em paciente sedado/choque; usar estímulo inadequado; não correlacionar com mentação.',
  },
  {
    id: 's6-dor-profunda-duvidoso',
    title: 'Dor profunda — Duvidoso',
    whatItAssesses:
      'Não é possível afirmar com segurança presença/ausência de resposta consciente dirigida. Evita erro crítico. O correto é repetir e integrar com outros achados e evolução.',
    neuroanatomy:
      'A distinção depende de separar reflexo medular de resposta comportamental central. Respostas podem ser suprimidas por sedação, choque, fadiga, estresse extremo ou alteração de consciência.',
    howToPerform:
      'Repetir teste em ambiente calmo, com contenção mínima, avaliador experiente. Reavaliar após estabilização (temperatura, perfusão, analgesia adequada).',
    interpretation: 'Tratar como alerta: planejar reavaliações seriadas e priorizar imagem/monitoramento conforme quadro.',
    pitfalls: 'Forçar interpretação; repetir estímulo excessivamente e lesionar tecido.',
  },
  {
    id: 's6-dor-coluna-cervical-oquee',
    title: 'Palpação de coluna cervical — o que avalia',
    whatItAssesses:
      'Dor à palpação e manipulação cervical (músculos paravertebrais, processos espinhosos, mobilidade), sugerindo dor espinhal/radicular nessa região. Dor cervical focal orienta lesões compressivas (ex.: IVDD cervical), inflamatórias (meningite), traumáticas (instabilidade/fratura) ou radiculopatias.',
    neuroanatomy:
      'Estruturas dolorosas: discos, ligamentos, articulações facetárias, músculos, meninges e raízes nervosas cervicais. Dor radicular pode causar hiperestesia e resistência ao movimento. Inflamação meníngea pode gerar rigidez e dor difusa.',
    howToPerform:
      'Palpar suavemente musculatura e processos, aumentar pressão gradualmente. Observar rigidez, espasmo, postura antálgica (cabeça baixa), vocalização, tentativa de escapar. Evitar manipulações bruscas.',
    interpretation:
      'Dor cervical + déficits em 4 membros sugere mielopatia cervical. Dor cervical intensa com mentação alterada/febre sugere meningite/encefalite. Dor ausente não exclui doença cervical.',
    pitfalls: 'Confundir medo com dor; não avaliar ortopedia de ombro; manipular demais em suspeita de instabilidade.',
  },
  {
    id: 's6-dor-coluna-cervical-ausente',
    title: 'Dor cervical — Ausente',
    whatItAssesses:
      'Sem evidência de dor à palpação/manipulação cervical no momento. Ajuda a diferenciar mielopatias dolorosas vs não dolorosas, mas não exclui doença.',
    neuroanatomy: 'Dor pode não estar presente mesmo com compressão medular cervical. Algumas mielopatias degenerativas/compressivas crônicas podem ter pouca dor.',
    howToPerform: 'Palpação progressiva e observação de sinais sutis (tensão/evitação).',
    interpretation: 'Se há tetraparesia/ataxia com dor ausente, ainda considerar lesão cervical e usar reflexos/propriocepção para localização.',
    pitfalls: 'Pressão insuficiente ou paciente muito calmo pode mascarar dor leve.',
  },
  {
    id: 's6-dor-coluna-cervical-leve',
    title: 'Dor cervical — Leve',
    whatItAssesses:
      'Desconforto discreto em região cervical. Pode indicar doença discal inicial, dor muscular ou inflamação meníngea leve.',
    neuroanatomy: 'Músculos paravertebrais, discos cervicais, raízes nervosas. Hiperestesia pode ser radicular ou miofascial.',
    howToPerform: 'Pressão progressiva e observação de sinais sutis (tensão, evitar flexão/extensão).',
    interpretation: 'Com déficits neurológicos, reforça foco cervical. Sem déficits, considerar ortopedia/mialgia.',
    pitfalls: 'Interpretar como neurológico primário sem exame ortopédico.',
  },
  {
    id: 's6-dor-coluna-cervical-moderada',
    title: 'Dor cervical — Moderada',
    whatItAssesses:
      'Dor evidente com resistência e/ou vocalização. Aumenta probabilidade de IVDD, radiculopatia ou meningite, dependendo do contexto.',
    neuroanatomy: 'Disco/meninges/raízes cervicais; articulações facetárias. Dor gera espasmo, rigidez e resposta protetora.',
    howToPerform: 'Evitar movimentos amplos. Documentar nível de maior dor. Considerar analgesia antes de repetir testes.',
    interpretation:
      'Com tetraparesia/ataxia, reforça lesão cervical compressiva. Com febre/rigidez generalizada, considerar inflamatório/infeccioso.',
    pitfalls: 'Manipular repetidamente e piorar dor ou risco em instabilidade.',
  },
  {
    id: 's6-dor-coluna-cervical-severa',
    title: 'Dor cervical — Severa (RED FLAG)',
    whatItAssesses:
      'Dor intensa com espasmo e aversão marcante à palpação/movimento. Pode indicar compressão/instabilidade grave (IVDD severa, fratura/luxação) ou meningite intensa.',
    neuroanatomy:
      'Estruturas cervicais e possíveis raízes nervosas; em trauma, instabilidade vertebral. Dor intensa gera hiperatividade simpática e postura antálgica.',
    howToPerform: 'Interromper estímulos agressivos. Priorizar analgesia e segurança. Proceder com imagem quando indicado.',
    interpretation: 'Tratar como emergência clínica quando associado a déficits progressivos. Evitar manipulação excessiva.',
    pitfalls: 'Confundir com medo; porém espasmo + postura antálgica sustentam dor real.',
  },
  {
    id: 's6-dor-coluna-toracolombar-oquee',
    title: 'Palpação de coluna toracolombar — o que avalia',
    whatItAssesses:
      'Dor à palpação/manipulação T3–L3, sugerindo dor espinhal/radicular toracolombar. É extremamente comum em IVDD toracolombar, e orienta nível suspeito e prioridade de imagem.',
    neuroanatomy:
      'Discos toracolombares, ligamentos, meninges e raízes nervosas. Dor local pode coexistir com sinais UMN em pélvicos (patelar aumentado) por lesão T3–L3.',
    howToPerform:
      'Palpar processos espinhosos e musculatura paravertebral com pressão progressiva. Observar espasmo, postura cifótica, vocalização, evitação.',
    interpretation:
      'Dor toracolombar + paresia/ataxia pélvica = forte suspeita de T3–L3 compressivo. Dor ausente não exclui mielopatia crônica/degenerativa.',
    pitfalls: 'Confundir dor de quadril/abdome com dor espinhal; não correlacionar com panniculus.',
  },
  {
    id: 's6-dor-coluna-toracolombar-ausente',
    title: 'Dor toracolombar — Ausente',
    whatItAssesses:
      'Sem dor evidente em T3–L3. Ajuda a separar quadros dolorosos vs não dolorosos, mas não exclui mielopatia.',
    neuroanatomy: 'Mielopatias podem ocorrer sem dor marcada. Compressões crônicas/degenerativas podem ter dor mínima.',
    howToPerform: 'Pressão progressiva e observação de sinais sutis.',
    interpretation: 'Se há sinais UMN em pélvicos, ainda considerar T3–L3 mesmo sem dor.',
    pitfalls: 'Palpação muito superficial pode perder dor leve.',
  },
  {
    id: 's6-dor-coluna-toracolombar-leve',
    title: 'Dor toracolombar — Leve',
    whatItAssesses:
      'Desconforto discreto em região toracolombar. Pode representar IVDD inicial ou dor muscular.',
    neuroanatomy: 'Discos/ligamentos/músculos toracolombares. Dor pode preceder déficits neurológicos em alguns quadros.',
    howToPerform: 'Pressão progressiva; observar cifose discreta e tensão.',
    interpretation: 'Com déficits pélvicos, aumenta suspeita de IVDD. Sem déficits, considerar ortopedia/mialgia.',
    pitfalls: 'Não integrar com história temporal e evolução.',
  },
  {
    id: 's6-dor-coluna-toracolombar-moderada',
    title: 'Dor toracolombar — Moderada',
    whatItAssesses:
      'Dor evidente em T3–L3. Sugere fortemente doença discal/trauma local/neoplasia espinhal, dependendo do contexto.',
    neuroanatomy: 'Estruturas toracolombares e possível radiculopatia. Dor + sinais UMN em pélvicos reforçam lesão toracolombar.',
    howToPerform: 'Evitar repetição excessiva; documentar nível aproximado. Considerar analgesia.',
    interpretation: 'Com patelar aumentado e propriocepção alterada, fortalece T3–L3.',
    pitfalls: 'Confundir dor abdominal com toracolombar sem exame complementar.',
  },
  {
    id: 's6-dor-coluna-toracolombar-severa',
    title: 'Dor toracolombar — Severa (RED FLAG)',
    whatItAssesses:
      'Dor intensa em T3–L3 com espasmo e vocalização marcante. Pode indicar compressão severa (ex.: extrusão discal) e risco de progressão neurológica rápida.',
    neuroanatomy:
      'Disco/meninges/raízes nervosas toracolombares. Dor intensa pode coexistir com perda de função motora se compressão grave.',
    howToPerform:
      'Priorizar analgesia e segurança. Evitar manipulação vigorosa. Considerar imagem urgente se déficits estão presentes/progressivos.',
    interpretation: 'Red flag principalmente se associado a paraparesia/paraplegia ou piora rápida.',
    pitfalls: 'Subestimar gravidade e não correlacionar com nocicepção profunda.',
  },
  {
    id: 's6-dor-coluna-lombossacra-oquee',
    title: 'Palpação lombossacra — o que avalia',
    whatItAssesses:
      'Dor em L7–S1 e estruturas adjacentes, sugerindo síndrome lombossacra/cauda equina, radiculopatia ou dor local. Importante em quadros de dor ao levantar/subir, déficits LMN, cauda flácida e alterações urinárias.',
    neuroanatomy:
      'Cauda equina (raízes nervosas), articulação lombossacra e estruturas de suporte. Compressão radicular causa dor, fraqueza e, em casos graves, disfunção autonômica (bexiga).',
    howToPerform:
      'Palpar L7–S1, avaliar dor à extensão de quadril com cuidado, observar aversão e tensão. Evitar movimentos bruscos.',
    interpretation:
      'Dor lombossacra + reflexos diminuídos pélvicos e alterações urinárias sugerem L4–S3/cauda equina.',
    pitfalls: 'Confundir dor de quadril/joelho com lombossacra sem exame ortopédico.',
  },
  {
    id: 's6-dor-coluna-lombossacra-ausente',
    title: 'Dor lombossacra — Ausente',
    whatItAssesses:
      'Sem dor evidente em L7–S1. Dor pode ser intermitente; ausência não exclui doença lombossacra.',
    neuroanatomy:
      'Síndrome lombossacra pode ter dor variável. Compressão crônica pode alternar dor e limitação.',
    howToPerform: 'Palpação progressiva e avaliação funcional (história de dor ao levantar/subir).',
    interpretation: 'Se sinais LMN e urinários existirem, manter suspeita mesmo sem dor marcada.',
    pitfalls: 'Excluir cauda equina apenas por ausência de dor.',
  },
  {
    id: 's6-dor-coluna-lombossacra-leve',
    title: 'Dor lombossacra — Leve',
    whatItAssesses:
      'Desconforto discreto em L7–S1. Pode sugerir doença lombossacra inicial.',
    neuroanatomy: 'Estruturas lombossacras e raízes nervosas iniciais. Irritação radicular pode produzir dor antes de déficits motores claros.',
    howToPerform: 'Palpação progressiva; observar aversão leve e rigidez ao movimento.',
    interpretation: 'Com história compatível, reforça suspeita de síndrome lombossacra.',
    pitfalls: 'Confundir com dor de quadril.',
  },
  {
    id: 's6-dor-coluna-lombossacra-moderada',
    title: 'Dor lombossacra — Moderada',
    whatItAssesses:
      'Dor evidente em L7–S1. Aumenta probabilidade de compressão radicular/cauda equina.',
    neuroanatomy:
      'Raízes nervosas da cauda equina e articulação lombossacra. Compressão radicular → dor, paresia, possível disfunção autonômica.',
    howToPerform: 'Evitar repetição; documentar resposta e correlacionar com déficits LMN e urinários.',
    interpretation: 'Com patelar diminuído e alterações urinárias, reforça localização L4–S3.',
    pitfalls: 'Não correlacionar com exame de cauda e perineal (se existir no app).',
  },
  {
    id: 's6-dor-coluna-lombossacra-severa',
    title: 'Dor lombossacra — Severa (RED FLAG)',
    whatItAssesses:
      'Dor intensa lombossacra com aversão marcante. Sugere compressão severa de raízes/instabilidade importante e risco funcional (inclusive urinário).',
    neuroanatomy:
      'Cauda equina e estruturas lombossacras. Compressão intensa pode comprometer condução motora e autonômica.',
    howToPerform: 'Priorizar analgesia e contenção segura. Planejar imagem direcionada quando indicado.',
    interpretation: 'Red flag especialmente com déficits LMN, cauda flácida ou disfunção urinária.',
    pitfalls: 'Continuar provocando dor repetidamente durante o exame.',
  },
]
