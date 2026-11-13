export type OncologyPresentation =
  | { kind: 'injectable' | 'oral-liquid'; label: string; concentration?: number; unit: 'mg/mL' | 'UI/mL'; source?: string }
  | { kind: 'solid'; label: string; source: string };

const oralLiquid = { kind: 'oral-liquid', label: 'Líquido oral · informar concentração do rótulo', unit: 'mg/mL' } as const;
const injectable = { kind: 'injectable', label: 'Injetável · informar concentração do rótulo', unit: 'mg/mL' } as const;
const cyclophosphamideSource = 'https://guiafarmaceutico.hsl.org.br/Paginas/CICLOFOSFAMIDA.aspx';
const cyclophosphamideOral = [
  { kind: 'solid', label: '50 mg/comprimido · Genuxal', source: cyclophosphamideSource },
  oralLiquid,
] as const;
const chlorambucil = [
  { kind: 'solid', label: '2 mg/comprimido · Leukeran', source: 'https://www.mg.gov.br/sites/default/files/media/document/2025/10/sei_1500010308093_2024_52.pdf' },
  oralLiquid,
] as const;

export const ONCOLOGY_PRESENTATIONS: Record<string, readonly OncologyPresentation[]> = {
  doxorrubicina: [
    { kind: 'injectable', label: '2 mg/mL · Fauldoxo', concentration: 2, unit: 'mg/mL', source: 'https://www.libbs.com.br/wp-content/uploads/2015/12/doc-2-Fauldoxo_Bula_-Profissional.pdf' },
    injectable,
  ],
  vincristina: [
    { kind: 'injectable', label: '1 mg/mL · Fauldvincri', concentration: 1, unit: 'mg/mL', source: 'https://www.libbs.com.br/nossos-produtos/fauldvincri-solucao-injetavel/' },
    injectable,
  ],
  ciclofosfamida: [
    { kind: 'injectable', label: '20 mg/mL · Genuxal reconstituído (IV)', concentration: 20, unit: 'mg/mL', source: cyclophosphamideSource },
    ...cyclophosphamideOral,
    injectable,
  ],
  carboplatina: [
    { kind: 'injectable', label: '10 mg/mL · Fauldcarbo', concentration: 10, unit: 'mg/mL', source: 'https://www.libbs.com.br/nossos-produtos/carboplatina-fauldcarbo/' },
    injectable,
  ],
  lomustina: [
    { kind: 'solid', label: '10 mg/cápsula · Citostal', source: 'https://www.bms.com/assets/bms/brazil/documents/bulas-pacientes-otimizadas/CITOSTAL_CAP_VP_Rev0815.pdf' },
    { kind: 'solid', label: '40 mg/cápsula · Citostal', source: 'https://www.bms.com/assets/bms/brazil/documents/bulas-pacientes-otimizadas/CITOSTAL_CAP_VP_Rev0815.pdf' },
    oralLiquid,
  ],
  crisantaspase: [
    // A Anvisa documentou importação excepcional. A preparação e a concentração precisam ser confirmadas no produto.
    { kind: 'injectable', label: 'Erwinase importado · informar concentração reconstituída', unit: 'UI/mL', source: 'https://cima.aemps.es/cima/dochtml/ft/86063/FT_86063.html' },
  ],
  vinblastina: [
    { kind: 'injectable', label: '1 mg/mL · Faulblastina', concentration: 1, unit: 'mg/mL', source: 'https://www.libbs.com.br/nossos-produtos/antineoplasico-faulblastina' },
    injectable,
  ],
  clorambucila: chlorambucil,
  mitoxantrona: [
    { kind: 'injectable', label: '2 mg/mL · solução injetável', concentration: 2, unit: 'mg/mL', source: 'https://www.comprasnet.gov.br/livre/pregao/termoHom.asp?prgCod=1179038&tipo=t' },
    injectable,
  ],
};

export function getOncologyPresentations(drugId: string): readonly OncologyPresentation[] {
  if (drugId.startsWith('ciclofosfamida-metronomica-')) return cyclophosphamideOral;
  return ONCOLOGY_PRESENTATIONS[drugId.split('-')[0]] ?? [];
}

export function calculateOncologyVolumes(
  totals: number[],
  doseUnit: 'mg' | 'UI',
  presentation: OncologyPresentation | undefined,
  concentration: number,
  oralOnly: boolean,
): number[] {
  if (!presentation || presentation.kind === 'solid' || (oralOnly && presentation.kind === 'injectable')) return [];
  if (presentation.unit !== `${doseUnit}/mL` || !Number.isFinite(concentration) || concentration <= 0) return [];
  return totals.map((total) => total / concentration).filter(Number.isFinite);
}
