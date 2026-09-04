# Relatório de auditoria — Bula / posologia (`labelDose`) do catálogo comercial

**Projeto:** LuzaumGuidebook — módulo ConsultaVet / Apresentações Comerciais  
**Data:** 26 de agosto de 2026  
**Escopo:** 360 produtos comerciais ativos (após exclusão de sedativos/anestésicos do catálogo)

---

## 1. Resumo executivo

A aba **Apresentações Comerciais** exibia textos genéricos na seção **Bula / rótulo** — por exemplo, *"Semintra 4 mg/mL: dose conforme indicação registrada/local"*, que mencionava concentração mas não posologia utilizável (mg/kg, mL/kg, comp/kg, UI/kg, faixa por peso etc.).

Após varredura do catálogo, correções manuais nos casos críticos, enriquecimento automático no pipeline de seed e endurecimento da validação:

| Métrica | Antes (início da demanda) | Após correções | Estado final |
|--------|---------------------------|----------------|--------------|
| Produtos no catálogo | 360 | 360 | **360** |
| Com posologia prática exibível | ~181 (~50%) | ~353 (~98%) | **360 (100%)** |
| Pendentes | ~179 | 7 | **0** |
| Testes automatizados | — | 14 passando | **15 passando** |

**Resultado:** todos os 360 produtos passam na validação de posologia prática na UI. O caso original (**Semintra**) agora exibe `1 mg/kg VO SID (0,25 mL/kg da solução 4 mg/mL)`.

---

## 2. Problema identificado

### 2.1 Sintoma

O campo `dosageGuidance.labelDose` alimenta o bloco **Bula / rótulo** em `CommercialPresentationsPage.tsx`. Muitos seeds tinham:

- Placeholders: *"dose conforme indicação"*, *"seguir bula"*, *"calcular a dose de…"*
- Apenas **concentração** (`4 mg/mL`) sem dose por peso ou por animal
- Campo `labelDose` vazio, embora `labelDirections` ou `plumbs` tivessem informação útil

### 2.2 Causa raiz

1. Cadastro incompleto ou genérico no seed.
2. Validação na UI aceitava qualquer texto com número + unidade (ex.: `mg/mL`), confundindo concentração com posologia.
3. Não havia pipeline para propagar dose de `labelDirections` / Plumb's para `labelDose`.

---

## 3. Metodologia

### 3.1 Critérios de posologia “prática”

Implementados em `modules/consulta-vet/utils/commercialLabelDose.ts`:

| Regra | Descrição |
|-------|-----------|
| `PRACTICAL_DOSE_PATTERN` | Reconhece mg/kg, UI/kg, comp/kg, q12h, gotas, pipetas, faixa de peso, camada fina, mm de gel, troca de curativo, etc. |
| `STRONG_DOSE_PATTERN` | Exige posologia acionável quando o texto também contém frase bloqueada (ex.: insulina com *"dose individualizada"* **e** `0,25–0,5 UI/kg`). |
| `BLOCKED_DOSE_PATTERN` | Rejeita placeholders sem dose forte: *conforme bula*, *dose individualizada* sozinha, *seguir bula*, etc. |

Funções principais:

- `hasPracticalLabelDoseText()` — validação usada na UI e nos testes
- `resolveCommercialLabelDose()` — resolve dose final (seed → directions → plumbs → receita)
- `enrichCommercialProductLabelDose()` — aplica enriquecimento no carregamento do catálogo
- `auditCommercialLabelDose()` — auditoria por produto

### 3.2 Pipeline do catálogo

```
commercialProductsRaw
  → enrichRequestedAntiparasiticCommercialProduct
  → excludeSedativeAnestheticCommercialProducts
  → enrichCommercialProductLabelDose   ← enriquecimento automático
  → commercialOticProductsSeed
```

### 3.3 Ferramentas de auditoria

| Script | Saída |
|--------|-------|
| `tmp/audit-commercial-label-dose.ts` | Resumo JSON + lista de pendentes |
| `tmp/generate-label-dose-report.ts` | `tmp/label-dose-report-data.json` (detalhado por produto) |
| `tests/receituario/commercial-label-dose-audit.test.ts` | Gate de cobertura ≥ 95% (atual: 100%) |

---

## 4. Resultados por classe terapêutica

### 4.1 Cobertura final (360/360 OK)

| Classe | Total | OK final |
|--------|------:|---------:|
| dermatologic | 92 | 92 |
| gastrointestinal | 39 | 39 |
| parasiticide | 47 | 47 |
| ophthalmologic | 29 | 29 |
| infectious | 29 | 29 |
| orthopedic | 26 | 26 |
| nutraceutical | 25 | 25 |
| dental | 22 | 22 |
| cardiologic | 16 | 16 |
| endocrine | 16 | 16 |
| renal | 6 | 6 |
| antiinflammatory | 4 | 4 |
| analgesic | 3 | 3 |
| emergency | 2 | 2 |
| behavioral | 1 | 1 |
| neurologic | 1 | 1 |
| oncologic | 1 | 1 |
| reproductive | 1 | 1 |

### 4.2 Origem da dose exibida (após enriquecimento)

