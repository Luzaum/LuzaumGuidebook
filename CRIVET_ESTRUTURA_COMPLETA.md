# 📋 ESTRUTURA COMPLETA QUE O CRIVET ACEITA E EXIBE

## ✅ O QUE O APP USA E EXIBE NA UI

### 1️⃣ **COMPATIBILIDADE** (exibida no `CompatibilityPanel`)
**Onde vem:** `Drug.compatibility` (em `drugs.ts`) + normalização do `DrugProfile.compatibility`

**Campos que o app ACEITA e EXIBE:**

```typescript
// Em drugs.ts (Drug interface)
compatibility: {
  diluents?: DiluentCompatibility[]  // ✅ PRIORIDADE - formato específico por diluente
  compatibleDiluent?: string[]       // ✅ DEPRECATED mas ainda funciona
  compatibleMeds?: string[]          // ✅ Exibe "Misturas geralmente aceitas"
  incompatibilities?: CompatibilityItem[] // ✅ Exibe lista de incompatibilidades
  materialWarnings?: string[]        // ✅ Exibe "Avisos práticos"
}

// No DrugProfile.compatibility (normalizado)
compatibility: {
  diluents_allowed: string[]         // ✅ USADO - lista permitidos
  diluents_ok: string[]              // ✅ USADO - lista permitidos  
  diluentsAllowed: string[]          // ✅ USADO - lista permitidos
  diluents: string[]                 // ✅ USADO - lista permitidos
  incompatible: Array<{              // ✅ USADO - lista incompatíveis
    agent: string                    // ✅ Exibe nome
    why: string                      // ✅ Exibe explicação
    risk?: string                    // ✅ Para severidade
  }>
  avoid_same_syringe_or_precipitation_risk?: string[] // ✅ USADO
}
```

**Como aparece na UI:**
- ✅ Compatível / ⛔ Evitar / ⚠️ Sem dados
- Lista de incompatibilidades com severidade
- Avisos práticos (PVC, dead space, etc)

---

### 2️⃣ **DOSES INDICADAS** (exibida acima de "Dose alvo" em amarelo)
**Onde vem:** `Drug.indicatedDoses` (importado de `drugs/metoclopramida.ts`)

**Formato OBRIGATÓRIO:**

```typescript
// Em drugs/metoclopramida.ts
export const metoclopramidaIndicatedDoses: IndicatedDose[] = [
  {
    mode: 'CRI' | 'BOLUS',           // ✅ USADO - filtra por modo
    species: 'cao' | 'gato' | 'ambos', // ✅ USADO - filtra por espécie
    unit: 'mcg/kg/min' | 'mcg/kg/h' | 'mg/kg/min' | 'mg/kg/h' | 'U/kg/h' | 'U/kg/min', // ✅ USADO
    range: { min: number, max: number }, // ✅ USADO - exibe faixa
    purpose: string,                 // ✅ EXIBIDO - "Para: [purpose]"
    note?: string                    // ✅ EXIBIDO no modal "?" - deve ter fisiologia
  }
]
```

**Como aparece na UI:**
- 🟡 Dose indicada: min-max unit (em destaque amarelo)
- Para: [purpose]
- Botão "?" abre modal com `note` (deve ter explicação fisiologia)

**IMPORTANTE:** Deve ser importado e adicionado em `drugs.ts`:
```typescript
import { metoclopramidaIndicatedDoses } from './drugs/metoclopramida'

// No array drugs[]
{
  id: 'metoclopramida',
  // ...
  indicatedDoses: metoclopramidaIndicatedDoses, // ✅ OBRIGATÓRIO
}
```

---

### 3️⃣ **UNIDADE RECOMENDADA** (seleciona automaticamente)
**Onde vem:** `Drug.recommendedUnit` + `Drug.recommendedUnitWhy`

**Formato OBRIGATÓRIO:**

