# 📊 RELATÓRIO COMPLETO DE DIAGNÓSTICO - CRIVET 2.0

**Data:** 2025-01-17  
**Versão analisada:** CRIVET 2.0  
**Escopo:** Estrutura completa, banco de dados, componentes, fluxo de dados e UX

---

## 📋 SUMÁRIO EXECUTIVO

O CRIVET 2.0 é uma calculadora de infusão contínua (CRI) para veterinária, com sistema de alertas clínicos e perfis completos de fármacos. O app está funcional, mas apresenta **complexidade desnecessária**, **duplicação de dados** e **falta de organização** que dificultam manutenção e escalabilidade.

### Status Geral
- ✅ **Funcional:** App funciona e calcula corretamente
- ⚠️ **Complexo:** Múltiplos sistemas paralelos para mesma funcionalidade
- ⚠️ **Desorganizado:** Dados espalhados em vários formatos
- ❌ **Inconsistente:** Alguns fármacos têm perfis completos, outros não

---

## 🏗️ ARQUITETURA ATUAL

### 1. Estrutura de Diretórios

```
modules/crivet/
├── alerts/              # Sistema de alertas (2 sistemas paralelos!)
│   ├── engine.ts
│   ├── adapters.ts
│   └── rules/           # Regras por categoria
├── components/          # Componentes React
│   ├── InfusionCalculator.tsx  # ⚠️ 963 linhas (MUITO GRANDE)
│   ├── DrugSelector.tsx
│   ├── PatientBlock.tsx
│   └── ...
├── data/
│   ├── drugs.ts        # Lista principal de fármacos
│   └── drugs/          # Dados por fármaco (44 arquivos!)
│       ├── *.profile.ts    # Perfis completos
│       ├── *.ts            # Dados básicos (indicatedDoses, recommendedUnit)
│       ├── *.compat.ts     # Compatibilidade
│       └── *.presets.ts    # Presets clínicos
├── engine/               # Lógica de cálculo
│   ├── calculateCRI.ts
│   ├── conversions.ts
│   └── alerts.ts        # ⚠️ Duplicado com alerts/
├── logic/
│   └── alerts/          # ⚠️ Sistema de alertas HARDCODED (legado)
├── models/
│   └── normalizedDrug.ts
├── services/
│   ├── normalizeDrug.ts
│   └── clinicalLint.ts
├── types/               # TypeScript types
├── utils/               # Utilitários
└── pages/
    └── CrivetPage.tsx   # Página principal
```

### 2. Fluxo de Dados

```
CrivetPage (estado global)
    ↓
PatientBlock → species, weight, physiology, comorbidities
    ↓
DrugSelector → selectedDrug
    ↓
InfusionCalculator
    ├── Busca dados básicos em drugs.ts
    ├── Busca perfil completo em drugProfileRegistry.ts
    ├── Calcula infusão (engine/calculateCRI.ts)
    ├── Gera alertas (2 sistemas diferentes!)
    └── Exibe resultados
```

**Problema:** Múltiplas fontes de verdade para os mesmos dados.

---

## 💾 ESTRUTURA DE DADOS (BANCO DE DADOS)

### 1. Sistema de Dados Atual

O CRIVET usa **3 sistemas paralelos** para armazenar dados de fármacos:

#### A) `drugs.ts` - Lista Principal (Fonte Primária)
```typescript
interface Drug {
  id: string
  name: string
  category: DrugCategory
  hasCRI: boolean
  concentrations: number[]
  compatibility: DrugCompatibility
  recommendedUnit?: string
  recommendedUnitWhy?: string[]
  indicatedDoses?: IndicatedDose[]
}
```

**Status:** ✅ Funcional, mas incompleto  
**Problema:** Muitos fármacos sem `indicatedDoses` ou `recommendedUnit`

#### B) `drugProfileRegistry.ts` - Perfis Completos
```typescript
const DRUG_PROFILE_REGISTRY: Record<string, Partial<DrugProfile>> = {
  cetamina: ketamineProfile,
  fentanil: fentanylProfile,
  // ... apenas 12 fármacos têm perfil completo
}
```

