import { parseSmartImportText } from '../modules/plantao-vet/lib/smartImport';

function assert(condition: unknown, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

const pretinhaFixture = `
2) PRETINHA
Canina, SRD, sênior, 24,8 kg, síndrome vestibular / suspeita central + massa em nasofaringe

Resumo do quadro atual
Paciente internada inicialmente por quadro vestibular com head tilt à esquerda, ataxia, nistagmo e dificuldade de apreensão.
Houve boa evolução clínica nesses últimos dias: já fica em estação, caminha, come, bebe água e voltou a urinar espontaneamente.
RM/laudo sugeriu formação em nasofaringe, com principais DDx neoplásicos; líquor/painel infeccioso negativo.
Mantém episódios de hipertensão e sopro cardíaco em acompanhamento.

Parâmetros
08:00 - FC 120 bpm | FR 28 mpm | TR 38,4°C | PAS 180 mmHg | Mucosas róseas | TPC 2s | Ausculta cardíaca: sopro III/VI | Ausculta pulmonar sem alterações
14:00 - FC 116 bpm | FR 24 mpm | TR 38,2°C | PAS 160 mmHg | glicemia 92 mg/dL

Exames
Ultrassom abdominal sem alterações relevantes.
Ressonância magnética de crânio compatível com lesão expansiva em nasofaringe.

Medicações em uso
Amlodipina 0,3 mg/kg BID
Maropitant 1 mg/kg SID

Tarefas/Conversas
Checar PA no próximo turno.
Acompanhar definição de rinoscopia.
Observar marcha e apreensão.
`;

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

NOVA INTERNAÇÃO 10/03
Histórico: Paciente é DRC e cardiopata, ficou internada devido vômitos, inapetência e azotemia em 03/03 e recebeu alta em 07/03, porém desde segunda não quer comer e está muito prostrada.
Voltou em 10/03 para internação e sondagem esofágica pois não melhorou.

BOLETIM NOTURNO - 10/03/2026
Paciente alerta, recebeu alimentação via sonda nasoesofágica. Porta acesso venoso viável, mantido na fluidoterapia com ringer lactato acrescido de 30 mEq de potássio.

PARÂMETROS
09:00 - FC 184 bpm | FR 60 mpm | TR 37,3°C | PAS 120 mmHg | Glicemia 109 | Mucosas NC | TPC <2''

RESULTADO EXAMES
Perfil bioquímico com ureia 305,65, creatinina 6,01 e fósforo 12,75.

PRESCRIÇÃO
Mirtz 2mg/gato q48hrs
Maropitant 0,1 mL/kg sid
Hidróxido de alumínio tid

TAREFAS/CONVERSAS
Sondagem esofágica agendada para 12/03 às 14:00h. MANTER EM JEJUM DESDE 08:00H.
Monitorar aceitação alimentar.
Reavaliar alta após estabilização.

ZUL está com 5,0kg - atenção às medicações
`;

const giFixture = `
NOME
Luna
ESPÉCIE/RAÇA
Canina / Poodle
IDADE
6 anos
PESO
7,2 kg
TUTOR
Marcos
SUSPEITA
Gastroenterite hemorrágica

HISTÓRICO/ANAMNESE
Paciente com diarreia, vômitos e apatia há 24 horas.

BOLETIM DIURNO - 14/03/2026
Paciente alerta, porém desidratada, com dor abdominal leve. Sem novos episódios de vômito após antiemético. Alimentação fracionada iniciada.

PARÂMETROS
08:00 - FC 132 bpm | FR 32 mpm | TR 38,7°C | PAS 110 mmHg | Glicemia 96 | Mucosas hiperêmicas | TPC 2s
16:00 - FC 120 bpm | FR 28 mpm | TR 38,4°C | PAS 108 mmHg | Glicemia 90 | Mucosas róseas | TPC 2s

RESULTADO EXAMES
Hemograma com hemoconcentração discreta e leucocitose neutrofílica.
Ultrassom abdominal com alças intestinais discretamente espessadas, sem corpo estranho.

PRESCRIÇÃO
Ondansetrona 0,2 mg/kg BID
Metronidazol 15 mg/kg BID VO

TAREFAS/CONVERSAS
Monitorar vômitos e diarreia.
Estimular ingestão hídrica.
Reavaliar necessidade de internação amanhã.
`;

const pretinha = parseSmartImportText(pretinhaFixture);
assert(pretinha.name === 'PRETINHA', 'Pretinha: nome incorreto');
assert(pretinha.species === 'canina', 'Pretinha: espécie deve ser canina');
assert(pretinha.breed === 'SRD', 'Pretinha: raça deve ser SRD');
assert(pretinha.tags.includes('Neurológico'), 'Pretinha: deve ter tag Neurológico');
assert(pretinha.tags.includes('Vestibular'), 'Pretinha: deve ter tag Vestibular');
assert(pretinha.problems.some((problem) => problem.title.includes('nasofaringe')), 'Pretinha: massa em nasofaringe deve virar problema');
assert(pretinha.tasks.length >= 3, 'Pretinha: tarefas operacionais devem ser extraídas');
assert(pretinha.vitalsRecords.length >= 2, 'Pretinha: parâmetros devem gerar múltiplos registros');
assert(pretinha.examRecords.length >= 1, 'Pretinha: exames de imagem devem ser extraídos');
assert(pretinha.medicationEntries.length >= 2, 'Pretinha: medicações em uso devem ser extraídas');
assert(pretinha.dailySummaryEntries.length >= 5, 'Pretinha: resumo diário deve ser alimentado');

const sushi = parseSmartImportText(sushiFixture);
assert(sushi.name === 'Sushi', 'Sushi: nome incorreto');
assert(sushi.species === 'felina', 'Sushi: espécie deve ser felina');
assert(sushi.breed === 'SRD', 'Sushi: raça deve ser SRD');
assert(sushi.baseWeightLabel === '1,85 kg', 'Sushi: peso-base deve permanecer 1,85 kg');
assert(!sushi.weightLabel.includes('5,0'), 'Sushi: peso do ZUL não pode contaminar o caso');
assert(sushi.tags.includes('Felina'), 'Sushi: deve ter tag Felina');
assert(sushi.tags.includes('Nefropata'), 'Sushi: deve ter tag Nefropata');
assert(sushi.examRecords.length === 1, 'Sushi: deve haver apenas o exame laboratorial real');
assert(sushi.medicationEntries.length >= 3, 'Sushi: medicações devem ser extraídas');
assert(sushi.tasks.every((task) => !task.title.toLowerCase().includes('agendada para 12/03')), 'Sushi: tarefa já realizada não deve ficar aberta');
assert(sushi.importWarnings.some((warning) => warning.toLowerCase().includes('outro paciente')), 'Sushi: ruído de outro paciente deve gerar warning');

const gi = parseSmartImportText(giFixture);
assert(gi.name === 'Luna', 'GI: nome incorreto');
assert(gi.species === 'canina', 'GI: espécie deve ser canina');
assert(gi.breed === 'Poodle', 'GI: raça deve ser Poodle');
assert(gi.tags.includes('Gastrointestinal'), 'GI: deve ter tag Gastrointestinal');
assert(gi.tasks.length >= 3, 'GI: tarefas do turno devem ser extraídas');
assert(gi.vitalsRecords.length >= 2, 'GI: múltiplos parâmetros devem ser extraídos');
assert(gi.examRecords.some((exam) => exam.category === 'hemogram'), 'GI: hemograma deve virar exame real');
assert(gi.medicationEntries.some((medication) => medication.name.toLowerCase().includes('metronidazol')), 'GI: medicações devem ser extraídas');
assert(gi.bulletinDrafts.length >= 2, 'GI: rascunhos de boletim devem ser gerados');

console.log('PlantãoVET import fixtures: OK');
