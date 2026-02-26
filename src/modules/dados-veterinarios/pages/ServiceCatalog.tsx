import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, Plus, Edit2, Trash2, Lock } from 'lucide-react';
import { useData, Service } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { Modal } from '../components/ui/Modal';
import { formatCurrency } from '../pages/Financial';

const CATEGORY_COLORS: Record<string, string> = {
  Consultas: 'bg-blue-500',
  Vacinas: 'bg-emerald-500',
  'Urgencia e Emergencia': 'bg-red-500',
  Cirurgias: 'bg-violet-500',
  Imagem: 'bg-indigo-500',
  'Exames Laboratoriais': 'bg-orange-500',
  Internamento: 'bg-pink-500',
  Medicamentos: 'bg-cyan-500',
  Insumos: 'bg-amber-600',
  Procedimentos: 'bg-teal-500',
  Outros: 'bg-gray-500',
};

const ServiceCard: React.FC<{ service: Service; canEdit: boolean; onEdit: (service: Service) => void; onDelete: (id: string) => void }> = ({ service, canEdit, onEdit, onDelete }) => {
  const color = CATEGORY_COLORS[service.category] || CATEGORY_COLORS.Outros;

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between h-full group relative">
      {canEdit ? (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); onEdit(service); }} className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-primary hover:text-white transition-colors"><Edit2 size={16} /></button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(service.id); }} className="p-2 bg-gray-100 dark:bg-gray-800 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
        </div>
      ) : null}

      <div>
        <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center mb-4`}><Activity size={24} /></div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{service.category}</span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2">{service.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2">{service.description}</p>
      </div>
      <div className="pt-4 mt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(service.price)}</span>
      </div>
    </motion.div>
  );
};

export const ServiceCatalog = () => {
  const { services, addService, updateService, deleteService } = useData();
  const { isAdmin } = useClinicAuth();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({ name: '', description: '', price: 0, category: 'Consultas' });

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set([...Object.keys(CATEGORY_COLORS), ...services.map((s) => s.category)]))],
    [services],
  );

  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === 'Todos' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (service?: Service) => {
    if (!isAdmin) return;
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({ name: '', description: '', price: 0, category: 'Consultas' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    if (editingService) {
      updateService(editingService.id, formData);
    } else {
      addService({ id: Math.random().toString(36).substr(2, 9), ...formData as Service });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm('Tem certeza que deseja excluir este servico?')) deleteService(id);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Catalogo de Servicos</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Cadastro central de servicos, medicamentos, insumos e procedimentos.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search size={18} /></div>
            <input type="text" placeholder="Buscar servico..." className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button onClick={() => handleOpenModal()} disabled={!isAdmin} className="px-4 py-2 bg-primary text-white rounded-xl disabled:opacity-50 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30 whitespace-nowrap">
            {isAdmin ? <Plus size={20} /> : <Lock size={18} />} {isAdmin ? 'Novo Servico' : 'Somente Admin'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} canEdit={isAdmin} onEdit={handleOpenModal} onDelete={handleDelete} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingService ? 'Editar Servico' : 'Novo Servico'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" required placeholder="Nome" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" required min="0" step="0.01" placeholder="Preco" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              {categories.filter((c) => c !== 'Todos').map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <textarea required placeholder="Descricao" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl min-h-[90px]" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-xl">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
