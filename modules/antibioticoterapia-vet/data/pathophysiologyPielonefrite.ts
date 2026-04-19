import type { PathophysiologyVisual } from '../types'
import { PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN, PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN } from './pathophysiologySources'

export const PIELONEFRITE_PATHOPHYSIOLOGY_FULL = `
## Definição e espectro clínico

**Pielonefrite** é infecção do **parênquima renal** e da **região pielocalicial**, na grande maioria dos casos por **ascensão** de uropatógenos desde a uretra e bexiga. Difere da **cistite não complicada** pela presença de **sinais sistémicos** (febre, letargia, anorexia, náuseas), **dor lombar** ou hiperestesia costal, e frequentemente por **leucocitúria**, **bacteriúria significativa** e alteração de **função renal** ou **hemograma**. Formas **fulminantes** podem evoluir com **bacteremia**, **sepse** e **insuficiência renal aguda**.

Deve considerar-se em qualquer ITU “complicada” com dor **superior** ao trato inferior, especialmente se **febril** ou **instável**.

## Fisiopatologia da ascensão e da lesão renal

### Ascensão uretrovesical

Uropatógenos (**Escherichia coli** e outras enterobactérias predominam) colonizam bexiga e, em condições favoráveis, **ascendem pelo ureter**. Factores que aumentam a probabilidade de envolvimento superior incluem **vesicoureteral reflux** (congénito ou adquirido), **obstrução** distal ou ureteral, **urolitíase**, **gravidez**, **diabetes mellitus**, **imunossupressão**, **cateter urinário** e **anomalias** anatómicas.

### Resposta inflamatória intrarrenal

A infecção e a inflamação **intersticial** e **tubular** geram edema, infiltrado neutrofílico e activação de citocinas locais. A **função tubular** (concentração, secreção) sofre primeiro; a **taxa de filtração** pode cair se o processo for extenso, bilateral ou com componente **hemodinâmico** sistémico.

### Obstrução e pielonefrite obstrutiva

Quando há **bloqueio ureteral** ou **urolito impactado**, instala-se **hipertensão pós-renal** com **dilatação pielocalicial** (**hidronefrose**). Este cenário é **quirúrgico-urgente** em muitos protocolos: o antibiótico **não substitui** a desobstrução — sem alívio da pressão, persistem dor, azotemia e risco de **necrose papilar** ou **sepse** refratária.

### Complicações

- **Bacteremia** e **sepse** por translocação ou foco abundante.
- **Abscesso renal** ou **pionefrose** (coleção purulenta) em evoluções prolongadas ou obstrução completa.
- **Lesão renal aguda** com oligúria ou anúria — balanço hídrico e monitorização de electrólitos críticos.

## Diagnóstico — abordagem estruturada

1. **Clínica**: febre ou hipotermia, dor lombar, vómitos, desidratação; no gato, sinais podem ser **sutis**.
2. **Urina**: **urocultura** (método de colheita adequado — citocentese vs cateter vs livre); análise com **hematúria** e **leucocitúria**; **não** substituem cultura para duração/escolha definitiva.
3. **Sangue**: hemograma (leucocitose com desvio ou leucopenia grave), bioquímica (**creatinina**, **ureia**, electrólitos); **hemocultura** se febre ou instabilidade.
4. **Imagem**: **ultrassonografia** para dilatação pielocalicial, cálculos, abscesso; **radiografia** ou **TC** conforme disponibilidade e suspeita de urolito não opaco ou complicação.

## Tratamento — princípios

- **Internação** na maioria dos casos **francamente sistémicos**; fluidoterapia para perfusão e diurese cautelosa se indicado.
- **Antimicrobiano IV** empírico activo contra enterobactérias e, conforme gravidade, cobertura **ampliada** institucional; **ajuste** por cultura em 48–72 h.
- **Desobstruir** quando presente obstrução ureteral — tempo à função renal importa para recuperação.
- **Transição para VO** após melhora clínica estável e tolerância oral; **duração** superior à cistite simples (frequentemente **10–14 dias** ou mais conforme complicação e resolução laboratorial).

## Pronóstico

**Bom** com desobstrução precoce, antibiótico adequado e função renal recuperável. **Reservado** se obstrução prolongada, necrose renal, abscesso extenso ou sepse com falência multiorgânica.

${PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN}
`.trim()

