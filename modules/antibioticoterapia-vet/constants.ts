import { ClassStyle, LifeStage, LifeStageKey, ComorbidityState } from './types';

export const NAME_ALIASES: { [key: string]: string } = {
  // Amoxicilina + Clavulanato variations
  'Amoxicilina-clavulanato': 'Amoxicilina + Clavulanato',
  'Amoxi-Clav': 'Amoxicilina + Clavulanato',
  'Amox Clav': 'Amoxicilina + Clavulanato',
  'Amoxi/Clav': 'Amoxicilina + Clavulanato',
  'Amoxicilina/Clavulanato': 'Amoxicilina + Clavulanato',
  'Amoxicilina-Clavulanato': 'Amoxicilina + Clavulanato',
  
  // Beta-lactam IV drugs
  'Cefazolina': 'Cefazolina (IV)',
  'Ampicilina': 'Ampicilina (IV)',
  
  // Piperacilina + Tazobactam variations
  'Piperacilina-tazobactam': 'Piperacilina + Tazobactam (IV)',
  'Piperacilina + Tazobactam': 'Piperacilina + Tazobactam (IV)',
  'Pip/Tazo': 'Piperacilina + Tazobactam (IV)',
  'Piperacilina/Tazobactam': 'Piperacilina + Tazobactam (IV)',
  
  // Ticarcilina variations
  'Ticarcilina-Clavulanato': 'Ticarcilina + Clavulanato (Tópico/IV)',
  'Ticarcilina/Clavulanato': 'Ticarcilina + Clavulanato (Tópico/IV)',
  
  // Fluoroquinolonas abbreviations
  'Cipro': 'Ciprofloxacina',
  'Enro': 'Enrofloxacina',
  'Marbo': 'Marbofloxacina',
  'Marboflox': 'Marbofloxacina',
  'Marbofloxacina': 'Marbofloxacina',
  'Enrofloxacina': 'Enrofloxacina',
  
  // Sulfonamidas variations
  'TMP-SMX': 'Trimetoprim + Sulfa',
  'TMP/SMX': 'Trimetoprim + Sulfa',
  'TMS': 'Trimetoprim + Sulfa',
  'Trimetoprim-Sulfonamida': 'Trimetoprim + Sulfa',
  'Trimetoprim + Sulfa': 'Trimetoprim + Sulfa',
  'Trimetoprim/Sulfa': 'Trimetoprim + Sulfa',
  'Sulfa': 'Trimetoprim + Sulfa',
  
  // Aminoglicosídeos
  'Gentamicina': 'Gentamicina (parenteral)',
  'Genta': 'Gentamicina (parenteral)',
  'Amicacina': 'Amicacina (parenteral)',
  'Tobramicina': 'Tobramicina',
  
  // Ampicilina + Sulbactam variations
  'Ampicilina/Sulbactam': 'Ampicilina + Sulbactam',
  'Ampi/Sulba': 'Ampicilina + Sulbactam',
  'Ampicilina + Sulbactam': 'Ampicilina + Sulbactam',
  'Ampicilina-Sulbactam': 'Ampicilina + Sulbactam',
  'Sulbactam': 'Ampicilina + Sulbactam',
  
  // Lincosamidas
  'Clindamicina': 'Clindamicina',
  'Clinda': 'Clindamicina',
  
  // Tetraciclinas
  'Doxiciclina': 'Doxiciclina',
  'Doxi': 'Doxiciclina',
  'Minociclina': 'Minociclina',
  'Oxitetraciclina': 'Oxitetraciclina',
  
  // Anaeróbios
  'Metronidazol': 'Metronidazol',
  'Metro': 'Metronidazol',
  
  // Macrolídeos
  'Azitromicina': 'Azitromicina',
  'Tilosina': 'Tilosina',
  
  // Cefalosporinas
  'Cefpodoxima': 'Cefpodoxima',
  'Cefalexina': 'Cefalexina',
  'Ceftriaxona': 'Ceftriaxona (IV)',
  'Ceftriaxona (IV)': 'Ceftriaxona (IV)',
  'Cefovecina': 'Cefovecina (Convenia®)',
  'Convenia': 'Cefovecina (Convenia®)',
  
  // Aliases específicos para os antibióticos mencionados
  'Cefalexina 22–30 mg/kg VO q8–12h por 14–21d': 'Cefalexina',
  'Amoxicilina/Clavulanato 12,5–25 mg/kg VO q12h': 'Amoxicilina + Clavulanato',
  'Cefpodoxima 5–10 mg/kg VO q24h': 'Cefpodoxima',
  'Clindamicina 5,5–10 mg/kg VO q12h': 'Clindamicina',
  
  // Anfenicóis  
  'Cloranfenicol': 'Cloranfenicol',
  'Florfenicol': 'Florfenicol',
  
  // Carbapenêmicos
  'Meropenem': 'Meropenem',
  'Imipenem-Cilastatina': 'Imipenem + Cilastatina',
  'Imipenem/Cilastatina': 'Imipenem + Cilastatina',
  
  // Others
  'Penicilina G': 'Penicilina G',
  'Cefoxitina': 'Cefoxitina',
  'Neomicina': 'Neomicina',
  'Atovaquona': 'Atovaquona',
  'Pirimetamina': 'Pirimetamina',
  'Decoquinato': 'Decoquinato',
  'Omeprazol': 'Omeprazol',
  'Ciclosporina': 'Ciclosporina',
  'Ciclosporina A': 'Ciclosporina',
  'Rifampicina': 'Rifampicina',
  'Rifampicina (IV)': 'Rifampicina',
  'Rifampicina (VO)': 'Rifampicina',
  'Fosfomicina': 'Fosfomicina',
  'Fosfomicina (IV)': 'Fosfomicina',
  'Fosfomicina (VO)': 'Fosfomicina',
  'Vancomicina': 'Vancomicina',
  'Vancomicina (IV)': 'Vancomicina',
  'Teicoplanina': 'Teicoplanina',
  'Teicoplanina (IV)': 'Teicoplanina',
  'Linezolida': 'Linezolida',
  'Linezolida (IV)': 'Linezolida',
  'Linezolida (VO)': 'Linezolida',
  'Daptomicina': 'Daptomicina',
  'Daptomicina (IV)': 'Daptomicina',
  'Tigeciclina': 'Tigeciclina',
  'Tigeciclina (IV)': 'Tigeciclina',
  'Colistina': 'Colistina',
  'Colistina (IV)': 'Colistina',
  'Colistina (VO)': 'Colistina',
  'Polimixina B': 'Polimixina B',
  'Polimixina B (IV)': 'Polimixina B',
  'Polimixina B (Tópico)': 'Polimixina B',
  'Bacitracina': 'Bacitracina',
  'Bacitracina (Tópico)': 'Bacitracina',
  'Ácido Fusídico': 'Ácido Fusídico',
  'Ácido Fusídico (Tópico)': 'Ácido Fusídico',
  'Ofloxacina': 'Ofloxacina',
  'Ofloxacina (Tópico)': 'Ofloxacina',
  'Ciprofloxacina': 'Ciprofloxacina',
  'Ciprofloxacina (Tópico)': 'Ciprofloxacina',
  'Norfloxacina': 'Norfloxacina',
  'Norfloxacina (Tópico)': 'Norfloxacina',
  'Levofloxacina': 'Levofloxacina',
  'Levofloxacina (Tópico)': 'Levofloxacina',
  'Moxifloxacina': 'Moxifloxacina',
  'Moxifloxacina (Tópico)': 'Moxifloxacina',
  'Eritromicina': 'Eritromicina',
  'Eritromicina (Tópico)': 'Eritromicina',
  'Roxitromicina': 'Roxitromicina',
  'Roxitromicina (Tópico)': 'Roxitromicina',
  'Espiramicina': 'Espiramicina',
  'Espiramicina (Tópico)': 'Espiramicina',
  'Tilmicosina': 'Tilmicosina',
  'Tilmicosina (Tópico)': 'Tilmicosina',
  'Gamitromicina': 'Gamitromicina',
  'Gamitromicina (Tópico)': 'Gamitromicina',
  'Tulatromicina': 'Tulatromicina',
  'Tulatromicina (Tópico)': 'Tulatromicina',
  'Tacrolimus': 'Tacrolimus',
  // Aliases adicionais para melhorar associação (apenas os que não existem)
  'Amox+Clav': 'Amoxicilina + Clavulanato',
  'Amoxi Clav': 'Amoxicilina + Clavulanato',
  'Ampi': 'Ampicilina (IV)',
  'Ampi+Sulba': 'Ampicilina + Sulbactam',
  'Ampi Sulba': 'Ampicilina + Sulbactam',
  'Ampicilina Sódica': 'Ampicilina (IV)',
  'Ampicilina Sodica': 'Ampicilina (IV)',
  'Pip+Tazo': 'Piperacilina + Tazobactam (IV)',
  'Pip Tazo': 'Piperacilina + Tazobactam (IV)',
  'Enroflox': 'Enrofloxacina',
  'Imipinem + Cilastatina': 'Imipenem + Cilastatina',
  'Imipinem-Cilastatina': 'Imipenem + Cilastatina',
  'Trimetropim + Sulfametoxazol': 'Trimetoprim + Sulfa',
  'Trimetropim/Sulfametoxazol': 'Trimetoprim + Sulfa',
  'Trimetropim-Sulfametoxazol': 'Trimetoprim + Sulfa',
  'Doxicic': 'Doxiciclina',
  'Clindamic': 'Clindamicina',
  'Metronid': 'Metronidazol',
  'Azitro': 'Azitromicina',
  'Azitromic': 'Azitromicina',
  'Cefalex': 'Cefalexina',
  'Cefpodo': 'Cefpodoxima',
  'Cefpodox': 'Cefpodoxima',
  'Cefaz': 'Cefazolina (IV)',
  'Ceftriax': 'Ceftriaxona (IV)',
  'Tobra': 'Tobramicina',
  'Tobramic': 'Tobramicina',
  'Cloram': 'Cloranfenicol',
  'Cloranfen': 'Cloranfenicol',
  'Tilos': 'Tilosina',
  'Oxitetra': 'Oxitetraciclina',
  'Oxitetracic': 'Oxitetraciclina',
  'Prado': 'Pradofloxacina',
  'Pradoflox': 'Pradofloxacina',
  'Minocic': 'Minociclina',
  'Claritro': 'Claritromicina',
  'Claritromic': 'Claritromicina',
  'Tetra': 'Tetraciclina',
  'Tetracic': 'Tetraciclina',
  'Pen G': 'Penicilina G',
  'Mero': 'Meropenem',
  'Meropen': 'Meropenem',
  'Imipenem': 'Imipenem-Cilastatina',
  'Cefox': 'Cefoxitina',
  'Amica': 'Amicacina',
  'Amicac': 'Amicacina',
  'Gent': 'Gentamicina (parenteral)',
  'Gentamic': 'Gentamicina (parenteral)',
  'Estrepto': 'Estreptomicina',
  'Estreptomic': 'Estreptomicina',
  'Neo': 'Neomicina',
  'Neomic': 'Neomicina',
  'Atova': 'Atovaquona',
  'Atovaqu': 'Atovaquona',
  'Pirimet': 'Pirimetamina',
  'Pirimetam': 'Pirimetamina',
  'Decoqui': 'Decoquinato',
  'Decoquin': 'Decoquinato',
  'Ome': 'Omeprazol',
  'Omepra': 'Omeprazol',
  'Ciclo': 'Ciclosporina',
  'Ciclospor': 'Ciclosporina',
  'Rifam': 'Rifampicina',
  'Rifampic': 'Rifampicina',
  'Fosfo': 'Fosfomicina',
  'Fosfomic': 'Fosfomicina',
  'Vanco': 'Vancomicina',
  'Vancomic': 'Vancomicina',
  'Teico': 'Teicoplanina',
  'Teicoplan': 'Teicoplanina',
  'Linez': 'Linezolida',
  'Linezol': 'Linezolida',
  'Dapto': 'Daptomicina',
  'Daptomic': 'Daptomicina',
  'Tige': 'Tigeciclina',
  'Tigecic': 'Tigeciclina',
  'Colist': 'Colistina',
  'Polimix': 'Polimixina B',
  'Bacitrac': 'Bacitracina',
  'Fusídico': 'Ácido Fusídico',
  'Oflox': 'Ofloxacina',
  'Ofloxac': 'Ofloxacina',
  'Ciproflox': 'Ciprofloxacina',
  'Norflox': 'Norfloxacina',
  'Norfloxac': 'Norfloxacina',
  'Levoflox': 'Levofloxacina',
  'Levofloxac': 'Levofloxacina',
  'Moxiflox': 'Moxifloxacina',
  'Moxifloxac': 'Moxifloxacina',
  'Eritro': 'Eritromicina',
  'Eritromic': 'Eritromicina',
  'Roxitro': 'Roxitromicina',
  'Roxitromic': 'Roxitromicina',
  'Espira': 'Espiramicina',
  'Espiramic': 'Espiramicina',
  'Tilmi': 'Tilmicosina',
  'Tilmic': 'Tilmicosina',
  'Gamitro': 'Gamitromicina',
  'Gamitromic': 'Gamitromicina',
  'Tulat': 'Tulatromicina',
  'Tulatromic': 'Tulatromicina',
  'Tacrol': 'Tacrolimus',
  // Aliases adicionais para resolver problemas de normalização
  'amoxi + clav': 'Amoxicilina + Clavulanato',
  'amoxi clav': 'Amoxicilina + Clavulanato',
  'amox clav': 'Amoxicilina + Clavulanato',
  'ampi + sulba': 'Ampicilina + Sulbactam',
  'ampi sulba': 'Ampicilina + Sulbactam',
  'pip + tazo': 'Piperacilina + Tazobactam (IV)',
  'pip tazo': 'Piperacilina + Tazobactam (IV)',
  'trimetoprim + sulfa': 'Trimetoprim + Sulfa',
  'trimetoprim sulfa': 'Trimetoprim + Sulfa',
  'tmp + sulfa': 'Trimetoprim + Sulfa',
  'tmp sulfa': 'Trimetoprim + Sulfa',
  'tms + sulfa': 'Trimetoprim + Sulfa',
  'tms sulfa': 'Trimetoprim + Sulfa'
};

