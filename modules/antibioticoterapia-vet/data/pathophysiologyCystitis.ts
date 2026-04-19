import type { PathophysiologyVisual } from '../types'
import { PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN, PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN } from './pathophysiologySources'

export const CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_FULL = `
## Definição e âmbito

**Cistite esporádica** designa infecção inflamatória do **trato urinário inferior** (predominantemente bexiga e uretra distal) em animal **sem** obstrução urológica relevante, **sem** cateter de longa permanência — no momento do episódio — e **sem** critérios inequívocos de **ascensão renal** (pielonefrite). Em cães, **enterobactérias** — com destaque para ***Escherichia coli*** — predominam; em gatos, a lógica epidemiológica é semelhante, mas a **colheita de urina** e a coexistência de **cistite idiopática felina (PIC/FIC)** exigem interpretação cuidadosa: **disúria** e **hematúria** **não** provam sempre bacteriúria.

## Defesas do trato urinário inferior

A **barreira urotelial** (camada de glicosaminoglicanos), a **micção** de “lavagem”, a **acidificação** urinária e a imunidade inata limitam a colonização por **uropatógenos** do períneo. Quando factores de **virulência** bacteriana (p.ex. adesinas, toxinas), **estase** urinária, alteração da flora ou integridade da mucosa superam estes mecanismos, instala-se **bacteriúria significativa** associada a inflamação e sinais clínicos.

## Fisiopatologia da colonização e da inflamação

A infecção inicia-se por **ascensão uretral** a partir da flora **perineal**; **hematogénese** é menos frequente no ITU inferior esporádico. A resposta inflamatória local traduz-se em **urgência**, **polaciúria**, **hematúria** e, por vezes, comportamental (micções inapropriadas). **Febre marcada** ou **dor lombar** profunda devem fazer suspeitar de **complicação ascendente**, **prostatite** (cão macho) ou **outro diagnóstico**.

## Apresentação e diagnóstico

Sinais: **polaciúria**, **disúria**, **hematúria** (macro ou microscópica), odor alterado. **Urinálise** pode mostrar hematúria, leucocitúria e bacteriúria; **urocultura** com método de colheita adequado (**citocentese** preferível no gato quando se busca correlato bacteriológico) permanece o padrão para **agente** e **antibiograma** — pilar do **stewardship**.

## Tratamento e duração

Esquemas **orais** de primeiro escalão são frequentes quando o episódio é verdadeiramente **não complicado** e a cultura ou protocolo local o suportam. **Duração** costuma ser **curta** (dias), com reavaliação clínica em **48–72 h**; prolongamentos repetidos sem cultura aumentam **selecção de resistência**.

## Bacteriúria assintomática e confusões felinas

A **bacteriúria assintomática** (detecção laboratorial sem sintomas compatíveis) nem sempre requer tratamento — decisão individualizada (p.ex. preparo para procedimento invasivo, comorbidades). No gato, **PIC** pode mimetizar ITU: antibiótico não substitui **diagnóstico por cultura** quando a síndrome é compatível com inflamação **não** infecciosa.

${PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN}
`.trim()

export const CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_FULL = `
## Definições: recidiva, reinfecção e persistência

**Cistite recorrente** agrupa situações em que existem **episódios múltiplos** ao longo do tempo (definição temporal varia por serviço). Importa distinguir:

- **Reinfecção**: novo episódio após cura documentada — **isolado diferente** ou nova onda epidemiológica.
- **Persistência / recidiva por falha**: mesmo clone ou cultura persistentemente positiva — suspeitar de **duração inadequada**, **dose subóptima**, **foco anatómico** (cálculo, divertículo, anomalia), ou **resistência**.
- **Predisposição metabólica ou anatómica**: **diabetes mellitus**, hiperadrenocorticismo, **urolitíase**, **reflúvio**, etc.

## Factores predisponentes

**Anatómicos**: malformações, **urolitos**, **pólipos**, **neoplasia**. **Funcionais**: **DM** (substrato para uropatógenos), imunossupressão. **Comportamentais / ambientais** (gato): stress multi-gato — pode coexistir com PIC; **cultura** correlaciona com a decisão de antimicrobiano.

## Abordagem diagnóstica estruturada

1. **Urocultura com antibiograma** antes de cada novo ciclo prolongado empírico, sempre que o prazo clínico permitir.
2. **Imagem** (ultrassonografia, radiografia) se hematuria persistente, dor, recidivas rápidas ou suspeita estrutural.
3. **Rastreio metabólico** quando poliúria ou fatores de risco.
4. **Histórico** de moléculas e durações prévias — detectar padrões de resistência ou “uso repetido”.

## Tratamento e prevenção

A terapia deve seguir **antibiograma** quando disponível. A **duração** pode exceder o primeiro episódio simples; em alguns protocolos discute-se supressão de curto prazo ou outras estratégias — sempre com **cultura de controlo** quando indicado e critérios institucionais.

**Stewardship**: evitar **quinolonas** como primeira linha empírica **contínua** sem microbiologia; alinhar ao **Guia CCIH** e à resistência local.

${PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN}
`.trim()

