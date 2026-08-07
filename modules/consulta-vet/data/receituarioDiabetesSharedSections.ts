/** Blocos educacionais das receitas de diabetes — linguagem para tutores. */

export type DmInsulinKind = 'caninsulin-u40' | 'nph-u100' | 'glargina-u100' | 'toujeo-u300';
export type DmSpeciesKind = 'dog' | 'cat';

const EMERGENCY_24H_GUIDANCE = 'Levar imediatamente a um serviço veterinário de emergência 24 horas.';

function formatMl(value: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: value < 1 ? 1 : 0 }).format(value);
}

export function formatHoneyHypoglycemiaDose(weightKg: number | null): string {
  if (!weightKg || weightKg <= 0) return 'A PREENCHER mL de mel ou xarope de milho';
  return `${formatMl(weightKg * 0.25)} mL de mel ou xarope de milho`;
}

function buildApplicationSection(insulin: DmInsulinKind): string {
  const syringeRule = insulin === 'caninsulin-u40'
    ? 'Esta insulina é U-40: use apenas seringa U-40 ou caneta veterinária compatível com Caninsulin. Nunca use seringa U-100 para medir esta insulina.'
    : insulin === 'toujeo-u300'
      ? 'Esta insulina é Toujeo U-300: use apenas a caneta original do fabricante. Nunca tire o medicamento da caneta com seringa.'
      : 'Esta insulina é U-100: use apenas seringa U-100 ou caneta/refil compatível com U-100.';

  return `COMO APLICAR A INSULINA

• Lavar e secar as mãos.
• Conferir o nome da insulina, a dose e o horário antes de cada aplicação.
• ${syringeRule}
• Preparar a insulina conforme as instruções desta receita.
• Escolher um local com pele solta (lateral do peito, flanco ou região das costas) e alternar o local a cada aplicação.
• Levantar delicadamente uma prega de pele, aplicar a agulha por baixo da pele e administrar toda a dose.
• Retirar a agulha e verificar se a pelagem não ficou molhada.
• Usar seringa ou agulha nova em cada aplicação.
• Se houver dúvida se a dose entrou toda, não repetir a aplicação e aguardar a próxima dose programada.
• Nunca aplicar dose dobrada para compensar uma dose perdida.`;
}

function buildFeedingSection(species: DmSpeciesKind, insulin: DmInsulinKind): string {
  if (species === 'dog') {
    const mealRule = insulin === 'toujeo-u300'
      ? 'Manter horários de alimentação previsíveis todos os dias e registrar se o cão comeu bem.'
      : 'Confirmar que o cão comeu a refeição antes de aplicar a insulina.';
    return `ALIMENTAÇÃO E INSULINA — CÃES

• Dividir a comida do dia em duas refeições iguais, com cerca de 12 horas de intervalo.
• ${mealRule}
• Manter sempre a mesma marca, sabor e quantidade de ração, sempre que possível.
• Evitar petiscos extras, restos de comida e doces.
• Manter passeios e brincadeiras em rotina; evitar exercício muito intenso ou diferente do habitual de um dia para o outro.`;
  }

  const mealRule = insulin === 'toujeo-u300'
    ? 'Não é obrigatório aplicar exatamente na hora da refeição, mas o apetite deve ser observado todos os dias.'
    : 'Preferir aplicar depois de confirmar que o gato está se alimentando.';

  return `ALIMENTAÇÃO E INSULINA — GATOS

• ${mealRule}
• Preferir ração úmida completa ou combinação de úmido e seco, em quantidade medida por dia.
• Gatos que comem várias vezes ao longo do dia podem manter esse hábito, desde que a quantidade total diária seja controlada.
• Não deixar o gato ficar longas horas sem comer, principalmente se estiver acima do peso ou comendo pouco.`;
}

function buildHypoglycemiaSection(honeyDose: string): string {
  return `SE O AÇÚCAR DO SANGUE FICAR BAIXO (HIPOGLICEMIA)

SINAIS DE ALERTA PARA O TUTOR

• Muita fome de repente, inquietação ou sonolência.
• Fraqueza, tremores, “bamboleio” ao caminhar ou confusão.
• Convulsão, desmaio ou animal que não responde direito.

SE O ANIMAL ESTÁ CONSCIENTE E CONSEGUE COMER

1. Oferecer imediatamente a refeição habitual.
2. Se não quiser comer, oferecer um alimento gostoso e fácil de comer, ou colocar um pouco de mel no alimento.
3. Não aplicar nova insulina até ser avaliado por um veterinário.
4. ${EMERGENCY_24H_GUIDANCE}

SE O ANIMAL ESTÁ FRACO, TREMENDO OU COM DIFICULDADE PARA RESPONDER

1. Passar ${honeyDose} sobre a gengiva e a parte interna da bochecha.
2. Não despejar líquido no fundo da boca e não forçar a engolir.
3. Se melhorar em até cinco minutos, oferecer comida.
4. ${EMERGENCY_24H_GUIDANCE}

SE HOUVER CONVULSÃO, DESMAIO OU PERDA DE CONSCIÊNCIA

• Passar mel ou xarope sobre a gengiva, sem forçar engolir.
• Não oferecer água ou comida pela boca.
• ${EMERGENCY_24H_GUIDANCE}`;
}

