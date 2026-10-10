import type { EditorialReference } from '../types/common';
import type { MedicationDose, MedicationRecord } from '../types/medication';

/**
 * ConsultaVet — Auditoria farmacológica completa e registro de dados clínicos
 * Baseado na auditoria clínica de 04/10/2026 (Plumb's 10e, BSAVA 10e, consensos vigentes e RDC Anvisa nº 1.036/2026).
 */

export const MEDICATION_MONITORING_PARAMETERS: Record<string, string[]> = {
  acetilcisteina: [
    'Na intoxicação oxidativa (ex.: paracetamol), monitorar conforme o tóxico: hemograma seriado com avaliação de metemoglobinemia e presença de corpúsculos de Heinz ao esfregaço sanguíneo (especialmente em gatos), bioquímica sérica (ALT, AST, fosfatase alcalina, bilirrubinas totais e frações), coagulograma (tempo de protrombina / TP), eletrólitos e estado de hidratação.',
    'Durante administração intravenosa, manter vigilância contínua de pressão arterial, perfusão periférica, reflexo de êmese e sinais agudos de hipersensibilidade anafilactoide.',
    'Na nebulização brônquica, interromper imediatamente a inalação e reavaliar diante de tosse intensa, sibilos, broncoconstrição reflexa ou qualquer aumento do esforço respiratório (formalmente contraindicada em asma felina).',
    'Em melting corneano estromal, acompanhar a profundidade da úlcera por biomicroscopia ou lâmpada de fenda a cada 12 a 24 horas até parada da liquefação.',
  ],
  alopurinol: [
    'Durante terapia prolongada, realizar urinálise seriada a cada 1 a 3 meses: avaliar pH urinário, sedimento e vigilância rigorosa para cristalúria de xantina ou precipitação de urólitos radiotransparentes.',
    'Realizar ultrassonografia e/ou radiografia do trato urinário periodicamente para rastreio precoce de urolitíase iatrogênica por xantina.',
    'Monitorar função renal (ureia, creatinina, SDMA e densidade urinária), especialmente em cães com leishmaniose visceral e glomerulopatia secundária.',
    'Em leishmaniose canina, acompanhar resposta clínica, hemograma, proteinúria (UPC) e atividade/carga parasitária conforme protocolo LeishVet. O fármaco é leishmaniostático e não induz eliminação esterilizante do parasito.',
  ],
  amantadina: [
    'Avaliar escores clínicos de dor, conforto, capacidade de locomoção e melhora funcional da mobilidade em dor crônica/osteoartrite.',
    'Monitorar efeitos sobre o sistema nervoso central: sedação, hiperexcitabilidade paradoxal, agitação motora, tremores e ataxia.',
    'Acompanhar tolerância gastrointestinal (vômitos, hiporexia, diarreia e fezes amolecidas).',
    'Vigiar função renal e eletrólitos em nefropatas, visto que a excreção é predominantemente por filtração renal ativa.',
  ],
  amitriptilina: [
    'Monitorar frequência e ritmo cardíaco: o bloqueio de canais rápidos de sódio pode induzir alargamento de QRS, taquiarritmias e distúrbios de condução atrioventricular em superdosagens.',
    'Avaliar esvaziamento vesical e volume residual urinário pós-micção, principalmente em felinos com histórico de obstrução uretral (efeito anticolinérgico relaxante do detrusor).',
    'Acompanhar grau de sedação inicial, ganho de peso, constipação intestinal e resposta comportamental ou analgésica.',
    'Em cistite idiopática felina (FIC), diretrizes iCatCare 2025 sustentam seu uso exclusivamente como coadjuvante em casos crônicos refratários após falha de manejo ambiental (MEMO); não utilizar na crise aguda.',
  ],
  'amoxicilina-clavulanato': [
    'Acompanhar a evolução clínica da lesão e regressão dos sinais flogísticos (febre, secreção, edema, dor).',
    'Monitorar tolerância gastrintestinal: náusea, êmese e diarreia osmótica/disbiose secundária ao clavulanato.',
    'Vigiar reações agudas de hipersensibilidade imunomediada (urticária, edema angioneurótico, anafilaxia).',
    'Priorizar stewardship antimicrobiano: direcionar tempo de tratamento e escolha por cultura bacteriana e antibiograma sempre que viável.',
  ],
  'ampicilina-sulbactam': [
    'Monitorar parâmetros sépticos e resposta infecciosa: curva térmica, leucometria com desvio nuclear, proteína C-reativa e sinais vitais.',
    'Inspecionar o cateter e acesso venoso quanto a sinais de flebite, extravasamento tecidual e dor local.',
    'Acompanhar função renal e equilíbrio eletrolítico em pacientes graves ou azotêmicos.',
    'Não utilizar a redução empírica de 22 mg/kg q12h como regra universal em azotemia; estudos PK de 2025 em cães azotêmicos utilizaram 22 mg/kg da associação q8h sob monitoramento individual.',
  ],
  betanecol: [
    'AVALIAÇÃO OBRIGATÓRIA PRÉVIA: excluir formalmente obstrução mecânica do trato urinário e certificar-se de que a resistência de saída uretral esteja aliviada.',
    'Monitorar volume urinário residual pós-miccional por palpação e ultrassonografia vesical.',
    'Acompanhar frequência cardíaca (risco de bradicardia) e sinais de toxicidade colinérgica muscarínica (hipersalivação, êmese, diarreia, cólica abdominal intensa, broncoespasmo).',
  ],
  buprenorfina: [
    'Avaliar analgesia por meio de escalas de dor validadas (Escala de Glasgow Modificada, Escala de Colorado ou Feline Grimace Scale).',
    'Monitorar nível de sedação, frequência e profundidade respiratória, e oximetria de pulso.',
    'Em gatos, monitorar temperatura corporal a cada 2 a 4 horas pelo risco de hipertermia pós-opioide.',
    'Em infusão intravenosa contínua (CRI), monitorar estabilidade e taxa horária estrita (unidade mg/kg/h).',
  ],
  capromorelina: [
    'Acompanhar peso corporal semanal e escores de condição corporal (ECC) e condição muscular (ECM).',
    'Monitorar ingestão calórica diária voluntária e aceitação alimentar.',
    'Vigiar glicemia em pacientes com diabetes ou risco de hiperglicemia secundária ao eixo GH/IGF-1.',
    'Avaliar função renal seriada (creatinina, SDMA, fósforo e UPC) em felinos com DRC associada à perda de peso.',
  ],
  ceftriaxona: [
    'Acompanhar resposta infecciosa, defervescência térmica, leucograma e proteína C-reativa.',
    'Inspecionar periodicamente a permeabilidade da via venosa e ausência de dor ou flebite.',
    'Monitorar função renal e parâmetros hepáticos em pacientes internados críticos.',
    'CONTRAINDICAÇÃO ABSOLUTA DE DILUIÇÃO: nunca administrar soluções contendo cálcio (como Ringer Lactato) na mesma via ou equipo de infusão pelo risco de precipitação letal de ceftriaxona cálcica.',
  ],
  ciclosporina: [
    'Avaliar resposta clínica cutânea (escores CADESI na dermatite atópica canina ou SCORFAD na dermatite alérgica felina) ou imunomediada.',
    'Realizar hemograma completo, painel bioquímico (creatinina, ureia, ALT, fosfatase alcalina) e urinálise basal e seriada a cada 3 a 6 meses.',
    'Exame odontológico e dermatológico periódico para detecção precoce de hiperplasia gengival, papilomatose viral ou tricomegalia.',
    'Em gatos, realizar sorologia prévia para Toxoplasma gondii; monitorar títulos e proibir rigorosamente carne crua ou hábitos de caça durante o tratamento.',
  ],
  ciproeptadina: [
    'No uso como estimulante do apetite em gatos, monitorar consumo voluntário de alimento e ganho de peso corporal.',
    'Na síndrome serotoninérgica, avaliar frequência cardíaca, temperatura retal, tremores, rigidez muscular, tônus autonômico e nível de consciência.',
    'Vigiar retenção urinária e constipação secundárias ao efeito antimuscarínico.',
  ],
  clindamicina: [
    'Acompanhar regressão clínica do foco infeccioso (resolução de piodermite, osteomielite ou infecção odontológica).',
    'Em gatos tratados por via oral, vigiar atentamente qualquer sinal de esofagite: ptialismo, disfagia, regurgitação ou dor à deglutição.',
    'Em toxoplasmose e neosporose, acompanhar regressão de déficits neurológicos, lesões oculares (uveíte) e miosite.',
  ],
  clorambucil: [
    'Realizar hemograma completo com contagem de plaquetas antes de cada ciclo/início de terapia e a cada 2 a 4 semanas nas primeiras 8 a 12 semanas, espaçando a cada 1 a 2 meses se estável.',
    'Adiar ou suspender a dose caso ocorra neutropenia (< 1.500/µL) ou trombocitopenia (< 75.000–100.000/µL).',
    'Monitorar função hepática (ALT, fosfatase alcalina) e sinais clínicos gastrintestinais.',
    'Em enteropatia crônica/PLE canina, monitorar albumina sérica, escore CCECAI e ganho de peso corporal.',
  ],
  diazepam: [
    'Em emergência convulsiva, monitorar término do evento ictálico, padrão respiratório, reflexos laríngeos e oximetria de pulso.',
    'ALERTA HEPÁTICO FELINO: o diazepam por via oral contínua em gatos associa-se a necrose hepática fulminante idiossincrática fatal; a via oral crônica é contraindicada na espécie, mas a via IV emergencial para cessar crises agudas é segura.',
    'Durante infusão intravenosa contínua (CRI), monitorar adsorção ao plástico do equipo e compatibilidade física; taxa expressa em mg/kg/h.',
  ],
  dipirona: [
    'Monitorar eficácia álgica com escalas clínicas de dor; avaliar temperatura corporal e hidratação.',
    'Na administração intravenosa, realizar injeção lenta ou diluída para prevenir hipotensão arterial aguda mediada por vasodilatação periférica.',
    'Em terapias repetidas além de 48 a 72 horas, realizar hemograma completo para controle hematológico.',
    'Evitar associação rotineira e simultânea com anti-inflamatórios não esteroidais (AINEs) ou corticosteroides sem justificativa clínica formal.',
  ],
  domperidona: [
    'Monitorar melhora da motilidade digestiva alta, esvaziamento gástrico e redução de episódios de refluxo ou regurgitação.',
    'Em leishmaniose canina como imunoestimulante/preventivo, avaliar proteinúria, sorologia e resposta clínica celular.',
    'Acompanhar ausência de efeitos extrapiramidais e avaliar galactorreia secundária à hiperprolactinemia.',
  ],
  enrofloxacina: [
    'ALERTA RETINIANO FELINO CRÍTICO: gatos NUNCA devem receber doses superiores a 5 mg/kg/dia sob hipótese alguma, devido ao risco documentado de degeneração retiniana aguda e cegueira permanente irreversível mediada por deficiência do transportador ABCG2.',
    'Monitorar resolução do foco infeccioso guiada por cultura e antibiograma.',
    'Em cães jovens de raças grandes e gigantes, atentar para toxicidade sobre cartilagens articulares de crescimento (artropatia bolhosa).',
  ],
  gabapentina: [
    'Avaliar escores de dor neuropática/crônica e mobilidade.',
    'Monitorar grau de sedação, ataxia, fraqueza de membros pélvicos e marcha.',
    'Em pacientes nefropatas crônicos, monitorar creatinina/SDMA e considerar redução posológica ou aumento do intervalo de dosagem, visto que a depuração é predominantemente renal.',
  ],
  'hidroxido-de-aluminio': [
    'Monitorar fósforo sérico a cada 2 a 4 semanas durante a titulação inicial da dose para atingir as metas recomendadas pelas diretrizes internacionais do IRIS para cada estágio de DRC.',
    'Acompanhar cálcio sérico total e iônico, calculando o produto Ca × P (que deve permanecer < 55–60).',
    'Avaliar consistência fecal e constipação intestinal, o efeito adverso mais frequente.',
    'Em pacientes com DRC avançada em uso por muitos meses, vigiar sinais de toxicidade por alumínio (fraqueza, microcitose, alterações neurológicas).',
  ],
  levetiracetam: [
    'Manter diário de crises epilépticas (data, duração, gravidade e frequência de episódios).',
    'Monitorar sedação e ataxia nas primeiras 1 a 2 semanas de introdução.',
    'Acompanhar função renal periódica em pacientes geriátricos ou com DRC.',
    'Se combinado a indutores enzimáticos potentes (como fenobarbital), atentar para menor tempo de meia-vida do levetiracetam.',
  ],
  marbofloxacina: [
    'Avaliar resolução clínica do foco bacteriano e acompanhar cura microbiológica com cultura e antibiograma.',
    'Monitorar função renal e parâmetros gastrintestinais em terapias prolongadas.',
    'Em hemoplasmose felina (ABCD 2026), monitorar melhora de hematócrito/anemia e carga do parasito por PCR.',
  ],
  meloxicam: [
    'VIGILÂNCIA CRÍTICA DA DOSE CANINA: a dose de 0,2 mg/kg é estritamente uma dose de ataque para o DIA 1; a partir do DIA 2 a dose de manutenção é de 0,1 mg/kg q24h.',
    'Monitorar função renal (creatinina, ureia, SDMA e densidade urinária), hidratação e pressão arterial.',
    'Acompanhar sinais gastrintestinais de intolerância e lesão mucosa: êmese, anorexia, diarreia e fezes enegrecidas (melena).',
    'Contraindicado em pacientes hipovolêmicos, desidratados, hipotensos ou com doença renal descompensada.',
  ],
  metadona: [
    'Avaliar escores de dor a cada 1 a 2 horas durante a fase aguda pós-operatória ou traumática.',
    'Monitorar frequência e padrão ventilatório, oximetria de pulso (SpO2) e nível de sedação.',
    'Acompanhar frequência e ritmo cardíaco: o estímulo vagal central pode induzir bradicardia (reversível com atropina se hemodinamicamente significativa).',
    'Em infusão intravenosa contínua (CRI), monitorar taxa horária estrita expressa em mg/kg/h.',
  ],
  metoclopramida: [
    'Monitorar frequência de episódios de vômito, esvaziamento gástrico e resolução de estase.',
    'Vigiar sinais extrapiramidais do SNC (agitação, vocalização, desorientação, espasmos musculares), mais frequentes em felinos e após injeção rápida.',
    'Acompanhar balanço hidroeletrolítico e diurese.',
  ],
  'micofenolato-mofetila': [
    'Realizar hemograma completo basal e seriado semanal no primeiro mês de tratamento, acompanhando neutropenia e contagem de plaquetas.',
    'Monitorar tolerância digestiva: a diarreia severa, enterite e hematoquezia são os principais fatores limitantes da dose.',
    'Vigiar o surgimento de infecções bacterianas ou fúngicas oportunistas decorrentes da imunossupressão.',
  ],
  miltefosina: [
    'Monitorar tolerância gastrintestinal diária (êmese, diarreia e anorexia são comuns no início do ciclo de 28 dias).',
    'Realizar painel renal (ureia, creatinina, SDMA, urinálise e UPC) e hepático antes de iniciar e a cada 14 dias.',
    'Acompanhar regressão de sinais clínicos de leishmaniose e carga parasitária após o término do protocolo.',
  ],
  mirtazapina: [
    'Monitorar consumo alimentar diário, apetite e curva de peso corporal.',
    'Em felinos, monitorar alterações comportamentais: vocalização excessiva, afeto exagerado, agitação psicomotora, tremores e midríase (sinais de toxicidade/síndrome serotoninérgica).',
    'Acompanhar função renal e enzimas hepáticas; em DRC ou hepatopatia felina, estender o intervalo de administração para q48h ou q72h.',
  ],
  molidustat: [
    'Monitorar hematócrito e hemoglobina a cada 1 a 2 semanas até estabilização do hematócrito alvo (geralmente 28% a 35% em felinos com anemia da DRC).',
    'Acompanhar pressão arterial sistêmica (risco de hipertensão arterial induzida por estímulo eritropoético).',
    'Avaliar status de ferro sérico (ferritina e saturação de transferrina) para garantir substrato para a eritropoese.',
  ],
  fenobarbital: [
    'Manter diário de crises convulsivas (frequência, tipo, severidade e duração de episódios).',
    'Realizar dosagem da concentração sérica de fenobarbital (TDM) após 2 a 3 semanas do início do tratamento ou de cada ajuste posológico (faixa terapêutica alvo recomendada: 15 a 45 µg/mL; em cães usualmente 15 a 35 µg/mL).',
    'Avaliar ALT, fosfatase alcalina, albumina sérica, ácidos biliares e hemograma a cada 6 meses (ou antes se houver perda de controle de crises ou suspeita de hepatotoxicidade).',
    'Monitorar sinais de sedação, ataxia, polifagia, poliúria/polidipsia e ganho de peso.',
  ],
  pradofloxacina: [
    'Monitorar regressão clínica do quadro infeccioso (piodermite, feridas, infecções do trato respiratório superior).',
    'Em gatos com hemoplasmose (ABCD 2026), acompanhar hemograma completo e PCR seriada.',
    'Acompanhar tolerância digestiva (náusea e fezes amolecidas).',
  ],
  prednisolona: [
    'REGRA CRÍTICA DE DIVISÃO POSOLÓGICA: a dose imunossupressora é expressa como DOSE DIÁRIA TOTAL (ex.: 2 mg/kg/dia). Se o protocolo indicar divisão a cada 12 horas, cada tomada deve ser de METADE DO TOTAL (1 mg/kg por dose q12h), NUNCA repetindo a dose diária inteira em cada administração.',
    'Monitorar resolução do quadro inflamatório ou imunomediado.',
    'Acompanhar peso corporal, atrofia muscular, sede, apetite e volume urinário (PU/PD/polifagia).',
    'Realizar monitoramento de glicemia (especialmente em gatos pelo risco de diabetes mellitus secundário), pressão arterial, hemograma, enzimas hepáticas e urinálise para rastreio de bacteriúria assintomática.',
    'Desmame gradual obrigatório após tratamentos com duração superior a 1 a 2 semanas para evitar crise de hipoadrenocorticismo secundário à supressão do eixo HPA.',
  ],
  pronefra: [
    'Monitorar fósforo sérico, cálcio total e iônico, e produto cálcio × fósforo a cada 4 a 8 semanas na DRC.',
    'Acompanhar parâmetros de função renal (creatinina, SDMA, ureia) e densidade urinária.',
    'Avaliar aceitação do produto, palatabilidade e consistência fecal.',
  ],
  sucralfato: [
    'Monitorar alívio de sinais de úlcera gastroduodenal e esofagite: redução de dor epigástrica, resolução de hematêmese, melena e regurgitação.',
    'Acompanhar frequência e consistência das evacuações (constipação intestinal).',
    'Em pacientes nefropatas crônicos em uso prolongado, monitorar risco de absorção e sobrecarga residual de alumínio.',
  ],
  'sulfametoxazol-trimetoprima': [
    'VIGILÂNCIA DE CERATOCONJUNTIVITE SECA (KCS): realizar teste lacrimal de Schirmer basal e periódico em cães submetidos a tratamentos superiores a 7 a 10 dias.',
    'Monitorar sinais de poliartrite imunomediada (febre, claudicação migratória, rigidez articular), particularmente em cães da raça Dobermann Pinscher.',
    'Realizar hemograma completo e enzimas hepáticas em cursos prolongados (risco de hepatopatia idiossincrática e citopenias).',
    'Monitorar urinálise quanto a sedimento e presença de cristalúria de sulfonamida em urina ácida concentrada.',
  ],
  tramadol: [
    'EFICÁCIA ESPÉCIE-DEPENDENTE: cães produzem quantidades mínimas do metabólito ativo M1 (o-desmetiltramadol), resultando em analgesia oral inconsistente e insatisfatória como monoterapia na dor crônica; avaliar analgesia com escalas de dor e nunca depender do tramadol como único analgésico.',
    'Em felinos, a formação de M1 é mais expressiva; monitorar escores de sedação, disforia, pupilas dilatadas (midríase) e salivação intensa.',
    'Vigiar risco de síndrome serotoninérgica quando associado a outros agentes serotoninérgicos (fluoxetina, amitriptilina, clomipramina, trazodona, mirtazapina).',
  ],
  trazodona: [
    'Avaliar resposta de sedação, relaxamento, redução de ansiedade e fobias situacionais.',
    'Monitorar hipotensão postural (bloqueio alfa-1 adrenérgico) e ataxia em pacientes geriátricos.',
    'Vigiar sinais de síndrome serotoninérgica quando associada a outros fármacos de ação central.',
  ],
};

export const MEDICATION_CLIENT_INFORMATION: Record<string, string[]> = {
  acetilcisteina: [
    'A solução tem odor e sabor sulfurados característicos (semelhante a enxofre) e pode provocar náusea ou vômito se administrada por via oral.',
    'Em casos de intoxicação acidental (como ingestão de paracetamol), o tratamento exige internação imediata e acompanhamento estrito em ambiente hospitalar.',
    'Se prescrita para nebulização ou inalação, suspenda o uso e procure atendimento veterinário urgente caso o animal apresente tosse forte, chiado no peito ou dificuldade para respirar.',
  ],
  alopurinol: [
    'Estimular ingestão hídrica abundante durante todo o tratamento com fontes de água fresca e alimentos úmidos para reduzir o risco de formação de pedras na urina.',
    'Adesão rigorosa à dieta prescrita com restrição de purinas é mandatória; o descumprimento dietético pode provocar cálculos urinários de difícil dissolução.',
    'Contatar imediatamente o médico-veterinário caso observe esforço para urinar, urina com sangue, gotejamento ou ausência de micção.',
  ],
  amantadina: [
    'Medicamento de controle especial com retenção de receita (Lista C1). Manter em local seguro.',
    'Atua como adjuvante para modular a dor crônica e sensibilização central ("wind-up"), devendo ser associado a outros analgésicos e condutas de reabilitação física.',
    'Observar sonolência excessiva, inquietação ou tremores nos primeiros dias de uso; não altere a dose ou interrompa o tratamento sem consultar o veterinário.',
  ],
  amitriptilina: [
    'Medicamento controlado sujeito a retenção de receita (Lista C1). Armazenar em local seguro.',
    'Sedação e sonolência são frequentes nas primeiras 1 a 2 semanas e costumam reduzir gradualmente.',
    'NUNCA interrompa o tratamento de forma repentina após semanas de uso: o desmame deve ser feito gradualmente ao longo de 2 a 3 semanas para evitar síndrome de descontinuação.',
    'Informe imediatamente o médico-veterinário caso o animal apresente dificuldade ou ausência de micção, constipação severa ou prostração.',
  ],
  'amoxicilina-clavulanato': [
    'Para diminuir o risco de enjoo e vômito, administre o medicamento junto com uma pequena refeição ou alimento úmido.',
    'Cumpra rigorosamente os dias prescritos e os intervalos de horário (a cada 12 horas), sem interromper antes do prazo mesmo que o animal pareça curado.',
    'As suspensões orais líquidas reconstituídas devem ser mantidas obrigatoriamente na geladeira (2 a 8 °C) e descartadas após o prazo estipulado na embalagem (geralmente 7 a 14 dias).',
  ],
  'ampicilina-sulbactam': [
    'Medicamento de uso injetável restrito a hospitais, clínicas veterinárias ou internação intensiva.',
    'A administração é feita por infusão intravenosa lenta devidamente diluída para segurança vascular.',
  ],
  betanecol: [
    'Administrar com o estômago vazio (1 hora antes ou 2 horas após a alimentação) para diminuir náusea e vômito.',
    'Suspender imediatamente o medicamento e buscar socorro veterinário urgente caso o animal tente urinar sem conseguir, salive abundantemente ou apresente fraqueza súbita.',
  ],
  buprenorfina: [
    'Medicamento entorpecente controlado de tarja preta (Lista A1). Guardar em local trancado, seguro e longe do alcance de crianças.',
    'Em gatos por via transmucosa oral (OTM): depositar o líquido suavemente na gengiva ou na mucosa interna da bochecha, sem forçar o animal a engolir.',
    'Contatar o veterinário caso o paciente apresente sonolência profunda, respiração excessivamente lenta ou febre.',
  ],
  capromorelina: [
    'Administrar por via oral uma vez ao dia no mesmo horário, diretamente na boca com a seringa dosadora fornecida pelo fabricante.',
    'Em felinos, salivação e lambedura excessiva dos lábios são reações comuns e transitórias logo após a aplicação.',
    'O produto atua estimulando o apetite e revertendo a perda de massa magra, mas não substitui o tratamento da doença primária (como a doença renal).',
  ],
  ceftriaxona: [
    'Medicamento antibiótico injetável administrado exclusivamente em ambiente veterinário hospitalar.',
    'Cumpra rigorosamente as revisões e o acompanhamento ambulatorial prescrito.',
  ],
  ciclosporina: [
    'Administrar com o estômago vazio (1 a 2 horas antes ou após as refeições) para máxima absorção. Se houver vômito, consulte o veterinário: congelar as cápsulas ou administrá-las com uma pequena porção de comida pode auxiliar.',
    'Gatos que recebem ciclosporina NUNCA devem ter acesso à rua, caça ou carne crua, devido ao risco aumentado de toxoplasmose fatal.',
    'Não interrompa nem altere a marca do medicamento sem orientação, pois as diferentes formulações não são equivalentes.',
  ],
  ciproeptadina: [
    'Pode causar sonolência no início do tratamento. Em alguns gatos, pode ocorrer uma reação paradoxal de agitação, miados e inquietação.',
    'Informe o médico-veterinário caso note ressecamento na boca, dificuldade para urinar ou intestino preso.',
  ],
  clindamicina: [
    'ALERTA ESSENCIAL PARA GATOS: NUNCA dê comprimidos ou cápsulas secas ao gato. Sempre ofereça água em seringa (5 a 10 mL) ou petisco úmido/sachê logo após a administração para garantir que a cápsula desça para o estômago e não machuque a parede do esôfago.',
    'Administre sempre junto com uma refeição para evitar irritação gástrica.',
    'Respeite rigorosamente a duração prescrita, sem interrupções precoces.',
  ],
  clorambucil: [
    'MEDICAMENTO QUIMIOTERÁPICO CITOTÓXICO. Manter sob refrigeração constante (2 a 8 °C) e protegido da luz.',
    'Manusear obrigatoriamente com luvas descartáveis de nitrilo. NUNCA parta, corte ou triture os comprimidos.',
    'Mulheres grávidas ou que pretendam engravidar e lactantes não devem manusear os comprimidos nem ter contato com as fezes ou urina do animal por 48 horas após a dose.',
  ],
  diazepam: [
    'Medicamento psicotrópico de controle rigoroso (Lista B1, notificação azul). Guardar trancado fora do alcance de terceiros.',
    'Para uso emergencial em crises convulsivas domiciliares por via retal, administre a dose prescrita e dirija-se imediatamente a um hospital veterinário.',
    'Em gatos, nunca utilize comprimidos por via oral contínua devido ao risco de lesão hepática grave.',
  ],
  dipirona: [
    'Administrar preferencialmente após refeição para reduzir desconforto gástrico.',
    'O produto pode causar salivação imediata em gatos caso o comprimido seja mastigado, devido ao sabor amargo; utilize formas adequadas ou administre com alimento úmido.',
    'Comunique o médico-veterinário se notar prostração, vômitos, sangramentos ou se a dor persistir.',
  ],
  domperidona: [
    'Administrar cerca de 15 a 30 minutos antes das refeições para otimizar o efeito estimulante da motilidade gástrica.',
    'Em cães em protocolo de leishmaniose, seguir exatamente os ciclos mensais de tratamento prescritos.',
  ],
  enrofloxacina: [
    'GATOS: se notar que o felino está desorientado, esbarrando em paredes/móveis ou com as pupilas muito dilatadas, suspenda o uso imediatamente e procure o hospital veterinário com urgência.',
    'Não ofereça o medicamento junto com leite, queijo, suplementos minerais (ferro, cálcio, zinco) ou antiácidos, pois eles cortam o efeito do remédio; mantenha um intervalo de pelo menos 2 horas.',
  ],
  gabapentina: [
    'Medicamento controlado sujeito a retenção de receita (Lista C1).',
    'ATENÇÃO PARA CÃES: Soluções orais líquidas feitas para seres humanos frequentemente contêm xilitol como adoçante, que é extremamente tóxico e pode causar insuficiência hepática e hipoglicemia fatal em cães. Use apenas comprimidos, cápsulas ou soluções veterinárias sem xilitol.',
    'Sonolência e andar desengonçado são normais no início do tratamento. Proteja o animal de escadas.',
    'Não interrompa de uma vez após uso prolongado: o desmame deve ser gradual.',
  ],
  'hidroxido-de-aluminio': [
    'O medicamento DEVE ser administrado misturado diretamente à comida em cada refeição, pois sua função é grudar no fósforo do alimento e impedir sua absorção pelo intestino.',
    'Se o animal não for comer, não forneça o medicamento em jejum.',
    'Pode ressecar as fezes do animal; avise o veterinário se notar dificuldade para evacuar.',
  ],
  levetiracetam: [
    'Medicamento anticonvulsivante sujeito a retenção de receita (Lista C1).',
    'Pontualidade rigorosa nos horários: administrar a cada 8 horas para a formulação comum ou a cada 12 horas para a formulação XR de liberação prolongada.',
    'NUNCA parta, mastigue ou triture os comprimidos XR (liberação estendida), pois isso destrói o mecanismo do comprimido e causa liberação tóxica imediata.',
    'Caso esqueça uma dose, forneça assim que lembrar, mas NUNCA dobre a dose na tomada seguinte.',
  ],
  marbofloxacina: [
    'Administrar uma vez ao dia no mesmo horário.',
    'Separar a tomada de qualquer suplemento mineral com cálcio, ferro, zinco, bem como laticínios ou antiácidos, por no mínimo 2 horas.',
  ],
  meloxicam: [
    'Administre sempre junto com a comida ou logo após o animal ter comido.',
    'NUNCA dê uma dose maior do que a prescrita e use exclusivamente a seringa dosadora do produto.',
    'Interrompa imediatamente o medicamento e leve o paciente ao veterinário se notar vômito, perda de apetite, fezes pretas como borra de café ou fraqueza.',
    'NUNCA misture meloxicam com outros anti-inflamatórios ou corticoides.',
  ],
  metadona: [
    'Medicamento opioide potente e controlado de uso estrito hospitalar e ambulatorial supervisionado (Lista A1).',
    'Em dispensação domiciliar autorizada, guarde sob chave e fora do alcance de qualquer outra pessoa ou animal.',
  ],
  metoclopramida: [
    'Administrar cerca de 30 minutos antes da alimentação para prevenção de êmese e refluxo.',
    'Contatar o veterinário caso o animal apresente agitação incomum, espasmos musculares ou sonolência profunda.',
  ],
  'micofenolato-mofetila': [
    'MEDICAMENTO IMUNOSSUPRESSOR COM RISCO TERATOGÊNICO: mulheres grávidas ou que pretendam engravidar NÃO devem manusear os comprimidos ou ter contato com as excretas do animal.',
    'Manuseie sempre com luvas e nunca quebre ou esmague os comprimidos.',
    'Procure o veterinário imediatamente se o animal apresentar diarreia intensa, vômito, sangue nas fezes ou febre.',
  ],
  miltefosina: [
    'Administrar sempre junto com a refeição principal para minimizar náuseas e vômitos.',
    'Cumprir os 28 dias ininterruptos de tratamento; mulheres grávidas não devem manusear o produto.',
  ],
  mirtazapina: [
    'Medicamento de controle especial com retenção de receita (Lista C1).',
    'Pomada transdérmica felina: aplique na parte interna sem pelos da orelha (concha auricular) usando luvas descartáveis de procedimento. Alterne as orelhas a cada aplicação (orelha direita em um dia, orelha esquerda no dia seguinte) e limpe os resíduos com gaze seca antes da nova dose.',
    'Em gatos, avise o veterinário se o animal começar a miar sem parar ou ficar excessivamente agitado.',
  ],
  molidustat: [
    'Administrar uma vez ao dia com ou sem alimento; não interromper sem reavaliação hematológica periódica.',
    'Acompanhar a pressão arterial do felino conforme solicitado pelo médico-veterinário.',
  ],
  fenobarbital: [
    'ALERTA DE SEGURANÇA VITAL: NUNCA interrompa ou suspenda o fornecimento deste medicamento por conta própria. A interrupção súbita pode desencadear crises convulsivas violentas, ininterruptas e fatais (status epilepticus).',
    'Sonolência, aumento da fome e da sede e um andar cambaleante são muito frequentes nas primeiras 2 a 3 semanas e tendem a diminuir conforme o organismo se adapta.',
    'Administre com rigor absoluto nos mesmos horários a cada 12 horas.',
  ],
  pradofloxacina: [
    'Agite muito bem a suspensão oral antes de cada aplicação.',
    'Administre uma vez ao dia no mesmo horário, diretamente na boca do paciente utilizando a seringa dosadora.',
    'Evite fornecer o medicamento junto com leite, iogurte ou suplementos com ferro e cálcio.',
  ],
  prednisolona: [
    'Administre sempre junto com comida para proteger o estômago.',
    'O animal sentirá mais sede, mais fome e urinará com maior frequência e volume: NUNCA limite o acesso à água limpa e fresca.',
    'NUNCA pare de dar o remédio de repente após semanas de uso: a retirada deve ser feita de forma gradual (desmame) segundo o cronograma montado pelo veterinário.',
  ],
  pronefra: [
    'Suplemento quelante oral para cães e gatos com doença renal crônica. Composição oficial: carbonato de cálcio, hidrolisado de peixe, carbonato de magnésio e quitosana.',
    'Agitar vigorosamente o frasco antes de cada uso. Administrar duas vezes ao dia diretamente na boca ou misturado à comida no momento da refeição.',
  ],
  sucralfato: [
    'Administre com o estômago vazio, idealmente 1 hora antes das refeições.',
    'O sucralfato forma uma barreira protetora que impede a absorção de outros medicamentos: SEMPRE mantenha um intervalo de pelo menos 2 horas entre o sucralfato e qualquer outro remédio oral.',
  ],
  'sulfametoxazol-trimetoprima': [
    'Mantenha água limpa e fresca sempre disponível em abundância para garantir hidratação e evitar cristais na urina.',
    'Procure o veterinário com urgência se notar secreção amarelada/crostas nos olhos, olhos vermelhos, dificuldade para se levantar, mancar ou febre.',
  ],
  tramadol: [
    'Medicamento analgésico de controle especial com retenção de receita (Lista A2).',
    'Cães têm absorção e ativação muito variáveis desse remédio; se perceber que o animal ainda sente dor, avise o médico-veterinário para adicionar ou trocar de analgésico.',
    'Em gatos, pode ocorrer salivação e agitação motora; não force caso haja vômitos.',
  ],
  trazodona: [
    'Administrar cerca de 90 a 120 minutos antes do evento estressor (viagem, tempestade, fogos de artifício ou consulta veterinária).',
    'Pode induzir sonolência profunda e andar cambaleante; mantenha o animal em local seguro e livre de riscos de queda.',
  ],
};

export const MEDICATION_CONTROL_NOTICES: Record<string, { isControlled: boolean; controlNotice: string }> = {
  buprenorfina: {
    isControlled: true,
    controlNotice: 'Sujeito a Notificação de Receita A (Lista A1 — Portaria SVS/MS nº 344/1998 / RDC Anvisa nº 1.036/2026).',
  },
  metadona: {
    isControlled: true,
    controlNotice: 'Sujeito a Notificação de Receita A (Lista A1 — Portaria SVS/MS nº 344/1998 / RDC Anvisa nº 1.036/2026).',
  },
  tramadol: {
    isControlled: true,
    controlNotice: 'Sujeito a Notificação de Receita A2 (Portaria SVS/MS nº 344/1998); preparações farmacêuticas contendo até 100 mg por unidade posológica ficam sujeitas a Receita de Controle Especial em 2 vias conforme adendo vigente (RDC Anvisa nº 1.036/2026).',
  },
  diazepam: {
    isControlled: true,
    controlNotice: 'Sujeito a Notificação de Receita B (Lista B1 — Portaria SVS/MS nº 344/1998 / RDC Anvisa nº 1.036/2026).',
  },
  fenobarbital: {
    isControlled: true,
    controlNotice: 'Medicamento da Lista B1 (Portaria SVS/MS nº 344/1998); medicamentos contendo fenobarbital estão sujeitos a Receita de Controle Especial em 2 vias com retenção conforme adendo vigente (RDC Anvisa nº 1.036/2026).',
  },
  amantadina: {
    isControlled: true,
    controlNotice: 'Sujeito a Receita de Controle Especial em 2 vias (Portaria SVS/MS nº 344/1998, Lista C1 / RDC Anvisa nº 1.036/2026).',
  },
  amitriptilina: {
    isControlled: true,
    controlNotice: 'Sujeito a Receita de Controle Especial em 2 vias (Portaria SVS/MS nº 344/1998, Lista C1 / RDC Anvisa nº 1.036/2026).',
  },
  gabapentina: {
    isControlled: true,
    controlNotice: 'Sujeito a Receita de Controle Especial em 2 vias (Portaria SVS/MS nº 344/1998, Lista C1 / RDC Anvisa nº 1.036/2026).',
  },
  levetiracetam: {
    isControlled: true,
    controlNotice: 'Sujeito a Receita de Controle Especial em 2 vias (Portaria SVS/MS nº 344/1998, Lista C1 / RDC Anvisa nº 1.036/2026).',
  },
  miltefosina: {
    isControlled: true,
    controlNotice: 'Sujeito a Receita de Controle Especial em 2 vias (Portaria SVS/MS nº 344/1998, Lista C1 / RDC Anvisa nº 1.036/2026).',
  },
  mirtazapina: {
    isControlled: true,
    controlNotice: 'Sujeito a Receita de Controle Especial em 2 vias (Portaria SVS/MS nº 344/1998, Lista C1 / RDC Anvisa nº 1.036/2026).',
  },
  pregabalina: {
    isControlled: true,
    controlNotice: 'Sujeito a Receita de Controle Especial em 2 vias (Portaria SVS/MS nº 344/1998, Lista C1 / RDC Anvisa nº 1.036/2026).',
  },
  trazodona: {
    isControlled: true,
    controlNotice: 'Sujeito a Receita de Controle Especial em 2 vias (Portaria SVS/MS nº 344/1998, Lista C1 / RDC Anvisa nº 1.036/2026).',
  },
  'amoxicilina-clavulanato': {
    isControlled: false,
    controlNotice: 'Antimicrobiano sujeito a prescrição em 2 vias com retenção da 1ª via (RDC ANVISA / MAPA).',
  },
  'ampicilina-sulbactam': {
    isControlled: false,
    controlNotice: 'Antimicrobiano de uso parenteral com prescrição em 2 vias e retenção de receita.',
  },
  ceftriaxona: {
    isControlled: false,
    controlNotice: 'Antimicrobiano de uso parenteral com prescrição em 2 vias e retenção de receita.',
  },
  clindamicina: {
    isControlled: false,
    controlNotice: 'Antimicrobiano sujeito a prescrição em 2 vias com retenção da 1ª via (RDC ANVISA / MAPA).',
  },
  enrofloxacina: {
    isControlled: false,
    controlNotice: 'Antimicrobiano sujeito a controle com receita em 2 vias e retenção de receita (MAPA / ANVISA).',
  },
  marbofloxacina: {
    isControlled: false,
    controlNotice: 'Antimicrobiano sujeito a retenção de receita em 2 vias (MAPA / ANVISA).',
  },
  pradofloxacina: {
    isControlled: false,
    controlNotice: 'Antimicrobiano de 3ª geração sujeito a retenção de receita em 2 vias (MAPA / ANVISA).',
  },
  'sulfametoxazol-trimetoprima': {
    isControlled: false,
    controlNotice: 'Antimicrobiano sujeito a retenção de receita em 2 vias (MAPA / ANVISA).',
  },
};

export const MEDICATION_CONFIRMED_REFERENCES: Record<string, EditorialReference[]> = {
  mirtazapina: [
    {
      id: 'ref-theodoro-mirtazapine-dogs-2025',
      citationText: 'Theodoro SS, Tozato MEG, Ximenes TO, Volpe LM, Baptista da Silva C, Teixeira FA, Carciofi AC. Evaluation of the Short-Term Effects of Mirtazapine on Appetite Stimulants in Dogs: A Retrospective Study and a Placebo-Controlled Trial. Animals. 2025;15(17):2538.',
      sourceType: 'Ensaio clínico cruzado e placebo-controlado',
      url: 'https://doi.org/10.3390/ani15172538',
      doi: '10.3390/ani15172538',
      pmid: '40941333',
      evidenceLevel: 'Alta para apetite em cães a curto prazo',
    },
  ],
  prednisolona: [
    {
      id: 'ref-jablonski-pred-ple-2025',
      citationText: 'Jablonski SA, Strohmeyer JL, Buchweitz JP, Lehner AF, Langlois DK. Prednisolone pharmacokinetics in dogs with protein-losing enteropathy. J Vet Intern Med. 2025;39(1):e17277.',
      sourceType: 'Estudo farmacocinético clínico',
      url: 'https://doi.org/10.1111/jvim.17277',
      doi: '10.1111/jvim.17277',
      pmid: '39715442',
      evidenceLevel: 'Alta em enteropatia com perda proteica',
    },
  ],
  'ampicilina-sulbactam': [
    {
      id: 'ref-goggs-amp-sulb-crit-2025',
      citationText: 'Goggs R et al. Intravenous Ampicillin/Sulbactam in Critically Ill Dogs has Variable Pharmacokinetics. J Vet Pharmacol Ther. 2025;48(6):445–456.',
      sourceType: 'Estudo farmacocinético prospectivo',
      url: 'https://doi.org/10.1111/jvp.70004',
      doi: '10.1111/jvp.70004',
      pmid: '40511602',
    },
    {
      id: 'ref-wang-amp-sulb-azotemia-2025',
      citationText: 'Wang Z et al. Pharmacokinetics of Ampicillin-Sulbactam in Azotemic and Non-Azotemic Dogs. J Vet Pharmacol Ther. 2025;48:241–249.',
      sourceType: 'Estudo farmacocinético comparativo',
      url: 'https://doi.org/10.1111/jvp.13506',
      doi: '10.1111/jvp.13506',
    },
  ],
  alopurinol: [
    {
      id: 'ref-oliveira-allopurinol-xanthinuria-2025',
      citationText: 'Oliveira SC et al. Xanthine urolithiasis and crystal formation in dogs treated with allopurinol for leishmaniosis. Parasites & Vectors. 2025;18:98.',
      sourceType: 'Estudo clínico observacional',
      url: 'https://doi.org/10.1186/s13071-025-06731-0',
      doi: '10.1186/s13071-025-06731-0',
      pmid: '40065388',
    },
  ],
  amantadina: [
    {
      id: 'ref-caterino-amantadine-dlss-2025',
      citationText: 'Caterino C et al. Efficacy of amantadine in dogs with degenerative lumbosacral stenosis: a clinical trial. BMC Vet Res. 2025;21:469.',
      sourceType: 'Ensaio clínico',
      url: 'https://doi.org/10.1186/s12917-025-04911-9',
      doi: '10.1186/s12917-025-04911-9',
      pmid: '40671053',
    },
    {
      id: 'ref-hogberg-amantadine-overdose-2025',
      citationText: 'Hogberg B et al. Successful management of severe amantadine overdose in a dog with intravenous lipid emulsion. Vet Med Sci. 2025;11(3):e70402.',
      sourceType: 'Relato de caso toxicológico',
      url: 'https://doi.org/10.1002/vms3.70402',
      doi: '10.1002/vms3.70402',
      pmid: '40359215',
    },
  ],
  acetilcisteina: [
    {
      id: 'ref-alihosseini-nac-cats-ckd-2026',
      citationText: 'Alihosseini H, Çolakoğlu EÇ, Haydardedeoğlu AE, Özen D. N-acetylcysteine reduces serum creatinine, blood urea nitrogen, symmetric dimethylarginine and urine protein to creatinine ratio in cats with chronic kidney disease: a double-blind, placebo-controlled clinical trial. BMC Vet Res. 2026;22:152.',
      sourceType: 'Ensaio clínico randomizado duplo-cego controlado',
      url: 'https://doi.org/10.1186/s12917-026-05328-8',
      doi: '10.1186/s12917-026-05328-8',
      pmid: '41630014',
    },
  ],
  capromorelina: [
    {
      id: 'ref-wofford-capromorelin-ckd-cats-2025',
      citationText: 'Wofford JA et al. Evaluation of capromorelin oral solution for the management of weight loss in cats with chronic kidney disease. J Feline Med Surg. 2025;27(11).',
      sourceType: 'Ensaio clínico randomizado duplo-cego multicêntrico',
      url: 'https://doi.org/10.1177/1098612X251379924',
      doi: '10.1177/1098612X251379924',
      pmid: '41204815',
    },
  ],
  clorambucil: [
    {
      id: 'ref-acvim-cie-chlorambucil-2026',
      citationText: 'ACVIM consensus statement on chronic inflammatory enteropathy and protein-losing enteropathy in dogs. J Vet Intern Med. 2026;40(1):aalaf017.',
      sourceType: 'Consenso ACVIM 2026',
      url: 'https://doi.org/10.1093/jvimsj/aalaf017',
      doi: '10.1093/jvimsj/aalaf017',
    },
  ],
  amitriptilina: [
    {
      id: 'ref-icatcare-lutd-amitriptyline-2025',
      citationText: 'Taylor S et al. ISFM/iCatCare Consensus Guidelines on the Diagnosis and Management of Feline Lower Urinary Tract Disease. J Feline Med Surg. 2025;27(2):1098612X241309176.',
      sourceType: 'Consenso internacional de diretrizes felinas',
      url: 'https://doi.org/10.1177/1098612X241309176',
      doi: '10.1177/1098612X241309176',
      pmid: '39935081',
    },
  ],
  'sulfametoxazol-trimetoprima': [
    {
      id: 'ref-ekstrand-tmp-sulfa-safety-2026',
      citationText: 'Ekstrand C et al. Adverse events of trimethoprim-sulphonamide treatment of cats and dogs: a systematic review. Vet Res Commun. 2026;50:224.',
      sourceType: 'Revisão sistemática de segurança',
      url: 'https://doi.org/10.1007/s11259-026-11143-1',
      doi: '10.1007/s11259-026-11143-1',
    },
    {
      id: 'ref-ekstrand-tmp-sdz-smx-pk-2026',
      citationText: 'Ekstrand C et al. Pharmacokinetic comparison of sulfadiazine/trimethoprim and sulfamethoxazole/trimethoprim in dogs. BMC Vet Res. 2026;22:336.',
      sourceType: 'Estudo farmacocinético comparativo',
      url: 'https://doi.org/10.1186/s12917-026-05604-7',
      doi: '10.1186/s12917-026-05604-7',
      pmid: '42243796',
    },
  ],
  enrofloxacina: [
    {
      id: 'ref-papich-feline-quinolones-2026',
      citationText: 'Papich MG, Gunnett LA, Martinez MN. Pharmacokinetic-pharmacodynamic evaluation of fluoroquinolones in cats. J Vet Pharmacol Ther. 2026;49(2):131–140.',
      sourceType: 'Estudo PK/PD de segurança felina',
      url: 'https://doi.org/10.1111/jvp.70028',
      doi: '10.1111/jvp.70028',
      pmid: '41020640',
    },
  ],
  tramadol: [
    {
      id: 'ref-tramadol-dipyrone-dogs-2026',
      citationText: 'Multimodal analgesia with tramadol and dipyrone in postoperative dogs. Frontiers in Veterinary Science. 2026;13:1898549.',
      sourceType: 'Ensaio clínico prospectivo randomizado',
      url: 'https://doi.org/10.3389/fvets.2026.1898549',
      doi: '10.3389/fvets.2026.1898549',
      pmid: '42699351',
    },
  ],
  dipirona: [
    {
      id: 'ref-dipyrone-tramadol-dogs-2026',
      citationText: 'Multimodal analgesia with tramadol and dipyrone in postoperative dogs. Frontiers in Veterinary Science. 2026;13:1898549.',
      sourceType: 'Ensaio clínico prospectivo randomizado',
      url: 'https://doi.org/10.3389/fvets.2026.1898549',
      doi: '10.3389/fvets.2026.1898549',
      pmid: '42699351',
    },
  ],
};

function sanitizeDoseUnitsAndSafety(medicationSlug: string, dose: MedicationDose): MedicationDose {
  let patched = { ...dose };

  // 1. Correção transversal de unidades redundantes (mg/kg/kg -> mg/kg; mg/m²/m² -> mg/m²)
  if (patched.perWeightUnit === 'kg' && patched.doseUnit === 'mg/kg') {
    patched.doseUnit = 'mg';
  } else if (patched.perWeightUnit === 'm²' && patched.doseUnit === 'mg/m²') {
    patched.doseUnit = 'mg';
  }

  // 2. Infusões contínuas (CRI) com unidade temporal obrigatória /h
  const isCRI =
    patched.frequency.toLowerCase().includes('cri') ||
    patched.frequency.toLowerCase().includes('contínua') ||
    patched.route.toLowerCase().includes('cri') ||
    patched.id.includes('cri');
  if (isCRI) {
    if (patched.doseUnit === 'mg/kg' || patched.doseUnit === 'mg') {
      patched.doseUnit = 'mg/kg/h';
      patched.perWeightUnit = 'h';
    }
  }

  // 3. Prednisolona: divisão correta do total diário em administrações q12h
  if (medicationSlug === 'prednisolona') {
    if (patched.frequency.includes('q12h') || patched.frequency.includes('12')) {
      if (patched.id === 'dose-pred-dog-imuno' || patched.indication.toLowerCase().includes('imunossupress')) {
        patched.notes = 'Total diário de ~2 mg/kg/dia fracionado em 1 mg/kg por dose q12h. A dose total diária não deve ser repetida em cada tomada.';
        patched.doseMin = 1;
        patched.doseMax = 1.5;
      } else if (patched.id === 'dose-pred-dog-anti' || patched.indication.toLowerCase().includes('anti-inflamatór')) {
        patched.notes = 'Total diário de 0,5–1 mg/kg/dia fracionado em 0,25–0,5 mg/kg por dose q12h.';
        patched.doseMin = 0.25;
        patched.doseMax = 0.5;
      }
    }
  }

  // 4. Enrofloxacina em gatos: teto absoluto rígido de 5 mg/kg/dia
  if (medicationSlug === 'enrofloxacina') {
    if (patched.species === 'cat') {
      if (patched.doseMax && patched.doseMax > 5) {
        patched.doseMax = 5;
      }
      if (patched.doseMin > 5) {
        patched.doseMin = 5;
      }
      patched.maximumDose = '5 mg/kg/dia';
      const safetyNote = 'Teto estrito de 5 mg/kg/dia pelo risco de retinopatia e cegueira permanente em gatos.';
      if (!patched.notes?.includes(safetyNote)) patched.notes = (patched.notes ? `${patched.notes} ` : '') + safetyNote;
    } else if (patched.species === 'both' && (patched.doseMax && patched.doseMax > 5)) {
      // Separar para espécie canina para não expor gatos a 10 mg/kg
      patched.species = 'dog';
      patched.notes = (patched.notes ? `${patched.notes} ` : '') + 'Faixa canina; em gatos a dose máxima é estritamente 5 mg/kg/dia.';
    }
  }

  // 5. Meloxicam: explicitar ataque no Dia 1 vs manutenção no Dia 2+
  if (medicationSlug === 'meloxicam' && (patched.id === 'dose-melox-dog-acute-oral' || patched.id === 'dose-melox-dog-oa-oral')) {
    patched.clinicalContext = 'Dia 1: dose de ataque de 0,2 mg/kg VO; a partir do Dia 2: manutenção com 0,1 mg/kg VO q24h.';
    patched.notes = 'A dose de 0,2 mg/kg aplica-se exclusivamente no primeiro dia de terapia (ataque); manter 0,1 mg/kg q24h nos dias subsequentes.';
  }

  // 6. Betanecol e Sucralfato: perWeightUnit fixo por animal
  if (medicationSlug === 'betanecol') {
    patched.perWeightUnit = 'animal';
    patched.doseUnit = 'mg';
  } else if (medicationSlug === 'sucralfato') {
    patched.perWeightUnit = 'animal';
    if (!patched.notes?.includes('Dose fixa por animal de acordo com a faixa de peso (≤20 kg ou >20 kg).')) {
      patched.notes = (patched.notes ? `${patched.notes} ` : '') + 'Dose fixa por animal de acordo com a faixa de peso (≤20 kg ou >20 kg).';
    }
  }

  return patched;
}

/**
 * Aplica todas as correções clínicas, regulatórias e de monitoramento às fichas de medicamentos.
 */
export function applyMedicationClinicalCorrections(medication: MedicationRecord): MedicationRecord {
  const slug = medication.slug;

  // 1. Sanitizar doses (unidades redundantes, CRIs, tetos felinos, divisões de prednisolona)
  const doses = medication.doses.map((dose) => sanitizeDoseUnitsAndSafety(slug, dose));

  // 2. Injetar ou enriquecer parâmetros de monitoramento clínico e laboratorial
  const auditMonitoring = MEDICATION_MONITORING_PARAMETERS[slug];
  const monitoringParameters =
    medication.monitoringParameters && medication.monitoringParameters.length > 0
      ? medication.monitoringParameters
      : auditMonitoring || undefined;

  // 3. Injetar ou enriquecer orientações estruturadas ao tutor
  const auditClientInfo = MEDICATION_CLIENT_INFORMATION[slug];
  const clientInformation =
    medication.clientInformation && medication.clientInformation.length > 0
      ? medication.clientInformation
      : auditClientInfo || undefined;

  // 4. Injetar regulação brasileira conforme RDC Anvisa nº 1.036/2026
  const controlData = MEDICATION_CONTROL_NOTICES[slug];
  const isControlled = controlData ? controlData.isControlled : medication.isControlled;
  const controlNotice = controlData ? controlData.controlNotice : medication.controlNotice;

  // 5. Mesclar referências bibliográficas confirmadas de 2025/2026
  const confirmedRefs = MEDICATION_CONFIRMED_REFERENCES[slug] || [];
  const existingRefs = medication.references || [];
  const existingRefIds = new Set(existingRefs.map((r) => r.id).filter(Boolean));
  const existingCitations = new Set(existingRefs.map((r) => r.citationText).filter(Boolean));
  const mergedRefs = [...existingRefs];

  confirmedRefs.forEach((ref) => {
    if (!existingRefIds.has(ref.id) && !existingCitations.has(ref.citationText)) {
      mergedRefs.push(ref);
    }
  });

  // 6. Refinamentos específicos por medicamento
  let attentionData = medication.attentionData ?? {
    precautions: [
      ...medication.contraindications.map((text) => ({ condition: text, alertLevel: 'contraindicated' as const, physiologicalExplanation: text, clinicalAction: '' })),
      ...medication.cautions.map((text) => ({ condition: text, alertLevel: 'caution' as const, physiologicalExplanation: text, clinicalAction: '' })),
    ],
  };
  let generalInfoData = medication.generalInfoData;
  if (!generalInfoData?.routesDetailed?.length) {
    generalInfoData = {
      ...generalInfoData,
      routesDetailed: [...new Set(doses.map((dose) => dose.route))].map((route) => ({
        route,
        technique: doses.filter((dose) => dose.route === route).map((dose) => dose.notes).filter(Boolean).join('\n\n'),
        nursingCare: clientInformation?.join('\n\n') || '',
      })),
    };
  }

  if (slug === 'fenobarbital') {
    attentionData = attentionData ? {
      ...attentionData,
      drugInteractionsDetailed: attentionData.drugInteractionsDetailed?.map((interaction) =>
        interaction.drugOrClass.includes('Benzodiazepínicos') ? {
          ...interaction,
          pharmacologicalMechanism: 'Somação de depressão central. Benzodiazepínicos e barbitúricos modulam GABA-A em sítios alostéricos distintos; a combinação pode deprimir ventilação e sensorium.',
        } : interaction),
    } : undefined;

    generalInfoData = generalInfoData ? {
      ...generalInfoData,
      speciesPeculiarities: generalInfoData.speciesPeculiarities?.map((item) => item.species === 'cat' ? {
        ...item,
        title: 'Felinos: monitorar tolerância neurológica, cutânea e hematológica',
        description: 'O fenobarbital é uma opção de primeira linha consagrada para controle de crises em gatos. Podem ocorrer letargia transitória, ataxia, polifagia, prurido facial e, raramente, citopenias idiossincráticas reversíveis.',
        clinicalImplications: 'Ajustar pelo controle de crises, tolerância e concentração sérica (alvo 15–45 µg/mL). Prurido intenso, febre ou citopenias exigem avaliação rápida e planejamento de substituição; nunca realizar retirada abrupta domiciliar sem cobertura anticonvulsivante alternativa.',
      } : item),
    } : undefined;
  }

  if (slug === 'tramadol') {
    attentionData = attentionData ? {
      ...attentionData,
      drugInteractionsDetailed: attentionData.drugInteractionsDetailed?.map((interaction) =>
        interaction.drugOrClass.includes('Dipirona') ? {
          ...interaction,
          severity: 'moderate',
          clinicalEffect: 'Integra protocolos de analgesia multimodal na dor aguda; eficácia e conforto do paciente devem ser monitorados.',
          pharmacologicalMechanism: 'Ação analgésica por mecanismos complementares: o tramadol modula vias opioides e monoaminérgicas, enquanto a dipirona atua predominantemente via inibição central de ciclo-oxigenase e vias endocanabinoides/espasmolíticas.',
        } : interaction),
    } : undefined;
  }

  if (slug === 'pronefra') {
    generalInfoData = generalInfoData ? {
      ...generalInfoData,
      curiositiesAndHistory: [
        'Composição oficial Virbac Brasil: carbonato de cálcio, hidrolisado de peixe, carbonato de magnésio e quitosana derivada de Aspergillus niger.',
        'Suplemento alimentar em suspensão oral desenvolvido especificamente para cães e gatos sob manejo de doença renal crônica.',
      ],
    } : undefined;
  }

  return {
    ...medication,
    doses,
    monitoringParameters,
    clientInformation,
    isControlled,
    controlNotice,
    references: mergedRefs,
    attentionData,
    generalInfoData,
  };
}
