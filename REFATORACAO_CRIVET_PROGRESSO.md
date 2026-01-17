# 🔄 PROGRESSO DA REFATORAÇÃO CRIVET 2.0

**Data:** 2025-01-17  
**Status:** Em andamento

---

## ✅ TAREFA 1: PONTO ÚNICO DE ACESSO - CONCLUÍDA

### O que foi feito:
- ✅ Criado `modules/crivet/services/getDrug.ts`
  - Função `getDrug(drugId)` - ponto único de acesso
  - Carrega DrugProfile do registry
  - Normaliza com `normalizeDrug()`
  - Retorna `NormalizedDrug` (nunca null/undefined)
  - Cache de resultados normalizados
  - Fallback seguro se perfil não existe

### Como usar:
```typescript
import { getDrug } from '../services/getDrug'

const drug = getDrug('fentanil') // Sempre retorna NormalizedDrug válido
```

### Próximos passos:
- ⚠️ Atualizar UI para usar `getDrug()` ao invés de `drugs.ts` diretamente
- ⚠️ Proibir imports diretos de `data/drugs.ts` na UI

---

## ✅ TAREFA 2: FORTALECER normalizeDrug - CONCLUÍDA

### O que foi feito:
- ✅ **Compatibilidade nunca vazia:**
  - Coleta de TODOS os aliases: `diluents_allowed`, `diluents_ok`, `diluentsAllowed`, `diluents`, `dilution_and_preparation.diluents_allowed`
  - Normalização de nomes (NaCl, RL, D5W)
  - Default: `['NaCl 0,9%']` se não houver dados
  - **Resultado:** Nunca mostra "Sem dados de compatibilidade"

- ✅ **Help drawer nunca vazio:**
  - Sempre retorna pelo menos uma seção
  - Se não há dados, cria seção padrão útil
  - Todas as seções têm `id` único
  - **Resultado:** Nunca mostra "em breve" ou texto genérico vazio

- ✅ **Defaults garantidos:**
  - `recommendedUnit` extraído de `doses.unit_standard_cri` ou `unit_display_override`
  - `recommendedUnitWhy` gerado se não houver
  - `indicatedDoses` preparado (será populado na migração)
  - `presets` extraído do profile
  - `alerts` convertido de `alerts_by_comorbidity` para formato de regras
  - Mapeamento inteligente de keys de comorbidade para PatientFlags

### Melhorias implementadas:
1. Normalização de nomes de diluentes (case-insensitive)
2. Mapeamento de variações comuns (SF → NaCl 0,9%, etc)
3. Seções de help sempre têm conteúdo útil
4. Alertas convertidos automaticamente do DrugProfile

---

## 🔄 TAREFA 3: UNIFICAR ALERTAS - EM ANDAMENTO

### O que foi feito:
- ✅ Atualizado `evaluateDrugAlerts()` para:
  - **PRIMEIRO:** Tentar ler de `NormalizedDrug.alerts` (sistema novo)
  - **FALLBACK:** Usar sistema legado se fármaco não tem alertas no perfil
  - Ordenação por severidade mantida

- ✅ `normalizeDrug()` agora:
  - Extrai `alerts_by_comorbidity` do DrugProfile
  - Converte para formato de regras com PatientFlags
  - Mapeamento inteligente de keys (hepatopata, renopata, etc)

### O que falta:
- ⚠️ Migrar regras dos arquivos legados para dentro dos perfis
- ⚠️ Testar se alertas do perfil funcionam corretamente
- ⚠️ Remover sistema legado após 100% migrado

### Arquivos legados a migrar:
- `logic/alerts/midazolamRules.ts`
- `logic/alerts/fentanylRules.ts`
- `logic/alerts/remifentanilRules.ts`
- `logic/alerts/ketamineRules.ts`
- `logic/alerts/lidocaineRules.ts`
- `logic/alerts/dexmedetomidineRules.ts`
- `logic/alerts/metoclopramideRules.ts`

---

## ⏳ TAREFA 4: MIGRAR DADOS - PENDENTE

### O que precisa ser feito:
- Migrar `indicatedDoses` dos arquivos `*.ts` para dentro dos `*.profile.ts`
- Migrar `recommendedUnit` e `recommendedUnitWhy` para dentro dos perfis
- Consolidar compatibilidade em `*.profile.ts`
- Remover arquivos duplicados:
  - `*.compat.ts` → migrar para `*.profile.ts`
  - `*.presets.ts` → migrar para `*.profile.ts`
  - `*.ts` (dados básicos) → migrar para `*.profile.ts`

### Estrutura alvo:
Cada fármaco terá APENAS:
- `fentanil.profile.ts` - perfil completo com TUDO

Remover:
- `fentanil.ts` ❌
- `fentanil.compat.ts` ❌
- `fentanil.presets.ts` ❌

---

## ⏳ TAREFA 5: REFATORAR InfusionCalculator - PENDENTE

### Plano:
1. Criar `useInfusionCalculatorController.ts` (hook/controller)
2. Quebrar UI em componentes:
   - `DoseInputSection.tsx`
   - `ModeSelector.tsx`
   - `PreparationPanel.tsx`
   - `InsulinProtocolTable.tsx` (isolado)
   - `ResultsPanel.tsx`
   - `AlertsPanel.tsx`

---

## 📊 STATUS ATUAL

| Tarefa | Status | Progresso |
|--------|--------|-----------|
| 1. Ponto único de acesso | ✅ Completa | 100% |
| 2. Fortalecer normalizeDrug | ✅ Completa | 100% |
| 3. Unificar alertas | 🔄 Em andamento | 60% |
| 4. Migrar dados | ⏳ Pendente | 0% |
| 5. Refatorar InfusionCalculator | ⏳ Pendente | 0% |

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

1. **Atualizar UI para usar `getDrug()`:**
   - `DrugSelector.tsx` → usar `getDrug()`
   - `InfusionCalculator.tsx` → usar `getDrug()`
   - `CompatibilityPanel.tsx` → usar `getDrug()`

2. **Migrar um fármaco de exemplo:**
   - Escolher um fármaco completo (ex: fentanil)
   - Consolidar TUDO em `fentanil.profile.ts`
   - Remover arquivos duplicados
   - Testar se funciona

3. **Migrar alertas de um fármaco:**
   - Escolher um fármaco (ex: metoclopramida)
   - Migrar regras de `metoclopramideRules.ts` para `metoclopramida.profile.ts`
   - Testar se alertas funcionam

---

## ⚠️ BREAKING CHANGES

### Antes:
```typescript
import { drugs } from '../data/drugs'
const drug = drugs.find(d => d.id === 'fentanil')
```

### Depois:
```typescript
import { getDrug } from '../services/getDrug'
const drug = getDrug('fentanil') // Sempre retorna NormalizedDrug
```

### Impacto:
- UI precisa ser atualizada para usar `getDrug()`
- Estrutura de dados mudou (NormalizedDrug vs Drug)
- Compatibilidade mantida via fallback durante transição

---

## 📝 NOTAS

- Sistema legado mantido temporariamente para compatibilidade
- Migração será gradual (fármaco por fármaco)
- Testes necessários após cada migração
- Documentação será atualizada conforme progresso
