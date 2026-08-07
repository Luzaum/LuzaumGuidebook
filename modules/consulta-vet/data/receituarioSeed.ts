import { DocumentTemplate } from '../types/receituario';
import { normalizeLegacyDocumentBody } from '../utils/receituarioDocument';
import { RECEITUARIO_INFECTOLOGIA_MODELS } from './receituarioInfectologiaModels';
import { RECEITUARIO_DIABETES_MODELS } from './receituarioDiabetesModels';
import { RECEITUARIO_NEUROLOGIA_MODELS } from './receituarioNeurologiaModels';
import { RECEITUARIO_PROTOCOL_MODELS } from './receituarioProtocolModels';

export const RECEITUARIO_CATEGORIES = [
  'Gastroenterologia',
  'Nefrologia e urologia',
  'Endocrinologia',
  'Cardiologia',
  'Respiratório',
  'Neurologia',
  'Dermatologia',
  'Oftalmologia',
  'Infectologia',
  'Infecciosos',
  'Dor e pós-operatório',
  'Emergência',
  'Cuidados gerais',
] as const;

export const STANDARD_RECIPE_HEADER = '';

export const STANDARD_RECIPE_FOOTER = `
RECOMENDAÇÕES

• Oferecer as medicações conforme os horários prescritos.
• Não interromper o tratamento sem orientação médico-veterinária.
• Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral.
• Retornar para reavaliação em A PREENCHER ou antes, caso necessário.

Em caso de piora clínica, retornar ao hospital ou buscar serviço veterinário externo.`;

