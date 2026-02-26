import React, { useMemo, useState } from 'react';
import { BedDouble, Plus } from 'lucide-react';
import { useData, InternmentEntry } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';

const TYPE_LABEL: Record<InternmentEntry['type'], string> = {
  procedimento: 'Procedimento',
  parametros: 'Parametros Clinicos',
  isobares: 'Isobares',
  evolucao: 'Evolucao',
  admissao: 'Admissao',
  exame: 'Exame',
};

export const Internment = () => {
  const { internments, patients, tutors, addInternmentEntry, addInternment } = useData();
  const { currentUser } = useClinicAuth();
  const [selectedInternmentId, setSelectedInternmentId] = useState<string | null>(internments[0]?.id ?? null);
  const [entryTitle, setEntryTitle] = useState('');
  const [entryNotes, setEntryNotes] = useState('');
  const [entryType, setEntryType] = useState<InternmentEntry['type']>('evolucao');

  const selected = useMemo(
    () => internments.find((item) => item.id === selectedInternmentId) ?? null,
    [internments, selectedInternmentId],
  );

  const getPatient = (patientId: string) => patients.find((p) => p.id === patientId);
  const getTutor = (tutorId: string) => tutors.find((t) => t.id === tutorId);

  const handleCreateInternment = () => {
    const patient = patients[0];
    if (!patient) return;
    addInternment({
      clinicId: patient.clinicId,
      patientId: patient.id,
      tutorId: patient.tutorId,
      bed: `B-${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}`,
      sector: 'Clinica Medica',
      status: 'Internado',
      admittedAt: new Date(),
      entries: [
        {
          id: 'seed',
          date: new Date(),
          type: 'admissao',
          title: 'Admissao inicial',
          notes: 'Paciente admitido para monitorizacao e cuidados continuos.',
          createdBy: currentUser.name,
        },
      ],
    });
  };

  const handleAddEntry = (e: React.FormEvent) => {
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
          <button onClick={handleCreateInternment} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white text-sm">
            <Plus size={16} /> Novo
          </button>
        </div>

        <div className="space-y-3 max-h-[70vh] overflow-auto pr-1">
          {internments.map((item) => {
            const patient = getPatient(item.patientId);
            return (
              <button
                key={item.id}
                onClick={() => setSelectedInternmentId(item.id)}
                className={`w-full text-left p-3 rounded-xl border transition ${selectedInternmentId === item.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-primary/40'}`}
              >
                <p className="font-semibold text-gray-900 dark:text-white">{patient?.name ?? 'Paciente'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Leito {item.bed} - {item.sector}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Status: {item.status}</p>
              </button>
            );
          })}
          {internments.length === 0 ? <p className="text-sm text-gray-500">Nenhum internamento registrado.</p> : null}
        </div>
      </section>

      <section className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        {selected ? (
          <>
            <div className="flex flex-wrap gap-6 mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{getPatient(selected.patientId)?.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tutor: {getTutor(selected.tutorId)?.name}</p>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p>Leito: {selected.bed}</p>
                <p>Setor: {selected.sector}</p>
              </div>
            </div>

            <form onSubmit={handleAddEntry} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
              <select value={entryType} onChange={(e) => setEntryType(e.target.value as InternmentEntry['type'])} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent">
                {Object.entries(TYPE_LABEL).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
              <input value={entryTitle} onChange={(e) => setEntryTitle(e.target.value)} placeholder="Titulo do registro" className="md:col-span-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
              <button className="px-3 py-2 rounded-lg bg-primary text-white inline-flex items-center justify-center gap-2">
                <Plus size={16} /> Registrar
              </button>
              <textarea value={entryNotes} onChange={(e) => setEntryNotes(e.target.value)} placeholder="Detalhes clinicos" className="md:col-span-4 min-h-20 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
            </form>

            <div className="space-y-3 max-h-[52vh] overflow-auto pr-1">
              {[...selected.entries]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((entry) => (
                  <article key={entry.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{TYPE_LABEL[entry.type]}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{entry.notes}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{new Date(entry.date).toLocaleString('pt-BR')} - {entry.createdBy}</p>
                  </article>
                ))}
            </div>
          </>
        ) : (
          <div className="h-full min-h-[50vh] flex items-center justify-center text-gray-500">
            Selecione um internamento para ver o historico.
          </div>
        )}
      </section>
    </div>
  );
};