**Status:** ⚠️ Incompleto (apenas 12/30+ fármacos)  
**Problema:** Sistema robusto mas subutilizado

#### C) Arquivos Individuais (`drugs/*.ts`)
- `fentanyl.ts` - indicatedDoses, recommendedUnit
- `fentanyl.profile.ts` - perfil completo
- `fentanyl.compat.ts` - compatibilidade
- `fentanyl.presets.ts` - presets

**Status:** ⚠️ Desorganizado  
**Problema:** Dados espalhados em múltiplos arquivos

### 2. Estatísticas de Dados

| Categoria | Total | Com Perfil Completo | Com IndicatedDoses | Com RecommendedUnit |
|-----------|-------|---------------------|-------------------|---------------------|
| Analgésicos | 9 | 7 | 7 | 7 |
| Cardiovasculares | 9 | 2 | 2 | 2 |
| Antimicrobianos | 6 | 0 | 0 | 0 |
| Outros | 6 | 3 | 3 | 3 |
| **TOTAL** | **30** | **12 (40%)** | **12 (40%)** | **12 (40%)** |

### 3. Problemas Identificados no Banco de Dados

1. **Duplicação de Dados:**
   - Compatibilidade em `drugs.ts` E `*.compat.ts` E `*.profile.ts`
   - Doses em `drugs.ts` E `*.ts` E `*.profile.ts`

2. **Inconsistência:**
   - Alguns fármacos têm tudo, outros não têm nada
   - Formato de dados varia entre fármacos

3. **Falta de Normalização:**
   - Dados não seguem um padrão único
   - Múltiplas fontes de verdade

4. **Sistema de Alertas Duplicado:**
   - `engine/alerts.ts` (hardcoded, legado)
   - `logic/alerts/*Rules.ts` (hardcoded, legado)
   - `alerts/rules/` (novo sistema)
   - `DrugProfile.alerts_by_comorbidity` (não usado ainda!)

---

## 🧩 COMPONENTES PRINCIPAIS

### 1. `InfusionCalculator.tsx` (963 linhas)

**Problemas:**
- ❌ **Muito grande:** 963 linhas em um único componente
- ❌ **Múltiplas responsabilidades:** Cálculo, UI, validação, alertas
- ❌ **Estado complexo:** 10+ estados diferentes
- ❌ **Lógica misturada:** Cálculos matemáticos + lógica de negócio + UI

**Responsabilidades atuais:**
1. Gerenciar estado de inputs
2. Calcular infusão direta
3. Calcular preparo (seringa/bolsa)
4. Validar inputs
5. Gerar alertas clínicos
6. Exibir resultados
7. Gerenciar modais
8. Exibir tabelas especiais (insulina)

**Sugestão:** Quebrar em componentes menores:
- `DoseInput.tsx`
- `ConcentrationSelector.tsx`
- `InfusionModeSelector.tsx`
- `DirectInfusionResult.tsx`
- `PreparationResult.tsx`
- `ClinicalAlertsPanel.tsx`

### 2. `DrugSelector.tsx`

**Status:** ✅ Bem estruturado  
**Problema:** Busca apenas por nome, não por categoria ou indicação

### 3. `PatientBlock.tsx`

**Status:** ✅ Simples e funcional  
**Problema:** Comorbidades limitadas (apenas 4 opções)

---

## 🔄 SISTEMA DE ALERTAS (PROBLEMA CRÍTICO)

### Situação Atual: 3 Sistemas Paralelos

#### Sistema 1: `engine/alerts.ts` (Legado)
```typescript
export function getClinicalAlerts(
  drugId: string,
  species: Species,
  physiology: PhysiologyState,
  comorbidities: Comorbidity[]
): ClinicalAlert[]
```
- Hardcoded para alguns fármacos
- Não escalável
- Mantido para compatibilidade

#### Sistema 2: `logic/alerts/*Rules.ts` (Legado)
```typescript
export const METOCLOPRAMIDE_RULES: DrugRule[] = [
  { drugId: 'metoclopramida', when: ['renopata'], alert: {...} }
]
```
- Hardcoded por fármaco
- Usado pelo `evaluateDrugAlerts()`
- **Este é o sistema que o app usa atualmente**

