import React, { useMemo, useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Download, User, PawPrint, Phone, Mail, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData, Tutor, Patient } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { Modal } from '../components/ui/Modal';
import { dvPath } from '../DadosVeterinariosModule';

type NewPatientDraft = {
  name: string;
  species: 'Canino' | 'Felino';
  sex: 'Macho' | 'Fêmea' | 'Sem dados';
  reproductiveStatus: 'Castrado' | 'Fértil' | 'Sem dados';
  breed: string;
  ageText: string;
  coat: string;
  microchip: 'true' | 'false';
  weightKg: string;
  anamnesis: string;
  notes: string;
};

const CANINE_BREEDS_25 = [
  'SRD (Sem Raça Definida)',
  'Shih Tzu',
  'Yorkshire Terrier',
  'Poodle',
  'Golden Retriever',
  'Labrador Retriever',
  'Spitz Alemão',
  'Bulldog Francês',
  'Bulldog Inglês',
  'Beagle',
  'Dachshund',
  'Rottweiler',
  'Pastor Alemão',
  'Border Collie',
  'Maltês',
  'Lhasa Apso',
  'Chow Chow',
  'Pug',
  'Basset Hound',
  'Pinscher',
  'Cocker Spaniel',
  'Jack Russell Terrier',
  'Husky Siberiano',
  'Pit Bull',
  'American Bully',
];

const FELINE_BREEDS_10 = [
  'SRD Felino',
  'Siamês',
  'Persa',
  'Maine Coon',
  'Bengal',
  'Ragdoll',
  'Sphynx',
  'British Shorthair',
  'Angorá Turco',
  'Azul Russo',
];

const onlyDigits = (value: string) => value.replace(/\D/g, '');

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const formatCPF = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
};

const formatRG = (value: string) => {
  const digits = onlyDigits(value).slice(0, 9);
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
};

const formatPhone = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};

const formatCEP = (value: string) => {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.replace(/^(\d{5})(\d)/, '$1-$2');
};

const emptyPatientDraft = (): NewPatientDraft => ({
  name: '',
  species: 'Canino',
  sex: 'Macho',
  reproductiveStatus: 'Sem dados',
  breed: '',
  ageText: '',
  coat: '',
  microchip: 'false',
  weightKg: '',
  anamnesis: '',
  notes: '',
});

