/** Blocos educacionais das receitas de neurologia — linguagem para tutores. */

export const NEURO_EMERGENCY_INTRO = 'Retornar imediatamente ou buscar serviço veterinário externo de emergência se ocorrer:';

function buildEmergencySection(items: string[]): string {
  return `${NEURO_EMERGENCY_INTRO}\n\n${items.map((item) => `• ${item.replace(/\.$/, '')}.`).join('\n')}`;
}

export const TRAUMA_VERT_INTRO = `O trauma vertebromedular é uma lesão da coluna vertebral e/ou da medula espinhal. Mesmo que o paciente esteja movimentando as patas, podem existir fratura, deslocamento vertebral, hemorragia, inchaço ou compressão da medula. O quadro pode piorar rapidamente e provocar paralisia, perda da capacidade de urinar e dificuldade respiratória. Esta receita somente deve ser utilizada após avaliação veterinária e confirmação de que o paciente pode permanecer em casa.`;

export function buildTraumaVertRecommendations(): string {
  return `RECOMENDAÇÕES

• Manter repouso absoluto até nova avaliação.
• Utilizar caixa de transporte, cercado pequeno ou ambiente restrito, sem móveis sobre os quais o animal possa subir.
• Não permitir corridas, brincadeiras, saltos, sofás, camas ou escadas.
• Retirar o paciente do local de repouso somente para higiene e necessidades fisiológicas.
• Durante o transporte, manter a coluna alinhada e movimentar o paciente sobre superfície firme.
• Não levantar o animal apenas pelas patas dianteiras ou pela região abdominal.
• Em pacientes pequenos, transportar dentro de caixa rígida acolchoada.
• Em pacientes grandes, utilizar uma tábua, maca ou superfície firme para deslocamento.
• Não massagear, puxar, alongar ou manipular a coluna.
• Não realizar fisioterapia, acupuntura, exercícios ou movimentos passivos antes de o veterinário confirmar que não há instabilidade vertebral.
• Manter o paciente sobre cama espessa, seca e macia.
• Pacientes que não conseguem mudar de posição devem ser virados delicadamente a cada 4–6 horas, mantendo a coluna alinhada.
• Verificar diariamente vermelhidão, feridas, inchaço ou perda de pelos nas regiões em contato com o chão.
• Manter pele, pelos e cama sempre secos, especialmente após urina ou fezes.
• Utilizar peitoral ou faixa de sustentação para ajudar o paciente a urinar e defecar, conforme orientação veterinária.
• Não permitir que as patas sejam arrastadas diretamente no chão.
• Utilizar proteção acolchoada nas patas quando houver arraste.`;
}

export function buildTraumaVertUrineCare(): string {
  return `CUIDADOS COM A URINA

• Observar se o paciente urina voluntariamente e produz jato urinário adequado.
• Gotejamento de urina ou cama molhada não significa que a bexiga está sendo esvaziada corretamente.
• A expressão manual da bexiga somente deve ser realizada após demonstração prática pela equipe veterinária.
• Não apertar o abdômen com força.
• Procurar serviço veterinário de emergência 24 horas se o paciente não urinar, apresentar bexiga endurecida, desconforto abdominal, sangue na urina, urina com odor forte ou esforço sem eliminação.`;
}

export function buildTraumaVertMedicationCare(): string {
  return `CUIDADOS COM AS MEDICAÇÕES

• Gabapentina pode causar sonolência, fraqueza e falta de coordenação.
• Uma discreta sonolência pode ocorrer, mas o paciente não deve ficar incapaz de despertar ou sustentar a cabeça.
• Não associar carprofeno, meloxicam ou robenacoxibe a outro anti-inflamatório.
• Não associar anti-inflamatório não esteroidal a prednisolona, dexametasona ou outro corticosteroide.
• Suspender o anti-inflamatório e procurar atendimento diante de vômitos, diarreia, fezes escuras, sangue nas fezes, perda de apetite ou dor abdominal.
• Corticosteroides em altas doses não são recomendados rotineiramente para tratar trauma medular e podem aumentar o risco de complicações gastrointestinais e infecciosas.`;
}

export function buildTraumaVertEmergencySection(): string {
  return buildEmergencySection([
    'Perda ou piora da movimentação das patas',
    'Incapacidade de permanecer em pé',
    'Paralisia',
    'Dor intensa, gritos ou incapacidade de encontrar posição confortável',
    'Respiração rápida, difícil ou com esforço abdominal',
    'Fraqueza progredindo das patas traseiras para as dianteiras',
    'Incapacidade de sustentar a cabeça',
    'Perda do controle da urina ou das fezes',
    'Incapacidade de urinar',
    'Abdômen muito distendido ou dolorido',
    'Patas frias, arroxeadas ou muito inchadas',
    'Redução importante da consciência',
    'Convulsões',
    'Vômitos persistentes',
    'Qualquer piora clínica',
  ]);
}

