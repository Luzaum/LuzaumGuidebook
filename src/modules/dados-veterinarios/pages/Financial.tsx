import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DollarSign, Receipt, TrendingDown, PiggyBank, Download } from 'lucide-react';
import {
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  isSameYear,
  isWithinInterval,
  startOfWeek,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useData } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { exportSummaryPdf } from '../lib/pdfExport';

const COLORS = ['#13ec80', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];
type Period = 'day' | 'week' | 'month' | 'year';

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({
  title,
  value,
  icon: Icon,
  color,
}) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="dv-glass-card bg-white/90 dark:bg-gray-900/75 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100/80 dark:border-gray-800/80 flex items-center justify-between group transition-all duration-300"
  >
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
    </div>
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110`}
    >
      <Icon size={24} />
    </div>
  </motion.div>
);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const Financial = () => {
  const { financialRecords, appointments } = useData();
  const { selectedClinicId, clinics } = useClinicAuth();
  const [period, setPeriod] = useState<Period>(() => {
    try {
      const saved = window.localStorage.getItem('dv:financial:period');
      return (saved as Period) || 'month';
    } catch {
      return 'month';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('dv:financial:period', period);
    } catch (error) {
      console.warn('[Financial] Failed to persist period:', error);
    }
  }, [period]);

  const today = new Date();
  const filteredRecords = useMemo(() => {
    return financialRecords.filter((record) => {
      const d = new Date(record.date);
      if (period === 'day') return isSameDay(d, today);
      if (period === 'week') {
        return isWithinInterval(d, {
          start: startOfWeek(today, { weekStartsOn: 0 }),
          end: endOfWeek(today, { weekStartsOn: 0 }),
        });
      }
      if (period === 'month') return isSameMonth(d, today);
      return isSameYear(d, today);
    });
  }, [financialRecords, period, today]);

  const totalRevenue = filteredRecords
    .filter((r) => r.type === 'Receita')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = filteredRecords
    .filter((r) => r.type === 'Despesa')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const netIncome = totalRevenue - totalExpenses;
  const revenueCount = filteredRecords.filter((r) => r.type === 'Receita').length;
  const averageTicket = revenueCount > 0 ? totalRevenue / revenueCount : 0;
  const appointmentsDone = appointments.filter((a) => a.status === 'Concluído').length;

  const weekDays = eachDayOfInterval({
    start: startOfWeek(today, { weekStartsOn: 0 }),
    end: endOfWeek(today, { weekStartsOn: 0 }),
  });
  const revenueData = weekDays.map((day) => ({
    name: format(day, 'EEE', { locale: ptBR }),
    value: filteredRecords
      .filter((r) => r.type === 'Receita' && isSameDay(new Date(r.date), day))
      .reduce((acc, curr) => acc + curr.amount, 0),
  }));

  const categories = Array.from(
    new Set(filteredRecords.filter((r) => r.type === 'Receita').map((r) => r.category)),
  );
  const pieData = categories.map((cat) => ({
    name: cat,
    value: filteredRecords
      .filter((r) => r.type === 'Receita' && r.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0),
  }));

  const periodLabel = { day: 'Dia', week: 'Semana', month: 'Mês', year: 'Ano' }[period];
  const clinicLabel =
    selectedClinicId === 'all'
      ? 'Todas as unidades'
      : clinics.find((c) => c.id === selectedClinicId)?.name || 'Unidade';

  const exportPdf = () => {
    const serviceHistory = filteredRecords
      .filter((r) => r.type === 'Receita')
      .slice(0, 18)
      .map((r) => `${format(new Date(r.date), 'dd/MM/yyyy HH:mm')} - ${r.description}: ${formatCurrency(r.amount)}`);

    exportSummaryPdf({
      title: 'Relatório Financeiro UPA PET',
      subtitle: `Período: ${periodLabel} | Escopo: ${clinicLabel}`,
      filename: `financeiro-upapet-${period}-${new Date().getTime()}.pdf`,
      highlights: [
        { label: 'Receita Total', value: formatCurrency(totalRevenue) },
        { label: 'Despesa Total', value: formatCurrency(totalExpenses) },
        { label: 'Resultado', value: formatCurrency(netIncome) },
        { label: 'Ticket Médio', value: formatCurrency(averageTicket) },
      ],
      sections: [
        {
          title: 'Resumo Executivo',
          lines: [
            `Receita total: ${formatCurrency(totalRevenue)}`,
            `Despesa total: ${formatCurrency(totalExpenses)}`,
            `Resultado: ${formatCurrency(netIncome)}`,
            `Ticket médio: ${formatCurrency(averageTicket)}`,
            `Atendimentos concluídos: ${appointmentsDone}`,
          ],
        },
        {
          title: 'Histórico de Serviços Lançados',
          lines: serviceHistory.length ? serviceHistory : ['Sem lançamentos no período.'],
        },
      ],
      footerNote:
        'Relatório gerado automaticamente pelo módulo Dados Veterinários UPA PET. Valores em BRL.',
    });
  };

  return (
    <div className="dv-aurora-bg dv-section-enter space-y-8 rounded-[28px] p-3 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Painel Financeiro</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Visão financeira por período e por unidade. Escopo atual: {clinicLabel}.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
            {(['day', 'week', 'month', 'year'] as Period[]).map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`px-3 py-2 text-sm ${
                  period === item ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item === 'day' ? 'Dia' : item === 'week' ? 'Semana' : item === 'month' ? 'Mês' : 'Ano'}
              </button>
            ))}
          </div>
          <button
            onClick={exportPdf}
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-500 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30"
          >
            <Download size={20} />
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Receita Total" value={formatCurrency(totalRevenue)} icon={DollarSign} color="bg-green-500" />
        <StatCard title="Ticket Médio" value={formatCurrency(averageTicket)} icon={Receipt} color="bg-blue-500" />
        <StatCard title="Despesas" value={formatCurrency(totalExpenses)} icon={TrendingDown} color="bg-red-500" />
        <StatCard title="Lucro Líquido" value={formatCurrency(netIncome)} icon={PiggyBank} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 dv-glass-card bg-white/90 dark:bg-gray-900/75 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100/80 dark:border-gray-800/80 transition-all duration-300">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Receita semanal</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(243, 244, 246, 0.1)' }} formatter={(value: number) => [formatCurrency(value), 'Receita']} />
                <Bar dataKey="value" fill="#13ec80" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dv-glass-card bg-white/90 dark:bg-gray-900/75 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100/80 dark:border-gray-800/80 transition-all duration-300">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Receita por categoria</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

