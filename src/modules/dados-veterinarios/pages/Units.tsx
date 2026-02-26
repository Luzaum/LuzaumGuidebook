import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Lock } from 'lucide-react';
import { useClinicAuth } from '../context/ClinicAuthContext';

export const Units = () => {
  const { clinics, isAdmin, addClinic, removeClinic } = useClinicAuth();
  const [form, setForm] = useState({
    name: '',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: '',
    services: 'Pronto Socorro, Consulta Clinica, Especialidades',
    imageUrl: '/apps/uapepet.png',
  });

  const parsedServices = useMemo(
    () => form.services.split(',').map((item) => item.trim()).filter(Boolean),
    [form.services],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    if (!form.name || !form.address) return;
    addClinic({
      name: form.name,
      phone: form.phone,
      schedule: form.schedule,
      address: form.address,
      services: parsedServices,
      imageUrl: form.imageUrl,
    });
    setForm((prev) => ({ ...prev, name: '', address: '' }));
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center max-w-lg">
          <Lock className="mx-auto text-gray-500" size={30} />
          <h1 className="text-xl font-bold mt-3 text-gray-900 dark:text-white">Acesso restrito</h1>
          <p className="text-sm text-gray-500 mt-2">Somente administradores podem gerenciar unidades da rede.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Unidades UPA PET</h1>
        <p className="text-gray-500 dark:text-gray-400">Adicionar ou remover unidades da rede.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Nome da unidade" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        <input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} placeholder="Endereco completo" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Telefone" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        <input value={form.schedule} onChange={(e) => setForm((p) => ({ ...p, schedule: e.target.value }))} placeholder="Horario" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        <input value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} placeholder="URL da imagem" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent md:col-span-2" />
        <input value={form.services} onChange={(e) => setForm((p) => ({ ...p, services: e.target.value }))} placeholder="Servicos separados por virgula" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent md:col-span-2" />
        <button className="md:col-span-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white">
          <Plus size={16} /> Adicionar unidade
        </button>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {clinics.map((clinic) => (
          <article key={clinic.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={clinic.imageUrl || '/apps/uapepet.png'} alt={clinic.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">{clinic.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{clinic.phone}</p>
                </div>
              </div>
              <button onClick={() => removeClinic(clinic.id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{clinic.address}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {clinic.services.map((service) => (
                <span key={service} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  {service}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

