import type { PathophysiologyVisual } from '../types'
import { PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN, PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN } from './pathophysiologySources'

/** Texto corrido para o modal (fallback / leitura linear). */
export const SEPSE_PATHOPHYSIOLOGY_FULL = `
## Definição operacional e linguagem clínica

Em medicina veterinária, **sépse** descreve a associação entre **infecção** (suspeita ou documentada) e **resposta sistémica** com potencial de **disfunção orgânica** ou **instabilidade hemodinâmica**. Não é um “diagnóstico de laboratório único”: integra **história**, **exame físico**, **contexto epidemiológico** (hospitalar vs comunitário), **comorbidades** e **foco provável**. O termo deve ser distinguido de **bacteremia assintomática** (colonização transitória ou amostra positiva sem síndrome) e de **inflamação não infecciosa** grave (trauma, pancreatite necrótica, etc.), embora o suporte inicial possa sobrepor-se — a **identificação do foco** e das **culturas** muda o plano antimicrobiano e a duração.

O foco pode ser **uterino**, **abdominal** (abscesso, corpo estranho, enterorrafia), **pulmonar** ou **pleural**, **urinário** (pielonefrite obstrutiva), **pele e partes moles**, **cateter vascular** ou **dentário/odontogénico**. Quando o foco ainda não está claro, o algoritmo mantém-se: **estabilizar perfusão e oxigenação → obter amostras quando seguro → empirismo IV institucional → imagem e investigação dirigida → controlo de foco → reavaliação com desescalonamento**.

## Fisiopatologia — da infecção local à disfunção orgânica

### Resposta inflamatória sistémica

A presença de patógenos ou de **PAMPs** (estruturas conservadas bacterianas) e, em Gram-negativos, **endotoxina** (lipopolissacarídeo), activa células apresentadoras e neutrófilos, com libertação de **citocinas** (TNF-α, IL-1, IL-6), **eicosanoides**, **óxido nítrico** e complemento. O endotélio deixa de ser apenas barreira passiva: aumenta a **expressão de moléculas de adesão**, a **permeabilidade capilar** e o **tonus vasomotor** altera-se — daí o **extravasamento** de proteínas e fluido para o interstício (terceiro espaço) e a **hipoperfusão efectiva** dos órgãos, mesmo com débito cardíaco aparentemente preservado ou elevado (**choque distributivo**).

### Hemodinâmica e oxigenação tecidual

Na fase distributiva, a **vasodilatação periférica** e a maldistribuição do fluxo reduzem a **pressão de perfusão** em leitos microvasculares críticos; simultaneamente, **shunts** arteriovenosos funcionais e **disfunção mitocondrial** (hipóxia celular com oxigénio ainda presente no sangue) contribuem para **hiperlactatemia**. O **lactato** elevado não é patognomónico de sepse, mas **persistência ou aumento** após fluidoterapia inicial associa-se a pior prognóstico — deve integrar reavaliação seriada, sempre com interpretação específica (ex.: contribuição hepática, convulsões, intoxicações).

### Temperatura e especificidade por espécie

**Febre** é mediada por prostaglandinas centrais (PGE₂) e pode estar ausente ou substituída por **hipotermia** em gatos, idosos, falência hepática grave ou fases tardias — **nunca** usar temperatura isolada como critério de gravidade. **Taquicardia** e **taquipneia** são sinais de alerta precoces; no gato, bradicardia em contexto de hipotermia ou doença sistémica pode ser enganadora.

### Coagulação e órgãos-alvo

A inflamação sistémica activa a **hemostasia**; em casos graves pode instalar-se **consumo** com prolongamento de tempos, plaquetopenia e manifestações hemorrágicas (**coagulopatia de consumo** / fenómenos compatíveis com DIC) — particularmente quando há **hipoperfusão prolongada**, **sepse abdominal** ou **neoplasia** subjacente. **Rim**: hipóxia tubular e microtrombos contribuem para **azotemia** e oligúria. **Fígado**: citólise ou colestase de stress. **SNC**: alteração do estado mental pode reflectir hipóxia, toxinas, hipoglicemia ou edema. **Trato digestivo**: mucosa isquémica facilita **translocação bacteriana** e agravamento da resposta inflamatória.

### Hemocultura e “sepse cultura-negativa”

A **hemocultura** positiva confirma bacteremia, mas resultado **negativo** não exclui infecção grave: antibiótico prévio, amostra tardia, volume insuficiente, cultura fastidiosa ou foco localizado sem derrame bacterémico intermitente. O plano clínico não deve “esperar pela cultura” para suporte nem para procurar foco.

## Conduta — sequência na urgência e internamento

1. **Triagem de gravidade**: frequência cardíaca e respiratória, tempo de enchimento capilar ou perfusão, pressão arterial se disponível, escala de consciência, esforço respiratório.
2. **Estabilização**: **fluidoterapia** (tipo e ritmo conforme protocolo e cardiopatia prévia), **analgesia**, **oxigenoterapia** se hipóxia; corrigir **hipoglicemia** e **hipotermia** activamente no gato.
3. **Amostras**: **hemocultura** (e outras) **antes** da próxima dose de antimicrobiano **se o atraso não comprometer** o doente — em choque, estabilização em minutos prevalece.
4. **Empirismo IV** de espectro alargado conforme **protocolo institucional** e **resistência local**.
5. **Identificar e tratar o foco**: drenagem, **OHE**, desobstrução ureteral, laparotomia, remoção de cateter infectado — **sem controlo de foco**, a mortalidade permanece elevada.
6. **Monitorização**: balanço hídrico, função renal, perfil de coagulação se indicado, lactato seriado em casos seleccionados.
7. **Reavaliação em 48–72 h** (ou antes se deterioração): cultura, desescalonamento, duração — alinhado a stewardship e **Guia CCIH**.

## Armadilhas e erros de raciocínio

- **Atribuir toda alteração mental a “fígado” ou “rim”** sem considerar hipóxia, hipoglicemia, hipertensão intracraniana secundária ou toxinas.
- **Trocar repetidamente o antibiótico** sem fluidos adequados ou sem procurar foco oculto (abscesso, corpo estranho).
- **Hemocultura negativa** como “prova” de ausência de sepse.
- **Aminoglicosídeo** em desidratação não corrigida ou IRA sem monitorização rigorosa.
- **Prolongar espectro máximo** após estabilização sem critério microbiológico.

## Pronóstico

Depende da **rapidez** da primeira hora (perfusão + foco), da **idade** e comorbidades, da **espécie** (gatos com hipotermia e bradicardia têm mortalidade elevada em alguns estudos de UTI), e da **reversibilidade** do insulto orgânico. Foco não drenado ou antimicrobiano sem suporte hemodinâmico são os erros mais evitáveis.

## Cão vs gato na apresentação e monitorização

Em **cães**, taquicardia, hiperemia de mucosas e hiperestesia podem ser mais evidentes durante a fase hiperdinâmica. Em **gatos**, a **bradicardia** em contexto de hipotermia, o comportamento “aborrecido” com mínimo esforço respiratório, e a **hipotermia** sem febre documentada podem corresponder a sepse grave — o índice de suspeição deve manter-se alto mesmo com hemograma pouco sugestivo. Em ambas as espécies, **perfusão** (tempo de enchimento capilar, cor das mucosas, pulso) e **esforço respiratório** devem integrar-se a temperatura e pressão quando mensuráveis.

## Fluídos, cardiopatia e “próxima dose”

A **fluidoterapia** é o principal instrumento para corrigir hipovolemia e melhorar pré-carga em muitos distributivos; o tipo (cristalóide, coloide conforme protocolo), o ritmo e o alvo (pressão de perfusão, lactato, diurese) dependem da instituição e da função cardíaca prévia. **Não** há substituto para **identificar e tratar o foco** (dreno, laparotomia, OHE, desobstrução). Repetir apenas ciclos empíricos de antimicrobiano sem reavaliar volume, foco e imagem é um erro sistemático comum.

${PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN}
`.trim()

