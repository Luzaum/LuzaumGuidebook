import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { UserPlus, Repeat, CalendarX, ThumbsUp, Calendar as CalendarIcon, Download, Trophy } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';

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

export const Analytics = () => {
  const { services, financialRecords } = useData();
  const { clinics, selectedClinicId } = useClinicAuth();
  const [period, setPeriod] = useState<Period>('month');

  const clinicLabel = selectedClinicId === 'all' ? 'Todas as unidades' : clinics.find((c) => c.id === selectedClinicId)?.name || 'Unidade';

  const revenueByCategory = useMemo(() => {
    const bucket = new Map<string, number>();
    financialRecords.filter((r) => r.type === 'Receita').forEach((r) => {
      bucket.set(r.category, (bucket.get(r.category) || 0) + r.amount);
    });
    return Array.from(bucket.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 8);
  }, [financialRecords]);

  const rankingProducts = useMemo(() => {
    return services
      .map((service) => {
        const gross = financialRecords
          .filter((r) => r.type === 'Receita' && r.category === service.category)
          .reduce((acc, curr) => acc + curr.amount, 0);
        return {
          id: service.id,
          name: service.name,
          category: service.category,
          clinic: service.clinicId === 'all' ? 'Rede' : clinics.find((c) => c.id === service.clinicId)?.name || 'Unidade',
          gross,
        };
      })
      .sort((a, b) => b.gross - a.gross)
      .slice(0, 10);
  }, [services, financialRecords, clinics]);

  const trendData = [
    { name: 'Jan', consultas: 400, exames: 240, vendas: 240 },
    { name: 'Fev', consultas: 300, exames: 139, vendas: 221 },
    { name: 'Mar', consultas: 200, exames: 980, vendas: 229 },
    { name: 'Abr', consultas: 278, exames: 390, vendas: 200 },
    { name: 'Mai', consultas: 189, exames: 480, vendas: 218 },
    { name: 'Jun', consultas: 239, exames: 380, vendas: 250 },
    { name: 'Jul', consultas: 349, exames: 430, vendas: 210 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Analise Detalhada</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Periodo: {period.toUpperCase()} | Escopo: {clinicLabel}</p>
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
            <CalendarIcon size={20} />
            Amostragem
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-500 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30">
            <Download size={20} />
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Novos Clientes" value="1.248" icon={UserPlus} color="bg-blue-500" />
        <StatCard title="Taxa de Retorno" value="86%" icon={Repeat} color="bg-green-500" />
        <StatCard title="Cancelamentos" value="2,4%" icon={CalendarX} color="bg-red-500" />
        <StatCard title="NPS" value="78" icon={ThumbsUp} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Consultas vs Exames</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorConsultas" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#13ec80" stopOpacity={0.8}/><stop offset="95%" stopColor="#13ec80" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorExames" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" strokeOpacity={0.2} />
                <Tooltip />
                <Area type="monotone" dataKey="consultas" stroke="#13ec80" fillOpacity={1} fill="url(#colorConsultas)" />
                <Area type="monotone" dataKey="exames" stroke="#3b82f6" fillOpacity={1} fill="url(#colorExames)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Ranking de produtos/servicos</h3>
          <div className="space-y-3 max-h-72 overflow-auto pr-1">
            {rankingProducts.map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{idx + 1}. {item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.category} - {item.clinic}</p>
                </div>
                <span className="text-sm font-bold text-primary">R$ {item.gross.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Trophy size={18} className="text-primary" /> Receita por categoria</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByCategory}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" strokeOpacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `R$ ${v.toFixed(2)}`} />
              <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
