import type { PathophysiologyVisual } from '../types'
import { PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN, PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN } from './pathophysiologySources'

export const PNEUMONIA_PATHOPHYSIOLOGY_FULL = `
## Definição e classificação na prática

**Pneumonia** designa inflamação do **parênquima pulmonar** (alvéolos e interstício adjacente) com componente infeccioso dominante ou, em alguns contextos, inflamação profunda das vias aéreas inferiores com infiltrado radiológico. Na prática de pequenos animais distingue-se frequentemente:

- **Comunitária**: aquisição fora do hospital; flora habitualmente distinta da **nosocomial** ou **associada a ventilação**.
- **Aspiração**: inoculação de conteúdo **orofaríngeo** ou **gástrico**; flora mista, anaeróbios e gravidade relacionada com volume aspirado e acidez.
- **Secundária a virose**: epitélio ciliado lesionado, barreira muco-ciliar falha, **sobrecrescimento bacteriano**.
- **Hematogénica**: menos comum; considerar em **bacteremias** prolongadas ou focos extra-pulmonares.

O diagnóstico é **clínico-radiológico-laboratorial**: história (tosse, dispneia, febre, anorexia), exame físico (sons pulmonares, esforço, cor cianótica), **radiografia** ou **TC**, e quando possível **citologia** ou **cultura** de material distal — interpretando contaminantes de orofaringe.

## Fisiopatologia respiratória e trocas gasosas

### Consolidação alveolar e relação V/Q

A consolidação (exsudato fibrinoso, purulento ou hemorrágico) preenche **alvéolos** e **ductos alveolares**, reduzindo a ventilação regional enquanto a perfusão pode persistir — **shunt** intrapulmonar com **hipoxemia** e, por compensação, **taquipneia**. Áreas com **embolia** ou **vasoconstrição** regional podem gerar **espaço morto** (ventilação sem perfusão). O resultado líquido é **hipoxemia** e aumento do **trabalho respiratório** (músculos acessórios, padrão abdominal).

### Edema e derrame parapneumónico

A inflamação aumenta a permeabilidade **capilar-alveolar**; em casos graves pode coexistir **componente de edema** ou **derrame pleural parapneumónico**, agravando o **volume de espaço morto** e restringindo expansão torácica — a **toracocentese** diagnóstica/terapêutica integra o raciocínio quando há suspeita de líquido.

### Mecânica respiratória

A redução da **complacência** (pulmão “duro”) exige pressões negativas mais negativas na inspiração — fadiga muscular respiratória em episódios prolongados ou em doentes com **doença cardíaca** prévia.

## Contextos etiológicos e espectro microbiológico

### Pneumonia comunitária (cão)

Agentes típicos incluem **Streptococcus zooepidemicus**, **Staphylococcus** spp., **Escherichia coli** e outros **Gram-negativos**, **Mycoplasma** canino em algumas regiões, e **Bordetella** como parte do complexo respiratório — a **correlação** cultura–radiografia nem sempre é linear.

### Aspiração

Flora **polimicrobiana**; **anaeróbios** e aeróbios da orofaringe. Gravidade aumenta com **obstrução** de vias aéreas, **redução do nível de consciência** e volume aspirado.

### Gato

A apresentação é frequentemente **discreta** em termos de tosse; **taquipneia**, **hiporexia** e **febre** podem dominar. Diagnósticos diferenciais incluem **asma** / **bronquite**, **edema pulmonar cardiogénico**, **tromboembolismo**, **neoplasia** — a radiografia ajuda a localizar o processo, mas **não substitui** a correlação clínica.

## Exames complementares — utilidade e limitações

- **Radiografia**: sensível para infiltrados e complicações; **não distingue** viral vs bacteriano; atraso de 24–48 h em relação ao início dos sinais é possível.
- **Hemograma**: leucocitose com desvio ou leucopenia em quadros graves; **não específico**.
- **Hemocultura**: indicada em **doente fértil**, **instável** ou com suspeita de **bacteremia** — positiva orienta terapia.
- **Citologia/BAL/TTW**: melhor correlacionar com patógeno; risco de contaminación orofaríngea — interpretar com citologista e clínica.

## Tratamento — eixo de gravidade

- **Ambulatorial estável**: via **oral**, espectro adequado ao contexto; **reavaliação clínica** em 48–72 h obrigatória.
- **Internado**: **IV** até ingestão fiável e estabilidade respiratória; fluidoterapia se desidratado; **oxigénio** se SpO₂ baixa.
- **Grave / choque / suspeita de sépse**: suporte completo, empirismo **parenteral ampliado** conforme protocolo, **hemocultura**, monitorização.

## Stewardship e reavaliação

Fluoroquinolonas e associações **largas** não devem ser “padrão” em tosse leve estável. **Reavaliar** precocemente: falha terapêutica exige reconsiderar **aspiração**, **corpo estranho**, **neoplasia**, **edema cardiogénico** ou **doença não infecciosa**. Descalonar com **cultura** ou evidência clínica de resolução.

## Pronóstico

Depende da **idade**, **comorbidades cardiopulmonares**, **causa subjacente** (aspiração vs viral vs bacteriana primária), e **resposta nas primeiras 48–72 h**. Complicações pleurais ou necessidade de oxigénio prolongado pioram prognóstico.

## Aspiração — mecanismo e gravidade

A entrada de material **orofaríngeo** ou **gástrico** nas vias aéreas inferiores inocula flora mista e pode desencadear **pneumonite química** (injúria epitelial e inflamação) seguida ou associada a **sobreinfecção bacteriana**. A gravidade depende do **volume**, da **acidez** do conteúdo aspirado, da **obstrução** de vias aéreas prévia e da **capacidade do doente de proteger a via aérea** (nível de consciência, refluxo, anestesia). O raciocínio clínico inclui prevenção de novos episódios (jejum, posicionamento, controlo de náuseas) e não apenas ciclos repetidos de antibiótico empírico sem reavaliar causa mecânica.

## Complicações: derrame parapneumónico e extensão sistémica

A inflamação alveolar extensa pode acompanhar-se de **derrame parapneumónico**; líquidos purulentos ou com pH/lactato alterados (quando analisados) orientam **drenagem** em articulação com especialidade. A **bacteremia** a partir do foco pulmonar ou a **sobreposição séptica** impõe **hemocultura** quando o doente é instável, oxigenoterapia e suporte como na lógica de sepse — o módulo trata **pneumonia** e **sepse** como condições relacionadas mas com fichas distintas.

## Cão vs gato — resumo prático

Em **cães**, tosse produtiva e febre são achados comuns; o diagnóstico diferencial com **edema cardiogénico** ou **corpo estranho** permanece obrigatório. Em **gatos**, a **tosse pode ser rara**; **taquipneia** em repouso, **hiporexia** e atitude anormal dominam — contagens respiratórias e observação do padrão de esforço são centrais.

${PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN}
`.trim()

