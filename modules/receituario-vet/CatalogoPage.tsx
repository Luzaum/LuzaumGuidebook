import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { CatalogDrug, CatalogPresentation, createEmptyDrug, loadRxDb, removeDrug, saveRxDb, upsertDrug } from './rxDb'
import { CONCENTRATION_PER_UNIT_OPTIONS, CONCENTRATION_VALUE_UNIT_OPTIONS } from './rxConcentration'
import { RouteGroup } from './rxTypes'

const ROUTE_OPTIONS: RouteGroup[] = [
  'ORAL',
  'OTOLOGICO',
  'OFTALMICO',
  'TOPICO',
  'INTRANASAL',
  'RETAL',
  'SC',
  'IM',
  'IV',
  'INALATORIO',
  'TRANSDERMICO',
  'OUTROS',
]

const SPECIES_TARGET_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'Caes', label: 'Cão' },
  { value: 'Gatos', label: 'Gato' },
]

const PRESENTATION_TYPE_OPTIONS = ['Comprimido', 'Cápsula', 'Solução oral', 'Suspensão oral', 'Gotas', 'Injetável', 'Ampola', 'Pomada', 'Spray']


function cloneDrug(drug: CatalogDrug): CatalogDrug {
  const next = JSON.parse(JSON.stringify(drug)) as CatalogDrug
  next.presentations = next.presentations.map((presentation) => {
    // Garantir client_id
    const client_id = presentation.client_id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

    // Se já tem os campos do novo schema, retornar direto
    if (presentation.pharmaceutical_form !== undefined) {
      return { ...presentation, client_id };
    }

    // Migração do schema antigo (localStorage) para novo schema (Supabase)
    const migrated: CatalogPresentation = {
      ...presentation,
      client_id,
      pharmaceutical_form: presentation.name || 'Comprimido',
      commercial_name: presentation.commercial_name || '',
      value: presentation.concentrationValue ? Number(presentation.concentrationValue) : null,
      value_unit: presentation.concentrationUnit || 'mg',
      per_value: presentation.concentrationPerValue ? Number(presentation.concentrationPerValue) : 1,
      per_unit: presentation.concentrationPerUnit || presentation.unitLabel || 'comprimido',
      avg_price_brl: presentation.averagePrice ? Number(String(presentation.averagePrice).replace(/[^\d.-]/g, '')) : null,
      pharmacy_veterinary: presentation.pharmacyTags?.includes('veterinária') || false,
      pharmacy_human: presentation.pharmacyTags?.includes('humana') || false,
      pharmacy_compounding: presentation.pharmacyTags?.includes('manipulacao') || false,
    };

    return migrated;
  })
  return next
}

function createPresentation(): CatalogPresentation {
  return {
    client_id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    id: undefined,
    pharmaceutical_form: 'Comprimido',
    commercial_name: '',
    value: null,
    value_unit: 'mg',
    per_value: 1,
    per_unit: 'comprimido',
    avg_price_brl: null,
    pharmacy_veterinary: true,
    pharmacy_human: false,
    pharmacy_compounding: false,
  }
}

