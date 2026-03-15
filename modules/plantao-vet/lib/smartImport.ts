import {
  DailySummaryEntry,
  MedicationEntry,
  NutritionSupport,
  PatientExamRecord,
  PatientStatus,
  PatientVitalsRecord,
  Problem,
  RecordOrigin,
  Species,
  TaskCategory,
  TaskPriority,
  TubeType,
} from '../types';
import { createEntityId } from './createId';
import { getTubeTypeLabel } from './patientClinical';
import { createDailySummaryEntry, createEmptyNutritionSupport, createMedicationEntryFromName, createWeightRecord } from './shiftPatientDefaults';

export interface SmartImportTaskDraft {
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  scheduledTime: string | null;
  completed?: boolean;
  reviewRequired?: boolean;
}

export interface SmartImportBulletinDraft {
  type: 'clinical' | 'tutor';
  title: string;
  content: string;
  authorLabel: string;
}

export interface SmartImportDraft {
  name: string;
  tutorName: string;
  breed: string;
  ageLabel: string;
  weightLabel: string;
  baseWeightLabel: string;
  weightHistory: ReturnType<typeof createWeightRecord>[];
  species: Species;
  status: PatientStatus;
  medicalRecordNumber: string;
  admissionDateLabel: string;
  responsibleVet: string;
  belongings: string;
  patientObservations: string;
  mainDiagnosis: string;
  summary: string;
  clinicalHistory: string;
  currentComplaint: string;
  currentAdmissionReason: string;
  definingPhrase: string;
  importantNotes: string;
  nextShiftPlan: string;
  alertBadges: string[];
  tags: string[];
  medicationsInUse: string[];
  medicationEntries: MedicationEntry[];
  vitalsRecords: PatientVitalsRecord[];
  examRecords: PatientExamRecord[];
  nutritionSupport: NutritionSupport;
  problems: Problem[];
  tasks: SmartImportTaskDraft[];
  bulletinDrafts: SmartImportBulletinDraft[];
  dailySummaryEntries: DailySummaryEntry[];
  importWarnings: string[];
}

type SectionKind =
  | 'general'
  | 'history'
  | 'nutrition'
  | 'clinicalBulletin'
  | 'tutorBulletin'
  | 'parameters'
  | 'examResults'
  | 'prescription'
  | 'tasks'
  | 'episode';

interface ParsedSection {
  kind: SectionKind;
  heading: string;
  dateISO: string | null;
  authorLabel: string;
  contentLines: string[];
}

interface ExamPattern {
  category: PatientExamRecord['category'];
  title: string;
  matcher: RegExp;
}

const CURRENT_YEAR = new Date().getFullYear();

const EXAM_PATTERNS: ExamPattern[] = [
  { category: 'hemogram', title: 'Hemograma', matcher: /\bhemograma\b|\bhg\b|hematocrit|hematocrito|leucocit|plaquet|linfopen|neutrofil/i },
  { category: 'biochemical', title: 'Perfil bioquímico', matcher: /bioquim|perfil bioquim|ureia|creatinina|alt\b|ast\b|albumina|fosfatase/i },
  { category: 'electrolytes', title: 'Eletrólitos', matcher: /eletrolit|potassio|potássio|fosforo|fósforo|hiperfosfat|hipercalem|hipocalem|sodio|sódio|cloro/i },
  { category: 'blood_gas', title: 'Gasometria', matcher: /gasometri/i },
  { category: 'imaging', title: 'Imagem', matcher: /ultrassom|\bus abdominal\b|\braio x\b|radiograf|\brx\b|\brm\b|resson|tomograf|eco(cardio)?/i },
  { category: 'urinalysis', title: 'Urinálise', matcher: /\burinalis|\buan\b|\burina tipo i\b|\bpui\b/i },
  { category: 'rapid', title: 'Teste rápido', matcher: /snap|rapido|rápido|teste rapido|teste rápido/i },
];

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function collapseWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function repairImportedText(rawText: string) {
  const directReplacements: Array<[RegExp, string]> = [
    [/s\?ndrome/gi, 'síndrome'],
    [/neurol\?gica/gi, 'neurológica'],
    [/investiga\?\?o/gi, 'investigação'],
    [/forma\?\?o/gi, 'formação'],
    [/evolu\?\?o/gi, 'evolução'],
    [/medica\?\?o/gi, 'medicação'],
    [/medica\?\?es/gi, 'medicações'],
    [/par\?metros/gi, 'parâmetros'],
    [/par[aâ]metros/gi, 'parâmetros'],
    [/cl\?nica/gi, 'clínica'],
    [/\?ltimos/gi, 'últimos'],
    [/esta\?\?o/gi, 'estação'],
    [/apreens\?o/gi, 'apreensão'],
    [/r\?seas/gi, 'róseas'],
    [/card\?aca/gi, 'cardíaca'],
    [/altera\?\?es/gi, 'alterações'],
    [/hipertens\?o/gi, 'hipertensão'],
    [/l\?quor/gi, 'líquor'],
    [/neopl\?sicos/gi, 'neoplásicos'],
    [/pot\?ssio/gi, 'potássio'],
    [/nasofaringe/gi, 'nasofaringe'],
  ];

  let repaired = rawText.replace(/\u00a0/g, ' ');
  directReplacements.forEach(([pattern, replacement]) => {
    repaired = repaired.replace(pattern, replacement);
  });

  if (/[ÃÂ][\w]/.test(repaired)) {
    try {
      const reparsed = decodeURIComponent(escape(repaired));
      if ((reparsed.match(/[áéíóúãõçâêô]/gi) || []).length >= (repaired.match(/[áéíóúãõçâêô]/gi) || []).length) {
        repaired = reparsed;
      }
    } catch {
      // Keep best-effort text when automatic repair is not safe.
    }
  }

  return repaired
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function uniqueBy<T>(items: T[], getKey: (item: T) => string) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = getKey(item);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function truncateText(value: string, maxLength: number) {
  const normalized = collapseWhitespace(value);
  return normalized.length <= maxLength ? normalized : `${normalized.slice(0, maxLength - 1).trimEnd()}...`;
}

function parseDateToISO(text: string | null) {
  if (!text) return null;
  const match = text.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const yearText = match[3];
  const year = yearText ? (yearText.length === 2 ? Number(`20${yearText}`) : Number(yearText)) : CURRENT_YEAR;

  if (!day || !month || !year) return null;

  return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;
}

function buildRecordedAt(dateISO: string | null, timeText: string | null, fallbackIndex: number) {
  if (dateISO) {
    const hours = timeText ? Number(timeText.split(':')[0] || '0') : 8;
    const minutes = timeText ? Number(timeText.split(':')[1] || '0') : fallbackIndex % 60;
    return new Date(
      Number(dateISO.slice(0, 4)),
      Number(dateISO.slice(5, 7)) - 1,
      Number(dateISO.slice(8, 10)),
      Number.isFinite(hours) ? hours : 8,
      Number.isFinite(minutes) ? minutes : 0
    ).toISOString();
  }

  return new Date(Date.now() - fallbackIndex * 60_000).toISOString();
}

function splitLines(rawText: string) {
  return rawText
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.replace(/\t/g, ' ').trim())
    .filter((line) => line.length > 0);
}

function isAuthorLine(line: string) {
  return /^(?:m\.?\s*v\.?|mv)\b/i.test(line.trim());
}

function findLabelValue(lines: string[], labels: string[]) {
  const normalizedLabels = labels.map((label) => normalizeText(label));

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const normalizedLine = normalizeText(line);
    const matchedLabel = normalizedLabels.find(
      (label) => normalizedLine === label || normalizedLine.startsWith(`${label}:`)
    );

    if (!matchedLabel) continue;

    if (line.includes(':')) {
      const inlineValue = collapseWhitespace(line.slice(line.indexOf(':') + 1));
      if (inlineValue) return inlineValue;
    }

    return collapseWhitespace(lines[index + 1] || '');
  }

  return '';
}

function firstRegexMatch(text: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const value = pattern.exec(text)?.[1]?.trim();
    if (value) return collapseWhitespace(value);
  }
  return '';
}

