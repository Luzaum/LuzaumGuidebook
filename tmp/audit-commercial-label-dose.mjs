import { commercialOticProductsSeed } from './modules/consulta-vet/data/commercialOticProducts.seed.ts';

const PRACTICAL_DOSE_PATTERN =
  /(\d+(?:[,.]\d+)?\s*(?:a|-)?\s*\d*(?:[,.]\d+)?\s*(?:mg|mcg|ug|µg|m²|m2|ml|mL|UI|U|%)\s*(?:\/\s*(?:kg|m²|m2|5 kg|10 kg|20 kg|40 kg))?|\d+(?:[,.]\d+)?\s*(?:cm|min|minuto|minutos|h|hora|horas|dia|dias|semana|semanas)\b|\d+\s*(?:a|-)\s*\d+\s*(?:x|vez|vezes)\s*(?:\/|por)?\s*(?:dia|semana)|\d+\s*(?:x|vez|vezes)\s*(?:\/|por)?\s*(?:dia|semana)|(?:uma|duas|tres|três)\s+vez(?:es)?\s+(?:ao|por)\s+(?:dia|mes|mês|semana)|\b(?:q\s*\d+\s*h?|q\d+h?|sid|bid|tid|qid)\b|\b(?:a\s+)?cada\s+\d+|\d+\s*(?:gota|gotas|pipeta|pipetas|tablete|tabletes|aplicador|aplicadores|flaconete|flaconetes|comprimido|comprimidos|comp|capsula|capsulas|cápsula|cápsulas|spray|jato|jatos|borrifada|borrifadas|aplicação|aplicações|aplicacao|aplicacoes|coleira)\b|(?:preencher|instilar)\s+(?:o\s+)?conduto|quantidade\s+suficiente|fina\s+camada|faixa\s+de\s+peso|dose\s+do\s+medidor|diretamente\s+(?:na|no)|todas\s+as\s+refeições|número\s+de\s+borrifadas|(?:borrifar|borrifação|embeber\s+algodão|seringa\s+graduada|pós-banho)|(?:deixar\s+agir|tempo\s+de\s+contato|banhar|molhar|umedecer|massagear|enxaguar|aplicar\s+no\s+banho|escovar)|diariamente|semanal(?:mente)?|mensal(?:mente)?)/i;

const BLOCKED_DOSE_PATTERN =
  /(dose bloqueada|bloquear receita|conferir bula|pendente de bula|posologia de bula n[aã]o cadastrada|sem dose padr[aã]o|sem dose espec[ií]fica|dose conforme indica[cç][aã]o|conforme indica[cç][aã]o registrada|seguir bula|sem bula veterin[aá]ria|sem dose veterin[aá]ria|bula veterin[aá]ria varia|calcular a dose de|conforme apresenta[cç][aã]o|conforme protocolo|dose por bula|conforme faixas de peso|dose por faixa de peso|conforme peso\/esp[eé]cie)/i;

function hasPracticalDoseText(dose?: string) {
  if (!dose || BLOCKED_DOSE_PATTERN.test(dose)) return false;
  return PRACTICAL_DOSE_PATTERN.test(dose);
}

type Status = 'ok' | 'blocked' | 'missing' | 'weak';

const results = commercialOticProductsSeed.map((p) => {
  const labelDose = p.dosageGuidance?.labelDose?.trim() || '';
  const labelDirections = p.labelDirections?.trim() || '';
  const prescriptionExample = p.prescriptionExample?.trim() || '';
  const plumbsDog = p.dosageGuidance?.plumbs?.dog || [];
  const plumbsCat = p.dosageGuidance?.plumbs?.cat || [];

  let status: Status = 'ok';
  if (!labelDose) status = 'missing';
  else if (BLOCKED_DOSE_PATTERN.test(labelDose)) status = 'blocked';
  else if (!hasPracticalDoseText(labelDose)) status = 'weak';

  const fallback = [
    hasPracticalDoseText(labelDirections) ? 'labelDirections' : null,
    hasPracticalDoseText(prescriptionExample) ? 'prescriptionExample' : null,
    plumbsDog.some((e) => hasPracticalDoseText(e.dose)) ? 'plumbs.dog' : null,
    plumbsCat.some((e) => hasPracticalDoseText(e.dose)) ? 'plumbs.cat' : null,
  ].filter(Boolean);

  return {
    id: p.id,
    name: p.name,
    class: p.commercialClass,
    status,
    labelDose,
    fallback,
  };
});

const bad = results.filter((r) => r.status !== 'ok');
console.log(JSON.stringify({ total: results.length, ok: results.filter(r=>r.status==='ok').length, badCount: bad.length, bad }, null, 2));