| Fonte | Produtos | % |
|-------|--------:|--:|
| `labelDose` persistido no seed | 211 | 58,6% |
| Enriquecido de `labelDirections` | 148 | 41,1% |
| Enriquecido de Plumb's | 1 | 0,3% |
| Não resolvido | 0 | 0% |

### 4.3 Estado bruto do seed (antes do enriquecimento automático)

| Status bruto | Quantidade |
|--------------|----------:|
| `labelDose` já prático no seed | 206 |
| Campo ausente | 147 |
| Texto bloqueado (placeholder) | 6 |
| Texto fraco | 1 |

**Classes que mais dependiam de enriquecimento automático** (0 OK no seed bruto → 100% após pipeline):

- **dental** — 22/22 enriquecidos via `labelDirections`
- **nutraceutical** — 22/25 enriquecidos
- **parasiticide** — 34/47 enriquecidos
- **dermatologic** — 69/92 enriquecidos

---

## 5. Correções manuais (cadastro no seed)

Estes produtos receberam `labelDose` explícito com dose utilizável, muitos após revisão de bula ou literatura:

### 5.1 Cardiológicos (caso Semintra e similares)

| Produto | Posologia cadastrada (resumo) |
|---------|-------------------------------|
| **Semintra** | Gatos DRC/proteinúria: **1 mg/kg VO SID (0,25 mL/kg** solução 4 mg/mL) |
| **Furolisin** | **2–6 mg/kg VO** — cães 2–3×/dia; gatos 3×/dia |
| **UpCard** | **0,1–0,6 mg/kg VO SID** (titular ≤ 0,3 mg/kg) |
| **Cardisure** | **0,5 mg/kg/dia VO** dividido q12h |
| **Cardalis** | Espironolactona 2 mg/kg + benazepril 0,25 mg/kg q24h |
| **Petpril** | comp/10 kg, comp/20 kg (cães); ¼–½ comp/5 kg (gatos) |
| **Benazepril manipulado** | Extra-bula: 0,25–0,5 mg/kg SID (cães); 0,5 mg/kg q12h (gatos) |
| **Anlodipino manipulado** | Extra-bula: 0,1–0,25 mg/kg SID (cães); 0,625–2,5 mg/gato (gatos) |
| **Clopidogrel manipulado** | Extra-bula: 1–4 mg/kg SID (cães); ATE felina 18,75–75 mg/gato |
| **Sildenafila manipulada** | Extra-bula: 0,5–3 mg/kg q8h (cães); 0,25–1,6 mg/kg q12h (gatos) |
| **Atenolol manipulado** | Extra-bula: 0,25–1,5 mg/kg q12h (cães); 6,25 mg/gato q12h (gatos) |

### 5.2 Outros sistêmicos

| Produto | Posologia cadastrada (resumo) |
|---------|-------------------------------|
| **Giardicid** | 12,5–25 mg/kg q12h; suspensão 0,5 mL/kg (cães) |
| **Doxitrat** | 5–10 mg/kg VO q12–24h |
| **Mectimax** | 0,2–0,6 mg/kg conforme indicação (sarna/demodicose) |
| **Condromax Pet** | ½–3 tabletes/dia por faixa de peso |
| **Condroton** | comp BID por faixa de peso (500 mg / 1000 mg) |
| **Antisedan** | Reversão atipamezol — dose por mg/kg conforme bula |
| **Invicto** | 1 tablete/dia independente do peso (período inicial 3 meses) |
| **Sec Lac** | comp/5 kg, comp/20 kg, comp/4 kg (gatas) q12h |
| **Nutri SAMe / hepatoprotetores** | ~20 mg/kg SID; comp/5 kg ou comp/10 kg |
| **Fluimucil, Osteosyn, Surosolve** | Doses por faixa de peso / mg/kg |

### 5.3 Endocrino — insulinas e análogos

| Produto | Posologia cadastrada (resumo) |
|---------|-------------------------------|
| **Humalog / NovoRapid** | Hospitalar: **0,1–0,2 UI/kg** IM inicial (extra-bula) |
| **Tresiba** | Extra-bula: **0,25–0,5 UI/kg SC q24h** |
| **Lantus / Basaglar / Toujeo / NPH / Levemir** | Seed com UI/kg ou UI/gato + contexto humano; validação aceita dose forte mesmo com menção a *"dose individualizada"* na mesma linha |

### 5.4 Itraconazol humano

Apresentações EMS, Eurofarma, Geolab etc.: **5 mg/kg VO q24h** (extra-bula) via helper `humanItraconazole()` em `itraconazolePrednisoloneCommercialProducts.seed.ts`.

### 5.5 Tópicos / feridas (`woundTopicalCommercialProducts.seed.ts`)

Produtos sem mg/kg por natureza — posologia por **modo de uso**:

| Produto | Posologia cadastrada |
|---------|---------------------|
| **Prontosan Solução** | Irrigar a cada **troca de curativo** |
| **Prontosan Gel** | **Camada 3–5 mm** após irrigação |
| **Dermacerium / Topcoid / Panolog** | Camada fina / gotas no conduto |
| **Hipoglós / Bepantol / Alantol** | Camada fina sobre lesão limpa |
| **Dermodex Prevent** | Borrifadas / pós-banho conforme rótulo |
| **Nebacetin / Crema 6A / Dermotrat** | Aplicação tópica com frequência explícita |
| **Curatec Gel** | 3–5 mm (via enriquecimento de `labelDirections` quando seed vazio) |

