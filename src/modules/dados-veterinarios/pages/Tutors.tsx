import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Download, 
  User, 
  PawPrint, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData, Tutor } from '../context/DataContext';
import { Modal } from '../components/ui/Modal';
import { dvPath } from '../DadosVeterinariosModule';

export const Tutors = () => {
  const navigate = useNavigate();
  const { tutors, patients, addTutor } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Tutor Form State
  const [newTutor, setNewTutor] = useState<Partial<Tutor>>({});

  const filteredTutors = tutors.filter(tutor => 
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tutor.cpf || '').includes(searchTerm)
  );

  const getPetsCount = (tutorId: string) => {
    return patients.filter(p => p.tutorId === tutorId).length;
  };

  const handleSaveTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTutor.name && newTutor.cpf && newTutor.phone) {
      addTutor({
        id: Math.random().toString(36).substr(2, 9),
        email: '',
        address: '',
        ...newTutor as Tutor
      });
      setIsModalOpen(false);
      setNewTutor({});
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span>VETIUS</span>
            <span>&gt;</span>
            <span>Gestão</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Gestão de Tutores</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie proprietários, seus pets e históricos clínicos em um só lugar.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Download size={18} />
            Exportar
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-600 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30"
          >
            <Plus size={18} />
            Novo Tutor
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-800">
          <button className="px-6 py-4 text-sm font-bold text-primary border-b-2 border-primary flex items-center gap-2">
            <User size={18} />
            Tutores
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">{tutors.length}</span>
          </button>
          <button 
            onClick={() => navigate(dvPath('patients'))}
            className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors"
          >
            <PawPrint size={18} />
            Pacientes
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs">{patients.length}</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50 dark:bg-gray-800/30">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Filtrar nesta lista..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors flex items-center gap-2 shadow-sm flex-1 md:flex-none justify-center">
              <Filter size={18} />
              Filtros Avançados
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                <th className="py-4 px-6">Nome</th>
                <th className="py-4 px-6">Contato</th>
                <th className="py-4 px-6 text-center">Pets</th>
                <th className="py-4 px-6">Endereço</th>
                <th className="py-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredTutors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                    Nenhum tutor encontrado.
                  </td>
                </tr>
              ) : (
                filteredTutors.map((tutor) => (
                  <tr 
                    key={tutor.id} 
                    onClick={() => navigate(dvPath(`tutors/${tutor.id}`))}
                    className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-lg">
                          {tutor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{tutor.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">CPF: {tutor.cpf}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm text-gray-900 dark:text-white">
                          <Phone size={14} className="text-gray-400" />
                          {tutor.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <Mail size={14} className="text-gray-400" />
                          {tutor.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-sm">
                        {getPetsCount(tutor.id)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{tutor.address}</p>
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
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
          <span>Mostrando {filteredTutors.length} resultados</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors">Anterior</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Próximo</button>
          </div>
        </div>
      </div>

      {/* New Tutor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Tutor"
        className="max-w-2xl"
      >
        <form onSubmit={handleSaveTutor} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newTutor.name || ''}
                onChange={e => setNewTutor({...newTutor, name: e.target.value})}
                placeholder="Ex: Ana Silva"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CPF</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newTutor.cpf || ''}
                onChange={e => setNewTutor({...newTutor, cpf: e.target.value})}
                placeholder="000.000.000-00"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newTutor.phone || ''}
                onChange={e => setNewTutor({...newTutor, phone: e.target.value})}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newTutor.email || ''}
                onChange={e => setNewTutor({...newTutor, email: e.target.value})}
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Endereço</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newTutor.address || ''}
                onChange={e => setNewTutor({...newTutor, address: e.target.value})}
                placeholder="Rua, Número, Bairro, Cidade - UF"
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
