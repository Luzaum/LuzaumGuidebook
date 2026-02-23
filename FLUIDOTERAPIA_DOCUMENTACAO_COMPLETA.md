# 📘 DOCUMENTAÇÃO COMPLETA — App de Fluidoterapia Veterinária
> **Arquivo fonte principal:** `Fluidoterapia.tsx` (raiz do projeto)
> **Página wrapper:** `pages/FluidoterapiaPage.tsx`
> **Propósito:** Calculadora clínica de fluidoterapia para cães e gatos. Combina cálculo de manutenção, reidratação, perdas ativas, bolus de ressuscitação e salina hipertônica, com guias clínicos por condição.

---

## 🏗️ ARQUITETURA GERAL DO COMPONENTE

```
FluidoterapiaPage.tsx
  └── <PageHeader title="Calculadora de Fluidoterapia" subtitle="..." />
  └── <Fluidoterapia onBack={() => navigate('/')} />
        ├── <Modal /> (conteúdo educacional de tooltip expandido)
        ├── Bloco 1: Seleção de Espécie (Cão / Gato)
        ├── Bloco 2: Dados do Paciente + Bloco 3: Plano de Fluidoterapia
        │     ├── [Coluna esquerda - INPUTS]
        │     └── [Coluna direita - OUTPUTS/RESULTADOS]
        ├── <Collapsible id="ressuscitacao"> Ressuscitação Volêmica
        ├── <Collapsible id="específicas"> Fluidos para Condições Específicas
        └── <Collapsible id="hipertonica"> Calculadora de Salina Hipertônica
```

---

## 🔢 CONSTANTES GLOBAIS

| Constante | Valor | Onde Usada |
|---|---|---|
| `DROPS_PER_ML_MACRO` | `20` gotas/mL | Cálculo de gotas/segundo em macroequipo |
| `SECONDS_PER_HOUR` | `3600` | Conversão de taxa mL/h → gotas/seg |

---

## 📦 ESTADO (useState) — Variáveis e Valores Padrão

| Estado | Tipo | Valor padrão | Descrição |
|---|---|---|---|
| `especie` | `string \| null` | `null` | `'cao'` ou `'gato'`. Determina ranges de bolus e libera o restante da UI |
| `peso` | `string` | `''` | Peso do paciente em kg. Entrada numérica livre |
| `estadoFisiologico` | `string` | `'adulto'` | Define range de taxa de manutenção |
| `taxaManutencao` | `string` | `'50'` | mL/kg/dia. Ajustado por slider conforme estado fisiológico |
| `incluirReidratacao` | `boolean` | `false` | Checkbox para habilitar campo de desidratação |
| `desidratação` | `string` | `'0'` | Fração decimal (ex: `'0.08'` = 8%). Select com opções de 5% a 12% |
| `tempoReidratacao` | `string` | `'12'` | Horas para repor o déficit. Select: 8, 12, 18, 24h |
| `incluirPerdas` | `boolean` | `false` | Checkbox para habilitar campo de perdas ativas |
| `perdas` | `string` | `''` | mL/dia de perdas estimadas (vômito, diarreia etc.) |
| `comorbidade` | `string` | `'nenhuma'` | Para painel de ressuscitação: `nenhuma`, `saudavel`, `cardiopata`, `renal`, `hipoalbuminemia` |
| `condicaoEspecial` | `string` | `'nenhuma'` | Para painel de condições: `dka`, `tce`, `diarreia_hipercloremica`, `vomito_alcalose` |
| `taxaBolus` | `string` | `'15'` (cão) / `'7'` (gato) | mL/kg do bolus. Slider dentro da collapsible de ressuscitação |
| `tempoBolus` | `string` | `'20'` | Minutos para infundir o bolus. Select: 15, 20, 30 |
| `targetHipertonica` | `string` | `'3'` | Concentração alvo da salina: `'3'` ou `'7.5'` |
| `baseHipertonica` | `string` | `'250'` | Volume da bolsa base de NaCl 0.9%: `'250'`, `'500'`, `'flaconete'` |
| `doseHipertonica` | `string` | `'4'` | Dose em mL/kg. Slider de 2 a 5, passo 0.5 |
| `activeModal` | `string \| null` | `null` | ID do modal aberto atualmente |
| `collapsibles` | `object` | `{ressuscitacao: false, específicas: false, hipertonica: false}` | Estado aberto/fechado das 3 seções expansíveis |

