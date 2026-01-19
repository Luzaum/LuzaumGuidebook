import { ExtendedNeuroDiseaseDetails } from '../types'

export const DISEASE_DETAILS: Record<string, ExtendedNeuroDiseaseDetails> = {
    "ddx_001": {
        "typical_age_profile": {
            "peak": "jovem-adulto",
            "notes": "Tipicamente início em animal jovem-adulto, com exame neurológico interictal normal; extremos de idade aumentam suspeita de causa estrutural/metabólica."
        },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Prosencéfalo (córtex/estrutura límbica) como gerador de descarga paroxística; expressão motora via redes tálamo-corticais e vias descendentes.",
            "why_it_makes_sense": [
                "Crise epiléptica = hiperexcitabilidade neuronal sincronizada; sinais motores generalizados podem ser “saída final comum”, mas a origem mais comum é cortical.",
                "Exame interictal normal favorece epilepsia primária (vs lesão estrutural persistente)."
            ]
        },
        "pathogenesis": {
            "core_mechanism": "Desbalanço entre inibição (GABA) e excitação (glutamato) → limiar convulsivo reduzido; predisposição genética em muitas raças.",
            "predisposing_factors": [
                "Privação de sono, estresse, excitação, falhas de medicação, toxinas/hipoglicemia (mimetizadores)."
            ]
        },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Padrão de crises episódicas com exame interictal normal → forte suspeita de epilepsia primária.",
                "Se há sinais sistêmicos/comorbidades relevantes → priorizar triagem metabólica (ex.: glicemia) antes de rotular como primária."
            ],
            "minimum_next_tests": [
                "Glicemia imediata (descartar hipoglicemia como mimetizador)",
                "Bioquímica/eletrólitos conforme comorbidades",
                "RM/TC + líquor se red flags ou idade fora do padrão"
            ]
        },
        "treatment": {
            "emergency": {
                "goal": "Abortar crise e prevenir status epilepticus, hipertermia, hipóxia e lesão secundária.",
                "options": [
                    {
                        "drug": "Levetiracetam",
                        "dose": "20 mg/kg IV q8h (tratamento emergencial de crises) — cão e gato",
                        "why": "Rápido início, boa segurança; útil como ponte/adjunto em emergências.",
                        "source": ":contentReference[oaicite:0]{index=0}"
                    }
                ]
            },
            "chronic_control": {
                "goal": "Reduzir frequência/severidade das crises e evitar clusters/status.",
                "strategy": [
                    "Escolher AED de manutenção e ajustar a dose por resposta clínica e monitorização (níveis séricos quando aplicável).",
                    "Educar tutor: adesão, gatilhos, diário de crises, vídeos."
                ],
                "special_notes_comorbidities": [
                    "Hepatopatas/shunt: preferir opções com menor dependência de metabolismo hepático; doses podem precisar ser menores e titulação mais lenta.",
                    "Renais: monitorizar sedação/efeitos e ajustar conforme fármaco."
                ]
            }
        },
        "common_pitfalls": [
            "Confundir ausência de menace no pós-ictal como lesão estrutural fixa (reavaliar após recuperação).",
            "Não checar glicemia/eletrólitos em paciente com comorbidades endócrinas/hepáticas."
        ],
        "references": [
            "Levetiracetam em emergência de crises: :contentReference[oaicite:1]{index=1}"
        ]
    },
    "ddx_003": {
        "typical_age_profile": {
            "bimodal": "Jovem (shunt congênito) e adulto/idoso (hepatopatia adquirida)",
            "notes": "Pode ser episódica e precipitada por dieta rica em proteína, hemorragia GI, constipação, infecção, alcalose e hipocalemia."
        },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Disfunção difusa do SNC (encefalopatia global), frequentemente com sinais de prosencéfalo (comportamento/convulsões) e componente motor variável.",
            "why_it_makes_sense": [
                "Neurotoxinas (especialmente amônia e outras substâncias derivadas do intestino) atravessam barreiras e alteram neurotransmissão → depressão/alteração de consciência e sinais comportamentais."
            ]
        },
        "pathogenesis": {
            "core_mechanisms": [
                "Aumento de amônia e outras toxinas intestinais + inflamação sistêmica → alteração neuronal/astroglial e neurotransmissão.",
                "Fatores que pioram EH: alcalose (favorece NH3), hipocalemia, hemorragia GI."
            ],
            "mechanism_of_lactulose": "Lactulose é metabolizada por bactérias colônicas → ácidos orgânicos ↓ pH colônico, “aprisiona” amônia como NH4+ não absorvível; também acelera trânsito e altera flora. :contentReference[oaicite:2]{index=2}"
        },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Padrão flutuante + comorbidade hepática/shunt + alteração mental → alta suspeita de encefalopatia metabólica.",
                "Crise/alteração mental em hepatopata: priorizar correção de precipitantes antes de concluir neuro primário."
            ],
            "next_tests_priority": [
                "Bioquímica hepática + amônia (quando disponível), glicemia, eletrólitos (K+), gasometria se necessário",
                "Imagem abdominal/angiografia conforme suspeita de shunt",
                "Se sinais neurológicos persistirem apesar de correções → RM/TC + líquor"
            ]
        },
        "treatment": {
            "acute": {
                "goals": [
                    "Reduzir produção/absorção intestinal de toxinas (amônia).",
                    "Corrigir precipitantes (constipação, sangramento GI, hipocalemia/alcalose, infecção).",
                    "Proteger via aérea se rebaixamento importante (aspiração)."
                ],
                "lactulose": {
                    "dog_oral": "0.5–1.0 mL/kg PO q8h (ajustar para 2–3 fezes amolecidas/dia). :contentReference[oaicite:3]{index=3}",
                    "cat_oral": "2.5–5 mL/gato PO q8–12h. :contentReference[oaicite:4]{index=4}",
                    "enema": "Solução 3 partes lactulose : 7 partes água; 20 mL/kg (ou 10–20 mL/kg em algumas referências) como enema de retenção, repetir conforme resposta (q4–8h). :contentReference[oaicite:5]{index=5}:contentReference[oaicite:6]{index=6}",
                    "adverse_effects": "Diarreia/desidratação; contém açúcares livres e pode alterar necessidade de insulina em diabéticos. :contentReference[oaicite:7]{index=7}"
                },
                "antibiotics_to_reduce_colonic_flora": {
                    "examples": [
                        "Neomycin 20 mg/kg q8h (pouco absorvida; cuidado se lesão GI). :contentReference[oaicite:8]{index=8}",
                        "Metronidazol ~7.5 mg/kg q8h como opção citada em neuro (ajustar conforme função hepática). :contentReference[oaicite:9]{index=9}"
                    ]
                }
            },
            "long_term": {
                "goals": [
                    "Controle dietético + lactulose titulada.",
                    "Reduzir recorrências: tratar doença de base (ex.: shunt → correção/atenuação quando indicado). :contentReference[oaicite:10]{index=10}"
                ]
            }
        },
        "common_pitfalls": [
            "Titrar lactulose pelo número/consistência das fezes (não por dose fixa): excesso causa diarreia e pode piorar EH. :contentReference[oaicite:11]{index=11}",
            "Esquecer que hipocalemia/alcalose pioram EH (motor deve acender alerta). :contentReference[oaicite:12]{index=12}"
        ],
        "references": [
            "Mecanismo e dose de lactulose e antibióticos em EH (neuro): :contentReference[oaicite:13]{index=13}",
            "Enema de lactulose (3:7) e dose: :contentReference[oaicite:14]{index=14}",
            "Doses (lactulose/levetiracetam) em emergência: :contentReference[oaicite:15]{index=15}",
            "Dose lactulose e ajuste por fezes + antibióticos (GI/BSAVA): :contentReference[oaicite:16]{index=16}"
        ]
    },
    "ddx_004": {
        "typical_age_profile": {
            "risk_groups": [
                "Neonatos/filhotes (reservas baixas)",
                "Pacientes sépticos/críticos",
                "Doença hepática/shunt",
                "Insulinoma (cães) ou erro terapêutico com insulina",
                "Intoxicação por xilitol (cães)"
            ]
        },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Disfunção difusa do encéfalo (neuroglicopenia), com falha energética neuronal → alteração de consciência, ataxia, convulsões.",
            "why_it_makes_sense": [
                "Neurônios dependem de glicose como substrato crítico; queda importante → disfunção cortical/reticular."
            ]
        },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Se convulsão/coma + risco metabólico → tratar como hipoglicemia até prova em contrário (dextrose + monitorização)."
            ],
            "confirmatory_or_supporting_tests": [
                "Glicemia seriada",
                "Perfil hepático, cortisol, eletrólitos, imagem conforme suspeita (insulinoma etc.)"
            ]
        },
        "treatment": {
            "acute": {
                "dextrose_bolus_adult": "Dextrose 50%: 0.5 g/kg IV, diluída 1:3 em NaCl 0,9% (equivale a 12,5%) — evitar bolus muito grandes quando suspeita de insulinoma. :contentReference[oaicite:17]{index=17}:contentReference[oaicite:18]{index=18}",
                "post_bolus": "Após estabilizar, iniciar CRI com fluidos contendo 2,5–5% de dextrose; concentrações >5–7% preferir acesso central (tonicidade/flebite). :contentReference[oaicite:19]{index=19}",
                "important_warning": "Evitar D5W como fluido IV único para suplementação de glicose (risco de hiponatremia grave). :contentReference[oaicite:20]{index=20}",
                "monitoring": [
                    "Glicemia frequente e ajuste para evitar hiperglicemia iatrogênica. :contentReference[oaicite:21]{index=21}"
                ],
                "adjuncts_selected_cases": [
                    "Glucagon (dose/CRI conforme tabela) e glicocorticoides como adjuvantes em insulinoma/casos refratários. :contentReference[oaicite:22]{index=22}:contentReference[oaicite:23]{index=23}"
                ]
            }
        },
        "common_pitfalls": [
            "Rotular como epilepsia primária sem medir glicemia em paciente com comorbidades/endócrino.",
            "Dar D5W sozinho (sem eletrólitos) e induzir hiponatremia iatrogênica. :contentReference[oaicite:24]{index=24}"
        ],
        "references": [
            "Tratamento de hipoglicemia (bolus, CRI e alertas): :contentReference[oaicite:25]{index=25}:contentReference[oaicite:26]{index=26}"
        ]
    },
    "ddx_005_calcium": {
        "typical_age_profile": {
            "risk_groups": [
                "Eclâmpsia/lactação (cadela)",
                "Hipoparatireoidismo",
                "Pancreatite/septicemia (cálcio ionizado baixo)",
                "Insuficiência renal/alterações ácido-base que reduzem Ca ionizado"
            ]
        },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Hiperexcitabilidade neuromuscular periférica e central por redução de Ca ionizado → limiar de disparo neuronal/muscular diminuído.",
            "why_it_makes_sense": [
                "Ca estabiliza membrana; quando baixo, canais de Na ficam mais “prontos” → tremores, tetania, convulsões."
            ]
        },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Convulsão/tetania + contexto compatível → suspeita alta de hipocalcemia até dosar Ca ionizado."
            ],
            "tests": [
                "Cálcio ionizado (melhor para correlação clínica)",
                "ECG durante correção",
                "Investigação da causa (PTH, vitamina D, pancreatite etc.)"
            ]
        },
        "treatment": {
            "acute": {
                "calcium_gluconate_bolus": "Gluconato de cálcio 10%: 0,5–1,5 mL/kg IV lentamente “até efeito” (com ECG; parar se bradicardia ou QT encurtar). :contentReference[oaicite:27]{index=27}",
                "calcium_infusion": "Se necessário para manter normocalcemia: 5–15 mg/kg/h IV (infusão). :contentReference[oaicite:28]{index=28}",
                "monitoring_notes": [
                    "Monitorar FC/ECG: bradicardia pode indicar cardiotoxicidade por infusão rápida. :contentReference[oaicite:29]{index=29}",
                    "Sinais podem persistir 30–60 min após correção por atraso de equilíbrio no SNC. :contentReference[oaicite:30]{index=30}"
                ]
            },
            "etiologic_or_subacute": {
                "oral_calcium": "Cálcio oral (ex.: carbonato) 25–50 mg/kg/dia (elementar) conforme tabela e caso. :contentReference[oaicite:31]{index=31}",
                "vitamin_d": "Calcitriol: ataque 20–30 ng/kg/dia por 3–4 dias; manutenção 5–15 ng/kg/dia (ajustar conforme causa/monitorização). :contentReference[oaicite:32]{index=32}"
            }
        },
        "common_pitfalls": [
            "Corrigir rápido demais sem ECG (risco de arritmia/bradicardia). :contentReference[oaicite:33]{index=33}",
            "Misturar cálcio com fluidos contendo bicarbonato (precipitação) — atenção na rotina hospitalar. :contentReference[oaicite:34]{index=34}"
        ],
        "references": [
            "Tabela e monitorização da correção de hipocalcemia: :contentReference[oaicite:35]{index=35}"
        ]
    },
    "ddx_039_potassium": {
        "typical_age_profile": {
            "notes": "Mais lembrada em gatos (ex.: DRC, hiperaldo, diuréticos, anorexia prolongada), mas pode ocorrer em cães em contextos críticos."
        },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Disfunção de músculo esquelético e nervo periférico por alteração do potencial de membrana.",
            "why_it_makes_sense": [
                "K+ é determinante do potencial de repouso; queda importante → hiperpolarização → fraqueza flácida, hiporreflexia em casos relevantes."
            ]
        },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Fraqueza flácida + comorbidade renal/diurético + padrão LMN difuso → suspeita alta de distúrbio eletrolítico (hipocalemia)."
            ],
            "tests": [
                "K+ sérico + gaso/ácido-base",
                "ECG se grave",
                "Investigar causa (DRC, perdas GI, diuréticos, hiperaldosteronismo etc.)"
            ]
        },
        "treatment": {
            "iv_supplementation": {
                "typical": "Reposição IV típica: 0,5–2,0 mEq/kg/dia em fluidoterapia rotineira, conforme contexto clínico. :contentReference[oaicite:36]{index=36}",
                "hypokalemic_higher_doses": "Em hipocalemia, podem ser necessárias doses maiores, mas sem exceder taxa IV de 0,5 mEq/kg/h. :contentReference[oaicite:37]{index=37}",
                "contraindications_cautions": [
                    "Oligúria, risco de hipercalemia, e drogas que aumentam K+ (diurético poupador, IECA, beta-bloqueadores) → cautela/monitorização. :contentReference[oaicite:38]{index=38}"
                ],
                "oral_note": "Para cálculo de K oral: 1 mEq K em 89 mg de KCl (ou 234 mg de gluconato de K). :contentReference[oaicite:39]{index=39}"
            }
        },
        "common_pitfalls": [
            "Tratar como polineuropatia/miopatia primária sem checar eletrólitos (K+).",
            "Infundir K rápido demais e induzir arritmias (por isso o teto de 0,5 mEq/kg/h). :contentReference[oaicite:40]{index=40}"
        ],
        "references": [
            "Diretrizes de reposição de potássio e taxas máximas: :contentReference[oaicite:41]{index=41}"
        ]
    },
    // --- Novos adicionados (Vestibular, IVDD, FCE, NeuroMuscular) ---
    "ddx_syn_vestibular": {
        "typical_age_profile": {
            "risk_groups": ["Cães idosos (idiopática)", "Qualquer idade (otite média/interna)"],
            "notes": "Síndrome vestibular periférica é comum em cães idosos (geriátrica/idiopática) ou associada a otites."
        },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Sistema Vestibular Periférico (labirinto, nervo VIII).",
            "why_it_makes_sense": [
                "Disfunção assimétrica do input vestibular cria ilusão de movimento.",
                "Head tilt para o lado da lesão (falha de tônus antigravitacional ipsilateral).",
                "Nistagmo compensatório (fase rápida contralateral)."
            ]
        },
        "pathogenesis": {
            "core_mechanisms": [
                "Idiopática: degeneração senil ou inflamação estéril aguda do gânglio/nervo.",
                "Otite média/interna: extensão de infecção do canal auditivo ou hematógena."
            ]
        },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Head tilt + nistagmo horizontal/rotatório + SEM déficits proprioceptivos = Periférico (alta confiança).",
                "Se otoscopia alterada ou dor à palpação da bula → Otite provável."
            ],
            "tests": ["Otoscopia", "Exame neurológico (fase postural)", "RX/TC de bulas se suspeita de otite"]
        },
        "treatment": {
            "acute": {
                "goals": ["Controle de náusea/vômito", "Tratar infecção se presente", "Suporte (hidratação/nutrição)"],
                "options": [
                    { "drug": "Maropitant", "dose": "1 mg/kg SC/IV ou 2 mg/kg PO", "why": "Controle central de vômito/náusea vestibular." },
                    { "drug": "Meclizina", "dose": "4mg/kg PO (alguns autores) ou Ondansetrona", "why": "Antiemético vestibular (anti-histamínico)." }
                ]
            },
            "chronic_control": {
                "goal": "Reabilitação vestibular e tratamento da causa base (otite).",
                "strategy": ["Fisioterapia", "Antibióticos sistêmicos longos se otite interna (baseado em cultura)."]
            }
        },
        "common_pitfalls": ["Confundir head tilt com nistagmo vertical (central).", "Não avaliar membrana timpânica."]
    },
    "ddx_027": {
        "typical_age_profile": { "notes": "Qualquer idade, dependendo da etiologia (inflamatório em jovens, neoplasia em idosos, vascular em agudos)." },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Sistema Vestibular Central (Núcleos vestibulares no tronco encefálico ou Lobo Floculonodular do Cerebelo).",
            "why_it_makes_sense": [
                "Lesão afeta vias longas (motora/proprioceptiva) passando pelo tronco → déficits posturais ipsilaterais.",
                "Envolvimento do SARA (Formação Reticular) → alteração de mentação.",
                "Nistagmo vertical é patognomônico de lesão central (embora central possa ter qualquer nistagmo)."
            ]
        },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Sinais vestibulares + Déficits Proprioceptivos ou Nistagmo Vertical ou Alteração Mental = Central.",
                "Requer investigação avançada (RM) mas o reconhecimento sindrômico é vital."
            ],
            "minimum_next_tests": ["PA (descartar vascular/hipertensivo)", "Exame pares cranianos completo", "Encaminhamento para imagem"]
        },
        "treatment": {
            "acute": {
                "goals": ["Estabilização sistêmica (ABC)", "Reduzir edema/PIC se suspeita (cabeceira elevada)"],
                "options": [{ "drug": "Manitol/Salina Hipertônica", "dose": "Se suspeita de hipertensão intracraniana/edema", "why": "Neuroproteção em trauma ou vascular agudo." }]
            }
        }
    },
    "ddx_015": {
        "typical_age_profile": {
            "bimodal": "Condrodistróficos (3-7 anos) vs Não-condrodistróficos (idosos)",
            "notes": "Hansen Tipo I (explosão) comum em Dachshund, Frenchi; Tipo II (protrusão) em pastores/labradores idosos."
        },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Medula espinhal (compressão extradural).",
            "why_it_makes_sense": [
                "Compressão mecânica + contusão → isquemia e bloqueio de condução.",
                "Sinais focais dependem do segmento (ex: T3-L3 = paraparesia UMN)."
            ]
        },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Dor espinhal + déficit focal agudo em raça predisposta → IVDD é a principal suspeita.",
                "Localizar segmento (C1-C5 vs T3-L3) é crucial para cirurgia/imagem."
            ],
            "tests": ["Avaliação de dor profunda (gnose)", "RX simples (descarta lise/fratura, sugere espaço reduzido)", "TC/RM para cirurgia"]
        },
        "treatment": {
            "acute": {
                "goals": ["Analgesia", "Restrição estrita de movimento (crate rest)", "Descompressão se grau grave"],
                "options": [
                    { "drug": "Gabapentina + AINE/Opioide", "dose": "Multimodal", "why": "Dor neuropática e inflamatória." },
                    { "drug": "Repouso absoluto", "dose": "4-6 semanas", "why": "Permitir cicatrização do anel fibroso." }
                ]
            }
        },
        "common_pitfalls": ["Prescrever corticoide + AINE (proibido).", "Não testar dor profunda em animal plégico (prognóstico mudar)."]
    },
    "ddx_016": { // FCE
        "typical_age_profile": { "notes": "Cães adultos ativos (tipo Schnauzer, Border Collie), início durante exercício." },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Vascular (Isquemia medular focal).",
            "why_it_makes_sense": [
                "Embolização por material fibrocartilaginoso (pulposo) em arteríola espinhal.",
                "Isquemia focal → necrose de substância cinzenta/branca."
            ]
        },
        "pathogenesis": { "core_mechanism": "Micro-trauma ou manobra de Valsalva força entrada de material do disco na vasculatura arterial medular." },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Início peragudo durante atividade + Assimetria marcante + Dor ausente (ou transitória) = Forte suspeita de FCE.",
                "Não progressivo após 24h."
            ],
            "minimum_next_tests": ["Descartar compressão cirúrgica (se dúvida, imagem).", "Diagnóstico é clínico + exclusão."]
        },
        "treatment": {
            "acute": {
                "goals": ["Manter fluxo sanguíneo (PA adequada)", "Fisioterapia PRECOCE"],
                "options": [{ "drug": "Fisioterapia", "dose": "Imediata", "why": "Neuroplasticidade é a chave da recuperação. Não há cirurgia." }]
            }
        }
    },
    "ddx_syn_lmn": { // Junção/Neuromuscular
        "typical_age_profile": { "notes": "Qualquer idade. Miastenia em adultos/jovens. Polirradiculoneurite pós-interação com guaxinim ou vacina." },
        "neuroanatomy_neurophysiology": {
            "primary_system": "Unidade Motora (Neurônio motor inferior, junção, nervo ou músculo).",
            "why_it_makes_sense": [
                "Interrupção da via final comum → Flacidez, perda de reflexos, atrofia (crônica).",
                "Junção (MG): falha na transmissão sustentada (fatigabilidade)."
            ]
        },
        "diagnosis_in_app_logic": {
            "what_app_can_conclude": [
                "Tetraparesia flácida + Reflexos diminuídos a ausentes + Mentação normal = Doença de LMN difusa.",
                "Megaesôfago/Regurgitação aumenta suspeita de MG ou Polimiosite/Polineuropatia."
            ],
            "tests": ["RX Tórax (megaesôfago/timo)", "Teste de estimulação repetitiva/AChR Antibody (MG)", "CK (Miosite)"]
        },
        "treatment": {
            "acute": {
                "goals": ["Proteger via aérea (aspiração)", "Suporte ventilatório se paralisia respiratória", "Tratar causa base"],
                "options": [
                    { "drug": "Piridostigmina", "dose": "Se MG confirmada/suspeita forte", "why": "Inibidor da acetilcolinesterase." },
                    { "drug": "Fisioterapia", "dose": "Manter amplitude movimento", "why": "Prevenir contraturas em paralisia flácida." }
                ]
            }
        },
        "common_pitfalls": ["Não checar reflexo de deglutição antes de alimentar.", "Diagnosticar 'displasia' ou 'velhice' em cão com fraqueza episódica."]
    }
}
