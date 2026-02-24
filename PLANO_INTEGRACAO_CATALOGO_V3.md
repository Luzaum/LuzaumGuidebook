# 📋 PLANO DE INTEGRAÇÃO CATÁLOGO 3.0 + SUPABASE

**Data**: 2026-02-24
**Status**: EM ANDAMENTO (2/7 tarefas completas)

---

## ✅ TAREFAS COMPLETADAS

### **TAREFA A — EMBALAGEM NÃO SALVA (Catálogo 3.0)** ✅

**Problema**: `package_quantity` e `package_unit` estavam em `metadata` (JSONB) e não eram salvos.

**Solução implementada**:

1. **Migration SQL criada**: `migrations/20260224_add_package_columns_to_presentations.sql`
   - Adiciona colunas `package_quantity` (numeric) e `package_unit` (text) em `medication_presentations`
   - Backfill automático: migra dados de `metadata->>'package_quantity'` para coluna real
   - Index criado para performance

2. **Backend** (`src/lib/clinicRecords.ts`):
   - ✅ `PRESENTATION_ALLOWED_FIELDS` atualizado (inclui package_quantity e package_unit)
   - ✅ `saveMedication()` envia campos nas colunas
   - ✅ `MedicationPresentationRecord` type atualizado

3. **Frontend** (`modules/receituario-vet/Catalogo3Page.tsx`):
   - ✅ `Presentation` interface atualizada
   - ✅ `loadSelectedItem()` carrega das colunas
   - ✅ `handleSave()` salva nas colunas
   - ✅ UI conectada a `pres.package_quantity` e `pres.package_unit`

**CRITÉRIO DE ACEITE**: ✅ Após salvar, as colunas package_quantity e package_unit aparecem preenchidas no Table Editor e ao dar F5 a UI mantém.

**Como testar**:
```bash
# 1. Rodar migration
psql -h <host> -U postgres -d vetius < migrations/20260224_add_package_columns_to_presentations.sql

# 2. No Catálogo 3.0:
# - Abrir medicamento
# - Preencher "Embalagem" (ex: 10 comprimidos)
# - Salvar
# - Verificar no Supabase Table Editor: medication_presentations (colunas package_quantity e package_unit)
# - Dar F5 na página e verificar que os valores permanecem
```

---

### **TAREFA B — DOSES: VOLTAR OPÇÃO "AMBOS"** ✅

**Problema**: Espécie "ambos" não existia na UI de doses recomendadas.

**Solução implementada**:

1. **Frontend** (`modules/receituario-vet/Catalogo3Page.tsx`):
   - ✅ `SPECIES_OPTIONS` agora é `['cão', 'gato', 'ambos']`
   - ✅ `FREQUENCY_OPTIONS` padronizado: `['1x ao dia', '2x ao dia', '3x ao dia', '4x ao dia', '6x ao dia', '8x ao dia', '12x ao dia', '24x ao dia']`

2. **Lógica de auto-importação** (a implementar em NovaReceitaPage.tsx):
   - Prioridade 1: buscar dose onde `species == espécie do paciente` (ex: 'cão')
   - Prioridade 2: fallback para dose onde `species == 'ambos'`

**CRITÉRIO DE ACEITE**: ✅ Salva e recarrega certo no Supabase.

**Como testar**:
```bash
# 1. No Catálogo 3.0, abrir medicamento
# 2. Adicionar dose recomendada:
#    - Espécie: "ambos"
#    - Via: "VO"
#    - Dose: 10 mg/kg
#    - Frequência: "2x ao dia"
# 3. Salvar e recarregar → deve aparecer "ambos" no dropdown
```

---

## 🚧 TAREFAS PENDENTES

### **TAREFA C — NOVA RECEITA: MODAL "Adicionar Medicamento" (100% Catálogo 3.0)**

**Problema**: Modal ainda tem "Catálogo rápido (Legado)" e busca no catálogo local (rxDb).

**Ações necessárias**:

