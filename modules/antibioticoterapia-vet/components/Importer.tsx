import React, { useState } from 'react';
import { parseCSV } from '../utils/csvParser';
import { AntibioticClass, DiseaseSystem } from '../types';

interface ImporterProps {
  onMergeAB: (data: AntibioticClass) => void;
  onMergeDZ: (data: DiseaseSystem) => void;
}

const Importer: React.FC<ImporterProps> = ({ onMergeAB, onMergeDZ }) => {
  const [msg, setMsg] = useState("");

  const handleAB = async (file: File) => {
    try {
      const txt = await file.text();
      const rows = parseCSV(txt);
      if (rows.length < 2) { setMsg('Arquivo de antibióticos vazio ou inválido.'); return; }
      
      const header = rows.shift()!.map((h) => String(h || '').trim().toLowerCase());
      const idx = (list: string[]) => list.map(n => header.indexOf(n)).find(i => i !== -1) ?? -1;

      const nameI = idx(['antibiotico', 'antibiótico', 'nome', 'drug']);
      const classI = idx(['classe', 'class']);
      const doseDogI = idx(['dose_caes', 'dose_cães', 'dose_dog', 'dose cães', 'dose (caes)']);
      const doseCatI = idx(['dose_gatos', 'dose_cat', 'dose gatos', 'dose (gatos)']);
      const specI = idx(['espectro', 'spectrum']);
      const indI = idx(['indicacoes', 'indicações', 'indication']);
      const cautI = idx(['cautelas', 'precaucoes', 'precauções', 'contraindicacoes', 'contraindicações']);

      if (nameI === -1) { setMsg('Coluna de nome do antibiótico não encontrada.'); return; }

      const grouped: AntibioticClass = {};
      for (const r of rows) {
        const name = r[nameI]?.trim();
        if (!name) continue;
        const cls = r[classI]?.trim() || 'Outros';
        const obj = { name, dose_dog: r[doseDogI] || '', dose_cat: r[doseCatI] || '', spectrum: r[specI] || '', indications: r[indI] || '', cautions: r[cautI] || '' };
        grouped[cls] = grouped[cls] || [];
        grouped[cls].push(obj);
      }
      onMergeAB(grouped);
      setMsg(`Antibióticos importados: ${Object.values(grouped).flat().length}`);
    } catch (error) {
      setMsg('Falha ao processar o arquivo de antibióticos.');
      console.error(error);
    }
  };

  const handleDZ = async (file: File) => {
    try {
      const txt = await file.text();
      const rows = parseCSV(txt);
      if (rows.length < 2) { setMsg('Arquivo de doenças vazio ou inválido.'); return; }

      const header = rows.shift()!.map((h) => String(h || '').trim().toLowerCase());
      const idx = (list: string[]) => list.map(n => header.indexOf(n)).find(i => i !== -1) ?? -1;

      const sysI = idx(['sistema', 'sistema/área', 'area']);
      const nameI = idx(['doenca', 'doença', 'condicao', 'condição', 'diagnostico']);
      const pathI = idx(['patogenos', 'patógenos', 'agentes']);
      const firstI = idx(['primeira_linha', '1a linha', 'empirico', 'empírico']);
      const altI = idx(['alternativas', 'escalonamento']);
      const duraI = idx(['duracao', 'duração']);
      const notesI = idx(['notas', 'observacoes', 'observações']);
      
      if (nameI === -1) { setMsg('Coluna de nome da doença não encontrada.'); return; }
      
      const out: DiseaseSystem = {};
      for (const r of rows) {
        const sys = r[sysI]?.trim() || 'Outros';
        const name = r[nameI]?.trim();
        if (!name) continue;
        const first = (r[firstI] || '').split(/;|\||,/).map(s => s.trim()).filter(Boolean);
        const alt = (r[altI] || '').split(/;|\||,/).map(s => s.trim()).filter(Boolean);
        const o = { name, pathogens: r[pathI] || '', first_line: first, alternatives: alt, duration: r[duraI] || '', notes: r[notesI] || '' };
        out[sys] = out[sys] || [];
        out[sys].push(o);
      }
      onMergeDZ(out);
      setMsg(`Doenças importadas: ${Object.values(out).flat().length}`);
    } catch(error) {
      setMsg('Falha ao processar o arquivo de doenças.');
      console.error(error);
    }
  };

  return (
    <div className="abv-panel p-6">
      <h3 className="mb-2 text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
        Importar planilhas (CSV)
      </h3>
      <p className="mb-4 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Selecione seus arquivos CSV. O importador mescla e <b>desduplica</b> com os dados existentes.
      </p>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <label
          className="block cursor-pointer rounded-lg border p-3 transition-colors hover:bg-[color-mix(in_srgb,hsl(var(--foreground))_6%,hsl(var(--card)))]"
          style={{ borderColor: 'hsl(var(--border))' }}
        >
          <div className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Antibióticos
          </div>
          <input
            aria-label="CSV de antibióticos"
            type="file"
            accept=".csv"
            className="mt-2 w-full text-xs file:mr-4 file:rounded-full file:border-0 file:bg-[color-mix(in_srgb,hsl(var(--primary))_12%,hsl(var(--card)))] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[hsl(var(--primary))] hover:file:opacity-90"
            style={{ color: 'hsl(var(--foreground))' }}
            onChange={(e) => e.target.files?.[0] && handleAB(e.target.files[0])}
          />
        </label>
        <label
          className="block cursor-pointer rounded-lg border p-3 transition-colors hover:bg-[color-mix(in_srgb,hsl(var(--foreground))_6%,hsl(var(--card)))]"
          style={{ borderColor: 'hsl(var(--border))' }}
        >
          <div className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Doenças/Condições
          </div>
          <input
            aria-label="CSV de doenças"
            type="file"
            accept=".csv"
            className="mt-2 w-full text-xs file:mr-4 file:rounded-full file:border-0 file:bg-[color-mix(in_srgb,hsl(var(--primary))_12%,hsl(var(--card)))] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[hsl(var(--primary))] hover:file:opacity-90"
            style={{ color: 'hsl(var(--foreground))' }}
            onChange={(e) => e.target.files?.[0] && handleDZ(e.target.files[0])}
          />
        </label>
      </div>
      {msg && (
        <div className="mt-3 text-sm" style={{ color: 'hsl(var(--primary))' }}>
          {msg}
        </div>
      )}
    </div>
  );
};

export default Importer;