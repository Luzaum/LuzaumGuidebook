# 🚀 GUIA DE EXECUÇÃO - INTEGRAÇÃO CATÁLOGO 3.0

**Data**: 2026-02-24
**Status**: ✅ Migrations criadas | ⏳ Aguardando execução no Supabase

---

## 📋 ÍNDICE

1. [Pré-requisitos](#pré-requisitos)
2. [Passo 1: Executar Migrations SQL](#passo-1-executar-migrations-sql)
3. [Passo 2: Criar Storage Bucket](#passo-2-criar-storage-bucket)
4. [Passo 3: Verificar Migrations](#passo-3-verificar-migrations)
5. [Passo 4: Testar no Frontend](#passo-4-testar-no-frontend)
6. [Troubleshooting](#troubleshooting)

---

## ✅ PRÉ-REQUISITOS

- [ ] Acesso ao Supabase Dashboard (https://app.supabase.com)
- [ ] Permissões de administrador no projeto
- [ ] Backup do banco (opcional, mas recomendado)

---

## 🔧 PASSO 1: EXECUTAR MIGRATIONS SQL

### Opção A: Executar arquivo master (RECOMENDADO)

1. **Abrir Supabase Dashboard**
   - Ir para: https://app.supabase.com
   - Selecionar projeto **Vetius**

2. **Abrir SQL Editor**
   - Menu lateral: **SQL Editor**
   - Clicar em **New Query**

3. **Copiar e executar migration master**
   ```bash
   # Copiar conteúdo do arquivo:
   migrations/EXECUTE_ALL_MIGRATIONS_20260224.sql
   ```
   - Colar no SQL Editor
   - Clicar em **RUN** (ou `Ctrl+Enter`)

4. **Verificar logs**
   - Verificar mensagens de sucesso:
     ```
     ✅ [1/4] Colunas de embalagem adicionadas!
     ✅ [2/4] Campos de tutor/paciente adicionados!
     ✅ [3/4] Tabela prescriber_profiles criada!
     ✅ [4/4] Tabela prescription_templates criada!
     ```

### Opção B: Executar migrations individualmente

Execute na ordem:

1. **TAREFA A - Embalagem**
   ```bash
   migrations/20260224_add_package_columns_to_presentations.sql
   ```

2. **TAREFA E - Campos tutor/paciente**
   ```bash
   migrations/20260224_add_missing_patient_tutor_fields.sql
   ```

3. **TAREFA G - Prescriber Profiles**
   ```bash
   migrations/20260224_create_prescriber_profiles.sql
   ```

4. **TAREFA G - Templates**
   ```bash
   migrations/20260224_create_prescription_templates.sql
   ```

---

## 📦 PASSO 2: CRIAR STORAGE BUCKET

### 2.1 - Criar bucket manualmente

1. **Abrir Storage**
   - Menu lateral: **Storage**
   - Clicar em **New Bucket**

2. **Configurar bucket**
   - **Name**: `prescriber_signatures`
   - **Public**: ❌ **false** (privado)
   - Clicar em **Create bucket**

### 2.2 - Aplicar RLS Policies

1. **Abrir SQL Editor** novamente

2. **Executar policies**
   ```bash
   # Copiar conteúdo do arquivo:
   migrations/20260224_create_prescriber_signatures_bucket.sql
   ```
   - Colar no SQL Editor
   - Clicar em **RUN**

3. **Verificar policies criadas**
   - Ir para: **Storage > prescriber_signatures > Policies**
   - Verificar 4 policies:
     - ✅ Users can upload their own signatures
     - ✅ Users can read their own signatures
     - ✅ Users can update their own signatures
     - ✅ Users can delete their own signatures

---

## ✅ PASSO 3: VERIFICAR MIGRATIONS

### 3.1 - Verificar tabelas criadas

**SQL Editor**:
```sql
-- Verificar medication_presentations
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'medication_presentations'
  AND column_name IN ('package_quantity', 'package_unit');

-- Resultado esperado:
-- package_quantity | numeric
-- package_unit     | text
```

```sql
-- Verificar tutors
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'tutors'
  AND column_name = 'address_complement';

-- Resultado esperado:
-- address_complement | text
```

```sql
-- Verificar patients
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'patients'
  AND column_name IN ('reproductive_condition', 'microchipped', 'microchip_number', 'anamnesis', 'notes');

-- Resultado esperado:
-- reproductive_condition | text
-- microchipped          | boolean
-- microchip_number      | text
-- anamnesis             | text
-- notes                 | text
```

```sql
-- Verificar prescriber_profiles
SELECT table_name FROM information_schema.tables
WHERE table_name = 'prescriber_profiles';

-- Resultado esperado:
-- prescriber_profiles
```

```sql
-- Verificar prescription_templates
SELECT table_name FROM information_schema.tables
WHERE table_name = 'prescription_templates';

-- Resultado esperado:
-- prescription_templates
```

### 3.2 - Verificar RLS habilitado

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('prescriber_profiles', 'prescription_templates');

-- Resultado esperado:
-- prescriber_profiles     | true
-- prescription_templates  | true
```

### 3.3 - Verificar indexes criados

```sql
SELECT indexname
FROM pg_indexes
WHERE tablename IN ('medication_presentations', 'patients', 'prescriber_profiles', 'prescription_templates')
ORDER BY indexname;

-- Resultado esperado (parcial):
-- idx_medication_presentations_package
-- idx_patients_microchipped
-- idx_patients_reproductive_condition
-- idx_prescriber_profiles_clinic_user
-- idx_prescription_templates_clinic_user
-- ...
```

---

## 🧪 PASSO 4: TESTAR NO FRONTEND

### 4.1 - Testar TAREFA A (Embalagem)

1. **Abrir Catálogo 3.0**
   - URL: `http://localhost:5173/receituario/catalogo3` (ou produção)

2. **Criar/editar medicamento**
   - Clicar em **Novo Medicamento**
   - Preencher nome: "Teste Embalagem"
   - Adicionar apresentação:
     - Forma: Comprimido
     - Concentração: 10 mg
     - **Embalagem**: `10` `comprimido`
   - Clicar em **Salvar Dados**

3. **Verificar console (F12)**
   ```
   [saveMedication] rows -> [{
     ...
     package_quantity: 10,
     package_unit: "comprimido",
     ...
   }]
   [saveMedication] ✅ Saved med id: abc-123
   ```

4. **Verificar no Supabase Table Editor**
   - Ir para: **Table Editor > medication_presentations**
   - Buscar registro criado
   - Colunas `package_quantity` e `package_unit` devem estar preenchidas

5. **Dar F5 na página**
   - Valores de embalagem devem permanecer preenchidos

**✅ CRITÉRIO DE ACEITE**: Embalagem salva e persiste após F5.

---

### 4.2 - Testar TAREFA B (Doses "ambos")

1. **Abrir medicamento no Catálogo 3.0**

2. **Adicionar dose recomendada**
   - Espécie: **ambos**
   - Via: VO
   - Dose: 10 mg/kg
   - Frequência: 2x ao dia
   - Clicar em **Salvar Dados**

3. **Verificar console**
   ```
   [RecommendedDoses] SAVE START { count: 1 }
   [RecommendedDoses] Inserted 1 doses
   [RecommendedDoses] SAVE SUCCESS
   ```

4. **Recarregar página**
   - Dose deve aparecer com espécie "ambos"

**✅ CRITÉRIO DE ACEITE**: Espécie "ambos" salva e recarrega corretamente.

---

### 4.3 - Testar TAREFA E (Importação tutor/paciente)

1. **Criar tutor no Supabase**
   - Table Editor > tutors > Insert row
   - Preencher:
     - `full_name`: "João Silva"
     - `address_complement`: "Apto 123"

2. **Criar paciente no Supabase**
   - Table Editor > patients > Insert row
   - Preencher:
     - `name`: "Rex"
     - `reproductive_condition`: "Castrado"
     - `microchipped`: true
     - `microchip_number`: "123456789"
     - `anamnesis`: "Histórico de alergia alimentar"
     - `notes`: "Paciente dócil"

3. **Abrir Nova Receita**
   - Clicar em botão de importar do Supabase
   - Selecionar tutor "João Silva"
   - Selecionar paciente "Rex"

4. **Verificar campos preenchidos**
   - Tutor: complemento = "Apto 123"
   - Paciente:
     - Condição reprodutiva = "Castrado"
     - Microchip = ✅
     - Número = "123456789"
     - Anamnese = "Histórico de alergia alimentar"
     - Observações = "Paciente dócil"

**✅ CRITÉRIO DE ACEITE**: Todos os campos importados corretamente.

---

## 🚨 TROUBLESHOOTING

### Erro: "relation does not exist"

**Causa**: Tabela não foi criada.

**Solução**:
```sql
-- Verificar se tabela existe
SELECT table_name FROM information_schema.tables
WHERE table_name = 'prescriber_profiles';

-- Se não existir, executar migration novamente
```

---

### Erro: "column does not exist"

**Causa**: Coluna não foi adicionada.

**Solução**:
```sql
-- Verificar colunas existentes
SELECT column_name FROM information_schema.columns
WHERE table_name = 'medication_presentations';

-- Executar migration específica novamente
```

---

### Erro: "policy already exists"

**Causa**: Policy já foi criada anteriormente.

**Solução**: Ignorar erro (policy já existe). Ou:
```sql
-- Dropar policy existente
DROP POLICY IF EXISTS "Users can manage their own prescriber profiles"
  ON public.prescriber_profiles;

-- Executar migration novamente
```

---

### Erro: "permission denied for table"

**Causa**: RLS bloqueando acesso.

**Solução**:
```sql
-- Verificar policies
SELECT * FROM pg_policies
WHERE tablename = 'prescriber_profiles';

-- Verificar clinic_memberships do usuário
SELECT * FROM clinic_memberships
WHERE user_id = auth.uid();
```

---

### Embalagem não aparece após F5

**Causa**: Frontend ainda está lendo de `metadata`.

**Solução**:
1. Verificar se código foi atualizado (git pull)
2. Limpar cache do navegador (Ctrl+Shift+R)
3. Verificar console por erros TypeScript

---

### Storage bucket não funciona

**Causa**: Policies não aplicadas.

**Solução**:
1. Verificar se bucket existe: **Storage > Buckets**
2. Verificar policies: **Storage > prescriber_signatures > Policies**
3. Executar: `migrations/20260224_create_prescriber_signatures_bucket.sql`

---

## 📊 LOGS ESPERADOS

### Console do navegador (desenvolvimento)

**TAREFA A - Embalagem**:
```
[Catalogo3] SAVE CLICKED 2026-02-24T...
[Catalogo3] ========== SAVING PAYLOAD ==========
[Catalogo3] Pres: [{ package_quantity: 10, package_unit: "comprimido", ... }]
[saveMedication] rows -> [{ package_quantity: 10, package_unit: "comprimido", ... }]
[PresentationInsert] START { clinicId: "...", input: {...} }
[PresentationInsert] RESULT { data: true }
[Catalogo3] ✅ Saved med id: abc-123
```

**TAREFA B - Doses**:
```
[Catalogo3] Saving doses... [{ species: "ambos", ... }]
[RecommendedDoses] SAVE START { clinicId: "...", medicationId: "...", count: 1 }
[RecommendedDoses] Diff: { toUpdate: 0, toInsert: 1, toDelete: 0 }
[RecommendedDoses] Inserted 1 doses
[RecommendedDoses] SAVE SUCCESS { count: 1 }
```

**TAREFA E - Importação**:
```
[SupabaseAdapter] Importing tutor { id: "...", full_name: "João Silva" }
[SupabaseAdapter] Mapping address_complement: "Apto 123"
[SupabaseAdapter] Importing patient { id: "...", name: "Rex" }
[SupabaseAdapter] Mapping reproductive_condition: "Castrado"
[SupabaseAdapter] Mapping microchipped: true
```

---

## 📝 CHECKLIST FINAL

### Migrations executadas:
- [ ] EXECUTE_ALL_MIGRATIONS_20260224.sql (ou migrations individuais)
- [ ] Storage bucket criado: `prescriber_signatures`
- [ ] RLS policies aplicadas no bucket

### Verificações no Supabase:
- [ ] Coluna `medication_presentations.package_quantity` existe
- [ ] Coluna `medication_presentations.package_unit` existe
- [ ] Coluna `tutors.address_complement` existe
- [ ] Coluna `patients.reproductive_condition` existe
- [ ] Coluna `patients.microchipped` existe
- [ ] Coluna `patients.microchip_number` existe
- [ ] Coluna `patients.anamnesis` existe
- [ ] Coluna `patients.notes` existe
- [ ] Tabela `prescriber_profiles` existe
- [ ] Tabela `prescription_templates` existe
- [ ] RLS habilitado em `prescriber_profiles`
- [ ] RLS habilitado em `prescription_templates`
- [ ] Policies criadas (verificar `pg_policies`)
- [ ] Indexes criados (verificar `pg_indexes`)

### Testes no frontend:
- [ ] TAREFA A: Embalagem salva e persiste
- [ ] TAREFA B: Espécie "ambos" funciona
- [ ] TAREFA E: Importação tutor/paciente completa
- [ ] Logs no console corretos (sem erros)

---

## 🎯 PRÓXIMOS PASSOS (após migrations)

1. **Implementar TAREFA C** (Modal Nova Receita - Catálogo 3.0)
   - Remover catálogo legado
   - Implementar busca e seleção do Supabase
   - Corrigir bug "via undefined"

2. **Implementar TAREFA D** (Fluxo Plantão)
   - Corrigir ortografia
   - Corrigir dropdown de tutores

3. **Implementar TAREFA F** (Histórico de peso)
   - Gráfico de evolução

4. **Implementar TAREFA G - Frontend** (Prescriber + Templates)
   - Criar `prescriberProfiles.ts`
   - Criar `prescriptionTemplates.ts`
   - Integrar UI

---

**✅ FIM DO GUIA**

Qualquer dúvida, consultar: `PLANO_INTEGRACAO_CATALOGO_V3.md`
