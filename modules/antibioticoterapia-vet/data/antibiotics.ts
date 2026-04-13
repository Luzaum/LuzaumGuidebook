import { AntibioticClass } from '../types';

export const AB_SEED: AntibioticClass = {
  "β-Lactâmicos": [
    { 
      name: "Amoxicilina",
      spectrum: "Ativo contra Gram-positivos (Streptococcus spp.) e algumas Gram-negativas (e.g., Pasteurella). Muitas cepas de E. coli, Klebsiella e Staphylococcus são resistentes devido à produção de beta-lactamase.",
      dose_dog: "11-22 mg/kg VO q8-12h",
      dose_cat: "11-22 mg/kg VO q8-12h",
      indications: "Primeira linha para cistite bacteriana esporádica não complicada. Infecções do trato respiratório superior.",
      cautions: "A resistência é comum; Amoxicilina + Clavulanato é frequentemente preferível para cobertura empírica mais ampla.",
      mechanism: "Inibe a síntese da parede celular bacteriana. Ação bactericida e tempo-dependente.",
      prep_admin: "Disponível em comprimidos e suspensão oral. Administrar com ou sem alimento.",
      duration: "Cistite: 3-5 dias. Infecções de pele/tecidos moles: 7-14 dias.",
      contraindications: "Histórico de alergia a penicilinas.",
      adverse_effects: "Distúrbios gastrointestinais (vômito, diarreia) são os mais comuns."
    },
    { 
      name: "Amoxicilina + Clavulanato", 
      spectrum: "Espectro muito amplo semelhante à ampicilina/sulbactam: Gram+ (incl. Staphylococcus penicilinase+), Gram− (muitas E. coli, Klebsiella, Proteus) e anaeróbios (boca, pele, intestinais). Não atua em Pseudomonas, MRSP e alguns Enterobacter.",
      dose_dog: "12.5–25 mg/kg VO q12h (alguns regimes: 25 mg/kg q24h)",
      dose_cat: "12.5–25 mg/kg VO q12h",
      indications: "Primeira linha ambulatorial para infecções de pele/tecidos moles, feridas de mordedura (cães e gatos), otites bacterianas (Staph/Pasteurella), infecções dentárias, cistites (falha de amoxi simples), piodermites e pneumonia comunitária leve/moderada.",
      cautions: "Uso empírico excessivo contribui para resistência. Preferir cultura em casos recorrentes. Considerado fármaco de segunda linha em stewardship.",
      mechanism: "Amoxi: inibe parede celular (PBPs). Clavulanato: inibidor suicida de β‑lactamases. Bactericida tempo‑dependente.",
      prep_admin: "Comprimidos ou suspensão oral. Administrar com alimento para reduzir náusea. Suspensão reconstituída: refrigerar e usar em ~10 dias.",
      duration: "7–14 dias tipicamente; piodermite profunda 3–6 sem; ITU simples 7–14 d (3–5 d em protocolos específicos); osteomielite até 6 sem.",
      contraindications: "Alergia a penicilinas/cefalosporinas. Cautela em animais com histórico de reação a ampicilina/cefalosporina.",
      adverse_effects: "GI comum (diarreia/fezes moles – principalmente por clavulanato), náuseas/vômitos (dar com comida). Rara elevação transitória de transaminases; hipersensibilidade possível."
    },
    {
      name: "Ampicilina (IV)",
      spectrum: "Gram+ aeróbios (estreptococos, enterococos), alguns Gram− (Pasteurella, E. coli, Proteus, Salmonella suscetíveis) e alguns anaeróbios bucais (fraco).",
      dose_dog: "10–20 mg/kg IM/SC q8–6h; 20–22 mg/kg PO q8–6h; IV 20–22 mg/kg q8h",
      dose_cat: "10–20 mg/kg IM/SC q6h; 20–22 mg/kg PO q8–6h; IV 20–22 mg/kg q8h",
      indications: "Infecções por Streptococcus (dermatite, feridas), profilaxia cirúrgica (alternativa à cefazolina), ITU simples (algumas E. coli), leptospirose (IV na fase aguda). Geralmente preferir versões com inibidor de β‑lactamase para cobertura mais ampla.",
      cautions: "Uso hospitalar. Preferir amoxi/clav ou ampi/sulba em infecções polimicrobianas.",
      mechanism: "Bactericida tempo‑dependente; liga PBPs e bloqueia a transpeptidação do peptidoglicano.",
      prep_admin: "Pó injetável (sódica): reconstituir frasco de 1000 mg com 5 mL de SF 0,9% ou API (≈200 mg/mL). Usar em até 1 h (instável) ou até 24 h refrigerado a 2–8°C.",
      infusion: "Diluir na seringa na proporção 1:2–1:3; administrar em 3–5 min, em acesso próprio e isolado. Aplicação SC não indicada (risco de necrose). NÃO INFUNDIR em extensor com RL; evitar glicose e API – usar APENAS 0,9%.",
      duration: "5–7 dias (infecções leves); 7–14 dias na maioria; até 21 dias em casos específicos. Continuar 48–72 h após cessar sinais. Suspender/trocar se sem melhora em 48–72 h (preferir cultura).",
      contraindications: "Alergia a penicilinas; cautela em coelhos/herbívoros pequenos (via oral pode ser fatal por disbiose); IR: alongar intervalos.",
      adverse_effects: "TGI (vômito/diarreia), dor IM, hipersensibilidade rara; risco de flebite IV."
    },
    {
      name: "Ampicilina + Sulbactam",
      spectrum: "Amplo: Gram+ (estrepto, estafilo não‑MR), Gram− produtores de penicilinase (E. coli, Klebsiella, Proteus) e excelente contra anaeróbios (Bacteroides). Não cobre Pseudomonas ou MRSA/MRSP.",
      dose_dog: "22–30 mg/kg IV/IM/SC q8–6h",
      dose_cat: "22–30 mg/kg IV/IM/SC q8–6h",
      indications: "Infecções polimicrobianas graves: sepse abdominal, pneumonia aspirativa, feridas de mordedura, celulite necrosante; terapia empírica IV em UTI.",
      cautions: "Ajustar em IR severa. Evitar se história de reação grave a amoxi/clav.",
      mechanism: "Ampicilina: inibe parede celular; Sulbactam: inativa β‑lactamases → sinergismo bactericida.",
      prep_admin: "Reconstituir com SF 0,9% ou API. 1500 mg: adicionar 3,2 mL (≈375 mg/mL). 3000 mg: 6,4 mL (≈375 mg/mL). Estável 72 h refrigerado; 8 h sem refrigeração; se diluído na seringa em 0,9% usar em 1 h.",
      infusion: "Para pequenos pacientes: diluir 1:2–1:3 com 0,9%. Preferir CRI em UTI/sepse para otimizar fT>MIC. NÃO DILUIR em RL, glicose ou API.",
      duration: "Sepse 7–14 d (depois VO); pneumonias 10–14 d; profilaxia cirúrgica: 1–2 doses perioperatórias.",
      contraindications: "Alergia a penicilinas. Cautela em IR severa.",
      adverse_effects: "Sem toxicidades únicas; IM pode ser doloroso. Possível diarreia e superinfecção fúngica >2 sem; reações alérgicas raras."
    },
    {
      name: "Cefadroxil",
      spectrum: "Forte atividade contra Gram-positivos (Staphylococcus spp., Streptococcus spp.) e atividade moderada contra alguns Gram-negativos (E. coli, Proteus mirabilis). Equivalente à cefalexina.",
      dose_dog: "20-30 mg/kg PO q12-24h",
      dose_cat: "20-30 mg/kg PO q12-24h",
      indications: "Infeções cutâneas (piodermites, feridas), ITU não complicadas, pneumonias bacterianas, osteomielite.",
      cautions: "Usar com cautela em pacientes com doença renal. Risco de sensibilidade cruzada com penicilinas. Cautela com outros fármacos nefrotóxicos (aminoglicosídeos).",
      mechanism: "Inibe a síntese da parede celular bacteriana. Ação bactericida e tempo-dependente.",
      prep_admin: "Comprimidos e suspensão oral. Administrar com ou sem alimentos; com comida para reduzir o vómito.",
      duration: "Deve ser continuado durante todo o período prescrito.",
      contraindications: "Hipersensibilidade a cefalosporinas ou penicilinas.",
      adverse_effects: "Gastrointestinais: Vómito (mais comum), diarreia, diminuição do apetite. Reações de hipersensibilidade são raras."
    },
    {
      name: "Cefalexina",
      spectrum: "Cefalosporina de 1ª Geração. Excelente atividade contra Gram-positivos (Staphylococcus, Streptococcus). Atividade moderada contra algumas Gram-negativas (E. coli, Klebsiella, Proteus).",
      dose_dog: "22-30 mg/kg VO q8-12h",
      dose_cat: "22-30 mg/kg VO q8-12h",
      indications: "Primeira linha para piodermites superficiais e profundas. Infecções de tecidos moles e cistite bacteriana.",
      cautions: "Pode haver reatividade cruzada em pacientes alérgicos à penicilina (~10%).",
      mechanism: "Inibe a síntese da parede celular bacteriana. Ação bactericida e tempo-dependente.",
      prep_admin: "Comprimidos e suspensão oral. Administrar com ou sem alimento; dar com comida pode reduzir náuseas.",
      duration: "Piodermite superficial: 3-4 semanas. Piodermite profunda: 4-8 semanas. Continuar por 7 dias (superficial) ou 14 dias (profunda) após resolução clínica.",
      contraindications: "Alergia conhecida a cefalosporinas.",
      adverse_effects: "Vômito, diarreia e anorexia são os mais comuns."
    },
    {
      name: "Cefazolina (IV)",
      spectrum: "Excelente Gram+ (cocos); moderado Gram− (não cobre Pseudomonas). Boas concentrações teciduais.",
      dose_dog: "22 mg/kg IV q8h",
      dose_cat: "20–22 mg/kg IV q8h",
      indications: "Profilaxia cirúrgica de escolha (limpas/ortopédicas). Infecções graves de pele/ossos por Staph suscetível.",
      cautions: "",
      mechanism: "Inibe síntese da parede celular (PBPs) → bactericida tempo‑dependente.",
      prep_admin: "Frasco 1000 mg: adicionar 10 mL de API → 100 mg/mL. Estável 10 d refrigerado (≈5°C) e 24 h à TA (20–25°C). Para IM usar concentração de 350 mg/mL. Reconstituir em API e infundir/flush com 0,9%.",
      infusion: "Pequenos pacientes: diluir dose 1:2–1:3 em 0,9% e infundir em 3–5 min lentamente. Em UTI/sepse, CRI em acesso isolado pode reduzir flebite e otimizar fT>MIC.",
      duration: "Profilaxia: 1 dose pré‑incisão + repetir a cada 90–120 min se cirurgia longa; não manter pós‑op sem infecção. Terapêutica: 5–10 d IV ou até melhora, depois VO (ex.: cefalexina) para completar 2–4 sem.",
      contraindications: "Alergia a cefalosporina/penicilina.",
      adverse_effects: "IM doloroso; IV pode causar flebite se concentrado. Raro: alergia; GI menos comum que orais."
    },
    {
      name: "Cefpodoxima",
      spectrum: "Cefalosporina oral de 3ª geração. Boa atividade contra Staphylococcus e Streptococcus, e melhor cobertura contra Gram-negativos (E. coli, Klebsiella, Proteus) que cefalosporinas de 1ª geração.",
      dose_dog: "5-10 mg/kg VO q24h",
      dose_cat: "5-10 mg/kg VO q24h",
      indications: "Infecções de pele e tecidos moles, especialmente piodermites. Infecções do trato urinário. Considerada de segunda linha.",
      cautions: "Uso deve ser justificado para evitar seleção de resistência (e.g., E. coli produtora de ESBL).",
      mechanism: "Inibe a síntese da parede celular bacteriana. Bactericida tempo-dependente.",
      prep_admin: "Comprimidos. Administração com alimentos pode aumentar a absorção.",
      duration: "Semelhante à cefalexina, dependendo da indicação.",
      contraindications: "Alergia a cefalosporinas.",
      adverse_effects: "Geralmente bem tolerado. Distúrbios gastrointestinais podem ocorrer."
    },
    {
      name: "Ceftazidima (IV/IM/SC)",
      spectrum: "Potente atividade contra Pseudomonas aeruginosa e outras bactérias Gram-negativas multirresistentes (Enterobacterales). Atividade fraca contra Gram-positivos.",
      dose_dog: "20-30 mg/kg IV/IM/SC q4-8h OU CRI: 4.4 mg/kg IV (ataque), depois 4.1 mg/kg/h.",
      dose_cat: "Dados de dosagem específicos limitados; usar com cautela.",
      indications: "Reservado para infeções graves e documentadas por P. aeruginosa ou outros bacilos Gram-negativos multirresistentes (pneumonia, septicemia, ITU complicada, osteomielite, otite média/interna).",
      cautions: "A meia-vida curta (~1h em cães) torna a dosagem infrequente (q12-24h) ineficaz. A CRI é o método ideal. Uso deve ser guiado por cultura.",
      mechanism: "Cefalosporina de 3ª geração que inibe a síntese da parede celular. Estável contra muitas beta-lactamases de Gram-negativos.",
      prep_admin: "Pó estéril para reconstituição. Para CRI, pode ser diluído em SF 0.9% para 10 mg/mL (estável 24h em temp. ambiente, 7 dias refrigerado).",
      infusion: "CRI é o método de administração ideal para maximizar a eficácia tempo-dependente. A dosagem intermitente deve ser muito frequente (a cada 4 a 8 horas).",
      infusion_why: "A meia-vida de eliminação de apenas 1 hora em cães torna regimes de dosagem convenientes (a cada 12 ou 24 horas) clinicamente ineficazes para o tratamento de infeções por P. aeruginosa, levando a falha terapêutica e seleção de resistência.",
      duration: "Depende da gravidade, cronicidade e localização da infeção.",
      contraindications: "Hipersensibilidade a cefalosporinas ou penicilinas.",
      adverse_effects: "Geralmente bem tolerado. Vómito e diarreia foram observados. A injeção IM pode ser dolorosa."
    },
    {
      name: "Ceftriaxona (IV)",
      spectrum: "Amplo: Gram− (Enterobacterales, Haemophilus), Gram+ (estrepto, estafilo MSSA); Borrelia; cruza BHE. Não cobre MRSA/MRSP, Pseudomonas, Enterobacter, anaeróbios resistentes.",
      dose_dog: "25–50 mg/kg IV/IM q24h",
      dose_cat: "25–50 mg/kg IV/IM q24h",
      indications: "Meningite bacteriana (excelente penetração no líquor). Sepse/pneumonias por Gram− susceptíveis. Em combinação com metronidazol para peritonite séptica.",
      cautions: "",
      mechanism: "Cefalosporina 3ª geração, bactericida tempo‑dependente; estável frente à maioria das β‑lactamases de Gram−.",
      prep_admin: "Frasco 1000 mg: 1 g + 10 mL de API → 100 mg/mL. Após diluir em 0,9%: 3 d refrigerado (2–8°C) ou 24 h à TA. IM: diluir para ≈280 mg/mL com 3,5 mL de API. NÃO reconstituir/infundir com RL. Lavar o extensor com 0,9% antes/depois.",
      infusion: "Pequenos pacientes: diluir 1:2–1:3 em 0,9% e administrar como bolus lento. Em UTI/sepse, considerar infusão prolongada/CRI para otimizar fT>MIC.",
      infusion_why: "Nunca coadministrar com soluções contendo cálcio (ex.: RL) → risco de precipitado ceftriaxona‑cálcio e embolia potencialmente fatal.",
      duration: "Meningite 3–4 sem; sepse grave 7–10 d; descalonar para VO quando possível.",
      contraindications: "Alergia a penicilinas/cefalosporinas. Cautela em neonatos (icterícia, precipitação com cálcio).",
      adverse_effects: "Reação local (dor IM, flebite IV), diarreia/colite, pseudolitíase biliar em terapia prolongada."
    },
    {
      name: "Cefovecina (Convenia®)",
      spectrum: "Amplo espectro contra Gram-positivos (Staphylococcus, Streptococcus) e Gram-negativos (E. coli, Pasteurella, Proteus). Inerentemente resistente a Pseudomonas e Enterococcus.",
      dose_dog: "8 mg/kg (1 mL/10 kg) SC, dose única. Pode repetir após 14 dias (máx. 2 doses).",
      dose_cat: "8 mg/kg (1 mL/10 kg) SC, dose única. Pode repetir após 14 dias.",
      indications: "Infeções de pele e tecidos moles (piodermite, abcessos, feridas) e ITU, especialmente quando a adesão do proprietário é um problema.",
      cautions: "A 'faca de dois gumes': meia-vida extremamente longa (~5.5d em cães, ~6.9d em gatos; 65 dias para depuração) torna reações adversas graves (IMHA, neutropenia) muito difíceis de manejar. Pode competir com outros fármacos de alta ligação proteica (AINEs, furosemida).",
      mechanism: "Cefalosporina de 3ª geração de ação prolongada. Inibe a síntese da parede celular. Alta ligação a proteínas plasmáticas (>96%) funciona como um reservatório.",
      prep_admin: "Pó liofilizado para reconstituição com 10 mL de água estéril (80 mg/mL). Estável por 56 dias sob refrigeração e protegido da luz. Exclusivamente para injeção subcutânea (SC).",
      duration: "Uma única injeção fornece um curso terapêutico de até 14 dias.",
      contraindications: "Hipersensibilidade a cefalosporinas/penicilinas. Não usar em animais <4 meses (EUA) ou <8 semanas (UE), gestantes, lactantes ou reprodutores. Não usar em pequenos herbívoros.",
      adverse_effects: "Gastrointestinais (vómitos, diarreia, letargia), reações no local da injeção. Raros relatos de anafilaxia e mielotoxicidade grave."
    },
    {
      name: "Piperacilina + Tazobactam (IV)",
      spectrum: "Espectro muito amplo. Cobre Gram-positivos, a maioria das enterobactérias Gram-negativas (incluindo produtoras de ESBL), Pseudomonas aeruginosa e anaeróbios.",
      dose_dog: "67.5 mg/kg (combinado) IV q8h",
      dose_cat: "80-100 mg/kg (combinado) IV q8h",
      indications: "Reservado para infecções graves, polimicrobianas e por bactérias multirresistentes, como peritonite séptica e sepse de origem desconhecida. Uso idealmente guiado por cultura.",
      cautions: "Deve ser reservado para evitar o desenvolvimento de resistência.",
      mechanism: "A piperacilina (penicilina de espectro estendido) inibe a síntese da parede celular. O tazobactam é um inibidor de beta-lactamase.",
      prep_admin: "Pó para solução injetável. Reconstituir e diluir em SF 0.9%.",
      infusion: "Administrar como infusão IV lenta ao longo de 20-30 minutos.",
      duration: "Depende da infecção, geralmente 7-14 dias para infecções graves.",
      contraindications: "Alergia a penicilinas, cefalosporinas ou carbapenêmicos.",
      adverse_effects: "Geralmente bem tolerado. Flebite no local da injeção, distúrbios GI. Pode causar trombocitopenia com uso prolongado."
    },
    {
      name: "Ticarcilina + Clavulanato (Tópico/IV)",
      spectrum: "Amplo espectro com atividade contra Pseudomonas aeruginosa. Também cobre outros Gram-negativos, Gram-positivos e anaeróbios.",
      dose_dog: "Uso sistémico: 15-25 mg/kg IV q8h. Uso tópico (otite): não padronizado, instilar no canal auditivo.",
      dose_cat: "Uso sistémico: 15-25 mg/kg IV q8h.",
      indications: "Principal indicação: tratamento tópico de otite externa por P. aeruginosa. Uso sistémico controverso para infecções graves por outras bactérias suscetíveis.",
      cautions: "Antagonismo contra P. aeruginosa em uso sistémico: o clavulanato induz a enzima AmpC, que destrói a ticarcilina. Para infeções sistémicas por P. aeruginosa, preferir Piperacilina-Tazobactam. A principal utilidade é TÓPICA.",
      mechanism: "A ticarcilina inibe a síntese da parede celular. O ácido clavulânico inibe as beta-lactamases. Bactericida tempo-dependente.",
      prep_admin: "Pó para injeção. Pode ser reconstituído para uso tópico e congelado em alíquotas.",
      duration: "Tópico (otite): prolongado, 14-36 dias. Sistémico: 10-14 dias.",
      contraindications: "Hipersensibilidade a penicilinas.",
      adverse_effects: "Reações de hipersensibilidade. O uso tópico é geralmente bem tolerado."
    }
  ],
  "Carbapenêmicos": [
    {
      name: "Meropenem",
      spectrum: "Cobertura extremamente ampla contra Gram-positivos (Staph MSSA, Strep, Enterococcus faecalis), Gram-negativos (incl. Pseudomonas e Enterobacterales produtoras de ESBL) e a maioria dos anaeróbios. Não cobre MRSA/MRSP e E. faecium.",
      dose_dog: "24 mg/kg IV q8–12h",
      dose_cat: "8–10 mg/kg IV q8h",
      indications: "Fármaco de última linha (terceira linha) para infecções graves e documentadas por bactérias multirresistentes. Uso deve ser guiado por cultura e antibiograma. Indicado para neutropenia febril.",
      cautions: "Uso restrito para evitar seleção de resistência a carbapenêmicos (carbapenemases).",
      mechanism: "Agente beta-lactâmico bactericida, tempo-dependente, com espectro de ação excepcionalmente amplo. Altamente resistente à maioria das beta-lactamases, incluindo ESBLs.",
      prep_admin: "Frascos 500 mg (diluir em 10 mL API → 50 mg/mL) ou 1000 mg (10 mL API → 100 mg/mL). NUNCA usar RL ou glicosado.",
      infusion: "Diluir na seringa 1:3 em 0,9% para pequenos pacientes. Pode bolus lento (≥15 min), idealmente CRI/infusão de 3 h (tempo‑dependente).",
      infusion_why: "Incompatível com RL/glicose (precipitação e perda de potência).",
      duration: "Cursos curtos (5-14 dias) são preferíveis. Osteomielite: 3-4 semanas.",
      contraindications: "Hipersensibilidade a outros beta-lactâmicos.",
      adverse_effects: "Geralmente bem tolerado. Reações no local da infusão (flebite) e distúrbios GI. Neurotoxicidade (convulsões) é rara, risco menor em comparação com imipenem."
    },
    {
      name: "Imipenem + Cilastatina",
      spectrum: "Semelhante ao meropenem, com excelente cobertura para Gram-positivos, Gram-negativos e anaeróbios. Não cobre MRSA/MRSP.",
      dose_dog: "5–10 mg/kg IV q8h",
      dose_cat: "3–8 mg/kg IV q8h",
      indications: "Reservado para infecções por patógenos resistentes, quando a cultura indica sensibilidade. Meropenem é preferido devido ao perfil de segurança superior.",
      cautions: "Uso restrito (terceira linha). Maior potencial neurotóxico que o meropenem.",
      mechanism: "O imipenem inibe a síntese da parede celular. A cilastatina inibe a enzima deidropeptidase-I nos túbulos renais, que inativaria o imipenem, aumentando sua concentração urinária e meia-vida.",
      prep_admin: "Frasco 500 mg (diluir em 10 mL de API → 50 mg/mL). NÃO usar RL nem glicosado.",
      infusion: "Diluir 1:3 em 0,9% para pequenos pacientes. Não pode bolus rápido; infundir 20–60 min. Idealmente CRI por ser tempo‑dependente. NÃO fazer SC (irritante).",
      duration: "Semelhante ao meropenem, preferência por terapias curtas (5-14 dias).",
      contraindications: "Semelhantes ao meropenem. Usar com extrema cautela em pacientes com distúrbios do SNC ou insuficiência renal.",
      adverse_effects: "Náuseas e vômitos são mais comuns, especialmente com infusão rápida. Principal risco é a neurotoxicidade (convulsões)."
    }
  ],
  "Fluoroquinolonas": [
    {
      name: "Enrofloxacina",
      spectrum: "Excelente atividade contra a maioria das bactérias Gram-negativas. Atividade variável contra Gram-positivos. Não indicada para infecções por Streptococcus e possui fraca atividade contra anaeróbios.",
      dose_dog: "5–20 mg/kg q24h",
      dose_cat: "≤5 mg/kg q24h",
      indications: "Pielonefrite, prostatite, piodermites profundas, otites por Gram-negativos e pneumonias graves. Deve ser reservada como terapia de segunda linha, idealmente baseada em cultura.",
      cautions: "Fármaco de importância crítica; uso excessivo promove resistência. NUNCA exceder 5 mg/kg/dia em gatos.",
      mechanism: "Bactericida concentração-dependente que inibe a DNA girase (Gram-) e a topoisomerase IV (Gram+), bloqueando a replicação do DNA bacteriano.",
      prep_admin: "Oral e injetável. Administração oral não deve ser feita com alimentos, laticínios ou antiácidos (cálcio, magnésio, alumínio) pois quelam a droga e reduzem sua absorção.",
      infusion: "Injeção IV deve ser lenta (mínimo de 5-10 min em cães) e diluída em SF 0.9% para evitar colapso vascular. Em gatos, a infusão deve ser ainda mais lenta (30-45 min). IM não indicada (necrose por pH alcalino). NUNCA DILUIR em RL ou soluções glicosadas.",
      duration: "5-14 dias para infecções agudas. Osteomielite: 4-6 semanas.",
      contraindications: "Absolutamente contraindicada em animais em crescimento (filhotes) devido ao risco de artropatia (cães <8-18 meses). Contraindicada em gestantes.",
      adverse_effects: "Condrotoxicidade (dano à cartilagem articular) em animais jovens. Em gatos, doses >5 mg/kg/dia estão associadas a degeneração retiniana aguda e cegueira irreversível. Usar com extrema cautela em gatos com doença renal ou hepática. Efeitos GI e, raramente, neurotoxicidade (convulsões)."
    },
    {
      name: "Ciprofloxacina",
      spectrum: "Gram−, algumas Gram+. Não indicada para Streptococcus; fraca para anaeróbios.",
      dose_dog: "25–30 mg/kg VO q24–12h; oftálmico 0,3%: 1 gota/olho q6–8h",
      dose_cat: "20 mg/kg VO q24h; oftálmico 0,3%: 1 gota/olho q6–8h",
      indications: "Principalmente uso oftálmico (0,3%) em conjuntivite/ceratite bacteriana. Uso sistêmico para ITU e outras infecções por Gram− quando indicado.",
      cautions: "Mesmas das fluoroquinolonas: evitar em juvenis (artropatia), gestantes; em gatos, cautela com doses altas.",
      mechanism: "Bactericida concentração‑dependente: inibe DNA girase e topoisomerase IV.",
      prep_admin: "Colírio 0,3% (uso tópico). Comprimidos humanos 250/500 mg (biodisponibilidade oral variável em cães). Formulação IV 2 mg/mL disponível para infusão.",
      infusion: "Tópico: 1 gota/olho; não misturar com outros colírios (pode precipitar). Sistêmico IV: infundir lentamente diluído em SF 0,9%.",
      duration: "Colírio: até resolução clínica. Sistêmico: 7–14 dias (ex.: ITU).",
      contraindications: "Filhotes em crescimento; gestação/lactação. Cautela em gatos e pacientes com distúrbios neurológicos.",
      adverse_effects: "Tópico: irritação ocular leve. Sistêmico: GI, neurotoxicidade rara, artropatia em jovens (semelhante à enrofloxacina)."
    },
    {
      name: "Marbofloxacina",
      spectrum: "Semelhante à enrofloxacina, com excelente atividade contra Gram-negativos (incluindo Pseudomonas) e Staphylococcus. Atividade limitada contra Streptococcus e anaeróbios.",
      dose_dog: "2.75–5.5 mg/kg VO q24h",
      dose_cat: "2.75–5.5 mg/kg VO q24h",
      indications: "Infecções de pele e tecidos moles, infecções do trato urinário. Considerada de segunda linha. Menor risco de toxicidade retiniana em gatos em comparação com a enrofloxacina, mas a cautela permanece.",
      cautions: "Fármaco de importância crítica; uso deve ser justificado por cultura ou para infecções graves por Gram-negativos.",
      mechanism: "Bactericida concentração-dependente, inibe a DNA girase e topoisomerase IV.",
      prep_admin: "Comprimidos orais.",
      duration: "Depende da indicação, geralmente 7-21 dias.",
      contraindications: "Animais em crescimento (risco de artropatia), gestantes. Cautela em animais com distúrbios do SNC.",
      adverse_effects: "Distúrbios gastrointestinais. Risco de toxicidade retiniana em gatos é menor, mas ainda possível em doses altas ou em animais suscetíveis."
    },
    {
      name: "Pradofloxacina (Veraflox®)",
      spectrum: "Amplo espectro contra Gram-positivos e Gram-negativos. Espectro anaeróbio melhorado (Porphyromonas, Prevotella) em comparação com outras fluoroquinolonas.",
      dose_dog: "3 mg/kg PO q24h (apenas na UE). ADVERTÊNCIA FDA: NÃO USAR EM CÃES.",
      dose_cat: "5 mg/kg (suspensão) ou 3 mg/kg (comprimidos) PO q24h (UE). Nos EUA: 7.5 mg/kg PO q24h.",
      indications: "Cães (UE): Infeções de feridas, piodermite, ITU, infeções periodontais. Gatos: Infeções respiratórias superiores, feridas e abcessos.",
      cautions: "Divergência Regulatória: A FDA dos EUA emitiu uma advertência 'NÃO USAR EM CÃES' devido a riscos de arritmias cardíacas e supressão da medula óssea. Usar com extrema cautela e aderir às regulamentações locais.",
      mechanism: "Fluoroquinolona de 3ª geração. Inibe a DNA girase e a topoisomerase IV, bloqueando a replicação do DNA bacteriano. Atividade bactericida concentração-dependente.",
      prep_admin: "Comprimidos e suspensão oral. Pode ser administrado com ou sem alimentos.",
      duration: "Varia com a infeção (5 a 35 dias).",
      contraindications: "Hipersensibilidade. Cães em crescimento (<12-18 meses) devido a artropatia. Gatos <6 semanas. Animais com distúrbios do SNC, gestantes ou lactantes.",
      adverse_effects: "Distúrbios gastrointestinais leves e transitórios (vómito). Fotossensibilidade."
    }
  ],
  "Lincosamidas": [
    {
      name: "Clindamicina",
      spectrum: "Excelente atividade contra Gram-positivos aeróbios (Staphylococcus, Streptococcus) e a maioria dos anaeróbios clinicamente importantes (Bacteroides, Clostridium). Eficaz contra protozoários como Toxoplasma gondii. Sem atividade contra Gram-negativos aeróbios.",
      dose_dog: "5.5–11 mg/kg VO q12h, ou 11-33 mg/kg PO q24h",
      dose_cat: "11-33 mg/kg PO q12-24h",
      indications: "Primeira escolha para infecções odontogênicas/periodontais, osteomielite, abscessos e feridas profundas com contaminação anaeróbia. Tratamento de escolha para toxoplasmose.",
      cautions: "",
      mechanism: "Inibe a síntese proteica bacteriana (subunidade 50S). Pode ser bacteriostática ou bactericida. Excelente penetração tecidual, incluindo osso.",
      prep_admin: "Oral (cápsulas, solução) e injetável. Injeção IM não recomendada (dor).",
      infusion: "Administração oral em gatos deve ser seguida de água/alimento para prevenir esofagite. NUNCA ADMINISTRAR IV EM BOLUS DIRETO (risco de colapso cardiovascular). Infusão IV deve ser lenta (10-60 min), diluída em SF 0.9% (conc. final 6-12 mg/mL).",
      duration: "Pele/tecidos moles: 7-10 dias. Osteomielite: mínimo de 4-6 semanas. Toxoplasmose: 4 semanas. Continuar por pelo menos 14 dias após resolução clínica.",
      contraindications: "Usar com cautela em pacientes com doença renal ou hepática grave. Pode predispor à colite por C. difficile.",
      adverse_effects: "Gastrointestinais (vômito, diarreia). Em gatos, cápsulas 'a seco' podem causar estenose esofágica. Reações alérgicas e dano hepático agudo (raros)."
    }
  ],
  "Tetraciclinas": [
    { 
      name: "Doxiciclina", 
      spectrum: "Amplo espectro contra Ehrlichia, Anaplasma, Rickettsia, Borrelia, Leptospira, Bordetella, Mycoplasma, Chlamydia.", 
      dose_dog: "5–10 mg/kg q12h ou 10 mg/kg q24h", 
      dose_cat: "5–10 mg/kg q12h ou 10 mg/kg q24h", 
      indications: "Tratamento de eleição para doenças transmitidas por vetores e patógenos intracelulares. Infecções respiratórias (CRIF, CRIC). Leptospirose (fase de portador renal).", 
      cautions: "Em gatos, administrar com 6 mL de água ou um pouco de alimento para prevenir esofagite e estenose esofágica. Evitar em gestantes e filhotes (risco de manchas nos dentes e hipoplasia do esmalte), embora o risco seja menor que com outras tetraciclinas.",
      mechanism: "Bacteriostático. Inibe a síntese proteica ao se ligar reversivelmente à subunidade ribossômica 30S, impedindo a ligação do aminoacil-tRNA.",
      prep_admin: "Comprimidos e suspensão oral. A absorção é diminuída por laticínios, antiácidos e preparações de ferro.",
      duration: "Doenças por vetores: 28-30 dias. Leptospirose (portador): 14 dias. Infecções respiratórias: 7-14 dias.",
      contraindications: "Hipersensibilidade. Cautela em pacientes com disfunção hepática.",
      adverse_effects: "Efeitos gastrointestinais (vômito, diarreia, anorexia). Esofagite em gatos se administrado 'a seco'. Fotossensibilidade (raro)."
    },
    {
      name: "Minociclina",
      spectrum: "Semelhante à doxiciclina. Ativa contra Ehrlichia, Anaplasma, Rickettsia, Borrelia, etc. Pode ser eficaz contra algumas cepas de Staphylococcus resistentes a outras tetraciclinas.",
      dose_dog: "5-12 mg/kg VO q12h",
      dose_cat: "5-12 mg/kg VO q12h",
      indications: "Alternativa à doxiciclina para doenças transmitidas por vetores. Usada em combinação para tratamento de Brucelose.",
      cautions: "Mesmas precauções da doxiciclina (esofagite em gatos, coloração dos dentes em filhotes).",
      mechanism: "Bacteriostático. Inibe a síntese proteica ligando-se à subunidade 30S do ribossomo.",
      prep_admin: "Cápsulas e comprimidos. Administrar com água/alimento em gatos.",
      duration: "Doenças por vetores: 28 dias.",
      contraindications: "Hipersensibilidade, gestação, animais em crescimento.",
      adverse_effects: "Distúrbios gastrointestinais. Pode causar distúrbios vestibulares (tontura, ataxia), especialmente em gatos."
    }
  ],
  "Aminoglicosídeos": [
    {
      name: "Tobramicina",
      spectrum: "Ativo contra Gram-negativos (Pseudomonas aeruginosa, E. coli, Klebsiella, Proteus). Sinergia com beta-lactâmicos contra Pseudomonas.",
      dose_dog: "Tópico ocular: 0,3% q6–8h. Sistêmico: 2–4 mg/kg IV/IM q8h",
      dose_cat: "Tópico ocular: 0,3% q6–8h. Sistêmico: 2–4 mg/kg IV/IM q8h",
      indications: "Tópico: Conjuntivite bacteriana, ceratite ulcerativa. Sistêmico: Infecções graves por Gram-negativos (reservado para casos graves).",
      cautions: "NEFROTÓXICO e OTOTÓXICO. Monitorar função renal. Usar com cautela em pacientes com insuficiência renal.",
      mechanism: "Bactericida. Inibe a síntese proteica ligando-se à subunidade 30S do ribossomo.",
      prep_admin: "Tópico: Gotas ou pomada oftálmica. Sistêmico: Solução injetável.",
      duration: "Tópico: 7–10 dias. Sistêmico: 5–7 dias (reavaliar função renal).",
      contraindications: "Insuficiência renal grave. Hipersensibilidade.",
      adverse_effects: "Nefrotoxicidade, ototoxicidade, bloqueio neuromuscular."
    },
    {
      name: "Amicacina (parenteral)",
      spectrum: "Potente contra bactérias Gram-negativas, incluindo Pseudomonas. Mais estável que a gentamicina contra enzimas inativadoras.",
      dose_dog: "15 mg/kg IV/IM q24h",
      dose_cat: "10–15 mg/kg q24–48h",
      indications: "Infecções graves por Gram-negativos multirresistentes, especialmente em pacientes com risco de nefrotoxicidade onde uma dose diária única é preferida.",
      cautions: "Nefrotoxicidade e ototoxicidade são os principais riscos. Garantir hidratação adequada é crucial. Monitorar função renal (creatinina, urinálise seriada) e audição. Utilizar dose única diária para minimizar toxicidade.",
      mechanism: "Bactericida concentração-dependente. Liga-se irreversivelmente à subunidade 30S do ribossomo, causando erros na leitura do mRNA e inibindo a síntese proteica. Apresenta um longo efeito pós-antibiótico.",
      prep_admin: "Solução injetável. Pode ser diluído em SF 0.9% ou Glicose 5%.",
      infusion: "Administrar por infusão IV lenta ao longo de 20-30 minutos para minimizar o risco de bloqueio neuromuscular.",
      duration: "Geralmente cursos curtos (5-7 dias) para minimizar toxicidade.",
      contraindications: "Pacientes com insuficiência renal preexistente. Não administrar em conjunto com outros fármacos nefrotóxicos (ex: AINEs, furosemida).",
      adverse_effects: "Nefrotoxicidade (lesão tubular aguda), ototoxicidade (vestibular e coclear, pode ser irreversível). Bloqueio neuromuscular com infusão rápida ou em altas doses."
    },
    {
      name: "Gentamicina (parenteral)",
      spectrum: "Potente contra bactérias aeróbias Gram-negativas, incluindo Pseudomonas aeruginosa, E. coli, Klebsiella, Proteus. Atividade sinérgica com beta-lactâmicos contra alguns Gram-positivos (Staphylococcus, Enterococcus).",
      dose_dog: "6-10 mg/kg IV/IM/SC q24h",
      dose_cat: "6-10 mg/kg IV/IM/SC q24h",
      indications: "Infecções sistêmicas graves por Gram-negativos (sepse, pneumonia). Usado em combinação para endocardite bacteriana.",
      cautions: "ALTO RISCO de nefrotoxicidade e ototoxicidade. A dose única diária (SID) minimiza a toxicidade renal. Garantir hidratação adequada. Evitar o uso se o paciente estiver desidratado ou tiver doença renal preexistente.",
      mechanism: "Bactericida concentração-dependente. Liga-se irreversivelmente à subunidade 30S do ribossomo. Efeito pós-antibiótico prolongado.",
      prep_admin: "Solução injetável. Diluir em SF 0.9% para administração IV.",
      infusion: "Administrar por infusão IV lenta ao longo de 20-30 minutos.",
      duration: "Cursos curtos (5-7 dias) são fortemente recomendados para minimizar a toxicidade.",
      contraindications: "Doença renal preexistente, desidratação. Evitar coadministração com outros fármacos nefrotóxicos (AINEs, furosemida).",
      adverse_effects: "Nefrotoxicidade (lesão tubular aguda, reversível se detectada precocemente), ototoxicidade (vestibular e coclear, muitas vezes irreversível). Bloqueio neuromuscular em altas doses ou infusão rápida."
    }
  ],
  "Nitroimidazóis": [
    {
      name: "Metronidazol",
      spectrum: "Anaeróbios obrigatórios (Bacteroides, Clostridium) e protozoários (Giardia, Trichomonas, Entamoeba).",
      dose_dog: "10–15 mg/kg VO/IV q12h",
      dose_cat: "15–25 mg/kg VO q12h",
      indications: "Enteropatias inflamatórias, giardíase, colite anaeróbica, infecções por Clostridium, doença periodontal; em combinação para infecções polimicrobianas com anaeróbios.",
      cautions: "Doença hepática grave, gestação (1º trimestre). Uso prolongado aumenta risco neurológico.",
      mechanism: "Pró‑fármaco reduzido em anaeróbios; radicais causam quebras no DNA. Bactericida e antiprotozoário.",
      prep_admin: "Normalmente pronto; para IV concentrado, diluir para 5 mg/mL para infusão. NUNCA DILUIR EM RL OU GLICOSADO (não fazer no extensor).",
      infusion: "Infundir em 30–60 min, nunca em bolus (hipotensão, flebite, arritmia, neurotoxicidade). Pode diluir em 0,9% se necessário.",
      duration: "Giardíase: 5–7 d; demais: 5–10 d.",
      contraindications: "Hepatopatia grave; gestação inicial.",
      adverse_effects: "Ataxia, tremores, convulsões, anorexia, vômitos. Gatos são mais sensíveis. Disbiose pode persistir até 6 meses após uso."
    }
  ],
  "Sulfonamidas": [
    {
      name: "Trimetoprim + Sulfa",
      spectrum: "Gram+ e Gram− (E. coli, Proteus, Pasteurella, Nocardia, Pneumocystis), NÃO cobre Pseudomonas ou anaeróbios.",
      dose_dog: "15–30 mg/kg VO/SC/IV q12h",
      dose_cat: "15 mg/kg VO/SC/IV q12h",
      indications: "ITU, prostatite, diarreia bacteriana, coccidiose (Isospora), infecções respiratórias, piodermite.",
      cautions: "Cães de raças sensíveis (Doberman, Schnauzer). Distúrbios hematológicos, uso prolongado, gestação.",
      mechanism: "Bactericida por inibição sequencial da via do ácido fólico (sinergismo).",
      prep_admin: "Solução comum 96 mg/mL (80 SMX + 16 TMP): precisa diluir para IV. NUNCA USAR RL. IM não indicada.",
      infusion: "IM não recomendada. Diluir para 16–20 mg/mL em 0,9%. Infundir 30–60 min, nunca em bolus (risco de flebite/trombose/hipotensão, especialmente em gatos).",
      duration: "7–14 d; até 21 d em infecções profundas (prostatite, coccidiose).",
      contraindications: "Raças sensíveis, gestação; cautela em IR/IH e distúrbios hematológicos.",
      adverse_effects: "Hipersensibilidade, anemia, leucopenia, uveíte; KCS em uso prolongado (principalmente cães)."
    }
  ],
  "Macrolídeos": [
    {
      name: "Azitromicina",
      spectrum: "Boa atividade contra patógenos intracelulares (Bartonella, Chlamydia, Mycoplasma) e alguns Gram-positivos e Gram-negativos. Longa meia-vida tecidual.",
      dose_dog: "5–10 mg/kg VO q24h",
      dose_cat: "5–10 mg/kg VO q24h",
      indications: "Considerada de segunda linha. Usada em DTRS felina crônica refratária. Terapia combinada para Bartonelose. Alternativa para algumas infecções respiratórias.",
      cautions: "Usar com cautela em pacientes com disfunção hepática. Pode ter interações medicamentosas (inibidor do citocromo P450).",
      mechanism: "Inibe a síntese proteica bacteriana ligando-se à subunidade 50S do ribossomo. Pode ser bacteriostático ou bactericida. Ação tempo-dependente.",
      prep_admin: "Comprimidos e suspensão oral.",
      duration: "Geralmente administrada por 3-5 dias, mas o efeito persiste por mais tempo devido ao acúmulo tecidual.",
      contraindications: "Hipersensibilidade a macrolídeos.",
      adverse_effects: "Distúrbios gastrointestinais são os mais comuns."
    },
    {
      name: "Tilosina",
      spectrum: "Ativo principalmente contra bactérias Gram-positivas (Clostridium) e Mycoplasma. Também possui efeitos anti-inflamatórios e moduladores da motilidade intestinal.",
      dose_dog: "10–20 mg/kg VO q12-24h",
      dose_cat: "10–20 mg/kg VO q12-24h",
      indications: "Enteropatia responsiva a antibióticos (ARE/disbiose), colite por Clostridium perfringens.",
      cautions: "Uso primariamente em cães.",
      mechanism: "Macrolídeo que inibe a síntese proteica (subunidade 50S).",
      prep_admin: "Pó para mistura em água ou alimento.",
      duration: "ARE: 4-6 semanas. Colite: 7-10 dias.",
      contraindications: "Hipersensibilidade.",
      adverse_effects: "Geralmente bem tolerado. Pode causar distúrbios GI leves."
    }
  ],
  "Anfenicóis": [
    {
      name: "Cloranfenicol",
      spectrum: "Amplo espectro, incluindo Gram-positivos, Gram-negativos e anaeróbios. Excelente penetração em tecidos, incluindo o SNC, próstata e olho.",
      dose_dog: "40–50 mg/kg VO q8h",
      dose_cat: "10–20 mg/kg VO q12h",
      indications: "Reservado para infecções multirresistentes ou em locais de difícil acesso (SNC, próstata) com base em cultura. Alternativa para doenças por vetores em animais jovens.",
      cautions: "RISCO DE APLASIA DE MEDULA ÓSSEA IDIOSSINCRÁTICA E IRREVERSÍVEL EM HUMANOS. Manusear com luvas. O uso em animais de produção de alimentos é proibido.",
      mechanism: "Bacteriostático. Inibe a síntese proteica ligando-se à subunidade 50S do ribossomo e inibindo a enzima peptidil transferase.",
      prep_admin: "Cápsulas ou comprimidos.",
      duration: "Dependente da infecção. Uso deve ser o mais curto possível.",
      contraindications: "Disfunção hepática (metabolismo hepático).",
      adverse_effects: "Supressão reversível e dose-dependente da medula óssea em cães e gatos. Anorexia e distúrbios GI são comuns. Gatos são mais sensíveis à toxicidade."
    },
    {
      name: "Florfenicol",
      spectrum: "Amplo espectro, semelhante ao cloranfenicol (Gram+, Gram-, anaeróbios). Ativo contra estirpes resistentes ao cloranfenicol.",
      dose_dog: "Uso sistémico 'extra-label': 30 mg/kg IM q12h.",
      dose_cat: "Uso sistémico de alto risco e deve ser evitado.",
      indications: "Uso licenciado limitado a formulações óticas. Uso sistémico 'extra-label' para infeções suscetíveis quando outras opções não são adequadas.",
      cautions: "Segurança e eficácia sistémica em pequenos animais é muito limitada. Gatos são particularmente sensíveis à toxicidade dos anfenicóis. Monitorar hemograma em uso prolongado.",
      mechanism: "Inibe a síntese de proteínas ligando-se à subunidade 50S do ribossoma (peptidil transferase). Bacteriostático.",
      prep_admin: "Solução injetável para uso em animais de produção.",
      duration: "Depende da infeção.",
      contraindications: "Hipersensibilidade. Formulações óticas: não usar com tímpano perfurado, em reprodutores ou gestantes. Sistémico: cautela em animais jovens, com doença hepática/renal.",
      adverse_effects: "Risco potencial de supressão reversível da medula óssea, distúrbios GI. Gatos são mais suscetíveis."
    }
  ],
  "Glicopeptídeos": [
    {
      name: "Vancomicina (IV)",
      spectrum: "Estritamente limitado a bactérias Gram-positivas, incluindo Staphylococcus resistentes à meticilina (MRSA/MRSP) e Enterococcus spp. Nenhuma atividade contra Gram-negativos.",
      dose_dog: "15 mg/kg IV q6-8h OU CRI: 3.5 mg/kg (ataque) + 1.5 mg/kg/h. Oral (C. diff): 10-20 mg/kg PO q6h.",
      dose_cat: "15 mg/kg IV q6-8h.",
      indications: "Último recurso. Tratamento de infeções sistémicas graves e documentadas por bactérias Gram-positivas multirresistentes (MRSP, VRE) sem outras opções. Uso oral para enterite por C. difficile resistente a metronidazol.",
      cautions: "Fármaco de saúde pública. O uso promove resistência (VRE). Risco elevado de nefrotoxicidade. O uso empírico é inaceitável e deve ser guiado por cultura. Não aprovado para uso veterinário (extra-label).",
      mechanism: "Glicopeptídeo. Inibe a síntese da parede celular ligando-se aos terminais D-alanil-D-alanina dos precursores do peptidoglicano. Bactericida.",
      prep_admin: "Pó para injeção. Reconstituir e diluir em D5W ou SF 0.9%.",
      infusion: "Administração IV deve ser uma INFUSÃO LENTA (30-60 minutos). Bolus rápido causa a 'síndrome do homem vermelho' (libertação de histamina, hipotensão).",
      duration: "Sistémico: semanas, dependendo da resposta. Oral: 7 dias.",
      contraindications: "Hipersensibilidade. O uso empírico é contraindicado pelos princípios de stewardship.",
      adverse_effects: "Nefrotoxicidade (principal risco), reações relacionadas à infusão ('síndrome do homem vermelho'), flebite, vómitos."
    }
  ],
  "Rifamicinas": [
    {
      name: "Rifampicina",
      spectrum: "Amplo espectro: Gram-positivos (incl. MRSP), micobactérias e patógenos intracelulares (Brucella, Ehrlichia).",
      dose_dog: "5-10 mg/kg PO q24h.",
      dose_cat: "5-10 mg/kg PO q24h.",
      indications: "SEMPRE em terapia combinada. Infeções estafilocócicas graves (piodermite profunda, osteomielite por MRSP), infeções micobacterianas, brucelose.",
      cautions: "A resistência desenvolve-se rapidamente em monoterapia. Risco significativo de hepatotoxicidade. Potente indutor do citocromo P450 (muitas interações medicamentosas: corticoides, azóis, fenobarbital, etc.).",
      mechanism: "Inibe a RNA polimerase dependente de DNA bacteriana, bloqueando a síntese de RNA. Bactericida.",
      prep_admin: "Cápsulas orais ou suspensão manipulada. Administrar com o estômago vazio para maximizar a absorção.",
      duration: "Longo, várias semanas a meses.",
      contraindications: "Hipersensibilidade. Doença hepática grave preexistente.",
      adverse_effects: "Hepatotoxicidade (o mais grave), coloração vermelho-alaranjada de fluidos corporais (urina, lágrimas), distúrbios gastrointestinais."
    }
  ],
  "Fosfonatos": [
    {
      name: "Fosfomicina",
      spectrum: "Amplo espectro contra Gram-positivos e Gram-negativos, incluindo E. coli produtora de ESBL e VRE.",
      dose_dog: "80 mg/kg PO q12h.",
      dose_cat: "NÃO USAR. NEFROTÓXICO E FATAL.",
      indications: "Cães: Tratamento de ITUs (cistites) bacterianas multirresistentes, confirmadas por cultura.",
      cautions: "ABSOLUTAMENTE CONTRAINDICADA EM GATOS. Uso em cães é 'extra-label'. Uso criterioso para preservar eficácia.",
      mechanism: "Inibe a primeira etapa da síntese da parede celular bacteriana (enzima MurA). Sem resistência cruzada com beta-lactâmicos.",
      prep_admin: "Grânulos para suspensão oral ou suspensão manipulada. Administrar com alimentos.",
      duration: "Curso de vários dias, conforme prescrito.",
      contraindications: "GATOS (toxicidade fatal). Hipersensibilidade.",
      adverse_effects: "Em cães: diarreia, diminuição do apetite, vómito."
    }
  ],
  "Imunossupressores": [
    {
      name: "Ciclosporina",
      spectrum: "Imunossupressor. Não é antibiótico, mas usado para tratar doenças imunomediadas.",
      dose_dog: "5–10 mg/kg VO q12h",
      dose_cat: "5–10 mg/kg VO q12h",
      indications: "Dermatite atópica, pênfigo foliáceo, outras doenças imunomediadas.",
      cautions: "Imunossupressor. Monitorar função renal e hepática. Interações medicamentosas.",
      mechanism: "Inibe a calcineurina, bloqueando a ativação de linfócitos T.",
      prep_admin: "Cápsulas ou solução oral.",
      duration: "Longo prazo, conforme necessário.",
      contraindications: "Infecções ativas. Neoplasias.",
      adverse_effects: "Nefrotoxicidade, hepatotoxicidade, hipertensão, gengivite."
    },
    {
      name: "Tacrolimus",
      spectrum: "Imunossupressor. Não é antibiótico, mas usado para tratar doenças imunomediadas.",
      dose_dog: "0,1 mg/kg VO q12h",
      dose_cat: "0,1 mg/kg VO q12h",
      indications: "Dermatite atópica, ceratoconjuntivite seca.",
      cautions: "Imunossupressor. Monitorar função renal e hepática.",
      mechanism: "Inibe a calcineurina, bloqueando a ativação de linfócitos T.",
      prep_admin: "Comprimidos ou pomada tópica.",
      duration: "Longo prazo, conforme necessário.",
      contraindications: "Infecções ativas. Neoplasias.",
      adverse_effects: "Nefrotoxicidade, hepatotoxicidade, distúrbios GI."
    }
  ]
};