```typescript
// Em drugs/metoclopramida.ts
export const metoclopramidaRecommendedUnit = 'mg/kg/h' // ✅ OBRIGATÓRIO
export const metoclopramidaRecommendedUnitWhy = [      // ✅ OBRIGATÓRIO (array de strings)
  'Unidade padrão para...',
  'CRI costuma ter melhor eficácia...',
  // etc
]

// Em drugs.ts
{
  id: 'metoclopramida',
  recommendedUnit: metoclopramidaRecommendedUnit,      // ✅ OBRIGATÓRIO
  recommendedUnitWhy: metoclopramidaRecommendedUnitWhy, // ✅ OBRIGATÓRIO
}
```

**Como aparece na UI:**
- Seleciona automaticamente a unidade ao escolher o fármaco
- Tooltip ajuda (?) mostra o `recommendedUnitWhy`

---

### 4️⃣ **ALERTAS POR COMORBIDADE/IDADE** (exibidos como banners)
**Onde vem:** **DOIS SISTEMAS** (funcionam em paralelo)

#### A) Sistema Hardcoded (legado) - `logic/alerts/metoclopramideRules.ts`
```typescript
// modules/crivet/logic/alerts/metoclopramideRules.ts
export const METOCLOPRAMIDE_RULES: DrugRule[] = [
  {
    drugId: 'metoclopramida',              // ✅ Deve ser o mesmo ID
    when: ['renopata' | 'hepatopata' | 'cardiopata' | 'neonato' | 'geriatrico' | 'shunt'], // ✅ Flags
    alert: {
      level: 'critical' | 'warning' | 'info',
      title: string,                       // ✅ Exibido
      short: string,                       // ✅ Exibido (mensagem curta)
      why: string[],                       // ✅ Exibido (explicação)
      actions: string[],                   // ✅ Exibido (ações)
    }
  }
]
```

**Flags disponíveis:**
- `renopata`, `hepatopata`, `cardiopata`, `endocrinopata`
- `neonato`, `filhote`, `geriatrico`
- `shunt`, `obesidade`, `shock`

#### B) Sistema DrugProfile (futuro) - `DrugProfile.alerts_by_comorbidity`
**⚠️ ATENÇÃO:** Este campo existe no `DrugProfile` mas **AINDA NÃO ESTÁ SENDO USADO** pelo app!

O app atual ainda usa **APENAS** os arquivos hardcoded (`logic/alerts/*Rules.ts`).

---

### 5️⃣ **INDICAÇÕES** (exibidas no Help Drawer "?")
**Onde vem:** `DrugProfile.indications` (normalizado pelo `normalizeDrug`)

**Formato ACEITO:**

```typescript
// No DrugProfile
indications: {
  primary: string[],      // ✅ EXIBIDO na seção "Indicações"
  secondary?: string[]    // ✅ EXIBIDO na seção "Indicações"
}
```

**Como aparece na UI:**
- No Help Drawer (?), seção "Indicações"
- Lista de indicações primárias e secundárias

---

### 6️⃣ **AJUSTES POR IDADE/COMORBIDADE** (exibidos no Help Drawer)
**Onde vem:** `DrugProfile.doses.dog.adjustments` / `doses.cat.adjustments`

**Formato ACEITO:**

```typescript
adjustments: {
  obesity?: string,        // ✅ EXIBIDO na seção "Doses"
  shock?: string,          // ✅ EXIBIDO na seção "Doses"
  hypoalbuminemia?: string, // ✅ EXIBIDO na seção "Doses"
  comorbidities?: string   // ✅ EXIBIDO na seção "Doses"
}
```

**Como aparece na UI:**
- No Help Drawer (?), seção "Doses"
- Texto sobre ajustes para obesidade, choque, etc.

---

### 7️⃣ **PRESETS** (exibidos como presets clínicos - futuro)
**Onde vem:** `DrugProfile.presets`

**Formato ACEITO:**