function buildNotEatingSection(): string {
  return `SE O ANIMAL NÃO COMER

Comeu normalmente: aplicar a dose prescrita nesta receita.

Comeu só uma parte: não aumentar a dose; se persistir ou piorar, levar imediatamente a um serviço veterinário de emergência 24 horas.

Não comeu, vomitou ou parece doente:
• Não aplique automaticamente a dose completa de insulina.
• Meça a glicemia em casa, se souber fazer.
• ${EMERGENCY_24H_GUIDANCE}
• Falta de apetite, vômito, muito abatimento ou pouca água ingerida podem indicar complicação importante.`;
}

function buildEmergencySection(species: DmSpeciesKind): string {
  const speciesExtra = species === 'cat'
    ? '• Urina e sede diminuíram muito de repente, junto com melhora do apetite — avise o veterinário, pois a necessidade de insulina pode estar caindo.'
    : '• Olhos turvos, dor no olho ou perda de visão que apareceu rapidamente.';

  return `QUANDO PROCURAR ATENDIMENTO IMEDIATO

• Animal tremendo, muito fraco, desorientado, convulsionando ou desmaiando.
• Recusa total de comida, vômitos repetidos ou diarreia intensa.
• Muito abatido, cada vez mais fraco ou aparentando desidratação.
• Respiração muito rápida ou profunda, ou hálito com cheiro forte e diferente do normal.
• Muita sede e muito xixi voltando depois de um período de melhora.
${speciesExtra}`;
}

function buildGlucometerSection(): string {
  return `COMO MEDIR A GLICEMIA EM CASA

Aparelho recomendado: glicosímetro feito para cães e gatos (como AlphaTrak 3), quando disponível. Se usar aparelho humano, utilize sempre o mesmo aparelho e avise o veterinário.

ONDE colocar a gotinha de sangue (escolha um local e alterne):

• Borda interna da orelha — a parte fina da orelha, onde dá para ver os vasinhos.
• Almofada da pata — a parte macia embaixo da pata, atrás das almofadas digitais.
• Parte interna da boca — apenas se o animal estiver calmo e o veterinário já tiver orientado esse local.

Passo a passo resumido:

1. Separar glicosímetro, tira, lanceta, gaze e petisco.
2. Lavar e secar as mãos.
3. Colocar a tira no aparelho.
4. Fazer uma pequena perfuração no local escolhido e formar uma gota de sangue.
5. Encostar a ponta da tira na gota, sem esfregar.
6. Anotar o valor, horário, se o animal comeu e se a insulina já foi aplicada.
7. Comprimir levemente com gaze e recompensar o animal.`;
}

function buildNutritionSection(species: DmSpeciesKind): string {
  if (species === 'dog') {
    return `ALIMENTOS TERAPÊUTICOS PARA DIABETES — CÃES

Ração seca (exemplos disponíveis no Brasil):

• Royal Canin Veterinary Diabetic Canine
• PremieR Nutrição Clínica Cães Diabetes — porte pequeno
• PremieR Nutrição Clínica Cães Diabetes — portes médio e grande
• Farmina Vet Life Obesity & Diabetic Canine
• Farmina Vet Life Obesity & Diabetic Fish Canine

Ração úmida (exemplos):

• Royal Canin Diabetic Special Low Carbohydrate Wet — 410 g
• PremieR Nutrição Clínica Úmidos Cães Diabetes — 85 g
• Farmina Vet Life Diabetic Wet Food Canine — 300 g

Dividir a quantidade diária em duas refeições iguais, pesar a ração em balança de cozinha e incluir petiscos no total do dia.`;
  }

  return `ALIMENTOS TERAPÊUTICOS PARA DIABETES — GATOS

Ração seca (exemplos):

• Royal Canin Veterinary Diabetic Feline
• PremieR Nutrição Clínica Gatos Diabetes
• Farmina Vet Life Diabetic Feline

Ração úmida (exemplo):

• Farmina Vet Life Diabetic Wet Food Feline — 85 g

Priorize alimento que o gato aceite bem todos os dias; não force uma dieta se isso fizer o gato parar de comer.`;
}

