import type { MedicationRecord } from '../types/medication';

/**
 * Correções clínicas de segurança e refinamentos farmacodinâmicos específicos.
 */
export function applyMedicationClinicalCorrections(medication: MedicationRecord): MedicationRecord {
  if (medication.slug === 'fenobarbital') {
    return {
      ...medication,
      attentionData: medication.attentionData ? {
        ...medication.attentionData,
        drugInteractionsDetailed: medication.attentionData.drugInteractionsDetailed?.map((interaction) =>
          interaction.drugOrClass.includes('Benzodiazepínicos') ? {
            ...interaction,
            pharmacologicalMechanism: 'Somação de depressão central. Benzodiazepínicos e barbitúricos modulam GABA-A em sítios alostéricos distintos; opioides atuam em receptores opioides, e não no mesmo sítio GABA-A. A combinação pode deprimir ventilação e sensorium.',
          } : interaction),
      } : undefined,
      generalInfoData: medication.generalInfoData ? {
        ...medication.generalInfoData,
        speciesPeculiarities: medication.generalInfoData.speciesPeculiarities?.map((item) => item.species === 'cat' ? {
          ...item,
          title: 'Felinos: monitorar tolerância neurológica, cutânea e hematológica',
          description: 'O fenobarbital é uma opção de primeira linha consagrada para controle de crises em gatos. Podem ocorrer letargia transitória, ataxia, polifagia, prurido facial e, raramente, citopenias idiossincráticas reversíveis. Não sofre autoindução enzimática acentuada na espécie.',
          clinicalImplications: 'Ajustar pelo controle de crises, tolerância e concentração sérica (alvo 15–45 µg/mL). Prurido intenso, febre ou citopenias exigem avaliação rápida e planejamento de substituição; nunca realizar retirada abrupta domiciliar sem cobertura anticonvulsivante alternativa.',
        } : item),
      } : undefined,
    };
  }

  if (medication.slug === 'tramadol') {
    return {
      ...medication,
      attentionData: medication.attentionData ? {
        ...medication.attentionData,
        drugInteractionsDetailed: medication.attentionData.drugInteractionsDetailed?.map((interaction) =>
          interaction.drugOrClass.includes('Dipirona') ? {
            ...interaction,
            severity: 'moderate',
            clinicalEffect: 'Integra protocolos de analgesia multimodal na dor aguda; eficácia e conforto do paciente devem ser monitorados.',
            pharmacologicalMechanism: 'Ação analgésica por mecanismos complementares: o tramadol modula vias opioides e monoaminérgicas, enquanto a dipirona atua predominantemente via inibição central de ciclo-oxigenase e vias endocanabinoides/espasmolíticas.',
          } : interaction),
      } : undefined,
    };
  }

  // Dipirona e demais fármacos: preservar integralmente a monografia padrão-ouro sem mutilação de doses
  return medication;
}
