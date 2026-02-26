import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { dvPath } from '../DadosVeterinariosModule';

type ConsultationKey =
  | 'clinica_geral'
  | 'dermatologica'
  | 'oftalmologica'
  | 'gastroenterologica'
  | 'neurologica'
  | 'pneumologica'
  | 'nefrologia'
  | 'urologia'
  | 'ortopedica'
  | 'oncologica';

const CONSULTATION_LABEL: Record<ConsultationKey, string> = {
  clinica_geral: 'Consulta Clínica Geral',
  dermatologica: 'Consulta Dermatológica',
  oftalmologica: 'Consulta Oftalmológica',
  gastroenterologica: 'Consulta Gastroenterológica',
  neurologica: 'Consulta Neurológica',
  pneumologica: 'Consulta Pneumológica',
  nefrologia: 'Consulta Nefrológica',
  urologia: 'Consulta Urológica',
  ortopedica: 'Consulta Ortopédica',
  oncologica: 'Consulta Oncológica',
};

const CONSULTATION_TEMPLATES: Record<ConsultationKey, string> = {
  clinica_geral: `1. Queixa principal:\n2. Histórico clínico recente:\n3. Exame físico geral:\n4. Hipóteses diagnósticas:\n5. Conduta inicial:\n6. Exames complementares solicitados:\n7. Orientações ao tutor:\n8. Retorno:` ,
  dermatologica: `1. Queixa dermatológica:\n2. Tempo de evolução:\n3. Prurido (escala):\n4. Topografia das lesões:\n5. Exames dermatológicos (raspado/citologia/lâmpada de Wood):\n6. Diagnóstico presuntivo:\n7. Terapêutica proposta:\n8. Controle/retorno:`,
  oftalmologica: `1. Queixa oftalmológica:\n2. Olho acometido:\n3. Avaliação de reflexos pupilares:\n4. Teste de Schirmer:\n5. Fluoresceína:\n6. Tonometria:\n7. Diagnóstico presuntivo:\n8. Conduta/retorno:`,
  gastroenterologica: `1. Queixa gastrointestinal:\n2. Vômito/diarreia (frequência e aspecto):\n3. Apetite e ingestão hídrica:\n4. Dor abdominal à palpação:\n5. Exames solicitados:\n6. Diagnóstico presuntivo:\n7. Protocolo terapêutico:\n8. Orientações dietéticas e retorno:`,
  neurologica: `1. Queixa neurológica:\n2. Estado mental e comportamento:\n3. Marcha e propriocepção:\n4. Pares cranianos:\n5. Dor espinhal:\n6. Localização neuroanatômica:\n7. Diagnóstico presuntivo:\n8. Conduta e acompanhamento:`,
  pneumologica: `1. Queixa respiratória:\n2. Padrão respiratório:\n3. Ausculta torácica:\n4. Saturação/oxigenação:\n5. Exames de imagem/lab:\n6. Diagnóstico presuntivo:\n7. Terapia indicada:\n8. Reavaliação:`,
  nefrologia: `1. Queixa renal:\n2. Ingestão hídrica e diurese:\n3. Pressão arterial:\n4. Perfil renal/laboratorial:\n5. Urinálise:\n6. Diagnóstico presuntivo:\n7. Plano terapêutico:\n8. Controle seriado:`,
  urologia: `1. Queixa urinária:\n2. Disúria/hematúria/polaquiúria:\n3. Palpação abdominal e vesical:\n4. Exames (urina/cultura/imagem):\n5. Diagnóstico presuntivo:\n6. Conduta medicamentosa:\n7. Procedimentos indicados:\n8. Retorno:`,
  ortopedica: `1. Queixa ortopédica:\n2. Membro/segmento acometido:\n3. Avaliação de dor e claudicação:\n4. Exame locomotor:\n5. Exames de imagem solicitados:\n6. Diagnóstico presuntivo:\n7. Plano terapêutico (clínico/cirúrgico):\n8. Reabilitação e retorno:`,
  oncologica: `1. Queixa oncológica:\n2. Histórico de massa/tumor:\n3. Estadiamento clínico:\n4. Exames complementares:\n5. Diagnóstico citológico/histopatológico:\n6. Prognóstico:\n7. Plano terapêutico:\n8. Seguimento e qualidade de vida:`,
};

