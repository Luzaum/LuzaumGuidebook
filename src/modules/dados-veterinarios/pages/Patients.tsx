import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  FileText, 
  Dog, 
  Cat, 
  Activity, 
  Heart, 
  Skull,
  SlidersHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData, Patient } from '../context/DataContext';
import { Modal } from '../components/ui/Modal';
import { dvPath } from '../DadosVeterinariosModule';

export const Patients = () => {
  const navigate = useNavigate();
  const { patients, tutors, addPatient, getTutorName } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter states
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sexFilter, setSexFilter] = useState('');
  
  // New Patient Form State
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    species: 'Canino',
    sex: 'Macho',
    status: 'Vivo'
  });

  const filteredPatients = patients.filter(patient => {
    const tutorName = getTutorName(patient.tutorId);
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecies = speciesFilter ? patient.species === speciesFilter : true;
    const matchesStatus = statusFilter ? patient.status === statusFilter : true;
    const matchesSex = sexFilter ? patient.sex === sexFilter : true;

    return matchesSearch && matchesSpecies && matchesStatus && matchesSex;
  });

  const handleSavePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPatient.name && newPatient.tutorId && newPatient.species) {
      addPatient({
        id: Math.random().toString(36).substr(2, 9),
        ...newPatient as Patient,
        imageUrl: `https://images.unsplash.com/photo-${newPatient.species === 'Canino' ? '1552053831-71594a27632d' : '1514888286974-6c03e2ca1dba'}?auto=format&fit=crop&w=150&h=150` // Placeholder image logic
      });
      setIsModalOpen(false);
      setNewPatient({
        species: 'Canino',
        sex: 'Macho',
        status: 'Vivo'
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Gestão de Pacientes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie os prontuários e informações dos pets.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-600 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30"
        >
          <Plus size={20} />
          Novo Paciente
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome do paciente ou tutor..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 border rounded-xl font-medium flex items-center gap-2 transition-colors ${showFilters ? 'bg-primary/10 border-primary text-primary' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            <SlidersHorizontal size={20} />
            Filtros
          </button>
        </div>

        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Espécie</label>
              <select 
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none text-gray-900 dark:text-white"
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="Canino">Canino</option>
                <option value="Felino">Felino</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
              <select 
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none text-gray-900 dark:text-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Vivo">Vivo</option>
                <option value="Óbito">Óbito</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Sexo</label>
              <select 
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none text-gray-900 dark:text-white"
                value={sexFilter}
                onChange={(e) => setSexFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                <th className="py-4 px-6">Paciente</th>
                <th className="py-4 px-6">Tutor</th>
                <th className="py-4 px-6">Detalhes</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    onClick={() => navigate(dvPath(`patients/${patient.id}`))}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={patient.imageUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&h=150'} 
                          alt={patient.name} 
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
                        />
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{patient.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            {patient.species === 'Canino' ? <Dog size={12} /> : <Cat size={12} />}
                            {patient.breed}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{getTutorName(patient.tutorId)}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>{patient.sex} • {patient.age}</span>
                        <span>{patient.weight}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Vivo' 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        {patient.status === 'Vivo' ? <Heart size={12} className="fill-current" /> : <Skull size={12} />}
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); }}
                        className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Patient Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Paciente"
        className="max-w-2xl"
      >
        <form onSubmit={handleSavePatient} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome do Paciente</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newPatient.name || ''}
                onChange={e => setNewPatient({...newPatient, name: e.target.value})}
                placeholder="Ex: Rex"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tutor</label>
              <select
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newPatient.tutorId || ''}
                onChange={e => setNewPatient({...newPatient, tutorId: e.target.value})}
              >
                <option value="">Selecione um tutor</option>
                {tutors.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Espécie</label>
              <select
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newPatient.species}
                onChange={e => setNewPatient({...newPatient, species: e.target.value})}
              >
                <option value="Canino">Canino</option>
                <option value="Felino">Felino</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Raça</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newPatient.breed || ''}
                onChange={e => setNewPatient({...newPatient, breed: e.target.value})}
                placeholder="Ex: Golden Retriever"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sexo</label>
              <select
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newPatient.sex}
                onChange={e => setNewPatient({...newPatient, sex: e.target.value as any})}
              >
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Idade</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newPatient.age || ''}
                onChange={e => setNewPatient({...newPatient, age: e.target.value})}
                placeholder="Ex: 3 anos"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Peso</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newPatient.weight || ''}
                onChange={e => setNewPatient({...newPatient, weight: e.target.value})}
                placeholder="Ex: 10kg"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2.5 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
