import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  PawPrint, 
  Calendar, 
  DollarSign, 
  Search, 
  Plus, 
  MoreVertical,
  FileText,
  Activity,
  BarChart2,
  List,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BackgroundPaths } from '../components/ui/background-paths';
import { APPOINTMENT_CATEGORIES } from '../constants';
import { dvPath } from '../DadosVeterinariosModule';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between group transition-all duration-300"
  >
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110`}>
      <Icon size={24} />
    </div>
  </motion.div>
);

const QuickAccessCard: React.FC<{ title: string; icon: React.ElementType; path: string; description: string; color: string }> = ({ title, icon: Icon, path, description, color }) => (
  <Link to={path}>
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group transition-all duration-300 h-full hover:border-primary/50 dark:hover:border-primary/50 cursor-pointer"
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{description}</p>
    </motion.div>
  </Link>
);

const TutorRow: React.FC<{ tutor: any; patients: any[] }> = ({ tutor, patients }) => {
  const navigate = useNavigate();
  const tutorPatients = patients.filter(p => p.tutorId === tutor.id);
  
  return (
    <motion.tr 
      variants={itemVariants}
      whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.1)' }}
      onClick={() => navigate(dvPath(`tutors/${tutor.id}`))}
      className="border-b border-gray-50 dark:border-gray-800 last:border-none transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary font-bold text-sm">
            {tutor.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{tutor.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{tutor.phone}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex -space-x-2 overflow-hidden">
          {tutorPatients.slice(0, 3).map((pet: any, i: number) => (
            <div 
              key={i}
              className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900 bg-gray-200 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300"
              title={pet.name}
            >
              {pet.name.charAt(0)}
            </div>
          ))}
          {tutorPatients.length > 3 && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400">
              +{tutorPatients.length - 3}
            </div>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Ativo
        </span>
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
        -
      </td>
      <td className="py-4 px-6 text-right">
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <MoreVertical size={20} />
        </button>
      </td>
    </motion.tr>
  );
};

export const Dashboard = () => {
  const { patients, tutors, appointments, financialRecords, getPatientName, getTutorName } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const today = new Date();
  const appointmentsToday = appointments.filter(apt => isSameDay(new Date(apt.date), today));
  const appointmentsTodayCount = appointmentsToday.length;
  
  const monthlyRevenue = financialRecords
    .filter(record => record.type === 'Receita' && isSameMonth(new Date(record.date), today))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const filteredTutors = tutors.filter(tutor => 
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5); // Show only first 5

  const quickAccessModules = [
    { title: 'Agenda', icon: Calendar, path: dvPath('calendar'), description: 'Gerencie consultas e compromissos.', color: 'bg-blue-500' },
    { title: 'Financeiro', icon: DollarSign, path: dvPath('financial'), description: 'Controle de receitas e despesas.', color: 'bg-green-500' },
    { title: 'Serviços', icon: List, path: dvPath('services'), description: 'Catálogo de procedimentos e preços.', color: 'bg-orange-500' },
    { title: 'Análises', icon: Activity, path: dvPath('analytics'), description: 'Métricas e desempenho da clínica.', color: 'bg-red-500' },
    { title: 'Relatórios', icon: BarChart2, path: dvPath('reports'), description: 'Relatórios detalhados para gestão.', color: 'bg-teal-500' },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <BackgroundPaths title="" />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Visão Geral</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Bem-vindo ao VetFlow. Aqui está o resumo da sua clínica.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate(dvPath('calendar'))} className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-500 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30">
              <Plus size={20} />
              Novo Atendimento
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total de Tutores" value={tutors.length} icon={Users} color="bg-blue-500" />
          <StatCard title="Total de Pacientes" value={patients.length} icon={PawPrint} color="bg-primary" />
          <StatCard title="Consultas Hoje" value={appointmentsTodayCount} icon={Calendar} color="bg-purple-500" />
          <StatCard title="Receita Mensal" value={`R$ ${monthlyRevenue.toLocaleString('pt-BR')}`} icon={DollarSign} color="bg-orange-500" />
        </div>

        {/* Today's Appointments Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Agendamentos de Hoje
            </h2>
            <Link to={dvPath('calendar')} className="text-sm font-medium text-primary hover:underline">Ver Agenda Completa</Link>
          </div>
          
          {appointmentsTodayCount === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Nenhum agendamento para hoje.
            </div>
          ) : (
            <div className="space-y-4">
              {appointmentsToday
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((apt) => {
                  const category = APPOINTMENT_CATEGORIES.find(c => c.id === apt.type) || APPOINTMENT_CATEGORIES[0];
                  const Icon = category.icon;
                  
                  return (
                    <div key={apt.id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                      <div className={`w-2 h-12 rounded-full ${category.color} shrink-0`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-900 dark:text-white">{apt.title}</h3>
                          <span className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700">
                            <Clock size={14} />
                            {format(new Date(apt.date), 'HH:mm')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <PawPrint size={14} />
                            {getPatientName(apt.patientId)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {getTutorName(apt.tutorId)}
                          </span>
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${category.color} bg-opacity-10 text-${category.color.replace('bg-', '')}`}>
                            <Icon size={12} />
                            {category.label}
                          </span>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <CheckCircle2 size={20} />
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Quick Access Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {quickAccessModules.map((module, index) => (
              <QuickAccessCard key={index} {...module} />
            ))}
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tutores Recentes</h2>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Buscar na lista..." 
                className="pl-10 pr-4 py-1.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none text-gray-900 dark:text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                  <th className="py-4 px-6">Tutor</th>
                  <th className="py-4 px-6">Pacientes</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Última Visita</th>
                  <th className="py-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTutors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                      Nenhum tutor encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredTutors.map((tutor) => (
                    <TutorRow key={tutor.id} tutor={tutor} patients={patients} />
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Mostrando {filteredTutors.length} de {tutors.length} resultados</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors">Anterior</button>
              <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Próximo</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