const PRESCRIPTION_TEMPLATES: Record<ConsultationKey, string> = {
  clinica_geral: `- Analgésico anti-inflamatório\n- Protetor gástrico\n- Probiótico\n- Reavaliação em 48-72h`,
  dermatologica: `- Shampoo terapêutico\n- Antipruriginoso\n- Antibiótico tópico/sistêmico (se indicado)\n- Controle em 7 dias`,
  oftalmologica: `- Colírio lubrificante\n- Colírio antibiótico\n- Colírio anti-inflamatório\n- Reavaliação em 5 dias`,
  gastroenterologica: `- Antiemético\n- Gastroprotetor\n- Dieta gastrointestinal\n- Fluidoterapia conforme avaliação`,
  neurologica: `- Analgesia multimodal\n- Protetor neural\n- Controle de convulsão (se aplicável)\n- Encaminhamento para imagem avançada`,
  pneumologica: `- Broncodilatador\n- Nebulização\n- Antibiótico (se indicado)\n- Oxigenoterapia (se necessário)`,
  nefrologia: `- Renoprotetor\n- Controle de fósforo\n- Dieta renal\n- Hidratação orientada`,
  urologia: `- Antiespasmódico\n- Analgésico urinário\n- Antibiótico conforme cultura\n- Aumentar oferta hídrica`,
  ortopedica: `- Analgésico\n- Anti-inflamatório\n- Condroprotetor\n- Restrição de atividade`,
  oncologica: `- Manejo de dor\n- Antiemético\n- Suporte nutricional\n- Protocolo oncológico conforme estadiamento`,
};

export const ConsultationTemplatesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, getTutorName, updatePatient } = useData();
  const { currentUser } = useClinicAuth();

  const patient = useMemo(() => patients.find((p) => p.id === id), [patients, id]);
  const [consultationType, setConsultationType] = useState<ConsultationKey>('clinica_geral');
  const [consultationText, setConsultationText] = useState<string>(CONSULTATION_TEMPLATES.clinica_geral);
  const [prescriptionText, setPrescriptionText] = useState<string>(PRESCRIPTION_TEMPLATES.clinica_geral);

  if (!patient) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
        <p className="text-gray-600 dark:text-gray-300">Paciente não encontrado.</p>
      </div>
    );
  }

  const handleTypeChange = (value: ConsultationKey) => {
    setConsultationType(value);
    setConsultationText(CONSULTATION_TEMPLATES[value]);
    setPrescriptionText(PRESCRIPTION_TEMPLATES[value]);
  };

  const handleSave = () => {
    const nextAnamnesis = [
      {
        id: Math.random().toString(36).slice(2, 9),
        date: new Date(),
        complaint: CONSULTATION_LABEL[consultationType],
        history: consultationText,
        diagnosis: 'Preencher diagnóstico final',
        treatment: prescriptionText,
      },
      ...(patient.anamnesis || []),
    ];

    updatePatient(patient.id, { anamnesis: nextAnamnesis });
    navigate(dvPath(`patients/${patient.id}`));
  };

  return (
    <div className="space-y-6">
      <header className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <button onClick={() => navigate(dvPath(`patients/${patient.id}`))} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-3">
          <ArrowLeft size={16} /> Voltar para paciente
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nova Consulta com Templates</h1>
        <p className="text-sm text-gray-500 mt-1">Paciente: {patient.name} | Tutor: {getTutorName(patient.tutorId)} | Veterinário: {currentUser.name}</p>
      </header>

      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de consulta</label>
            <select value={consultationType} onChange={(e) => handleTypeChange(e.target.value as ConsultationKey)} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent">
              {Object.entries(CONSULTATION_LABEL).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Template de receita base</label>
            <input value={CONSULTATION_LABEL[consultationType]} readOnly className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Consulta (texto clínico)</label>
          <textarea value={consultationText} onChange={(e) => setConsultationText(e.target.value)} className="mt-1 w-full min-h-[330px] px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Template de receita</label>
          <textarea value={prescriptionText} onChange={(e) => setPrescriptionText(e.target.value)} className="mt-1 w-full min-h-[180px] px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent" />
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold">
            <Save size={16} /> Salvar consulta
          </button>
        </div>
      </section>
    </div>
  );
};
