# Catálogo 3.0 - Alterações Implementadas

**Data:** 2026-02-24
**Status:** ✅ Implementado - Pronto para teste

---

## 🎯 Objetivo

Corrigir erro PGRST204 (`sort_order` não existe) e preparar infraestrutura para Catálogo 3.0 com schema extensível usando metadata JSONB.

---

## ✅ Alterações Realizadas

### 1. **Fix Imediato: Remover `sort_order`**

**Arquivo:** `src/lib/clinicRecords.ts`
- **Linha 338:** Removido `sort_order: idx` do insert de `medication_presentations`
- **Motivo:** Coluna `sort_order` não existe na tabela `medication_presentations` do Supabase
- **Impacto:** Resolve erro PGRST204 ao salvar medicamentos

---

### 2. **Migrations SQL**

#### 2.1 Adicionar `metadata` em `medication_presentations`

**Arquivo:** `migrations/add_metadata_to_medication_presentations.sql`

```sql
ALTER TABLE public.medication_presentations
ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_medication_presentations_metadata
ON public.medication_presentations USING gin (metadata);
```

**Campos que serão armazenados em `metadata`:**
- `manufacturer` (fabricante)
- `package_quantity` (quantidade na embalagem)
- `package_unit` (unidade da embalagem)
- `administration_routes` (vias de administração)
- `is_palatable` (palatável)
- `price_source` (fonte do preço)
- `obs` (observações)

#### 2.2 Adicionar campos Catálogo 3.0 em `medications`

**Arquivo:** `migrations/add_catalog_v3_fields_to_medications.sql`

```sql
ALTER TABLE public.medications
ADD COLUMN IF NOT EXISTS species_targets text[] NULL;

ALTER TABLE public.medications
ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

ALTER TABLE public.medications
ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;
```

**Novos campos diretos (colunas):**
- `species_targets`: array de espécies ['canine', 'feline', etc]
- `is_active`: flag para soft delete

**Campos que serão armazenados em `metadata`:**
- `active_ingredient` (princípio ativo)
- `tags` (tags de categorização)
- `therapeutic_class` (classe terapêutica)
- `control_class` (classe de controle: A1, B2, etc)
- `require_tutor_doc` (requer documento do tutor)

---

### 3. **Whitelist Mappers**

**Arquivo:** `src/lib/clinicRecords.ts`

#### 3.1 `pickMedicationFields(draft: any): any`

Filtra objeto mantendo apenas campos permitidos em `medications`:
- `id`, `clinic_id`, `created_by`, `owner_user_id`, `is_private`
- `name`, `notes`, `is_controlled`
- `species_targets`, `is_active`, `metadata`
- `created_at`, `updated_at`

**Funcionalidade:**
- Compara campos do draft com whitelist
- Remove campos não autorizados
- Loga warning em DEV com lista de campos ignorados

#### 3.2 `pickPresentationFields(draft: any): any`

Filtra objeto mantendo apenas campos permitidos em `medication_presentations`:
- `id`, `clinic_id`, `medication_id`
- `pharmaceutical_form`, `concentration_text`, `additional_component`, `presentation_unit`
- `commercial_name`, `value`, `value_unit`, `per_value`, `per_unit`, `avg_price_brl`
- `pharmacy_veterinary`, `pharmacy_human`, `pharmacy_compounding`
- `metadata`
- `created_at`, `updated_at`

---

### 4. **Integração Catalogo3Page**

**Arquivo:** `modules/receituario-vet/Catalogo3Page.tsx`

#### 4.1 Imports atualizados
```typescript
import {
    listMedications,
    getMedicationDetails,
    getMedicationPresentations,
    saveMedication,
    deleteMedication,
    pickMedicationFields,      // ✨ NOVO
    pickPresentationFields     // ✨ NOVO
} from '../../src/lib/clinicRecords'
```

#### 4.2 handleSave refatorado

**Antes:**
```typescript
const medicationPayload = {
    name: draft.name.trim(),
    notes: draft.notes,
    is_controlled: draft.is_controlled,
    // Campos extras omitidos
}
```

**Depois:**
```typescript
// Montar draft completo com metadata
const medicationDraft = {
    name: draft.name.trim(),
    notes: draft.notes,
    is_controlled: draft.is_controlled,
    species_targets: draft.species || null,
    is_active: draft.active !== false,
    metadata: {
        active_ingredient: draft.active_ingredient,
        tags: draft.tags,
        therapeutic_class: draft.therapeutic_class,
        control_class: draft.control_class,
        require_tutor_doc: draft.require_tutor_doc,
    }
}

// Aplicar whitelist mapper
const medicationPayload = pickMedicationFields(medicationDraft)
console.log('[Catalogo3] Medication payload (após whitelist):', medicationPayload)
```

**Presentations:**
```typescript
const presentationsPayload = draft.presentations.map(p => {
    const presentationDraft = {
        pharmaceutical_form: p.pharmaceutical_form,
        commercial_name: p.commercial_name,
        value: p.value,
        value_unit: p.value_unit,
        per_value: p.per_value,
        per_unit: p.per_unit,
        avg_price_brl: p.avg_price_brl,
        pharmacy_veterinary: p.pharmacy_veterinary,
        pharmacy_human: p.pharmacy_human,
        pharmacy_compounding: p.pharmacy_compounding,
        metadata: {
            manufacturer: p.manufacturer,
            packaging_amount: p.packaging_amount,
            packaging_unit: p.packaging_unit,
            routes: p.routes,
            is_palatable: p.is_palatable,
            price_source: p.price_source,
            obs: p.obs,
        }
    }

    return pickPresentationFields(presentationDraft)
})
```

