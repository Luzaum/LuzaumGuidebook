import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, CalendarDays, ClipboardList, DollarSign, PlusCircle,
  Stethoscope, Camera, TrendingUp, TrendingDown, Minus, Syringe,
  Scale, Activity, AlertTriangle, CheckCircle2, Clock, LayoutDashboard,
  Scissors, Cpu, Palette, User, ChevronRight, ChevronDown, ChevronUp,
  Trash2, Printer, FilePlus2, Eye, Phone, MapPin, Tag, Download, Paperclip,
} from 'lucide-react';
import { format, isAfter, differenceInDays, subDays } from 'date-fns';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import {
  useData, Appointment, Anamnesis, Procedure, Vaccine, WeightRecord,
} from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { APPOINTMENT_CATEGORIES } from '../constants';
import { dvPath } from '../DadosVeterinariosModule';
import { Modal } from '../components/ui/Modal';

type PatientTab = 'Resumo' | 'Prontuário' | 'Agenda' | 'Financeiro';
type DiscountMode = 'value' | 'percent';
type PaymentMethod = 'Dinheiro' | 'PIX' | 'Cartão de Crédito' | 'Cartão de Débito';
type VaccineBoostOption = 'manual' | '2w' | '4w' | '6w' | '8w' | '1y';

type LaunchLine = {
  id: string;
  serviceId: string;
  serviceSearch: string;
  quantity: number;
  unitPrice: number;
  discountMode: DiscountMode;
  discountValue: number;
};

const currency = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
const randomId = () => Math.random().toString(36).slice(2, 10);

const parseWeightNumber = (weight: string | undefined) => {
  if (!weight) return 0;
  const numeric = Number(weight.replace(/[^0-9.,]/g, '').replace(',', '.'));
  return Number.isFinite(numeric) ? numeric : 0;
};

/** format() seguro — retorna fallback se data for inválida */
const safeFormat = (date: Date | string | null | undefined, fmt: string, fallback = '—'): string => {
  try {
    if (!date) return fallback;
    const d = new Date(date as any);
    if (isNaN(d.getTime())) return fallback;
    return format(d, fmt);
  } catch {
    return fallback;
  }
};

/** Converte valor de input[type=date] para Date, guardando contra string vazia */
const parseDateInput = (value: string): Date | undefined =>
  value ? new Date(value) : undefined;

const calcNextDueDateFromBoost = (baseDate: Date, boost: VaccineBoostOption): Date | undefined => {
  if (boost === 'manual') return undefined;
  const next = new Date(baseDate);
  if (boost === '1y') {
    next.setFullYear(next.getFullYear() + 1);
    return next;
  }
  const weeksMap: Record<Exclude<VaccineBoostOption, 'manual' | '1y'>, number> = { '2w': 2, '4w': 4, '6w': 6, '8w': 8 };
  next.setDate(next.getDate() + weeksMap[boost] * 7);
  return next;
};

type PatientDetailsDraft = {
  activeTab: PatientTab;
  showEvolucaoForm: boolean;
  showVacinaForm: boolean;
  showPesoForm: boolean;
  showProcForm: boolean;
  vaccineForm: Partial<Vaccine>;
  vaccinePrice: number;
  weightInput: number;
  weightNotes: string;
  anamnesisForm: Partial<Anamnesis>;
  procedureForm: Partial<Procedure>;
  agendaForm: Partial<Appointment>;
  agendaTime: string;
  launchLines: LaunchLine[];
  globalDiscountMode: DiscountMode;
  globalDiscountValue: number;
};

const toDateValue = (value: unknown, fallback = new Date()) => {
  const parsed = value ? new Date(value as string | number | Date) : fallback;
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
};

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

// ── Shared primitives ────────────────────────────────────────────────────────
const TabButton = ({
  active, label, icon, onClick,
}: { active: boolean; label: PatientTab; icon: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
      active
        ? 'border-primary text-primary'
        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-primary hover:border-primary/40'
    }`}
  >
    {icon}{label}
  </button>
);

const StatusBadge = ({ status }: { status: Appointment['status'] }) => {
  const map: Record<string, string> = {
    Agendado: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    Confirmado: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    Concluído: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
    Cancelado: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  };
  return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${map[status] ?? map.Agendado}`}>{status}</span>;
};

const WeightTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200">{label}</p>
      <p className="text-primary font-bold mt-1">{payload[0].value} kg</p>
      {payload[0].payload.notes && <p className="text-gray-500 text-xs mt-0.5">{payload[0].payload.notes}</p>}
    </div>
  );
};

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <article className={`dv-glass-card rounded-2xl border border-gray-200/70 dark:border-gray-700/70 bg-white/90 dark:bg-gray-900/75 backdrop-blur-md transition-all duration-300 hover:-translate-y-[1px] ${className}`}>
    {children}
  </article>
);

const ic = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm';
const lc = 'block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide';

// ── Vaccine status helper ────────────────────────────────────────────────────
const vaccineStatus = (v: Vaccine): { label: string; cls: string; dot: string } => {
  if (!v.nextDueDate) return { label: 'Sem reforço', dot: 'bg-gray-300 dark:bg-gray-600', cls: 'text-gray-400' };
  const due = new Date(v.nextDueDate);
  if (isAfter(due, new Date())) {
    const days = differenceInDays(due, new Date());
    return { label: days <= 30 ? `Vence em ${days}d` : 'Em dia', dot: 'bg-green-500', cls: 'text-green-600 dark:text-green-400' };
  }
  const late = differenceInDays(new Date(), due);
  return { label: `Atrasada ${late}d`, dot: 'bg-orange-500', cls: 'text-orange-500' };
};

