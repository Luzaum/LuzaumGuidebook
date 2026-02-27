import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BedDouble,
  Plus,
  ArrowRight,
  Activity,
  Receipt,
  Stethoscope,
  ClipboardList,
  CalendarClock,
  UserRound,
  PawPrint,
  Wallet,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useData, InternmentEntry } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { Modal } from '../components/ui/Modal';
import { dvPath } from '../DadosVeterinariosModule';

type EntryType = InternmentEntry['type'];

type ServiceLaunchDraft = {
  serviceId: string;
  search: string;
  quantity: number;
  unitPrice: number;
  notes: string;
};

const TYPE_LABEL: Record<EntryType, string> = {
  procedimento: 'Procedimento',
  parametros: 'Parâmetros Clínicos',
  isobares: 'Isobares',
  evolucao: 'Conduta / Evolução',
  admissao: 'Admissão',
  exame: 'Exame',
};

const TYPE_COLOR: Record<EntryType, string> = {
  admissao: 'bg-rose-600 text-white',
  evolucao: 'bg-sky-600 text-white',
  procedimento: 'bg-amber-500 text-white',
  parametros: 'bg-teal-600 text-white',
  isobares: 'bg-violet-600 text-white',
  exame: 'bg-emerald-600 text-white',
};

const randomId = () => Math.random().toString(36).slice(2, 10);
const toMoney = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const ROUTE_OPTIONS = ['VO', 'IV', 'IM', 'SC', 'ID', 'IN', 'Retal', 'Auricular', 'Oftálmica', 'Tópica', 'Nebulização', 'CRI'];
const DOSE_UNITS = ['mg', 'mg/kg', 'g', 'mcg', 'mcg/kg', 'mL', 'mL/kg', 'UI', 'UI/kg', 'gota', 'gotas', 'comprimido', 'cp', 'cápsula', 'ampola', 'frasco', '%'];

const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors';
const labelClass = 'block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1';

