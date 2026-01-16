

import React, { useState, useEffect, useMemo, useCallback } from 'react';

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

const predefinedFoods = [
    // --- Cães & Gatos ---
    { name: "Hill's a/d Urgent Care (Úmido)", species: ['dog', 'cat'], calories: 1.175, unit: 'g', protein: '8.5%', fat: '5.2%', indication: 'Convalescença, anorexia, pós-cirurgia, lesão.', alerts: [ { type: 'green', text: 'Excelente para pacientes anoréxicos ou que necessitam de suporte calórico em pequenos volumes.' }, { type: 'red', text: 'Alto teor de gordura e proteína: <strong>contraindicado</strong> em pancreatite, hiperlipidemia, e DRC/encefalopatia hepática não compensadas.' } ] },
    { name: "Premier Nutrição Clínica Recuperação (Úmido)", species: ['dog', 'cat'], calories: 1.3, unit: 'g', protein: '11.0%', fat: '9.0%', indication: 'Suporte nutricional em recuperação, pós-cirúrgico.', alerts: [ { type: 'green', text: 'Alto aporte calórico e proteico para recuperação rápida.' }, { type: 'red', text: 'Contraindicado em pancreatite, hiperlipidemia, e DRC/encefalopatia hepática não compensadas devido ao alto teor de gordura e proteína.' } ] },
    { name: "Royal Canin Recovery (Úmido)", species: ['dog', 'cat'], calories: 1.183, unit: 'g', protein: '12.7%', fat: '6.4%', indication: 'Convalescença, anorexia, pós-cirurgia, cuidados intensivos.', alerts: [ { type: 'green', text: 'Textura mousse ideal para alimentação por sonda e pacientes com dificuldade de apreensão do alimento.' }, { type: 'red', text: 'Contraindicado em encefalopatia hepática, pancreatite e hiperlipidemia agudas devido ao alto teor de gordura.' } ] },
    { name: "FN Vet Care Recuperação (lata)", species: ['dog', 'cat'], calories: 1.25, unit: 'g', protein: '11.5%', fat: '7.5%', indication: 'Recuperação de cães e gatos debilitados, anorexia ou convalescença.', alerts: [ { type: 'yellow', text: 'Teor de gordura moderado, usar com cautela em pacientes com histórico de pancreatite.' } ] },
    { name: "Nutralife Intensiv (pó)", species: ['dog', 'cat'], calories: 5.86, unit: 'g', protein: '29%', fat: '46%', indication: 'Recuperação, anorexia, crescimento, atletas.', alerts: [ { type: 'red', text: 'Gordura extremamente elevada (46%). <strong>Contraindicado</strong> em pancreatite, hiperlipidemia, encefalopatia hepática e DRC descompensada.' } ], dilution: {scoop_g: 16, water_ml: 30} },
    { name: "Nutralife (pasta)", species: ['dog', 'cat'], calories: 5.441, unit: 'g', protein: '15.3%', fat: '38%', indication: 'Recuperação, anorexia (pasta palatável).', alerts: [ { type: 'green', text: 'Muito palatável, fácil de administrar como suplemento para estimular o apetite.' }, { type: 'red', text: 'Alto teor de gordura (38%). <strong>Contraindicado</strong> em pancreatite, hiperlipidemia, e DRC.' } ] },
    { name: "Nutrapet (pasta)", species: ['dog', 'cat'], calories: 5.5, unit: 'g', protein: '2%', fat: '40%', indication: 'Suplemento energético rápido.', alerts: [ { type: 'yellow', text: 'Teor proteico insignificante. Não supre necessidades proteicas para recuperação de massa magra.' }, { type: 'red', text: 'Extremamente rico em gordura (40%). <strong>Contraindicado</strong> em pancreatite e hiperlipidemia.' } ] },
    { name: "Petmilk (pó)", species: ['dog', 'cat'], calories: 5.986, unit: 'g', protein: '35%', fat: '36.8%', indication: 'Substituto do leite materno para cães e gatos neonatos.', alerts: [ { type: 'green', text: 'Formulado para ser um substituto completo do leite materno.' }, { type: 'yellow', text: 'A diluição incorreta é a principal causa de diarreia ou constipação em filhotes. Siga as instruções rigorosamente.' } ], dilution: {scoop_g: 8, water_ml: 40} },
    { name: "Support First Milk (pó)", species: ['dog', 'cat'], calories: 0.9, unit: 'g', protein: '41%', fat: '20%', indication: 'Substituto do leite materno.', alerts: [ { type: 'yellow', text: 'A informação sobre a densidade calórica é inconsistente, usar com cautela. Diluição incorreta pode causar distúrbios gastrointestinais.' } ], dilution: {scoop_g: 10, water_ml: 50} },
    { name: "Orga Milk (pó)", species: ['dog', 'cat'], calories: 5.378, unit: 'g', protein: '32%', fat: '35%', indication: 'Substituto do leite materno.', alerts: [ { type: 'yellow', text: 'Risco de distúrbios gastrointestinais com preparo inadequado.' } ], dilution: {scoop_g: 8, water_ml: 40} },
    
    // --- Cães ---
    { name: "Royal Canin Mini Adult", species: ['dog'], calories: 3.744, unit: 'g', protein: '25.0%', fat: '14.0%', indication: 'Cães pequenos (10 meses a 8 anos, 4-10 kg)' },
    { name: "Royal Canin Maxi Adult", species: ['dog'], calories: 3.970, unit: 'g', protein: '26.0%', fat: '17.0%', indication: 'Cães grandes (15 meses a 5 anos, 26-44 kg)' },
    { name: "Premier Pet Nutrição Clínica Obesidade Cães Pequeno Porte", species: ['dog'], calories: 2.979, unit: 'g', protein: '35.5%', fat: '8.0%', indication: 'Cães com obesidade, pequeno porte', alerts: [ { type: 'green', text: 'Ideal para perda de peso: baixa caloria com alta proteína para manter a massa magra e promover saciedade.' } ] },
    { name: "Premier Pet Ambientes Internos Cães Adultos Castrados", species: ['dog'], calories: 3.601, unit: 'g', protein: '31.5%', fat: '11.5%', indication: 'Cães castrados, raças pequenas' },
    { name: "Premier Pet Golden Fórmula Cães Adultos Frango e Arroz", species: ['dog'], calories: 3.797, unit: 'g', protein: '23.0%', fat: '12.0%', indication: 'Cães adultos' },
    { name: "Hill's Science Diet Cães Adultos Raças Pequenas e Mini Frango", species: ['dog'], calories: 3.720, unit: 'g', protein: '21.0 - 24.5%', fat: '13.0%', indication: 'Cães adultos, raças pequenas e mini' },
    { name: "Hill's Science Diet Cães Filhotes Raças Pequenas e Mini Frango", species: ['dog'], calories: 3.775, unit: 'g', protein: '25.0 - 30.0%', fat: '16.0 - 20.6%', indication: 'Filhotes, raças pequenas e mini' },
    { name: "Purina Pro Plan Cães Adultos Mini e Pequeno Porte Optihealth", species: ['dog'], calories: 4.050, unit: 'g', protein: '29.0%', fat: '17.0%', indication: 'Cães adultos, mini e pequeno porte' },
    { name: "Purina Pro Plan Cães Adultos Médio Porte Optihealth", species: ['dog'], calories: 3.980, unit: 'g', protein: '26.0%', fat: '15.0%', indication: 'Cães adultos, médio porte' },
    { name: "Purina Pro Plan Cães Adultos Grande e Gigante Porte Optihealth", species: ['dog'], calories: 3.800, unit: 'g', protein: '26.0%', fat: '12.0%', indication: 'Cães adultos, grande e gigante porte' },
    { name: "Purina Pro Plan Cães Filhotes Mini e Pequeno Porte Optistart", species: ['dog'], calories: 4.240, unit: 'g', protein: '32.0%', fat: '20.0%', indication: 'Filhotes, mini e pequeno porte' },
    { name: "Purina Pro Plan Cães Filhotes Grande e Gigante Porte Optistart", species: ['dog'], calories: 4.000, unit: 'g', protein: '28.0%', fat: '17.0%', indication: 'Filhotes, grande e gigante porte' },
    { name: "Biofresh Cão Adulto Light", species: ['dog'], calories: 3.16, unit: 'g', protein: '28%', fat: '4.8%-8.5%', indication: 'Controle de peso para cães de raças pequenas.' },
    { name: "Complett Peptide 1.5 (líquido)", species: ['dog'], calories: 1.5, unit: 'ml', protein: '19% VET', fat: '43% VET', indication: 'Suporte hipercalórico para cães e (com extremo cuidado) gatos em UTI.', alerts: [ { type: 'red', text: 'Taurina insuficiente para gatos como única fonte. <strong>Uso em felinos apenas com suplementação e monitoramento rigoroso.</strong>' }, { type: 'red', text: 'Gordura extremamente alta. Cautela máxima em pancreatite ou hiperlipidemia.' }, { type: 'green', text: 'Hipercalórico e com proteína hidrolisada, útil para recuperação em cães quando dietas veterinárias não são toleradas.' } ] },
    { name: "Equilíbrio Veterinary Hypoallergenic (Seco, Cães)", species: ['dog'], calories: 4.072, unit: 'g', protein: '21.0%', fat: '18.0%', indication: 'Alergias/intolerâncias alimentares com manifestações dermatológicas/digestivas.', alerts: [ { type: 'red', text: '<strong>Contraindicado</strong> para pacientes com insuficiência renal e hepática.' }, { type: 'green', text: 'Proteína de soja hidrolisada é uma boa opção para dieta de eliminação.' } ] },
    { name: "Farmina Vet Life Gastrointestinal (Cães)", species: ['dog'], calories: 3.507, unit: 'g', protein: 'N/A', fat: 'N/A', indication: 'Manejo de distúrbios gastrointestinais.' },
    { name: "Farmina Vet Life Hypoallergenic Egg & Rice (Seco, Cães)", species: ['dog'], calories: 3.891, unit: 'g', protein: '15.5%', fat: '13.0%', indication: 'Manutenção nutricional, redução de intolerância alimentar.' },
    { name: "Farmina Vet Life Hypoallergenic Fish & Potato (Seco, Cães)", species: ['dog'], calories: 3.562, unit: 'g', protein: '15.5%', fat: '13.0%', indication: 'Redução de intolerância alimentar, suporte à função da pele, alergias alimentares.' },
    { name: "Farmina Vet Life Obesity & Diabetic (Cães)", species: ['dog'], calories: 3.507, unit: 'g', protein: 'N/A', fat: 'N/A', indication: 'Manejo da obesidade e diabetes.' },
    { name: "Farmina Vet Life Recoup (Úmido, Cães)", species: ['dog'], calories: 1.111, unit: 'g', protein: '11.6%', fat: '5.7%', indication: 'Recuperação nutricional.' },
    { name: "Farmina Vet Life UltraHypo (Seco, Cães)", species: ['dog'], calories: 3.840, unit: 'g', protein: '18.0%', fat: '15.0%', indication: 'Alergias/intolerâncias, dieta de eliminação, dermatite atópica refratária.', alerts: [ { type: 'red', text: '<strong>Contraindicado</strong> para filhotes, gestantes/lactantes.' } ] },
    { name: "FN Vet Care Hipoalergênica (Médio/Grande, Cães)", species: ['dog'], calories: 3.610, unit: 'g', protein: '21.0%', fat: '13.0%', indication: 'Reações adversas a alimentos (hipersensibilidade/intolerância), diarreias crônicas.' },
    { name: "FN Vet Care Hipoalergênica (Mini/Pequeno, Cães)", species: ['dog'], calories: 3.610, unit: 'g', protein: '23.0%', fat: '14.0%', indication: 'Reações adversas a alimentos (hipersensibilidade/intolerância), diarreias crônicas.' },
    { name: "Formula Natural Vet Care Gastrointestinal Cães", species: ['dog'], calories: 3.8, unit: 'g', protein: '25%', fat: '15.5%', indication: 'Suporte à saúde digestiva.', alerts: [ { type: 'green', text: 'Alta digestibilidade, ideal para quadros de gastroenterites agudas ou crônicas.' } ] },
    { name: "Formula Natural Vet Care Obesidade Cães", species: ['dog'], calories: 3.0, unit: 'g', protein: '30%', fat: '8.5%', indication: 'Manejo da obesidade em cães.' },
    { name: "Formula Natural Vet Care Osteoartrite Cães", species: ['dog'], calories: 3.5, unit: 'g', protein: '25%', fat: '11%', indication: 'Suporte à saúde articular.', alerts: [ { type: 'green', text: 'Contém condroprotetores (glucosamina e condroitina) e EPA/DHA para auxiliar no manejo da osteoartrite.' } ] },
    { name: "Formula Natural Vet Care Renal Cães", species: ['dog'], calories: 4.0, unit: 'g', protein: '14%', fat: '17%', indication: 'Suporte à função renal.', alerts: [ { type: 'green', text: 'Fósforo e proteína controlados para auxiliar no manejo da Doença Renal Crônica (DRC).' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes em crescimento, fêmeas gestantes/lactantes.' } ] },
    { name: "Fresubin Original (líquido)", species: ['dog'], calories: 1.0, unit: 'ml', protein: '15% VET', fat: '30% VET', indication: 'Suporte nutricional por sonda em cães (quando dietas vet não disponíveis).', alerts: [ { type: 'red', text: '<strong>CONTRAINDICADO COMO ÚNICA FONTE PARA GATOS</strong> (sem taurina). Perfil de aminoácidos não ideal para carnívoros.' }, { type: 'yellow', text: 'Produto de uso humano. Utilizar em animais apenas sob estrita supervisão veterinária.' } ] },
    { name: "Hill's d/d Pato & Arroz (Seco, Cães)", species: ['dog'], calories: 3.713, unit: 'g', protein: '15.1%', fat: '14.3%', indication: 'Sensibilidades alimentares, dermatites pruriginosas, gastroenterite crônica, DII.' },
    { name: "Hill's i/d (Seco, Cães)", species: ['dog'], calories: 3.598, unit: 'g', protein: '26.2%', fat: '13.6%', indication: 'Manejo de distúrbios gastrointestinais.', alerts: [ { type: 'green', text: 'Altamente digestível e com prebióticos (tecnologia ActivBiome+), excelente para a maioria das diarreias agudas.' } ] },
    { name: "Hill's i/d (Úmido, Cães)", species: ['dog'], calories: 1.017, unit: 'g', protein: '4.0%', fat: '1.5%', indication: 'Distúrbios gastrointestinais.', alerts: [ { type: 'green', text: 'Baixo teor de gordura, ideal para condições que exigem restrição de gordura, como recuperação de pancreatite.' } ] },
    { name: "Hill's i/d Low Fat (Seco, Cães)", species: ['dog'], calories: 3.311, unit: 'g', protein: '24%', fat: '6.9%', indication: 'Manejo de distúrbios gastrointestinais sensíveis à gordura.', alerts: [ { type: 'green', text: 'Teor de gordura muito baixo, excelente opção para pancreatite, linfangiectasia e hiperlipidemia.' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes, gestantes/lactantes.' } ] },
    { name: "Hill's j/d (Úmido, Cães)", species: ['dog'], calories: 1.351, unit: 'g', protein: '17.0%', fat: '11.0%', indication: 'Suporte ao metabolismo das articulações (osteoartrite).' },
    { name: "Hill's j/d Joint Care (Seco, Cães)", species: ['dog'], calories: 3.618, unit: 'g', protein: '17.6%', fat: '14.5%', indication: 'Suporte à saúde articular.', alerts: [ { type: 'green', text: 'Clinicamente comprovado para melhorar a mobilidade. Enriquecido com EPA, glucosamina e condroitina.' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes em crescimento, cadelas gestantes/lactantes.' } ] },
    { name: "Hill's k/d (Seco, Cães)", species: ['dog'], calories: 4.021, unit: 'g', protein: '13.9%', fat: '20.5%', indication: 'Suporte à função renal crônica.', alerts: [ { type: 'green', text: 'Padrão-ouro para o manejo da Doença Renal Crônica (DRC), ajudando a retardar a progressão.' }, { type: 'red', text: 'Restrição proteica severa: <strong>contraindicado</strong> para filhotes em crescimento, fêmeas gestantes/lactantes ou em condições que exijam alto aporte proteico.' }, { type: 'yellow', text: 'A palatabilidade pode ser um desafio em pacientes renais anoréxicos. Considere opções úmidas ou palatabilizantes.' } ] },
    { name: "Hill's l/d Hepatic Care (Seco, Cães)", species: ['dog'], calories: 4.067, unit: 'g', protein: '16.7%', fat: '21.9%', indication: 'Suporte à função hepática.', alerts: [ { type: 'green', text: 'Proteína e cobre controlados, ideal para a maioria das doenças hepáticas, incluindo shunts portossistêmicos.' }, { type: 'red', text: 'Alto teor de gordura: <strong>contraindicado</strong> para pacientes com hiperlipidemia, pancreatite ou risco de pancreatite.' } ] },
    { name: "Hill's Science Diet Cães Adultos Raças Grandes Frango", species: ['dog'], calories: 0, unit: 'g', protein: '21.0 - 24.5%', fat: '13.0 - 16.3%', indication: 'Cães adultos, raças grandes' },
    { name: "Hill's u/d (Úmido, Cães)", species: ['dog'], calories: 1.377, unit: 'g', protein: '4.1%', fat: '7.9%', indication: 'Dissolução de urólitos de urato e cistina.' },
    { name: "Hill's u/d Urinary Care (Seco, Cães)", species: ['dog'], calories: 3.98, unit: 'g', protein: '10.2%', fat: '18.8%', indication: 'Prevenção de cálculos de urato e cistina.', alerts: [ { type: 'green', text: 'Dieta de eleição para prevenção de cálculos de urato e cistina, comum em Dálmatas e Bulldogs.' }, { type: 'red', text: 'Proteína e purinas muito baixas. <strong>Não é uma dieta de manutenção geral</strong>. Risco de deficiência proteica se usada incorretamente.' } ] },
    { name: "Hill's z/d Food Sensitive (Seco, Cães)", species: ['dog'], calories: 3.534, unit: 'g', protein: '17.6%', fat: '14.4%', indication: 'Manejo de sensibilidades alimentares com proteína hidrolisada.', alerts: [ { type: 'green', text: 'Proteína altamente hidrolisada (ActivBiome+), excelente para dieta de eliminação e manejo de alergias alimentares severas.' } ] },
    { name: "Premier Gourmet Cães Carne (Sachê)", species: ['dog'], calories: 0.690, unit: 'sache', protein: '9.5%', fat: '0.7%', indication: 'Complemento alimentar, hidratação.' },
    { name: "Premier Gourmet Cães Salmão (Sachê)", species: ['dog'], calories: 0.603, unit: 'sache', protein: '8.5%', fat: '0.6%', indication: 'Complemento alimentar, hidratação.' },
    { name: "Premier Nutrição Clínica Hipoalergênico (Cães)", species: ['dog'], calories: 3.86, unit: 'g', protein: '22%', fat: '16%', indication: 'Manejo de sensibilidades alimentares.' },
    { name: "Premier Nutrição Clínica Obesidade (Cães)", species: ['dog'], calories: 3.0, unit: 'g', protein: '30%', fat: '8.5%', indication: 'Manejo da obesidade canina.' },
    { name: "Pro Plan HA Hydrolyzed (Seco, Cães)", species: ['dog'], calories: 3.750, unit: 'g', protein: '19.0%', fat: '11.0%', indication: 'Testes de eliminação, gastroenterite/dermatite alérgica, DII, pancreatite.' },
    { name: "Pro Plan HA Vegetarian (Seco, Cães)", species: ['dog'], calories: 3.695, unit: 'g', protein: '18.0%', fat: '8.0%', indication: 'Opção vegetariana para dieta de eliminação, DII, dermatite alérgica.' },
    { name: "Purina Pro Plan Reduced Calorie Cães Adultos", species: ['dog'], calories: 0, unit: 'g', protein: '26.0%', fat: '4.0 - 8.0%', indication: 'Cães adultos com sobrepeso' },
    { name: "Royal Canin Anallergenic (Seco, Cães)", species: ['dog'], calories: 3.741, unit: 'g', protein: '18.0%', fat: '16.5%', indication: 'Alergias alimentares severas (dermatológicas/gastrointestinais), DII, Dermatite Atópica Canina associada à AFR, testes de eliminação.', alerts: [ { type: 'green', text: 'Proteína de pena extensivamente hidrolisada. Padrão-ouro para os casos mais severos de alergia alimentar.' }, { type: 'red', text: '<strong>Contraindicado</strong> em casos de pancreatite, crescimento, gestação/lactação.' } ] },
    { name: "Royal Canin GI High Energy (Seco, Cães)", species: ['dog'], calories: 3.902, unit: 'g', protein: '23.0%', fat: '18.0%', indication: 'Distúrbios gastrointestinais, baixo peso.', alerts: [ { type: 'yellow', text: 'Alta energia e gordura. Não indicada para condições que exigem restrição de gordura como pancreatite.' } ] },
    { name: "Royal Canin GI Low Fat (Úmido, Cães)", species: ['dog'], calories: 0.895, unit: 'g', protein: '8.1%', fat: '1.7%', indication: 'Condições que requerem restrição de gordura (pancreatite).' },
    { name: "Royal Canin Hypoallergenic (Cães)", species: ['dog'], calories: 3.902, unit: 'g', protein: '21%', fat: '19%', indication: 'Manejo de reações adversas a alimentos.' },
    { name: "Royal Canin Medium Adult", species: ['dog'], calories: 0, unit: 'g', protein: '25.0%', fat: '14.0%', indication: 'Cães médios (acima de 12 meses, 11-25 kg)' },
    { name: "Royal Canin Mini Puppy", species: ['dog'], calories: 0, unit: 'g', protein: '31.0%', fat: '20.0%', indication: 'Filhotes de cães pequenos (2-10 meses, até 10 kg)' },
    { name: "Royal Canin Renal Support A (Seco, Cães)", species: ['dog'], calories: 3.868, unit: 'g', protein: '12.0%', fat: '16.0%', indication: 'Suporte à função renal crônica.' },
    { name: "Royal Canin Renal Support F (Cães)", species: ['dog'], calories: 3.779, unit: 'g', protein: '11.5%-15.5%', fat: '14%', indication: 'Suporte à função renal.' },
    { name: "Royal Canin Satiety Support (Cães)", species: ['dog'], calories: 2.956, unit: 'g', protein: '28%', fat: '7.5%-11.5%', indication: 'Controle de peso e saciedade.', alerts: [ { type: 'green', text: 'Alto teor de fibras promove grande saciedade, sendo muito eficaz para perda de peso.' }, { type: 'yellow', text: 'O alto teor de fibra pode causar constipação ou flatulência em alguns animais. A transição deve ser lenta.' } ] },
    { name: "Specific CDD-HY Food Allergen Management (Seco, Cães)", species: ['dog'], calories: 3.710, unit: 'g', protein: '22.8%', fat: '11.8%', indication: 'Intolerâncias/alergias alimentares, má absorção intestinal, IPE, dieta de exclusão.' },
    { name: "Support AIG Cães (pó)", species: ['dog'], calories: 4.96, unit: 'g', protein: 'N/I', fat: 'N/I', indication: 'Anorexia, convalescença, pós-operatório.', alerts: [ { type: 'yellow', text: 'Falta de transparência nos dados de Proteína Bruta (PB) e Extrato Etéreo (EE). Usar com cautela.' } ], dilution: {scoop_g: 11, water_ml: 20} },
    { name: "Virbac HPM Hypoallergy A2 (Seco, Cães)", species: ['dog'], calories: 3.770, unit: 'g', protein: '24.0%', fat: '18.0%', indication: 'Alergias/intolerâncias, distúrbios digestivos/cutâneos, dieta de eliminação.' },

    // --- Gatos ---
    { name: 'Royal Canin Indoor Adult', species: ['cat'], calories: 3.534, unit: 'g', protein: '27.0%', fat: '11.0 - 15.0%', indication: 'Gatos adultos de ambiente interno (1-7 anos)' },
    { name: 'Royal Canin Kitten', species: ['cat'], calories: 3.823, unit: 'g', protein: '34.0%', fat: '16.0%', indication: 'Filhotes (4 meses a 1 ano)' },
    { name: 'Royal Canin Sterilised 37', species: ['cat'], calories: 3.815, unit: 'g', protein: '35.0 - 37.0%', fat: '10.0 - 12.0%', indication: 'Gatos castrados (1-7 anos)' },
    { name: 'Premier Pet Gato Adulto Light', species: ['cat'], calories: 3.813, unit: 'g', protein: '41.0%', fat: '9.0%', indication: 'Gatos adultos com sobrepeso' },
    { name: 'Premier Pet Gatos Castrados 6 meses a 6 anos – Salmão', species: ['cat'], calories: 3.856, unit: 'g', protein: '38.0%', fat: '12.0%', indication: 'Gatos castrados (6 meses a 6 anos)' },
    { name: 'Premier Pet Golden Gatos Adultos Castrados Frango e Carne', species: ['cat'], calories: 3.750, unit: 'g', protein: '33.5%', fat: '9.5%', indication: 'Gatos castrados' },
    { name: 'Premier Pet Golden Gatos Adultos Frango', species: ['cat'], calories: 3.912, unit: 'g', protein: '36.0%', fat: 'N/A', indication: 'Gatos adultos' },
    { name: 'Hill\'s Science Diet Gatos Adulto Optimal Care Frango', species: ['cat'], calories: 4.025, unit: 'g', protein: '33.4 - 34.4%', fat: '21.4 - 22.2%', indication: 'Gatos adultos' },
    { name: 'Hill\'s Science Diet Gatos Filhotes Healthy Development Frango', species: ['cat'], calories: 4.076, unit: 'g', protein: '33.0 - 38.4%', fat: '19.0 - 25.4%', indication: 'Filhotes' },
    { name: 'Whiskas Gatos Adulto Carne Seca', species: ['cat'], calories: 3.730, unit: 'g', protein: '30.0%', fat: '9.0%', indication: 'Gatos adultos' },
    { name: 'Whiskas Gatos Adulto Peixe Seca', species: ['cat'], calories: 3.730, unit: 'g', protein: '30.0%', fat: '9.0%', indication: 'Gatos adultos' },
    { name: 'Purina Pro Plan Gatos Adulto Optiprebio Frango (Úmida)', species: ['cat'], calories: 0.950, unit: 'g', protein: '11.5%', fat: '3.0%', indication: 'Gatos adultos (úmida)' },
    { name: "Biofresh Gatos Castrados", species: ['cat'], calories: 3.81, unit: 'g', protein: '46%', fat: '12%', indication: 'Manutenção de peso para gatos castrados.' },
    { name: "Biofresh Gatos Filhotes", species: ['cat'], calories: 4.32, unit: 'g', protein: '44.0%', fat: '22.0%', indication: 'Crescimento e desenvolvimento saudável de filhotes.' },
    { name: "Fancy Feast Latas (Classic Patê)", species: ['cat'], calories: 1.08, unit: 'lata', protein: '11.0%', fat: '2.0%', indication: 'Alimento completo e balanceado, alta palatabilidade.' },
    { name: "Farmina N&D Prime (Frango e Romã)", species: ['cat'], calories: 3.569, unit: 'g', protein: '46.0%', fat: '11.0%', indication: 'Nutrição geral de alta qualidade.' },
    { name: "Farmina Vet Life Gastrointestinal (Úmido, Gatos)", species: ['cat'], calories: 1.222, unit: 'g', protein: '9.4%', fat: '5.7%', indication: 'Manejo de distúrbios gastrointestinais.' },
    { name: "Farmina Vet Life Obesity (Úmido, Gatos)", species: ['cat'], calories: 0.882, unit: 'g', protein: '12%', fat: '2.4%', indication: 'Perda de peso.' },
    { name: "Finotrato Cat Stix (média)", species: ['cat'], calories: 0.56, unit: 'g', protein: '5.8%', fat: '1.0%', indication: 'Complemento alimentar, alta palatabilidade.' },
    { name: "Formula Natural Vet Care Renal Gatos", species: ['cat'], calories: 4.1, unit: 'g', protein: '24%', fat: '18%', indication: 'Suporte à função renal.', alerts: [ { type: 'green', text: 'Fósforo e proteína controlados para auxiliar no manejo da Doença Renal Crônica (DRC).' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes, gestantes, lactantes e pacientes com depleção proteica.' } ] },
    { name: 'GranPlus Choice Gatos Adultos (Frango e Carne)', species: ['cat'], calories: 3.75, unit: 'g', protein: '36.0%', fat: '9.0%', indication: 'Equilíbrio nutricional, saúde urinária e intestinal.' },
    { name: "Guabi Natural Adulto Frango (Seco, Gatos)", species: ['cat'], calories: 4.150, unit: 'g', protein: '36.0%', fat: '17.0%', indication: 'Nutrição geral de alta qualidade, saúde intestinal e urinária.' },
    { name: "Guabi Natural Sachê Carne (Úmido, Gatos)", species: ['cat'], calories: 0.094, unit: 'sache', protein: '4.0%', fat: '0.5%', indication: 'Hidratação, palatabilidade, complemento alimentar.' },
    { name: "Hill's i/d (Seco, Gatos)", species: ['cat'], calories: 4.031, unit: 'g', protein: '36.8%', fat: '19.9%', indication: 'Distúrbios gastrointestinais, má digestão.', alerts: [ { type: 'green', text: 'Altamente digestível, excelente para a maioria dos distúrbios gastrointestinais agudos ou crônicos.' } ] },
    { name: "Hill's j/d (Seco, Gatos)", species: ['cat'], calories: 4.024, unit: 'g', protein: '32.0%', fat: '20.0%', indication: 'Suporte ao metabolismo das articulações (osteoartrite).' },
    { name: "Hill's k/d (Seco, Gatos)", species: ['cat'], calories: 3.811, unit: 'g', protein: '21.0%', fat: '15.0%', indication: 'Suporte à função renal crônica.' },
    { name: "Hill's k/d (Úmido, Gatos)", species: ['cat'], calories: 1.165, unit: 'g', protein: '7.8%', fat: '6%', indication: 'Suporte à função renal crônica.', alerts: [ { type: 'green', text: 'Auxilia na hidratação de pacientes renais e possui proteína e fósforo restritos para suportar a função renal.' }, { type: 'red', text: '<strong>Contraindicado</strong> para filhotes, gestantes e lactantes.' } ] },
    { name: "Hills Metabolic (Gatos)", species: ['cat'], calories: 3.476, unit: 'g', protein: '38.2%', fat: '12.8%', indication: 'Perda e manutenção de peso.', alerts: [ { type: 'green', text: 'Clinicamente comprovado para perda de peso segura, atuando no metabolismo individual do gato.' }, { type: 'yellow', text: 'A perda de peso em gatos deve ser lenta (0.5-1% do peso/semana) para evitar o risco de lipidose hepática.' } ] },
    { name: "Hiperkcal Nutricuper Cat (pó)", species: ['cat'], calories: 4.761, unit: 'g', protein: 'N/I', fat: 'N/I', indication: 'Suplemento hipercalórico para ganho de peso.', alerts: [ { type: 'yellow', text: 'Faltam dados de PB e EE. Usar com cautela, especialmente em pacientes com comorbidades.' } ], dilution: {scoop_g: 10, water_ml: 20} },
    { name: 'Inaba Churu (média)', species: ['cat'], calories: 0.44, unit: 'g', protein: '8.5%', fat: '0.5%', indication: 'Hidratação, agrado, administração de medicamentos.', alerts: [ { type: 'yellow', text: 'Não é um alimento completo. Use apenas como petisco ou para melhorar a palatabilidade de outras rações.' } ] },
    { name: 'Optimum Sachê (Salmão/Frango)', species: ['cat'], calories: 0.874, unit: 'sache', protein: '8.5%', fat: '3.0%', indication: 'Nutrição completa, absorção de nutrientes, controle de peso.' },
    { name: "Premier Gourmet Gatos Castrados (Sachê)", species: ['cat'], calories: 0.442, unit: 'sache', protein: '9.5%', fat: '0.2%', indication: 'Complemento alimentar, hidratação, saciedade.' },
    { name: "Premier Nutrição Clínica Renal (Seco, Gatos)", species: ['cat'], calories: 4.497, unit: 'g', protein: '24.0%', fat: '20.0%', indication: 'Auxílio no tratamento da doença renal crônica.' },
    { name: "Premier Nutrição Clínica Urinário (Seco, Gatos)", species: ['cat'], calories: 4.143, unit: 'g', protein: '25.0%', fat: '20.0%', indication: 'Auxílio na dissolução de cálculos de estruvita.', alerts: [ { type: 'green', text: 'Formulado para controle de pH urinário e dissolução de cálculos de estruvita.' }, { type: 'red', text: '<strong>Contraindicado</strong> para gatos com DRC, histórico de cálculos de oxalato, filhotes, gestantes/lactantes.' } ] },
    { name: 'Purina Pro Plan Gatos Castrados Optirenal Salmão', species: ['cat'], calories: 0, unit: 'g', protein: '40.0%', fat: '12.0 - 15.0%', indication: 'Gatos castrados' },
    { name: 'Purina Pro Plan Gatos Filhotes Optistart Frango', species: ['cat'], calories: 0, unit: 'g', protein: 'N/A', fat: 'N/A', indication: 'Filhotes' },
    { name: 'Quatree Life Gatos Castrados (Salmão)', species: ['cat'], calories: 3.77, unit: 'g', protein: 'N/A', fat: 'N/A', indication: 'Manutenção de peso para gatos castrados.' },
    { name: 'Quatree Supreme Gatos Castrados', species: ['cat'], calories: 3.82, unit: 'g', protein: '40%', fat: '12%', indication: 'Manutenção de peso para gatos castrados.' },
    { name: "Royal Canin Hypoallergenic (Gatos)", species: ['cat'], calories: 3.923, unit: 'g', protein: '25.5%', fat: '20%', indication: 'Manejo de reações adversas a alimentos.' },
    { name: 'Royal Canin Renal (Seca, Gatos)', species: ['cat'], calories: 3.953, unit: 'g', protein: '21.0%', fat: '15.0%', indication: 'Suporte à função renal crônica.' },
    { name: 'Royal Canin Renal (Úmida, Gatos)', species: ['cat'], calories: 1.277, unit: 'lata', protein: '6.0%', fat: '6.0%', indication: 'Suporte à função renal crônica.' },
    { name: "Royal Canin Satiety Support (Gatos)", species: ['cat'], calories: 2.956, unit: 'g', protein: '32%', fat: '8.6%-10%', indication: 'Controle de peso e saciedade.' },
    { name: 'Royal Canin Sterilised Loaf (Úmido, Gatos)', species: ['cat'], calories: 0.795, unit: 'g', protein: '9.0%', fat: '0.5%', indication: 'Manutenção do peso ideal e saúde urinária de gatos castrados.' },
    { name: "Royal Canin Urinary SO (Gatos)", species: ['cat'], calories: 3.659, unit: 'g', protein: '32.5%', fat: '13%', indication: 'Saúde urinária, dissolução de estruvita.', alerts: [ { type: 'green', text: 'Promove um ambiente urinário desfavorável à formação de cálculos de estruvita e oxalato de cálcio (Controle RSS).' }, { type: 'red', text: '<strong>Não utilizar</strong> em animais com doença renal crônica, insuficiência cardíaca, acidose metabólica ou durante crescimento, gestação e lactação.' } ] },
    { name: 'Whiskas Sachê Carne ao Molho (Úmida)', species: ['cat'], calories: 0, unit: 'sache', protein: '8.0%', fat: '3.0%', indication: 'Gatos adultos (úmida)' },
    { name: "Support AIG Gatos (pó)", species: ['cat'], calories: 4.96, unit: 'g', protein: 'N/I', fat: 'N/I', indication: 'Anorexia, convalescença, pós-operatório.', alerts: [ { type: 'yellow', text: 'Falta de transparência nos dados de Proteína Bruta (PB) e Extrato Etéreo (EE). Usar com cautela.' } ], dilution: {scoop_g: 11, water_ml: 20} },
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
            className="inline-flex items-center justify-center w-5 h-5 ml-2 text-sm font-bold text-primary-foreground bg-muted-foreground rounded-full cursor-pointer transition-colors hover:bg-foreground shrink-0"
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

    const isCritical = status.toLowerCase().includes('crítico') || status.toLowerCase().includes('hospitalizado');
    const sortedFoods = useMemo(() => 
        [...predefinedFoods]
        .filter(food => food.species.includes(species))
        .sort((a, b) => a.name.localeCompare(b.name)), 
    [species]);

    // --- EFFECTS ---
    useEffect(() => {
        setStatus('Adulto Castrado / Inativo');
        setFoodPrescriptionList([]);
        setPredefinedFoodIndex('');
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
                         <div className="text-center mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Plano e Prescrição Diária</h1>
                            <p className="mt-2 text-muted-foreground">Defina a meta, selecione o alimento e veja a quantidade diária.</p>
                        </div>

                        {!isCritical ? (
                        <div className="bg-muted p-6 rounded-lg mb-6 border border-border">
                            <h3 className="font-semibold text-foreground text-lg mb-4">1. Defina a Meta Nutricional</h3>
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
                        
                        <div className="bg-muted p-6 rounded-lg mb-6 border border-border">
                            <h3 className="font-semibold text-foreground text-lg mb-4">2. Selecione o Alimento</h3>
                            <div className="mb-4">
                                <label htmlFor="predefined-food-select" className="block text-sm font-medium text-foreground mb-2">Selecionar Alimento ({species === 'dog' ? 'Cães' : 'Gatos'})</label>
                                <select id="predefined-food-select" value={predefinedFoodIndex} onChange={handlePredefinedFoodChange} className="w-full p-3 bg-card border border-input rounded-lg text-foreground">
                                    <option value="">Selecione um alimento...</option>
                                    {sortedFoods.map((food, i) => <option key={`${food.name}-${food.calories ?? ""}-${i}`} value={i}>{food.name}</option>)}
                                </select>
                            </div>
                             {selectedFoodAlerts && selectedFoodAlerts.length > 0 && (
                                <div id="food-precaution-alert" className="mt-3 space-y-2">
                                    {selectedFoodAlerts.map((alert, alertIndex) => {
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
                            <div className="text-center my-2 text-sm text-muted-foreground">ou</div>
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
                                        const amount = (targetKcal > 0 && food.calories > 0) ? (targetKcal / food.calories).toFixed(1) : '0.0';
                                        
                                        return (
                                            <div key={foodKey} className="bg-card p-4 rounded-lg border border-border">
                                                <h4 className="font-bold text-foreground text-lg mb-3">{food.name}</h4>
                                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                                                    <span className="flex items-center text-md font-semibold text-blue-800">
                                                        {goalOptions.find(g => g.id === nutritionalGoal)?.label || 'Meta:'}
                                                        <HelpIcon term="foodAmount" onOpenModal={setModalContent} />
                                                    </span>
                                                    <strong className="text-xl font-bold text-blue-800">
                                                        {targetKcal > 0 ? `${amount} ${unitLabel}/dia` : 'Insira o peso ideal'}
                                                    </strong>
                                                </div>
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