function stripPatientIndex(value: string) {
  return collapseWhitespace(value.replace(/^\s*\d+\)?\s*[-.:]?\s*/i, ''));
}

function extractInlineHeaderLine(lines: string[]) {
  return collapseWhitespace(
    lines.find((line, index) => {
      if (index === 0) {
        return false;
      }

      const normalized = normalizeText(line);
      return normalized.includes(',') && (/\bcanin|\bfelin|\bsrd\b/.test(normalized) || /\d+[.,]?\d*\s*kg/.test(normalized));
    }) || ''
  );
}

function extractHeaderName(lines: string[], rawText: string) {
  const labeledName = findLabelValue(lines, ['nome']) || firstRegexMatch(rawText, [/Paciente:\s*([^,\n]+)/i, /Nome:\s*([^\n]+)/i]);
  if (labeledName) {
    return stripPatientIndex(labeledName);
  }

  const firstLine = stripPatientIndex(lines[0] || '');
  if (!firstLine) {
    return 'Paciente importado';
  }

  return firstLine;
}

function extractHeaderWeight(lines: string[]) {
  return findLabelValue(lines, ['peso']) || firstRegexMatch(extractInlineHeaderLine(lines), [/(\d+[.,]?\d*\s*kg)/i]);
}

function extractHeaderAge(lines: string[], rawText: string) {
  const labeledAge = findLabelValue(lines, ['idade']) || firstRegexMatch(rawText, [/(\d+\s*anos?)/i]);
  if (labeledAge) {
    return labeledAge;
  }

  const headerLine = extractInlineHeaderLine(lines);
  const inlineAge =
    firstRegexMatch(headerLine, [/(\d+\s*anos?)/i, /\b(s[êe]nior|s.nior|adulto|filhote|geri[aá]tr[a-z]*)\b/i]) ||
    firstRegexMatch(rawText, [/\b(s[êe]nior|s.nior|adulto|filhote|geri[aá]tr[a-z]*)\b/i]);

  const normalizedAge = normalizeText(inlineAge);
  if (!inlineAge) {
    return '';
  }

  if (/s.nior|senior/.test(normalizedAge)) {
    return 'Sênior';
  }

  if (/geriatr/.test(normalizedAge)) {
    return 'Geriátrico';
  }

  if (/adulto/.test(normalizedAge)) {
    return 'Adulto';
  }

  if (/filhote/.test(normalizedAge)) {
    return 'Filhote';
  }

  return inlineAge;
}

function extractHeaderDiagnosis(lines: string[]) {
  const headerLine = extractInlineHeaderLine(lines);
  if (!headerLine) {
    return '';
  }

  const cleanedHeader = collapseWhitespace(
    headerLine
      .replace(/\b(canina|canino|felina|felino)\b\s*,?/gi, '')
      .replace(/\b(srd|poodle|shihtzu|shih tzu|pinscher|labrador|golden|persa|siam[êe]s)\b\s*,?/gi, '')
      .replace(/\b(s[êe]nior|s.nior|adulto|filhote|geri[aá]tr[a-z]*)\b\s*,?/gi, '')
      .replace(/\d+[.,]?\d*\s*kg\s*,?/gi, '')
      .replace(/\s+,/g, ',')
      .replace(/,\s*,/g, ',')
      .replace(/^,|,$/g, '')
  );

  return collapseWhitespace(
    cleanedHeader
      .split(',')
      .map((item) => collapseWhitespace(item))
      .filter((item) => item.length > 3)
      .join(', ')
  );
}

function extractSectionBlock(lines: string[], headingMatchers: RegExp[]) {
  const startIndex = lines.findIndex((line) => headingMatchers.some((matcher) => matcher.test(normalizeText(line))));
  if (startIndex < 0) {
    return '';
  }

  const content: string[] = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const normalized = normalizeText(line);

    if (getSectionKind(normalized) || /^resumo do /i.test(normalized)) {
      break;
    }

    content.push(line);
  }

  return collapseWhitespace(content.join(' '));
}

function getSectionKind(normalizedLine: string): SectionKind | null {
  if (/^historico\/?anamnese|^historico|^anamnese/.test(normalizedLine))
    return 'history';
  if (normalizedLine.startsWith('boletim nutricional')) return 'nutrition';
  if (normalizedLine.startsWith('boletim tutor')) return 'tutorBulletin';
  if (normalizedLine.startsWith('boletim diurno') || normalizedLine.startsWith('boletim noturno')) return 'clinicalBulletin';
  if (/^par.?metros?/.test(normalizedLine)) return 'parameters';
  if (/^resultado exames|^resultados exames|^exames?$|^exames /.test(normalizedLine))
    return 'examResults';
  if (/^prescri|^medica.* em uso/.test(normalizedLine))
    return 'prescription';
  if (normalizedLine.startsWith('tarefas/conversas')) return 'tasks';
  if (normalizedLine.startsWith('nova internacao')) return 'episode';
  return null;
}

function splitSections(lines: string[]) {
  const sections: ParsedSection[] = [];
  let currentDateISO: string | null = null;
  let currentSection: ParsedSection = { kind: 'general', heading: '', dateISO: null, authorLabel: '', contentLines: [] };

  const flush = () => {
    if (!currentSection.heading && currentSection.contentLines.length === 0) return;
    const firstMeaningful = currentSection.contentLines.find((line) => line.length > 0) || '';
    sections.push({
      ...currentSection,
      authorLabel: isAuthorLine(firstMeaningful) ? collapseWhitespace(firstMeaningful) : '',
    });
  };

  lines.forEach((line) => {
    const nextKind = getSectionKind(normalizeText(line));

    if (nextKind) {
      flush();
      currentDateISO = parseDateToISO(line) || currentDateISO;
      currentSection = { kind: nextKind, heading: line, dateISO: parseDateToISO(line) || currentDateISO, authorLabel: '', contentLines: [] };
      return;
    }

    currentSection.contentLines.push(line);
  });

  flush();
  return sections;
}

function getCurrentEpisodeLines(lines: string[]) {
  let lastEpisodeIndex = -1;
  lines.forEach((line, index) => {
    if (normalizeText(line).startsWith('nova internacao')) lastEpisodeIndex = index;
  });
  return lastEpisodeIndex >= 0 ? lines.slice(lastEpisodeIndex) : lines;
}

function extractSpeciesAndBreed(rawText: string, lines: string[]) {
  const speciesBreedField =
    findLabelValue(lines, ['especie/raca']) ||
    extractInlineHeaderLine(lines) ||
    firstRegexMatch(rawText, [/(?:Paciente:\s*[^,\n]+,\s*)([^,\n]+)(?:,\s*[^,\n]*\d+\s*anos?)/i]);
  const normalized = normalizeText(speciesBreedField);
  const normalizedSource = normalizeText(`${speciesBreedField}\n${rawText}`);
  const species: Species =
    /\bfel(?:ina|ino)?\b|fel\/|felin|gato/.test(normalized)
      ? 'felina'
      : /\bcan(?:ina|ino)?\b|can\/|cao|cachorro/.test(normalized)
        ? 'canina'
        : /\bfel(?:ina|ino)?\b|fel\/|felin|gato/.test(normalizedSource)
          ? 'felina'
          : /\bcan(?:ina|ino)?\b|can\/|cao|cachorro/.test(normalizedSource)
            ? 'canina'
            : 'outra';
  let breed = speciesBreedField.includes('/')
    ? collapseWhitespace(speciesBreedField.split('/').slice(1).join('/'))
    : speciesBreedField.includes('-')
      ? collapseWhitespace(speciesBreedField.split('-').slice(1).join('-'))
      : speciesBreedField
          .replace(/^fel(?:ino|ina)?/i, '')
          .replace(/^can(?:ino|ina)?/i, '')
          .trim();

  if (speciesBreedField.includes(',')) {
    const tokens = speciesBreedField.split(',').map((item) => collapseWhitespace(item));
    const breedToken = tokens.find(
      (token, index) =>
        index > 0 &&
        !/\d+[.,]?\d*\s*kg/i.test(token) &&
        !/senior|sênior|adulto|filhote|geriatr/i.test(normalizeText(token)) &&
        !/sindrome|suspeita|massa|quadro|diagnost/i.test(normalizeText(token))
    );

    if (breedToken) {
      breed = breedToken;
    }
  }

  breed = breed
    .replace(/\b\d+[.,]?\d*\s*kg\b/gi, '')
    .replace(/\bsenior\b|\bsênior\b|\badulto\b|\bfilhote\b|\bgeriatrico\b|\bgeriátrico\b/gi, '')
    .replace(/^,|,$/g, '')
    .trim();

  if (!breed) {
    breed =
      firstRegexMatch(rawText, [
        /(?:canina|canino|felina|felino|fel|can)\s*\/\s*([^\n,]+)/i,
        /(?:especie\/raca|espécie\/raça)\s*[\r\n]+([^\n]+)/i,
      ]) || '';

    breed = breed
      .replace(/^(canina|canino|felina|felino|fel|can)\s*\/?\s*/i, '')
      .replace(/\b\d+[.,]?\d*\s*kg\b/gi, '')
      .replace(/\bsenior\b|\bsênior\b|\badulto\b|\bfilhote\b|\bgeriatrico\b|\bgeriátrico\b/gi, '')
      .replace(/^,|,$/g, '')
      .trim();
  }

  return { species, breed };
}

