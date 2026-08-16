#!/usr/bin/env python3
"""Generate diseases.hiperparatireoidismo-caes-gatos.seed.ts"""
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "modules/consulta-vet/data/seed/diseases.hiperparatireoidismo-caes-gatos.seed.ts"

content = r'''import type { DiseaseRecord } from '../../types/disease';

const ASSET_BASE = '/assets/consulta-vet/diseases/hiperparatireoidismo-caes-gatos';

/**
 * Hiperparatireoidismo em cães e gatos — síntese editorial ConsultaVET.
 * Regra central: PTH autônomo (PHPT) vs compensatório (CKD-MBD, NSHP).
 * Prioridade: IRIS 2026 > Nelson & Couto 2020 > BSAVA Nephrology/Formulary >
 * DiBartola > Travail 2025 > Cordella 2022 > literatura felina/canina PHPT.
 */
export const hiperparatireoidismoCaesGatosRecord: DiseaseRecord = {
  id: 'disease-hiperparatireoidismo-caes-gatos',
  slug: 'hiperparatireoidismo-caes-gatos',
  title: 'Hiperparatireoidismo em cães e gatos',
  subtitle:
    'Hiperparatireoidismo primário, secundário renal/CKD-MBD e secundário nutricional — fisiopatologia, diagnóstico diferencial e manejo',
  synonyms: [
    'PHPT',
    'Hiperparatireoidismo primário',
    'Hiperparatireoidismo secundário renal',
    'Hiperparatireoidismo secundário nutricional',
    'NSHP',
    'CKD-MBD',
    'Hyperparathyroidism',
    'Osteodistrofia renal',
    'Rubber jaw',
    'Mineral and bone disorder',
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  tags: [
    'PTH',
    'iCa',
    'CKD-MBD',
    'PHPT',
    'NSHP',
    'FGF23',
    'IRIS',
    'Paratireoidectomia',
    'Hipercalcemia',
    'Hipocalcemia',
    'Osteodistrofia',
    'Quelante de fósforo',
  ],
  vinReferencePending: true,
  quickSummary:
    'Hiperparatireoidismo é secreção persistentemente aumentada ou inadequadamente não suprimida de paratormônio (PTH) — o significado clínico depende inteiramente do mecanismo. A pergunta inicial não é “PTH alto?”, e sim: **PTH autônomo ou compensatório?** No **PHPT**, tecido paratireoidiano secreta PTH apesar de cálcio ionizado (iCa) elevado — padrão clássico: **iCa ↑ + PTH inadequadamente normal ou ↑ + fósforo baixo/baixo-normal**; tratamento definitivo: paratireoidectomia. No **CKD-MBD** (secundário renal), PTH ↑ compensa retenção de fósforo, queda de calcitriol e elevação precoce de FGF23 — **fósforo normal não exclui** doença mineral precoce; tratamento: dieta renal e quelantes conforme **IRIS 2026**. No **NSHP** (secundário nutricional), dieta Ca:P inadequada estimula PTH para preservar iCa às custas do esqueleto — especialmente filhotes/gatinhos; tratamento: **corrigir dieta completa**, não apenas suplementar cálcio. **Nunca interpretar PTH isolado** — sempre correlacionar com iCa (não cálcio corrigido por fórmula). Em hipercalcêmico, PTH “dentro da referência” pode ser fisiologicamente anormal por não estar suprimido. (6)(7)(8)(9)(10)',
  quickDecisionStrip: [
    'Primeira pergunta: PTH autônomo (PHPT) ou compensatório (CKD-MBD / NSHP)? — o tratamento é oposto. (6)(7)',
    'iCa confirma hipercalcemia biologicamente relevante — **não usar cálcio corrigido por albumina** para decidir PHPT. (6)(8)(11)',
    'Hipercalcêmico com PTH “normal”: ainda pode ser PHPT — valor deveria estar suprimido; “normal” ≠ excluído. (6)(7)',
    'CKD + PTH ↑ = CKD-MBD esperado — **não rotular tumor paratireoidiano** sem iCa elevado e padrão autônomo. (8)(9)(10)',
    'Fósforo sérico normal **não exclui** CKD-MBD precoce — FGF23 e PTH podem subir antes da hiperfosfatemia. (8)(9)(10)',
    'PHPT canino: ~71% podem ter exame físico normal — hipercalcemia incidental é apresentação típica. (6)',
    'PHPT felino: massa cervical palpável é relativamente comum (~38–57%) — palpar tireoide/paratireoides em gato idoso hipercalcêmico. (6)(14)',
    'Furosemida na hipercalcemia: **somente após euvolemia** — 2–4 mg/kg IV/SC/VO q8–24h titulado; nunca em desidratado. (7)(11)',
    'Fenbendazol não trata hipercalcemia — não confundir com manejo de hiperparatireoidismo. (6)',
    'Não iniciar prednisona/dexametasona às cegas antes de investigar lymphoma quando é diferencial real — prejudica citologia. (6)(7)',
    'Ultrassom cervical localiza massa (~90–95% em mãos experientes), mas **não substitui histopatologia** adenoma vs carcinoma. (6)(15)',
    'Principal risco pós-paratireoidectomia: **hipocalcemia** — Ca normal na manhã seguinte não elimina queda tardia (3–6 dias). (6)(7)(12)',
    'PTH pré-operatório ≥75 pg/mL: sensibilidade ~96,6% para hipocalcemia pós-op, mas especificidade baixa (~42%) — não regra absoluta. (12)',
    'Calcitriol **não é rotina** no CKD-MBD moderno — especialmente gatos; IRIS 2026 prioriza fósforo/dieta/quelante. (8)(10)',
    'NSHP: Ca sérico pode estar normal enquanto esqueleto está osteopênico — PTH preserva iCa removendo Ca do osso. (5)(7)(17)',
  ],
'''

# Continue building - I'll append more sections via Python string concatenation in the script
# For maintainability, write the rest in the script file itself

print("Script stub - use full write")
