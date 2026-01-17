

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { COMMERCIAL_FOODS, generateAutomaticWarnings } from './data/foodsCommercial';
import type { CommercialFood } from './data/types/commercialFood';
import type { FoodItem, NutritionProfile, FoodUnit, CaloriesInfo } from './data/types/foodTypes';

// --- DATA ---
const factors = {
    dog: {
        'Paciente Crítico / Hospitalizado': { k: 1.0, desc: 'Meta inicial. Ajustar conforme tolerância.' },
        'Filhote (25% peso adulto)': { k: 3.0, desc: 'Início do crescimento.' },
        'Filhote (50% peso adulto)': { k: 2.5, desc: 'Meio do crescimento.' },
        'Filhote (75% peso adulto)': { k: 2.0, desc: 'Final do crescimento.' },
        'Adulto Castrado / Inativo': { k: 1.6, desc: 'Para prevenir ganho de peso.' },
        'Adulto Ativo / Não Castrado': { k: 1.8, desc: 'Atividade normal.' },
        'Perda de Peso (Sedentário/Obeso)': { k: 1.0, desc: 'Aplicado sobre o RER do PESO IDEAL.' },
        'Idoso': { k: 1.4, desc: 'Necessidade energética reduzida.' },
        'Gestação (1-5 semanas)': { k: 1.8, desc: 'Início da gestação.' },
        'Gestação (6-9 semanas)': { k: 2.0, desc: 'Final da gestação.' },
        'Lactação (Ninhada pequena 1-4)': { k: '2.0-4.0', desc: 'Ajustar conforme nº de filhotes.' },
        'Lactação (Ninhada grande 5-12)': { k: '4.0-8.0', desc: 'Ajustar conforme nº de filhotes.' },
    },
    cat: {
        'Paciente Crítico / Hospitalizado': { k: 1.0, desc: 'Meta inicial. Ajustar conforme tolerância.' },
        'Filhote (até 4 meses)': { k: 2.5, desc: 'Crescimento rápido.' },
        'Filhote (4-12 meses)': { k: 2.0, desc: 'Fase final de crescimento.' },
        'Adulto Castrado / Inativo': { k: 1.0, desc: 'Para prevenir ganho de peso.' },
        'Adulto Ativo / Não Castrado': { k: 1.2, desc: 'Atividade normal.' },
        'Perda de Peso (Sedentário/Obeso)': { k: 0.8, desc: 'Aplicado sobre o RER do PESO IDEAL.' },
        'Idoso (sem sobrepeso)': { k: '1.0-1.2', desc: 'Ajustar conforme condição corporal.' },
        'Gestação': { k: 2.0, desc: 'Aumento gradual ao longo da gestação.' },
        'Lactação (Ninhada pequena)': { k: '2.0-3.0', desc: 'Ajustar conforme o número de filhotes.' },
        'Lactação (Ninhada grande)': { k: '4.0-6.0', desc: 'Ajustar conforme o número de filhotes.' },
    }
};

// Helper function para normalizar unidades e obter calorias
function getCaloriesPerGramOrMl(food: FoodItem | CommercialFood): CaloriesInfo {
    if ('unit' in food && food.unit) {
        // Se já tem unit definido, usar diretamente
        if (food.unit === 'g' || food.unit === 'ml') {
            return { kcalPerUnit: food.calories, unit: food.unit };
        }
        // Normalizar outras unidades
        if (food.unit === 'L' || food.unit === 'l') {
            return { kcalPerUnit: food.calories, unit: 'ml' };
        }
        if (food.unit === 'kg') {
            return { kcalPerUnit: food.calories / 1000, unit: 'g' };
        }
        // Default: assumir gramas
        return { kcalPerUnit: food.calories, unit: 'g' };
    }
    // Fallback: assumir gramas
    return { kcalPerUnit: food.calories || 0, unit: 'g' };
}

// Função para determinar nutritionProfile baseado nas características do alimento
function determineNutritionProfile(food: Partial<FoodItem>): NutritionProfile {
    const name = food.name?.toLowerCase() || '';
    
    // Recovery completo
    if (name.includes('recovery') || name.includes('recuperação') || 
        name.includes('a/d') || name.includes('urgent care')) {
        if (name.includes('liquid') || name.includes('líquido')) {
            return 'SUPPORT_ENTERAL';
        }
        return 'VET_RECOVERY_COMPLETE';
    }
    
    // Enterais humanas
    if (name.includes('fresubin') || name.includes('complett peptide') || 
        name.includes('complett') && name.includes('líquido')) {
        return 'HUMAN_ENTERAL';
    }
    
    // Suplementos
    if (name.includes('churu') || name.includes('cat stix') || 
        name.includes('nutrapet') || name.includes('nutralife') && name.includes('pasta') ||
        name.includes('gourmet') && (name.includes('sachê') || name.includes('sache'))) {
        return 'SUPPLEMENT';
    }
    
    // Terapêuticos
    if (food.isTherapeutic) {
        return 'VET_THERAPEUTIC_COMPLETE';
    }
    
    // Default: completo
    return 'COMPLETE';
}

// Função para determinar se é completo e balanceado
function determineIsCompleteAndBalanced(profile: NutritionProfile): boolean {
    return profile === 'COMPLETE' || 
           profile === 'VET_THERAPEUTIC_COMPLETE' || 
           profile === 'VET_RECOVERY_COMPLETE' ||
           profile === 'SUPPORT_ENTERAL'; // Assumindo que enterais de suporte são completas
}

// Função para determinar se requer supervisão veterinária
function determineRequiresVetSupervision(profile: NutritionProfile, isTherapeutic: boolean): boolean {
    return profile === 'VET_THERAPEUTIC_COMPLETE' ||
           profile === 'VET_RECOVERY_COMPLETE' ||
           profile === 'SUPPORT_ENTERAL' ||
           profile === 'HUMAN_ENTERAL' ||
           isTherapeutic;
}

