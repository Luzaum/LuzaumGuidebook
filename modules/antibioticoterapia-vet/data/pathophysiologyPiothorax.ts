import type { PathophysiologyVisual } from '../types'
import { PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN, PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN } from './pathophysiologySources'

export const PIOTHORAX_PATHOPHYSIOLOGY_FULL = `
## Definição

**Piotórax** (**empiema pleural**) é efusão pleural **supurativa** — acúmulo de **pus** (material rico em neutrófilos degenerados, detritos celulares e frequentemente flora mista) entre as **lâminas visceral e parietal** da pleura. Em medicina interna de pequenos animais é **emergência** respiratória e muitas vezes **sistémica**: concorrem hipoxemia, trabalho respiratório aumentado e risco de **sepse** ou **choque** se a drenagem for inadequada.

Não confundir com **hemotórax**, **líquido de ascite** transudativo, **quitórax** ou **derrame parapneumónico seroso** sem componente purulento — o **tratamento** e o **prognóstico** mudam; a **citologia** e o **aspecto macroscópico** do fluido são centrais.

## Etiologias e mecanismos de chegada do pus à pleura

### Extensão de foco pulmonar ou brônquico

**Pneumonia** complicada com **necrose** e **rotura** para pleura ou **abscesso** pulmonar que rói para o espaço pleural gera o padrão “**parapneumónico**”. O mesmo raciocínio aplica-se a alguns **corpos estranhos** traqueobrônquicos com supuração e comunicação pleural.

### Inoculação direta

**Mordeduras** (gatuno ou cão-cão), **ferimentos penetrantes**, **espinhos** ou migração de corpo estranho na parede torácica inoculam **flora oral**, **cutânea** ou ambiental na pleura. Em **gatos**, o episódio de luta nem sempre é observado pelo proprietário; a suspeição deve ser alta com efusão pleural **supurativa** e história compatível.

### Extensão de focos cervicais / mediastinais / esofágicos

**Abscesso** de partes mois, **piomiosite**, ou complicações **para-esofágicas** (p.ex. perfuração esofágica, migras de corpo estranho) podem drenar ou estender-se para o mediastino e pleura — o quadro pode ser bilateral quando o mediastino está permeável ao material.

### Menos frequentes

**Iatrogenia** (complicação pós-cirúrgica, punção), **neoplasia** com infecção secundária e **tuberculose** (mais relevante em contextos endémicos e diagnóstico por epidemiologia e cultura específica).

## Microbiologia típica

A flora é em geral **polimicrobiana**: **aeróbios** (enterobactérias, estafilococos, estreptococos, *Pasteurella* spp.) e **anaeróbios** (*Bacteroides*, *Fusobacterium*, outros bacilos anaeróbios Gram-negativos, cocáceos anaeróbios) em combinação variável. Enterobactérias e **anaeróbios** reforçam a lógica de **beta-lactâmico de amplo espectro** + **metronidazol** ou alternativas com cobertura mista **institucional** até antibiograma.

**Não** confiar apenas em hemocultura negativa: o foco pode estar **pleural** sem bacteremia contínua.

## Fisiopatologia respiratória e hemodinâmica

### Volume pleural e mecânica

A coleção reduz o **volume** de ventilação útil, aumenta a **pressão intrapleural** no hemi-tórax afectado e força o colapso / compressão **parcial do pulmão** ipsilateral. Se o **mediastino** é móvel e o líquido é volumoso, pode haver **compressão contralateral** por desvio — ambos os pulmões perdem área ventilada.

### Trocas gasosas

**Hipoxemia** resulta sobretudo de **shunt** (perfusão de território mal ventilado) e **baixa V/Q** regional. O doente tenta compensar com **taquipneia** e **aumento do trabalho respiratório**; **fadiga** muscular e **hipoxemia refratária** aparecem nos graves. **Oxigénio suplementar** ajuda parcialmente conforme o mecanismo — não substitui **drenagem** se há coleção compressiva maciça.

### Circulação

**Desvio mediastinal** extremo e **pressão intratorácica** elevada podem comprometer **retorno venoso** e **débito cardíaco**. Na urgência, **estresse** (lidar, radiografias forçadas) pode precipitar **parada cardiorrespiratória** no gato hipoxémico — minimizar manipulação até **estabilização** e toracocentese quando indicada.

## Inflamação sistémica

Citocinas pleurais e **translocação** bacteriana correlacionam-se com **febre**, **hiporexia**, **leucocitose** com desvio (ou **leucopenia** em sepse grave felina) e **hipoalbuminemia** de inflamação crónica. **Lactato elevado** pode integrar gravidade em protocolos de urgência.

## Fibrina, loculações e empiema “organizado”

Com o tempo, **fibrina** e **membranas** loculam o pus; a **drenagem** por agulha torna-se insuficiente e podem ser necessários **dreno tunelizado**, **lavagens pleurais**, **librar** adherências (**thoracoscopy**) ou **thoracotomia**. Quanto mais **tardio** o controlo adequado do pus, maior a probabilidade de curso prolongado e complicações.

## Quadro clínico e exames complementares

### Sinais

**Dispneia** (abdômen em “balanço”, extensão do pescoço, bocejos abertos — especialmente em **gatos**), **taquipneia**, **tosse** (menos constante), **hiporexia**, **emagrecimento** em subagudos. Auscultação: **abolição** ou **muflamento** dos sons respiratórios ventralmente, frequentemente **diferente** entre hemitoráxicos.

### Laboratório

**Hemograma**: leucocitose com desvio ou alteração compatível com inflamação sistémica; **anemia** de doença crónica possível. **Bioquímica**: hipoalbuminemia; **azotemia** pode ser **pré-renal** (hipoxia, hipovolémia relativa) ou por doença coincidente.

### Imagem

**Radiografia**: opacificação **ventral/difusa** de hemitórax (ou bilateral), margem líquida, possível **desvio mediastinal**. **Ultrassom** (FAST torácico se estável): confirma líquido e pode guiar punção. **TC** reserva-se a casos seleccionados (corpo estranho, abscesso, planeamento cirúrgico).

### Fluido pleural

Macroscopicamente **purulento**; **citologia** com neutrófilos degenerados e **bactérias** intra/extra celulares. **Proteínas** e **células** elevadas — padrão de **exsudato** infeccioso / purulento; **pH** e **glicose** (quando utilizados no serviço) podem ajudar a graduar complexidade em derrames parapneumónicos, mas na prática **empiema franco** = **drenar** independentemente de um único número-limite.

### Diagnósticos diferenciais de effusões felinas

Em gato jovem com efusão, **FIP** (efusão frequentemente **não** supurativa) e outras causas de derrame entram no **diferencial** até excluí-las por fluido, citologia e contexto; **pyothorax** deve ser confirmado por **aparência purulenta** e citologia compatível.

## Tratamento: drenagem, suporte e antimicrobiano

### Prioridade zero: dreno eficaz

**Toracocentese** — diagnóstica e muitas vezes **terapêutica** de primeira linha para aliviar compressão; na grande maioria dos pyotorax clássicos segue-se **dreno pleural** (aspiração intermitente/contínua) com ou sem **lavagem**. **Videotoracoscopia** / **thoracotomia** quando há falha de drenagem, corpo estranho ou loculações graves.

### Suporte

**Oxigénio**; **fluidoterapia** conforme perfusão (evitar sobrecarga se suspeita de **edema de reexpansão** em drenagem muito rápida de grande volume — debate em humanos; em medicina veterinária, **drenagem controlada** e monitorização clínica são prudentes). **Analgesia** multimodal. Tratar **causa de base** quando identificada (extrair corpo estranho, desbridamento).

### Antimicrobianos

**IV** empírico **flora mista** até cultura do fluido (e sangue se instável); **duração** em semanas não em dias, guiada à **resolução** clínica, laboratorial e radiológica — não por calendário fixo isolado.

### Reavaliação

Controlo radiográfico seriado, monitorização de débito do dreno, repeat **culturas** se recidiva de líquido purulento. Em **falha**, reconsiderar **loculações**, **corpo estranho** residual ou foco não drenado.

## Complicações e prognóstico

**Edema de reexpansão** pulmonar, **persistência** de empiema, **fístulas** aéreas, **pneumotórax** iatrogênico e **sepse** são complicações descritas. **Prognóstico** é melhor com **intervenção precoce** e drenagem **eficaz**; casos crónicos e multiresistentes exigem tempo e recursos.

${PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN}
`.trim()