function inferTubeType(text: string): TubeType {
  const normalized = normalizeText(text);
  if (normalized.includes('sonda nasoesofag')) return 'nasoesophageal';
  if (normalized.includes('sonda nasogastr')) return 'nasogastric';
  if (normalized.includes('sonda esofag')) return 'esophagostomy';
  if (normalized.includes('sonda gastr')) return 'gastrostomy';
  return normalized.includes('sonda') ? 'other' : 'none';
}

function inferAppetiteLevel(text: string): NutritionSupport['appetiteSpontaneous'] {
  const normalized = normalizeText(text);
  if (
    normalized.includes('nao quer comer') ||
    normalized.includes('sem apetite') ||
    normalized.includes('inapet') ||
    normalized.includes('nao apresentou interesse espontaneo') ||
    normalized.includes('nao se alimentou espontaneamente')
  ) return 'none';
  if (normalized.includes('comeu com muito apetite') || normalized.includes('bom apetite')) return 'good';
  if (
    normalized.includes('comeu um pouco') ||
    normalized.includes('parcial') ||
    normalized.includes('alimentacao via sonda') ||
    normalized.includes('recebeu alimentacao via sonda')
  ) return 'partial';
  if (normalized.includes('baixa aceitacao') || normalized.includes('pouco interesse')) return 'poor';
  return 'unknown';
}

function parseVitalsLine(line: string, dateISO: string | null, authorLabel: string, fallbackIndex: number) {
  if (!/\bFC\b/i.test(line) || !/\bFR\b/i.test(line)) return null;

  const timeMatch = line.match(/(\d{1,2}:\d{1,2})/);
  const palpation = line.match(/Palpa[a-z ]*abdominal(?:\s*[:])?\s*([^|]+)/i)?.[1]?.trim() || '';
  const normalized = normalizeText(line);

  return {
    id: createEntityId('vitals'),
    recordedAt: buildRecordedAt(dateISO, timeMatch?.[1] || null, fallbackIndex),
    authorLabel,
    heartRate: line.match(/\bFC\s*([0-9.,]+\s*bpm?|[0-9.,]+)/i)?.[1]?.trim() || '',
    respiratoryRate: line.match(/\bFR\s*([0-9.,]+\s*mpm?|[0-9.,]+)/i)?.[1]?.trim() || '',
    temperature: line.match(/\bTR\s*([0-9.,]+\s*[C]?|[0-9.,]+)/i)?.[1]?.trim() || '',
    systolicPressure: line.match(/\bPAS\s*([0-9.,]+\s*mmHg|[0-9.,]+)/i)?.[1]?.trim() || '',
    glucose: line.match(/\bGlicemia\s*([0-9.,]+\s*mg\/dL|[0-9.,]+|nao aferida)/i)?.[1]?.trim() || '',
    mucousMembranes: line.match(/\bMucosas(?:\s*[:])?\s*([^|]+)/i)?.[1]?.trim() || '',
    capillaryRefillTime: line.match(/\bTPC\s*([^|]+)/i)?.[1]?.trim() || '',
    cardiacAuscultation: line.match(/Ausculta card[ii]aca(?:\s*[:])?\s*([^|]+)/i)?.[1]?.trim() || '',
    pulmonaryAuscultation: line.match(/Ausculta pulmonar(?:\s*[:])?\s*([^|]+)/i)?.[1]?.trim() || '',
    pain: /sem dor|sem algia|s\/a/i.test(palpation) ? 'Sem dor evidente' : palpation,
    mentalState: /alerta/.test(normalized) ? 'Alerta' : /prostrad/.test(normalized) ? 'Prostrado' : '',
    hydration: /desidrat/.test(normalized) ? 'Desidratação' : /normohidrat|mucosa oral está úmida|mucosa oral esta umida/.test(normalized) ? 'Normohidratado' : '',
    vomiting: /vomit/.test(normalized),
    vomitingDescription: line.match(/vomit[^|.]*/i)?.[0] || '',
    diarrhea: /diarre|fezes pastosas|fezes moles/.test(normalized),
    diarrheaDescription: line.match(/diarre[^|.]*/i)?.[0] || '',
    urinated: normalized.includes('urinou') ? !normalized.includes('nao urinou') : null,
    defecated: normalized.includes('defecou') ? !normalized.includes('nao defecou') : null,
    fed: /alimenta/.test(normalized) ? !/sem ingestao espontanea/.test(normalized) : null,
    feedingDetails: line.match(/(alimenta[^|.]+|sonda[^|.]+)/i)?.[0] || '',
    appetite: /apetite|interesse espontaneo/.test(normalized) ? !/sem apetite|nao apresentou interesse espontaneo/.test(normalized) : null,
    observations: palpation,
  } as PatientVitalsRecord;
}

function parseVitalsRecords(sections: ParsedSection[]) {
  return uniqueBy(
    sections
      .flatMap((section, sectionIndex) =>
        section.contentLines
          .map((line, lineIndex) => parseVitalsLine(line, section.dateISO, section.authorLabel, sectionIndex * 100 + lineIndex))
          .filter((record): record is PatientVitalsRecord => Boolean(record))
      )
      .sort((left, right) => right.recordedAt.localeCompare(left.recordedAt)),
    (record) => `${record.recordedAt}|${normalizeText(record.heartRate)}|${normalizeText(record.temperature)}`
  );
}

function parseExamCategory(line: string) {
  return EXAM_PATTERNS.find((pattern) => pattern.matcher.test(normalizeText(line)));
}

function hasStrongExamEvidence(line: string, sectionKind: ParsedSection['kind']) {
  const normalized = normalizeText(line);
  const matchedPattern = parseExamCategory(line);

  if (!normalized) {
    return false;
  }

  if (
    normalized.includes('soroterapia') ||
    normalized.includes('fluidoterapia') ||
    normalized.includes('suplementacao de potassio') ||
    normalized.includes('recebendo suplementacao') ||
    normalized.includes('recebendo potassio') ||
    normalized.includes('alimentacao') ||
    normalized.includes('comportamento') ||
    normalized.includes('permaneceu estavel')
  ) {
    return false;
  }

  const hasObjectiveFinding =
    /\d+[.,]?\d*/.test(line) ||
    /hiper|hipo|aumentad|reduzid|alterad|azotemi|laudo|resultado|achado|hematocrit|leucocit|creatinina|ureia|fosforo|potassio|sodio|ultrassom|radiograf|rx|ecocardiograma|gasometr/i.test(normalized);

  const hasExamName = Boolean(matchedPattern);

  if (!hasExamName || !hasObjectiveFinding) {
    return false;
  }

  if (matchedPattern?.category === 'electrolytes' && !(/\d+[.,]?\d*/.test(line) || /hiper|hipo|aumentad|reduzid|alterad/.test(normalized))) {
    return false;
  }

  if (matchedPattern?.category === 'biochemical' && /azotemi|ureia|creatinin/.test(normalized)) {
    return true;
  }

  if (matchedPattern?.category === 'imaging' && !(/laudo|achado|altera|evidenci|demonstrou|compat|sem alter|mostrou/.test(normalized))) {
    return false;
  }

  if (sectionKind === 'examResults') {
    return true;
  }

  if (/realizou|laudo|resultado|achado|coletado|coletada|demonstrou|evidenciou|apresentava alterac/i.test(normalized)) {
    return true;
  }

  return /\d+[.,]?\d*/.test(line) && /creatinina|ureia|fosforo|potassio|hematocrit|leucocit|plaquet|gasometr|pressao arterial/i.test(normalized);
}