1. **Remover catálogo legado** (`modules/receituario-vet/NovaReceitaPage.tsx`):
   - ❌ Remover seção "Catálogo rápido (Legado)" (linha 748-773)
   - ❌ Remover state `catalogSearch` e `filteredCatalog`
   - ❌ Remover `catalogDrugs` e `catalogEntries` props do MedicationModal

2. **Implementar busca Catálogo 3.0**:
   - ✅ Já existe hook `useEffect` com `searchMedications()` (linha 415-435)
   - ❌ **TODO**: Criar UI de lista ao abrir modal (primeiros 50 medicamentos)
   - ❌ **TODO**: Busca por prefixo (`ilike 'A%'`)
   - ❌ **TODO**: Ao clicar em item:
     - Carregar `getMedicationDetails()`
     - Carregar `getMedicationPresentations()`
     - Carregar `getMedicationRecommendedDoses()`
     - Preencher form com dados do Catálogo 3.0

3. **UI do modal**:
   - ❌ Usar componentes `RxvComponents` (mesmo estilo do Catálogo 3.0)
   - ❌ Preencher: Nome, Princípio Ativo, Tags clínicas, Controlado, Espécies
   - ❌ Dropdown de apresentações
   - ❌ Preencher via e farmácia da apresentação
   - ❌ Preencher dose sugerida (espécie do paciente ou "ambos")
   - ❌ **BUG**: Corrigir "via undefined" na instrução (mapear `route` corretamente)

**Arquivos a modificar**:
- `modules/receituario-vet/NovaReceitaPage.tsx` (linhas 394-889)

**CRITÉRIO DE ACEITE**: Eu consigo abrir modal, ver lista sem digitar, selecionar medicamento, escolher apresentação, salvar item e preview fica correto.

---

### **TAREFA D — FLUXO PLANTÃO (autocomplete tutor)**

**Problemas identificados**:
1. Ortografia: "Fluxo Plantao" → "Fluxo Plantão"
2. Texto "Fonte: Supabase" aparece para o usuário (deve ser DEV-only)
3. Dropdown de tutores é cortado/bugado

**Ações necessárias**:

1. **Corrigir ortografia**:
   - ❌ Buscar "Fluxo Plantao" ou "Plantao" e corrigir para "Plantão"

2. **Remover "Fonte: Supabase"**:
   - ❌ Buscar por "Fonte: Supabase" e remover (ou adicionar `{process.env.NODE_ENV === 'development' && ...}`)

3. **Corrigir dropdown de tutores**:
   - ❌ Componente: `TutorQuickSelect` (importado na linha 56)
   - ❌ Usar container `position: relative` + lista `position: absolute` com `z-index: 999` e scroll
   - ❌ Se card pai tiver `overflow: hidden`, usar Portal (renderizar lista no body)

**Arquivos a modificar**:
- `modules/receituario-vet/components/TutorQuickSelect.tsx` (a investigar)
- `modules/receituario-vet/NovaReceitaPage.tsx` (buscar por "Fluxo Plant")

**CRITÉRIO DE ACEITE**: Ao digitar, lista aparece inteira e clicável.

---

### **TAREFA E — IMPORTAÇÃO COMPLETA tutor/paciente na Nova Receita**

**Problema**: Campos não estão sendo importados do Supabase.

**Campos faltantes**:

**Tutor**:
- ❌ `complemento` (address_complement)

**Paciente**:
- ❌ `condição reprodutiva` (neutered → "Castrado" | "Inteiro" | "Sem dados")
- ❌ `microchip` (microchipped → boolean)
- ❌ `anamnese/histórico` (anamnesis)
- ❌ `observações` (notes)

**Ações necessárias**:

1. **Verificar schema Supabase**:
   ```sql
   -- Verificar se colunas existem:
   SELECT column_name, data_type FROM information_schema.columns
   WHERE table_name = 'tutors' AND column_name IN ('address_complement', 'complement');

   SELECT column_name, data_type FROM information_schema.columns
   WHERE table_name = 'patients' AND column_name IN ('neutered', 'microchipped', 'anamnesis', 'notes', 'reproductive_condition');
   ```

