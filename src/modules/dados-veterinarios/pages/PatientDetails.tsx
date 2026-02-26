import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, CalendarDays, ClipboardList, DollarSign, PlusCircle,
  Stethoscope, Camera, TrendingUp, TrendingDown, Minus, Syringe,
  Scale, Activity, AlertTriangle, CheckCircle2, Clock, LayoutDashboard,
  Scissors, Cpu, Palette, User, ChevronRight, MoreVertical, Trash2,
} from 'lucide-react';
import { format, isAfter } from 'date-fns';
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

type PatientTab = 'Resumo' | 'Prontuário' | 'Agenda' | 'Financeiro';
type DiscountMode = 'value' | 'percent';

type LaunchLine = {
  id: string;
  serviceId: string;
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

// ─── Tab Button ─────────────────────────────────────────────────────────────
const TabButton = ({
  active, label, icon, onClick,
}: { active: boolean; label: PatientTab; icon: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
      active
        ? 'border-primary text-primary dark:text-primary'
        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-primary hover:border-primary/40'
    }`}
  >
    {icon}
    {label}
  </button>
);

// ─── Status Badge ────────────────────────────────────────────────────────────
const StatusBadge = ({ status, apt }: { status: Appointment['status']; apt?: boolean }) => {
  const map: Record<string, { cls: string; label: string }> = {
    Agendado: { cls: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', label: 'Agendado' },
    Confirmado: { cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', label: 'Confirmado' },
    Concluído: { cls: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400', label: 'Concluído' },
    Cancelado: { cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300', label: 'Cancelado' },
  };
  const s = map[status] ?? map['Agendado'];
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.cls}`}>{s.label}</span>
  );
};

// ─── Weight Chart Tooltip ─────────────────────────────────────────────────
const WeightTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200">{label}</p>
      <p className="text-primary font-bold mt-1">{payload[0].value} kg</p>
      {payload[0].payload.notes && (
        <p className="text-gray-500 text-xs mt-0.5">{payload[0].payload.notes}</p>
      )}
    </div>
  );
};

