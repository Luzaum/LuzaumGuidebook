
import { PkPdInfo, ComorbidityState } from '../types';
import { COMORBIDITY_WARNINGS } from '../constants';

export function pkpdForClass(cls: string): PkPdInfo {
  const s = String(cls || '').toLowerCase();
  if (s.includes('β') || s.includes('lactam') || s.includes('cefa') || s.includes('piper') || s.includes('tazo')) return { pd: 'tempo‑dependente', hydro: 'hidrofílico', elim: 'renal', moa: 'Inibe síntese da parede celular (PBPs) → lise bacteriana.' };
  if (s.includes('carbapen')) return { pd: 'tempo‑dependente', hydro: 'hidrofílico', elim: 'renal', moa: 'β‑lactâmico muito estável a β‑lactamases.' };
  if (s.includes('fluoro')) return { pd: 'concentração‑dependente', hydro: 'lipofílico', elim: 'mista', moa: 'Inibe DNA girase/topo IV → bloqueia replicação do DNA.' };
  if (s.includes('lincos')) return { pd: 'bacteriostático/→cida', hydro: 'lipofílico', elim: 'hepática', moa: 'Liga 50S → inibe síntese proteica.' };
  if (s.includes('tetrac')) return { pd: 'bacteriostático', hydro: 'lipofílico', elim: 'hepática/biliar', moa: 'Liga 30S → inibe síntese proteica.' };
  if (s.includes('amino')) return { pd: 'concentração‑dependente', hydro: 'hidrofílico', elim: 'renal', moa: 'Liga 30S → efeito pós‑antibiótico potente contra Gram−.' };
  if (s.includes('nitro') || s.includes('metron')) return { pd: 'concentração‑dependente', hydro: 'lipofílico', elim: 'hepática', moa: 'Radicais livres após redução anaeróbia → quebras de DNA.' };
  if (s.includes('sulfon') || s.includes('sulfa')) return { pd: 'bactericida (sinergismo)', hydro: 'intermediário', elim: 'renal', moa: 'Bloqueio sequencial da via do folato (sulfa + trimetoprim).' };
  if (s.includes('macrol')) return { pd: 'tempo‑dependente', hydro: 'lipofílico', elim: 'hepática', moa: 'Liga 50S → inibe translocação (proteínas).' };
  if (s.includes('anfenicol')) return { pd: 'bacteriostático', hydro: 'lipofílico', elim: 'hepática', moa: 'Liga 50S → inibe peptidil transferase (síntese proteica).' };
  if (s.includes('glicopeptideo')) return { pd: 'concentração‑dependente', hydro: 'hidrofílico', elim: 'renal', moa: 'Inibe síntese da parede celular (liga-se a D-Ala-D-Ala).' };
  if (s.includes('rifamicina')) return { pd: 'concentração‑dependente', hydro: 'lipofílico', elim: 'hepática/biliar', moa: 'Inibe RNA polimerase → bloqueia transcrição.' };
  if (s.includes('fosfonato')) return { pd: 'concentração‑dependente', hydro: 'hidrofílico', elim: 'renal', moa: 'Inibe 1ª etapa da síntese da parede celular (enzima MurA).' };
  if (s.includes('imunossupressor')) return { pd: '—', hydro: '—', elim: '—', moa: 'Imunossupressor - não é antibiótico.' };
  return { pd: '—', hydro: '—', elim: '—', moa: '—' };
}

export function subclassFor(drugName: string, cls: string): string {
  const n = (drugName || '').toLowerCase();
  const lowerCls = (cls || '').toLowerCase();

  if (lowerCls.includes('carbapen')) return 'carbapenemico';
  if (lowerCls.includes('fluoro')) return 'fluoro';
  if (lowerCls.includes('lincos')) return 'lincosamida';
  if (lowerCls.includes('tetrac')) return 'tetraciclina';
  if (lowerCls.includes('amino')) return 'aminoglico';
  if (lowerCls.includes('nitro')) return 'nitro';
  if (lowerCls.includes('sulfon')) return 'sulfa';
  if (lowerCls.includes('macrol')) return 'macrolideo';
  if (lowerCls.includes('anfenicol')) return 'anfenicol';
  if (lowerCls.includes('glicopeptideo')) return 'glicopeptideo';
  if (lowerCls.includes('rifamicina')) return 'rifamicina';
  if (lowerCls.includes('fosfonato')) return 'fosfonato';
  if (lowerCls.includes('imunossupressor')) return 'imunossupressor';
  if (lowerCls.includes('β')) {
    if (n.startsWith('cef') || n.includes('podox')) return 'cefalosporina';
    return 'penicilina';
  }
  return 'penicilina'; // Default
}

export const getComorbidityWarnings = (subclass: string, comorbidities: ComorbidityState): string[] => {
  const warnings: string[] = [];
  const activeComorbs = Object.entries(comorbidities)
    .filter(([, isActive]) => isActive)
    .map(([comorb]) => comorb as keyof ComorbidityState);

  for (const comorb of activeComorbs) {
    const warningText = COMORBIDITY_WARNINGS[comorb]?.[subclass];
    if (warningText) {
      warnings.push(warningText);
    }
  }
  return warnings;
};
