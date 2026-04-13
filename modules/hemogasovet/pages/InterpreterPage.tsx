import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle2, HelpCircle, Info, Save, FileText, ChevronDown, ChevronUp, AlertTriangle, ShieldAlert, Stethoscope, Beaker, BrainCircuit } from 'lucide-react';
import { SpeciesPortraitCards } from '@/components/SpeciesPortraitCards';
import { cn } from '../../../lib/utils';
import { BloodGasInput, Species, SampleType, InterpretationResult, ParsedField } from '../types';
import { parseBloodGasText } from '../engine/parser';
import { interpretBloodGas } from '../engine/interpreter';
import { applyOcrFieldsToFormData, buildInterpretationPayload, FieldSource, PayloadIssue } from '../engine/inputPipeline';
import { useHemoStore } from '../store/useHemoStore';
import { TOOLTIPS } from '../constants/referenceRanges';
import { exportToPDF } from '../utils/pdfExport';
import { formatFiO2Percent } from '../utils/fio2';
import { formatCompensationStatus, formatDomainStatus, formatOxygenationStatus, formatPrimaryDisorder, formatQualityStatus } from '../utils/presentation';
import * as Tooltip from '@radix-ui/react-tooltip';

function getDefaultFormData(species: Species, sampleType: SampleType): Partial<BloodGasInput> {
  const canineDefaults: Partial<BloodGasInput> = {
    species: 'canine',
    sampleType,
    pH: 7.4,
    pCO2: 40,
    pO2: sampleType === 'arterial' ? 95 : 42,
    HCO3: 24,
    BE: 0,
    lactate: 1.5,
    fio2: 0.21,
    temperature: 38.5,
    Na: 145,
    K: 4.2,
    Cl: 112,
    iCa: 1.25,
    glucose: 95,
    albumin: 3.2,
    sO2: sampleType === 'arterial' ? 97 : 75,
    AG: 18,
    clinicalContext: {},
  };

  const felineDefaults: Partial<BloodGasInput> = {
    species: 'feline',
    sampleType,
    pH: 7.32,
    pCO2: 31,
    pO2: sampleType === 'arterial' ? 102 : 40,
    HCO3: 18,
    BE: -2,
    lactate: 1.4,
    fio2: 0.21,
    temperature: 38.3,
    Na: 151,
    K: 4.1,
    Cl: 120,
    iCa: 1.22,
    glucose: 105,
    albumin: 3.1,
    sO2: sampleType === 'arterial' ? 97 : 73,
    AG: 19,
    clinicalContext: {},
  };

  return species === 'feline' ? felineDefaults : canineDefaults;
}

