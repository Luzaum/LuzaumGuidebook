import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Receipt, TrendingDown, PiggyBank, Calendar as CalendarIcon, Download } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { format, isSameDay, isSameMonth, isSameYear, startOfWeek, endOfWeek, eachDayOfInterval, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const COLORS = ['#13ec80', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];
type Period = 'day' | 'week' | 'month' | 'year';

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
  <motion.div whileHover={{ y: -2 }} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between group transition-colors">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110`}>
      <Icon size={24} />
    </div>
  </motion.div>
);

export const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const Financial = () => {
  const { financialRecords } = useData();
  const { selectedClinicId, clinics } = useClinicAuth();
  const [period, setPeriod] = useState<Period>('month');

  const today = new Date();
  const filteredRecords = useMemo(() => {
    return financialRecords.filter((record) => {
      const d = new Date(record.date);
      if (period === 'day') return isSameDay(d, today);
      if (period === 'week') return isWithinInterval(d, { start: startOfWeek(today, { weekStartsOn: 0 }), end: endOfWeek(today, { weekStartsOn: 0 }) });
      if (period === 'month') return isSameMonth(d, today);
      return isSameYear(d, today);
    });
  }, [financialRecords, period, today]);

  const totalRevenue = filteredRecords.filter((r) => r.type === 'Receita').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = filteredRecords.filter((r) => r.type === 'Despesa').reduce((acc, curr) => acc + curr.amount, 0);
  const netIncome = totalRevenue - totalExpenses;
  const revenueCount = filteredRecords.filter((r) => r.type === 'Receita').length;
  const averageTicket = revenueCount > 0 ? totalRevenue / revenueCount : 0;

  const weekDays = eachDayOfInterval({ start: startOfWeek(today, { weekStartsOn: 0 }), end: endOfWeek(today, { weekStartsOn: 0 }) });
  const revenueData = weekDays.map((day) => ({
    name: format(day, 'EEE', { locale: ptBR }),
    value: filteredRecords
      .filter((r) => r.type === 'Receita' && isSameDay(new Date(r.date), day))
      .reduce((acc, curr) => acc + curr.amount, 0),
  }));

  const categories = Array.from(new Set(filteredRecords.filter((r) => r.type === 'Receita').map((r) => r.category)));
  const pieData = categories.map((cat) => ({
    name: cat,
    value: filteredRecords.filter((r) => r.type === 'Receita' && r.category === cat).reduce((acc, curr) => acc + curr.amount, 0),
  }));

  const periodLabel = {
    day: 'Hoje',
    week: 'Semana',
    month: 'Mes',
    year: 'Ano',
  }[period];

  const clinicLabel = selectedClinicId === 'all' ? 'Todas as unidades' : clinics.find((c) => c.id === selectedClinicId)?.name || 'Unidade';

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Painel Financeiro</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Visao financeira por periodo e por unidade. Escopo atual: {clinicLabel}.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
            {(['day', 'week', 'month', 'year'] as Period[]).map((item) => (
              <button key={item} onClick={() => setPeriod(item)} className={`px-3 py-2 text-sm ${period === item ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                {item === 'day' ? 'Dia' : item === 'week' ? 'Semana' : item === 'month' ? 'Mes' : 'Ano'}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors flex items-center gap-2 shadow-sm">
            <CalendarIcon size={20} className="text-gray-500 dark:text-gray-400" />
            {periodLabel}
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-500 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30">
            <Download size={20} />
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Receita Total" value={formatCurrency(totalRevenue)} icon={DollarSign} color="bg-green-500" />
        <StatCard title="Ticket Medio" value={formatCurrency(averageTicket)} icon={Receipt} color="bg-blue-500" />
        <StatCard title="Despesas" value={formatCurrency(totalExpenses)} icon={TrendingDown} color="bg-red-500" />
        <StatCard title="Lucro Liquido" value={formatCurrency(netIncome)} icon={PiggyBank} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
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

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Receita por categoria</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} /><span className="text-gray-600 dark:text-gray-300">{entry.name}</span></div>
                <span className="font-medium text-gray-900 dark:text-white">{totalRevenue > 0 ? Math.round((entry.value / totalRevenue) * 100) : 0}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