2. **Se colunas não existirem**:
   - ❌ Criar migration (preferência) ou armazenar em `metadata` JSONB
   - ❌ Atualizar `TutorInsertInput` e `PatientInsertInput` em `clinicRecords.ts`

3. **Atualizar mapeamento** (`modules/receituario-vet/adapters/SupabaseAdapter.ts`):
   - ❌ Mapear `complemento` de tutor
   - ❌ Mapear campos de paciente

**Arquivos a modificar**:
- `src/lib/clinicRecords.ts` (types)
- `modules/receituario-vet/adapters/SupabaseAdapter.ts` (mapeamento)
- `migrations/20260224_add_missing_patient_tutor_fields.sql` (se necessário)

**CRITÉRIO DE ACEITE**: Ao importar tutor/paciente do Supabase, todos os campos aparecem preenchidos na Nova Receita.

---

### **TAREFA F — HISTÓRICO DE PESO**

**Problema**: Histórico de peso não funciona corretamente.

**Ações necessárias**:

1. **Inicialização**:
   - ❌ Paciente novo deve iniciar com array vazio (não erro)

2. **Ao selecionar paciente**:
   - ❌ Buscar `patient_weights` ORDER BY `measured_at` ASC
   - ❌ Renderizar gráfico (usar biblioteca Chart.js ou Recharts?)

3. **Ao inserir peso**:
   - ✅ Função `insertPatientWeight()` já existe em `clinicRecords.ts` (linha 210-275)
   - ❌ Após inserir: recarregar lista `loadPatientWeights()`
   - ❌ Gráfico deve atualizar automaticamente

**Arquivos a modificar**:
- `modules/receituario-vet/NovaReceitaPage.tsx` (área de peso do paciente)
- Componente de histórico de peso (a investigar se existe)

**CRITÉRIO DE ACEITE**: Peso aparece no gráfico ordenado por data.

---

### **TAREFA G — CONFIGURAR MÉDICO e TEMPLATES no Supabase**

**Problema**: Configurações de médico e templates estão apenas no localStorage (não sincroniza entre dispositivos).

**Ações necessárias**:

#### **G.1 - Tabela prescriber_profiles**

```sql
-- Migration: 20260224_create_prescriber_profiles.sql
CREATE TABLE IF NOT EXISTS public.prescriber_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Dados do prescritor
  full_name text NOT NULL,
  crmv text,
  uf text,
  clinic_name text,
  phone text,
  address text,

  -- Assinatura e logo (Storage bucket)
  signature_url text,
  logo_url text,

  -- Metadata (outros campos não estruturados)
  metadata jsonb DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(clinic_id, user_id)
);

-- RLS (Row Level Security)
ALTER TABLE public.prescriber_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own prescriber profiles"
  ON public.prescriber_profiles
  FOR ALL
  USING (
    clinic_id IN (
      SELECT clinic_id FROM public.clinic_memberships
      WHERE user_id = auth.uid()
    )
  );

-- Index
CREATE INDEX idx_prescriber_profiles_clinic_user
  ON public.prescriber_profiles(clinic_id, user_id);
```

#### **G.2 - Tabela prescription_templates**

```sql
-- Migration: 20260224_create_prescription_templates.sql
CREATE TABLE IF NOT EXISTS public.prescription_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Template data
  name text NOT NULL,
  template_json jsonb NOT NULL,
  is_default boolean DEFAULT false,

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.prescription_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own templates"
  ON public.prescription_templates
  FOR ALL
  USING (
    clinic_id IN (
      SELECT clinic_id FROM public.clinic_memberships
      WHERE user_id = auth.uid()
    )
  );

-- Index
CREATE INDEX idx_prescription_templates_clinic_user
  ON public.prescription_templates(clinic_id, user_id);
```

