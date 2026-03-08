import React, { useState } from 'react';
import { debounce } from '@/src/lib/utils';

// Types for patient/tutor info
interface PatientInfo {
  patientRecordId: string;
  name: string;
  species?: string;
  tutorRecordId: string;
}
interface TutorInfo {
  tutorRecordId: string;
  name: string;
  cpf?: string;
}
interface SupabaseImportBlockProps {
  adapter: any;
  onPick: (payload: { patient: PatientInfo; tutor: TutorInfo }) => void;
}

export const SupabaseImportBlock: React.FC<SupabaseImportBlockProps> = ({ adapter, onPick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PatientInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search
  const searchPatients = debounce(async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const found = await adapter.searchPatientsByName(q);
      setResults(found || []);
    } catch (err) {
      setError('Erro ao buscar pacientes');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 2) searchPatients(value);
    else setResults([]);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-slate-400">Buscar paciente</label>
      <input
        className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
        value={query}
        onChange={handleInput}
        placeholder="Digite o nome do paciente"
      />
      {loading && <div className="text-xs text-slate-400">Buscando…</div>}
      {error && <div className="text-xs text-red-400">{error}</div>}
      {results.length > 0 && (
        <ul className="mt-2 rounded-lg border border-[#335d2a] bg-[#12230f] p-2 text-sm text-white">
          {results.map((patient) => (
            <li key={patient.patientRecordId} className="flex items-center justify-between py-1">
              <span>
                {patient.name} <span className="text-xs text-slate-400">({patient.species || 'Paciente'})</span>
              </span>
              <button
                className="rxv-btn-secondary px-2 py-1 text-xs"
                onClick={async () => {
                  // Resolve tutor
                  const tutor = await adapter.getTutorById(patient.tutorRecordId);
                  onPick({ patient, tutor });
                }}
              >Selecionar</button>
            </li>
          ))}
        </ul>
      )}
      {results.length === 0 && query.length >= 2 && !loading && !error && (
        <div className="text-xs text-slate-400">Nenhum paciente encontrado</div>
      )}
    </div>
  );
};