export const Internment = () => {
  const {
    internments,
    patients,
    tutors,
    services,
    addInternment,
    addInternmentEntry,
    updateInternmentStatus,
    addExecutionTask,
    addFinancialRecord,
  } = useData();
  const { currentUser, selectedClinicId } = useClinicAuth();
  const navigate = useNavigate();

  const [selectedInternmentId, setSelectedInternmentId] = useState<string>(internments[0]?.id ?? '');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [newTutorId, setNewTutorId] = useState('');
  const [newPatientId, setNewPatientId] = useState('');
  const [newBed, setNewBed] = useState('');
  const [newSector, setNewSector] = useState<'UTI' | 'Semi-Intensivo' | 'Internamento'>('UTI');
  const [newChiefComplaint, setNewChiefComplaint] = useState('');
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newPrognosis, setNewPrognosis] = useState('');
  const [openPatientAfterInternment, setOpenPatientAfterInternment] = useState(true);

  const [entryTitle, setEntryTitle] = useState('');
  const [entryNotes, setEntryNotes] = useState('');
  const [entryType, setEntryType] = useState<EntryType>('evolucao');

  const [taskDate, setTaskDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [taskTime, setTaskTime] = useState('08:00');
  const [taskMedication, setTaskMedication] = useState('');
  const [taskDoseAmount, setTaskDoseAmount] = useState('');
  const [taskDoseUnit, setTaskDoseUnit] = useState('mg/kg');
  const [taskRoute, setTaskRoute] = useState('VO');
  const [taskFrequencyPerDay, setTaskFrequencyPerDay] = useState(1);
  const [taskNotes, setTaskNotes] = useState('');

  const [serviceDraft, setServiceDraft] = useState<ServiceLaunchDraft>({
    serviceId: '',
    search: '',
    quantity: 1,
    unitPrice: 0,
    notes: '',
  });
  const [serviceSearchFocused, setServiceSearchFocused] = useState(false);
  const [isDischargeModalOpen, setIsDischargeModalOpen] = useState(false);
  const [dischargeReason, setDischargeReason] = useState('');
  const [dischargeCondition, setDischargeCondition] = useState('');
  const [dischargePrognosis, setDischargePrognosis] = useState('');

  const selected = useMemo(
    () => internments.find((item) => item.id === selectedInternmentId) ?? null,
    [internments, selectedInternmentId],
  );

  const selectedTutor = useMemo(() => tutors.find((t) => t.id === selected?.tutorId), [tutors, selected]);
  const selectedPatient = useMemo(() => patients.find((p) => p.id === selected?.patientId), [patients, selected]);

  const patientsForTutor = useMemo(() => {
    if (!newTutorId) return [];
    return patients.filter((p) => p.tutorId === newTutorId);
  }, [patients, newTutorId]);

  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceDraft.serviceId),
    [services, serviceDraft.serviceId],
  );

  const filteredServices = useMemo(() => {
    const needle = serviceDraft.search.trim().toLowerCase();
    if (!needle) return services.slice(0, 20);
    return services
      .filter((service) => [service.name, service.category, service.description].join(' ').toLowerCase().includes(needle))
      .slice(0, 20);
  }, [services, serviceDraft.search]);

  const sortedEntries = useMemo(
    () => [...(selected?.entries || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [selected],
  );

  const resetInternmentForm = () => {
    setIsNewModalOpen(false);
    setNewTutorId('');
    setNewPatientId('');
    setNewBed('');
    setNewSector('UTI');
    setNewChiefComplaint('');
    setNewDiagnosis('');
    setNewPrognosis('');
    setOpenPatientAfterInternment(true);
  };

  const saveInternment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTutorId || !newPatientId) return;

    const patient = patients.find((item) => item.id === newPatientId);
    const internmentId = addInternment({
      clinicId: selectedClinicId === 'all' ? patient?.clinicId : selectedClinicId,
      patientId: newPatientId,
      tutorId: newTutorId,
      bed: newBed || `B-${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}`,
      sector: newSector,
      chiefComplaint: newChiefComplaint,
      presumptiveDiagnosis: newDiagnosis,
      prognosis: newPrognosis,
      status: 'Internado',
      admittedAt: new Date(),
      entries: [
        {
          id: randomId(),
          date: new Date(),
          type: 'admissao',
          title: 'Admissão em internamento',
          notes: `${newChiefComplaint || 'Sem queixa registrada.'} Diagnóstico presuntivo: ${newDiagnosis || 'não informado'}. Prognóstico: ${newPrognosis || 'não informado'}.`,
          createdBy: currentUser.name,
        },
      ],
    });

    setSelectedInternmentId(internmentId);

    if (openPatientAfterInternment) {
      navigate(dvPath(`patients/${newPatientId}?tab=Resumo`));
      return;
    }

    resetInternmentForm();
  };

  const saveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !entryTitle.trim()) return;

    addInternmentEntry(selected.id, {
      type: entryType,
      title: entryTitle.trim(),
      notes: entryNotes.trim(),
      createdBy: currentUser.name,
    });

    setEntryTitle('');
    setEntryNotes('');
    setEntryType('evolucao');
  };

  const saveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !taskMedication.trim()) return;

    const [h, m] = taskTime.split(':').map(Number);
    const base = new Date(taskDate);
    base.setHours(h, m, 0, 0);
    if (Number.isNaN(base.getTime())) return;

    const frequency = Math.min(24, Math.max(1, Number(taskFrequencyPerDay) || 1));
    const intervalMinutes = (24 * 60) / frequency;
    const schedules = Array.from({ length: frequency }, (_, index) => {
      const scheduled = new Date(base);
      scheduled.setMinutes(base.getMinutes() + Math.round(index * intervalMinutes));
      return scheduled;
    });

    const dosage = taskDoseAmount.trim() ? `${taskDoseAmount.trim()} ${taskDoseUnit}` : undefined;

    schedules.forEach((scheduledAt, index) => {
      addExecutionTask({
        clinicId: selectedClinicId === 'all' ? selected.clinicId : selectedClinicId,
        internmentId: selected.id,
        patientId: selected.patientId,
        tutorId: selected.tutorId,
        scheduledAt,
        medication: taskMedication.trim(),
        dosage,
        route: taskRoute || undefined,
        notes: taskNotes.trim() ? `${taskNotes.trim()}${schedules.length > 1 ? ` | Aplicação ${index + 1}/${schedules.length}` : ''}` : undefined,
        doneBy: currentUser.name,
      });
    });

    addInternmentEntry(selected.id, {
      type: 'procedimento',
      title: `Programação no mapa: ${taskMedication.trim()}`,
      notes: `Início ${base.toLocaleString('pt-BR')} | ${frequency}x/dia${dosage ? ` | Dose: ${dosage}` : ''}${taskRoute ? ` | Via: ${taskRoute}` : ''}${taskNotes ? ` | Obs: ${taskNotes}` : ''}`,
      createdBy: currentUser.name,
    });

    setTaskMedication('');
    setTaskDoseAmount('');
    setTaskDoseUnit('mg/kg');
    setTaskRoute('VO');
    setTaskFrequencyPerDay(1);
    setTaskNotes('');
  };

  const pickService = (serviceId: string) => {
    const service = services.find((item) => item.id === serviceId);
    if (!service) return;

    setServiceDraft((prev) => ({
      ...prev,
      serviceId,
      search: service.name,
      unitPrice: service.price,
    }));
    setServiceSearchFocused(false);
  };

  const launchService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !selectedPatient || !selectedService) return;

    const qty = Math.max(1, Number(serviceDraft.quantity) || 1);
    const unit = Math.max(0, Number(serviceDraft.unitPrice) || 0);
    const total = Number((qty * unit).toFixed(2));
    if (total <= 0) return;

    addFinancialRecord({
      id: randomId(),
      clinicId: selectedClinicId === 'all' ? selected.clinicId : selectedClinicId,
      description: `Internamento: ${selectedService.name} x${qty} — ${selectedPatient.name} [Paciente ${selectedPatient.id}]`,
      amount: total,
      type: 'Receita',
      category: selectedService.category || 'Internamento',
      date: new Date(),
      status: 'Pendente',
      patientId: selected.patientId,
    });

    addInternmentEntry(selected.id, {
      type: 'procedimento',
      title: `Lançamento financeiro: ${selectedService.name}`,
      notes: `Serviço registrado com custo de ${toMoney(total)}.${serviceDraft.notes ? ` Observações: ${serviceDraft.notes}` : ''}`,
      createdBy: currentUser.name,
    });

    setServiceDraft({ serviceId: '', search: '', quantity: 1, unitPrice: 0, notes: '' });
  };

  const resetDischargeForm = () => {
    setIsDischargeModalOpen(false);
    setDischargeReason('');
    setDischargeCondition('');
    setDischargePrognosis('');
  };

  const handleDischarge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !dischargeReason.trim() || !dischargeCondition.trim() || !dischargePrognosis.trim()) return;

    updateInternmentStatus(selected.id, 'Alta');
    addInternmentEntry(selected.id, {
      type: 'evolucao',
      title: 'Alta hospitalar',
      notes: `Motivo da alta: ${dischargeReason.trim()} | Condição atual: ${dischargeCondition.trim()} | Prognóstico: ${dischargePrognosis.trim()}`,
      createdBy: currentUser.name,
    });
    resetDischargeForm();
  };

  return (
    <div className="min-h-full grid grid-cols-1 xl:grid-cols-3 gap-6 text-gray-900 dark:text-gray-100">
      <section className="xl:col-span-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/90 backdrop-blur-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <BedDouble size={20} className="text-primary" /> Internamento
          </h1>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-white text-sm font-semibold shadow-md shadow-primary/20"
          >
            <Plus size={16} /> Novo
          </button>
        </div>

        <div className="space-y-3 max-h-[72vh] overflow-auto pr-1">
          {internments.map((item) => {
            const patient = patients.find((p) => p.id === item.patientId);
            return (
              <button
                key={item.id}
                onClick={() => setSelectedInternmentId(item.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${selectedInternmentId === item.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/40 bg-white dark:bg-gray-900'
                  }`}
              >
                <p className="font-semibold text-gray-900 dark:text-white">{patient?.name ?? 'Paciente'}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Leito {item.bed} • {item.sector}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Status: {item.status}</p>
              </button>
            );
          })}
          {internments.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-300">Nenhum internamento registrado.</p>
          ) : null}
        </div>
      </section>

      <section className="xl:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/90 backdrop-blur-md p-5">
        {selected ? (
          <>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPatient?.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Tutor: {selectedTutor?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Leito {selected.bed} • {selected.sector} • {selected.status}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={dvPath(`patients/${selected.patientId}?tab=Resumo`)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:border-primary"
                >
                  <PawPrint size={14} /> Abrir paciente
                </Link>
                <Link
                  to={dvPath(`patients/${selected.patientId}?tab=Financeiro`)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:border-primary"
                >
                  <Wallet size={14} /> Conta do paciente
                </Link>
                <Link
                  to={dvPath('execution-map')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold"
                >
                  Mapa de Execução <ArrowRight size={14} />
                </Link>
                {selected.status !== 'Alta' && (
                  <button
                    type="button"
                    onClick={() => setIsDischargeModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-300 text-rose-700 dark:text-rose-300 text-sm font-semibold hover:bg-rose-50 dark:hover:bg-rose-900/20"
                  >
                    Dar alta
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 text-sm">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 bg-white/80 dark:bg-gray-900/70">
                <p className="text-xs text-gray-600 dark:text-gray-300">Queixa principal</p>
                <p className="font-medium text-gray-900 dark:text-white">{selected.chiefComplaint || '-'}</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 bg-white/80 dark:bg-gray-900/70">
                <p className="text-xs text-gray-600 dark:text-gray-300">Diagnóstico presuntivo</p>
                <p className="font-medium text-gray-900 dark:text-white">{selected.presumptiveDiagnosis || '-'}</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 bg-white/80 dark:bg-gray-900/70">
                <p className="text-xs text-gray-600 dark:text-gray-300">Prognóstico</p>
                <p className="font-medium text-gray-900 dark:text-white">{selected.prognosis || '-'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <motion.form
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={saveTask}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-4"
              >
                <h3 className="font-bold text-gray-900 dark:text-white inline-flex items-center gap-2 mb-3">
                  <ClipboardList size={16} className="text-primary" /> Programar no mapa de execução
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className={labelClass}>Data</label>
                    <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Hora</label>
                    <input type="time" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Medicação / tarefa *</label>
                    <input value={taskMedication} onChange={(e) => setTaskMedication(e.target.value)} className={inputClass} placeholder="Ex.: Dipirona IV" required />
                  </div>
                  <div>
                    <label className={labelClass}>Dose</label>
                    <input value={taskDoseAmount} onChange={(e) => setTaskDoseAmount(e.target.value)} className={inputClass} placeholder="Ex.: 25" />
                  </div>
                  <div>
                    <label className={labelClass}>Unidade da dose</label>
                    <select value={taskDoseUnit} onChange={(e) => setTaskDoseUnit(e.target.value)} className={inputClass}>
                      {DOSE_UNITS.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Via</label>
                    <select value={taskRoute} onChange={(e) => setTaskRoute(e.target.value)} className={inputClass}>
                      {ROUTE_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Frequência por dia</label>
                    <input type="number" min={1} max={24} value={taskFrequencyPerDay} onChange={(e) => setTaskFrequencyPerDay(Math.min(24, Math.max(1, Number(e.target.value) || 1)))} className={inputClass} />
                  </div>
                </div>
                <label className={labelClass}>Observações</label>
                <textarea value={taskNotes} onChange={(e) => setTaskNotes(e.target.value)} className={`${inputClass} min-h-[72px]`} placeholder="Conduta, janela de aplicação, alertas..." />
                <div className="flex justify-end mt-3">
                  <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold inline-flex items-center gap-2">
                    <CalendarClock size={14} /> Adicionar ao mapa
                  </button>
                </div>
              </motion.form>

              <motion.form
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 }}
                onSubmit={saveEntry}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-4"
              >
                <h3 className="font-bold text-gray-900 dark:text-white inline-flex items-center gap-2 mb-3">
                  <Stethoscope size={16} className="text-primary" /> Condutas e registros clínicos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Tipo de registro</label>
                    <select
                      value={entryType}
                      onChange={(e) => setEntryType(e.target.value as EntryType)}
                      className={inputClass}
                    >
                      {Object.entries(TYPE_LABEL).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Título *</label>
                    <input value={entryTitle} onChange={(e) => setEntryTitle(e.target.value)} className={inputClass} placeholder="Ex.: Parâmetros 08:00" required />
                  </div>
                </div>
                <label className={labelClass}>Detalhes</label>
                <textarea value={entryNotes} onChange={(e) => setEntryNotes(e.target.value)} className={`${inputClass} min-h-[98px]`} placeholder="FC, FR, PA, temperatura, glicemia, conduta, observações..." />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <button type="button" onClick={() => setEntryType('parametros')} className="px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">Parâmetros</button>
                    <button type="button" onClick={() => setEntryType('isobares')} className="px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">Isobares</button>
                    <button type="button" onClick={() => setEntryType('evolucao')} className="px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">Conduta</button>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold inline-flex items-center gap-2">
                    <Plus size={14} /> Registrar
                  </button>
                </div>
              </motion.form>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              onSubmit={launchService}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-4 mb-6"
            >
              <h3 className="font-bold text-gray-900 dark:text-white inline-flex items-center gap-2 mb-3">
                <Receipt size={16} className="text-primary" /> Serviços e débitos do internado
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                <div className="md:col-span-2 relative">
                  <label className={labelClass}>Serviço (catálogo)</label>
                  <input
                    value={serviceDraft.search}
                    onChange={(e) => {
                      setServiceDraft((prev) => ({ ...prev, search: e.target.value, serviceId: '' }));
                      setServiceSearchFocused(true);
                    }}
                    onFocus={() => setServiceSearchFocused(true)}
                    onBlur={() => setTimeout(() => setServiceSearchFocused(false), 120)}
                    className={inputClass}
                    placeholder="Digite para buscar serviço..."
                  />
                  {serviceSearchFocused && (
                    <div className="absolute z-20 left-0 right-0 mt-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl max-h-56 overflow-auto">
                      {filteredServices.length === 0 ? (
                        <p className="px-3 py-2 text-xs text-gray-500">Nenhum serviço encontrado.</p>
                      ) : (
                        filteredServices.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => pickService(service.id)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{service.name}</p>
                            <p className="text-xs text-gray-500">{service.category} • {toMoney(service.price)}</p>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Qtd.</label>
                  <input type="number" min={1} value={serviceDraft.quantity} onChange={(e) => setServiceDraft((prev) => ({ ...prev, quantity: Math.max(1, Number(e.target.value) || 1) }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Preço unitário</label>
                  <input type="number" min={0} step="0.01" value={serviceDraft.unitPrice} onChange={(e) => setServiceDraft((prev) => ({ ...prev, unitPrice: Math.max(0, Number(e.target.value) || 0) }))} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 items-end">
                <div>
                  <label className={labelClass}>Observações do lançamento</label>
                  <input value={serviceDraft.notes} onChange={(e) => setServiceDraft((prev) => ({ ...prev, notes: e.target.value }))} className={inputClass} placeholder="Ex.: serviço realizado às 11:40" />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total a lançar:</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{toMoney(Math.max(0, serviceDraft.quantity * serviceDraft.unitPrice))}</p>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <button type="submit" disabled={!selectedService || serviceDraft.unitPrice <= 0} className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-50">
                  Lançar débito na conta
                </button>
              </div>
            </motion.form>

            <div className="space-y-3 max-h-[45vh] overflow-auto pr-1">
              {sortedEntries.map((entry) => (
                <article key={entry.id} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
                  <div className={`px-4 py-2 text-sm font-semibold ${TYPE_COLOR[entry.type]}`}>
                    {TYPE_LABEL[entry.type]} — {entry.title}
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{entry.notes || 'Sem detalhes.'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 inline-flex items-center gap-1.5">
                      <UserRound size={12} /> {new Date(entry.date).toLocaleString('pt-BR')} • {entry.createdBy}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full min-h-[50vh] flex items-center justify-center text-gray-600 dark:text-gray-300">
            Selecione um internamento para ver o histórico.
          </div>
        )}
      </section>

      <Modal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} title="Novo internamento" className="max-w-5xl">
        <form onSubmit={saveInternment} className="space-y-4 text-gray-900 dark:text-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Tutor</label>
              <select
                value={newTutorId}
                onChange={(e) => {
                  setNewTutorId(e.target.value);
                  setNewPatientId('');
                }}
                className={inputClass}
                required
              >
                <option value="">Selecione o tutor</option>
                {tutors.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Paciente</label>
              <select
                value={newPatientId}
                onChange={(e) => setNewPatientId(e.target.value)}
                className={inputClass}
                required
                disabled={!newTutorId}
              >
                <option value="">Selecione o paciente</option>
                {patientsForTutor.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Setor</label>
              <select value={newSector} onChange={(e) => setNewSector(e.target.value as 'UTI' | 'Semi-Intensivo' | 'Internamento')} className={inputClass}>
                <option value="UTI">UTI</option>
                <option value="Semi-Intensivo">Semi-Intensivo</option>
                <option value="Internamento">Internamento</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Leito</label>
              <input value={newBed} onChange={(e) => setNewBed(e.target.value)} className={inputClass} placeholder="Ex.: UTI-03" />
            </div>
          </div>

          <textarea value={newChiefComplaint} onChange={(e) => setNewChiefComplaint(e.target.value)} placeholder="Queixa principal" className={`${inputClass} min-h-[70px]`} required />
          <textarea value={newDiagnosis} onChange={(e) => setNewDiagnosis(e.target.value)} placeholder="Diagnóstico presuntivo" className={`${inputClass} min-h-[70px]`} />
          <textarea value={newPrognosis} onChange={(e) => setNewPrognosis(e.target.value)} placeholder="Prognóstico" className={`${inputClass} min-h-[70px]`} />

          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={openPatientAfterInternment}
              onChange={(e) => setOpenPatientAfterInternment(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            Após internar, abrir a página do paciente automaticamente.
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={resetInternmentForm} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-white font-semibold inline-flex items-center gap-2">
              <Activity size={14} /> Internar paciente
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDischargeModalOpen} onClose={resetDischargeForm} title="Dar alta do internamento" className="max-w-2xl">
        <form onSubmit={handleDischarge} className="space-y-3">
          <div>
            <label className={labelClass}>Motivo da alta *</label>
            <textarea value={dischargeReason} onChange={(e) => setDischargeReason(e.target.value)} className={`${inputClass} min-h-[72px]`} required />
          </div>
          <div>
            <label className={labelClass}>Condição atual do paciente *</label>
            <textarea value={dischargeCondition} onChange={(e) => setDischargeCondition(e.target.value)} className={`${inputClass} min-h-[72px]`} required />
          </div>
          <div>
            <label className={labelClass}>Prognóstico *</label>
            <textarea value={dischargePrognosis} onChange={(e) => setDischargePrognosis(e.target.value)} className={`${inputClass} min-h-[72px]`} required />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={resetDischargeForm} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold">
              Confirmar alta
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