---

## ⚙️ ENGINE DE CÁLCULO (useMemo)

### 1. `manutencaoRange` — Range do Slider de Manutenção

**Determina os limites mínimo/máximo do slider de Taxa de Manutenção com base no estado fisiológico.**

```
estadoFisiologico === 'filhote'  → { min: 80, max: 120 }  mL/kg/dia
estadoFisiologico === 'idoso'    → { min: 30, max: 50  }  mL/kg/dia
estadoFisiologico === 'gestante' → { min: 60, max: 90  }  mL/kg/dia
estadoFisiologico === 'obeso'    → { min: 30, max: 50  }  mL/kg/dia
default ('adulto')               → { min: 40, max: 60  }  mL/kg/dia
```

> **useEffect associado:** Quando o range muda e o valor atual de `taxaManutencao` cai fora do novo range, ele é automaticamente resetado para a média: `Math.round((min + max) / 2)`.

---

### 2. `results` — Cálculos Principais

**Dependências:** `peso`, `taxaManutencao`, `incluirReidratacao`, `desidratação`, `incluirPerdas`, `perdas`, `taxaBolus`, `tempoBolus`

```
p = parseFloat(peso)
if (isNaN(p) || p <= 0) → retorna null (nada é exibido)

// --- MANUTENÇÃO ---
vManutencao = p × taxaManutencao
// Exemplo: 10 kg × 50 mL/kg/dia = 500 mL/24h

// --- REIDRATAÇÃO ---
vReidratacao = 0
if (incluirReidratacao && desidratação > 0):
    vReidratacao = p × desidratação × 1000
// Exemplo: 10 kg × 0.08 × 1000 = 800 mL

// --- PERDAS ATIVAS ---
vPerdas = 0
if (incluirPerdas && perdas > 0):
    vPerdas = parseFloat(perdas)
// Valor direto em mL

// --- TOTAL ---
vTotal = vManutencao + vReidratacao + vPerdas

// --- BOLUS ---
vBolus = p × taxaBolus
// Exemplo: 10 kg × 15 mL/kg = 150 mL

taxaInfusaoBolus = vBolus / (tempoBolus / 60)
// Converte minutos para horas → taxa em mL/h
// Exemplo: 150 mL / (20min / 60) = 150 / 0.333 = 450 mL/h
```

**Retorno do objeto `results`:**
| Campo | Unidade | Descrição |
|---|---|---|
| `vManutencao` | mL | Volume de manutenção para 24h |
| `vReidratacao` | mL | Déficit hídrico a repor |
| `vPerdas` | mL | Perdas estimadas em 24h |
| `vTotal` | mL | Soma dos 3 volumes acima |
| `vBolus` | mL | Volume do bolus de ressuscitação |
| `taxaInfusaoBolus` | mL/h | Taxa de infusão do bolus |

---

### 3. `rateCards` — Cards de Taxa de Infusão

**Dependências:** `results`, `tempoReidratacao`

Gera os cards finais de prescrição de taxa de infusão em mL/h.

```
manutencaoHr = vManutencao / 24           // mL/h da manutenção
perdasHr = vPerdas / 24                   // mL/h das perdas

SE vReidratacao > 0:
    reidratacaoHr = vReidratacao / tReidratacao
    
    taxaInicial = manutencaoHr + perdasHr + reidratacaoHr
    → Card "Taxa Inicial (Primeiras X horas)" com taxaInicial mL/h
    
    taxaSubsequente = manutencaoHr + perdasHr
    → Card "Taxa Subsequente (Após X horas)" com taxaSubsequente mL/h
    → SE taxaSubsequente == 0: exibe mensagem de descontinuação

SE vReidratacao == 0:
    taxaUnica = manutencaoHr + perdasHr
    → Card "Taxa de Infusão Contínua" com taxaUnica mL/h
```

**Cada card exibe (função `createRateCard`):**
```
rateMlHr         → valor principal em mL/h (1 casa decimal)
gotasSeg         = (rateMlHr / 3600) × 20    → gotas/seg (macroequipo 20gt/mL)
microGotasMin    = rateMlHr                   → microgotas/min (equipo micro: 1 mL/h = 1 microgota/min)
description      → texto explicativo contextual
```

