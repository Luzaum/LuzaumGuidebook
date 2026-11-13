/**
 * Remove indicações de páginas, capítulos, tabelas, trechos de PDF e caminhos locais
 * de referências bibliográficas, mantendo apenas a identificação básica da obra/artigo.
 */
export function sanitizeReferenceText(raw?: string | null): string {
  if (!raw) return '';
  let text = String(raw);

  // Remove blocos de consulta ao acervo local em C:\LIVROS ou termos de acervo/PDF anexado
  text = text
    .replace(/\(\s*[^()]*C:\\LIVROS[^()]*\)/gi, '')
    .replace(/Consultado no acervo local[^.;\n]*[.;]?/gi, '')
    .replace(/\(\s*Acervo Local\s*\)/gi, '')
    .replace(/;\s*PDF\s+anexado[^.;]*/gi, '')
    .replace(/\bPDF\s+anexado[^.;]*/gi, '')
    .replace(/C:\\LIVROS[^\s,;.)]+/gi, '');

  // Remove sufixos e trechos entre parênteses de páginas / PDF / capítulos / tabelas
  text = text
    .replace(/\(\s*(?:PDF\s+)?(?:pp?|pág(?:ina)?s?)\.?\s*\d[\d\s–—,-]*(?:\/[^)]*)?\)/gi, '')
    .replace(/\(\s*páginas?(?:\s+impressas?)?\s*[^)]*\)/gi, '')
    .replace(/\(\s*(?:Cap(?:ítulo|\.)?|Chapter|Ch\.?|Seção|Procedimento|Tab(?:ela)?\.?)\s*[^)]*\)/gi, '');

  // Remove menções inline a capítulos, monografias, seções e tabelas em referências de livros
  // Preserva um espaço ou separador limpo quando seguido por outro trecho (evita colar palavras como "2020Myocardial")
  text = text
    .replace(/[.;,]?\s*Monografias?(?:\s*:\s*|\s+[“"'][^”"']+[”"'](?:\s*e\s+protocolos)?|\s+(?:e\s+)?(?:dos?|das?)\s+[^.;]+|\s+[A-Z][^.;]+)?/gi, '')
    .replace(/[.;,]?\s*Procedimento:\s*[^.;]+/gi, '')
    .replace(/[.;,]?\s*Tab(?:ela)?\.?\s*\d+(?:\.\d+)?(?:\s*[:—–-]\s*[^.;]+)?/gi, '')
    .replace(/\s*[—–-]\s*(?:Cap(?:ítulo|\.)?|Chapter|Ch\.?)\s+[^.;]+/gi, '')
    .replace(/([.;,])\s*\b(?:Cap(?:ítulo|\.)?|Chapter|Ch\.?)\s+\d+[\d\s,&e–-]*[:,]?\s*[^.;]*(?=(?:[.;]|$))/gi, '$1')
    .replace(/\b(?:Cap(?:ítulo|\.)?|Chapter|Ch\.?)\s+(?:\d+[\d\s,&e–-]*|de\s+[^.;,]+|asma\s+felina|[^.;]+?(?=(?:[.;,]|\s+pp?\.|\s*$)))[:,]?\s*/gi, '');

  // Remove indicações soltas de páginas e PDFs
  text = text
    .replace(/[—–,;\s]*\bPDF\s*(?:pp?\.?\s*)?\d[\d\s–—,-]*/gi, '')
    .replace(/[.;,\s]*\b(?:pp?|pág(?:ina)?s?)\.?\s*\d+(?:\s*(?:em diante|et\s+seq\.?|[-–—]\s*\d+)(?:\s*,\s*\d+(?:[-–—]\s*\d+)?)*)?/gi, '');

  // Limpeza de pontuação residual preservando "A.; B." em listas de autores
  text = text
    .replace(/\(\s*[.,;–—-]*\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:])/g, '$1')
    .replace(/\.{2,}/g, '.')
    .replace(/,{2,}/g, ',')
    .replace(/;{2,}/g, ';')
    .replace(/[;,]\s*\./g, '.')
    .replace(/\.\s*,/g, '.')
    .replace(/,\s*;/g, ';')
    .replace(/[—–-]\s*\./g, '.')
    .replace(/[:,;—–-]+\s*$/g, '')
    .replace(/[—–,;\s]+$/g, '')
    .trim();

  return text;
}
