(() => {
  // modules/receituario-vet/compoundedV2Render.ts
  function normalizeText(value) {
    return String(value || "").trim();
  }
  function normalizeKey(value) {
    return normalizeText(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
  function toNumber(value) {
    if (value == null || value === "") return null;
    const parsed = Number(String(value).replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }
  function formatNumber(value, maxFractionDigits = 2) {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxFractionDigits
    }).format(value);
  }
  function uniqueTexts(values) {
    const seen = /* @__PURE__ */ new Set();
    const result = [];
    values.forEach((value) => {
      const safe = normalizeText(value);
      const key = normalizeKey(safe);
      if (!key || seen.has(key)) return;
      seen.add(key);
      result.push(safe);
    });
    return result;
  }
  function sentence(value) {
    const safe = normalizeText(value);
    if (!safe) return "";
    return /[.!?]$/.test(safe) ? safe : `${safe}.`;
  }
  function getActiveIngredients(v2) {
    return v2.ingredients.filter((ingredient) => ingredient.role === "active" && ingredient.name);
  }
  function getDefaultRegimen(v2, regimenId) {
    if (regimenId) {
      const byId = v2.regimens.find((regimen) => regimen.id === regimenId);
      if (byId) return byId;
    }
    return v2.regimens.find((regimen) => regimen.is_default) || v2.regimens[0] || null;
  }
  function routeLabel(route) {
    const normalized = normalizeKey(route);
    if (normalized === "vo" || normalized.includes("oral")) return "por via oral";
    if (normalized.includes("transderm")) return "por via transd\xE9rmica";
    if (normalized.includes("topic")) return "por via t\xF3pica";
    if (normalized.includes("oftalm")) return "por via oft\xE1lmica";
    if (normalized.includes("otolog")) return "por via otol\xF3gica";
    if (normalized === "sc") return "por via subcut\xE2nea";
    if (normalized === "im") return "por via intramuscular";
    if (normalized === "iv") return "por via intravenosa";
    return route ? `por ${route}` : "";
  }
  function buildFrequencyText(regimen) {
    const explicit = normalizeText(regimen.frequency_text);
    if (explicit) return explicit;
    if (regimen.frequency_mode === "times_per_day" && regimen.frequency_min) {
      return `${formatNumber(regimen.frequency_min)} ${regimen.frequency_min === 1 ? "vez" : "vezes"} ao dia`;
    }
    if (regimen.frequency_mode === "interval_hours" && regimen.frequency_min) {
      return `a cada ${formatNumber(regimen.frequency_min)} horas`;
    }
    return "";
  }
  function buildDurationText(regimen) {
    const explicit = normalizeText(regimen.duration_text);
    if (explicit) return explicit;
    if (regimen.duration_mode === "continuous_until_recheck") return "at\xE9 reavalia\xE7\xE3o";
    if (regimen.duration_value) return `${formatNumber(regimen.duration_value)} ${regimen.duration_unit || "dias"}`;
    return "";
  }
  function getSelectedDoseValue(regimen, patient) {
    const weight = toNumber(patient?.weight_kg);
    if (regimen.dose_mode === "fixed") return regimen.dose_min;
    if (regimen.dose_basis === "kg") {
      if (!weight || !regimen.dose_min) return null;
      return regimen.dose_min * weight;
    }
    return regimen.dose_min;
  }
  function getQuantityText(v2) {
    const qsp = normalizeText(v2.formula.qsp_text);
    const total = normalizeText(v2.formula.total_quantity_text);
    if (qsp) return qsp;
    return total;
  }
  function getCompositionBits(v2) {
    return getActiveIngredients(v2).map((ingredient) => {
      if (ingredient.amount != null && ingredient.unit) return `${ingredient.name} ${formatNumber(ingredient.amount)} ${ingredient.unit}`;
      return ingredient.name;
    }).filter(Boolean);
  }
  function normalizeVehicleText(vehicle) {
    const safe = normalizeText(vehicle);
    if (!safe) return "";
    const key = normalizeKey(safe).replace(/[^a-z]/g, "");
    if (key.startsWith("veiculo") || key.startsWith("ve") && key.includes("culo")) return safe;
    return `ve\xEDculo ${safe}`;
  }
  function normalizeFlavorText(flavor, archetype) {
    const safe = normalizeText(flavor);
    if (!safe) return "";
    const key = normalizeKey(safe).replace(/[^a-z]/g, "");
    if (key.startsWith("sabor") || key.startsWith("fragrancia") || key.startsWith("fra") && key.includes("ncia")) return safe;
    return archetype === "topico_livre" || archetype === "transdermico_dosado" ? `fragr\xE2ncia ${safe}` : `sabor ${safe}`;
  }
  function normalizeExcipientText(excipient) {
    const safe = normalizeText(excipient);
    if (!safe) return "";
    const key = normalizeKey(safe).replace(/[^a-z]/g, "");
    if (key.startsWith("base") || key.startsWith("excipiente")) return safe;
    return `base ${safe}`;
  }
  function cleanPharmacyNote(text) {
    const safe = normalizeText(text);
    if (!safe) return "";
    return safe.replace(/^manipula[cç][aã]o:\s*/i, "").replace(/^favor manipular\s*/i, "").trim();
  }
  function renderAdministrationText(v2, regimen, patient) {
    const preview = getCompoundedDosePreview(v2, patient, regimen.id);
    if (preview.valueText) return preview.valueText;
    if (regimen.dose_min != null) {
      const unit = regimen.administration_unit || v2.formula.administration_unit || regimen.dose_unit;
      return `${formatNumber(regimen.dose_min)} ${unit}`.trim();
    }
    return "";
  }
  function getCompoundedCatalogTitle(v2) {
    return v2.formula.name || "F\xF3rmula magistral";
  }
  function renderCompoundedCatalogSummary(v2) {
    const bits = uniqueTexts([
      v2.formula.pharmaceutical_form,
      getQuantityText(v2),
      !getQuantityText(v2) ? v2.formula.active_principles_summary : ""
    ]);
    return bits.join(" \u2022 ");
  }
  function getCompoundedCatalogSubtitle(v2) {
    return renderCompoundedCatalogSummary(v2);
  }
  function getCompoundedBadgeMeta(v2) {
    const badges = [
      { label: "MANIPULADO", tone: "green" },
      { label: v2.formula.sale_classification === "controlled" ? "CONTROLADO" : "LIVRE", tone: v2.formula.sale_classification === "controlled" ? "red" : "blue" }
    ];
    v2.formula.species.forEach((species) => badges.push({ label: species.toUpperCase(), tone: "slate" }));
    if (v2.formula.is_continuous_use) badges.push({ label: "USO CONT\xCDNUO", tone: "slate" });
    return badges;
  }
  function getCompoundedRegimenPreview(v2, regimenId) {
    const regimen = getDefaultRegimen(v2, regimenId);
    if (!regimen) return "";
    return uniqueTexts([regimen.name, buildFrequencyText(regimen), buildDurationText(regimen)]).join(" \u2022 ");
  }
  function getCompoundedDosePreview(v2, patient, regimenId) {
    const regimen = getDefaultRegimen(v2, regimenId);
    if (!regimen) return { valueText: "", rationaleText: "", warnings: ["Regime n\xE3o definido."] };
    const warnings = [];
    const doseValue = getSelectedDoseValue(regimen, patient);
    const routeUnit = normalizeKey(regimen.administration_unit || v2.formula.administration_unit);
    if (regimen.dose_mode === "by_weight" && !toNumber(patient?.weight_kg)) warnings.push("Peso do paciente necess\xE1rio para c\xE1lculo.");
    if (regimen.dose_mode === "by_weight" && regimen.concentration_value == null && ["ml", "gota", "click", "pump"].includes(routeUnit)) {
      warnings.push("Concentra\xE7\xE3o da formula\xE7\xE3o necess\xE1ria para converter a dose em unidade administrada.");
    }
    const rationale = uniqueTexts([
      regimen.dose_mode === "by_weight" ? "Calculado pelo peso" : "Dose fixa do regime",
      regimen.dose_min != null ? `${formatNumber(regimen.dose_min)} ${regimen.dose_unit}${regimen.dose_basis && regimen.dose_basis !== "na" ? `/${regimen.dose_basis}` : ""}` : ""
    ]).join(" \u2022 ");
    if (doseValue == null) {
      return { valueText: "", rationaleText: rationale, warnings };
    }
    if (["ml", "gota", "click", "pump"].includes(routeUnit) && regimen.concentration_value) {
      const converted = doseValue / regimen.concentration_value;
      return {
        valueText: `${formatNumber(converted)} ${regimen.administration_unit || v2.formula.administration_unit}`.trim(),
        rationaleText: `${formatNumber(doseValue)} ${regimen.dose_unit} por administra\xE7\xE3o`,
        warnings
      };
    }
    return {
      valueText: `${formatNumber(doseValue)} ${regimen.administration_unit || v2.formula.administration_unit || regimen.dose_unit}`.trim(),
      rationaleText: `${formatNumber(doseValue)} ${regimen.dose_unit} por administra\xE7\xE3o`,
      warnings
    };
  }
  function renderCompoundedPrescriptionLine(v2, patient, regimenId) {
    const regimen = getDefaultRegimen(v2, regimenId);
    if (!regimen) return "";
    const explicit = normalizeText(regimen.usage_instruction);
    if (explicit) return sentence(explicit);
    const administration = renderAdministrationText(v2, regimen, patient) || `1 ${regimen.administration_unit || v2.formula.administration_unit || "unidade"}`;
    const route = routeLabel(v2.formula.primary_route);
    const frequency = buildFrequencyText(regimen);
    const duration = buildDurationText(regimen);
    const verb = normalizeKey(v2.formula.primary_route).includes("transderm") || normalizeKey(v2.formula.archetype).includes("transdermico") ? "Aplicar" : "Administrar";
    return sentence([verb, administration, route, frequency, duration ? `por ${duration}` : ""].filter(Boolean).join(", "));
  }
  function renderCompoundedRecommendations(v2, regimenId) {
    const regimen = getDefaultRegimen(v2, regimenId);
    if (!regimen) return [];
    return uniqueTexts(
      normalizeText(regimen.tutor_observation).split(/\r?\n/).map((entry) => entry.replace(/^\s*-\s*/, "").trim()).filter(Boolean)
    );
  }
  function renderCompoundedTutorNotes(v2, regimenId) {
    return renderCompoundedRecommendations(v2, regimenId).join("\n");
  }
  function renderCompoundedPharmacyInstructions(v2, patient, regimenId) {
    const regimen = getDefaultRegimen(v2, regimenId);
    if (!regimen) return "";
    const quantityText = getQuantityText(v2);
    const compositionBits = getCompositionBits(v2);
    const administrationUnit = regimen.administration_unit || v2.formula.administration_unit || "unidade";
    const compositionPrefix = v2.formula.formula_type === "fixed_unit_formula" ? `contendo por 1 ${administrationUnit}` : v2.formula.formula_type === "clinical_dose_oriented" ? "contendo por dose do paciente" : "contendo";
    const detailParts = uniqueTexts([
      compositionBits.length ? `${compositionPrefix}: ${compositionBits.join(", ")}` : "",
      quantityText ? normalizeKey(quantityText).includes("q.s.p") ? quantityText : `q.s.p. ${quantityText}` : "",
      normalizeVehicleText(v2.formula.vehicle),
      normalizeFlavorText(v2.formula.flavor, v2.formula.archetype),
      normalizeExcipientText(v2.formula.excipient_base)
    ]);
    const cleanedNote = cleanPharmacyNote(regimen.pharmacy_note);
    const noteParts = uniqueTexts([cleanedNote]);
    const base = sentence(`Manipula\xE7\xE3o: Favor manipular ${v2.formula.pharmaceutical_form || "f\xF3rmula magistral"}`);
    const detailText = detailParts.join(", ");
    const noteText = noteParts.map((entry) => sentence(entry)).join(" ");
    return [base, detailText ? sentence(detailText) : "", noteText].filter(Boolean).join(" ").trim();
  }
  function renderCompoundedInternalNote(v2, regimenId) {
    const regimen = getDefaultRegimen(v2, regimenId);
    return normalizeText(regimen?.internal_note);
  }
  function renderCompoundedProtocolSummary(v2, regimenId) {
    const regimen = getDefaultRegimen(v2, regimenId);
    return uniqueTexts([
      v2.formula.pharmaceutical_form,
      regimen?.name,
      regimen ? buildFrequencyText(regimen) : "",
      regimen ? buildDurationText(regimen) : ""
    ]).join(" \u2022 ");
  }
})();
