import fs from 'fs';

const filePath = 'modules/consulta-vet/data/seed/diseases.leishmaniose.seed.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const target = '  prevention: {';
const complicationsBlock = `  complications: {
    principais: [
      'Glomerulonefrite Imunomediada por Imunocomplexos e Insuficiência Renal Crônica Terminal: A complicação clínica mais prevalente e a principal causa de mortalidade em cães com LCan (responsável por mais de 80% das eutanásias e mortes). A hipergamaglobulinemia policlonal exuberante associada à resposta imune Th2 aberrante gera deposição ininterrupta de complexos antígeno-anticorpo solúveis na lâmina basal e no mesângio glomerular. Desenvolve-se glomerulonefrite membranoproliferativa severa com perda massiva de albumina (síndrome nefrótica com UPC > 3,0 a 5,0), ascite, edema subcutâneo em membros e progressão fulminante para Doença Renal Crônica terminal (Estádios V e VI do Brasileish / Estádios 3 e 4 da IRIS).',
      'Urolitíase e Nefrolitíase por Cristais de Xantina (Iatrogênica por Alopurinol): O alopurinol bloqueia competitivamente a enzima xantina oxidase, impedindo a metabolização de hipoxantina e xantina em ácido úrico. Sob dietas com teores normais ou elevados de purinas, a urina fica supersaturada de xantina (substância de baixíssima solubilidade em pH urinário ácido a neutro), formando precipitados cristalinos e urólitos de xantina puros, radiotransparentes na radiografia convencional. Podem causar obstrução uretral aguda obstrutiva com uroabdômen e pielonefrite obstrutiva.',
      'Uveíte Anterior Imunomediada, Glaucoma Secundário e Cegueira: Ocorre por vasculite retiniana e deposição de imunocomplexos na túnica vascular do olho e processos ciliares, frequentemente associada à presença local de amastigotas no corpo ciliar. Manifesta-se com dor ocular intensa, blefarospasmo, flare aquoso na câmara anterior, hipópio estéril, hifema, precipitados ceráticos e sinéquias posteriores que bloqueiam o ângulo iridocorneano, culminando em glaucoma secundário hipertensivo agudo, luxação de cristalino e perda visual irreversível.',
      'Vasculite Necrotizante Sistêmica, Necrose de Ponta de Orelha e Epistaxe: Inflamação imunomediada transmural de arteríolas e capilares periféricos. Clinicamente, exterioriza-se como necrose isquêmica seca das margens dos pavilhões auriculares (pinas), úlceras de pressão profundas em proeminências ósseas e epistaxe profusa unilateral ou bilateral (decorrente de vasculite e rinite granulomatosa crônica com trombocitopenia de consumo associada).',
      'Poliartrite Imunomediada Não Erosiva: A deposição de imunocomplexos no líquido e membrana sinovial de múltiplas articulações apendiculares (joelhos, tarsos e carpos) deflagra sinovite neutrofílica asséptica com efusão articular dolorosa, rigidez matinal, claudicação migratória e relutância extrema à deambulação.',
      'Anemia Grave Mista (Doença Crônica + AHIM Secundária) e Trombocitopenia: Destruição e sequestro esplênico de hemácias acelerados pela produção de autoanticorpos antieritrócitos sobrepostos à diseritropoiese por infiltração histiocítica parasitária da medula óssea, deflagrando anemia não regenerativa a fracamente regenerativa moderada a grave e sangramentos cutâneo-mucosos.',
    ],
    prognostico:
      'O prognóstico para cães com leishmaniose visceral é primariamente ditado pelo grau de envolvimento renal ao diagnóstico, conforme o estadiamento do Brasileish/LeishVet. Cães nos Estádios I a III (sem proteinúria relevante e com função renal preservada) apresentam prognóstico favorável a bom, com remissão clínica rápida e redução da infecciosidade vetorial com protocolos à base de miltefosina e alopurinol. Pacientes no Estádio IV apresentam prognóstico moderado a reservado. Por sua vez, animais diagnosticados nos Estádios V e VI (com DRC avançada IRIS 3–4, proteinúria nefrótica grave com UPC > 2,0–5,0 ou tromboembolismo) possuem prognóstico altamente desfavorável, sendo a lesão renal crônica a causa terminal.',
  },\n`;

if (content.includes(target) && !content.includes('complications: {')) {
  content = content.replace(target, complicationsBlock + target);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated leishmaniose seed!');
} else {
  console.error('Target not found or already has complications');
}