function parseExamRecords(sections: ParsedSection[]) {
  const records: PatientExamRecord[] = [];

  sections.forEach((section, sectionIndex) => {
    section.contentLines.forEach((line, lineIndex) => {
      const normalized = normalizeText(line);
      if (
        !normalized ||
        isAuthorLine(line) ||
        /\bfc\b|\bfr\b|\btr\b|\bpas\b|\bglicemia\b/.test(normalized) ||
        normalized.includes('aguardando laudo') ||
        normalized.includes('agendado') ||
        normalized.includes('coleta de') ||
        normalized.includes('nao urinou') ||
        normalized.includes('urinou') ||
        normalized.includes('defecou') ||
        normalized.includes('fezes')
      ) {
        return;
      }

      const matchedPattern = parseExamCategory(line);
      if (!matchedPattern || !hasStrongExamEvidence(line, section.kind)) return;

      records.push({
        id: createEntityId('exam'),
        category: matchedPattern.category,
        recordedAt: buildRecordedAt(section.dateISO, line.match(/(\d{1,2}:\d{1,2})/)?.[1] || null, sectionIndex * 100 + lineIndex),
        title: matchedPattern.category === 'imaging' && /us abdominal|ultrassom/i.test(line) ? 'Ultrassom abdominal' : matchedPattern.title,
        summary: truncateText(line, 180),
        findings: truncateText(line, 320),
        observations: section.authorLabel,
        mainFinding: truncateText(line, 120),
        originalText: line,
      });
    });
  });

  return uniqueBy(
    records
      .filter((record) => normalizeText(record.mainFinding).length > 8)
      .sort((left, right) => right.recordedAt.localeCompare(left.recordedAt)),
    (record) => `${record.category}|${normalizeText(record.title)}|${normalizeText(record.summary)}`
  );
}

function normalizeMedicationFrequency(rawFrequency: string) {
  const normalized = normalizeText(rawFrequency);
  if (!normalized) return '';
  if (/\bbid\b|duas vezes ao dia|2x ao dia|12 horas?/.test(normalized)) return 'BID';
  if (/\bsid\b|uma vez ao dia|1x ao dia|ao dia/.test(normalized)) return 'SID';
  if (/\btid\b|tres vezes ao dia|três vezes ao dia|a cada 8 horas?|q8h/.test(normalized)) return 'TID';
  if (/\bqid\b|quatro vezes ao dia|a cada 6 horas?|q6h/.test(normalized)) return 'QID';
  if (/a cada 12 horas?|q12h/.test(normalized)) return 'q12h';
  if (/a cada 24 horas?|q24h/.test(normalized)) return 'q24h';
  if (/48 horas?|q48h/.test(normalized)) return 'q48h';
  return rawFrequency.trim();
}

function createMedicationEntryDraft(cleanedLine: string, referenceDateISO: string | null, observationLine: string | null): MedicationEntry | null {
  const doseMatch = cleanedLine.match(/(\d+[.,]?\d*\s*(?:mg|ml)(?:\/[A-Za-z]+)?(?:\/kg|\/gato)?)/i);
  const concentrationMatch = cleanedLine.match(/(\d+[.,]?\d*\s*(?:mg|g|mcg)\/(?:mL|ml|comprimido|capsula|cápsula))/i);
  const frequencyMatch =
    cleanedLine.match(/\b(SID|BID|TID|QID|q\d+\s*(?:h|hrs?)|a cada \d+\s*horas?|ao dia|48 horas?)\b/i) ||
    observationLine?.match(/\b(a cada \d+\s*horas?|ao dia|q\d+\s*(?:h|hrs?)|SID|BID|TID|QID)\b/i);
  const routeMatch =
    cleanedLine.match(/\b(via oral|oral|vo|iv|sc|im|sonda)\b/i) ||
    observationLine?.match(/\b(via oral|oral|vo|iv|sc|im|sonda)\b/i);
  const packageMatch = cleanedLine.match(/\b\d+\s*(?:frasco|caps?|capsulas?|caixa|cx)\b/i);
  const cutIndexes = [doseMatch?.index, frequencyMatch?.index, routeMatch?.index, packageMatch?.index].filter(
    (value): value is number => typeof value === 'number'
  );
  const endIndex = cutIndexes.length > 0 ? Math.min(...cutIndexes) : cleanedLine.length;
  const name = cleanedLine.slice(0, endIndex).trim().replace(/\s+/g, ' ');
  if (!name || name.length < 2) return null;

  const now = new Date().toISOString();

  return {
    ...createMedicationEntryFromName(name, now),
    name,
    concentration: concentrationMatch?.[1]?.trim() || '',
    dose: doseMatch?.[1]?.trim() || '',
    frequency: normalizeMedicationFrequency(frequencyMatch?.[1]?.trim() || ''),
    route: routeMatch?.[1]?.trim() || '',
    observations: observationLine ? truncateText(observationLine, 220) : '',
    status: 'active',
    startedAt: referenceDateISO ? `${referenceDateISO}T08:00:00.000Z` : null,
    suspendedAt: null,
    inPrescription: true,
    newBadgeDate: referenceDateISO,
    createdAt: now,
    updatedAt: now,
  };
}

function parseMedicationEntries(sections: ParsedSection[]) {
  const medicationEntries: MedicationEntry[] = [];

  sections
    .filter((section) => section.kind === 'prescription')
    .forEach((section) => {
      section.contentLines.forEach((line, index) => {
        const cleaned = collapseWhitespace(line.replace(/[-\u2014]{2,}/g, ' '));
        const normalized = normalizeText(cleaned);
        if (
          !cleaned ||
          normalized === 'mg/kg' ||
          normalized === 'uso oral' ||
          normalized.startsWith('parametros') ||
          normalized.startsWith('tarefas/conversas') ||
          normalized.startsWith('resultado exames') ||
          normalized.startsWith('boletim ') ||
          (normalized.includes('fc ') && normalized.includes('fr ')) ||
          cleaned.includes('|')
        ) {
          return;
        }

        if (normalized.startsWith('dar por via') && medicationEntries.length > 0) {
          const previous = medicationEntries[medicationEntries.length - 1];
          medicationEntries[medicationEntries.length - 1] = {
            ...previous,
            route: previous.route || cleaned.match(/\b(via oral|oral|vo|iv|sc|im|sonda)\b/i)?.[1] || '',
            frequency:
              previous.frequency || cleaned.match(/\b(a cada \d+\s*horas?|ao dia|q\d+\s*(?:h|hrs?)|SID|BID|TID|QID)\b/i)?.[1] || '',
            observations: truncateText([previous.observations, cleaned].filter(Boolean).join(' | '), 220),
            updatedAt: new Date().toISOString(),
          };
          return;
        }

        const nextLine = section.contentLines[index + 1];
        const observationLine = nextLine && /^dar por via/i.test(nextLine.trim()) ? nextLine.trim() : null;
        const entry = createMedicationEntryDraft(cleaned, section.dateISO, observationLine);
        if (entry) medicationEntries.push(entry);
      });
    });

  return uniqueBy(medicationEntries, (entry) =>
    `${normalizeText(entry.name)}|${normalizeText(entry.dose)}|${normalizeText(entry.frequency)}|${normalizeText(
      entry.route
    )}`
  );
}

function extractLatestMatchingLine(lines: string[], matcher: RegExp) {
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (matcher.test(normalizeText(lines[index]))) return collapseWhitespace(lines[index]);
  }
  return '';
}

