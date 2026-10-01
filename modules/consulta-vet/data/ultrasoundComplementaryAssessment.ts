import type { UltrasoundOrganId } from './ultrasoundReferenceData';

export const ULTRASOUND_COMPLEMENTARY_BOOKS = [
  'Atlas of Radiographic Interpretation in Small Animals',
  'BSAVA Manual of Canine and Feline Radiography and Radiology',
  'BSAVA Manual of Canine and Feline Thoracic Imaging',
  'Veterinary Endoscopy for the Small Animal Practitioner',
];

const gastrointestinal = 'O ultrassom mostra espessura, camadas, motilidade e tecidos externos; radiografias ajudam a avaliar distribuição de gás, dilatação e alguns corpos estranhos. Endoscopia examina a superfície e permite amostras mucosas, mas não alcança todo o intestino nem representa necessariamente uma lesão profunda. A camada e o segmento alterados devem orientar o local e a profundidade da amostra; biópsia superficial inadequada pode deixar a pergunta sem resposta.';
export const ULTRASOUND_COMPLEMENTARY_ASSESSMENT: Partial<Record<UltrasoundOrganId, string>> = {
  liver: 'Ultrassom e radiografia respondem a perguntas diferentes: textura e vasos são bem avaliados pelo ultrassom, enquanto radiografia pode complementar a avaliação do tamanho global, especialmente redução hepática. Mapeamento vascular por tomografia pode esclarecer comunicações quando o trajeto não está definido. Citologia ou histologia responde a perguntas celulares que nenhum aspecto de imagem confirma sozinho.',
  stomach: gastrointestinal,
  'small-intestine': gastrointestinal,
  colon: gastrointestinal,
  kidneys: 'Radiografias podem complementar a localização de material radiopaco; ultrassom avalia parênquima, pelve e repercussão sobre a drenagem. Não visualizar mineral radiograficamente não exclui cálculo, e sombra no ultrassom não determina composição. Exames de urina e função renal respondem a perguntas que o tamanho e o brilho do rim não resolvem.',
  bladder: 'Ultrassom avalia parede, conteúdo e implantação de lesões; radiografias simples/contrastadas podem responder a dúvidas sobre cálculo, uretra ou vazamento. Cistoscopia permite olhar a mucosa e coletar material dirigido. A escolha depende da localização, da pergunta diagnóstica e dos riscos da lesão, especialmente diante de suspeita de carcinoma urotelial.',
  ureters: 'Quando o trajeto, a ectopia ou o ponto de obstrução não fica definido, outras técnicas anatômicas/contrastadas ou cistoscopia podem complementar. As técnicas têm alcances distintos: ver a abertura na bexiga não caracteriza sozinho todo o ureter, e não encontrar cálculo não exclui obstrução.',
  heart: 'Ecocardiografia descreve estrutura, fluxo e repercussão; ECG/Holter responde sobre ritmo, e a avaliação torácica complementa a investigação de congestão e causas respiratórias de dispneia. Função sistólica depende de carga: uma fração de ejeção alta na regurgitação mitral não prova contratilidade normal, pois parte do sangue é ejetada para uma via de menor resistência.',
  adrenals: 'A imagem localiza e avalia extensão, enquanto os testes hormonais avaliam função. Mapeamento por tomografia pode ajudar a delimitar vasos e invasão antes de planejamento cirúrgico. A escolha da intervenção depende de anatomia e contexto; tamanho e heterogeneidade não definem tipo tumoral nem atividade hormonal.',
};
