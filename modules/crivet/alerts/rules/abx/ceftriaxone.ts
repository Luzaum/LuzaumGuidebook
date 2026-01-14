import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const ceftriaxoneRules: Rule[] = [
  {
    id: "ceftriaxone_sepsis_green",
    drug: "ceftriaxona",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("sepsis") || comorbidities.has("shock_distributive"),
    alert: ({ drug }) => ({
      id: makeAlertId("ceftriaxone_sepsis_green", drug),
      severity: "green",
      score: severityScore.green,
      title: "Sepse: antibiótico precoce + coleta de cultura antes (se não atrasar) melhora decisão",
      why:
        "Em sepse, tempo importa; mas cultura antes do antibiótico aumenta chance de direcionar e descalonar depois.",
      do:
        "Se possível sem atrasar: coletar cultura (sangue/urina/tecido) e iniciar cobertura. Reavaliar em 24–48h.",
      tags: ["sepsis_workflow"],
    }),
  },
  {
    id: "ceftriaxone_renal_yellow",
    drug: "ceftriaxona",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("ckd") || comorbidities.has("aki"),
    alert: ({ drug }) => ({
      id: makeAlertId("ceftriaxone_renal_yellow", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "DRC/IRA + Ceftriaxona: revisar ajuste e hidratação/perfusão",
      why:
        "Em disfunção renal, a depuração pode estar alterada; ajuste evita superexposição e EA.",
      do:
        "Rever dose/intervalo conforme função renal e monitorar resposta clínica.",
      tags: ["renal_adjustment"],
    }),
  },
];
