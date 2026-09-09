/** Substituições restritas à saída do tutor; monografias e alertas clínicos mantêm os termos. */
export function simplifyPrescriptionTutorLanguage(text: string): string {
  const terms: Array<[string,string]> = [
    ['síncope','desmaio'], ['cianose','língua ou gengivas azuladas'], ['melena','fezes pretas como piche'],
    ['hematêmese','vômito com sangue'], ['anorexia','falta de apetite'], ['prostração','fraqueza intensa'],
    ['icterícia','olhos ou gengivas amarelados'], ['midríase','pupilas dilatadas'], ['prurido','coceira'],
    ['equimose','manchas roxas na pele'], ['deiscência','abertura da ferida ou dos pontos'],
    ['broncoespasmo','crise de chiado ou falta de ar'], ['tosse produtiva','tosse com secreção'],
    ['hipotensão','pressão baixa'], ['hipovolemia','perda importante de líquidos ou sangue'],
    ['AINEs?','anti-inflamatório'], ['via transmucosa oral','parte interna da bochecha, junto à gengiva'],
  ];
  let result = text;
  for (const [term, replacement] of terms) {
    // As letras acentuadas não são limites de palavra no \b do JavaScript.
    result = result.replace(new RegExp(`(?<![\\p{L}])${term}(?![\\p{L}])`, 'giu'), replacement);
  }
  return result;
}
