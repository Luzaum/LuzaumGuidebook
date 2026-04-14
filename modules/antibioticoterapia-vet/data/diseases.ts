import type { DiseaseSystem } from '../types'
import { PIOMETRA_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologyPiometra'
import { PNEUMONIA_PATHOPHYSIOLOGY_FULL, PNEUMONIA_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologyPneumonia'
import { PIELONEFRITE_PATHOPHYSIOLOGY_FULL, PIELONEFRITE_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologyPielonefrite'
import { SEPSE_PATHOPHYSIOLOGY_FULL, SEPSE_PATHOPHYSIOLOGY_VISUAL } from './pathophysiologySepse'

const PIOMETRA_PATHOPHYSIOLOGY = `
## Definição e contexto

A piometra é uma doença uterina potencialmente grave que resulta da acumulação de material purulento ou mucopurulento dentro da cavidade uterina, habitualmente em fêmeas intactas sob influência cíclica da progesterona. O termo engloba um espectro desde a acumulação predominantemente mucóide (cenários de “piometra mucóide” ou hidrometra complexa em algumas classificações) até coleções francamente supurativas, com variável graus de resposta sistêmica.

## Bases hormonais e fisiopatologia endócrina

A progesterona, produzida pelo corpo lúteo na fase lútea (ou mantida por terapias exógenas com progestágenos), induz alterações secretoras no endométrio canino e felino compatíveis com o chamado “estado secretor” ou “estado de receptividade progesterônica”: glândulas endometriais hipertrofiam, aumenta a secreção e reduz-se a motilidade miometrial fisiológica compatível com eventuais adaptações para gestação. Em conjunto, esses fenômenos favorecem estase de conteúdo luminal, microambiente propício à colonização bacteriana ascendente e persistência de infecção quando a barreira imune local e os mecanismos de depuração uterina não contêm a carga microbiana.

Na ausência de gestação, o útero permanece sob estímulo progesterônico prolongado (ciclos estrais longos, pseudogestação, ou uso de progestágenos), o que pode perpetuar o estado secretor e a estase. O epitélio endometrial pode sofrer alterações inflamatórias crônicas e exacerbações agudas; a mucosa torna-se mais vulnerável à aderência bacteriana, invasão tecidual e toxemia por absorção de endotoxinas e produtos inflamatórios, especialmente quando há comprometimento vascular, necrose ou perfuração.

## Aspectos infecciosos

O trato reprodutivo distal e a vagina hospedam flora mista; em condições de estase e hiperplasia secretora, bactérias entéricas e da pele podem ascender. Em cães e gatos, **Escherichia coli** é frequentemente isolada, refletindo origem gastrointestinal/perineal e capacidade de aderir ao epitélio e biofilme. Outras enterobactérias, estreptococos (Streptococcus spp.), estafilococos (Staphylococcus spp.) e bactérias anaeróbias podem participar do quadro, em especial quando há tempo prolongado de evolução, devitalização tecidual ou sepse. O padrão de sensibilidade varia com a comunidade e o uso prévio de antimicrobianos; por isso a cultura, quando clinicamente segura e oportuna, informa desescalonamento.

Distinção conceitual útil na prática:

- **Piometra “aberta”**: o colo permite drenagem parcial do conteúdo para a vagina, com corrimento visível em muitos casos; a apresentação sistêmica pode ser mais atenuada, mas não exclui sepse.
- **Piometra “fechada”**: o colo permanece relativamente aposto, acumula-se volume intrauterino, com maior risco de distensão importante, dor, choque endotóxico e alterações hemodinâmicas.

## Quadro clínico e diagnóstico (visão de livro-texto)

Sinais podem incluir letargia, anorexia, vômito, polidipsia e poliúria (associadas a mecanismos diversos incluindo efeitos de toxinas/endotoxemia e resposta renal), febre ou hipotermia, dor abdominal e distensão. Em gatas, o espectro pode ser mais dissimulado. O achado de secreção purulenta ou mucopurulenta na vulva é altamente sugestivo quando presente, mas a ausência não exclui diagnóstico.

Exames de imagem (ultrassonografia como primeira linha na maioria dos contextos) mostram distensão uterina com conteúdo fluido/particulado; a correlação com histórico reprodutivo e achados laboratoriais (leucograma, perfil metabólico) sustenta o diagnóstico. O hemograma frequentemente revela leucocitose com desvio à esquerda; em formas graves, pode haver leucopenia. Alterações hepáticas reativas e azotemia pré-renais podem ocorrer por desidratação e sepse.

## Tratamento — papel da cirurgia e do antimicrobiano

A **ovariohisterectomia** remove a fonte hormonal (progesterona) e o órgão afetado, sendo o tratamento definitivo na maioria dos casos clínicos estáveis o suficiente para anestesia. O papel do antimicrobiano sistémico é **adjuvante**: cobrir bacteremia/endotoxemia, reduzir complicações perioperatórias e tratar sepse quando presente. A escolha empírica deve considerar espectro para Gram-negativos e anaeróbios relevantes, via de administração, estado hemodinâmico e função orgânica.

Em cenários excepcionais de piometra aberta com estabilidade rigorosa, protocolos médicos podem ser discutidos com ressalvas (risco de recidiva, piometra fechada subsequente, limitações de fertilidade); essa decisão depende de consenso com tutor, disponibilidade de monitorização e literatura de referência, não sendo abordagem de primeira linha na maioria dos serviços.

## Evolução, complicações e prognóstico

Sem tratamento adequado, a evolução pode incluir sepse, coagulopatias, perfuração uterina e peritonite — com mortalidade relevante. Com ovariohisterectomia precoce e suporte intensivo quando necessário, o prognóstico costuma ser favorável; o tempo de antimicrobianos pós-operatório deve refletir resolução clínica, cultura quando disponível e critérios de estabilização, não um número fixo isolado do contexto clínico.
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
        'Marcar **sepse** no perfil do paciente no motor v2 alinha cenários hospitalares. Hemocultura antes do antibiótico quando **seguro**; priorizar **fluidoterapia** e **oxigénio** em instabilidade. Ver cartões de hospital e stewardship no módulo.',
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
        'Radiografia **não prova** bacteriano vs viral. Considerar **oxigenoterapia** e **fluidos** antes de decisões finas. Descalonar com cultura/citologia quando disponível.',
    },
  ],

  'Sistema Urinário': [
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
}
