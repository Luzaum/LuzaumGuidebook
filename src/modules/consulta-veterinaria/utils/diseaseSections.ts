import type { DiseaseRecord } from '../types/disease'

export type DiseaseSectionConfig = {
  id: string
  label: string
  title: string
  overview?: string
  blocks: Array<{
    title: string
    items?: string[]
    text?: string
  }>
}

export function buildDiseaseSectionConfigs(disease: DiseaseRecord): DiseaseSectionConfig[] {
  return [
    {
      id: 'introducao',
      label: 'Introdução',
      title: 'Introdução',
      blocks: [
        { title: 'Descrição', text: disease.introduction.description },
        { title: 'Causa', text: disease.introduction.cause },
        { title: 'Hospedeiros afetados', items: disease.introduction.affectedHosts },
        { title: 'Modos de transmissão', items: disease.introduction.transmissionModes },
        { title: 'Principais sinais clínicos', items: disease.introduction.mainClinicalSigns },
        { title: 'Diferenciais resumidos', items: disease.introduction.summaryDifferentials },
      ],
    },
    {
      id: 'etiologia',
      label: 'Etiologia',
      title: 'Etiologia',
      overview: disease.etiology.overview,
      blocks: [
        { title: 'Causas', items: disease.etiology.causes },
        { title: 'Fatores predisponentes', items: disease.etiology.riskFactors },
        { title: 'Fatores imunológicos', items: disease.etiology.immunologicFactors },
        { title: 'Fatores ambientais', items: disease.etiology.environmentalFactors },
        { title: 'Fatores populacionais', items: disease.etiology.populationFactors },
      ],
    },
    {
      id: 'transmissao',
      label: 'Transmissão',
      title: 'Transmissão',
      overview: disease.transmission.overview,
      blocks: [
        { title: 'Transmissão direta', items: disease.transmission.directTransmission },
        { title: 'Transmissão indireta', items: disease.transmission.indirectTransmission },
        { title: 'Transmissão vertical', items: disease.transmission.verticalTransmission },
        { title: 'Eliminação do agente', items: disease.transmission.sheddingInfo },
        { title: 'Grupos suscetíveis', items: disease.transmission.susceptibleGroups },
      ],
    },
    {
      id: 'fisiopatologia',
      label: 'Fisiopatologia',
      title: 'Fisiopatologia',
      blocks: [
        { title: 'Início da infecção', items: disease.pathophysiology.infectionStart },
        { title: 'Disseminação', items: disease.pathophysiology.dissemination },
        { title: 'Interação com o sistema imune', items: disease.pathophysiology.immuneInteraction },
        { title: 'Alterações teciduais', items: disease.pathophysiology.tissueDamage },
        { title: 'Lesões no SNC', items: disease.pathophysiology.cnsLesions },
        {
          title: 'Sistemas afetados',
          items: disease.pathophysiology.possibleSystemsAffected.map(
            (item) => `${item.system}: ${item.findings.join(', ')}`
          ),
        },
        { title: 'Desfechos possíveis', items: disease.pathophysiology.outcomes },
        { title: 'Eliminação / persistência', items: disease.pathophysiology.pathogenElimination },
      ],
    },
    {
      id: 'epidemiologia',
      label: 'Epidemiologia',
      title: 'Epidemiologia | Predisposições',
      overview: disease.epidemiology.incidencePrevalence,
      blocks: [
        { title: 'Idade', items: disease.epidemiology.agePredisposition },
        { title: 'Raça', items: disease.epidemiology.breedPredisposition },
        { title: 'Sexo', items: disease.epidemiology.sexPredisposition },
        { title: 'Espécie', items: disease.epidemiology.speciesPredisposition },
        { title: 'Vacinação', items: disease.epidemiology.vaccineRelatedInfo },
        { title: 'Fatores de risco', items: disease.epidemiology.riskFactors },
        { title: 'Exposição ambiental', items: disease.epidemiology.environmentalExposure },
      ],
    },
    {
      id: 'apresentacao-clinica',
      label: 'Apresentação clínica',
      title: 'Apresentação clínica',
      blocks: [
        { title: 'Histórico / queixa', items: disease.clinicalPresentation.historyComplaints },
        { title: 'Sinais gerais', items: disease.clinicalPresentation.generalSigns },
        { title: 'Respiratórios', items: disease.clinicalPresentation.respiratorySigns },
        { title: 'Gastrointestinais', items: disease.clinicalPresentation.gastrointestinalSigns },
        { title: 'Neurológicos', items: disease.clinicalPresentation.neurologicSigns },
        { title: 'Oculares', items: disease.clinicalPresentation.ocularSigns },
        { title: 'Tegumentares', items: disease.clinicalPresentation.dermatologicSigns },
        { title: 'Urinários', items: disease.clinicalPresentation.urinarySigns },
        { title: 'Dentários', items: disease.clinicalPresentation.dentalSigns },
        { title: 'Hematológicos', items: disease.clinicalPresentation.hematologicSigns },
        { title: 'Diferenças por estágio', items: disease.clinicalPresentation.stageDifferences },
      ],
    },
    {
      id: 'achados-exame-fisico',
      label: 'Exame físico',
      title: 'Achados de exame físico',
      blocks: [
        { title: 'Gerais', items: disease.physicalExam.general },
        { title: 'Ocular', items: disease.physicalExam.ocular },
        { title: 'Respiratório', items: disease.physicalExam.respiratory },
        { title: 'Cardiovascular', items: disease.physicalExam.cardiovascular },
        { title: 'Gastrointestinal', items: disease.physicalExam.gastrointestinal },
        { title: 'Tegumentar', items: disease.physicalExam.dermatologic },
        { title: 'Neurológico', items: disease.physicalExam.neurologic },
        { title: 'Perfusão / hidratação', items: disease.physicalExam.perfusionHydration },
        { title: 'Outros achados', items: disease.physicalExam.otherFindings },
      ],
    },
    {
      id: 'diagnosticos-diferenciais',
      label: 'Diferenciais',
      title: 'Diagnósticos diferenciais',
      blocks: [
        { title: 'Gerais', items: disease.differentialDiagnoses.general },
        { title: 'Forma neurológica', items: disease.differentialDiagnoses.neurologicForm },
        { title: 'Forma respiratória', items: disease.differentialDiagnoses.respiratoryForm },
        { title: 'Forma gastrointestinal', items: disease.differentialDiagnoses.gastrointestinalForm },
        { title: 'Infecciosos', items: disease.differentialDiagnoses.infectious },
        { title: 'Inflamatórios', items: disease.differentialDiagnoses.inflammatory },
        { title: 'Tóxicos / metabólicos / estruturais', items: disease.differentialDiagnoses.toxicMetabolicStructural },
      ],
    },
    {
      id: 'exames-procedimentos',
      label: 'Exames',
      title: 'Exames | Procedimentos diagnósticos',
      blocks: [
        { title: 'Exames auxiliares', items: disease.diagnostics.auxiliaryTests },
        { title: 'Hematologia', items: disease.diagnostics.hematologyFindings },
        { title: 'Bioquímica', items: disease.diagnostics.biochemistryFindings },
        { title: 'Urinálise', items: disease.diagnostics.urinalysisFindings },
        { title: 'Líquor', items: disease.diagnostics.csfFindings },
        { title: 'Radiografia', items: disease.diagnostics.radiographicFindings },
        { title: 'Ultrassonografia', items: disease.diagnostics.ultrasoundFindings },
        { title: 'Citologia', items: disease.diagnostics.cytologyFindings },
        { title: 'Histopatologia', items: disease.diagnostics.histopathologyFindings },
        { title: 'Corpúsculos de inclusão', items: disease.diagnostics.inclusionBodies },
        { title: 'Sorologia', items: disease.diagnostics.serology },
        { title: 'Detecção de antígeno', items: disease.diagnostics.antigenDetection },
        { title: 'PCR', items: disease.diagnostics.pcr },
        { title: 'Amostras possíveis', items: disease.diagnostics.sampleOptions },
      ],
    },
    {
      id: 'abordagem-diagnostica',
      label: 'Abordagem diagnóstica',
      title: 'Abordagem diagnóstica',
      overview: disease.diagnosticApproach.overview,
      blocks: [
        { title: 'Quando suspeitar', items: disease.diagnosticApproach.clinicalSuspicion },
        { title: 'Testes de primeira linha', items: disease.diagnosticApproach.firstLineTests },
        { title: 'Mais sensíveis', items: disease.diagnosticApproach.mostSensitiveTests },
        { title: 'Mais específicos', items: disease.diagnosticApproach.mostSpecificTests },
        { title: 'Armadilhas', items: disease.diagnosticApproach.pitfalls },
        { title: 'Falso positivo', items: disease.diagnosticApproach.falsePositiveConsiderations },
        { title: 'Falso negativo', items: disease.diagnosticApproach.falseNegativeConsiderations },
      ],
    },
    {
      id: 'tratamento',
      label: 'Tratamento',
      title: 'Tratamento',
      overview: disease.treatment.overview,
      blocks: [
        { title: 'Terapia específica', items: disease.treatment.specificTherapy },
        { title: 'Suporte', items: disease.treatment.supportiveCare },
        { title: 'Fluidoterapia', items: disease.treatment.fluidTherapy },
        { title: 'Antibióticos', items: disease.treatment.antibiotics },
        { title: 'Antieméticos', items: disease.treatment.antiemetics },
        { title: 'Anticonvulsivantes', items: disease.treatment.anticonvulsants },
        { title: 'Suporte nutricional', items: disease.treatment.nutritionalSupport },
        { title: 'Oxigênio', items: disease.treatment.oxygenSupport },
        { title: 'Choque', items: disease.treatment.shockManagement },
        { title: 'Glicose', items: disease.treatment.glucoseManagement },
        { title: 'Suporte cardiovascular', items: disease.treatment.cardiovascularSupport },
        { title: 'Drogas vasoativas', items: disease.treatment.vasoactiveDrugs },
        { title: 'Checklist de monitoramento', items: disease.treatment.monitoringChecklist },
        { title: 'O que evitar', items: disease.treatment.avoidMistakes },
      ],
    },
    {
      id: 'prognostico',
      label: 'Prognóstico',
      title: 'Prognóstico',
      overview: disease.prognosis.overview,
      blocks: [
        { title: 'Fatores favoráveis', items: disease.prognosis.favorableFactors },
        { title: 'Fatores desfavoráveis', items: disease.prognosis.unfavorableFactors },
        { title: 'Mortalidade', items: disease.prognosis.mortalityInfo },
        { title: 'Sequelas', items: disease.prognosis.sequelae },
      ],
    },
    {
      id: 'complicacoes',
      label: 'Complicações',
      title: 'Complicações',
      blocks: [
        { title: 'Neurológicas', items: disease.complications.neurologic },
        { title: 'Respiratórias', items: disease.complications.respiratory },
        { title: 'Gastrointestinais', items: disease.complications.gastrointestinal },
        { title: 'Infecciosas secundárias', items: disease.complications.infectiousSecondary },
        { title: 'Hematológicas', items: disease.complications.hematologic },
        { title: 'Crônicas', items: disease.complications.chronic },
        { title: 'Raras', items: disease.complications.rare },
      ],
    },
    {
      id: 'prevencao',
      label: 'Prevenção',
      title: 'Prevenção',
      blocks: [
        { title: 'Vacinação', items: disease.prevention.vaccination },
        { title: 'Imunidade', items: disease.prevention.immunityInfo },
        { title: 'Protocolo vacinal', items: disease.prevention.vaccineProtocol },
        { title: 'Reforços', items: disease.prevention.revaccination },
        { title: 'Controle em abrigo/canil', items: disease.prevention.shelterControl },
        { title: 'Higiene ambiental', items: disease.prevention.environmentalHygiene },
      ],
    },
  ]
}
