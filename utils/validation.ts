import { z } from 'zod';

// Schemas de validação para diferentes tipos de dados
export const weightSchema = z
  .number()
  .min(0.1, 'Peso deve ser maior que 0.1 kg')
  .max(200, 'Peso deve ser menor que 200 kg');

export const percentageSchema = z
  .number()
  .min(0, 'Porcentagem deve ser maior ou igual a 0')
  .max(100, 'Porcentagem deve ser menor ou igual a 100');

export const timeSchema = z
  .number()
  .min(1, 'Tempo deve ser maior que 0')
  .max(72, 'Tempo deve ser menor que 72 horas');

export const rateSchema = z
  .number()
  .min(1, 'Taxa deve ser maior que 0')
  .max(1000, 'Taxa deve ser menor que 1000 mL/h');

// Função para validar entrada numérica
export const validateNumericInput = (value: string, schema: z.ZodNumber): number | null => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return null;
  
  try {
    return schema.parse(numValue);
  } catch {
    return null;
  }
};

// Função para sanitizar strings
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove caracteres potencialmente perigosos
    .substring(0, 1000); // Limita o tamanho
};

// Função para validar URLs de imagens
export const validateImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && urlObj.hostname.includes('cloudinary.com');
  } catch {
    return false;
  }
};

// Função para calcular com segurança
export const safeCalculate = (operation: () => number, fallback: number = 0): number => {
  try {
    const result = operation();
    return isFinite(result) ? result : fallback;
  } catch {
    return fallback;
  }
};

// Função para formatar números
export const formatNumber = (num: number, decimals: number = 2): string => {
  return safeCalculate(() => Number(num.toFixed(decimals))).toString();
};

// Função para validar dados de paciente
export const patientDataSchema = z.object({
  species: z.enum(['dog', 'cat']),
  weight: weightSchema,
  age: z.number().min(0).max(30),
  condition: z.string().max(100),
});

export type PatientData = z.infer<typeof patientDataSchema>;

// Função para validar dados de fluidoterapia
export const fluidTherapySchema = z.object({
  weight: weightSchema,
  dehydration: percentageSchema,
  maintenanceRate: rateSchema,
  rehydrationTime: timeSchema,
  losses: z.number().min(0).max(1000),
});

export type FluidTherapyData = z.infer<typeof fluidTherapySchema>;