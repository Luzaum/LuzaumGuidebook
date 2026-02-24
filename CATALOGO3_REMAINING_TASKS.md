# Catálogo 3.0 - Tarefas Restantes

**Status:** Parcialmente implementado
**Data:** 2026-02-24

---

## ✅ JÁ IMPLEMENTADO

### 1. Normalização de Números ✅
- **Arquivo:** `Catalogo3Page.tsx`
- **Função:** `normalizeNumber(value, allowNull)`
- **Aplicado em:** `value`, `per_value`, `avg_price_brl`, `package_quantity`
- **Resultado:** Números chegam como `number` (não string) no Supabase

### 2. Tabela medication_recommended_doses ✅
- **Migration:** `migrations/create_medication_recommended_doses.sql`
- **Colunas:**
  - `species` (text) - 'cão', 'gato', 'ambos', etc
  - `route` (text) - 'VO', 'IV', 'IM', 'SC', etc
  - `dose_value` (numeric)
  - `dose_unit` (text) - 'mg/kg', 'mL/kg', etc
  - `frequency` (text nullable)
  - `notes` (text nullable)
- **RLS:** Policies completas para SELECT/INSERT/UPDATE/DELETE

### 3. Funções doses em clinicRecords.ts ✅
- ✅ `getMedicationRecommendedDoses(clinicId, medicationId)`
- ✅ `saveMedicationRecommendedDoses(clinicId, medicationId, doses[])`
  - Diff automático: upsert por id + delete removidas
- ✅ `deleteMedication(clinicId, medicationId)`
  - STEP 1: Delete doses
  - STEP 2: Delete presentations
  - STEP 3: Delete medication

### 4. Whitelist Mappers ✅
- ✅ `pickMedicationFields()` - Filtra campos válidos de medications
- ✅ `pickPresentationFields()` - Filtra campos válidos de presentations
- ✅ Aplicados no `handleSave()` do Catalogo3Page

### 5. Correção species_targets → species ✅
- ✅ Whitelist atualizada: `species` e `routes` (não species_targets!)
- ✅ Interface Medication corrigida
- ✅ createEmptyMedication() corrigido
- ✅ loadSelectedItem() corrigido
- ✅ handleSave() corrigido

---

## ⏳ FALTA IMPLEMENTAR

### A) UI - Seção "Doses Indicadas" (ALTA PRIORIDADE)

**Localização:** Catalogo3Page.tsx, dentro do card "Dados do medicamento"

**Estrutura:**
```tsx
<section className="rxv-card p-6 shadow-xl">
  <div className="mb-5 flex items-center justify-between">
    <h3>Doses Indicadas</h3>
    <button onClick={addRecommendedDose}>+ Adicionar dose</button>
  </div>

  {draft.recommended_doses?.map((dose, idx) => (
    <div key={dose.client_id} className="...">
      {/* Linha com campos */}
      <select value={dose.species} onChange={...}>
        <option value="cão">Cão</option>
        <option value="gato">Gato</option>
        <option value="ambos">Ambos</option>
      </select>

      <select value={dose.route} onChange={...}>
        <option value="VO">VO (oral)</option>
        <option value="IV">IV (intravenosa)</option>
        <option value="IM">IM (intramuscular)</option>
        <option value="SC">SC (subcutânea)</option>
        <option value="Tópica">Tópica</option>
        <option value="Ocular">Ocular</option>
        <option value="Otológica">Otológica</option>
        <option value="Inalatória">Inalatória</option>
        <option value="Outras">Outras</option>
      </select>

      <input
        type="number"
        step="0.01"
        value={dose.dose_value}
        onChange={...}
        placeholder="10"
      />

      <input
        type="text"
        value={dose.dose_unit}
        onChange={...}
        placeholder="mg/kg"
      />

      <input
        type="text"
        value={dose.frequency}
        onChange={...}
        placeholder="BID (2x/dia)"
      />

      <input
        type="text"
        value={dose.notes}
        onChange={...}
        placeholder="Observações"
      />

      <button onClick={() => removeDose(dose.client_id)}>🗑️</button>
    </div>
  ))}
</section>
```