#### Sistema 3: `DrugProfile.alerts_by_comorbidity` (Novo, não usado)
```typescript
alerts_by_comorbidity: [
  { key: 'maropitant_hepatopathy', level: 'WARNING', ... }
]
```
- Estruturado no perfil do fármaco
- **NÃO ESTÁ SENDO USADO PELO APP**
- Sistema mais escalável, mas ignorado

**Problema:** Sistema novo existe mas não é usado. App ainda depende de arquivos hardcoded.

---

## 🎨 UX/UI - PROBLEMAS IDENTIFICADOS

### 1. Complexidade Visual

- **Muitos campos:** Usuário precisa preencher muitos inputs
- **Informações escondidas:** Doses indicadas só aparecem se condições específicas
- **Alertas dispersos:** Alertas aparecem em vários lugares

### 2. Fluxo de Uso

**Fluxo atual:**
1. Selecionar paciente (espécie, peso, fisiologia, comorbidades)
2. Selecionar fármaco
3. Preencher dose, unidade, concentração
4. Escolher modo (direta/preparo)
5. Se preparo: escolher tipo, volume, fluido, taxa
6. Ver resultados

**Problemas:**
- Muitos passos
- Informações importantes (doses indicadas) aparecem tarde
- Tabela de insulina só aparece em condições específicas

### 3. Feedback Visual

- ✅ Alertas bem destacados
- ⚠️ Doses indicadas poderiam ser mais visíveis
- ❌ Falta feedback quando dados estão incompletos

---

## 🐛 BUGS E PROBLEMAS TÉCNICOS

### 1. Dados Incompletos

- **30 fármacos** no total
- **Apenas 12** têm perfis completos
- **Apenas 12** têm indicatedDoses
- **18 fármacos** sem dados adequados

### 2. Inconsistências

- Alguns fármacos usam `recommendedUnit`, outros não
- Compatibilidade em formatos diferentes
- Alertas em sistemas diferentes

### 3. Performance

- `InfusionCalculator` re-renderiza muito (963 linhas)
- Múltiplas buscas em registries
- Cache de validação ajuda, mas não resolve tudo

---

## 💡 SUGESTÕES DE MELHORIA

### 🔴 PRIORIDADE ALTA

#### 1. Unificar Sistema de Dados
**Problema:** 3 sistemas paralelos  
**Solução:**
- Usar `DrugProfile` como fonte única de verdade
- Migrar todos os dados para perfis completos
- Remover arquivos duplicados (`*.compat.ts`, `*.presets.ts`)
- Consolidar tudo em `*.profile.ts`

**Benefícios:**
- Uma única fonte de verdade
- Mais fácil de manter
- Consistência garantida

#### 2. Unificar Sistema de Alertas
**Problema:** 3 sistemas, app usa o legado  
**Solução:**
- Migrar `logic/alerts/*Rules.ts` para `DrugProfile.alerts_by_comorbidity`
- Atualizar `evaluateDrugAlerts()` para ler do perfil
- Remover sistemas legados

**Benefícios:**
- Dados estruturados no perfil
- Mais fácil adicionar novos fármacos
- Consistência

#### 3. Completar Dados dos Fármacos
**Problema:** 18 fármacos sem dados  
**Solução:**
- Criar perfis completos para todos os fármacos
- Adicionar `indicatedDoses` para todos
- Adicionar `recommendedUnit` para todos

**Prioridade:**
1. Fármacos mais usados primeiro
2. Fármacos sem nenhum dado
3. Fármacos com dados parciais

#### 4. Refatorar `InfusionCalculator`
**Problema:** 963 linhas, múltiplas responsabilidades  
**Solução:**
```
InfusionCalculator.tsx (orquestrador)
├── DoseInputSection.tsx
├── ConcentrationSection.tsx
├── ModeSelector.tsx
├── DirectInfusionPanel.tsx
├── PreparationPanel.tsx
│   ├── VehicleSelector.tsx
│   ├── FluidSelector.tsx
│   └── InsulinProtocolTable.tsx (se insulina)
├── ResultsPanel.tsx
└── AlertsPanel.tsx
```