// ── Procedure type badge ─────────────────────────────────────────────────────
const ProcBadge = ({ type }: { type?: string }) => {
  const map: Record<string, string> = {
    Exame: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    Procedimento: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300',
    Cirurgia: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300',
  };
  const t = type || 'Procedimento';
  return <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${map[t] ?? map.Procedimento}`}>{t}</span>;
};

// ─────────────────────────────────────────────────────────────────────────────
export const PatientDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    patients, tutors, services, appointments, financialRecords,
    getTutorName, updatePatient, addAppointment, addFinancialRecord, updateFinancialRecord,
  } = useData();
  const { currentUser, selectedClinicId, getVeterinariansForSelection } = useClinicAuth();

  const patient = useMemo(() => patients.find((p) => p.id === id), [patients, id]);
  const tutor = useMemo(() => tutors.find((t) => t.id === patient?.tutorId), [tutors, patient]);
  const veterinarianOptions = getVeterinariansForSelection();

  // ── UI state
  const [activeTab, setActiveTab] = useState<PatientTab>('Resumo');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [expandedAnamnesis, setExpandedAnamnesis] = useState<Set<string>>(new Set());
  const [showEvolucaoForm, setShowEvolucaoForm] = useState(false);
  const [showVacinaForm, setShowVacinaForm] = useState(false);
  const [showPesoForm, setShowPesoForm] = useState(false);
  const [showProcForm, setShowProcForm] = useState(false);
  const [expandedProc, setExpandedProc] = useState<string | null>(null);
  const [focusedServiceLineId, setFocusedServiceLineId] = useState<string | null>(null);
  const [draftReady, setDraftReady] = useState(false);

  // ── Forms
  const [vaccineForm, setVaccineForm] = useState<Partial<Vaccine>>({ name: '', date: new Date(), batch: '', nextDueDate: undefined });
  const [vaccineBoost, setVaccineBoost] = useState<VaccineBoostOption>('manual');
  const [vaccinePrice, setVaccinePrice] = useState(0);
  const [weightInput, setWeightInput] = useState(() => parseWeightNumber(patient?.weight) || 0);
  const [weightNotes, setWeightNotes] = useState('');
  const [anamnesisForm, setAnamnesisForm] = useState<Partial<Anamnesis>>({ date: new Date(), complaint: '', history: '', systemsReview: '', diagnosis: '', treatment: '' });
  const [procedureForm, setProcedureForm] = useState<Partial<Procedure>>({ date: new Date(), name: '', type: 'Procedimento', notes: '', price: 0, fileUrl: undefined, fileName: undefined });
  const [agendaForm, setAgendaForm] = useState<Partial<Appointment>>({
    title: patient ? `Consulta - ${patient.name}` : '',
    date: new Date(), type: 'Consulta Geral', status: 'Agendado', notes: '', veterinarianName: currentUser.name,
  });
  const [agendaTime, setAgendaTime] = useState('09:00');
  const [launchLines, setLaunchLines] = useState<LaunchLine[]>([
    { id: randomId(), serviceId: '', serviceSearch: '', quantity: 1, unitPrice: 0, discountMode: 'value', discountValue: 0 },
  ]);
  const [globalDiscountMode, setGlobalDiscountMode] = useState<DiscountMode>('value');
  const [globalDiscountValue, setGlobalDiscountValue] = useState(0);
  const [paymentModalRecordId, setPaymentModalRecordId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX');
  const [paymentTransactionId, setPaymentTransactionId] = useState('');
  const [paymentProofUrl, setPaymentProofUrl] = useState<string | undefined>(undefined);
  const [paymentProofName, setPaymentProofName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const tabParam = new URLSearchParams(location.search).get('tab');
    if (!tabParam) return;
    const normalized = normalizeText(tabParam);
    if (normalized === normalizeText('Resumo')) setActiveTab('Resumo');
    if (normalized === normalizeText('Prontuário')) setActiveTab('Prontuário');
    if (normalized === normalizeText('Agenda')) setActiveTab('Agenda');
    if (normalized === normalizeText('Financeiro')) setActiveTab('Financeiro');
  }, [location.search]);

  // ── Derived
  const patientAppointments = useMemo(
    () => appointments.filter((a) => a.patientId === patient?.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [appointments, patient],
  );
  const patientFinancial = useMemo(
    () => financialRecords.filter((r) => r.patientId === patient?.id && r.type === 'Receita').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [financialRecords, patient],
  );
  const pendingDebt = useMemo(() => patientFinancial.filter((r) => r.status === 'Pendente').reduce((s, r) => s + r.amount, 0), [patientFinancial]);
  const selectedPaymentRecord = useMemo(
    () => patientFinancial.find((record) => record.id === paymentModalRecordId) || null,
    [patientFinancial, paymentModalRecordId],
  );
  const weightHistory = useMemo(() => {
    const sorted = [...(patient?.weightHistory || [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const baseline = parseWeightNumber(patient?.weight);
    if (baseline <= 0) return sorted;
    if (sorted.length === 0) {
      return [{ id: `baseline-${patient?.id || 'unknown'}`, date: new Date(), weight: baseline, notes: 'Peso inicial (cadastro)' }];
    }
    const first = sorted[0];
    if (Math.abs(first.weight - baseline) <= 0.001) return sorted;
    return [{ id: `baseline-${patient?.id || 'unknown'}`, date: subDays(new Date(first.date), 1), weight: baseline, notes: 'Peso inicial (cadastro)' }, ...sorted];
  }, [patient]);
  const weightChartData = useMemo(() => weightHistory.map((r) => ({ date: safeFormat(r.date, 'dd/MM/yy'), weight: r.weight, notes: r.notes })), [weightHistory]);
  const weightTrend = useMemo(() => {
    if (weightHistory.length < 2) return null;
    const delta = weightHistory[weightHistory.length - 1].weight - weightHistory[0].weight;
    return { delta, direction: delta > 0 ? 'up' : delta < 0 ? 'down' : 'stable' as const };
  }, [weightHistory]);
  const launchPreview = useMemo(() => {
    const rows = launchLines.map((line) => {
      const service = services.find((s) => s.id === line.serviceId);
      if (!service || line.quantity <= 0) return null;
      const gross = line.quantity * line.unitPrice;
      const itemDiscount = line.discountMode === 'percent' ? Math.min(gross, (gross * Math.max(0, line.discountValue)) / 100) : Math.min(gross, Math.max(0, line.discountValue));
      return { line, service, subtotal: Math.max(0, gross - itemDiscount) };
    }).filter(Boolean) as { line: LaunchLine; service: (typeof services)[number]; subtotal: number }[];
    const subtotal = rows.reduce((s, r) => s + r.subtotal, 0);
    const globalDiscount = globalDiscountMode === 'percent' ? Math.min(subtotal, (subtotal * Math.max(0, globalDiscountValue)) / 100) : Math.min(subtotal, Math.max(0, globalDiscountValue));
    return { rows, subtotal, globalDiscount, total: Math.max(0, subtotal - globalDiscount) };
  }, [launchLines, services, globalDiscountMode, globalDiscountValue]);

  const maxWeight = useMemo(() => Math.max(...weightHistory.map((w) => w.weight), 1), [weightHistory]);
  const vaccinesOverdue = (patient?.vaccines || []).filter((v) => v.nextDueDate && !isAfter(new Date(v.nextDueDate), new Date())).length;
  const speciesLabel = patient?.species === 'Canino' || patient?.species === 'Cão' ? 'Canino' : 'Felino';
  const patientDraftKey = patient?.id ? `dv:patient-details:draft:${patient.id}` : null;

  useEffect(() => {
    if (!patientDraftKey) {
      setDraftReady(false);
      return;
    }
    setDraftReady(false);
    try {
      const raw = window.localStorage.getItem(patientDraftKey);
      if (!raw) {
        setDraftReady(true);
        return;
      }
      const parsed = JSON.parse(raw) as Partial<PatientDetailsDraft>;
      if (parsed.activeTab) setActiveTab(parsed.activeTab);
      if (typeof parsed.showEvolucaoForm === 'boolean') setShowEvolucaoForm(parsed.showEvolucaoForm);
      if (typeof parsed.showVacinaForm === 'boolean') setShowVacinaForm(parsed.showVacinaForm);
      if (typeof parsed.showPesoForm === 'boolean') setShowPesoForm(parsed.showPesoForm);
      if (typeof parsed.showProcForm === 'boolean') setShowProcForm(parsed.showProcForm);
      if (parsed.vaccineForm) {
        setVaccineForm({
          ...parsed.vaccineForm,
          date: toDateValue(parsed.vaccineForm.date),
          nextDueDate: parsed.vaccineForm.nextDueDate ? toDateValue(parsed.vaccineForm.nextDueDate) : undefined,
        });
      }
      if (typeof parsed.vaccinePrice === 'number') setVaccinePrice(parsed.vaccinePrice);
      if (typeof parsed.weightInput === 'number') setWeightInput(parsed.weightInput);
      if (typeof parsed.weightNotes === 'string') setWeightNotes(parsed.weightNotes);
      if (parsed.anamnesisForm) setAnamnesisForm({ ...parsed.anamnesisForm, date: toDateValue(parsed.anamnesisForm.date) });
      if (parsed.procedureForm) setProcedureForm({ ...parsed.procedureForm, date: toDateValue(parsed.procedureForm.date) });
      if (parsed.agendaForm) setAgendaForm({ ...parsed.agendaForm, date: toDateValue(parsed.agendaForm.date) });
      if (typeof parsed.agendaTime === 'string') setAgendaTime(parsed.agendaTime);
      if (Array.isArray(parsed.launchLines) && parsed.launchLines.length) {
        setLaunchLines(
          parsed.launchLines.map((line) => ({
            ...line,
            serviceSearch: line.serviceSearch || '',
          })),
        );
      }
      if (parsed.globalDiscountMode) setGlobalDiscountMode(parsed.globalDiscountMode);
      if (typeof parsed.globalDiscountValue === 'number') setGlobalDiscountValue(parsed.globalDiscountValue);
    } catch (error) {
      console.warn('[PatientDetails] Failed to hydrate draft:', error);
    } finally {
      setDraftReady(true);
    }
  }, [patientDraftKey]);

  useEffect(() => {
    if (!patientDraftKey || !draftReady) return;
    const payload: PatientDetailsDraft = {
      activeTab,
      showEvolucaoForm,
      showVacinaForm,
      showPesoForm,
      showProcForm,
      vaccineForm,
      vaccinePrice,
      weightInput,
      weightNotes,
      anamnesisForm,
      procedureForm,
      agendaForm,
      agendaTime,
      launchLines,
      globalDiscountMode,
      globalDiscountValue,
    };
    try {
      window.localStorage.setItem(patientDraftKey, JSON.stringify(payload));
    } catch (error) {
      console.warn('[PatientDetails] Failed to persist draft:', error);
    }
  }, [
    patientDraftKey,
    draftReady,
    activeTab,
    showEvolucaoForm,
    showVacinaForm,
    showPesoForm,
    showProcForm,
    vaccineForm,
    vaccinePrice,
    weightInput,
    weightNotes,
    anamnesisForm,
    procedureForm,
    agendaForm,
    agendaTime,
    launchLines,
    globalDiscountMode,
    globalDiscountValue,
  ]);

  if (!patient) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center">
        <AlertTriangle size={40} className="mx-auto text-amber-400 mb-3" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Paciente não encontrado</h2>
        <button onClick={() => navigate(dvPath('patients'))} className="mt-4 px-4 py-2 rounded-xl bg-primary text-white font-semibold">Voltar</button>
      </div>
    );
  }

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updatePatient(patient.id, { imageUrl: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const toggleAnamnesis = (entryId: string) =>
    setExpandedAnamnesis((prev) => {
      const next = new Set(prev);
      next.has(entryId) ? next.delete(entryId) : next.add(entryId);
      return next;
    });

  const saveVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaccineForm.name) return;
    const appliedDate = vaccineForm.date || new Date();
    const nextDueDate = vaccineBoost === 'manual' ? vaccineForm.nextDueDate : calcNextDueDateFromBoost(appliedDate, vaccineBoost);
    const vaccine: Vaccine = { id: randomId(), name: vaccineForm.name, date: appliedDate, nextDueDate, batch: vaccineForm.batch, veterinarian: currentUser.name };
    updatePatient(patient.id, { vaccines: [...(patient.vaccines || []), vaccine] });
    if (vaccinePrice > 0) addFinancialRecord({ id: randomId(), clinicId: selectedClinicId === 'all' ? patient.clinicId : selectedClinicId, description: `Vacina ${vaccine.name} — ${patient.name} [Paciente ${patient.id}]`, amount: vaccinePrice, type: 'Receita', category: 'Vacinas', date: new Date(vaccine.date), status: 'Pendente', patientId: patient.id });
    setVaccineForm({ name: '', date: new Date(), batch: '', nextDueDate: undefined });
    setVaccineBoost('manual');
    setVaccinePrice(0);
    setShowVacinaForm(false);
  };

  const saveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (weightInput <= 0) return;
    const previousWeight = parseWeightNumber(patient.weight);
    const previousHistory = [...(patient.weightHistory || [])];
    const withBaseline =
      previousHistory.length === 0 && previousWeight > 0 && Math.abs(previousWeight - weightInput) > 0.001
        ? [...previousHistory, { id: randomId(), date: subDays(new Date(), 1), weight: previousWeight, notes: 'Peso inicial (cadastro)' }]
        : previousHistory;
    const newRecord: WeightRecord = { id: randomId(), date: new Date(), weight: weightInput, notes: weightNotes || undefined };
    const history = [...withBaseline, newRecord].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    updatePatient(patient.id, { weightHistory: history, weight: `${weightInput.toFixed(1)}kg` });
    setWeightNotes('');
    setShowPesoForm(false);
  };

  const saveAnamnesis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anamnesisForm.complaint) return;
    const entry: Anamnesis = { id: randomId(), date: anamnesisForm.date || new Date(), complaint: anamnesisForm.complaint, history: anamnesisForm.history || '', systemsReview: anamnesisForm.systemsReview, diagnosis: anamnesisForm.diagnosis, treatment: anamnesisForm.treatment };
    updatePatient(patient.id, { anamnesis: [entry, ...(patient.anamnesis || [])] });
    setAnamnesisForm({ date: new Date(), complaint: '', history: '', systemsReview: '', diagnosis: '', treatment: '' });
    setShowEvolucaoForm(false);
    setExpandedAnamnesis((prev) => new Set([entry.id, ...prev]));
  };

  const saveProcedure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!procedureForm.name) return;
    const entry: Procedure = { id: randomId(), date: procedureForm.date || new Date(), name: procedureForm.name, type: (procedureForm.type || 'Procedimento') as Procedure['type'], notes: procedureForm.notes, veterinarian: currentUser.name, price: Number(procedureForm.price || 0), fileUrl: procedureForm.fileUrl, fileName: procedureForm.fileName };
    updatePatient(patient.id, { procedures: [entry, ...(patient.procedures || [])] });
    if ((entry.price || 0) > 0) addFinancialRecord({ id: randomId(), clinicId: selectedClinicId === 'all' ? patient.clinicId : selectedClinicId, description: `${entry.type}: ${entry.name} — ${patient.name} [Paciente ${patient.id}]`, amount: Number(entry.price), type: 'Receita', category: entry.type === 'Exame' ? 'Exames' : entry.type === 'Cirurgia' ? 'Cirurgias' : 'Procedimentos', date: new Date(entry.date), status: 'Pendente', patientId: patient.id });
    setProcedureForm({ date: new Date(), name: '', type: 'Procedimento', notes: '', price: 0, fileUrl: undefined, fileName: undefined });
    setShowProcForm(false);
  };

  const savePatientAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agendaForm.title || !agendaForm.type || !agendaForm.veterinarianName || !agendaForm.date) return;
    const [h, m] = agendaTime.split(':').map(Number);
    const date = new Date(agendaForm.date);
    date.setHours(h, m, 0, 0);
    addAppointment({ id: randomId(), clinicId: selectedClinicId === 'all' ? patient.clinicId : selectedClinicId, title: agendaForm.title, date, patientId: patient.id, tutorId: patient.tutorId, veterinarianName: agendaForm.veterinarianName, type: agendaForm.type, status: 'Agendado', notes: agendaForm.notes });
  };

  const updateLine = (lineId: string, payload: Partial<LaunchLine>) =>
    setLaunchLines((prev) => prev.map((line) => {
      if (line.id !== lineId) return line;
      const next = { ...line, ...payload };
      if (payload.serviceId !== undefined) {
        const svc = services.find((s) => s.id === payload.serviceId);
        if (svc) {
          next.unitPrice = svc.price;
          next.serviceSearch = svc.name;
        } else if (!payload.serviceId) {
          next.serviceId = '';
        }
      }
      return next;
    }));

  const getServiceMatches = (query: string) => {
    const normalized = normalizeText(query.trim());
    if (!normalized) return services.slice(0, 8);
    return services
      .filter((service) =>
        [service.name, service.category, service.description]
          .filter(Boolean)
          .some((part) => normalizeText(part).includes(normalized)),
      )
      .slice(0, 8);
  };

  const handleServiceQueryChange = (lineId: string, value: string) => {
    const exact = services.find((service) => normalizeText(service.name) === normalizeText(value.trim()));
    if (exact) {
      updateLine(lineId, { serviceId: exact.id, serviceSearch: exact.name });
      return;
    }
    updateLine(lineId, { serviceId: '', serviceSearch: value });
  };

  const pickServiceForLine = (lineId: string, serviceId: string) => {
    updateLine(lineId, { serviceId });
    setFocusedServiceLineId(null);
  };

  const launchServices = () => {
    if (!launchPreview.rows.length) return;
    const subtotal = launchPreview.rows.reduce((s, r) => s + r.subtotal, 0) || 1;
    launchPreview.rows.forEach((row) => {
      const prop = (row.subtotal / subtotal) * launchPreview.globalDiscount;
      addFinancialRecord({ id: randomId(), clinicId: selectedClinicId === 'all' ? patient.clinicId : selectedClinicId, description: `${row.service.name} x${row.line.quantity} — ${patient.name} [Paciente ${patient.id}]`, amount: Number(Math.max(0, row.subtotal - prop).toFixed(2)), type: 'Receita', category: row.service.category, date: new Date(), status: 'Pendente', patientId: patient.id });
    });
    setLaunchLines([{ id: randomId(), serviceId: '', serviceSearch: '', quantity: 1, unitPrice: 0, discountMode: 'value', discountValue: 0 }]);
    setGlobalDiscountMode('value');
    setGlobalDiscountValue(0);
  };

  const handleProcedureFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProcedureForm((prev) => ({
        ...prev,
        fileUrl: ev.target?.result as string,
        fileName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const openPaymentModal = (recordId: string) => {
    const record = patientFinancial.find((item) => item.id === recordId);
    if (!record) return;
    setPaymentModalRecordId(recordId);
    setPaymentMethod(record.paymentMethod || 'PIX');
    setPaymentTransactionId(record.transactionId || '');
    setPaymentProofUrl(record.paymentProofUrl);
    setPaymentProofName(record.paymentProofName);
  };

  const handlePaymentProofFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPaymentProofUrl(ev.target?.result as string);
      setPaymentProofName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const settleSale = () => {
    if (!selectedPaymentRecord) return;
    updateFinancialRecord(selectedPaymentRecord.id, {
      status: 'Pago',
      paymentMethod,
      transactionId: paymentTransactionId.trim() || undefined,
      paymentProofUrl,
      paymentProofName,
      paidAt: new Date(),
    });
    setPaymentModalRecordId(null);
    setPaymentTransactionId('');
    setPaymentProofUrl(undefined);
    setPaymentProofName(undefined);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="dv-aurora-bg dv-section-enter space-y-0 max-w-[1700px] mx-auto pb-10 rounded-[28px] p-3 md:p-5">

      {/* ── Breadcrumb & Tabs ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0 mb-5">
        <Link to={dvPath('patients')} className="inline-flex items-center gap-1.5 text-gray-400 hover:text-primary text-xs font-medium mb-3">
          <ArrowLeft size={13} /> Voltar para pacientes
        </Link>
        <div className="flex items-center gap-0 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {([
            { label: 'Resumo', icon: <LayoutDashboard size={14} /> },
            { label: 'Prontuário', icon: <ClipboardList size={14} /> },
            { label: 'Agenda', icon: <CalendarDays size={14} /> },
            { label: 'Financeiro', icon: <DollarSign size={14} /> },
          ] as { label: PatientTab; icon: React.ReactNode }[]).map(({ label, icon }) => (
            <TabButton key={label} label={label} icon={icon} active={activeTab === label} onClick={() => setActiveTab(label)} />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: RESUMO
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'Resumo' && (
        <section className="space-y-5">
          <Card className="p-6 flex flex-col lg:flex-row gap-6">
            {/* Photo */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="relative group">
                <img
                  src={patient.imageUrl || patient.image || `https://images.unsplash.com/photo-${speciesLabel === 'Canino' ? '1552053831-71594a27632d' : '1514888286974-6c03e2ca1dba'}?auto=format&fit=crop&w=200&h=200`}
                  alt={patient.name}
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-gray-100 dark:ring-gray-800"
                />
                <button onClick={() => imageInputRef.current?.click()} className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white" title="Alterar foto">
                  <Camera size={22} />
                </button>
              </div>
              <button onClick={() => imageInputRef.current?.click()} className="text-xs text-primary font-medium hover:underline">Alterar foto</button>
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{patient.name}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{speciesLabel} · {patient.breed} · {patient.age}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {patient.status === 'Vivo' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />Ativo</span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-semibold">Óbito</span>
                  )}
                  {patient.castrated && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-semibold"><Scissors size={11} />Castrado(a)</span>}
                  {patient.microchipped && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold"><Cpu size={11} />Microchipado(a)</span>}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div><p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Sexo</p><p className="text-sm font-medium text-gray-900 dark:text-white">{patient.sex || patient.gender || '—'}</p></div>
                {patient.coatColor && <div><p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Pelagem</p><p className="text-sm font-medium text-gray-900 dark:text-white">{patient.coatColor}</p></div>}
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Tutor</p>
                  {tutor ? <Link to={dvPath(`tutors/${tutor.id}`)} className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"><User size={12} />{tutor.name}</Link> : <span className="text-sm text-gray-500">—</span>}
                </div>
                {tutor?.phone && <div><p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Tel. tutor</p><p className="text-sm font-medium text-gray-900 dark:text-white">{tutor.phone}</p></div>}
              </div>
              {pendingDebt > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-semibold">
                  <AlertTriangle size={15} />Saldo devedor: {currency(pendingDebt)}
                </div>
              )}
            </div>
            {/* Actions */}
            <div className="flex flex-col gap-2 shrink-0">
              <button onClick={() => navigate(dvPath(`patients/${patient.id}/consulta`))} className="px-4 py-2.5 rounded-xl bg-primary text-white font-semibold inline-flex items-center gap-2 hover:bg-primary/90 shadow-md shadow-primary/25">
                <Stethoscope size={15} />Nova Consulta
              </button>
              <button onClick={() => { setActiveTab('Prontuário'); setShowEvolucaoForm(true); }} className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                Registrar Vacina / Procedimento
              </button>
              <button onClick={() => setActiveTab('Agenda')} className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                Agendar Consulta
              </button>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Peso atual', value: patient.weight || '—', extra: weightTrend ? (<p className={`text-xs font-semibold flex items-center gap-1 mt-0.5 ${weightTrend.direction === 'up' ? 'text-amber-600' : weightTrend.direction === 'down' ? 'text-blue-600' : 'text-gray-400'}`}>{weightTrend.direction === 'up' ? <TrendingUp size={12} /> : weightTrend.direction === 'down' ? <TrendingDown size={12} /> : <Minus size={12} />}{weightTrend.delta > 0 ? '+' : ''}{weightTrend.delta.toFixed(1)} kg</p>) : null, icon: <Scale size={13} /> },
              { title: 'Vacinas', value: String(patient.vaccines?.length || 0), extra: vaccinesOverdue > 0 ? (<p className="text-xs text-red-600 font-semibold flex items-center gap-1"><AlertTriangle size={11} />{vaccinesOverdue} vencida(s)</p>) : null, icon: <Syringe size={13} /> },
              { title: 'Procedimentos', value: String(patient.procedures?.length || 0), extra: null, icon: <Activity size={13} /> },
              { title: 'Consultas', value: String(patientAppointments.length), extra: patientAppointments.length > 0 ? (<p className="text-xs text-gray-400">Última: {safeFormat(patientAppointments[0].date, 'dd/MM/yyyy')}</p>) : null, icon: <CalendarDays size={13} /> },
            ].map((c) => (
              <Card key={c.title} className="p-5 flex flex-col gap-1">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold flex items-center gap-1.5">{c.icon}{c.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{c.value}</p>
                {c.extra}
              </Card>
            ))}
          </div>

          {(patient.anamnesis || []).length > 0 && (
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2"><ClipboardList size={15} className="text-primary" />Últimas Consultas</h3>
                <button onClick={() => setActiveTab('Prontuário')} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">Ver todas <ChevronRight size={13} /></button>
              </div>
              <div className="space-y-2">
                {(patient.anamnesis || []).slice(0, 3).map((entry) => (
                  <div key={entry.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 rounded-xl border border-gray-100 dark:border-gray-800 p-3 bg-gray-50/50 dark:bg-gray-800/30">
                    <div><p className="font-semibold text-sm">{entry.complaint}</p>{entry.diagnosis && <p className="text-xs text-gray-500">Diag: {entry.diagnosis}</p>}</div>
                    <span className="text-xs text-gray-400">{safeFormat(entry.date, 'dd/MM/yyyy HH:mm')}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: PRONTUÁRIO  —  Layout inspirado no screenshot
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'Prontuário' && (
        <section>
          {/* ── Top action bar ────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{patient.name}</h2>
              <p className="text-xs text-gray-400">{speciesLabel} · {patient.breed} · {patient.sex || patient.gender} · {patient.weight}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Printer size={15} />Imprimir Prontuário
              </button>
              <button
                onClick={() => setShowEvolucaoForm((v) => !v)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md ${showEvolucaoForm ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white' : 'bg-primary text-white hover:bg-primary/90 shadow-primary/25'}`}
              >
                <FilePlus2 size={15} />{showEvolucaoForm ? 'Fechar formulário' : 'Nova Evolução'}
              </button>
            </div>
          </div>

          {/* ── Nova Evolução Form (collapsible) ──────────────────────────── */}
          {showEvolucaoForm && (
            <Card className="p-5 mb-5 border-primary/30 bg-primary/5 dark:bg-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><FilePlus2 size={16} className="text-primary" />Registrar nova evolução clínica</h3>
                <button onClick={() => setShowEvolucaoForm(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"><ChevronUp size={18} /></button>
              </div>
              <form onSubmit={saveAnamnesis} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className={lc}>Queixa principal *</label>
                  <input required placeholder="Ex: vômito há 2 dias, prostração, prurido intenso..." value={anamnesisForm.complaint || ''} onChange={(e) => setAnamnesisForm((p) => ({ ...p, complaint: e.target.value }))} className={ic} />
                </div>
                <div className="md:col-span-2">
                  <label className={lc}>Histórico e exame físico</label>
                  <textarea placeholder="FC, FR, Temperatura, PA, ausculta, palpação, mucosas..." value={anamnesisForm.history || ''} onChange={(e) => setAnamnesisForm((p) => ({ ...p, history: e.target.value }))} className={`${ic} min-h-[80px]`} />
                </div>
                <div>
                  <label className={lc}>Revisão de sistemas</label>
                  <textarea placeholder="Cardiovascular, respiratório, digestório, neurológico..." value={anamnesisForm.systemsReview || ''} onChange={(e) => setAnamnesisForm((p) => ({ ...p, systemsReview: e.target.value }))} className={`${ic} min-h-[64px]`} />
                </div>
                <div className="space-y-3">
                  <div>
                    <label className={lc}>Diagnóstico</label>
                    <input placeholder="Diagnóstico presuntivo ou definitivo" value={anamnesisForm.diagnosis || ''} onChange={(e) => setAnamnesisForm((p) => ({ ...p, diagnosis: e.target.value }))} className={ic} />
                  </div>
                  <div>
                    <label className={lc}>Conduta / Tratamento</label>
                    <input placeholder="Medicações, orientações, retorno..." value={anamnesisForm.treatment || ''} onChange={(e) => setAnamnesisForm((p) => ({ ...p, treatment: e.target.value }))} className={ic} />
                  </div>
                </div>
                <div className="md:col-span-2 flex gap-2 justify-end border-t border-primary/20 pt-3 mt-1">
                  <button type="button" onClick={() => setShowEvolucaoForm(false)} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">Cancelar</button>
                  <Link to={dvPath(`patients/${patient.id}/consulta`)} className="px-4 py-2 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary/5">Consulta guiada</Link>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 shadow shadow-primary/20">Salvar evolução</button>
                </div>
              </form>
            </Card>
          )}

          {/* ── Main 2-col layout ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">

            {/* ════ LEFT COLUMN ════════════════════════════════════════════ */}
            <div className="space-y-5">

              {/* Anamneses Timeline */}
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <ClipboardList size={15} className="text-primary" />
                    Anamneses e Evoluções Clínicas
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full font-normal">{(patient.anamnesis || []).length}</span>
                  </h3>
                  <button onClick={() => setShowEvolucaoForm(true)} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                    <PlusCircle size={13} />Nova
                  </button>
                </div>

                {(patient.anamnesis || []).length === 0 ? (
                  <div className="py-12 text-center text-gray-400">
                    <ClipboardList size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Nenhuma evolução registrada.</p>
                    <button onClick={() => setShowEvolucaoForm(true)} className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90">
                      <FilePlus2 size={14} />Registrar primeira evolução
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50 dark:divide-gray-800">
                    {(patient.anamnesis || []).map((entry) => {
                      const expanded = expandedAnamnesis.has(entry.id);
                      const d = new Date(entry.date);
                      return (
                        <div key={entry.id} className="group">
                          {/* Row header */}
                          <button
                            onClick={() => toggleAnamnesis(entry.id)}
                            className="w-full flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors text-left"
                          >
                            {/* Date column */}
                            <div className="shrink-0 w-[68px] text-center">
                              <p className="text-2xl font-bold text-gray-700 dark:text-gray-200 leading-none">{format(d, 'dd')}</p>
                              <p className="text-xs font-semibold text-gray-400 uppercase">{format(d, 'MMM yyyy')}</p>
                            </div>
                            {/* Divider line */}
                            <div className="flex flex-col items-center shrink-0 pt-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                              {expanded && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 mt-1" />}
                            </div>
                            {/* Content preview */}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 dark:text-white">{entry.complaint}</p>
                              {!expanded && (
                                <p className="text-xs text-gray-400 mt-0.5 truncate">
                                  {entry.history || entry.diagnosis || entry.treatment || 'Clique para expandir'}
                                </p>
                              )}
                            </div>
                            {expanded ? <ChevronUp size={16} className="text-gray-400 shrink-0 mt-0.5" /> : <ChevronDown size={16} className="text-gray-400 shrink-0 mt-0.5" />}
                          </button>

                          {/* Expanded body */}
                          {expanded && (
                            <div className="ml-[68px] pl-[24px] pr-5 pb-5 space-y-3 border-l-2 border-gray-100 dark:border-gray-800 ml-[88px]">
                              {entry.history && (
                                <div>
                                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Exame Físico / Histórico</p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{entry.history}</p>
                                </div>
                              )}
                              {entry.systemsReview && (
                                <div>
                                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Revisão de Sistemas</p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{entry.systemsReview}</p>
                                </div>
                              )}
                              {entry.diagnosis && (
                                <div>
                                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Diagnóstico</p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{entry.diagnosis}</p>
                                </div>
                              )}
                              {entry.treatment && (
                                <div>
                                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Conduta</p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{entry.treatment}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              {/* Procedures Table */}
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Activity size={15} className="text-primary" />
                    Histórico de Procedimentos
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full font-normal">{(patient.procedures || []).length}</span>
                  </h3>
                  <button onClick={() => setShowProcForm((v) => !v)} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                    <PlusCircle size={13} />{showProcForm ? 'Fechar' : 'Novo'}
                  </button>
                </div>

                {/* Proc form */}
                {showProcForm && (
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                    <form onSubmit={saveProcedure} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {/* Selecionar do catálogo */}
                      <div className="col-span-2 md:col-span-4">
                        <label className={lc}>Selecionar do catálogo de serviços</label>
                        <select
                          className={ic}
                          value=""
                          onChange={(e) => {
                            const svc = services.find((s) => s.id === e.target.value);
                            if (!svc) return;
                            const typeMap: Record<string, Procedure['type']> = {
                              'Exames Laboratoriais': 'Exame', 'Exames': 'Exame', 'Imagem': 'Exame',
                              'Cirurgias': 'Cirurgia',
                            };
                            const derivedType: Procedure['type'] = typeMap[svc.category] || 'Procedimento';
                            setProcedureForm((p) => ({ ...p, name: svc.name, price: svc.price, type: derivedType }));
                          }}
                        >
                          <option value="">— buscar serviço no catálogo —</option>
                          {services
                            .filter((s) => !['Vacinas', 'Consultas', 'Urgência e Emergência'].includes(s.category))
                            .map((s) => (
                              <option key={s.id} value={s.id}>{s.name} · {s.category} · {currency(s.price)}</option>
                            ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className={lc}>Nome *</label>
                        <input required placeholder="Ex: Hemograma, Raio-X, Castração" value={procedureForm.name || ''} onChange={(e) => setProcedureForm((p) => ({ ...p, name: e.target.value }))} className={ic} />
                      </div>
                      <div>
                        <label className={lc}>Tipo</label>
                        <select value={procedureForm.type || 'Procedimento'} onChange={(e) => setProcedureForm((p) => ({ ...p, type: e.target.value as Procedure['type'] }))} className={ic}>
                          <option>Procedimento</option><option>Exame</option><option>Cirurgia</option>
                        </select>
                      </div>
                      <div>
                        <label className={lc}>Valor (R$)</label>
                        <input type="number" min="0" step="0.01" value={procedureForm.price || 0} onChange={(e) => setProcedureForm((p) => ({ ...p, price: Math.max(0, Number(e.target.value)) }))} className={ic} />
                      </div>
                      <div className="col-span-2 md:col-span-3">
                        <label className={lc}>Observações / Resultado</label>
                        <input placeholder="Resultado, achados clínicos..." value={procedureForm.notes || ''} onChange={(e) => setProcedureForm((p) => ({ ...p, notes: e.target.value }))} className={ic} />
                      </div>
                      <div className="col-span-2 md:col-span-3">
                        <label className={lc}>Anexar exame/arquivo (PDF ou imagem)</label>
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          onChange={(e) => handleProcedureFile(e.target.files?.[0])}
                          className={ic}
                        />
                        {procedureForm.fileName && (
                          <p className="mt-1 text-xs text-gray-500 inline-flex items-center gap-1">
                            <Paperclip size={12} /> {procedureForm.fileName}
                          </p>
                        )}
                      </div>
                      <div className="flex items-end gap-2">
                        <button type="submit" className="flex-1 px-3 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90">Salvar</button>
                        <button type="button" onClick={() => setShowProcForm(false)} className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">✕</button>
                      </div>
                    </form>
                  </div>
                )}

                {(patient.procedures || []).length === 0 ? (
                  <div className="py-10 text-center text-gray-400">
                    <Activity size={28} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Nenhum procedimento registrado.</p>
                    <button onClick={() => setShowProcForm(true)} className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary/5">
                      <PlusCircle size={14} />Registrar procedimento
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-gray-50/80 dark:bg-gray-800/80 text-xs uppercase tracking-wider text-gray-400 font-semibold">
                          <th className="py-3 px-5">Data</th>
                          <th className="py-3 px-5">Procedimento</th>
                          <th className="py-3 px-5">Responsável</th>
                          <th className="py-3 px-5">Status</th>
                          <th className="py-3 px-5">Valor</th>
                          <th className="py-3 px-5 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {(patient.procedures || []).map((proc) => (
                          <React.Fragment key={proc.id}>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                              <td className="py-3 px-5 text-gray-500 whitespace-nowrap">{safeFormat(proc.date, 'dd/MM/yyyy')}</td>
                              <td className="py-3 px-5">
                                <p className="font-semibold text-gray-900 dark:text-white">{proc.name}</p>
                                {proc.notes && expandedProc !== proc.id && <p className="text-xs text-gray-400 truncate max-w-[200px]">{proc.notes}</p>}
                              </td>
                              <td className="py-3 px-5 text-gray-600 dark:text-gray-400 whitespace-nowrap">{proc.veterinarian || currentUser.name}</td>
                              <td className="py-3 px-5"><ProcBadge type={proc.type} /></td>
                              <td className="py-3 px-5 font-semibold text-gray-900 dark:text-white">{currency(proc.price || 0)}</td>
                              <td className="py-3 px-5 text-right">
                                <button onClick={() => setExpandedProc(expandedProc === proc.id ? null : proc.id)} className={`p-1.5 rounded-lg transition-colors ${expandedProc === proc.id ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'}`} title="Ver detalhes">
                                  <Eye size={15} />
                                </button>
                              </td>
                            </tr>
                            {expandedProc === proc.id && (
                              <tr className="bg-gray-50/80 dark:bg-gray-800/40">
                                <td colSpan={6} className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">
                                  <strong className="text-gray-900 dark:text-white">Observações:</strong>{' '}{proc.notes || 'Sem observações registradas.'}
                                  {proc.fileUrl && (
                                    <a
                                      href={proc.fileUrl}
                                      download={proc.fileName || `${proc.name}.pdf`}
                                      className="ml-3 inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                                    >
                                      <Download size={13} /> Baixar anexo
                                    </a>
                                  )}
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>

              {/* Weight Chart */}
              {weightHistory.length >= 1 && (
                <Card className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <Scale size={15} className="text-primary" />Progressão de Peso
                    {weightTrend && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${weightTrend.direction === 'up' ? 'bg-amber-50 text-amber-700' : weightTrend.direction === 'down' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {weightTrend.direction === 'up' ? <TrendingUp size={11} /> : weightTrend.direction === 'down' ? <TrendingDown size={11} /> : <Minus size={11} />}
                        {weightTrend.delta > 0 ? '+' : ''}{weightTrend.delta.toFixed(1)} kg
                      </span>
                    )}
                  </h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={weightChartData} margin={{ top: 5, right: 16, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} unit=" kg" />
                      <Tooltip content={<WeightTooltip />} />
                      {weightChartData.length > 0 && <ReferenceLine y={weightChartData[0].weight} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: 'Inicial', fontSize: 10, fill: '#94a3b8' }} />}
                      <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 5, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              )}
            </div>

            {/* ════ RIGHT SIDEBAR ═══════════════════════════════════════════ */}
            <div className="space-y-4">

              {/* Vaccine Protocol */}
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm"><Syringe size={14} className="text-primary" />Protocolo Vacinal</h3>
                  <button onClick={() => setShowVacinaForm((v) => !v)} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"><PlusCircle size={12} />{showVacinaForm ? 'Fechar' : 'Adicionar'}</button>
                </div>

                {showVacinaForm && (
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                    <form onSubmit={saveVaccine} className="space-y-2">
                      {/* Selecionar do catálogo */}
                      {services.filter((s) => s.category === 'Vacinas').length > 0 && (
                        <div>
                          <label className={lc}>Selecionar do catálogo</label>
                          <select
                            className={ic}
                            value=""
                            onChange={(e) => {
                              const svc = services.find((s) => s.id === e.target.value);
                              if (svc) { setVaccineForm((p) => ({ ...p, name: svc.name })); setVaccinePrice(svc.price); }
                            }}
                          >
                            <option value="">— buscar vacina no catálogo —</option>
                            {services.filter((s) => s.category === 'Vacinas').map((s) => (
                              <option key={s.id} value={s.id}>{s.name} · {currency(s.price)}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label className={lc}>Vacina *</label>
                        <input required placeholder="Ex: V10, Antirrábica, Giardia" value={vaccineForm.name || ''} onChange={(e) => setVaccineForm((p) => ({ ...p, name: e.target.value }))} className={ic} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={lc}>Lote</label>
                          <input placeholder="Lote" value={vaccineForm.batch || ''} onChange={(e) => setVaccineForm((p) => ({ ...p, batch: e.target.value }))} className={ic} />
                        </div>
                        <div>
                          <label className={lc}>Valor (R$)</label>
                          <input type="number" min="0" step="0.01" value={vaccinePrice} onChange={(e) => setVaccinePrice(Math.max(0, Number(e.target.value)))} className={ic} />
                        </div>
                        <div>
                          <label className={lc}>Data aplic.</label>
                          <input type="date" value={safeFormat(vaccineForm.date, 'yyyy-MM-dd', '')} onChange={(e) => {
                            const baseDate = parseDateInput(e.target.value) || new Date();
                            setVaccineForm((p) => ({
                              ...p,
                              date: baseDate,
                              nextDueDate: vaccineBoost === 'manual' ? p.nextDueDate : calcNextDueDateFromBoost(baseDate, vaccineBoost),
                            }));
                          }} className={ic} />
                        </div>
                        <div>
                          <label className={lc}>Reforço</label>
                          <select
                            value={vaccineBoost}
                            onChange={(e) => {
                              const nextBoost = e.target.value as VaccineBoostOption;
                              setVaccineBoost(nextBoost);
                              setVaccineForm((p) => ({
                                ...p,
                                nextDueDate: nextBoost === 'manual' ? p.nextDueDate : calcNextDueDateFromBoost(p.date || new Date(), nextBoost),
                              }));
                            }}
                            className={ic}
                          >
                            <option value="manual">Definir data manual</option>
                            <option value="2w">Repetir em 2 semanas</option>
                            <option value="4w">Repetir em 4 semanas</option>
                            <option value="6w">Repetir em 6 semanas</option>
                            <option value="8w">Repetir em 8 semanas</option>
                            <option value="1y">Repetir anual</option>
                          </select>
                        </div>
                        {vaccineBoost === 'manual' && (
                          <div className="col-span-2">
                            <label className={lc}>Próximo reforço (data manual)</label>
                            <input type="date" value={safeFormat(vaccineForm.nextDueDate, 'yyyy-MM-dd', '')} onChange={(e) => setVaccineForm((p) => ({ ...p, nextDueDate: parseDateInput(e.target.value) }))} className={ic} />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button type="submit" className="flex-1 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90">Salvar</button>
                        <button type="button" onClick={() => setShowVacinaForm(false)} className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">✕</button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                  {(patient.vaccines || []).length === 0 ? (
                    <div className="py-8 text-center text-gray-400">
                      <Syringe size={24} className="mx-auto mb-2 opacity-30" />
                      <p className="text-xs">Nenhuma vacina registrada.</p>
                      <button onClick={() => setShowVacinaForm(true)} className="mt-2 text-xs text-primary font-semibold hover:underline">+ Adicionar vacina</button>
                    </div>
                  ) : (
                    [...(patient.vaccines || [])].reverse().map((v) => {
                      const vs = vaccineStatus(v);
                      return (
                        <div key={v.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${vs.dot}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{v.name}</p>
                            <p className="text-xs text-gray-400">
                              {safeFormat(v.date, 'dd/MM/yyyy')}
                              {v.nextDueDate && ` · Reforço ${safeFormat(v.nextDueDate, 'dd/MM/yyyy')}`}
                            </p>
                          </div>
                          <span className={`text-xs font-semibold whitespace-nowrap ${vs.cls}`}>{vs.label}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </Card>

              {/* Weight History */}
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm"><Scale size={14} className="text-primary" />Histórico de Peso</h3>
                  <button onClick={() => setShowPesoForm((v) => !v)} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"><PlusCircle size={12} />{showPesoForm ? 'Fechar' : 'Novo Registro'}</button>
                </div>

                {showPesoForm && (
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                    <form onSubmit={saveWeight} className="space-y-2">
                      <div>
                        <label className={lc}>Peso (kg) *</label>
                        <input type="number" min="0.1" step="0.1" required value={weightInput} onChange={(e) => setWeightInput(Number(e.target.value) || 0)} className={ic} placeholder="Ex: 32.5" />
                      </div>
                      <div>
                        <label className={lc}>Observação</label>
                        <input value={weightNotes} onChange={(e) => setWeightNotes(e.target.value)} className={ic} placeholder="Ex: pós-cirúrgico" />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button type="submit" className="flex-1 py-2 rounded-xl bg-primary text-white text-sm font-semibold">Salvar</button>
                        <button type="button" onClick={() => setShowPesoForm(false)} className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm">✕</button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                  {weightHistory.length === 0 ? (
                    <div className="py-8 text-center text-gray-400">
                      <Scale size={24} className="mx-auto mb-2 opacity-30" />
                      <p className="text-xs">Nenhuma pesagem registrada.</p>
                      <button onClick={() => setShowPesoForm(true)} className="mt-2 text-xs text-primary font-semibold hover:underline">+ Novo registro</button>
                    </div>
                  ) : (
                    [...weightHistory].reverse().map((r, i, arr) => {
                      const prev = arr[i + 1];
                      const diff = prev ? r.weight - prev.weight : null;
                      const barWidth = Math.round((r.weight / maxWeight) * 100);
                      return (
                        <div key={r.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                          <span className="text-xs text-gray-400 w-[68px] shrink-0">{safeFormat(r.date, 'dd MMM yy')}</span>
                          <div className="flex-1 min-w-0">
                            <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${barWidth}%` }} />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-sm font-bold text-gray-900 dark:text-white w-[52px] text-right">{r.weight} kg</span>
                            {diff !== null && (
                              <span className={`text-xs font-semibold w-[40px] text-right flex items-center justify-end gap-0.5 ${diff > 0 ? 'text-amber-600' : diff < 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                                {diff > 0 ? <TrendingUp size={11} /> : diff < 0 ? <TrendingDown size={11} /> : <Minus size={11} />}
                                {Math.abs(diff).toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Card>

              {/* Tutor Card */}
              {tutor && (
                <Card className="overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-xs uppercase tracking-widest font-bold text-gray-400">Tutor Responsável</p>
                  </div>
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {tutor.name.charAt(0)}{tutor.name.split(' ')[1]?.charAt(0) || ''}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{tutor.name}</p>
                        {tutor.cpf && <p className="text-xs text-gray-400">CPF: {tutor.cpf}</p>}
                      </div>
                    </div>
                    {tutor.phone && (
                      <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1.5">
                        <Phone size={13} className="text-gray-400" />{tutor.phone}
                      </p>
                    )}
                    {tutor.address && (
                      <p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />{tutor.address}
                      </p>
                    )}
                    <Link to={dvPath(`tutors/${tutor.id}`)} className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors">
                      Ver Perfil Completo do Tutor <ChevronRight size={13} />
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: AGENDA
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'Agenda' && (
        <section className="space-y-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2"><CalendarDays size={16} className="text-primary" />Novo agendamento para {patient.name}</h3>
              <button onClick={() => navigate(dvPath('calendar'))} className="text-sm text-primary font-semibold hover:underline">Agenda completa</button>
            </div>
            <form onSubmit={savePatientAppointment} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              <div><label className={lc}>Tutor</label><input value={tutor?.name || '—'} readOnly className={`${ic} bg-gray-100 dark:bg-gray-800/60 cursor-default`} /></div>
              <div><label className={lc}>Paciente</label><input value={patient.name} readOnly className={`${ic} bg-gray-100 dark:bg-gray-800/60 cursor-default`} /></div>
              <div>
                <label className={lc}>Tipo *</label>
                <select value={agendaForm.type || 'Consulta Geral'} onChange={(e) => setAgendaForm((p) => ({ ...p, type: e.target.value as Appointment['type'] }))} className={ic}>
                  {APPOINTMENT_CATEGORIES.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                </select>
              </div>
              <div className="xl:col-span-2"><label className={lc}>Título / Motivo *</label><input required value={agendaForm.title || ''} onChange={(e) => setAgendaForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ex: Consulta clínica geral" className={ic} /></div>
              <div>
                <label className={lc}>Veterinário *</label>
                <select required value={agendaForm.veterinarianName || ''} onChange={(e) => setAgendaForm((p) => ({ ...p, veterinarianName: e.target.value }))} className={ic}>
                  <option value="">Selecionar veterinário</option>
                  {veterinarianOptions.map((vet) => <option key={vet.id} value={vet.name}>{vet.name}{vet.crmv ? ` · ${vet.crmv}` : ''}</option>)}
                </select>
              </div>
              <div><label className={lc}>Data *</label><input type="date" required value={safeFormat(agendaForm.date, 'yyyy-MM-dd', '')} onChange={(e) => setAgendaForm((p) => ({ ...p, date: parseDateInput(e.target.value) || new Date() }))} className={ic} /></div>
              <div><label className={lc}>Horário *</label><input type="time" required value={agendaTime} onChange={(e) => setAgendaTime(e.target.value)} className={ic} /></div>
              <div><label className={lc}>Observações</label><textarea value={agendaForm.notes || ''} onChange={(e) => setAgendaForm((p) => ({ ...p, notes: e.target.value }))} className={`${ic} min-h-[68px]`} /></div>
              <div className="xl:col-span-3 flex justify-end">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold inline-flex items-center gap-2 hover:bg-primary/90 shadow-md shadow-primary/20">
                  <PlusCircle size={15} />Confirmar agendamento
                </button>
              </div>
            </form>
          </Card>

          <Card className="p-5">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4"><Clock size={15} className="text-primary" />Histórico ({patientAppointments.length})</h3>
            {patientAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-400"><CalendarDays size={28} className="mx-auto mb-2 opacity-30" /><p className="text-sm">Nenhum agendamento.</p></div>
            ) : (
              <div className="space-y-2">
                {patientAppointments.map((apt) => (
                  <div key={apt.id} className="rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-50/40 dark:bg-gray-800/20">
                    <div>
                      <p className="font-semibold">{apt.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{safeFormat(apt.date, 'dd/MM/yyyy HH:mm')} · {apt.type}{apt.veterinarianName ? ` · ${apt.veterinarianName}` : ''}</p>
                      {apt.notes && <p className="text-xs text-gray-400 mt-0.5 truncate">{apt.notes}</p>}
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: FINANCEIRO
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'Financeiro' && (
        <section className="space-y-5">
          <Card className="p-5">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4"><PlusCircle size={15} className="text-primary" />Lançar serviços — {patient.name}</h3>
            <div className="space-y-2">
              {launchLines.map((line) => {
                const selectedService = services.find((s) => s.id === line.serviceId);
                const gross = line.quantity * line.unitPrice;
                const lineDiscount = line.discountMode === 'percent' ? (gross * line.discountValue) / 100 : line.discountValue;
                return (
                  <div key={line.id} className="grid grid-cols-2 md:grid-cols-9 gap-2 rounded-xl border border-gray-200 dark:border-gray-700 p-3 items-end">
                    <div className="col-span-2 md:col-span-3 relative">
                      <label className={lc}>Serviço</label>
                      <input
                        value={line.serviceSearch}
                        onFocus={() => setFocusedServiceLineId(line.id)}
                        onBlur={() => setTimeout(() => setFocusedServiceLineId((prev) => (prev === line.id ? null : prev)), 120)}
                        onChange={(e) => handleServiceQueryChange(line.id, e.target.value)}
                        placeholder="Digite para pesquisar no catálogo..."
                        className={ic}
                      />
                      {focusedServiceLineId === line.id && (
                        <div className="absolute z-20 left-0 right-0 mt-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl max-h-56 overflow-auto">
                          {getServiceMatches(line.serviceSearch).length === 0 ? (
                            <p className="px-3 py-2 text-xs text-gray-500">Nenhum serviço encontrado.</p>
                          ) : (
                            getServiceMatches(line.serviceSearch).map((service) => (
                              <button
                                key={service.id}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => pickServiceForLine(line.id, service.id)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                              >
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{service.name}</p>
                                <p className="text-xs text-gray-500">{service.category} • {currency(service.price)}</p>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                    <div><label className={lc}>Qtd.</label><input type="number" min="1" value={line.quantity} onChange={(e) => updateLine(line.id, { quantity: Math.max(1, Number(e.target.value)) })} className={ic} /></div>
                    <div><label className={lc}>Preço</label><input type="number" min="0" step="0.01" value={line.unitPrice} onChange={(e) => updateLine(line.id, { unitPrice: Math.max(0, Number(e.target.value)) })} className={ic} /></div>
                    <div><label className={lc}>Desc.</label><select value={line.discountMode} onChange={(e) => updateLine(line.id, { discountMode: e.target.value as DiscountMode })} className={ic}><option value="value">R$</option><option value="percent">%</option></select></div>
                    <div><label className={lc}>Valor desc.</label><input type="number" min="0" step="0.01" value={line.discountValue} onChange={(e) => updateLine(line.id, { discountValue: Math.max(0, Number(e.target.value)) })} className={ic} /></div>
                    <div className="col-span-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedService ? currency(Math.max(0, gross - lineDiscount)) : '—'}</span>
                      <button type="button" onClick={() => setLaunchLines((prev) => prev.length > 1 ? prev.filter((x) => x.id !== line.id) : prev)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 size={14} /></button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setLaunchLines((prev) => [...prev, { id: randomId(), serviceId: '', serviceSearch: '', quantity: 1, unitPrice: 0, discountMode: 'value', discountValue: 0 }])} className="px-3 py-2 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-500 hover:border-primary hover:text-primary">+ Adicionar</button>
              <div className="ml-auto flex items-center gap-2 text-sm">
                <span className="text-gray-500">Desconto global:</span>
                <select value={globalDiscountMode} onChange={(e) => setGlobalDiscountMode(e.target.value as DiscountMode)} className="px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm bg-gray-50 dark:bg-gray-800"><option value="value">R$</option><option value="percent">%</option></select>
                <input type="number" min="0" step="0.01" value={globalDiscountValue} onChange={(e) => setGlobalDiscountValue(Math.max(0, Number(e.target.value)))} className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm bg-gray-50 dark:bg-gray-800" />
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-5 text-sm">
                <span>Subtotal: <strong>{currency(launchPreview.subtotal)}</strong></span>
                {launchPreview.globalDiscount > 0 && <span>Desconto: <strong className="text-red-600">− {currency(launchPreview.globalDiscount)}</strong></span>}
                <span className="font-bold text-base">Total: <span className="text-primary">{currency(launchPreview.total)}</span></span>
              </div>
              <button type="button" disabled={!launchPreview.rows.length} onClick={launchServices} className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 disabled:opacity-40 shadow-md shadow-primary/20">Confirmar lançamento</button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2"><DollarSign size={15} className="text-primary" />Cobranças do paciente</h3>
              {pendingDebt > 0 && <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 text-sm font-semibold"><AlertTriangle size={13} />Pendente: {currency(pendingDebt)}</div>}
            </div>
            {patientFinancial.length === 0 ? (
              <div className="text-center py-8 text-gray-400"><DollarSign size={28} className="mx-auto mb-2 opacity-30" /><p className="text-sm">Nenhum lançamento financeiro.</p></div>
            ) : (
              <div className="space-y-2">
                {patientFinancial.map((record) => (
                  <div key={record.id} className="rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-50/40 dark:bg-gray-800/20">
                    <div>
                      <p className="font-semibold text-sm">{record.description}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{record.category} · {safeFormat(record.date, 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-bold">{currency(record.amount)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (record.status === 'Pago') return;
                          openPaymentModal(record.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${record.status === 'Pago' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200'}`}
                      >
                        {record.status === 'Pago' ? <><CheckCircle2 size={12} />Pago</> : <><Clock size={12} />Dar baixa na venda</>}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>
      )}

      <Modal
        isOpen={Boolean(paymentModalRecordId)}
        onClose={() => setPaymentModalRecordId(null)}
        title="Dar baixa na venda"
        className="max-w-xl"
      >
        {selectedPaymentRecord ? (
          <div className="space-y-3">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedPaymentRecord.description}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedPaymentRecord.category} • {currency(selectedPaymentRecord.amount)}
              </p>
            </div>

            <div>
              <label className={lc}>Método de pagamento</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} className={ic}>
                <option>Dinheiro</option>
                <option>PIX</option>
                <option>Cartão de Crédito</option>
                <option>Cartão de Débito</option>
              </select>
            </div>

            <div>
              <label className={lc}>ID da transação</label>
              <input value={paymentTransactionId} onChange={(e) => setPaymentTransactionId(e.target.value)} placeholder="Opcional" className={ic} />
            </div>

            <div>
              <label className={lc}>Comprovante (anexar)</label>
              <input type="file" accept=".pdf,image/*" onChange={(e) => handlePaymentProofFile(e.target.files?.[0])} className={ic} />
              {paymentProofName && <p className="mt-1 text-xs text-gray-500 inline-flex items-center gap-1"><Paperclip size={12} />{paymentProofName}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={() => setPaymentModalRecordId(null)} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm">
                Cancelar
              </button>
              <button type="button" onClick={settleSale} className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold">
                Confirmar baixa
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};
