# FIX CRÍTICO: species_targets → species

**Data:** 2026-02-24
**Erro:** PGRST204: "Could not find the 'species_targets' column of 'medications'"

---

## ❌ PROBLEMA

A tabela `medications` no Supabase **NÃO tem** `species_targets`.
Ela tem `species` (text[]).

Da mesma forma, **NÃO tem** `route_group`.
Ela tem `routes` (text[]).

---

## ✅ CORREÇÕES APLICADAS

### 1. **clinicRecords.ts** - Whitelist corrigida

**Antes:**
```typescript
const MEDICATION_ALLOWED_FIELDS = [
  // ...
  'species_targets', // ❌ ERRADO
  // ...
]
```

**Depois:**
```typescript
const MEDICATION_ALLOWED_FIELDS = [
  // ...
  'species', // ✅ CORRETO: text[] no banco (não species_targets!)
  'routes', // ✅ CORRETO: text[] no banco (não route_group!)
  // ...
]
```

**Arquivo:** [clinicRecords.ts:11-27](src/lib/clinicRecords.ts#L11-L27)

---

### 2. **Catalogo3Page.tsx** - Interface atualizada

**Antes:**
```typescript
interface Medication {
    species_targets: string[] | null // ❌ ERRADO
}
```

**Depois:**
```typescript
interface Medication {
    species: string[] | null // ✅ CORRETO
    routes: string[] | null // ✅ CORRETO
}
```

**Arquivo:** [Catalogo3Page.tsx:16-26](modules/receituario-vet/Catalogo3Page.tsx#L16-L26)

---

### 3. **Catalogo3Page.tsx** - createEmptyMedication()

**Antes:**
```typescript
function createEmptyMedication() {
    return {
        species_targets: ['cão', 'gato'], // ❌
    }
}
```

**Depois:**
```typescript
function createEmptyMedication() {
    return {
        species: ['cão', 'gato'], // ✅
        routes: [], // ✅
    }
}
```

**Arquivo:** [Catalogo3Page.tsx:101-117](modules/receituario-vet/Catalogo3Page.tsx#L101-L117)

---

### 4. **Catalogo3Page.tsx** - loadSelectedItem()

**Depois:**
```typescript
const fullMed: MedicationWithPresentations = {
    ...details,
    species: details.species || ['cão', 'gato'], // ✅
    routes: details.routes || [], // ✅
}
```

**Arquivo:** [Catalogo3Page.tsx:185-194](modules/receituario-vet/Catalogo3Page.tsx#L185-L194)

---

### 5. **Catalogo3Page.tsx** - handleSave()

**Payload com campos corretos:**
```typescript
const medicationPayload = {
    name: draft.name.trim(),
    notes: draft.notes,
    is_controlled: !!draft.is_controlled,
    species: draft.species, // ✅ text[] direto no Supabase
    routes: draft.routes, // ✅ text[] direto no Supabase
    is_active: !!draft.is_active,
    metadata: { ... }
}

// Aplicar whitelist mapper
const cleanPayload = pickMedicationFields(medicationPayload)
```

**Arquivo:** [Catalogo3Page.tsx:374-423](modules/receituario-vet/Catalogo3Page.tsx#L374-L423)

---

### 6. **Replace All** executado

Substituições globais no Catalogo3Page.tsx:
- `species_targets` → `species` (9 ocorrências)
- Verificado: nenhuma ocorrência de `route_group` (✅)

---

## 🧪 TESTE OBRIGATÓRIO

### Passo 1: Criar medicamento com espécies

```typescript
// No Catálogo 3.0
draft.species = ['cão', 'gato']
draft.routes = ['VO', 'SC']

// Ao salvar, console deve mostrar:
[Catalogo3] Medication: {
  name: "Carprofeno",
  species: ["cão", "gato"],    // ✅ CORRETO
  routes: ["VO", "SC"],         // ✅ CORRETO
  metadata: { ... }
}
```

### Passo 2: Verificar no Supabase

```sql
SELECT name, species, routes, metadata
FROM medications
WHERE name = 'Carprofeno';

-- Resultado esperado:
-- species: {cão,gato}
-- routes: {VO,SC}
```

### Passo 3: Verificar que NÃO aparece PGRST204

```
❌ ANTES: PGRST204: "Could not find the 'species_targets' column"
✅ DEPOIS: Save success (sem erro)
```

---

## 📋 Schema Real do Supabase

Confirmado que as colunas existentes são:

### Tabela: `medications`
```sql
species text[]       ✅ EXISTE
routes text[]        ✅ EXISTE
metadata jsonb       ✅ EXISTE (se migration foi executada)
is_active boolean    ✅ EXISTE (se migration foi executada)
```

### Tabela: `medication_presentations`
```sql
metadata jsonb       ✅ EXISTE (se migration foi executada)
```

---

## ⚠️ REGRA DE OURO

**Se o banco tem `foo`, use `foo`.**
**Se o banco NÃO tem `foo_bar`, coloque em `metadata`.**

Exemplos:
- ✅ `species` → direto na coluna
- ✅ `routes` → direto na coluna
- ❌ `species_targets` → não existe, vai dar PGRST204
- ❌ `route_group` → não existe, vai dar PGRST204
- ✅ `manufacturer` → vai para `metadata.manufacturer`

---

## 🎯 Status

- ✅ Whitelist corrigida em clinicRecords.ts
- ✅ Interface Medication corrigida
- ✅ createEmptyMedication() corrigido
- ✅ loadSelectedItem() corrigido
- ✅ handleSave() corrigido com whitelist mappers
- ✅ Replace all species_targets → species
- ⏳ Aguardando teste no front-end

---

**Próximo passo:** Testar salvar medicamento e verificar console logs.
