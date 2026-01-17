# 📋 CHECKLIST COMPLETO DE INFORMAÇÕES NECESSÁRIAS PARA CADA FÁRMACO

**Objetivo:** Este documento lista TODAS as informações necessárias para criar um perfil completo de fármaco no CRIVET 2.0, baseado na estrutura `DrugProfile`.

**Uso:** Use esta lista como guia para pesquisar e fornecer todas as informações de cada fármaco.

---

## 📊 FÁRMACOS NO SISTEMA (32 total)

### ✅ Fármacos COM perfil completo (13):
1. Fentanil (citrato)
2. Remifentanil
3. Cetamina
4. Dexmedetomidina
5. Lidocaína
6. Dobutamina
7. Norepinefrina
8. Propofol
9. Metadona
10. Insulina Regular
11. Metoclopramida
12. Maropitant
13. Efedrina

### ⚠️ Fármacos SEM perfil completo (19):
1. Morfina
2. Butorfanol
3. Dopamina
4. Nitroprussiato
5. Diltiazem
6. Esmolol
7. Vasopressina
8. Ceftriaxona
9. Meropenem
10. Enrofloxacina
11. Cefalexina
12. Clindamicina
13. Metronidazol
14. Rocurônio
15. MLK (Infusão Combinada)
16. FLK (Infusão Combinada)
17. Midazolam (não está na lista principal mas tem arquivos)

---

## 🗂️ ESTRUTURA COMPLETA DO PERFIL (17 Seções)

### 🔷 SEÇÃO 1: IDENTIDADE BÁSICA (Obrigatória)

```typescript
{
  drug_id: string              // Ex: "fentanil", "remifentanil"
  name_pt: string              // Ex: "Fentanil (citrato)"
  name_en: string              // Ex: "Fentanyl (citrate)"
  synonyms?: string[]          // Nomes comerciais, variações
  class: string[]              // Classes farmacológicas: ["Opioide sintético", "Analgésico"]
  taglines?: string[]          // 2-5 frases curtas destacadas
  status?: string              // "first_line" | "second_line" | "rescue" | "avoid"
  legal_control?: string       // Requisitos legais (controlado, etc)
}
```

**📝 Informações necessárias:**
- [ ] Nome em português
- [ ] Nome em inglês
- [ ] Sinônimos/nomes comerciais
- [ ] Classes farmacológicas
- [ ] Taglines (frases curtas importantes)
- [ ] Status de linha de uso
- [ ] Controle legal (se aplicável)

---

### 🔷 SEÇÃO 2: CONCEITOS CORE - MECANISMO DE AÇÃO (Obrigatória)

```typescript
core_concepts: {
  taglines: string[]                    // Frases curtas (repetido de identidade)
  mechanism?: {
    receptors_targets?: string[]        // Ex: ["μ-opioide", "κ-opioide"]
    primary_effects?: {
      cardiovascular?: string
      respiratory?: string
      cns?: string
      renal_hepatic?: string
      gi?: string
    }
    clinical_metaphor?: string          // "ralo", "tanque", "filtro"
  }
  pharmacodynamics?: {
    onset_iv?: string                   // Ex: "1-2 min"
    onset_im?: string
    peak?: string                       // Ex: "3-5 min"
    duration?: string                   // Ex: "30-60 min"
    dependencies?: string[]             // ["catecolaminas", "volume"]
  }
  pharmacokinetics?: {
    metabolism?: string                 // "Hepático (CYP3A4)"
    excretion?: string                  // "Renal (70%)"
    dog_vs_cat?: string                 // Diferenças entre espécies
    accumulation?: string               // Risco de acúmulo
    active_metabolites?: string         // Metabólitos ativos
  }
  formulation_notes?: {
    stability?: string                  // pH, oxidação, luz
    equipment_adsorption?: string       // Adsorção em equipos
  }
}
```

**📝 Informações necessárias:**
- [ ] Receptores/alvos moleculares
- [ ] Efeitos primários (CV, respiratório, SNC, renal/hepático, GI)
- [ ] Metáfora clínica (se aplicável)
- [ ] Tempo de início IV/IM
- [ ] Pico de ação
- [ ] Duração de efeito
- [ ] Dependências (volume, ventilação, etc)
- [ ] Metabolismo
- [ ] Excreção
- [ ] Diferenças cão vs gato
- [ ] Risco de acúmulo
- [ ] Metabólitos ativos
- [ ] Estabilidade (pH, luz, oxidação)
- [ ] Adsorção em equipos