**Benefícios:**
- Código mais fácil de manter
- Componentes reutilizáveis
- Testes mais fáceis

### 🟡 PRIORIDADE MÉDIA

#### 5. Melhorar UX
- **Doses indicadas sempre visíveis:** Não depender de condições
- **Wizard/Guia:** Para novos usuários
- **Presets visíveis:** Mostrar presets clínicos de forma mais proeminente
- **Feedback imediato:** Mostrar se dados estão incompletos

#### 6. Adicionar Funcionalidades
- **Histórico de cálculos:** Salvar cálculos anteriores
- **Exportar PDF:** Gerar prescrição
- **Comparar fármacos:** Comparar doses de diferentes fármacos
- **Modo escuro melhorado:** Melhorar contraste

#### 7. Validação e Testes
- **Testes unitários:** Para funções de cálculo
- **Testes de integração:** Para fluxo completo
- **Validação de dados:** Verificar consistência dos perfis

### 🟢 PRIORIDADE BAIXA

#### 8. Documentação
- **Guia do desenvolvedor:** Como adicionar novos fármacos
- **Guia do usuário:** Como usar o app
- **Documentação de API:** Se houver backend no futuro

#### 9. Performance
- **Lazy loading:** Carregar perfis sob demanda
- **Memoização:** Melhorar re-renders
- **Code splitting:** Separar por rotas

#### 10. Internacionalização
- **Suporte a inglês:** Traduzir interface
- **Unidades:** Suportar unidades imperiais

---

## 📊 MÉTRICAS E ESTATÍSTICAS

### Código
- **Total de arquivos TypeScript:** 103
- **Linhas de código:** ~15.000+ (estimado)
- **Componentes React:** 14
- **Fármacos cadastrados:** 30
- **Fármacos com perfil completo:** 12 (40%)

### Complexidade
- **Componente mais complexo:** `InfusionCalculator.tsx` (963 linhas)
- **Sistemas de alertas:** 3 (duplicação)
- **Formatos de dados:** 3+ (inconsistência)

---

## 🎯 PLANO DE AÇÃO RECOMENDADO

### Fase 1: Consolidação (2-3 semanas)
1. ✅ Unificar sistema de dados (usar apenas DrugProfile)
2. ✅ Migrar alertas para DrugProfile
3. ✅ Completar dados dos 18 fármacos faltantes

### Fase 2: Refatoração (2-3 semanas)
4. ✅ Quebrar InfusionCalculator em componentes menores
5. ✅ Remover código legado
6. ✅ Adicionar testes

### Fase 3: Melhorias (1-2 semanas)
7. ✅ Melhorar UX
8. ✅ Adicionar funcionalidades essenciais
9. ✅ Documentação

---

## 📝 CONCLUSÃO

O CRIVET 2.0 é **funcional e útil**, mas sofre de:
- **Complexidade desnecessária** (múltiplos sistemas para mesma coisa)
- **Dados incompletos** (40% dos fármacos sem perfil completo)
- **Código difícil de manter** (componente gigante, dados espalhados)

**Recomendação:** Focar em **consolidação e simplificação** antes de adicionar novas funcionalidades.

**Prioridade:** Completar dados dos fármacos e unificar sistemas de dados/alertas.

---

## 🔍 CHECKLIST DE VERIFICAÇÃO

### Dados
- [ ] Todos os fármacos têm perfil completo?
- [ ] Todos têm indicatedDoses?
- [ ] Todos têm recommendedUnit?
- [ ] Compatibilidade unificada?
- [ ] Alertas unificados?

### Código
- [ ] InfusionCalculator refatorado?
- [ ] Código legado removido?
- [ ] Testes adicionados?
- [ ] Documentação atualizada?

### UX
- [ ] Fluxo simplificado?
- [ ] Doses indicadas sempre visíveis?
- [ ] Feedback adequado?
- [ ] Performance otimizada?

---

**Relatório gerado em:** 2025-01-17  
**Próxima revisão recomendada:** Após implementação das melhorias de prioridade alta