> **Nota clínica:** Para microgotas/min, a equivalência é direta: 1 mL/h = 1 microgota/min com equipo de 60 microgotas/mL. Portanto `microGotasMin = rateMlHr`.

---

### 4. `bolusRange` — Range do Slider de Bolus

```
especie === 'cao'  → { min: 10, max: 20 } mL/kg
especie === 'gato' → { min: 5,  max: 10 } mL/kg
```

**Valor padrão automático ao selecionar espécie:**
- Cão → `taxaBolus = '15'`
- Gato → `taxaBolus = '7'`

---

### 5. `hipertonicaResults` — Calculadora de Salina Hipertônica

**Dependências:** `peso`, `targetHipertonica`, `baseHipertonica`, `doseHipertonica`

#### 5a. Preparo da Solução (`preparoHtml`):

**Modo Flaconetes (base = 'flaconete'):**
```
SE target = 3%  → ratio = 8.1   → "1 mL NaCl 20% para 8.1 mL NaCl 0.9%"
SE target = 7.5%→ ratio = 1.9   → "1 mL NaCl 20% para 1.9 mL NaCl 0.9%"
```

**Modo Bolsa (base = '250' ou '500'):**
```
baseVolume = 250 ou 500 (mL)

SE target = 3%:
    mlToAdd = (baseVolume / 100) × 12.35
    Exemplo (250mL): (250/100) × 12.35 = 30.9 mL

SE target = 7.5%:
    mlToAdd = (baseVolume / 100) × 52.8
    Exemplo (250mL): (250/100) × 52.8 = 132.0 mL

Instrução:
    1. Remover mlToAdd mL de NaCl 0.9% da bolsa
    2. Adicionar mlToAdd mL de NaCl 20% à bolsa
    → Equivale a (mlToAdd / 10).toFixed(1) ampolas de 10mL
```

#### 5b. Administração (`adminHtml`):

**Requer peso válido.**
```
dose = parseFloat(doseHipertonica)       // mL/kg (slider: 2 a 5)
volumeTotal = p × dose                   // mL total a infundir
taxaInfusao = volumeTotal / (20 / 60)   // mL/h para 20 minutos fixos
// Exemplo: 10kg × 4 mL/kg = 40 mL → 40 / 0.333 = 120 mL/h em 20min
```

Exibe:
- `💉 Volume a Administrar: X mL`
- `⏱️ Taxa de Infusão: X mL/h`
- Nota: "(Administrar em 15-20 minutos)"

---

## 🗂️ DADOS CLÍNICOS — Modals Educacionais (modalData)

Abertura via botão `?` (componente `HelpIcon`) ao lado dos campos. O modal `activeModal` armazena o ID do modal aberto.

### ID: `cardiopata` — ❤️ Fisiopatologia do Cardiopata
**Abre ao clicar no `?` de comorbidade `cardiopata`**
- Explica como a sobrecarga de volume causa edema pulmonar agudo em cardiopatas
- Referência: *Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.*

### ID: `renal` — 💧 Fisiopatologia do Doente Renal Oligúrico
**Abre ao clicar no `?` de comorbidade `renal`**
- Explica acúmulo de fluido em renais oligúricos/anúricos → hipervolemia
- Referência: *2024 AAHA Fluid Therapy Guidelines*

### ID: `hipoalbuminemia` — 📉 Fisiopatologia da Hipoalbuminemia
**Abre ao clicar no `?` de comorbidade `hipoalbuminemia`**
- Explica pressão oncótica coloidal e extravasamento de cristaloides
- Referência: *Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.*

### ID: `dka` — 🍬 Fisiopatologia da Cetoacidose Diabética
**Abre ao clicar no `?` de condição `dka`**
- Diurese osmótica por hiperglicemia, uso de NaCl 0.9%, suplementação de K+
- Referência: *Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.*

### ID: `tce` — 🧠 Fisiopatologia do TCE
**Abre ao clicar no `?` de condição `tce`**
- Barreira hematoencefálica, fluidos hipotônicos pioram edema cerebral
- Referência: *2024 AAHA Fluid Therapy Guidelines*

### ID: `diarreia_hipercloremica` — 🚽 Fisiopatologia da Diarreia com Acidose
**Abre ao clicar no `?` de condição `diarreia_hipercloremica`**
- Perda de HCO₃⁻ gera acidose metabólica. Fluidos balanceados (RL, Plasmalyte) são preferíveis
- Referência: *Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.*