export default function CatalogoPage() {
    const updatePresentationById = (
      client_id: string,
      patch: Partial<CatalogPresentation>
    ) => {
      setDraft((prev) => ({
        ...prev,
        presentations: prev.presentations.map((entry) => {
          if (entry.client_id !== client_id) return entry;
          return { ...entry, ...patch };
        }),
      }));
    };
  const location = useLocation()
  const initialDb = useMemo(() => loadRxDb(), [])
  const requestedDrugId = useMemo(() => new URLSearchParams(location.search).get('drug') || '', [location.search])

  const [catalog, setCatalog] = useState<CatalogDrug[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [draft, setDraft] = useState<CatalogDrug>(createEmptyDrug())
  const [saved, setSaved] = useState(false)

  // PASSO 1 - PROVA DE MOUNT
  useEffect(() => {
    console.log('[CatalogoPage] MOUNTED ✅', new Date().toISOString())
  }, [])

  // Carregar medicamentos do Supabase ao montar
  useEffect(() => {
    loadMedicationsFromSupabase()
  }, [])

  async function loadMedicationsFromSupabase() {
    try {
      console.log('[Catalog] Loading medications from Supabase...')
      setLoading(true)

      const rawUser = localStorage.getItem('luzaum-user')
      const user = rawUser ? JSON.parse(rawUser) : null
      const rawClinic = localStorage.getItem('luzaum-active-clinic')
      const clinic = rawClinic ? JSON.parse(rawClinic) : null
      const clinicId = clinic?.id

      if (!clinicId) {
        console.warn('[Catalog] No clinic ID, using localStorage fallback')
        setCatalog(initialDb.catalog)
        setLoading(false)
        return
      }

      const { listMedications, getMedicationPresentations } = await import('../../src/lib/clinicRecords')
      const medications = await listMedications(clinicId)

      console.log('[Catalog] Loaded medications from Supabase:', medications.length)

      // Converter medications do Supabase para CatalogDrug
      const catalogDrugs: CatalogDrug[] = await Promise.all(
        medications.map(async (med) => {
          const presentations = await getMedicationPresentations(clinicId, med.id)

          return {
            id: med.id,
            name: med.name,
            speciesTargets: Array.isArray(med.species) ? med.species : [],
            controlled: med.is_controlled || false,
            pharmacyType: 'veterinária',
            routeGroup: 'ORAL',
            doseUnit: 'mg/kg',
            notes: med.notes || '',
            updatedAt: med.created_at,
            presentations: presentations.map((p) => ({
              id: p.id,
              client_id: crypto.randomUUID(),
              pharmaceutical_form: p.pharmaceutical_form || 'Comprimido',
              commercial_name: p.commercial_name || '',
              value: p.value,
              value_unit: p.value_unit || 'mg',
              per_value: p.per_value ?? 1,
              per_unit: p.per_unit || 'comprimido',
              avg_price_brl: p.avg_price_brl,
              pharmacy_veterinary: p.pharmacy_veterinary || false,
              pharmacy_human: p.pharmacy_human || false,
              pharmacy_compounding: p.pharmacy_compounding || false,
            })),
          }
        })
      )

      setCatalog(catalogDrugs)

      // Selecionar drug se requestedDrugId existe
      if (requestedDrugId) {
        const found = catalogDrugs.find(d => d.id === requestedDrugId)
        if (found) {
          setSelectedId(found.id)
          setDraft(cloneDrug(found))
        }
      } else if (catalogDrugs.length > 0) {
        setSelectedId(catalogDrugs[0].id)
        setDraft(cloneDrug(catalogDrugs[0]))
      }

      setLoading(false)
    } catch (error) {
      console.error('[Catalog] Error loading from Supabase:', error)
      // Fallback para localStorage
      setCatalog(initialDb.catalog)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!requestedDrugId) return
    const selectedDrug = catalog.find((entry) => entry.id === requestedDrugId)
    if (!selectedDrug || selectedDrug.id === selectedId) return
    setSelectedId(selectedDrug.id)
    setDraft(cloneDrug(selectedDrug))
  }, [catalog, requestedDrugId, selectedId])

  const selectDrug = (drug: CatalogDrug) => {
    setSelectedId(drug.id)
    setDraft(cloneDrug(drug))
  }

  const onNew = () => {
    const empty = createEmptyDrug()
    setSelectedId(empty.id)
    setDraft(empty)
  }

  const onSave = async () => {
    alert('SAVE CLICKED - CatalogoPage');
    console.log('SAVE CLICKED - CatalogoPage', new Date().toISOString());
    console.log('[Catalog] ========== SAVE CLICKED ==========');
    console.log('[Catalog] draft:', JSON.stringify(draft, null, 2));

    // Validação: nome do fármaco obrigatório
    if (!draft.name?.trim()) {
      console.error('[Catalog] SAVE BLOCKED: nome do fármaco vazio');
      alert('Por favor, preencha o nome do fármaco.');
      return;
    }

    // Validação: pelo menos uma apresentação
    const presentations = draft.presentations.length ? draft.presentations : [createPresentation()];

    // Validação: cada apresentação deve ter pelo menos uma farmácia selecionada
    const invalidPresentations = presentations.filter(p =>
      !p.pharmacy_veterinary && !p.pharmacy_human && !p.pharmacy_compounding
    );
    if (invalidPresentations.length > 0) {
      console.error('[Catalog] SAVE BLOCKED: apresentações sem farmácia selecionada', invalidPresentations);
      alert('Cada apresentação deve ter pelo menos um tipo de farmácia selecionado.');
      return;
    }

    // Normalizar apresentações para o schema do Supabase
    const normalizedPresentations = presentations.map((p) => {
      // Converter avg_price_brl de string para número se necessário
      let avg_price_brl = p.avg_price_brl;
      if (typeof avg_price_brl === 'string') {
        const raw = String(avg_price_brl).replace(/R\$|\s|\./g, '').replace(',', '.');
        const num = Number(raw);
        avg_price_brl = Number.isFinite(num) ? num : null;
      }

      return {
        pharmaceutical_form: p.pharmaceutical_form || 'Comprimido',
        commercial_name: p.commercial_name || null,
        value: typeof p.value === 'number' ? p.value : (p.value ? Number(p.value) : null),
        value_unit: p.value_unit || 'mg',
        per_value: typeof p.per_value === 'number' ? p.per_value : (p.per_value ? Number(p.per_value) : 1),
        per_unit: p.per_unit || 'comprimido',
        avg_price_brl: typeof avg_price_brl === 'number' ? avg_price_brl : null,
        pharmacy_veterinary: !!p.pharmacy_veterinary,
        pharmacy_human: !!p.pharmacy_human,
        pharmacy_compounding: !!p.pharmacy_compounding,
      };
    });

    // Preparar payload do medicamento
    const medicationPayload = {
      id: draft.id,
      name: draft.name.trim(),
      notes: draft.notes || null,
      is_controlled: draft.controlled || false,
    };

    try {
      // Obter clinicId e userId
      const rawUser = localStorage.getItem('luzaum-user');
      const user = rawUser ? JSON.parse(rawUser) : null;
      const userId = user?.id;
      const rawClinic = localStorage.getItem('luzaum-active-clinic');
      const clinic = rawClinic ? JSON.parse(rawClinic) : null;
      const clinicId = clinic?.id;

      console.log('[Catalog] ========== STEP 1: CONTEXT ==========');
      console.log('[Catalog] clinic/user:', {
        activeClinicId: clinicId,
        userId,
        clinicName: clinic?.name,
        userName: user?.email
      });

      if (!clinicId || !userId) {
        console.error('[Catalog] SAVE BLOCKED: clinicId ou userId ausente', { clinicId, userId });
        alert('Erro: clínica ou usuário não identificado. Faça login novamente.');
        return;
      }

      console.log('[Catalog] ========== STEP 2: PAYLOADS ==========');
      console.log('[Catalog] target tables -> { medicationsTableName: "medications", presentationsTableName: "medication_presentations" }');
      console.log('[Catalog] medication payload ->');
      console.log(medicationPayload);
      console.log('[Catalog] presentations rows ->');
      console.log(normalizedPresentations);

      console.log('[Catalog] ========== STEP 3: CALLING SUPABASE ==========');
      // Importar dinamicamente as funções
      const { saveMedication, getMedicationDetails, getMedicationPresentations } = await import('../../src/lib/clinicRecords');

      console.log('[Catalog] Calling saveMedication with:', {
        clinicId,
        userId,
        medicationId: draft.id.startsWith('drug-') ? undefined : draft.id,
        presentationsCount: normalizedPresentations.length
      });

      const result = await saveMedication({
        clinicId,
        userId,
        medication: medicationPayload,
        medicationId: draft.id.startsWith('drug-') ? undefined : draft.id,
        presentations: normalizedPresentations,
      });

      console.log('[Catalog] ========== STEP 4: SUPABASE RESULTS ==========');
      console.log('[Catalog] result.medication ->');
      console.log(result.medication);
      console.log('[Catalog] result.presentations ->');
      console.log(result.presentations);
      console.log('[Catalog] Saved medication ID:', result.medication.id);

      // PASSO 4 - VERIFICAÇÃO POST-SAVE (SELECT)
      console.log('[Catalog] ========== STEP 5: POST-SAVE VERIFY (SELECT) ==========');
      console.log('[Catalog] Fetching medication by ID:', result.medication.id);
      const verifyMed = await getMedicationDetails(clinicId, result.medication.id);
      const verifyPres = await getMedicationPresentations(clinicId, result.medication.id);

      console.log('[Catalog] POST-SAVE VERIFY ->');
      console.log('  med:', verifyMed);
      console.log('  presentations:', verifyPres);

      if (!verifyMed) {
        console.error('[Catalog] ⚠️ POST-SAVE VERIFY FAILED: medication NOT FOUND in SELECT!');
        console.error('[Catalog] This likely means RLS blocked the SELECT or the INSERT failed silently');
      } else {
        console.log('[Catalog] ✅ POST-SAVE VERIFY SUCCESS: medication found in database');
      }

      if (!verifyMed) {
        console.error('[Catalog] POST-SAVE VERIFY FAILED: medication not found in database!');
        alert('AVISO: Medicamento não foi encontrado no banco após save. Verifique RLS policies.');
      }

      // Recarregar lista do Supabase
      await loadMedicationsFromSupabase();

      // Selecionar o drug salvo
      setSelectedId(result.medication.id);
      const savedDrug = catalog.find(d => d.id === result.medication.id);
      if (savedDrug) {
        setDraft(cloneDrug(savedDrug));
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      console.log('[Catalog] SAVE SUCCESS - medication ID:', result.medication.id);
    } catch (error: any) {
      console.error('[Catalog] ========== ❌ SAVE ERROR ❌ ==========');
      console.error('[Catalog] Full error object:', error);
      console.error('[Catalog] Error type:', typeof error);
      console.error('[Catalog] Error constructor:', error?.constructor?.name);

      // Logar todos os campos possíveis do erro
      const errorDetails = {
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code,
        status: error?.status,
        statusCode: error?.statusCode,
        statusText: error?.statusText,
        name: error?.name,
        stack: error?.stack
      };

      console.error('[Catalog] Error details breakdown:');
      Object.entries(errorDetails).forEach(([key, value]) => {
        if (value !== undefined) {
          console.error(`  ${key}:`, value);
        }
      });

      // Verificar se é erro de RLS
      const isRLSError =
        error?.code === '42501' ||
        error?.code === 'PGRST301' ||
        error?.message?.toLowerCase().includes('row-level security') ||
        error?.message?.toLowerCase().includes('permission denied') ||
        error?.hint?.toLowerCase().includes('policy');

      if (isRLSError) {
        console.error('[Catalog] ⚠️ DETECTED: RLS/Permission Error');
        alert('❌ ERRO DE PERMISSÃO (RLS)\n\nO medicamento não pode ser salvo porque as políticas de segurança do banco bloquearam a operação.\n\nVerifique:\n1. Você está logado?\n2. Você é membro da clínica ativa?\n3. As RLS policies da tabela medications permitem INSERT?');
      } else {
        alert(`Erro ao salvar: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }

  const onDelete = () => {
    const nextDb = removeDrug(loadRxDb(), draft.id)
    saveRxDb(nextDb)
    setCatalog(nextDb.catalog)
    if (nextDb.catalog.length > 0) {
      setSelectedId(nextDb.catalog[0].id)
      setDraft(cloneDrug(nextDb.catalog[0]))
      return
    }
    const empty = createEmptyDrug()
    setSelectedId(empty.id)
    setDraft(empty)
  }


  return (
    <>
      {/* WATERMARK DEBUG */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(255, 0, 0, 0.9)',
        color: 'white',
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: 99999,
        borderRadius: '6px',
        pointerEvents: 'none',
        border: '2px solid white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
      }}>
        CatalogoPage BUILD: 2026-02-23 B
      </div>

      <ReceituarioChrome
        section="catalogo"
        title="Catálogo de Fármacos"
        subtitle="Banco persistente, editável e reutilizável no modal de nova receita."
        actions={
        <>
          <Link to="/receituario-vet/nova-receita" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm">
            <span className="material-symbols-outlined text-[18px]">description</span>
            Nova Receita
          </Link>
          <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={onNew}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Novo Fármaco
          </button>
          <button type="button" className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={onSave}>
            <span className="material-symbols-outlined text-[18px]">save</span>
            Salvar Alterações
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <aside className="rxv-card p-4 xl:col-span-3">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[color:var(--rxv-muted)]">Fármacos cadastrados</h3>
          <div className="max-h-[72vh] space-y-2 overflow-y-auto pr-1">
            {loading ? (
              <div className="flex items-center justify-center py-8 text-sm text-[color:var(--rxv-muted)]">
                <span>Carregando...</span>
              </div>
            ) : catalog.length === 0 ? (
              <div className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60 px-3 py-4 text-center text-xs text-[color:var(--rxv-muted)]">
                Nenhum medicamento cadastrado. Clique em "Novo Fármaco" para começar.
              </div>
            ) : (
              catalog.map((drug) => (
                <button
                  type="button"
                  key={drug.id}
                  className={`w-full rounded-xl border px-3 py-2 text-left ${
                    selectedId === drug.id
                      ? 'border-[#61eb48]/45 bg-[#61eb48]/10'
                      : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60'
                  }`}
                  onClick={() => selectDrug(drug)}
                >
                  <p className="text-sm font-semibold">{drug.name || 'Novo fármaco'}</p>
                  <p className="text-xs text-[color:var(--rxv-muted)]">{drug.presentations.length} apresentações</p>
                </button>
              ))
            )}
          </div>
        </aside>

        <main className="space-y-6 xl:col-span-9">
          <section className="rxv-card p-5">
            <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Informações Gerais</h2>
              <button type="button" className="rxv-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs text-red-300 hover:text-red-200" onClick={onDelete}>
                <span className="material-symbols-outlined text-[16px]">delete</span>
                Excluir
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="text-sm md:col-span-2">
                Nome do fármaco
                <input className="mt-1 w-full px-3 py-2" value={draft.name} onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))} />
              </label>
              <div className="rounded-lg border border-[color:var(--rxv-border)]/70 bg-[color:var(--rxv-surface-2)]/60 p-3 text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                O tipo de farmácia agora é definido por apresentação comercial (abaixo). Isso permite múltiplas opções no mesmo fármaco.
              </div>
              <label className="text-sm">
                Via principal
                <select className="mt-1 w-full px-3 py-2" value={draft.routeGroup} onChange={(e) => setDraft((prev) => ({ ...prev, routeGroup: e.target.value as RouteGroup }))}>
                  {ROUTE_OPTIONS.map((route) => (
                    <option key={route} value={route}>
                      {route}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Unidade de dose padrão
                <input
                  list="rx-dose-unit-options"
                  className="mt-1 w-full px-3 py-2"
                  value={draft.doseUnit}
                  onChange={(e) => setDraft((prev) => ({ ...prev, doseUnit: e.target.value }))}
                />
                <datalist id="rx-dose-unit-options">
                  {['mg/kg', 'mcg/kg', 'g/kg', 'mL/kg', 'UI/kg', 'comprimido/kg', 'gota/kg', 'mg', 'mL', 'comprimido', 'gota', 'cápsula'].map((unit) => (
                    <option key={unit} value={unit} />
                  ))}
                </datalist>
              </label>
              <div className="text-sm md:col-span-2">
                <p className="mb-1">Espécies alvo</p>
                <div className="flex flex-wrap gap-2">
                  {SPECIES_TARGET_OPTIONS.map((option) => {
                    const checked = draft.speciesTargets.includes(option.value)
                    return (
                      <label
                        key={option.value}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
                          checked
                            ? 'border-[#61eb48]/45 bg-[#61eb48]/12 text-[#c8ffc0]'
                            : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 text-[color:var(--rxv-muted)]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5"
                          checked={checked}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              speciesTargets: e.target.checked
                                ? Array.from(new Set([...prev.speciesTargets, option.value]))
                                : prev.speciesTargets.filter((entry) => entry !== option.value),
                            }))
                          }
                        />
                        {option.label}
                      </label>
                    )
                  })}
                </div>
              </div>
              <label className="inline-flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" className="h-4 w-4" checked={draft.controlled} onChange={(e) => setDraft((prev) => ({ ...prev, controlled: e.target.checked }))} />
                Medicamento controlado
              </label>
              <label className="text-sm md:col-span-2">
                Notas internas
                <textarea className="mt-1 w-full px-3 py-2" rows={3} value={draft.notes} onChange={(e) => setDraft((prev) => ({ ...prev, notes: e.target.value }))} />
              </label>
            </div>
          </section>

          <section className="rxv-card p-5">
            <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Apresentações</h2>
              <button
                type="button"
                className="rxv-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs"
                onClick={() => setDraft((prev) => ({ ...prev, presentations: [...prev.presentations, createPresentation()] }))}
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Nova apresentação
              </button>
            </div>
            <div className="space-y-3">
              {draft.presentations.map((presentation) => (
                <div key={presentation.client_id} className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60 p-3">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                    <label className="text-xs md:col-span-3">
                      Forma farmacêutica
                      <select
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.pharmaceutical_form || 'Comprimido'}
                        onChange={(e) => updatePresentationById(presentation.client_id!, { pharmaceutical_form: e.target.value })}
                      >
                        {PRESENTATION_TYPE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs md:col-span-3">
                      Nome comercial
                      <input
                        className="mt-1 w-full px-3 py-2"
                        placeholder="Ex.: Rimadyl"
                        value={presentation.commercial_name || ''}
                        onChange={(e) => updatePresentationById(presentation.client_id!, { commercial_name: e.target.value })}
                      />
                    </label>
                    <label className="text-xs md:col-span-2">
                      Valor
                      <input
                        type="number"
                        step="0.01"
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.value ?? ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : Number(e.target.value);
                          updatePresentationById(presentation.client_id!, { value: val });
                        }}
                        placeholder="Ex.: 250"
                      />
                    </label>
                    <label className="text-xs md:col-span-2">
                      Unidade do valor
                      <select
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.value_unit || 'mg'}
                        onChange={(e) => updatePresentationById(presentation.client_id!, { value_unit: e.target.value })}
                      >
                        {CONCENTRATION_VALUE_UNIT_OPTIONS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs md:col-span-2">
                      Por valor
                      <input
                        type="number"
                        step="0.01"
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.per_value ?? 1}
                        onChange={(e) => {
                          const val = e.target.value === '' ? 1 : Number(e.target.value);
                          updatePresentationById(presentation.client_id!, { per_value: val });
                        }}
                        placeholder="1"
                      />
                    </label>
                    <label className="text-xs md:col-span-3">
                      Por unidade
                      <select
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.per_unit || 'comprimido'}
                        onChange={(e) => updatePresentationById(presentation.client_id!, { per_unit: e.target.value })}
                      >
                        {CONCENTRATION_PER_UNIT_OPTIONS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs md:col-span-3">
                      Preço médio (opcional)
                      <input
                        type="number"
                        step="0.01"
                        className="mt-1 w-full px-3 py-2"
                        placeholder="Ex.: 79.90"
                        value={presentation.avg_price_brl ?? ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : Number(e.target.value);
                          updatePresentationById(presentation.client_id!, { avg_price_brl: val });
                        }}
                      />
                    </label>
                    <div className="text-xs md:col-span-8">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">Tipos de farmácia desta apresentação</p>
                      <div className="flex flex-wrap gap-2">
                        <label
                          className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${
                            presentation.pharmacy_veterinary
                              ? 'border-[#61eb48]/45 bg-[#61eb48]/12 text-[#c8ffc0]'
                              : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 text-[color:var(--rxv-muted)]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5"
                            checked={!!presentation.pharmacy_veterinary}
                            onChange={(e) => updatePresentationById(presentation.client_id!, { pharmacy_veterinary: e.target.checked })}
                          />
                          Veterinária
                        </label>
                        <label
                          className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${
                            presentation.pharmacy_human
                              ? 'border-[#61eb48]/45 bg-[#61eb48]/12 text-[#c8ffc0]'
                              : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 text-[color:var(--rxv-muted)]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5"
                            checked={!!presentation.pharmacy_human}
                            onChange={(e) => updatePresentationById(presentation.client_id!, { pharmacy_human: e.target.checked })}
                          />
                          Humana
                        </label>
                        <label
                          className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${
                            presentation.pharmacy_compounding
                              ? 'border-[#61eb48]/45 bg-[#61eb48]/12 text-[#c8ffc0]'
                              : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 text-[color:var(--rxv-muted)]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5"
                            checked={!!presentation.pharmacy_compounding}
                            onChange={(e) => updatePresentationById(presentation.client_id!, { pharmacy_compounding: e.target.checked })}
                          />
                          Manipulação
                        </label>
                      </div>
                      <p className="mt-1 text-[11px] text-[color:var(--rxv-muted)]">
                        Na Nova Receita, o usuário poderá escolher apenas entre as farmácias marcadas aqui.
                      </p>
                    </div>
                    <div className="md:col-span-1 md:flex md:items-end md:justify-end">
                      <button
                        type="button"
                        className="rxv-btn-secondary inline-flex items-center gap-1 px-2 py-1 text-xs text-red-300 hover:text-red-200"
                        onClick={() => setDraft((prev) => ({ ...prev, presentations: prev.presentations.filter((entry) => entry.client_id !== presentation.client_id) }))}
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        Del
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {saved ? (
        <div className="fixed bottom-6 right-6 z-[120] rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] px-4 py-3 text-sm font-semibold text-[#67e952]">
          Catálogo salvo com sucesso.
        </div>
      ) : null}
    </ReceituarioChrome>
    </>
  )
}




