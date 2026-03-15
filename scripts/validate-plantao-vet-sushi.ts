import { parseSmartImportText } from '../modules/plantao-vet/lib/smartImport';

const sushiFixture = `
NOME
Sushi
IDADE
11 anos
ESPÉCIE/RAÇA
Fel/ SRD
PESO
1,85 kg
TUTOR
Alessandra
FICHA
96479
DATA ADMISSÃO
03/03/26
SUSPEITA
DRC
VET. RESPONSÁVEL
Laura
PERTENCES:
Caixa rosa com pano rosa

02/03/26:
Tem DRC.
Nos últimos dias piorou, de ontem para hoje parou de comer.
Há 3 dias está com vômito amarelado.
Medicações em uso: apevitin, ondansetrona tid.

NOVA INTERNAÇÃO 10/03
Histórico: Paciente é DRC e cardiopata, ficou internada devido vômitos, inapetência e azotemia em 03/03 e recebeu alta em 07/03, porém, desde segunda não quer comer e ficando muito prostrada.
Voltou em 10/03 para internação e sondagem esofágica pois não melhorou.

BOLETIM NOTURNO - 10/03/2026
MV Henrique M Peche
Paciente alerta ao ambiente, recebeu alimentação via sonda nasoesofágica. Porta acesso venoso viável, mantido na fluidoterapia com ringer lactato acrescido de 30 mEq de potássio. 5ml/h total.

BOLETIM DIURNO - 12/03/2026
M.V. Ana Mota
Paciente realizou o procedimento de sondagem esofágica, ao início da anestesia, hipotensão que foi logo recuperada. Mantém acesso patente em MTD, em taxa de 7,2 ml/h.

PARÂMETROS
09:00 - FC 184 bpm | FR 60 mpm | Ausculta cardíaca: Sopro III | Ausculta pulmonar sem alterações | Mucosas NC | TPC <2’’ | TR 37,3°C | PAS 120 mmHg | Glicemia 109 | Palpação abdominal: sem dor evidente, bexiga moderadamente repleta.

RESULTADO EXAMES
Perfil bioqu?mico com ureia 305,65, creatinina 6,01 e f?sforo 12,75.

PRESCRIÇÃO
Mirtz 2mg/gato q48hrs
Maropitant 0,1 mL/kg sid
Hidroxido de aluminio (Mylanta) tid

TAREFAS/CONVERSAS
Sondagem esofágica agendada para 12/03 às 14:00h. MANTER EM JEJUM DESDE 08:00H.
Alta com indicação de nefrologista: Vanessa (31) 983403255 whatsapp
Pedir ajuda para nutrição para cálculo do Critical Care - renafil acabou.

ZUL está com 5,0kg - atenção às medicações
`;

function assert(condition: unknown, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

const parsed = parseSmartImportText(sushiFixture);

assert(parsed.name === 'Sushi', 'Nome deve ser Sushi');
assert(parsed.tutorName === 'Alessandra', 'Tutor deve ser Alessandra');
assert(parsed.species === 'felina', 'Espécie deve ser felina');
assert(parsed.breed === 'SRD', 'Raça deve ser SRD');
assert(parsed.ageLabel === '11 anos', 'Idade deve ser 11 anos');
assert(parsed.baseWeightLabel === '1,85 kg', 'Peso-base deve ser 1,85 kg');
assert(!parsed.weightLabel.includes('5,0'), 'Peso de outro paciente não pode contaminar Sushi');
assert(parsed.summary.toLowerCase().includes('10/03') || parsed.currentAdmissionReason.toLowerCase().includes('10/03'), 'Resumo deve priorizar a nova internação de 10/03');
assert(parsed.problems.some((problem) => problem.title.toLowerCase().includes('doença renal') || problem.title === 'DRC'), 'DRC deve entrar como problema');
assert(parsed.examRecords.every((exam) => exam.category !== 'urinalysis'), 'Eliminação fisiológica não pode virar urinálise');
assert(parsed.examRecords.some((exam) => exam.category === 'electrolytes' || exam.category === 'biochemical'), 'Achados laboratoriais devem entrar como exame');
assert(parsed.tasks.every((task) => !task.title.toLowerCase().includes('agendada para 12/03')), 'Tarefa já realizada não deve permanecer aberta');
assert(parsed.importWarnings.some((warning) => warning.toLowerCase().includes('outro paciente')), 'Contaminação de outro paciente deve gerar aviso');

console.log('PlantãoVET Sushi fixture: OK');