export const DISEASE_ALIASES: { [key: string]: string } = {
  piometra: 'Piometra',
  pio: 'Piometra',
  piometrite: 'Piometra',
  sepse: 'Sepse (foco inicialmente não especificado)',
  choque: 'Sepse (foco inicialmente não especificado)',
  'choque septico': 'Sepse (foco inicialmente não especificado)',
  pneumonia: 'Pneumonia (suspeita clínica / radiológica)',
  pneumo: 'Pneumonia (suspeita clínica / radiológica)',
  pielonefrite: 'Pielonefrite',
  pyelonefrite: 'Pielonefrite',
  'itu alta': 'Pielonefrite',
  pielo: 'Pielonefrite',
};

export const CLASS_STYLE: { [key: string]: ClassStyle } = {
  penicilina: {emoji:'🧪', bg:'rgba(16,185,129,0.12)', border:'rgba(16,185,129,0.5)'},
  cefalosporina: {emoji:'🧫', bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.5)'},
  carbapenemico: {emoji:'🟣', bg:'rgba(139,92,246,0.12)', border:'rgba(139,92,246,0.5)'},
  fluoro: {emoji:'🔵', bg:'rgba(30,64,175,0.12)', border:'rgba(30,64,175,0.5)'},
  lincosamida: {emoji:'🟩', bg:'rgba(5,150,105,0.12)', border:'rgba(5,150,105,0.5)'},
  tetraciclina: {emoji:'🟥', bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.5)'},
  aminoglico: {emoji:'🟧', bg:'rgba(234,88,12,0.12)', border:'rgba(234,88,12,0.5)'},
  nitro: {emoji:'⚙️', bg:'rgba(107,114,128,0.12)', border:'rgba(107,114,128,0.5)'},
  sulfa: {emoji:'🌸', bg:'rgba(236,72,153,0.12)', border:'rgba(236,72,153,0.5)'},
  macrolideo: {emoji:'🟠', bg:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.5)'},
  anfenicol: {emoji:'👁️', bg:'rgba(100,116,139,0.12)', border:'rgba(100,116,139,0.5)'},
  glicopeptideo: {emoji:'⚕️', bg:'rgba(217, 70, 239, 0.12)', border:'rgba(217, 70, 239, 0.5)'},
  rifamicina: {emoji:'🧯', bg:'rgba(220, 38, 38, 0.12)', border:'rgba(220, 38, 38, 0.5)'},
  fosfonato: {emoji:'💧', bg:'rgba(14, 165, 233, 0.12)', border:'rgba(14, 165, 233, 0.5)'},
  imunossupressor: {emoji:'🛡️', bg:'rgba(168, 85, 247, 0.12)', border:'rgba(168, 85, 247, 0.5)'}
};