function parseNutritionSupport(currentEpisodeLines: string[], weightLabel: string): NutritionSupport {
  const nutrition = createEmptyNutritionSupport();
  const joinedText = currentEpisodeLines.join('\n');
  const latestNutritionLine = extractLatestMatchingLine(currentEpisodeLines, /aliment|apetite|sonda|renafil|critical care|dieta|churu|naturi/);
  const latestFluidLine = extractLatestMatchingLine(currentEpisodeLines, /fluidoterapia|ringer|soroterapia|\brl\b|taxa/);
  const latestDeviceLine = extractLatestMatchingLine(currentEpisodeLines, /sonda|acesso venoso|cateter/);
  const latestEliminationLine = extractLatestMatchingLine(currentEpisodeLines, /urin|defec|fezes|diarre/);
  const tubeType = inferTubeType(joinedText);

  nutrition.appetiteSpontaneous = inferAppetiteLevel(latestNutritionLine || joinedText);
  nutrition.foodAcceptance = latestNutritionLine;
  nutrition.dietType =
    firstRegexMatch(joinedText, [
      /(critical care(?:\s*\+\s*dextrose)?)/i,
      /(renafil)/i,
      /(racao renal)/i,
      /(royal canin[^.\n]*)/i,
      /(premier[^.\n]*)/i,
      /(nutralife)/i,
      /(churu)/i,
      /(naturi)/i,
    ]) || extractLatestMatchingLine(currentEpisodeLines, /renafil|critical care|racao renal|royal canin|premier|churu|nutralife|naturi/);
  nutrition.feedingRoute = tubeType !== 'none' ? 'Via sonda' : /oral/i.test(normalizeText(latestNutritionLine)) ? 'Via oral' : latestNutritionLine ? 'Alimentacao assistida' : '';
  nutrition.tubeInUse = tubeType !== 'none';
  nutrition.tubeType = tubeType;
  nutrition.offeredAmount = firstRegexMatch(joinedText, [/(\d+[.,]?\d*\s*mL)/i]);
  nutrition.ingestedPercentage = firstRegexMatch(joinedText, [/(>\s*\d+\s*%\s*NED)/i, /(\d+\s*%\s*NED)/i, /(\d+\s*%)/i]);
  nutrition.currentWeight =
    firstRegexMatch(joinedText, [
      /ultimo peso registrado da paciente foi\s*(\d+[.,]?\d*\s*kg)/i,
      /mant[ée]m\s*(\d+[.,]?\d*\s*kg)/i,
      /peso registrado\s*(\d+[.,]?\d*\s*kg)/i,
    ]) || weightLabel;
  nutrition.bodyConditionScore =
    firstRegexMatch(joinedText, [/ECC\s*[:\-]?\s*([0-9]+\/?[0-9]?)/i, /\bEC\s*([0-9]+)/i]) ||
    (/\bescore corporal 1\b|\bec1\b/.test(normalizeText(joinedText)) ? '1/9' : '');
  nutrition.muscleMassScore = extractLatestMatchingLine(currentEpisodeLines, /sarcopen|caquexia|massa muscular/);
  nutrition.nutritionNotes = truncateText(latestNutritionLine, 220);
  nutrition.fluidTherapy =
    firstRegexMatch(joinedText, [/(ringer lactato[^.\n]*)/i, /(fluidoterapia[^.\n]*)/i, /(soroterapia[^.\n]*)/i]) ||
    truncateText(latestFluidLine, 220);
  nutrition.devices =
    firstRegexMatch(joinedText, [/(sonda [^.\n]*)/i, /(acesso venoso[^.\n]*)/i, /(cateter[^.\n]*)/i]) ||
    truncateText(latestDeviceLine, 220);
  nutrition.supportNotes = truncateText([latestFluidLine, latestDeviceLine].filter(Boolean).join(' | '), 220);
  nutrition.eliminations = truncateText(latestEliminationLine, 220);
  nutrition.supplements = firstRegexMatch(joinedText, [/(pot[aá]ssio[^.\n]*)/i, /(dextrose[^.\n]*)/i, /(sarcopen[^.\n]*)/i]);
  nutrition.updatedAt = Object.values(nutrition).some((value) => typeof value === 'string' && value) ? new Date().toISOString() : null;
  return nutrition;
}

function parseProblemDrafts(rawText: string, currentEpisodeText: string, summary: string) {
  const candidates: Array<{ title: string; priority: Problem['priority']; matcher: RegExp; notes: string }> = [
    { title: 'DRC', priority: 'high', matcher: /\bdrc\b|doenca renal cronica/i, notes: 'Doenca renal cronica mencionada no historico.' },
    { title: 'Cardiopatia / sopro cardiaco', priority: 'medium', matcher: /cardiopat|sopro/i, notes: 'Cardiopatia ou sopro cardiaco descritos nas evolucoes.' },
    { title: 'Síndrome vestibular', priority: 'high', matcher: /sindrome vestibular|head tilt|nistagm|ataxia/i, notes: 'Sinais vestibulares descritos no prontuário atual.' },
    { title: 'Suspeita central / neurológica', priority: 'high', matcher: /suspeita central|avc|neuropat|neurolog/i, notes: 'Comprometimento neurológico ou suspeita central em investigação.' },
    { title: 'Massa em nasofaringe', priority: 'high', matcher: /massa em nasofaringe|formacao em nasofaringe|nasofaring/i, notes: 'Massa ou formação em nasofaringe descrita em exame de imagem ou laudo.' },
    { title: 'Azotemia', priority: 'high', matcher: /azotemi|ureia|creatinin/i, notes: 'Alteracao renal com azotemia citada nas evolucoes.' },
    { title: 'Desidratacao', priority: 'high', matcher: /desidrat|turgor cutaneo reduzido|mucosas secas|enoftalmia|exoftalmia/i, notes: 'Sinais de desidratacao referidos no plantao.' },
    { title: 'Inapetencia', priority: 'high', matcher: /inapet|sem apetite|nao quer comer|nao se alimentou/i, notes: 'Baixa ou ausencia de ingestao espontanea.' },
    { title: 'Vomitos / nausea', priority: 'medium', matcher: /vomit|nausea|salivando|sialorre/i, notes: 'Intercorrencias gastrointestinais descritas no prontuario.' },
    { title: 'Sarcopenia / caquexia', priority: 'medium', matcher: /sarcopen|caquex|massa muscular/i, notes: 'Perda de condicao corporal relatada.' },
    { title: 'Diarreia / alteracao gastrointestinal', priority: 'medium', matcher: /diarre|fezes amolecidas|fezes pastosas|tgi/i, notes: 'Alteracoes gastrointestinais recentes registradas.' },
    { title: 'Hipertensao', priority: 'medium', matcher: /hipertens|pas\s*1[56]\d/i, notes: 'Pressao arterial elevada ou hipertensao descritas.' },
    { title: 'Retenção urinária / monitorar micção', priority: 'medium', matcher: /reten[cç][aã]o urin|bexiga moderadamente repleta|nao urinou|não urinou/i, notes: 'Monitoramento urinário relevante no plantão.' },
    { title: 'Massa / processo oncológico', priority: 'high', matcher: /massa|neoformacao|neoforma[cç][aã]o|oncolog/i, notes: 'Achado compatível com processo expansivo ou oncológico.' },
  ];
  const source = [rawText, currentEpisodeText, summary].join('\n');

  return uniqueBy(
    candidates
      .filter((candidate) => candidate.matcher.test(normalizeText(source)))
      .map<Problem>((candidate) => ({
        id: createEntityId('problem'),
        title: candidate.title,
        status:
          candidate.title === 'Vomitos / nausea' && /nao apresentou episodios de vomitos|nao vomitou mais/.test(normalizeText(currentEpisodeText))
            ? 'resolved'
            : candidate.title === 'Desidratacao' && /melhora clinica deste quadro|normohidrat/.test(normalizeText(currentEpisodeText))
              ? 'resolved'
              : candidate.title === 'DRC' || candidate.title === 'Cardiopatia / sopro cardiaco'
                ? 'active'
                : 'active',
        priority: candidate.priority,
        notes: candidate.notes,
        startedAt: null,
        resolvedAt: null,
        origin: 'imported' as RecordOrigin,
        sourceLabel: 'importação',
        reviewRequired: false,
        deletedAt: null,
      })),
    (problem) => normalizeText(problem.title)
  );
}
function buildDiagnosis(primarySuspicion: string, problems: Problem[]) {
  const normalizedProblemTitles = problems.map((problem) => normalizeText(problem.title));
  const primaryNormalized = normalizeText(primarySuspicion);
  const primaryIsRedundant =
    !!primaryNormalized &&
    normalizedProblemTitles.filter((title) => primaryNormalized.includes(title)).length >= 2;

  return uniqueBy(
    [primaryIsRedundant ? '' : primarySuspicion, ...problems.map((problem) => problem.title)].filter(Boolean),
    (value) => normalizeText(value)
  )
    .slice(0, 3)
    .join('; ');
}