export const IVDD_INTRO = `A hérnia de disco ocorre quando parte do disco localizado entre as vértebras se desloca para dentro do canal vertebral, provocando inflamação, dor e compressão da medula espinhal. O tratamento domiciliar é indicado principalmente para cães que ainda conseguem caminhar e urinar voluntariamente e que não apresentam piora progressiva. Cães incapazes de caminhar, com paralisia ou perda da sensibilidade dolorosa devem ser avaliados para cirurgia.`;

export function buildIvddRestSection(): string {
  return `REPOUSO OBRIGATÓRIO

• Manter o cão em repouso estrito durante pelo menos 4 semanas.
• Utilizar caixa de transporte grande, cercado pequeno ou cômodo sem móveis.
• O espaço deve permitir apenas que o cão fique em pé, deite e mude de posição.
• Não permitir acesso livre à casa.
• Não permitir corridas, brincadeiras, pulos, sofás, camas ou escadas.
• Não permitir passeio solto.
• Para urinar e defecar, realizar saída curta, com guia curta e peitoral.
• Cães com fraqueza devem utilizar faixa ou toalha sob o abdômen para sustentação.
• Retornar imediatamente ao local de repouso após urinar ou defecar.
• Não interromper o repouso porque a dor melhorou.
• A melhora provocada pelos medicamentos não significa que o disco já cicatrizou.
• Após as quatro semanas, aumentar a atividade apenas após reavaliação veterinária.`;
}

export function buildIvddTermsSection(): string {
  return `EXPLICAÇÃO DOS TERMOS

• Ambulatório: consegue permanecer em pé e caminhar sem ajuda, mesmo que cambaleando.
• Não ambulatório: movimenta as patas, mas não consegue ficar em pé ou caminhar sem sustentação.
• Paraplegia: ausência de movimento voluntário nas patas traseiras.
• Dor profunda: capacidade consciente de perceber um estímulo doloroso intenso nos dedos. Deve ser avaliada pelo veterinário e não é igual ao simples reflexo de puxar a pata.
• Compressão medular: pressão do material do disco sobre a medula espinhal.
• Mielomalácia: destruição progressiva da medula espinhal que pode avançar para regiões responsáveis pela respiração e pode ser fatal.`;
}

export function buildIvddHomeCareSection(): string {
  return `CUIDADOS DOMICILIARES

• Utilizar peitoral, nunca coleira cervical.
• Colocar tapetes antiderrapantes nas áreas de passagem obrigatória.
• Não massagear ou manipular a coluna.
• Não realizar quiropraxia ou manobras de mobilização.
• Não iniciar hidroterapia, esteira ou exercícios sem liberação veterinária.
• Manter cama macia, limpa e seca.
• Em pacientes incapazes de mudar de posição, alternar o lado do corpo a cada 4–6 horas.
• Inspecionar patas, quadris, joelhos e região pélvica diariamente.
• Evitar ganho de peso durante o repouso.
• Reduzir a quantidade de alimento se houver diminuição importante da atividade, conforme orientação veterinária.`;
}

export function buildIvddUrineCareSection(): string {
  return `CUIDADOS URINÁRIOS

• Confirmar que o cão urina voluntariamente e produz fluxo adequado.
• Gotejamento ou perda de urina na cama pode representar retenção com transbordamento.
• A expressão da bexiga somente deve ser feita após treinamento presencial.
• Procurar serviço veterinário de emergência 24 horas em caso de ausência de urina, esforço sem eliminação, bexiga endurecida, desconforto abdominal, sangue ou odor forte.`;
}

export function buildIvddMedicationCareSection(): string {
  return `CUIDADOS COM AS MEDICAÇÕES

• Não associar carprofeno e meloxicam.
• Não associar qualquer anti-inflamatório a prednisolona, dexametasona ou outro corticosteroide.
• Corticosteroides não são recomendados rotineiramente na fase aguda da hérnia de disco.
• Suspender o anti-inflamatório diante de vômitos, diarreia, perda de apetite, fezes escuras ou sangue nas fezes.
• Gabapentina e pregabalina podem causar sonolência e falta de coordenação.
• Tramadol e dipirona podem causar sedação, vômitos ou alterações gastrointestinais.
• Não suspender pregabalina abruptamente após uso prolongado.
• Dor que exige opioide ou que não permite repouso confortável deve ser tratada em ambiente hospitalar.`;
}

