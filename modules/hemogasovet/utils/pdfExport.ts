import { jsPDF } from 'jspdf';
import { SavedBloodGasRecord } from '../types';
import { formatFiO2Percent } from './fio2';
import { formatCompensationStatus, formatOxygenationStatus, formatPrimaryDisorder, formatQualityStatus } from './presentation';

function writeSection(doc: jsPDF, title: string, lines: string[], startY: number): number {
  let y = startY;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 20, y);
  y += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  for (const line of lines.filter(Boolean)) {
    const wrapped = doc.splitTextToSize(`- ${line}`, 170);
    doc.text(wrapped, 20, y);
    y += wrapped.length * 5 + 1;
  }

  return y + 3;
}

export function exportToPDF(record: SavedBloodGasRecord) {
  const doc = new jsPDF();
  const { result } = record;
  const { input } = result;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('HemoGasoVet - Laudo ClÃ­nico', 105, 20, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Paciente: ${record.patientName}`, 20, 34);
  if (record.tutorName) doc.text(`Tutor: ${record.tutorName}`, 20, 41);
  doc.text(`Data/Hora: ${new Date(record.date).toLocaleString('pt-BR')}`, 20, 48);
  doc.text(`EspÃ©cie: ${input.species === 'canine' ? 'Canino' : 'Felino'}`, 120, 34);
  doc.text(`Amostra: ${input.sampleType === 'arterial' ? 'Arterial' : 'Venosa'}`, 120, 41);
  doc.text(`FiO2: ${input.fio2 !== undefined ? formatFiO2Percent(input.fio2) : '--'}`, 120, 48);
  doc.text(`Temperatura: ${input.temperature !== undefined ? `${input.temperature} Â°C` : '--'}`, 120, 55);

  doc.setLineWidth(0.5);
  doc.line(20, 62, 190, 62);

  let y = 72;
  const params = [
    `pH: ${input.pH ?? '--'}`,
    `pCO2: ${input.pCO2 ?? '--'} mmHg`,
    `pO2: ${input.pO2 ?? '--'} mmHg`,
    `HCO3: ${input.HCO3 ?? '--'} mEq/L`,
    `BE: ${input.BE ?? '--'} mEq/L`,
    `Lactato: ${input.lactate ?? '--'} mmol/L`,
    `Na: ${input.Na ?? '--'} mEq/L`,
    `K: ${input.K ?? '--'} mEq/L`,
    `Cl: ${input.Cl ?? '--'} mEq/L`,
    `SatO2: ${input.sO2 ?? '--'} %`,
    `Albumina: ${input.albumin ?? '--'} g/dL`,
    `Glicose: ${input.glucose ?? '--'} mg/dL`,
  ];
  y = writeSection(doc, 'ParÃ¢metros Informados', params, y);

  y = writeSection(doc, 'Resumo Executivo', result.executiveSummary, y);
  y = writeSection(doc, 'Qualidade e Confiabilidade', [
    formatQualityStatus(result.dataQuality.status),
    ...result.dataQuality.messages,
    ...result.dataQuality.consistencyChecks.map((check) => `${check.message} SugestÃ£o: ${check.suggestion}`),
    result.temperatureContext.summary,
  ], y);

  y = writeSection(doc, 'EquilÃ­brio Ãcido-Base', [
    `DistÃºrbio principal: ${formatPrimaryDisorder(result.deepAcidBase.primaryDisorder)}`,
    `CompensaÃ§Ã£o: ${formatCompensationStatus(result.deepAcidBase.compensationStatus)}`,
    result.deepAcidBase.summary,
    result.deepAcidBase.expectedCompensation || '',
    result.deepAcidBase.observedCompensation || '',
    result.deepAcidBase.physiologicalExplanation,
  ], y);

  y = writeSection(doc, 'OxigenaÃ§Ã£o e VentilaÃ§Ã£o', [
    `Status: ${formatOxygenationStatus(result.deepOxygenation)}`,
    result.deepOxygenation.summary,
    result.deepOxygenation.fio2Context || '',
    result.deepOxygenation.limitationNote || '',
    result.deepOxygenation.physiologicalExplanation,
  ], y);

  y = writeSection(doc, 'EletrÃ³litos e MetabÃ³litos', [
    result.electrolyteSummary,
    ...result.deepElectrolytes.map((item) => `${item.parameter}: ${item.value} (${item.status}) - ${item.clinicalExplanation}`),
    result.anionGap?.explanation || '',
    result.baseExcess?.explanation || '',
  ], y);

  y = writeSection(doc, 'HipÃ³teses e Plano de AÃ§Ã£o', [
    ...result.clinicalHypotheses,
    ...result.clinicalActions.immediate,
    ...result.clinicalActions.serial,
    ...(result.clinicalActions.whenToRepeat || []),
    ...result.clinicalActions.correlativeExams,
  ], y);

  if (y > 265) y = 265;
  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.text('Gerado por VETIUS - HemoGasoVet', 105, 285, { align: 'center' });

  doc.save(`HemoGasoVet_${record.patientName}_${new Date(record.date).getTime()}.pdf`);
}
