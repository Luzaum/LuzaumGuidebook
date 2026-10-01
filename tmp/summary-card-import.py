from pathlib import Path
p=Path('modules/consulta-vet/pages/MedicationsPage.tsx');s=p.read_text(encoding='utf8');p.write_text("import { CONCISE_MEDICATION_SUMMARIES } from '../data/conciseClinicalSummaries';\n"+s,encoding='utf8')
