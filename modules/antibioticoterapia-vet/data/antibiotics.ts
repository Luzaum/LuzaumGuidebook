import { AntibioticClass } from '../types';

export const AB_SEED: AntibioticClass = {
  "β-Lactâmicos": [
    {
      "name": "Amoxicilina",
      "spectrum": "Ativo contra Gram-positivos (Streptococcus spp.) e algumas Gram-negativas (e.g., Pasteurella). Muitas cepas de E. coli, Klebsiella e Staphylococcus são resistentes devido à produção de beta-lactamase.",
      "dose_dog": "11-22 mg/kg VO q8-12h (Cistite esporádica: 10-15 mg/kg PO BID/TID por 3-5 dias)",
      "dose_cat": "11-22 mg/kg VO q8-12h (Cistite esporádica: 10-15 mg/kg PO BID/TID por 3-5 dias)",
      "indications": "Primeira linha para cistite bacteriana esporádica não complicada em cães; infecções agudas de vias aéreas superiores com sinais sistêmicos (segunda opção após doxiciclina); profilaxia odontológica em cardiopatas/idosos; leptospirose canina em recuperação oral.",
      "cautions": "A resistência bacteriana em Staphylococcus e Enterobactérias produtoras de beta-lactamase é comum; Amoxicilina + Clavulanato é preferível para cobertura mais ampla. Em gatos jovens com sinais urinários, descartar cistite idiopática (FIC) antes de medicar.",
      "mechanism": "Inibe a síntese da parede celular bacteriana por ligação às PBPs. Ação bactericida e tempo-dependente.",
      "prep_admin": "Disponível em comprimidos e suspensão oral. Administrar com ou sem alimento.",
      "duration": "Cistite esporádica: 3-5 dias (não prolongar desnecessariamente). Vias aéreas superiores: 7-10 dias.",
      "contraindications": "Histórico de alergia a penicilinas.",
      "adverse_effects": "Distúrbios gastrointestinais leves (vômito, diarreia transitória)."
    },
    {
      "name": "Amoxicilina + Clavulanato",
      "spectrum": "Espectro muito amplo: Gram+ (incl. Staphylococcus penicilinase+), Gram− (muitas E. coli, Klebsiella, Proteus) e anaeróbios (boca, pele, intestinais). Não atua em Pseudomonas, MRSP/MRSA e alguns Enterobacter.",
      "dose_dog": "12.5–25 mg/kg VO q12h (infecções de pele: 12.5-25 mg/kg q12h; vias aéreas: 12.5 mg/kg BID)",
      "dose_cat": "12.5–25 mg/kg VO q12h (FCGS pós-operatório: 13.75 mg/kg PO q12h)",
      "indications": "Infecções de pele/tecidos moles (piodermite superficial em falha tópica, piodermite profunda), feridas de mordedura graves, infecções periodontais com repercussão sistêmica, pós-operatório de extração em FCGS, pneumonia comunitária estável, mastite, cesariana com distocia/ruptura, metrite e endometrite.",
      "cautions": "Uso empírico excessivo contribui para seleção de cepas resistentes. Não é ativo contra MRSP ou produtores de AmpC/carbapenemases. Administrar preferencialmente com alimento para reduzir náuseas.",
      "mechanism": "Amoxicilina inibe a transpeptidação da parede celular (PBPs). Clavulanato inativa irreversivelmente beta-lactamases bacterianas. Bactericida tempo-dependente.",
      "prep_admin": "Comprimidos e suspensão oral. Suspensão reconstituída deve ser refrigerada e utilizada em até 10 dias.",
      "duration": "Periodontite/mastite: 5-7 dias; Cesariana complicada: 5 dias; Pneumonia: 2-4 semanas; Piodermite superficial: 3-4 semanas; Piodermite profunda: 3-6 semanas.",
      "contraindications": "Alergia comprovada a penicilinas ou cefalosporinas.",
      "adverse_effects": "Distúrbios gastrintestinais (náuseas, vômitos, diarreia por hipermotilidade decorrente do clavulanato)."
    },
    {
      "name": "Ampicilina (IV)",
      "spectrum": "Gram+ aeróbios (estreptococos, enterococos), alguns Gram− (Pasteurella, E. coli, Proteus, Salmonella suscetíveis) e alguns anaeróbios.",
      "dose_dog": "10–20 mg/kg IV/VO q6–8h (Sepse/UTI: 20–22 mg/kg IV TID-QID)",
      "dose_cat": "10–20 mg/kg IV/VO q6–8h (Sepse: 20 mg/kg IV TID)",
      "indications": "Sepse de origem desconhecida (como pilar do esquema 4 quadrantes associada a enrofloxacina ou gentamicina), gastroenterite aguda grau 3 / AHDS com choque, parvovirose canina com quebra de barreira, profilaxia cirúrgica perioperatória (80 min pré-incisão), meningite bacteriana, piometra aberta com depressão moderada/grave, leptospirose em pacientes azotêmicos/com vômitos.",
      "cautions": "Uso hospitalar estrito via parenteral. Evitar uso oral em animais graves. Em sepse, dose de ataque de 1.25x pode ser indicada.",
      "mechanism": "Bactericida tempo-dependente; liga-se às PBPs e bloqueia a síntese de peptideoglicano.",
      "prep_admin": "Pó liofilizado injetável (Ampicilina Sódica). Reconstituir com SF 0,9% ou água para injeção. Instável em solução: utilizar em até 1h à temperatura ambiente.",
      "infusion": "Administrar IV lentamente em 3 a 5 minutos diluída em SF 0,9%. Não infundir em equipo com Ringer Lactato ou soluções glicosadas.",
      "duration": "Sepse e AHDS: 48-72h iniciais até desescalonamento; Profilaxia cirúrgica: dose perioperatória única ou repetir se cirurgia >4h; Leptospirose: até remissão dos vômitos.",
      "contraindications": "Hipersensibilidade a penicilinas.",
      "adverse_effects": "Tromboflebite no sítio de infusão, vômitos em injeção rápida, diarreia e reações alérgicas raras."
    },
    {
      "name": "Ampicilina + Sulbactam",
      "spectrum": "Amplo espectro: Gram+ (Streptococcus, Staphylococcus sensíveis à meticilina), Gram− (E. coli, Klebsiella, Proteus não-ESBL) e excelente contra anaeróbios (Bacteroides spp.). Não cobre Pseudomonas ou MRSA/MRSP.",
      "dose_dog": "22–30 mg/kg IV/IM/SC q6–8h",
      "dose_cat": "22–30 mg/kg IV/IM/SC q6–8h",
      "indications": "Infecções polimicrobianas graves, sepse abdominal/peritonite séptica, pneumonia aspirativa grave, piotórax, infecções do trato urinário complicadas.",
      "cautions": "Ajustar intervalo em disfunção renal grave.",
      "mechanism": "Ampicilina inibe a síntese da parede celular; Sulbactam inibe competitiva e irreversivelmente beta-lactamases, restaurando a potência da ampicilina.",
      "prep_admin": "Reconstituir com SF 0,9%. Estável por até 8h em temperatura ambiente ou 72h refrigerado.",
      "infusion": "Diluir em SF 0,9% e infundir lentamente em 15-30 minutos. Evitar soluções com cálcio.",
      "duration": "Geralmente 7-14 dias na fase hospitalar, com transição oral para Amoxicilina + Clavulanato logo após estabilização.",
      "contraindications": "Alergia prévia a penicilinas.",
      "adverse_effects": "Diarreia, dor local se administrado IM, flebite se infundido rapidamente."
    },
    {
      "name": "Penicilina G (Benzilpenicilina)",
      "spectrum": "Espectro estreito voltado para Gram-positivos (Streptococcus spp., Clostridium spp., Actinomyces) e espiroquetas (Leptospira spp., Borrelia). Inativada por penicilinases/beta-lactamases de Staphylococcus e bacilos Gram-negativos.",
      "dose_dog": "25.000–40.000 UI/kg IV/IM q12h (Penicilina G Sódica/Potássica) ou 20.000–40.000 UI/kg IM q24-48h (Procaína/Benzatina)",
      "dose_cat": "20.000–40.000 UI/kg IV/IM q12h",
      "indications": "Tratamento parenteral imediato da leptospirose canina aguda em animais com vômitos graves ou insuficiência renal aguda; tétano; actinomicose; feridas por mordedura associadas a anaeróbios suscetíveis.",
      "cautions": "Penicilina G potássica IV deve ser administrada lentamente sob risco de hipercalemia e arritmias cardíacas. Penicilina G procaína e benzatina são estritamente de uso intramuscular (NUNCA fazer IV - risco de embolia e morte).",
      "mechanism": "Beta-lactâmico natural bactericida tempo-dependente. Liga-se às PBPs impedindo a transpeptidação da parede celular bacteriana.",
      "prep_admin": "Frascos com pó liofilizado para reconstituição com água para injeção ou SF 0,9%. Infundir IV lenta ou IM profunda.",
      "infusion": "Infundir a solução sódica ou potássica em 15–30 minutos diluída em SF 0,9%. Não misturar na mesma via com aminoglicosídeos.",
      "duration": "Leptospirose fase aguda: até cessarem vômitos/estabilização renal (depois transição para Doxiciclina por 14 dias para eliminar o estado de portador renal). Tétano: 10-14 dias.",
      "contraindications": "Hipersensibilidade a penicilinas. Não administrar procaína IV.",
      "adverse_effects": "Reações de hipersensibilidade (urticária, choque anafilático raro), dor intensa no local da injeção IM, distúrbios gastrintestinais leves."
    },
    {
      "name": "Cefadroxil",
      "spectrum": "Forte atividade contra Gram-positivos (Staphylococcus spp., Streptococcus spp.) e atividade moderada contra alguns Gram-negativos (E. coli, Proteus mirabilis). Equivalente à cefalexina.",
      "dose_dog": "20-30 mg/kg PO q12-24h",
      "dose_cat": "20-30 mg/kg PO q12-24h",
      "indications": "Infeções cutâneas (piodermites, feridas), ITU não complicadas, pneumonias bacterianas, osteomielite.",
      "cautions": "Usar com cautela em pacientes com doença renal. Risco de sensibilidade cruzada com penicilinas. Cautela com outros fármacos nefrotóxicos (aminoglicosídeos).",
      "mechanism": "Inibe a síntese da parede celular bacteriana. Ação bactericida e tempo-dependente.",
      "prep_admin": "Comprimidos e suspensão oral. Administrar com ou sem alimentos; com comida para reduzir o vómito.",
      "duration": "Deve ser continuado durante todo o período prescrito.",
      "contraindications": "Hipersensibilidade a cefalosporinas ou penicilinas.",
      "adverse_effects": "Gastrointestinais: Vómito (mais comum), diarreia, diminuição do apetite. Reações de hipersensibilidade são raras."
    },
    {
      "name": "Cefalexina",
      "spectrum": "Cefalosporina de 1ª Geração. Excelente atividade contra Gram-positivos (Staphylococcus pseudintermedius sensível à oxacilina, Streptococcus spp.). Atividade moderada contra enterobactérias comuns (E. coli, Proteus mirabilis). Inativa contra MRSP, MRSA e Pseudomonas.",
      "dose_dog": "22-30 mg/kg VO q8-12h (Perioperatório: 15 mg/kg IV/VO 45-60 min pré-incisão)",
      "dose_cat": "22-30 mg/kg VO q8-12h",
      "indications": "Primeira linha para piodermite superficial canina (quando a terapia tópica falha), piodermite profunda, osteomielite e artrite séptica empírica, feridas por mordedura graves, profilaxia cirúrgica perioperatória para contaminação de pele.",
      "cautions": "MRSP e MRSA são intrinsecamente resistentes (resistência mediada por mecA). Administrar sempre junto com alimento para prevenir náuseas e vômitos.",
      "mechanism": "Inibe a síntese da parede celular bacteriana (PBPs). Bactericida tempo-dependente.",
      "prep_admin": "Comprimidos, cápsulas e suspensão oral. Fornecer sempre acompanhado de refeição.",
      "duration": "Piodermite superficial: 3 a 4 semanas (manter por 7 dias após cura clínica); Piodermite profunda: 3 a 6 semanas (manter por 14 dias após cura); Osteomielite: mínimo 3 a 6 semanas.",
      "contraindications": "Hipersensibilidade a cefalosporinas ou penicilinas.",
      "adverse_effects": "Vômitos e fezes amolecidas se administrado de estômago vazio; hipersensibilidade cutânea rara."
    },
    {
      "name": "Cefazolina (IV)",
      "spectrum": "Excelente contra Gram-positivos aeróbios (Staphylococcus, Streptococcus) e moderado contra Gram-negativos suscetíveis. Sem cobertura para Pseudomonas, anaeróbios estritos ou MRSP.",
      "dose_dog": "22-25 mg/kg IV 30 min antes da incisão; redosear a cada 2h (22 mg/kg) ou 3h (25 mg/kg)",
      "dose_cat": "20-25 mg/kg IV 30 min antes da incisão; redosear a cada 2-3h",
      "indications": "Antimicrobiano de escolha número 1 para profilaxia cirúrgica perioperatória em pequenos animais (cirurgias com microbiota esperada de pele, ortopédicas e gastrointestinais/uterinas de risco).",
      "cautions": "Não deve ser mantida no pós-operatório como 'profilaxia prolongada' sem infecção documentada. A profilaxia é restrita ao intraoperatório.",
      "mechanism": "Cefalosporina de 1ª geração bactericida tempo-dependente.",
      "prep_admin": "Frasco de 1000 mg: reconstituir com água para injeção ou SF 0,9% (100 mg/mL). Estável por 24h em temperatura ambiente ou 10 dias refrigerada.",
      "infusion": "Administrar lentamente em 3 a 5 minutos diluída em SF 0,9%.",
      "duration": "Profilaxia cirúrgica: dose pré-incisão (30 min antes) + repetição intraoperatória a cada 2 a 3 horas se o procedimento se prolongar. Descontinuar após fechar a pele.",
      "contraindications": "Alergia documentada a cefalosporinas.",
      "adverse_effects": "Flebite se injetada rapidamente; hipersensibilidade rara."
    },
    {
      "name": "Cefpodoxima",
      "spectrum": "Cefalosporina oral de 3ª geração. Boa atividade contra Staphylococcus e Streptococcus, e melhor cobertura contra Gram-negativos (E. coli, Klebsiella, Proteus) que cefalosporinas de 1ª geração.",
      "dose_dog": "5-10 mg/kg VO q24h",
      "dose_cat": "5-10 mg/kg VO q24h",
      "indications": "Infecções de pele e tecidos moles, especialmente piodermites. Infecções do trato urinário. Considerada de segunda linha.",
      "cautions": "Uso deve ser justificado para evitar seleção de resistência (e.g., E. coli produtora de ESBL).",
      "mechanism": "Inibe a síntese da parede celular bacteriana. Bactericida tempo-dependente.",
      "prep_admin": "Comprimidos. Administração com alimentos pode aumentar a absorção.",
      "duration": "Semelhante à cefalexina, dependendo da indicação.",
      "contraindications": "Alergia a cefalosporinas.",
      "adverse_effects": "Geralmente bem tolerado. Distúrbios gastrointestinais podem ocorrer."
    },
    {
      "name": "Ceftazidima (IV/IM/SC)",
      "spectrum": "Potente atividade contra Pseudomonas aeruginosa e outras bactérias Gram-negativas multirresistentes (Enterobacterales). Atividade fraca contra Gram-positivos.",
      "dose_dog": "20-30 mg/kg IV/IM/SC q4-8h OU CRI: 4.4 mg/kg IV (ataque), depois 4.1 mg/kg/h.",
      "dose_cat": "Dados de dosagem específicos limitados; usar com cautela.",
      "indications": "Reservado para infeções graves e documentadas por P. aeruginosa ou outros bacilos Gram-negativos multirresistentes (pneumonia, septicemia, ITU complicada, osteomielite, otite média/interna).",
      "cautions": "A meia-vida curta (~1h em cães) torna a dosagem infrequente (q12-24h) ineficaz. A CRI é o método ideal. Uso deve ser guiado por cultura.",
      "mechanism": "Cefalosporina de 3ª geração que inibe a síntese da parede celular. Estável contra muitas beta-lactamases de Gram-negativos.",
      "prep_admin": "Pó estéril para reconstituição. Para CRI, pode ser diluído em SF 0.9% para 10 mg/mL (estável 24h em temp. ambiente, 7 dias refrigerado).",
      "infusion": "CRI é o método de administração ideal para maximizar a eficácia tempo-dependente. A dosagem intermitente deve ser muito frequente (a cada 4 a 8 horas).",
      "infusion_why": "A meia-vida de eliminação de apenas 1 hora em cães torna regimes de dosagem convenientes (a cada 12 ou 24 horas) clinicamente ineficazes para o tratamento de infeções por P. aeruginosa, levando a falha terapêutica e seleção de resistência.",
      "duration": "Depende da gravidade, cronicidade e localização da infeção.",
      "contraindications": "Hipersensibilidade a cefalosporinas ou penicilinas.",
      "adverse_effects": "Geralmente bem tolerado. Vómito e diarreia foram observados. A injeção IM pode ser dolorosa."
    },
    {
      "name": "Ceftriaxona (IV)",
      "spectrum": "Amplo espectro contra bacilos Gram-negativos (Enterobacterales), Streptococcus spp. e boa penetração liquórica (atravessa barreira hematoencefálica). Não atua sobre Pseudomonas aeruginosa, MRSP/MRSA ou anaeróbios resistentes.",
      "dose_dog": "25–50 mg/kg IV/IM q24h (ou 25 mg/kg q12h em sepse grave/meningite)",
      "dose_cat": "25–50 mg/kg IV/IM q24h",
      "indications": "Meningite bacteriana, sepse grave por Gram-negativos hospitalares com sensibilidade comprovada em antibiograma.",
      "cautions": "NUNCA misturar ou coadministrar com soluções contendo cálcio (como Ringer Lactato): risco de precipitação de ceftriaxona-cálcio potencialmente fatal nos pulmões e rins. Fármaco pertencente à Categoria B da EMA (Uso Restrito).",
      "mechanism": "Cefalosporina de 3ª geração bactericida tempo-dependente.",
      "prep_admin": "Reconstituir com água para injeção ou SF 0,9%. Diluir para infusão lenta.",
      "infusion": "Infundir em 15 a 30 minutos em acesso venoso isolado. Lavar o equipo rigorosamente antes e depois com SF 0,9%.",
      "infusion_why": "Incompatibilidade física letal com cálcio.",
      "duration": "Meningite: 2 a 4 semanas após resolução clínica. Sepse: desescalonar precocemente.",
      "contraindications": "Coadministração com soluções contendo cálcio. Alergia a cefalosporinas.",
      "adverse_effects": "Flebite local, diarreia associada a disbiose e raramente pseudolitíase biliar reversível."
    },
    {
      "name": "Cefovecina (Convenia®)",
      "spectrum": "Amplo espectro contra Gram-positivos (Staphylococcus, Streptococcus) e Gram-negativos (E. coli, Pasteurella, Proteus). Inerentemente resistente a Pseudomonas e Enterococcus.",
      "dose_dog": "8 mg/kg (1 mL/10 kg) SC, dose única. Pode repetir após 14 dias (máx. 2 doses).",
      "dose_cat": "8 mg/kg (1 mL/10 kg) SC, dose única. Pode repetir após 14 dias.",
      "indications": "Infeções de pele e tecidos moles (piodermite, abcessos, feridas) e ITU, especialmente quando a adesão do proprietário é um problema.",
      "cautions": "A 'faca de dois gumes': meia-vida extremamente longa (~5.5d em cães, ~6.9d em gatos; 65 dias para depuração) torna reações adversas graves (IMHA, neutropenia) muito difíceis de manejar. Pode competir com outros fármacos de alta ligação proteica (AINEs, furosemida).",
      "mechanism": "Cefalosporina de 3ª geração de ação prolongada. Inibe a síntese da parede celular. Alta ligação a proteínas plasmáticas (>96%) funciona como um reservatório.",
      "prep_admin": "Pó liofilizado para reconstituição com 10 mL de água estéril (80 mg/mL). Estável por 56 dias sob refrigeração e protegido da luz. Exclusivamente para injeção subcutânea (SC).",
      "duration": "Uma única injeção fornece um curso terapêutico de até 14 dias.",
      "contraindications": "Hipersensibilidade a cefalosporinas/penicilinas. Não usar em animais <4 meses (EUA) ou <8 semanas (UE), gestantes, lactantes ou reprodutores. Não usar em pequenos herbívoros.",
      "adverse_effects": "Gastrointestinais (vómitos, diarreia, letargia), reações no local da injeção. Raros relatos de anafilaxia e mielotoxicidade grave."
    },
    {
      "name": "Piperacilina + Tazobactam (IV)",
      "spectrum": "Espectro muito amplo. Cobre Gram-positivos, a maioria das enterobactérias Gram-negativas (incluindo produtoras de ESBL), Pseudomonas aeruginosa e anaeróbios.",
      "dose_dog": "67.5 mg/kg (combinado) IV q8h",
      "dose_cat": "80-100 mg/kg (combinado) IV q8h",
      "indications": "Reservado para infecções graves, polimicrobianas e por bactérias multirresistentes, como peritonite séptica e sepse de origem desconhecida. Uso idealmente guiado por cultura.",
      "cautions": "Deve ser reservado para evitar o desenvolvimento de resistência.",
      "mechanism": "A piperacilina (penicilina de espectro estendido) inibe a síntese da parede celular. O tazobactam é um inibidor de beta-lactamase.",
      "prep_admin": "Pó para solução injetável. Reconstituir e diluir em SF 0.9%.",
      "infusion": "Administrar como infusão IV lenta ao longo de 20-30 minutos.",
      "duration": "Depende da infecção, geralmente 7-14 dias para infecções graves.",
      "contraindications": "Alergia a penicilinas, cefalosporinas ou carbapenêmicos.",
      "adverse_effects": "Geralmente bem tolerado. Flebite no local da injeção, distúrbios GI. Pode causar trombocitopenia com uso prolongado."
    },
    {
      "name": "Ticarcilina + Clavulanato (Tópico/IV)",
      "spectrum": "Amplo espectro com atividade contra Pseudomonas aeruginosa. Também cobre outros Gram-negativos, Gram-positivos e anaeróbios.",
      "dose_dog": "Uso sistémico: 15-25 mg/kg IV q8h. Uso tópico (otite): não padronizado, instilar no canal auditivo.",
      "dose_cat": "Uso sistémico: 15-25 mg/kg IV q8h.",
      "indications": "Principal indicação: tratamento tópico de otite externa por P. aeruginosa. Uso sistémico controverso para infecções graves por outras bactérias suscetíveis.",
      "cautions": "Antagonismo contra P. aeruginosa em uso sistémico: o clavulanato induz a enzima AmpC, que destrói a ticarcilina. Para infeções sistémicas por P. aeruginosa, preferir Piperacilina-Tazobactam. A principal utilidade é TÓPICA.",
      "mechanism": "A ticarcilina inibe a síntese da parede celular. O ácido clavulânico inibe as beta-lactamases. Bactericida tempo-dependente.",
      "prep_admin": "Pó para injeção. Pode ser reconstituído para uso tópico e congelado em alíquotas.",
      "duration": "Tópico (otite): prolongado, 14-36 dias. Sistémico: 10-14 dias.",
      "contraindications": "Hipersensibilidade a penicilinas.",
      "adverse_effects": "Reações de hipersensibilidade. O uso tópico é geralmente bem tolerado."
    }
  ],
  "Carbapenêmicos": [
    {
      "name": "Meropenem",
      "spectrum": "Cobertura extremamente ampla contra Gram-positivos (Staph MSSA, Strep, Enterococcus faecalis), Gram-negativos (incl. Pseudomonas e Enterobacterales produtoras de ESBL) e a maioria dos anaeróbios. Não cobre MRSA/MRSP e E. faecium.",
      "dose_dog": "24 mg/kg IV q8–12h",
      "dose_cat": "8–10 mg/kg IV q8h",
      "indications": "Fármaco de última linha (terceira linha) para infecções graves e documentadas por bactérias multirresistentes. Uso deve ser guiado por cultura e antibiograma. Indicado para neutropenia febril.",
      "cautions": "Uso restrito para evitar seleção de resistência a carbapenêmicos (carbapenemases).",
      "mechanism": "Agente beta-lactâmico bactericida, tempo-dependente, com espectro de ação excepcionalmente amplo. Altamente resistente à maioria das beta-lactamases, incluindo ESBLs.",
      "prep_admin": "Frascos 500 mg (diluir em 10 mL API → 50 mg/mL) ou 1000 mg (10 mL API → 100 mg/mL). NUNCA usar RL ou glicosado.",
      "infusion": "Diluir na seringa 1:3 em 0,9% para pequenos pacientes. Pode bolus lento (≥15 min), idealmente CRI/infusão de 3 h (tempo‑dependente).",
      "infusion_why": "Incompatível com RL/glicose (precipitação e perda de potência).",
      "duration": "Cursos curtos (5-14 dias) são preferíveis. Osteomielite: 3-4 semanas.",
      "contraindications": "Hipersensibilidade a outros beta-lactâmicos.",
      "adverse_effects": "Geralmente bem tolerado. Reações no local da infusão (flebite) e distúrbios GI. Neurotoxicidade (convulsões) é rara, risco menor em comparação com imipenem."
    },
    {
      "name": "Imipenem + Cilastatina",
      "spectrum": "Semelhante ao meropenem, com excelente cobertura para Gram-positivos, Gram-negativos e anaeróbios. Não cobre MRSA/MRSP.",
      "dose_dog": "5–10 mg/kg IV q8h",
      "dose_cat": "3–8 mg/kg IV q8h",
      "indications": "Reservado para infecções por patógenos resistentes, quando a cultura indica sensibilidade. Meropenem é preferido devido ao perfil de segurança superior.",
      "cautions": "Uso restrito (terceira linha). Maior potencial neurotóxico que o meropenem.",
      "mechanism": "O imipenem inibe a síntese da parede celular. A cilastatina inibe a enzima deidropeptidase-I nos túbulos renais, que inativaria o imipenem, aumentando sua concentração urinária e meia-vida.",
      "prep_admin": "Frasco 500 mg (diluir em 10 mL de API → 50 mg/mL). NÃO usar RL nem glicosado.",
      "infusion": "Diluir 1:3 em 0,9% para pequenos pacientes. Não pode bolus rápido; infundir 20–60 min. Idealmente CRI por ser tempo‑dependente. NÃO fazer SC (irritante).",
      "duration": "Semelhante ao meropenem, preferência por terapias curtas (5-14 dias).",
      "contraindications": "Semelhantes ao meropenem. Usar com extrema cautela em pacientes com distúrbios do SNC ou insuficiência renal.",
      "adverse_effects": "Náuseas e vômitos são mais comuns, especialmente com infusão rápida. Principal risco é a neurotoxicidade (convulsões)."
    }
  ],
  "Fluoroquinolonas": [
    {
      "name": "Enrofloxacina",
      "spectrum": "Excelente atividade contra a maioria das bactérias Gram-negativas (E. coli, Proteus, Klebsiella, Pasteurella). Atividade moderada contra Staphylococcus e Mycoplasma. Inativa contra anaeróbios estritos e Streptococcus.",
      "dose_dog": "5–20 mg/kg VO/IV q24h (Pielonefrite: 20 mg/kg SID; ITU/Pele: 5-10 mg/kg SID)",
      "dose_cat": "≤5 mg/kg VO/IV q24h RIGOROSAMENTE (NUNCA exceder 5 mg/kg/dia)",
      "indications": "Infecções do trato urinário superior (pielonefrite), prostatite bacteriana crônica, colite ulcerativa histiocítica de Boxer/Buldogue por AIEC, pneumonia bacteriana grave/séptica (associada a beta-lactâmico), piotórax, sepse 4 quadrantes (associada a ampicilina), AHDS grau 3 refratária.",
      "cautions": "CONTRAINDICADA EM FILHOTES E ANIMAIS EM CRESCIMENTO pelo risco de degeneração de cartilagens articulares (artropatia bolhosa em cães jovens de raças pequenas/médias <8-12 meses e grandes >18 meses). EM GATOS: doses >5 mg/kg/dia causam degeneração retiniana aguda difusa e CEGUEIRA IRREVERSÍVEL.",
      "mechanism": "Bactericida concentração-dependente. Inibe a subunidade A da DNA girase e topoisomerase IV bacterianas, impedindo a replicação e transcrição do DNA.",
      "prep_admin": "Comprimidos e solução injetável. Não administrar comprimidos com quelantes metálicos (cálcio, ferro, antiácidos com alumínio/magnésio ou laticínios).",
      "infusion": "Injeção IV deve ser LENTA (mínimo de 10 a 20 minutos) e diluída em SF 0,9%. Não fazer em bolus rápido (risco de hipotensão e colapso vascular). Não injetar SC/IM (necrose tecidual por pH alcalino).",
      "duration": "Colite histiocítica AIEC: 4 a 6 semanas; Pielonefrite: 10 a 14 dias; Prostatite: 4 a 6 semanas; Sepse: desescalonar em 48-72h.",
      "contraindications": "Filhotes em crescimento; gestantes; felinos em doses acima de 5 mg/kg/dia.",
      "adverse_effects": "Condrotoxicidade articular em filhotes; retinotoxicidade irreversível em gatos; êmese e anorexia; neurotoxicidade/convulsões raras em animais predispostos."
    },
    {
      "name": "Ciprofloxacina",
      "spectrum": "Gram−, algumas Gram+. Não indicada para Streptococcus; fraca para anaeróbios.",
      "dose_dog": "25–30 mg/kg VO q24–12h; oftálmico 0,3%: 1 gota/olho q6–8h",
      "dose_cat": "20 mg/kg VO q24h; oftálmico 0,3%: 1 gota/olho q6–8h",
      "indications": "Principalmente uso oftálmico (0,3%) em conjuntivite/ceratite bacteriana. Uso sistêmico para ITU e outras infecções por Gram− quando indicado. No HV-UFMG, é explicitamente contraindicada para prostatite canina devido à biodisponibilidade e penetração tecidual inferiores.",
      "cautions": "Mesmas das fluoroquinolonas: evitar em juvenis (artropatia), gestantes; em gatos, cautela com doses altas.",
      "mechanism": "Bactericida concentração‑dependente: inibe DNA girase e topoisomerase IV.",
      "prep_admin": "Colírio 0,3% (uso tópico). Comprimidos humanos 250/500 mg (biodisponibilidade oral variável em cães). Fórmulação IV 2 mg/mL disponível para infusão.",
      "infusion": "Tópico: 1 gota/olho; não misturar com outros colírios (pode precipitar). Sistêmico IV: infundir lentamente diluído em SF 0,9%.",
      "duration": "Colírio: até resolução clínica. Sistêmico: 7–14 dias (ex.: ITU).",
      "contraindications": "Filhotes em crescimento; gestação/lactação. Cautela em gatos e pacientes com distúrbios neurológicos.",
      "adverse_effects": "Tópico: irritação ocular leve. Sistêmico: GI, neurotoxicidade rara, artropatia em jovens (semelhante à enrofloxacina)."
    },
    {
      "name": "Marbofloxacina",
      "spectrum": "Fluoroquinolona de 2ª geração com excelente atividade contra Gram-negativos e Staphylococcus. Atividade limitada contra anaeróbios e estreptococos.",
      "dose_dog": "2.75–5.5 mg/kg VO q24h (Pielonefrite: 2-5 mg/kg PO SID)",
      "dose_cat": "2.75–5.5 mg/kg VO q24h (Pielonefrite: 2-5 mg/kg PO SID)",
      "indications": "Pielonefrite (infecções do trato urinário superior), prostatite bacteriana confirmada em antibiograma, piodermites profundas em falha clínica, pneumonias graves.",
      "cautions": "Risco de artropatia em filhotes. Em gatos apresenta perfil de segurança retiniana ligeiramente superior à enrofloxacina, mas ainda requer rigor na dosagem.",
      "mechanism": "Bactericida concentração-dependente. Inibe DNA girase e topoisomerase IV bacterianas.",
      "prep_admin": "Comprimidos orais mastigáveis ou revestidos.",
      "duration": "Pielonefrite: 10 a 14 dias; Prostatite: 4 a 6 semanas.",
      "contraindications": "Animais jovens em fase de crescimento rápido.",
      "adverse_effects": "Distúrbios digestivos transitórios (náusea, vômito)."
    },
    {
      "name": "Pradofloxacina (Veraflox®)",
      "spectrum": "Fluoroquinolona de 3ª geração (8-ciano fluoroquinolona). Espectro ampliado abrangendo Gram-positivos, Gram-negativos e anaeróbios estritos (Porphyromonas, Prevotella).",
      "dose_dog": "3 mg/kg PO q24h (uso regulatório aprovado na UE; FDA adverte restrição em cães).",
      "dose_cat": "3-5 mg/kg PO q24h (Pielonefrite/Infecções respiratórias: 3-4 mg/kg PO SID)",
      "indications": "Gatos: Infecções do trato urinário superior (pielonefrite), infecções de vias aéreas superiores complicadas, feridas cutâneas profundas e abscessos. Cães: Pielonefrite e infecções periodontais graves.",
      "cautions": "Maior margem de segurança retiniana em gatos que a enrofloxacina.",
      "mechanism": "Duplo mecanismo de inibição com alta afinidade tanto pela DNA girase quanto pela DNA topoisomerase IV bacteriana.",
      "prep_admin": "Suspensão oral com dosador milimetrado ou comprimidos.",
      "duration": "Pielonefrite: 10 a 14 dias.",
      "contraindications": "Gatos <6 semanas de idade; cães em crescimento.",
      "adverse_effects": "Vômitos e fezes amolecidas transitórias."
    }
  ],
  "Lincosamidas": [
    {
      "name": "Clindamicina",
      "spectrum": "Excelente atividade contra Gram-positivos (Staphylococcus spp., Streptococcus spp.) e anaeróbios estritos (Bacteroides, Clostridium, Fusobacterium, Porphyromonas). Inativa contra bacilos Gram-negativos aeróbios (E. coli, Proteus, Klebsiella). Ativa contra Toxoplasma gondii.",
      "dose_dog": "5.5–11 mg/kg VO/IV q12h (Osteomielite/Artrite: 10-11 mg/kg IV/VO BID)",
      "dose_cat": "5.5–11 mg/kg VO/IV q12h (FCGS pós-operatório: 5-11 mg/kg PO q12h)",
      "indications": "Primeira escolha para infecções odontológicas e periodontais com repercussão sistêmica, osteomielite, artrite séptica, profilaxia dentária em pacientes cardiopatas, alternativa aos beta-lactâmicos em pneumonia aspirativa e piotórax, piodermite superficial e profunda em cães.",
      "cautions": "EM GATOS: a administração oral de cápsulas ou comprimidos secos causa esofagite erosiva grave e estenose de esôfago. Administrar SEMPRE acompanhada de pelo menos 5-10 mL de água líquida ou pasta/alimento úmido.",
      "mechanism": "Liga-se à subunidade 50S dos ribossomos inibindo a síntese de proteínas bacterianas. Bacteriostática em baixas concentrações e bactericida em altas concentrações teciduais.",
      "prep_admin": "Cápsulas, comprimidos, solução oral e ampolas injetáveis.",
      "infusion": "NUNCA ADMINISTRAR EM BOLUS INTRAVENOSO RÁPIDO (risco grave de hipotensão e arritmias/colapso cardiovascular). Diluir em SF 0,9% e infundir lentamente em 20 a 30 minutos.",
      "duration": "Periodontite: 7 dias; FCGS pós-cirúrgico: 5 dias; Osteomielite e artrite séptica: 3 a 6 semanas (21 a 28 dias mínimos).",
      "contraindications": "Hepatopatias graves sem monitorização; pacientes com hipersensibilidade a lincosamidas.",
      "adverse_effects": "Vômitos, diarreia e náuseas; esofagite química e estenose esofágica em felinos quando ofertada a seco."
    }
  ],
  "Tetraciclinas": [
    {
      "name": "Doxiciclina",
      "spectrum": "Amplo espectro abrangente: Ehrlichia canis, Anaplasma platys, Borrelia burgdorferi, Leptospira spp., Mycoplasma spp., Chlamydia felis, Bordetella bronchiseptica, Rickettsia.",
      "dose_dog": "5 mg/kg VO/IV q12h OU 10 mg/kg VO/IV q24h (Erliquiose: 5 mg/kg BID ou 10 mg/kg SID por 28 dias; Leptospirose: 5 mg/kg BID por 14 dias)",
      "dose_cat": "5 mg/kg VO/IV q12h OU 10 mg/kg VO/IV q24h (Rinite/DTRS: 10 mg/kg VO SID por 7-10 dias)",
      "indications": "Primeira escolha para erliquiose canina e anaplasmose; primeira escolha para leptospirose canina (eliminação da fase de portador renal); primeira escolha para infecções agudas e crônicas de vias aéreas superiores (rinite) em cães e gatos; traqueobronquite infecciosa canina (tosse dos canis) grave com febre.",
      "cautions": "EM GATOS: risco crítico de retenção esofágica levando a úlceras e estenose esofágica cicatricial grave. É MANDATÓRIO ofertar alimento úmido ou 'flush' de água (6 mL) imediatamente após o comprimido. Se vômitos em cães, administrar logo após refeição.",
      "mechanism": "Bacteriostático. Liga-se reversivelmente à subunidade ribossômica 30S, impedindo a ligação do aminoacil-tRNA.",
      "prep_admin": "Comprimidos sulcados, formulações líquidas palatáveis e ampolas injetáveis (Hiclato de Doxiciclina).",
      "duration": "Erliquiose/Anaplasmose: 4 semanas (28 dias consecutivos); Leptospirose: 14 dias; Rinite/Tosse dos canis: 7 a 10 dias.",
      "contraindications": "Animais com hepatopatia terminal sem monitoramento; hipersensibilidade a tetraciclinas.",
      "adverse_effects": "Êmese decorrente de irritação gástrica direta; esofagite ulcerativa em felinos se dada a seco; elevação transitória de ALT/FA."
    },
    {
      "name": "Minociclina",
      "spectrum": "Semelhante à doxiciclina. Ativa contra Ehrlichia, Anaplasma, Rickettsia, Borrelia, etc. Pode ser eficaz contra algumas cepas de Staphylococcus resistentes a outras tetraciclinas.",
      "dose_dog": "5-12 mg/kg VO q12h",
      "dose_cat": "5-12 mg/kg VO q12h",
      "indications": "Alternativa à doxiciclina para doenças transmitidas por vetores. Usada em combinação para tratamento de Brucelose.",
      "cautions": "Mesmas precauções da doxiciclina (esofagite em gatos, coloração dos dentes em filhotes).",
      "mechanism": "Bacteriostático. Inibe a síntese proteica ligando-se à subunidade 30S do ribossomo.",
      "prep_admin": "Cápsulas e comprimidos. Administrar com água/alimento em gatos.",
      "duration": "Doenças por vetores: 28 dias.",
      "contraindications": "Hipersensibilidade, gestação, animais em crescimento.",
      "adverse_effects": "Distúrbios gastrointestinais. Pode causar distúrbios vestibulares (tontura, ataxia), especialmente em gatos."
    }
  ],
  "Aminoglicosídeos": [
    {
      "name": "Gentamicina (parenteral)",
      "spectrum": "Potente contra bactérias aeróbias Gram-negativas (E. coli, Klebsiella, Proteus, Pseudomonas aeruginosa). Atividade sinérgica bactericida com aminopenicilinas.",
      "dose_dog": "5–10 mg/kg IV lento/IM/SC q24h (Dose única diária SID)",
      "dose_cat": "5–8 mg/kg IV lento/SC q24h",
      "indications": "Sepse grave de origem desconhecida (como reforço Gram-negativo no esquema 4 quadrantes associada a Ampicilina), choque séptico refratário.",
      "cautions": "ALTO RISCO DE NEFROTOXICIDADE E OTOTOXICIDADE. Estritamente contraindicada em pacientes desidratados, hipovolêmicos ou com doença renal pré-existente. Administrar obrigatoriamente em regime de dose única diária (SID) para permitir clareamento renal e reduzir nefrotoxicidade.",
      "mechanism": "Bactericida concentração-dependente. Liga-se irreversivelmente à subunidade 30S do ribossomo bacteriano. Apresenta potente efeito pós-antibiótico (PAE).",
      "prep_admin": "Solução injetável. Diluir em SF 0,9%.",
      "infusion": "Infundir IV lentamente em 20 a 30 minutos. Nunca administrar em bólus rápido.",
      "duration": "Cursos curtos de 3 a 5 dias para minimizar dano aos túbulos renais proximais.",
      "contraindications": "Insuficiência renal, azotemia, desidratação clínica, uso concomitante com AINEs.",
      "adverse_effects": "Lesão renal aguda (necrose tubular aguda), ototoxicidade coclear e vestibular irreversível."
    },
    {
      "name": "Amicacina (parenteral)",
      "spectrum": "Potente contra bacilos Gram-negativos multirresistentes, incluindo cepas de Pseudomonas e Enterobacterales resistentes à gentamicina.",
      "dose_dog": "15–30 mg/kg IV lento/IM/SC q24h",
      "dose_cat": "10–14 mg/kg IV lento/IM/SC q24h",
      "indications": "Cistite nosocomial (infecção hospitalar) por patógenos multirresistentes comprovados em antibiograma; sepse refratária hospitalar.",
      "cautions": "Potencialmente nefrotóxico. Garantir normovolemia absoluta e monitorar densidade urinária e creatinina sérica seriada.",
      "mechanism": "Bactericida concentração-dependente pela inibição da subunidade 30S ribossômica.",
      "prep_admin": "Solução injetável. Diluir em SF 0,9%.",
      "infusion": "Infusão IV lenta em 30 minutos.",
      "duration": "Geralmente 5 a 7 dias no máximo.",
      "contraindications": "Doença renal prévia, hipovolemia, uso de fármacos nefrotóxicos.",
      "adverse_effects": "Nefrotoxicidade e ototoxicidade."
    },
    {
      "name": "Tobramicina",
      "spectrum": "Ativo contra Gram-negativos (Pseudomonas aeruginosa, E. coli, Klebsiella, Proteus). Sinergia com beta-lactâmicos contra Pseudomonas.",
      "dose_dog": "Tópico ocular: 0,3% q6–8h. Sistêmico: 2–4 mg/kg IV/IM q8h",
      "dose_cat": "Tópico ocular: 0,3% q6–8h. Sistêmico: 2–4 mg/kg IV/IM q8h",
      "indications": "Tópico: Conjuntivite bacteriana, ceratite ulcerativa. Sistêmico: Infecções graves por Gram-negativos.",
      "cautions": "NEFROTÓXICO e OTOTÓXICO. Monitorar função renal.",
      "mechanism": "Bactericida. Inibe a síntese proteica ligando-se à subunidade 30S do ribossomo.",
      "prep_admin": "Tópico: Gotas ou pomada oftálmica. Sistêmico: Solução injetável.",
      "duration": "Tópico: 7–10 dias. Sistêmico: 5–7 dias.",
      "contraindications": "Insuficiência renal grave.",
      "adverse_effects": "Nefrotoxicidade, ototoxicidade."
    }
  ],
  "Nitroimidazóis": [
    {
      "name": "Metronidazol",
      "spectrum": "Excelente contra bactérias anaeróbias obrigatórias estritas (Bacteroides fragilis, Clostridium perfringens, Clostridioides difficile, Fusobacterium) e protozoários entéricos (Giardia lamblia, Trichomonas). Sem qualquer atividade contra aeróbios.",
      "dose_dog": "10–20 mg/kg VO/IV q12h (Giardíase: 25 mg/kg VO q12h por 5 dias; C. perfringens: 10-20 mg/kg VO BID por 5-7 dias)",
      "dose_cat": "10–15 mg/kg VO/IV q12h (Dose total máxima recomendada em gatos de 62,5 mg/gato VO BID)",
      "indications": "Infecções intestinais por C. perfringens tipo F comprovadas; segunda escolha para giardíase refratária a fenbendazol; infecções polimicrobianas com componente anaeróbio profundo.",
      "cautions": "NÃO recomendado como 1ª escolha em diarreia aguda ou giardíase sem comprovação. Causa disbiose intestinal severa e duradoura (pode perdurar por até 6 meses). Neurotóxico em doses elevadas ou tratamentos prolongados (>14 dias) em cães e gatos.",
      "mechanism": "Reduzido no interior dos microrganismos anaeróbios gerando metabólitos intermediários reativos que quebram a fita de DNA bacteriano. Bactericida concentração-dependente.",
      "prep_admin": "Comprimidos (sabor amargo intenso: não triturar) e solução parenteral para infusão (5 mg/mL).",
      "infusion": "Infundir IV em 30 a 60 minutos. NUNCA fazer em bólus rápido (risco de neurotoxicidade aguda e colapso). Não misturar com Ringer Lactato.",
      "duration": "Giardíase: 5 dias; C. perfringens: 5 a 7 dias.",
      "contraindications": "Hepatopatia grave, fêmeas no terço inicial da gestação.",
      "adverse_effects": "Sinais neurológicos (ataxia, nistagmo vertical/rotatório, tremores musculares, convulsões), hipersalivação profusa em gatos devido ao amargor, náusea e anorexia."
    }
  ],
  "Sulfonamidas": [
    {
      "name": "Trimetoprim + Sulfa",
      "spectrum": "Amplo espectro: Gram-positivos e a maioria das enterobactérias (E. coli, Proteus mirabilis). Inativa contra Pseudomonas aeruginosa, Enterococcus faecalis e bactérias anaeróbias estritas.",
      "dose_dog": "15 mg/kg VO/IV q12h (Pielonefrite: 30 mg/kg BID; Orquite/Prostatite: 15 mg/kg VO BID por 4-6 semanas)",
      "dose_cat": "15 mg/kg VO/IV q12h (Pielonefrite: 30 mg/kg BID)",
      "indications": "Primeira linha para cistite esporádica e cistite recorrente em cães e gatos (3-5 dias); primeira linha para prostatite bacteriana crônica (4-6 semanas); primeira linha para orquite e epididimite (mínimo 4 semanas); primeira linha em metrite aguda e endometrite (5-7 dias); piometra (5-6 dias); pielonefrite; meningite bacteriana.",
      "cautions": "Inativada na presença de pus, secreção purulenta e tecido necrótico (onde há grande quantidade de PABA e timidina extracelulares). Cães de certas raças (Doberman Pinscher) têm predisposição imunomediada a reações de hipersensibilidade. Uso prolongado pode causar Ceratoconjuntivite Seca (KCS/olho seco) e hipotireoidismo.",
      "mechanism": "Bloqueio enzimático sequencial sinérgico da síntese de ácido tetrahidrofólico (a sulfonamida inibe a di-hidropteroato sintase e o trimetoprim inibe a di-hidrofolato redutase). Bactericida sinérgico.",
      "prep_admin": "Comprimidos e suspensão oral. Solução parenteral requer diluição em SF 0,9%.",
      "infusion": "Infundir IV em 30 a 45 minutos diluída em SF 0,9%. Não administrar IM.",
      "duration": "Cistite: 3 a 5 dias; Metrite/Endometrite: 5 a 7 dias; Prostatite/Orquite: 4 a 6 semanas; Pielonefrite: 10 a 14 dias.",
      "contraindications": "Dobermans, histórico prévio de discrasia sanguínea, hepatopatia ou nefropatia grave.",
      "adverse_effects": "Ceratoconjuntivite seca (KCS), poliartrite imunomediada, anemia hemolítica, hepatite medicamentosa, anorexia."
    }
  ],
  "Macrolídeos": [
    {
      "name": "Eritromicina",
      "spectrum": "Bactérias Gram-positivas, Mycoplasma spp., Chlamydia spp. e especificamente Campylobacter jejuni / Campylobacter spp. Não possui atividade útil contra a maioria das enterobactérias aeróbias.",
      "dose_dog": "10–15 mg/kg VO BID por 5 a 10 dias",
      "dose_cat": "10–15 mg/kg VO BID por 5 a 10 dias",
      "indications": "Tratamento de enterite bacteriana grave comprovada por Campylobacter spp. em cães e gatos gravemente debilitados; alternativa para infecções respiratórias por Mycoplasma.",
      "cautions": "Campylobacter spp. é comensal em até 30% dos cães saudáveis; sua simples detecção laboratorial NÃO justifica o uso de antimicrobianos. Tratar APENAS animais clinicamente enfermos.",
      "mechanism": "Macrolídeo que se liga à subunidade 50S dos ribossomos bacterianos, inibindo a translocação de aminoácidos durante a síntese de proteínas. Ação tempo-dependente.",
      "prep_admin": "Comprimidos orais ou estearato/estolato oral.",
      "duration": "5 a 10 dias consecutivos.",
      "contraindications": "Hipersensibilidade a macrolídeos; hepatopatia grave.",
      "adverse_effects": "Distúrbios gastrintestinais frequentes (vômitos, diarreia e desconforto abdominal por estímulo dos receptores de motilina)."
    },
    {
      "name": "Azitromicina",
      "spectrum": "Boa atividade contra patógenos intracelulares (Bartonella, Chlamydia, Mycoplasma) e alguns Gram-positivos e Gram-negativos. Longa meia-vida tecidual.",
      "dose_dog": "5–10 mg/kg VO q24h",
      "dose_cat": "5–10 mg/kg VO q24h",
      "indications": "Considerada de segunda linha. Usada em DTRS felina crônica refratária. Terapia combinada para Bartonelose. Alternativa para algumas infecções respiratórias.",
      "cautions": "Usar com cautela em pacientes com disfunção hepática. Pode ter interações medicamentosas (inibidor do citocromo P450).",
      "mechanism": "Inibe a síntese proteica bacteriana ligando-se à subunidade 50S do ribossomo. Pode ser bacteriostático ou bactericida. Ação tempo-dependente.",
      "prep_admin": "Comprimidos e suspensão oral.",
      "duration": "Geralmente administrada por 3-5 dias, mas o efeito persiste por mais tempo devido ao acúmulo tecidual.",
      "contraindications": "Hipersensibilidade a macrolídeos.",
      "adverse_effects": "Distúrbios gastrointestinais são os mais comuns."
    },
    {
      "name": "Tilosina",
      "spectrum": "Ativo principalmente contra bactérias Gram-positivas (Clostridium) e Mycoplasma. Também possui efeitos anti-inflamatórios e moduladores da motilidade intestinal.",
      "dose_dog": "10–20 mg/kg VO q12-24h",
      "dose_cat": "10–20 mg/kg VO q12-24h",
      "indications": "Enteropatia responsiva a antibióticos (ARE/disbiose), colite por Clostridium perfringens.",
      "cautions": "Uso primariamente em cães.",
      "mechanism": "Macrolídeo que inibe a síntese proteica (subunidade 50S).",
      "prep_admin": "Pó para mistura em água ou alimento.",
      "duration": "ARE: 4-6 semanas. Colite: 7-10 dias.",
      "contraindications": "Hipersensibilidade.",
      "adverse_effects": "Geralmente bem tolerado. Pode causar distúrbios GI leves."
    }
  ],
  "Anfenicóis": [
    {
      "name": "Cloranfenicol",
      "spectrum": "Amplo espectro contra Gram-positivos, Gram-negativos, anaeróbios e patógenos intracelulares (Ehrlichia, Rickettsia). Atravessa eficientemente a barreira hematoencefálica, ocular e prostática.",
      "dose_dog": "40–50 mg/kg VO q8h",
      "dose_cat": "10–20 mg/kg VO q12h (extrema cautela por deficiência de glicuronidação)",
      "indications": "Alternativa para erliquiose canina quando há intolerância total à doxiciclina; infecções do SNC e meningite com patógenos multirresistentes suscetíveis.",
      "cautions": "RISCO DE APLASIA MEDULAR IDIOSSINCRÁTICA IRREVERSÍVEL EM HUMANOS. O tutor deve manusear obrigatoriamente com luvas. Uso proibido em animais de produção.",
      "mechanism": "Bacteriostático. Inibe a enzima peptidil-transferase ao se ligar à subunidade ribossômica 50S bacteriana.",
      "prep_admin": "Comprimidos e cápsulas. Não quebrar nem esfarelar.",
      "duration": "Cursos curtos monitorados por hemograma seriado.",
      "contraindications": "Disfunção hepática preexistente; pacientes anêmicos ou leucopênicos.",
      "adverse_effects": "Supressão medular dose-dependente reversível (anemia, neutropenia), anorexia intensa em gatos."
    },
    {
      "name": "Florfenicol",
      "spectrum": "Amplo espectro, semelhante ao cloranfenicol (Gram+, Gram-, anaeróbios). Ativo contra estirpes resistentes ao cloranfenicol.",
      "dose_dog": "Uso sistémico 'extra-label': 30 mg/kg IM q12h.",
      "dose_cat": "Uso sistémico de alto risco e deve ser evitado.",
      "indications": "Uso licenciado limitado a formulações óticas. Uso sistémico 'extra-label' para infecções suscetíveis quando outras opções não são adequadas.",
      "cautions": "Segurança e eficácia sistémica em pequenos animais é muito limitada. Gatos são particularmente sensíveis à toxicidade dos anfenicóis. Monitorar hemograma em uso prolongado.",
      "mechanism": "Inibe a síntese de proteínas ligando-se à subunidade 50S do ribossomo (peptidil transferase). Bacteriostático.",
      "prep_admin": "Solução injetável para uso em animais de produção.",
      "duration": "Depende da infeção.",
      "contraindications": "Hipersensibilidade.",
      "adverse_effects": "Risco potencial de supressão reversível da medula óssea, distúrbios GI."
    }
  ],
  "Derivados de Nitrofurano": [
    {
      "name": "Nitrofurantoína",
      "spectrum": "Bactérias Gram-negativas (E. coli, Klebsiella) e Gram-positivas (Enterococcus faecalis, Staphylococcus). Ativa contra muitas cepas multirresistentes produtoras de ESBL.",
      "dose_dog": "4–5 mg/kg PO q8h (junto com alimento)",
      "dose_cat": "4–5 mg/kg PO q8h (junto com alimento)",
      "indications": "Tratamento de cistite bacteriana nosocomial / infecção hospitalar do trato urinário baixo por bactérias multirresistentes sensíveis em antibiograma.",
      "cautions": "ESTRITAMENTE CONTRAINDICADA EM PIELONEFRITE OU INFECÇÕES SISTÊMICAS. O fármaco atinge concentrações terapêuticas APENAS na luz da bexiga urinária (não atinge níveis adequados no parênquima renal ou corrente sanguínea).",
      "mechanism": "Reduzida por enzimas bacterianas a intermediários altamente reativos que causam danos ao DNA, RNA e proteínas bacterianas. Ação bactericida na urina.",
      "prep_admin": "Cápsulas e suspensão oral. Administrar obrigatoriamente com refeições para aumentar a absorção e reduzir náuseas.",
      "duration": "7 a 14 dias conforme laudo de antibiograma.",
      "contraindications": "Insuficiência renal (compromete a excreção urinária e eleva toxicidade sistêmica); infecções do trato urinário superior/pielonefrite.",
      "adverse_effects": "Náuseas e vômitos frequentes; neuropatia periférica e fibrose pulmonar em terapias muito prolongadas (raros)."
    }
  ],
  "Antiparasitários / Antiprotozoários": [
    {
      "name": "Fenbendazol",
      "spectrum": "Protozoários entéricos (Giardia lamblia/duodenalis) e nematódeos gastrintestinais (Toxocara, Ancylostoma, Trichuris).",
      "dose_dog": "50 mg/kg VO q24h por 5 dias consecutivos",
      "dose_cat": "50 mg/kg VO q24h por 5 dias consecutivos",
      "indications": "Primeira linha absoluta para o tratamento da giardíase clínica em cães e gatos. Preferido em relação ao metronidazol pelo excelente perfil de segurança e menor impacto sobre o microbioma intestinal.",
      "cautions": "Para sucesso do tratamento, é fundamental associar higiene ambiental rigorosa (recolhimento de fezes, desinfecção com amônia quaternária) e banhos com xampu de clorexidina nos animais para remover cistos aderidos ao pelo perineal e prevenir reinfecção imediata.",
      "mechanism": "Benzimidazol que se liga à beta-tubulina do parasita, inibindo a polimerização dos microtúbulos e esgotando as reservas energéticas do protozoário.",
      "prep_admin": "Suspensão oral ou comprimidos administrados junto com a alimentação.",
      "duration": "5 dias consecutivos. O protocolo pode ser repetido se a excreção de cistos persistir e houver sintomatologia.",
      "contraindications": "Hipersensibilidade conhecida a benzimidazóis.",
      "adverse_effects": "Raríssimos; vômitos ou fezes amolecidas esporádicas."
    },
    {
      "name": "Febantel + Pirantel + Praziquantel",
      "spectrum": "Giardia duodenalis, nematódeos e cestódeos comuns de cães.",
      "dose_dog": "1 comprimido/10 kg VO q24h por 3 dias (5 mg/kg febantel, 14,4 mg/kg pirantel, 5 mg/kg praziquantel)",
      "dose_cat": "Usar formulações específicas felinas sem febantel (ou conforme bula especializada).",
      "indications": "Esquema alternativo de primeira linha para tratamento de giardíase canina clínica.",
      "cautions": "O febantel é metabolizado a fenbendazol no organismo. Repetir nos 3 dias consecutivos conforme protocolo para Giardia.",
      "mechanism": "Combinação sinérgica antiparasitária.",
      "prep_admin": "Comprimidos orais administrados com alimento.",
      "duration": "3 dias consecutivos.",
      "contraindications": "Gestantes no terço inicial da prenhez.",
      "adverse_effects": "Distúrbios digestivos transitórios leves."
    },
    {
      "name": "Imidocarb",
      "spectrum": "Protozoários intraeritrocitários: Babesia canis, Babesia vogeli, Babesia gibsoni e atividade adjuvante contra Anaplasma platys.",
      "dose_dog": "5,0 a 6,6 mg/kg SC ou IM profunda (aplicar 2 doses com intervalo de 14 dias)",
      "dose_cat": "2,5 a 3,0 mg/kg SC (aplicar com extrema cautela; monitorar sinais colinérgicos)",
      "indications": "Babesiose canina clínica aguda/crônica e tratamento de coinfecções transmitidas por carrapato associadas à erliquiose.",
      "cautions": "Efeitos adversos colinérgicos frequentes por inibição transitória da colinesterase: salivação intensa, vômito, diarreia, tremores e bradicardia. Pode-se administrar Atropina (0,04 mg/kg SC) 15 a 30 minutos antes para prevenir efeitos muscarínicos. Não aplicar por via intravenosa.",
      "mechanism": "Antiprotozoário diamidínico que interfere no metabolismo das poliaminas e bloqueia a síntese e transcrição do DNA do parasita.",
      "prep_admin": "Solução injetável estéril a 12%. Aplicar por via subcutânea na região dorsal ou intramuscular profunda.",
      "duration": "Protocolo de 2 aplicações espaçadas em 14 dias.",
      "contraindications": "Insuficiência renal ou hepática grave; hipersensibilidade ao dipropionato de imidocarb.",
      "adverse_effects": "Sialorreia, dor local e inchaço no ponto de injeção, náusea transitória."
    }
  ],
  "Antifúngicos": [
    {
      "name": "Itraconazol",
      "spectrum": "Fungos dimórficos e leveduras: Sporothrix brasiliensis, Microsporum canis, Malassezia pachydermatis, Blastomyces, Histoplasma.",
      "dose_dog": "5–10 mg/kg VO q24h junto com alimento gorduroso",
      "dose_cat": "≥3 kg: 100 mg/gato VO q24h | 1 a 3 kg: 50 mg/gato VO q24h | <1 kg: 25 mg/gato VO q24h",
      "indications": "Tratamento de primeira escolha para esporotricose felina e canina (Sporothrix brasiliensis). Dermatofitoses sistêmicas severas.",
      "cautions": "Hepatotóxico: dosar enzimas hepáticas (ALT, FA) antes e a cada 30 a 45 dias durante o tratamento. Em gatos com lesões na mucosa nasal, sinais respiratórios ou refratários ao itraconazol isolado, associar Iodeto de Potássio. As cápsulas podem ser abertas e incorporadas em alimento úmido/pastoso.",
      "mechanism": "Triazol antifúngico que inibe a enzima 14-alfa-desmetilase fúngica dependente do citocromo P450, bloqueando a conversão de lanosterol em ergosterol e alterando a integridade da membrana fúngica.",
      "prep_admin": "Cápsulas com microgrânulos ou solução oral. Administrar sempre junto com alimento para maximizar a absorção gástrica ácida.",
      "duration": "Tratamento prolongado: manter até a cura clínica completa e por mais 30 dias após o desaparecimento de todas as lesões cutâneas.",
      "contraindications": "Hepatopatia grave, fêmeas gestantes (teratogênico).",
      "adverse_effects": "Hepatotoxicidade (anorexia, vômitos, icterícia e elevação de ALT), perda de peso e depressão em gatos."
    },
    {
      "name": "Iodeto de Potássio",
      "spectrum": "Ação antifúngica e imunomoduladora adjuvante contra Sporothrix brasiliensis em felinos e caninos.",
      "dose_dog": "5–10 mg/kg VO q24h",
      "dose_cat": "2,5 a 5 mg/kg VO q24h (em resposta pobre, pode ser titulada gradativamente até 10-20 mg/kg q24h sob estrita vigilância)",
      "indications": "Tratamento associado ao Itraconazol em casos de esporotricose felina com alta carga fúngica, lesões respiratórias/mucosa nasal ou falha da monoterapia com itraconazol.",
      "cautions": "Risco de iodismo / tireotoxicose felina (hipersalivação, anorexia, perda de peso, descamação cutânea, hipotermia). Suspender temporariamente se surgirem sinais tóxicos.",
      "mechanism": "Ação imunomoduladora estimuladora da fagocitose por neutrófilos e macrófagos e atividade fungicida direta.",
      "prep_admin": "Cápsulas manipuladas ou solução oral aquosa administrada com alimento úmido.",
      "duration": "Mantido em conjunto com o Itraconazol até a resolução das lesões.",
      "contraindications": "Disfunção tireoidiana prévia, gestação.",
      "adverse_effects": "Iodismo (vômito, salivação profusa, anorexia, alopecia, hipertermia)."
    }
  ],
  "Antimicrobianos Tópicos": [
    {
      "name": "Ácido Fusídico (Tópico)",
      "spectrum": "Forte atividade contra Staphylococcus spp. (incluindo S. pseudintermedius). Inativo contra bactérias Gram-negativas.",
      "dose_dog": "Aplicar fina camada sobre a lesão cutânea limpa a cada 8 a 12 horas",
      "dose_cat": "Aplicar fina camada sobre a lesão limpa a cada 8 a 12 horas",
      "indications": "Uso tópico estrito em piodermite de superfície (intertrigo, dermatite úmida aguda) e piodermite superficial localizada quando a citologia confirma cocos Gram-positivos e a antissepsia isolada é insuficiente.",
      "cautions": "Não substitui a higiene e o uso prioritário de xampus antissépticos à base de Clorexidina 2-4%. Evitar que o animal lamba o local.",
      "mechanism": "Inibe o fator de elongação G (EF-G) nos ribossomos bacterianos, bloqueando a síntese proteica.",
      "prep_admin": "Pomada ou creme dermatológico a 2%.",
      "duration": "7 a 14 dias até remissão da lesão.",
      "contraindications": "Hipersensibilidade ao ácido fusídico.",
      "adverse_effects": "Irritação local discreta."
    },
    {
      "name": "Clorexidina (Tópico)",
      "spectrum": "Bactericida de amplo espectro (Gram-positivos, Gram-negativos e leveduras / Malassezia pachydermatis). Rompe a integridade da membrana celular bacteriana.",
      "dose_dog": "Solução aquosa 0,1% a 0,2% (mucosas, prepúcio, comissura vulvar); xampu 2% a 4% (banhos com 10 min de contato); loção/gel 0,5% a 1%.",
      "dose_cat": "Idem (usar formulações exclusivamente aquosas sem álcool; evitar contato com córnea e conduto auditivo com tímpano rompido).",
      "indications": "Primeira escolha padrão ouro para piodermites de superfície e superficiais (banhos 2 a 3x/semana), lavagem prepucial e vulvar antisséptica, higiene perineal na giardíase e desinfecção de feridas.",
      "cautions": "Ototóxico se houver perfuração da membrana timpânica. Irritante severo para o epitélio corneal (evitar contato ocular direto). Formulações alcoólicas são estritamente proibidas em mucosas e feridas abertas.",
      "mechanism": "Biguanida catiônica que se liga aos fosfolipídios da parede celular bacteriana, provocando lise osmótica e coagulação proteica citoplasmática.",
      "prep_admin": "Solução aquosa (0,1-0,2%), xampus dermatológicos (2-4%), lenços umedecidos e géis tópicos.",
      "duration": "Banhos dermatológicos: 2 a 3x por semana até 7 dias após a cura clínica total. Lavagens locais: 5 a 7 dias.",
      "contraindications": "Perfuração de membrana timpânica; uso ocular direto.",
      "adverse_effects": "Ressecamento cutâneo em banhos excessivos, dermatite de contato rara."
    }
  ],
  "Glicopeptídeos": [
    {
      "name": "Vancomicina (IV)",
      "spectrum": "Estritamente limitado a bactérias Gram-positivas, incluindo Staphylococcus resistentes à meticilina (MRSA/MRSP) e Enterococcus spp. Nenhuma atividade contra Gram-negativos.",
      "dose_dog": "15 mg/kg IV q6-8h OU CRI: 3.5 mg/kg (ataque) + 1.5 mg/kg/h. Oral (C. diff): 10-20 mg/kg PO q6h.",
      "dose_cat": "15 mg/kg IV q6-8h.",
      "indications": "Último recurso. Tratamento de infeções sistémicas graves e documentadas por bactérias Gram-positivas multirresistentes (MRSP, VRE) sem outras opções. Uso oral para enterite por C. difficile resistente a metronidazol.",
      "cautions": "Fármaco de saúde pública pertencente à Categoria Proibida/Restrita da EMA e sob controle máximo da CCIH HV-UFMG. Risco elevado de nefrotoxicidade. O uso empírico é formalmente proibido.",
      "mechanism": "Glicopeptídeo. Inibe a síntese da parede celular ligando-se aos terminais D-alanil-D-alanina dos precursores do peptidoglicano. Bactericida.",
      "prep_admin": "Pó para injeção. Reconstituir e diluir em D5W ou SF 0.9%.",
      "infusion": "Administração IV deve ser uma INFUSÃO LENTA (30-60 minutos). Bolus rápido causa a 'síndrome do homem vermelho' (libertação de histamina, hipotensão).",
      "duration": "Sistémico: semanas, dependendo da resposta. Oral: 7 dias.",
      "contraindications": "Hipersensibilidade. O uso empírico é contraindicado pelos princípios de uso racional de antimicrobianos.",
      "adverse_effects": "Nefrotoxicidade (principal risco), reações relacionadas à infusão ('síndrome do homem vermelho'), flebite, vómitos."
    }
  ],
  "Rifamicinas": [
    {
      "name": "Rifampicina",
      "spectrum": "Amplo espectro: Gram-positivos (incl. MRSP), micobactérias e patógenos intracelulares (Brucella, Ehrlichia).",
      "dose_dog": "5-10 mg/kg PO q24h.",
      "dose_cat": "5-10 mg/kg PO q24h.",
      "indications": "SEMPRE em terapia combinada. Infeções estafilocócicas graves (piodermite profunda, osteomielite por MRSP), infeções micobacterianas, brucelose.",
      "cautions": "A resistência desenvolve-se rapidamente em monoterapia. Risco significativo de hepatotoxicidade. Potente indutor do citocromo P450 (muitas interações medicamentosas: corticoides, azóis, fenobarbital, etc.).",
      "mechanism": "Inibe a RNA polimerase dependente de DNA bacteriana, bloqueando a síntese de RNA. Bactericida.",
      "prep_admin": "Cápsulas orais ou suspensão manipulada. Administrar com o estômago vazio para maximizar a absorção.",
      "duration": "Longo, várias semanas a meses.",
      "contraindications": "Hipersensibilidade. Doença hepática grave preexistente.",
      "adverse_effects": "Hepatotoxicidade (o mais grave), coloração vermelho-alaranjada de fluidos corporais (urina, lágrimas), distúrbios gastrointestinais."
    }
  ],
  "Fosfonatos": [
    {
      "name": "Fosfomicina",
      "spectrum": "Amplo espectro contra Gram-positivos e Gram-negativos, incluindo E. coli produtora de ESBL e VRE.",
      "dose_dog": "80 mg/kg PO q12h.",
      "dose_cat": "NÃO USAR. NEFROTÓXICO E FATAL.",
      "indications": "Cães: Tratamento de ITUs (cistites) bacterianas multirresistentes, confirmadas por cultura.",
      "cautions": "ABSOLUTAMENTE CONTRAINDICADA EM GATOS. Uso em cães é 'extra-label'. Uso criterioso para preservar eficácia.",
      "mechanism": "Inibe a primeira etapa da síntese da parede celular bacteriana (enzima MurA). Sem resistência cruzada com beta-lactâmicos.",
      "prep_admin": "Grânulos para suspensão oral ou suspensão manipulada. Administrar com alimentos.",
      "duration": "Curso de vários dias, conforme prescrito.",
      "contraindications": "GATOS (toxicidade fatal). Hipersensibilidade.",
      "adverse_effects": "Em cães: diarreia, diminuição do apetite, vómito."
    }
  ],
  "Imunossupressores": [
    {
      "name": "Ciclosporina",
      "spectrum": "Imunossupressor. Não é antibiótico, mas usado para tratar doenças imunomediadas e inflamatórias intestinais crônicas.",
      "dose_dog": "5–10 mg/kg VO q12h",
      "dose_cat": "5–10 mg/kg VO q12h",
      "indications": "Dermatite atópica, doença inflamatória intestinal (DII refratária a corticoides), pênfigo.",
      "cautions": "Imunossupressor. Monitorar função renal e hepática. Interações medicamentosas.",
      "mechanism": "Inibe a calcineurina, bloqueando a ativação de linfócitos T.",
      "prep_admin": "Cápsulas ou solução oral.",
      "duration": "Longo prazo, conforme necessário.",
      "contraindications": "Infecções ativas bacterianas ou fúngicas descontroladas.",
      "adverse_effects": "Hiperplasia gengival, distúrbios gastrintestinais leves."
    },
    {
      "name": "Tacrolimus",
      "spectrum": "Imunossupressor. Não é antibiótico, mas usado para tratar doenças imunomediadas.",
      "dose_dog": "0,1 mg/kg VO q12h (ou pomada tópica 0,03-0,1%)",
      "dose_cat": "0,1 mg/kg VO q12h",
      "indications": "Fístula perianal em cães, ceratoconjuntivite seca imunomediada refratária, dermatite atópica.",
      "cautions": "Imunossupressor potente.",
      "mechanism": "Inibe a calcineurina e a transcrição de interleucina-2.",
      "prep_admin": "Pomada tópica ou cápsulas.",
      "duration": "Longo prazo sob acompanhamento.",
      "contraindications": "Infecções ativas.",
      "adverse_effects": "Irritação tópica inicial, nefrotoxicidade em uso sistêmico de altas doses."
    }
  ],
  "Protetores e Moduladores Gástricos": [
    {
      "name": "Omeprazol",
      "spectrum": "Inibidor da bomba de prótons gástrica (não possui ação antibacteriana direta; adjuvante antisecretor).",
      "dose_dog": "0,5 a 1,0 mg/kg VO ou IV q12-24h (administrar 30 minutos antes do alimento)",
      "dose_cat": "0,5 a 1,0 mg/kg VO ou IV q12-24h (administrar 30 minutos antes do alimento)",
      "indications": "Tratamento de gastrite aguda e crônica, esofagite por refluxo, úlceras gástricas, profilaxia de sangramento por estresse e componente da terapia tripla para Helicobacter associada a biópsia comprovada.",
      "cautions": "O uso prolongado desnecessário (> 4-8 semanas) induz hipocloridria, hipergastrinemia de rebote e disbiose bacteriana entérica por perda da barreira ácida natural. Realizar desmame gradual após tratamentos de mais de 3 semanas.",
      "mechanism": "Inibidor irreversível da enzima H+/K+ ATPase na membrana secretora da célula parietal gástrica, suprimindo tanto a secreção ácida basal quanto a estimulada.",
      "prep_admin": "Cápsulas com microgrânulos gastrorresistentes (não triturar), suspensão oral manipulada ou pó liófilo para infusão intravenosa lenta.",
      "duration": "7 a 14 dias em gastrites agudas; até 21 a 28 dias em úlceras pépticas (fazer desmame).",
      "contraindications": "Hipersensibilidade conhecida a benzimidazóis substituídos.",
      "adverse_effects": "Diarreia branda, gases ou náusea transitória."
    }
  ]
};
