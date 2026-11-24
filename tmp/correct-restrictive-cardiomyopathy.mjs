import fs from 'node:fs';
const file = 'modules/consulta-vet/data/seed/diseases.cardiomiopatia-restritiva.seed.ts';
let text = fs.readFileSync(file, 'utf8');
const edits = [
 ['profilaxia antitrombótica agressiva', 'prevenção de tromboembolismo conforme o risco'],
 ['tromboprofilaxia dupla imediata (clopidogrel + rivaroxabana) e suporte inotrópico com pimobendan', 'tromboprofilaxia conforme o risco e avaliação individual da indicação de pimobendan'],
 ['Pimobendan (0,625 a 1,25 mg/gato VO q12h) é seguro e benéfico na CMR descompensada: ao contrário da CMH, a CMR raramente desenvolve obstrução dinâmica da via de saída do VE (SAM), beneficiando-se do inotropismo e da vasodilatação.', 'Pimobendan (0,625 a 1,25 mg/gato VO q12h) pode ser considerado na insuficiência cardíaca, sobretudo com disfunção sistólica ou baixo débito. Avaliar previamente obstrução da via de saída ventricular, pressão arterial e perfusão; o fenótipo restritivo não garante segurança em todos os pacientes.'],
 ['Tromboprofilaxia agressiva com clopidogrel e rivaroxabana', 'Tromboprofilaxia orientada pelo risco individual'],
 ['Na alta, a tromboprofilaxia dupla com clopidogrel e rivaroxabana previne a complicação mais temida da doença: o tromboembolismo arterial aórtico (FATE).', 'Na alta, a estratégia antitrombótica depende do tamanho e da função atrial, de trombos e de eventos prévios. Associar um anticoagulante ao clopidogrel pode ser considerado em risco elevado, ponderando sangramento e a limitação da evidência.'],
 ['Dupla inibição plaquetária e de fator Xa', 'Avaliação individual do risco trombótico e hemorrágico'],
 ['Fase 2: Suporte Inotrópico e Lusitrópico com Pimobendan', 'Fase 2: Avaliar Indicação de Pimobendan'],
 ['Como a CMR não apresenta obstrução da via de saída do VE, o pimobendan atua promovendo sensibilização de cálcio, facilitando o relaxamento diastólico e reduzindo a pós-carga por vasodilatação periférica.', 'Considerar na insuficiência cardíaca com disfunção sistólica ou baixo débito, após avaliar obstrução da via de saída do VE e pressão arterial. Não presumir ausência de obstrução apenas pelo diagnóstico de CMR.'],
 ['Fase 3: Tromboprofilaxia Agressiva (Prevenção Primária e Secundária)', 'Fase 3: Tromboprofilaxia Conforme o Risco'],
 ['Clopidogrel (Tromboprofilaxia Obrigatória de Primeira Linha)', 'Clopidogrel (Prevenção de Tromboembolismo)'],
 ['Mandatório em todo gato com dilatação atrial esquerda moderada a grave ou pós-FATE.', 'Recomendado em pacientes com fatores de risco tromboembólico, especialmente aumento atrial importante, insuficiência cardíaca prévia ou episódio de tromboembolismo. Avaliar sangramento ativo e contraindicações individuais.'],
 ['Recomendada em associação ao clopidogrel (tromboprofilaxia dupla) em gatos com altíssimo risco trombótico', 'Pode ser considerada em associação ao clopidogrel em gatos com risco trombótico elevado'],
 ['Insuficiência cardíaca congestiva decorrente de CMR.', 'Insuficiência cardíaca decorrente de CMR, sobretudo com disfunção sistólica ou baixo débito, após avaliação ecocardiográfica e hemodinâmica.'],
 ['Melhora a complacência ventricular e o relaxamento diastólico, aumentando a contratilidade atrial e ventricular sem elevar o consumo de oxigênio.', 'Aumenta a contratilidade e promove vasodilatação. Não reverte a fibrose e não deve ser apresentado como tratamento comprovado para restaurar a complacência ventricular.'],
 ['Como a CMR não cursa com estenose ou obstrução dinâmica da via de saída do VE (SAM), o pimobendan é seguro e promove melhora hemodinâmica consistente.', 'A obstrução dinâmica é menos típica na CMR, mas precisa ser avaliada. Monitorar pressão arterial, perfusão e resposta clínica; a evidência específica para esse fenótipo é limitada.'],
 ['Antagonista de aldosterona para proteção nefroprotetora e redução da fibrose miocárdica.', 'Antagonista da aldosterona que pode ser considerado como adjuvante na insuficiência cardíaca. Não há demonstração de reversão da fibrose na CMR; monitorar potássio e função renal.'],
];
for (const [before, after] of edits) {
 if (!text.includes(before)) throw new Error('Trecho não encontrado: '+before);
 text = text.replaceAll(before, after);
}
text = text.replace('Tromboprofilaxia mandatória em todo felino', 'Avaliar tromboprofilaxia em felinos').replace('associar Rivaroxabana', 'considerar associar Rivaroxabana');
fs.writeFileSync(file, text);