---

### 🔷 SEÇÃO 3: NOTAS POR ESPÉCIE (Opcional)

```typescript
species_notes?: {
  dogs?: {
    key_point?: string
    high_risk_notes?: string[]
    metabolism_excretion?: string
  }
  cats?: {
    key_point?: string
    high_risk_notes?: string[]
    metabolism_excretion?: string
  }
}
```

**📝 Informações necessárias:**
- [ ] Pontos-chave específicos para cães
- [ ] Pontos-chave específicos para gatos
- [ ] Notas de alto risco por espécie
- [ ] Diferenças de metabolismo/excreção por espécie

---

### 🔷 SEÇÃO 4: INDICAÇÕES E CONTRAINDICAÇÕES (Opcional)

```typescript
indications?: {
  primary?: string[]              // Indicações principais
  secondary?: string[]            // Indicações secundárias
  off_label_notes?: string[]      // Uso off-label
}

contraindications?: {
  absolute: [                    // Contraindicações absolutas
    {
      condition: string          // "Hipersensibilidade"
      why: string
      level?: "CRITICAL" | "WARNING"
    }
  ]
  relative: [                    // Contraindicações relativas
    {
      condition: string
      why: string
      level?: "WARNING" | "MONITOR"
    }
  ]
}
```

**📝 Informações necessárias:**
- [ ] Indicações principais
- [ ] Indicações secundárias
- [ ] Uso off-label
- [ ] Contraindicações absolutas (com razão)
- [ ] Contraindicações relativas (com razão)

---

### 🔷 SEÇÃO 5: DOSES (Obrigatória)

```typescript
doses: {
  unit_standard_cri: string      // "mcg/kg/min" | "mg/kg/h" | "U/kg/h"
  unit_display_override?: {      // Opcional: mostrar unidade diferente
    show_as: string
    hide_units: string[]
  }
  dog: {
    bolus?: {
      mgkg?: { min: number, max: number, note?: string }
      mcgkg?: { min: number, max: number, note?: string }
      ukg?: { min: number, max: number, note?: string }
      route?: "IV" | "IM" | "SC" | "PO"
      loading_dose?: { min: number, max: number, note?: string }
    }
    cri?: {
      mcgkgmin?: { min: number, max: number, note?: string }
      mgkgh?: { min: number, max: number, note?: string }
      u_kg_h?: { min: number, max: number, note?: string }
      titration?: {
        increment: string        // "0,5 mcg/kg/min"
        interval: string         // "a cada 15-30 min"
      }
      maintenance?: { min: number, max: number }
      rescue?: { min: number, max: number }
      max?: number               // Dose máxima absoluta
    }
    adjustments?: {
      obesity?: string
      shock?: string
      hypoalbuminemia?: string
      comorbidities?: string
    }
    therapeutic_targets?: {
      target_map?: string
      target_etco2?: string
      analgesia_scale?: string
      sedation_target?: string
    }
  }
  cat: {                         // Mesma estrutura para gatos
    // ... igual ao dog
  }
}
```

**📝 Informações necessárias:**
- [ ] Unidade padrão para CRI
- [ ] **Doses CRI cão:**
  - [ ] Faixa mcg/kg/min (min, max, nota)
  - [ ] Faixa mg/kg/h (min, max, nota)
  - [ ] Faixa U/kg/h (se aplicável)
  - [ ] Regras de titulação
  - [ ] Dose de manutenção
  - [ ] Dose de resgate
  - [ ] Dose máxima
- [ ] **Doses Bolus cão:**
  - [ ] Faixa mg/kg (min, max, nota)
  - [ ] Faixa mcg/kg (min, max, nota)
  - [ ] Via de administração
  - [ ] Dose de ataque/loading
- [ ] **Ajustes de dose cão:**
  - [ ] Obesidade
  - [ ] Choque
  - [ ] Hipoalbuminemia
  - [ ] Comorbidades
- [ ] **Alvos terapêuticos cão:**
  - [ ] PAM alvo
  - [ ] ETCO2 alvo
  - [ ] Escala de analgesia
  - [ ] Alvo de sedação
- [ ] **Mesmo para gatos:** todas as doses acima adaptadas

**🎯 Doses Indicadas (IndicatedDoses) - para UI:**
```typescript
indicatedDoses: [
  {
    mode: "CRI" | "BOLUS"
    species: "cao" | "gato" | "ambos"
    unit: "mcg/kg/min" | "mcg/kg/h" | "mg/kg/h" | "U/kg/h" | "U/kg/min"
    range: { min: number, max: number }
    purpose: string              // "Analgesia", "Sedação", "Anestesia (ventilado)"
    note?: string                // Explicação da fisiologia por trás da dose
  }
]
```