/** Modal rico — Sepse (estrutura por fluxo temporal, distinta da piometra). */
export const SEPSE_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'A **sépse** associa **infecção** a **resposta sistémica** com risco de **disfunção orgânica**. Fisiologicamente, trata-se de **inflamação sistémica desregulada** com alteração do **endotélio**, da **microcirculação** e frequentemente da **hemostasia**. O raciocínio prioriza **perfusão**, **oxigenação**, **amostras oportunas**, **empirismo institucional** e **controlo do foco** — o antimicrobiano é indispensável, mas não substitui volume nem procedimento.',
  sections: [
    {
      id: 'def',
      title: 'Definição e âmbito',
      paragraphs: [
        'Na prática de pequenos animais usa-se uma definição **operacional**: infecção suspeita ou confirmada **e** instabilidade hemodinâmica, hipoperfusão, disfunção respiratória/renal/neurológica ou perfil laboratorial compatível (lactato, leucopenia grave, hipoglicemia, azotemia progressiva) — **integrando** o quadro clínico.',
        'Diferenciar de **bacteremia** incidental, de **SIRS** não infecciosa e de **sepse “cultura-negativa”**, onde o suporte e o empirismo mantêm-se enquanto se investiga.',
        'Marcadores isolados **não substituem** a cabeceira; o gato pode apresentar **hipotermia** e **bradicardia** com doença grave; o cão idoso pode ter resposta febril atenuada.',
      ],
    },
    {
      id: 'mechanisms',
      title: 'Mecanismos (síntese fisiológica)',
      bullets: [
        '**Citocinas e endotélio**: aumento da permeabilidade capilar, edema intersticial, maldistribuição de fluxo.',
        '**Choque distributivo**: vasodilatação periférica; pode coexistir com hipovolemia relativa (extravasamento).',
        '**Oxigenação tecidual**: hiperlactatemia pode reflectir hipoperfusão, disfunção mitocondrial ou ambos.',
        '**Hemostasia**: consumo e disfunção plaquetária em fases avançadas ou focos de alto tromboplastina.',
        '**Órgãos-alvo**: rim (filtração e concentração), fígado (clearance, glicemia), SNC (sensorium), pulmão (edema/ARDS em casos extremos).',
      ],
    },
    {
      id: 'flow_time',
      title: 'Fluxo temporal na urgência',
      flow: {
        title: 'Do reconhecimento à reavaliação',
        steps: [
          { title: 'Reconhecer', subtitle: 'FC, FR, perfusão, TA se possível, mentação, esforço respiratório — **conjunto** > isolado.' },
          { title: 'Estabilizar', subtitle: 'Fluidos + oxigénio + analgesia; corrigir hipoglicemia e hipotermia (especialmente **gato**).' },
          { title: 'Amostrar', subtitle: 'Hemocultura/material de foco **antes** da dose seguinte se **seguro**.' },
          { title: 'Empirismo IV', subtitle: 'Espectro alargado conforme **protocolo** e resistência local.' },
          { title: 'Controlar foco', subtitle: 'Cirurgia, drenagem, desobstrução, remoção de dispositivo — **causa** da persistência.' },
          { title: 'Monitorizar e reavaliar', subtitle: '48–72 h ou antes; lactato/renal/hemostasia conforme caso; **desescalonar** com dados.' },
        ],
      },
      callout: {
        kind: 'clinical',
        title: 'Perfusão antes do “próximo antibiótico”',
        text: 'Em instabilidade, **volume e oxigénio** são interventos de primeira linha em paralelo ao antimicrobiano. Mudar só a molécula sem corrigir hipoperfusão ou foco mantém mortalidade elevada.',
      },
    },
    {
      id: 'dog_cat',
      title: 'Cão vs gato — pistas e armadilhas',
      table: {
        caption: 'Suspeição clínica (síntese)',
        columns: ['', 'Cão', 'Gato'],
        rows: [
          ['Temperatura', 'Febre comum; hipotermia tardia ou grave', 'Hipotermia ou apatia — febre pode faltar'],
          ['Cardiovascular', 'Taquicardia frequente', 'Bradicardia pode coexistir com sepse grave'],
          ['Comportamento', 'Letargia, prostração variável', 'Mínima alteração do hábito já é relevante'],
          ['Interpretação', 'Integrar FC, perfusão e lactato com contexto', 'Mesmo princípio; não depender só do “parece estável”'],
        ],
      },
      paragraphs: [
        'A decisão terapêutica baseia-se no **quadro global** (perfusão, oxigenação, foco provável, laboratório), não num único parâmetro isolado.',
      ],
    },
    {
      id: 'organs',
      title: 'Disfunção orgânica e coagulação',
      paragraphs: [
        '**Rins**: hipoperfusão e nefrogramas de sepse contribuem para **azotemia** e oligúria — distinguir pré‑renal de injúria tubular aguda com fluidos, diurese e tendência sérica.',
        '**Fígado**: citólise e alteração da síntese de factores de coagulação podem coexistir com **consumo** em inflamação sistémica grave.',
        '**Hemostasia**: prolongamento de tempos, hipofibrinogenemia e sangramento espontâneo sugerem **consumo** — integrar com foco abdominal supurativo, neoplasia e tempo de evolução.',
      ],
    },
    {
      id: 'bugs',
      title: 'Microbiologia e hemocultura',
      lead: 'O espectro empírico segue o **foco** e os **dados locais** de resistência; hemocultura informa desescalonamento, não substitui o julgamento inicial.',
      bullets: [
        '**Gram-negativos** e **anaeróbios**: abdómen, útero, empiema, algumas feridas profundas.',
        '**Gram-positivos**: pele, cateter, odontogénico, pneumonia comunitária em alguns contextos.',
        '**Cultura negativa**: não exclui sepse; considerar antibiótico prévio, cultura insuficiente ou foco não amostrado.',
        '**MRSP/MRSA** e **enterobactérias multirresistentes**: histórico, ambiente hospitalar, antibiogramas prévios.',
      ],
    },
    {
      id: 'pitfalls',
      title: 'Armadilhas na interpretação',
      table: {
        caption: 'Erros que aumentam morbimortalidade',
        columns: ['Armadilha', 'Nota clínica'],
        rows: [
          ['“Só falta antibiótico mais forte”', 'Sem fluidos/foco, o doente não recupera de forma sustentada.'],
          ['Febre como único indicador', 'Hipotermia pode ser mais grave, sobretudo em gatos.'],
          ['Lactato ignorado', 'Tendência após fluidos ajuda a estratificar resposta; interpretar causas não sépticas.'],
          ['Hemocultura como regra absoluta', 'Negativa não fecha o diagnóstico clínico de sepse.'],
          ['Aminoglicosídeo sem função renal', 'Ajuste, hidratação e monitorização — ou alternativa no protocolo.'],
        ],
      },
    },
    {
      id: 'rx',
      title: 'Antimicrobiano, suporte e stewardship',
      paragraphs: [
        'O empirismo **parenteral** cobre Gram-negativos e, conforme foco, **anaeróbios** e Gram-positivos relevantes. A **associação** de fármacos deve obedecer a **critério de gravidade** e a **função orgânica**, não a rotina indefinida.',
        'Após **controlo do foco** e **estabilização**, o desescalonamento para **VO** e a **redução de espectro** com base em cultura alinham-se ao **Guia CCIH** e ao stewardship institucional.',
      ],
      callout: {
        kind: 'clinical',
        title: 'Instabilidade hemodinâmica',
        text: 'Antimicrobiano **sem** reposição volémica racional e **sem** plano para o foco (quando aplicável) mantém elevada a mortalidade. Em dúvida entre “trocar ATB” e “cercar abscesso” ou “drenar pleura”, priorizar o que remove a **causa**.',
      },
    },
    {
      id: 'rx_lines',
      title: 'Desescalonamento e linhas orais',
      lead: 'Quando o doente **estabiliza** e ingere, o downgrade para **monoterapia oral** segue antibiograma e tolerância digestiva.',
      bullets: [
        '**Amoxicilina + clavulanato** e **trimetoprim + sulfa** são exemplos frequentes em seguimento — ajustar à cultura.',
        'Manter **duração** adequada ao foco resolvido; não encerrar prematuramente com foco não controlado.',
      ],
      callout: {
        kind: 'info',
        title: 'Fichas de tratamento no aplicativo',
        text: 'As **1ª e 2ª linhas** da condição **Sepse** listam esquemas IV típicos e opções orais — são modelos; confirmar **bula**, **função renal** e **protocolo local**.',
      },
    },
    {
      id: 'sources',
      title: 'Base documental',
      paragraphs: [PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN],
    },
  ],
}