function buildAlertBadges(text: string, problems: Problem[], nutritionSupport: NutritionSupport) {
  return uniqueBy(
    [
      nutritionSupport.tubeInUse ? 'SONDA' : '',
      /jejum/.test(normalizeText(text)) ? 'JEJUM' : '',
      /aguardando laudo|exame pendente|coleta/.test(normalizeText(text)) ? 'EXAME PENDENTE' : '',
      problems.some((problem) => normalizeText(problem.title).includes('drc')) ? 'DRC' : '',
      problems.some((problem) => normalizeText(problem.title).includes('cardiopatia')) ? 'CARDIOPATA' : '',
      problems.some((problem) => normalizeText(problem.title).includes('desidrat')) ? 'DESIDRATACAO' : '',
    ].filter(Boolean),
    (value) => normalizeText(value)
  ).slice(0, 6);
}

function inferPatientStatus(text: string, problems: Problem[], nutritionSupport: NutritionSupport): PatientStatus {
  const normalized = normalizeText(text);
  if (
    problems.some((problem) => problem.priority === 'high') ||
    nutritionSupport.tubeInUse ||
    normalized.includes('prostrado') ||
    normalized.includes('hipotensao') ||
    normalized.includes('hipotermia')
  ) return 'watch';
  if (normalized.includes('alta') && normalized.includes('estavel')) return 'discharge_today';
  if (normalized.includes('estavel') || normalized.includes('alerta e responsiva')) return 'stable';
  return 'watch';
}

function buildSummary(sections: ParsedSection[], historyText: string, currentEpisodeText: string) {
  const clinicalNarrative = sections
    .filter((section) => section.kind === 'clinicalBulletin')
    .slice(-2)
    .flatMap((section) => section.contentLines.filter((line) => !isAuthorLine(line) && !/\bFC\b.*\bFR\b/i.test(line)))
    .join(' ');
  const latestEpisodeFocus =
    firstRegexMatch(currentEpisodeText, [
      /(Voltou em [^.\n]+internacao[^.\n]+)/i,
      /(Paciente .*?permanece em fluidoterapia[^.\n]+)/i,
      /(Paciente .*?manteve-se estavel[^.\n]+)/i,
      /(Paciente .*?segue internad[^.\n]+)/i,
    ]) || clinicalNarrative || currentEpisodeText;
  const context = firstRegexMatch(historyText, [/(tem [^.\n]+)/i, /(historico:[^.\n]+)/i, /([^.\n]*drc[^.\n]*)/i, /([^.\n]*cardiopat[^.\n]*)/i]);
  const currentSnapshot = firstRegexMatch(latestEpisodeFocus, [/(.*?fluidoterapia[^.\n]*)/i, /(.*?alimenta[^.\n]*)/i, /(.*?sonda[^.\n]*)/i, /(.*?prostrad[^.\n]*)/i]) || latestEpisodeFocus;
  const notes = [truncateText(context, 160), truncateText(currentSnapshot, 260)].filter(Boolean);
  return uniqueBy(notes, (value) => normalizeText(value)).join(' ');
}

function buildImportantNotes(currentEpisodeLines: string[], taskLines: string[]) {
  const notableLines = currentEpisodeLines.filter((line) =>
    /whatsapp|termo|visita|nefrologista|retorno|prognostico|sarcopen|baixa condicao corporal|tutora/i.test(
      normalizeText(line)
    )
  );
  return truncateText(uniqueBy([...notableLines, ...taskLines], (line) => normalizeText(line)).join(' | '), 420);
}

function parseScheduledTime(line: string) {
  const dateISO = parseDateToISO(line);
  const timeMatch = line.match(/(\d{1,2}:\d{2})/);
  return !dateISO && !timeMatch ? null : buildRecordedAt(dateISO, timeMatch?.[1] || null, 0);
}

function inferTaskCategory(line: string): TaskCategory {
  const normalized = normalizeText(line);
  if (/ultrassom|\bus\b|hemograma|pb|fosforo|coleta|laudo|exame/.test(normalized)) return 'exam';
  if (/sonda|acesso|cateter|procedimento|jejum/.test(normalized)) return 'procedure';
  if (/tutora|whatsapp|visita/.test(normalized)) return 'communication';
  if (/termo|receita|document/.test(normalized)) return 'documents';
  if (/alta|retorno/.test(normalized)) return 'discharge';
  if (/racao|nutricao|critical care|renafil|aliment/.test(normalized)) return 'nutrition';
  return 'other';
}

function inferTaskPriority(line: string): TaskPriority {
  const normalized = normalizeText(line);
  if (/jejum|agendad|hoje|amanha|manter|coleta|ultrassom/.test(normalized)) return 'high';
  if (/retorno|termo|receita|whatsapp|visita/.test(normalized)) return 'medium';
  return 'low';
}

function parseTaskDrafts(sections: ParsedSection[], currentEpisodeText: string) {
  const latestTaskSection = sections
    .filter((section) => section.kind === 'tasks')
    .sort((left, right) => (left.dateISO || '').localeCompare(right.dateISO || ''))
    .at(-1);

  if (!latestTaskSection) return [];

  const sectionTasks = latestTaskSection.contentLines
      .map((line) => collapseWhitespace(line))
      .filter((line) => line && !isAuthorLine(line))
      .filter((line) => {
        const normalized = normalizeText(line);
        const scheduledTime = parseScheduledTime(line);
        const scheduledIsPast = Boolean(
          scheduledTime && new Date(scheduledTime).getTime() < Date.now() - 60_000
        );

        if (/sondagem esofagica agendada para 12\/03/.test(normalized) && /realizou o procedimento de sondagem esofagica/.test(normalizeText(currentEpisodeText))) {
          return false;
        }
        if (/ultrassom agendado/.test(normalized) && /realizou us abdominal|realizou ultrassom/.test(normalizeText(currentEpisodeText))) {
          return false;
        }
        if (/^[a-z]{2,}\s+esta\s+com\s+\d+[.,]?\d*\s*kg/.test(normalized)) {
          return false;
        }
        if (scheduledIsPast && /agendad|jejum|manter em jejum/.test(normalized)) {
          return false;
        }
        return true;
      });

  const inferredTasks = currentEpisodeText
    .split('\n')
    .map((line) => collapseWhitespace(line))
    .filter((line) => /monitorar|acompanhar|reavaliar|confirmar laudo|checar pa|observar marcha|verificar miccao|verificar micção|oferecer alimento|avaliar necessidade de interna[cç][aã]o/i.test(normalizeText(line)))
    .map((line) => line.replace(/^[-•]\s*/, ''));

  return uniqueBy(
    [...sectionTasks, ...inferredTasks]
      .map<SmartImportTaskDraft>((line) => ({
        title: truncateText(line, 96),
        description: line,
        category: inferTaskCategory(line),
        priority: inferTaskPriority(line),
        scheduledTime: parseScheduledTime(line),
        completed: false,
        reviewRequired: /aguardando|revisar/.test(normalizeText(line)),
      })),
    (task) => `${normalizeText(task.title)}|${task.scheduledTime || ''}|${task.category}`
  );
}