### ID: `vomito_alcalose` — 🤮 Fisiopatologia do Vômito com Alcalose
**Abre ao clicar no `?` de condição `vomito_alcalose`**
- Perda de H+ e Cl- por vômito gástrico alto → alcalose metabólica hipoclorêmica
- O NaCl 0.9% fornece Cl- para o rim corrigir a alcalose
- Referência: *Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.*

### ID: `modalDesidratacao` — Guia Clínico de Desidratação
**Abre no `?` do campo "Grau de Desidratação"**

Tabela clínica:
| % Desid. | Sinais Clínicos |
|---|---|
| < 5% | Não detectável clinicamente. Histórico de perdas. |
| 5-8% | Leve perda de turgor cutâneo, mucosas pegajosas. |
| 8-10% | Perda moderada de turgor, mucosas secas, enoftalmia leve, TPC 2-2.5s. |
| 10-12% | Pele sem elasticidade, enoftalmia acentuada, TPC >2.5s, taquicardia, pulsos fracos. |
| > 12% | Sinais de choque hipovolêmico, mucosas pálidas, TPC >3s, hipotermia. |

### ID: `modalPerdas` — Guia de Estimativa de Perdas Ativas
**Abre no `?` do campo "Perdas Estimadas"**

- Método ideal: Pesar os dejetos (1g ≈ 1mL)
- Estimativas por tipo e porte:
  - **Vômito:** Pequeno: 10–30 mL / Médio: 30–100 mL / Grande: 100–300+ mL por episódio
  - **Diarreia líquida:** Pequeno: 20–50 mL / Médio: 50–150 mL / Grande: 150–400+ mL por episódio
  - **Poliúria:** Mensurar com cateter + sistema fechado

### ID: `modalNotasClinicas` — Protocolos para Pacientes de Risco
**Abre no `?` da "Nota Clínica" dentro do bloco de reidratação**

Tabela protocolar:
| Condição | Tempo de Reidratação | Bolus de Ressuscitação |
|---|---|---|
| ❤️ Cardiopata | 18-24h (ou mais) | 2-5 mL/kg em 20-30 min |
| 💧 Doente Renal (Oligúrico) | 18-24h | 5-10 mL/kg em 20-30 min |
| 🐾 Filhote / Idoso | 18-24h | 5-10 mL/kg em 20-30 min |
| 📉 Hipoalbuminemia | 18-24h | Cristaloide (volume reduzido) + Coloide |

### ID: `modalTempoBolus` — Guia de Tempo de Infusão de Bolus
**Abre no `?` do campo "Tempo de Infusão (minutos)"**

- **15-20 min:** Padrão para choque hipovolêmico sem comorbidades
- **30+ min:** Para cardiopatas, renais, filhotes, idosos

---

## 🩺 DADOS CLÍNICOS — Painéis de Recomendação por Condição

### Painel: `ressuscitacaoInfo` (Collapsible "Ressuscitação Volêmica")

Controlado por: `comorbidade`

| Valor | alertClass | Título | Pontos |
|---|---|---|---|
| `saudavel` | `alert-info` | ✅ Protocolo Padrão | Crisaloides isotônicos balanceados. Cão: 10-20 mL/kg 15-20min. Gato: 5-10 mL/kg 15-20min |
| `cardiopata` | `alert-danger` | 🚨 ALERTA: ALTO RISCO DE SOBRECARGA! | Bolus 2-5 mL/kg em 20-30min. Ausculta pulmonar contínua. |
| `renal` | `alert-danger` | 🚨 ALERTA: RISCO DE SOBRECARGA FATAL! | Prova de carga: 5-10 mL/kg em 20-30min. Avaliar produção de urina. Não repetir sem resposta. |
| `hipoalbuminemia` | `alert-warning` | ⚠️ Cuidado: Risco de Edema! | Reduzir bolus de cristaloide 25-50%. Usar coloides (albumina, plasma). Vigiar edema periférico. |
| `nenhuma` | — | — | "Selecione uma opção para ver as recomendações." |

### Painel: `especificasInfo` (Collapsible "Fluidos para Condições Específicas")

Controlado por: `condicaoEspecial`

