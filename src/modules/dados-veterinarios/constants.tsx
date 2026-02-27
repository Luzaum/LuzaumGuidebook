import { Stethoscope, Star, RotateCcw, TestTube, Image as ImageIcon, Syringe, Users, Bed } from 'lucide-react';

export const APPOINTMENT_CATEGORIES = [
  { id: 'Consulta Geral', label: 'Consulta Geral', color: 'bg-blue-500', icon: Stethoscope },
  { id: 'Especialidade', label: 'Especialidade', color: 'bg-purple-500', icon: Star },
  { id: 'Retorno', label: 'Retorno', color: 'bg-emerald-500', icon: RotateCcw },
  { id: 'Exame', label: 'Coleta de Exames', color: 'bg-amber-500', icon: TestTube },
  { id: 'Imagem', label: 'Exames de Imagem', color: 'bg-indigo-500', icon: ImageIcon },
  { id: 'Procedimento', label: 'Procedimentos', color: 'bg-rose-500', icon: Syringe },
  { id: 'Reunião', label: 'Reuniões', color: 'bg-gray-500', icon: Users },
  { id: 'Internamento', label: 'Internamento', color: 'bg-pink-500', icon: Bed },
] as const;
