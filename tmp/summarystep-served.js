import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e62851ee"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=e62851ee"; const useMemo = __vite__cjsImport1_react["useMemo"]; const useState = __vite__cjsImport1_react["useState"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=e62851ee";
import { ChevronLeft, Download, Printer, Save } from "/node_modules/.vite/deps/lucide-react.js?v=e62851ee";
import { toast } from "/node_modules/.vite/deps/sonner.js?v=e62851ee";
import { Button } from "/modules/energia-vet/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "/modules/energia-vet/components/ui/card.tsx";
import { Badge } from "/modules/energia-vet/components/ui/badge.tsx";
import { Input } from "/modules/energia-vet/components/ui/input.tsx";
import { useCalculationStore } from "/modules/energia-vet/store/calculationStore.ts";
import { computeDietPlan } from "/modules/energia-vet/lib/dietEngine.ts";
import { getFoodById, getNutrientDefinition, getRequirementById } from "/modules/energia-vet/lib/genutriData.ts";
import { saveReport } from "/modules/energia-vet/lib/persistence.ts";
import { exportReportPdf } from "/modules/energia-vet/lib/reportDocument.ts";
import { calculateRefeedingRisk, getPhysiologicStateById, getProgressionPlan3Days, getProgressionPlan4Days } from "/modules/energia-vet/lib/nutrition.ts";
import { getClinicalProfileBadges } from "/modules/energia-vet/lib/clinicalProfiles.ts";
import { buildProgrammedFeedingPlan } from "/modules/energia-vet/lib/programmedFeeding.ts";
import PrintableReportDocument from "/modules/energia-vet/components/PrintableReportDocument.tsx";
const NEW_ROUTE = "/calculadora-energetica/new";
const MODULE_ROUTE = "/calculadora-energetica";
function isPercentLikeKey(key) {
  return key.endsWith("Pct");
}
function formatDailyAmount(key, value) {
  if (value == null) return "--";
  const definition = getNutrientDefinition(key);
  if (isPercentLikeKey(key)) return `${value.toFixed(2)} g/dia`;
  return `${value.toFixed(2)} ${definition?.unit ?? ""}/dia`.trim();
}
function StatusBadge({ status }) {
  const map = {
    adequate: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    below: "border-red-400/30 bg-red-500/10 text-red-200",
    above: "border-amber-400/30 bg-amber-500/10 text-amber-200",
    manual: "border-sky-400/30 bg-sky-500/10 text-sky-200",
    insufficient_data: "border-white/15 bg-white/5 text-muted-foreground"
  };
  const label = status === "adequate" ? "Adequado" : status === "below" ? "Abaixo do alvo" : status === "above" ? "Acima do alvo" : status === "manual" ? "Revisao manual" : "Dados insuficientes";
  return /* @__PURE__ */ jsxDEV("span", { className: `inline-flex rounded-full border px-3 py-1 text-xs font-medium ${map[status]}`, children: label }, void 0, false, {
    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
    lineNumber: 44,
    columnNumber: 10
  }, this);
}
export default function SummaryStep() {
  const navigate = useNavigate();
  const { patient, energy, target, diet, hospital } = useCalculationStore();
  const [programmedMealsPerDay, setProgrammedMealsPerDay] = useState(diet.programmedFeeding?.mealsPerDay ?? diet.mealsPerDay ?? 2);
  const [programmedTimes, setProgrammedTimes] = useState(diet.programmedFeeding?.meals.map((meal) => meal.time) ?? []);
  const species = patient.species ?? "dog";
  const currentWeight = patient.currentWeight ?? 0;
  const physiologicStateLabel = getPhysiologicStateById(energy.stateId ?? "")?.label ?? "Nao informado";
  const comorbidityLabels = useMemo(() => getClinicalProfileBadges(species, patient.comorbidityIds ?? []), [patient.comorbidityIds, species]);
  const result = useMemo(() => {
    if (!diet.entries?.length || !target.targetEnergy || !currentWeight) return null;
    return computeDietPlan({
      entries: diet.entries,
      targetEnergy: target.targetEnergy,
      species,
      weightKg: currentWeight,
      mealsPerDay: diet.mealsPerDay ?? 2,
      patientName: patient.name ?? "Paciente",
      requirementProfileId: diet.requirementProfileId,
      additionalRequirementProfileIds: diet.additionalRequirementProfileIds
    });
  }, [currentWeight, diet.additionalRequirementProfileIds, diet.entries, diet.mealsPerDay, diet.requirementProfileId, patient.name, species, target.targetEnergy]);
  const programmedFeeding = useMemo(
    () => result ? buildProgrammedFeedingPlan({ contributions: result.contributions, mealsPerDay: programmedMealsPerDay, times: programmedTimes, enabled: true }) : null,
    [programmedMealsPerDay, programmedTimes, result]
  );
  const printableReport = useMemo(() => {
    if (!result) return null;
    return {
      id: "preview-report",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      patient,
      energy,
      target,
      diet: {
        ...diet,
        entries: diet.entries,
        totalDryMatterGrams: result.totalDryMatterGrams,
        totalAsFedGrams: result.totalAsFedGrams,
        gramsPerDay: result.totalAsFedGrams,
        gramsPerMeal: result.feedingPlan.meals[0]?.gramsAsFed ?? 0,
        targetEnergy: target.targetEnergy ?? 0,
        mealsPerDay: diet.mealsPerDay ?? 2,
        dietType: diet.dietType ?? "commercial",
        programmedFeeding: programmedFeeding ?? void 0
      },
      hospital,
      formula: {
        contributions: result.contributions,
        evaluation: result.evaluation,
        feedingPlan: result.feedingPlan,
        programmedFeeding: programmedFeeding ?? void 0
      }
    };
  }, [diet, energy, hospital, patient, programmedFeeding, result, target]);
  const selectedRequirement = useMemo(() => getRequirementById(diet.requirementProfileId), [diet.requirementProfileId]);
  const summaryItems = result ? [
    ["Energia entregue", `${result.totalKcal.toFixed(1)} kcal/dia`],
    ["Proteina total", formatDailyAmount("crudeProteinPct", result.evaluation.totalDelivered.crudeProteinPct)],
    ["Gordura total", formatDailyAmount("etherExtractPct", result.evaluation.totalDelivered.etherExtractPct)],
    ["Carboidrato estimado", formatDailyAmount("nitrogenFreeExtractPct", result.evaluation.totalDelivered.nitrogenFreeExtractPct)],
    ["Fibra", formatDailyAmount("crudeFiberPct", result.evaluation.totalDelivered.crudeFiberPct)],
    ["Calcio", formatDailyAmount("calciumPct", result.evaluation.totalDelivered.calciumPct)],
    ["Fosforo", formatDailyAmount("phosphorusPct", result.evaluation.totalDelivered.phosphorusPct)],
    ...result.evaluation.totalDelivered.taurinePct != null ? [["Taurina", formatDailyAmount("taurinePct", result.evaluation.totalDelivered.taurinePct)]] : []
  ] : [];
  const adequacy = result?.evaluation.adequacy.filter((item) => item.status !== "insufficient_data") ?? [];
  const hospitalRisk = patient.isHospitalized ? calculateRefeedingRisk(hospital.daysAnorexic ?? 0, hospital.daysHyporexic ?? 0, hospital.recentIntakePercent ?? 100, patient.bcs ?? 5, (hospital.electrolytes?.phosphorus ?? 1) < 1 || (hospital.electrolytes?.potassium ?? 1) < 1 || (hospital.electrolytes?.magnesium ?? 1) < 1) : null;
  const progressionPlan = patient.isHospitalized && (energy.rer ?? 0) > 0 ? hospital.progressionProtocol === "3_days" ? getProgressionPlan3Days(energy.rer ?? 0) : getProgressionPlan4Days(energy.rer ?? 0) : [];
  const macroChartStyle = useMemo(() => {
    if (!result) return { background: "conic-gradient(#334155 0% 100%)" };
    const [protein, fat, carb] = result.evaluation.macroSplit;
    const proteinEnd = protein.percent;
    const fatEnd = protein.percent + fat.percent;
    return { background: `conic-gradient(${protein.color} 0% ${proteinEnd}%, ${fat.color} ${proteinEnd}% ${fatEnd}%, ${carb.color} ${fatEnd}% 100%)` };
  }, [result]);
  const handleSave = () => {
    if (!printableReport) return;
    saveReport({ ...printableReport, id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString() });
    toast.success("Resumo salvo no historico do Energia Vet.");
    navigate(MODULE_ROUTE);
  };
  if (!result) {
    return /* @__PURE__ */ jsxDEV(Card, { className: "w-full", children: /* @__PURE__ */ jsxDEV(CardContent, { className: "p-6 text-sm text-muted-foreground", children: "A formulacao ainda nao foi concluida." }, void 0, false, {
      fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
      lineNumber: 146,
      columnNumber: 37
    }, this) }, void 0, false, {
      fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
      lineNumber: 146,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full pb-20", children: [
    /* @__PURE__ */ jsxDEV("style", { children: `@media print{body,html{background:white!important;color:black!important;padding:0!important;margin:0!important;}@page{size:A4;margin:12mm 14mm;}body *{visibility:hidden!important;}.no-print,.no-print *{display:none!important;}#print-report-root,#print-report-root *{visibility:visible!important;}#print-report-root{display:block!important;position:absolute;inset:0;width:100%;}.rx-page-break{break-before:page;}}` }, void 0, false, {
      fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
      lineNumber: 151,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "no-print print:hidden space-y-6", children: /* @__PURE__ */ jsxDEV(Card, { className: "border-border bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:border-orange-400/15 dark:bg-gradient-to-b dark:from-card dark:via-card dark:to-card/95 dark:shadow-[0_18px_50px_rgba(0,0,0,0.22)]", children: [
      /* @__PURE__ */ jsxDEV(CardHeader, { className: "border-b border-border bg-slate-50 dark:border-white/5 dark:bg-orange-500/[0.04]", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV(CardTitle, { className: "text-2xl text-foreground dark:text-white", children: "Resumo do plano nutricional" }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 158,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "mt-1 text-sm text-muted-foreground", children: "Resumo clinico, formulacao, alimentacao programada e adequacao final." }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 159,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 157,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxDEV(Button, { variant: "outline", size: "sm", className: "gap-2", onClick: () => window.print(), children: [
            /* @__PURE__ */ jsxDEV(Printer, { className: "h-4 w-4" }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 162,
              columnNumber: 102
            }, this),
            " Imprimir / PDF"
          ] }, void 0, true, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 162,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(Button, { size: "sm", className: "gap-2", onClick: () => printableReport && exportReportPdf(printableReport), children: [
            /* @__PURE__ */ jsxDEV(Download, { className: "h-4 w-4" }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 163,
              columnNumber: 121
            }, this),
            " Exportar PDF"
          ] }, void 0, true, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 163,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 161,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
        lineNumber: 156,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
        lineNumber: 155,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(CardContent, { className: "space-y-6 pt-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]", children: [
          /* @__PURE__ */ jsxDEV(Card, { className: "border-white/10 bg-white/[0.03]", children: [
            /* @__PURE__ */ jsxDEV(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxDEV(CardTitle, { className: "text-lg", children: "Paciente e energia" }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 171,
              columnNumber: 46
            }, this) }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 171,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(CardContent, { className: "grid gap-3 md:grid-cols-2", children: [
              [
                ["Paciente", patient.name || "Nao informado"],
                ["Tutor", patient.ownerName || "--"],
                ["Especie", species === "dog" ? "Cao" : "Gato"],
                ["Perfil final", physiologicStateLabel],
                ["Peso atual", `${currentWeight.toFixed(2)} kg`],
                ["Energia-alvo", `${target.targetEnergy?.toFixed(0) ?? "--"} kcal/dia`]
              ].map(([label, value]) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-white/10 bg-black/10 p-4", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: label }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 180,
                  columnNumber: 125
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "mt-1 font-semibold text-white", children: value }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 180,
                  columnNumber: 181
                }, this)
              ] }, label, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 180,
                columnNumber: 45
              }, this)),
              /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-2 flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxDEV(Badge, { variant: "outline", children: patient.isNeutered ? "Castrado" : "Nao castrado" }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 182,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(Badge, { variant: "outline", children: patient.isHospitalized ? "Hospitalizado" : "Ambulatorial" }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 183,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(Badge, { variant: "outline", children: target.goal === "weight_loss" ? "Perda de peso" : target.goal === "weight_gain" ? "Ganho de peso" : "Manutencao" }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 184,
                  columnNumber: 21
                }, this),
                comorbidityLabels.map((label) => /* @__PURE__ */ jsxDEV(Badge, { className: "rounded-full bg-orange-500/12 text-orange-200", children: label }, label, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 185,
                  columnNumber: 55
                }, this))
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 181,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 172,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 170,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(Card, { className: "border-white/10 bg-white/[0.03]", children: [
            /* @__PURE__ */ jsxDEV(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxDEV(CardTitle, { className: "text-lg", children: "Particao energetica" }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 191,
              columnNumber: 46
            }, this) }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 191,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsxDEV("div", { id: "summary-macro-chart", className: "relative h-52 w-52 rounded-full border border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.18)]", style: macroChartStyle, children: [
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-[24%] rounded-full border border-white/10 bg-[#171212]" }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 195,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center", children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Macro" }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 196,
                    columnNumber: 111
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "mt-1 text-2xl font-black text-white", children: result.totalKcal.toFixed(0) }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 196,
                    columnNumber: 192
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: "kcal/dia" }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 196,
                    columnNumber: 276
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 196,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 194,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 193,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid gap-3 md:grid-cols-3", children: result.evaluation.macroSplit.map((slice) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-white/10 bg-black/10 p-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "h-3 w-3 rounded-full", style: { backgroundColor: slice.color } }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 200,
                    columnNumber: 191
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-semibold text-white", children: slice.label }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 200,
                    columnNumber: 273
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 200,
                  columnNumber: 150
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-xl font-black text-white", children: [
                  slice.percent.toFixed(1),
                  "%"
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 200,
                  columnNumber: 344
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: [
                  slice.grams.toFixed(1),
                  " g · ",
                  slice.kcal.toFixed(1),
                  " kcal"
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 200,
                  columnNumber: 425
                }, this)
              ] }, slice.key, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 200,
                columnNumber: 66
              }, this)) }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 199,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 192,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 190,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 169,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Card, { className: "border-white/10 bg-white/[0.03]", children: [
          /* @__PURE__ */ jsxDEV(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxDEV(CardTitle, { className: "text-lg", children: "Resumo nutricional" }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 207,
            columnNumber: 44
          }, this) }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 207,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(CardContent, { className: "grid gap-3 md:grid-cols-4", children: summaryItems.map(([label, value]) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-white/10 bg-black/10 p-4", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: label }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 209,
              columnNumber: 135
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "mt-1 font-semibold text-white", children: value }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 209,
              columnNumber: 191
            }, this)
          ] }, label, true, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 209,
            columnNumber: 55
          }, this)) }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 208,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 206,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Card, { className: "border-white/10 bg-white/[0.03]", children: [
          /* @__PURE__ */ jsxDEV(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxDEV(CardTitle, { className: "text-lg", children: "Contribuicao por alimento" }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 214,
            columnNumber: 44
          }, this) }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 214,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(CardContent, { className: "space-y-3", children: result.contributions.map((item) => {
            const food = getFoodById(item.foodId);
            return /* @__PURE__ */ jsxDEV("div", { className: "grid gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 md:grid-cols-4", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white", children: item.foodName }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 218,
                  columnNumber: 143
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: food?.categoryNormalized ?? "Sem categoria" }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 218,
                  columnNumber: 202
                }, this)
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 218,
                columnNumber: 138
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: "Inclusao" }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 218,
                  columnNumber: 307
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-white", children: [
                  item.inclusionPct.toFixed(2),
                  "%"
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 218,
                  columnNumber: 364
                }, this)
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 218,
                columnNumber: 302
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: "Oferta diaria" }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 218,
                  columnNumber: 448
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-white", children: [
                  item.gramsAsFed.toFixed(2),
                  " g"
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 218,
                  columnNumber: 510
                }, this)
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 218,
                columnNumber: 443
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: "Energia" }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 218,
                  columnNumber: 593
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-white", children: [
                  item.deliveredKcal.toFixed(2),
                  " kcal"
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 218,
                  columnNumber: 649
                }, this)
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 218,
                columnNumber: 588
              }, this)
            ] }, item.foodId, true, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 218,
              columnNumber: 26
            }, this);
          }) }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 215,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 213,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Card, { className: "border-white/10 bg-white/[0.03]", children: [
          /* @__PURE__ */ jsxDEV(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxDEV(CardTitle, { className: "text-lg", children: "Adequacao frente ao perfil" }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 224,
            columnNumber: 44
          }, this) }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 224,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(CardContent, { className: "space-y-3", children: adequacy.map((item) => /* @__PURE__ */ jsxDEV("div", { className: "grid gap-4 rounded-2xl border border-white/10 bg-black/10 p-4 lg:grid-cols-[1.1fr_0.7fr_0.5fr]", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white", children: item.label }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 226,
                columnNumber: 196
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "mt-1 text-xs text-muted-foreground", children: getBasisLabelForUi(item.basisType) }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 226,
                columnNumber: 252
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-xs text-muted-foreground", children: item.reason }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 226,
                columnNumber: 342
              }, this)
            ] }, void 0, true, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 226,
              columnNumber: 191
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: "Entregue" }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 226,
                columnNumber: 420
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "mt-1 font-semibold text-white", children: item.deliveredValue != null ? item.deliveredValue.toFixed(2) : "--" }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 226,
                columnNumber: 477
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-xs text-muted-foreground", children: [
                "Alvo: ",
                item.target?.raw != null ? String(item.target.raw) : "--"
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 226,
                columnNumber: 595
              }, this)
            ] }, void 0, true, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 226,
              columnNumber: 415
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center lg:justify-end", children: /* @__PURE__ */ jsxDEV(StatusBadge, { status: item.status }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 226,
              columnNumber: 770
            }, this) }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 226,
              columnNumber: 720
            }, this)
          ] }, `${item.profileId}-${item.key}`, true, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 226,
            columnNumber: 41
          }, this)) }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 225,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 223,
          columnNumber: 13
        }, this),
        programmedFeeding && /* @__PURE__ */ jsxDEV(Card, { className: "border-white/10 bg-white/[0.03]", children: [
          /* @__PURE__ */ jsxDEV(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxDEV(CardTitle, { className: "text-lg", children: "6. Alimentacao programada" }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 232,
            columnNumber: 46
          }, this) }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 232,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "grid gap-4 xl:grid-cols-[0.75fr_1.25fr]", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 rounded-2xl border border-white/10 bg-black/10 p-4", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white", children: "Configuracao diaria" }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 236,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-4 gap-2", children: [1, 2, 3, 4, 5, 6].map((value) => /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setProgrammedMealsPerDay(value), className: `rounded-xl border px-3 py-3 text-sm transition-all ${programmedMealsPerDay === value ? "border-orange-400/60 bg-orange-500/12 text-white" : "border-white/10 bg-black/10 text-muted-foreground hover:border-orange-500/30 hover:text-white"}`, children: value }, value, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 237,
                columnNumber: 98
              }, this)) }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 237,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: programmedFeeding.meals.map((meal, index) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3 py-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-28 text-sm text-white", children: meal.label }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 238,
                  columnNumber: 207
                }, this),
                /* @__PURE__ */ jsxDEV(Input, { type: "time", value: programmedTimes[index] ?? meal.time, onChange: (event) => setProgrammedTimes((current) => {
                  const next = [...current];
                  next[index] = event.target.value;
                  return next;
                }), className: "max-w-[160px] border-white/10 bg-black/20" }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 238,
                  columnNumber: 268
                }, this)
              ] }, meal.id, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 238,
                columnNumber: 96
              }, this)) }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 238,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4 text-sm text-muted-foreground", children: programmedFeeding.roundingRule }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 239,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 235,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 rounded-2xl border border-white/10 bg-black/10 p-4", children: programmedFeeding.meals.map((meal) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-white/10 bg-[#181212] p-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white", children: meal.label }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 207
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: meal.time }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 263
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 242,
                  columnNumber: 202
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-lg font-black text-orange-300", children: [
                  meal.totalGrams,
                  " g"
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 242,
                  columnNumber: 329
                }, this)
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 242,
                columnNumber: 145
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-3 overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full min-w-[460px] text-sm", children: [
                /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "text-left text-muted-foreground", children: [
                  /* @__PURE__ */ jsxDEV("th", { className: "pb-2 font-medium", children: "Ingrediente" }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 549
                  }, this),
                  /* @__PURE__ */ jsxDEV("th", { className: "pb-2 font-medium", children: "Qtd." }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 598
                  }, this),
                  /* @__PURE__ */ jsxDEV("th", { className: "pb-2 font-medium", children: "Comeu?" }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 640
                  }, this),
                  /* @__PURE__ */ jsxDEV("th", { className: "pb-2 font-medium", children: "Sobra" }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 684
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 242,
                  columnNumber: 501
                }, this) }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 242,
                  columnNumber: 494
                }, this),
                /* @__PURE__ */ jsxDEV("tbody", { children: meal.items.map((item) => /* @__PURE__ */ jsxDEV("tr", { className: "border-t border-white/5", children: [
                  /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-white", children: item.foodName }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 847
                  }, this),
                  /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-white", children: [
                    item.gramsAsFed,
                    " g"
                  ] }, void 0, true, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 899
                  }, this),
                  /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-muted-foreground", children: "Sim / Nao" }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 955
                  }, this),
                  /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-muted-foreground", children: "Pesar sobra" }, void 0, false, {
                    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                    lineNumber: 242,
                    columnNumber: 1012
                  }, this)
                ] }, `${meal.id}-${item.foodId}`, true, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 242,
                  columnNumber: 773
                }, this)) }, void 0, false, {
                  fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                  lineNumber: 242,
                  columnNumber: 740
                }, this)
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 242,
                columnNumber: 446
              }, this) }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 242,
                columnNumber: 408
              }, this)
            ] }, meal.id, true, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 242,
              columnNumber: 62
            }, this)) }, void 0, false, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 241,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 234,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 233,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 231,
          columnNumber: 15
        }, this),
        patient.isHospitalized && /* @__PURE__ */ jsxDEV(Card, { className: "border-white/10 bg-white/[0.03]", children: [
          /* @__PURE__ */ jsxDEV(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxDEV(CardTitle, { className: "text-lg", children: "Hospitalizacao e progressao alimentar" }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 251,
            columnNumber: 46
          }, this) }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 251,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(CardContent, { className: "grid gap-3 md:grid-cols-4", children: [
            [["Risco", hospitalRisk === "high" ? "Alto risco" : hospitalRisk === "moderate" ? "Risco moderado" : "Baixo risco"], ["Via", hospital.feedingRoute ?? "Nao informada"], ["Ingestao recente", `${hospital.recentIntakePercent ?? 0}%`], ["Protocolo", hospital.progressionProtocol === "3_days" ? "3 dias" : "4 dias"]].map(([label, value]) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-white/10 bg-black/10 p-4", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: label }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 252,
                columnNumber: 484
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "mt-1 font-semibold text-white", children: value }, void 0, false, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 252,
                columnNumber: 540
              }, this)
            ] }, label, true, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 252,
              columnNumber: 404
            }, this)),
            !!progressionPlan.length && progressionPlan.map((day) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] p-4", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: [
                "Dia ",
                day.day
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 252,
                columnNumber: 758
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "mt-1 text-lg font-bold text-orange-300", children: [
                day.kcal.toFixed(0),
                " kcal"
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 252,
                columnNumber: 820
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground", children: [
                day.percent,
                "% do RER"
              ] }, void 0, true, {
                fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
                lineNumber: 252,
                columnNumber: 904
              }, this)
            ] }, day.day, true, {
              fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
              lineNumber: 252,
              columnNumber: 662
            }, this))
          ] }, void 0, true, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 252,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 250,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
        lineNumber: 168,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-t border-border pt-6 dark:border-white/5", children: [
        /* @__PURE__ */ jsxDEV(Button, { variant: "outline", onClick: () => navigate(`${NEW_ROUTE}/food`), className: "gap-2", children: [
          /* @__PURE__ */ jsxDEV(ChevronLeft, { className: "h-4 w-4" }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 258,
            columnNumber: 103
          }, this),
          " Voltar para formulacao"
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Button, { size: "lg", className: "gap-2", onClick: handleSave, id: "btn-save-plan", children: [
          /* @__PURE__ */ jsxDEV(Save, { className: "h-5 w-5" }, void 0, false, {
            fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
            lineNumber: 259,
            columnNumber: 89
          }, this),
          " Salvar no modulo"
        ] }, void 0, true, {
          fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
          lineNumber: 259,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
        lineNumber: 257,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
      lineNumber: 154,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
      lineNumber: 153,
      columnNumber: 7
    }, this),
    printableReport && /* @__PURE__ */ jsxDEV(PrintableReportDocument, { report: printableReport, className: "hidden print:block" }, void 0, false, {
      fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
      lineNumber: 264,
      columnNumber: 27
    }, this)
  ] }, void 0, true, {
    fileName: "C:/PROJETOS VET/Vetius/modules/energia-vet/pages/steps/SummaryStep.tsx",
    lineNumber: 150,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN1bW1hcnlTdGVwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgQ2hldnJvbkxlZnQsIERvd25sb2FkLCBQcmludGVyLCBTYXZlIH0gZnJvbSAnbHVjaWRlLXJlYWN0J1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICdzb25uZXInXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3VpL2J1dHRvbidcbmltcG9ydCB7IENhcmQsIENhcmRDb250ZW50LCBDYXJkSGVhZGVyLCBDYXJkVGl0bGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3VpL2NhcmQnXG5pbXBvcnQgeyBCYWRnZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWkvYmFkZ2UnXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWkvaW5wdXQnXG5pbXBvcnQgeyB1c2VDYWxjdWxhdGlvblN0b3JlIH0gZnJvbSAnLi4vLi4vc3RvcmUvY2FsY3VsYXRpb25TdG9yZSdcbmltcG9ydCB7IGNvbXB1dGVEaWV0UGxhbiB9IGZyb20gJy4uLy4uL2xpYi9kaWV0RW5naW5lJ1xuaW1wb3J0IHsgZ2V0Rm9vZEJ5SWQsIGdldE51dHJpZW50RGVmaW5pdGlvbiwgZ2V0UmVxdWlyZW1lbnRCeUlkIH0gZnJvbSAnLi4vLi4vbGliL2dlbnV0cmlEYXRhJ1xuaW1wb3J0IHsgc2F2ZVJlcG9ydCB9IGZyb20gJy4uLy4uL2xpYi9wZXJzaXN0ZW5jZSdcbmltcG9ydCB7IGV4cG9ydFJlcG9ydFBkZiB9IGZyb20gJy4uLy4uL2xpYi9yZXBvcnREb2N1bWVudCdcbmltcG9ydCB7IGNhbGN1bGF0ZVJlZmVlZGluZ1Jpc2ssIGdldFBoeXNpb2xvZ2ljU3RhdGVCeUlkLCBnZXRQcm9ncmVzc2lvblBsYW4zRGF5cywgZ2V0UHJvZ3Jlc3Npb25QbGFuNERheXMgfSBmcm9tICcuLi8uLi9saWIvbnV0cml0aW9uJ1xuaW1wb3J0IHsgZ2V0Q2xpbmljYWxQcm9maWxlQmFkZ2VzLCBnZXRIdW1hblJlcXVpcmVtZW50TGFiZWwgfSBmcm9tICcuLi8uLi9saWIvY2xpbmljYWxQcm9maWxlcydcbmltcG9ydCB7IGJ1aWxkUHJvZ3JhbW1lZEZlZWRpbmdQbGFuIH0gZnJvbSAnLi4vLi4vbGliL3Byb2dyYW1tZWRGZWVkaW5nJ1xuaW1wb3J0IFByaW50YWJsZVJlcG9ydERvY3VtZW50IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUHJpbnRhYmxlUmVwb3J0RG9jdW1lbnQnXG5pbXBvcnQgdHlwZSB7IFN0b3JlZENhbGN1bGF0aW9uUmVwb3J0IH0gZnJvbSAnLi4vLi4vdHlwZXMnXG5cbmNvbnN0IE5FV19ST1VURSA9ICcvY2FsY3VsYWRvcmEtZW5lcmdldGljYS9uZXcnXG5jb25zdCBNT0RVTEVfUk9VVEUgPSAnL2NhbGN1bGFkb3JhLWVuZXJnZXRpY2EnXG5cbmZ1bmN0aW9uIGlzUGVyY2VudExpa2VLZXkoa2V5OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGtleS5lbmRzV2l0aCgnUGN0Jylcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGFpbHlBbW91bnQoa2V5OiBzdHJpbmcsIHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gJy0tJ1xuICBjb25zdCBkZWZpbml0aW9uID0gZ2V0TnV0cmllbnREZWZpbml0aW9uKGtleSlcbiAgaWYgKGlzUGVyY2VudExpa2VLZXkoa2V5KSkgcmV0dXJuIGAke3ZhbHVlLnRvRml4ZWQoMil9IGcvZGlhYFxuICByZXR1cm4gYCR7dmFsdWUudG9GaXhlZCgyKX0gJHtkZWZpbml0aW9uPy51bml0ID8/ICcnfS9kaWFgLnRyaW0oKVxufVxuXG5mdW5jdGlvbiBTdGF0dXNCYWRnZSh7IHN0YXR1cyB9OiB7IHN0YXR1czogJ2FkZXF1YXRlJyB8ICdiZWxvdycgfCAnYWJvdmUnIHwgJ2luc3VmZmljaWVudF9kYXRhJyB8ICdtYW51YWwnIH0pIHtcbiAgY29uc3QgbWFwID0ge1xuICAgIGFkZXF1YXRlOiAnYm9yZGVyLWVtZXJhbGQtNDAwLzMwIGJnLWVtZXJhbGQtNTAwLzEwIHRleHQtZW1lcmFsZC0yMDAnLFxuICAgIGJlbG93OiAnYm9yZGVyLXJlZC00MDAvMzAgYmctcmVkLTUwMC8xMCB0ZXh0LXJlZC0yMDAnLFxuICAgIGFib3ZlOiAnYm9yZGVyLWFtYmVyLTQwMC8zMCBiZy1hbWJlci01MDAvMTAgdGV4dC1hbWJlci0yMDAnLFxuICAgIG1hbnVhbDogJ2JvcmRlci1za3ktNDAwLzMwIGJnLXNreS01MDAvMTAgdGV4dC1za3ktMjAwJyxcbiAgICBpbnN1ZmZpY2llbnRfZGF0YTogJ2JvcmRlci13aGl0ZS8xNSBiZy13aGl0ZS81IHRleHQtbXV0ZWQtZm9yZWdyb3VuZCcsXG4gIH0gYXMgY29uc3RcbiAgY29uc3QgbGFiZWwgPVxuICAgIHN0YXR1cyA9PT0gJ2FkZXF1YXRlJyA/ICdBZGVxdWFkbycgOiBzdGF0dXMgPT09ICdiZWxvdycgPyAnQWJhaXhvIGRvIGFsdm8nIDogc3RhdHVzID09PSAnYWJvdmUnID8gJ0FjaW1hIGRvIGFsdm8nIDogc3RhdHVzID09PSAnbWFudWFsJyA/ICdSZXZpc2FvIG1hbnVhbCcgOiAnRGFkb3MgaW5zdWZpY2llbnRlcydcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IHJvdW5kZWQtZnVsbCBib3JkZXIgcHgtMyBweS0xIHRleHQteHMgZm9udC1tZWRpdW0gJHttYXBbc3RhdHVzXX1gfT57bGFiZWx9PC9zcGFuPlxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdW1tYXJ5U3RlcCgpIHtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpXG4gIGNvbnN0IHsgcGF0aWVudCwgZW5lcmd5LCB0YXJnZXQsIGRpZXQsIGhvc3BpdGFsIH0gPSB1c2VDYWxjdWxhdGlvblN0b3JlKClcbiAgY29uc3QgW3Byb2dyYW1tZWRNZWFsc1BlckRheSwgc2V0UHJvZ3JhbW1lZE1lYWxzUGVyRGF5XSA9IHVzZVN0YXRlKGRpZXQucHJvZ3JhbW1lZEZlZWRpbmc/Lm1lYWxzUGVyRGF5ID8/IGRpZXQubWVhbHNQZXJEYXkgPz8gMilcbiAgY29uc3QgW3Byb2dyYW1tZWRUaW1lcywgc2V0UHJvZ3JhbW1lZFRpbWVzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihkaWV0LnByb2dyYW1tZWRGZWVkaW5nPy5tZWFscy5tYXAoKG1lYWwpID0+IG1lYWwudGltZSkgPz8gW10pXG5cbiAgY29uc3Qgc3BlY2llcyA9IHBhdGllbnQuc3BlY2llcyA/PyAnZG9nJ1xuICBjb25zdCBjdXJyZW50V2VpZ2h0ID0gcGF0aWVudC5jdXJyZW50V2VpZ2h0ID8/IDBcbiAgY29uc3QgcGh5c2lvbG9naWNTdGF0ZUxhYmVsID0gZ2V0UGh5c2lvbG9naWNTdGF0ZUJ5SWQoZW5lcmd5LnN0YXRlSWQgPz8gJycpPy5sYWJlbCA/PyAnTmFvIGluZm9ybWFkbydcbiAgY29uc3QgY29tb3JiaWRpdHlMYWJlbHMgPSB1c2VNZW1vKCgpID0+IGdldENsaW5pY2FsUHJvZmlsZUJhZGdlcyhzcGVjaWVzLCBwYXRpZW50LmNvbW9yYmlkaXR5SWRzID8/IFtdKSwgW3BhdGllbnQuY29tb3JiaWRpdHlJZHMsIHNwZWNpZXNdKVxuXG4gIGNvbnN0IHJlc3VsdCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghZGlldC5lbnRyaWVzPy5sZW5ndGggfHwgIXRhcmdldC50YXJnZXRFbmVyZ3kgfHwgIWN1cnJlbnRXZWlnaHQpIHJldHVybiBudWxsXG4gICAgcmV0dXJuIGNvbXB1dGVEaWV0UGxhbih7XG4gICAgICBlbnRyaWVzOiBkaWV0LmVudHJpZXMsXG4gICAgICB0YXJnZXRFbmVyZ3k6IHRhcmdldC50YXJnZXRFbmVyZ3ksXG4gICAgICBzcGVjaWVzLFxuICAgICAgd2VpZ2h0S2c6IGN1cnJlbnRXZWlnaHQsXG4gICAgICBtZWFsc1BlckRheTogZGlldC5tZWFsc1BlckRheSA/PyAyLFxuICAgICAgcGF0aWVudE5hbWU6IHBhdGllbnQubmFtZSA/PyAnUGFjaWVudGUnLFxuICAgICAgcmVxdWlyZW1lbnRQcm9maWxlSWQ6IGRpZXQucmVxdWlyZW1lbnRQcm9maWxlSWQsXG4gICAgICBhZGRpdGlvbmFsUmVxdWlyZW1lbnRQcm9maWxlSWRzOiBkaWV0LmFkZGl0aW9uYWxSZXF1aXJlbWVudFByb2ZpbGVJZHMsXG4gICAgfSlcbiAgfSwgW2N1cnJlbnRXZWlnaHQsIGRpZXQuYWRkaXRpb25hbFJlcXVpcmVtZW50UHJvZmlsZUlkcywgZGlldC5lbnRyaWVzLCBkaWV0Lm1lYWxzUGVyRGF5LCBkaWV0LnJlcXVpcmVtZW50UHJvZmlsZUlkLCBwYXRpZW50Lm5hbWUsIHNwZWNpZXMsIHRhcmdldC50YXJnZXRFbmVyZ3ldKVxuXG4gIGNvbnN0IHByb2dyYW1tZWRGZWVkaW5nID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgcmVzdWx0XG4gICAgICAgID8gYnVpbGRQcm9ncmFtbWVkRmVlZGluZ1BsYW4oeyBjb250cmlidXRpb25zOiByZXN1bHQuY29udHJpYnV0aW9ucywgbWVhbHNQZXJEYXk6IHByb2dyYW1tZWRNZWFsc1BlckRheSwgdGltZXM6IHByb2dyYW1tZWRUaW1lcywgZW5hYmxlZDogdHJ1ZSB9KVxuICAgICAgICA6IG51bGwsXG4gICAgW3Byb2dyYW1tZWRNZWFsc1BlckRheSwgcHJvZ3JhbW1lZFRpbWVzLCByZXN1bHRdLFxuICApXG5cbiAgY29uc3QgcHJpbnRhYmxlUmVwb3J0ID0gdXNlTWVtbzxTdG9yZWRDYWxjdWxhdGlvblJlcG9ydCB8IG51bGw+KCgpID0+IHtcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIG51bGxcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdwcmV2aWV3LXJlcG9ydCcsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHBhdGllbnQsXG4gICAgICBlbmVyZ3ksXG4gICAgICB0YXJnZXQsXG4gICAgICBkaWV0OiB7XG4gICAgICAgIC4uLmRpZXQsXG4gICAgICAgIGVudHJpZXM6IGRpZXQuZW50cmllcyxcbiAgICAgICAgdG90YWxEcnlNYXR0ZXJHcmFtczogcmVzdWx0LnRvdGFsRHJ5TWF0dGVyR3JhbXMsXG4gICAgICAgIHRvdGFsQXNGZWRHcmFtczogcmVzdWx0LnRvdGFsQXNGZWRHcmFtcyxcbiAgICAgICAgZ3JhbXNQZXJEYXk6IHJlc3VsdC50b3RhbEFzRmVkR3JhbXMsXG4gICAgICAgIGdyYW1zUGVyTWVhbDogcmVzdWx0LmZlZWRpbmdQbGFuLm1lYWxzWzBdPy5ncmFtc0FzRmVkID8/IDAsXG4gICAgICAgIHRhcmdldEVuZXJneTogdGFyZ2V0LnRhcmdldEVuZXJneSA/PyAwLFxuICAgICAgICBtZWFsc1BlckRheTogZGlldC5tZWFsc1BlckRheSA/PyAyLFxuICAgICAgICBkaWV0VHlwZTogZGlldC5kaWV0VHlwZSA/PyAnY29tbWVyY2lhbCcsXG4gICAgICAgIHByb2dyYW1tZWRGZWVkaW5nOiBwcm9ncmFtbWVkRmVlZGluZyA/PyB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgICAgaG9zcGl0YWwsXG4gICAgICBmb3JtdWxhOiB7XG4gICAgICAgIGNvbnRyaWJ1dGlvbnM6IHJlc3VsdC5jb250cmlidXRpb25zLFxuICAgICAgICBldmFsdWF0aW9uOiByZXN1bHQuZXZhbHVhdGlvbixcbiAgICAgICAgZmVlZGluZ1BsYW46IHJlc3VsdC5mZWVkaW5nUGxhbixcbiAgICAgICAgcHJvZ3JhbW1lZEZlZWRpbmc6IHByb2dyYW1tZWRGZWVkaW5nID8/IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgfVxuICB9LCBbZGlldCwgZW5lcmd5LCBob3NwaXRhbCwgcGF0aWVudCwgcHJvZ3JhbW1lZEZlZWRpbmcsIHJlc3VsdCwgdGFyZ2V0XSlcblxuICBjb25zdCBzZWxlY3RlZFJlcXVpcmVtZW50ID0gdXNlTWVtbygoKSA9PiBnZXRSZXF1aXJlbWVudEJ5SWQoZGlldC5yZXF1aXJlbWVudFByb2ZpbGVJZCksIFtkaWV0LnJlcXVpcmVtZW50UHJvZmlsZUlkXSlcbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gcmVzdWx0XG4gICAgPyBbXG4gICAgICAgIFsnRW5lcmdpYSBlbnRyZWd1ZScsIGAke3Jlc3VsdC50b3RhbEtjYWwudG9GaXhlZCgxKX0ga2NhbC9kaWFgXSxcbiAgICAgICAgWydQcm90ZWluYSB0b3RhbCcsIGZvcm1hdERhaWx5QW1vdW50KCdjcnVkZVByb3RlaW5QY3QnLCByZXN1bHQuZXZhbHVhdGlvbi50b3RhbERlbGl2ZXJlZC5jcnVkZVByb3RlaW5QY3QpXSxcbiAgICAgICAgWydHb3JkdXJhIHRvdGFsJywgZm9ybWF0RGFpbHlBbW91bnQoJ2V0aGVyRXh0cmFjdFBjdCcsIHJlc3VsdC5ldmFsdWF0aW9uLnRvdGFsRGVsaXZlcmVkLmV0aGVyRXh0cmFjdFBjdCldLFxuICAgICAgICBbJ0NhcmJvaWRyYXRvIGVzdGltYWRvJywgZm9ybWF0RGFpbHlBbW91bnQoJ25pdHJvZ2VuRnJlZUV4dHJhY3RQY3QnLCByZXN1bHQuZXZhbHVhdGlvbi50b3RhbERlbGl2ZXJlZC5uaXRyb2dlbkZyZWVFeHRyYWN0UGN0KV0sXG4gICAgICAgIFsnRmlicmEnLCBmb3JtYXREYWlseUFtb3VudCgnY3J1ZGVGaWJlclBjdCcsIHJlc3VsdC5ldmFsdWF0aW9uLnRvdGFsRGVsaXZlcmVkLmNydWRlRmliZXJQY3QpXSxcbiAgICAgICAgWydDYWxjaW8nLCBmb3JtYXREYWlseUFtb3VudCgnY2FsY2l1bVBjdCcsIHJlc3VsdC5ldmFsdWF0aW9uLnRvdGFsRGVsaXZlcmVkLmNhbGNpdW1QY3QpXSxcbiAgICAgICAgWydGb3Nmb3JvJywgZm9ybWF0RGFpbHlBbW91bnQoJ3Bob3NwaG9ydXNQY3QnLCByZXN1bHQuZXZhbHVhdGlvbi50b3RhbERlbGl2ZXJlZC5waG9zcGhvcnVzUGN0KV0sXG4gICAgICAgIC4uLihyZXN1bHQuZXZhbHVhdGlvbi50b3RhbERlbGl2ZXJlZC50YXVyaW5lUGN0ICE9IG51bGwgPyBbWydUYXVyaW5hJywgZm9ybWF0RGFpbHlBbW91bnQoJ3RhdXJpbmVQY3QnLCByZXN1bHQuZXZhbHVhdGlvbi50b3RhbERlbGl2ZXJlZC50YXVyaW5lUGN0KV0gYXMgY29uc3RdIDogW10pLFxuICAgICAgXVxuICAgIDogW11cblxuICBjb25zdCBhZGVxdWFjeSA9IHJlc3VsdD8uZXZhbHVhdGlvbi5hZGVxdWFjeS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uc3RhdHVzICE9PSAnaW5zdWZmaWNpZW50X2RhdGEnKSA/PyBbXVxuICBjb25zdCBob3NwaXRhbFJpc2sgPSBwYXRpZW50LmlzSG9zcGl0YWxpemVkXG4gICAgPyBjYWxjdWxhdGVSZWZlZWRpbmdSaXNrKGhvc3BpdGFsLmRheXNBbm9yZXhpYyA/PyAwLCBob3NwaXRhbC5kYXlzSHlwb3JleGljID8/IDAsIGhvc3BpdGFsLnJlY2VudEludGFrZVBlcmNlbnQgPz8gMTAwLCBwYXRpZW50LmJjcyA/PyA1LCAoaG9zcGl0YWwuZWxlY3Ryb2x5dGVzPy5waG9zcGhvcnVzID8/IDEpIDwgMSB8fCAoaG9zcGl0YWwuZWxlY3Ryb2x5dGVzPy5wb3Rhc3NpdW0gPz8gMSkgPCAxIHx8IChob3NwaXRhbC5lbGVjdHJvbHl0ZXM/Lm1hZ25lc2l1bSA/PyAxKSA8IDEpXG4gICAgOiBudWxsXG4gIGNvbnN0IHByb2dyZXNzaW9uUGxhbiA9IHBhdGllbnQuaXNIb3NwaXRhbGl6ZWQgJiYgKGVuZXJneS5yZXIgPz8gMCkgPiAwID8gKGhvc3BpdGFsLnByb2dyZXNzaW9uUHJvdG9jb2wgPT09ICczX2RheXMnID8gZ2V0UHJvZ3Jlc3Npb25QbGFuM0RheXMoZW5lcmd5LnJlciA/PyAwKSA6IGdldFByb2dyZXNzaW9uUGxhbjREYXlzKGVuZXJneS5yZXIgPz8gMCkpIDogW11cblxuICBjb25zdCBtYWNyb0NoYXJ0U3R5bGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHsgYmFja2dyb3VuZDogJ2NvbmljLWdyYWRpZW50KCMzMzQxNTUgMCUgMTAwJSknIH1cbiAgICBjb25zdCBbcHJvdGVpbiwgZmF0LCBjYXJiXSA9IHJlc3VsdC5ldmFsdWF0aW9uLm1hY3JvU3BsaXRcbiAgICBjb25zdCBwcm90ZWluRW5kID0gcHJvdGVpbi5wZXJjZW50XG4gICAgY29uc3QgZmF0RW5kID0gcHJvdGVpbi5wZXJjZW50ICsgZmF0LnBlcmNlbnRcbiAgICByZXR1cm4geyBiYWNrZ3JvdW5kOiBgY29uaWMtZ3JhZGllbnQoJHtwcm90ZWluLmNvbG9yfSAwJSAke3Byb3RlaW5FbmR9JSwgJHtmYXQuY29sb3J9ICR7cHJvdGVpbkVuZH0lICR7ZmF0RW5kfSUsICR7Y2FyYi5jb2xvcn0gJHtmYXRFbmR9JSAxMDAlKWAgfVxuICB9LCBbcmVzdWx0XSlcblxuICBjb25zdCBoYW5kbGVTYXZlID0gKCkgPT4ge1xuICAgIGlmICghcHJpbnRhYmxlUmVwb3J0KSByZXR1cm5cbiAgICBzYXZlUmVwb3J0KHsgLi4ucHJpbnRhYmxlUmVwb3J0LCBpZDogY3J5cHRvLnJhbmRvbVVVSUQoKSwgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfSlcbiAgICB0b2FzdC5zdWNjZXNzKCdSZXN1bW8gc2Fsdm8gbm8gaGlzdG9yaWNvIGRvIEVuZXJnaWEgVmV0LicpXG4gICAgbmF2aWdhdGUoTU9EVUxFX1JPVVRFKVxuICB9XG5cbiAgaWYgKCFyZXN1bHQpIHtcbiAgICByZXR1cm4gPENhcmQgY2xhc3NOYW1lPVwidy1mdWxsXCI+PENhcmRDb250ZW50IGNsYXNzTmFtZT1cInAtNiB0ZXh0LXNtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPkEgZm9ybXVsYWNhbyBhaW5kYSBuYW8gZm9pIGNvbmNsdWlkYS48L0NhcmRDb250ZW50PjwvQ2FyZD5cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgcGItMjBcIj5cbiAgICAgIDxzdHlsZT57YEBtZWRpYSBwcmludHtib2R5LGh0bWx7YmFja2dyb3VuZDp3aGl0ZSFpbXBvcnRhbnQ7Y29sb3I6YmxhY2shaW1wb3J0YW50O3BhZGRpbmc6MCFpbXBvcnRhbnQ7bWFyZ2luOjAhaW1wb3J0YW50O31AcGFnZXtzaXplOkE0O21hcmdpbjoxMm1tIDE0bW07fWJvZHkgKnt2aXNpYmlsaXR5OmhpZGRlbiFpbXBvcnRhbnQ7fS5uby1wcmludCwubm8tcHJpbnQgKntkaXNwbGF5Om5vbmUhaW1wb3J0YW50O30jcHJpbnQtcmVwb3J0LXJvb3QsI3ByaW50LXJlcG9ydC1yb290ICp7dmlzaWJpbGl0eTp2aXNpYmxlIWltcG9ydGFudDt9I3ByaW50LXJlcG9ydC1yb290e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3Bvc2l0aW9uOmFic29sdXRlO2luc2V0OjA7d2lkdGg6MTAwJTt9LnJ4LXBhZ2UtYnJlYWt7YnJlYWstYmVmb3JlOnBhZ2U7fX1gfTwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm8tcHJpbnQgcHJpbnQ6aGlkZGVuIHNwYWNlLXktNlwiPlxuICAgICAgICA8Q2FyZCBjbGFzc05hbWU9XCJib3JkZXItYm9yZGVyIGJnLXdoaXRlIHNoYWRvdy1bMF8xOHB4XzUwcHhfcmdiYSgwLDAsMCwwLjA4KV0gZGFyazpib3JkZXItb3JhbmdlLTQwMC8xNSBkYXJrOmJnLWdyYWRpZW50LXRvLWIgZGFyazpmcm9tLWNhcmQgZGFyazp2aWEtY2FyZCBkYXJrOnRvLWNhcmQvOTUgZGFyazpzaGFkb3ctWzBfMThweF81MHB4X3JnYmEoMCwwLDAsMC4yMildXCI+XG4gICAgICAgICAgPENhcmRIZWFkZXIgY2xhc3NOYW1lPVwiYm9yZGVyLWIgYm9yZGVyLWJvcmRlciBiZy1zbGF0ZS01MCBkYXJrOmJvcmRlci13aGl0ZS81IGRhcms6Ymctb3JhbmdlLTUwMC9bMC4wNF1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtM1wiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxDYXJkVGl0bGUgY2xhc3NOYW1lPVwidGV4dC0yeGwgdGV4dC1mb3JlZ3JvdW5kIGRhcms6dGV4dC13aGl0ZVwiPlJlc3VtbyBkbyBwbGFubyBudXRyaWNpb25hbDwvQ2FyZFRpdGxlPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5SZXN1bW8gY2xpbmljbywgZm9ybXVsYWNhbywgYWxpbWVudGFjYW8gcHJvZ3JhbWFkYSBlIGFkZXF1YWNhbyBmaW5hbC48L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwib3V0bGluZVwiIHNpemU9XCJzbVwiIGNsYXNzTmFtZT1cImdhcC0yXCIgb25DbGljaz17KCkgPT4gd2luZG93LnByaW50KCl9PjxQcmludGVyIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPiBJbXByaW1pciAvIFBERjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gc2l6ZT1cInNtXCIgY2xhc3NOYW1lPVwiZ2FwLTJcIiBvbkNsaWNrPXsoKSA9PiBwcmludGFibGVSZXBvcnQgJiYgZXhwb3J0UmVwb3J0UGRmKHByaW50YWJsZVJlcG9ydCl9PjxEb3dubG9hZCBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz4gRXhwb3J0YXIgUERGPC9CdXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9DYXJkSGVhZGVyPlxuXG4gICAgICAgICAgPENhcmRDb250ZW50IGNsYXNzTmFtZT1cInNwYWNlLXktNiBwdC02XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ2FwLTYgeGw6Z3JpZC1jb2xzLVswLjk1ZnJfMS4wNWZyXVwiPlxuICAgICAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9XCJib3JkZXItd2hpdGUvMTAgYmctd2hpdGUvWzAuMDNdXCI+XG4gICAgICAgICAgICAgICAgPENhcmRIZWFkZXIgY2xhc3NOYW1lPVwicGItM1wiPjxDYXJkVGl0bGUgY2xhc3NOYW1lPVwidGV4dC1sZ1wiPlBhY2llbnRlIGUgZW5lcmdpYTwvQ2FyZFRpdGxlPjwvQ2FyZEhlYWRlcj5cbiAgICAgICAgICAgICAgICA8Q2FyZENvbnRlbnQgY2xhc3NOYW1lPVwiZ3JpZCBnYXAtMyBtZDpncmlkLWNvbHMtMlwiPlxuICAgICAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICAgICAgWydQYWNpZW50ZScsIHBhdGllbnQubmFtZSB8fCAnTmFvIGluZm9ybWFkbyddLFxuICAgICAgICAgICAgICAgICAgICBbJ1R1dG9yJywgcGF0aWVudC5vd25lck5hbWUgfHwgJy0tJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnRXNwZWNpZScsIHNwZWNpZXMgPT09ICdkb2cnID8gJ0NhbycgOiAnR2F0byddLFxuICAgICAgICAgICAgICAgICAgICBbJ1BlcmZpbCBmaW5hbCcsIHBoeXNpb2xvZ2ljU3RhdGVMYWJlbF0sXG4gICAgICAgICAgICAgICAgICAgIFsnUGVzbyBhdHVhbCcsIGAke2N1cnJlbnRXZWlnaHQudG9GaXhlZCgyKX0ga2dgXSxcbiAgICAgICAgICAgICAgICAgICAgWydFbmVyZ2lhLWFsdm8nLCBgJHt0YXJnZXQudGFyZ2V0RW5lcmd5Py50b0ZpeGVkKDApID8/ICctLSd9IGtjYWwvZGlhYF0sXG4gICAgICAgICAgICAgICAgICBdLm1hcCgoW2xhYmVsLCB2YWx1ZV0pID0+IDxkaXYga2V5PXtsYWJlbH0gY2xhc3NOYW1lPVwicm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBiZy1ibGFjay8xMCBwLTRcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPntsYWJlbH08L3A+PHAgY2xhc3NOYW1lPVwibXQtMSBmb250LXNlbWlib2xkIHRleHQtd2hpdGVcIj57dmFsdWV9PC9wPjwvZGl2Pil9XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPEJhZGdlIHZhcmlhbnQ9XCJvdXRsaW5lXCI+e3BhdGllbnQuaXNOZXV0ZXJlZCA/ICdDYXN0cmFkbycgOiAnTmFvIGNhc3RyYWRvJ308L0JhZGdlPlxuICAgICAgICAgICAgICAgICAgICA8QmFkZ2UgdmFyaWFudD1cIm91dGxpbmVcIj57cGF0aWVudC5pc0hvc3BpdGFsaXplZCA/ICdIb3NwaXRhbGl6YWRvJyA6ICdBbWJ1bGF0b3JpYWwnfTwvQmFkZ2U+XG4gICAgICAgICAgICAgICAgICAgIDxCYWRnZSB2YXJpYW50PVwib3V0bGluZVwiPnt0YXJnZXQuZ29hbCA9PT0gJ3dlaWdodF9sb3NzJyA/ICdQZXJkYSBkZSBwZXNvJyA6IHRhcmdldC5nb2FsID09PSAnd2VpZ2h0X2dhaW4nID8gJ0dhbmhvIGRlIHBlc28nIDogJ01hbnV0ZW5jYW8nfTwvQmFkZ2U+XG4gICAgICAgICAgICAgICAgICAgIHtjb21vcmJpZGl0eUxhYmVscy5tYXAoKGxhYmVsKSA9PiA8QmFkZ2Uga2V5PXtsYWJlbH0gY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIGJnLW9yYW5nZS01MDAvMTIgdGV4dC1vcmFuZ2UtMjAwXCI+e2xhYmVsfTwvQmFkZ2U+KX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICAgICAgICAgIDwvQ2FyZD5cblxuICAgICAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9XCJib3JkZXItd2hpdGUvMTAgYmctd2hpdGUvWzAuMDNdXCI+XG4gICAgICAgICAgICAgICAgPENhcmRIZWFkZXIgY2xhc3NOYW1lPVwicGItM1wiPjxDYXJkVGl0bGUgY2xhc3NOYW1lPVwidGV4dC1sZ1wiPlBhcnRpY2FvIGVuZXJnZXRpY2E8L0NhcmRUaXRsZT48L0NhcmRIZWFkZXI+XG4gICAgICAgICAgICAgICAgPENhcmRDb250ZW50IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIHB5LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInN1bW1hcnktbWFjcm8tY2hhcnRcIiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTUyIHctNTIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgc2hhZG93LVswXzEycHhfMjRweF9yZ2JhKDAsMCwwLDAuMTgpXVwiIHN0eWxlPXttYWNyb0NoYXJ0U3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtWzI0JV0gcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgYmctWyMxNzEyMTJdXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1jZW50ZXJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPk1hY3JvPC9wPjxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXdoaXRlXCI+e3Jlc3VsdC50b3RhbEtjYWwudG9GaXhlZCgwKX08L3A+PHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5rY2FsL2RpYTwvcD48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBnYXAtMyBtZDpncmlkLWNvbHMtM1wiPlxuICAgICAgICAgICAgICAgICAgICB7cmVzdWx0LmV2YWx1YXRpb24ubWFjcm9TcGxpdC5tYXAoKHNsaWNlKSA9PiA8ZGl2IGtleT17c2xpY2Uua2V5fSBjbGFzc05hbWU9XCJyb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGJnLWJsYWNrLzEwIHAtM1wiPjxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj48c3BhbiBjbGFzc05hbWU9XCJoLTMgdy0zIHJvdW5kZWQtZnVsbFwiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogc2xpY2UuY29sb3IgfX0gLz48cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPntzbGljZS5sYWJlbH08L3A+PC9kaXY+PHAgY2xhc3NOYW1lPVwibXQtMiB0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZVwiPntzbGljZS5wZXJjZW50LnRvRml4ZWQoMSl9JTwvcD48cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPntzbGljZS5ncmFtcy50b0ZpeGVkKDEpfSBnIMK3IHtzbGljZS5rY2FsLnRvRml4ZWQoMSl9IGtjYWw8L3A+PC9kaXY+KX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9XCJib3JkZXItd2hpdGUvMTAgYmctd2hpdGUvWzAuMDNdXCI+XG4gICAgICAgICAgICAgIDxDYXJkSGVhZGVyIGNsYXNzTmFtZT1cInBiLTNcIj48Q2FyZFRpdGxlIGNsYXNzTmFtZT1cInRleHQtbGdcIj5SZXN1bW8gbnV0cmljaW9uYWw8L0NhcmRUaXRsZT48L0NhcmRIZWFkZXI+XG4gICAgICAgICAgICAgIDxDYXJkQ29udGVudCBjbGFzc05hbWU9XCJncmlkIGdhcC0zIG1kOmdyaWQtY29scy00XCI+XG4gICAgICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKFtsYWJlbCwgdmFsdWVdKSA9PiA8ZGl2IGtleT17bGFiZWx9IGNsYXNzTmFtZT1cInJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgYmctYmxhY2svMTAgcC00XCI+PHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj57bGFiZWx9PC9wPjxwIGNsYXNzTmFtZT1cIm10LTEgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+e3ZhbHVlfTwvcD48L2Rpdj4pfVxuICAgICAgICAgICAgICA8L0NhcmRDb250ZW50PlxuICAgICAgICAgICAgPC9DYXJkPlxuXG4gICAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9XCJib3JkZXItd2hpdGUvMTAgYmctd2hpdGUvWzAuMDNdXCI+XG4gICAgICAgICAgICAgIDxDYXJkSGVhZGVyIGNsYXNzTmFtZT1cInBiLTNcIj48Q2FyZFRpdGxlIGNsYXNzTmFtZT1cInRleHQtbGdcIj5Db250cmlidWljYW8gcG9yIGFsaW1lbnRvPC9DYXJkVGl0bGU+PC9DYXJkSGVhZGVyPlxuICAgICAgICAgICAgICA8Q2FyZENvbnRlbnQgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAge3Jlc3VsdC5jb250cmlidXRpb25zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZm9vZCA9IGdldEZvb2RCeUlkKGl0ZW0uZm9vZElkKVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpdGVtLmZvb2RJZH0gY2xhc3NOYW1lPVwiZ3JpZCBnYXAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGJnLWJsYWNrLzEwIHAtNCBtZDpncmlkLWNvbHMtNFwiPjxkaXY+PHAgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+e2l0ZW0uZm9vZE5hbWV9PC9wPjxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+e2Zvb2Q/LmNhdGVnb3J5Tm9ybWFsaXplZCA/PyAnU2VtIGNhdGVnb3JpYSd9PC9wPjwvZGl2PjxkaXY+PHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5JbmNsdXNhbzwvcD48cCBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LXdoaXRlXCI+e2l0ZW0uaW5jbHVzaW9uUGN0LnRvRml4ZWQoMil9JTwvcD48L2Rpdj48ZGl2PjxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+T2ZlcnRhIGRpYXJpYTwvcD48cCBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LXdoaXRlXCI+e2l0ZW0uZ3JhbXNBc0ZlZC50b0ZpeGVkKDIpfSBnPC9wPjwvZGl2PjxkaXY+PHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5FbmVyZ2lhPC9wPjxwIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtd2hpdGVcIj57aXRlbS5kZWxpdmVyZWRLY2FsLnRvRml4ZWQoMil9IGtjYWw8L3A+PC9kaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICAgICAgICA8L0NhcmQ+XG5cbiAgICAgICAgICAgIDxDYXJkIGNsYXNzTmFtZT1cImJvcmRlci13aGl0ZS8xMCBiZy13aGl0ZS9bMC4wM11cIj5cbiAgICAgICAgICAgICAgPENhcmRIZWFkZXIgY2xhc3NOYW1lPVwicGItM1wiPjxDYXJkVGl0bGUgY2xhc3NOYW1lPVwidGV4dC1sZ1wiPkFkZXF1YWNhbyBmcmVudGUgYW8gcGVyZmlsPC9DYXJkVGl0bGU+PC9DYXJkSGVhZGVyPlxuICAgICAgICAgICAgICA8Q2FyZENvbnRlbnQgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAge2FkZXF1YWN5Lm1hcCgoaXRlbSkgPT4gPGRpdiBrZXk9e2Ake2l0ZW0ucHJvZmlsZUlkfS0ke2l0ZW0ua2V5fWB9IGNsYXNzTmFtZT1cImdyaWQgZ2FwLTQgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBiZy1ibGFjay8xMCBwLTQgbGc6Z3JpZC1jb2xzLVsxLjFmcl8wLjdmcl8wLjVmcl1cIj48ZGl2PjxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPntpdGVtLmxhYmVsfTwvcD48cCBjbGFzc05hbWU9XCJtdC0xIHRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+e2dldEJhc2lzTGFiZWxGb3JVaShpdGVtLmJhc2lzVHlwZSl9PC9wPjxwIGNsYXNzTmFtZT1cIm10LTIgdGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj57aXRlbS5yZWFzb259PC9wPjwvZGl2PjxkaXY+PHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5FbnRyZWd1ZTwvcD48cCBjbGFzc05hbWU9XCJtdC0xIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPntpdGVtLmRlbGl2ZXJlZFZhbHVlICE9IG51bGwgPyBpdGVtLmRlbGl2ZXJlZFZhbHVlLnRvRml4ZWQoMikgOiAnLS0nfTwvcD48cCBjbGFzc05hbWU9XCJtdC0yIHRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+QWx2bzoge2l0ZW0udGFyZ2V0Py5yYXcgIT0gbnVsbCA/IFN0cmluZyhpdGVtLnRhcmdldC5yYXcpIDogJy0tJ308L3A+PC9kaXY+PGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBsZzpqdXN0aWZ5LWVuZFwiPjxTdGF0dXNCYWRnZSBzdGF0dXM9e2l0ZW0uc3RhdHVzfSAvPjwvZGl2PjwvZGl2Pil9XG4gICAgICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICAgICAgICA8L0NhcmQ+XG5cbiAgICAgICAgICAgIHtwcm9ncmFtbWVkRmVlZGluZyAmJiAoXG4gICAgICAgICAgICAgIDxDYXJkIGNsYXNzTmFtZT1cImJvcmRlci13aGl0ZS8xMCBiZy13aGl0ZS9bMC4wM11cIj5cbiAgICAgICAgICAgICAgICA8Q2FyZEhlYWRlciBjbGFzc05hbWU9XCJwYi0zXCI+PENhcmRUaXRsZSBjbGFzc05hbWU9XCJ0ZXh0LWxnXCI+Ni4gQWxpbWVudGFjYW8gcHJvZ3JhbWFkYTwvQ2FyZFRpdGxlPjwvQ2FyZEhlYWRlcj5cbiAgICAgICAgICAgICAgICA8Q2FyZENvbnRlbnQgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ2FwLTQgeGw6Z3JpZC1jb2xzLVswLjc1ZnJfMS4yNWZyXVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGJnLWJsYWNrLzEwIHAtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPkNvbmZpZ3VyYWNhbyBkaWFyaWE8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy00IGdhcC0yXCI+e1sxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKHZhbHVlKSA9PiA8YnV0dG9uIGtleT17dmFsdWV9IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRQcm9ncmFtbWVkTWVhbHNQZXJEYXkodmFsdWUpfSBjbGFzc05hbWU9e2Byb3VuZGVkLXhsIGJvcmRlciBweC0zIHB5LTMgdGV4dC1zbSB0cmFuc2l0aW9uLWFsbCAke3Byb2dyYW1tZWRNZWFsc1BlckRheSA9PT0gdmFsdWUgPyAnYm9yZGVyLW9yYW5nZS00MDAvNjAgYmctb3JhbmdlLTUwMC8xMiB0ZXh0LXdoaXRlJyA6ICdib3JkZXItd2hpdGUvMTAgYmctYmxhY2svMTAgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOmJvcmRlci1vcmFuZ2UtNTAwLzMwIGhvdmVyOnRleHQtd2hpdGUnfWB9Pnt2YWx1ZX08L2J1dHRvbj4pfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+e3Byb2dyYW1tZWRGZWVkaW5nLm1lYWxzLm1hcCgobWVhbCwgaW5kZXgpID0+IDxkaXYga2V5PXttZWFsLmlkfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgYmctYmxhY2svMTAgcHgtMyBweS0yXCI+PHNwYW4gY2xhc3NOYW1lPVwidy0yOCB0ZXh0LXNtIHRleHQtd2hpdGVcIj57bWVhbC5sYWJlbH08L3NwYW4+PElucHV0IHR5cGU9XCJ0aW1lXCIgdmFsdWU9e3Byb2dyYW1tZWRUaW1lc1tpbmRleF0gPz8gbWVhbC50aW1lfSBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRQcm9ncmFtbWVkVGltZXMoKGN1cnJlbnQpID0+IHsgY29uc3QgbmV4dCA9IFsuLi5jdXJyZW50XTsgbmV4dFtpbmRleF0gPSBldmVudC50YXJnZXQudmFsdWU7IHJldHVybiBuZXh0IH0pfSBjbGFzc05hbWU9XCJtYXgtdy1bMTYwcHhdIGJvcmRlci13aGl0ZS8xMCBiZy1ibGFjay8yMFwiIC8+PC9kaXY+KX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItb3JhbmdlLTQwMC8yMCBiZy1vcmFuZ2UtNTAwL1swLjA4XSBwLTQgdGV4dC1zbSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj57cHJvZ3JhbW1lZEZlZWRpbmcucm91bmRpbmdSdWxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBiZy1ibGFjay8xMCBwLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7cHJvZ3JhbW1lZEZlZWRpbmcubWVhbHMubWFwKChtZWFsKSA9PiA8ZGl2IGtleT17bWVhbC5pZH0gY2xhc3NOYW1lPVwicm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBiZy1bIzE4MTIxMl0gcC00XCI+PGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTNcIj48ZGl2PjxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPnttZWFsLmxhYmVsfTwvcD48cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPnttZWFsLnRpbWV9PC9wPjwvZGl2PjxwIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB0ZXh0LW9yYW5nZS0zMDBcIj57bWVhbC50b3RhbEdyYW1zfSBnPC9wPjwvZGl2PjxkaXYgY2xhc3NOYW1lPVwibXQtMyBvdmVyZmxvdy14LWF1dG9cIj48dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIG1pbi13LVs0NjBweF0gdGV4dC1zbVwiPjx0aGVhZD48dHIgY2xhc3NOYW1lPVwidGV4dC1sZWZ0IHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPjx0aCBjbGFzc05hbWU9XCJwYi0yIGZvbnQtbWVkaXVtXCI+SW5ncmVkaWVudGU8L3RoPjx0aCBjbGFzc05hbWU9XCJwYi0yIGZvbnQtbWVkaXVtXCI+UXRkLjwvdGg+PHRoIGNsYXNzTmFtZT1cInBiLTIgZm9udC1tZWRpdW1cIj5Db21ldT88L3RoPjx0aCBjbGFzc05hbWU9XCJwYi0yIGZvbnQtbWVkaXVtXCI+U29icmE8L3RoPjwvdHI+PC90aGVhZD48dGJvZHk+e21lYWwuaXRlbXMubWFwKChpdGVtKSA9PiA8dHIga2V5PXtgJHttZWFsLmlkfS0ke2l0ZW0uZm9vZElkfWB9IGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci13aGl0ZS81XCI+PHRkIGNsYXNzTmFtZT1cInB5LTIgdGV4dC13aGl0ZVwiPntpdGVtLmZvb2ROYW1lfTwvdGQ+PHRkIGNsYXNzTmFtZT1cInB5LTIgdGV4dC13aGl0ZVwiPntpdGVtLmdyYW1zQXNGZWR9IGc8L3RkPjx0ZCBjbGFzc05hbWU9XCJweS0yIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlNpbSAvIE5hbzwvdGQ+PHRkIGNsYXNzTmFtZT1cInB5LTIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+UGVzYXIgc29icmE8L3RkPjwvdHI+KX08L3Rib2R5PjwvdGFibGU+PC9kaXY+PC9kaXY+KX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L0NhcmRDb250ZW50PlxuICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7cGF0aWVudC5pc0hvc3BpdGFsaXplZCAmJiAoXG4gICAgICAgICAgICAgIDxDYXJkIGNsYXNzTmFtZT1cImJvcmRlci13aGl0ZS8xMCBiZy13aGl0ZS9bMC4wM11cIj5cbiAgICAgICAgICAgICAgICA8Q2FyZEhlYWRlciBjbGFzc05hbWU9XCJwYi0zXCI+PENhcmRUaXRsZSBjbGFzc05hbWU9XCJ0ZXh0LWxnXCI+SG9zcGl0YWxpemFjYW8gZSBwcm9ncmVzc2FvIGFsaW1lbnRhcjwvQ2FyZFRpdGxlPjwvQ2FyZEhlYWRlcj5cbiAgICAgICAgICAgICAgICA8Q2FyZENvbnRlbnQgY2xhc3NOYW1lPVwiZ3JpZCBnYXAtMyBtZDpncmlkLWNvbHMtNFwiPntbWydSaXNjbycsIGhvc3BpdGFsUmlzayA9PT0gJ2hpZ2gnID8gJ0FsdG8gcmlzY28nIDogaG9zcGl0YWxSaXNrID09PSAnbW9kZXJhdGUnID8gJ1Jpc2NvIG1vZGVyYWRvJyA6ICdCYWl4byByaXNjbyddLCBbJ1ZpYScsIGhvc3BpdGFsLmZlZWRpbmdSb3V0ZSA/PyAnTmFvIGluZm9ybWFkYSddLCBbJ0luZ2VzdGFvIHJlY2VudGUnLCBgJHtob3NwaXRhbC5yZWNlbnRJbnRha2VQZXJjZW50ID8/IDB9JWBdLCBbJ1Byb3RvY29sbycsIGhvc3BpdGFsLnByb2dyZXNzaW9uUHJvdG9jb2wgPT09ICczX2RheXMnID8gJzMgZGlhcycgOiAnNCBkaWFzJ11dLm1hcCgoW2xhYmVsLCB2YWx1ZV0pID0+IDxkaXYga2V5PXtsYWJlbH0gY2xhc3NOYW1lPVwicm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBiZy1ibGFjay8xMCBwLTRcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPntsYWJlbH08L3A+PHAgY2xhc3NOYW1lPVwibXQtMSBmb250LXNlbWlib2xkIHRleHQtd2hpdGVcIj57dmFsdWV9PC9wPjwvZGl2Pil9eyEhcHJvZ3Jlc3Npb25QbGFuLmxlbmd0aCAmJiBwcm9ncmVzc2lvblBsYW4ubWFwKChkYXkpID0+IDxkaXYga2V5PXtkYXkuZGF5fSBjbGFzc05hbWU9XCJyb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLW9yYW5nZS00MDAvMjAgYmctb3JhbmdlLTUwMC9bMC4wOF0gcC00XCI+PHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5EaWEge2RheS5kYXl9PC9wPjxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1sZyBmb250LWJvbGQgdGV4dC1vcmFuZ2UtMzAwXCI+e2RheS5rY2FsLnRvRml4ZWQoMCl9IGtjYWw8L3A+PHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj57ZGF5LnBlcmNlbnR9JSBkbyBSRVI8L3A+PC9kaXY+KX08L0NhcmRDb250ZW50PlxuICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItdCBib3JkZXItYm9yZGVyIHB0LTYgZGFyazpib3JkZXItd2hpdGUvNVwiPlxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwib3V0bGluZVwiIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKGAke05FV19ST1VURX0vZm9vZGApfSBjbGFzc05hbWU9XCJnYXAtMlwiPjxDaGV2cm9uTGVmdCBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz4gVm9sdGFyIHBhcmEgZm9ybXVsYWNhbzwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBzaXplPVwibGdcIiBjbGFzc05hbWU9XCJnYXAtMlwiIG9uQ2xpY2s9e2hhbmRsZVNhdmV9IGlkPVwiYnRuLXNhdmUtcGxhblwiPjxTYXZlIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiBTYWx2YXIgbm8gbW9kdWxvPC9CdXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7cHJpbnRhYmxlUmVwb3J0ICYmIDxQcmludGFibGVSZXBvcnREb2N1bWVudCByZXBvcnQ9e3ByaW50YWJsZVJlcG9ydH0gY2xhc3NOYW1lPVwiaGlkZGVuIHByaW50OmJsb2NrXCIgLz59XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLCJtYXBwaW5ncyI6IkFBMkNTO0FBM0NULFNBQVMsU0FBUyxnQkFBZ0I7QUFDbEMsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyxhQUFhLFVBQVUsU0FBUyxZQUFZO0FBQ3JELFNBQVMsYUFBYTtBQUN0QixTQUFTLGNBQWM7QUFDdkIsU0FBUyxNQUFNLGFBQWEsWUFBWSxpQkFBaUI7QUFDekQsU0FBUyxhQUFhO0FBQ3RCLFNBQVMsYUFBYTtBQUN0QixTQUFTLDJCQUEyQjtBQUNwQyxTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLGFBQWEsdUJBQXVCLDBCQUEwQjtBQUN2RSxTQUFTLGtCQUFrQjtBQUMzQixTQUFTLHVCQUF1QjtB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