export const PIELONEFRITE_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'A **pielonefrite** é ITU **ascendente** com infecção **renal** — mais grave que cistite isolada. O raciocínio integra **sinais sistémicos**, **urocultura**, **função renal**, **hemocultura** quando indicado e **imagem** para excluir **obstrução** ou **abscesso**. Fisiologicamente, a inflamação intersticial e tubular compromete concentração e filtração; a **obstrução** acrescenta **pós-renal** que só reverte com **intervenção** mecânica.',
  sections: [
    {
      id: 'contrast',
      title: 'Cistite inferior vs pielonefrite',
      table: {
        caption: 'Contraste clínico (exceções existem)',
        columns: ['Aspeto', 'ITU baixa', 'Pielonefrite suspeita'],
        rows: [
          ['Sistémico', 'Frequentemente ausente', 'Febre, letargia, toxemia comum'],
          ['Dor', 'Disúria, urgência', 'Lombo, costas, abdómen dorsal'],
          ['Função renal', 'Preservada', 'Possível azotemia, especialmente com obstrução'],
          ['Tratamento', 'Ambulatorial muitas vezes', 'Internamento e IV frequentes'],
        ],
      },
    },
    {
      id: 'ascension',
      title: 'Ascensão, virulência e factores de risco',
      bullets: [
        '**E. coli**: adesinas P e outros factores de virulência favorecem ascensão; resistência a **beta-lactâmicos** e **quinolonas** depende de comunidade e uso prévio.',
        '**Cateter**, **DM**, **CKD**, **anatomia** anómala: maior risco de complicação e recidiva.',
        '**Refluxo** e **estase** urinária prolongam exposição do rim ao patógeno.',
        '**Obstrução**: transforma pielonefrite em emergência **urológica + médica** simultânea.',
      ],
    },
    {
      id: 'mech',
      title: 'Mecanismos de lesão renal',
      paragraphs: [
        'A inflamação **tubulointersticial** altera reabsorção e secreção; o edema e a congestão medular podem reduzir **TFG** regionalmente.',
        'A **obstrução** aumenta a pressão intrapielocalicial, reduzindo o gradiente de filtração — **azotemia** pós-renal até a desobstrução efectiva.',
      ],
    },
    {
      id: 'samples',
      title: 'Urocultura, hemocultura e timing',
      paragraphs: [
        'Idealmente colher **urina para cultura** **antes** de antibiótico de largo espectro quando o atraso não prejudicar o doente.',
        '**Hemocultura** em febre, hipotermia com suspeita séptica, leucopenia grave ou instabilidade — duas amostras em intervalo aumentam sensibilidade em alguns protocolos.',
      ],
    },
    {
      id: 'obstruction',
      title: 'Obstrução, imagem e intervenção',
      callout: {
        kind: 'clinical',
        title: 'Antibiótico sem desobstrução',
        text: 'Uretero obstruído ou **pionefrose** exige plano **cirúrgico** ou **mínimamente invasivo** (stent, sonda) conforme centro — atraso associa-se a perda renal irreversível e sepse.',
      },
      paragraphs: [
        '**US** identifica dilatação; **dupla plana** ou **TC** podem localizar cálculo radiolucente. Reavaliar imagem se clínica não melhora em 24–48 h com terapia adequada.',
      ],
    },
    {
      id: 'flow',
      title: 'Fluxo decisório',
      flow: {
        title: 'Da suspeita ao plano',
        steps: [
          { title: 'Confirmar síndrome sistémica', subtitle: 'Dor superior + febre ou toxemia.' },
          { title: 'Laboratório + culturas', subtitle: 'Urina, sangue; função renal e electrólitos.' },
          { title: 'Imagem se complicado', subtitle: 'Dilatação? Cálculo? Abscesso?' },
          { title: 'IV + desobstruir', subtitle: 'Paralelos quando obstrução confirmada.' },
          { title: 'Reavaliar 48–72 h', subtitle: 'Descalonar; VO quando estável; duração prolongada vs cistite.' },
        ],
      },
    },
    {
      id: 'rx',
      title: 'Esquemas empíricos e ajustes',
      bullets: [
        '**Base IV**: beta-lactâmico com amplo espectro (ex.: ampicilina + sulbactam) conforme protocolo.',
        '**Grave / sepse**: associação com **fluoroquinolona** ou outro reforço **institucional**; monitorizar função renal com nefrotóxicos.',
        '**Ajuste posológico** em IRA e evitar acumulação de fármacos dependentes de excreção renal.',
      ],
    },
    {
      id: 'sources',
      title: 'Base documental',
      paragraphs: [PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN],
    },
  ],
}
