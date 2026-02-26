import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { UserPlus, Repeat, CalendarX, ThumbsUp, Calendar as CalendarIcon, Download } from 'lucide-react';

const data = [
  { name: 'Jan', consultas: 400, exames: 240, vendas: 240 },
  { name: 'Fev', consultas: 300, exames: 139, vendas: 221 },
  { name: 'Mar', consultas: 200, exames: 980, vendas: 229 },
  { name: 'Abr', consultas: 278, exames: 390, vendas: 200 },
  { name: 'Mai', consultas: 189, exames: 480, vendas: 218 },
  { name: 'Jun', consultas: 239, exames: 380, vendas: 250 },
  { name: 'Jul', consultas: 349, exames: 430, vendas: 210 },
];

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

export const Analytics = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Análise Detalhada</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Insights profundos sobre o desempenho da clínica.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors flex items-center gap-2 shadow-sm">
            <CalendarIcon size={20} className="text-gray-500 dark:text-gray-400" />
            Este Ano
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-500 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30">
            <Download size={20} />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Novos Clientes" value="1,248" icon={UserPlus} color="bg-blue-500" />
        <StatCard title="Taxa de Retorno" value="86%" icon={Repeat} color="bg-green-500" />
        <StatCard title="Cancelamentos" value="2.4%" icon={CalendarX} color="bg-red-500" />
        <StatCard title="NPS" value="78" icon={ThumbsUp} color="bg-purple-500" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Consultas vs Exames */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Consultas vs Exames</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorConsultas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#13ec80" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#13ec80" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExames" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" strokeOpacity={0.2} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Area type="monotone" dataKey="consultas" stroke="#13ec80" fillOpacity={1} fill="url(#colorConsultas)" />
                <Area type="monotone" dataKey="exames" stroke="#3b82f6" fillOpacity={1} fill="url(#colorExames)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vendas de Produtos */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Vendas de Produtos</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(243, 244, 246, 0.1)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                />
                <Bar dataKey="vendas" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
