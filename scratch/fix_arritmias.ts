import fs from 'fs';

const filePath = 'modules/consulta-vet/data/seed/diseases.arritmias-cardiacas-caes-gatos.seed.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const target = '  prevention: {';
const complicationsBlock = `  complications: {
    principais: [
      'Morte Súbita Cardíaca (MSC) por Fibrilação Ventricular ou Assistolia: A degeneração hiperaguda de taquicardia ventricular rápida sustentada, fenômeno de "R-sobre-T" ou Torsades de Pointes em ritmo ventricular caótico e desorganizado (fibrilação ventricular) resulta em cessação instantânea do débito cardíaco sistêmico, perda de consciência em segundos e óbito caso não haja desfibrilação elétrica imediata (protocolo RECOVER 2024).',
      'Taquimiocardiopatia (Cardiomiopatia Induzida por Taquicardia): Taquicardias supraventriculares incessantes, taquicardias ventriculares de via de saída ou fibrilação atrial com resposta ventricular rápida não controlada mantidas por semanas geram sobrecarga metabólica contínua nos cardiomiócitos com esgotamento das reservas energéticas mitocondriais de ATP. Manifesta-se com dilatação cavitária progressiva das 4 câmaras e disfunção sistólica biventricular severa (fração de encurtamento < 15%), simulando fenotipicamente uma cardiomiopatia dilatada, porém com elevado potencial de recuperação e reversibilidade miocárdica após o controle definitivo da frequência ou ritmo.',
      'Síncope Arrítmica Recorrente e Traumatismo Secundário: A queda abrupta e transitória do débito cardíaco provocada por pausas sinusais prolongadas (> 4 a 6 segundos), bloqueio atrioventricular de 3º grau ou paroxismos de taquicardia ventricular culmina em hipoperfusão do córtex cerebral com perda súbita do tônus postural e da consciência, predispondo a traumatismos craniofaciais e acidentes físicos.',
      'Insuficiência Cardíaca Congestiva Aguda Descompensada: A perda do enchimento atrial coordenado ("atrial kick") na fibrilação atrial ou o encurtamento dramático da fase diastólica em frequências > 200–240 bpm elevam subitamente as pressões de enchimento atrial e venosa pulmonar, precipitando edema pulmonar agudo ou ascite volumosa.',
      'Tromboembolismo Sistêmico de Origem Atrial: A perda da contração mecânica das paredes atriais na fibrilação atrial crônica gera estase sanguínea pronunciada e turbilhonamento no interior do apêndice atrial, criando trombos murais com risco de desprendimento embólico e isquemia aguda de membros, rins ou cérebro.',
      'Efeitos Pró-Arrítmicos Iatrogênicos: Paradoxalmente, quase todos os fármacos antiarrítmicos possuem potencial pró-arrítmico. O prolongamento excessivo do intervalo QT por sotalol ou amiodarona em pacientes hipocalêmicos deflagra Torsades de Pointes; a associação desavisada de diltiazem com betabloqueadores precipita bradicardia extrema e bloqueio AV completo; e a intoxicação digitálica culmina em arritmias ventriculares refratárias.',
    ],
    prognostico:
      'O prognóstico para cães e gatos com arritmias cardíacas é altamente variável e depende diretamente do substrato miocárdico subjacente e da presença de sinais de baixo débito. Arritmias sem cardiopatia estrutural (ex.: taquicardia juncional mediada por via acessória curada por ablação, ou BAV de 3º grau tratado com marcapasso endocárdico definitivo) apresentam prognóstico excelente a longo prazo. Por outro lado, arritmias ventriculares complexas em Dobermanns com cardiomiopatia dilatada, Boxers com cardiomiopatia arritmogênica do ventrículo direito (ARVC) ou fibrilação atrial rápida em cães com DMVD avançada conferem prognóstico reservado a desfavorável, com risco perene de morte súbita.',
  },\n`;

if (content.includes(target)) {
  content = content.replace(target, complicationsBlock + target);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated arritmias seed!');
} else {
  console.error('Target string not found');
}
