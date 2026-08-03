const WEIGHT_BASED_ADMINISTRATION = /\bAdministrar\s+(\d+(?:[.,]\d+)?)\s*(?:(?:a|até|ate|–|—|-)\s*(\d+(?:[.,]\d+)?)\s*)?(mg|mcg|µg|mL|UI)\/kg\b/gi;

export const CLINICAL_DOSE_LABEL = 'Dose clínica:';

export const RECIPE_CLINICAL_WORSENING_NOTICE =
  'Em caso de piora clínica, retornar ao hospital ou buscar serviço veterinário externo.';

export const EDITABLE_RECIPE_RETURN_NOTICE =
  '• Retornar para reavaliação em A PREENCHER ou antes, caso necessário.';

function parseDecimal(value: string): number {
  return Number(value.replace(',', '.'));
}

function formatDose(value: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 3 }).format(value);
}

/** Converte instruções textuais em dose por kg para a dose total do paciente. */
export function calculateTemplateDosesByWeight(bodyText: string, weightKg: number): string {
  if (!Number.isFinite(weightKg) || weightKg <= 0) return String(bodyText || '');

  return String(bodyText || '').replace(/[^\n]+/g, (line) => {
    let clinicalDose = '';
    const calculatedLine = line.replace(
      WEIGHT_BASED_ADMINISTRATION,
      (_match, minimumText: string, maximumText: string | undefined, unit: string) => {
        const minimum = parseDecimal(minimumText) * weightKg;
        const maximum = maximumText ? parseDecimal(maximumText) * weightKg : null;
        const calculated = maximum == null
          ? `${formatDose(minimum)} ${unit}`
          : `${formatDose(minimum)} a ${formatDose(maximum)} ${unit}`;
        const indicatedRange = maximumText
          ? `${minimumText} a ${maximumText} ${unit}/kg`
          : `${minimumText} ${unit}/kg`;
        clinicalDose = `${CLINICAL_DOSE_LABEL} ${indicatedRange}`;
        return `Administrar ${calculated}`;
      },
    );
    return clinicalDose ? `${calculatedLine}\n${clinicalDose}` : calculatedLine;
  });
}

/** Garante a orientação institucional em toda receita, sem duplicá-la. */
export function ensureRecipeClinicalWorseningNotice(bodyText: string): string {
  const body = String(bodyText || '').trim();
  const normalizedBody = body.replace(
    /em caso de piora clínica, retornar ao hospital ou buscar serviço veterinário externo\./gi,
    RECIPE_CLINICAL_WORSENING_NOTICE,
  );
  if (normalizedBody.toLocaleUpperCase('pt-BR').includes(RECIPE_CLINICAL_WORSENING_NOTICE.toLocaleUpperCase('pt-BR'))) return normalizedBody;
  return `${normalizedBody}${normalizedBody ? '\n\n' : ''}${RECIPE_CLINICAL_WORSENING_NOTICE}`;
}

/** Troca a orientação impessoal antiga por um prazo que o usuário deve definir na própria receita. */
export function ensureEditableRecipeReturn(bodyText: string): string {
  return String(bodyText || '').replace(
    /[•*-]?\s*Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário\./gi,
    EDITABLE_RECIPE_RETURN_NOTICE,
  );
}

/** Remove metadados técnicos e antigos cuidados automáticos que não pertencem ao documento entregue ao tutor. */
export function stripPrescriptionTechnicalDetails(bodyText: string): string {
  const output: string[] = [];
  let skippingAutomaticPrecautions = false;
  let skippingRecipeInformation = false;

  for (const line of String(bodyText || '').replace(/\r\n/g, '\n').split('\n')) {
    const trimmed = line.trim();
    if (/^Dose (?:clínica|selecionada)\s*:/i.test(trimmed) || /^Dose real ap[oó]s (?:convers[aã]o|arredondamento)\s*:/i.test(trimmed)) continue;
    if (/^Erro de dose\s*:/i.test(trimmed)) continue;
    if (/^INFORMAÇÕES IMPORTANTES$/i.test(trimmed)) {
      skippingRecipeInformation = true;
      continue;
    }
    if (/^ORIENTA[CÇ][OÕ]ES E CUIDADOS IMPORTANTES$/i.test(trimmed)) {
      skippingAutomaticPrecautions = true;
      continue;
    }
    if (skippingRecipeInformation) {
      if (/^(?:\d+\.\s+|RECOMENDA[CÇ][OÕ]ES\b|CUIDADOS\b|SINAIS\b|USO\b|EM CASO\b)/i.test(trimmed)) skippingRecipeInformation = false;
      else continue;
    }
    if (skippingAutomaticPrecautions) {
      if (/^(?:\d+\.\s+|RECOMENDA[CÇ][OÕ]ES\b|USO\b)/i.test(trimmed)) skippingAutomaticPrecautions = false;
      else continue;
    }
    output.push(line);
  }

  return output.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/** Padroniza recomendações como lista visual, sem expor a sintaxe de asteriscos. */
export function normalizeRecipeListMarkers(bodyText: string): string {
  return String(bodyText || '').replace(/^\s*\*\s+/gm, '• ');
}