**State:**
```typescript
interface MedicationWithPresentations extends Medication {
  presentations: Presentation[]
  recommended_doses?: RecommendedDoseUI[] // ADICIONAR
}

interface RecommendedDoseUI {
  id?: string // se existir no DB
  client_id: string // UUID estável para React keys
  species: string
  route: string
  dose_value: number | null
  dose_unit: string
  frequency: string | null
  notes: string | null
}
```

**Funções:**
```typescript
function addRecommendedDose() {
  const newDose: RecommendedDoseUI = {
    client_id: crypto.randomUUID(),
    species: 'cão',
    route: 'VO',
    dose_value: null,
    dose_unit: 'mg/kg',
    frequency: null,
    notes: null
  }
  setDraft(prev => ({
    ...prev,
    recommended_doses: [...(prev.recommended_doses || []), newDose]
  }))
}

function removeDose(client_id: string) {
  setDraft(prev => ({
    ...prev,
    recommended_doses: prev.recommended_doses?.filter(d => d.client_id !== client_id)
  }))
}

function updateDose(client_id: string, updates: Partial<RecommendedDoseUI>) {
  setDraft(prev => ({
    ...prev,
    recommended_doses: prev.recommended_doses?.map(d =>
      d.client_id === client_id ? { ...d, ...updates } : d
    )
  }))
}
```

**No handleSave():**
```typescript
// Após salvar medication + presentations:
if (draft.recommended_doses && draft.recommended_doses.length > 0) {
  const dosesPayload = draft.recommended_doses.map(d => ({
    id: d.id, // se existir
    species: d.species,
    route: d.route,
    dose_value: normalizeNumber(d.dose_value, false) || 0,
    dose_unit: d.dose_unit,
    frequency: d.frequency,
    notes: d.notes
  }))

  await saveMedicationRecommendedDoses(
    clinicId,
    result.medication.id,
    dosesPayload
  )
  console.log('[Catalogo3] Saved recommended doses')
} else {
  // Se não tem doses, deletar todas do banco
  await saveMedicationRecommendedDoses(clinicId, result.medication.id, [])
  console.log('[Catalogo3] Cleared recommended doses')
}
```

**No loadSelectedItem():**
```typescript
const details = await getMedicationDetails(clinicId, id)
const presentations = await getMedicationPresentations(clinicId, id)
const doses = await getMedicationRecommendedDoses(clinicId, id) // ✨ ADICIONAR

const fullMed: MedicationWithPresentations = {
  ...details,
  presentations: presentations.map(...),
  recommended_doses: doses.map(d => ({ // ✨ ADICIONAR
    id: d.id,
    client_id: d.id || crypto.randomUUID(),
    species: d.species,
    route: d.route,
    dose_value: d.dose_value,
    dose_unit: d.dose_unit,
    frequency: d.frequency,
    notes: d.notes
  }))
}
```

---

### C) Remover "Palatável" (MÉDIA PRIORIDADE)

**Arquivo:** Catalogo3Page.tsx

**Remover da UI:**
- Localizar checkbox/toggle de "Palatável" nas apresentações
- Remover elemento JSX completo
- Remover do createEmptyPresentation():
  ```typescript
  // REMOVER:
  palatable: false,
  ```

**Remover do handleSave():**
```typescript
// Linha ~423
metadata: {
  manufacturer: p.metadata?.manufacturer || '',
  package_quantity: normalizeNumber(p.metadata?.package_quantity, true),
  package_unit: p.metadata?.package_unit,
  administration_routes: p.metadata?.administration_routes || [],
  // palatable: !!p.metadata?.palatable, // ❌ REMOVER ESTA LINHA
  obs: p.metadata?.obs
}
```

