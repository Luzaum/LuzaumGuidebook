import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, MapPin, Phone, Mail, Globe, Building } from 'lucide-react';

export const Profile = () => {
  const [clinicData, setClinicData] = useState({
    name: 'Vetius Clínica Veterinária',
    email: 'contato@vetius.com.br',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    website: 'www.vetius.com.br',
    description: 'Clínica veterinária especializada em atendimento de pequenos animais, com foco em bem-estar e tecnologia.',
    logo: 'https://lh3.googleusercontent.com/a/ACg8ocIq8dD8_i2lE7_yO2_n7_h8_r9_w0_k1_l2_m3_n4_o5=s96-c'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClinicData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a backend
    alert('Dados salvos com sucesso!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Perfil da Clínica</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie as informações e identidade visual da sua clínica.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
        >
          <Save size={20} />
          Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Logo & Basic Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 flex flex-col items-center text-center">
            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 dark:border-neutral-800 shadow-inner">
                <img 
                  src={clinicData.logo} 
                  alt="Logo da Clínica" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-110 active:scale-95"
              >
                <Camera size={18} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleLogoUpload}
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{clinicData.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Clínica Veterinária</p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building size={18} className="text-primary" />
              Informações de Contato
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{clinicData.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Phone size={16} className="shrink-0" />
                <span>{clinicData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Mail size={16} className="shrink-0" />
                <span>{clinicData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Globe size={16} className="shrink-0" />
                <span>{clinicData.website}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Editar Informações</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Clínica</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={clinicData.name}
                    onChange={(e) => setClinicData({...clinicData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={clinicData.website}
                    onChange={(e) => setClinicData({...clinicData, website: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={clinicData.email}
                    onChange={(e) => setClinicData({...clinicData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={clinicData.phone}
                    onChange={(e) => setClinicData({...clinicData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Endereço Completo</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={clinicData.address}
                  onChange={(e) => setClinicData({...clinicData, address: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[120px]"
                  value={clinicData.description}
                  onChange={(e) => setClinicData({...clinicData, description: e.target.value})}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
