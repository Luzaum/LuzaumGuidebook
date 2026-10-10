import type { EditorialReference } from '../types/common';
import type { MedicationRecord } from '../types/medication';

/** Metadados conferidos via NCBI ESummary; não validam números de resumos antigos. */
const corrections: Record<string, Record<string, EditorialReference>> = {
  "fenobarbital": {
    "ref-ivetf-guidelines-2015": {
      "id": "ref-ivetf-guidelines-2015",
      "citationText": "Bhatti SF, De Risio L, Muñana K, et al. International Veterinary Epilepsy Task Force consensus proposal: medical treatment of canine epilepsy in Europe. BMC Vet Res. 2015 Aug 28;11:176.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/26316233/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-charalambous-meta-2014": {
      "id": "ref-charalambous-meta-2014",
      "citationText": "Charalambous M, Brodbelt D, Volk HA. Treatment in canine epilepsy--a systematic review. BMC Vet Res. 2014 Oct 22;10:257.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/25338624/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-boothe-comp-2012": {
      "id": "ref-boothe-comp-2012",
      "citationText": "Boothe DM, Dewey C, Carpenter DM. Comparison of phenobarbital with bromide as a first-choice antiepileptic drug for treatment of epilepsy in dogs. J Am Vet Med Assoc. 2012 May 1;240(9):1073-83.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/22515627/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-thomas-epilepsy-2010": {
      "id": "ref-thomas-epilepsy-2010",
      "citationText": "Thomas WB. Idiopathic epilepsy in dogs and cats. Vet Clin North Am Small Anim Pract. 2010 Jan;40(1):161-79.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/19942062/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-podell-status-2016": {
      "id": "ref-podell-status-2016",
      "citationText": "Podell M, Volk HA, Berendt M, et al. 2015 ACVIM Small Animal Consensus Statement on Seizure Management in Dogs. J Vet Intern Med. 2016 Mar-Apr;30(2):477-90.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/26899355/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-bailey-feline-2009": {
      "id": "ref-bailey-feline-2009",
      "citationText": "Bailey KS, Dewey CW, Boothe DM, Barone G, Kortz GD. Feline idiopathic epilepsy: a retrospective study of 30 cases (1998-2008) and treatment response to phenobarbital. J Feline Med Surg. 2009;11(8):657-664. doi: 10.1016/j.jfms.2008.12.008.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/19447661/",
      "sourceType": "Estudo Clínico Multicêntrico",
      "notes": "PMID corrigido e verificado: 19447661."
    },
    "ref-gizzi-tdm-2020": {
      "id": "ref-gizzi-tdm-2020",
      "citationText": "Gizzi AB, Leal LM, Flor PB, Rivero BR, et al. Phenobarbital clearance and therapeutic drug monitoring in dogs with epilepsy: Impact of autoinduction. J Vet Intern Med. 2020;34(4):1532-1541. doi: 10.1111/jvim.15820.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/32412140/",
      "sourceType": "Estudo Clínico Prospectivo",
      "notes": "PMID corrigido e verificado: 32412140."
    }
  },
  "dipirona": {
    "ref-giorgi-2017": {
      "id": "ref-giorgi-2017",
      "citationText": "Giorgi M, Łebkowska-Wieruszewska B, Lisowski A, et al. Pharmacokinetic profiles of the active metamizole metabolites after four different routes of administration in healthy dogs. J Vet Pharmacol Ther. 2018 Jun;41(3):428-436.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/29352476/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-giorgi-2018": {
      "id": "ref-giorgi-2018",
      "citationText": "Lebkowska-Wieruszewska B, Kim TW, Chea B, et al. Pharmacokinetic profiles of the two major active metabolites of metamizole (dipyrone) in cats following three different routes of administration. J Vet Pharmacol Ther. 2018 Apr;41(2):334-339.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/29164623/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-teixeira-2013": {
      "id": "ref-teixeira-2013",
      "citationText": "Zanuzzo FS, Teixeira-Neto FJ, Teixeira LR, et al. Analgesic and antihyperalgesic effects of dipyrone, meloxicam or a dipyrone-meloxicam combination in bitches undergoing ovariohysterectomy. Vet J. 2015 Jul;205(1):33-7.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/26026350/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-imagawa-2011": {
      "id": "ref-imagawa-2011",
      "citationText": "Imagawa VH, Fantoni DT, Tatarunas AC, et al. The use of different doses of metamizol for post-operative analgesia in dogs. Vet Anaesth Analg. 2011 Jul;38(4):385-93.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/21627755/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-ferreira-2019": {
      "id": "ref-ferreira-2019",
      "citationText": "Ferreira CG, Steagall PV, Pelligand L, et al. Effects of dipyrone on thermal and mechanical nociceptive thresholds in cats. J Vet Med Sci. 2019 May 31;81(5):764-770.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/30971578/",
      "sourceType": "Publicação indexada",
      "notes": "Ensaio de nocicepção térmica e mecânica e estabilidade hemodinâmica em gatos conscientes."
    }
  },
  "tramadol": {
    "ref-budsberg-2018-oa-dog": {
      "id": "ref-budsberg-2018-oa-dog",
      "citationText": "Budsberg SC, Torres BT, Kleine SA, et al. Lack of effectiveness of tramadol hydrochloride for the treatment of pain and joint dysfunction in dogs with chronic osteoarthritis. J Am Vet Med Assoc. 2018 Feb 15;252(4):427-432.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/29393744/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-monteiro-2017-feline-oa": {
      "id": "ref-monteiro-2017-feline-oa",
      "citationText": "Monteiro BP, Klinck MP, Moreau M, et al. Analgesic efficacy of tramadol in cats with naturally occurring osteoarthritis. PLoS One. 2017;12(4):e0175565.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28403198/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-pypendop-ilkiw-2008-cat-pk": {
      "id": "ref-pypendop-ilkiw-2008-cat-pk",
      "citationText": "Pypendop BH, Ilkiw JE. Pharmacokinetics of tramadol, and its metabolite O-desmethyl-tramadol, in cats. J Vet Pharmacol Ther. 2008 Feb;31(1):52-9.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/18177319/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-seddighi-2009-mac-tramadol": {
      "id": "ref-seddighi-2009-mac-tramadol",
      "citationText": "Seddighi MR, Egger CM, Rohrbach BW, et al. Effects of tramadol on the minimum alveolar concentration of sevoflurane in dogs. Vet Anaesth Analg. 2009 Jul;36(4):334-40.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/19538570/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    },
    "ref-aaha-pain-guidelines": {
      "id": "ref-aaha-pain-guidelines",
      "citationText": "Gruen ME, Lascelles BDX, Colleran E, et al. 2022 AAHA Pain Management Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2022 Mar 1;58(2):55-76.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/35195712/",
      "sourceType": "Publicação indexada",
      "notes": "Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo."
    }
  }
};

const withdrawn: Record<string, string[]> = {
  dipirona: ['ref-steagall-2020', 'ref-giorgi-repeated-2018'],
  fenobarbital: ['ref-bsava-neurology-2018'],
};

function publicReferenceUrl(reference: EditorialReference): string | null {
  if (reference.url) return reference.url;
  if (reference.doi) return `https://doi.org/${reference.doi}`;
  if (reference.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}/`;

  const sourceText = `${reference.citationText || ''} ${reference.citation || ''}`;
  const doi = sourceText.match(/\bDOI:\s*(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/i)?.[1];
  if (doi) {
    let normalized = doi.replace(/[.,;]+$/, '');
    while (normalized.endsWith(')') && (normalized.match(/\)/g)?.length ?? 0) > (normalized.match(/\(/g)?.length ?? 0)) normalized = normalized.slice(0, -1);
    return `https://doi.org/${normalized}`;
  }

  const pmid = sourceText.match(/\bPMID:\s*(\d{5,10})/i)?.[1];
  return pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : null;
}

export function repairMedicationReferences(medication: MedicationRecord): MedicationRecord {
  const replacements = corrections[medication.slug] ?? {};
  const removed = new Set(withdrawn[medication.slug] ?? []);
  const keepIds = (ids: string[]) => ids.filter((id) => !removed.has(id));
  return {
    ...medication,
    references: medication.references
      ?.filter((ref) => !removed.has(ref.id ?? ''))
      .map((ref) => replacements[ref.id ?? ''] ?? ref)
      .map((ref) => ({ ...ref, url: publicReferenceUrl(ref) })),
    doses: medication.doses.map((dose) => ({ ...dose, referenceIds: dose.referenceIds ? keepIds(dose.referenceIds) : undefined })),
    detailedIndications: medication.detailedIndications?.map((item) => ({ ...item, referenceIds: keepIds(item.referenceIds) })),
    clinicalStudiesCommented: medication.clinicalStudiesCommented?.filter((study) =>
      !removed.has(study.referenceId ?? '')),
  };
}
