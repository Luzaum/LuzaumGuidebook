import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Download, Printer, Share2 } from 'lucide-react';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { useData } from '../context/DataContext';
import { dvPath } from '../DadosVeterinariosModule';
import { useNavigate } from 'react-router-dom';

const sections = [
  'Resumo Executivo',
  'Indicadores Chave',
  'Analise Financeira',
  'Desempenho por Unidade',
  'Estoque e Insumos',
  'Feedback de Clientes',
];

export const Reports = () => {
  const navigate = useNavigate();
  const { clinics } = useClinicAuth();
  const { financialRecords, services } = useData();
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [zoom, setZoom] = useState(100);

  const byClinic = useMemo(() => {
    return clinics.map((clinic) => {
      const revenue = financialRecords
        .filter((r) => (r.clinicId === clinic.id || r.clinicId === 'all') && r.type === 'Receita')
        .reduce((acc, curr) => acc + curr.amount, 0);
      const expenses = financialRecords
        .filter((r) => (r.clinicId === clinic.id || r.clinicId === 'all') && r.type === 'Despesa')
        .reduce((acc, curr) => acc + curr.amount, 0);
      return { clinic: clinic.name, revenue, expenses, profit: revenue - expenses };
    });
  }, [clinics, financialRecords]);

  const topServices = useMemo(() => {
    return services.slice(0, 8);
  }, [services]);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      <div className="w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 overflow-y-auto hidden lg:block transition-colors">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 px-2">Estrutura</h3>
        <ul className="space-y-1">
          {sections.map((item) => (
            <li key={item}>
              <button onClick={() => setActiveSection(item)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === item ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden transition-colors">
        <div className="h-14 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 bg-gray-50/50 dark:bg-gray-800/50 transition-colors">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Relatorio Executivo UPA PET</h2>
            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom((z) => Math.max(60, z - 10))} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><Minus size={20} /></button>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(150, z + 10))} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><Plus size={20} /></button>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-2" />
            <button onClick={() => window.print()} className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg" title="Baixar PDF"><Download size={20} /></button>
            <button onClick={() => window.print()} className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg" title="Imprimir"><Printer size={20} /></button>
            <button onClick={() => navigate(dvPath('coming-soon'), { state: { from: 'Compartilhar relatorio' } })} className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg" title="Compartilhar"><Share2 size={20} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900/50 p-6 md:p-8 flex justify-center transition-colors">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }} className="bg-white w-full max-w-5xl min-h-[900px] shadow-lg p-8 text-gray-800">
            <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{activeSection}</h1>
                <p className="text-gray-500">Rede UPA PET - consolidado multiunidade</p>
              </div>
              <div className="text-right">
                <img src="/apps/uapepet.png" alt="UPA PET" className="w-12 h-12 ml-auto rounded-lg object-cover" />
                <p className="font-bold text-gray-900 mt-2">Dados Veterinarios</p>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Desempenho por unidade</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {byClinic.map((row) => (
                  <div key={row.clinic} className="rounded-xl border border-gray-200 p-4">
                    <p className="font-semibold text-gray-900">{row.clinic}</p>
                    <p className="text-sm text-gray-600 mt-1">Receita: R$ {row.revenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Despesa: R$ {row.expenses.toFixed(2)}</p>
                    <p className="text-sm font-semibold mt-1">Resultado: R$ {row.profit.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Estoque/servicos em destaque</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topServices.map((service) => (
                  <div key={service.id} className="rounded-xl border border-gray-200 p-3">
                    <p className="font-semibold text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">{service.category} - R$ {service.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Feedback de clientes</h2>
              <p className="text-gray-600">Integracao com avaliacoes do Google por unidade esta planejada e foi deixada no relatorio de pendencias.</p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
