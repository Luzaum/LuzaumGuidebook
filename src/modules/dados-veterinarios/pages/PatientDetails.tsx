import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit2, 
  PawPrint, 
  Cake, 
  Mars, 
  User, 
  PlusCircle, 
  Syringe, 
  Weight, 
  ClipboardList, 
  CheckCircle, 
  Stethoscope, 
  History, 
  Microscope, 
  Scissors, 
  Image as ImageIcon, 
  Printer, 
  FilePlus, 
  Filter, 
  Search, 
  Eye, 
  ChevronDown, 
  ArrowDown,
  MoreVertical,
  AlertCircle,
  Calendar,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useData, Patient, Vaccine, WeightRecord, Anamnesis, Exam, Procedure } from '../context/DataContext';
import { Modal } from '../components/ui/Modal';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dvPath } from '../DadosVeterinariosModule';

// ... existing constants ...
const anamnesisHistory = [
  {
    date: "14 Outubro 2023",
    title: "Consulta de Rotina",
    description: "Paciente apresentou leve desconforto abdominal. Exame físico normal, exceto por leve sensibilidade à palpação. Prescrito probiótico.",
    doctor: "Dr. Pedro Santos",
    color: "bg-primary"
  },
  {
    date: "20 Agosto 2023",
    title: "Retorno Dermatológico",
    description: "Melhora significativa da dermatite alérgica. Manter medicação tópica por mais 5 dias.",
    doctor: "Dra. Clara Silva",
    color: "bg-gray-300 dark:bg-gray-600"
  },
  {
    date: "05 Maio 2023",
    title: "Vacinação Anual",
    description: "Aplicação de V10 e Antirrábica. Paciente calmo. Sem reações imediatas.",
    doctor: "Dr. Pedro Santos",
    color: "bg-gray-300 dark:bg-gray-600"
  }
];

const vaccineProtocol = [
  { name: "V10 (Polivalente)", date: "05/05/23", next: "05/05/24", status: "Em dia", icon: CheckCircle, color: "text-green-500" },
  { name: "Antirrábica", date: "05/05/23", next: "05/05/24", status: "Em dia", icon: CheckCircle, color: "text-green-500" },
  { name: "Giárdia", date: "10/02/23", next: "10/02/24", status: "Atrasada", icon: CheckCircle, color: "text-yellow-600" },
  { name: "Gripe Canina", date: "-", next: "Agendar", status: "Pendente", icon: AlertCircle, color: "text-gray-300" },
  { name: "Leishmaniose", date: "-", next: "Agendar", status: "Pendente", icon: AlertCircle, color: "text-gray-300" },
];

