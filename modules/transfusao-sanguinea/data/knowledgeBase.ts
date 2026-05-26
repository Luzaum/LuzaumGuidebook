export interface KnowledgeItem {
  title: string;
  content: string;
}

export const knowledgeBase: Record<string, KnowledgeItem> = {
  pcv: {
    title: '💡 Volume Globular (VG) / Hematócrito (Ht)',
    content: `<p>O Volume Globular (VG), ou Hematócrito (Ht), representa a porcentagem do volume sanguíneo ocupado pelos eritrócitos. É o principal indicador da capacidade de transporte de oxigênio do sangue.</p><p><strong>Importância Clínica:</strong> A decisão de transfundir não deve se basear apenas em um valor de VG. Sinais clínicos de hipóxia (taquicardia, taquipneia, fraqueza) são indicadores mais importantes. Um paciente com anemia crônica pode estar bem compensado com um VG baixo, enquanto um paciente com perda aguda pode estar em choque com um VG moderado.</p>`
  },
  desired_pcv: {
    title: '🎯 Escolhendo o VG/Ht Desejado e a Fórmula',
    content: `<p>A meta da transfusão não é normalizar o VG/Ht, mas sim <strong>resolver os sinais clínicos de hipóxia</strong> (fraqueza, taquicardia, taquipneia).</p><h4>Parâmetros Comuns:</h4><ul><li><strong>Cães:</strong> Um alvo de 25-28% é geralmente suficiente.</li><li><strong>Gatos:</strong> Um alvo de 20-25% é geralmente suficiente.</li></ul><p>Atingir valores normais (>35%) com uma única transfusão é raramente necessário e aumenta o risco de sobrecarga de volume.</p><h4>Fórmula de Cálculo:</h4><p>O volume necessário é calculado usando a seguinte fórmula:</p><div class="bg-muted p-3 rounded-lg text-center font-mono my-3 border border-border">Volume (mL) = Vol. Sanguíneo Total × (VG Desejado - VG Atual) / VG da Bolsa</div><p>Onde o <strong>Volume Sanguíneo Total</strong> é estimado como:</p><ul><li><strong>Cães:</strong> 90 mL/kg</li><li><strong>Gatos:</strong> 60 mL/kg</li></ul>`
  },
  phys_state: {
    title: '🧑‍⚕️ Influência do Estado Fisiológico',
    content: `<p>O estado fisiológico do receptor afeta diretamente sua capacidade de tolerar o volume de fluido infundido.</p><ul><li><strong>Filhotes/Pediátricos:</strong> Possuem sistema cardiovascular imaturo e menor reserva funcional.</li><li><strong>Idosos/Geriátricos:</strong> Frequentemente possuem comorbidades subclínicas (cardíacas, renais) e menor elasticidade vascular.</li><li><strong>Obesos:</strong> O excesso de peso aumenta a carga de trabalho cardíaca.</li></ul><p>Para todos esses grupos, o risco de <strong>Sobrecarga Circulatória Associada à Transfusão (TACO)</strong> é significativamente maior. Por isso, a calculadora adota taxas de infusão mais conservadoras (lentas) para garantir a segurança.</p>`
  },
  risk_conditions: {
    title: '⚠️ Entendendo as Condições de Risco',
    content: `<p>Estas condições se referem ao <strong>RECEPTOR</strong> e aumentam criticamente o risco de complicações, exigindo monitoramento e taxas de infusão ajustadas.</p><ul><li><strong>Doença Cardíaca/Renal:</strong> Pacientes com função cardíaca ou renal comprometida têm dificuldade em lidar com o volume adicional. O risco de TACO (edema pulmonar) é altíssimo. As taxas de infusão devem ser as mais baixas possíveis (1-2 mL/kg/h).</li><li><strong>Hemorragia Aguda Ativa:</strong> O paciente está perdendo volume e hemácias simultaneamente. Aqui, o objetivo é repor ambos rapidamente. Taxas mais altas são necessárias para estabilizar o paciente. O uso de Sangue Total é preferível.</li><li><strong>Primeira Transfusão (Cão):</strong> Refere-se a um cão que nunca foi transfundido antes. Embora o risco de uma reação aguda na primeira vez seja baixo (devido à ausência de aloanticorpos pré-formados contra DEA 1), esta transfusão pode <strong>sensibilizar</strong> um cão DEA 1 negativo. Uma futura transfusão com sangue DEA 1 positivo pode ser fatal. É um fator de risco para a <strong>vida futura</strong> do paciente.</li></ul>`
  },
  components: {
    title: '🩸 Terapia com Hemocomponentes',
    content: `<p>A prática moderna preconiza o uso de componentes específicos em vez de sangue total, para maximizar a eficácia e minimizar os riscos.</p><ul><li><strong>Concentrado de Hemácias (CH):</strong> Ideal para anemia em pacientes normovolêmicos ou com risco de sobrecarga de volume (cardiopatas, nefropatas).</li><li><strong>Sangue Total (ST):</strong> Indicado para pacientes com anemia e hipovolemia (perda de volume), como em hemorragias agudas.</li><li><strong>Plasma (PFC/PC):</strong> Usado para repor fatores de coagulação e proteínas. Não corrige anemia.</li></ul>`
  },
  bag_pcv: {
    title: '🎒 VG da Bolsa',
    content: `<p>É o Volume Globular do produto que será transfundido. Este valor é crucial para o cálculo preciso do volume necessário.</p><p><strong>Valores Típicos:</strong></p><ul><li><strong>Concentrado de Hemácias (CH):</strong> 70-80%</li><li><strong>Sangue Total (ST):</strong> 35-45%</li></ul><p>Utilizar o VG real da bolsa, se medido, aumenta a precisão do cálculo.</p>`
  },
  first_transfusion: {
    title: '☝️ O Mito da "Segurança da Primeira Transfusão" em Cães',
    content: `<p>Cães não possuem aloanticorpos naturais clinicamente significativos contra o antígeno mais importante, o DEA 1. Por isso, uma primeira transfusão de sangue DEA 1 positivo para um cão DEA 1 negativo geralmente não causa uma reação aguda.</p><p><strong>O Perigo Oculto:</strong> Esta primeira transfusão atua como um evento de <strong>sensibilização</strong>. O sistema imune do receptor produzará anticorpos potentes anti-DEA 1. Uma transfusão futura com sangue DEA 1 positivo, mesmo anos depois, causará uma reação hemolítica aguda e potencialmente fatal.</p><p><strong>Conclusão:</strong> A tipagem sanguínea é fortemente recomendada em TODOS os cães para evitar a sensibilização e garantir a segurança a longo prazo.</p>`
  },
  initial_rate_why: {
    title: '🤔 Por que a Taxa Inicial é Lenta?',
    content: `<p>A transfusão começa com uma taxa de teste lenta (ex: 0.25-1 mL/kg/h) nos primeiros 15-30 minutos como uma medida de segurança crítica.</p><p><strong>Fisiologia da Reação:</strong> A maioria das reações transfusionais agudas graves, como a hemolítica ou anafilática, ocorre rapidamente. Iniciar lentamente permite:</p><ul><li><strong>Detecção Precoce:</strong> Observar o paciente para detectar os primeiros sinais de reação (febre, taquicardia, prurido).</li><li><strong>Minimização do Dano:</strong> Se uma reação ocorrer, o volume de hemocomponente incompatível administrado será mínimo, reduzindo a severidade da reação.</li></ul><p>É uma janela de oportunidade para interromper o procedimento antes que danos significativos ocorram.</p><p class="text-sm text-muted-foreground"><em>Fonte: Consenso TRACS.</em></p>`
  },
  maintenance_rate_why: {
    title: '🤔 Por que a Taxa de Manutenção é Mais Alta?',
    content: `<p>Após o período de teste inicial sem reações, a taxa de infusão é aumentada para garantir que a transfusão seja concluída dentro de um prazo seguro, que não deve exceder <strong>4 horas</strong>.</p><p><strong>O Risco do Tempo:</strong></p><ul><li><strong>Risco de Contaminação Bacteriana:</strong> O sangue à temperatura ambiente é um excelente meio de cultura. O risco de sepse transfusional aumenta significativamente após 4 horas.</li><li><strong>Viabilidade Celular:</strong> A qualidade dos componentes pode se deteriorar com o tempo fora da refrigeração.</li></ul><p>A taxa de manutenção é um equilíbrio entre rapidez e segurança (evitar sobrecarga circulatória).</p><p class="text-sm text-muted-foreground"><em>Fonte: Davidow, B. (2013). Veterinary Clinics: Small Animal Practice.</em></p>`
  },
  anticoagulants: {
    title: '🧪 Anticoagulantes na Coleta',
    content: `<p>O anticoagulante previne a coagulação quelando o cálcio. A proporção correta é crucial.</p><ul><li><strong>CPDA-1:</strong> Padrão para bolsas de sangue, contém preservativos. Proporção: <strong>1 mL de CPDA-1 para cada 7-9 mL de sangue</strong>.</li><li><strong>Citrato de Sódio (3.2-3.8%):</strong> Para coletas em seringa. Não possui preservativos. Proporção rigorosa: <strong>1 parte de citrato para 9 partes de sangue</strong>.</li></ul>`
  },
  visual_inspection: {
    title: '🧐 Inspeção Visual da Bolsa',
    content: `<p>É um passo vital de controle de qualidade. Uma bolsa com qualquer uma das seguintes alterações <strong>não deve ser utilizada</strong>:</p><ul><li><strong>Descoloração:</strong> Cor roxa/escuro ou plasma rosado (hemólise) pode indicar contaminação bacteriana ou dano aos eritrócitos.</li><li><strong>Coágulos:</strong> Indicam falha na anticoagulação e risco de embolia.</li><li><strong>Vazamentos:</strong> Comprometem a esterilidade.</li></ul>`
  },
  warming_blood: {
    title: '🌡️ Aquecimento do Hemocomponente',
    content: `<p>A administração de sangue refrigerado pode causar hipotermia (arritmias, coagulopatias) e dificultar a liberação de oxigênio para os tecidos.</p><p>Aqueça gradualmente a ~37°C. <strong>Cuidado:</strong> O superaquecimento (>40°C) causa hemólise e desnatura proteínas, tornando o produto perigoso.</p>`
  },
  filter_use: {
    title: '🧬 Uso Obrigatório do Filtro',
    content: `<p>O filtro de transfusão (170-260 mícrons) remove "microagregados" (plaquetas, leucócitos, fibrina) que se formam durante o armazenamento.</p><p><strong>Fisiopatologia:</strong> Se infundidos, esses agregados podem causar <strong>embolia pulmonar não trombótica</strong>, levando a dispneia e hipoxemia. O filtro protege a microcirculação pulmonar do paciente.</p>`
  },
  fluid_compatibility: {
    title: '💧 Compatibilidade de Fluidos',
    content: `<p>A escolha do fluido é crítica:</p><ul><li><strong>NaCl 0.9% (Seguro):</strong> Isotônico e sem aditivos que interfiram com o sangue.</li><li><strong>Ringer com Lactato (Contraindicado):</strong> Contém cálcio, que reverte o efeito do anticoagulante citrato, causando a formação de coágulos <strong>dentro do equipo</strong>.</li><li><strong>Soluções Hipotônicas (ex: Dextrose 5%):</strong> Causam lise osmótica (explosão) dos eritrócitos.</li></ul>`
  }
};