export default function InterpreterPage() {
  const [inputMode, setInputMode] = useState<'manual' | 'text'>('manual');
  const [species, setSpecies] = useState<Species>('canine');
  const [sampleType, setSampleType] = useState<SampleType>('arterial');
  const [rawText, setRawText] = useState('');
  
  const [formData, setFormData] = useState<Partial<BloodGasInput>>(getDefaultFormData('canine', 'arterial'));
  const [fieldSources, setFieldSources] = useState<Partial<Record<keyof BloodGasInput, FieldSource>>>({});
  const [ocrPending, setOcrPending] = useState(false);

  const [parsedFields, setParsedFields] = useState<ParsedField[]>([]);
  const [unrecognizedText, setUnrecognizedText] = useState('');
  const [submissionIssues, setSubmissionIssues] = useState<PayloadIssue[]>([]);

  const [result, setResult] = useState<InterpretationResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showClinical, setShowClinical] = useState(false);
  const addRecord = useHemoStore(state => state.addRecord);
  const parsedFieldMap = new Map(parsedFields.map((field) => [field.key, field]));

  const setFieldSource = (key: keyof BloodGasInput, source: FieldSource) => {
    setFieldSources((prev) => ({ ...prev, [key]: source }));
  };

  const handleInputChange = (field: keyof BloodGasInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFieldSource(field, 'manual');
    setSubmissionIssues([]);
  };

  const applyDefaultsForProfile = (nextSpecies: Species, nextSampleType: SampleType) => {
    setSpecies(nextSpecies);
    setSampleType(nextSampleType);
    setFormData(getDefaultFormData(nextSpecies, nextSampleType));
    setFieldSources({});
    setParsedFields([]);
    setUnrecognizedText('');
    setOcrPending(false);
    setSubmissionIssues([]);
    setResult(null);
  };

  const handleClinicalChange = (field: keyof NonNullable<BloodGasInput['clinicalContext']>, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      clinicalContext: {
        ...prev.clinicalContext,
        [field]: value
      }
    }));
    setFieldSource('clinicalContext', 'manual');
    setSubmissionIssues([]);
  };

  const switchInputMode = (nextMode: 'manual' | 'text') => {
    if (nextMode === inputMode) return;
    if (inputMode === 'text' && nextMode === 'manual') {
      setParsedFields([]);
      setUnrecognizedText('');
      setOcrPending(false);
    }
    setInputMode(nextMode);
    setSubmissionIssues([]);
  };

  const handleParseText = () => {
    const parsedResult = parseBloodGasText(rawText, species, sampleType);
    setParsedFields(parsedResult.recognizedFields || []);
    setUnrecognizedText(parsedResult.unrecognizedText?.join('\n') || '');
    setOcrPending((parsedResult.recognizedFields || []).length > 0);
    setSubmissionIssues([]);
    setResult(null);
  };

  const handleApplyParsedFields = () => {
    const nextForm = applyOcrFieldsToFormData(formData, parsedFields, setFieldSource);
    setFormData(nextForm);
    setOcrPending(false);
    setSubmissionIssues([]);
    setResult(null);
  };

  const handleInterpret = () => {
    const prepared = buildInterpretationPayload({
      formData,
      species,
      sampleType,
      ocrPending,
      fieldSources,
    });
    setSubmissionIssues(prepared.issues);
    if (prepared.blocked) {
      setResult(null);
      return;
    }
    const interpretation = interpretBloodGas(prepared.payload, {
      submissionIssues: prepared.issues,
      submissionConfidence: prepared.confidence,
    });
    setResult(interpretation);
  };

  const handleSave = () => {
    if (!result) return;
    const patientName = prompt('Nome do paciente:');
    if (!patientName) return;
    
    addRecord({
      id: Date.now().toString(),
      patientName,
      date: new Date().toISOString(),
      result
    });
    alert('Exame salvo com sucesso!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Section - Reduced height */}
      <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-xl p-4 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
        <div className="relative z-10">
          <h1 className="text-xl font-bold tracking-tight mb-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            Interpretação Clínica
          </h1>
          <p className="text-purple-200 text-sm max-w-2xl">
            Insira os dados para uma análise profunda do equilíbrio ácido-base, oxigenação e eletrólitos.
          </p>
        </div>
        <div className="hidden md:block text-purple-500/20">
          <Stethoscope className="w-16 h-16" />
        </div>
      </div>

      <div className={cn("grid grid-cols-1 gap-6 transition-all duration-500", result ? "lg:grid-cols-12" : "lg:grid-cols-12")}>
        {/* Input Section */}
        <div className={cn("space-y-6 transition-all duration-500 min-w-0", result ? "lg:col-span-4" : "lg:col-span-12")}>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
            
            {/* Profile Selection */}
            <div className="space-y-4 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Espécie</label>
                <SpeciesPortraitCards
                  variant="purple"
                  size="compact"
                  showHeading={false}
                  canineSelected={species === 'canine'}
                  felineSelected={species === 'feline'}
                  onSelectCanine={() => applyDefaultsForProfile('canine', sampleType)}
                  onSelectFeline={() => applyDefaultsForProfile('feline', sampleType)}
                  canineSubtitle="VR e defaults caninos"
                  felineSubtitle="VR e defaults felinos"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Amostra
                  <TooltipIcon content={TOOLTIPS.sampleType} />
                </label>
                <div className="flex rounded-md shadow-sm max-w-md">
                  <button
                    type="button"
                    onClick={() => applyDefaultsForProfile(species, 'arterial')}
                    className={cn(
                      "flex-1 py-1.5 text-xs font-medium rounded-l-md border transition-colors",
                      sampleType === 'arterial' 
                        ? "bg-red-100 border-red-200 text-red-700 dark:bg-red-900/40 dark:border-red-800 dark:text-red-300" 
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400"
                    )}
                  >
                    Arterial
                  </button>
                  <button
                    type="button"
                    onClick={() => applyDefaultsForProfile(species, 'venous')}
                    className={cn(
                      "flex-1 py-1.5 text-xs font-medium rounded-r-md border-y border-r transition-colors",
                      sampleType === 'venous' 
                        ? "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/40 dark:border-blue-800 dark:text-blue-300" 
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400"
                    )}
                  >
                    Venosa
                  </button>
                </div>
              </div>
            </div>

            {/* Input Mode Toggle */}
            <div className="flex space-x-4 mb-5">
              <button
                onClick={() => switchInputMode('manual')}
                className={cn(
                  "text-xs font-medium pb-1.5 border-b-2 transition-colors",
                  inputMode === 'manual' 
                    ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400" 
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                Entrada Manual
              </button>
              <button
                onClick={() => switchInputMode('text')}
                className={cn(
                  "text-xs font-medium pb-1.5 border-b-2 transition-colors",
                  inputMode === 'text' 
                    ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400" 
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                Colar Texto (OCR)
              </button>
            </div>

            {/* Manual Input Form */}
            {inputMode === 'manual' ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="pH" value={formData.pH} onChange={(v) => handleInputChange('pH', v)} tooltip={TOOLTIPS.pH} parsedField={parsedFieldMap.get('pH')} />
                  <InputField label="pCO2" unit="mmHg" value={formData.pCO2} onChange={(v) => handleInputChange('pCO2', v)} tooltip={TOOLTIPS.pCO2} parsedField={parsedFieldMap.get('pCO2')} />
                  <InputField label="pO2" unit="mmHg" value={formData.pO2} onChange={(v) => handleInputChange('pO2', v)} tooltip={TOOLTIPS.pO2} parsedField={parsedFieldMap.get('pO2')} />
                  <InputField label="HCO3-" unit="mEq/L" value={formData.HCO3} onChange={(v) => handleInputChange('HCO3', v)} tooltip={TOOLTIPS.HCO3} parsedField={parsedFieldMap.get('HCO3')} />
                  <InputField label="Base Excess" unit="mEq/L" value={formData.BE} onChange={(v) => handleInputChange('BE', v)} tooltip={TOOLTIPS.BE} parsedField={parsedFieldMap.get('BE')} />
                  <InputField label="Lactato" unit="mmol/L" value={formData.lactate} onChange={(v) => handleInputChange('lactate', v)} tooltip={TOOLTIPS.lactate} parsedField={parsedFieldMap.get('lactate')} />
                  <InputField label="FiO2" unit="%" value={formData.fio2 === undefined ? '' : Number((formData.fio2 * 100).toFixed(1))} onChange={(v) => handleInputChange('fio2', v === undefined ? undefined : (Number(v) <= 1 ? Number(v) : Number(v) / 100))} tooltip={TOOLTIPS.fio2} parsedField={parsedFieldMap.get('fio2')} hint={formData.fio2 !== undefined ? `Interpretada internamente como fracao (${formatFiO2Percent(formData.fio2)}). Aceita 21 ou 0.21.` : 'Aceita 21 ou 0.21; o motor converte para fracao internamente.'} />
                  <InputField label="Temp." unit="°C" value={formData.temperature} onChange={(v) => handleInputChange('temperature', v)} parsedField={parsedFieldMap.get('temperature')} hint="A temperatura entra como fator de contexto da interpretacao." />
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline w-full justify-between bg-purple-50 dark:bg-purple-900/20 p-2 rounded-md"
                  >
                    <span className="flex items-center gap-1"><Beaker className="w-3.5 h-3.5" /> Eletrólitos & Outros</span>
                    {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  
                  {showAdvanced && (
                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2">
                      <InputField label="Sódio (Na)" unit="mEq/L" value={formData.Na} onChange={(v) => handleInputChange('Na', v)} parsedField={parsedFieldMap.get('Na')} />
                      <InputField label="Potássio (K)" unit="mEq/L" value={formData.K} onChange={(v) => handleInputChange('K', v)} parsedField={parsedFieldMap.get('K')} />
                      <InputField label="Cloro (Cl)" unit="mEq/L" value={formData.Cl} onChange={(v) => handleInputChange('Cl', v)} parsedField={parsedFieldMap.get('Cl')} />
                      <InputField label="Cálcio Ionizado" unit="mmol/L" value={formData.iCa} onChange={(v) => handleInputChange('iCa', v)} parsedField={parsedFieldMap.get('iCa')} />
                      <InputField label="Glicose" unit="mg/dL" value={formData.glucose} onChange={(v) => handleInputChange('glucose', v)} parsedField={parsedFieldMap.get('glucose')} />
                      <InputField label="Albumina" unit="g/dL" value={formData.albumin} onChange={(v) => handleInputChange('albumin', v)} parsedField={parsedFieldMap.get('albumin')} />
                      <InputField label="SatO2" unit="%" value={formData.sO2} onChange={(v) => handleInputChange('sO2', v)} parsedField={parsedFieldMap.get('sO2')} />
                      <InputField label="Anion Gap" unit="mEq/L" value={formData.AG} onChange={(v) => handleInputChange('AG', v)} parsedField={parsedFieldMap.get('AG')} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => setShowClinical(!showClinical)}
                    className="flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline w-full justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md"
                  >
                    <span className="flex items-center gap-1"><Stethoscope className="w-3.5 h-3.5" /> Contexto Clínico (Opcional)</span>
                    {showClinical ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  
                  {showClinical && (
                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2">
                      <CheckboxField label="Vômito" checked={!!formData.clinicalContext?.vomiting} onChange={(c) => handleClinicalChange('vomiting', c)} />
                      <CheckboxField label="Diarreia" checked={!!formData.clinicalContext?.diarrhea} onChange={(c) => handleClinicalChange('diarrhea', c)} />
                      <CheckboxField label="Dispneia" checked={!!formData.clinicalContext?.dyspnea} onChange={(c) => handleClinicalChange('dyspnea', c)} />
                      <CheckboxField label="Choque" checked={!!formData.clinicalContext?.shock} onChange={(c) => handleClinicalChange('shock', c)} />
                      <CheckboxField label="Suspeita CAD" checked={!!formData.clinicalContext?.suspectedDKA} onChange={(c) => handleClinicalChange('suspectedDKA', c)} />
                      <CheckboxField label="Obstr. Uretral" checked={!!formData.clinicalContext?.urethralObstruction} onChange={(c) => handleClinicalChange('urethralObstruction', c)} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cole o texto do laudo. O sistema extrairá os valores automaticamente.
                </p>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full h-32 p-3 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-xs"
                  placeholder="Ex:&#10;pH: 7.25&#10;pCO2: 30&#10;HCO3: 12"
                />
                <button
                  onClick={handleParseText}
                  className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-md font-medium text-sm transition-colors"
                >
                  Extrair Dados
                </button>

                {parsedFields.length > 0 && (
                  <button
                    onClick={handleApplyParsedFields}
                    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium text-sm transition-colors"
                  >
                    Aplicar Campos Reconhecidos
                  </button>
                )}

                {(parsedFields.length > 0 || unrecognizedText.length > 0) && (
                  <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">Valores Reconhecidos:</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {parsedFields.map((field, idx) => (
                          <div key={idx} className={cn(
                            "flex justify-between items-center p-2 rounded text-xs border",
                            field.confidence === 'high' ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300" :
                            field.confidence === 'medium' ? "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-300" :
                            "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300"
                          )}>
                            <span className="font-medium truncate mr-2" title={field.originalText}>{field.key}</span>
                            <span className="font-bold">{field.normalizedDisplay || field.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {parsedFields.some((field) => field.confidence !== 'high' || field.normalizedDisplay) && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">Campos com cautela:</h4>
                        <div className="space-y-1">
                          {parsedFields.filter((field) => field.confidence !== 'high' || field.normalizedDisplay).map((field, idx) => (
                            <div key={`note-${idx}`} className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded-md px-2 py-1.5">
                              <strong>{field.key}:</strong> {field.normalizedDisplay ? `interpretado como ${field.normalizedDisplay}. ` : ''}{field.confidence === 'low' ? 'Baixa confianca; revise antes de interpretar.' : field.confidence === 'medium' ? 'Confianca intermediaria; confirme no laudo original.' : 'Preenchido automaticamente.'}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {unrecognizedText && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Linhas Não Reconhecidas (Ignoradas):
                        </h4>
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-2.5 rounded text-xs text-amber-800 dark:text-amber-300/80 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                          {unrecognizedText}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800/50 p-2 rounded-md">
                      <strong>Dica:</strong> os dados de OCR so entram no formulario apos clicar em "Aplicar Campos Reconhecidos".
                    </p>
                  </div>
                )}
              </div>
            )}

            {ocrPending && (
              <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-300">
                OCR pendente: confirme ou descarte os campos reconhecidos antes de gerar a interpretacao.
              </div>
            )}

            {submissionIssues.length > 0 && (
              <div className="mt-4 space-y-2">
                {submissionIssues.map((issue, idx) => (
                  <div
                    key={`submission-issue-${idx}`}
                    className={cn(
                      "rounded-md border px-3 py-2 text-xs",
                      issue.level === 'critical'
                        ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-300"
                        : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-300"
                    )}
                  >
                    {issue.message}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleInterpret}
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <BrainCircuit className="w-4 h-4" />
                Gerar Interpretação Clínica
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="lg:col-span-8 min-w-0">
            <div className="space-y-4 animate-in slide-in-from-right-8 duration-500">
              
              {/* Data Quality Banner */}
              <div className={cn(
                "rounded-xl p-4 border flex items-start gap-3 shadow-sm",
                result.dataQuality.status === 'probable_error' ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50" :
                result.dataQuality.status === 'caution' ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/50" :
                "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50"
              )}>
                {result.dataQuality.status === 'probable_error' ? <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" /> :
                 result.dataQuality.status === 'caution' ? <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" /> :
                 <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                <div>
                  <h3 className={cn(
                    "font-bold text-sm mb-1",
                    result.dataQuality.status === 'probable_error' ? "text-red-800 dark:text-red-300" :
                    result.dataQuality.status === 'caution' ? "text-amber-800 dark:text-amber-300" :
                    "text-emerald-800 dark:text-emerald-300"
                  )}>
                    {formatQualityStatus(result.dataQuality.status)}
                  </h3>
                  <ul className="space-y-1">
                    {result.dataQuality.messages.map((msg, idx) => (
                      <li key={idx} className={cn(
                        "text-xs",
                        result.dataQuality.status === 'probable_error' ? "text-red-700 dark:text-red-400" :
                        result.dataQuality.status === 'caution' ? "text-amber-700 dark:text-amber-400" :
                        "text-emerald-700 dark:text-emerald-400"
                      )}>{msg}</li>
                    ))}
                  </ul>
                  {result.dataQuality.consistencyChecks.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {result.dataQuality.consistencyChecks.map((check, idx) => (
                        <div key={idx} className="rounded-md bg-white/60 dark:bg-slate-950/40 border border-current/10 px-3 py-2 text-xs">
                          <div className="font-semibold">{check.message}</div>
                          <div className="opacity-80">{check.suggestion}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-slate-900 dark:bg-slate-950 px-5 py-3 flex justify-between items-center">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" />
                    Resumo Executivo
                  </h2>
                  <div className="flex gap-1">
                    <button onClick={handleSave} className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Salvar Histórico">
                      <Save className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        const patientName = prompt('Nome do paciente para o PDF:');
                        if (patientName) {
                          exportToPDF({ id: Date.now().toString(), patientName, date: new Date().toISOString(), result });
                        }
                      }}
                      className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors" 
                      title="Exportar PDF"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {result.executiveSummary.join(' ')}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 px-3 py-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">Qualidade:</span> {formatDomainStatus(result.domainStatuses.quality)}
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 px-3 py-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">Temperatura:</span> {result.temperatureContext.summary}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Acid-Base */}
                <ResultCard title="Equilíbrio Ácido-Base" icon={<Beaker className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}>
                  <div className="space-y-4 text-sm">
                    <div className="rounded-xl border border-slate-200/90 dark:border-slate-700/90 bg-gradient-to-b from-slate-50/90 to-white dark:from-slate-900/40 dark:to-slate-950/30 p-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/80 dark:border-slate-700/80">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Painel de referência</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                            Escala clínica · VR para {species === 'canine' ? 'cão' : 'gato'}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2.5 w-6 rounded-sm bg-emerald-500/25 border border-emerald-500/45 dark:border-emerald-400/35" aria-hidden />
                            Faixa de referência
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="relative flex h-3 w-1 justify-center" aria-hidden>
                              <span className="absolute bottom-0 h-full w-0.5 rounded-full bg-emerald-500 shadow-sm" />
                              <span className="absolute -top-0.5 h-1.5 w-1.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500" />
                            </span>
                            Valor medido (leitura)
                          </span>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <VisualRuler
                          paramName="pH"
                          unit=""
                          value={result.input.pH!}
                          min={7.1}
                          max={7.6}
                          normalLow={species === 'canine' ? 7.35 : 7.25}
                          normalHigh={species === 'canine' ? 7.45 : 7.4}
                        />
                        <VisualRuler
                          paramName="pCO₂"
                          unit="mmHg"
                          value={result.input.pCO2!}
                          min={15}
                          max={85}
                          normalLow={species === 'canine' ? 35 : 28}
                          normalHigh={species === 'canine' ? 45 : 34}
                        />
                        {result.input.HCO3 !== undefined && (
                          <VisualRuler
                            paramName="HCO₃⁻"
                            unit="mEq/L"
                            value={result.input.HCO3!}
                            min={5}
                            max={45}
                            normalLow={species === 'canine' ? 20 : 16}
                            normalHigh={species === 'canine' ? 24 : 20}
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-slate-200 dark:border-slate-700/90 bg-white dark:bg-slate-950/40 p-3.5 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Diagnóstico primário</p>
                        <p className="text-[15px] font-semibold leading-snug text-slate-900 dark:text-white">
                          {formatPrimaryDisorder(result.deepAcidBase.primaryDisorder)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-2">
                          {result.deepAcidBase.summary}
                        </p>
                      </div>
                      <div className="rounded-lg border border-slate-200 dark:border-slate-700/90 bg-white dark:bg-slate-950/40 p-3.5 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Compensação</p>
                        <p className="text-[15px] font-semibold leading-snug text-slate-900 dark:text-white">
                          {formatCompensationStatus(result.deepAcidBase.compensationStatus)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-2">
                          {result.deepAcidBase.expectedCompensation || result.deepAcidBase.observedCompensation || 'Compensação não avaliável com os dados atuais.'}
                        </p>
                      </div>
                    </div>
                    {result.deepAcidBase.compensationStatus === 'mixed_suspected' && (
                      <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 px-3.5 py-3 border border-purple-200/80 dark:border-purple-800/50">
                        <span className="font-semibold text-purple-900 dark:text-purple-200 text-xs block mb-1">Distúrbio misto suspeito</span>
                        <span className="text-purple-800 dark:text-purple-300/95 text-xs leading-relaxed">A compensação observada não corresponde à esperada, sugerindo um segundo distúrbio primário.</span>
                      </div>
                    )}
                  </div>
                </ResultCard>

                {/* Oxygenation */}
                <ResultCard title="Oxigenação e Ventilação" icon={<Activity className="w-4 h-4" />}>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Status:</span>
                      <span className="text-slate-700 dark:text-slate-300">{formatOxygenationStatus(result.deepOxygenation)}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-xs">{result.deepOxygenation.summary}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{result.deepOxygenation.physiologicalExplanation}</p>
                    {result.deepOxygenation.fio2Context && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">{result.deepOxygenation.fio2Context}</p>
                    )}
                    {result.deepOxygenation.limitationNote && (
                      <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                        {result.deepOxygenation.limitationNote}
                      </div>
                    )}
                    
                    {result.deepOxygenation.suspectedMechanism && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-100 dark:border-blue-800/50">
                        <span className="font-semibold text-blue-900 dark:text-blue-300 block mb-0.5">Mecanismo Suspeito:</span>
                        <span className="text-blue-800 dark:text-blue-400 text-xs">{result.deepOxygenation.suspectedMechanism}</span>
                      </div>
                    )}
                  </div>
                </ResultCard>

                {/* Electrolytes */}
                {result.deepElectrolytes && result.deepElectrolytes.length > 0 && (
                  <div className="md:col-span-2">
                    <ResultCard title="Eletrólitos e Metabólitos" icon={<Activity className="w-4 h-4" />}>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{result.electrolyteSummary}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {result.deepElectrolytes.map((el, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="font-semibold text-sm text-slate-900 dark:text-white">{el.parameter}</span>
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                el.status === 'low' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" :
                                el.status === 'high' ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" :
                                "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                              )}>
                                {el.value} ({el.status === 'low' ? 'Baixo' : el.status === 'high' ? 'Alto' : 'Normal'})
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{el.clinicalExplanation}</p>
                          </div>
                        ))}
                      </div>
                    </ResultCard>
                  </div>
                )}

                {/* Clinical Hypotheses & Action Plan */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.clinicalHypotheses.length > 0 && (
                    <ResultCard title="Hipóteses Clínicas" icon={<Stethoscope className="w-4 h-4" />}>
                      <ul className="list-disc pl-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                        {result.clinicalHypotheses.map((hyp, idx) => (
                          <li key={idx}>{hyp}</li>
                        ))}
                      </ul>
                    </ResultCard>
                  )}

                  <ResultCard title="Plano de Ação" icon={<CheckCircle2 className="w-4 h-4" />}>
                    <div className="space-y-3">
                      {result.clinicalActions.immediate.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-xs uppercase text-red-600 dark:text-red-400 mb-1">Ações Imediatas</h4>
                          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                            {result.clinicalActions.immediate.map((action, idx) => <li key={idx}>{action}</li>)}
                          </ul>
                        </div>
                      )}
                      {result.clinicalActions.serial.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-xs uppercase text-blue-600 dark:text-blue-400 mb-1">Monitoramento</h4>
                          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                            {result.clinicalActions.serial.map((action, idx) => <li key={idx}>{action}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  </ResultCard>
                </div>

                {/* Step by Step Logic */}
                <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4" />
                    Raciocínio Clínico Passo a Passo
                  </h3>
                  <ol className="space-y-2 list-decimal list-inside text-xs text-slate-600 dark:text-slate-400">
                    {result.stepByStepLogic.map((step, idx) => (
                      <li key={idx} className="pl-1 leading-relaxed">{step}</li>
                    ))}
                  </ol>
                  
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Base Fisiológica</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{result.expandedPhysiology}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Helper Components ---

function InputField({ label, unit, value, onChange, tooltip, parsedField, hint }: { label: string, unit?: string, value: any, onChange: (v: any) => void, tooltip?: string, parsedField?: ParsedField, hint?: string }) {
  const confidenceClass = parsedField?.confidence === 'low'
    ? 'border-amber-400 dark:border-amber-600 bg-amber-50/60 dark:bg-amber-950/30'
    : parsedField?.confidence === 'medium'
      ? 'border-blue-300 dark:border-blue-700 bg-blue-50/40 dark:bg-blue-950/20'
      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950';

  return (
    <div>
      <label className="flex items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
        {label}
        {tooltip && <TooltipIcon content={tooltip} />}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="number"
          step="any"
          value={value === undefined ? '' : value}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
          className={cn("block w-full rounded-md text-slate-900 dark:text-slate-100 focus:border-purple-500 focus:ring-purple-500 text-sm pr-10 py-1.5", confidenceClass)}
          placeholder="--"
        />
        {unit && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <span className="text-slate-400 dark:text-slate-500 text-[10px]">{unit}</span>
          </div>
        )}
      </div>
      {(parsedField || hint) && (
        <p className="mt-1 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
          {parsedField ? `OCR/parser: ${parsedField.confidence === 'high' ? 'alta confianca' : parsedField.confidence === 'medium' ? 'confianca intermediaria' : 'baixa confianca'}${parsedField.normalizedDisplay ? `, ${parsedField.normalizedDisplay}` : ''}. ` : ''}{hint || ''}
        </p>
      )}
    </div>
  );
}

function CheckboxField({ label, checked, onChange }: { label: string, checked: boolean, onChange: (c: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 bg-white dark:bg-slate-900 dark:border-slate-700"
      />
      <span className="text-xs text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  );
}

function TooltipIcon({ content }: { content: string }) {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button type="button" className="ml-1 text-slate-400 hover:text-purple-500 focus:outline-none">
            <HelpCircle className="w-3 h-3" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs rounded-md bg-slate-900 px-3 py-2 text-xs text-white shadow-md animate-in fade-in zoom-in-95"
            sideOffset={4}
          >
            {content}
            <Tooltip.Arrow className="fill-slate-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

function ResultCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 h-full">
      <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
        {icon}
        {title}
      </h3>
      <div className="text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </div>
  );
}

function formatRulerValue(paramName: string, n: number): string {
  const isPh = paramName.toLowerCase().includes('ph') && !paramName.includes('CO');
  if (isPh) return n.toFixed(2);
  if (paramName.includes('HCO')) return Number.isInteger(n) ? String(n) : n.toFixed(1);
  return String(Math.round(n));
}

function formatRulerRef(paramName: string, n: number): string {
  const isPh = paramName.toLowerCase().includes('ph') && !paramName.includes('CO');
  if (isPh) return n.toFixed(2);
  if (paramName.includes('HCO')) return n % 1 === 0 ? String(n) : n.toFixed(1);
  return String(Math.round(n));
}

function VisualRuler({
  paramName,
  unit,
  value,
  min,
  max,
  normalLow,
  normalHigh,
}: {
  paramName: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  normalLow: number;
  normalHigh: number;
}) {
  const span = max - min;
  const percentage = span <= 0 ? 50 : Math.min(Math.max(((value - min) / span) * 100, 0), 100);
  const normalLowPercent = ((normalLow - min) / span) * 100;
  const normalHighPercent = ((normalHigh - min) / span) * 100;
  const normalWidth = Math.max(normalHighPercent - normalLowPercent, 0.5);

  const status: 'low' | 'normal' | 'high' =
    value < normalLow ? 'low' : value > normalHigh ? 'high' : 'normal';

  const statusStyles = {
    low: {
      badge: 'bg-sky-100 text-sky-900 dark:bg-sky-950/80 dark:text-sky-100 ring-1 ring-sky-400/40',
      needle: 'bg-sky-500',
      dot: 'bg-sky-500',
      label: 'text-sky-700 dark:text-sky-300',
    },
    normal: {
      badge: 'bg-emerald-100 text-emerald-950 dark:bg-emerald-950/70 dark:text-emerald-50 ring-1 ring-emerald-500/35',
      needle: 'bg-emerald-500',
      dot: 'bg-emerald-500',
      label: 'text-emerald-800 dark:text-emerald-300',
    },
    high: {
      badge: 'bg-red-100 text-red-950 dark:bg-red-950/70 dark:text-red-50 ring-1 ring-red-400/40',
      needle: 'bg-red-500',
      dot: 'bg-red-500',
      label: 'text-red-800 dark:text-red-300',
    },
  } as const;

  const s = statusStyles[status];
  const vrLabel = `${formatRulerRef(paramName, normalLow)}–${formatRulerRef(paramName, normalHigh)}`;
  const ariaLabel = `${paramName}: ${formatRulerValue(paramName, value)}${unit ? ` ${unit}` : ''}. Referência ${vrLabel}.`;

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1 mb-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xs font-bold tracking-wide text-slate-800 dark:text-slate-100">{paramName}</span>
            {unit ? (
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{unit}</span>
            ) : null}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
            VR <span className="font-medium text-slate-600 dark:text-slate-300">{vrLabel}</span>
            <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
            escala {formatRulerRef(paramName, min)}–{formatRulerRef(paramName, max)}
          </p>
        </div>
        <div
          className={cn('tabular-nums rounded-md px-2.5 py-1 text-sm font-bold tracking-tight shrink-0', s.badge)}
          title="Somente leitura — valor informado na gasometria"
        >
          {formatRulerValue(paramName, value)}
          {unit ? <span className="text-[10px] font-semibold opacity-80 ml-1">{unit}</span> : null}
        </div>
      </div>

      <div
        className="relative"
        role="img"
        aria-label={ariaLabel}
      >
        <div className="relative h-3 w-full overflow-visible rounded-full bg-slate-200/90 dark:bg-slate-800/90 ring-1 ring-inset ring-slate-300/50 dark:ring-slate-700/60">
          {/* Faixa abaixo da normal (sutil) */}
          <div
            className="absolute inset-y-0 left-0 rounded-l-full bg-slate-300/35 dark:bg-slate-700/40"
            style={{ width: `${Math.max(normalLowPercent, 0)}%` }}
            aria-hidden
          />
          {/* Faixa acima da normal */}
          <div
            className="absolute inset-y-0 right-0 rounded-r-full bg-slate-300/35 dark:bg-slate-700/40"
            style={{ width: `${Math.max(100 - normalHighPercent, 0)}%` }}
            aria-hidden
          />
          <div
            className="absolute inset-y-0 bg-emerald-400/35 dark:bg-emerald-500/25 border-x border-emerald-500/45 dark:border-emerald-400/30"
            style={{ left: `${normalLowPercent}%`, width: `${normalWidth}%` }}
            aria-hidden
          />
          {/* Marcadores nos limites da VR */}
          <div
            className="absolute top-0 bottom-0 w-px bg-emerald-600/55 dark:bg-emerald-400/45 z-[1]"
            style={{ left: `${normalLowPercent}%`, transform: 'translateX(-50%)' }}
            aria-hidden
          />
          <div
            className="absolute top-0 bottom-0 w-px bg-emerald-600/55 dark:bg-emerald-400/45 z-[1]"
            style={{ left: `${normalHighPercent}%`, transform: 'translateX(-50%)' }}
            aria-hidden
          />

          {/* Indicador tipo medidor (agulha + topo) — não interativo */}
          <div
            className="pointer-events-none absolute top-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${percentage}%` }}
            aria-hidden
          >
            <span className={cn('mb-0.5 h-1.5 w-1.5 rounded-full border-2 border-white shadow dark:border-slate-950', s.dot)} />
            <span className={cn('h-4 w-[3px] rounded-full shadow-sm', s.needle)} />
          </div>
        </div>

        <div className="mt-1.5 flex justify-between text-[9px] font-medium tabular-nums text-slate-400 dark:text-slate-500">
          <span>{formatRulerRef(paramName, min)}</span>
          <span className={cn('text-[9px] font-semibold', s.label)}>
            {status === 'low' ? 'Abaixo da VR' : status === 'high' ? 'Acima da VR' : 'Dentro da VR'}
          </span>
          <span>{formatRulerRef(paramName, max)}</span>
        </div>
      </div>
    </div>
  );
}