export function buildIvddSurgerySection(): string {
  return `QUANDO A CIRURGIA DEVE SER CONSIDERADA

A avaliação cirúrgica é indicada principalmente quando houver:

• Incapacidade de caminhar.
• Paralisia.
• Perda da dor profunda.
• Piora neurológica durante o tratamento.
• Episódios recorrentes.
• Dor intensa ou persistente apesar do repouso e das medicações.
• Compressão importante identificada em tomografia ou ressonância.
• Incapacidade de urinar voluntariamente.

Cães ambulatórios podem apresentar boa resposta ao manejo conservador. Entretanto, cães não ambulatórios ou paraplégicos apresentam maior chance de recuperação, recuperação mais rápida e menor risco de recorrência quando submetidos à descompressão cirúrgica.`;
}

export function buildIvddReturnSection(): string {
  return `RETORNO

Realizar reavaliação em 3–7 dias, ou antes conforme orientação, e nova avaliação antes de liberar o retorno às atividades.`;
}

export function buildIvddEmergencySection(): string {
  return buildEmergencySection([
    'Piora da fraqueza',
    'Incapacidade de caminhar',
    'Arraste das patas',
    'Cruzamento frequente dos membros',
    'Paralisia',
    'Perda da capacidade de urinar',
    'Dor intensa ou vocalização',
    'Respiração rápida ou difícil',
    'Fraqueza avançando para as patas dianteiras',
    'Abdômen flácido ou perda progressiva dos reflexos',
    'Incapacidade de sustentar a cabeça',
    'Febre, prostração intensa ou perda da consciência',
    'Vômitos persistentes',
    'Qualquer piora clínica',
  ]);
}

export const VESTIBULAR_DOG_INTRO = `A síndrome vestibular é uma alteração do sistema responsável pelo equilíbrio. Pode provocar inclinação da cabeça, perda de equilíbrio, quedas, movimentos rápidos dos olhos, náusea e vômitos. O movimento involuntário e repetitivo dos olhos é chamado de nistagmo. Os sinais podem ser muito intensos, mas a causa pode estar no ouvido interno, no nervo vestibular ou no cérebro. A forma idiopática somente pode ser considerada após exclusão de outras doenças.`;

export function buildVestibularDogRecommendations(): string {
  return `RECOMENDAÇÕES

• Manter o cão em ambiente pequeno, silencioso, acolchoado e com iluminação suave.
• Bloquear completamente o acesso a escadas, piscinas, varandas, sofás e camas.
• Utilizar tapetes antiderrapantes.
• Auxiliar o cão com peitoral ou faixa de sustentação.
• Não puxar pela coleira.
• Não deixar o paciente caminhar sozinho enquanto estiver caindo.
• Proteger cantos de móveis com almofadas ou cobertores.
• Colocar água e alimento em recipientes largos e rasos.
• Aproximar os recipientes do paciente, evitando que ele precise caminhar.
• Oferecer pequenas porções de alimento palatável.
• Não forçar alimento ou água com seringa se houver dificuldade para engolir, tosse, engasgo ou alteração de consciência.
• Manter o paciente limpo e seco.
• Mudar delicadamente sua posição quando permanecer deitado por várias horas.
• Não realizar exercícios vestibulares intensos durante a fase de náusea e quedas.
• A reabilitação pode ser iniciada após controle do vômito e após orientação veterinária.`;
}

export function buildVestibularEarCareSection(): string {
  return `CUIDADOS COM OS OUVIDOS

• Não aplicar gotas, produtos de limpeza ou medicamentos nos ouvidos sem avaliação do tímpano.
• Algumas substâncias podem causar ou agravar lesões vestibulares quando o tímpano está rompido.
• Se houver dor, secreção, odor forte, coceira, paralisia facial ou queda da pálpebra, investigar otite média ou interna.
• Antibióticos não devem ser prescritos automaticamente.
• Quando houver suspeita de infecção do ouvido médio ou interno, o tratamento deve ser baseado em exame otoscópico, imagem, citologia e cultura sempre que possível.`;
}

export function buildVestibularAvoidSection(): string {
  return `MEDICAÇÕES QUE NÃO DEVEM SER AUTOMÁTICAS

• Não utilizar prednisolona ou dexametasona rotineiramente sem diagnóstico.
• Não prescrever antibióticos apenas porque o animal está com a cabeça inclinada.
• Não utilizar sedativos intensos em paciente desidratado, hipotenso ou com alteração da consciência.
• Os antieméticos reduzem náusea e vômito, mas não tratam a causa da síndrome vestibular.`;
}

