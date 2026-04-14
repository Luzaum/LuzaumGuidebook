import type { PathophysiologyVisual } from '../types'

/** Conteúdo didático para o modal — Piometra (pilot). */
export const PIOMETRA_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'A **piometra** é acúmulo de material purulento ou mucopurulento na cavidade uterina, em fêmeas intactas sob influência de **progesterona**. Compreender o eixo hormonal → estase → infecção ajuda a racionalizar cultura, cirurgia e uso de **antimicrobianos**.',
  sections: [
    {
      id: 'def',
      title: 'Definição e contexto',
      paragraphs: [
        'A piometra integra um **espectro clínico** que vai desde acumulações predominantemente mucóides ou hidrometra complexa, em algumas classificações, até coleções francamente supurativas, com **graus variáveis de resposta sistêmica** e risco de complicações (sepse, perfuração uterina, peritonite).',
        'O termo agrupa cenários com **acumulação intrauterina** de conteúdo mucóide a purulento, habitualmente em fêmeas **intactas** sob **ciclo lúteo** (corpo lúteo funcional) ou sob efeito de **progestágenos exógenos** que reproduzem o estado hormonal da fase lútea.',
        'Na ausência de gestação, o útero pode permanecer exposto a **estímulo progesterônico prolongado** (ciclos estrais longos, pseudogestação, ou uso de progestágenos), favorecendo o chamado **estado secretor** do endométrio: glândulas hipertrofiadas, aumento da secreção e redução relativa da motilidade miometrial compatível com adaptações para gestação — o que, sem gravidez, contribui para **estase de conteúdo luminal** e para um microambiente propício à colonização bacteriana ascendente.',
        'A gravidade na prática depende de fatores como **drenagem pelo colo** (piometra aberta versus fechada), **tempo de evolução**, presença de **sepse** ou **endotoxemia**, e **integridade da parede uterina**. O epitélio endometrial pode apresentar inflamação crônica com exacerbações agudas; a mucosa torna-se mais vulnerável à aderência bacteriana, invasão tecidual e absorção de endotoxinas e mediadores inflamatórios — especialmente quando há comprometimento vascular, necrose ou perfuração.',
      ],
    },
    {
      id: 'hormonal',
      title: 'Eixo hormonal e fisiopatologia',
      flow: {
        title: 'Fluxo simplificado (fêmea intacta)',
        steps: [
          { title: 'Corpo lúteo ou progestágenos exógenos', subtitle: '**Progesterona** elevada na fase lútea ou terapia exógena que simula essa fase.' },
          { title: 'Endométrio em estado secretor', subtitle: 'Hipertrofia glandular, secreção aumentada, motilidade miometrial reduzida.' },
          { title: 'Estase de conteúdo intrauterino', subtitle: 'Persistência luminal; menos “lavagem” mecânica eficaz.' },
          { title: 'Colonização bacteriana e inflamação', subtitle: 'Aderência a biofilme, toxemia; risco de **sepse** e disfunção orgânica.' },
        ],
      },
      paragraphs: [
        'Sem gestação, o estímulo progesterônico **prolongado** (ciclos longos, pseudogestação) pode perpetuar estase e vulnerabilidade da mucosa.',
      ],
      callout: {
        kind: 'clinical',
        title: 'Por que importa na prática',
        text: 'Sem remover a fonte de **progesterona** (por exemplo com **ovariohisterectomia**), o terreno uterino permanece propício à recidiva em abordagens exclusivamente médicas, quando estas são até mesmo consideradas.',
      },
    },
    {
      id: 'compare',
      title: 'Piometra aberta vs fechada',
      table: {
        caption: 'Comparação clínica útil na decisão de estabilização e timing cirúrgico',
        columns: ['Aspecto', 'Aberta (drenagem parcial)', 'Fechada'],
        rows: [
          ['Colo uterino', 'Permite saída do conteúdo para a vagina', 'Relativamente aposto — acúmulo intrauterino'],
          ['Corrimento vulvar', 'Frequente (não universal)', 'Pode ausentar-se'],
          ['Risco sistêmico', 'Variável — sepse não excluída', 'Maior risco de distensão, toxemia, choque'],
          ['Urgência', 'Avaliar estabilidade; não subestimar', 'Muitas vezes maior prioridade de suporte e cirurgia'],
        ],
      },
    },
    {
      id: 'bugs',
      title: 'Aspectos infecciosos',
      lead: 'Flora mista ascendente; o padrão de sensibilidade depende da comunidade e do uso prévio de antimicrobianos.',
      bullets: [
        '**Escherichia coli** é o isolado mais comum em cães e gatos — aderência, biofilme, origem perineal ou gastrointestinal.',
        'Outras enterobactérias, **estreptococos**, **estafilococos** e **bactérias anaeróbias** podem integrar o quadro em evoluções prolongadas ou com tecido desvitalizado.',
        '**Hemocultura** ou cultura de conteúdo uterino, quando clinicamente seguro e oportuno, orienta o desescalonamento; o empirismo inicial visa **bacilos Gram-negativos** e **anaeróbios** relevantes.',
      ],
      table: {
        caption: 'Papel de grupos de agentes (visão geral — sempre individualizar)',
        columns: ['Grupo', 'Notas'],
        rows: [
          ['Bacilos Gram-negativos entéricos', 'Inclui Escherichia coli e germes afins — atenção a padrões de resistência locais.'],
          ['Cocos Gram-positivos', 'Estreptococcus e Staphylococcus podem participar de quadros polimicrobianos.'],
          ['Bactérias anaeróbias', 'Mais relevantes com tempo de evolução prolongado e necrose tecidual.'],
        ],
      },
    },
    {
      id: 'clinical',
      title: 'Quadro clínico e diagnóstico',
      bullets: [
        'Sinais possíveis: letargia, anorexia, vômito, **poliúria e polidipsia** (mecanismos múltiplos, incluindo efeitos de toxinas e resposta renal), febre ou hipotermia, dor abdominal, distensão.',
        'Secreção purulenta ou mucopurulenta na vulva é **fortemente sugestiva** quando presente — a ausência **não exclui** o diagnóstico.',
        'Exame de imagem: **ultrassonografia** como primeira linha na maioria dos contextos — distensão uterina com conteúdo fluido ou particulado; correlacionar com histórico reprodutivo.',
        'Laboratorial: leucocitose com desvio à esquerda (ou leucopenia em quadros graves); alterações hepáticas reativas; azotemia pré-renal por desidratação ou sepse.',
      ],
    },
    {
      id: 'rx',
      title: 'Tratamento: cirurgia e antimicrobiano',
      flow: {
        title: 'Fluxo decisório simplificado',
        steps: [
          { title: 'Estabilizar o paciente', subtitle: 'Reposição volêmica, analgesia, oxigenoterapia quando necessário; identificar **sepse**.' },
          { title: 'Ovariohisterectomia quando possível', subtitle: 'Remove a fonte de **progesterona** e o útero afetado — tratamento definitivo na maioria dos casos.' },
          { title: 'Antimicrobiano sistêmico', subtitle: 'Papel **adjuvante**: bacteremia, endotoxemia, sepse perioperatória.' },
          { title: 'Duração do antimicrobiano', subtitle: 'Guiada por resolução clínica, cultura quando disponível e critérios de estabilização — não por número fixo isolado do contexto.' },
        ],
      },
      paragraphs: [
        'A terapia **exclusivamente médica** na piometra é **excepcional**, com risco de recidiva e de evolução para piometra fechada; exige seleção rigorosa de casos e monitorização estreita.',
      ],
      callout: {
        kind: 'info',
        title: 'Antimicrobianos na prática',
        text: 'A escolha empírica deve cobrir **bacilos Gram-negativos** e **bactérias anaeróbias** relevantes, ajustando via de administração, função renal e hepática, e estabilidade hemodinâmica. Abaixo, as **linhas de tratamento cadastradas para esta condição** no aplicativo, com a justificativa de cada esquema.',
      },
    },
    {
      id: 'prog',
      title: 'Evolução e prognóstico',
      paragraphs: [
        'Sem tratamento adequado: sepse, coagulopatias, **perfuração uterina**, **peritonite** — com mortalidade relevante.',
        'Com **ovariohisterectomia precoce** e suporte intensivo quando necessário, o prognóstico costuma ser **favorável**.',
      ],
    },
  ],
}
