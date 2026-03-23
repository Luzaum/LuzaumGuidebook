export const roundClinicalVolume = (volume: number): number => {
  if (volume < 0.1) return Number(volume.toFixed(3));
  if (volume < 1) return Number(volume.toFixed(2));
  return Number(volume.toFixed(2));
};

export const roundClinicalConcentration = (conc: number): number => {
  return Number(conc.toFixed(2));
};

export const roundClinicalRate = (rate: number): number => {
  return Number(rate.toFixed(1));
};

export const formatNumber = (value: number, decimalPlaces: number = 2): string => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
};