---

### D) Botão "Excluir" Medicamento (ALTA PRIORIDADE)

**Localização:** Header do Catalogo3Page (ao lado de "Salvar")

**UI:**
```tsx
{selectedId && (
  <button
    type="button"
    className="rxv-btn-danger inline-flex items-center gap-2 px-3 py-2 text-sm"
    onClick={handleDelete}
    disabled={isSaving}
  >
    <span className="material-symbols-outlined text-[18px]">delete</span>
    Excluir
  </button>
)}
```

**State:**
```typescript
const [showDeleteModal, setShowDeleteModal] = useState(false)
```

**Função:**
```typescript
async function handleDelete() {
  // Verificar se tem apresentações
  const presCount = draft.presentations.length
  if (presCount > 1) {
    setShowDeleteModal(true)
    return
  }

  // Só 1 apresentação, confirmar diretamente
  if (!confirm(`Excluir medicamento "${draft.name}"?`)) return

  await executeDelete()
}

async function executeDelete() {
  try {
    setIsSaving(true)
    if (!clinicId || !selectedId) throw new Error('Contexto inválido')

    console.log('[Catalogo3] ========== DELETE ==========')
    console.log('[Catalogo3] Deleting medication:', selectedId)

    await deleteMedication(clinicId, selectedId)

    console.log('[Catalogo3] ✅ DELETE SUCCESS')

    // Toast + reload
    setSuccessToast(true)
    setTimeout(() => setSuccessToast(false), 3000)

    loadMedicationsList()
    setDraft(createEmptyMedication())
    setSelectedId(null)
    setShowDeleteModal(false)
    setIsSaving(false)
  } catch (error: any) {
    console.error('[Catalogo3] ========== DELETE ERROR ==========')
    console.error('[Catalogo3] Error:', error)
    alert('Erro ao excluir: ' + (error?.message || String(error)))
    setIsSaving(false)
  }
}
```

**Modal:**
```tsx
{showDeleteModal && (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60">
    <div className="mx-4 w-full max-w-md rounded-2xl border border-red-500/40 bg-[color:var(--rxv-surface)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-4xl text-red-400">warning</span>
        <h3 className="text-lg font-bold">Excluir medicamento?</h3>
      </div>
      <p className="mb-2 text-sm">
        Medicamento: <strong>{draft.name}</strong>
      </p>
      <p className="mb-6 text-sm text-[color:var(--rxv-muted)]">
        Possui {draft.presentations.length} apresentações. Esta ação não pode ser desfeita.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          className="rxv-btn-secondary flex-1"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold"
          onClick={executeDelete}
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
)}
```

---

### E) Limpeza e Validações (MÉDIA PRIORIDADE)

#### E.1) Remover Catálogo v1 e v2 do menu

**Arquivo:** `ReceituarioChrome.tsx`

**Comentar/remover linhas:**
```typescript
const NAV_ITEMS = [
  // { key: 'catalogo', label: 'Catálogo', to: '/receituario-vet/catalogo', icon: 'content_paste' }, // ❌ COMENTAR
  // { key: 'catalogo2', label: '🔥 Catálogo 2.0', to: '/receituario-vet/catalogo2', icon: 'inventory' }, // ❌ COMENTAR
  { key: 'catalogo3', label: '🚀 Catálogo 3.0', to: '/receituario-vet/catalogo3', icon: 'rocket_launch' }, // ✅ MANTER
]
```

#### E.2) Toast em early returns

**Arquivo:** Catalogo3Page.tsx, função `handleSave()`

**Adicionar toast antes de cada `return false`:**
```typescript
if (!validate()) {
  showValidationWarning('Erro de Validação', 'Corrija os campos marcados.') // ✅ JÁ TEM
  return false
}

if (!clinicId || !currentUser?.id) {
  showValidationWarning('Erro de Acesso', 'Não foi possível identificar a clínica ou usuário logado.') // ✅ JÁ TEM
  setIsSaving(false)
  return false
}

// Verificar se existem outros early returns sem toast!
```

