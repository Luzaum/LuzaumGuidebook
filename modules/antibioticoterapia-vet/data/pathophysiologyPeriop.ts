import type { PathophysiologyVisual } from '../types'
import { PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN, PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN } from './pathophysiologySources'

export const PERIOP_PATHOPHYSIOLOGY_FULL = `
## Objectivos e princípios da profilaxia antimicrobiana

A **profilaxia** perioperatória visa reduzir **infeção do sítio cirúrgico (ISC)** e, em contextos seleccionados, **bacteremia** relacionada com o acto. **Não** substitui **assepsia**, **antissepsia**, **técnica cirúrgica**, **normoglicemia**, **normotermia** nem preparo adequado do doente.

Programas de **controlo de qualidade e infecção** (p.ex. **Guia CCIH**) consolidam: **indicar** antimicrobiano sistémico só quando há **evidência** ou **risco documentado**; administrar no **timing** correcto (em geral **30–60 minutos** antes da incisão — seguir **bula** e protocolo institucional); usar **dose plena** ajustada a função **renal/hepática**; **repetir** dose intraoperatória apenas quando **duração cirúrgica** excepcional ou **sangramento** massivo conforme parâmetros locais; **não prolongar** “por segurança” dias após cirurgia limpa sem critério — prolongamento **aumenta** resistência, **disbiose** e efeitos adversos.

## Classificação de feridas e implicações (simplificado)

- **Limpa**: flora bacteriana mínima esperada no percurso; profilaxia **nem sempre** necessária — quando indicada (implantes, ortopedia seleccionada), **curso mínimo** ou **dose única** conforme serviço.
- **Potencialmente contaminada**: trato digestivo ou respiratório aberto sem infecção franca — profilaxia mais frequente, ainda assim **curta** se objectivo é só prevenir inoculação perioperatória.
- **Contaminada infectada**: tratar como **terapia** de infecção estabelecida — cultura quando possível, **controlo de foco** (drenagem, desbridamento), **duração** guiada à resolução clínica e microbiológica.

## Escolha do agente (princípios)

Em muitas cirurgias de tecidos moles e ortopedia eletiva, **cefalosporina 1.ª geração** (p.ex. **cefazolina** IV) cobre patógenos **cutâneos** típicos, incluindo *Staphylococcus* sensível à meticilina. **Ajustar** se **anafilaxia** documentada a penicilina (protocolo de alternativa institucional), colonização por **MRSP/MRSA** relevante, ou foco específico que exija espectro diferente. **Não** usar **glicopeptídeos** de rotina apenas “por precaução” em feridas limpas — reservar a critérios institucionais claros.

## Terapêutica perioperatória vs sepse

Se o animal está **séptico** ou em **choque**, o esquema deixa de ser “só profilaxe”: trata-se de **tratamento empírico** de **infecção sistémica** ou foco com **hemocultura**, **fluidos**, **analgesia** e **controlo de causa** — ver ficha **Sepse** do módulo.

## Monitorização e auditoria

Documentar **indicação**, **hora** da primeira dose, **repetições** e **cessação**; reavaliar às **24–48 h**: se **não há** evidência de infecção, **interromper** profilaxe. Casos de **ISC** documentada seguem critérios **terapêuticos**.

${PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN}
`.trim()

export const PERIOP_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'A **profilaxia** antimicrobiana perioperatória é um **intervenção pontual** para reduzir carga bacteriana no momento do **corte tecidual**, não um substituto de técnica nem um “antibiótico por dias” por rotina. Ferida **infectada** ou **contaminada com sepse** muda a lógica para **tratamento** documentado.',
  sections: [
    {
      id: 'clean_contaminated',
      title: 'Ferida limpa vs contaminada — implicações',
      table: {
        caption: 'Orientação conceitual — protocolo local prevalece',
        columns: ['Tipo', 'Exemplos grosseiros', 'Antimicrobiano'],
        rows: [
          ['Limpa / electiva típica', 'Castração sem complicação, algumas abordagens minorais', 'Muitas vezes sem profilaxe sistémica; quando há, curso mínimo'],
          ['Com implante / ortopedia', 'Placas, PTO', 'Profilaxe frequentemente indicada — dose/timing por instituição'],
          ['Contaminada infectada', 'Perfuração GI, abscesso drenado', 'Terapêutico + foco; não confundir com profilaxe única'],
        ],
      },
    },
    {
      id: 'timing',
      title: 'Timing e repetição de dose',
      bullets: [
        'Objectivo: concentração tecidual adequada **na incisão** — seguir **bula** (p.ex. 30–60 min antes).',
        'Repetir **intraoperatoriamente** só por **critério** (tempo prolongado, hemorragia substancial) conforme lista.',
        'Após o acto, **parar** profilaxe se não há infecção — evitar dias “extra” por hábito.',
      ],
      flow: {
        title: 'Sequência típica (profilaxe)',
        steps: [
          { title: 'Decidir se há indicação', subtitle: 'Tipo de cirurgia + fatores do doente.' },
          { title: 'Dose pré-incisão', subtitle: 'Tempo conforme protocolo; via IV habitual.' },
          { title: 'Repetição intra-op?', subtitle: 'Só se parâmetros institucionais.' },
          { title: 'Reavaliação pós-operatória', subtitle: 'Sinais de ISC? Se não, cessar.' },
        ],
      },
    },
    {
      id: 'cefazolin',
      title: 'Agente habitual e excepções',
      paragraphs: [
        '**Cefazolina** (1.ª geração) cobre **estafilococos** e estreptococos sensíveis e muitos bacilos de pele — âncora comum de profilaxe.',
        'Ajustar em **insuficiência renal** grave conforme farmácia; **alergia** grave a beta-lactâmicos exige **rotulada alternativa institucional** — não improvisar sem protocolo.',
      ],
      callout: {
        kind: 'info',
        title: 'Profilaxe vs tratamento',
        text: 'Profilaxe **curta**; tratamento de ISC ou sepse segue **cultura**, **dreno** e **duração** clínica — ver fichas **Sepse** e regimes terapêuticos.',
      },
    },
    {
      id: 'septic',
      title: 'Instabilidade no periop',
      bullets: [
        'Choque ou critérios de **sepse** → esquema **terapêutico IV** e **suporte** como na ficha de sepse.',
        'Hemocultura **antes** da dose quando **seguro** — após vias e estabilização mínima se choque.',
      ],
    },
    {
      id: 'sources',
      title: 'Base documental',
      paragraphs: [PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN],
    },
  ],
}
