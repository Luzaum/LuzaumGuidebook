import type { PathophysiologyVisual } from '../types'

/** Texto corrido para o modal (fallback / leitura linear). */
export const SEPSE_PATHOPHYSIOLOGY_FULL = `
## Definição operacional

Em medicina veterinária, **sépse** descreve a resposta sistémica desregulada a **infecção** (suspeita ou confirmada), frequentemente associada a **disfunção orgânica** — hipoperfusão, hipóxia tecidual, alteração do estado mental, hipoglicemia ou disfunção renal/hepática, conforme o caso. Não é um diagnóstico exclusivamente “laboratorial”: integra **história**, **exame físico** e **contexto** (foco possível, comorbidades, idade).

O foco pode ser **uterino**, **abdominal**, **pulmonar**, **urinário**, **pele/ferida**, **cateter** ou outro; quando o foco ainda não está claro, o raciocínio mantém-se em **estabilizar → amostrar → cobrir empiricamente → reavaliar** com culturas e imagem.

## Fisiopatologia (visão integrada)

A cascata inflamatória sistémica (citocinas, ativação endotelial, disfunção microvascular) pode evoluir para **hipoperfusão relativa ou absoluta**, extravasamento capilar e hipóxia celular. Endotoxinas e produtos bacterianos amplificam a resposta em **bacteremias** por Gram-negativos, mas a gravidade **não depende** apenas do resultado imediato da hemocultura.

## Conduta — ordem lógica na prática

1. **Reconhecer** instabilidade ou risco de evolução (taquicardia, taquipneia, hipotensão, alteração do perfusão, hipotermia ou hipertermia, letargia grave).
2. **Estabilizar** perfusão e oxigenação (fluidoterapia guiada, analgesia, oxigenoterapia quando indicado) — o antimicrobiano **não substitui** volume e suporte.
3. **Obter amostras** (hemocultura, urina, outros focos) **antes** do próximo dose de antimicrobiano **quando seguro** — sem atrasar estabilização por burocracia.
4. **Iniciar empirismo IV** amplo conforme protocolo local até identificação do agente e do foco.
5. **Identificar e controlar o foco** (cirurgia, drenagem, remoção de corpo estranho, etc.).
6. **Reavaliar** clinicamente e por cultura em **48–72 h** (ou antes se deterioração): desescalonar espectro quando possível.

## Armadilhas frequentes

- **Hemocultura negativa** não exclui infecção grave nem dispensa procurar foco.
- **Antimicrobiano isolado** sem reposição volêmica adequada em choque hipovolémico/séptico falha o paciente.
- **Espectro excessivamente prolongado** sem critério aumenta resistência e efeitos adversos.

## Pronóstico

Depende da rapidez da estabilização, do controle do foco e das comorbidades; a mortalidade é maior quando há atraso na perfusão ou foco não drenado.
`.trim()

/** Modal rico — Sepse (estrutura por fluxo temporal, distinta da piometra). */
export const SEPSE_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'A **sépse** integra **infecção** e **resposta sistémica** com risco de **disfunção orgânica**. O raciocínio clínico prioriza **perfusão e oxigenação**, **amostras oportunas** e **controlo do foco** — o antimicrobiano é essencial, mas não substitui suporte hemodinâmico.',
  sections: [
    {
      id: 'def',
      title: 'Definição e âmbito',
      paragraphs: [
        'Em pequenos animais, opera-se com uma definição **prática**: suspeita ou evidência de **infecção** associada a **instabilidade** ou **disfunção orgânica** (cardiovascular, respiratória, renal, neurológica, metabólica). O foco pode ser óbvio (útero distendido, piotórax, pielonefrite obstrutiva) ou **oculto** no primeiro contacto.',
        'Marcadores laboratoriais isolados **não substituem** o julgamento à cabeceira; leucopenia ou leucocitose, hipoglicemia, hiperlactatemia ou azotemia podem **apoio** o quadro, com interpretação específica por espécie e contexto.',
      ],
    },
    {
      id: 'flow_time',
      title: 'Fluxo temporal na urgência',
      flow: {
        title: 'Do reconhecimento à reavaliação',
        steps: [
          { title: 'Reconhecer', subtitle: 'Taquicardia, taquipneia, hipotensão, alteração de perfusão, temperatura anómala, letargia grave — **integrar** sinais.' },
          { title: 'Estabilizar', subtitle: '**Fluidoterapia** e suporte respiratório; analgesia; corrigir hipóxia e hipoperfusão **antes** de “só mudar o antibiótico”.' },
          { title: 'Amostrar', subtitle: 'Hemocultura, urina, material de foco — **antes** da dose se o atraso não comprometer o doente.' },
          { title: 'Empirismo IV', subtitle: 'Espectro amplo conforme **protocolo institucional** até culturas e imagem.' },
          { title: 'Controlar foco', subtitle: 'Cirurgia, drenagem, remoção de dispositivo, desobstrução — **sem** controlo de foco, o tratamento falha.' },
          { title: 'Reavaliar 48–72 h', subtitle: 'Desescalonar com **identificação**; evitar esquema amplo sem critério prolongado.' },
        ],
      },
      callout: {
        kind: 'clinical',
        title: 'Perfusão antes do “próximo antibiótico”',
        text: 'Em instabilidade hemodinâmica, **volume e oxigénio** são interventos de primeira linha junto com o empirismo antimicrobiano. Trocar classe de fármaco sem endereçar hipoperfusão mantém o paciente em risco.',
      },
    },
    {
      id: 'bugs',
      title: 'Microbiologia e hemocultura',
      lead: 'O agente depende do **foco**; o empirismo inicial visa padrões locais (antibiograma agregado) e gravidade.',
      bullets: [
        '**Gram-negativos** (enterobactérias) e **anaeróbios** são relevantes em focos abdominais, uterinos e de mistura.',
        '**Gram-positivos** (estreptococos, estafilococos) entram em bacteremias de pele, odontogénicas ou dispositivos.',
        '**Hemocultura negativa** não exclui sepse — amostras mal cronometradas, antibiótico prévio ou carga bacteriana baixa.',
      ],
    },
    {
      id: 'pitfalls',
      title: 'Armadilhas na interpretação',
      table: {
        caption: 'Erros comuns que aumentam morbimortalidade',
        columns: ['Armadilha', 'Nota clínica'],
        rows: [
          ['Confundir “só febre” com estabilidade', 'Hipotermia ou febre dissimulada em idosos/gatos; avaliar perfusão.'],
          ['Antimicrobiano sem procurar foco', 'Sem drenagem/cirurgia quando indicado, o doente não melhora de forma sustentada.'],
          ['Espectro máximo indefinidamente', 'Reavaliar com cultura; desescalonar para stewardship.'],
          ['Ignorar comorbidades renais com aminoglicosídeo', 'Ajuste e monitorização obrigatórios se o protocolo incluir gentamicina.'],
        ],
      },
    },
    {
      id: 'rx',
      title: 'Antimicrobiano e stewardship',
      paragraphs: [
        'O empirismo **inicial** costuma ser **parenteral** e de **espectro amplo** até identificação; a **duração** e o **desescalonamento** seguem resolução clínica, controlo do foco e antibiograma — não um número fixo desligado do contexto.',
      ],
      callout: {
        kind: 'info',
        title: 'Linhas cadastradas no aplicativo',
        text: 'As **1ª e 2ª linhas** abaixo espelham esquemas típicos (beta-lactâmico + cobertura adicional); confirme sempre **bula, doses e protocolo local**.',
      },
    },
  ],
}
