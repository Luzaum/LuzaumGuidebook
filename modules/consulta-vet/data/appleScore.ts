export type AppleSpecies = 'dog' | 'cat';
export type AppleVersion = 'fast' | 'full';
export type AppleSelections = Record<string, number>;
export type AppleRange = { label: string; points: number };
export type AppleVariable = {
  id: string;
  name: string;
  unit: string;
  ranges: AppleRange[];
  alternateUnits?: { unit: string; labels: string[] }[];
};
export type AppleModel = {
  id: string;
  species: AppleSpecies;
  version: AppleVersion;
  max: number;
  slope: number;
  intercept: number;
  source: string;
  variables: AppleVariable[];
};

export const APPLE_SOURCES = {
  dog: 'https://doi.org/10.1111/j.1939-1676.2010.0552.x',
  cat: 'https://doi.org/10.1111/j.1939-1676.2010.0648.x',
};

const variable = (id: string, name: string, unit: string, labels: string[], points: number[]): AppleVariable => ({
  id, name, unit, ranges: labels.map((label, index) => ({ label, points: points[index] })),
});
const mentation = (points: number[]) => variable('mentation', 'Mentação', 'grau', ['0', '1', '2', '3', '4'], points);
const fluid = (points: number[]) => variable('fluid', 'Líquido livre', 'grau', ['0', '1', '2'], points);
const albumin = (points: number[]) => variable('albumin', 'Albumina', 'g/dL', ['<2,6', '2,6–3,0', '3,1–3,2', '3,3–3,5', '>3,5'], points);
const pressure = (points: number[]) => variable('pressure', 'PAM', 'mmHg', ['<61', '61–100', '101–140', '>140'], points);
const felineLactate = (points: number[]) => variable('lactate', 'Lactato', 'mmol/L', ['0–1,9', '2,0–4,0', '4,1–7,0', '>7,0'], points);

// The zero-point cell anchors every row, as in Figures 3/4. Never sort by points:
// these multivariable models intentionally contain non-monotonic weights.
// Canine full lactate keeps the exact US figure boundaries, avoiding approximate
// conversions at 7.9 mmol/L. Feline full defaults to SI urea, matching Figure 3.
export const APPLE_MODELS: Record<`${AppleSpecies}-${AppleVersion}`, AppleModel> = {
  'dog-fast': {
    id: 'dog-fast', species: 'dog', version: 'fast', max: 50, slope: 0.249, intercept: -7.020, source: APPLE_SOURCES.dog,
    variables: [
      variable('glucose', 'Glicemia', 'mg/dL', ['<84', '84–102', '103–164', '165–273', '>273'], [7, 8, 9, 10, 0]),
      albumin([8, 7, 6, 0, 2]),
      variable('lactate', 'Lactato', 'mmol/L', ['<2', '2–8', '>8–10', '>10'], [0, 4, 8, 12]),
      variable('platelets', 'Plaquetas', 'mil/µL', ['<151', '151–200', '201–260', '261–420', '>420'], [5, 6, 3, 0, 1]),
      mentation([0, 4, 6, 7, 14]),
    ],
  },
  'dog-full': {
    id: 'dog-full', species: 'dog', version: 'full', max: 80, slope: 0.237, intercept: -8.294, source: APPLE_SOURCES.dog,
    variables: [
      variable('creatinine', 'Creatinina', 'mg/dL', ['0–0,62', '0,63–1,35', '1,36–2,26', '>2,26'], [0, 1, 8, 9]),
      variable('wbc', 'Leucócitos', 'mil/µL', ['<5,1', '5,1–8,5', '8,6–18', '>18'], [9, 0, 2, 3]),
      albumin([6, 7, 9, 0, 2]),
      variable('spo2', 'SpO₂', '%', ['<90', '90–94', '95–97', '98–100'], [10, 4, 1, 0]),
      variable('bilirubin', 'Bilirrubina total', 'mg/dL', ['0–0,23', '0,24–0,46', '0,47–0,93', '>0,93'], [0, 6, 4, 3]),
      mentation([0, 5, 7, 8, 13]),
      variable('respiration', 'Frequência respiratória', 'mpm', ['<25', '25–36', '37–48', '49–60', '>60'], [0, 3, 5, 6, 5]),
      variable('age', 'Idade', 'anos completos', ['0–2', '3–5', '6–8', '>8'], [0, 6, 8, 7]),
      fluid([0, 4, 3]),
      variable('lactate', 'Lactato', 'mg/dL', ['<18,0', '18,0–71,2', '71,3–90,1', '>90,1'], [0, 2, 3, 6]),
    ],
  },
  'cat-fast': {
    id: 'cat-fast', species: 'cat', version: 'fast', max: 50, slope: 0.203, intercept: -6.142, source: APPLE_SOURCES.cat,
    variables: [
      mentation([0, 5, 6, 7, 10]),
      variable('temperature', 'Temperatura', '°C', ['<35,6', '35,6–36,0', '36,1–37,0', '37,1–38,5', '38,6–39,5', '>39,5'], [6, 5, 4, 3, 0, 1]),
      pressure([11, 7, 0, 1]),
      felineLactate([0, 6, 9, 10]),
      variable('pcv', 'Hematócrito', '%', ['<16', '16–25', '26–35', '36–45', '>45'], [0, 12, 10, 9, 13]),
    ],
  },
  'cat-full': {
    id: 'cat-full', species: 'cat', version: 'full', max: 80, slope: 0.213, intercept: -9.472, source: APPLE_SOURCES.cat,
    variables: [
      mentation([0, 4, 7, 8, 9]),
      variable('temperature', 'Temperatura', '°C', ['<36,1', '36,1–37,0', '37,1–38,5', '38,6–39,4', '>39,4'], [6, 4, 3, 0, 1]),
      pressure([9, 4, 0, 1]),
      felineLactate([0, 5, 6, 9]),
      variable('pcv', 'Hematócrito', '%', ['<11', '11–20', '21–30', '31–40', '41–45', '>45'], [0, 11, 16, 14, 13, 17]),
      {
        ...variable('urea', 'Ureia / BUN', 'ureia · mmol/L', ['<5,3', '5,3–7,6', '7,7–8,9', '9,0–11,6', '11,7–24,9', '>24,9'], [11, 7, 0, 12, 7, 6]),
        alternateUnits: [{ unit: 'BUN · mg/dL', labels: ['<14,9', '14,9–21,3', '21,4–24,9', '25,0–32,5', '32,6–69,8', '>69,8'] }],
      },
      variable('chloride', 'Cloreto', 'mmol/L', ['<111', '111–115', '116–118', '119–122', '123–125', '>125'], [12, 9, 11, 0, 11, 7]),
      fluid([0, 3, 6]),
    ],
  },
};

export function calculateApple(model: AppleModel, selections: AppleSelections) {
  const selected = model.variables.flatMap((item) => {
    const index = selections[item.id];
    return Number.isInteger(index) && item.ranges[index] ? [item.ranges[index]] : [];
  });
  const complete = selected.length === model.variables.length;
  const total = complete ? selected.reduce((sum, range) => sum + range.points, 0) : null;
  return { answered: selected.length, complete, total,
    risk: total === null ? null : 100 / (1 + Math.exp(-(model.slope * total + model.intercept))),
  };
}