export function buildVestibularDogEvolutionSection(): string {
  return `EVOLUÇÃO ESPERADA

Na síndrome vestibular periférica idiopática do cão idoso, muitos pacientes começam a melhorar dentro de 48–72 horas, embora a inclinação da cabeça possa persistir por dias ou semanas. A ausência de melhora, a piora progressiva ou a presença de sinais incompatíveis com doença periférica exigem nova investigação.`;
}

export function buildVestibularCentralSignsSection(): string {
  return `SINAIS COMPATÍVEIS COM ENVOLVIMENTO DO CÉREBRO

Os seguintes sinais podem indicar síndrome vestibular central, ou seja, comprometimento do tronco encefálico ou do cerebelo:

• Sonolência intensa ou redução da consciência.
• Convulsões.
• Fraqueza verdadeira nas patas.
• Incapacidade de posicionar corretamente os membros.
• Arraste ou dobramento das patas.
• Alterações em vários nervos da face.
• Movimento vertical dos olhos.
• Movimento dos olhos que muda de direção conforme a posição da cabeça.
• Tremores de cabeça.
• Movimentos exagerados das patas.
• Dor cervical intensa.

A presença de déficits posturais, alteração da consciência, múltiplos nervos cranianos afetados ou nistagmo vertical ou que muda de direção favorece doença vestibular central.`;
}

export function buildVestibularDogReturnSection(): string {
  return `RETORNO

Realizar reavaliação em 24–48 horas, mesmo que o paciente esteja estável.`;
}

export function buildVestibularDogEmergencySection(): string {
  return buildEmergencySection([
    'Piora progressiva do equilíbrio',
    'Incapacidade de permanecer em pé',
    'Quedas contínuas ou rolamentos',
    'Vômitos persistentes',
    'Incapacidade de beber ou comer',
    'Tosse ou engasgos ao tentar engolir',
    'Desidratação',
    'Sonolência intensa ou redução da consciência',
    'Convulsões',
    'Fraqueza ou paralisia',
    'Nistagmo vertical ou que muda de direção',
    'Dor intensa',
    'Respiração anormal',
    'Paralisia facial associada à incapacidade de fechar o olho',
    'Ausência de melhora nas primeiras 48–72 horas',
    'Qualquer piora clínica',
  ]);
}

export const VESTIBULAR_CAT_INTRO = `A síndrome vestibular felina provoca perda de equilíbrio, inclinação da cabeça, quedas, rolamentos, desorientação, náusea e movimentos rápidos dos olhos. Em gatos, pode estar associada a doença idiopática, pólipo, otite média ou interna, trauma, toxicidade, deficiência nutricional, inflamação ou doença cerebral.`;

export function buildVestibularCatRecommendations(): string {
  return `RECOMENDAÇÕES

• Manter o gato exclusivamente dentro de casa.
• Colocar em ambiente pequeno, silencioso, acolchoado e sem locais altos.
• Retirar acesso a janelas, escadas, móveis, camas e prateleiras.
• Utilizar caixa de areia com bordas baixas.
• Colocar água e alimento próximos ao local de repouso.
• Preferir alimento úmido completo e palatável.
• Oferecer pequenas porções várias vezes ao dia.
• Não forçar alimentação se houver dificuldade para engolir ou alteração de consciência.
• Manter o gato limpo e seco após urinar ou defecar.
• Utilizar toalhas enroladas para formar barreiras acolchoadas ao redor do paciente.
• Evitar contenção excessiva, pois o movimento da cabeça pode piorar a náusea.
• Não aplicar produtos nos ouvidos sem avaliação veterinária.
• Não utilizar corticosteroides ou antibióticos automaticamente.
• Investigar pólipo nasofaríngeo, otite média ou interna, trauma, intoxicação e doença cerebral quando indicado.

A síndrome vestibular idiopática felina é aguda e geralmente não progressiva, mas constitui diagnóstico de exclusão. Alterações de outros nervos cranianos, déficits de posicionamento das patas, redução da consciência ou nistagmo vertical indicam necessidade de investigação intracraniana.`;
}

export function buildVestibularCatEmergencySection(): string {
  return buildEmergencySection([
    'Piora progressiva',
    'Rolamentos contínuos',
    'Incapacidade de permanecer em posição esternal',
    'Recusa completa de água e alimento',
    'Vômitos persistentes',
    'Dificuldade para engolir',
    'Convulsões',
    'Sonolência intensa',
    'Fraqueza ou paralisia',
    'Movimentos verticais dos olhos',
    'Nistagmo que muda de direção',
    'Dor intensa',
    'Dificuldade respiratória',
    'Incapacidade de fechar um dos olhos',
    'Ausência de melhora clínica',
    'Qualquer piora clínica',
  ]);
}