export const LIFE_STAGES: { [key in LifeStageKey]: LifeStage } = {
    filhote: {
      label:'Filhote', 
      warn:'⚠️ Fluoroquinolonas (risco de artropatia) e Tetraciclinas (manchas nos dentes) são contraindicadas.',
      warn_why: 'Artropatia por Fluoroquinolonas: O mecanismo proposto envolve a quelação de íons de magnésio na cartilagem, o que interfere na função das integrinas na superfície dos condrócitos. Essa disfunção prejudica a adesão celular, induz a apoptose (morte celular programada) e leva à degradação da matriz cartilaginosa, resultando em danos articulares permanentes.\n\nManchas por Tetraciclinas: As tetraciclinas quelam o cálcio e são depositadas de forma irreversível nos ossos e dentes em desenvolvimento (dentina e esmalte), causando uma coloração permanente (amarelo-marrom) e hipoplasia do esmalte.'
    },
    adulto: {label:'Adulto'},
    gestante: {
      label:'Gestante', 
      warn:'⚠️ Evitar Fluoroquinolonas, Tetraciclinas, Aminoglicosídeos e Metronidazol.',
      warn_why: 'O primeiro trimestre (organogênese) é o de maior risco para efeitos teratogênicos. Fármacos lipossolúveis e de baixo peso molecular atravessam a placenta mais facilmente. Beta-lactâmicos, macrolídeos e lincosamidas são geralmente considerados seguros.'
    },
    lactante: {
      label:'Lactante', 
      warn:'⚠️ Evitar Fluoroquinolonas e Tetraciclinas.',
      warn_why: 'Fármacos podem ser excretados no leite. Embora a dose transferida seja pequena, os sistemas metabólicos imaturos do neonato podem levar ao acúmulo. A segurança para a mãe e o filhote é crucial. Amoxicilina, amoxi-clav e cefalexina são consideradas seguras.'
    },
    idoso: {
      label:'Idoso', 
      warn:'ℹ️ Iniciar na ponta baixa do intervalo; considerar função renal/hepática.',
      warn_why: 'Animais geriátricos frequentemente apresentam um declínio gradual da função orgânica (depuração renal, capacidade metabólica hepática), alterando o manejo dos fármacos. Uma abordagem de "começar com dose baixa e progredir lentamente" é prudente.'
    }
  };