```typescript
presets: Array<{
  id: string,
  label: string,              // ✅ Nome do preset
  dose_mgkgh?: number,        // Dose CRI
  dose_mgkg?: number,         // Dose bolus
  limits: { min, max },       // Limites
  clinical_target: string,    // Meta clínica
  linked_alerts: string[]     // Alertas associados
}>
```

**⚠️ ATENÇÃO:** Presets existem no `DrugProfile` mas **podem não estar sendo exibidos na UI ainda**.

---

## ❌ O QUE O APP NÃO USA (mesmo estando no DrugProfile)

1. **`alerts_by_comorbidity`** → Existe no perfil mas app usa arquivos hardcoded
2. **`protocol_integrations`** → Não usado ainda
3. **`clinical_flowcharts`** → Não usado ainda
4. **`ui_guideline_tables`** → Não usado ainda
5. **`calculation_templates`** → Não usado ainda
6. **`how_we_got_here_block`** → Não usado ainda

---

## 📝 RESUMO: O QUE VOCÊ PRECISA CRIAR PARA METOCLOPRAMIDA

### ✅ OBRIGATÓRIO (já criado):
1. ✅ `metoclopramida.profile.ts` - Perfil completo
2. ✅ `drugs/metoclopramida.ts` - Doses indicadas + unidade recomendada
3. ✅ Registro em `drugProfileRegistry.ts`
4. ✅ Import em `drugs.ts` com `indicatedDoses` e `recommendedUnit`

### ⚠️ FALTA CRIAR (para alertas de comorbidade aparecerem):
5. ❌ `logic/alerts/metoclopramideRules.ts` - **ATUALIZAR com todas as comorbidades**
   - Preciso criar/atualizar com: `renopata`, `hepatopata`, `obstrucao_gi`, `geriatrico`, `neonato`, etc.

### 📊 COMPATIBILIDADE (já no profile, precisa verificar se está sendo lida):
6. ❓ Verificar se `drugs.ts` tem `compatibility` configurado para metoclopramida

---

## 🔧 ESTRUTURA MÍNIMA FUNCIONAL

Para um fármaco aparecer **COMPLETO** na UI, você precisa:

```typescript
// 1. Perfil completo (metoclopramida.profile.ts) ✅
export const metoclopramidaProfile: DrugProfile = { ... }

// 2. Doses indicadas (drugs/metoclopramida.ts) ✅
export const metoclopramidaIndicatedDoses: IndicatedDose[] = [ ... ]
export const metoclopramidaRecommendedUnit = 'mg/kg/h'
export const metoclopramidaRecommendedUnitWhy = [ ... ]

// 3. Em drugs.ts ✅
{
  id: 'metoclopramida',
  recommendedUnit: metoclopramidaRecommendedUnit,
  recommendedUnitWhy: metoclopramidaRecommendedUnitWhy,
  indicatedDoses: metoclopramidaIndicatedDoses,
  compatibility: defaultCompatibility, // ou custom
}

// 4. Alertas por comorbidade (logic/alerts/metoclopramideRules.ts) ❌ FALTA
export const METOCLOPRAMIDE_RULES: DrugRule[] = [
  { drugId: 'metoclopramida', when: ['renopata'], alert: { ... } },
  { drugId: 'metoclopramida', when: ['obstrucao_gi'], alert: { ... } },
  // etc
]

// 5. Registro no registry ✅
import { metoclopramidaProfile } from '../data/drugs/metoclopramida.profile'
DRUG_PROFILE_REGISTRY.metoclopramida = metoclopramidaProfile
```

---

## 🎯 PRÓXIMO PASSO

Você quer que eu:
1. ✅ Crie/atualize `logic/alerts/metoclopramideRules.ts` com todas as comorbidades?
2. ✅ Verifique se compatibilidade está configurada corretamente em `drugs.ts`?

**AVISE O QUE QUER QUE EU FAÇA!**