export const CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    '**Cistite esporádica** é ITU **inferior** habitualmente **não complicada**: o eixo clínico é **polaciúria / disúria**, com diagnóstico fortalecido por **urocultura**. A fisiopatologia reflecte **colonização uropatogénica** que supera defesas locais — sem ascensão renal nem obstrução obvia no momento.',
  sections: [
    {
      id: 'dog_cat',
      title: 'Cão vs gato — colheita e interpretação',
      table: {
        caption: 'Pontos práticos',
        columns: ['Aspeto', 'Cão', 'Gato'],
        rows: [
          ['Urina para cultura', 'Jejum de micção difícil às vezes; método limpo ou citocentese', 'Citocentese preferida para correlacionar bacteriúria'],
          ['Confundidores', 'Prostatite, urolitíase', 'PIC/FIC — hematúria/disúria sem bacteriúria'],
          ['Obstrução macho', 'Menos comum que em gato', 'Obstrução uretral felina = emergência — não “cistite simples”'],
        ],
      },
    },
    {
      id: 'defense',
      title: 'Barreira mucosa e micção',
      bullets: [
        '**GAGs** uroteliais e fluxo urinário reduzem adesão bacteriana.',
        'Infeção instalada gera **inflamação** local — urina pode conter sangue e leucócitos mesmo com patógeno único.',
        'Antimicrobiano sem cultura repetida em **todo** episódio favorece resistência comunitária.',
      ],
    },
    {
      id: 'uncomplicated',
      title: 'Fluxo decisório simplificado',
      flow: {
        title: 'ITU inferior esporádica',
        steps: [
          { title: 'Sinais baixos de trato', subtitle: 'Polaciúria, disúria; febre pouco típica.' },
          { title: 'Urina + cultura quando possível', subtitle: 'Antes de largo espectro repetido.' },
          { title: 'Terapia guiada ou empírica breve', subtitle: 'Conforme protocolo + resposta 48–72 h.' },
          { title: 'Reavaliar se falha', subtitle: 'Pielonefrite, cálculo, anatomia — ver fichas correspondentes.' },
        ],
      },
      callout: {
        kind: 'info',
        title: 'Sinais sistémicos',
        text: 'Febre, toxemia ou dor lombar sugerem **ascensão** ou foco diferente — não forçar o rótulo de “cistite simples”.',
      },
    },
    {
      id: 'rx',
      title: 'Stewardship',
      bullets: [
        'Beta-lactâmico + inibidor ou alternativas orais conforme cultura e serviço.',
        'Quinolonas: **reservar** para critérios — não rotina universal do primeiro episódio.',
        'Duração **curta** quando resposta; prolongar só com base em complicação ou cultura.',
      ],
    },
    {
      id: 'sources',
      title: 'Base documental',
      paragraphs: [PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN],
    },
  ],
}

export const CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    '**Cistite recorrente** exige **padrão temporal** (vários episódios) e distinção entre **nova infecção**, **persistência** e **factor de base** anatómico ou metabólico. O manejo prioriza **cultura** antes de “rodízio” empírico de antibióticos.',
  sections: [
    {
      id: 'types',
      title: 'Reinfecção vs persistência',
      table: {
        caption: 'Leitura laboratorial (idealmente com genotipagem ou séries temporais)',
        columns: ['Padrão', 'Implicação habitual'],
        rows: [
          ['Novo germe após cura', 'Reinfecção — rever higiene, água, períneo, anatomia'],
          ['Mesmo perfil após cura aparente', 'Suspeitar foco estrutural, dose/duração, ou resistência'],
          ['Sintomas sem bacteriúria', 'PIC ou outro diagnóstico — não antibiótico empírico contínuo'],
        ],
      },
    },
    {
      id: 'workup',
      title: 'Investigação escada',
      flow: {
        title: 'Do episódio repetido ao plano',
        steps: [
          { title: 'Cultura + antibiograma', subtitle: 'Antes de novo ciclo longo.' },
          { title: 'Imagem se indicado', subtitle: 'Cálculo, espessamento, anomalia.' },
          { title: 'Rastreio metabólico', subtitle: 'DM e outras comorbidades.' },
          { title: 'Ajuste terapêutico', subtitle: 'Duração e molécula por cultura; corrigir predisposição se possível.' },
        ],
      },
    },
    {
      id: 'risks',
      title: 'Predisposições frequentes',
      bullets: [
        '**Urolitíase** e **estase** — fragmentos e biofilme podem proteger bactérias.',
        '**DM**: glicosúria e imunidade alterada.',
        '**Anomalias** congénitas ou adquiridas do trato.',
        '**Cateter** prévio ou manipulações repetidas.',
      ],
      callout: {
        kind: 'clinical',
        title: 'Gato obstruído',
        text: 'Obstrução uretral macho = prioridade **mecânica**; antibiótico não desbloqueia a uretra.',
      },
    },
    {
      id: 'rx',
      title: 'Uso racional de antimicrobianos',
      paragraphs: [
        'Evitar repetir o mesmo esquema “à cegas” quando a cultura mostra **resistência** ou quando há **falha clínica** documentada.',
        'Alinhar duração ao protocolo baseado em **cultura de controlo** quando o serviço o preve.',
      ],
    },
    {
      id: 'sources',
      title: 'Base documental',
      paragraphs: [PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN],
    },
  ],
}