export const Tutors = () => {
  const navigate = useNavigate();
  const { tutors, patients, addTutor, addPatient } = useData();
  const { selectedClinicId } = useClinicAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTutor, setNewTutor] = useState<Partial<Tutor>>({
    name: '',
    cpf: '',
    rg: '',
    phone: '',
    email: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
    observations: '',
  });
  const [draftPatients, setDraftPatients] = useState<NewPatientDraft[]>([emptyPatientDraft()]);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');

  const getBreedOptions = (species: 'Canino' | 'Felino', query: string) => {
    const source = species === 'Canino' ? CANINE_BREEDS_25 : FELINE_BREEDS_10;
    const q = normalizeText(query.trim());
    if (!q) return source;
    return source.filter((breed) => normalizeText(breed).startsWith(q));
  };

  const filteredTutors = useMemo(
    () => tutors.filter((tutor) => tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) || (tutor.cpf || '').includes(searchTerm)),
    [tutors, searchTerm],
  );

  const getPetsCount = (tutorId: string) => patients.filter((p) => p.tutorId === tutorId).length;

  const patchDraftPatient = (index: number, key: keyof NewPatientDraft, value: string) => {
    setDraftPatients((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const addDraftPatient = () => setDraftPatients((prev) => [...prev, emptyPatientDraft()]);
  const removeDraftPatient = (index: number) => setDraftPatients((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));

  const handleCepImport = async () => {
    const cepDigits = onlyDigits(newTutor.cep || '');
    if (cepDigits.length !== 8) {
      setCepError('Digite um CEP válido com 8 dígitos.');
      return;
    }

    setCepLoading(true);
    setCepError('');
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
      if (!response.ok) throw new Error('Falha na consulta do CEP');
      const data = await response.json();
      if (data.erro) {
        setCepError('CEP não encontrado.');
        return;
      }
      setNewTutor((prev) => ({
        ...prev,
        street: data.logradouro || prev.street || '',
        neighborhood: data.bairro || prev.neighborhood || '',
        city: data.localidade || prev.city || '',
        state: data.uf || prev.state || '',
      }));
    } catch (error) {
      setCepError('Não foi possível importar o endereço pelo CEP.');
    } finally {
      setCepLoading(false);
    }
  };

  const handleSaveTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTutor.name || !newTutor.cpf || !newTutor.phone) return;

    const tutorId = Math.random().toString(36).substr(2, 9);
    const address = [newTutor.cep, newTutor.street, newTutor.number, newTutor.neighborhood, newTutor.city, newTutor.state].filter(Boolean).join(', ');

    addTutor({
      id: tutorId,
      clinicId: selectedClinicId === 'all' ? undefined : selectedClinicId,
      name: newTutor.name,
      cpf: newTutor.cpf,
      rg: newTutor.rg,
      phone: newTutor.phone,
      email: newTutor.email || '',
      street: newTutor.street,
      number: newTutor.number,
      neighborhood: newTutor.neighborhood,
      city: newTutor.city,
      state: newTutor.state,
      cep: newTutor.cep,
      address,
      observations: newTutor.observations,
      pets: [],
    } as Tutor);

    draftPatients
      .filter((p) => p.name.trim())
      .forEach((item) => {
        addPatient({
          id: Math.random().toString(36).substr(2, 9),
          clinicId: selectedClinicId === 'all' ? undefined : selectedClinicId,
          tutorId,
          name: item.name,
          species: item.species,
          breed: item.breed || 'Sem raça definida',
          sex: item.sex === 'Sem dados' ? 'Macho' : (item.sex as 'Macho' | 'Fêmea'),
          gender: item.sex === 'Sem dados' ? 'Macho' : (item.sex as 'Macho' | 'Fêmea'),
          age: item.ageText || 'Sem dados',
          weight: item.weightKg ? `${item.weightKg}kg` : '0kg',
          coatColor: item.coat,
          microchipped: item.microchip === 'true',
          status: 'Vivo',
          anamnesis: item.anamnesis
            ? [{ id: Math.random().toString(36).slice(2, 9), date: new Date(), complaint: item.anamnesis, history: item.notes || item.anamnesis }]
            : [],
        } as Patient);
      });

    setIsModalOpen(false);
    setNewTutor({
      name: '',
      cpf: '',
      rg: '',
      phone: '',
      email: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: '',
      observations: '',
    });
    setDraftPatients([emptyPatientDraft()]);
    setCepError('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Gestão de Tutores</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Cadastro completo de tutor e pacientes no mesmo fluxo.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Download size={18} /> Exportar
          </button>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-green-600 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30">
            <Plus size={18} /> Novo Tutor
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex border-b border-gray-100 dark:border-gray-800">
          <button className="px-6 py-4 text-sm font-bold text-primary border-b-2 border-primary flex items-center gap-2">
            <User size={18} /> Tutores <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">{tutors.length}</span>
          </button>
          <button onClick={() => navigate(dvPath('patients'))} className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors">
            <PawPrint size={18} /> Pacientes <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs">{patients.length}</span>
          </button>
        </div>

        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50 dark:bg-gray-800/30">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Filtrar nesta lista..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={18} /> Filtros Avançados
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                <th className="py-4 px-6">Nome</th>
                <th className="py-4 px-6">Contato</th>
                <th className="py-4 px-6 text-center">Pets</th>
                <th className="py-4 px-6">Endereço</th>
                <th className="py-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredTutors.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">Nenhum tutor encontrado.</td></tr>
              ) : (
                filteredTutors.map((tutor) => (
                  <tr key={tutor.id} onClick={() => navigate(dvPath(`tutors/${tutor.id}`))} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-bold text-lg">{tutor.name.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{tutor.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">CPF: {tutor.cpf}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm text-gray-900 dark:text-white"><Phone size={14} className="text-gray-400" />{tutor.phone}</div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><Mail size={14} className="text-gray-400" />{tutor.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center"><span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-sm">{getPetsCount(tutor.id)}</span></td>
                    <td className="py-4 px-6"><p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[260px]">{tutor.address}</p></td>
                    <td className="py-4 px-6 text-right"><button onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><MoreVertical size={20} /></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Tutor + Pacientes" className="max-w-5xl">
        <form onSubmit={handleSaveTutor} className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase mb-3">Dados do tutor</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input required placeholder="Nome completo *" className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent md:col-span-2" value={newTutor.name || ''} onChange={(e) => setNewTutor({ ...newTutor, name: e.target.value })} />
              <input required placeholder="CPF *" maxLength={14} className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" value={newTutor.cpf || ''} onChange={(e) => setNewTutor({ ...newTutor, cpf: formatCPF(e.target.value) })} />
              <input placeholder="RG" maxLength={12} className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" value={newTutor.rg || ''} onChange={(e) => setNewTutor({ ...newTutor, rg: formatRG(e.target.value) })} />
              <input required placeholder="Telefone *" maxLength={15} className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" value={newTutor.phone || ''} onChange={(e) => setNewTutor({ ...newTutor, phone: formatPhone(e.target.value) })} />
              <input placeholder="Email" className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent md:col-span-2" value={newTutor.email || ''} onChange={(e) => setNewTutor({ ...newTutor, email: e.target.value })} />
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
                <input placeholder="CEP *" maxLength={9} className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" value={newTutor.cep || ''} onChange={(e) => setNewTutor({ ...newTutor, cep: formatCEP(e.target.value) })} />
                <button type="button" onClick={handleCepImport} disabled={cepLoading} className="px-4 py-2 rounded-xl border border-primary text-primary font-semibold disabled:opacity-60">
                  {cepLoading ? 'Importando...' : 'Importar CEP'}
                </button>
              </div>
              {cepError ? <div className="text-xs text-red-500 md:col-span-3">{cepError}</div> : null}
              <input placeholder="Rua *" className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent md:col-span-2" value={newTutor.street || ''} onChange={(e) => setNewTutor({ ...newTutor, street: e.target.value })} />
              <input placeholder="Número *" className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" value={newTutor.number || ''} onChange={(e) => setNewTutor({ ...newTutor, number: e.target.value })} />
              <input placeholder="Complemento" className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent md:col-span-2" value={newTutor.complement || ''} onChange={(e) => setNewTutor({ ...newTutor, complement: e.target.value })} />
              <input placeholder="Bairro *" className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" value={newTutor.neighborhood || ''} onChange={(e) => setNewTutor({ ...newTutor, neighborhood: e.target.value })} />
              <input placeholder="Estado (UF) *" className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" value={newTutor.state || ''} onChange={(e) => setNewTutor({ ...newTutor, state: e.target.value })} />
              <input placeholder="Cidade *" className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" value={newTutor.city || ''} onChange={(e) => setNewTutor({ ...newTutor, city: e.target.value })} />
              <textarea placeholder="Observações do tutor" className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent md:col-span-3 min-h-[72px]" value={newTutor.observations || ''} onChange={(e) => setNewTutor({ ...newTutor, observations: e.target.value })} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase">Pacientes do tutor</h3>
              <button type="button" onClick={addDraftPatient} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm">
                <Plus size={14} /> Adicionar paciente
              </button>
            </div>
            <div className="space-y-4 max-h-[340px] overflow-auto pr-1">
              {draftPatients.map((animal, index) => (
                <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-sm">Paciente {index + 1}</p>
                    <button type="button" onClick={() => removeDraftPatient(index)} className="p-1 text-red-500"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input placeholder="Nome *" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" value={animal.name} onChange={(e) => patchDraftPatient(index, 'name', e.target.value)} />
                    <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" value={animal.species} onChange={(e) => patchDraftPatient(index, 'species', e.target.value)}>
                      <option value="Canino">Canino</option>
                      <option value="Felino">Felino</option>
                    </select>
                    <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" value={animal.sex} onChange={(e) => patchDraftPatient(index, 'sex', e.target.value)}>
                      <option value="Macho">Macho</option>
                      <option value="Fêmea">Fêmea</option>
                      <option value="Sem dados">Sem dados</option>
                    </select>
                    <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" value={animal.reproductiveStatus} onChange={(e) => patchDraftPatient(index, 'reproductiveStatus', e.target.value)}>
                      <option value="Castrado">Castrado</option>
                      <option value="Fértil">Fértil</option>
                      <option value="Sem dados">Sem dados</option>
                    </select>
                    <div className="relative">
                      <input
                        list={`breed-list-${index}`}
                        placeholder="Raça (digite a inicial)"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"
                        value={animal.breed}
                        onChange={(e) => patchDraftPatient(index, 'breed', e.target.value)}
                      />
                      <datalist id={`breed-list-${index}`}>
                        {getBreedOptions(animal.species, animal.breed).map((breed) => (
                          <option key={breed} value={breed} />
                        ))}
                      </datalist>
                    </div>
                    <input placeholder="Idade" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" value={animal.ageText} onChange={(e) => patchDraftPatient(index, 'ageText', e.target.value)} />
                    <input placeholder="Pelagem" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" value={animal.coat} onChange={(e) => patchDraftPatient(index, 'coat', e.target.value)} />
                    <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" value={animal.microchip} onChange={(e) => patchDraftPatient(index, 'microchip', e.target.value)}>
                      <option value="false">Microchip: Não</option>
                      <option value="true">Microchip: Sim</option>
                    </select>
                    <input placeholder="Peso atual (kg)" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" value={animal.weightKg} onChange={(e) => patchDraftPatient(index, 'weightKg', e.target.value)} />
                    <textarea placeholder="Anamnese básica" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent md:col-span-3 min-h-[66px]" value={animal.anamnesis} onChange={(e) => patchDraftPatient(index, 'anamnesis', e.target.value)} />
                    <textarea placeholder="Observações do paciente" className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent md:col-span-3 min-h-[66px]" value={animal.notes} onChange={(e) => patchDraftPatient(index, 'notes', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold">Cancelar</button>
            <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold">Salvar Tutor e Pacientes</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

