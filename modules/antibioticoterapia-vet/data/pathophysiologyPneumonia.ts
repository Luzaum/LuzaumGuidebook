import type { PathophysiologyVisual } from '../types'

export const PNEUMONIA_PATHOPHYSIOLOGY_FULL = `
## Definição e contexto

**Pneumonia** designa inflamação do parênquima pulmonar por infecção (bacteriana, viral, fúngica ou mista) ou, em sentido mais lato, processos inflamatórios profundos das vias aéreas inferiores com infiltrado. Em cães e gatos, a apresentação varia de **tosse produtiva** e **dispneia** a **letargia** e **anorexia** sem sintom respiratório óbvio (sobretudo no gato).

O diagnóstico integra **história** (aspiração, hospitalização, doença viral prévia), **auscultação**, **radiografia** ou outro estudo de imagem e, quando possível, **citologia/cultura** de material de vias aéreas inferiores — com interpretação cautelosa (comensais vs patógeno).

## Fisiopatologia

A inflamação alveolar e intersticial reduz a superfície de troca gasosa e aumenta o shunt; o animal compensa com **taquipneia** e esforço respiratório. **Aspiração** introduz flora orofaríngea e anaeróbios; **pneumonia hematogénica** é menos comum mas possível em bacteremias. **Vírus** (p.ex. paragripe, herpes felino) podem predispor a secundarismo bacteriano.

## Limitações da radiografia

Radiografias **não diferenciam** de forma fiável viral vs bacteriana; infiltrados podem atrasar-se em relação ao quadro clínico. Correlação clínica e laboratorial é obrigatória. Em gatos, padrões intersticiais são frequentes e inespecíficos.

## Gravidade e via de tratamento

- **Estável, ambulatorial**: antibiótico **oral** com espectro adequado ao contexto; reavaliação em 48–72 h.
- **Internado**: frequentemente **IV** até melhora da ingestão e estabilidade respiratória.
- **Grave / séptico**: suporte (oxigénio, fluidos), empirismo **parenteral ampliado** conforme protocolo; amostras quando possível.

## Stewardship

Evitar fluoroquinolona de **rotina** em quadro leve sem indicação; reservar associações ampliadas para **gravidade** documentada. Reavaliar precocemente e descalonar com cultura.

## Pronóstico

Depende da gravidade inicial, do controlo da causa subjacente (aspiração, imunossupressão) e da resposta em 48–72 h.
`.trim()

export const PNEUMONIA_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'A **pneumonia** é inflamação infecciosa (ou com componente infeccioso dominante) do **parênquima pulmonar**. O manejo depende da **gravidade respiratória**, do **contexto** (aspiração, viral, hospitalar) e da **disponibilidade de amostras** — a radiografia **auxilia**, mas não substitui o raciocínio clínico.',
  sections: [
    {
      id: 'anatomy',
      title: 'Por que o espectro microbiológico varia',
      paragraphs: [
        'O pulmão exposto a **aspiração** recebe flora **orofaríngea** e anaeróbios; a **pneumonia comunitária** “típica” em cão pode incluir **estreptococos**, **estafilococos** e **bacilos Gram-negativos** conforme região e histórico de antibióticos.',
        '**Mycoplasma** e outros agentes “atípicos” têm prevalência **dependente de contexto** — não universalizar cobertura sem critério.',
        'Cultura de **escarro** ou lavado traqueal/BAL pode refletir **comensais**; correlacionar sempre com citologia e quadro.',
      ],
    },
    {
      id: 'severity_table',
      title: 'Gravidade: eixo respiratório e via de antimicrobiano',
      table: {
        caption: 'Orientação geral — individualizar ao paciente e ao protocolo local',
        columns: ['Cenário', 'Eixo clínico', 'Via típica de ATB'],
        rows: [
          ['Ambulatorial estável', 'Tosse, estável hemodinamicamente, sem esforço respiratório grave', 'Oral (ex.: doxiciclina ou amoxicilina + clavulanato) — reavaliação breve'],
          ['Internado', 'Hiporexia, desidratação, necessidade de suporte ou observação', 'Parenteral (ex.: beta-lactâmico IV) até transição'],
          ['Grave / séptico', 'Dispneia marcada, hipóxia, instabilidade', 'IV amplo + oxigenoterapia; hemocultura/amostras respiratórias quando possível'],
        ],
      },
    },
    {
      id: 'imaging',
      title: 'Imagem e causas não bacterianas',
      paragraphs: [
        'A **radiografia torácica** é útil para localizar infiltrados e complicações, mas **não prova** etiologia bacteriana. Processos **virais** ou **parasitários** podem mimetizar padrões semelhantes.',
        'Antes de assumir “falha antibiótica”, reavaliar **aspiração**, **edema**, **neoplasia** e **doença cardíaca** como diagnósticos diferenciais.',
      ],
      callout: {
        kind: 'info',
        title: 'Gato',
        text: 'O gato pode apresentar **letargia** e **hiporexia** com pouca tosse; a **taquipneia** silenciosa exige contagem de esforço respiratório e observação cuidadosa.',
      },
    },
    {
      id: 'flow',
      title: 'Decisão de gravidade (simplificado)',
      flow: {
        title: 'Da avaliação inicial ao plano',
        steps: [
          { title: 'Perfusão e esforço respiratório', subtitle: 'Hipóxia? Frequência respiratória? Padrão abdominal?' },
          { title: 'Oxigenoterapia / fluidos', subtitle: 'Se instável, **suporte** antes de decisões finas de esquema.' },
          { title: 'Amostras se possível', subtitle: 'Cultura/PCR conforme disponibilidade — não atrasar estabilização.' },
          { title: 'Empirismo + reavaliação 48–72 h', subtitle: 'Descalonar com identificação ou melhora clara.' },
        ],
      },
    },
    {
      id: 'rx',
      title: 'Antimicrobianos na prática',
      bullets: [
        'Ambulatorial: **doxiciclina** ou **amoxicilina + clavulanato** são opções frequentes em protocolos — ajustar a alergias e idade.',
        'Internado: **ampicilina + sulbactam** IV é esquema típico até desfecho clínico.',
        'Séptico: **associação ampliada** (ex.: beta-lactâmico + fluoroquinolona) **só** com critério de gravidade — seguir stewardship.',
      ],
    },
  ],
}