export const COMORB_HELP_TEXT = `##Ajuste em Insuficiência Renal##
-- [bg:yellow-100]Estratégia:[/bg] Para fármacos com eliminação renal (beta-lactâmicos, cefalosporinas, TMS), prefira manter a dose (mg/kg) e **estender o intervalo** (ex: q8h → q12-24h). Isso é adequado para fármacos tempo-dependentes com ampla margem de segurança.
-- [bg:red-100]Evitar:[/bg] **Aminoglicosídeos** são diretamente nefrotóxicos. Se o uso for inevitável, opte por dose única diária, garanta hidratação adequada e monitore a função renal (creatinina, urinálise seriada).

##Ajuste em Insuficiência Hepática##
-- [bg:yellow-100]Estratégia:[/bg] Inicie com a dose mais baixa do intervalo para fármacos com metabolismo hepático (clindamicina, doxiciclina, macrolídeos, metronidazol) e considere ampliar o intervalo.
-- [bg:red-100]Alerta:[/bg] Sinais neurológicos com metronidazol sugerem toxicidade e requerem suspensão ou redução da dose.

##Ajuste no Paciente Séptico##
-- [bg:yellow-100]Farmacocinética Alterada:[/bg] A sepse causa vasodilatação e extravasamento de fluidos, aumentando o volume de distribuição (Vd) de fármacos hidrofílicos. A ressuscitação com fluidos agrava essa diluição.
-- [bg:green-100]Estratégia:[/bg] Para beta-lactâmicos e aminoglicosídeos (hidrofílicos), considere uma **dose de ataque (~1.25-1.5x a dose padrão)** para atingir rapidamente concentrações terapêuticas. A **infusão contínua (CRI)** para beta-lactâmicos também é uma excelente estratégia para otimizar o parâmetro T>MIC. Reavaliar sempre com cultura e antibiograma.

##Ajuste no Cardiopata##
-- [bg:yellow-100]Estratégia:[/bg] Cuidado com o balanço hídrico e sobrecarga de sódio/potássio de preparações IV (e.g., penicilinas sódicas/potássicas, cefazolina sódica).
-- [bg:red-100]Alerta:[/bg] Alguns fármacos podem afetar a pressão arterial ou ter efeitos arritmogênicos (e.g., certas fluoroquinolonas). A avaliação de interações medicamentosas com a terapia cardíaca em curso é crucial.`;

