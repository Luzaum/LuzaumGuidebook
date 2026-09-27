import fs from 'fs';

const filePath = 'modules/consulta-vet/data/seed/diseases.drc.seed.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const target = '  prevention:';
const complicationsBlock = `  complications: {
    principais: [
      'Hiperparatireoidismo Secundário Renal (HPTS / DRC-MBD) e Osteodistrofia Fibrosa: A retenção de fósforo decorrente da perda da taxa de filtração glomerular inibe a 1-alfa-hidroxilase renal e reduz a síntese do calcitriol ativo (1,25-di-hidroxivitamina D3), ao mesmo tempo em que estimula a produção excessiva de FGF-23 pelos osteócitos. A hipocalcemia ionizada e a falta de feedback negativo do calcitriol deflagram hiperplasia das glândulas paratireoides com secreção descontrolada de PTH. O excesso de PTH promove reabsorção osteoclástica óssea maciça (osteodistrofia fibrosa / "mandíbula de borracha"), osteopenia severa, dor esquelética e mineralização distrófica metastática de tecidos moles (coração, rins e vasos sanguíneos), acelerando a nefroesclerose.',
      'Hipertensão Arterial Sistêmica Secundária e Doença em Órgãos-Alvo (TOD): Desenvolve-se em 60% a 80% dos cães e gatos com DRC, decorrente da incapacidade de excreção de sódio, ativação anômala do sistema renina-angiotensina-aldosterona (SRAA) e disfunção endotelial. Picos pressóricos não controlados (PAS > 160–180 mmHg) desencadeiam retinopatia hipertensiva com descolamento retiniano bolhoso e amaurose súbita irreversível, encefalopatia hipertensiva com convulsões, sobrecarga ventricular esquerda e aceleração da proteinúria glomerular.',
      'Crise Urêmica Aguda e Descompensação Grave (Acute-on-Chronic Kidney Disease): Perda abrupta da função renal remanescente precipitada por hipovolemia/desidratação aguda, pielonefrite ascendente bacteriana ou administração de fármacos nefrotóxicos (AINEs, aminoglicosídeos). Manifesta-se com acidose metabólica severa, hipercalemia com risco de parada cardíaca, estomatite urêmica ulcerativa dolorosa com necrose da ponta da língua e gastropatia urêmica com sangramento digestivo e vômitos refratários.',
      'Anemia Hipoproliferativa Não Regenerativa da DRC: A destruição dos fibroblastos intersticiais peritubulares renais reduz drasticamente a síntese de eritropoietina (EPO), impedindo a maturação de eritrócitos na medula óssea. O quadro é agravado pelo encurtamento da vida útil das hemácias pelas toxinas urêmicas circulantes, carência funcional de ferro e micro-hemorragias gastrointestinais contínuas, provocando letargia profunda, fraqueza, sopro anêmico funcional e hipoxemia tecidual.',
      'Hipocalemia Crônica e Miopatia Cervical Felina: Ocorre primariamente em gatos com DRC (estádios 2 e 3) devido à espoliação urinária contínua de potássio na diurese osmótica somada à baixa ingestão alimentar. Manifesta-se com fraqueza muscular esquelética generalizada, ventroflexão cervical clássica (incapacidade de erguer a cabeça), constipação intestinal crônica severa por atonia colônica e redução adicional reflexa da taxa de filtração glomerular renal.',
      'Acidose Metabólica Crônica e Caquexia Muscular Urêmica: Incapacidade dos túbulos renais de reabsorver bicarbonato filtrado e secretar prótons de hidrogênio e ânions ácidos não mensurados (sulfatos e fosfatos). A acidose crônica sustentada ativa a via ubiquitina-proteassoma na musculatura esquelética, deflagrando catabolismo proteico acelerado, perda grave de escore muscular (sarcopenia urêmica) e desmineralização óssea progressiva.',
    ],
    prognostico:
      'O prognóstico para cães e gatos com Doença Renal Crônica é diretamente estratificado pelo estádio IRIS e pelos subestádios de proteinúria (UPC) e pressão arterial (PAS). Gatos no Estádio 2 da IRIS apresentam sobrevidas medianas superiores a 3 anos (cerca de 1.151 dias) quando mantidos com dieta renal e controle de fósforo; no Estádio 3, a mediana é de aproximadamente 2 anos (679 dias); no Estádio 4 descompensado, a sobrevida mediana cai para cerca de 35 a 60 dias sem diálise ou nutrição assistida intensiva. Em cães, a proteinúria glomerular severa (UPC > 1,0–2,0) e a hipertensão sistêmica refratária são os fatores mais determinantes de rápida progressão para óbito renal.',
  },\n`;

if (content.includes(target) && !content.includes('complications: {')) {
  content = content.replace(target, complicationsBlock + target);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated DRC seed!');
} else {
  console.error('Target not found or complications already present');
}