export const PIOTHORAX_PATHOPHYSIOLOGY_VISUAL: PathophysiologyVisual = {
  intro:
    'O **piotórax** é **empiema pleural** — pus no espaço entre pleuras, com mecânica respiratória comprometida e risco **sistémico**. O plano integra **oxigénio**, **toracocentese / dreno**, **cultura do fluido**, **antimicrobiano IV** para **flora mista** até antibiograma, e **reavaliação** imagiológica até resolução.',
  sections: [
    {
      id: 'dd_fluid',
      title: 'Diferencial rápido de derrame pleural',
      table: {
        caption: 'O aspecto do fluido e a citologia guiam — radiografia sozinha não basta',
        columns: ['Tipo (resumo)', 'Pistas'],
        rows: [
          ['Empiema (piotórax)', 'Purulento; neutrófilos degenerados; cultura frequentemente positiva'],
          ['Hemotórax', 'Sanguinolento não purulento; hematócrito do fluido vs sangue'],
          ['Quitórax', 'Opalescente / lipídico; quitomicrons / TG elevados no sobrenadante'],
          ['Transudato (ex.: hidrotórax)', 'Límpido; baixa celularidade; investigar cardiopatia, hipoalbuminemia, etc.'],
          ['Efusão felina (ex.: FIP)', 'Classificar pela proteína/células; **não** confundir com pus sem ver fluido'],
        ],
      },
    },
    {
      id: 'dog_cat',
      title: 'Cão vs gato — origem e apresentação',
      table: {
        caption: 'Pistas etiológicas (excepções existem)',
        columns: ['', 'Cão', 'Gato'],
        rows: [
          ['Mecanismos frequentes', 'Pneumonia complicada, trauma, abscesso que estoura na pleura', 'Mordedura gatuna, flora oral; história de luta nem sempre relatada'],
          ['Sinais respiratórios', 'Taquipneia, dispneia, dor torácica variável', 'Boca aberta, esforço; pode parecer “apenas letárgico”'],
          ['Auscultação', 'Muflamento ventral ipsilateral comum', 'Idem; gato pequeno — menos “área” pulmonar audível'],
        ],
      },
    },
    {
      id: 'phys',
      title: 'Fisiopatologia: mecânica, V/Q e circulação',
      paragraphs: [
        'O volume pleural ocupa espaço e **colapsa** parcialmente o pulmão — ventilação regional reduzida; **perfusão** pode manter-se, gerando **shunt** e **hipoxemia**.',
        'Quando o **mediastino** cede, o líquido pode afectar **ambos** os lados clinicamente; em volumes extremos, **desvio mediastinal** aperta a cava e o retorno ao coração direito.',
      ],
      table: {
        caption: 'Do mecanismo ao sinal',
        columns: ['Mecanismo', 'Efeito clínico'],
        rows: [
          ['Aumento trabalho respiratório', 'Taquipneia, fadiga muscular, postura antalgica'],
          ['Shunt / baixa V/Q', 'Hipoxemia; oxigénio ajuda mas não substitui drenagem se compressão maciça'],
          ['Inflamação sistémica / bacteremia', 'Febre, toxemia; pode evoluir como sepse na ficha correspondente'],
        ],
      },
    },
    {
      id: 'parapneumonic',
      title: 'Derrame parapneumónico → empiema',
      lead: 'Pneumonia que progride pode gerar **derrame parapneumónico**; com supuração organizada instala-se **empiema**. O antibiótico sistémico **não** evacua o líquido fechado — combina-se com **drenagem**.',
      bullets: [
        'Reavaliar **causa primária** (aspiração, corpo estranho, imunossupressão) se drenagem arrasta mas **infiltrado** persiste.',
        'Coordenar com especialidade quando há **fístula** broncopleural ou **persistência** de coleção.',
      ],
    },
    {
      id: 'drain_first',
      title: 'Drenagem antes do “ajuste fino” do antibiótico',
      flow: {
        title: 'Sequência típica na urgência estável minimamente',
        steps: [
          { title: 'Oxigénio + mínimo stress', subtitle: 'Evitar manipulação excessiva no gato muito hipoxémico.' },
          { title: 'Toracocentese diagnóstica e terapêutica', subtitle: 'Alívio da compressão; enviar fluido para citologia e cultura.' },
          { title: 'Dreno pleural + plano institucional', subtitle: 'Aspiração contínua ou intermitente; lavagens se protocolo.' },
          { title: 'ATB IV empírico flora mista', subtitle: 'Ajustar com antibiograma; semana(s) de tratamento frequentemente.' },
          { title: 'Radiografia / controle clínico', subtitle: 'Reexpansão, pneumotórax iatrogénico, loculações.' },
        ],
      },
      callout: {
        kind: 'clinical',
        title: 'Antibiótico sem dreno eficaz',
        text: 'Material purulento **organizado** ou **loculado** pode **falhar** só com agulha — perspectivar lavagem, VATS ou toracotomia conforme caso.',
      },
    },
    {
      id: 'bugs',
      title: 'Microbiologia e empirismo',
      bullets: [
        'Esperar **aeróbios + anaeróbios**: enterobactérias, cocos Gram-positivos, *Pasteurella*, anaeróbios pleomórficos — **policultura** comum.',
        '**Hemocultura** pode ser negativa — **não** exclui piotórax documentado por fluido purulento.',
        'Empirismo típico: **beta-lactâmico amplo** + **metronidazol** ou esquema misto do serviço até resultados.',
      ],
    },
    {
      id: 'rx',
      title: 'Catálogo de antimicrobianos (ligação à ficha)',
      paragraphs: [
        '**1ª linha**: ampicilina + sulbactam + metronidazol (associação simultânea no catálogo).',
        '**2ª linha**: clindamicina + enrofloxacina quando alternativa institucional ou intolerância — respeitar bula (FQ em filhotes/gatos).',
        '**3ª linha**: manter beta-lactâmico e **acrescentar** enrofloxacina em critério de **sepse** / reforço de Gram-negativos; isto é **ampliação**, não substituir a drenagem.',
      ],
    },
    {
      id: 'sources',
      title: 'Base documental',
      paragraphs: [PATHOPHYSIOLOGY_LITERATURE_NOTE_PLAIN],
    },
  ],
}
