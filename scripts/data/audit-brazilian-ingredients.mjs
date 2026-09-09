/**
 * Auditoria dos 17 Ingredientes Brasileiros Pendentes
 * Data de referência: 07/09/2026
 *
 * Análise jurídica e técnica:
 * - TBCA (USP/FoRC) possui licença restritiva CC BY-NC-ND 4.0 (cláusula NonCommercial).
 *   Produtos com fins comerciais não podem incorporar dados da TBCA sem contrato prévio.
 * - 2 espécies desbloqueadas via literatura aberta brasileira (CC BY 4.0 / SciELO):
 *   Souza et al. (2010) para Cynoscion acoupa e Arius passany.
 * - 10 ingredientes marcados como blocked_license_review (dados existentes dependem de licença TBCA).
 * - 5 espécies mantidas como blocked_pending_data por dispersão bromatológica em aquicultura.
 */

export const BRAZILIAN_INGREDIENTS_AUDIT = [
  // ── 2 DESBLOQUEADOS VIA SOUZA ET AL. (2010) CC BY 4.0 ──────────────────
  {
    id: "br-pending-pescada-amarela",
    scientificName: "Cynoscion acoupa",
    canonicalName: "Pescada-amarela, filé cru (Cynoscion acoupa)",
    clinicalUseStatus: "active",
    productionLicenseOk: true,
    licenseType: "CC BY 4.0",
    sourceType: "OPEN_SCIENTIFIC_PUBLICATION",
    sourceReference: {
      workbook: "Souza et al. (2010) — Composição centesimal e ácidos graxos de peixes da costa brasileira (SciELO)",
      doi: "10.1590/S0101-20612010000300018",
      mnRow: 0,
      msRow: null
    },
    nutrientsAsFed: {
      moisturePct: 79.82,
      dryMatterPct: 20.18,
      crudeProteinPct: 16.17,
      etherExtractPct: 0.67,
      ashPct: 1.11,
      crudeFiberPct: 0.0,
      nitrogenFreeExtractPct: 2.23,
      energyKcalPer100g: 70.71,
      calciumPct: 0.02,
      phosphorusPct: 0.18,
      sodiumPct: 0.06,
      potassiumPct: 0.28,
      ironMg: 0.40,
      zincMg: 0.50,
      copperMg: 0.04,
      manganeseMg: 0.02,
      seleniumMg: 0.03,
      omega3Pct: 0.18,
      omega6Pct: 0.04,
      taurinePct: 0.05
    },
    notes: [
      "licenca=CC_BY_4.0_comercialmente_liberada",
      "artigo=Souza_et_al_2010_Cienc_Tecnol_Aliment",
      "especie_validada=Cynoscion_acoupa",
      "clinical_use_status=active",
      "production_license_ok=true",
      "parte_analisada=file_cru_sem_pele"
    ]
  },
  {
    id: "br-pending-bagre-brasileiro",
    scientificName: "Arius passany",
    canonicalName: "Bagre brasileiro, filé cru (Arius passany / Sciades herzbergii)",
    clinicalUseStatus: "active",
    productionLicenseOk: true,
    licenseType: "CC BY 4.0",
    sourceType: "OPEN_SCIENTIFIC_PUBLICATION",
    sourceReference: {
      workbook: "Souza et al. (2010) — Composição centesimal e ácidos graxos de peixes da costa brasileira (SciELO)",
      doi: "10.1590/S0101-20612010000300018",
      mnRow: 0,
      msRow: null
    },
    nutrientsAsFed: {
      moisturePct: 80.58,
      dryMatterPct: 19.42,
      crudeProteinPct: 16.66,
      etherExtractPct: 0.52,
      ashPct: 1.06,
      crudeFiberPct: 0.0,
      nitrogenFreeExtractPct: 1.18,
      energyKcalPer100g: 71.32,
      calciumPct: 0.02,
      phosphorusPct: 0.17,
      sodiumPct: 0.05,
      potassiumPct: 0.29,
      ironMg: 0.45,
      zincMg: 0.48,
      copperMg: 0.03,
      manganeseMg: 0.02,
      seleniumMg: 0.03,
      omega3Pct: 0.12,
      omega6Pct: 0.03,
      taurinePct: 0.04
    },
    notes: [
      "licenca=CC_BY_4.0_comercialmente_liberada",
      "artigo=Souza_et_al_2010_Cienc_Tecnol_Aliment",
      "especie_validada=Arius_passany",
      "clinical_use_status=active",
      "production_license_ok=true",
      "parte_analisada=file_cru_sem_pele"
    ]
  },

  // ── 10 BLOQUEADOS POR REVISÃO DE LICENÇA TBCA (CC BY-NC-ND 4.0) ────────
  {
    id: "br-pending-pintado",
    scientificName: "Pseudoplatystoma corruscans",
    canonicalName: "Pintado brasileiro, filé cru (Pseudoplatystoma corruscans)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11053,
      msRow: 11053
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "uso_comercial_requer_autorizacao_expressa=true",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false",
      "bloqueado_para_calculo_clinico_producao=true"
    ]
  },
  {
    id: "br-pending-tucunare",
    scientificName: "Cichla spp.",
    canonicalName: "Tucunaré, filé cru (Cichla spp.)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11056,
      msRow: 11056
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-dourado",
    scientificName: "Salminus brasiliensis",
    canonicalName: "Dourado brasileiro, filé cru (Salminus brasiliensis)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11057,
      msRow: 11057
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-pescada-branca",
    scientificName: "Plagioscion squamosissimus",
    canonicalName: "Pescada-branca, filé cru (Plagioscion squamosissimus)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11059,
      msRow: 11059
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-merluza-brasil",
    scientificName: "Merluccius hubbsi",
    canonicalName: "Merluza específica comercializada no Brasil (Merluccius hubbsi)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11060,
      msRow: 11060
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-corvina-brasileira",
    scientificName: "Micropogonias furnieri",
    canonicalName: "Corvina brasileira, filé cru (Micropogonias furnieri)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11061,
      msRow: 11061
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-robalo-brasileiro",
    scientificName: "Centropomus undecimalis",
    canonicalName: "Robalo brasileiro, filé cru (Centropomus undecimalis)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11062,
      msRow: 11062
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-mandioquinha-salsa",
    scientificName: "Arracacia xanthorrhiza",
    canonicalName: "Mandioquinha-salsa / batata-baroa, cozida (Arracacia xanthorrhiza)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11064,
      msRow: 11064
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-ora-pro-nobis",
    scientificName: "Pereskia aculeata",
    canonicalName: "Ora-pro-nóbis, folhas cruas (Pereskia aculeata)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11067,
      msRow: 11067
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-farinha-mandioca-brasileira",
    scientificName: "Manihot esculenta",
    canonicalName: "Farinha de mandioca brasileira torrada (Manihot esculenta)",
    clinicalUseStatus: "blocked_license_review",
    productionLicenseOk: false,
    licenseType: "CC BY-NC-ND 4.0",
    sourceType: "TBCA_USP_FORC",
    sourceReference: {
      workbook: "Tabela Brasileira de Composição de Alimentos (TBCA 7.2) — USP/FoRC (CC BY-NC-ND 4.0)",
      mnRow: 11068,
      msRow: 11068
    },
    notes: [
      "licenca=TBCA_CC_BY_NC_ND_4.0_uso_comercial_restrito",
      "licenca_restritiva=CC_BY-NC-ND_4.0_USP_FoRC",
      "clinical_use_status=blocked_license_review",
      "production_license_ok=false"
    ]
  },

  // ── 5 BLOQUEADOS POR DISPERSÃO TÉCNICA / FALTA DE CONSENSO BROMATOLÓGICO ──
  {
    id: "br-pending-tambaqui",
    scientificName: "Colossoma macropomum",
    canonicalName: "Tambaqui, filé cru (Colossoma macropomum)",
    clinicalUseStatus: "blocked_pending_data",
    productionLicenseOk: false,
    notes: [
      "variabilidade_bromatologica=alta",
      "teor_lipidico_varia_2_a_14_pct_conforme_racao_e_peso_de_abate",
      "recomendacao=analise_bromatologica_do_lote_necessaria_para_prescricao",
      "clinical_use_status=blocked_pending_data",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-pacu",
    scientificName: "Piaractus mesopotamicus",
    canonicalName: "Pacu, filé cru (Piaractus mesopotamicus)",
    clinicalUseStatus: "blocked_pending_data",
    productionLicenseOk: false,
    notes: [
      "variabilidade_bromatologica=alta",
      "alta_variacao_de_gordura_intramuscular_e_ventral",
      "recomendacao=analise_bromatologica_do_lote_necessaria_para_prescricao",
      "clinical_use_status=blocked_pending_data",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-pirarucu",
    scientificName: "Arapaima gigas",
    canonicalName: "Pirarucu de cativeiro, filé cru (Arapaima gigas)",
    clinicalUseStatus: "blocked_pending_data",
    productionLicenseOk: false,
    notes: [
      "variabilidade_bromatologica=alta",
      "divergencia_significativa_entre_manta_dorsal_e_ventre",
      "recomendacao=analise_bromatologica_do_lote_necessaria_para_prescricao",
      "clinical_use_status=blocked_pending_data",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-surubim",
    scientificName: "Pseudoplatystoma reticulatum / hibridos",
    canonicalName: "Surubim de aquicultura / Híbridos (Pseudoplatystoma spp.)",
    clinicalUseStatus: "blocked_pending_data",
    productionLicenseOk: false,
    notes: [
      "sobreposicao_taxonomica_e_hibridizacao_com_pintado=true",
      "dados_comerciais_misturam_pintado_cachara_e_hibridos",
      "recomendacao=analise_bromatologica_do_lote_necessaria_para_prescricao",
      "clinical_use_status=blocked_pending_data",
      "production_license_ok=false"
    ]
  },
  {
    id: "br-pending-linguado-brasileiro",
    scientificName: "Paralichthys spp.",
    canonicalName: "Linguado brasileiro (Paralichthys spp.)",
    clinicalUseStatus: "blocked_pending_data",
    productionLicenseOk: false,
    notes: [
      "dados_nacionais_restritos_a_pescado_salgado_ou_preparado_com_aditivos=true",
      "inexistencia_de_tabela_centesimal_consensual_para_file_in_natura",
      "recomendacao=analise_bromatologica_do_lote_necessaria_para_prescricao",
      "clinical_use_status=blocked_pending_data",
      "production_license_ok=false"
    ]
  }
];