#### E.3) Não usar campos legacy

**Verificar que NÃO estamos enviando:**
- ❌ `concentration_text`
- ❌ `presentation_unit`
- ❌ `additional_component`
- ❌ `sort_order`
- ❌ `species_targets`
- ❌ `route_group`

**Whitelist mappers já garantem isso**, mas verificar logs:
```
[pickPresentationFields] ⚠️ Campos ignorados (não existem no schema): [...]
```

---

## 🧪 PLANO DE TESTES

### Teste 1: Criar medicamento com doses
1. Criar novo medicamento: "Carprofeno Teste"
2. Adicionar 2 apresentações
3. Adicionar 3 doses recomendadas:
   - Cão, VO, 4 mg/kg, BID
   - Gato, VO, 2 mg/kg, SID
   - Ambos, SC, 1 mg/kg, SID
4. Salvar
5. **Verificar console:** Doses devem aparecer no log
6. **Verificar Supabase:**
   ```sql
   SELECT * FROM medication_recommended_doses
   WHERE medication_id = 'id_do_carprofeno';
   ```

### Teste 2: Editar doses (diff)
1. Abrir medicamento existente
2. Remover 1 dose
3. Editar 1 dose existente
4. Adicionar 1 nova dose
5. Salvar
6. **Verificar console:**
   ```
   [RecommendedDoses] Diff: { toUpdate: 1, toInsert: 1, toDelete: 1 }
   ```

### Teste 3: Excluir medicamento
1. Selecionar medicamento com >1 apresentação
2. Clicar "Excluir"
3. **Verificar modal:** "Possui X apresentações"
4. Confirmar exclusão
5. **Verificar console:**
   ```
   [MedicationDelete] Deleted recommended doses
   [MedicationDelete] Deleted presentations
   [MedicationDelete] RESULT
   ```
6. **Verificar Supabase:** Medicamento sumiu

### Teste 4: Números não são strings
1. Criar medicamento
2. value: "10" (digitar como string)
3. Salvar
4. **Verificar console payload:**
   ```
   value: 10  // ✅ number
   per_value: 1  // ✅ number
   avg_price_brl: 50  // ✅ number (se preenchido)
   ```
5. **Verificar Supabase:** Colunas devem ser numeric, não text

---

## 📝 MIGRATIONS A RODAR NO SUPABASE

Execute nesta ordem:

1. ✅ `migrations/add_metadata_to_medication_presentations.sql`
2. ✅ `migrations/add_catalog_v3_fields_to_medications.sql`
3. ⏳ `migrations/create_medication_recommended_doses.sql` ← **RODAR ESTE**

Ou use o consolidado:
- `migrations/EXECUTE_ALL_CATALOGO_V3.sql` (se ainda não rodou)
- Depois: `migrations/create_medication_recommended_doses.sql`

---

## 📊 ARQUIVOS MODIFICADOS (Resumo)

### ✅ Já modificados:
1. `src/lib/clinicRecords.ts`
   - Whitelist mappers
   - Funções de doses recomendadas
   - deleteMedication atualizado

2. `modules/receituario-vet/Catalogo3Page.tsx`
   - normalizeNumber()
   - species_targets → species
   - Whitelist aplicado no handleSave

3. `migrations/`
   - create_medication_recommended_doses.sql

### ⏳ Falta modificar:
1. `modules/receituario-vet/Catalogo3Page.tsx`
   - Adicionar UI de doses recomendadas
   - Remover "Palatável"
   - Adicionar botão/modal de exclusão
   - Integrar save/load de doses

2. `modules/receituario-vet/ReceituarioChrome.tsx`
   - Comentar Catálogo v1 e v2 do menu

---

**Próxima Sessão:** Implementar UI de doses recomendadas + botão excluir + limpeza final.
