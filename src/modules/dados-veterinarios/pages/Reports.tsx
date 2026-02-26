import React, { useEffect, useMemo, useState } from 'react';
import { BarChart3, Download, LineChart, PieChart, Building2 } from 'lucide-react';
import { endOfWeek, format, isSameDay, isSameMonth, isSameYear, isWithinInterval, startOfWeek } from 'date-fns';
import { useData } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { formatCurrency } from './Financial';
import { exportSummaryPdf } from '../lib/pdfExport';

type ReportRange = 'day' | 'week' | 'month' | 'year';

const includesClinic = (clinicId: string | undefined, selectedClinicIds: string[]) =>
  !clinicId || clinicId === 'all' || selectedClinicIds.includes(clinicId);

export const Reports = () => {
  const { clinics } = useClinicAuth();
  const { patients, tutors, appointments, financialRecords, services } = useData();
  const [range, setRange] = useState<ReportRange>('month');
  const [selectedReportClinics, setSelectedReportClinics] = useState<string[]>(clinics.map((c) => c.id));
  const today = new Date();

  const isInRange = (dateValue: Date | string) => {
    const d = new Date(dateValue);
    if (range === 'day') return isSameDay(d, today);
    if (range === 'week') {
      return isWithinInterval(d, {
        start: startOfWeek(today, { weekStartsOn: 0 }),
        end: endOfWeek(today, { weekStartsOn: 0 }),
      });
    }
    if (range === 'month') return isSameMonth(d, today);
    return isSameYear(d, today);
  };

  useEffect(() => {
    if (!selectedReportClinics.length) setSelectedReportClinics(clinics.map((c) => c.id));
  }, [clinics, selectedReportClinics.length]);

  const filteredFinancial = useMemo(
    () => financialRecords.filter((r) => includesClinic(r.clinicId, selectedReportClinics) && isInRange(r.date)),
    [financialRecords, selectedReportClinics, range],
  );
  const filteredAppointments = useMemo(
    () => appointments.filter((a) => includesClinic(a.clinicId, selectedReportClinics) && isInRange(a.date)),
    [appointments, selectedReportClinics, range],
  );
  const filteredPatients = useMemo(
    () => patients.filter((p) => includesClinic(p.clinicId, selectedReportClinics)),
    [patients, selectedReportClinics],
  );
  const filteredTutors = useMemo(
    () => tutors.filter((t) => includesClinic(t.clinicId, selectedReportClinics)),
    [tutors, selectedReportClinics],
  );

  const totals = useMemo(() => {
    const revenue = filteredFinancial
      .filter((r) => r.type === 'Receita')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expense = filteredFinancial
      .filter((r) => r.type === 'Despesa')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const doneAppointments = filteredAppointments.filter((a) => a.status === 'Concluído').length;
    const pendingAppointments = filteredAppointments.filter((a) => a.status !== 'Concluído').length;
    const ticket = doneAppointments > 0 ? revenue / doneAppointments : 0;
    return { revenue, expense, result: revenue - expense, doneAppointments, pendingAppointments, ticket };
  }, [filteredFinancial, filteredAppointments]);

  const byClinic = useMemo(() => {
    return clinics
      .filter((clinic) => selectedReportClinics.includes(clinic.id))
      .map((clinic) => {
        const clinicRevenue = filteredFinancial
          .filter((r) => (r.clinicId === clinic.id || r.clinicId === 'all') && r.type === 'Receita')
          .reduce((acc, curr) => acc + curr.amount, 0);
        const clinicExpense = filteredFinancial
          .filter((r) => (r.clinicId === clinic.id || r.clinicId === 'all') && r.type === 'Despesa')
          .reduce((acc, curr) => acc + curr.amount, 0);
        const clinicAppointments = filteredAppointments.filter((a) => a.clinicId === clinic.id || a.clinicId === 'all');
        const clinicPatients = filteredPatients.filter((p) => p.clinicId === clinic.id || p.clinicId === undefined);
        return {
          id: clinic.id,
          name: clinic.name,
          revenue: clinicRevenue,
          expense: clinicExpense,
          result: clinicRevenue - clinicExpense,
          appointments: clinicAppointments.length,
          doneAppointments: clinicAppointments.filter((a) => a.status === 'Concluído').length,
          patients: clinicPatients.length,
        };
      });
  }, [clinics, filteredFinancial, filteredAppointments, filteredPatients, selectedReportClinics]);

  const revenueByCategory = useMemo(() => {
    const categoryMap = new Map<string, number>();
    filteredFinancial
      .filter((r) => r.type === 'Receita')
      .forEach((r) => categoryMap.set(r.category, (categoryMap.get(r.category) || 0) + r.amount));
    return Array.from(categoryMap.entries())
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredFinancial]);

  const topServices = useMemo(() => {
    return services
      .filter((service) => includesClinic(service.clinicId, selectedReportClinics))
      .map((service) => ({
        ...service,
        generatedRevenue: filteredFinancial
          .filter((r) => r.type === 'Receita' && r.category === service.category)
          .reduce((acc, curr) => acc + curr.amount, 0),
      }))
      .sort((a, b) => b.generatedRevenue - a.generatedRevenue)
      .slice(0, 10);
  }, [services, filteredFinancial, selectedReportClinics]);

  const selectedClinicLabel =
    selectedReportClinics.length === clinics.length
      ? 'Todas as unidades'
      : clinics
          .filter((c) => selectedReportClinics.includes(c.id))
          .map((c) => c.name)
          .join(', ');

  const toggleClinic = (clinicId: string) => {
    setSelectedReportClinics((prev) => {
      if (prev.includes(clinicId)) return prev.filter((id) => id !== clinicId);
      return [...prev, clinicId];
    });
  };

  const exportPdf = () => {
    exportSummaryPdf({
      title: 'Relatório Executivo UPA PET',
      subtitle: `Período: ${range} | Unidades: ${selectedClinicLabel}`,
      filename: `relatorio-upapet-${range}-${new Date().getTime()}.pdf`,
      highlights: [
        { label: 'Receita Total', value: formatCurrency(totals.revenue) },
        { label: 'Despesa Total', value: formatCurrency(totals.expense) },
        { label: 'Resultado', value: formatCurrency(totals.result) },
        { label: 'Ticket Médio', value: formatCurrency(totals.ticket) },
      ],
      sections: [
        {
          title: 'Indicadores-chave',
          lines: [
            `Receita total: ${formatCurrency(totals.revenue)}`,
            `Despesa total: ${formatCurrency(totals.expense)}`,
            `Resultado: ${formatCurrency(totals.result)}`,
            `Atendimentos concluídos: ${totals.doneAppointments}`,
            `Ticket médio: ${formatCurrency(totals.ticket)}`,
            `Pacientes ativos: ${filteredPatients.length}`,
            `Tutores ativos: ${filteredTutors.length}`,
          ],
        },
        {
          title: 'Desempenho por unidade',
          lines: byClinic.map((unit) => `${unit.name}: resultado ${formatCurrency(unit.result)} | agenda ${unit.doneAppointments}/${unit.appointments}`),
        },
        {
          title: 'Histórico financeiro recente',
          lines: filteredFinancial
            .slice(0, 16)
            .map((item) => `${format(new Date(item.date), 'dd/MM/yyyy HH:mm')} - ${item.description} (${item.type}) ${formatCurrency(item.amount)}`),
        },
      ],
      footerNote:
        'Documento executivo com visão unificada de desempenho, serviços e financeiro.',
    });
  };

  return (
    <div className="space-y-6">
      <header className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Relatório Consolidado da Rede UPA PET
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Resumo executivo, indicadores-chave, financeiro e desempenho por unidade.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
              {(['day', 'week', 'month', 'year'] as ReportRange[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  className={`px-3 py-2 text-sm ${
                    range === item ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item === 'day' ? 'Dia' : item === 'week' ? 'Semana' : item === 'month' ? 'Mês' : 'Ano'}
                </button>
              ))}
            </div>
            <button
              onClick={exportPdf}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white"
            >
              <Download size={16} /> Exportar PDF
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Unidades no relatório</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedReportClinics(clinics.map((c) => c.id))}
              className="px-3 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700"
            >
              Selecionar todas
            </button>
            {clinics.map((clinic) => (
              <button
                key={clinic.id}
                onClick={() => toggleClinic(clinic.id)}
                className={`px-3 py-1.5 rounded-lg text-xs border ${
                  selectedReportClinics.includes(clinic.id)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600'
                }`}
              >
                {clinic.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <article className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
          <p className="text-xs text-gray-500 uppercase">Receita Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(totals.revenue)}</p>
        </article>
        <article className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
          <p className="text-xs text-gray-500 uppercase">Despesa Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(totals.expense)}</p>
        </article>
        <article className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
          <p className="text-xs text-gray-500 uppercase">Resultado</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(totals.result)}</p>
        </article>
        <article className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
          <p className="text-xs text-gray-500 uppercase">Atendimentos Concluídos</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totals.doneAppointments}</p>
        </article>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 inline-flex items-center gap-2">
            <Building2 size={18} className="text-primary" /> Desempenho por unidade
          </h2>
          <div className="space-y-3">
            {byClinic.map((unit) => (
              <div key={unit.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <div className="flex justify-between items-center gap-2">
                  <p className="font-semibold text-gray-900 dark:text-white">{unit.name}</p>
                  <p className="text-sm font-bold text-primary">{formatCurrency(unit.result)}</p>
                </div>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <span>Receita: {formatCurrency(unit.revenue)}</span>
                  <span>Despesa: {formatCurrency(unit.expense)}</span>
                  <span>Agenda: {unit.doneAppointments}/{unit.appointments}</span>
                  <span>Pacientes: {unit.patients}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 inline-flex items-center gap-2">
            <PieChart size={18} className="text-primary" /> Receita por categoria
          </h2>
          <div className="space-y-2">
            {revenueByCategory.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 py-2 text-sm">
                <span className="text-gray-700 dark:text-gray-300">{cat.category}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(cat.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 inline-flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" /> Ranking de serviços/produtos
          </h2>
          <div className="space-y-2">
            {topServices.map((service, idx) => (
              <div key={service.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {idx + 1}. {service.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{service.category}</p>
                </div>
                <p className="text-sm font-bold text-primary">{formatCurrency(service.generatedRevenue)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 inline-flex items-center gap-2">
            <LineChart size={18} className="text-primary" /> Indicadores-chave
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              <p className="text-xs text-gray-500">Tutores ativos</p>
              <p className="text-xl font-bold">{filteredTutors.length}</p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              <p className="text-xs text-gray-500">Pacientes ativos</p>
              <p className="text-xl font-bold">{filteredPatients.length}</p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              <p className="text-xs text-gray-500">Agenda pendente</p>
              <p className="text-xl font-bold">{totals.pendingAppointments}</p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              <p className="text-xs text-gray-500">Serviços no catálogo</p>
              <p className="text-xl font-bold">{services.length}</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Feedback de clientes por Google Reviews: integração pendente de API.
          </div>
        </div>
      </section>
    </div>
  );
};