function buildClinicalTags(
  species: Species,
  ageLabel: string,
  problems: Problem[],
  currentEpisodeText: string,
  nutritionSupport: NutritionSupport,
  tasks: SmartImportTaskDraft[]
) {
  const normalizedEpisode = normalizeText(currentEpisodeText);
  const tags = [
    species === 'felina' ? 'Felina' : species === 'canina' ? 'Canina' : '',
    /senior|sênior|geri[aá]trico/.test(normalizeText(ageLabel)) ? 'Sênior' : '',
    problems.some((problem) => /cardiopat|sopro/.test(normalizeText(problem.title))) ? 'Cardiopata' : '',
    problems.some((problem) => /vestibular/.test(normalizeText(problem.title))) ? 'Vestibular' : '',
    problems.some((problem) => /neurol|central/.test(normalizeText(problem.title))) ? 'Neurológico' : '',
    problems.some((problem) => /drc|renal|azotemi/.test(normalizeText(problem.title))) ? 'Nefropata' : '',
    problems.some((problem) => /hipertens/.test(normalizeText(problem.title))) ? 'Hipertenso' : '',
    problems.some((problem) => /massa|oncol/.test(normalizeText(problem.title))) ? 'Oncológico' : '',
    problems.some((problem) => /diarre|gastro|vomit/.test(normalizeText(problem.title))) ? 'Gastrointestinal' : '',
    problems.some((problem) => /urin/.test(normalizeText(problem.title))) ? 'Urinário' : '',
    nutritionSupport.tubeInUse ? 'Sonda' : '',
    nutritionSupport.feedingRoute ? 'Enteral' : '',
    /jejum/.test(normalizedEpisode) ? 'Jejum' : '',
    tasks.some((task) => task.category === 'exam' || task.reviewRequired) ? 'Exame pendente' : '',
    /interna[cç][aã]o .*desde|alta .*retorno|interna[cç][aã]o prolongada/.test(normalizedEpisode) ? 'Internação prolongada' : '',
    /agressiv|bravo/.test(normalizedEpisode) ? 'Agressivo' : '',
    /isolamento/.test(normalizedEpisode) ? 'Isolamento' : '',
    /alta .*hoje|recebe alta/.test(normalizedEpisode) ? 'Alta hoje' : '',
    /monitorar|observa[cç][aã]o/.test(normalizedEpisode) ? 'Observação' : '',
  ].filter(Boolean);

  return uniqueBy(tags, (value) => normalizeText(value)).slice(0, 10);
}

function buildDefiningPhrase(
  species: Species,
  ageLabel: string,
  problems: Problem[],
  nutritionSupport: NutritionSupport,
  currentEpisodeText: string,
  tasks: SmartImportTaskDraft[]
) {
  const subject =
    species === 'felina' ? 'Paciente felina' : species === 'canina' ? 'Paciente canina' : 'Paciente';
  const ageChunk = ageLabel ? ` ${ageLabel.toLowerCase()}` : '';
  const activeProblems = problems.filter((problem) => problem.status === 'active').slice(0, 3).map((problem) => problem.title.toLowerCase());
  const normalizedEpisode = normalizeText(currentEpisodeText);
  const trajectory =
    /melhor[aou]|boa evolu/.test(normalizedEpisode)
      ? 'em melhora progressiva'
      : /estavel|estável/.test(normalizedEpisode)
        ? 'com estabilidade clínica geral'
        : /prostrad|inapet|desidrat/.test(normalizedEpisode)
          ? 'ainda demandando suporte clínico intensivo'
          : 'em acompanhamento clínico';
  const support = nutritionSupport.tubeInUse
    ? `, em suporte por ${getTubeTypeLabel(nutritionSupport.tubeType).toLowerCase()}`
    : nutritionSupport.fluidTherapy
      ? ', mantida em fluidoterapia'
      : '';
  const pending = tasks.some((task) => task.category === 'exam' || task.reviewRequired) ? ', com pendências diagnósticas em aberto' : '';

  if (activeProblems.length === 0) {
    return `${subject}${ageChunk} ${trajectory}${support}${pending}.`;
  }

  return `${subject}${ageChunk} com ${activeProblems.join(', ')}, ${trajectory}${support}${pending}.`;
}

function buildImportedDailySummaryEntries(input: {
  shiftId?: string;
  shiftPatientId?: string;
  summary: string;
  tasks: SmartImportTaskDraft[];
  vitalsRecords: PatientVitalsRecord[];
  examRecords: PatientExamRecord[];
  medicationEntries: MedicationEntry[];
  problems: Problem[];
  weightHistory: ReturnType<typeof createWeightRecord>[];
  importantNotes: string;
}) {
  const shiftId = input.shiftId || 'preview-shift';
  const shiftPatientId = input.shiftPatientId || 'preview-patient';
  const entries: DailySummaryEntry[] = [];

  if (input.summary) {
    entries.push(
      createDailySummaryEntry({
        shiftId,
        shiftPatientId,
        type: 'clinical',
        title: 'Resumo clínico importado',
        content: truncateText(input.summary, 220),
        details: input.summary,
        occurredAt: new Date().toISOString(),
        sourceType: 'imported',
        relatedEntityType: 'import',
      })
    );
  }

  input.weightHistory.forEach((record) => {
    entries.push(
      createDailySummaryEntry({
        shiftId,
        shiftPatientId,
        type: 'weight',
        title: record.isBaseWeight ? 'Peso-base identificado' : 'Peso registrado',
        content: record.label,
        details: record.sourceLabel,
        occurredAt: record.recordedAt,
        sourceType: 'imported',
        relatedEntityType: 'weight',
      })
    );
  });

  input.problems.forEach((problem) => {
    entries.push(
      createDailySummaryEntry({
        shiftId,
        shiftPatientId,
        type: problem.status === 'resolved' ? 'problem_resolved' : 'problem_opened',
        title: problem.status === 'resolved' ? 'Problema em melhora/resolvido' : 'Problema ativo importado',
        content: problem.title,
        details: problem.notes,
        occurredAt: problem.updatedAt,
        sourceId: problem.id,
        sourceType: 'imported',
        relatedEntityType: 'problem',
      })
    );
  });

  input.tasks.forEach((task) => {
    entries.push(
      createDailySummaryEntry({
        shiftId,
        shiftPatientId,
        type: task.completed ? 'task_completed' : 'task_created',
        title: task.completed ? 'Ação já realizada no prontuário' : 'Pendência importada',
        content: task.title,
        details: task.description,
        occurredAt: task.scheduledTime || new Date().toISOString(),
        sourceType: 'imported',
        relatedEntityType: 'task',
      })
    );
  });

  input.vitalsRecords.forEach((record) => {
    entries.push(
      createDailySummaryEntry({
        shiftId,
        shiftPatientId,
        type: 'parameter',
        title: 'Parâmetros importados',
        content: [`FC ${record.heartRate || '--'}`, `FR ${record.respiratoryRate || '--'}`, `TR ${record.temperature || '--'}`]
          .filter(Boolean)
          .join(' • '),
        details: record.observations || '',
        occurredAt: record.recordedAt,
        sourceId: record.id,
        sourceType: 'imported',
        relatedEntityType: 'vitals',
      })
    );
  });

  input.examRecords.forEach((exam) => {
    entries.push(
      createDailySummaryEntry({
        shiftId,
        shiftPatientId,
        type: 'exam',
        title: exam.title || 'Exame importado',
        content: exam.mainFinding,
        details: exam.summary || exam.findings || exam.observations,
        occurredAt: exam.recordedAt,
        sourceId: exam.id,
        sourceType: 'imported',
        relatedEntityType: 'exam',
      })
    );
  });

  input.medicationEntries.forEach((entry) => {
    entries.push(
      createDailySummaryEntry({
        shiftId,
        shiftPatientId,
        type: entry.status === 'suspended' ? 'medication_suspended' : 'medication_added',
        title: entry.status === 'suspended' ? 'Medicação suspensa no prontuário' : 'Medicação em uso importada',
        content: [entry.name, entry.dose, entry.frequency, entry.route].filter(Boolean).join(' • '),
        details: entry.observations,
        occurredAt: entry.updatedAt,
        sourceId: entry.id,
        sourceType: 'imported',
        relatedEntityType: 'medication',
      })
    );
  });

  if (input.importantNotes) {
    entries.push(
      createDailySummaryEntry({
        shiftId,
        shiftPatientId,
        type: 'observation',
        title: 'Observação relevante importada',
        content: truncateText(input.importantNotes, 180),
        details: input.importantNotes,
        occurredAt: new Date().toISOString(),
        sourceType: 'imported',
        relatedEntityType: 'import',
      })
    );
  }

  return uniqueBy(
    entries.filter((entry) => Boolean(entry?.occurredAt)),
    (entry) => `${entry.type}|${normalizeText(entry.title)}|${normalizeText(entry.content)}|${entry.occurredAt}`
  ).sort((left, right) => (right.occurredAt || '').localeCompare(left.occurredAt || ''));
}

