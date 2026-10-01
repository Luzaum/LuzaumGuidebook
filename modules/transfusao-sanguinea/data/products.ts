export type Species = 'dog' | 'cat';
export type Goal = 'oxigenacao' | 'coagulacao' | 'plaquetas' | 'oncotica';

export interface ProductGuide {
  id: string;
  name: string;
  abbreviation: string;
  goals: Goal[];
  species: Species[];
  indication: string;
  doesNotDo: string;
  selection: string;
  administration: string;
  monitoring: string;
  evidence: string;
  dose?: { min: number; max: number; unit: 'mL/kg'; note: string };
  sources: string[];
}

export const PRODUCT_SOURCES = {
  cornell: { label: 'Cornell University — Transfusion Guidelines', url: 'https://www.vet.cornell.edu/animal-health-diagnostic-center/laboratories/comparative-coagulation/clinical-topics/transfusion-guidelines' },
  tracs: { label: 'AVHTM TRACS, parte 2 (2021)', url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/vec.13045' },
  isfm: { label: 'ISFM, diretrizes de transfusão felina (2021)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10741281/' },
  acvim: { label: 'ACVIM, consenso sobre PTI canina e felina (2024)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11256181/' },
  aaha: { label: 'AAHA, fluidoterapia em cães e gatos (2024)', url: 'https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/section-5-fluid-therapy-in-ill-patients/' },
  aahaFAQ: { label: 'AAHA 2024, perguntas sobre fluidos e transfusão', url: 'https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/fluid-therapy-frequently-asked-questions/' },
  merck: { label: 'Merck Veterinary Manual, hemobancos (rev. 2024)', url: 'https://www.merckvetmanual.com/circulatory-system/blood-groups-and-blood-transfusions-in-dogs-and-cats/screening-of-blood-donors-and-blood-banking-considerations-in-dogs-and-cats' },
  albuminCats: { label: 'Série de casos: albumina canina em 5 gatos (2025)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12177886/' },
  albuminReview: { label: 'Revisão: coloides e albumina em pequenos animais (2021)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8282815/' },
} as const;

export const BOOK_REFERENCES = [
  'Macintire et al. Manual of Small Animal Emergency and Critical Care Medicine, 2ª ed., cap. 14, tabela 14.3, pp. 339–341 (PDF pp. 355–357).',
  'Feline Emergency and Critical Care Medicine, 2ª ed., tabela 5.3, p. 37 e capítulo 28, p. 302 (PDF pp. 55 e 320).',
];

export const PRODUCT_GUIDES: ProductGuide[] = [
  {
    id: 'fresh-whole', name: 'Sangue total fresco', abbreviation: 'STF', goals: ['oxigenacao', 'coagulacao', 'plaquetas'], species: ['dog', 'cat'],
    indication: 'Hemorragia importante com anemia e hipovolemia; fornece hemácias e, se processado e administrado prontamente, fatores e plaquetas funcionais.',
    doesNotDo: 'Não substitui concentrado de plaquetas quando se precisa de grande aporte plaquetário; a resposta plaquetária é variável.',
    selection: 'Tipar doador e receptor; realizar prova cruzada conforme espécie e histórico. Confirmar coleta, anticoagulante, rastreio do doador e tempo desde a coleta.',
    administration: 'Usar equipo e filtro próprios para sangue. Se o objetivo inclui plaquetas, não tratar sangue refrigerado ou armazenado como fonte equivalente de plaquetas funcionais.',
    monitoring: 'Reavaliar perfusão, VG/Ht, sangramento e sinais de reação ou sobrecarga.',
    evidence: 'Produto tradicional; a escolha depende do padrão de perda e da disponibilidade de componentes.',
    dose: { min: 12, max: 20, unit: 'mL/kg', note: 'Faixa inicial de referência; ajustar à perda, ao VG/Ht, à volemia e à resposta.' },
    sources: ['cornell', 'isfm', 'tracs'],
  },
  {
    id: 'stored-whole', name: 'Sangue total armazenado', abbreviation: 'STA', goals: ['oxigenacao'], species: ['dog', 'cat'],
    indication: 'Anemia com necessidade simultânea de volume quando não há separação de componentes.',
    doesNotDo: 'Não contar com plaquetas viáveis; atividade de fatores lábeis diminui com o armazenamento.',
    selection: 'Verificar tipagem, prova cruzada, integridade, anticoagulante, temperatura e validade da unidade.',
    administration: 'Usar filtro para sangue e seguir as condições do hemobanco; não confundir com sangue total fresco.',
    monitoring: 'VG/Ht, perfusão, reações e balanço hídrico.',
    evidence: 'A qualidade varia com processamento e armazenamento; seguir especificação da unidade.',
    sources: ['merck', 'tracs'],
  },
  {
    id: 'rbc', name: 'Concentrado de hemácias', abbreviation: 'CH', goals: ['oxigenacao'], species: ['dog', 'cat'],
    indication: 'Anemia clinicamente relevante, sobretudo quando se deseja limitar o volume de plasma.',
    doesNotDo: 'Não corrige deficiência de fatores ou plaquetas.',
    selection: 'Tipagem e prova cruzada; usar VG/Ht real da bolsa para o cálculo individual já disponível na calculadora.',
    administration: 'Equipo com filtro para sangue; selecionar taxa de acordo com perfusão, coração, rins e risco de sobrecarga.',
    monitoring: 'Sinais de hipóxia, VG/Ht antes e depois e sinais de reação.',
    evidence: 'Uso estabelecido para suporte da capacidade de transporte de oxigênio.',
    sources: ['cornell', 'isfm', 'tracs'],
  },
  {
    id: 'fresh-plasma', name: 'Plasma fresco', abbreviation: 'PF', goals: ['coagulacao'], species: ['dog', 'cat'],
    indication: 'Deficiência de fatores com hemorragia ativa ou procedimento urgente, se disponível para uso imediato.',
    doesNotDo: 'Não corrige anemia nem fornece plaquetas funcionais. Não é forma eficiente de elevar albumina.',
    selection: 'Confirmar déficit de coagulação e compatibilidade de plasma; em gatos, tipar AB e usar plasma compatível.',
    administration: 'Administrar segundo protocolo do hemobanco após separação; acompanhar volume total infundido.',
    monitoring: 'Sangramento, TP/TTPa ou teste pertinente, sinais de reação e sobrecarga.',
    evidence: 'Faixas de dose dependem do déficit e da resposta; não usar apenas por alteração laboratorial sem contexto clínico.',
    dose: { min: 6, max: 12, unit: 'mL/kg', note: 'Faixa publicada pela Cornell; reavaliar sangramento e coagulação antes de repetir.' },
    sources: ['cornell', 'tracs', 'isfm'],
  },
  {
    id: 'ffp', name: 'Plasma fresco congelado', abbreviation: 'PFC', goals: ['coagulacao'], species: ['dog', 'cat'],
    indication: 'Reposição de múltiplos fatores na coagulopatia com sangramento, ou antes de procedimento invasivo com risco hemorrágico relevante; contém fatores lábeis.',
    doesNotDo: 'Não corrige anemia ou trombocitopenia. Volumes usuais têm efeito pequeno sobre albumina.',
    selection: 'Confirmar data e método de processamento; em gatos, usar plasma AB compatível. Avaliar deficiência específica para considerar crioprecipitado.',
    administration: 'Descongelar conforme hemobanco, sem calor excessivo; não recongelar ou prolongar o uso fora do prazo local.',
    monitoring: 'Sangramento, testes de coagulação, perfusão e sinais de reação/sobrecarga.',
    evidence: 'A indicação deve ser guiada por hemorragia ou procedimento e alteração hemostática pertinente.',
    dose: { min: 6, max: 12, unit: 'mL/kg', note: 'Faixa inicial Cornell e tabela felina do livro; reavaliar efeito antes de repetir.' },
    sources: ['cornell', 'isfm', 'tracs', 'aaha'],
  },
  {
    id: 'frozen-plasma', name: 'Plasma congelado', abbreviation: 'PC', goals: ['coagulacao', 'oncotica'], species: ['dog', 'cat'],
    indication: 'Deficiências de fatores estáveis, conforme caracterização da unidade; pode fornecer proteínas plasmáticas.',
    doesNotDo: 'Não presumir conteúdo adequado de fatores lábeis V e VIII ou de plaquetas. Não usar para corrigir hipoalbuminemia isolada em volume usual.',
    selection: 'Conferir rótulo e especificação do hemobanco: duração e temperatura de armazenamento mudam o conteúdo hemostático.',
    administration: 'Descongelar e usar dentro do prazo do fornecedor; plasma felino deve ser AB compatível.',
    monitoring: 'Parâmetro clínico alvo, coagulação, albumina se pertinente e sobrecarga.',
    evidence: 'Composição variável; a indicação é condicionada ao processamento.',
    sources: ['cornell', 'merck', 'tracs', 'aaha'],
  },
  {
    id: 'cryo', name: 'Crioprecipitado', abbreviation: 'CRIO', goals: ['coagulacao'], species: ['dog', 'cat'],
    indication: 'Deficiência de fibrinogênio, fator VIII ou fator de von Willebrand com sangramento ou procedimento de risco.',
    doesNotDo: 'Não repõe todos os fatores da coagulação, hemácias ou plaquetas.',
    selection: 'Confirmar composição e tamanho da unidade com o hemobanco; a dose em “unidades” não é intercambiável entre fornecedores.',
    administration: 'Descongelar conforme fabricante, usar filtro e observar compatibilidade de espécie/tipo, sobretudo em gatos.',
    monitoring: 'Fibrinogênio ou teste específico, sangramento e sinais de reação.',
    evidence: 'Concentrado direcionado; a Cornell cita 1 unidade/10 kg somente quando a unidade deriva de 200 mL de PFC.',
    sources: ['cornell', 'merck', 'isfm'],
  },
  {
    id: 'cryo-poor', name: 'Plasma pobre em crioprecipitado', abbreviation: 'PPC', goals: ['coagulacao', 'oncotica'], species: ['dog', 'cat'],
    indication: 'Deficiências de fatores que permanecem no sobrenadante (como IX) quando disponível; suporte oncótico selecionado tem evidência limitada.',
    doesNotDo: 'Não escolher para deficiência de fibrinogênio, fator VIII ou von Willebrand.',
    selection: 'Verificar conteúdo, compatibilidade e protocolo do hemobanco; distinguir de plasma fresco congelado.',
    administration: 'Descongelar conforme o fornecedor; considerar carga de volume.',
    monitoring: 'Hemostasia ou albumina conforme objetivo, perfusão e sobrecarga.',
    evidence: 'Uso oncótico sustentado sobretudo por relatos; não extrapolar efeito clínico a partir da albumina sérica.',
    sources: ['cornell', 'aaha', 'merck'],
  },
  {
    id: 'prp', name: 'Plasma rico em plaquetas', abbreviation: 'PRP', goals: ['plaquetas'], species: ['dog'],
    indication: 'Hemorragia clinicamente importante por trombocitopenia ou disfunção plaquetária quando o produto estiver disponível.',
    doesNotDo: 'Não é tratamento rotineiro de PTI sem sangramento grave; as plaquetas transfundidas podem ser rapidamente destruídas.',
    selection: 'Confirmar contagem e função plaquetária do produto, espécie, compatibilidade e prazo de uso com o hemobanco.',
    administration: 'Armazenar e administrar conforme protocolo específico de plaquetas; não refrigerar automaticamente como CH.',
    monitoring: 'Controle do sangramento e contagem plaquetária após transfusão; vigiar reação e volume.',
    evidence: 'Dose de referência Cornell; benefício em desfechos de PTI continua incerto segundo ACVIM.',
    dose: { min: 6, max: 10, unit: 'mL/kg', note: 'Referência Cornell para PRP canino; resposta depende do número de plaquetas do produto.' },
    sources: ['cornell', 'acvim', 'merck'],
  },
  {
    id: 'platelets', name: 'Concentrado de plaquetas', abbreviation: 'CP', goals: ['plaquetas'], species: ['dog', 'cat'],
    indication: 'Sangramento grave ou ameaçador à vida associado à trombocitopenia/disfunção plaquetária, como medida adjuvante.',
    doesNotDo: 'Não transfundir de rotina somente pelo número de plaquetas na PTI; não trata a causa de base.',
    selection: 'Confirmar dose pelo conteúdo plaquetário da unidade e pelo protocolo do hemobanco. Produto felino é pouco disponível.',
    administration: 'Usar condições de transporte, armazenamento, filtro e prazo específicos da preparação; não aplicar dose de PRP ao CP.',
    monitoring: 'Sangramento clínico, contagem de plaquetas, reação e sobrecarga.',
    evidence: 'ACVIM: evidência baixa para cães e insuficiente para gatos com PTI; considerar sobretudo hemorragia grave.',
    sources: ['acvim', 'isfm', 'merck'],
  },
  {
    id: 'platelets-preserved', name: 'Plaquetas criopreservadas ou liofilizadas', abbreviation: 'CP especial', goals: ['plaquetas'], species: ['dog'],
    indication: 'Alternativa para sangramento trombocitopênico quando preparada e disponibilizada por hemobanco qualificado.',
    doesNotDo: 'Não presumir equivalência de dose, armazenamento ou resposta com concentrado fresco.',
    selection: 'Usar instruções do fabricante e número de partículas plaquetárias; avaliar disponibilidade e riscos.',
    administration: 'Reconstituir/descongelar exatamente conforme especificação do produto.',
    monitoring: 'Hemorragia, contagem e reações.',
    evidence: 'Ensaios pequenos em cães não demonstraram superioridade clínica consistente entre preparações; sem extrapolação para gatos.',
    sources: ['acvim', 'merck'],
  },
  {
    id: 'canine-albumin', name: 'Albumina canina concentrada', abbreviation: 'AC', goals: ['oncotica'], species: ['dog'],
    indication: 'Suporte oncótico individualizado em cão com hipoalbuminemia clinicamente relevante, edema ou hipovolemia, enquanto se trata a causa.',
    doesNotDo: 'Não trata perda proteica ou inflamação de base; não há demonstração robusta de benefício em sobrevida.',
    selection: 'Confirmar espécie, concentração, formulação, disponibilidade e bula. Não extrapolar dose da albumina humana ou de outra concentração.',
    administration: 'Prescrição individual por especialista/equipe responsável; calcular massa em g e volume pela concentração real do frasco.',
    monitoring: 'Perfusão, pressão arterial, balanço hídrico, edema, albumina seriada e hipersensibilidade.',
    evidence: 'AAHA 2024 descreve aumento de albumina e pressão arterial em cães, com dados clínicos ainda limitados.',
    sources: ['aaha', 'albuminReview'],
  },
  {
    id: 'human-albumin', name: 'Albumina humana', abbreviation: 'AH', goals: ['oncotica'], species: ['dog', 'cat'],
    indication: 'Opção excepcional de suporte oncótico em cão ou gato criticamente doente, quando o benefício esperado justifica o risco e não há alternativa adequada.',
    doesNotDo: 'Não é produto de primeira escolha por mera concentração baixa de albumina; não demonstrou benefício consistente em sobrevida.',
    selection: 'Discutir risco de anafilaxia e hipersensibilidade tardia; registrar exposição prévia. Em gatos não há albumina espécie-específica disponível.',
    administration: 'Prescrição individual com concentração real do produto e vigilância intensiva; não oferecer dose automática genérica.',
    monitoring: 'Sinais vitais e reação durante a infusão; monitorar eventos tardios, sobrecarga e resposta clínica após a alta.',
    evidence: 'AAHA reconhece uso possível, mas alerta para alergia/anafilaxia. Estudos observacionais heterogêneos; riscos imunológicos em cães e dados felinos limitados.',
    sources: ['aaha', 'albuminReview', 'albuminCats'],
  },
  {
    id: 'canine-albumin-cat', name: 'Albumina canina em gatos', abbreviation: 'AC xenógena', goals: ['oncotica'], species: ['cat'],
    indication: 'Uso de resgate apenas após avaliação especializada, quando suporte oncótico for indispensável e alternativas forem inadequadas.',
    doesNotDo: 'Não é albumina felina e não há segurança ou eficácia estabelecidas para uso rotineiro.',
    selection: 'Explicitar que se trata de xenotransfusão e registrar consentimento, formulação e exposição prévia.',
    administration: 'Sem dose padrão validada; seguir protocolo institucional sob supervisão intensiva.',
    monitoring: 'Reação aguda e tardia, hemodinâmica, edema e albumina; manter registro de farmacovigilância.',
    evidence: 'Série retrospectiva de apenas 5 gatos publicada em 2025; sinal exploratório, insuficiente para recomendação de rotina.',
    sources: ['albuminCats', 'aaha'],
  },
];
