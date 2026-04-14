import type { PathophysiologyVisual } from '../types'

export const PIELONEFRITE_PATHOPHYSIOLOGY_FULL = `
## Definição

**Pielonefrite** é infecção do **parênquima renal** e da **pelve renal**, habitualmente por **ascensão** de uropatógenos desde a uretra e bexiga. Difere da **cistite esporádica** pela presença de **sinais sistémicos** (febre, letargia, dor), **dor lombar** ou costas, e frequentemente por **leucocitúria** e **bacteriúria** com contexto de **complicação**.

## Fisiopatologia

A colonização uretrovesical ascende pela **ureter**; estase, **refluxo**, **obstrução** (urolito, estrutura) ou **cateter** aumentam o risco de envolvimento renal e bacteremia. O **edema** e a inflamação intrarrenal geram dor e disfunção tubular; em casos graves, **insuficiência renal aguda** ou **sepse**.

## Diagnóstico

- **Urocultura** (ideia antes de antibiótico prolongado quando possível).
- **Hemocultura** em febre sistémica ou instabilidade.
- **Imagem** (ultrassonografia, radiografia) quando suspeita de **obstrução**, nefrolitíase ou abscesso — **sem** imagem de rotina em todo o caso “simples”.

## Tratamento

A maioria dos casos **francamente complicados** justifica **internação** e **IV** até melhora clínica; transição para VO conforme cultura e tolerância. O **controlo da obstrução** é mandatório quando presente — antibiótico sem desobstrução falha.

## Duração

Curso **mais longo** que cistite não complicada; guiar por resolução clínica, cultura e função renal — reavaliação laboratorial conforme caso.

## Pronóstico

Bom com desobstrução precoce e antibiótico adequado; reservado se obstrução prolongada ou sepse refratária.
`.trim()

export const PIELONEFRITE_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'A **pielonefrite** é ITU **ascendente** com envolvimento **renal** — mais grave que a cistite isolada. O raciocínio une **urocultura**, **sinais sistémicos**, **função renal** e, quando indicado, **imagem** para excluir **obstrução**.',
  sections: [
    {
      id: 'contrast',
      title: 'Cistite inferior vs pielonefrite',
      table: {
        caption: 'Contraste clínico útil (exceções existem)',
        columns: ['Aspeto', 'ITU baixa (cistite típica)', 'Pielonefrite suspeita'],
        rows: [
          ['Sistema', 'Muitas vezes só sintomas urinários', 'Frequente febre, letargia, anorexia'],
          ['Dor', 'Disúria, urgência', 'Dor lombar/costas, desconforto abdominal'],
          ['Laboratório', 'Hematúria/leucocitúria variáveis', 'Leucocitose sistémica, possível azotemia'],
          ['Risco', 'Menor se isolada e estável', 'Maior (bacteremia, obstrução, IRA)'],
        ],
      },
    },
    {
      id: 'ascension',
      title: 'Ascensão uretrovesical e fatores de risco',
      bullets: [
        '**E. coli** e outras enterobactérias predominam; resistência depende de comunidade e antibióticos prévios.',
        '**Cateter urinário**, **urolitíase**, **anatomia** anómala e **gravidez** (quando aplicável) aumentam complicação.',
        '**Refluxo** vesicoureteral e **estase** favorecem subida e persistência.',
      ],
    },
    {
      id: 'samples',
      title: 'Urocultura e hemocultura',
      paragraphs: [
        'A **urocultura** orienta espectro e duração; colher **antes** de mudar empiricamente de esquema repetidas vezes, quando o quadro permitir.',
        'A **hemocultura** é indicada em **febre**, **hipotermia** com suspeita séptica ou **instabilidade** — resultado negativo não exclui bacteremia recente ou amostra tardia.',
      ],
    },
    {
      id: 'obstruction',
      title: 'Obstrução e urolitíase',
      callout: {
        kind: 'clinical',
        title: 'Sem desobstrução não há cura sustentável',
        text: 'Uretero obstruído ou nefrolitíase com bloqueio funcional exige **procedimento** (cirúrgico ou mínimamente invasivo) conforme caso — o antimicrobiano **sozinho** não resolve o foco mecânico.',
      },
      paragraphs: [
        'A **ultrassonografia** é frequentemente primeira linha para dilatação pielocalicial ou ureter; em alguns contextos complementa-se com radiografia ou outro método conforme protocolo.',
      ],
    },
    {
      id: 'flow',
      title: 'Fluxo: complicado → internação → imagem',
      flow: {
        title: 'Da suspeita ao plano',
        steps: [
          { title: 'Confirmar gravidade', subtitle: 'Sistémico? Dor lombar? Desidratação?' },
          { title: 'Internar na maioria dos casos francos', subtitle: 'IV empírico até cultura e estabilização.' },
          { title: 'Imagem se obstrução ou não resposta', subtitle: 'Procurar **cálculo** ou **anomalia**.' },
          { title: 'Descalonar com cultura', subtitle: 'Transição VO quando seguro; duração mais longa que cistite simples.' },
        ],
      },
    },
    {
      id: 'rx',
      title: 'Esquemas empíricos típicos',
      bullets: [
        '**Internado**: beta-lactâmico IV (ex.: ampicilina + sulbactam) como base; o caso **grave** pode justificar **associação** com fluoroquinolona conforme protocolo local.',
        '**Ajuste renal** obrigatório com aminoglicosídeos ou doses acumulativas.',
      ],
    },
  ],
}
