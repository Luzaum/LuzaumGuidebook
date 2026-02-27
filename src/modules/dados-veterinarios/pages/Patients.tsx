import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Dog, Cat, Heart, Skull, SlidersHorizontal,
  TrendingUp, TrendingDown, Minus, Scissors, Cpu, User, ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useData, Patient } from '../context/DataContext';
import { Modal } from '../components/ui/Modal';
import { dvPath } from '../DadosVeterinariosModule';

const inputCls = 'w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white text-sm';
const labelCls = 'block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide';

export const Patients = () => {
  const navigate = useNavigate();
  const { patients, tutors, addPatient, getTutorName } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sexFilter, setSexFilter] = useState('');

  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    species: 'Canino',
    sex: 'Macho',
    status: 'Vivo',
    castrated: false,
    microchipped: false,
  });
  const draftKey = 'dv:patients:new-draft';

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(draftKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<{
        isModalOpen: boolean;
        newPatient: Partial<Patient>;
        searchTerm: string;
        speciesFilter: string;
        statusFilter: string;
        sexFilter: string;
      }>;
      if (typeof parsed.isModalOpen === 'boolean') setIsModalOpen(parsed.isModalOpen);
      if (parsed.newPatient) setNewPatient((prev) => ({ ...prev, ...parsed.newPatient }));
      if (typeof parsed.searchTerm === 'string') setSearchTerm(parsed.searchTerm);
      if (typeof parsed.speciesFilter === 'string') setSpeciesFilter(parsed.speciesFilter);
      if (typeof parsed.statusFilter === 'string') setStatusFilter(parsed.statusFilter);
      if (typeof parsed.sexFilter === 'string') setSexFilter(parsed.sexFilter);
    } catch (error) {
      console.warn('[Patients] Failed to hydrate draft:', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        draftKey,
        JSON.stringify({
          isModalOpen,
          newPatient,
          searchTerm,
          speciesFilter,
          statusFilter,
          sexFilter,
        }),
      );
    } catch (error) {
      console.warn('[Patients] Failed to persist draft:', error);
    }
  }, [isModalOpen, newPatient, searchTerm, speciesFilter, statusFilter, sexFilter]);

  // ── Stats
  const stats = useMemo(() => ({
    total: patients.length,
    caninos: patients.filter((p) => p.species === 'Canino' || p.species === 'Cão').length,
    felinos: patients.filter((p) => p.species === 'Felino' || p.species === 'Gato').length,
    ativos: patients.filter((p) => p.status === 'Vivo').length,
    obito: patients.filter((p) => p.status === 'Óbito').length,
  }), [patients]);

  const filteredPatients = useMemo(() => patients.filter((patient) => {
    const tutorName = getTutorName(patient.tutorId);
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.breed || '').toLowerCase().includes(searchTerm.toLowerCase());

    const speciesNorm = patient.species === 'Cão' ? 'Canino' : patient.species === 'Gato' ? 'Felino' : patient.species;
    const matchesSpecies = speciesFilter ? speciesNorm === speciesFilter : true;
    const matchesStatus = statusFilter ? patient.status === statusFilter : true;
    const matchesSex = sexFilter ? (patient.sex || patient.gender) === sexFilter : true;

    return matchesSearch && matchesSpecies && matchesStatus && matchesSex;
  }), [patients, searchTerm, speciesFilter, statusFilter, sexFilter, getTutorName]);

  const handleSavePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.tutorId || !newPatient.species) return;
    const speciesNorm = newPatient.species as string;
    const imageUrl =
      speciesNorm === 'Canino' || speciesNorm === 'Cão'
        ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&h=200'
        : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&h=200';
    addPatient({
      id: '',
      ...(newPatient as Patient),
      imageUrl,
      vaccines: [],
      weightHistory: [],
      anamnesis: [],
      exams: [],
      procedures: [],
    });
    setIsModalOpen(false);
    setNewPatient({ species: 'Canino', sex: 'Macho', status: 'Vivo', castrated: false, microchipped: false });
    window.localStorage.removeItem(draftKey);
  };

  const activeFiltersCount = [speciesFilter, statusFilter, sexFilter].filter(Boolean).length;

  return (
    <div className="dv-aurora-bg dv-section-enter space-y-6 rounded-[28px] p-3 md:p-5 min-h-full flex flex-col">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Gestão de Pacientes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-0.5 text-sm">
            Prontuários, histórico clínico e informações dos pets.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-primary/25 shrink-0"
        >
          <Plus size={18} />
          Novo Paciente
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Total', value: stats.total, cls: 'text-gray-900 dark:text-white' },
          { label: 'Caninos', value: stats.caninos, cls: 'text-amber-600', icon: <Dog size={14} /> },
          { label: 'Felinos', value: stats.felinos, cls: 'text-violet-600', icon: <Cat size={14} /> },
          { label: 'Ativos', value: stats.ativos, cls: 'text-green-600', icon: <Heart size={14} className="fill-current" /> },
          { label: 'Óbito', value: stats.obito, cls: 'text-gray-500', icon: <Skull size={14} /> },
        ].map((s) => (
          <div
            key={s.label}
            className="dv-glass-card bg-white/90 dark:bg-gray-900/75 backdrop-blur-md rounded-2xl border border-gray-100/80 dark:border-gray-800/80 p-4 transition-all duration-300"
          >
            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold flex items-center gap-1.5">
              {s.icon}{s.label}
            </p>
            <p className={`text-2xl font-bold mt-1 ${s.cls}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Search & Filters ── */}
      <div className="dv-glass-card bg-white/90 dark:bg-gray-900/75 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100/80 dark:border-gray-800/80 p-4 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nome, raça ou tutor..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 border rounded-xl font-medium flex items-center gap-2 transition-colors text-sm ${showFilters || activeFiltersCount > 0
                ? 'bg-primary/10 border-primary text-primary'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
          >
            <SlidersHorizontal size={16} />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Espécie</label>
                  <select
                    className={inputCls}
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                  >
                    <option value="">Todas as espécies</option>
                    <option value="Canino">Canino</option>
                    <option value="Felino">Felino</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select
                    className={inputCls}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="Vivo">Ativo</option>
                    <option value="Óbito">Óbito</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Sexo</label>
                  <select
                    className={inputCls}
                    value={sexFilter}
                    onChange={(e) => setSexFilter(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => { setSpeciesFilter(''); setStatusFilter(''); setSexFilter(''); }}
                  className="mt-2 text-xs text-red-500 hover:text-red-700 font-semibold"
                >
                  Limpar filtros
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Patient List ── */}
      <div className="dv-glass-card flex-1 flex flex-col bg-white/90 dark:bg-gray-900/75 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100/80 dark:border-gray-800/80 overflow-hidden transition-all duration-300">
        {filteredPatients.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Dog size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nenhum paciente encontrado.</p>
            {searchTerm && (
              <p className="text-sm mt-1">Tente buscar por um nome diferente.</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-800/80 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-100 dark:border-gray-800">
                  <th className="py-3.5 px-5">Paciente</th>
                  <th className="py-3.5 px-5">Tutor</th>
                  <th className="py-3.5 px-5">Informações</th>
                  <th className="py-3.5 px-5">Peso</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {filteredPatients.map((patient) => {
                  const sexLabel = patient.sex || patient.gender;
                  const speciesNorm =
                    patient.species === 'Cão' ? 'Canino' : patient.species === 'Gato' ? 'Felino' : patient.species;
                  const tutor = tutors.find((t) => t.id === patient.tutorId);

                  // Weight trend from history
                  const wh = [...(patient.weightHistory || [])].sort(
                    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                  );
                  const weightDelta =
                    wh.length >= 2 ? wh[wh.length - 1].weight - wh[0].weight : null;

                  return (
                    <tr
                      key={patient.id}
                      onClick={() => navigate(dvPath(`patients/${patient.id}`))}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer group"
                    >
                      {/* Patient */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            <img
                              src={
                                patient.imageUrl ||
                                patient.image ||
                                `https://images.unsplash.com/photo-${speciesNorm === 'Canino' ? '1552053831-71594a27632d' : '1514888286974-6c03e2ca1dba'}?auto=format&fit=crop&w=100&h=100`
                              }
                              alt={patient.name}
                              className="w-11 h-11 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-gray-800"
                            />
                            {patient.status === 'Vivo' && (
                              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                              {patient.name}
                            </p>
                            <p className="text-[11px] text-gray-400">ID: {patient.id.padStart(5, '0')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                              {speciesNorm === 'Canino' ? <Dog size={11} /> : <Cat size={11} />}
                              {patient.breed || '—'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Tutor */}
                      <td className="py-3.5 px-5">
                        <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1">
                          <User size={13} className="text-gray-400" />
                          {getTutorName(patient.tutorId)}
                        </p>
                        {tutor?.phone && (
                          <p className="text-xs text-gray-400 mt-0.5">{tutor.phone}</p>
                        )}
                      </td>

                      {/* Info */}
                      <td className="py-3.5 px-5">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {sexLabel} · {patient.age}
                          </span>
                          <div className="flex gap-1.5 flex-wrap">
                            {patient.castrated && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-medium">
                                <Scissors size={10} /> Cast.
                              </span>
                            )}
                            {patient.microchipped && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium">
                                <Cpu size={10} /> Chip
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Weight */}
                      <td className="py-3.5 px-5">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {patient.weight || '—'}
                        </p>
                        {weightDelta !== null && (
                          <p
                            className={`text-xs flex items-center gap-0.5 font-medium mt-0.5 ${weightDelta > 0
                                ? 'text-amber-600'
                                : weightDelta < 0
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                          >
                            {weightDelta > 0 ? (
                              <TrendingUp size={11} />
                            ) : weightDelta < 0 ? (
                              <TrendingDown size={11} />
                            ) : (
                              <Minus size={11} />
                            )}
                            {weightDelta > 0 ? '+' : ''}{weightDelta.toFixed(1)} kg
                          </p>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${patient.status === 'Vivo'
                              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                            }`}
                        >
                          {patient.status === 'Vivo' ? (
                            <Heart size={11} className="fill-current" />
                          ) : (
                            <Skull size={11} />
                          )}
                          {patient.status === 'Vivo' ? 'Ativo' : 'Óbito'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(dvPath(`patients/${patient.id}`));
                          }}
                          className="inline-flex items-center gap-1 text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                        >
                          Ver prontuário <ChevronRight size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-5 py-3 border-t border-gray-50 dark:border-gray-800 text-xs text-gray-400">
          {filteredPatients.length} paciente(s) exibido(s)
          {activeFiltersCount > 0 || searchTerm ? ` de ${patients.length} total` : ''}
        </div>
      </div>

      {/* ── New Patient Modal ── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Paciente"
        className="max-w-2xl"
      >
        <form onSubmit={handleSavePatient} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nome do paciente *</label>
              <input
                type="text"
                required
                className={inputCls}
                value={newPatient.name || ''}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                placeholder="Ex: Rex, Mimi, Mel..."
              />
            </div>

            <div>
              <label className={labelCls}>Tutor *</label>
              <select
                required
                className={inputCls}
                value={newPatient.tutorId || ''}
                onChange={(e) => setNewPatient({ ...newPatient, tutorId: e.target.value })}
              >
                <option value="">Selecione um tutor</option>
                {tutors.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls}>Espécie *</label>
              <select
                className={inputCls}
                value={newPatient.species}
                onChange={(e) => setNewPatient({ ...newPatient, species: e.target.value as Patient['species'] })}
              >
                <option value="Canino">Canino (Cão)</option>
                <option value="Felino">Felino (Gato)</option>
              </select>
            </div>

            <div>
              <label className={labelCls}>Raça</label>
              <input
                type="text"
                className={inputCls}
                value={newPatient.breed || ''}
                onChange={(e) => setNewPatient({ ...newPatient, breed: e.target.value })}
                placeholder="Ex: Golden Retriever, SRD"
              />
            </div>

            <div>
              <label className={labelCls}>Sexo *</label>
              <select
                className={inputCls}
                value={newPatient.sex}
                onChange={(e) => setNewPatient({ ...newPatient, sex: e.target.value as 'Macho' | 'Fêmea' })}
              >
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>

            <div>
              <label className={labelCls}>Idade</label>
              <input
                type="text"
                className={inputCls}
                value={newPatient.age || ''}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                placeholder="Ex: 3 anos, 6 meses"
              />
            </div>

            <div>
              <label className={labelCls}>Peso</label>
              <input
                type="text"
                className={inputCls}
                value={newPatient.weight || ''}
                onChange={(e) => setNewPatient({ ...newPatient, weight: e.target.value })}
                placeholder="Ex: 10kg, 4.5kg"
              />
            </div>

            <div>
              <label className={labelCls}>Cor/Pelagem</label>
              <input
                type="text"
                className={inputCls}
                value={newPatient.coatColor || ''}
                onChange={(e) => setNewPatient({ ...newPatient, coatColor: e.target.value })}
                placeholder="Ex: Dourado, Preto e branco"
              />
            </div>
          </div>

          <div className="flex gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!newPatient.castrated}
                onChange={(e) => setNewPatient({ ...newPatient, castrated: e.target.checked })}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Scissors size={14} className="text-purple-500" /> Castrado(a)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!newPatient.microchipped}
                onChange={(e) => setNewPatient({ ...newPatient, microchipped: e.target.checked })}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Cpu size={14} className="text-blue-500" /> Microchipado(a)
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Cadastrar paciente
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
