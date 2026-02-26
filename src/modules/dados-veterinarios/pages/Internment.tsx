import React, { useMemo, useState } from 'react';
import { BedDouble, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData, InternmentEntry } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { Modal } from '../components/ui/Modal';
import { dvPath } from '../DadosVeterinariosModule';

const TYPE_LABEL: Record<InternmentEntry['type'], string> = {
  procedimento: 'Procedimento',
  parametros: 'Parâmetros Clínicos',
  isobares: 'Isobares',
  evolucao: 'Evolução',
  admissao: 'Admissão',
  exame: 'Exame',
};

const randomId = () => Math.random().toString(36).slice(2, 10);

export const Internment = () => {
  const { internments, patients, tutors, addInternment, addInternmentEntry } = useData();
  const { currentUser, selectedClinicId } = useClinicAuth();

  const [selectedInternmentId, setSelectedInternmentId] = useState<string>(internments[0]?.id ?? '');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newTutorId, setNewTutorId] = useState('');
  const [newPatientId, setNewPatientId] = useState('');
  const [newBed, setNewBed] = useState('');
  const [newSector, setNewSector] = useState<'UTI' | 'Semi-Intensivo' | 'Internamento'>('UTI');
  const [newChiefComplaint, setNewChiefComplaint] = useState('');
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newPrognosis, setNewPrognosis] = useState('');

  const [entryTitle, setEntryTitle] = useState('');
  const [entryNotes, setEntryNotes] = useState('');
  const [entryType, setEntryType] = useState<InternmentEntry['type']>('evolucao');

  const selected = useMemo(
    () => internments.find((item) => item.id === selectedInternmentId) ?? null,
    [internments, selectedInternmentId],
  );

  const patientsForTutor = useMemo(() => {
    if (!newTutorId) return [];
    return patients.filter((p) => p.tutorId === newTutorId);
  }, [patients, newTutorId]);

  const selectedTutor = tutors.find((t) => t.id === selected?.tutorId);
  const selectedPatient = patients.find((p) => p.id === selected?.patientId);

  const saveInternment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTutorId || !newPatientId) return;
    addInternment({
      clinicId: selectedClinicId === 'all' ? patients.find((p) => p.id === newPatientId)?.clinicId : selectedClinicId,
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
          title: 'Admissão inicial',
          notes: `${newChiefComplaint || 'Sem queixa registrada.'} Diagnóstico presuntivo: ${newDiagnosis || 'não informado'}. Prognóstico: ${newPrognosis || 'não informado'}.`,
          createdBy: currentUser.name,
        },
      ],
    });
    setIsNewModalOpen(false);
    setNewTutorId('');
    setNewPatientId('');
    setNewBed('');
    setNewSector('UTI');
    setNewChiefComplaint('');
    setNewDiagnosis('');
    setNewPrognosis('');
  };

  const saveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !entryTitle.trim()) return;
    addInternmentEntry(selected.id, {
      type: entryType,
      title: entryTitle,
      notes: entryNotes,
      createdBy: currentUser.name,
    });
    setEntryTitle('');
    setEntryNotes('');
    setEntryType('evolucao');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <section className="xl:col-span-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BedDouble size={20} className="text-primary" /> Internamento
          </h1>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white text-sm"
          >
            <Plus size={16} /> Novo
          </button>
        </div>

        <div className="space-y-3 max-h-[70vh] overflow-auto pr-1">
          {internments.map((item) => {
            const patient = patients.find((p) => p.id === item.patientId);
            return (
              <button
                key={item.id}
                onClick={() => setSelectedInternmentId(item.id)}
                className={`w-full text-left p-3 rounded-xl border transition ${
                  selectedInternmentId === item.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/40'
                }`}
              >
                <p className="font-semibold text-gray-900 dark:text-white">{patient?.name ?? 'Paciente'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Leito {item.bed} • {item.sector}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Status: {item.status}</p>
              </button>
            );
          })}
          {internments.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum internamento registrado.</p>
          ) : null}
        </div>
      </section>

      <section className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        {selected ? (
          <>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPatient?.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tutor: {selectedTutor?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Leito {selected.bed} • {selected.sector} • {selected.status}
                </p>
              </div>
              <Link
                to={dvPath('execution-map')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-primary"
              >
                Mapa de Execução <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 text-sm">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <p className="text-xs text-gray-500">Queixa principal</p>
                <p className="font-medium text-gray-900 dark:text-white">{selected.chiefComplaint || '-'}</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <p className="text-xs text-gray-500">Diagnóstico presuntivo</p>
                <p className="font-medium text-gray-900 dark:text-white">{selected.presumptiveDiagnosis || '-'}</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <p className="text-xs text-gray-500">Prognóstico</p>
                <p className="font-medium text-gray-900 dark:text-white">{selected.prognosis || '-'}</p>
              </div>
            </div>

            <form onSubmit={saveEntry} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
              <select
                value={entryType}
                onChange={(e) => setEntryType(e.target.value as InternmentEntry['type'])}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"
              >
                {Object.entries(TYPE_LABEL).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                placeholder="Título do registro"
                className="md:col-span-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"
              />
              <button className="px-3 py-2 rounded-lg bg-primary text-white inline-flex items-center justify-center gap-2">
                <Plus size={16} /> Registrar
              </button>
              <textarea
                value={entryNotes}
                onChange={(e) => setEntryNotes(e.target.value)}
                placeholder="Detalhes clínicos"
                className="md:col-span-4 min-h-20 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"
              />
            </form>

            <div className="space-y-3 max-h-[52vh] overflow-auto pr-1">
              {[...selected.entries]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((entry) => (
                  <article key={entry.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {TYPE_LABEL[entry.type]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{entry.notes}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {new Date(entry.date).toLocaleString('pt-BR')} • {entry.createdBy}
                    </p>
                  </article>
                ))}
            </div>
          </>
        ) : (
          <div className="h-full min-h-[50vh] flex items-center justify-center text-gray-500">
            Selecione um internamento para ver o histórico.
          </div>
        )}
      </section>

      <Modal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} title="Novo internamento" className="max-w-3xl">
        <form onSubmit={saveInternment} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tutor</label>
              <select
                value={newTutorId}
                onChange={(e) => {
                  setNewTutorId(e.target.value);
                  setNewPatientId('');
                }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
                required
              >
                <option value="">Selecione o tutor</option>
                {tutors.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paciente</label>
              <select
                value={newPatientId}
                onChange={(e) => setNewPatientId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
                required
                disabled={!newTutorId}
              >
                <option value="">Selecione o paciente</option>
                {patientsForTutor.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Setor</label>
              <select
                value={newSector}
                onChange={(e) => setNewSector(e.target.value as 'UTI' | 'Semi-Intensivo' | 'Internamento')}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <option value="UTI">UTI</option>
                <option value="Semi-Intensivo">Semi-Intensivo</option>
                <option value="Internamento">Internamento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leito</label>
              <input
                value={newBed}
                onChange={(e) => setNewBed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
                placeholder="Ex.: UTI-03"
              />
            </div>
          </div>

          <textarea
            value={newChiefComplaint}
            onChange={(e) => setNewChiefComplaint(e.target.value)}
            placeholder="Queixa principal"
            className="w-full min-h-[70px] px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
            required
          />
          <textarea
            value={newDiagnosis}
            onChange={(e) => setNewDiagnosis(e.target.value)}
            placeholder="Diagnóstico presuntivo"
            className="w-full min-h-[70px] px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
          />
          <textarea
            value={newPrognosis}
            onChange={(e) => setNewPrognosis(e.target.value)}
            placeholder="Prognóstico"
            className="w-full min-h-[70px] px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsNewModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-white font-semibold">
              Internar paciente
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