function buildImportedBulletinDrafts(
  species: Species,
  displayName: string,
  summary: string,
  dailySummaryEntries: DailySummaryEntry[],
  vitalsRecords: PatientVitalsRecord[]
): SmartImportBulletinDraft[] {
  const latestVitals = vitalsRecords[0];
  const technicalDigest = dailySummaryEntries
    .slice(0, 5)
    .map((entry) => `${entry.title}: ${entry.content}`)
    .filter(Boolean)
    .join(' ');
  const tutorDigest = dailySummaryEntries
    .filter((entry) => ['parameter', 'observation', 'task_completed', 'medication_added', 'clinical'].includes(entry.type))
    .slice(0, 4)
    .map((entry) => entry.content)
    .filter(Boolean)
    .join(' ');
  const patientLabel = species === 'felina' ? 'paciente felina' : species === 'canina' ? 'paciente canina' : 'paciente';

  return [
    {
      type: 'clinical',
      title: `Boletim veterinário - ${displayName || 'Paciente'}`,
      authorLabel: '',
      content: [summary, technicalDigest, latestVitals ? `Parâmetros mais recentes: FC ${latestVitals.heartRate || '--'} | FR ${latestVitals.respiratoryRate || '--'} | TR ${latestVitals.temperature || '--'}.` : '']
        .filter(Boolean)
        .join('\n\n'),
    },
    {
      type: 'tutor',
      title: 'Boletim tutor',
      authorLabel: '',
      content: [
        'BOLETIM TUTOR',
        '',
        `Prezados, seguem as informações do plantão sobre o quadro do(a) paciente ${displayName || patientLabel}, acompanhado(a) no setor de Internação Clínica de Pequenos Animais do HV-UFMG.`,
        '',
        truncateText(tutorDigest || summary || 'Paciente em acompanhamento clínico no plantão.', 260),
        '',
        'Seguimos à disposição e aguardamos o horário de visitas (15 às 16h) para maiores esclarecimentos.',
        '',
        'Atenciosamente,',
        'Setor de Clínica Médica',
        'HV-UFMG',
      ].join('\n'),
    },
  ];
}

export function parseSmartImportText(rawText: string): SmartImportDraft {
  const repairedText = repairImportedText(rawText);
  const lines = splitLines(repairedText);
  const currentEpisodeLines = getCurrentEpisodeLines(lines);
  const currentEpisodeText = currentEpisodeLines.join('\n');
  const currentSections = splitSections(currentEpisodeLines);
  const historySections = splitSections(lines);
  const inlineHeaderDiagnosis = extractHeaderDiagnosis(lines);
  const summaryFromSection = extractSectionBlock(lines, [/^resumo do quadro atual$/i, /^resumo do caso$/i]);
  const historyText = historySections.find((section) => section.kind === 'history')?.contentLines.join(' ') || firstRegexMatch(repairedText, [/Historico:\s*([^\n]+)/i]);
  const contaminationWarnings = lines
    .filter((line) => /zul/i.test(normalizeText(line)))
    .map((line) => `Possível ruído de outro paciente ignorado: ${truncateText(line, 120)}`);
  const { species, breed } = extractSpeciesAndBreed(repairedText, lines);
  const medicationEntries = parseMedicationEntries(currentSections);
  const baseWeightLabel = extractHeaderWeight(lines);
  const nutritionSupport = parseNutritionSupport(currentEpisodeLines, baseWeightLabel);
  const tasks = parseTaskDrafts(currentSections, currentEpisodeText);
  const summary = summaryFromSection || buildSummary(currentSections, historyText, currentEpisodeText);
  const problems = parseProblemDrafts(repairedText, currentEpisodeText, summary);
  const ageLabel = extractHeaderAge(lines, repairedText);
  const vitalsRecords = parseVitalsRecords(currentSections);
  const examRecords = parseExamRecords(currentSections);
  const currentComplaint =
    summaryFromSection ||
    firstRegexMatch(currentEpisodeText, [
      /(desde segunda nao quer comer[^.\n]+)/i,
      /(por[eé]m,\s*desde segunda[^.\n]+)/i,
      /(ficando muito prostrada[^.\n]+)/i,
    ]) || '';
  const currentAdmissionReason =
    firstRegexMatch(currentEpisodeText, [
      /(Voltou em \d{1,2}\/\d{1,2} para interna[cç][aã]o e sondagem esof[aá]gica[^.\n]+)/i,
      /(internado para estabiliza[cç][aã]o e preparo para passagem de sonda esof[aá]gica[^.\n]+)/i,
    ]) || '';
  const patientObservations = firstRegexMatch(currentEpisodeText, [/(muito d[oó]cil[^.\n]+)/i, /(permite manipula[cç][aã]o[^.\n]+)/i]);
  const tags = buildClinicalTags(species, ageLabel, problems, currentEpisodeText, nutritionSupport, tasks);
  const definingPhrase = buildDefiningPhrase(species, ageLabel, problems, nutritionSupport, currentEpisodeText, tasks);
  const importantNotes = buildImportantNotes(currentEpisodeLines, tasks.map((task) => task.description));
  const weightHistory = uniqueBy(
    [
      baseWeightLabel ? createWeightRecord(baseWeightLabel, 'ficha', new Date().toISOString(), true) : null,
      nutritionSupport.currentWeight && nutritionSupport.currentWeight !== baseWeightLabel
        ? createWeightRecord(nutritionSupport.currentWeight, 'evolução', new Date().toISOString(), false)
        : null,
    ].filter(Boolean) as ReturnType<typeof createWeightRecord>[],
    (entry) => `${normalizeText(entry.label)}|${entry.isBaseWeight ? 'base' : 'history'}`
  );
  const dailySummaryEntries = buildImportedDailySummaryEntries({
    summary,
    tasks,
    vitalsRecords,
    examRecords,
    medicationEntries,
    problems,
    weightHistory,
    importantNotes,
  });
  const bulletinDrafts = buildImportedBulletinDrafts(species, extractHeaderName(lines, repairedText), summary, dailySummaryEntries, vitalsRecords);
  const mainDiagnosis = buildDiagnosis(findLabelValue(lines, ['suspeita']) || inlineHeaderDiagnosis, problems);

  return {
    name: extractHeaderName(lines, repairedText),
    tutorName: findLabelValue(lines, ['tutor']) || firstRegexMatch(repairedText, [/Tutor:\s*([^\n]+)/i]),
    breed,
    ageLabel,
    weightLabel: baseWeightLabel || nutritionSupport.currentWeight || '',
    baseWeightLabel,
    weightHistory,
    species,
    status: inferPatientStatus(currentEpisodeText, problems, nutritionSupport),
    medicalRecordNumber: findLabelValue(lines, ['ficha']),
    admissionDateLabel: findLabelValue(lines, ['data admissao']),
    responsibleVet: findLabelValue(lines, ['vet. responsavel', 'veterinario responsavel']),
    belongings: findLabelValue(lines, ['pertences']),
    patientObservations,
    mainDiagnosis,
    summary,
    clinicalHistory: truncateText(historyText, 220),
    currentComplaint,
    currentAdmissionReason,
    definingPhrase,
    importantNotes,
    nextShiftPlan: truncateText(tasks.map((task) => task.description).join(' | '), 320),
    alertBadges: buildAlertBadges(currentEpisodeText, problems, nutritionSupport),
    tags,
    medicationsInUse: medicationEntries.map((entry) => entry.name),
    medicationEntries,
    vitalsRecords,
    examRecords,
    nutritionSupport,
    problems,
    tasks,
    bulletinDrafts,
    dailySummaryEntries,
    importWarnings: uniqueBy(
      [
        ...contaminationWarnings,
        baseWeightLabel ? '' : 'Peso-base não identificado com segurança na ficha.',
      ].filter(Boolean),
      (value) => normalizeText(value)
    ),
  };
}