const RAW_SEEDED_TEMPLATES: DocumentTemplate[] = [
  // 1. Gastroenterologia
  {
    id: 'seed-diarreia-aguda',
    title: 'Diarreia Aguda e Controle Digestivo',
    category: 'Gastroenterologia',
    document_type: 'recipe',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL

1. METRONIDAZOL 250mg — Comprimido
Administrar 10 a 15 mg/kg por via oral, a cada 12 horas, junto com alimento, durante 5 a 7 dias.

2. PASTA ABSORVENTE (Zeolita / Caolim-Pectina) — Uso Oral
Administrar 1 mL/kg por via oral, a cada 8 horas, durante 3 dias.

3. PROBIÓTICO VETERINÁRIO — Bisnaga / Sachê
Administrar 2g a 5g por via oral, a cada 24 horas, durante 7 a 10 dias.
${STANDARD_RECIPE_FOOTER}`
  },

  // 2. Nefrologia e urologia
  {
    id: 'seed-drc-suporte',
    title: 'Doença Renal Crônica (Manejo de Suporte)',
    category: 'Nefrologia e urologia',
    document_type: 'recipe',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL

1. QUELANTE DE FÓSFORO (Hidróxido de Alumínio / Carbonato de Cálcio / Chitosan)
Administrar conforme dose calculada por via oral, junto com as refeições diárias, uso contínuo.

2. BENAZEPRIL 5mg / 20mg — Comprimido
Administrar 0,25 a 0,5 mg/kg por via oral, a cada 24 horas, uso contínuo com monitoramento renal.

3. OMEPRAZOL 10mg — Cápsula
Administrar 1 mg/kg por via oral, a cada 24 horas, jejum matinal, durante 14 a 30 dias conforme avaliação.

4. SUPLEMENTO ÔMEGA 3 VETERINÁRIO — Cápsula / Óleo
Administrar dose de EPA/DHA recomendada por via oral, a cada 24 horas, uso contínuo.
${STANDARD_RECIPE_FOOTER}`
  },
  {
    id: 'seed-cistite-infecciosa',
    title: 'Cistite Bacteriana / Infecção Urinária',
    category: 'Nefrologia e urologia',
    document_type: 'recipe',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL

1. AMOXICILINA COM CLAVULANATO DE POTÁSSIO 50mg / 250mg — Comprimido
Administrar 12,5 a 20 mg/kg por via oral, a cada 12 horas, durante 7 a 14 dias.

2. MELOXICAM 0,5mg / 1mg / 2mg — Comprimido
Administrar 0,1 mg/kg no 1º dia e 0,05 mg/kg nos dias seguintes por via oral, a cada 24 horas, durante 3 a 5 dias.
${STANDARD_RECIPE_FOOTER}`
  },

  // 3. Endocrinologia — modelos clínicos de diabetes em receituarioDiabetesModels.ts
  {
    id: 'seed-hipotireoidismo',
    title: 'Hipotireoidismo Canino',
    category: 'Endocrinologia',
    document_type: 'recipe',
    species: 'cão',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL

1. LEVOTIROXINA SÓDICA (0,1mg / 0,2mg / 0,4mg / 0,7mg) — Comprimido
Administrar 0,02 mg/kg por via oral, a cada 12 horas em jejum (1h antes do alimento), uso contínuo.

* Agendar dosagem de T4 total após 4 a 8 semanas para ajuste de dose.
${STANDARD_RECIPE_FOOTER}`
  },

  // 4. Cardiologia
  {
    id: 'seed-icc-canina',
    title: 'Insuficiência Cardíaca Congestiva (ICC)',
    category: 'Cardiologia',
    document_type: 'recipe',
    species: 'cão',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL

1. PIMOBENDAN 1,25mg / 2,5mg / 5mg — Comprimido
Administrar 0,25 a 0,3 mg/kg por via oral, a cada 12 horas, 1 hora antes das refeições, uso contínuo.

2. FUROSEMIDA 40mg — Comprimido
Administrar 1 a 2 mg/kg por via oral, a cada 12 horas (ou conforme frequência respiratória), uso contínuo / sob avaliação.

3. BENAZEPRIL ou ENALAPRIL 5mg — Comprimido
Administrar 0,5 mg/kg por via oral, a cada 12 a 24 horas, uso contínuo.

4. ESPIRONOLACTONA 25mg — Comprimido
Administrar 1 a 2 mg/kg por via oral, a cada 24 horas, uso contínuo.
${STANDARD_RECIPE_FOOTER}`
  },

  // 5. Respiratório
  {
    id: 'seed-asma-felina',
    title: 'Bronquite Crônica / Asma Felina',
    category: 'Respiratório',
    document_type: 'recipe',
    species: 'gato',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO INALATÓRIO / ORAL

1. FLUTICASONA 125mcg / 250mcg — Spray Inalatório (com espaçador veterinário)
Aplicar 1 borrifada na máscara inalatória por 10 a 15 respirações, a cada 12 horas, uso contínuo.

2. SALBUTAMOL 100mcg — Spray Inalatório (em crises)
Aplicar 1 borrifada no espaçador em episódios agudos de crise respiratória.

3. PREDNISOLONA 5mg — Comprimido
Administrar 1 mg/kg por via oral, a cada 24 horas pela manhã, durante 7 a 10 dias (desmame gradual).
${STANDARD_RECIPE_FOOTER}`
  },

  // 6. Neurologia
  {
    id: 'seed-crise-convulsiva',
    title: 'Epilepsia / Controle de Crises Convulsivas',
    category: 'Neurologia',
    document_type: 'recipe',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL / RETAL (EM EMERGÊNCIA)

1. FENOBARBITAL 10mg / 50mg / 100mg — Comprimido (Sujeito a Controle Especial)
Administrar 2,5 a 3 mg/kg por via oral, a cada 12 horas, horários rigorosamente fixos, uso contínuo.

2. LEVETIRACETAM 250mg / 500mg — Comprimido
Administrar 20 mg/kg por via oral, a cada 8 horas, uso diário.

3. DIAZEPAM INJETÁVEL 10mg/2mL — Ampola (USO RETAL DE EMERGÊNCIA)
Em caso de crise convulsiva com duração > 2 minutos, aplicar [dose mL] via retal com seringa sem agulha e buscar atendimento médico veterinário imediato.
${STANDARD_RECIPE_FOOTER}`
  },

  // 7. Dermatologia
  {
    id: 'seed-dermatite-atopica',
    title: 'Dermatite Atópica / Alérgica e Otite Externa',
    category: 'Dermatologia',
    document_type: 'recipe',
    species: 'cão',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL

1. OCLACITINIB (APOQUEL) 3,6mg / 5,4mg / 16mg — Comprimido
Administrar 0,4 a 0,6 mg/kg por via oral, a cada 12 horas por 14 dias; após este período, reduzir para a cada 24 horas.

USO TÓPICO

1. SHAMPOO COM CLOREXIDINE 2% A 4% E FITOSPHINGOSINE
Banhos 2 vezes por semana, deixando agir por 10 minutos antes de enxaguar com água morna.

2. SOLUÇÃO OTOLÓGICA (Antibiótico + Antifúngico + Corticosteroide)
Limpar o conduto auditivo e aplicar [quantidade] gotas em ambos os ouvidos, a cada 12 horas, durante 10 a 14 dias.
${STANDARD_RECIPE_FOOTER}`
  },

  // 8. Oftalmologia
  {
    id: 'seed-conjuntivite-ulcera-cornea',
    title: 'Conjuntivite / Afecções Oculares',
    category: 'Oftalmologia',
    document_type: 'recipe',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO TÓPICO OCULAR

1. COLÍRIO ANTIBIÓTICO (Tobramicina 0,3% / Ciprofloxacino 0,3%) — Colírio
Pingar 1 gota no(s) olho(s) afetado(s), a cada 6 a 8 horas, durante 7 a 10 dias.

2. COLÍRIO LUBRIFICANTE / LÁGRIMA ARTIFICIAL (Hialuronato de Sódio / Carboximetilcelulose)
Pingar 1 gota no(s) olho(s) afetado(s), a cada 4 a 6 horas, uso contínuo ou conforme necessidade.

* Manter colar elizabetano 24 horas por dia até reavaliação oftálmica.
${STANDARD_RECIPE_FOOTER}`
  },

  // 9. Infectologia
  {
    id: 'seed-pif-felina',
    title: 'Piodermite / Infecção Bacteriana de Pele',
    category: 'Infecciosos',
    document_type: 'recipe',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL

1. CEFALEXINA 300mg / 600mg — Comprimido
Administrar 22 a 30 mg/kg por via oral, a cada 12 horas, junto às refeições, durante 21 a 30 dias (manter até 7 dias após remissão dos sinais clínicos).

USO TÓPICO

1. SPRAY OU POMADA ANTISSÉPTICA (Clorexidine 2%)
Aplicar na lesão cutânea, a cada 12 horas, após limpeza local.
${STANDARD_RECIPE_FOOTER}`
  },

  // 10. Dor e pós-operatório
  {
    id: 'seed-pos-operatorio-geral',
    title: 'Analgesia Pós-Operatória / Manejo da Dor',
    category: 'Dor e pós-operatório',
    document_type: 'recipe',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL

1. DIPIRONA SÓDICA 500mg/mL — Solução Oral / Comprimido
Administrar 25 mg/kg por via oral, a cada 8 horas, durante 3 a 5 dias.

2. MELOXICAM 0,5mg / 1mg / 2mg — Comprimido
Administrar 0,1 mg/kg no 1º dia e 0,05 mg/kg nos dias seguintes por via oral, a cada 24 horas, durante 3 dias.

3. TRAMADOL / PREGABALINA / GABAPENTINA — Conforme protocolo analgésico
Administrar conforme orientação médica específica para dor moderada a severa.

CUIDADOS COM A FERIDA CIRÚRGICA

* Limpar a ferida com solução fisiológica 0,9% e antisséptico suave a cada 12 horas.
* Manter colar elizabetano / roupa protetora continuamente.
${STANDARD_RECIPE_FOOTER}`
  },

  // 11. Emergência
  {
    id: 'seed-manejo-intoxicacao',
    title: 'Manejo Inicial de Intoxicação / Suporte Emergencial',
    category: 'Emergência',
    document_type: 'recipe',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL

1. CARBÃO ATIVADO VETERINÁRIO (Sachê / Pasta)
Administrar 1 a 3 g/kg diluído em água por via oral, o mais breve possível (repetir conforme protocolo de desintoxicação).

2. SILIMARINA / SAMe / ANTIOXIDANTE HEPÁTICO — Comprimido
Administrar conforme peso por via oral, a cada 24 horas em jejum, durante 30 dias.

3. OMEPRAZOL / PROTEÇÃO GÁSTRICA
Administrar 1 mg/kg por via oral, a cada 12 a 24 horas, durante 10 a 14 dias.
${STANDARD_RECIPE_FOOTER}`
  },

  // 12. Cuidados gerais
  {
    id: 'seed-desverminacao-ectoparasitas',
    title: 'Desverminação e Controle de Ectoparasitas',
    category: 'Cuidados gerais',
    document_type: 'recipe',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `${STANDARD_RECIPE_HEADER}
USO ORAL / TOP SPOT-ON

1. VERMÍFUGO DE AMPLO ESPECTRO (Praziquantel + Pyrantel + Febantel)
Administrar 1 comprimido para cada 10 kg de peso por via oral em dose única; repetir a dose após 15 dias.

2. ANTIPARASITÁRIO CONTRA PULGAS E CARRAPATOS (Isoxazolina / Spot-on)
Administrar / aplicar conforme indicação do fabricante por via oral / tópica no dorso.
${STANDARD_RECIPE_FOOTER}`
  },

  // ==========================================
  // TERMOS REQUERIDOS (4 MODELOS)
  // ==========================================

  // Termo 1: Termo Geral de Recusa
  {
    id: 'term-geral-recusa',
    title: 'Termo Geral de Recusa de Procedimento, Exame ou Tratamento',
    category: 'Termos',
    document_type: 'term',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `TERMO GERAL DE RECUSA DE PROCEDIMENTO, EXAME OU TRATAMENTO

PACIENTE: {{patient_name}}
ESPÉCIE: {{species}}
RAÇA: {{breed}}
SEXO: {{sex}}
IDADE: {{age}}
RESPONSÁVEL: {{responsible_name}}

Eu, responsável pelo animal acima identificado, declaro que fui informado(a), de maneira clara e compreensível, pelo médico-veterinário responsável, sobre o estado clínico atual do paciente.

CONDUTA RECOMENDADA E RECUSADA:

[DESCREVER EXAME, PROCEDIMENTO, INTERNAÇÃO, TRATAMENTO, CIRURGIA, MEDICAÇÃO, ENCAMINHAMENTO OU OUTRA CONDUTA]

Declaro que recebi explicações sobre o motivo da recomendação, seus possíveis benefícios, alternativas disponíveis e os riscos relacionados à não realização, adiamento ou interrupção da conduta proposta. Mesmo após os esclarecimentos fornecidos, decido recusar a conduta descrita acima neste momento.

RISCOS GERAIS DA RECUSA:

Fui informado(a) de que a recusa poderá ocasionar piora ou progressão da doença; atraso no diagnóstico e no início do tratamento; dor, sofrimento e perda de qualidade de vida; desidratação, desequilíbrios metabólicos ou nutricionais; hemorragia; infecção, sepse ou choque; dificuldade ou insuficiência respiratória; alterações cardíacas, arritmias ou parada cardiorrespiratória; alterações neurológicas, convulsões ou perda de consciência; obstrução ou incapacidade de urinar; incapacidade de se alimentar; perda temporária ou permanente da função de órgãos ou membros; necessidade futura de internação, cirurgia, transfusão, cuidados intensivos ou atendimento emergencial; complicações irreversíveis; sequelas permanentes e risco de óbito. Compreendo que outros riscos imprevisíveis também podem ocorrer conforme a evolução do paciente.

Declaro que tive oportunidade de fazer perguntas, que minhas dúvidas foram esclarecidas e que assumo a responsabilidade pela decisão de não autorizar a conduta recomendada neste momento.

Fui orientado(a) a procurar atendimento médico-veterinário imediatamente caso o paciente apresente piora do estado geral, prostração intensa, dor, dificuldade respiratória, vômitos persistentes, diarreia intensa, sangramentos, convulsões, incapacidade de urinar, incapacidade de se alimentar ou qualquer outra alteração preocupante.

OBSERVAÇÕES:

[ESPAÇO LIVRE PARA INFORMAÇÕES ADICIONAIS]

LOCAL E DATA: __________________________________________

HORÁRIO: _______________________________________________

RESPONSÁVEL PELO ANIMAL

NOME: _________________________________________________

CPF: ___________________________________________________

ASSINATURA: ____________________________________________

MÉDICO-VETERINÁRIO

{{veterinarian_name}}

CRMV: {{crmv}}

ASSINATURA: ____________________________________________

TESTEMUNHA 1, SE NECESSÁRIO

NOME: _________________________________________________

CPF: ___________________________________________________

ASSINATURA: ____________________________________________

TESTEMUNHA 2, SE NECESSÁRIO

NOME: _________________________________________________

CPF: ___________________________________________________

ASSINATURA: ____________________________________________`
  },

  // Termo 2: Termo de Retirada sem Alta Médica
  {
    id: 'term-retirada-sem-alta',
    title: 'Termo de Retirada do Paciente sem Alta Médica',
    category: 'Termos',
    document_type: 'term',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `TERMO DE RETIRADA DO PACIENTE SEM ALTA MÉDICA

PACIENTE: {{patient_name}}
ESPÉCIE: {{species}}
RAÇA: {{breed}}
SEXO: {{sex}}
IDADE: {{age}}
RESPONSÁVEL: {{responsible_name}}

Eu, responsável pelo animal acima identificado, declaro que solicito sua retirada do atendimento ou da internação antes da alta médico-veterinária.

Fui informado(a) de que o paciente ainda necessita de acompanhamento, monitorização, exames, tratamentos ou procedimentos, conforme orientação da equipe responsável.

Também fui informado(a) de que a retirada neste momento poderá causar piora do quadro clínico, interrupção inadequada do tratamento, aumento da dor ou do desconforto, desenvolvimento de complicações, necessidade de atendimento emergencial, sequelas permanentes e risco de óbito.

Mesmo após receber essas informações e ter a oportunidade de esclarecer minhas dúvidas, mantenho a decisão de retirar o paciente sem alta médica.

CONDUTAS AINDA RECOMENDADAS:

[DESCREVER]

RISCOS ESPECÍFICOS EXPLICADOS:

[DESCREVER]

RECOMENDAÇÕES PARA O DOMICÍLIO:

[DESCREVER]

Fui orientado(a) a procurar atendimento médico-veterinário imediatamente caso o paciente apresente piora ou qualquer alteração preocupante.

LOCAL E DATA: __________________________________________

HORÁRIO: _______________________________________________

RESPONSÁVEL PELO ANIMAL

NOME: _________________________________________________

CPF: ___________________________________________________

ASSINATURA: ____________________________________________

MÉDICO-VETERINÁRIO

{{veterinarian_name}}

CRMV: {{crmv}}

ASSINATURA: ____________________________________________

TESTEMUNHA 1, SE HOUVER RECUSA DE ASSINATURA

NOME: _________________________________________________

CPF: ___________________________________________________

ASSINATURA: ____________________________________________

TESTEMUNHA 2, SE HOUVER RECUSA DE ASSINATURA

NOME: _________________________________________________

CPF: ___________________________________________________

ASSINATURA: ____________________________________________`
  },

  // Termo 3: Termo Geral de Consentimento
  {
    id: 'term-geral-consentimento',
    title: 'Termo Geral de Consentimento',
    category: 'Termos',
    document_type: 'term',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `TERMO GERAL DE CONSENTIMENTO

PACIENTE: {{patient_name}}
ESPÉCIE: {{species}}
RAÇA: {{breed}}
SEXO: {{sex}}
IDADE: {{age}}
RESPONSÁVEL: {{responsible_name}}

Eu, responsável pelo animal acima identificado, declaro que fui informado(a) sobre seu estado clínico e autorizo a realização da seguinte conduta:

[DESCREVER EXAME, INTERNAÇÃO, PROCEDIMENTO, ANESTESIA, CIRURGIA OU TRATAMENTO AUTORIZADO]

Recebi explicações sobre o objetivo da conduta, seus benefícios esperados, possíveis riscos, alternativas e possibilidade de complicações.

Declaro que tive oportunidade de fazer perguntas e que minhas dúvidas foram esclarecidas.

Autorizo a equipe médico-veterinária a realizar as medidas necessárias relacionadas à conduta descrita, respeitando os limites técnicos, éticos e profissionais aplicáveis ao caso.

OBSERVAÇÕES:

[DESCREVER]

LOCAL E DATA: __________________________________________

RESPONSÁVEL PELO ANIMAL

NOME: _________________________________________________

CPF: ___________________________________________________

ASSINATURA: ____________________________________________

MÉDICO-VETERINÁRIO

{{veterinarian_name}}

CRMV: {{crmv}}

ASSINATURA: ____________________________________________`
  },

  // Termo 4: Termo de Consentimento para Eutanásia
  {
    id: 'term-consentimento-eutanasia',
    title: 'Termo de Consentimento para Eutanásia',
    category: 'Termos',
    document_type: 'term',
    species: 'ambos',
    is_global: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body_plain_text: `TERMO DE CONSENTIMENTO PARA EUTANÁSIA

PACIENTE: {{patient_name}}
ESPÉCIE: {{species}}
RAÇA: {{breed}}
SEXO: {{sex}}
IDADE: {{age}}
RESPONSÁVEL: {{responsible_name}}

Eu, responsável pelo animal acima identificado, declaro sob as penas da lei que sou o(a) tutor(a) legal do paciente e autorizo o médico-veterinário e sua equipe a realizarem o procedimento de eutanásia induzida.

Declaro que fui devidamente esclarecido(a) quanto ao diagnóstico, prognóstico desfavorável, gravidade da condição clínica, dor ou ausência de perspectiva razoável de recuperação ou qualidade de vida para o animal.

Fui informado(a) sobre as etapas do procedimento, incluindo a administração prévia de sedação e anestesia profunda para garantir a ausência total de dor e sofrimento ao paciente antes da indução do óbito.

Declaro que autorizo a destinação final do corpo conforme os procedimentos legais vigentes.

OBSERVAÇÕES:

[DESCREVER CONDIÇÃO OU HISTÓRICO RELEVANTE]

LOCAL E DATA: __________________________________________

HORÁRIO: _______________________________________________

RESPONSÁVEL PELO ANIMAL

NOME: _________________________________________________

CPF: ___________________________________________________

ASSINATURA: ____________________________________________

MÉDICO-VETERINÁRIO

{{veterinarian_name}}

CRMV: {{crmv}}

ASSINATURA: ____________________________________________`
  }
];