| Valor | alertClass | Título | Pontos |
|---|---|---|---|
| `dka` | `alert-info` | 🍬 Cetoacidose Diabética (CAD) | NaCl 0.9% inicial. Reidratar 1-2h ANTES da insulina. Suplementar K+ e PO₄. Trocar para dextrose quando glicemia ≤ 250 mg/dL. |
| `tce` | `alert-danger` | 🧠 Traumatismo Cranioencefálico (TCE) 🚨 | Salina Hipertônica (3% ou 7.5%). CONTRAINDICADO: RL e D5W (fluidos hipotônicos PROIBIDOS). |
| `diarreia_hipercloremica` | `alert-info` | 🚽 Acidose Metabólica Hiperclorêmica | Ringer Lactato ou Plasmalyte. CONTRAINDICADO: NaCl 0.9% (piora acidose). |
| `vomito_alcalose` | `alert-info` | 🤮 Alcalose Metabólica Hipoclorêmica | NaCl 0.9% (alto Cl- é terapêutico). Suplementar KCl (quase sempre necessário). |
| `nenhuma` | — | — | "Selecione uma opção para ver as recomendações." |

---

## 🎨 CLASSES CSS INTERNAS (style embutido no componente)

| Classe | Aplicação |
|---|---|
| `.card` | Container principal de cada bloco |
| `.input-group` | Wrapper de campo com `margin-bottom: 1.5rem` |
| `.input-label` | Label estilizada acima de cada campo |
| `.input-field` | Input/select estilizado com suporte a `:focus` e `.invalid` |
| `.result-breakdown` | Container cinza/muted dos resultados numéricos |
| `.result-row` | Linha de resultado (label + valor) com borda inferior |
| `.result-row-label` | Texto descritivo da linha de resultado |
| `.result-row-value` | Valor numérico destacado (font-size 1.1rem) |
| `.final-rate-card` | Card com fundo primário/10% para taxa final |
| `.final-rate-title` | Título do card de taxa final |
| `.final-rate-value` | Valor numérico grande (1.75rem) no card |
| `.help-icon` | Ícone `?` circular para abrir modals |
| `.modal` | Overlay fixo fullscreen do modal |
| `.modal-content` | Caixa branca central do modal (max 600px, max-height 90vh) |
| `.close-button` | Botão × de fechar modal (posição absoluta top-right) |
| `.alert-card` | Base de card de alerta |
| `.alert-warning` | Amarelo/âmbar — avisos moderados |
| `.alert-danger` | Vermelho/danger — alertas críticos |
| `.alert-info` | Cor primária/info — informações clínicas |
| `.collapsible-header` | Cabeçalho clicável das seções expansíveis |
| `.collapsible-content` | Corpo das seções expansíveis |
| `.species-btn` | Botão de seleção de espécie (Cão / Gato) |
| `.species-btn.selected` | Botão selecionado com borda primária |

**Todas as cores usam tokens CSS do design system:**  
`hsl(var(--card))`, `hsl(var(--foreground))`, `hsl(var(--primary))`, `hsl(var(--muted))`, `hsl(var(--border))`, `hsl(var(--background))`, `hsl(var(--destructive))`, `hsl(var(--input))`, `hsl(var(--muted-foreground))`

---

## 🧩 COMPONENTES INTERNOS

### `<Modal id title content onClose>`
Modal educacional. Renderizado sobre o resto da UI. Fechado ao clicar no overlay ou no ×.
- Usa `dangerouslySetInnerHTML` para renderizar HTML rico.

### `<HelpIcon modalId>`
Botão `?` circular. Abre o modal correspondente ao `modalId`.
- Se `modalId === 'nenhuma'` ou `=== 'saudavel'`, não abre nada.
- Colocado inline após labels de campos que possuem guia educacional.

### `<Collapsible id title children>`
Seção expansível tipo accordion.
- Estado controlado por `collapsibles[id]`.
- Ícone ▼ rotaciona 180° quando aberto.
- IDs válidos: `'ressuscitacao'`, `'específicas'`, `'hipertonica'`

### `createRateCard(title, rateMlHr, description)`
Função que gera JSX de um card de taxa de infusão.
- Retorna `null` se `rateMlHr <= 0`.

### `renderInfoCard(type, data)`
Função que gera JSX do painel de recomendação clínica.
- Retorna mensagem padrão se `type === 'nenhuma'` ou `data === null`.

---

## 🗺️ MAPA VISUAL DE ONDE CADA ELEMENTO APARECE NA UI

