// ============================================================
// PROTOCOLS — Protocolos de tratamento por tipo de acidente
// ============================================================
import type { TreatmentProtocol } from '../types';

export const TREATMENT_PROTOCOLS: Record<string, TreatmentProtocol> = {
    'Acidente Botrópico': {
        accidentName: 'Acidente Botrópico',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: '<strong>Soro Antibotrópico (SAB):</strong> Essencial e urgente. Dose de 2 a 12 frascos IV, dependendo da gravidade.',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Fluidoterapia:</strong> Crucial para tratar o choque e proteger os rins. Iniciar com bolus de Ringer Lactato (10-20 mL/kg) se chocado, seguido de manutenção.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: '<strong>Opioides:</strong> A dor é intensa. Usar Metadona ou Morfina. 🚫 **NÃO USAR AINES**.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: 'Monitorar e tratar Lesão Renal Aguda (LRA) e infecções secundárias.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Tempo de Coagulação (TC), função renal (ureia/creatinina), pressão arterial e evolução do edema local.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: '🚫 **AINEs** são contraindicados pelo risco renal e hemorrágico.<br/>🚫 Torniquetes e incisões são proscritos.',
        },
        references: 'Ministério da Saúde, 2001; S.M. Mello, 2015',
    },
    'Acidente Crotálico': {
        accidentName: 'Acidente Crotálico',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: '<strong>Soro Anticrotálico (SAC):</strong> Essencial. Dose de 5 a 20 frascos IV, dependendo da gravidade.',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Fluidoterapia Agressiva:</strong> Fundamental para prevenir a LRA por mioglobina. Manter débito urinário > 2 mL/kg/h.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: 'Geralmente a dor não é proeminente. Analgésicos simples se necessário.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: '<strong>LRA:</strong> Pode necessitar de diuréticos (Manitol, Furosemida) ou diálise.<br/><strong>Insuficiência Respiratória:</strong> Preparar para intubação e ventilação mecânica.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'CPK (diário), função renal, estado neurológico e padrão respiratório.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: 'Evitar fármacos nefrotóxicos.',
        },
        references: 'Ministério da Saúde, 2001',
    },
    'Acidente Micrúrico ou Elapídico': {
        accidentName: 'Acidente Micrúrico ou Elapídico',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: '<strong>Soro Antielapídico (SAE):</strong> Administrar 10 frascos IV o mais rápido possível, mesmo na suspeita.',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Suporte Ventilatório:</strong> Prioridade máxima. Manter vias aéreas e estar pronto para intubação e ventilação mecânica.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: 'Dor local geralmente é discreta. Analgesia conforme necessário.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: '<strong>Anticolinesterásicos (Neostigmina):</strong> Podem ser usados como adjuvante para reverter a paralisia.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Estado neurológico, padrão respiratório (oximetria, capnografia).',
        },
        contraindications: {
            title: 'Contraindicações',
            content: 'Atraso na administração do soro ou no suporte ventilatório.',
        },
        references: 'Ministério da Saúde, 2001',
    },
    'Acidente Laquético': {
        accidentName: 'Acidente Laquético',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: '<strong>Soro Antilaquético (SAL) ou Antibotrópico-Laquético (SABL):</strong> Dose de 5 a 20 frascos IV.',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Atropina:</strong> Fundamental para reverter os efeitos vagais (bradicardia, hipotensão). Dose: 0.04 mg/kg IV ou IM.<br/><strong>Fluidoterapia Agressiva:</strong> Para manejar o choque misto.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: '<strong>Opioides:</strong> Para a dor local intensa.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: 'Choque refratário pode necessitar de aminas vasoativas.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Frequência cardíaca, pressão arterial, tempo de coagulação.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: 'Semelhante ao acidente botrópico, evitar AINEs.',
        },
        references: 'Ministério da Saúde, 2001',
    },
    'Loxoscelismo': {
        accidentName: 'Loxoscelismo',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: '<strong>Forma Visceral:</strong> Soro antiaracnídico/antiloxoscélico (5-10 frascos IV).',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Forma Cutânea:</strong> Corticoides (Prednisolona 1-2 mg/kg) nas primeiras 48h. Limpeza e debridamento tardio da necrose.<br/><strong>Forma Visceral:</strong> Terapia intensiva, fluidoterapia, transfusões de sangue.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: 'Analgésicos potentes, incluindo opioides.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: 'Lesão Renal Aguda secundária à hemoglobinúria.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Evolução da lesão cutânea, hemograma, função renal.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: '🚫 Debridamento cirúrgico precoce da lesão.',
        },
        references: 'Ministério da Saúde, 2017; Isbister & Fan, 2011',
    },
    'Foneutrismo': {
        accidentName: 'Foneutrismo',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: '<strong>Casos moderados/graves:</strong> Soro antiaracnídico (2-10 frascos IV).',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Casos leves:</strong> Anestesia local infiltrativa com lidocaína 2% sem vasoconstritor.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: 'A anestesia local é o pilar. Analgesia sistêmica se refratário.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: 'Edema agudo de pulmão (raro): tratar com diuréticos e oxigenioterapia.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Sinais vitais, especialmente em casos sistêmicos. Monitoramento cardíaco e respiratório.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: 'Nenhuma específica notável.',
        },
        references: 'Ministério da Saúde, 2001',
    },
    'Latrodectismo': {
        accidentName: 'Latrodectismo',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: '<strong>Soro antilatrodéctico:</strong> 1-2 frascos IV, geralmente com rápida melhora dos sintomas.',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Relaxantes musculares/ansiolíticos:</strong> Benzodiazepínicos (Diazepam 0.2-0.5 mg/kg IV) para controlar as contraturas.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: '<strong>Opioides:</strong> Analgesia potente é necessária para a dor muscular intensa.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: 'Hipertensão severa pode necessitar de anti-hipertensivos.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Pressão arterial, frequência cardíaca, grau de dor e contraturas musculares.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: 'Nenhuma específica notável.',
        },
        references: 'Ministério da Saúde, 2001',
    },
    'Escorpionismo': {
        accidentName: 'Escorpionismo',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: '<strong>Casos moderados/graves:</strong> Soro antiescorpiônico (2-6 frascos IV).',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Casos leves:</strong> Analgesia (Dipirona, Tramadol) e compressa morna local.<br/><strong>Casos graves:</strong> Suporte em UTI, com vasodilatadores (Prazosina), inotrópicos (Dobutamina) e ventilação mecânica se necessário.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: 'Analgesia escalonada, de dipirona a opioides.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: '<strong>Edema agudo de pulmão:</strong> Principal causa de morte, manejo cardiorrespiratório agressivo.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Sinais vitais, ECG, oximetria.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: 'Nenhuma específica notável.',
        },
        references: 'Ministério da Saúde, 2001',
    },
    'Envenenamento por Sapo': {
        accidentName: 'Envenenamento por Sapo',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: 'Não há soro específico. Em casos graves e refratários, pode-se considerar o uso de anticorpos antidigoxina (Digibind).',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Descontaminação:</strong> Lavar a boca abundantemente com água.<br/><strong>Suporte:</strong> Fluidoterapia IV (criteriosa), antieméticos (Maropitant), anticonvulsivantes (Diazepam).',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: 'Geralmente não é uma preocupação, o foco é na irritação oral e efeitos sistêmicos.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: '<strong>Arritmias cardíacas:</strong> Tratar com Lidocaína (ventriculares), Propranolol (supraventriculares) ou Atropina (bloqueios).',
        },
        monitoring: {
            title: 'Monitoramento',
            content: '<strong>ECG contínuo:</strong> Essencial para guiar a terapia antiarrítmica.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: 'Não induzir o vômito. Administrar fluidos com cautela em cardiopatas.',
        },
        references: 'Plumlee, K. H. (2004). Clinical veterinary toxicology.',
    },
    'Erucismo (Lonomismo)': {
        accidentName: 'Erucismo (Lonomismo)',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: '<strong>Soro Antilonômico (SALon):</strong> Essencial e único tratamento eficaz. Moderado: 5 frascos IV; Grave: 10 frascos IV.',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: 'Medidas de suporte para as hemorragias (transfusão de plasma fresco congelado ou sangue total) podem ser necessárias enquanto o soro não age.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: 'Analgésicos para a dor e queimação local.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: 'Lesão Renal Aguda por deposição de fibrina nos glomérulos.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Tempo de Coagulação (TC), TP, TTPA, fibrinogênio. Monitorar sinais de hemorragia.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: '🚫 Evitar fármacos que afetem a coagulação (AINEs, etc.).',
        },
        references: 'Ministério da Saúde, 2001',
    },
    'Apismo (Ataque Múltiplo)': {
        accidentName: 'Apismo (Ataque Múltiplo)',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: 'Não há soro específico para animais no Brasil.',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Remover os Ferrões:</strong> Raspar com um cartão, não pinçar.<br/><strong>Choque Anafilático:</strong> Adrenalina, anti-histamínicos, corticoides.<br/><strong>Envenenamento Tóxico:</strong> Fluidoterapia agressiva (4-6 mL/kg/h) para proteger os rins. Alcalinização da urina com bicarbonato de sódio pode ser útil.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: 'Opioides para a dor intensa das múltiplas picadas.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: 'Lesão Renal Aguda multifatorial (choque, nefrotoxicidade direta, mioglobinúria, hemoglobinúria).',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'CPK e AST (rabdomiólise), hemograma (hemólise), função renal.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: 'Nenhuma específica notável.',
        },
        references: 'Ferreira, F. M. S., et al. (2009). Multiple organ dysfunction syndrome in a dog after a massive attack of Africanized honeybees.',
    },
    'Envenenamento por Vespas': {
        accidentName: 'Envenenamento por Vespas',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: 'Não há soro específico.',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: 'O tratamento é de suporte e muito similar ao do envenenamento por abelhas, focando no manejo da anafilaxia (se presente) e da insuficiência renal com fluidoterapia agressiva.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: 'Analgésicos potentes (opioides) para a dor local.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: 'Lesão Renal Aguda, rabdomiólise e hemólise, similar às abelhas mas geralmente menos intenso.',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Função renal, CPK, hemograma.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: 'Nenhuma específica notável.',
        },
        references: 'Similar ao envenenamento por abelhas.',
    },
    'Angiostrongilose': {
        accidentName: 'Angiostrongilose',
        keyTherapy: {
            title: 'Terapia Essencial (Antiveneno)',
            content: 'Não aplicável (doença parasitária).',
        },
        supportiveCare: {
            title: 'Cuidados de Suporte',
            content: '<strong>Corticosteroides:</strong> Essencial para controlar a inflamação neurológica. Prednisolona 1-2 mg/kg/dia.<br/><strong>Anti-helmínticos:</strong> Administrados APÓS o início dos corticoides. Fenbendazol ou Moxidectina.',
        },
        painManagement: {
            title: 'Manejo da Dor',
            content: '<strong>Dor Neuropática:</strong> Gabapentina, Pregabalina, opioides.',
        },
        complications: {
            title: 'Manejo de Complicações',
            content: 'Paralisia requer cuidados de enfermagem intensivos (manejo de bexiga, prevenção de escaras).',
        },
        monitoring: {
            title: 'Monitoramento',
            content: 'Estado neurológico, grau de dor espinhal.',
        },
        contraindications: {
            title: 'Contraindicações',
            content: '🚫 Iniciar anti-helmínticos antes dos corticoides pode causar uma reação inflamatória fatal.',
        },
        references: 'Morgan, E. R. (2014). Angiostrongylus vasorum infection in dogs.',
    },
};

export const TREATMENT_TOPICS = Object.keys(TREATMENT_PROTOCOLS);
