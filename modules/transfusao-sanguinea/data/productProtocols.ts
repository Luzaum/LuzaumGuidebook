import { PRODUCT_SOURCES, type ProductGuide } from './products';
import type { KnowledgeItem } from './knowledgeBase';

export const PRODUCT_CATEGORIES = [
  { id: 'red', label: 'Hemácias e sangue total', icon: 'rbc', products: ['fresh-whole', 'stored-whole', 'rbc'] },
  { id: 'plasma', label: 'Plasma e derivados', icon: 'ffp', products: ['fresh-plasma', 'ffp', 'frozen-plasma', 'cryo', 'cryo-poor'] },
  { id: 'platelet', label: 'Plaquetas', icon: 'platelets', products: ['prp', 'platelets', 'platelets-preserved'] },
  { id: 'albumin', label: 'Albumina', icon: 'canine-albumin', products: ['canine-albumin', 'human-albumin', 'canine-albumin-cat'] },
] as const;

const physiology: Record<string, string> = {
  'fresh-whole': 'As hemácias transportam oxigênio; o plasma fornece fatores e volume. A contribuição plaquetária depende do tempo e das condições desde a coleta. Fresco não significa concentrado de plaquetas.',
  'stored-whole': 'Durante o armazenamento, a função plaquetária e a atividade dos fatores lábeis se deterioram. A unidade permanece principalmente uma fonte de hemácias, com maior volume de plasma que um concentrado.',
  rbc: 'A hemoglobina é o principal determinante do conteúdo arterial de oxigênio. A entrega tecidual depende também do débito cardíaco: elevar o hematócrito não substitui corrigir a perfusão. A indicação não depende de um limiar isolado de VG/Ht.',
  'fresh-plasma': 'O plasma fornece proteínas solúveis da coagulação, mas não uma dose terapêutica de hemácias ou plaquetas. A atividade presente na unidade deve corresponder ao fator deficitário e ao contexto hemorrágico.',
  ffp: 'O congelamento oportuno preserva fatores lábeis, incluindo V e VIII. Esses fatores participam da geração de trombina e formação de fibrina. O PFC não fornece o tampão plaquetário nem corrige anemia.',
  'frozen-plasma': 'Processamento e conservação determinam a atividade dos fatores. Não se deve presumir preservação de fatores lábeis em toda bolsa congelada: confirme o conteúdo com o hemobanco.',
  cryo: 'Concentra fibrinogênio, fator VIII e fator de von Willebrand. O fibrinogênio é convertido em fibrina; von Willebrand participa da adesão plaquetária e transporta VIII. A reposição é direcionada, não de todos os fatores.',
  'cryo-poor': 'O sobrenadante após retirar o crioprecipitado mantém albumina e certos fatores, incluindo IX, mas perde parte importante de fibrinogênio, VIII e von Willebrand. Não equivale ao PFC para toda coagulopatia.',
  prp: 'Plaquetas aderem à lesão, são ativadas e agregam formando o tampão primário. O PRP fornece esse suporte com mais plasma que um concentrado. Aqui PRP significa produto transfusional, não aplicação regenerativa local.',
  platelets: 'Na destruição imunomediada, as plaquetas transfundidas também podem ser rapidamente removidas. O controle do sangramento é essencial, mesmo sem grande incremento na contagem.',
  'platelets-preserved': 'Criopreservação e liofilização alteram características das plaquetas. Número de partículas, função hemostática e incremento circulante não são sinônimos. Preparações distintas não são intercambiáveis.',
  'canine-albumin': 'A albumina contribui para o gradiente oncótico e transporta moléculas. Sua permanência intravascular depende do endotélio e do glicocálix. Na inflamação, o extravasamento proteico limita o benefício: corrigir o exame não garante corrigir o edema.',
  'human-albumin': 'Além do efeito oncótico, existe diferença antigênica entre albumina humana e a do receptor. Proteína xenógena pode causar reações imediatas ou tardias. Uma infusão inicialmente tolerada não exclui eventos posteriores.',
  'canine-albumin-cat': 'Albumina canina é proteína xenógena em gatos. Uma pequena série clínica não estabelece dose, segurança ou eficácia de rotina; ausência de reação observada não comprova ausência de risco imunológico.',
};

