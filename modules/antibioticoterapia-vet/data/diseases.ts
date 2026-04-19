import type { DiseaseSystem } from '../types'
import { PIOMETRA_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologyPiometra'
import { PNEUMONIA_PATHOPHYSIOLOGY_FULL, PNEUMONIA_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologyPneumonia'
import { CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_FULL, CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_VISUAL, CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_FULL, CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologyCystitis'
import { PIELONEFRITE_PATHOPHYSIOLOGY_FULL, PIELONEFRITE_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologyPielonefrite'
import { PERIOP_PATHOPHYSIOLOGY_FULL, PERIOP_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologyPeriop'
import { PIOTHORAX_PATHOPHYSIOLOGY_FULL, PIOTHORAX_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologyPiothorax'
import { SEPSE_PATHOPHYSIOLOGY_FULL, SEPSE_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologySepse'
import { PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN } from './pathophysiologySources'

const PIOMETRA_PATHOPHYSIOLOGY = `
## Definição, epidemiologia e complexo CEH–piometra

A **piometra** é uma doença uterina potencialmente fatal que resulta do acúmulo de material **mucóide a purulento** na cavidade uterina, habitualmente em **fêmeas intactas** sob **progesterona** endógena (fase lútea) ou **progestágenos exógenos**. Na medicina interna de pequenos animais descreve-se o **complexo CEH–piometra** (*cystic endometrial hyperplasia* associada a acúmulo infeccioso): sob estímulo progesterónico prolongado, o endométrio desenvolve **hiperplasia secretora**, **cistos glandulares** e secreção luminal aumentada, com **estase** e colonização **ascendente** a partir da flora vaginal e perineal. O espectro morfológico e clínico vai da **hidrometra** predominantemente mucóide a **supuração** franca com **toxemia**, **endotoxemia** e **sepse**. A incidência aumenta com a **idade** e com ciclos repetidos sem gestação; a predisposição de raça é referida em literatura para algumas linhagens, mas o risco global é elevado em qualquer fêmea intacta com ciclos.

## Bases hormonais, CEH e “terreno” infeccioso

A **progesterona** mantém o endométrio num estado **secretor** (semelhante ao necessário à implantação): **hipertrofia** das glândulas, acúmulo de muco e proteínas no lúmen e **redução relativa** da contratilidade miometrial “expulsiva” face ao que ocorre na fase folicular ou no pós-parto. Sem embrião, esse ambiente torna-se de **estase** — baixa renovação do conteúdo luminal e microambiente favorável à adesão bacteriana. Corpo lúteo persistente, **diestro** prolongado, **pseudogestação** ou **progestágenos** terapêuticos prolongam o estado. Ao nível do colo, a progesterona contribui frequentemente para **tonus** e **aposto** relativo, favorecendo o fenótipo **fechado** quando o conteúdo não drena para a vagina.

No endométrio hiperplásico, observam-se **cistos glandulares**, epitélio columnar secretor e, com a infecção, infiltrado **inflamatório** neutrofílico e necrose focal — alterações que, em termos de patologia geral, se enquadram em inflamação supurativa crónica com dano epitelial e, em casos graves, **alteração da parede** (afinamento, edema, fragilidade) que predispõe a **ruptura** e **peritonite** séptica.

## Mecanismos sistémicos: endotoxemia, inflamação e hemostase

Flora **ascendente**; **Escherichia coli** é o isolado mais referido em cães e gatos, seguida de outras **enterobactérias**, **estreptococos**, **estafilococos** e **anaeróbios** em evoluções prolongadas, necrose ou uso prévio de antibióticos. Os **LPS** das paredes dos Gram-negativos desencadeiam cascata de **citocinas** (TNF-α, IL-1, IL-6), activação endotelial e **disfunção vascular** — compatível com **SIRS** e **choque distributivo**. A leucopenia grave pode reflectir **sequestro** marginação ou consumo em quadros fulminantes.

A **disseminação intravascular coagulante (DIC)** é um risco em piometra séptica: consumo de factores de coagulação e plaquetas com hemorragias e, simultaneamente, microtrombos — integrar **tempos de coagulação**, **plaquetas** e **fibrinogénio** quando o quadro e o laboratório o permitirem. **Azotemia** é frequentemente **pré-renal** (desidratação, baixo débito) mas pode complicar-se por **injúria renal** se a hipoperfusão persistir.

**Poliúria e polidipsia** são comuns e multifactoriais: **ADH** relativo na doença sistémica, hiperglicemia de stress, ou resposta renal à hipovolémia — não implicam por si sós diabetes insipidus.

## Cão vs gato: nuances de apresentação

Em **cães**, a distensão abdominal e o corrimento vulvar (piometra aberta) são pistas frequentes; em **gatos**, o útero distendido pode ser menos evidente ao exame superficial e o quadro pode limitar-se a **apatia**, anorexia e vómito — o índice de suspeição deve ser alto em qualquer fêmea intacta doente. O diagnóstico por **ultrassonografia** (útero globular, conteúdo fluido/particulado) é central; em dúvida, correlacionar com **progesterona** e contexto reprodutivo.

## Diagnóstico e diferenciais

Além do padrão descrito (letargia, anorexia, vómito, POLP, dor, distensão), o laboratório mostra frequentemente **leucocitose** com desvio à esquerda ou, nos graves, **leucopenia**; **hiperproteinemia**; **azotemia**; alterações hepáticas de stress. Diferenciais obrigatórios: **gestação**, **metrite** pós-parto, **piometra de coto** (*stump*) com **remanescente ovariano**, **neoplasia** uterina, **pioperitónio** de outra origem, **piossalpingite**.

## Tratamento: ovariohisterectomia, estabilização e opções médicas

A **OHE** após **estabilização** (fluidoterapia, analgesia, oxigénio, correção de alterações de base) é o tratamento **definitivo** na maioria dos serviços: elimina a fonte de **progesterona** e o foco séptico. O **antimicrobiano sistémico** é **adjuvante** e deve cobrir **Gram-negativos** e, conforme protocolo, **anaeróbios**; via **IV** quando há instabilidade. A **duração** pós-operatória depende da **resolução clínica**, **culturas** (sangue, conteúdo uterino quando seguro) e critérios de stewardship — não um número fixo isolado.

A **terapia exclusivamente médica** (p.ex. **prostaglandinas**, **antagonistas/antiprogestágenos** conforme jurisdição e protocolo) reserva-se a **casos seleccionados**, equipa experiente e **monitorização** estreita; há risco de **ruptura uterina**, **recidiva** e **infertilidade** — **consentimento informado** e plano de seguimento imagiológico e laboratorial.

## Complicações e prognóstico

**Sepse**, **DIC**, **perfuração** uterina com **peritonite**, **IRA**, **choque** refratário. Com **OHE** precoce e suporte adequado, o prognóstico é em geral **favorável**; a mortalidade concentra-se em apresentações tardias e instabilidade hemodinâmica grave. Após tratamento médico bem-sucedido, documentam-se **taxas elevadas de recidiva** e problemas de **fertilidade** subsequentes.

${PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN}
`.trim()

/**
 * Catálogo clínico por sistema — reconstrução progressiva.
 * Fichas com fisiopatologia longa + modal rico; linhas alinhadas aos regimes v2 (regimens.ts).
 */
export const DZ_SEED: DiseaseSystem = {
  'Sistema Reprodutor': [
    {
      name: 'Piometra',
      pathogens:
        'Flora ascendente; **Escherichia coli** é o isolado mais comum em cães e gatos; podem ocorrer outros bacilos Gram-negativos, estreptococos (Streptococcus spp.), estafilococos (Staphylococcus spp.) e bactérias anaeróbias conforme tempo de evolução e uso prévio de antimicrobianos.',
      pathophysiologyFull: PIOMETRA_PATHOPHYSIOLOGY,
      pathophysiologyVisual: PIOMETRA_PATHOPHYSIOLOGY_VISUAL,
      firstLine: {
        title: '1ª linha de tratamento',
        presentation:
          '**Duas opções excludentes** de monoterapia empírica perioperatória (escolher **uma**; não administrar os dois esquemas como associação de 1ª intenção). A decisão entre elas deve considerar disponibilidade, via (oral vs parenteral), estabilidade hemodinâmica, função renal/hepática e histórico de reações.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Trimetoprim + Sulfa',
                rationale:
                  'Combinação sulfonamida + trimetoprim com boa distribuição tecidual e cobertura empírica habitual para enterobactérias relevantes na piometra; útil como opção oral quando o paciente tolera e não há contraindicações (p.ex. gestação, hipersensibilidade, vigilância com alteração hepato‑renal).',
              },
              {
                name: 'Ampicilina (IV)',
                rationale:
                  'Beta‑lactâmico de amplo espectro com uso parenteral em contexto perioperatório; opção quando é necessária terapia IV inicial (ex.: jejum pré‑anestésico, necessência de absorção previsível). Ajustar duração e rota conforme resposta clínica e, quando possível, cultura.',
              },
            ],
          },
        ],
      },
      secondLine: {
        title: '2ª linha de tratamento',
        presentation:
          'Para **casos graves** (p.ex. instabilidade hemodinâmica, suspeita de sepse grave, falha clínica com esquema de 1ª linha) ou quando há contraindicação/inadequação dos agentes anteriores — **opções excludentes** entre si.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Enrofloxacina',
                rationale:
                  'Fluoroquinolona com boa atividade contra muitas enterobactérias; reservar para cenários em que o risco‑benefício favorece (atenção às contraindicações em filhotes e cautela em gatos; seguir literatura e bula). Útil quando se busca cobertura oral/IV alternativa em infecção sistêmica associada.',
              },
              {
                name: 'Amoxicilina + Clavulanato',
                rationale:
                  'Beta‑lactâmico associado a inibidor de beta‑lactamase, com cobertura ampliada para alguns Gram‑positivos e parte dos Gram‑negativos produtores de beta‑lactamase; alternativa quando o esquema prévio não é adequado ou a cultura/orientação clínica favorece esta classe.',
              },
            ],
          },
        ],
      },
      duration:
        'Antimicrobiano perioperatório e pós‑operatório: em geral **cerca de 5–6 dias** quando a evolução é favorável, estendendo se persistirem sinais de sepse, foco residual ou cultura que o justifique; sempre individualizar ao paciente.',
      notes:
        '**OHE** é o tratamento de base na maioria dos casos. Piometra fechada costuma justificar estabilização e antimicrobiano antes/durante o ato cirúrgico; piometra aberta pode ter curso variável, mas sepse não é excluída. Cultura de sangue/conteúdo uterino quando seguro orienta desescalonamento. Terapia exclusivamente clínica sem cirurgia é excepcional e exige seleção rigorosa de casos e acompanhamento próximo.',
    },
  ],

  'Sepse e instabilidade sistémica': [
    {
      name: 'Sepse (foco inicialmente não especificado)',
      pathogens:
        'Dependente do foco oculto ou em definição: **Gram-negativos** (enterobactérias), **Gram-positivos** (estreptococos, estafilococos), **anaeróbios** e outros conforme aspiração, foco abdominal, pele ou cateter. O empirismo inicial visa o padrão institucional até **hemocultura** e identificação.',
      pathophysiologyFull: SEPSE_PATHOPHYSIOLOGY_FULL,
      pathophysiologyVisual: SEPSE_PATHOPHYSIOLOGY_VISUAL,
      firstLine: {
        title: '1ª linha — empirismo IV (hospitalar)',
        presentation:
          'Escolher **um** dos esquemas parenterais abaixo (associações **simultâneas** dentro de cada caixa), conforme **função renal** e disponibilidade — comparar esquema amplo (beta-lactâmico + metronidazol + fluoroquinolona) vs esquema com aminoglicosídeo, conforme protocolo institucional. Estabilização hemodinâmica e oxigenação são paralelas ao antimicrobiano.',
        regimes: [
          {
            label: 'Esquema amplo com fluoroquinolona (ex.: beta-lactâmico + metronidazol + enrofloxacina)',
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Beta-lactâmico com inibidor de beta-lactamase: cobertura para muitos Gram-positivos e Gram-negativos; base empírica frequente em sepse até cultura.',
              },
              {
                name: 'Metronidazol',
                rationale:
                  'Cobertura de **anaeróbios** relevantes em focos mistos ou abdominais; integra o esquema amplo do protocolo.',
              },
              {
                name: 'Enrofloxacina',
                rationale:
                  'Fluoroquinolona para reforço de Gram-negativos no esquema triplo; cautela em filhotes e gatos (bula); ajuste se contraindicado.',
              },
            ],
          },
          {
            label: 'Alternativa com aminoglicosídeo (ex.: beta-lactâmico + gentamicina + metronidazol)',
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Mesma lógica de beta-lactâmico de largo espectro; mantém núcleo empírico enquanto aguarda identificação.',
              },
              {
                name: 'Gentamicina',
                rationale:
                  'Aminoglicosídeo com forte efeito sobre Gram-negativos; **obrigatório** ajuste e monitorização em insuficiência renal — evitar ou substituir se contraindicado.',
              },
              {
                name: 'Metronidazol',
                rationale:
                  'Componente anaeróbio alinhado ao esquema alternativo de sepse grave no protocolo.',
              },
            ],
          },
        ],
      },
      secondLine: {
        title: '2ª linha — desescalonamento após estabilização (exemplos VO)',
        presentation:
          'Quando o paciente **está estável**, o **antibiograma** permite estreitar o espectro. Abaixo, **opções orais frequentes** após fase IV — escolher **uma** conforme sensibilidade; o foco deve estar **controlado**.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Amoxicilina + Clavulanato',
                rationale:
                  'Transição oral comum quando os germes isolados são compatíveis e não há contraindicação; ajustar duração à cultura e resolução clínica.',
              },
              {
                name: 'Trimetoprim + Sulfa',
                rationale:
                  'Alternativa oral para enterobactérias sensíveis em desescalonamento; vigilância hepato-renal e interações conforme bula.',
              },
            ],
          },
        ],
      },
      duration:
        'Duração variável: empirismo amplo nas primeiras **48–72 h** com reavaliação obrigatória; após desescalonamento, dias a semanas conforme resolução clínica, cultura e foco — não prolongar espectro amplo sem critério.',
      notes:
        'Marcar **sepse** no perfil do paciente no motor v2 alinha cenários hospitalares. **Hemocultura** e amostras de foco **antes** da próxima dose de ATB quando **seguro** — em choque, minutos de estabilização vêm primeiro. Priorizar **fluidoterapia**, **oxigénio** e **controlo de foco** (drenagem, cirurgia, desobstrução) em paralelo ao empirismo IV; em **gatos**, hipotermia/bradicardia podem mascarar gravidade. Stewardship: página **Referências** (Guia CCIH).',
    },
  ],

  'Sistema Respiratório': [
    {
      name: 'Pneumonia (suspeita clínica / radiológica)',
      pathogens:
        'Variável: **estreptococos**, **estafilococos**, **enterobactérias** e, em aspiração, flora **orofaríngea** e **anaeróbios**; **Mycoplasma** conforme região. Vírus podem predispor a sobrecrescimento bacteriano — o antibiótico nem sempre é necessário se o quadro for estritamente viral (julgar caso a caso).',
      pathophysiologyFull: PNEUMONIA_PATHOPHYSIOLOGY_FULL,
      pathophysiologyVisual: PNEUMONIA_PATHOPHYSIOLOGY_VISUAL,
      firstLine: {
        title: '1ª linha — ambulatorial estável',
        presentation:
          '**Opções orais excludentes** para o doente estável hemodinamicamente, sem dispneia grave — doxiciclina ou amoxicilina + clavulanato. Reavaliar em 48–72 h.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Doxiciclina',
                rationale:
                  'Útil em múltiplos cenários respiratórios comunitários; boa penetração tecidual; atenção a contraindicações por idade/espécie e interações.',
              },
              {
                name: 'Amoxicilina + Clavulanato',
                rationale:
                  'Beta-lactâmico com inibidor: cobertura ampliada a vários patógenos típicos; alternativa oral frequente quando a doxiciclina não é primeira escolha.',
              },
            ],
          },
        ],
      },
      secondLine: {
        title: '2ª linha — internado / IV',
        presentation:
          'Paciente internado ou que necessita de parenteral até transição (ex.: ampicilina + sulbactam IV).',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Beta-lactâmico IV empírico até cultura de vias aéreas ou melhora clínica; base habitual em pneumonia não complicada internada.',
              },
            ],
          },
        ],
      },
      thirdLine: {
        title: '3ª linha — grave / séptico',
        presentation:
          'Ampliação empírica apenas com **critério de gravidade** (beta-lactâmico IV + fluoroquinolona em associação); hemocultura e suporte respiratório. O beta-lactâmico costuma ser o mesmo da 2ª linha; abaixo, o agente acrescentado ao duplo.',
        regimes: [
          {
            label: 'Associação (beta-lactâmico IV da 2ª linha + reforço)',
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Enrofloxacina',
                rationale:
                  'Adicionada ao beta-lactâmico IV já em curso (p.ex. ampicilina + sulbactam, como na 2ª linha) em cenários sépticos com critério de ampliação; reservar para instabilidade documentada e seguir bula (cautela em filhotes/gatos).',
              },
            ],
          },
        ],
      },
      duration:
        'Ambulatorial: frequentemente **7–14 dias** conforme resposta; internado/septic: até estabilização e depois transição VO — individualizar; reavaliação imagiológica conforme protocolo.',
      notes:
        'Radiografia **não prova** bacteriano vs viral nem exclui **edema cardiogénico** ou **corpo estranho**. Avaliar **gravidade respiratória** (taquipneia em repouso no gato, esforço, cor); **oxigenoterapia** e **fluidos** com cautela se cardiopata. Reavaliar **48–72 h**: falha sugere aspiração repetida, complicação pleural ou diagnóstico alternativo. Descalonar com cultura/material de vias aéreas quando possível.',
    },
    {
      name: 'Piotórax (empiema pleural)',
      pathogens:
        'Tipicamente **polimicrobiana**: **aeróbios** (enterobactérias, estreptococos, estafilococos, *Pasteurella* spp.) e **anaeróbios** (*Bacteroides*, *Fusobacterium*, outros) conforme origem — **parapneumónico** (rotura de pneumonia/abscesso), **mordedura** / trauma, **corpo estranho** ou extensão de foco cervical/mediastinal. Cultura do **líquido pleural** (e **hemocultura** se instável) orienta desescalonamento; hemocultura pode ser **negativa** apesar de empiema.',
      pathophysiologyFull: PIOTHORAX_PATHOPHYSIOLOGY_FULL,
      pathophysiologyVisual: PIOTHORAX_PATHOPHYSIOLOGY_VISUAL,
      firstLine: {
        title: '1ª linha — empírico IV com drenagem',
        presentation:
          '**Drenagem pleural eficaz** é o pilar; o antimicrobiano é adjuvante até identificação. Esquema IV empírico habitual para flora mista (beta-lactâmico + anaeróbio).',
        regimes: [
          {
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Beta-lactâmico com cobertura para vários Gram-positivos e Gram-negativos; núcleo do empirismo até cultura pleural.',
              },
              {
                name: 'Metronidazol',
                rationale:
                  'Cobertura de **anaeróbios** relevantes no empiema e focos de aspiração; integra o esquema misto típico.',
              },
            ],
          },
        ],
      },
      secondLine: {
        title: '2ª linha — alternativa empírica',
        presentation:
          'Quando o protocolo local prevê esquema alternativo (p.ex. sensibilidade, intolerância ou disponibilidade) — **opções excludentes** no mesmo nível clínico.',
        regimes: [
          {
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Clindamicina',
                rationale:
                  'Boa penetração e atividade contra anaeróbios e alguns Gram-positivos; seguir bula e função hepática.',
              },
              {
                name: 'Enrofloxacina',
                rationale:
                  'Reforço de Gram-negativos no duplo alternativo; cautela em filhotes e gatos; ajustar se contraindicado.',
              },
            ],
          },
        ],
      },
      thirdLine: {
        title: '3ª linha — grave / instabilidade séptica',
        presentation:
          'Ampliação empírica com **critério de gravidade**; hemocultura e suporte respiratório. O beta-lactâmico costuma continuar o da 1ª linha; abaixo, o reforço acrescentado.',
        regimes: [
          {
            label: 'Associação (beta-lactâmico IV + reforço de Gram-negativos)',
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Manter beta-lactâmico IV até cultura pleural e estabilização; base do esquema ampliado em cenário grave.',
              },
              {
                name: 'Enrofloxacina',
                rationale:
                  'Reforço de Gram-negativos em instabilidade séptica com critério de ampliação; cautela em filhotes/gatos e função renal; seguir stewardship e bula.',
              },
            ],
          },
        ],
      },
      duration:
        'Frequentemente **várias semanas** de antimicrobiano **IV** (ou após transição institucional), até **resolução clínica**, **normalização laboratorial** e **melhora imagiológica** do derrame/parênquima — individualizar; não encerrar só por número de dias sem controlo.',
      notes:
        '**Emergência**: hipoxemia e possível **sepse** — oxigénio, mínimo stress (risco em **gato** dispneico), fluidos e analgesia conforme protocolo. Sem **drenagem eficaz** do pus, antibiótico sistémico **insuficiente**. Diferencial de outras **efusões** (hemotórax, quilotórax, transudato, FIP) antes de rotular; confirmar **pus** ao fluido. **Loculações** ou empiema organizado podem exigir **lavagem**, VATS ou toracotomia. Risco de **edema de reexpansão** e **pneumotórax** iatrogénico — monitorizar após drenagem móvel.',
    },
  ],

  'Sistema Urinário': [
    {
      name: 'Cistite esporádica (ITU inferior não complicada)',
      pathogens:
        'Predominam **enterobactérias** (p.ex. **Escherichia coli**); outros germes conforme histórico de antibióticos, anatomicamente complicada ou comunitários locais.',
      pathophysiologyFull: CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_FULL,
      pathophysiologyVisual: CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_VISUAL,
      firstLine: {
        title: '1ª linha — ambulatorial estável',
        presentation:
          '**ITU inferior não complicada**: espectro **relativamente estreito**; **urinocultura** quando possível antes de repetir ciclos idênticos. **Opções orais excludentes** — fluoroquinolonas como alternativas, não como rotina universal.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Amoxicilina + Clavulanato',
                rationale:
                  'Aminopenicilina + inibidor de beta-lactamase: linha comum em ITU não complicada; revisar com cultura e resposta em 48–72 h.',
              },
              {
                name: 'Marbofloxacina',
                rationale:
                  'Fluoroquinolona oral como alternativa quando indicada; reservar para critério clínico/stewardship — não padrão universal para primeiro episódio simples.',
              },
            ],
          },
        ],
      },
      secondLine: {
        title: '2ª linha — complicada / necessidade de IV',
        presentation:
          'Internação, **obstrução**, gravidez sintomática relevante, **sepse** ou falha do VO: tratar como **ITU complicada** até excluir pielonefrite; cultura guia desescalonamento.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Beta-lactâmico IV empírico até antibiograma e estabilização; transição VO quando seguro.',
              },
            ],
          },
        ],
      },
      thirdLine: {
        title: '3ª linha — grave / ascensão',
        presentation:
          'Critério de **gravidez** ou suspeita de **ascensão** com necessidade de esquema ampliado; **hemocultura** quando indicado. Reforço em relação ao beta-lactâmico IV.',
        regimes: [
          {
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale: 'Base IV mantida até cultura e resolução do quadro.',
              },
              {
                name: 'Enrofloxacina',
                rationale:
                  'Reforço de Gram-negativos em cenário grave; cautelas felinas e função renal; ajustar com cultura.',
              },
            ],
          },
        ],
      },
      duration:
        'Cursos **curtos** em primeira linha quando resposta favorável; prolongar só com critério (recidiva, complicação, cultura).',
      notes:
        'Diferenciar **bacteriúria assintomática** (muitas vezes sem tratamento) de **cistite sintomática**. Em gato, interpretação de urocultura pode ser desafiadora.',
    },
    {
      name: 'Cistite recorrente',
      pathogens:
        'Recidivas: frequentemente **enterobactérias**; considerar resistência adquirida, **foco anatómico** ou persistência de fatores predisponentes. **Cultura** antes de novo empirismo repetido.',
      pathophysiologyFull: CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_FULL,
      pathophysiologyVisual: CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_VISUAL,
      firstLine: {
        title: '1ª linha — estável (idealmente guiada por cultura)',
        presentation:
          'Priorizar **amostra de urina** antes de novo ciclo idêntico quando o quadro permitir. Se não houver cultura recente e o doente está estável, pode iniciar-se esquema **típico de ITU** — com reavaliação obrigatória.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Amoxicilina + Clavulanato',
                rationale:
                  'Esquema oral habitual; duração e escolha finais favorecidos por antibiograma prévio ou de controlo.',
              },
              {
                name: 'Marbofloxacina',
                rationale:
                  'Alternativa quando sensibilidade/indicação e stewardship concordam; evitar “rodízio” de quinolonas sem microbiologia.',
              },
            ],
          },
        ],
      },
      secondLine: {
        title: '2ª linha — internado / complicada',
        presentation:
          'Internação, dor sistémica relevante, ou suspeita de **complicação ascendente**: IV até melhora; exclusão de **pielonefrite** e obstrução.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale: 'Beta-lactâmico IV até cultura e estabilização clínica.',
              },
            ],
          },
        ],
      },
      thirdLine: {
        title: '3ª linha — grave / instabilidade',
        presentation:
          'Tratar como **ITU complicada** ou ascensão até prova em contrário; suporte e amostras. Esquema ampliado conforme protocolo institucional.',
        regimes: [
          {
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale: 'Núcleo IV até definição microbiológica e foco.',
              },
              {
                name: 'Enrofloxacina',
                rationale:
                  'Ampliação empírica de Gram-negativos em cenários selecionados; descalonar com cultura e função renal.',
              },
            ],
          },
        ],
      },
      duration:
        'Definir após identificação; episódios recorrentes justificam investigação de **causa subjacente** (anatómica, comportamental).',
      notes:
        'Diferenciar **reinfecção** de **persistência** e de bacteriúria assintomática. Evitar repetir o mesmo empirismo sem amostra.',
    },
    {
      name: 'Pielonefrite',
      pathogens:
        'Predominam **enterobactérias** (p.ex. **Escherichia coli**); outros germes conforme cateter, hospitalização prévia ou uso prévio de antibióticos. Hemocultura pode ser positiva em bacteremia associada.',
      pathophysiologyFull: PIELONEFRITE_PATHOPHYSIOLOGY_FULL,
      pathophysiologyVisual: PIELONEFRITE_PATHOPHYSIOLOGY_VISUAL,
      firstLine: {
        title: '1ª linha — internado / complicado (IV)',
        presentation:
          'Esquema IV inicial enquanto aguarda cultura. Muitos doentes com pielonefrite franca necessitam internação; “ambulatorial estável” é exceção e exige confirmação cuidadosa.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Beta-lactâmico parenteral com boa utilidade em ITU complicada até antibiograma; ajustar duração à resposta e função renal.',
              },
            ],
          },
        ],
      },
      secondLine: {
        title: '2ª linha — grave / esquema ampliado',
        presentation:
          'Associação empírica mais ampla conforme gravidade (beta-lactâmico + fluoroquinolona); indicada quando o protocolo local prevê reforço de Gram-negativos ou sepse associada.',
        regimes: [
          {
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Base do esquema ampliado; mantém cobertura para germes sensíveis a beta-lactâmicos.',
              },
              {
                name: 'Enrofloxacina',
                rationale:
                  'Fluoroquinolona para reforço empírico de Gram-negativos no protocolo de pielonefrite grave; cautelas em filhotes/gatos e função renal.',
              },
            ],
          },
        ],
      },
      duration:
        'Curso **mais longo** que cistite não complicada: frequentemente **10–14 dias** ou mais conforme resolução, cultura e presença de obstrução; sempre individualizar.',
      notes:
        '**Urocultura** e, se sistémico, **hemocultura**. **Imagem** se suspeita de obstrução ou não resposta. **Desobstruir** antes de esperar cura só com antibiótico.',
    },
  ],

  Perioperatório: [
    {
      name: 'Profilaxia e terapia perioperatória (cenários básicos)',
      pathogens:
        'Na **profilaxia**, o alvo são patógenos típicos de **pele** e campo cirúrgico; em **infecção estabelecida**, o espectro alarga-se conforme foco e cultura do sítio.',
      pathophysiologyFull: PERIOP_PATHOPHYSIOLOGY_FULL,
      pathophysiologyVisual: PERIOP_PATHOPHYSIOLOGY_VISUAL,
      firstLine: {
        title: '1ª linha — profilaxia (cirurgia limpa / eletiva)',
        presentation:
          'Muitos protocolos **não** indicam antimicrobiano sistémico de **rotina** em cirurgia limpa eletiva **sem** fatores de risco. Quando o **serviço** prevê profilaxia (ex.: implante, tempo prolongado, fatores de risco), costuma usar-se **dose única** pré-incisão conforme bula.',
        regimes: [
          {
            mode: 'opcoes_exclusivas',
            drugs: [
              {
                name: 'Cefazolina (IV)',
                rationale:
                  'Cefalosporina 1ª geração: profilaxia perioperatória típica em dose única no timing adequado; repetir só se protocolo local previr (duração/sangramento). Adaptar se colonização por MRSP/MRSA ou alergia grave documentada.',
              },
            ],
          },
        ],
      },
      secondLine: {
        title: '2ª linha — cirurgia contaminada / infecção tratada',
        presentation:
          'Cirurgia **contaminada** ou infecção já estabelecida: tratar como **terapêutico**, não como profilaxia breve — cultura do sítio quando possível e controlo do **foco** cirúrgico.',
        regimes: [
          {
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Beta-lactâmico de amplo espectro até cultura em infecção de partes moles/tórax-abdomen conforme contexto.',
              },
              {
                name: 'Metronidazol',
                rationale:
                  'Reforço de **anaeróbios** em campo contaminado (trato digestivo, feridas profundas) até identificação.',
              },
            ],
          },
        ],
      },
      thirdLine: {
        title: '3ª linha — instabilidade séptica peroperatória',
        presentation:
          '**Sepse** ou choque: tratar como **sepse** até foco controlado — não confundir com profilaxia simples; amostras antes do antibiótico quando **seguro**.',
        regimes: [
          {
            label: 'Ampliação empírica (beta-lactâmico IV + reforço)',
            mode: 'combinacao_simultanea',
            drugs: [
              {
                name: 'Ampicilina + Sulbactam',
                rationale:
                  'Base IV mantida até cultura e controlo do foco em sepse peroperatória; não substituir profilaxia simples por esquema prolongado sem critério.',
              },
              {
                name: 'Enrofloxacina',
                rationale:
                  'Reforço de Gram-negativos em cenário séptico com critério de ampliação; reavaliação precoce e descalonamento; cautelas felinas e renais.',
              },
            ],
          },
        ],
      },
      duration:
        '**Profilaxia**: em geral **dose única** ou curto conforme lista institucional; **terapêutico**: até resolução clínica + cultura e controlo de foco.',
      notes:
        'Não **prolongar** profilaxe “por precaução”. Cirurgia **infectada** exige duração e espectro de **tratamento**, não de profilaxis isolada.',
    },
  ],
}