#### **G.3 - Storage bucket para assinaturas**

```sql
-- Bucket para assinaturas e logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('prescriber_signatures', 'prescriber_signatures', false);

-- RLS para storage
CREATE POLICY "Users can upload their own signatures"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'prescriber_signatures'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can read their own signatures"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'prescriber_signatures'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

#### **G.4 - Integrar UI**

**Arquivos a criar/modificar**:
- `src/lib/prescriberProfiles.ts` (funções CRUD)
- `src/lib/prescriptionTemplates.ts` (funções CRUD)
- `modules/receituario-vet/ConfigurarMedicoPage.tsx` (integrar com Supabase)
- `modules/receituario-vet/TemplatesPage.tsx` (integrar com Supabase)

**Funções a criar**:
```typescript
// src/lib/prescriberProfiles.ts
export async function getPrescriberProfile(clinicId: string, userId: string): Promise<PrescriberProfile | null>
export async function savePrescriberProfile(clinicId: string, userId: string, profile: Partial<PrescriberProfile>): Promise<PrescriberProfile>
export async function uploadSignature(file: File, userId: string): Promise<string> // retorna URL

// src/lib/prescriptionTemplates.ts
export async function listTemplates(clinicId: string, userId: string): Promise<Template[]>
export async function saveTemplate(clinicId: string, userId: string, template: Partial<Template>): Promise<Template>
export async function deleteTemplate(clinicId: string, templateId: string): Promise<void>
```

**CRITÉRIO DE ACEITE**: Logar em outra máquina e ver perfil e templates iguais.

---

## 📝 CHECKLIST DE MIGRAÇÃO

### **Migrations SQL a rodar**:
```bash
# 1. TAREFA A - Embalagem
psql -h <host> -U postgres -d vetius < migrations/20260224_add_package_columns_to_presentations.sql

# 2. TAREFA E - Campos tutor/paciente (se necessário)
psql -h <host> -U postgres -d vetius < migrations/20260224_add_missing_patient_tutor_fields.sql

# 3. TAREFA G - Prescriber profiles
psql -h <host> -U postgres -d vetius < migrations/20260224_create_prescriber_profiles.sql

# 4. TAREFA G - Templates
psql -h <host> -U postgres -d vetius < migrations/20260224_create_prescription_templates.sql