export function protocolFor(product: ProductGuide) {
  const category = PRODUCT_CATEGORIES.find(item => (item.products as readonly string[]).includes(product.id))!;
  const albumin = category.id === 'albumin';
  const platelet = category.id === 'platelet';
  const red = category.id === 'red';
  const cryo = product.id === 'cryo';
  return {
    category, albumin,
    preparationLabel: albumin ? 'Formulação e infusão' : platelet ? 'Conservação e administração' : red ? 'Equipo e velocidade' : 'Preparo e administração',
    doseLabel: albumin ? 'Massa e concentração' : platelet ? 'Conteúdo plaquetário' : cryo ? 'Conteúdo por unidade' : red ? 'Volume e VG da bolsa' : 'Volume de plasma',
    quantity: albumin ? 'Defina a massa prescrita (g) e confira a concentração. Volume (mL) = massa (g) × 100 ÷ concentração (%). Não há dose automática neste guia.' : platelet ? 'A dose depende do conteúdo de plaquetas. Não converter unidades de CP em volume de PRP sem a especificação do hemobanco.' : cryo ? 'A referência Cornell de 1 unidade/10 kg pressupõe uma unidade obtida de 200 mL de PFC. Confirme a equivalência com o hemobanco.' : red ? 'Individualize com peso, volemia estimada, VG/Ht atual e desejado e VG/Ht real da bolsa. O alvo é corrigir a repercussão clínica, não normalizar o hematócrito.' : 'Defina a quantidade pelo déficit hemostático, conteúdo da unidade, tolerância ao volume e resposta. Reavalie antes de repetir.',
    responseLabel: albumin ? 'Resposta oncótica e segurança' : platelet ? 'Sangramento e incremento' : cryo ? 'Fibrinogênio e hemostasia' : red ? 'Perfusão e hematócrito' : 'Hemostasia e tolerância ao volume',
  };
}

export function productHelp(product: ProductGuide): Record<string, KnowledgeItem> {
  const profile = protocolFor(product);
  const sources = product.sources.map(id => PRODUCT_SOURCES[id as keyof typeof PRODUCT_SOURCES]);
  const entry = (title: string, paragraphs: string[]): KnowledgeItem => ({ title: `${product.abbreviation} · ${title}`, content: paragraphs.map(text => `<p>${text}</p>`).join(''), sources });
  return {
    mechanism: entry('Fisiologia e indicação', [physiology[product.id], product.indication, product.doesNotDo]),
    compatibility: entry('Seleção e compatibilidade', [product.selection, profile.albumin ? 'Tipagem e prova cruzada eritrocitária não excluem hipersensibilidade à albumina. Confira espécie de origem, formulação e exposição anterior.' : 'Tipagem identifica antígenos; prova cruzada investiga incompatibilidade entre doador e receptor. Em gatos, o sistema AB também importa para plasma. A compatibilidade deve corresponder ao componente.']),
    preparation: entry(profile.preparationLabel, [product.administration, profile.albumin ? 'A concentração muda o volume para a mesma massa. Confirme reconstituição, diluente, equipo, prazo após abertura e taxa na bula ou protocolo validado da formulação. Não reutilize uma taxa de sangue total.' : profile.category.id === 'platelet' ? 'Conservação influencia função e ativação plaquetária. Não refrigere automaticamente uma preparação fresca como hemácias. Confirme filtro, reconstituição e validade específicos; produtos especiais podem exigir condições diferentes.' : profile.category.id === 'plasma' ? 'Controle de temperatura no descongelamento protege proteínas. Inspecione integridade, aspecto, identificação e prazo após descongelar. Não adicione medicamentos à bolsa nem extrapole o prazo de outra preparação.' : 'Confira integridade, validade, acesso dedicado e filtro para sangue. Soluções com cálcio podem favorecer coagulação no sistema; não misture medicamentos. A taxa depende da estabilidade e do risco de sobrecarga.']),
    quantity: entry(profile.doseLabel, [profile.quantity, product.dose ? `${product.dose.min}–${product.dose.max} mL/kg: ${product.dose.note} Peso × dose estima volume total, não velocidade.` : 'Não há conversão automática segura sem confirmar o conteúdo ou a concentração.', 'O cálculo não substitui prescrição individual nem autoriza repetição sem reavaliação.']),
    response: entry(profile.responseLabel, [product.monitoring, profile.albumin ? 'Acompanhe balanço hídrico e sinais respiratórios: expansão intravascular pode contribuir para sobrecarga. Para produtos xenógenos, planeje também vigilância tardia.' : profile.category.id === 'platelet' ? 'Interprete a contagem junto do sangramento. Consumo e destruição imunológica podem limitar a duração da resposta.' : profile.category.id === 'red' ? 'Interprete VG/Ht com perfusão, hemorragia, hemólise e fluidoterapia. Incremento laboratorial isolado não demonstra recuperação da entrega de oxigênio.' : 'TP/TTPa não representam toda a hemostasia. Escolha o teste pertinente; no crioprecipitado, fibrinogênio ou investigação específica podem ser mais informativos.', 'Registre sinais vitais basais. Diante de suspeita de reação, interrompa a transfusão e avalie imediatamente; consulte a seção Reações.']),
    evidence: entry('Evidência e limites', [product.evidence, 'Outra espécie, formulação ou série pequena de casos não estabelece equivalência clínica. Consulte as fontes no contexto original.']),
  };
}