const recentProcedures = [
  { name: "Hemograma Completo", date: "14 Out 2023", result: "Normal", description: "Plaquetas e leucócitos dentro da referência.", icon: Microscope, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
  { name: "Castração", date: "15 Jan 2020", result: "Realizado", description: "Procedimento eletivo sem intercorrências.", icon: Scissors, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400", statusColor: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
  { name: "Raio-X Tórax", date: "10 Ago 2022", result: "Normal", description: "Avaliação cardiológica de rotina.", icon: ImageIcon, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400", statusColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
];

const detailedHistory = [
  {
    day: "14", month: "OUT", year: "2023",
    title: "Consulta de Rotina - Vacinação",
    doctor: "Dr. Carlos Mendes • CRMV-SP 12345",
    complaint: "Paciente assintomático, trazido para vacinação anual (V10 e Raiva).",
    exam: "Mucosas normocoradas, TPC < 2s. Ausculta cardíaca e pulmonar sem alterações. Linfonodos submandibulares, poplíteos e pré-escapulares normais à palpação. Temperatura: 38.5°C.",
    conduct: "Aplicadas vacinas Vanguard HTLP 5/CV-L (V10) e Defensor (Raiva). Recomendado retorno em 1 ano.",
    tags: [
      { label: "Vacinação", icon: Syringe, color: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800" },
      { label: "Liberado", icon: CheckCircle, color: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800" }
    ]
  },
  {
    day: "22", month: "SET", year: "2023",
    title: "Retorno Dermatologia",
    doctor: "Dra. Amanda Silva • CRMV-SP 98765",
    summary: "Evolução favorável das lesões pruriginosas na região lombar. Pêlo com repilação evidente...",
    collapsed: true
  },
  {
    day: "10", month: "SET", year: "2023",
    title: "Consulta Dermatologia",
    doctor: "Dra. Amanda Silva • CRMV-SP 98765",
    summary: "Paciente apresenta prurido intenso na base da cauda. Suspeita de DAPP...",
    collapsed: true
  }
];

const procedureHistoryTable = [
  { date: "14/10/2023", name: "Vacina V10 (Importada)", responsible: "Dr. Carlos M.", status: "Realizado", statusColor: "bg-green-100 text-green-700 border-green-200" },
  { date: "22/09/2023", name: "Raspado de Pele", responsible: "Dra. Amanda S.", status: "Resultados", statusColor: "bg-blue-100 text-blue-700 border-blue-200" },
  { date: "15/05/2023", name: "Hemograma Completo", responsible: "Laboratório Ext.", status: "Arquivado", statusColor: "bg-gray-100 text-gray-700 border-gray-200" },
];

const weightHistory = [
  { date: "14 Out 23", weight: "32.0 kg", percent: "80%" },
  { date: "22 Set 23", weight: "31.5 kg", percent: "78%" },
  { date: "15 Mai 23", weight: "30.2 kg", percent: "75%" },
  { date: "10 Jan 23", weight: "29.0 kg", percent: "72%" },
];

const TabButton: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${
      active 
        ? 'text-gray-900 dark:text-primary border-primary' 
        : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-primary dark:hover:text-primary'
    }`}
  >
    {label}
  </button>
);

export const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, getTutorName, appointments, updatePatient } = useData();
  const [activeTab, setActiveTab] = useState('Resumo');

  // Modals State
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  
  // Form Data State
  const [vaccineForm, setVaccineForm] = useState<Partial<Vaccine>>({
    name: '',
    date: new Date(),
    nextDueDate: undefined,
    batch: '',
    veterinarian: ''
  });
  
  const [weightForm, setWeightForm] = useState<Partial<WeightRecord>>({
    date: new Date(),
    weight: 0,
    notes: ''
  });

  // Anamnesis State
  const [isAnamnesisModalOpen, setIsAnamnesisModalOpen] = useState(false);
  const [anamnesisForm, setAnamnesisForm] = useState<Partial<Anamnesis>>({
    date: new Date(),
    complaint: '',
    history: '',
    systemsReview: '',
    diagnosis: '',
    treatment: ''
  });

  const patient = patients.find(p => p.id === id);
  const tutorName = patient ? getTutorName(patient.tutorId) : '';

  const handleAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !vaccineForm.name) return;
    
    const newVaccine: Vaccine = {
      id: Math.random().toString(36).substr(2, 9),
      name: vaccineForm.name!,
      date: vaccineForm.date || new Date(),
      nextDueDate: vaccineForm.nextDueDate,
      batch: vaccineForm.batch,
      veterinarian: vaccineForm.veterinarian
    };
    
    const updatedVaccines = [...(patient.vaccines || []), newVaccine];
    updatePatient(patient.id, { vaccines: updatedVaccines });
    setIsVaccineModalOpen(false);
    setVaccineForm({ name: '', date: new Date(), nextDueDate: undefined, batch: '', veterinarian: '' });
  };

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !weightForm.weight) return;
    
    const newWeight: WeightRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: weightForm.date || new Date(),
      weight: Number(weightForm.weight),
      notes: weightForm.notes
    };
    
    const updatedWeightHistory = [...(patient.weightHistory || []), newWeight];
    // Sort by date
    updatedWeightHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    updatePatient(patient.id, { 
      weightHistory: updatedWeightHistory,
      weight: `${newWeight.weight}kg` // Update current weight
    });
    setIsWeightModalOpen(false);
    setWeightForm({ date: new Date(), weight: 0, notes: '' });
  };

  const handleAddAnamnesis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !anamnesisForm.complaint) return;
    
    const newAnamnesis: Anamnesis = {
      id: Math.random().toString(36).substr(2, 9),
      date: anamnesisForm.date || new Date(),
      complaint: anamnesisForm.complaint!,
      history: anamnesisForm.history || '',
      systemsReview: anamnesisForm.systemsReview,
      diagnosis: anamnesisForm.diagnosis,
      treatment: anamnesisForm.treatment
    };
    
    const updatedAnamnesis = [newAnamnesis, ...(patient.anamnesis || [])];
    updatePatient(patient.id, { anamnesis: updatedAnamnesis });
    setIsAnamnesisModalOpen(false);
    setAnamnesisForm({
      date: new Date(),
      complaint: '',
      history: '',
      systemsReview: '',
      diagnosis: '',
      treatment: ''
    });
  };

  // Procedure State
  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);
  const [procedureForm, setProcedureForm] = useState<Partial<Procedure>>({
    date: new Date(),
    name: '',
    type: 'Procedimento',
    notes: '',
    veterinarian: ''
  });

  const handleAddProcedure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !procedureForm.name) return;
    
    const newProcedure: Procedure = {
      id: Math.random().toString(36).substr(2, 9),
      date: procedureForm.date || new Date(),
      name: procedureForm.name!,
      type: procedureForm.type as 'Exame' | 'Procedimento' | 'Cirurgia',
      notes: procedureForm.notes,
      veterinarian: procedureForm.veterinarian
    };
    
    const updatedProcedures = [newProcedure, ...(patient.procedures || [])];
    updatePatient(patient.id, { procedures: updatedProcedures });
    setIsProcedureModalOpen(false);
    setProcedureForm({
      date: new Date(),
      name: '',
      type: 'Procedimento',
      notes: '',
      veterinarian: ''
    });
  };

  // Calculate stats from appointments
  const patientAppointments = appointments.filter(a => a.patientId === id);
  const proceduresCount = patientAppointments.length;
  
  // Mock data for things not in DataContext yet
  const lastAnamnesisDate = "14 Out";
  const lastAnamnesisTime = "Há 15 dias";
  const lastAnamnesisComplaint = "Vômito e diarreia leve.";
  const nextVaccine = "Raiva (Anual) - 15/02/2024";

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Paciente não encontrado</h2>
        <button 
          onClick={() => navigate(dvPath('patients'))}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-600 transition-colors"
        >
          Voltar para Lista
        </button>
      </div>
    );
  }

  const renderGeneralPanel = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative group">
          <div 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-cover bg-center border-4 border-gray-50 dark:border-gray-900 shadow-md"
            style={{ backgroundImage: `url('${patient.imageUrl || "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&h=300"}')` }}
          ></div>
          <button className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full shadow-lg hover:bg-green-600 transition-colors">
            <Edit2 size={14} className="font-bold" />
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{patient.name}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              patient.status === 'Vivo' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
            }`}>
              {patient.status}
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <PawPrint size={18} />
              {patient.breed}
            </span>
            <span className="flex items-center gap-1.5">
              <Cake size={18} />
              {patient.age}
            </span>
            <span className="flex items-center gap-1.5">
              <Mars size={18} />
              {patient.sex}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={18} />
              Tutor: {tutorName}
            </span>
          </div>

          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
            <button className="px-4 py-2 rounded-lg bg-primary hover:bg-green-600 text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2">
              <PlusCircle size={18} />
              Nova Consulta
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Syringe size={18} />
              Registrar Vacina
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Weight Card */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Peso Atual</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{patient.weight}</h3>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Weight size={24} />
            </div>
          </div>
          <div className="mt-4 h-12 flex items-end gap-1">
            <div className="w-1/6 bg-primary/20 h-[40%] rounded-sm"></div>
            <div className="w-1/6 bg-primary/30 h-[50%] rounded-sm"></div>
            <div className="w-1/6 bg-primary/40 h-[45%] rounded-sm"></div>
            <div className="w-1/6 bg-primary/50 h-[60%] rounded-sm"></div>
            <div className="w-1/6 bg-primary/60 h-[75%] rounded-sm"></div>
            <div className="w-1/6 bg-primary h-[80%] rounded-sm"></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
            <span className="text-primary font-bold">+0.5kg</span> vs último mês
          </p>
        </div>

        {/* Anamnesis Card */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Última Anamnese</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{lastAnamnesisDate}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{lastAnamnesisTime}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-500">
              <ClipboardList size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">Queixa: {lastAnamnesisComplaint}</p>
            <button className="text-xs text-primary hover:underline mt-1 inline-block">Ver detalhes</button>
          </div>
        </div>

        {/* Vaccination Card */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Vacinação</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-bold border border-green-200 dark:border-green-800">
                <CheckCircle size={16} />
                Em dia
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-500">
              <Syringe size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">Próxima dose prevista:</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{nextVaccine}</p>
          </div>
        </div>

        {/* Procedures Card */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Procedimentos</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{proceduresCount}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total registrado</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-500">
              <Stethoscope size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Último: {patientAppointments[0]?.title || 'Nenhum'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Anamnesis History */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <History className="text-primary" size={20} />
              Anamneses Prévias
            </h3>
            <button className="text-xs font-bold text-primary hover:text-green-600">Ver Todas</button>
          </div>
          <div className="p-5 overflow-y-auto flex-1 max-h-[500px]">
            <div className="relative pl-6 border-l border-gray-100 dark:border-gray-800 space-y-8">
              {anamnesisHistory.map((item, index) => (
                <div key={index} className="relative">
                  <div className={`absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full ${item.color} border-2 border-white dark:border-gray-900`}></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{item.date}</span>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                        {item.doctor}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vaccine Protocol */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Syringe className="text-primary" size={20} />
              Protocolo Vacinal
            </h3>
            <button className="text-xs font-bold text-primary hover:text-green-600">Gerenciar</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  <th className="py-3 px-5 font-semibold">Vacina</th>
                  <th className="py-3 px-5 font-semibold">Aplicação</th>
                  <th className="py-3 px-5 font-semibold">Próx. Dose</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-800">
                {vaccineProtocol.map((vac, i) => (
                  <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <vac.icon className={`${vac.color}`} size={16} />
                        <span className="font-medium text-gray-900 dark:text-white">{vac.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-gray-500 dark:text-gray-300">{vac.date}</td>
                    <td className={`py-3 px-5 font-bold ${vac.next === 'Agendar' ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                      {vac.next}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Procedures */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Stethoscope className="text-primary" size={20} />
              Procedimentos
            </h3>
            <button className="text-xs font-bold text-primary hover:text-green-600">Solicitar Novo</button>
          </div>
          <div className="p-4 space-y-3">
            {recentProcedures.map((proc, i) => (
              <div key={i} className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 flex items-start gap-3">
                <div className={`p-2 rounded-md ${proc.color}`}>
                  <proc.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{proc.name}</h4>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${proc.statusColor}`}>
                      {proc.result}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{proc.date}</p>
                  <p className="text-xs text-gray-900 dark:text-gray-300 mt-1.5">{proc.description}</p>
                </div>
              </div>
            ))}
            <div className="mt-auto p-3 border-t border-gray-100 dark:border-gray-800 text-center">
              <button className="text-xs font-medium text-gray-500 hover:text-primary transition-colors">Ver histórico completo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalRecordPanel = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
              style={{ backgroundImage: `url('${patient.imageUrl || "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&h=150"}')` }}
            ></div>
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 rounded-full p-0.5 border border-gray-200 dark:border-gray-700">
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-0.5">
                <PawPrint size={14} className="text-orange-500" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {patient.name}
              <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                patient.status === 'Vivo'
                  ? 'bg-green-100 text-green-700 border-green-200'
                  : 'bg-red-100 text-red-700 border-red-200'
              }`}>
                {patient.status}
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {patient.breed} • {patient.age} • {patient.sex} • {patient.weight}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Printer size={18} />
            Imprimir Prontuário
          </button>
          <button 
            onClick={() => setIsAnamnesisModalOpen(true)}
            className="px-5 py-2.5 rounded-lg bg-primary hover:bg-green-600 text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2"
          >
            <FilePlus size={18} />
            Nova Evolução
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Detailed Anamnesis */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ClipboardList className="text-primary" size={20} />
                Anamneses Prévias e Evolução Clínica
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium uppercase">Filtrar por:</span>
                <select className="bg-transparent text-sm border-none focus:ring-0 text-gray-900 dark:text-white font-semibold cursor-pointer outline-none">
                  <option>Todas as Especialidades</option>
                  <option>Dermatologia</option>
                  <option>Clínica Geral</option>
                </select>
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {patient.anamnesis && patient.anamnesis.length > 0 ? (
                patient.anamnesis.map((item, index) => (
                  <div key={index} className="group px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors flex items-start gap-4">
                    <div className="flex flex-col items-center min-w-[60px] pt-1">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{format(new Date(item.date), 'dd MMM')}</span>
                      <span className="text-xs text-gray-500">{format(new Date(item.date), 'yyyy')}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-base font-bold text-gray-900 dark:text-white">{item.complaint}</h4>
                          <p className="text-xs text-gray-500">Dr. Veterinário</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-gray-300 space-y-3 mt-3 pl-3 border-l-2 border-primary/20">
                        <div>
                          <span className="font-bold block text-xs text-gray-500 uppercase mb-1">Histórico</span>
                          <p>{item.history}</p>
                        </div>
                        {item.systemsReview && (
                          <div>
                            <span className="font-bold block text-xs text-gray-500 uppercase mb-1">Revisão de Sistemas</span>
                            <p>{item.systemsReview}</p>
                          </div>
                        )}
                        {item.diagnosis && (
                          <div>
                            <span className="font-bold block text-xs text-gray-500 uppercase mb-1">Diagnóstico</span>
                            <p>{item.diagnosis}</p>
                          </div>
                        )}
                        {item.treatment && (
                          <div>
                            <span className="font-bold block text-xs text-gray-500 uppercase mb-1">Tratamento</span>
                            <p>{item.treatment}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-gray-500">Nenhuma anamnese registrada.</p>
              )}
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 text-center border-t border-gray-100 dark:border-gray-800">
              <button className="text-xs font-semibold text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1 w-full py-2">
                Ver histórico completo
                <ArrowDown size={14} />
              </button>
            </div>
          </div>

          {/* Procedure History Table */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Stethoscope className="text-primary" size={20} />
                Histórico de Procedimentos e Exames
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsProcedureModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-green-600 text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  Novo Registro
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Data</th>
                    <th className="px-6 py-3 font-semibold">Procedimento</th>
                    <th className="px-6 py-3 font-semibold">Tipo</th>
                    <th className="px-6 py-3 font-semibold">Responsável</th>
                    <th className="px-6 py-3 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {patient.procedures && patient.procedures.length > 0 ? (
                    patient.procedures.map((proc, i) => (
                      <tr key={i} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{format(new Date(proc.date), 'dd/MM/yyyy')}</td>
                        <td className="px-6 py-4">{proc.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                            proc.type === 'Exame' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            proc.type === 'Cirurgia' ? 'bg-red-100 text-red-700 border-red-200' :
                            'bg-green-100 text-green-700 border-green-200'
                          }`}>
                            {proc.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{proc.veterinarian || '-'}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-500 hover:text-primary transition-colors">
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Nenhum procedimento registrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Vaccine Protocol Side */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-primary/5">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center justify-between">
                Protocolo Vacinal
                <Syringe className="text-primary" size={20} />
              </h3>
            </div>
            <div className="p-5 space-y-4">
              {patient.vaccines && patient.vaccines.length > 0 ? (
                patient.vaccines.map((vac, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{vac.name}</p>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">Aplicada</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Data: {format(new Date(vac.date), 'dd/MM/yyyy')}
                        {vac.nextDueDate && ` • Vence: ${format(new Date(vac.nextDueDate), 'dd/MM/yyyy')}`}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">Nenhuma vacina registrada.</p>
              )}
              
              <button 
                onClick={() => setIsVaccineModalOpen(true)}
                className="w-full mt-2 py-2 text-xs font-bold text-primary hover:text-green-600 border border-dashed border-primary/30 rounded hover:bg-primary/5 transition-colors"
              >
                + Adicionar Vacina
              </button>
            </div>
          </div>

          {/* Weight History */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Histórico de Peso
                <Weight className="text-gray-500" size={18} />
              </h3>
              <button 
                onClick={() => setIsWeightModalOpen(true)}
                className="text-primary hover:text-green-600 text-xs font-bold"
              >
                Novo Registro
              </button>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {patient.weightHistory && patient.weightHistory.length > 0 ? (
                  patient.weightHistory.map((w, i) => (
                    <li key={i} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-500 w-20">{format(new Date(w.date), 'dd MMM yy')}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{w.weight} kg</span>
                    </li>
                  ))
                ) : (
                  <li className="px-5 py-4 text-center text-sm text-gray-500">Nenhum registro de peso.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Tutor Profile */}
          <div className="bg-primary/5 rounded-xl border border-primary/20 p-5">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wide">Tutor Responsável</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-primary font-bold shadow-sm">
                {tutorName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{tutorName}</p>
                <Link to={dvPath(`tutors/${patient.tutorId}`)} className="text-xs text-primary hover:underline">Ver Perfil</Link>
              </div>
            </div>
            <button className="w-full text-center text-xs font-semibold text-primary hover:underline">Ver Perfil Completo do Tutor</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="flex flex-col items-center justify-center h-96 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 animate-in fade-in duration-500">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
        <AlertCircle size={32} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">Este módulo está em desenvolvimento.</p>
    </div>
  );

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link to={dvPath('patients')} className="inline-flex items-center text-gray-500 hover:text-primary transition-colors text-sm font-medium group">
          <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Voltar para Lista de Pacientes
        </Link>
        <div className="flex items-center gap-9">
          <nav className="hidden md:flex items-center gap-2">
            {['Resumo', 'Prontuário', 'Agenda', 'Financeiro'].map((tab) => (
              <TabButton 
                key={tab} 
                label={tab} 
                active={activeTab === tab} 
                onClick={() => setActiveTab(tab)} 
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <main>
        {activeTab === 'Resumo' && renderGeneralPanel()}
        {activeTab === 'Prontuário' && renderMedicalRecordPanel()}
        {activeTab === 'Agenda' && renderPlaceholder('Agenda do Paciente')}
        {activeTab === 'Financeiro' && renderPlaceholder('Histórico Financeiro')}
      </main>

      {/* Modals */}
      <Modal
        isOpen={isVaccineModalOpen}
        onClose={() => setIsVaccineModalOpen(false)}
        title="Registrar Vacina"
      >
        <form onSubmit={handleAddVaccine} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Vacina</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={vaccineForm.name}
              onChange={(e) => setVaccineForm({...vaccineForm, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data da Aplicação</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={vaccineForm.date ? format(vaccineForm.date, 'yyyy-MM-dd') : ''}
                onChange={(e) => setVaccineForm({...vaccineForm, date: new Date(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Próxima Dose</label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={vaccineForm.nextDueDate ? format(vaccineForm.nextDueDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => setVaccineForm({...vaccineForm, nextDueDate: new Date(e.target.value)})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lote</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={vaccineForm.batch}
                onChange={(e) => setVaccineForm({...vaccineForm, batch: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Veterinário</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={vaccineForm.veterinarian}
                onChange={(e) => setVaccineForm({...vaccineForm, veterinarian: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsVaccineModalOpen(false)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        title="Registrar Peso"
      >
        <form onSubmit={handleAddWeight} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={weightForm.date ? format(weightForm.date, 'yyyy-MM-dd') : ''}
                onChange={(e) => setWeightForm({...weightForm, date: new Date(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={weightForm.weight}
                onChange={(e) => setWeightForm({...weightForm, weight: parseFloat(e.target.value)})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Observações</label>
            <textarea
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[100px]"
              value={weightForm.notes}
              onChange={(e) => setWeightForm({...weightForm, notes: e.target.value})}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsWeightModalOpen(false)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isProcedureModalOpen}
        onClose={() => setIsProcedureModalOpen(false)}
        title="Registrar Procedimento / Exame"
      >
        <form onSubmit={handleAddProcedure} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Procedimento</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={procedureForm.name}
              onChange={(e) => setProcedureForm({...procedureForm, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={procedureForm.date ? format(procedureForm.date, 'yyyy-MM-dd') : ''}
                onChange={(e) => setProcedureForm({...procedureForm, date: new Date(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
              <select
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={procedureForm.type}
                onChange={(e) => setProcedureForm({...procedureForm, type: e.target.value as any})}
              >
                <option value="Procedimento">Procedimento</option>
                <option value="Exame">Exame</option>
                <option value="Cirurgia">Cirurgia</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Veterinário Responsável</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={procedureForm.veterinarian}
              onChange={(e) => setProcedureForm({...procedureForm, veterinarian: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Observações / Resultados</label>
            <textarea
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[100px]"
              value={procedureForm.notes}
              onChange={(e) => setProcedureForm({...procedureForm, notes: e.target.value})}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsProcedureModalOpen(false)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