**📝 Informações necessárias:**
- [ ] Lista de doses indicadas por:
  - Modo (CRI ou Bolus)
  - Espécie (cão, gato, ambos)
  - Finalidade clínica (analgesia, sedação, etc)
  - Faixa de dose
  - **Nota fisiológica** explicando POR QUE essa dose (MUITO IMPORTANTE!)

---

### 🔷 SEÇÃO 6: APRESENTAÇÕES (Obrigatória)

```typescript
presentations: [
  {
    concentration_mg_ml?: number
    concentration_mcg_ml?: number
    concentration_percent?: number
    volume_ml?: number
    total_mg?: number
    label: string               // "Frasco 10 mL - 0,05 mg/mL"
    examples?: string[]         // Nomes comerciais
    concentration_trap_warning?: string  // "Pegadinha" de concentração
  }
]
```

**📝 Informações necessárias:**
- [ ] Todas as concentrações comerciais disponíveis
- [ ] Volumes disponíveis
- [ ] Nomes comerciais/exemplos
- [ ] Avisos sobre "pegadinhas" de concentração

---

### 🔷 SEÇÃO 7: DILUIÇÃO E PREPARO (Obrigatória)

```typescript
dilution_and_preparation: {
  hard_rules: string[]          // Regras obrigatórias
  recommended_targets: [
    {
      target_mg_ml: number
      use_cases: string[]       // Quando usar essa diluição
      how_to_make: string       // Como preparar
      recipe?: string           // "1 mL + 99 mL = 0,5 mg/mL"
    }
  ]
  diluents_allowed: string[]    // ["NaCl 0,9%", "Ringer Lactato"]
  preferred_diluent?: {
    diluent: string
    why: string
  }
  stability?: [
    {
      diluent: string
      max_time_hours?: number
      light_protection?: boolean
      syringe_bag_change?: string
    }
  ]
  dedicated_line_required?: boolean
  dedicated_line_why?: string
}
```

**📝 Informações necessárias:**
- [ ] Regras obrigatórias de diluição
- [ ] Diluições recomendadas e quando usar
- [ ] Como preparar cada diluição (fórmulas)
- [ ] Diluentes permitidos
- [ ] Diluente preferido (e por quê)
- [ ] Estabilidade por diluente (tempo, luz)
- [ ] Precisa linha dedicada? Por quê?

---

### 🔷 SEÇÃO 8: COMPATIBILIDADE (Obrigatória)

```typescript
compatibility: {
  compatible_in_syringe_or_bag?: string[]    // Compatível em seringa/bolsa
  compatible_y_site_only?: string[]          // Só compatível em Y-site
  incompatible?: [
    {
      agent: string           // Nome do fármaco/agente
      why: string             // Razão da incompatibilidade
      risk?: string           // "precipitação" | "inativação" | "adsorção"
    }
  ]
  dedicated_line_rules?: string[]
}
```

**📝 Informações necessárias:**
- [ ] Fármacos compatíveis em seringa/bolsa
- [ ] Fármacos compatíveis apenas em Y-site
- [ ] Fármacos incompatíveis (com razão e risco)
- [ ] Regras de linha dedicada

**⚠️ CRÍTICO:** Esta seção NUNCA deve estar vazia - sempre deve ter pelo menos diluentes permitidos.

---

### 🔷 SEÇÃO 9: ADMINISTRAÇÃO E TITULAÇÃO (Opcional)

```typescript
administration_and_titration?: {
  bolus_guidance?: string[]           // Como dar bolus (velocidade, tempo)
  titration_rules?: string[]          // Como titular (quanto subir/descer, quando)
  monitoring_minimum?: string[]       // Monitoramento mínimo (ECG, PAM, lactato)
  endpoints?: {
    desired_effect?: string[]         // Sinais de efeito desejado
    toxicity_signs?: string[]         // Sinais de toxicidade
  }
  therapeutic_failure?: {
    check_first?: string[]            // O que verificar primeiro
    common_causes?: string[]          // Causas comuns de falha
    when_to_change?: string[]         // Quando trocar de fármaco
  }
}
```

