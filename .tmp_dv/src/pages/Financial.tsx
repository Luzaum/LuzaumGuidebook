import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Receipt, TrendingDown, PiggyBank, Calendar as CalendarIcon, Download } from 'lucide-react';
import { useData } from '../context/DataContext';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const COLORS = ['#13ec80', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between group transition-colors"
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

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const Financial = () => {
  const { financialRecords } = useData();

  // Calculate Stats
  const totalRevenue = financialRecords
    .filter(r => r.type === 'Receita')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpenses = financialRecords
    .filter(r => r.type === 'Despesa')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netIncome = totalRevenue - totalExpenses;
  const revenueCount = financialRecords.filter(r => r.type === 'Receita').length;
  const averageTicket = revenueCount > 0 ? totalRevenue / revenueCount : 0;

  // Calculate Revenue Data for Chart (Weekly)
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 }); // Sunday
  const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });

  const revenueData = weekDays.map(day => {
    const dailyRevenue = financialRecords
      .filter(r => r.type === 'Receita' && isSameDay(new Date(r.date), day))
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    return {
      name: format(day, 'EEE', { locale: ptBR }),
      value: dailyRevenue
    };
  });

  // Calculate Pie Data
  const categories = Array.from(new Set(financialRecords.filter(r => r.type === 'Receita').map(r => r.category)));
  const pieData = categories.map(cat => ({
    name: cat,
    value: financialRecords
      .filter(r => r.type === 'Receita' && r.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0)
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Painel Financeiro</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Visão geral das receitas e despesas da clínica.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors flex items-center gap-2 shadow-sm">
            <CalendarIcon size={20} className="text-gray-500 dark:text-gray-400" />
            Este Mês
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-500 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30">
            <Download size={20} />
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Receita Total" value={formatCurrency(totalRevenue)} icon={DollarSign} color="bg-green-500" />
        <StatCard title="Ticket Médio" value={formatCurrency(averageTicket)} icon={Receipt} color="bg-blue-500" />
        <StatCard title="Despesas" value={formatCurrency(totalExpenses)} icon={TrendingDown} color="bg-red-500" />
        <StatCard title="Lucro Líquido" value={formatCurrency(netIncome)} icon={PiggyBank} color="bg-purple-500" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Receita Semanal</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(243, 244, 246, 0.1)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  formatter={(value: number) => [formatCurrency(value), 'Receita']}
                />
                <Bar dataKey="value" fill="#13ec80" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Receita por Categoria</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">100%</p>
             </div>
          </div>
          <div className="mt-4 space-y-3">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {totalRevenue > 0 ? Math.round((entry.value / totalRevenue) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Transações Recentes</h3>
          <button className="text-primary text-sm font-medium hover:underline">Ver todas</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                <th className="py-4 px-6">Descrição</th>
                <th className="py-4 px-6">Categoria</th>
                <th className="py-4 px-6">Data</th>
                <th className="py-4 px-6">Valor</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {financialRecords.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map((t, i) => (
                <tr key={t.id} className="border-b border-gray-50 dark:border-gray-800 last:border-none hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{t.description}</td>
                  <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{t.category}</td>
                  <td className="py-4 px-6 text-gray-500 dark:text-gray-400">
                    {format(new Date(t.date), "d 'de' MMM, HH:mm", { locale: ptBR })}
                  </td>
                  <td className={`py-4 px-6 font-medium ${t.type === 'Despesa' ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {t.type === 'Despesa' ? '- ' : ''}{formatCurrency(t.amount)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400`}>
                      Pago
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