/** A biblioteca global inclui somente os termos e as receitas clínicas solicitadas. */
export const SEEDED_TEMPLATES: DocumentTemplate[] = [
  ...RAW_SEEDED_TEMPLATES.filter((template) => template.document_type === 'term'),
  ...RECEITUARIO_INFECTOLOGIA_MODELS,
  ...RECEITUARIO_PROTOCOL_MODELS,
  ...RECEITUARIO_DIABETES_MODELS,
  ...RECEITUARIO_NEUROLOGIA_MODELS,
].map((template) => ({
  ...template,
  body_plain_text: normalizeLegacyDocumentBody(template.body_plain_text),
}));

export const GLOBAL_RECIPE_TEMPLATE_IDS = new Set(
  SEEDED_TEMPLATES.filter((template) => template.document_type === 'recipe').map((template) => template.id),
);

export const RETIRED_RECIPE_TEMPLATE_IDS = new Set([
  'seed-diabetes-mellitus',
  'seed-gastrite-aguda',
  'seed-cardio-b2',
  'seed-cardiob2',
  'seed-infectologia-parvovirose-hospitalar',
  'seed-infectologia-parvovirose-ambulatorial',
]);

function normalizedTemplateTitle(value: string): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/** Impede que modelos aposentados reapareçam por cache ou por registros antigos do banco. */
export function isRetiredRecipeTemplate(template: Pick<DocumentTemplate, 'id' | 'title' | 'document_type'>): boolean {
  if (template.document_type !== 'recipe') return false;
  if (RETIRED_RECIPE_TEMPLATE_IDS.has(template.id)) return true;
  const title = normalizedTemplateTitle(template.title);
  return title === 'cardiob2'
    || title === 'cardio b2'
    || title === 'cardiologia b2'
    || title === 'gastrite aguda gastroenterite'
    || title.includes('parvovirose caes protocolo hospitalar')
    || title.includes('parvovirose caes protocolo ambulatorial');
}