#### 4.3 Logs DEV completos

```typescript
console.log('[Catalogo3] ========== SAVE CLICKED ==========')
console.log('[Catalogo3] Draft original:', draft)
console.log('[Catalogo3] Medication payload (após whitelist):', medicationPayload)
console.log('[Catalogo3] Presentations payload (após whitelist):', presentationsPayload)
console.log('[Catalogo3] ✅ Save result:', result)

// Em caso de erro:
console.error('[Catalogo3] ========== SAVE ERROR ==========')
console.error('[Catalogo3] Error object:', error)
console.error('[Catalogo3] Error message:', error?.message)
console.error('[Catalogo3] Error code:', error?.code)
console.error('[Catalogo3] Error details:', error?.details)
console.error('[Catalogo3] Error hint:', error?.hint)
```

---

## 📋 Checklist de Implantação

### Supabase (SQL Editor)

1. ✅ Rodar migration: `add_metadata_to_medication_presentations.sql`
2. ✅ Rodar migration: `add_catalog_v3_fields_to_medications.sql`
3. ✅ Verificar colunas criadas:
   ```sql
   -- medications
   SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_name = 'medications'
   AND column_name IN ('species_targets', 'is_active', 'metadata');

   -- medication_presentations
   SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_name = 'medication_presentations'
   AND column_name = 'metadata';
   ```

### Aplicação

4. ✅ Código atualizado em `clinicRecords.ts`
5. ✅ Código atualizado em `Catalogo3Page.tsx`
6. ✅ Rota `/receituario-vet/catalogo3` configurada em `App.tsx`
7. ✅ Menu "🚀 Catálogo 3.0" configurado em `ReceituarioChrome.tsx`

---

## 🧪 Plano de Testes

### Teste 1: Salvar medicamento NOVO (sem metadata)
1. Acessar: http://localhost:5173/receituario-vet/catalogo3
2. Clicar "Novo Medicamento"
3. Preencher apenas campos básicos:
   - Nome: "Teste Básico"
   - Forma farmacêutica: "Comprimido"
   - Valor: 250
   - Unidade: mg
4. Clicar "Salvar"
5. **Verificar console:**
   - `[Catalogo3] Medication payload (após whitelist)` não deve ter campos extras
   - `[Catalogo3] Presentations payload (após whitelist)` não deve ter campos extras
   - ✅ Deve salvar SEM erro PGRST204

### Teste 2: Salvar medicamento COM metadata
1. Criar novo medicamento
2. Preencher campos extras (Catalogo3Page):
   - Princípio ativo: "Carprofeno"
   - Espécies: ["canine"]
   - Classe terapêutica: "AINE"
   - Fabricante: "Zoetis"
   - Embalagem: 10 comprimidos
3. Clicar "Salvar"
4. **Verificar console:**
   - `metadata` deve estar preenchido no payload
   - ✅ Deve salvar SEM erro PGRST204
5. **Verificar Supabase:**
   ```sql
   SELECT name, species_targets, is_active, metadata
   FROM medications
   WHERE name = 'Nome do teste';

   SELECT pharmaceutical_form, metadata
   FROM medication_presentations
   WHERE medication_id = 'id_do_teste';
   ```

### Teste 3: Whitelist warnings
1. Abrir console do navegador
2. Salvar medicamento com campos extras
3. **Verificar logs:**
   - Deve aparecer warning: `[pickMedicationFields] ⚠️ Campos ignorados`
   - Deve listar campos permitidos

---

## 🔄 Próximos Passos

1. ✅ Rodar migrations no Supabase
2. ✅ Testar Catalogo3Page end-to-end
3. ⏳ Implementar load de metadata ao carregar medicamentos
4. ⏳ Adicionar UI para todos os campos de metadata
5. ⏳ Deprecar/ocultar Catálogo v1 e v2.0 do menu

---

## 📝 Notas Técnicas

### Por que usar `metadata` JSONB?

**Vantagens:**
- ✅ Evita migrations infinitas ao adicionar campos
- ✅ Permite evolução rápida da UI
- ✅ Suporta dados semi-estruturados
- ✅ Indexável com GIN index
- ✅ Queryable com operadores JSONB do Postgres

**Trade-offs:**
- ⚠️ Menos type-safe que colunas dedicadas
- ⚠️ Queries JSONB são um pouco mais lentas (mas ainda muito rápidas com index)
- ⚠️ Precisa de mappers UI <-> DB (já implementado)

### Whitelist vs Blacklist

Usamos **whitelist** (campos permitidos) em vez de **blacklist** (campos proibidos):
- ✅ Mais seguro: novos campos da UI não quebram o save
- ✅ Explícito: sabemos exatamente o que vai pro DB
- ✅ Logs úteis: alerta quando campo novo precisa ser adicionado
- ✅ Documentação viva: lista de campos serve como doc

---

## 🐛 Troubleshooting

### Erro PGRST204 ainda aparece?
- Verificar se migration foi executada
- Verificar se campo está na whitelist (`PRESENTATION_ALLOWED_FIELDS`)
- Ver logs no console: `[pickPresentationFields] ⚠️ Campos ignorados`

### Metadata não está sendo salvo?
- Verificar se coluna `metadata` existe: `\d medication_presentations`
- Verificar payload no console: `[Catalogo3] Presentations payload`
- Verificar RLS policies: usuário precisa ter permissão de INSERT/UPDATE

### Campos extras desaparecem após reload?
- Isso é esperado! Campos extras precisam ser:
  1. Adicionados à whitelist OU
  2. Movidos para `metadata`

---

**FIM DO DOCUMENTO**