# 5. TAREFA G - Storage bucket
psql -h <host> -U postgres -d vetius < migrations/20260224_create_prescriber_signatures_bucket.sql
```

### **Testes manuais**:

#### **TAREFA A - Embalagem**:
- [ ] Abrir Catálogo 3.0
- [ ] Criar/editar medicamento
- [ ] Preencher "Embalagem" (ex: 10 comprimidos)
- [ ] Salvar
- [ ] Verificar no Supabase Table Editor: `medication_presentations` (colunas `package_quantity` e `package_unit`)
- [ ] Dar F5 e verificar que valores permanecem
- [ ] Console: ver logs `[saveMedication] rows -> ...` com package_quantity/package_unit

#### **TAREFA B - Doses**:
- [ ] Abrir Catálogo 3.0 → medicamento
- [ ] Adicionar dose recomendada:
  - Espécie: "ambos"
  - Via: "VO"
  - Dose: 10 mg/kg
  - Frequência: "2x ao dia"
- [ ] Salvar e recarregar
- [ ] Verificar que "ambos" aparece no dropdown de espécie
- [ ] Console: ver logs `[RecommendedDoses] SAVE SUCCESS`

#### **TAREFA C - Modal Nova Receita**:
- [ ] Abrir Nova Receita
- [ ] Clicar "Adicionar Medicamento"
- [ ] Verificar que NÃO aparece "Catálogo rápido (Legado)"
- [ ] Ao abrir modal, ver lista de medicamentos do Catálogo 3.0
- [ ] Digitar "a" → busca por prefixo
- [ ] Clicar em medicamento → preenche form
- [ ] Selecionar apresentação → preenche via/farmácia
- [ ] Verificar dose sugerida (espécie do paciente ou "ambos")
- [ ] Salvar item → preview correto (via não é "undefined")

#### **TAREFA D - Fluxo Plantão**:
- [ ] Abrir Nova Receita
- [ ] Procurar "Fluxo Plantão" (não "Plantao")
- [ ] Verificar que NÃO aparece "Fonte: Supabase" na UI
- [ ] Digitar nome de tutor → dropdown aparece completo (não cortado)
- [ ] Clicar em tutor → seleciona corretamente

#### **TAREFA E - Importação tutor/paciente**:
- [ ] Criar tutor no Supabase com complemento preenchido
- [ ] Criar paciente no Supabase com: neutered, microchipped, anamnesis, notes
- [ ] Na Nova Receita, importar do Supabase
- [ ] Verificar que todos os campos aparecem preenchidos

#### **TAREFA F - Histórico de peso**:
- [ ] Criar paciente sem pesos → histórico vazio (não erro)
- [ ] Inserir peso → gráfico atualiza
- [ ] Inserir mais pesos → ordenação por data (ASC)
- [ ] Recarregar página → pesos permanecem

#### **TAREFA G - Prescriber + Templates**:
- [ ] Configurar médico → salvar no Supabase
- [ ] Fazer upload de assinatura → URL salva
- [ ] Logar em outro navegador (mesma conta) → perfil aparece igual
- [ ] Criar template → salvar no Supabase
- [ ] Logar em outro dispositivo → template aparece

---

## 🔥 LOGS ESPERADOS

### **TAREFA A - Embalagem**:
```
[saveMedication] rows -> [{
  ...
  package_quantity: 10,
  package_unit: "comprimido",
  ...
}]
[saveMedication] ✅ Saved med id: abc-123
```

### **TAREFA B - Doses**:
```
[RecommendedDoses] SAVE START { clinicId: "...", medicationId: "...", count: 2 }
[RecommendedDoses] Diff: { toUpdate: 0, toInsert: 2, toDelete: 0 }
[RecommendedDoses] Inserted 2 doses
[RecommendedDoses] SAVE SUCCESS { count: 2 }
```

### **TAREFA C - Modal**:
```
[MedicationModal] Supabase search START { q: "a" }
[MedicationSearch] START { clinicId: "...", query: "a" }
[MedicationSearch] RESULT { count: 15 }
[MedicationModal] Loading med details { medId: "..." }
[MedicationDetails] START { medicationId: "..." }
[MedicationPresentations] START { medicationId: "..." }
[RecommendedDoses] GET { medicationId: "..." }
```

---

## 📌 PRÓXIMOS PASSOS

1. ✅ **Rodar migration TAREFA A** no Supabase
2. ✅ **Testar TAREFA A** (embalagem salva e recarrega)
3. ✅ **Testar TAREFA B** (espécie "ambos" funciona)
4. ❌ **Implementar TAREFA C** (modal Nova Receita 100% Catálogo 3.0)
5. ❌ **Implementar TAREFA D** (Fluxo Plantão - dropdown tutores)
6. ❌ **Implementar TAREFA E** (importação completa tutor/paciente)
7. ❌ **Implementar TAREFA F** (histórico de peso com gráfico)
8. ❌ **Implementar TAREFA G** (prescriber_profiles + templates no Supabase)

---

## 🎯 PRIORIDADES

**ALTA (Bloqueante)**:
1. TAREFA C - Modal Nova Receita (UX principal)
2. TAREFA E - Importação completa (dados incompletos)

**MÉDIA (Importante)**:
3. TAREFA D - Fluxo Plantão (UX secundária)
4. TAREFA F - Histórico de peso (feature útil)

**BAIXA (Nice to have)**:
5. TAREFA G - Prescriber + Templates (sincronização multi-device)

---

**Última atualização**: 2026-02-24 (TAREFAS A e B completas ✅)