export const COMORBIDITY_WARNINGS: { [key in keyof ComorbidityState]?: { [key: string]: string } } = {
  renal: {
    aminoglico: "NEFROTÓXICO. Evitar ou usar com extremo cuidado. Requer monitoramento rigoroso e hidratação.",
    glicopeptideo: "NEFROTÓXICO. Usar com extremo cuidado e monitoramento.",
    sulfa: "Risco de precipitação nos túbulos. Garantir hidratação e fluxo urinário. Ajustar intervalo.",
    penicilina: "Eliminação renal. Estender intervalo.",
    cefalosporina: "Eliminação renal. Estender intervalo.",
    carbapenemico: "Eliminação renal. Ajustar dose/intervalo.",
    fosfonato: "Nefrotóxico e fatal em gatos. Não usar em gatos."
  },
  hepatic: {
    anfenicol: "Metabolismo hepático. Risco de toxicidade aumentado. Ajustar dose/intervalo.",
    macrolideo: "Metabolismo hepático. Usar com cautela.",
    lincosamida: "Metabolismo hepático. Usar com cautela.",
    nitro: "Metabolismo hepático. Risco de neurotoxicidade aumentado. Ajustar dose.",
    rifamicina: "HEPATOTÓXICO. Evitar se possível. Monitorar enzimas rigorosamente."
  },
  septic: {
    penicilina: "Hidrofílico. Considerar dose de ataque (~1.25x) e/ou Infusão Contínua (CRI) para otimizar T>MIC.",
    cefalosporina: "Hidrofílico. Considerar dose de ataque (~1.25x) e/ou CRI.",
    carbapenemico: "Hidrofílico. Considerar dose de ataque (~1.25x) e/ou CRI.",
    aminoglico: "Hidrofílico. Considerar dose de ataque. Sepse já é um fator de risco para Lesão Renal Aguda, monitorar de perto."
  },
  cardiac: {
    fluoro: "Pradofloxacina tem advertência da FDA sobre arritmias em cães. Usar com cautela.",
    penicilina: "Preparações IV sódicas/potássicas (Ampicilina sódica, Penicilina G potássica) podem sobrecarregar pacientes com ICC. Usar com cautela.",
    cefalosporina: "Preparações IV sódicas (Cefazolina sódica) podem sobrecarregar pacientes com ICC."
  },
  neurological: {
    fluoro: "Comorbidade neurológica: cautela com fluoroquinolonas (risco de neuroexcitação); avaliar risco-benefício.",
  },
};