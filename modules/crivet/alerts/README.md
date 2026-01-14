# Sistema de Alertas CRIVET 2.0

Sistema declarativo de alertas baseado em comorbidades e contexto clínico do paciente.

## Uso Básico

```typescript
import { getDrugComorbidityAlerts } from "@/modules/crivet/alerts";
import type { DrugKey, ComorbidityKey, PatientContext } from "@/modules/crivet/alerts";

// Exemplo: alertas para propofol em paciente em choque
const alerts = getDrugComorbidityAlerts(
  "propofol",
  ["shock_hypovolemic", "hypoalbuminemia"],
  {
    species: "dog",
    map: 55,
    lactate: 4.2,
  }
);

// Alertas ordenados por severidade (score decrescente)
// black > red > orange > yellow > green
alerts.forEach((alert) => {
  console.log(`${alert.severity}: ${alert.title}`);
  console.log(`Por quê: ${alert.why}`);
  console.log(`O que fazer: ${alert.do}`);
});
```

## Estrutura

- `types.ts` - Tipos TypeScript base (Alert, Rule, ComorbidityKey, etc.)
- `scoring.ts` - Helpers de pontuação e IDs de alertas
- `engine.ts` - Motor de avaliação principal (`evaluateAlerts`)
- `rules/` - Regras declarativas organizadas por categoria
  - `anesthetics/` - anestésicos e combinações (lidocaína, opioides, propofol, dex, cetamina, MLK/FLK)
  - `cardio/` - vasopressores/inotrópicos/vasodilatadores (norepi, vasopressina, dopamina, dobutamina, efedrina, nitroprussiato, diltiazem, esmolol)
  - `gi/` - antieméticos/pró-cinéticos (metoclopramida, maropitant)
  - `abx/` - antimicrobianos (ceftriaxona, meropenem, enrofloxacina, cefalexina, clindamicina, metronidazol)
  - `index.ts` - Registro central de todas as regras

## Criando Novas Regras

```typescript
import type { Rule } from "../types";
import { severityScore, makeAlertId } from "../scoring";

export const minhaRegra: Rule = {
  id: "minha_regra_id",
  drug: "midazolam", // ou "any" para todas as drogas
  species: "dog", // opcional, pode ser "any" ou omitir
  when: ({ comorbidities, ctx }) => {
    // Retorna true se a regra deve disparar
    return comorbidities.has("minha_comorbidade") && (ctx.map || 0) < 60;
  },
  alert: ({ drug, ctx }) => ({
    id: makeAlertId("minha_regra_id", drug),
    severity: "red",
    score: severityScore.red,
    title: "Título do alerta",
    why: "Explicação do mecanismo/risco",
    do: "Ação prática recomendada",
    tags: ["tag1", "tag2"], // opcional
  }),
};
```

## Princípios

1. **Regras não calculam dose** - Apenas alertam sobre risco e orientam ajustes percentuais/evitar/preferir alternativa
2. **Separação comorbidade × estado** - Comorbidades são condições crônicas; estados são situações agudas
3. **Conflito de regras** - Resolvido por score e deduplicação por ID (mantém o alerta de maior score)
4. **Ordenação** - Por score decrescente, depois alfabético por título

## Severidades

- `black` (100) - Risco extremo (ex.: hipovolemia + norepinefrina)
- `red` (85) - Risco alto, requer ação imediata
- `orange` (60) - Cautela significativa
- `yellow` (30) - Atenção recomendada
- `green` (10) - Informativo