export const PNEUMONIA_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'A **pneumonia** é inflamação infecciosa (ou com componente infeccioso dominante) do **parênquima pulmonar**. O manejo depende da **gravidade respiratória**, do **mecanismo** (comunitária, aspiração, pós-viral) e da **correlação clínico-radiológica**. A fisiologia das **trocas gasosas** (relação ventilação–perfusão, shunt, trabalho respiratório) explica hipoxemia e fadiga — não apenas “infecção bacteriana simples”.',
  sections: [
    {
      id: 'dog_cat',
      title: 'Cão vs gato — apresentação',
      table: {
        caption: 'Pistas na consulta',
        columns: ['', 'Cão', 'Gato'],
        rows: [
          ['Tosse', 'Comum em processos respiratório-infecciosos', 'Pode ser ausente ou discreta'],
          ['Espirômetro informal', 'Útil; dispneia evidente em casos moderados', 'Contar respirações em repouso — taquipneia silenciosa'],
          ['Febre', 'Mais frequentemente detectável', 'Pode faltar; não excluir processo grave'],
          ['Diferencial', 'Corpo estranho, cardiomiopatia', 'Asma/bronquite, tromboembolismo, edema cardiogénico'],
        ],
      },
      paragraphs: [
        'A radiografia ajuda a **localizar** o processo, mas **não substitui** a avaliação do esforço respiratório e da estabilidade hemodinâmica na urgência.',
      ],
    },
    {
      id: 'aspiration',
      title: 'Aspiração e flora mista',
      flow: {
        title: 'Do evento ao risco infeccioso',
        steps: [
          { title: 'Inoculação', subtitle: 'Material orofaríngeo ou gástrico na traqueia — contexto de vómito, refluxo, sedação ou alteração de consciência.' },
          { title: 'Injúria química / mecânica', subtitle: 'Inflamação epitelial; pode coexistir com componente bacteriano precoce ou tardio.' },
          { title: 'Pneumonite bacteriana', subtitle: 'Sobrecrescimento — anaeróbios e aeróbios conforme local e duração.' },
          { title: 'Decisão terapêutica', subtitle: 'Oxigénio, suporte, antibiótico conforme gravidade; rever causas repetidas de aspiração.' },
        ],
      },
      bullets: [
        'Associação frequente com **doença esofágica**, **laringe** ou **vómitos** repetidos — investigar quando clinicamente pertinente.',
      ],
    },
    {
      id: 'anatomy',
      title: 'Etiologia contextual e microbiologia',
      paragraphs: [
        '**Aspiração** introduz flora **orofaríngea** e **anaeróbios**; o volume e o estado de consciência determinam gravidade. A **comunitária** “típica” em cão mistura **cocos** e **Gram-negativos** conforme região e vacinação.',
        '**Mycoplasma** e agentes “atípicos” têm prevalência **geográfica** e de vigilância variáveis — não universalizar cobertura empírica sem critério.',
        'Amostras invasivas (BAL, lavado) podem reflectir **comensais**; a decisão terapêutica integra **citologia**, **quantidade de neutrófilos degenerados** e **quadro clínico**.',
      ],
      bullets: [
        '**Vírus** (paragripe, herpes felino, etc.) predisponem a **sobrecrescimento bacteriano** — o antibiótico pode ser necessário na fase secundária, não na viral pura.',
        '**Pneumonia hematogénica** ou focos embólicos são diagnósticos diferenciais em quadros seleccionados.',
      ],
    },
    {
      id: 'vq',
      title: 'Fisiopatologia: V/Q, shunt e hipoxemia',
      paragraphs: [
        'A **consolidação** regional desvia perfusão para unidades **mal ventiladas** — **shunt** e hipoxemia frequentemente desproporcionais ao esforço visível.',
        '**Edema** ou **derrame pleural** associados reduzem ainda mais a capacidade residual funcional e podem mascarar o grau de pneumonia na radiografia inicial.',
      ],
      table: {
        caption: 'Padrões fisiológicos úteis na cabeceira',
        columns: ['Problema', 'Efeito clínico'],
        rows: [
          ['Shunt (V/Q baixo)', 'Hipoxemia; resposta variável a oxigénio suplementar.'],
          ['Espaço morto aumentado', 'Taquipneia; pode coexistir com hipercapnia em doente exausto.'],
          ['Complacência reduzida', 'Esforço abdominal; fadiga muscular em casos prolongados.'],
        ],
      },
    },
    {
      id: 'severity_table',
      title: 'Gravidade e via de antimicrobiano',
      table: {
        caption: 'Orientação geral — individualizar ao paciente e ao protocolo local',
        columns: ['Cenário', 'Eixo clínico', 'Via típica de ATB'],
        rows: [
          ['Ambulatorial estável', 'Hemodinamicamente estável, sem hipoxemia grave, ingere líquidos', 'Oral — reavaliação 48–72 h'],
          ['Internado moderado', 'Hiporexia, desidratação, oxigénio intermitente ou suporte IV', 'Parenteral até transição'],
          ['Grave / séptico', 'Instabilidade, hipoxemia persistente, lactato, leucopenia', 'IV amplo + suporte; hemocultura/amostras'],
        ],
      },
    },
    {
      id: 'imaging',
      title: 'Imagem e diagnósticos diferenciais',
      paragraphs: [
        'A **radiografia** localiza infiltrados e complicações (derrame), mas **não prova** etiologia bacteriana. **Edema cardiogénico**, **neoplasia**, **tromboembolismo** e **asma grave** podem mimetizar ou coexistir.',
        'Antes de rotular “falha antibiótica”, reavaliar **causa mecânica** (aspiração repetida, corpo estranho), **cardiopatia** e **resposta temporal** esperada (48–72 h).',
      ],
      callout: {
        kind: 'clinical',
        title: 'Dispneia grave',
        text: 'Insuficiência respiratória iminente exige **oxigénio**, posição confortável e decisão sobre **internamento** — não retardar por esperar apenas o “resultado da cultura”.',
      },
    },
    {
      id: 'pleura',
      title: 'Derrame parapneumónico e complicações',
      lead: 'Quando há líquido pleural significativo ou suspeita de empiema, o plano integra **especialidade** e frequentemente **drenagem** — antibiótico isolado é insuficiente.',
      paragraphs: [
        'O **piotórax** aparece como ficha própria neste módulo; em pneumonia com derrame parapneumónico, o raciocínio mistura critérios de **drenagem** e prolongamento de antimicrobiano conforme cultura do líquido.',
      ],
    },
    {
      id: 'flow',
      title: 'Da avaliação ao plano',
      flow: {
        title: 'Decisão estruturada',
        steps: [
          { title: 'Oxigenação e perfusão', subtitle: 'SpO₂, esforço, cor, pressão se disponível.' },
          { title: 'Radiografia / FAST torácico', subtitle: 'Infiltrado vs derrame; repetir se clínica diverge.' },
          { title: 'Gravidade → via ATB + suporte', subtitle: 'Oral vs IV; oxigénio; fluidos com cautela se cardiopata.' },
          { title: 'Amostras se indicado', subtitle: 'Hemocultura em grave; material distal conforme expertise.' },
          { title: 'Reavaliação 48–72 h', subtitle: 'Melhora clínica + radiografia de controlo conforme protocolo.' },
        ],
      },
    },
    {
      id: 'rx',
      title: 'Antimicrobianos e stewardship',
      bullets: [
        'Ambulatorial: **doxiciclina** ou **amoxicilina + clavulanato** são frequentes — idade, espécie e interações importam.',
        'Internado: **beta-lactâmico IV** (ex.: ampicilina + sulbactam) até melhora estável.',
        'Grave: **associação ampliada** só com **critério documentado**; evitar quinolona empírica isolada como rotina.',
      ],
      callout: {
        kind: 'info',
        title: 'Fichas no aplicativo',
        text: 'As **linhas 1ª–3ª** em pneumonia (oral estável, IV internado, associação em cenário séptico) alinham-se aos regimes do catálogo — ajustar a **estabilidade**, **hemocultura** quando indicado e **bula**.',
      },
    },
    {
      id: 'sources',
      title: 'Base documental',
      paragraphs: [PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN],
    },
  ],
}