// ─── Section Card ─────────────────────────────────────────────────────────
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <article className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 ${className}`}>
    {children}
  </article>
);

const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <h3 className="text-base font-bold text-gray-900 dark:text-white inline-flex items-center gap-2 mb-4">
    <span className="text-primary">{icon}</span>
    {children}
  </h3>
);

const inputCls = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm';
const labelCls = 'block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide';

// ─── Main Component ──────────────────────────────────────────────────────
export const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    patients, tutors, services, appointments, financialRecords,
    getTutorName, updatePatient, addAppointment, addFinancialRecord,
    updateFinancialRecord,
  } = useData();
  const { currentUser, selectedClinicId, getVeterinariansForSelection } = useClinicAuth();

  const patient = useMemo(() => patients.find((p) => p.id === id), [patients, id]);
  const tutor = useMemo(() => tutors.find((t) => t.id === patient?.tutorId), [tutors, patient]);
  const veterinarianOptions = getVeterinariansForSelection();

  const [activeTab, setActiveTab] = useState<PatientTab>('Resumo');
  const imageInputRef = useRef<HTMLInputElement>(null);

  // ── Vaccine form
  const [vaccineForm, setVaccineForm] = useState<Partial<Vaccine>>({
    name: '', date: new Date(), batch: '', nextDueDate: undefined,
  });
  const [vaccinePrice, setVaccinePrice] = useState(0);

  // ── Weight form
  const [weightInput, setWeightInput] = useState(() => parseWeightNumber(patient?.weight) || 0);
  const [weightNotes, setWeightNotes] = useState('');

  // ── Anamnesis form
  const [anamnesisForm, setAnamnesisForm] = useState<Partial<Anamnesis>>({
    date: new Date(), complaint: '', history: '', systemsReview: '', diagnosis: '', treatment: '',
  });

  // ── Procedure form
  const [procedureForm, setProcedureForm] = useState<Partial<Procedure>>({
    date: new Date(), name: '', type: 'Procedimento', notes: '', price: 0,
  });

  // ── Agenda form
  const [agendaForm, setAgendaForm] = useState<Partial<Appointment>>({
    title: patient ? `Consulta - ${patient.name}` : '',
    date: new Date(),
    type: 'Consulta Geral',
    status: 'Agendado',
    notes: '',
    veterinarianName: currentUser.name,
  });
  const [agendaTime, setAgendaTime] = useState('09:00');

  // ── Financial form
  const [launchLines, setLaunchLines] = useState<LaunchLine[]>([
    { id: randomId(), serviceId: '', quantity: 1, unitPrice: 0, discountMode: 'value', discountValue: 0 },
  ]);
  const [globalDiscountMode, setGlobalDiscountMode] = useState<DiscountMode>('value');
  const [globalDiscountValue, setGlobalDiscountValue] = useState(0);

  // ── Derived data
  const patientAppointments = useMemo(
    () => appointments
      .filter((a) => a.patientId === patient?.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [appointments, patient],
  );

  const patientFinancial = useMemo(
    () => financialRecords
      .filter((r) => r.patientId === patient?.id && r.type === 'Receita')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [financialRecords, patient],
  );

  const pendingDebt = useMemo(
    () => patientFinancial.filter((r) => r.status === 'Pendente').reduce((s, r) => s + r.amount, 0),
    [patientFinancial],
  );

  // ── Weight history sorted
  const weightHistory = useMemo(
    () => [...(patient?.weightHistory || [])].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    ),
    [patient],
  );

  const weightChartData = useMemo(
    () => weightHistory.map((r) => ({
      date: format(new Date(r.date), 'dd/MM/yy'),
      weight: r.weight,
      notes: r.notes,
    })),
    [weightHistory],
  );

  const weightTrend = useMemo(() => {
    if (weightHistory.length < 2) return null;
    const first = weightHistory[0].weight;
    const last = weightHistory[weightHistory.length - 1].weight;
    const delta = last - first;
    return { delta, direction: delta > 0 ? 'up' : delta < 0 ? 'down' : 'stable' };
  }, [weightHistory]);

  // ── Launch preview
  const launchPreview = useMemo(() => {
    const rows = launchLines
      .map((line) => {
        const service = services.find((s) => s.id === line.serviceId);
        if (!service || line.quantity <= 0) return null;
        const gross = line.quantity * line.unitPrice;
        const itemDiscount =
          line.discountMode === 'percent'
            ? Math.min(gross, (gross * Math.max(0, line.discountValue)) / 100)
            : Math.min(gross, Math.max(0, line.discountValue));
        return { line, service, subtotal: Math.max(0, gross - itemDiscount) };
      })
      .filter(Boolean) as { line: LaunchLine; service: (typeof services)[number]; subtotal: number }[];

    const subtotal = rows.reduce((s, r) => s + r.subtotal, 0);
    const globalDiscount =
      globalDiscountMode === 'percent'
        ? Math.min(subtotal, (subtotal * Math.max(0, globalDiscountValue)) / 100)
        : Math.min(subtotal, Math.max(0, globalDiscountValue));
    return { rows, subtotal, globalDiscount, total: Math.max(0, subtotal - globalDiscount) };
  }, [launchLines, services, globalDiscountMode, globalDiscountValue]);

  if (!patient) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center">
        <AlertTriangle size={40} className="mx-auto text-amber-400 mb-3" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Paciente não encontrado</h2>
        <button
          onClick={() => navigate(dvPath('patients'))}
          className="mt-4 px-4 py-2 rounded-xl bg-primary text-white font-semibold"
        >
          Voltar para pacientes
        </button>
      </div>
    );
  }

  // ── Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      updatePatient(patient.id, { imageUrl: url });
    };
    reader.readAsDataURL(file);
  };

  const saveVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaccineForm.name) return;
    const vaccine: Vaccine = {
      id: randomId(),
      name: vaccineForm.name,
      date: vaccineForm.date || new Date(),
      nextDueDate: vaccineForm.nextDueDate,
      batch: vaccineForm.batch,
      veterinarian: currentUser.name,
    };
    updatePatient(patient.id, { vaccines: [...(patient.vaccines || []), vaccine] });
    if (vaccinePrice > 0) {
      addFinancialRecord({
        id: randomId(),
        clinicId: selectedClinicId === 'all' ? patient.clinicId : selectedClinicId,
        description: `Vacina ${vaccine.name} — ${patient.name}`,
        amount: vaccinePrice,
        type: 'Receita',
        category: 'Vacinas',
        date: new Date(vaccine.date),
        status: 'Pendente',
        patientId: patient.id,
      });
    }
    setVaccineForm({ name: '', date: new Date(), batch: '', nextDueDate: undefined });
    setVaccinePrice(0);
  };

  const saveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (weightInput <= 0) return;
    const newRecord: WeightRecord = {
      id: randomId(), date: new Date(), weight: weightInput, notes: weightNotes || undefined,
    };
    const history = [...(patient.weightHistory || []), newRecord].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    updatePatient(patient.id, { weightHistory: history, weight: `${weightInput.toFixed(1)}kg` });
    setWeightNotes('');
  };

  const saveAnamnesis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anamnesisForm.complaint) return;
    const entry: Anamnesis = {
      id: randomId(),
      date: anamnesisForm.date || new Date(),
      complaint: anamnesisForm.complaint,
      history: anamnesisForm.history || '',
      systemsReview: anamnesisForm.systemsReview,
      diagnosis: anamnesisForm.diagnosis,
      treatment: anamnesisForm.treatment,
    };
    updatePatient(patient.id, { anamnesis: [entry, ...(patient.anamnesis || [])] });
    setAnamnesisForm({ date: new Date(), complaint: '', history: '', systemsReview: '', diagnosis: '', treatment: '' });
  };

  const saveProcedure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!procedureForm.name) return;
    const entry: Procedure = {
      id: randomId(),
      date: procedureForm.date || new Date(),
      name: procedureForm.name,
      type: (procedureForm.type || 'Procedimento') as Procedure['type'],
      notes: procedureForm.notes,
      veterinarian: currentUser.name,
      price: Number(procedureForm.price || 0),
    };
    updatePatient(patient.id, { procedures: [entry, ...(patient.procedures || [])] });
    if ((entry.price || 0) > 0) {
      addFinancialRecord({
        id: randomId(),
        clinicId: selectedClinicId === 'all' ? patient.clinicId : selectedClinicId,
        description: `${entry.type}: ${entry.name} — ${patient.name}`,
        amount: Number(entry.price),
        type: 'Receita',
        category:
          entry.type === 'Exame' ? 'Exames' : entry.type === 'Cirurgia' ? 'Cirurgias' : 'Procedimentos',
        date: new Date(entry.date),
        status: 'Pendente',
        patientId: patient.id,
      });
    }
    setProcedureForm({ date: new Date(), name: '', type: 'Procedimento', notes: '', price: 0 });
  };

  const savePatientAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agendaForm.title || !agendaForm.type || !agendaForm.veterinarianName || !agendaForm.date) return;
    const [h, m] = agendaTime.split(':').map(Number);
    const date = new Date(agendaForm.date);
    date.setHours(h, m, 0, 0);
    addAppointment({
      id: randomId(),
      clinicId: selectedClinicId === 'all' ? patient.clinicId : selectedClinicId,
      title: agendaForm.title,
      date,
      patientId: patient.id,
      tutorId: patient.tutorId,
      veterinarianName: agendaForm.veterinarianName,
      type: agendaForm.type,
      status: 'Agendado',
      notes: agendaForm.notes,
    });
  };

  const updateLine = (lineId: string, payload: Partial<LaunchLine>) => {
    setLaunchLines((prev) =>
      prev.map((line) => {
        if (line.id !== lineId) return line;
        const next = { ...line, ...payload };
        if (payload.serviceId) {
          const svc = services.find((s) => s.id === payload.serviceId);
          if (svc) next.unitPrice = svc.price;
        }
        return next;
      }),
    );
  };

  const launchServices = () => {
    if (!launchPreview.rows.length) return;
    const subtotal = launchPreview.rows.reduce((s, r) => s + r.subtotal, 0) || 1;
    launchPreview.rows.forEach((row) => {
      const prop = (row.subtotal / subtotal) * launchPreview.globalDiscount;
      const finalAmount = Math.max(0, row.subtotal - prop);
      addFinancialRecord({
        id: randomId(),
        clinicId: selectedClinicId === 'all' ? patient.clinicId : selectedClinicId,
        description: `${row.service.name} x${row.line.quantity} — ${patient.name}`,
        amount: Number(finalAmount.toFixed(2)),
        type: 'Receita',
        category: row.service.category,
        date: new Date(),
        status: 'Pendente',
        patientId: patient.id,
      });
    });
    setLaunchLines([{ id: randomId(), serviceId: '', quantity: 1, unitPrice: 0, discountMode: 'value', discountValue: 0 }]);
    setGlobalDiscountMode('value');
    setGlobalDiscountValue(0);
  };

  const speciesLabel = patient.species === 'Canino' || patient.species === 'Cão' ? 'Canino' : 'Felino';
  const vaccinesOverdue = (patient.vaccines || []).filter(
    (v) => v.nextDueDate && !isAfter(new Date(v.nextDueDate), new Date()),
  ).length;

  return (
    <div className="space-y-5 max-w-[1700px] mx-auto pb-10">
      {/* ── Breadcrumb & Tabs ── */}
      <div className="flex flex-col gap-0">
        <Link
          to={dvPath('patients')}
          className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-primary text-xs font-medium mb-3"
        >
          <ArrowLeft size={14} /> Voltar para pacientes
        </Link>

        <div className="flex items-center gap-0 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {(
            [
              { label: 'Resumo', icon: <LayoutDashboard size={15} /> },
              { label: 'Prontuário', icon: <ClipboardList size={15} /> },
              { label: 'Agenda', icon: <CalendarDays size={15} /> },
              { label: 'Financeiro', icon: <DollarSign size={15} /> },
            ] as { label: PatientTab; icon: React.ReactNode }[]
          ).map(({ label, icon }) => (
            <TabButton
              key={label}
              label={label}
              icon={icon}
              active={activeTab === label}
              onClick={() => setActiveTab(label)}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          TAB: RESUMO
      ════════════════════════════════════════ */}
      {activeTab === 'Resumo' && (
        <section className="space-y-5">
          {/* Patient Header */}
          <Card className="flex flex-col lg:flex-row gap-6">
            {/* Photo */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="relative group">
                <img
                  src={
                    patient.imageUrl ||
                    patient.image ||
                    `https://images.unsplash.com/photo-${speciesLabel === 'Canino' ? '1552053831-71594a27632d' : '1514888286974-6c03e2ca1dba'}?auto=format&fit=crop&w=200&h=200`
                  }
                  alt={patient.name}
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-gray-100 dark:ring-gray-800"
                />
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                  title="Alterar foto"
                >
                  <Camera size={22} />
                </button>
              </div>
              <button
                onClick={() => imageInputRef.current?.click()}
                className="text-xs text-primary font-medium hover:underline"
              >
                Alterar foto
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{patient.name}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {speciesLabel} · {patient.breed} · {patient.age}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {patient.status === 'Vivo' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Ativo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold">
                      Óbito
                    </span>
                  )}
                  {patient.castrated && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-semibold">
                      <Scissors size={12} /> Castrado(a)
                    </span>
                  )}
                  {patient.microchipped && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                      <Cpu size={12} /> Microchipado(a)
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Sexo</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {patient.sex || patient.gender || '—'}
                  </span>
                </div>
                {patient.coatColor && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold flex items-center gap-1">
                      <Palette size={11} /> Pelagem
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{patient.coatColor}</span>
                  </div>
                )}
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Tutor</span>
                  {tutor ? (
                    <Link
                      to={dvPath(`tutors/${tutor.id}`)}
                      className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <User size={12} /> {tutor.name}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-500">—</span>
                  )}
                </div>
                {tutor?.phone && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Telefone tutor</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{tutor.phone}</span>
                  </div>
                )}
              </div>

              {pendingDebt > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-semibold">
                  <AlertTriangle size={16} />
                  Saldo devedor: {currency(pendingDebt)}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => navigate(dvPath(`patients/${patient.id}/consulta`))}
                className="px-4 py-2.5 rounded-xl bg-primary text-white font-semibold inline-flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
              >
                <Stethoscope size={16} /> Nova Consulta
              </button>
              <button
                onClick={() => setActiveTab('Prontuário')}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Registrar Vacina / Procedimento
              </button>
              <button
                onClick={() => setActiveTab('Agenda')}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Agendar Consulta
              </button>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Weight */}
            <Card className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold flex items-center gap-1">
                <Scale size={13} /> Peso atual
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{patient.weight || '—'}</p>
              {weightTrend && (
                <p
                  className={`text-xs font-semibold flex items-center gap-1 mt-0.5 ${
                    weightTrend.direction === 'up'
                      ? 'text-amber-600'
                      : weightTrend.direction === 'down'
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {weightTrend.direction === 'up' ? (
                    <TrendingUp size={13} />
                  ) : weightTrend.direction === 'down' ? (
                    <TrendingDown size={13} />
                  ) : (
                    <Minus size={13} />
                  )}
                  {weightTrend.delta > 0 ? '+' : ''}{weightTrend.delta.toFixed(1)} kg total
                </p>
              )}
            </Card>

            {/* Vaccines */}
            <Card className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold flex items-center gap-1">
                <Syringe size={13} /> Vacinas
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {patient.vaccines?.length || 0}
              </p>
              {vaccinesOverdue > 0 && (
                <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} /> {vaccinesOverdue} vencida(s)
                </p>
              )}
            </Card>

            {/* Procedures */}
            <Card className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold flex items-center gap-1">
                <Activity size={13} /> Procedimentos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {patient.procedures?.length || 0}
              </p>
            </Card>

            {/* Appointments */}
            <Card className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold flex items-center gap-1">
                <CalendarDays size={13} /> Consultas
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {patientAppointments.length}
              </p>
              {patientAppointments.length > 0 && (
                <p className="text-xs text-gray-500 truncate">
                  Última: {format(new Date(patientAppointments[0].date), 'dd/MM/yyyy')}
                </p>
              )}
            </Card>
          </div>

          {/* Recent anamnesis */}
          {(patient.anamnesis || []).length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-3">
                <SectionTitle icon={<ClipboardList size={16} />}>Últimas Consultas</SectionTitle>
                <button
                  onClick={() => setActiveTab('Prontuário')}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  Ver todas <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-2">
                {(patient.anamnesis || []).slice(0, 3).map((entry) => (
                  <div
                    key={entry.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 rounded-xl border border-gray-100 dark:border-gray-800 p-3 bg-gray-50/50 dark:bg-gray-800/30"
                  >
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{entry.complaint}</p>
                      {entry.diagnosis && (
                        <p className="text-xs text-gray-500">Diagnóstico: {entry.diagnosis}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">
                      {format(new Date(entry.date), 'dd/MM/yyyy HH:mm')}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </section>
      )}

      {/* ════════════════════════════════════════
          TAB: PRONTUÁRIO
      ════════════════════════════════════════ */}
      {activeTab === 'Prontuário' && (
        <section className="space-y-5">
          {/* Weight Chart */}
          <Card>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1 min-w-0">
                <SectionTitle icon={<Scale size={16} />}>Histórico de Peso</SectionTitle>

                {weightChartData.length >= 2 ? (
                  <>
                    {/* Trend summary */}
                    {weightTrend && (
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-4 ${
                          weightTrend.direction === 'up'
                            ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                            : weightTrend.direction === 'down'
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                        }`}
                      >
                        {weightTrend.direction === 'up' ? (
                          <TrendingUp size={16} />
                        ) : weightTrend.direction === 'down' ? (
                          <TrendingDown size={16} />
                        ) : (
                          <Minus size={16} />
                        )}
                        {weightTrend.direction === 'up'
                          ? `Ganho de ${weightTrend.delta.toFixed(1)} kg desde o início`
                          : weightTrend.direction === 'down'
                          ? `Perda de ${Math.abs(weightTrend.delta).toFixed(1)} kg desde o início`
                          : 'Peso estável'}
                        {' · '}
                        Atual: <strong>{patient.weight}</strong>
                      </div>
                    )}

                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={weightChartData} margin={{ top: 5, right: 16, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 11, fill: 'currentColor' }}
                          className="text-gray-500"
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: 'currentColor' }}
                          className="text-gray-500"
                          domain={['auto', 'auto']}
                          unit=" kg"
                        />
                        <Tooltip content={<WeightTooltip />} />
                        {weightChartData.length > 0 && (
                          <ReferenceLine
                            y={weightChartData[0].weight}
                            stroke="#94a3b8"
                            strokeDasharray="4 4"
                            label={{ value: 'Inicial', fontSize: 10, fill: '#94a3b8' }}
                          />
                        )}
                        <Line
                          type="monotone"
                          dataKey="weight"
                          stroke="#22c55e"
                          strokeWidth={2.5}
                          dot={{ r: 5, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </>
                ) : weightChartData.length === 1 ? (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm text-gray-500">
                    <Scale size={20} className="text-gray-400" />
                    Um registro encontrado ({weightChartData[0].weight} kg em {weightChartData[0].date}). Adicione mais registros para visualizar o gráfico.
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm text-gray-500">
                    <Scale size={20} className="text-gray-400" />
                    Nenhum registro de peso. Use o formulário ao lado para começar.
                  </div>
                )}

                {/* Weight history list */}
                {weightHistory.length > 0 && (
                  <div className="mt-4 space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                    {[...weightHistory].reverse().map((r, i) => {
                      const prev = [...weightHistory].reverse()[i + 1];
                      const diff = prev ? r.weight - prev.weight : null;
                      return (
                        <div
                          key={r.id}
                          className="flex items-center justify-between text-sm rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800/40"
                        >
                          <span className="text-gray-500 text-xs">
                            {format(new Date(r.date), 'dd/MM/yyyy')}
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">{r.weight} kg</span>
                          {diff !== null && (
                            <span
                              className={`text-xs font-semibold flex items-center gap-0.5 ${
                                diff > 0 ? 'text-amber-600' : diff < 0 ? 'text-blue-600' : 'text-gray-400'
                              }`}
                            >
                              {diff > 0 ? <TrendingUp size={12} /> : diff < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
                              {diff > 0 ? '+' : ''}{diff.toFixed(1)} kg
                            </span>
                          )}
                          {r.notes && <span className="text-xs text-gray-400 truncate max-w-[120px]">{r.notes}</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add weight form */}
              <div className="shrink-0 w-full md:w-64">
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Registrar pesagem</h4>
                <form onSubmit={saveWeight} className="space-y-2">
                  <div>
                    <label className={labelCls}>Peso (kg)</label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      required
                      value={weightInput}
                      onChange={(e) => setWeightInput(Number(e.target.value) || 0)}
                      className={inputCls}
                      placeholder="Ex: 32.5"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Observação (opcional)</label>
                    <input
                      type="text"
                      value={weightNotes}
                      onChange={(e) => setWeightNotes(e.target.value)}
                      className={inputCls}
                      placeholder="Ex: pós-cirúrgico"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Salvar pesagem
                  </button>
                </form>
              </div>
            </div>
          </Card>

          {/* Anamnesis */}
          <Card>
            <SectionTitle icon={<ClipboardList size={16} />}>Anamnese / Consulta</SectionTitle>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <form onSubmit={saveAnamnesis} className="space-y-3">
                <div>
                  <label className={labelCls}>Queixa principal *</label>
                  <input
                    required
                    placeholder="Ex: vômito há 2 dias, prostração"
                    value={anamnesisForm.complaint || ''}
                    onChange={(e) => setAnamnesisForm((p) => ({ ...p, complaint: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Histórico e exame físico</label>
                  <textarea
                    placeholder="Histórico clínico, exame físico, parâmetros vitais..."
                    value={anamnesisForm.history || ''}
                    onChange={(e) => setAnamnesisForm((p) => ({ ...p, history: e.target.value }))}
                    className={`${inputCls} min-h-[80px]`}
                  />
                </div>
                <div>
                  <label className={labelCls}>Revisão de sistemas</label>
                  <textarea
                    placeholder="Cardiovascular, respiratório, gastrointestinal..."
                    value={anamnesisForm.systemsReview || ''}
                    onChange={(e) => setAnamnesisForm((p) => ({ ...p, systemsReview: e.target.value }))}
                    className={`${inputCls} min-h-[60px]`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Diagnóstico</label>
                    <input
                      placeholder="Diagnóstico"
                      value={anamnesisForm.diagnosis || ''}
                      onChange={(e) => setAnamnesisForm((p) => ({ ...p, diagnosis: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Tratamento</label>
                    <input
                      placeholder="Tratamento prescrito"
                      value={anamnesisForm.treatment || ''}
                      onChange={(e) => setAnamnesisForm((p) => ({ ...p, treatment: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Salvar anamnese
                  </button>
                  <Link
                    to={dvPath(`patients/${patient.id}/consulta`)}
                    className="px-4 py-2.5 rounded-xl border border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
                  >
                    Consulta guiada
                  </Link>
                </div>
              </form>

              {/* Anamnesis history */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Histórico ({(patient.anamnesis || []).length})
                </h4>
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {(patient.anamnesis || []).length === 0 ? (
                    <p className="text-sm text-gray-400 py-4 text-center">Nenhuma anamnese registrada.</p>
                  ) : (
                    (patient.anamnesis || []).map((entry) => (
                      <div
                        key={entry.id}
                        className="rounded-xl border border-gray-100 dark:border-gray-800 p-3 bg-gray-50/50 dark:bg-gray-800/30"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">{entry.complaint}</p>
                          <span className="text-xs text-gray-400 shrink-0">
                            {format(new Date(entry.date), 'dd/MM/yy')}
                          </span>
                        </div>
                        {entry.diagnosis && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            <strong>Diagnóstico:</strong> {entry.diagnosis}
                          </p>
                        )}
                        {entry.treatment && (
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            <strong>Tratamento:</strong> {entry.treatment}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Vaccines & Procedures in 2 cols */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {/* Vaccines */}
            <Card>
              <SectionTitle icon={<Syringe size={16} />}>Vacinas</SectionTitle>
              <form onSubmit={saveVaccine} className="space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelCls}>Nome da vacina *</label>
                    <input
                      required
                      placeholder="Ex: V10, Antirrábica"
                      value={vaccineForm.name || ''}
                      onChange={(e) => setVaccineForm((p) => ({ ...p, name: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Lote</label>
                    <input
                      placeholder="Número do lote"
                      value={vaccineForm.batch || ''}
                      onChange={(e) => setVaccineForm((p) => ({ ...p, batch: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Data de aplicação</label>
                    <input
                      type="date"
                      value={vaccineForm.date ? format(new Date(vaccineForm.date), 'yyyy-MM-dd') : ''}
                      onChange={(e) => setVaccineForm((p) => ({ ...p, date: new Date(e.target.value) }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Próxima dose</label>
                    <input
                      type="date"
                      value={vaccineForm.nextDueDate ? format(new Date(vaccineForm.nextDueDate), 'yyyy-MM-dd') : ''}
                      onChange={(e) =>
                        setVaccineForm((p) => ({
                          ...p,
                          nextDueDate: e.target.value ? new Date(e.target.value) : undefined,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Valor (R$)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={vaccinePrice}
                      onChange={(e) => setVaccinePrice(Math.max(0, Number(e.target.value) || 0))}
                      className={inputCls}
                      placeholder="0,00"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full px-4 py-2.5 rounded-xl border border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
                    >
                      Registrar vacina
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Veterinário: {currentUser.name}</p>
              </form>

              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                {(patient.vaccines || []).length === 0 ? (
                  <p className="text-sm text-gray-400 py-2 text-center">Nenhuma vacina registrada.</p>
                ) : (
                  [...(patient.vaccines || [])].reverse().map((v) => {
                    const overdue = v.nextDueDate && !isAfter(new Date(v.nextDueDate), new Date());
                    return (
                      <div
                        key={v.id}
                        className="rounded-xl border border-gray-100 dark:border-gray-800 p-3 bg-gray-50/50 dark:bg-gray-800/30"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                            {v.name}
                            {overdue && (
                              <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/20 text-red-600 text-xs font-semibold">
                                Vencida
                              </span>
                            )}
                          </p>
                          <span className="text-xs text-gray-400">
                            {format(new Date(v.date), 'dd/MM/yyyy')}
                          </span>
                        </div>
                        <div className="flex gap-3 mt-1 text-xs text-gray-500">
                          {v.batch && <span>Lote: {v.batch}</span>}
                          {v.nextDueDate && (
                            <span className={overdue ? 'text-red-500 font-semibold' : ''}>
                              Reforço: {format(new Date(v.nextDueDate), 'dd/MM/yyyy')}
                            </span>
                          )}
                          {v.veterinarian && <span>Vet: {v.veterinarian}</span>}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>

            {/* Procedures & Exams */}
            <Card>
              <SectionTitle icon={<Activity size={16} />}>Procedimentos e Exames</SectionTitle>
              <form onSubmit={saveProcedure} className="space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 md:col-span-1">
                    <label className={labelCls}>Nome *</label>
                    <input
                      required
                      placeholder="Ex: Hemograma, Raio-X, Castração"
                      value={procedureForm.name || ''}
                      onChange={(e) => setProcedureForm((p) => ({ ...p, name: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Tipo</label>
                    <select
                      value={procedureForm.type || 'Procedimento'}
                      onChange={(e) =>
                        setProcedureForm((p) => ({ ...p, type: e.target.value as Procedure['type'] }))
                      }
                      className={inputCls}
                    >
                      <option value="Procedimento">Procedimento</option>
                      <option value="Exame">Exame</option>
                      <option value="Cirurgia">Cirurgia</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Data</label>
                    <input
                      type="date"
                      value={procedureForm.date ? format(new Date(procedureForm.date), 'yyyy-MM-dd') : ''}
                      onChange={(e) => setProcedureForm((p) => ({ ...p, date: new Date(e.target.value) }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Valor (R$)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={procedureForm.price || 0}
                      onChange={(e) =>
                        setProcedureForm((p) => ({ ...p, price: Math.max(0, Number(e.target.value) || 0) }))
                      }
                      className={inputCls}
                      placeholder="0,00"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Observações</label>
                    <input
                      placeholder="Resultado, notas clínicas..."
                      value={procedureForm.notes || ''}
                      onChange={(e) => setProcedureForm((p) => ({ ...p, notes: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 rounded-xl border border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
                >
                  Registrar procedimento/exame
                </button>
              </form>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {(patient.procedures || []).length === 0 ? (
                  <p className="text-sm text-gray-400 py-2 text-center">Nenhum procedimento registrado.</p>
                ) : (
                  (patient.procedures || []).map((proc) => {
                    const typeColors: Record<string, string> = {
                      Exame: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
                      Procedimento: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
                      Cirurgia: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
                    };
                    return (
                      <div
                        key={proc.id}
                        className="rounded-xl border border-gray-100 dark:border-gray-800 p-3 bg-gray-50/50 dark:bg-gray-800/30 flex justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">{proc.name}</p>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                typeColors[proc.type || 'Procedimento'] || typeColors['Procedimento']
                              }`}
                            >
                              {proc.type || 'Procedimento'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {format(new Date(proc.date), 'dd/MM/yyyy')}
                            {proc.veterinarian && ` · Vet: ${proc.veterinarian}`}
                          </p>
                          {proc.notes && (
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{proc.notes}</p>
                          )}
                        </div>
                        <span className="font-semibold text-sm text-gray-900 dark:text-white shrink-0">
                          {currency(proc.price || 0)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          TAB: AGENDA
      ════════════════════════════════════════ */}
      {activeTab === 'Agenda' && (
        <section className="space-y-5">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <SectionTitle icon={<CalendarDays size={16} />}>
                Novo agendamento para {patient.name}
              </SectionTitle>
              <button
                onClick={() => navigate(dvPath('calendar'))}
                className="text-sm text-primary font-semibold hover:underline"
              >
                Agenda completa
              </button>
            </div>
            <form onSubmit={savePatientAppointment} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Tutor</label>
                <input value={tutor?.name || '—'} readOnly className={`${inputCls} bg-gray-100 dark:bg-gray-800/60 cursor-default`} />
              </div>
              <div>
                <label className={labelCls}>Paciente</label>
                <input value={patient.name} readOnly className={`${inputCls} bg-gray-100 dark:bg-gray-800/60 cursor-default`} />
              </div>
              <div>
                <label className={labelCls}>Tipo de consulta *</label>
                <select
                  value={agendaForm.type || 'Consulta Geral'}
                  onChange={(e) => setAgendaForm((p) => ({ ...p, type: e.target.value as Appointment['type'] }))}
                  className={inputCls}
                >
                  {APPOINTMENT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="xl:col-span-2">
                <label className={labelCls}>Título / Motivo *</label>
                <input
                  required
                  value={agendaForm.title || ''}
                  onChange={(e) => setAgendaForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Ex: Consulta clínica geral"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Médico veterinário *</label>
                <select
                  required
                  value={agendaForm.veterinarianName || ''}
                  onChange={(e) => setAgendaForm((p) => ({ ...p, veterinarianName: e.target.value }))}
                  className={inputCls}
                >
                  <option value="">Selecionar veterinário</option>
                  {veterinarianOptions.map((vet) => (
                    <option key={vet.id} value={vet.name}>
                      {vet.name}{vet.crmv ? ` · ${vet.crmv}` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Data *</label>
                <input
                  type="date"
                  required
                  value={agendaForm.date ? format(new Date(agendaForm.date), 'yyyy-MM-dd') : ''}
                  onChange={(e) => setAgendaForm((p) => ({ ...p, date: new Date(e.target.value) }))}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Horário *</label>
                <input
                  type="time"
                  required
                  value={agendaTime}
                  onChange={(e) => setAgendaTime(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div className="xl:col-span-3">
                <label className={labelCls}>Observações</label>
                <textarea
                  value={agendaForm.notes || ''}
                  onChange={(e) => setAgendaForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Informações adicionais para o agendamento..."
                  className={`${inputCls} min-h-[72px]`}
                />
              </div>
              <div className="xl:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold inline-flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                >
                  <PlusCircle size={16} /> Confirmar agendamento
                </button>
              </div>
            </form>
          </Card>

          <Card>
            <SectionTitle icon={<Clock size={16} />}>
              Histórico de agendamentos ({patientAppointments.length})
            </SectionTitle>
            {patientAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <CalendarDays size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">Nenhum agendamento para este paciente.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {patientAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-50/40 dark:bg-gray-800/20"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white">{apt.title}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-gray-500">
                        <span>{format(new Date(apt.date), 'dd/MM/yyyy HH:mm')}</span>
                        <span>·</span>
                        <span>{apt.type}</span>
                        {apt.veterinarianName && (
                          <>
                            <span>·</span>
                            <span>Vet: {apt.veterinarianName}</span>
                          </>
                        )}
                      </div>
                      {apt.notes && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{apt.notes}</p>
                      )}
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>
      )}

      {/* ════════════════════════════════════════
          TAB: FINANCEIRO
      ════════════════════════════════════════ */}
      {activeTab === 'Financeiro' && (
        <section className="space-y-5">
          {/* Launch services */}
          <Card>
            <SectionTitle icon={<PlusCircle size={16} />}>
              Lançar serviços — {patient.name}
            </SectionTitle>
            <div className="space-y-2">
              {launchLines.map((line) => {
                const selectedService = services.find((s) => s.id === line.serviceId);
                const gross = line.quantity * line.unitPrice;
                const lineDiscount =
                  line.discountMode === 'percent'
                    ? (gross * line.discountValue) / 100
                    : line.discountValue;
                const lineTotal = Math.max(0, gross - lineDiscount);
                return (
                  <div
                    key={line.id}
                    className="grid grid-cols-2 md:grid-cols-9 gap-2 rounded-xl border border-gray-200 dark:border-gray-700 p-3 items-end"
                  >
                    <div className="col-span-2 md:col-span-3">
                      <label className={labelCls}>Serviço</label>
                      <select
                        value={line.serviceId}
                        onChange={(e) => updateLine(line.id, { serviceId: e.target.value })}
                        className={inputCls}
                      >
                        <option value="">Selecione um serviço</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>{s.name} ({currency(s.price)})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Qtd.</label>
                      <input
                        type="number"
                        min="1"
                        value={line.quantity}
                        onChange={(e) => updateLine(line.id, { quantity: Math.max(1, Number(e.target.value) || 1) })}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Preço unit.</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.unitPrice}
                        onChange={(e) => updateLine(line.id, { unitPrice: Math.max(0, Number(e.target.value) || 0) })}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Desconto</label>
                      <select
                        value={line.discountMode}
                        onChange={(e) => updateLine(line.id, { discountMode: e.target.value as DiscountMode })}
                        className={inputCls}
                      >
                        <option value="value">R$</option>
                        <option value="percent">%</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Valor desc.</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.discountValue}
                        onChange={(e) => updateLine(line.id, { discountValue: Math.max(0, Number(e.target.value) || 0) })}
                        className={inputCls}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 col-span-2 md:col-span-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {selectedService ? currency(lineTotal) : '—'}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setLaunchLines((prev) => (prev.length > 1 ? prev.filter((x) => x.id !== line.id) : prev))
                        }
                        className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Remover linha"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setLaunchLines((prev) => [
                    ...prev,
                    { id: randomId(), serviceId: '', quantity: 1, unitPrice: 0, discountMode: 'value', discountValue: 0 },
                  ])
                }
                className="px-3 py-2 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                + Adicionar serviço
              </button>
              <div className="ml-auto flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Desconto global:</span>
                <select
                  value={globalDiscountMode}
                  onChange={(e) => setGlobalDiscountMode(e.target.value as DiscountMode)}
                  className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-gray-50 dark:bg-gray-800"
                >
                  <option value="value">R$</option>
                  <option value="percent">%</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={globalDiscountValue}
                  onChange={(e) => setGlobalDiscountValue(Math.max(0, Number(e.target.value) || 0))}
                  className="w-24 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-gray-50 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-6 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal: <strong className="text-gray-900 dark:text-white">{currency(launchPreview.subtotal)}</strong>
                </span>
                {launchPreview.globalDiscount > 0 && (
                  <span className="text-gray-600 dark:text-gray-400">
                    Desconto: <strong className="text-red-600">− {currency(launchPreview.globalDiscount)}</strong>
                  </span>
                )}
                <span className="text-gray-800 dark:text-white font-bold text-base">
                  Total: <span className="text-primary">{currency(launchPreview.total)}</span>
                </span>
              </div>
              <button
                type="button"
                disabled={launchPreview.rows.length === 0}
                onClick={launchServices}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-primary/20"
              >
                Confirmar lançamento
              </button>
            </div>
          </Card>

          {/* Patient Charges */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <SectionTitle icon={<DollarSign size={16} />}>Cobranças do paciente</SectionTitle>
              {pendingDebt > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-semibold">
                  <AlertTriangle size={14} />
                  Pendente: {currency(pendingDebt)}
                </div>
              )}
            </div>

            {patientFinancial.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <DollarSign size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">Nenhum lançamento financeiro para este paciente.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {patientFinancial.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-50/40 dark:bg-gray-800/20"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{record.description}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {record.category} · {format(new Date(record.date), 'dd/MM/yyyy HH:mm')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-bold text-gray-900 dark:text-white">{currency(record.amount)}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateFinancialRecord(record.id, {
                            status: record.status === 'Pago' ? 'Pendente' : 'Pago',
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          record.status === 'Pago'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200'
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200'
                        }`}
                      >
                        {record.status === 'Pago' ? (
                          <><CheckCircle2 size={12} /> Pago</>
                        ) : (
                          <><Clock size={12} /> Pendente</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>
      )}
    </div>
  );
};
