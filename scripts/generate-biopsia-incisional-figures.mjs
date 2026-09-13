import fs from 'node:fs';
import path from 'node:path';

// Original vector teaching diagrams; no reproduced book figures.
const out = path.resolve('public/consulta-vet/clinical-guides/biopsia-incisional');
fs.mkdirSync(out, { recursive: true });
const t = (x, y, text, size = 23, color = '#334155', weight = 400) => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${text}</text>`;
const rect = (x,y,w,h,fill,stroke='none',radius=20) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const line = (x1,y1,x2,y2,color='#64748b',width=3) => `<path d="M${x1},${y1} L${x2},${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
const save = (name, title, height, content) => fs.writeFileSync(path.join(out,name), `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${height}" viewBox="0 0 800 ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title><rect width="800" height="${height}" rx="24" fill="#f8fafc"/><g font-family="Arial, sans-serif">${content}</g></svg>`);

let s=t(35,48,'O trajeto precisa caber na futura cirurgia',29,'#0f172a',700)+t(35,82,'Vista superficial de um membro • esquema sem escala',20);
for(const [x,ok] of [[25,true],[415,false]]) {
  s+=rect(x,108,360,434,ok?'#ecfdf5':'#fff1f2',ok?'#a7f3d0':'#fecdd3');
  s+=t(x+20,145,ok?'PLANEJADO':'ACESSO INADEQUADO',23,ok?'#047857':'#be123c',700);
  s+=rect(x+97,172,165,310,'#f4d7bf','#d4b59d',64);
  s+=`<ellipse cx="${x+180}" cy="324" rx="57" ry="116" fill="#d1fae5" fill-opacity=".65" stroke="#059669" stroke-dasharray="8 6" stroke-width="3"/>`;
  s+=`<ellipse cx="${x+180}" cy="325" rx="35" ry="53" fill="#dba1ab" stroke="#9d5263" stroke-width="2"/>`;
  s+=ok?line(x+180,284,x+180,358,'#0f766e',7):line(x+83,325,x+277,325,'#be123c',7);
  s+=t(x+20,515,ok?'Incisão longitudinal contida':'Incisão transversal excede',21,ok?'#047857':'#be123c');
}
s+=line(40,580,82,580,'#059669',3)+t(98,587,'Campo hipotético de ressecção',22);
s+=`<ellipse cx="60" cy="624" rx="20" ry="12" fill="#dba1ab"/>`+t(98,632,'Massa tumoral',22);
s+=t(35,681,'A profundidade do acesso também entra no planejamento.',23,'#0f172a',700);
save('trajeto.svg','Incisão longitudinal e campo planejado de ressecção',713,s);

s=t(35,48,'Cunha: volume + profundidade + tecido viável',27,'#0f172a',700)+t(35,83,'Massa exposta • representação conceitual em corte',21);
s+=rect(35,112,730,385,'#fff','#cbd5e1');
s+=`<path d="M80 365 Q100 229 220 229 L561 229 Q690 229 720 365 L720 424 Q400 500 80 424 Z" fill="#e7aeb8" stroke="#9d5263" stroke-width="3"/>`;
s+=`<path d="M135 245 Q178 213 262 238 L259 268 Q174 287 135 245" fill="#a8a29e"/>`;
s+=t(62,156,'Área superficial alterada',21)+line(180,165,193,229);
s+=`<path d="M430 229 L550 229 L490 371 Z" fill="#fde68a" stroke="#d97706" stroke-width="4"/>`;
s+=t(545,163,'Cunha',24,'#92400e',700)+line(564,173,521,226,'#d97706');
s+=t(265,433,'Tecido tumoral viável',23,'#713447',700);
s+=t(52,538,'1',25,'#0f766e',700)+t(85,538,'Delimitar dois planos de corte convergentes.',23);
s+=t(52,582,'2',25,'#0f766e',700)+t(85,582,'Liberar a base sob visão; não arrancar.',23);
s+=t(52,626,'3',25,'#0f766e',700)+t(85,626,'Preservar o fragmento; manipular a periferia.',23);
s+=t(35,678,'Não define tamanho, ângulo ou profundidade universais.',20);
save('cunha.svg','Cunha de tecido viável em uma massa exposta',710,s);

s=t(35,48,'Uma coleta, destinos diferentes',29,'#0f172a',700)+t(35,82,'Decida a divisão do material antes de fixar.',23);
const cards=[
  {y:110,color:'#0369a1',bg:'#e0f2fe',n:'01',title:'HISTOPATOLOGIA',a:'Formalina tamponada neutra a 10%',b:'1 volume de tecido : ~10 de fixador'},
  {y:290,color:'#047857',bg:'#d1fae5',n:'02',title:'IMPRINT / CITOLOGIA',a:'Lâmina seca ao ar, feita antes da fixação',b:'Porta-lâminas longe dos vapores de formalina'},
  {y:470,color:'#7c3aed',bg:'#ede9fe',n:'03',title:'CULTURA / EXAME ESPECIAL',a:'Porção separada com técnica asséptica',b:'Recipiente e transporte definidos pelo laboratório'}
];
for(const c of cards){s+=rect(35,c.y,730,154,c.bg);s+=t(58,c.y+46,c.n,30,c.color,700)+t(115,c.y+44,c.title,24,c.color,700)+t(60,c.y+86,c.a,23)+t(60,c.y+123,c.b,21);}
s+=t(35,669,'Identifique paciente, local e região em cada recipiente.',22,'#0f172a',700);
save('destinos.svg','Separação da amostra para histologia, citologia e exames especiais',701,s);

s=rect(0,0,800,800,'#e6f5f2','none',0)+`<circle cx="400" cy="380" r="278" fill="#fff"/>`;
s+=`<ellipse cx="296" cy="410" rx="146" ry="121" fill="#dfa4b1" stroke="#9d5263" stroke-width="7"/><path d="M250 310 L347 310 L297 444 Z" fill="#fde68a" stroke="#d97706" stroke-width="6"/>`;
s+=rect(485,310,157,230,'#dff3fb','#0e7490',26)+rect(472,271,183,59,'#0f766e')+rect(501,383,124,100,'#fff');
s+=t(518,425,'10%',34,'#0e7490',700)+t(511,459,'fixador',24,'#0e7490');
s+=t(180,659,'BIÓPSIA INCISIONAL',38,'#134e4a',700)+t(196,705,'Tecido que orienta a conduta',27);
save('capa.svg','Biópsia em cunha e recipiente de histologia',800,s);
console.log('4 original SVG diagrams generated.');