// Função para obter badge do nutritionProfile
function getNutritionProfileBadge(profile: NutritionProfile): { text: string; color: string } {
    switch (profile) {
        case 'COMPLETE':
            return { text: 'Completo', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' };
        case 'VET_THERAPEUTIC_COMPLETE':
            return { text: 'Terapêutico', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' };
        case 'VET_RECOVERY_COMPLETE':
            return { text: 'Recovery', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' };
        case 'SUPPORT_ENTERAL':
            return { text: 'Suporte enteral', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' };
        case 'SUPPLEMENT':
            return { text: 'Suplemento', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' };
        case 'HUMAN_ENTERAL':
            return { text: 'Enteral humana (cuidado)', color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' };
        default:
            return { text: 'Completo', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' };
    }
}

const predefinedFoods = [
    // --- Cães & Gatos ---
    { name: "Hill's a/d Urgent Care (Úmido)", species: ['dog', 'cat'], calories: 1.175, unit: 'g', protein: '8.5%', fat: '5.2%', indication: 'Convalescença, anorexia, pós-cirurgia, lesão; alta palatabilidade e densidade calórica para suporte intensivo.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], alerts: [ { type: 'green', text: 'Excelente para pacientes anoréxicos ou que necessitam de suporte calórico em pequenos volumes.' }, { type: 'red', text: 'Alto teor de gordura e proteína: <strong>contraindicado</strong> em pancreatite, hiperlipidemia, e DRC/encefalopatia hepática não compensadas.' } ] },
    { name: "Premier Nutrição Clínica Recuperação (Úmido)", species: ['dog', 'cat'], calories: 1.300, unit: 'g', protein: '11.0%', fat: '9.0%', indication: 'Suporte nutricional em recuperação, pós-cirúrgico.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], alerts: [ { type: 'green', text: 'Alto aporte calórico e proteico para recuperação rápida.' }, { type: 'red', text: 'Contraindicado em pancreatite, hiperlipidemia, e DRC/encefalopatia hepática não compensadas devido ao alto teor de gordura e proteína.' } ] },
    { name: "Royal Canin Recovery (Úmido)", species: ['dog', 'cat'], calories: 1.100, unit: 'g', protein: '12.7%', fat: '6.4%', indication: 'Convalescença, anorexia, pós-cirurgia, cuidados intensivos.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], nutritionProfile: 'VET_RECOVERY_COMPLETE', isCompleteAndBalanced: true, requiresVetSupervision: true, alerts: [ { type: 'green', text: 'Textura mousse ideal para alimentação por sonda e pacientes com dificuldade de apreensão do alimento.' }, { type: 'red', text: 'Contraindicado em encefalopatia hepática, pancreatite e hiperlipidemia agudas devido ao alto teor de gordura.' } ] },
    { name: "FN Vet Care Recuperação (lata)", species: ['dog', 'cat'], calories: 1.180, unit: 'g', protein: '11.5%', fat: '7.5%', indication: 'Recuperação de cães e gatos debilitados, anorexia ou convalescença.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], alerts: [ { type: 'yellow', text: 'Teor de gordura moderado, usar com cautela em pacientes com histórico de pancreatite.' } ] },
    { name: "Nutralife Intensiv (pó)", species: ['dog', 'cat'], calories: 4.000, unit: 'g', protein: '29%', fat: '46%', indication: 'Recuperação, anorexia, crescimento, atletas.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], alerts: [ { type: 'red', text: 'Gordura extremamente elevada (46%). <strong>Contraindicado</strong> em pancreatite, hiperlipidemia, encefalopatia hepática e DRC descompensada.' } ], dilution: {scoop_g: 16, water_ml: 30} },
    { name: "Nutralife (pasta)", species: ['dog', 'cat'], calories: 4.500, unit: 'g', protein: '15.3%', fat: '38%', indication: 'Recuperação, anorexia (pasta palatável).', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], alerts: [ { type: 'green', text: 'Muito palatável, fácil de administrar como suplemento para estimular o apetite.' }, { type: 'red', text: 'Alto teor de gordura (38%). <strong>Contraindicado</strong> em pancreatite, hiperlipidemia, e DRC.' } ] },
    { name: "Nutrapet (pasta)", species: ['dog', 'cat'], calories: 4.500, unit: 'g', protein: '2%', fat: '40%', indication: 'Suplemento energético rápido.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], alerts: [ { type: 'yellow', text: 'Teor proteico insignificante. Não supre necessidades proteicas para recuperação de massa magra.' }, { type: 'red', text: 'Extremamente rico em gordura (40%). <strong>Contraindicado</strong> em pancreatite e hiperlipidemia.' } ] },
    { name: "Petmilk (pó)", species: ['dog', 'cat'], calories: 4.800, unit: 'g', protein: '35%', fat: '36.8%', indication: 'Substituto do leite materno para cães e gatos neonatos.', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], alerts: [ { type: 'green', text: 'Formulado para ser um substituto completo do leite materno.' }, { type: 'yellow', text: 'A diluição incorreta é a principal causa de diarreia ou constipação em filhotes. Siga as instruções rigorosamente.' } ], dilution: {scoop_g: 8, water_ml: 40} },
    { name: "Support First Milk (pó)", species: ['dog', 'cat'], calories: 4.800, unit: 'g', protein: '41%', fat: '20%', indication: 'Substituto do leite materno.', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], alerts: [ { type: 'yellow', text: 'A informação sobre a densidade calórica é inconsistente, usar com cautela. Diluição incorreta pode causar distúrbios gastrointestinais.' } ], dilution: {scoop_g: 10, water_ml: 50} },
    { name: "Orga Milk (pó)", species: ['dog', 'cat'], calories: 4.800, unit: 'g', protein: '32%', fat: '35%', indication: 'Substituto do leite materno.', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], alerts: [ { type: 'yellow', text: 'Risco de distúrbios gastrointestinais com preparo inadequado.' } ], dilution: {scoop_g: 8, water_ml: 40} },
    
    // --- Cães ---
    { name: "Royal Canin Mini Adult", species: ['dog'], calories: 3.744, unit: 'g', protein: '25.0%', fat: '14.0%', indication: 'Cães pequenos (10 meses a 8 anos, 4-10 kg)', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Royal Canin Maxi Adult", species: ['dog'], calories: 3.970, unit: 'g', protein: '26.0%', fat: '17.0%', indication: 'Cães grandes (15 meses a 5 anos, 26-44 kg)', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Premier Pet Nutrição Clínica Obesidade Cães Pequeno Porte", species: ['dog'], calories: 2.979, unit: 'g', protein: '35.5%', fat: '8.0%', indication: 'Cães com obesidade, pequeno porte', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'], alerts: [ { type: 'green', text: 'Ideal para perda de peso: baixa caloria com alta proteína para manter a massa magra e promover saciedade.' } ] },
    { name: "Premier Pet Ambientes Internos Cães Adultos Castrados", species: ['dog'], calories: 3.601, unit: 'g', protein: '31.5%', fat: '11.5%', indication: 'Cães castrados, raças pequenas', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Premier Pet Golden Fórmula Cães Adultos Frango e Arroz", species: ['dog'], calories: 3.797, unit: 'g', protein: '23.0%', fat: '12.0%', indication: 'Cães adultos', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Hill's Science Diet Cães Adultos Raças Pequenas e Mini Frango", species: ['dog'], calories: 3.720, unit: 'g', protein: '21.0 - 24.5%', fat: '13.0%', indication: 'Cães adultos, raças pequenas e mini', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Hill's Science Diet Cães Filhotes Raças Pequenas e Mini Frango", species: ['dog'], calories: 3.775, unit: 'g', protein: '25.0 - 30.0%', fat: '16.0 - 20.6%', indication: 'Filhotes, raças pequenas e mini', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Purina Pro Plan Cães Adultos Mini e Pequeno Porte Optihealth", species: ['dog'], calories: 4.050, unit: 'g', protein: '29.0%', fat: '17.0%', indication: 'Cães adultos, mini e pequeno porte', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Purina Pro Plan Cães Adultos Médio Porte Optihealth", species: ['dog'], calories: 3.980, unit: 'g', protein: '26.0%', fat: '15.0%', indication: 'Cães adultos, médio porte', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Purina Pro Plan Cães Adultos Grande e Gigante Porte Optihealth", species: ['dog'], calories: 3.800, unit: 'g', protein: '26.0%', fat: '12.0%', indication: 'Cães adultos, grande e gigante porte', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Purina Pro Plan Cães Filhotes Mini e Pequeno Porte Optistart", species: ['dog'], calories: 4.240, unit: 'g', protein: '32.0%', fat: '20.0%', indication: 'Filhotes, mini e pequeno porte', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Purina Pro Plan Cães Filhotes Grande e Gigante Porte Optistart", species: ['dog'], calories: 4.000, unit: 'g', protein: '28.0%', fat: '17.0%', indication: 'Filhotes, grande e gigante porte', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Biofresh Cão Adulto Light", species: ['dog'], calories: 3.16, unit: 'g', protein: '28%', fat: '4.8%-8.5%', indication: 'Controle de peso para cães de raças pequenas.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Complett Peptide 1.5 (Líquido)", species: ['dog'], calories: 1.500, unit: 'L', protein: '6.0%', fat: '6.0%', indication: 'Suporte hipercalórico enteral em pacientes críticos (uso com cautela em gatos).', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Equilíbrio Veterinary Hypoallergenic (Seco, Cães)", species: ['dog'], calories: 4.072, unit: 'g', protein: '21.0%', fat: '18.0%', indication: 'Alergias/intolerâncias alimentares com manifestações dermatológicas/digestivas.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'], alerts: [ { type: 'red', text: '<strong>Contraindicado</strong> para pacientes com insuficiência renal e hepática.' }, { type: 'green', text: 'Proteína de soja hidrolisada é uma boa opção para dieta de eliminação.' } ] },
    { name: "Farmina Vet Life Gastrointestinal (Cães)", species: ['dog'], calories: 3.507, unit: 'g', protein: 'N/A', fat: 'N/A', indication: 'Manejo de distúrbios gastrointestinais.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    { name: "Farmina Vet Life Hypoallergenic Egg & Rice (Seco, Cães)", species: ['dog'], calories: 3.891, unit: 'g', protein: '15.5%', fat: '13.0%', indication: 'Manutenção nutricional, redução de intolerância alimentar.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'] },
    { name: "Farmina Vet Life Hypoallergenic Fish & Potato (Seco, Cães)", species: ['dog'], calories: 3.562, unit: 'g', protein: '15.5%', fat: '13.0%', indication: 'Redução de intolerância alimentar, suporte à função da pele, alergias alimentares.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'] },
    { name: "Farmina Vet Life Obesity & Diabetic (Cães)", species: ['dog'], calories: 3.507, unit: 'g', protein: 'N/A', fat: 'N/A', indication: 'Manejo da obesidade e diabetes.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'] },
    { name: "Farmina Vet Life Recoup (Úmido, Cães)", species: ['dog'], calories: 1.111, unit: 'g', protein: '11.6%', fat: '5.7%', indication: 'Recuperação nutricional.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    { name: "Farmina Vet Life UltraHypo (Seco, Cães)", species: ['dog'], calories: 3.840, unit: 'g', protein: '18.0%', fat: '15.0%', indication: 'Alergias/intolerâncias, dieta de eliminação, dermatite atópica refratária.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'], alerts: [ { type: 'red', text: '<strong>Contraindicado</strong> para filhotes, gestantes/lactantes.' } ] },
    { name: "FN Vet Care Hipoalergênica (Médio/Grande, Cães)", species: ['dog'], calories: 3.610, unit: 'g', protein: '21.0%', fat: '13.0%', indication: 'Reações adversas a alimentos (hipersensibilidade/intolerância), diarreias crônicas.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY', 'GI'] },
    { name: "FN Vet Care Hipoalergênica (Mini/Pequeno, Cães)", species: ['dog'], calories: 3.610, unit: 'g', protein: '23.0%', fat: '14.0%', indication: 'Reações adversas a alimentos (hipersensibilidade/intolerância), diarreias crônicas.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY', 'GI'] },
    { name: "Formula Natural Vet Care Gastrointestinal Cães", species: ['dog'], calories: 3.8, unit: 'g', protein: '25%', fat: '15.5%', indication: 'Suporte à saúde digestiva.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], alerts: [ { type: 'green', text: 'Alta digestibilidade, ideal para quadros de gastroenterites agudas ou crônicas.' } ] },
    { name: "Formula Natural Vet Care Obesidade Cães", species: ['dog'], calories: 3.0, unit: 'g', protein: '30%', fat: '8.5%', indication: 'Manejo da obesidade em cães.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'] },
    { name: "Formula Natural Vet Care Osteoartrite Cães", species: ['dog'], calories: 3.5, unit: 'g', protein: '25%', fat: '11%', indication: 'Suporte à saúde articular.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['JOINT'], alerts: [ { type: 'green', text: 'Contém condroprotetores (glucosamina e condroitina) e EPA/DHA para auxiliar no manejo da osteoartrite.' } ] },
    { name: "Formula Natural Vet Care Renal Cães", species: ['dog'], calories: 4.0, unit: 'g', protein: '14%', fat: '17%', indication: 'Suporte à função renal.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'], alerts: [ { type: 'green', text: 'Fósforo e proteína controlados para auxiliar no manejo da Doença Renal Crônica (DRC).' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes em crescimento, fêmeas gestantes/lactantes.' } ] },
    { name: "Fresubin Original", species: ['dog'], calories: 1.000, unit: 'ml', protein: '4.0%', fat: '3.8%', indication: 'Nutrição enteral quando dietas veterinárias não estão disponíveis.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], nutritionProfile: 'HUMAN_ENTERAL', isCompleteAndBalanced: false, requiresVetSupervision: true, speciesSafetyNotes: { cat: ['Evitar uso exclusivo/prolongado (taurina/perfil mineral).'] } },
    { name: "Hill's d/d Pato & Arroz (Seco, Cães)", species: ['dog'], calories: 3.713, unit: 'g', protein: '15.1%', fat: '14.3%', indication: 'Sensibilidades alimentares, dermatites pruriginosas, gastroenterite crônica, DII.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY', 'GI'] },
    { name: "Hill's i/d (Seco, Cães)", species: ['dog'], calories: 3.598, unit: 'g', protein: '26.2%', fat: '13.6%', indication: 'Manejo de distúrbios gastrointestinais.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], alerts: [ { type: 'green', text: 'Altamente digestível e com prebióticos (tecnologia ActivBiome+), excelente para a maioria das diarreias agudas.' } ] },
    { name: "Hill's i/d (Úmido, Cães)", species: ['dog'], calories: 1.017, unit: 'g', protein: '4.0%', fat: '1.5%', indication: 'Distúrbios gastrointestinais.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], alerts: [ { type: 'green', text: 'Baixo teor de gordura, ideal para condições que exigem restrição de gordura, como recuperação de pancreatite.' } ] },
    { name: "Hill's i/d Low Fat (Seco, Cães)", species: ['dog'], calories: 3.311, unit: 'g', protein: '24%', fat: '6.9%', indication: 'Manejo de distúrbios gastrointestinais sensíveis à gordura.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], alerts: [ { type: 'green', text: 'Teor de gordura muito baixo, excelente opção para pancreatite, linfangiectasia e hiperlipidemia.' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes, gestantes/lactantes.' } ] },
    { name: "Hill's j/d (Úmido, Cães)", species: ['dog'], calories: 1.351, unit: 'g', protein: '17.0%', fat: '11.0%', indication: 'Suporte ao metabolismo das articulações (osteoartrite).', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['JOINT'] },
    { name: "Hill's j/d Joint Care (Seco, Cães)", species: ['dog'], calories: 3.618, unit: 'g', protein: '17.6%', fat: '14.5%', indication: 'Suporte à saúde articular.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['JOINT'], alerts: [ { type: 'green', text: 'Clinicamente comprovado para melhorar a mobilidade. Enriquecido com EPA, glucosamina e condroitina.' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes em crescimento, cadelas gestantes/lactantes.' } ] },
    { name: "Hill's k/d (Seco, Cães)", species: ['dog'], calories: 4.021, unit: 'g', protein: '13.9%', fat: '20.5%', indication: 'Suporte à função renal crônica.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'], alerts: [ { type: 'green', text: 'Padrão-ouro para o manejo da Doença Renal Crônica (DRC), ajudando a retardar a progressão.' }, { type: 'red', text: 'Restrição proteica severa: <strong>contraindicado</strong> para filhotes em crescimento, fêmeas gestantes/lactantes ou em condições que exijam alto aporte proteico.' }, { type: 'yellow', text: 'A palatabilidade pode ser um desafio em pacientes renais anoréxicos. Considere opções úmidas ou palatabilizantes.' } ] },
    { name: "Hill's l/d Hepatic Care (Seco, Cães)", species: ['dog'], calories: 4.040, unit: 'g', protein: '18.1%', fat: '23.6%', indication: 'Suporte à função hepática (doenças hepáticas crônicas/insuficiência hepática; conforme prescrição veterinária).', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['HEPATIC'], alerts: [ { type: 'green', text: 'Proteína e cobre controlados, ideal para a maioria das doenças hepáticas, incluindo shunts portossistêmicos.' }, { type: 'red', text: 'Alto teor de gordura: <strong>contraindicado</strong> para pacientes com hiperlipidemia, pancreatite ou risco de pancreatite.' } ] },
    { name: "Hill's Science Diet Cães Adultos Raças Grandes Frango", species: ['dog'], calories: 0, unit: 'g', protein: '21.0 - 24.5%', fat: '13.0 - 16.3%', indication: 'Cães adultos, raças grandes', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Hill's u/d (Úmido, Cães)", species: ['dog'], calories: 1.377, unit: 'g', protein: '4.1%', fat: '7.9%', indication: 'Dissolução de urólitos de urato e cistina.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['URINARY'] },
    { name: "Hill's u/d Urinary Care (Seco, Cães)", species: ['dog'], calories: 3.98, unit: 'g', protein: '10.2%', fat: '18.8%', indication: 'Prevenção de cálculos de urato e cistina.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['URINARY'], alerts: [ { type: 'green', text: 'Dieta de eleição para prevenção de cálculos de urato e cistina, comum em Dálmatas e Bulldogs.' }, { type: 'red', text: 'Proteína e purinas muito baixas. <strong>Não é uma dieta de manutenção geral</strong>. Risco de deficiência proteica se usada incorretamente.' } ] },
    { name: "Hill's z/d Food Sensitive (Seco, Cães)", species: ['dog'], calories: 3.534, unit: 'g', protein: '17.6%', fat: '14.4%', indication: 'Manejo de sensibilidades alimentares com proteína hidrolisada.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'], alerts: [ { type: 'green', text: 'Proteína altamente hidrolisada (ActivBiome+), excelente para dieta de eliminação e manejo de alergias alimentares severas.' } ] },
    { name: "Premier Gourmet Cães Carne (Sachê)", species: ['dog'], calories: 0.690, unit: 'sache', protein: '9.5%', fat: '0.7%', indication: 'Complemento alimentar, hidratação.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Premier Gourmet Cães Salmão (Sachê)", species: ['dog'], calories: 0.603, unit: 'sache', protein: '8.5%', fat: '0.6%', indication: 'Complemento alimentar, hidratação.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Premier Nutrição Clínica Hipoalergênico (Cães)", species: ['dog'], calories: 3.86, unit: 'g', protein: '22%', fat: '16%', indication: 'Manejo de sensibilidades alimentares.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'] },
    { name: "Premier Nutrição Clínica Obesidade (Cães)", species: ['dog'], calories: 3.0, unit: 'g', protein: '30%', fat: '8.5%', indication: 'Manejo da obesidade canina.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'] },
    { name: "Pro Plan HA Hydrolyzed (Seco, Cães)", species: ['dog'], calories: 3.750, unit: 'g', protein: '19.0%', fat: '11.0%', indication: 'Testes de eliminação, gastroenterite/dermatite alérgica, DII, pancreatite.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY', 'GI'] },
    { name: "Pro Plan HA Vegetarian (Seco, Cães)", species: ['dog'], calories: 3.695, unit: 'g', protein: '18.0%', fat: '8.0%', indication: 'Opção vegetariana para dieta de eliminação, DII, dermatite alérgica.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY', 'GI'] },
    { name: "Purina Pro Plan Reduced Calorie Cães Adultos", species: ['dog'], calories: 0, unit: 'g', protein: '26.0%', fat: '4.0 - 8.0%', indication: 'Cães adultos com sobrepeso', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Royal Canin Anallergenic (Seco, Cães)", species: ['dog'], calories: 3.741, unit: 'g', protein: '18.0%', fat: '16.5%', indication: 'Alergias alimentares severas (dermatológicas/gastrointestinais), DII, Dermatite Atópica Canina associada à AFR, testes de eliminação.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'], alerts: [ { type: 'green', text: 'Proteína de pena extensivamente hidrolisada. Padrão-ouro para os casos mais severos de alergia alimentar.' }, { type: 'red', text: '<strong>Contraindicado</strong> em casos de pancreatite, crescimento, gestação/lactação.' } ] },
    { name: "Royal Canin GI High Energy (Seco, Cães)", species: ['dog'], calories: 3.902, unit: 'g', protein: '23.0%', fat: '18.0%', indication: 'Distúrbios gastrointestinais, baixo peso.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], alerts: [ { type: 'yellow', text: 'Alta energia e gordura. Não indicada para condições que exigem restrição de gordura como pancreatite.' } ] },
    { name: "Royal Canin GI Low Fat (Úmido, Cães)", species: ['dog'], calories: 0.895, unit: 'g', protein: '8.1%', fat: '1.7%', indication: 'Condições que requerem restrição de gordura (pancreatite).', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    { name: "Royal Canin Hypoallergenic (Cães)", species: ['dog'], calories: 3.902, unit: 'g', protein: '21%', fat: '19%', indication: 'Manejo de reações adversas a alimentos.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'] },
    { name: "Royal Canin Medium Adult", species: ['dog'], calories: 0, unit: 'g', protein: '25.0%', fat: '14.0%', indication: 'Cães médios (acima de 12 meses, 11-25 kg)', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Royal Canin Mini Puppy", species: ['dog'], calories: 0, unit: 'g', protein: '31.0%', fat: '20.0%', indication: 'Filhotes de cães pequenos (2-10 meses, até 10 kg)', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Royal Canin Renal Support A (Seco, Cães)", species: ['dog'], calories: 3.868, unit: 'g', protein: '12.0%', fat: '16.0%', indication: 'Suporte à função renal crônica.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'] },
    { name: "Royal Canin Renal Support F (Cães)", species: ['dog'], calories: 3.779, unit: 'g', protein: '11.5%-15.5%', fat: '14%', indication: 'Suporte à função renal.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'] },
    { name: "Royal Canin Satiety Support (Cães)", species: ['dog'], calories: 2.956, unit: 'g', protein: '28%', fat: '7.5%-11.5%', indication: 'Controle de peso e saciedade.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'], alerts: [ { type: 'green', text: 'Alto teor de fibras promove grande saciedade, sendo muito eficaz para perda de peso.' }, { type: 'yellow', text: 'O alto teor de fibra pode causar constipação ou flatulência em alguns animais. A transição deve ser lenta.' } ] },
    { name: "Specific CDD-HY Food Allergen Management (Seco, Cães)", species: ['dog'], calories: 3.710, unit: 'g', protein: '22.8%', fat: '11.8%', indication: 'Intolerâncias/alergias alimentares, má absorção intestinal, IPE, dieta de exclusão.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY', 'GI'] },
    { name: "Support AIG Cães (pó)", species: ['dog'], calories: 4.96, unit: 'g', protein: 'N/I', fat: 'N/I', indication: 'Anorexia, convalescença, pós-operatório.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], alerts: [ { type: 'yellow', text: 'Falta de transparência nos dados de Proteína Bruta (PB) e Extrato Etéreo (EE). Usar com cautela.' } ], dilution: {scoop_g: 11, water_ml: 20} },
    { name: "Virbac HPM Hypoallergy A2 (Seco, Cães)", species: ['dog'], calories: 3.770, unit: 'g', protein: '24.0%', fat: '18.0%', indication: 'Alergias/intolerâncias, distúrbios digestivos/cutâneos, dieta de eliminação.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY', 'GI'] },

    // --- Gatos ---
    { name: 'Royal Canin Indoor Adult', species: ['cat'], calories: 3.534, unit: 'g', protein: '27.0%', fat: '11.0 - 15.0%', indication: 'Gatos adultos de ambiente interno (1-7 anos)', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Royal Canin Kitten', species: ['cat'], calories: 3.823, unit: 'g', protein: '34.0%', fat: '16.0%', indication: 'Filhotes (4 meses a 1 ano)', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Royal Canin Sterilised 37', species: ['cat'], calories: 3.815, unit: 'g', protein: '35.0 - 37.0%', fat: '10.0 - 12.0%', indication: 'Gatos castrados (1-7 anos)', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Premier Pet Gato Adulto Light', species: ['cat'], calories: 3.813, unit: 'g', protein: '41.0%', fat: '9.0%', indication: 'Gatos adultos com sobrepeso', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Premier Pet Gatos Castrados 6 meses a 6 anos – Salmão', species: ['cat'], calories: 3.856, unit: 'g', protein: '38.0%', fat: '12.0%', indication: 'Gatos castrados (6 meses a 6 anos)', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Premier Pet Golden Gatos Adultos Castrados Frango e Carne', species: ['cat'], calories: 3.750, unit: 'g', protein: '33.5%', fat: '9.5%', indication: 'Gatos castrados', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Premier Pet Golden Gatos Adultos Frango', species: ['cat'], calories: 3.912, unit: 'g', protein: '36.0%', fat: 'N/A', indication: 'Gatos adultos', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Hill\'s Science Diet Gatos Adulto Optimal Care Frango', species: ['cat'], calories: 4.025, unit: 'g', protein: '33.4 - 34.4%', fat: '21.4 - 22.2%', indication: 'Gatos adultos', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Hill\'s Science Diet Gatos Filhotes Healthy Development Frango', species: ['cat'], calories: 4.076, unit: 'g', protein: '33.0 - 38.4%', fat: '19.0 - 25.4%', indication: 'Filhotes', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Whiskas Gatos Adulto Carne Seca', species: ['cat'], calories: 3.730, unit: 'g', protein: '30.0%', fat: '9.0%', indication: 'Gatos adultos', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Whiskas Gatos Adulto Peixe Seca', species: ['cat'], calories: 3.730, unit: 'g', protein: '30.0%', fat: '9.0%', indication: 'Gatos adultos', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Purina Pro Plan Gatos Adulto Optiprebio Frango (Úmida)', species: ['cat'], calories: 0.950, unit: 'g', protein: '11.5%', fat: '3.0%', indication: 'Gatos adultos (úmida)', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Biofresh Gatos Castrados", species: ['cat'], calories: 3.81, unit: 'g', protein: '46%', fat: '12%', indication: 'Manutenção de peso para gatos castrados.', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Biofresh Gatos Filhotes", species: ['cat'], calories: 4.32, unit: 'g', protein: '44.0%', fat: '22.0%', indication: 'Crescimento e desenvolvimento saudável de filhotes.', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Fancy Feast Latas (Classic Patê)", species: ['cat'], calories: 1.08, unit: 'lata', protein: '11.0%', fat: '2.0%', indication: 'Alimento completo e balanceado, alta palatabilidade.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Farmina N&D Prime (Frango e Romã)", species: ['cat'], calories: 3.569, unit: 'g', protein: '46.0%', fat: '11.0%', indication: 'Nutrição geral de alta qualidade.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Farmina Vet Life Gastrointestinal (Úmido, Gatos)", species: ['cat'], calories: 1.222, unit: 'g', protein: '9.4%', fat: '5.7%', indication: 'Manejo de distúrbios gastrointestinais.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    { name: "Farmina Vet Life Obesity (Úmido, Gatos)", species: ['cat'], calories: 0.882, unit: 'g', protein: '12%', fat: '2.4%', indication: 'Perda de peso.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'] },
    { name: "Finotrato Cat Stix (média)", species: ['cat'], calories: 0.56, unit: 'g', protein: '5.8%', fat: '1.0%', indication: 'Complemento alimentar, alta palatabilidade.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Formula Natural Vet Care Renal Gatos", species: ['cat'], calories: 4.1, unit: 'g', protein: '24%', fat: '18%', indication: 'Suporte à função renal.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'], alerts: [ { type: 'green', text: 'Fósforo e proteína controlados para auxiliar no manejo da Doença Renal Crônica (DRC).' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes, gestantes, lactantes e pacientes com depleção proteica.' } ] },
    { name: 'GranPlus Choice Gatos Adultos (Frango e Carne)', species: ['cat'], calories: 3.75, unit: 'g', protein: '36.0%', fat: '9.0%', indication: 'Equilíbrio nutricional, saúde urinária e intestinal.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Guabi Natural Adulto Frango (Seco, Gatos)", species: ['cat'], calories: 4.150, unit: 'g', protein: '36.0%', fat: '17.0%', indication: 'Nutrição geral de alta qualidade, saúde intestinal e urinária.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Guabi Natural Sachê Carne (Úmido, Gatos)", species: ['cat'], calories: 0.094, unit: 'sache', protein: '4.0%', fat: '0.5%', indication: 'Hidratação, palatabilidade, complemento alimentar.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Hill's Gastrointestinal Biome Stress (Seco, Gatos)", species: ['cat'], calories: 3.807, unit: 'g', protein: '37.3%', fat: '17.0%', indication: 'Distúrbios gastrointestinais responsivos à fibra (constipação, diarreia infecciosa/antibiótico-responsiva, megacólon responsivo à fibra) + suporte do microbioma (ActivBiome+) e modulação do estresse.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    { name: "Hill's i/d (Seco, Gatos)", species: ['cat'], calories: 4.031, unit: 'g', protein: '36.8%', fat: '19.9%', indication: 'Distúrbios gastrointestinais, má digestão.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'], alerts: [ { type: 'green', text: 'Altamente digestível, excelente para a maioria dos distúrbios gastrointestinais agudos ou crônicos.' } ] },
    { name: "Hill's j/d (Seco, Gatos)", species: ['cat'], calories: 4.024, unit: 'g', protein: '32.0%', fat: '20.0%', indication: 'Suporte ao metabolismo das articulações (osteoartrite).', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['JOINT'] },
    { name: "Hill's k/d (Seco, Gatos)", species: ['cat'], calories: 3.811, unit: 'g', protein: '21.0%', fat: '15.0%', indication: 'Suporte à função renal crônica.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'] },
    { name: "Hill's k/d (Úmido, Gatos)", species: ['cat'], calories: 1.165, unit: 'g', protein: '7.8%', fat: '6%', indication: 'Suporte à função renal crônica.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'], alerts: [ { type: 'green', text: 'Auxilia na hidratação de pacientes renais e possui proteína e fósforo restritos para suportar a função renal.' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes, gestantes e lactantes.' } ] },
    { name: "Hill's Metabolic (Seco, Gatos)", species: ['cat'], calories: 3.455, unit: 'g', protein: '37.6%', fat: '13.0%', indication: 'Perda e manutenção de peso (obesidade/sobrepeso) com suporte de saciedade/metabolismo; indicado para gatos.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'], alerts: [ { type: 'green', text: 'Clinicamente comprovado para perda de peso segura, atuando no metabolismo individual do gato.' }, { type: 'yellow', text: 'A perda de peso em gatos deve ser lenta (0.5-1% do peso/semana) para evitar o risco de lipidose hepática.' } ] },
    { name: "Hiperkcal Nutricuper Cat (pó)", species: ['cat'], calories: 4.761, unit: 'g', protein: 'N/I', fat: 'N/I', indication: 'Suplemento hipercalórico para ganho de peso.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], alerts: [ { type: 'yellow', text: 'Faltam dados de PB e EE. Usar com cautela, especialmente em pacientes com comorbidades.' } ], dilution: {scoop_g: 10, water_ml: 20} },
    { name: 'Inaba Churu (média)', species: ['cat'], calories: 0.44, unit: 'g', protein: '8.5%', fat: '0.5%', indication: 'Hidratação, agrado, administração de medicamentos.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], nutritionProfile: 'SUPPLEMENT', isCompleteAndBalanced: false, requiresVetSupervision: false, speciesSafetyNotes: { cat: ['Não usar como dieta exclusiva.'] }, alerts: [ { type: 'yellow', text: 'Não é um alimento completo. Use apenas como petisco ou para melhorar a palatabilidade de outras rações.' } ] },
    { name: 'Optimum Sachê (Salmão/Frango)', species: ['cat'], calories: 0.874, unit: 'sache', protein: '8.5%', fat: '3.0%', indication: 'Nutrição completa, absorção de nutrientes, controle de peso.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Premier Gourmet Gatos Castrados (Sachê)", species: ['cat'], calories: 0.442, unit: 'sache', protein: '9.5%', fat: '0.2%', indication: 'Complemento alimentar, hidratação, saciedade.', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Premier Nutrição Clínica Renal (Seco, Gatos)", species: ['cat'], calories: 4.497, unit: 'g', protein: '24.0%', fat: '20.0%', indication: 'Auxílio no tratamento da doença renal crônica.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'] },
    { name: "Premier Nutrição Clínica Urinário (Seco, Gatos)", species: ['cat'], calories: 4.143, unit: 'g', protein: '25.0%', fat: '20.0%', indication: 'Auxílio na dissolução de cálculos de estruvita.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['URINARY'], alerts: [ { type: 'green', text: 'Formulado para controle de pH urinário e dissolução de cálculos de estruvita.' }, { type: 'red', text: '<strong>Contraindicado</strong> para gatos com DRC, histórico de cálculos de oxalato, filhotes, gestantes/lactantes.' } ] },
    { name: 'Purina Pro Plan Gatos Castrados Optirenal Salmão', species: ['cat'], calories: 0, unit: 'g', protein: '40.0%', fat: '12.0 - 15.0%', indication: 'Gatos castrados', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Purina Pro Plan Gatos Filhotes Optistart Frango', species: ['cat'], calories: 0, unit: 'g', protein: 'N/A', fat: 'N/A', indication: 'Filhotes', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    // --- Quatree (Linha Completa) ---
    // Cães - Supreme
    { name: "Quatree Supreme Adultos Raças Médias e Grandes", species: ['dog'], calories: 4.2, unit: 'g', protein: '26.0%', fat: '16.0%', indication: 'Cães adultos de raças médias e grandes; suporte nutricional completo para manutenção de peso, digestão eficiente e saúde articular.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Quatree Supreme Adultos Raças Pequenas", species: ['dog'], calories: 4.2, unit: 'g', protein: '25.0%', fat: '15.0%', indication: 'Cães adultos de raças pequenas; alimentação completa e balanceada.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Quatree Supreme Filhotes", species: ['dog'], calories: 4.3, unit: 'g', protein: '28.0%', fat: '18.0%', indication: 'Cães filhotes; suporte ao crescimento saudável do sistema músculo-esquelético e imunológico.', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Quatree Supreme Sênior +7", species: ['dog'], calories: 3.8, unit: 'g', protein: '24.0%', fat: '14.0%', indication: 'Cães idosos +7 anos; manutenção de peso, suporte articular e digestivo.', lifeStage: 'SENIOR', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Quatree Supreme Adultos Dermato", species: ['dog'], calories: 4.15, unit: 'g', protein: '24.0%', fat: '15.0%', indication: 'Cães com sensibilidade digestiva/cutânea; alimentação hipoalergênica livre dos principais alergênicos.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Quatree Supreme Adultos Light/Castrados", species: ['dog'], calories: 3.5, unit: 'g', protein: '22.0%', fat: '12.0%', indication: 'Cães adultos com tendência a sobrepeso ou castrados; controle calórico e saciedade prolongada.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: ['WEIGHT_LOSS'] },
    
    // Cães - Life
    { name: "Quatree Life Adultos Raças Médias e Grandes", species: ['dog'], calories: 3.95, unit: 'g', protein: '24.0%', fat: '14.0%', indication: 'Cães adultos; alimento Premium Especial natural com antioxidantes e complexo vegetal para bem-estar geral.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Quatree Life Adultos Raças Pequenas", species: ['dog'], calories: 3.95, unit: 'g', protein: '23.0%', fat: '13.0%', indication: 'Cães adultos de pequeno porte; alimento premium especial natural.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Quatree Life Filhotes", species: ['dog'], calories: 4.0, unit: 'g', protein: '26.0%', fat: '16.0%', indication: 'Cães filhotes; crescimento equilibrado com antioxidantes naturais e vegetais funcionais.', lifeStage: 'PUPPY', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    
    // Cães - Gourmet
    { name: "Quatree Gourmet Cães", species: ['dog'], calories: 3.6, unit: 'g', protein: '22.0%', fat: '12.0%', indication: 'Cães adultos e filhotes; nutrição completa diária com altas fontes de proteínas e gordura moderada.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    
    // Gatos - Life
    { name: "Quatree Life Gatos Adultos", species: ['cat'], calories: 3.9, unit: 'g', protein: '35.0%', fat: '18.0%', indication: 'Gatos adultos; premium especial natural com fibras que auxiliam no trato urinário, bolas de pelo e saciedade.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: 'Quatree Life Gatos Castrados', species: ['cat'], calories: 3.7, unit: 'g', protein: '33.0%', fat: '16.0%', indication: 'Gatos adultos castrados; controle de peso, trato urinário e saciedade.', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: ['WEIGHT_LOSS'] },
    
    // Gatos - Supreme
    { name: 'Quatree Supreme Gatos Castrados', species: ['cat'], calories: 3.82, unit: 'g', protein: '40%', fat: '12%', indication: 'Manutenção de peso para gatos castrados.', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: [] },
    
    // Gatos - Gourmet
    { name: "Quatree Gourmet Gatos", species: ['cat'], calories: 3.9, unit: 'g', protein: '32.0%', fat: '16.0%', indication: 'Gatos adultos e filhotes; alimento completo com proteínas de alta qualidade e ômegas para pele e pelagem.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Royal Canin Hypoallergenic (Gatos)", species: ['cat'], calories: 3.923, unit: 'g', protein: '25.5%', fat: '20%', indication: 'Manejo de reações adversas a alimentos.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'] },
    { name: 'Royal Canin Renal (Seca, Gatos)', species: ['cat'], calories: 3.953, unit: 'g', protein: '21.0%', fat: '15.0%', indication: 'Suporte à função renal crônica.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'] },
    { name: 'Royal Canin Renal (Úmida, Gatos)', species: ['cat'], calories: 1.277, unit: 'lata', protein: '6.0%', fat: '6.0%', indication: 'Suporte à função renal crônica.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'] },
    { name: "Royal Canin Satiety Support (Gatos)", species: ['cat'], calories: 2.956, unit: 'g', protein: '32%', fat: '8.6%-10%', indication: 'Controle de peso e saciedade.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'] },
    { name: 'Royal Canin Sterilised Loaf (Úmido, Gatos)', species: ['cat'], calories: 0.795, unit: 'g', protein: '9.0%', fat: '0.5%', indication: 'Manutenção do peso ideal e saúde urinária de gatos castrados.', lifeStage: 'ADULT', neuterStatus: 'NEUTERED', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Royal Canin Urinary SO (Gatos)", species: ['cat'], calories: 3.659, unit: 'g', protein: '32.5%', fat: '13%', indication: 'Saúde urinária, dissolução de estruvita.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['URINARY'], alerts: [ { type: 'green', text: 'Promove um ambiente urinário desfavorável à formação de cálculos de estruvita e oxalato de cálcio (Controle RSS).' }, { type: 'red', text: '<strong>Não utilizar</strong> em animais com doença renal crônica, insuficiência cardíaca, acidose metabólica ou durante crescimento, gestação e lactação.' } ] },
    { name: 'Whiskas Sachê Carne ao Molho (Úmida)', species: ['cat'], calories: 0, unit: 'sache', protein: '8.0%', fat: '3.0%', indication: 'Gatos adultos (úmida)', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [] },
    { name: "Support AIG Gatos (pó)", species: ['cat'], calories: 4.96, unit: 'g', protein: 'N/I', fat: 'N/I', indication: 'Anorexia, convalescença, pós-operatório.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: false, therapeuticIndications: [], alerts: [ { type: 'yellow', text: 'Falta de transparência nos dados de Proteína Bruta (PB) e Extrato Etéreo (EE). Usar com cautela.' } ], dilution: {scoop_g: 11, water_ml: 20} },
    
    // ======= ITENS NOVOS (FALTANTES) — CAES & GATOS =======
    
    // Recuperação / Convalescença
    { name: "Royal Canin Recovery Liquid", species: ['dog', 'cat'], calories: 1.000, unit: 'L', protein: '7.0%', fat: '5.0%', indication: 'Suporte nutricional completo para alimentação por sonda em UTI.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    { name: "Hill's Prescription Diet a/d (Úmido)", species: ['dog', 'cat'], calories: null, unit: 'g', protein: null, fat: null, indication: 'Convalescença, recuperação nutricional, anorexia, pós-cirurgia.', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    
    // Cães - Terapêuticas
    { name: "PremieR Nutrição Clínica Gastrointestinal (Cães)", species: ['dog'], calories: null, unit: 'g', protein: null, fat: null, indication: 'Distúrbios gastrointestinais (megaesôfago, gastrites, má digestão, enteropatias agudas/crônicas, IPE, má absorção, disbiose, colites).', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    { name: "Royal Canin Gastrointestinal Low Fat (Seco, Cães)", species: ['dog'], calories: 3.180, unit: 'g', protein: '22.0%', fat: '7.0%', indication: 'Distúrbios gastrointestinais que exigem restrição lipídica, como pancreatite, hiperlipidemia e má digestão.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    { name: "Royal Canin Urinary S/O (Seco, Cães)", species: ['dog'], calories: 3.900, unit: 'g', protein: '18.0%', fat: '15.0%', indication: 'Dissolução e prevenção de cálculos urinários de estruvita e oxalato de cálcio.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['URINARY'] },
    { name: "Hill's Prescription Diet c/d Multicare (Seco, Cães)", species: ['dog'], calories: 4.021, unit: 'g', protein: '16.9%', fat: '16.0%', indication: 'Suporte à saúde urinária, dissolução e prevenção de estruvita e oxalato de cálcio.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['URINARY'] },
    { name: "Hill's Metabolic (Seco, Cães)", species: ['dog'], calories: 3.124, unit: 'g', protein: '28.0%', fat: '11.7%', indication: 'Perda e manutenção de peso (obesidade/sobrepeso) com alta saciedade por fibras; indicado para cães adultos.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'] },
    { name: "Hill's Prescription Diet Derm Complete (Seco, Cães)", species: ['dog'], calories: 3.500, unit: 'g', protein: '18.0%', fat: '15.0%', indication: 'Manejo de alergias alimentares e ambientais com suporte à barreira cutânea.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY'] },
    { name: "Pro Plan Veterinary Diets HA Hydrolyzed (Seco, Cães)", species: ['dog'], calories: null, unit: 'g', protein: null, fat: null, indication: 'Hipoalergênica com proteína hidrolisada para alergias/intolerâncias alimentares; destinada a cães adultos.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['ALLERGY', 'GI'] },
    { name: "Royal Canin Renal (Úmido, Cães)", species: ['dog'], calories: null, unit: 'g', protein: null, fat: null, indication: 'Suporte à função renal em casos de insuficiência renal crônica; baixo fósforo e proteínas de alta qualidade (patê).', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['CKD'] },
    
    // Gatos - Terapêuticas
    { name: "Hill's c/d Multicare (Seco, Gatos)", species: ['cat'], calories: 3.844, unit: 'g', protein: '33.8%', fat: '16.1%', indication: 'Suporte urinário: auxílio à dissolução/recorrência de estruvita, manejo de DITUIF/cistite idiopática e inflamação urinária inferior; condições urinárias desfavoráveis à formação de estruvita e CaOx.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['URINARY'] },
    { name: "Hill's Prescription Diet Metabolic (Gatos)", species: ['cat'], calories: 3.150, unit: 'g', protein: '39.0%', fat: '10.0%', indication: 'Perda e manutenção de peso em gatos obesos.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['WEIGHT_LOSS'] },
    { name: "Royal Canin Gastrointestinal (Seco, Gatos)", species: ['cat'], calories: 4.000, unit: 'g', protein: '36.0%', fat: '15.0%', indication: 'Distúrbios gastrointestinais agudos e crônicos, má digestão.', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
    { name: "Royal Canin Gastrointestinal (Úmido, Gatos)", species: ['cat'], calories: null, unit: 'g', protein: null, fat: null, indication: 'Distúrbios gastrointestinais, má digestão, enteropatias agudas/crônicas (versão úmida).', lifeStage: 'ADULT', neuterStatus: 'ANY', isTherapeutic: true, therapeuticIndications: ['GI'] },
];

const knowledgeBase = {
    status: { title: "Entendendo o Fator K (Estado Fisiológico)", content: "O <strong>Fator K</strong> ajusta a necessidade energética básica (RER) para a situação real do animal. <br/><br/><ul><li><strong>Filhotes e fêmeas em lactação</strong> precisam de muito mais energia para crescimento e produção de leite (K > 2.0).</li><li><strong>Animais castrados ou idosos</strong> têm metabolismo mais lento e precisam de menos calorias para evitar o ganho de peso (K = 1.0 - 1.6).</li><li><strong>Pacientes críticos</strong> recebem inicialmente apenas o RER (K=1.0) para evitar a síndrome de realimentação, uma complicação metabólica grave.</li></ul>" },
    deficit: { title: "Cálculo para Perda de Peso (Déficit Calórico)", content: "O objetivo é fornecer menos calorias do que o animal gasta, forçando-o a usar suas reservas de gordura. O cálculo deve ser sempre baseado no <strong>peso ideal</strong> do animal, não no peso atual, para garantir uma perda de peso segura e eficaz.<br/><br/><strong>Fórmula:</strong><br/><code>DER = RER(do peso ideal) × K</code><br/><br/>Onde o fator 'K' de restrição calórica é:<br/><ul><li><strong>Cães:</strong> K = 1.0</li><li><strong>Gatos:</strong> K = 0.8</li></ul><br/><strong>Alerta 🚨:</strong> A perda de peso ideal deve ser de 1-2% do peso corporal por semana. Perdas mais rápidas, especialmente em gatos, aumentam o risco de <strong>lipidose hepática</strong>, uma condição grave e potencialmente fatal." },
    maintenance: { title: "Cálculo para Manutenção de Peso", content: "A manutenção do peso, ou <strong>Requisito de Energia Diário (DER)</strong>, é a quantidade total de calorias que um animal precisa em um dia para manter seu peso atual e um nível de atividade normal, sem ganhar ou perder massa corporal.<br/><br/><strong>Fórmula:</strong><br/><code>DER = RER(do peso atual) × K</code><br/><br/>O 'K' (Fator de Estado Fisiológico) é o multiplicador que ajusta a necessidade energética básica para o estilo de vida e condição do animal (ex: adulto castrado, ativo, gestante, etc.). Este cálculo utiliza o <strong>peso atual</strong> do paciente." },
    surplus: { title: "Cálculo para Ganho de Peso (Superávit Calórico)", content: "O objetivo é fornecer mais calorias do que o animal gasta, promovendo o ganho de peso de forma saudável. É indicado para animais magros, em recuperação ou que necessitam aumentar a massa corporal.<br/><br/><strong>Fórmula:</strong><br/><code>DER = RER(do peso ideal desejado) × K</code><br/><br/>O cálculo é feito sobre o <strong>peso ideal</strong> que se deseja alcançar. O fator 'K' para ganho de peso é geralmente:<br/><ul><li><strong>Cães:</strong> K = 1.4 a 1.6</li><li><strong>Gatos:</strong> K = 1.2 a 1.4</li></ul><br/>O ganho de peso deve ser gradual para evitar problemas gastrointestinais e garantir que seja composto por massa magra, não apenas gordura." },
    foodAmount: { title: "Cálculo da Quantidade de Alimento", content: "Após determinar a meta calórica diária do paciente (seja para manutenção, perda ou ganho de peso), a quantidade de um alimento específico é calculada dividindo essa meta pela densidade energética do alimento.<br/><br/><strong>Fórmula:</strong><br/><code>Quantidade Diária = Meta de Energia (kcal/dia) / Calorias do Alimento (kcal por unidade)</code><br/><br/><strong>Exemplo:</strong> Se a meta de um paciente é de <strong>300 kcal/dia</strong> e a ração escolhida possui <strong>3.0 kcal/g</strong>, o cálculo é:<br/><code>300 kcal/dia / 3.0 kcal/g = <strong>100 gramas por dia</strong></code><br/><br/>Este cálculo garante que o paciente receba a quantidade exata de calorias para atingir seu objetivo nutricional." }
};

// --- HELPER COMPONENTS (fora do componente principal) ---
const HelpIcon = React.memo(function HelpIcon({ term, onOpenModal, ...props }: { term: string; onOpenModal: (content: any) => void; [key: string]: any }) {
    return (
        <span
            className="inline-flex items-center justify-center w-5 h-5 ml-2 text-sm font-bold text-white dark:text-gray-900 bg-indigo-600 dark:bg-indigo-300 rounded-full cursor-pointer transition-colors hover:bg-indigo-700 dark:hover:bg-indigo-400 shrink-0"
            role="button"
            aria-label="Abrir guia"
            onClick={(e) => { e.stopPropagation(); onOpenModal(knowledgeBase[term]); }}
            {...props}
        >?</span>
    );
});

const Modal = React.memo(function Modal({ content, onClose }: { content: any; onClose: () => void }) {
    if (!content) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-card text-card-foreground border border-border rounded-lg shadow-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-foreground mb-4">{content.title}</h3>
                <div className="text-muted-foreground space-y-4" dangerouslySetInnerHTML={{ __html: content.content }} />
                <button onClick={onClose} className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Fechar</button>
            </div>
        </div>
    );
});

const CalculadoraEnergetica = ({ onBack }: { onBack: () => void }) => {
    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState('energia');
    const [species, setSpecies] = useState('dog');
    const [weight, setWeight] = useState('');
    const [status, setStatus] = useState('Adulto Castrado / Inativo');
    
    const [predefinedFoodIndex, setPredefinedFoodIndex] = useState('');
    const [customFoodName, setCustomFoodName] = useState('');
    const [customFoodCalories, setCustomFoodCalories] = useState('');
    const [customFoodUnit, setCustomFoodUnit] = useState('g');
    const [foodPrescriptionList, setFoodPrescriptionList] = useState([]);
    
    // Unified food bank state
    const [selectedUnifiedFoodId, setSelectedUnifiedFoodId] = useState('');
    
    // Commercial foods state (keeping for backward compatibility)
    const [selectedCommercialFoodId, setSelectedCommercialFoodId] = useState('');
    const [commercialFoodFilters, setCommercialFoodFilters] = useState({
        species: species === 'dog' ? 'DOG' as const : 'CAT' as const,
        lifeStage: 'ALL' as const,
        neuterStatus: 'ANY' as const,
        isTherapeutic: undefined as boolean | undefined,
    });
    
    // Estado para busca de alimentos
    const [foodSearchQuery, setFoodSearchQuery] = useState('');
    
    const [modalContent, setModalContent] = useState(null);

    // --- State for Ração Tab ---
    const [nutritionalGoal, setNutritionalGoal] = useState('maintenance');
    const [targetWeight, setTargetWeight] = useState('');

    // --- State for Ideal Weight Calculator Modal ---
    const [idealWeightModalOpenFor, setIdealWeightModalOpenFor] = useState(null); // 'dog' or 'cat'
    const [iwcInput, setIwcInput] = useState({ weight: '', ecc: '6' });
    const [iwcResult, setIwcResult] = useState('');

    // --- DERIVED STATE & CALCULATIONS ---
    const calculationResults = useMemo(() => {
        const w = parseFloat(weight);
        if (!w || w <= 0) return null;

        let rer = 0;
        let rerFormula = '';
        if (species === 'dog' && (w < 2 || w > 45)) {
            rer = (30 * w) + 70;
            rerFormula = "Fórmula Linear: (30 x Peso) + 70";
        } else {
            rer = 70 * Math.pow(w, 0.75);
            rerFormula = "Fórmula Alométrica: 70 x Peso^0.75";
        }
        
        const factorData = factors[species][status];
        const k = factorData.k;
        
        let der = 0;
        let derRange = null;

        if (typeof k === 'string' && k.includes('-')) {
            const [minK, maxK] = k.split('-').map(parseFloat);
            const minDer = rer * minK;
            const maxDer = rer * maxK;
            der = minDer; 
            derRange = `${minDer.toFixed(1)} a ${maxDer.toFixed(1)}`;
        } else {
            der = rer * parseFloat(k);
        }
        return { rer, rerFormula, k, factorDesc: factorData.desc, der, derRange };
    }, [species, weight, status]);

    const targetKcal = useMemo(() => {
        if (!calculationResults) return 0;
    
        if (nutritionalGoal === 'maintenance') {
            return calculationResults.der;
        }
    
        const tw = parseFloat(targetWeight);
        if (!tw || tw <= 0) return 0;
    
        const rerIdeal = (species === 'dog' && (tw < 2 || tw > 45)) ? (30 * tw) + 70 : 70 * Math.pow(tw, 0.75);
    
        if (nutritionalGoal === 'deficit') {
            const kDeficit = species === 'dog' ? 1.0 : 0.8;
            return rerIdeal * kDeficit;
        }
    
        if (nutritionalGoal === 'surplus') {
            const kSurplus = species === 'dog' ? 1.4 : 1.2;
            return rerIdeal * kSurplus;
        }
    
        return 0;
    }, [calculationResults, nutritionalGoal, targetWeight, species]);

    // Função para migrar alimentos adicionando campos faltantes
    const migrateFood = useCallback((food: any): FoodItem => {
        // Se já tem os campos, retornar como está
        if ('nutritionProfile' in food && food.nutritionProfile) {
            return food as FoodItem;
        }
        
        // Determinar campos baseado nas características
        const nutritionProfile = determineNutritionProfile(food);
        const isCompleteAndBalanced = determineIsCompleteAndBalanced(nutritionProfile);
        const requiresVetSupervision = determineRequiresVetSupervision(nutritionProfile, food.isTherapeutic || false);
        
        // Normalizar unit
        let unit: FoodUnit = 'g';
        if (food.unit === 'ml' || food.unit === 'L' || food.unit === 'l') {
            unit = 'ml';
        } else if (food.unit === 'g' || food.unit === 'kg') {
            unit = 'g';
        } else {
            unit = 'g'; // default
        }
        
        // Normalizar calories se necessário
        let calories = food.calories || 0;
        if (food.unit === 'kg' && calories > 0) {
            calories = calories / 1000; // converter kcal/kg para kcal/g
        }
        
        // Determinar speciesSafetyNotes
        const speciesSafetyNotes: { dog?: string[]; cat?: string[] } = {};
        if (nutritionProfile === 'HUMAN_ENTERAL' && food.species?.includes('cat')) {
            speciesSafetyNotes.cat = ['Gatos: risco por taurina e perfil mineral inadequado se uso exclusivo/prolongado.'];
        }
        if (nutritionProfile === 'SUPPLEMENT' && food.species?.includes('cat')) {
            speciesSafetyNotes.cat = ['Não usar como dieta exclusiva.'];
        }
        
        return {
            ...food,
            nutritionProfile,
            isCompleteAndBalanced,
            requiresVetSupervision,
            unit,
            calories,
            speciesSafetyNotes: Object.keys(speciesSafetyNotes).length > 0 ? speciesSafetyNotes : undefined,
        } as FoodItem;
    }, []);

    const isCritical = status.toLowerCase().includes('crítico') || status.toLowerCase().includes('hospitalizado');
    const sortedFoods = useMemo(() => {
        const foods = [...predefinedFoods]
            .map(migrateFood)
        .filter(food => food.species.includes(species))
            .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
        
        // Aplicar filtro de busca se houver query
        if (foodSearchQuery.trim()) {
            const query = foodSearchQuery.toLowerCase().trim();
            return foods.filter(food => 
                food.name.toLowerCase().includes(query)
            );
        }
        
        return foods;
    }, [species, migrateFood, foodSearchQuery]);

    // --- EFFECTS ---
    useEffect(() => {
        setStatus('Adulto Castrado / Inativo');
        setFoodPrescriptionList([]);
        setPredefinedFoodIndex('');
        setSelectedCommercialFoodId('');
        setCommercialFoodFilters({
            species: species === 'dog' ? 'DOG' : 'CAT',
            lifeStage: 'ALL',
            neuterStatus: 'ANY',
            isTherapeutic: undefined,
        })
    }, [species]);

    useEffect(() => {
        setFoodPrescriptionList([]);
    }, [weight, status]);
    
    // --- HANDLERS ---
    const handleTabSwitch = (tab) => {
        if (calculationResults || tab !== 'racao' && tab !== 'indicacoes') {
            setActiveTab(tab);
             if (document.getElementById('alert-message')) {
                document.getElementById('alert-message').classList.add('hidden');
            }
        } else {
             if (document.getElementById('alert-message')) {
                document.getElementById('alert-message').classList.remove('hidden');
            }
        }
    };

    const handleAddFood = () => {
        let foodToAdd = null;
        if (predefinedFoodIndex) {
            foodToAdd = sortedFoods[parseInt(predefinedFoodIndex, 10)];
        } else if (customFoodName && customFoodCalories) {
            foodToAdd = {
                name: customFoodName,
                calories: parseFloat(customFoodCalories),
                unit: customFoodUnit,
            };
        }

        if (!foodToAdd || foodToAdd.calories === null || isNaN(foodToAdd.calories)) {
            alert("Por favor, preencha ou selecione um alimento com calorias válidas.");
            return;
        }
        
        if (foodToAdd.calories <= 0) {
            if(!confirm("Este alimento tem 0 kcal/unidade e não pode ser usado para cálculos. Deseja adicioná-lo mesmo assim para consulta?")) {
                return;
            }
        }


        setFoodPrescriptionList(prev => [...prev, foodToAdd]);
        setPredefinedFoodIndex('');
        setCustomFoodName('');
        setCustomFoodCalories('');
    };
    
    const handlePredefinedFoodChange = (e) => {
        const index = e.target.value;
        setPredefinedFoodIndex(index);
        if (index) {
            const food = sortedFoods[parseInt(index, 10)];
            setCustomFoodName(food.name);
            setCustomFoodCalories(food.calories.toString());
            setCustomFoodUnit(food.unit);
        } else {
            setCustomFoodName('');
            setCustomFoodCalories('');
        }
    };

    const selectedFoodAlerts = useMemo(() => {
        if (!predefinedFoodIndex) return null;
        const food = sortedFoods[parseInt(predefinedFoodIndex, 10)];
        return food?.alerts || null;
    }, [predefinedFoodIndex, sortedFoods]);

    // Unified food bank: combine commercial foods and predefined foods
    const unifiedFoods = useMemo(() => {
        // Convert predefined foods to unified format with migration
        const convertedPredefined = predefinedFoods
            .map(migrateFood)
            .filter((food) => {
                const foodSpecies = food.species.includes('dog') ? 'DOG' : food.species.includes('cat') ? 'CAT' : null;
                return foodSpecies === commercialFoodFilters.species;
            })
            .filter((food) => {
                // Apply filters
                const foodLifeStage = food.lifeStage || 'ALL';
                if (
                    commercialFoodFilters.lifeStage !== 'ALL' &&
                    foodLifeStage !== commercialFoodFilters.lifeStage &&
                    foodLifeStage !== 'ALL'
                )
                    return false;
                
                const foodNeuterStatus = food.neuterStatus || 'ANY';
                if (
                    commercialFoodFilters.neuterStatus !== 'ANY' &&
                    foodNeuterStatus !== commercialFoodFilters.neuterStatus &&
                    foodNeuterStatus !== 'ANY'
                )
                    return false;
                
                const foodIsTherapeutic = food.isTherapeutic ?? false;
                if (
                    commercialFoodFilters.isTherapeutic !== undefined &&
                    foodIsTherapeutic !== commercialFoodFilters.isTherapeutic
                )
                    return false;
                
                return true;
            })
            .map((food) => ({
                id: `predefined-${food.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                name: food.name,
                species: food.species.includes('dog') ? 'DOG' as const : 'CAT' as const,
                lifeStage: (food.lifeStage || 'ALL') as 'PUPPY' | 'ADULT' | 'SENIOR' | 'ALL',
                neuterStatus: (food.neuterStatus || 'ANY') as 'NEUTERED' | 'INTACT' | 'ANY',
                isTherapeutic: food.isTherapeutic ?? false,
                therapeuticIndications: food.therapeuticIndications || [],
                calories: food.calories,
                unit: food.unit,
                protein: food.protein,
                fat: food.fat,
                indication: food.indication,
                alerts: food.alerts,
                dilution: food.dilution,
                nutritionProfile: food.nutritionProfile || determineNutritionProfile(food),
                isCompleteAndBalanced: food.isCompleteAndBalanced ?? determineIsCompleteAndBalanced(food.nutritionProfile || determineNutritionProfile(food)),
                requiresVetSupervision: food.requiresVetSupervision ?? determineRequiresVetSupervision(food.nutritionProfile || determineNutritionProfile(food), food.isTherapeutic ?? false),
                speciesSafetyNotes: food.speciesSafetyNotes,
                isPredefined: true,
            }));
        
        // Convert commercial foods to unified format with migration
        const convertedCommercial = COMMERCIAL_FOODS.filter((food) => {
            if (food.species !== commercialFoodFilters.species) return false;
            if (
                commercialFoodFilters.lifeStage !== 'ALL' &&
                food.lifeStage !== commercialFoodFilters.lifeStage
            )
                return false;
            if (
                commercialFoodFilters.neuterStatus !== 'ANY' &&
                food.neuterStatus !== commercialFoodFilters.neuterStatus &&
                food.neuterStatus !== 'ANY'
            )
                return false;
            if (
                commercialFoodFilters.isTherapeutic !== undefined &&
                food.isTherapeutic !== commercialFoodFilters.isTherapeutic
            )
                return false;
            
            return true;
        }).map((food) => {
            const profile = food.nutritionProfile || determineNutritionProfile(food);
            return {
                ...food,
                nutritionProfile: profile,
                isCompleteAndBalanced: food.isCompleteAndBalanced ?? determineIsCompleteAndBalanced(profile),
                requiresVetSupervision: food.requiresVetSupervision ?? determineRequiresVetSupervision(profile, food.isTherapeutic),
                isPredefined: false,
            };
        });
        
        // Combine and sort alphabetically
        const allFoods = [...convertedCommercial, ...convertedPredefined];
        
        // Aplicar filtro de busca se houver query
        let filteredFoods = allFoods;
        if (foodSearchQuery.trim()) {
            const query = foodSearchQuery.toLowerCase().trim();
            filteredFoods = allFoods.filter(food => {
                const name = food.isPredefined 
                    ? food.name 
                    : `${food.brand} ${food.line ? `- ${food.line}` : ''}: ${food.product}`;
                return name.toLowerCase().includes(query);
            });
        }
        
        // Sort alphabetically
        return filteredFoods.sort((a, b) => {
            const nameA = a.isPredefined 
                ? a.name 
                : `${a.brand} ${a.line ? `- ${a.line}` : ''}: ${a.product}`;
            const nameB = b.isPredefined 
                ? b.name 
                : `${b.brand} ${b.line ? `- ${b.line}` : ''}: ${b.product}`;
            return nameA.localeCompare(nameB, 'pt-BR', { sensitivity: 'base' });
        });
    }, [commercialFoodFilters, migrateFood, foodSearchQuery]);
    
    // Filter commercial foods and sort by updatedAtISO (most recent first) - keep for backward compatibility
    const filteredCommercialFoods = useMemo(() => {
        return COMMERCIAL_FOODS.filter((food) => {
            if (food.species !== commercialFoodFilters.species) return false;
            if (
                commercialFoodFilters.lifeStage !== 'ALL' &&
                food.lifeStage !== commercialFoodFilters.lifeStage
            )
                return false;
            if (
                commercialFoodFilters.neuterStatus !== 'ANY' &&
                food.neuterStatus !== commercialFoodFilters.neuterStatus &&
                food.neuterStatus !== 'ANY'
            )
                return false;
            if (
                commercialFoodFilters.isTherapeutic !== undefined &&
                food.isTherapeutic !== commercialFoodFilters.isTherapeutic
            )
                return false;
            return true;
        }).sort((a, b) => {
            // Sort by updatedAtISO descending (most recent first)
            // This groups all recent foods together regardless of isTherapeutic
            return b.updatedAtISO.localeCompare(a.updatedAtISO);
        })
    }, [commercialFoodFilters])

    // Selected food from unified bank
    const selectedUnifiedFood = useMemo(() => {
        return unifiedFoods.find((f) => f.id === selectedUnifiedFoodId) || null
    }, [selectedUnifiedFoodId, unifiedFoods])

    const selectedCommercialFood = useMemo(() => {
        return COMMERCIAL_FOODS.find((f) => f.id === selectedCommercialFoodId) || null
    }, [selectedCommercialFoodId])

    const commercialFoodWarnings = useMemo(() => {
        if (!selectedCommercialFood) return []
        return generateAutomaticWarnings(selectedCommercialFood)
    }, [selectedCommercialFood])

    const handleAddUnifiedFood = () => {
        if (!selectedUnifiedFood) return
        
        let foodToAdd;
        if (selectedUnifiedFood.isPredefined) {
            // Predefined food
            foodToAdd = {
                name: selectedUnifiedFood.name,
                calories: selectedUnifiedFood.calories,
                unit: selectedUnifiedFood.unit,
                protein: selectedUnifiedFood.protein,
                fat: selectedUnifiedFood.fat,
                alerts: selectedUnifiedFood.alerts,
                dilution: selectedUnifiedFood.dilution,
                isCommercial: false,
            }
        } else {
            // Commercial food
            foodToAdd = {
                name: `${selectedUnifiedFood.brand} ${selectedUnifiedFood.line ? selectedUnifiedFood.line + ' ' : ''}${selectedUnifiedFood.product}`,
                calories: selectedUnifiedFood.me_kcal_per_kg / 1000, // Convert kcal/kg to kcal/g
                unit: 'g',
                isCommercial: true,
                commercialData: selectedUnifiedFood,
            }
        }
        
        setFoodPrescriptionList((prev) => [...prev, foodToAdd])
        setSelectedUnifiedFoodId('')
    }

    const handleAddCommercialFood = () => {
        if (!selectedCommercialFood) return
        // Convert to format compatible with existing food list
        const foodToAdd = {
            name: `${selectedCommercialFood.brand} ${selectedCommercialFood.line ? selectedCommercialFood.line + ' ' : ''}${selectedCommercialFood.product}`,
            calories: selectedCommercialFood.me_kcal_per_kg / 1000, // Convert kcal/kg to kcal/g
            unit: 'g',
            isCommercial: true,
            commercialData: selectedCommercialFood,
        }
        setFoodPrescriptionList((prev) => [...prev, foodToAdd])
        setSelectedCommercialFoodId('')
    }

    const goalOptions = [
        { id: 'maintenance', label: '⚖️ Manutenção' },
        { id: 'deficit', label: '📉 Perda de Peso' },
        { id: 'surplus', label: '📈 Ganho de Peso' },
    ];
    
    return (
        <>
            <style>{`
                .nav-button { transition: all 0.2s ease; }
                .result-card, .progression-section, #food-precaution-alert { transition: all 0.3s ease-in-out; }
                .result-card.show, .progression-section.show, #food-precaution-alert.show { transform: scale(1); opacity: 1; }
                .goal-radio:checked + label {
                    border-color: hsl(var(--primary));
                    background-color: hsl(var(--primary) / 0.1);
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                }
                .input-field {
                    background-color: hsl(var(--background));
                    border: 1px solid hsl(var(--input));
                    color: hsl(var(--foreground));
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    width: 100%;
                }
                .input-field::placeholder {
                    color: hsl(var(--muted-foreground));
                }
                /* Custom Scrollbar for Indications Tab */
                #food-catalog::-webkit-scrollbar {
                    width: 10px;
                }
                #food-catalog::-webkit-scrollbar-track {
                    background-color: hsl(var(--muted));
                }
                #food-catalog::-webkit-scrollbar-thumb {
                    background-color: hsl(var(--border));
                    border-radius: 5px;
                }
                /* For Firefox */
                #food-catalog {
                    scrollbar-width: thin;
                    scrollbar-color: hsl(var(--border)) hsl(var(--muted));
                }
            `}</style>
            <Modal content={modalContent} onClose={() => setModalContent(null)} />
            
            {idealWeightModalOpenFor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60" onClick={() => setIdealWeightModalOpenFor(null)}>
                    <div className="bg-card text-card-foreground border border-border rounded-lg shadow-xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4">
                            Guia de Peso Ideal - {idealWeightModalOpenFor === 'dog' ? 'Cães' : 'Gatos'}
                        </h2>
                        <div className="max-h-[70vh] overflow-y-auto pr-4">
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Escore de Condição Corporal para {idealWeightModalOpenFor === 'dog' ? 'Cães' : 'Gatos'}
                            </h3>
                            <img
                                src={
                                    idealWeightModalOpenFor === 'dog'
                                    ? "https://res.cloudinary.com/dwta1roq1/image/upload/WSAVA-ESCORE-CORPORAL/CAO"
                                    : "https://res.cloudinary.com/dwta1roq1/image/upload/ESCORE-CORPORAL-ROYAL/GATO"
                                }
                                alt={`Tabela de escore de condição corporal para ${idealWeightModalOpenFor === 'dog' ? 'cães' : 'gatos'}, mostrando os escores de 1 a 9`}
                                className="w-full rounded-lg mb-4 border"
                            />
                            <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">
                                Como Estimar o Peso Ideal?
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                Use a tabela acima para encontrar o Escore de Condição Corporal (ECC) do seu {idealWeightModalOpenFor === 'dog' ? 'cão' : 'gato'}. Cada ponto acima do escore 5 (Ideal) representa cerca de 10-15% de excesso de peso. Informe os dados abaixo para estimar o peso ideal.
                            </p>
                            <div className="calculadora-container bg-muted p-4 rounded-lg border border-border">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="iwc-weight" className="block text-sm font-medium text-foreground mb-1">Peso Atual (kg)</label>
                                        <input
                                            type="number"
                                            id="iwc-weight"
                                            value={iwcInput.weight}
                                            onChange={(e) => setIwcInput(prev => ({ ...prev, weight: e.target.value }))}
                                            placeholder="Ex: 7.2"
                                            className="w-full p-3 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="iwc-ecc" className="block text-sm font-medium text-foreground mb-1">Escore Corporal (ECC)</label>
                                        <select
                                            id="iwc-ecc"
                                            value={iwcInput.ecc}
                                            onChange={(e) => setIwcInput(prev => ({ ...prev, ecc: e.target.value }))}
                                            className="w-full p-2 border border-input rounded-md bg-card text-foreground"
                                        >
                                            <option value="6">ECC 6/9 (~13% acima)</option>
                                            <option value="7">ECC 7/9 (~25% acima)</option>
                                            <option value="8">ECC 8/9 (~38% acima)</option>
                                            <option value="9">ECC 9/9 (~50% acima)</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const currentWeight = parseFloat(iwcInput.weight);
                                        const ecc = parseInt(iwcInput.ecc, 10);
                                        if (!currentWeight || currentWeight <= 0) {
                                            setIwcResult('<p class="text-red-600">Por favor, insira um peso atual válido.</p>');
                                            return;
                                        }
                                        const excessPercentage = (ecc - 5) * 0.125; // Using 12.5% average
                                        const idealWeight = currentWeight / (1 + excessPercentage);
                                        setIwcResult(`<p>O peso ideal estimado é de <strong class="text-indigo-600 text-lg">${idealWeight.toFixed(2)} kg</strong>.</p><p class="text-sm">Use este valor no campo 'Peso Ideal' da calculadora principal.</p>`);
                                    }}
                                    className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    Calcular Peso Ideal
                                </button>
                                {iwcResult && (
                                    <div
                                        className="mt-4 text-center text-foreground bg-primary/10 p-3 rounded-md"
                                        dangerouslySetInnerHTML={{ __html: iwcResult }}
                                    />
                                )}
                            </div>
                        </div>
                        <button onClick={() => setIdealWeightModalOpenFor(null)} className="mt-6 w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
            
            <div className="w-full max-w-3xl mx-auto bg-card text-card-foreground border border-border rounded-2xl shadow-lg p-4 md:p-8">
                <button onClick={onBack} className="mb-6 bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105">
                    &larr; Voltar para a Lista
                </button>
                <div className="flex justify-center gap-2 mb-8 text-sm md:text-base">
                    <button 
                        onClick={() => handleTabSwitch('energia')} 
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                            activeTab === 'energia' 
                                ? 'bg-sky-500/20 text-sky-400 border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]' 
                                : 'bg-muted/50 text-muted-foreground border-2 border-transparent hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        ⚡ Energia
                    </button>
                    <button 
                        onClick={() => handleTabSwitch('racao')} 
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                            activeTab === 'racao' 
                                ? 'bg-sky-500/20 text-sky-400 border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]' 
                                : 'bg-muted/50 text-muted-foreground border-2 border-transparent hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        🍽️ Ração
                    </button>
                    <button 
                        onClick={() => handleTabSwitch('indicacoes')} 
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                            activeTab === 'indicacoes' 
                                ? 'bg-sky-500/20 text-sky-400 border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]' 
                                : 'bg-muted/50 text-muted-foreground border-2 border-transparent hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        📋 Indicações
                    </button>
                </div>

                {activeTab === 'energia' && (
                    <div id="page-calc-energia">
                         <header className="mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Cálculo de Energia</h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Cálculo de necessidades energéticas para cães e gatos
                            </p>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div>
                                <label htmlFor="species" className="block text-sm font-medium text-foreground mb-2">Espécie</label>
                                <select id="species" value={species} onChange={(e) => setSpecies(e.target.value)} className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-foreground placeholder:text-muted-foreground">
                                    <option value="dog">Cão 🐶</option>
                                    <option value="cat">Gato 🐱</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-foreground mb-2">Peso Atual (kg)</label>
                                <input type="number" id="weight" placeholder="Ex: 15.5" value={weight} onChange={e => setWeight(e.target.value)} className="input-field" step="0.1" min="0.1"/>
                            </div>
                            <div>
                                <label htmlFor="status" className="flex items-center text-sm font-medium text-foreground mb-2">Estado Fisiológico <HelpIcon term="status" /></label>
                                <select id="status" value={status} onChange={e => setStatus(e.target.value)} className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition text-foreground placeholder:text-muted-foreground">
                                    {Object.keys(factors[species]).map(key => <option key={key} value={key}>{key}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <div id="results-container" className={`space-y-4 ${calculationResults ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="result-card bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-blue-800">RER (Energia em Repouso)</h3>
                                        <p className="text-sm text-blue-600">{calculationResults?.rerFormula || 'Ponto de partida.'}</p>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-800">{calculationResults?.rer.toFixed(1) || 0} <span className="text-lg font-medium">kcal/dia</span></p>
                                </div>
                            </div>
                            <div className="result-card bg-primary/10 border-l-4 border-indigo-500 p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-indigo-800">Fator (k)</h3>
                                    <p className="text-sm text-indigo-600">{calculationResults?.factorDesc || 'Multiplicador.'}</p>
                                </div>
                                <p className="text-2xl font-bold text-indigo-800">{calculationResults?.k || 0.0}</p>
                            </div>
                             <div className="result-card bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-emerald-800">NED (Energia Diária)</h3>
                                    <p className="text-sm text-emerald-600">Meta calórica para manutenção de peso.</p>
                                </div>
                                <p className="text-2xl font-bold text-emerald-800">{calculationResults?.derRange || calculationResults?.der.toFixed(1) || 0} <span className="text-lg font-medium">kcal/dia</span></p>
                            </div>
                        </div>

                        {isCritical && calculationResults && (
                            <div className="progression-section mt-8">
                                <h2 className="text-xl font-bold text-foreground text-center mb-4">Plano de Progressão Alimentar</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-muted p-4 rounded-lg border border-border">
                                        <h3 className="font-semibold text-foreground mb-3 text-center">Protocolo de 3 Dias</h3>
                                        <ul className="space-y-2 text-sm text-foreground">
                                            <li className="flex justify-between p-2 bg-card rounded"><span>Dia 1 (33%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.33).toFixed(1)} kcal</strong></li>
                                            <li className="flex justify-between p-2 bg-card rounded"><span>Dia 2 (66%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.66).toFixed(1)} kcal</strong></li>
                                            <li className="flex justify-between p-2 bg-card rounded"><span>Dia 3 (100%):</span> <strong className="text-foreground">{calculationResults.rer.toFixed(1)} kcal</strong></li>
                                        </ul>
                                    </div>
                                    <div className="bg-muted p-4 rounded-lg border border-border">
                                        <h3 className="font-semibold text-foreground mb-3 text-center">Protocolo de 4 Dias</h3>
                                        <ul className="space-y-2 text-sm text-foreground">
                                            <li className="flex justify-between p-2 bg-card rounded"><span>Dia 1 (25%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.25).toFixed(1)} kcal</strong></li>
                                            <li className="flex justify-between p-2 bg-card rounded"><span>Dia 2 (50%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.50).toFixed(1)} kcal</strong></li>
                                            <li className="flex justify-between p-2 bg-card rounded"><span>Dia 3 (75%):</span> <strong className="text-foreground">{(calculationResults.rer * 0.75).toFixed(1)} kcal</strong></li>
                                            <li className="flex justify-between p-2 bg-card rounded"><span>Dia 4 (100%):</span> <strong className="text-foreground">{calculationResults.rer.toFixed(1)} kcal</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === 'racao' && (
                    <div id="page-calc-racao">
                         <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                Plano e Prescrição Diária
                            </h1>
                            <p className="mt-2 text-muted-foreground text-lg">Defina a meta, selecione o alimento e veja a quantidade diária.</p>
                        </div>

                        {!isCritical ? (
                        <div className="bg-gradient-to-br from-muted to-muted/50 p-6 rounded-xl mb-6 border-2 border-border shadow-md">
                            <h3 className="font-semibold text-foreground text-xl mb-5 flex items-center gap-2">
                                <span className="text-2xl">1️⃣</span>
                                <span>Defina a Meta Nutricional</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                {goalOptions.map(goal => (
                                    <div key={goal.id}>
                                        <input type="radio" id={goal.id} name="nutritionalGoal" value={goal.id} checked={nutritionalGoal === goal.id} onChange={(e) => setNutritionalGoal(e.target.value)} className="hidden goal-radio" />
                                        <label htmlFor={goal.id} className="flex items-center justify-center p-3 w-full text-center rounded-lg border-2 cursor-pointer transition-all bg-card border-input hover:bg-muted">
                                            <span className="font-medium text-foreground">{goal.label}</span>
                                            <HelpIcon term={goal.id} onOpenModal={setModalContent} />
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {(nutritionalGoal === 'deficit' || nutritionalGoal === 'surplus') && (
                                <div className="mt-4">
                                    <label htmlFor="targetWeight" className="block text-sm font-medium text-foreground mb-2 flex items-center">
                                        {nutritionalGoal === 'deficit' ? 'Peso Ideal para Perda (kg)' : 'Peso Ideal para Ganho (kg)'}
                                        <span
                                            className="inline-flex items-center justify-center w-5 h-5 ml-2 text-sm font-bold text-white bg-blue-500 rounded-full cursor-pointer transition-colors hover:bg-blue-700 shrink-0"
                                            role="button"
                                            aria-label="Abrir guia para cálculo do peso ideal"
                                            onClick={() => {
                                                setIwcInput({ weight: '', ecc: '6' });
                                                setIwcResult('');
                                                setIdealWeightModalOpenFor(species);
                                            }}
                                        >?</span>
                                    </label>
                                    <input type="number" id="targetWeight" placeholder="Ex: 5" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} className="input-field" step="0.1" min="0.1"/>
                                     {nutritionalGoal === 'deficit' && (
                                        <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 text-amber-800 p-4 rounded-r-lg text-sm">
                                            <h4 className="font-bold">💡 Curiosidade Clínica: O "Efeito Platô"</h4>
                                            <p className="mt-1">É comum que o animal pare de perder peso mesmo com a dieta. Isso ocorre por uma adaptação do metabolismo. O acompanhamento veterinário é crucial para reajustar o plano e continuar a perda de peso de forma segura.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        ) : (
                             <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg mb-6">
                                <p><strong>Paciente Crítico:</strong> O plano de alimentação é fixo na progressão do RER para evitar síndrome de realimentação. A meta de manutenção será usada.</p>
                             </div>
                        )}
                        
                        <div className="bg-gradient-to-br from-muted to-muted/50 p-6 rounded-xl mb-6 border-2 border-border shadow-md">
                            <h3 className="font-semibold text-foreground text-xl mb-5 flex items-center gap-2">
                                <span className="text-2xl">2️⃣</span>
                                <span>Selecione o Alimento</span>
                            </h3>
                            
                            {/* Banco de Alimentos */}
                            <div className="mb-6 pb-6 border-b border-border">
                                <h4 className="font-medium text-foreground mb-4 text-xl">
                                    Banco de Alimentos
                                </h4>
                                
                                {/* Campo de Busca */}
                                <div className="mb-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Buscar alimento (ex: digite 'hill' para Hill's)..."
                                            value={foodSearchQuery}
                                            onChange={(e) => setFoodSearchQuery(e.target.value)}
                                            className="w-full p-3 pl-10 bg-card border-2 border-input rounded-lg text-foreground focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all"
                                        />
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">🔍</span>
                                        {foodSearchQuery && (
                                            <button
                                                onClick={() => {
                                                    setFoodSearchQuery('');
                                                    setSelectedUnifiedFoodId('');
                                                }}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                                aria-label="Limpar busca"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Lista de resultados da busca - clicáveis */}
                                    {foodSearchQuery.trim() && unifiedFoods.length > 0 && (
                                        <div className="mt-3 max-h-64 overflow-y-auto border-2 border-border rounded-lg bg-card shadow-lg">
                                            <div className="p-2 text-xs text-muted-foreground border-b border-border sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
                                                {unifiedFoods.length} alimento{unifiedFoods.length !== 1 ? 's' : ''} encontrado{unifiedFoods.length !== 1 ? 's' : ''}
                                            </div>
                                            <div className="divide-y divide-border">
                                                {unifiedFoods.slice(0, 20).map((food) => {
                                                    const displayName = food.isPredefined 
                                                        ? food.name 
                                                        : `${food.brand} ${food.line ? `- ${food.line}` : ''}: ${food.product}`;
                                                    return (
                                                        <button
                                                            key={food.id}
                                                            onClick={() => {
                                                                setSelectedUnifiedFoodId(food.id);
                                                                setFoodSearchQuery(''); // Limpar busca após seleção
                                                            }}
                                                            className="w-full text-left p-3 hover:bg-muted transition-colors focus:bg-muted focus:outline-none"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium text-foreground">{displayName}</span>
                                                                {food.isTherapeutic && (
                                                                    <span className="ml-2 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded">
                                                                        Terapêutico
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                                {unifiedFoods.length > 20 && (
                                                    <div className="p-2 text-xs text-muted-foreground text-center">
                                                        ... e mais {unifiedFoods.length - 20} alimento{unifiedFoods.length - 20 !== 1 ? 's' : ''}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Filtros */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                                    <select
                                        value={commercialFoodFilters.lifeStage}
                                        onChange={(e) =>
                                            setCommercialFoodFilters((prev) => ({
                                                ...prev,
                                                lifeStage: e.target.value as any,
                                            }))
                                        }
                                        className="p-2 bg-card border border-input rounded-lg text-sm text-foreground"
                                    >
                                        <option value="ALL">Todos os estágios</option>
                                        <option value="PUPPY">Filhotes</option>
                                        <option value="ADULT">Adulto</option>
                                        <option value="SENIOR">Sênior</option>
                                    </select>
                                    
                                    <select
                                        value={commercialFoodFilters.neuterStatus}
                                        onChange={(e) =>
                                            setCommercialFoodFilters((prev) => ({
                                                ...prev,
                                                neuterStatus: e.target.value as any,
                                            }))
                                        }
                                        className="p-2 bg-card border border-input rounded-lg text-sm text-foreground"
                                    >
                                        <option value="ANY">Qualquer status</option>
                                        <option value="NEUTERED">Castrado</option>
                                        <option value="INTACT">Inteiro</option>
                                    </select>
                                    
                                    <select
                                        value={commercialFoodFilters.isTherapeutic === undefined ? 'all' : commercialFoodFilters.isTherapeutic ? 'therapeutic' : 'regular'}
                                        onChange={(e) =>
                                            setCommercialFoodFilters((prev) => ({
                                                ...prev,
                                                isTherapeutic:
                                                    e.target.value === 'all'
                                                        ? undefined
                                                        : e.target.value === 'therapeutic',
                                            }))
                                        }
                                        className="p-2 bg-card border border-input rounded-lg text-sm text-foreground"
                                    >
                                        <option value="all">Todos</option>
                                        <option value="regular">Regular</option>
                                        <option value="therapeutic">Terapêutico</option>
                                    </select>
                                    
                                    <button
                                        onClick={() => {
                                            setCommercialFoodFilters({
                                                species: species === 'dog' ? 'DOG' : 'CAT',
                                                lifeStage: 'ALL',
                                                neuterStatus: 'ANY',
                                                isTherapeutic: undefined,
                                            })
                                            setSelectedCommercialFoodId('')
                                        }}
                                        className="p-2 bg-slate-200 dark:bg-slate-700 text-foreground rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                                    >
                                        Limpar filtros
                                    </button>
                                </div>
                                
                                {/* Seleção de alimento - Banco Unificado */}
                                <div className="mb-3">
                                    <select
                                        value={selectedUnifiedFoodId}
                                    onChange={(e) => {
                                            setSelectedUnifiedFoodId(e.target.value)
                                            setSelectedCommercialFoodId('')
                                        setPredefinedFoodIndex('')
                                        setCustomFoodName('')
                                        setCustomFoodCalories('')
                                    }}
                                        className="w-full p-3 bg-card border-2 border-input rounded-lg text-foreground focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Selecione um alimento...</option>
                                        {unifiedFoods.map((food) => {
                                            const displayName = food.isPredefined 
                                                ? food.name 
                                                : `${food.brand} ${food.line ? `- ${food.line}` : ''}: ${food.product}`;
                                            return (
                                        <option key={food.id} value={food.id}>
                                                    {displayName}
                                        </option>
                                            );
                                        })}
                                </select>
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">🍽️</span>
                                </div>
                                
                                {/* Informações do alimento selecionado */}
                                {selectedUnifiedFood && !selectedUnifiedFood.isPredefined && (
                                    <div className="bg-gradient-to-br from-card to-muted/50 p-5 rounded-xl border-2 border-border shadow-lg mb-3">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-2xl">🍖</span>
                                                    <h5 className="font-bold text-foreground text-lg">
                                                        {selectedUnifiedFood.brand}
                                                        {selectedUnifiedFood.line && ` - ${selectedUnifiedFood.line}`}
                                                    </h5>
                                                </div>
                                                <p className="text-sm text-muted-foreground ml-8">
                                                    {selectedUnifiedFood.product}
                                                </p>
                                            </div>
                                            {(() => {
                                                const profile = selectedUnifiedFood.nutritionProfile || determineNutritionProfile(selectedUnifiedFood);
                                                const badge = getNutritionProfileBadge(profile);
                                                return (
                                                    <span className={`px-2 py-1 ${badge.color} text-xs font-semibold rounded`}>
                                                        {badge.text}
                                                    </span>
                                                );
                                            })()}
                                            {selectedUnifiedFood.requiresVetSupervision && (
                                                <span className="ml-2 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-semibold rounded">
                                                    ⚕️ Uso sob supervisão
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* ME e valores principais */}
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-3 rounded-lg text-center border border-indigo-200 dark:border-indigo-800">
                                                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                                                    <span>⚡</span> ME
                                                </p>
                                                <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                                                    {selectedUnifiedFood.me_kcal_per_kg.toLocaleString('pt-BR')} kcal/kg
                                                </p>
                                            </div>
                                            {(() => {
                                                const protein = selectedUnifiedFood.guarantees.find(
                                                    (g) => g.key === 'protein_min_gkg'
                                                )
                                                const fat = selectedUnifiedFood.guarantees.find(
                                                    (g) => g.key === 'fat_min_gkg'
                                                )
                                                const fiber = selectedUnifiedFood.guarantees.find(
                                                    (g) => g.key === 'fiber_max_gkg'
                                                )
                                                const moisture = selectedUnifiedFood.guarantees.find(
                                                    (g) => g.key === 'moisture_max_gkg'
                                                )
                                                return (
                                                    <>
                                                        {protein && (
                                                            <div className="bg-muted p-2 rounded text-center">
                                                                <p className="text-xs text-muted-foreground mb-1">PB mín</p>
                                                                <p className="font-bold text-foreground text-sm">
                                                                    {(protein.value / 10).toFixed(1)}%
                                                                </p>
                                                            </div>
                                                        )}
                                                        {fat && (
                                                            <div className="bg-muted p-2 rounded text-center">
                                                                <p className="text-xs text-muted-foreground mb-1">EE mín</p>
                                                                <p className="font-bold text-foreground text-sm">
                                                                    {(fat.value / 10).toFixed(1)}%
                                                                </p>
                                                            </div>
                                                        )}
                                                        {fiber && (
                                                            <div className="bg-muted p-2 rounded text-center">
                                                                <p className="text-xs text-muted-foreground mb-1">FB máx</p>
                                                                <p className="font-bold text-foreground text-sm">
                                                                    {(fiber.value / 10).toFixed(1)}%
                                                                </p>
                                                            </div>
                                                        )}
                                                        {moisture && (
                                                            <div className="bg-muted p-2 rounded text-center">
                                                                <p className="text-xs text-muted-foreground mb-1">Umidade máx</p>
                                                                <p className="font-bold text-foreground text-sm">
                                                                    {(moisture.value / 10).toFixed(1)}%
                                                                </p>
                                                            </div>
                                                        )}
                                                    </>
                                                )
                                            })()}
                                        </div>
                                        
                                        {/* Warnings automáticos */}
                                        {(() => {
                                            const warnings = generateAutomaticWarnings(selectedUnifiedFood)
                                            if (warnings.length === 0) return null
                                            return (
                                            <div className="space-y-2 mb-3">
                                                    {warnings.map((warning, idx) => {
                                                    const colorClass =
                                                        warning.type === 'high_fat'
                                                            ? 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300'
                                                            : warning.type === 'ultra_low_fat'
                                                            ? 'bg-blue-100 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-300'
                                                            : warning.type === 'renal_diet'
                                                            ? 'bg-emerald-100 dark:bg-emerald-900/20 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                                                            : 'bg-purple-100 dark:bg-purple-900/20 border-purple-500 text-purple-800 dark:text-purple-300'
                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`p-2 rounded text-xs border-l-4 ${colorClass}`}
                                                        >
                                                            {warning.message}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            )
                                        })()}
                                        
                                        {/* Functional notes */}
                                        {selectedUnifiedFood.functionalNotes &&
                                            selectedUnifiedFood.functionalNotes.length > 0 && (
                                                <div className="mb-3">
                                                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                                                        Características:
                                                    </p>
                                                    <ul className="text-xs text-foreground space-y-1">
                                                        {selectedUnifiedFood.functionalNotes.map((note, idx) => (
                                                            <li key={idx} className="flex items-start gap-1">
                                                                <span>•</span>
                                                                <span>{note}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        
                                        <button
                                            onClick={handleAddUnifiedFood}
                                            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-sm"
                                        >
                                            Adicionar à Lista
                                        </button>
                                    </div>
                                )}
                                
                                {/* Informações do alimento predefinido selecionado */}
                                {selectedUnifiedFood && selectedUnifiedFood.isPredefined && (
                                    <div className="bg-gradient-to-br from-card to-muted/50 p-5 rounded-xl border-2 border-border shadow-lg mb-3">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h5 className="font-bold text-foreground text-lg mb-1">
                                                    {selectedUnifiedFood.name}
                                                </h5>
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedUnifiedFood.indication}
                                                </p>
                                            </div>
                                            {(() => {
                                                const profile = selectedUnifiedFood.nutritionProfile || determineNutritionProfile(selectedUnifiedFood);
                                                const badge = getNutritionProfileBadge(profile);
                                                return (
                                                    <span className={`px-2 py-1 ${badge.color} text-xs font-semibold rounded`}>
                                                        {badge.text}
                                                    </span>
                                                );
                                            })()}
                                            {selectedUnifiedFood.requiresVetSupervision && (
                                                <span className="ml-2 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-semibold rounded">
                                                    ⚕️ Uso sob supervisão
                                                </span>
                                            )}
                                        </div>
                            
                                        {/* Valores nutricionais */}
                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-3 rounded-lg text-center border border-indigo-200 dark:border-indigo-800">
                                                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                                                    <span>⚡</span> Calorias
                                                </p>
                                                <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                                                    {selectedUnifiedFood.calories} {selectedUnifiedFood.unit === 'g' ? 'kcal/g' : selectedUnifiedFood.unit === 'ml' ? 'kcal/mL' : `kcal/${selectedUnifiedFood.unit}`}
                                                </p>
                                            </div>
                                            {selectedUnifiedFood.protein && selectedUnifiedFood.protein !== 'N/A' && (
                                                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-lg text-center border border-green-200 dark:border-green-800">
                                                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                                                        <span>🥩</span> PB
                                                    </p>
                                                    <p className="font-bold text-green-700 dark:text-green-300 text-sm">
                                                        {selectedUnifiedFood.protein}
                                                    </p>
                                                </div>
                                            )}
                                            {selectedUnifiedFood.fat && selectedUnifiedFood.fat !== 'N/A' && (
                                                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-3 rounded-lg text-center border border-yellow-200 dark:border-yellow-800">
                                                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                                                        <span>🧈</span> EE
                                                    </p>
                                                    <p className="font-bold text-yellow-700 dark:text-yellow-300 text-sm">
                                                        {selectedUnifiedFood.fat}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Alerts do alimento predefinido */}
                                        {selectedUnifiedFood.alerts && selectedUnifiedFood.alerts.length > 0 && (
                                            <div className="space-y-2 mb-3">
                                                {selectedUnifiedFood.alerts.map((alert, alertIndex) => {
                                        const alertClasses = {
                                            red: 'bg-red-100 border-l-4 border-red-500 text-red-800',
                                            yellow: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800',
                                            green: 'bg-green-100 border-l-4 border-green-500 text-green-800'
                                        };
                                        const icon = { red: '🚨', yellow: '⚠️', green: '✅' };
                                        return (
                                            <div key={`${alert.type}-${alert.text?.substring(0, 20) ?? ""}-${alertIndex}`} className={`p-3 rounded-r-md text-sm flex items-start ${alertClasses[alert.type]}`}>
                                                <span className="mr-2 text-base">{icon[alert.type]}</span>
                                                <p dangerouslySetInnerHTML={{ __html: alert.text }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                                        
                                        <button
                                            onClick={handleAddUnifiedFood}
                                            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm"
                                        >
                                            <span>➕</span>
                                            <span>Adicionar à Lista</span>
                                        </button>
                                    </div>
                                )}
                                
                                {/* Informações do alimento comercial selecionado (legado - mantido para compatibilidade) */}
                                {selectedCommercialFood && !selectedUnifiedFood && (
                                    <div className="bg-card p-4 rounded-lg border border-border mb-3">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h5 className="font-bold text-foreground text-base">
                                                    {selectedCommercialFood.brand}
                                                    {selectedCommercialFood.line && ` - ${selectedCommercialFood.line}`}
                                                </h5>
                                                <p className="text-sm text-foreground mt-1">
                                                    {selectedCommercialFood.product}
                                                </p>
                                            </div>
                                            {selectedCommercialFood.isTherapeutic && (
                                                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-semibold rounded">
                                                    Terapêutico
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* ME e valores principais */}
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                                            <div className="bg-muted p-2 rounded text-center">
                                                <p className="text-xs text-muted-foreground mb-1">ME</p>
                                                <p className="font-bold text-foreground text-sm">
                                                    {selectedCommercialFood.me_kcal_per_kg.toLocaleString('pt-BR')} kcal/kg
                                                </p>
                                            </div>
                                            {(() => {
                                                const protein = selectedCommercialFood.guarantees.find(
                                                    (g) => g.key === 'protein_min_gkg'
                                                )
                                                const fat = selectedCommercialFood.guarantees.find(
                                                    (g) => g.key === 'fat_min_gkg'
                                                )
                                                const fiber = selectedCommercialFood.guarantees.find(
                                                    (g) => g.key === 'fiber_max_gkg'
                                                )
                                                const moisture = selectedCommercialFood.guarantees.find(
                                                    (g) => g.key === 'moisture_max_gkg'
                                                )
                                                return (
                                                    <>
                                                        {protein && (
                                                            <div className="bg-muted p-2 rounded text-center">
                                                                <p className="text-xs text-muted-foreground mb-1">PB mín</p>
                                                                <p className="font-bold text-foreground text-sm">
                                                                    {(protein.value / 10).toFixed(1)}%
                                                                </p>
                                                            </div>
                                                        )}
                                                        {fat && (
                                                            <div className="bg-muted p-2 rounded text-center">
                                                                <p className="text-xs text-muted-foreground mb-1">EE mín</p>
                                                                <p className="font-bold text-foreground text-sm">
                                                                    {(fat.value / 10).toFixed(1)}%
                                                                </p>
                                                            </div>
                                                        )}
                                                        {fiber && (
                                                            <div className="bg-muted p-2 rounded text-center">
                                                                <p className="text-xs text-muted-foreground mb-1">FB máx</p>
                                                                <p className="font-bold text-foreground text-sm">
                                                                    {(fiber.value / 10).toFixed(1)}%
                                                                </p>
                                                            </div>
                                                        )}
                                                        {moisture && (
                                                            <div className="bg-muted p-2 rounded text-center">
                                                                <p className="text-xs text-muted-foreground mb-1">Umidade máx</p>
                                                                <p className="font-bold text-foreground text-sm">
                                                                    {(moisture.value / 10).toFixed(1)}%
                                                                </p>
                                                            </div>
                                                        )}
                                                    </>
                                                )
                                            })()}
                                        </div>
                                        
                                        {/* Warnings automáticos */}
                                        {commercialFoodWarnings.length > 0 && (
                                            <div className="space-y-2 mb-3">
                                                {commercialFoodWarnings.map((warning, idx) => {
                                                    const colorClass =
                                                        warning.type === 'high_fat'
                                                            ? 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300'
                                                            : warning.type === 'ultra_low_fat'
                                                            ? 'bg-blue-100 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-300'
                                                            : warning.type === 'renal_diet'
                                                            ? 'bg-emerald-100 dark:bg-emerald-900/20 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                                                            : 'bg-purple-100 dark:bg-purple-900/20 border-purple-500 text-purple-800 dark:text-purple-300'
                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`p-2 rounded text-xs border-l-4 ${colorClass}`}
                                                        >
                                                            {warning.message}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                        
                                        {/* Functional notes */}
                                        {selectedCommercialFood.functionalNotes &&
                                            selectedCommercialFood.functionalNotes.length > 0 && (
                                                <div className="mb-3">
                                                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                                                        Características:
                                                    </p>
                                                    <ul className="text-xs text-foreground space-y-1">
                                                        {selectedCommercialFood.functionalNotes.map((note, idx) => (
                                                            <li key={idx} className="flex items-start gap-1">
                                                                <span>•</span>
                                                                <span>{note}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        
                                        <button
                                            onClick={handleAddCommercialFood}
                                            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-sm"
                                        >
                                            Adicionar à Lista
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <h4 className="font-medium text-foreground mb-2">Adicionar Manualmente</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="text" value={customFoodName} onChange={e => {setCustomFoodName(e.target.value); setPredefinedFoodIndex('');}} placeholder="Nome do alimento" className="input-field col-span-3 md:col-span-1"/>
                                <input type="number" value={customFoodCalories} onChange={e => {setCustomFoodCalories(e.target.value); setPredefinedFoodIndex('');}} placeholder="Calorias" className="input-field"/>
                                <select value={customFoodUnit} onChange={e => {setCustomFoodUnit(e.target.value); setPredefinedFoodIndex('');}} className="p-3 bg-card border border-input rounded-lg text-foreground">
                                    <option value="g">kcal/g</option>
                                    <option value="lata">kcal/lata</option>
                                    <option value="sache">kcal/sachê</option>
                                    <option value="ml">kcal/mL</option>
                                </select>
                            </div>
                            <button onClick={handleAddFood} className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Adicionar Alimento à Lista</button>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground text-lg mb-4">3. Prescrição Diária</h3>
                            <div id="food-list" className="space-y-4">
                                {foodPrescriptionList.length === 0 ? (
                                    <p className="text-center text-muted-foreground">Nenhum alimento adicionado ainda.</p>
                                ) : foodPrescriptionList.map((food, i) => {
                                    const unitLabel = food.unit === 'g' ? 'g' : (food.unit === 'ml' ? 'mL' : food.unit);
                                    const foodKey = `${food.name}-${food.calories ?? ""}-${food.unit ?? ""}-${i}`;
                                    
                                    if(isCritical) {
                                        const rerKcal = calculationResults?.rer || 0;
                                        return (
                                             <div key={foodKey} className="bg-card p-4 rounded-lg border border-border">
                                                <h4 className="font-bold text-foreground text-lg mb-3">{food.name}</h4>
                                                <p className='text-sm text-center text-red-600 mb-2'>Paciente crítico: usando plano de progressão para meta de manutenção (RER).</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground">
                                                    <div>
                                                        <h5 className="font-semibold text-foreground mb-2 text-center">Protocolo de 3 Dias</h5>
                                                        <ul className="space-y-1">
                                                            <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 1 (33%):</span> <strong className="text-foreground">{((rerKcal * 0.33) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                            <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 2 (66%):</span> <strong className="text-foreground">{((rerKcal * 0.66) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                            <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 3 (100%):</span> <strong className="text-foreground">{(rerKcal / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-semibold text-foreground mb-2 text-center">Protocolo de 4 Dias</h5>
                                                        <ul className="space-y-1">
                                                            <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 1 (25%):</span> <strong className="text-foreground">{((rerKcal * 0.25) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                            <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 2 (50%):</span> <strong className="text-foreground">{((rerKcal * 0.50) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                            <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 3 (75%):</span> <strong className="text-foreground">{((rerKcal * 0.75) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                            <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 4 (100%):</span> <strong className="text-foreground">{(rerKcal / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        // Calcular quantidade: para alimentos comerciais usa me_kcal_per_kg, senão usa calories (kcal/g)
                                        let amount = '0.0'
                                        if (targetKcal > 0) {
                                            if (food.isCommercial && food.commercialData) {
                                                // Alimento comercial: g_dia = (kcal_dia / me_kcal_per_kg) * 1000
                                                amount = (
                                                    (targetKcal / food.commercialData.me_kcal_per_kg) *
                                                    1000
                                                ).toFixed(1)
                                            } else if (food.calories > 0) {
                                                // Alimento predefinido/custom: quantidade = kcal_dia / (kcal/unidade)
                                                amount = (targetKcal / food.calories).toFixed(1)
                                            }
                                        }
                                        
                                        return (
                                            <div key={foodKey} className="bg-card p-4 rounded-lg border border-border">
                                                <h4 className="font-bold text-foreground text-lg mb-3">{food.name}</h4>
                                                
                                                {/* Informações adicionais para alimentos comerciais */}
                                                {food.isCommercial && food.commercialData && (
                                                    <div className="mb-3 space-y-2">
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                                            <div className="bg-muted p-2 rounded text-center">
                                                                <p className="text-muted-foreground mb-1">ME</p>
                                                                <p className="font-semibold text-foreground">
                                                                    {food.commercialData.me_kcal_per_kg.toLocaleString('pt-BR')} kcal/kg
                                                                </p>
                                                            </div>
                                                            {(() => {
                                                                const protein = food.commercialData.guarantees.find(
                                                                    (g) => g.key === 'protein_min_gkg'
                                                                )
                                                                const fat = food.commercialData.guarantees.find(
                                                                    (g) => g.key === 'fat_min_gkg'
                                                                )
                                                                const fiber = food.commercialData.guarantees.find(
                                                                    (g) => g.key === 'fiber_max_gkg'
                                                                )
                                                                return (
                                                                    <>
                                                                        {protein && (
                                                                            <div className="bg-muted p-2 rounded text-center">
                                                                                <p className="text-muted-foreground mb-1">PB</p>
                                                                                <p className="font-semibold text-foreground">
                                                                                    {(protein.value / 10).toFixed(1)}%
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                        {fat && (
                                                                            <div className="bg-muted p-2 rounded text-center">
                                                                                <p className="text-muted-foreground mb-1">EE</p>
                                                                                <p className="font-semibold text-foreground">
                                                                                    {(fat.value / 10).toFixed(1)}%
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                        {fiber && (
                                                                            <div className="bg-muted p-2 rounded text-center">
                                                                                <p className="text-muted-foreground mb-1">FB</p>
                                                                                <p className="font-semibold text-foreground">
                                                                                    {(fiber.value / 10).toFixed(1)}%
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )
                                                            })()}
                                                        </div>
                                                        
                                                        {/* Warnings do alimento comercial */}
                                                        {(() => {
                                                            const warnings = generateAutomaticWarnings(food.commercialData)
                                                            if (warnings.length === 0) return null
                                                            return (
                                                                <div className="space-y-1">
                                                                    {warnings.map((warning, idx) => {
                                                                        const colorClass =
                                                                            warning.type === 'high_fat'
                                                                                ? 'bg-red-50 dark:bg-red-900/10 border-red-300 text-red-700 dark:text-red-300'
                                                                                : warning.type === 'ultra_low_fat'
                                                                                ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-300 text-blue-700 dark:text-blue-300'
                                                                                : warning.type === 'renal_diet'
                                                                                ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                                                                                : 'bg-purple-50 dark:bg-purple-900/10 border-purple-300 text-purple-700 dark:text-purple-300'
                                                                        return (
                                                                            <div
                                                                                key={idx}
                                                                                className={`p-1.5 rounded text-xs border-l-2 ${colorClass}`}
                                                                            >
                                                                                {warning.message}
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )
                                                        })()}
                                                    </div>
                                                )}
                                                
                                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                                                    <span className="flex items-center text-md font-semibold text-blue-800">
                                                        {goalOptions.find(g => g.id === nutritionalGoal)?.label || 'Meta:'}
                                                        <HelpIcon term="foodAmount" onOpenModal={setModalContent} />
                                                    </span>
                                                    <strong className="text-xl font-bold text-blue-800">
                                                        {targetKcal > 0
                                                            ? food.isCommercial
                                                                ? `${amount} g/dia`
                                                                : `${amount} ${unitLabel}/dia`
                                                            : 'Insira o peso ideal'}
                                                    </strong>
                                                </div>
                                                
                                                {/* Mensagens de segurança baseadas em nutritionProfile */}
                                                {(() => {
                                                    const foodItem = food.isCommercial 
                                                        ? null 
                                                        : sortedFoods.find(f => f.name === food.name);
                                                    if (!foodItem) return null;
                                                    
                                                    const profile = foodItem.nutritionProfile || determineNutritionProfile(foodItem);
                                                    const isComplete = foodItem.isCompleteAndBalanced ?? determineIsCompleteAndBalanced(profile);
                                                    
                                                    if (isComplete) return null;
                                                    
                                                    if (profile === 'SUPPLEMENT') {
                                                        return (
                                                            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 rounded">
                                                                <p className="text-sm font-semibold mb-1">⚠️ Suplemento</p>
                                                                <p className="text-xs">Isso não é dieta completa. Use como complemento/estratégia de palatabilidade, não como única fonte.</p>
                                                            </div>
                                                        );
                                                    }
                                                    
                                                    if (profile === 'HUMAN_ENTERAL') {
                                                        const hasCat = foodItem.species?.includes('cat');
                                                        return (
                                                            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 rounded">
                                                                <p className="text-sm font-semibold mb-1">🚨 Enteral Humana</p>
                                                                <p className="text-xs mb-1">Enteral humana: risco de desequilíbrio (ex.: taurina em gatos, minerais). Use apenas por curto prazo e com supervisão.</p>
                                                                {hasCat && foodItem.speciesSafetyNotes?.cat && (
                                                                    <p className="text-xs mt-1 font-semibold">{foodItem.speciesSafetyNotes.cat[0]}</p>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    
                                                    if (profile === 'SUPPORT_ENTERAL' && !isComplete) {
                                                        return (
                                                            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 rounded">
                                                                <p className="text-sm font-semibold mb-1">⚠️ Suporte Enteral</p>
                                                                <p className="text-xs">Este produto não é completo e balanceado. Use apenas sob supervisão veterinária.</p>
                                                            </div>
                                                        );
                                                    }
                                                    
                                                    return null;
                                                })()}
                                                
                                                {/* Tipo de alimento */}
                                                {(() => {
                                                    const foodItem = food.isCommercial 
                                                        ? null 
                                                        : sortedFoods.find(f => f.name === food.name);
                                                    if (!foodItem) return null;
                                                    
                                                    const profile = foodItem.nutritionProfile || determineNutritionProfile(foodItem);
                                                    const badge = getNutritionProfileBadge(profile);
                                                    
                                                    return (
                                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                                            <span>Tipo:</span>
                                                            <span className={`px-2 py-1 ${badge.color} rounded text-xs font-semibold`}>
                                                                {badge.text}
                                                            </span>
                                                            {foodItem.requiresVetSupervision && (
                                                                <span className="text-orange-600 dark:text-orange-400">
                                                                    ⚕️ Uso sob supervisão
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'indicacoes' && (
                     <div id="page-indicacoes">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Guia de Alimentos ({species === 'dog' ? 'Cães' : 'Gatos'})</h1>
                        </div>
                        <div id="food-catalog" className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {sortedFoods.map((food, i) => {
                                 let kcalDisplay = 'N/A';
                                if(food.calories > 0) {
                                    if(food.unit === 'g' || food.unit === 'ml') {
                                        kcalDisplay = (food.calories * 1000).toFixed(0);
                                    } else {
                                        kcalDisplay = `${food.calories.toFixed(0)} /unidade`;
                                    }
                                }
                                const foodCatalogKey = `${food.name}-${food.calories ?? ""}-${food.unit ?? ""}-${i}`;
                                return (
                                <div key={foodCatalogKey} className="bg-muted p-4 rounded-lg border border-border">
                                    <h4 className="font-bold text-foreground">{food.name}</h4>
                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-foreground">
                                        <div className="text-center bg-card p-2 rounded"><strong>kcal/kg ou /L:</strong> {kcalDisplay}</div>
                                        <div className="text-center bg-card p-2 rounded"><strong>% PB:</strong> {food.protein}</div>
                                        <div className="text-center bg-card p-2 rounded"><strong>% EE:</strong> {food.fat}</div>
                                    </div>
                                    <p className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">Indicação Principal:</strong> {food.indication}</p>
                                    
                                    {food.alerts && food.alerts.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {food.alerts.map((alert, alertIndex) => {
                                                const alertClasses = {
                                                    red: 'bg-red-100 border-l-4 border-red-500 text-red-800',
                                                    yellow: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800',
                                                    green: 'bg-green-100 border-l-4 border-green-500 text-green-800'
                                                };
                                                const icon = { red: '🚨', yellow: '⚠️', green: '✅' };
                                                return (
                                                    <div key={`${alert.type}-${alert.text?.substring(0, 20) ?? ""}-${alertIndex}`} className={`p-3 rounded-r-md text-sm flex items-start ${alertClasses[alert.type]}`}>
                                                        <span className="mr-2 text-base">{icon[alert.type]}</span>
                                                        <p dangerouslySetInnerHTML={{ __html: alert.text }} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CalculadoraEnergetica;