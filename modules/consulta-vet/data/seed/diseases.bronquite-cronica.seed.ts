import { DiseaseRecord } from '../../types/disease';

/** Bronquite crônica em cães e gatos; síntese Rozanski 2014, McKiernan 2000, Galler et al. 2013, Johnson Canine and Feline Respiratory Medicine 2020, Nelson & Couto. */
export const bronquiteCronicaRecord: DiseaseRecord = {
  id: 'disease-bronquite-cronica-caes-gatos',
  slug: 'bronquite-cronica-caes-gatos',
  title: 'Bronquite crônica (cão e gato)',
  synonyms: [
    'Chronic bronchitis',
    'Bronquite crônica canina',
    'Doença inflamatória crônica de vias aéreas pequenas',
    'CB',
  ],
  species: ['dog', 'cat'],
  category: 'respiratorio',
  tags: [
    'Tosse crônica',
    'Neutrófilos',
    'Broncomalácia',
    'Diagnóstico de exclusão',
    'Antitussígeno',
    'Broncoscopia',
  ],
  quickSummary:
    'A bronquite crônica é definida operacionalmente como tosse presente na maioria dos dias por pelo menos dois meses, sem causa infecciosa, parasitária, cardíaca, neoplásica ou estrutural identificável (Rozanski, 2014) — é, portanto, diagnóstico de exclusão. A inflamação predominante é neutrofílica não-séptica (diferindo do padrão eosinofílico típico da asma felina), com hipertrofia de músculo liso, hiperplasia de glândulas mucosas e, com o tempo, remodelamento irreversível da parede brônquica que pode evoluir para bronquiectasia. Cães pequenos e de meia-idade a idosos são mais afetados, mas a doença ocorre em qualquer porte; em gatos, sobrepõe-se ao espectro da doença de vias aéreas inferiores felina, distinguindo-se da asma pelo perfil citológico predominantemente neutrofílico no lavado broncoalveolar. A tosse persistente e o esforço respiratório progressivo — muitas vezes com síncope tussígena em cães pequenos — motivam a consulta; broncomalácia secundária concomitante é comum e piora a resposta terapêutica isolada. O diagnóstico exige excluir sistematicamente colapso traqueal, cardiopatia, infecção (incluindo Bordetella e Mycoplasma), parasitos pulmonares e neoplasia antes de assumir bronquite idiopática, com broncoscopia e lavado broncoalveolar definindo citologia e permitindo cultura. O tratamento combina modificação ambiental, corticoide (preferencialmente inalatório na manutenção), antitussígeno quando não há retenção significativa de secreção, e broncodilatador quando há componente broncoespástico ou broncomalácico documentado — antibiótico é reservado a infecção comprovada, nunca reflexo automático diante de tosse crônica.',
  quickDecisionStrip: [
    'Tosse quase diária por mais de dois meses sem causa identificável = definição operacional de bronquite crônica.',
    'É diagnóstico de exclusão — descarte colapso traqueal, cardiopatia, parasitos, neoplasia e infecção antes de rotular.',
    'Padrão inflamatório predominante é neutrofílico não-séptico, diferente do eosinofílico da asma felina.',
    'Radiografia com padrão brônquico é sugestiva, não diagnóstica isoladamente.',
    'Broncoscopia + lavado broncoalveolar definem citologia e permitem cultura para excluir infecção oculta.',
    'Corticoide inalatório é preferido para controle crônico, reduzindo efeitos sistêmicos.',
    'Antibiótico só com evidência de infecção — cultura positiva isolada não basta para justificar uso.',
    'Broncomalácia associada muda o prognóstico e a resposta a broncodilatador e antitussígeno.',
  ],
  quickSummaryRich: {
    lead:
      'Bronquite crônica não é diagnóstico de "primeira olhada" — é rótulo que só se ganha depois de afastar quem mais mata ou confunde: cardiopatia, colapso traqueal, parasito e infecção. O eixo prático é lembrar que a inflamação de base é neutrofílica, o dano estrutural pode ser permanente se o ciclo tosse-inflamação não for quebrado cedo, e que "dar antibiótico para toda tosse crônica" é o erro mais comum e mais fácil de evitar.',
    leadHighlights: ['diagnóstico de exclusão', 'neutrofílico', 'antibiótico', 'broncomalácia'],
    pillars: [
      {
        title: 'Definição operacional',
        body:
          'Tosse na maioria dos dias por ao menos dois meses sem causa específica identificada após investigação apropriada — não é diagnóstico de primeira intenção.',
        highlights: ['dois meses'],
      },
      {
        title: 'Citologia',
        body:
          'Lavado broncoalveolar com neutrófilos não-degenerados predominantes, sem agente infeccioso — distingue de asma (eosinofílica) e de pneumonia bacteriana (neutrófilos degenerados/sépticos).',
        highlights: ['neutrofílico'],
      },
      {
        title: 'Conduta prática',
        body:
          'Excluir diferenciais graves primeiro; depois tratar com anti-inflamatório de base e modificação ambiental, reservando antibiótico para infecção comprovada.',
        highlights: ['excluir', 'anti-inflamatório'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'História e exame físico',
          timing: 'Primeira consulta',
          detail:
            'Tosse crônica quase diária por ≥2 meses, seca ou produtiva, com ou sem síncope pós-tosse em cães pequenos; ausculta pode revelar estertores/sibilos ou ser inespecífica (Rozanski, 2014; Johnson, Respiratory Medicine 2ª ed.).',
        },
        {
          label: 'Excluir diferenciais graves',
          timing: 'Antes de rotular idiopática',
          detail:
            'Ecocardiograma se sopro/galope/arritmia; radiografia para colapso traqueal, cardiomegalia, massa; teste para dirofilariose; Baermann fecal para parasitos pulmonares (Nelson & Couto, 6ª ed.; Rozanski, 2014).',
          reassess: 'Repetir Baermann se história de acesso externo e primeira amostra negativa.',
        },
        {
          label: 'Radiografia torácica',
          timing: 'Após triagem clínica',
          detail:
            'Padrão brônquico difuso ("donuts"/"trilhos de trem"), possível broncograma; avaliar bronquiectasia em doença avançada — sugestivo, não diagnóstico isolado (Johnson, Respiratory Medicine 2ª ed.).',
        },
        {
          label: 'Broncoscopia e lavado broncoalveolar',
          timing: 'Paciente estável para anestesia',
          detail:
            'Avalia mucosa (hiperemia, colapso dinâmico, secreção), citologia com perfil neutrofílico não-degenerado predominante e cultura/antibiograma antes de qualquer antibiótico (McKiernan, 2000; Johnson, Respiratory Medicine 2ª ed.).',
        },
        {
          label: 'Diagnóstico de exclusão',
          timing: 'Após investigação completa',
          detail:
            'Sem causa infecciosa, parasitária, cardíaca, neoplásica ou estrutural primária identificada, assume-se bronquite crônica idiopática (Rozanski, 2014).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Ambiente e peso',
          detail:
            'Eliminar irritantes inalados (fumaça, aerossóis, poeira), controlar obesidade, trocar coleira por peitoral em cães — medidas de alto custo-benefício (Rozanski, 2014; Nelson & Couto, 6ª ed.).',
          duration: 'Permanente enquanto houver tosse crônica.',
          reassess: 'Peso e BCS a cada revisão; controle de peso é intervenção terapêutica, não estética.',
        },
        {
          label: 'Anti-inflamatório de base',
          detail:
            'Corticoide sistêmico para indução/crise; transição planejada para corticoide inalatório (fluticasona/budesonida) na manutenção crônica, reduzindo efeitos sistêmicos (Galler et al., 2013; Johnson, Respiratory Medicine 2ª ed.).',
          dose: 'Indução: prednisona/prednisolona dose anti-inflamatória VO com desmame gradual. Manutenção: fluticasona ou budesonida inalatória via câmara espaçadora q12h.',
          duration: 'Indução 5–14 dias; inalatório contínuo na manutenção.',
          reassess: 'Revisão em 2–4 semanas; tentar menor dose eficaz de sistêmico após controle inalatório.',
        },
        {
          label: 'Antitussígeno',
          detail:
            'Hidrocodona, codeína ou butorfanol quando tosse seca, improdutiva, sem retenção relevante de secreção — escolher apenas um; não associar codeína e hidrocodona. Evitar se muco espesso retido (Johnson, Respiratory Medicine 2ª ed.; Nelson & Couto, 6ª ed.).',
          dose: 'Hidrocodona 0,22–0,5 mg/kg PO q6–12h. Codeína 1–2 mg/kg PO q8–12h (alternativa). Butorfanol 0,5–1,0 mg/kg PO q6–12h.',
          duration: 'Enquanto tosse seca perpetua ciclo inflamatório; desmame conforme controle (codeína: curso inicial típico 5–7 dias).',
          reassess: 'Frequência e característica da tosse a cada revisão — objetivo é redução sustentada; revisar se sedação, constipação ou depressão respiratória.',
        },
        {
          label: 'Broncodilatador',
          detail:
            'Teofilina ou terbutalina reservadas a componente broncoespástico ou broncomalácico documentado — não substituem anti-inflamatório de base (Johnson, Respiratory Medicine 2ª ed.).',
          dose: 'Teofilina LP 5–10 mg/kg PO BID ou terbutalina conforme protocolo respiratório.',
          duration: 'Adjuvante enquanto componente broncoespástico persistir.',
          reassess: 'Monitorar taquicardia e agitação; uso rotineiro sem evidência tem fundamentação fraca.',
        },
        {
          label: 'Antimicrobiano',
          detail:
            'Apenas com citologia/cultura compatíveis com infecção ativa (neutrófilos degenerados, bactérias intracelulares, cultura clinicamente relevante) — nunca empírico de rotina (McKiernan, 2000).',
          reassess: 'Cultura positiva isolada sem citologia compatível não justifica tratamento.',
        },
      ],
    },
  },
  etiology: {
    tcDefinicaoOperacional:
      'Bronquite crônica é definida clinicamente por tosse presente na maioria dos dias por pelo menos dois meses consecutivos, na ausência de causa infecciosa, parasitária, cardíaca, neoplásica ou estrutural identificável após investigação apropriada (Rozanski, 2014). É, portanto, diagnóstico de exclusão, não uma entidade etiológica única.',
    tcFatoresPredisponentes: [
      'Irritantes inalados crônicos: fumaça de cigarro, poeira, produtos de limpeza aerossolizados.',
      'Obesidade — reduz complacência torácica e agrava tosse e esforço respiratório.',
      'Infecções respiratórias prévias (complexo respiratório infeccioso canino) que deixam sequela inflamatória residual.',
      'Broncomalácia concomitante — perda de rigidez da parede brônquica que se retroalimenta com a inflamação crônica.',
    ],
    tcDiferencaAsma:
      'Diferente da asma felina (padrão eosinofílico, hipersensibilidade tipo I), a bronquite crônica cursa com inflamação predominantemente neutrofílica não-séptica — distinção relevante porque muda a ênfase terapêutica e o prognóstico estrutural (McKiernan, 2000; Galler et al., 2013).',
  },
  epidemiology: {
    tcPerfilCanino:
      'Cães pequenos de meia-idade a idosos são classicamente mais representados nas séries clínicas, mas a doença ocorre em qualquer porte e idade adulta. Coexistência com colapso traqueal e/ou broncomalácia é comum nesse grupo (Rozanski, 2014).',
    tcPerfilFelino:
      'Em gatos, a bronquite crônica neutrofílica integra o espectro da doença de vias aéreas inferiores felina, ao lado da asma eosinofílica — a diferenciação depende de citologia do lavado broncoalveolar, não apenas de sinais clínicos ou radiografia.',
  },
  pathogenesisTransmission: {
    tcCicloInflamatorio:
      'Insulto inicial (irritante inalado, infecção prévia, broncomalácia) desencadeia inflamação neutrofílica não-séptica persistente na mucosa brônquica; a inflamação crônica gera hipertrofia de músculo liso, hiperplasia de glândulas mucosas com hipersecreção e, progressivamente, fibrose e perda de suporte cartilaginoso — criando um ciclo vicioso tosse–inflamação–dano estrutural.',
    tcBronquiectasia:
      'Em casos avançados e não controlados, o dano estrutural repetido leva à dilatação irreversível dos brônquios (bronquiectasia), predispondo a infecções bacterianas secundárias recorrentes e piorando o prognóstico funcional a longo prazo.',
    tcTransmissao:
      'Não é doença transmissível entre animais; fatores determinantes são exposição ambiental a irritantes, predisposição individual e comorbidades estruturais das vias aéreas.',
  },
  pathophysiology:
    'A parede brônquica cronicamente inflamada perde a arquitetura normal em camadas: o epitélio hipertrofia glândulas mucosas e produz secreção mais espessa e em maior volume; o músculo liso subjacente hipertrofia e se torna hiper-reativo; e o suporte cartilaginoso pode enfraquecer, favorecendo colapso dinâmico (broncomalácia) durante a expiração e a tosse. O resultado funcional é obstrução ao fluxo aéreo predominantemente expiratória, retenção de secreção que favorece infecção secundária, e um ciclo autoperpetuante em que a própria tosse mecânica traumatiza a mucosa e mantém a inflamação ativa — por isso "quebrar o ciclo da tosse" é eixo central do tratamento, não apenas suprimir o sintoma.',
  clinicalSignsPathophysiology: [
    {
      system: 'respiratory',
      findings: [
        'Tosse crônica quase diária, seca ou produtiva, muitas vezes pior à noite, com exercício ou excitação.',
        'Síncope pós-tosse em cães pequenos com componente cardiovascular ou traqueal associado.',
        'Esforço expiratório progressivo; estertores ou sibilos à ausculta em casos avançados.',
        'Intolerância ao exercício e cianose em casos graves ou com bronquiectasia estabelecida.',
      ],
    },
    {
      system: 'general',
      findings: ['Perda de peso e apatia em casos crônicos avançados com infecção secundária recorrente ou hipóxia persistente.'],
    },
  ],
  diagnosis: {
    tcHistoriaEFisico:
      'Tosse quase diária por pelo menos dois meses é o critério de entrada; história de gatilhos ambientais, progressão e resposta a tratamentos prévios orienta a investigação. Palpação traqueal e ausculta pulmonar completa são obrigatórias.',
    tcDiferenciaisObrigatorios:
      'Colapso traqueal/traqueobroncomalácia primária, cardiopatia com edema pulmonar ou compressão brônquica, dirofilariose/HARD, bronquite parasitária, neoplasia intratorácica, pneumonia bacteriana, corpo estranho, complexo respiratório infeccioso canino em fase residual.',
    tcRadiografia: {
      kind: 'clinicalTable',
      headers: ['Achado', 'Interpretação'],
      rows: [
        ['Padrão brônquico difuso ("donuts"/"trilhos de trem")', 'Espessamento de parede brônquica por inflamação crônica.'],
        ['Broncograma / dilatação brônquica', 'Sugere bronquiectasia em doença avançada — pior prognóstico funcional.'],
        ['Ausência de cardiomegalia relevante', 'Ajuda a afastar componente cardíaco primário como causa da tosse.'],
      ],
    },
    tcBroncoscopiaLavado:
      'Broncoscopia avalia mucosa (hiperemia, secreção, colapso dinâmico associado) e permite lavado broncoalveolar para citologia — perfil neutrofílico não-degenerado predominante sustenta o diagnóstico — e cultura/antibiograma antes de qualquer decisão de antibiótico.',
    tcExamesComplementares:
      'Teste para dirofilariose, Baermann fecal seriado, ecocardiograma quando há suspeita cardíaca, hemograma e bioquímica para triagem geral e suporte anestésico da broncoscopia.',
  },
  treatment: {
    ordemDePrioridade: [
      '1) Excluir e tratar diferenciais graves antes de rotular como bronquite crônica idiopática — cardiopatia, colapso traqueal, parasito e infecção mudam completamente a conduta (Rozanski, 2014).',
      '2) Controle ambiental e de peso: eliminar irritantes inalados, tratar obesidade, trocar coleira por peitoral em cães — medidas de alto custo-benefício e baixo risco.',
      '3) Anti-inflamatório de base: corticoide sistêmico para indução/crise, com transição planejada para corticoide inalatório (fluticasona/budesonida) na manutenção crônica, reduzindo efeitos sistêmicos (Galler et al., 2013).',
      '4) Antitussígeno (hidrocodona, codeína ou butorfanol) quando a tosse é seca e não produtiva, sem retenção relevante de secreção — escolher apenas um opioide antitussígeno; evitar se há muco espesso acumulado que precisa ser mobilizado.',
      '5) Broncodilatador (teofilina, terbutalina) reservado a componente broncoespástico ou broncomalácico documentado por história/exame — não é primeira linha isolada.',
      '6) Antimicrobiano apenas com evidência citológica/cultural de infecção ativa — cultura positiva isolada sem citologia compatível não justifica tratamento (McKiernan, 2000).',
    ],
    monitoramento: [
      'Frequência e característica da tosse a cada revisão — objetivo é redução sustentada, não necessariamente abolição total.',
      'Peso corporal e BCS — controle de peso é intervenção terapêutica, não apenas estética.',
      'Sinais de piora aguda (febre, letargia, secreção purulenta) que sugerem infecção secundária sobreposta.',
      'Efeitos adversos de corticoide sistêmico prolongado quando em uso contínuo.',
    ],
    tcMedidasAmbientais: [
      'Eliminar fumaça de cigarro, aerossóis domésticos e poeira excessiva no ambiente.',
      'Peitoral em vez de coleira em cães, reduzindo trauma traqueal por tração durante a tosse.',
      'Controle de peso corporal como medida terapêutica central, não coadjuvante.',
    ],
    tcCorticosteroides:
      'Indução com prednisona/prednisolona oral em dose anti-inflamatória, com desmame gradual conforme resposta. Manutenção crônica preferencialmente com corticoide inalatório (fluticasona ou budesonida) via câmara espaçadora, reduzindo exposição sistêmica prolongada (Galler et al., 2013).',
    tcAntitussigenos:
      'Hidrocodona 0,22–0,5 mg/kg PO q6–12h; codeína 1–2 mg/kg PO q8–12h (alternativa, curso inicial típico 5–7 dias); butorfanol 0,5–1,0 mg/kg PO q6–12h — indicados quando a tosse é seca, improdutiva e perpetua o ciclo inflamatório. Escolher apenas um antitussígeno; não associar codeína e hidrocodona. Contraindicados relativamente se há secreção retida significativa, pneumonia ou tosse produtiva (Johnson, Respiratory Medicine 2ª ed.; protocolo receituário Vetius).',
    tcAntitussigenosTabela: {
      kind: 'clinicalTable',
      headers: ['Fármaco', 'Dose', 'Notas'],
      rows: [
        [
          'Hidrocodona',
          '0,22–0,5 mg/kg PO q6–12h',
          'Antitussígeno de primeira escolha na maioria dos protocolos respiratórios caninos.',
        ],
        [
          'Codeína',
          '1–2 mg/kg PO q8–12h por 5–7 dias',
          'Alternativa quando hidrocodona indisponível ou mal tolerada; não associar à hidrocodona.',
        ],
        [
          'Butorfanol',
          '0,5–1,0 mg/kg PO q6–12h',
          'Opioide misto agonista-antagonista; reservar a casos selecionados.',
        ],
      ],
    },
    tcBroncodilatadores:
      'Teofilina de liberação prolongada ou terbutalina reservadas a casos com componente broncoespástico ou broncomalácico documentado — não substituem o anti-inflamatório de base e exigem monitorização de efeitos adversos (taquicardia, agitação).',
    tcAntibioticos:
      'Uso não é rotina. Reservar a citologia com neutrófilos degenerados/bactérias intracelulares ou cultura positiva clinicamente relevante — tratar "tosse crônica" empiricamente com antibiótico perpetua resistência sem benefício comprovado (McKiernan, 2000).',
  },
  prevention: {
    tcReducaoDeProgressao:
      'Não há prevenção primária estabelecida, mas controle ambiental precoce, manejo de peso e tratamento anti-inflamatório adequado desde os primeiros sinais reduzem a progressão para remodelamento estrutural irreversível e bronquiectasia.',
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    {
      id: 'ref-rozanski-2014',
      citationText: 'Rozanski E. Canine chronic bronchitis. Vet Clin North Am Small Anim Pract. 2014;44(1):107-116.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.1016/j.cvsm.2013.09.005',
      notes: 'Definição operacional, diagnóstico diferencial e manejo terapêutico atualizado.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-mckiernan-2000',
      citationText:
        'McKiernan BC. Diagnosis and treatment of canine chronic bronchitis: twenty years of experience. Vet Clin North Am Small Anim Pract. 2000;30(6):1267-1278.',
      sourceType: 'Revisão',
      url: null,
      notes: 'Experiência histórica de diagnóstico e tratamento; base para condutas atuais.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-galler-budesonide-2013-cb',
      citationText:
        'Galler A, Shibly S, Bilek A, Hirt RA. Inhaled budesonide therapy in cats with naturally occurring chronic bronchial disease (feline asthma and chronic bronchitis). J Small Anim Pract. 2013;54(10):531-536.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/jsap.12133',
      notes: 'Eficácia e segurança do corticoide inalatório em bronquite crônica felina.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-johnson-resp-2020-cb',
      citationText: 'Johnson LR. Canine and Feline Respiratory Medicine, 2nd ed., 2020. Wiley — cap. bronquite crônica.',
      sourceType: 'Livro especialidade',
      url: null,
      notes: 'Fisiopatologia, broncoscopia, citologia e protocolos terapêuticos.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-nelson-couto-2020-cb',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 — Disorders of the Trachea and Bronchi.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Diagnóstico diferencial e associação com colapso traqueal/broncomalácia.',
      evidenceLevel: 'A/B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
