import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  User, 
  MapPin, 
  Bell, 
  DollarSign, 
  Calendar, 
  Plus, 
  ChevronRight,
  CheckSquare,
  Square,
  Phone,
  Mail,
  MessageSquare,
  PawPrint
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { dvPath } from '../DadosVeterinariosModule';

export const TutorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tutors, patients, appointments } = useData();

  const tutor = tutors.find(t => t.id === id);
  const tutorPatients = patients.filter(p => p.tutorId === id);
  
  // Calculate last visit from appointments
  const tutorAppointments = appointments
    .filter(a => a.tutorId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  const lastVisit = tutorAppointments.length > 0 
    ? new Date(tutorAppointments[0].date).toLocaleDateString('pt-BR') 
    : 'Nenhuma visita';

  if (!tutor) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tutor não encontrado</h2>
        <button 
          onClick={() => navigate(dvPath('tutors'))}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-600 transition-colors"
        >
          Voltar para Lista
        </button>
      </div>
    );
  }

  // Mock interactions for now as they are not in DataContext
  const interactions = [
    { date: 'Ontem, 14:30', title: 'Agendamento de vacina.', type: 'info' },
    { date: '10 Out, 09:15', title: 'Pagamento realizado.', type: 'success' },
    { date: '05 Out, 11:00', title: 'Atualização de endereço.', type: 'neutral' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link to={dvPath('tutors')} className="inline-flex items-center text-gray-500 hover:text-primary transition-colors text-sm font-medium group mb-2">
            <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Voltar para Lista
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Editar Tutor: {tutor.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">ID: {tutor.id} • CPF: {tutor.cpf}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors">
            Cancelar
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-600 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30">
            <Save size={18} />
            Salvar Alterações
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <User className="text-primary" size={20} />
                Informações Básicas
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Tutor Ativo</span>
                <button className="w-11 h-6 bg-primary rounded-full relative transition-colors">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform"></span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome Completo</label>
                <input 
                  type="text" 
                  defaultValue={tutor.name}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CPF / ID</label>
                  <input 
                    type="text" 
                    defaultValue={tutor.cpf}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Data de Nascimento</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      defaultValue={tutor.email}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Telefone Principal</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="tel" 
                      defaultValue={tutor.phone}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="text-primary" size={20} />
                Endereço
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CEP</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:bg-primary/10 px-2 py-1 rounded transition-colors">
                      Buscar
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Rua / Logradouro</label>
                  <input 
                    type="text" 
                    defaultValue={tutor.address}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Número</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Complemento</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bairro</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Cidade</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Estado</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
                  >
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell className="text-primary" size={20} />
                Preferências de Comunicação
              </h3>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 text-primary">
                  <CheckSquare size={20} className="fill-primary/10" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Receber Lembretes via WhatsApp</span>
                  <span className="text-xs text-gray-500">Vacinas, agendamentos e retornos.</span>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 text-primary">
                  <CheckSquare size={20} className="fill-primary/10" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Receber Newsletter por E-mail</span>
                  <span className="text-xs text-gray-500">Dicas de saúde, novidades da clínica e promoções.</span>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 text-gray-400">
                  <Square size={20} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Receber SMS de Emergência</span>
                  <span className="text-xs text-gray-500">Apenas para situações críticas envolvendo os pets.</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Pets */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-2">
                <DollarSign size={20} />
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase">Total Investido</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">R$ 0,00</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2">
                <Calendar size={20} />
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase">Última Visita</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{lastVisit}</p>
            </div>
          </div>

          {/* Active Pets */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 dark:text-white">Pets Ativos ({tutorPatients.length})</h3>
              <button className="text-xs font-bold text-primary hover:text-green-600">Ver Todos</button>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {tutorPatients.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">Nenhum pet cadastrado.</div>
              ) : (
                tutorPatients.map((pet, index) => (
                  <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                    <div className="relative">
                      <img src={pet.imageUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&h=100'} alt={pet.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800" />
                      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 rounded-full p-0.5">
                        <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-0.5">
                          <PawPrint size={10} className="text-orange-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">{pet.name}</h4>
                      <p className="text-xs text-gray-500">{pet.species} • {pet.breed} • {pet.age}</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                ))
              )}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 text-center border-t border-gray-100 dark:border-gray-800">
              <button className="text-xs font-bold text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1 w-full py-2">
                <Plus size={14} />
                Adicionar Novo Pet
              </button>
            </div>
          </div>

          {/* Recent Interactions */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white">Últimas Interações</h3>
            </div>
            <div className="p-5 space-y-6">
              {interactions.map((interaction, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-gray-100 dark:border-gray-800">
                  <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${
                    interaction.type === 'success' ? 'bg-green-500' : interaction.type === 'info' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <p className="text-xs text-gray-500 mb-0.5">{interaction.date}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{interaction.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