**📝 Informações necessárias:**
- [ ] Orientações para bolus (velocidade, tempo mínimo)
- [ ] Regras de titulação (quanto aumentar/diminuir, intervalo)
- [ ] Monitoramento mínimo necessário
- [ ] Sinais de efeito desejado
- [ ] Sinais de toxicidade
- [ ] O que verificar em caso de falha terapêutica
- [ ] Causas comuns de falha
- [ ] Quando considerar trocar de fármaco

---

### 🔷 SEÇÃO 10: EFEITOS ADVERSOS E TOXICIDADE (Opcional)

```typescript
adverse_effects_and_toxicity?: {
  common?: string[]              // Efeitos adversos comuns
  serious?: string[]             // Efeitos adversos graves
  subdose_signs?: string[]       // Sinais de subdose
  overdose_signs?: string[]      // Sinais de superdose
  management?: string[]          // Como gerenciar (reduzir, antídoto, suporte)
  special_events?: [
    {
      event: string              // "extravasamento", "necrose", "disforia"
      management: string
    }
  ]
}
```

**📝 Informações necessárias:**
- [ ] Efeitos adversos comuns
- [ ] Efeitos adversos graves
- [ ] Sinais de subdose
- [ ] Sinais de superdose/intoxicação
- [ ] Manejo de efeitos adversos
- [ ] Eventos especiais (extravasamento, etc) e manejo

---

### 🔷 SEÇÃO 11: ALERTAS POR COMORBIDADE (Opcional)

```typescript
alerts_by_comorbidity?: [
  {
    key: string                  // "hcm_feline", "ckd", "hepatic_shunt"
    level: "SAFE" | "MONITOR" | "WARNING" | "CRITICAL" | "BLOCK"
    title: string                // "Hepatopatia × Fentanil"
    why: string                  // Explicação
    action: string[]             // O que fazer
    dose_adjustment?: {
      reduce_percent?: number
      avoid_bolus?: boolean
      require_central_line?: boolean
      require_monitoring?: string[]
      suggest_alternative?: string
    }
  }
]
```

**📝 Informações necessárias:**
- [ ] Alertas para cada comorbidade relevante:
  - Hepatopatia
  - Renopatia/CKD
  - Cardiopatia
  - Endocrinopatias (Diabetes, Addison)
  - Shunt hepático
  - Neonato/Filhote
  - Geriátrico
  - Sepse
  - TCE/PIC
  - Glaucoma
  - Convulsão não controlada
- [ ] Para cada comorbidade:
  - Nível de alerta
  - Por que é um problema
  - Ações recomendadas
  - Ajuste de dose (se necessário)
  - Alternativas sugeridas

---

### 🔷 SEÇÃO 12: PRESETS (Opcional)

```typescript
presets?: [
  {
    id: string                   // "analgesia_leve"
    label: string                // "Analgesia Leve"
    dose_mcgkgmin?: number
    dose_mgkg?: number
    dose_mgkgh?: number
    limits?: {
      min?: number
      max?: number
    }
    clinical_target?: string     // "Sedação leve, paciente estável"
    linked_alerts?: string[]     // Alertas relacionados
  }
]
```

**📝 Informações necessárias:**
- [ ] Presets clínicos comuns:
  - Analgesia leve/moderada/intensa
  - Sedação leve/moderada/intensa
  - Anestesia
  - CRI de manutenção
  - Dose de resgate
- [ ] Para cada preset:
  - Dose recomendada
  - Limites (min/max)
  - Alvo clínico
  - Alertas relacionados

---

### 🔷 SEÇÃO 13: TEMPLATES DE CÁLCULO (Opcional)

```typescript
calculation_templates?: {
  cri?: {
    required_inputs: string[]
    algorithm: string[]
    conversions?: string[]
    hard_safety_checks?: [...]
    soft_safety_checks?: [...]
    outputs?: string[]
    error_cost?: string
  }
  bolus?: { ... }
  dilution_builder?: { ... }
}
```

**📝 Informações necessárias:**
- [ ] Algoritmo de cálculo para CRI
- [ ] Algoritmo de cálculo para Bolus
- [ ] Conversões de unidade necessárias
- [ ] Checks de segurança (hard e soft)
- [ ] O que pode dar errado no cálculo

---

### 🔷 SEÇÃO 14: BLOCO DIDÁTICO (Opcional)

```typescript
how_we_got_here_block?: {
  title: string
  render_steps: [
    {
      step: number
      label: string
      formula: string
    }
  ]
  interpretation_rules?: string[]
  example?: {
    scenario: string
    calculation: string[]
    result: string
  }
}
```

