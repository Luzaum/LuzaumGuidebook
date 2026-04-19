import type { PathophysiologyVisual } from '../types'
import { PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN } from './pathophysiologySources'

/** Conteúdo didático para o modal — Piometra (síntese alinhada a medicina interna, fisiologia e bases patológicas veterinárias). */
export const PIOMETRA_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'A **piometra** é acúmulo de secreção **mucóide a purulenta** na cavidade uterina em fêmea **intacta**, quase sempre sob **progesterona** (fase lútea endógena ou **progestágenos** exógenos). Integra o **complexo CEH–piometra**: hiperplasia secretora, **cistos glandulares** e estase luminal que favorecem colonização **ascendente**. O encadeamento **hormona → estase → inflamação supurativa → endotoxemia/toxemia** explica desde poliúria até choque; a **OHE** elimina fonte hormonal e foco infeccioso, enquanto o **antimicrobiano** e os fluidos atuam como suporte e cobertura empírica até à cultura.',
  sections: [
    {
      id: 'def',
      title: 'Definição, espectro e epidemiologia',
      paragraphs: [
        'O espectro morfológico e clínico abrange **hidrometra** / conteúdo predominantemente mucóide, **metróra** com componente hemático, e **piometra** com **exsudato purulento** e resposta sistémica variável. A prevalência aumenta com a **idade** e com **ciclos** sem gestação; o risco é inerente a fêmeas **não castradas** expostas a estímulo progesterónico repetido.',
        'A gravidade depende do **volume** intrauterino, da **integridade** da parede uterina, da **drenagem cervical** (aberta vs fechada), do tempo de evolução e da magnitude da **bacteremia**/**endotoxemia**.',
      ],
      bullets: [
        '**Fêmea castrada**: piometra “clássica” é improvável — considerar **coto uterino** com **remanescente ovariano**, abscesso ou outro foco.',
        '**Progestágenos exógenos** (ou uso terapêutico prolongado) podem precipitar ou manter o estado secretor.',
      ],
    },
    {
      id: 'hormonal',
      title: 'Eixo hormonal e alterações endometriais (CEH)',
      flow: {
        title: 'Sequência fisiopatológica',
        steps: [
          { title: 'Progesterona sustentada', subtitle: 'Corpo lúteo funcional, diestro longo, pseudogestação ou progestágeno exógeno.' },
          { title: 'Endométrio secretor (CEH)', subtitle: 'Hipertrofia glandular, cistos, secreção luminal — estase e terreno para bactérias.' },
          { title: 'Colo e miométrio', subtitle: 'Menor contratilidade “expulsiva”; colo frequentemente aposto — fenótipo fechado possível.' },
          { title: 'Infecção e inflamação', subtitle: 'Exsudato purulento; toxinas bacterianas; bacteremia e citocinas sistémicas.' },
          { title: 'Disfunção sistémica', subtitle: 'SIRS/sepse, hipotensão, leucopenia, disfunção renal e coagulopatia de consumo.' },
        ],
      },
      paragraphs: [
        'A **progesterona** favorece um endométrio “préparatorio” para gestação: secreção rica em proteínas e **menor** clearance mecânica do lúmen. Sem gravidez, esse ambiente associa-se a **hiperplasia cística** endometrial (CEH) e a **redução relativa** da defesa mecânica (microbiota, fluxo) e imunológica local.',
        'Sem remoção da **fonte de progesterona** (tipicamente **ovários** + **útero** na OHE), protocolos **só médicos** mantêm risco de **recidiva** e complicações estruturais.',
      ],
    },
    {
      id: 'ceh_immune',
      title: 'CEH, inflamação local e adesão bacteriana',
      lead:
        'A transição de CEH para piometra supurativa reflecte **sobrecrecimento** bacteriano e **resposta inflamatória** no compartimento confinado.',
      paragraphs: [
        'Do ponto de vista de patologia geral, o endométrio hiperplásico acumula **cistos glandulares**, epitélio columnar secretor e, com a infecção, **infiltrado neutrofílico**, necrose e debris. A parede pode **edemaciar-se** e, com distensão extrema, **afinar-se** — aumentando o risco de **transmural** e **ruptura** com **peritonite**.',
        'Os uropatógenos ascendentes (p.ex. **E. coli**) exploram receptores de adesão e factores de virulência; em luminação estática, **biofilme** e cultura de alto volume podem dificultar erradicação só com antimicrobiano sem controlo de foco.',
      ],
      bullets: [
        '**Gram-negativos** libertam **LPS**; a absorção transmural contribui para **febre**/**hipotermia**, **taquicardia** e **hipotensão**.',
        '**Anaeróbios** e flora mista são relevantes em evolução prolongada, necrose ou compromisso da parede.',
      ],
    },
    {
      id: 'compare',
      title: 'Piometra aberta vs fechada',
      table: {
        caption: 'Implicações clínicas e de risco',
        columns: ['Aspecto', 'Aberta', 'Fechada'],
        rows: [
          ['Colo', 'Permite saída parcial para vagina', 'Muitas vezes aposto — acúmulo máximo no lúmen'],
          ['Apresentação', 'Corrimento; distensão pode ser moderada', 'Distensão abdominal, dor, toxemia frequentemente mais precoce'],
          ['Sepse', 'Possível em ambos', 'Risco frequentemente maior (endotoxemia, pressão, reabsorção)'],
          ['Urgência', 'Todas exigem plano definitivo', 'Muitas vezes maior prioridade após estabilização inicial'],
        ],
      },
    },
    {
      id: 'species',
      title: 'Cão vs gato',
      table: {
        caption: 'Pistas na prática clínica',
        columns: ['', 'Cão', 'Gato'],
        rows: [
          ['Sinais referidos', 'Distensão, corrimento, PU/PD', 'Apatia, inapetência, vómito; secreção pode ser ausente'],
          ['Exame', 'Útero palpável em alguns casos', 'Útero menos evidente ao palpar — suspeita alta se intacta'],
          ['Imagem', 'US típica: útero globular, conteúdo fluido/particulado', 'Mesmo princípio; não excluir por “aparência discreta”'],
        ],
      },
      paragraphs: [
        'Em **ambas** as espécies, qualquer fêmea **intacta** com doença sistémica inexplicada deve ter **piometra** no diferencial até prova em contrário.',
      ],
    },
    {
      id: 'systemic',
      title: 'Endotoxemia, POLP, rins e hemostase',
      paragraphs: [
        'Bacilos **Gram-negativos** libertam **endotoxina (LPS)**; a resposta mediada por **citocinas** inclui disfunção endotelial, aumento da permeabilidade vascular e **hipoperfusão** regional — quadro compatível com **SIRS** e **choque séptico**.',
        '**Poliúria e polidipsia** resultam de mecanismos múltiplos: **deficiência relativa de ADH** na doença sistémica, hiperglicemia de stress, ou resposta renal à hipovolémia — interpretar sempre com **desidratação**, **USG urinária** e **creatinina**.',
        '**Azotemia** é frequentemente **pré-renal** mas pode agravar-se com **hipoperfusão** persistente. **DIC** é complicação grave: consumo de plaquetas e factores de coagulação com hemorragia e microtrombose — integrar em piometras sépticas com sinais de sangramento ou hipocoagulabilidade laboratorial.',
      ],
    },
    {
      id: 'bugs',
      title: 'Microbiologia e resistência',
      lead: 'Flora ascendente do trato distal e perineo; cultura orienta desescalonamento.',
      bullets: [
        '**Escherichia coli** predomina em muitas séries — perfis de resistência variam por região e uso prévio de antibióticos.',
        '**Enterobactérias** adicionais, **estreptococos**, **estafilococos** e **anaeróbios** em evoluções prolongadas ou necrose.',
        '**Hemocultura** positiva associa-se a maior gravidade; negativa não exclui toxemia significativa.',
      ],
      table: {
        caption: 'Cobertura empírica — princípios',
        columns: ['Alvo', 'Nota'],
        rows: [
          ['Gram-negativos entéricos', 'Base da maioria dos esquemas empíricos perioperatórios.'],
          ['Anaeróbios', 'Relevantes com necrose e flora mista; muitos protocolos combinam beta-lactâmico + anaeróbio.'],
          ['MRSP / resistência local', 'Considerar histórico de culturas ou mapa institucional.'],
        ],
      },
    },
    {
      id: 'clinical',
      title: 'Quadro clínico, diagnóstico e diagnósticos diferenciais',
      bullets: [
        'Sinais: letargia, anorexia, vómito, **POLP**, dor abdominal, distensão; gata pode mostrar apenas **apatia**.',
        '**Secreção vulvar** purulenta: forte pista se presente; **ausência não exclui** (sobretudo fechada).',
        '**US**: útero distendido, conteúdo fluido/particulado; correlacionar com ciclo e progesterona quando útil.',
        'Laboratório: leucocitose com desvio ou **leucopenia** (grave); hiperproteinemia, azotemia, alterações hepáticas de stress.',
      ],
      paragraphs: [
        'Diferenciais: **gestação**, **piometra de coto** (*stump*) com **remanescente ovariano**, **metrite** pós-parto, **neoplasia** uterina, **pioperitónio** de outra origem.',
      ],
    },
    {
      id: 'rx',
      title: 'Tratamento: estabilização, cirurgia e antimicrobiano',
      flow: {
        title: 'Fluxo decisório',
        steps: [
          { title: 'Estabilizar', subtitle: 'Fluidos, analgesia, oxigénio; identificar sepse e coagulopatia.' },
          { title: 'OHE quando possível', subtitle: 'Remove progesterona e foco infeccioso — standard na maioria dos serviços.' },
          { title: 'ATB sistémico', subtitle: 'Adjuvante: cobrir Gram-negativos e anaeróbios conforme protocolo; IV se instável.' },
          { title: 'Pós-operatório', subtitle: 'Duração por cultura, resolução clínica e stewardship — não número mágico isolado.' },
        ],
      },
      paragraphs: [
        '**Terapia exclusivamente médica** (prostaglandinas, antiprogestágenos conforme protocolo e jurisdição) é **reservada** a casos seleccionados, equipa experiente e **monitorização** estreita — risco de **ruptura uterina**, **recidiva** e **infertilidade**.',
        'Neste módulo, as **linhas antimicrobianas** cadastradas para piometra são **modelos** de monoterapia ou alternativas — devem ser integradas com **bula**, **estabilidade** do doente e **protocolo local**.',
      ],
      callout: {
        kind: 'clinical',
        title: 'Piometra fechada e instabilidade',
        text: 'Quadros com **hipotensão**, **leucopenia** grave, **hipoglicemia** ou **alteração de consciência** devem ser tratados como **emergência** sistémica paralela à decisão cirúrgica — fluidoterapia e suporte não substituem o plano definitivo do foco uterino.',
      },
    },
    {
      id: 'prog',
      title: 'Complicações e prognóstico',
      paragraphs: [
        '**Complicações**: sepse, DIC, perfuração uterina, **peritonite**, **IRA**, choque refratário.',
        'Com **OHE** precoce e suporte adequado, prognóstico **favorável** na maioria; mortalidade concentra-se em apresentações tardias e choque.',
        'Após tratamento médico bem-sucedido, **taxa de recidiva** e **infertilidade** são preocupações documentadas — consentimento informado essencial.',
      ],
    },
    {
      id: 'sources',
      title: 'Base documental',
      paragraphs: [PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN],
    },
  ],
}