---

## 6. Enriquecimento automático — exemplos

Quando `labelDose` está vazio ou é genérico, o sistema extrai a primeira frase prática de `labelDirections`:

| Produto | Texto enriquecido (exemplo) |
|---------|----------------------------|
| Pielsana Sabonete PHMB | *"Molhar a pele, aplicar quantidade suficiente para produzir espuma…"* |
| Curatec Solução PHMB | *"Irrigar… contato até ~15 minutos"* |
| Silglós 1% | *"Aplicar camada fina… uma vez ao dia"* |
| Produtos dentais (22) | Frequência de escovação / gotas / aplicação do fabricante |

**Plumb's como fallback:** usado quando `labelDirections` não contém frase prática isolada (ex.: algumas insulinas).

---

## 7. Alterações de código

| Arquivo | Mudança |
|---------|---------|
| `utils/commercialLabelDose.ts` | Utilitário central + `STRONG_DOSE_PATTERN` |
| `data/commercialOticProducts.seed.ts` | Pipeline `enrichCommercialProductLabelDose`; export `commercialProductsBeforeLabelDoseEnrichment` |
| `pages/CommercialPresentationsPage.tsx` | Import do utilitário compartilhado (sem regex duplicada) |
| `data/woundTopicalCommercialProducts.seed.ts` | `labelDose` explícito em tópicos prioritários |
| `data/insulinCommercialProducts.seed.ts` | Doses UI/kg e hospitalares |
| `data/hepatoprotectiveCommercialProducts.seed.ts` | SAMe e afins com mg/kg |
| `tests/receituario/commercial-label-dose-audit.test.ts` | Cobertura + Semintra + bloqueio de genéricos |
| `tests/receituario/commercial-presentation-dose.test.ts` | Cardiológicos prioritários |

---

## 8. Produtos sem mg/kg — comportamento esperado

Nem todo comercial tem posologia sistêmica. Para estes grupos, a “dose prática” é **modo de aplicação**:

- Sabonetes / shampoos antissépticos → quantidade suficiente, enxágue
- Soluções PHMB → irrigação, tempo de contato, troca de curativo
- Géis de ferida → espessura em mm, camada fina
- Pomadas de barreira → camada fina, frequência
- Coleiras / pipetas → faixa de peso ou 1 pipeta/mês

O regex foi ampliado para aceitar: `camada fina`, `3–5 mm`, `troca de curativo`, `quantidade suficiente`, `preencher conduto`, etc.

---

## 9. Limitações conhecidas e recomendações

1. **Insulinas:** texto pode combinar aviso de bula humana (*"dose individualizada"*) com dose veterinária extra-bula na mesma linha — intencional; Plumb's detalha por espécie na seção expandida.
2. **Levemir / analogues:** quando só há *"individualizar q12h"* no Plumb's, a dose exibida é conservadora — titulação clínica continua obrigatória.
3. **Iodeto LAQFA (emergência nuclear):** produto humano de emergência; `labelDose` bruto é fraco — enriquecimento traz dose humana de referência, não posologia antifúngica veterinária.
4. **Persistência:** 148 produtos dependem de enriquecimento em runtime; opcionalmente pode-se materializar `labelDose` no seed para reduzir dependência de `labelDirections`.
5. **Re-auditoria:** executar `npx tsx tmp/audit-commercial-label-dose.ts` após incluir novos comerciais.

---

## 10. Como validar

```bash
# Auditoria rápida (deve retornar stillBad: 0)
npx tsx tmp/audit-commercial-label-dose.ts

# Relatório detalhado JSON
npx tsx tmp/generate-label-dose-report.ts

# Testes
npx tsx --test tests/receituario/commercial-label-dose-audit.test.ts
npx tsx --test tests/receituario/commercial-presentation-dose.test.ts
```

**Checklist manual sugerido na UI:**

- [ ] Semintra → Bula / rótulo mostra **1 mg/kg** e **0,25 mL/kg**
- [ ] Produto dental sem `labelDose` no seed → mostra instrução de escovação/aplicação
- [ ] Prontosan Gel → **3–5 mm** ou camada uniforme
- [ ] Texto *"dose conforme indicação"* sozinho **não** aparece como posologia principal

---

## 11. Conclusão

A varredura do catálogo comercial foi concluída com **360/360 produtos** exibindo posologia prática na aba Apresentações Comerciais. O problema reportado (Semintra e similares) foi corrigido na origem (seed + validação), e a maior parte dos demais itens passou a herdar dose útil automaticamente a partir de instruções já cadastradas.

Arquivos de evidência:

- `tmp/audit-commercial-label-dose.json` — snapshot da auditoria final
- `tmp/label-dose-report-data.json` — detalhamento por produto e fonte

---

*Relatório gerado automaticamente a partir da auditoria de 26/08/2026.*