**📝 Informações necessárias:**
- [ ] Passo a passo do cálculo
- [ ] Fórmulas usadas
- [ ] Regras de interpretação
- [ ] Exemplo prático completo

---

### 🔷 SEÇÃO 15: INTEGRAÇÕES DE PROTOCOLO (Opcional)

```typescript
protocol_integrations?: {
  enabled: boolean
  protocols?: string[]           // ["MLK", "neuroanestesia"]
  rules?: [
    {
      if: string
      then: {
        action: "REMOVE_DRUG" | "REDUCE_DOSE" | "PREFER_ALTERNATIVE"
        drug_id?: string
        factor?: number
        message: string
      }
    }
  ]
  why_combo_exists?: string
}
```

**📝 Informações necessárias:**
- [ ] Se integra em protocolos (MLK, FLK, etc)
- [ ] Regras de integração
- [ ] Por que a combinação existe

---

### 🔷 SEÇÃO 16: FLUXOGRAMAS CLÍNICOS (Opcional)

```typescript
clinical_flowcharts?: {
  format: "mermaid" | "steps"
  flows: [
    {
      id: string
      title: string
      mermaid?: string
      steps?: [...]
    }
  ]
}
```

**📝 Informações necessárias:**
- [ ] Fluxogramas de decisão clínica
- [ ] Algoritmos de manejo

---

### 🔷 SEÇÃO 17: UI COPY E MENSAGENS (Opcional)

```typescript
ui_copy?: {
  critical_warning_banner?: string    // Mensagem crítica no topo
  alert_messages?: {
    short?: string                    // Alerta curto
    long?: string                     // Alerta longo
  }
  block_message?: string              // Mensagem de bloqueio
  common_errors?: string[]            // Erros comuns
}
```

**📝 Informações necessárias:**
- [ ] Mensagens críticas para destacar
- [ ] Alertas curtos e longos
- [ ] Mensagem de bloqueio (se houver)
- [ ] Erros comuns que usuários fazem

---

### 🔷 SEÇÃO 18: REFERÊNCIAS (Opcional mas recomendado)

```typescript
references?: [
  {
    section: string              // "doses", "compatibility"
    source: string               // Livro, artigo
    page?: string
    edition?: string
    year?: number
    doi?: string
    internal_link?: string
  }
]
```

**📝 Informações necessárias:**
- [ ] Referências por seção
- [ ] Livros, artigos, guidelines
- [ ] Páginas, edições, anos
- [ ] DOIs ou links

---

## 🎯 CHECKLIST RESUMIDO POR FÁRMACO

Para cada fármaco, você precisa fornecer:

### ✅ OBRIGATÓRIO:
- [ ] Identidade (nome PT/EN, classe)
- [ ] Mecanismo de ação (receptores, efeitos)
- [ ] Farmacodinâmica (início, pico, duração)
- [ ] Farmacocinética (metabolismo, excreção)
- [ ] Doses CRI (cão e gato)
- [ ] Doses Bolus (cão e gato)
- [ ] Apresentações comerciais
- [ ] Diluição e preparo
- [ ] Compatibilidade (diluentes e fármacos)
- [ ] IndicatedDoses (com notas fisiológicas!)

### ⭐ RECOMENDADO:
- [ ] Indicações e contraindicações
- [ ] Administração e titulação
- [ ] Efeitos adversos
- [ ] Alertas por comorbidade
- [ ] Presets clínicos
- [ ] Referências

### 💡 OPCIONAL (mas útil):
- [ ] Templates de cálculo
- [ ] Bloco didático
- [ ] Fluxogramas
- [ ] UI copy
- [ ] Integrações de protocolo

---

## 📝 FORMATO SUGERIDO PARA FORNECER DADOS

Você pode fornecer os dados em:
1. **JSON estruturado** (igual ao schema TypeScript)
2. **Texto livre organizado** por seções
3. **Planilha/tabela** organizada

O importante é que tenha TODAS as informações acima, especialmente:
- **Doses com notas fisiológicas explicando POR QUE**
- **Compatibilidade completa (nunca deixar vazio)**
- **Alertas de comorbidades**

---

## 🚀 PRÓXIMOS PASSOS

1. Escolha um fármaco da lista de "SEM perfil completo"
2. Use este checklist para pesquisar todas as informações
3. Forneça os dados organizados por seção
4. Priorize: doses, compatibilidade, alertas de comorbidades

**⚠️ Lembre-se:** É melhor ter menos informações bem organizadas do que muitas informações desorganizadas. Comece com as seções obrigatórias e vá expandindo.