function buildHomeMonitoringSection(): string {
  return `O QUE ANOTAR EM CASA TODOS OS DIAS

• Horário e dose de cada aplicação de insulina.
• Quanto de comida foi oferecido e quanto foi comido.
• Quanto de água o animal bebeu.
• Se urinou mais ou menos que o normal.
• Apetite, atividade, vômitos ou fezes moles.
• Episódios de fraqueza, tremores ou comportamento estranho.
• Glicemias medidas em casa ou leituras do sensor, se houver.

Pesar o animal semanalmente no início do tratamento e depois pelo menos uma ou duas vezes por mês, quando possível.`;
}

function buildFreestyleSection(includeToujeoMandatory: boolean): string {
  const intro = includeToujeoMandatory
    ? 'O sensor FreeStyle Libre (ou equivalente) deve ser usado no início deste tratamento com Toujeo e durante os ajustes de dose.'
    : 'O sensor FreeStyle Libre pode ajudar a acompanhar a glicemia ao longo do dia, especialmente no início do tratamento, após mudança de dose ou se houver suspeita de açúcar baixo ou alto.';

  return `MONITORAMENTO COM FREESTYLE LIBRE

${intro}

• O sensor deve ser colocado e protegido pela equipe veterinária.
• Anotar no aplicativo: horários de comida, insulina, passeios, vômitos e sinais observados.
• Observar se a glicemia está subindo ou caindo, e não decidir mudanças só por uma leitura isolada.
• Se o sensor soltar ou der leituras estranhas, usar o glicosímetro e avisar a clínica.`;
}

export function buildDiabetesAppendSections(
  species: DmSpeciesKind,
  insulin: DmInsulinKind,
  weightKg: number | null,
): string[] {
  const honeyDose = formatHoneyHypoglycemiaDose(weightKg);
  return [
    buildApplicationSection(insulin),
    DM_STORAGE_SECTION,
    buildFeedingSection(species, insulin),
    buildNotEatingSection(),
    buildHypoglycemiaSection(honeyDose),
    buildEmergencySection(species),
    buildFreestyleSection(insulin === 'toujeo-u300'),
    buildGlucometerSection(),
    buildHomeMonitoringSection(),
    buildNutritionSection(species),
  ];
}

export const DM_STORAGE_SECTION = `CONSERVAÇÃO DA INSULINA

• Manter na geladeira entre 2 °C e 8 °C, salvo orientação diferente na bula.
• Não guardar na porta da geladeira nem encostar no congelador.
• Não congelar; descartar se congelar.
• Proteger do calor e do sol; não deixar dentro do carro.
• Na transportadora, usar bolsa térmica sem encostar gelo direto no frasco.
• Anotar a data de abertura no frasco ou na caneta.
• Trocar o frasco ou refil se mudar de aparência, formar grumos ou o controle piorar sem explicação.
• Não reutilizar agulha de caneta.`;

/** Orientações clínicas — visíveis ao veterinário na aba de medicamentos, não entram na receita. */
export const DM_DOSE_ADJUSTMENT_VET_NOTES = [
  'Ajuste de dose: nunca aumentar no 1º dia por hiperglicemia isolada. Avaliar sinais, peso, técnica, conservação, dieta e curva/CGM antes de subir dose. Nadir <80 mg/dL sem sinais: cães −10–25%; gatos −0,5–1 UI/aplicação. Hipoglicemia com sinais: suspender e reiniciar com redução (cães 25–50%; gatos −0,5–1 UI). Nadir 80–150 com controle clínico: manter. Nadir >150 com sinais persistentes: cães +10–25%; gatos +0,5 UI conservador.',
];

export const DM_TOUJEO_ADJUSTMENT_VET_NOTES = [
  'Toujeo U-300: ajustar por tendências do monitor e nadir, não por hiperglicemia precoce isolada. Cães: se duração insuficiente com nadir OK, considerar q12h; ao converter q24h→q12h, reduzir ~30% por aplicação. Gatos: ajuste a cada 1–3 dias com CGM; nadir alvo 80–120 mg/dL; tutor não altera frequência sem orientação.',
];

export const DM_GLARGINE_DOG_VET_NOTES = [
  'Glargina U-100 em cães: opção alternativa quando lente ou NPH têm resposta inadequada; não é primeira escolha no recém-diagnosticado.',
];

export const DM_CANINSULIN_CAT_VET_NOTES = [
  'Caninsulin em gatos: considerar troca para glargina U-100 se nadir adequado mas hiperglicemia retorna antes da próxima dose.',
];