```
┌─────────────────────────────────────────────────────────────┐
│  [PageHeader] "Calculadora de Fluidoterapia"                │
│  Subtítulo: "Cálculo de taxas para cães e gatos..."         │
├─────────────────────────────────────────────────────────────┤
│  BLOCO 1 — Seleção de Espécie (.card)                       │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │ 🐶 Cão       │  │ 🐱 Gato      │  ← .species-btn        │
│  └──────────────┘  └──────────────┘                         │
│  [Só exibe o restante SE especie !== null]                  │
├─────────────────────────────────────────────────────────────┤
│  BLOCO 2+3 — Grid 2 colunas (.card.grid-cols-1.md:grid-cols-2)
│                                                             │
│  [COLUNA ESQUERDA — INPUTS]                                 │
│  ─────────────────────────                                  │
│  h2: "2. Dados do Paciente"                                 │
│  • input#peso        → Peso (kg)                            │
│  • select#estadoFisiologico → Estado Fisiológico            │
│    Opções: Adulto / Filhote / Idoso / Gestante / Obeso      │
│                                                             │
│  h2: "3. Plano de Fluidoterapia"                            │
│  • range#taxaManutencao → Taxa Manutenção (mL/kg/dia)       │
│    Min/Max dinâmico conforme estadoFisiologico              │
│    Exibe: "Selecionado: X mL/kg/dia"                        │
│                                                             │
│  • checkbox#incluirReidratacao → "Incluir Reidratação"      │
│    (Quando marcado, revela:)                                 │
│    • select#desidratação + HelpIcon[modalDesidratacao]       │
│      Opções: 5%, 6%, 7%, 8%, 9%, 10%, 11%, 12%             │
│    • select#tempoReidratacao → 8h / 12h / 18h / 24h        │
│    • [Nota Clínica amarela] + HelpIcon[modalNotasClinicas]  │
│                                                             │
│  • checkbox#incluirPerdas → "Incluir Perdas Ativas"         │
│    (Quando marcado, revela:)                                 │
│    • input#perdas (mL/dia) + HelpIcon[modalPerdas]          │
│                                                             │
│  [COLUNA DIREITA — OUTPUTS]                                 │
│  ─────────────────────────                                  │
│  h2: "4. Plano de Infusão"                                  │
│                                                             │
│  .result-breakdown:                                         │
│  • 💧 Manutenção (24h): X mL                                │
│  • ⏳ Reidratação: X mL (em Xh)                             │
│  • 📉 Perdas Ativas (24h): X mL                             │
│  • Σ Volume Total (24h): X mL  [linha em negrito]           │
│                                                             │
│  [rateCards] → 1 ou 2 .final-rate-card:                    │
│  Cada card exibe:                                           │
│  • Título (ex: "Taxa Inicial (Primeiras 12 horas)")         │
│  • Valor grande: X.X mL/hora                               │
│  • Grid 2 colunas:                                          │
│    ├── X.X gotas/seg (macro)                                │
│    └── X.X microgotas/min                                   │
│  • Texto de instrução contextual                            │
├─────────────────────────────────────────────────────────────┤
│  COLLAPSIBLE — "⚡ Ressuscitação Volêmica (Choque)"         │
│  ─────────────────────────────────────────────────          │
│  h3: "Calculadora de Bolus"                                 │
│  • range#taxaBolus → Dose de Bolus (mL/kg)                  │
│    Cão: 10-20 / Gato: 5-10                                  │
│    Exibe: "Dose Selecionada: X mL/kg"                       │
│  • select#tempoBolus + HelpIcon[modalTempoBolus]            │
│    Opções: 15 / 20 / 30 minutos                             │
│                                                             │
│  .result-breakdown:                                         │
│  • 💉 Volume do Bolus: X mL                                 │
│  • ⏱️ Taxa de Infusão: X mL/h                               │
│                                                             │
│  [Alert vermelho de ATENÇÃO a comorbidades]                 │
│  • select#comorbidade + HelpIcon[valor da comorbidade]      │
│    Opções: nenhuma / saudavel / cardiopata / renal /        │
│            hipoalbuminemia                                  │
│  • [Painel dinâmico ressuscitacaoInfo]                      │
├─────────────────────────────────────────────────────────────┤
│  COLLAPSIBLE — "🔬 Fluidos para Condições Específicas"      │
│  ─────────────────────────────────────────────────          │
│  • select#condicaoEspecial + HelpIcon[valor da condição]    │
│    Opções: nenhuma / dka / tce /                            │
│            diarreia_hipercloremica / vomito_alcalose        │
│  • [Painel dinâmico especificasInfo]                        │
├─────────────────────────────────────────────────────────────┤
│  COLLAPSIBLE — "🧪 Calculadora de Salina Hipertônica"       │
│  ─────────────────────────────────────────────────          │
│  h3: "1. Preparo da Solução"                                │
│  Grid 2 colunas:                                            │
│  • select#targetHipertonica → Concentração Alvo: 3% / 7.5% │
│  • select#baseHipertonica → Bolsa 250mL / 500mL / Flaconetes│
│                                                             │
│  .result-breakdown [preparoHtml renderizado]:               │
│  MODO BOLSA:                                                │
│  • 1. Remover X.X mL de NaCl 0.9%                          │
│  • 2. Adicionar X.X mL de NaCl 20%                         │
│  • Equivalente a X.X ampolas de 10mL                        │
│  MODO FLACONETE:                                            │
│  • Receita: 1 mL NaCl 20% para X.X mL NaCl 0.9%            │
│  • Misture na proporção para atingir X%                     │
│                                                             │
│  h3: "2. Cálculo de Administração"                          │
│  • range#doseHipertonica → Dose (mL/kg): 2 a 5, passo 0.5  │
│    Exibe: "Dose Selecionada: X mL/kg"                       │
│                                                             │
│  .result-breakdown [adminHtml renderizado]:                 │
│  • 💉 Volume a Administrar: X.X mL                          │
│  • ⏱️ Taxa de Infusão: X.X mL/h                             │
│  • "(Administrar em 15-20 minutos)"                         │
│                                                             │
│  [Alert amarelo .alert-warning]:                            │
│  🚨 Recomendações e Cuidados:                               │
│  • Avaliação da PIC: Monitorar reflexo de Cushing,          │
│    anisocoria, estado mental                                │
│  • Administração: LENTAMENTE 15-20min. Acesso central       │
│    preferível                                               │
│  • Compatibilidade: NÃO misturar com outros fluidos         │
│    (esp. Ringer Lactato) — via exclusiva                    │
│  • Desidratação: Salina hipertônica é para choque, NÃO      │
│    para desidratação. SEMPRE seguida de isotônicos.         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📌 REGRAS DE NEGÓCIO E VALIDAÇÕES

1. **Espécie obrigatória:** O id `mainCalculator` só renderiza após selecionar espécie (cao/gato).
2. **Peso inválido:** Se `peso <= 0` ou vazio, `results` retorna `null` e os outputs mostram `0.0`.
3. **Input inválido visual:** Campo `#peso` com ≤ 0 recebe classe `.input-field.invalid` (borda vermelha).
4. **Desidratação 0 ignorada:** `vReidratacao = 0` se `desidratação === '0'` (opção padrão "Selecione...").
5. **Auto-reset de manutenção:** Ao trocar estado fisiológico, se o valor atual sair do range novo → reseta para média.
6. **Range de bolus por espécie:** Atualizado automaticamente via `bolusRange`.
7. **Taxa de infusão de bolus:** Calculada em mL/h (convertendo os minutos para horas).
8. **Salina hipertônica sem peso:** Exibe "Insira o peso do paciente." em vez do cálculo.
9. **HelpIcon sem efeito:** `modalId === 'nenhuma'` e `modalId === 'saudavel'` não abrem modal.

---

## 🔗 ARQUIVO WRAPPER

```tsx
// pages/FluidoterapiaPage.tsx
import Fluidoterapia from '../Fluidoterapia'
import { PageHeader } from '../components/PageHeader'

export function FluidoterapiaPage() {
  const navigate = useNavigate()
  return (
    <div className="py-10">
      <PageHeader
        title="Calculadora de Fluidoterapia"
        subtitle="Cálculo de taxas para cães e gatos com base em diretrizes clínicas"
      />
      <Fluidoterapia onBack={() => navigate('/')} />
    </div>
  )
}
```

---

## 📚 REFERÊNCIAS CLÍNICAS USADAS

1. *Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice*, 4th Ed.
2. *2024 AAHA Fluid Therapy Guidelines*

---

*Documento gerado automaticamente em 2026-02-22. Reflète o estado atual de `Fluidoterapia.tsx` (449 linhas, 45.6 KB).*
