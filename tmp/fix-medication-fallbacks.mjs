import fs from 'node:fs';
const base='modules/consulta-vet/components/medication/';
let p=base+'MedicationClinicalFoundationsSection.tsx',s=fs.readFileSync(p,'utf8');
s=s.replace('BookOpen, FlaskConical, Stethoscope, ShieldCheck','BookOpen, FlaskConical');
s=s.replace("  const isPhenobarbital = medication?.slug === 'fenobarbital';\n",'');
const start=s.indexOf('        ) : isPhenobarbital ? (');
const end=s.lastIndexOf('        )}');
s=s.slice(0,start)+`        ) : (
          <p className="text-sm text-muted-foreground">Fundamentos específicos ainda não cadastrados para este medicamento.</p>
`+s.slice(end);
s=s.replace('Mecanismos fisiopatológicos explicados e comprovados por múltiplos ensaios clínicos randomizados e consensos veterinários','Mecanismos, aplicação clínica e referências específicas deste medicamento');
fs.writeFileSync(p,s);
p=base+'MedicationQuickSummaryPanel.tsx';s=fs.readFileSync(p,'utf8');
s=s.slice(0,s.indexOf('const DIPIRONA_DEFAULT_HIGHLIGHTS'))+s.slice(s.indexOf('export function MedicationQuickSummaryPanel'));
const a=s.indexOf("    if (medication.slug === 'fenobarbital')");const b=s.indexOf('  return (\n    <section',a);
s=s.slice(0,a)+`    return [
      { title: 'Como atua', icon: Stethoscope, desc: medication.mechanismOfAction },
      ...medication.cautions.slice(0, 2).map((desc) => ({ title: 'Cuidados clínicos', icon: ShieldCheck, desc })),
    ];
  }, [medication]);

  const highlights = medication.quickSummaryHighlights ?? [];

`+s.slice(b);
s=s.replace("medication.routes?.[0] || 'Oral / IV'","medication.routes?.join(' / ') || 'Consultar posologia'").replace("duration: 'Uso agudo monitorado'","duration: 'Conforme indicação e regime posológico'");
fs.writeFileSync(p,s);
p=base+'MedicationPharmacologicalClassificationSection.tsx';s=fs.readFileSync(p,'utf8');
s=s.replace(/\{\(classification\.chemicalClassDescription \|\| classification\.chemicalClass\)/,'{(classification.chemicalClassDescription)');
s=s.replace(/\{classification\.chemicalClassDescription \|\|[\s\S]*?veterinária\.'\)\}/,'{classification.chemicalClassDescription}');
s=s.replace(/\{\(classification\.therapeuticClassDescription \|\| classification\.therapeuticClass\)/,'{(classification.therapeuticClassDescription)');
s=s.replace(/\{classification\.therapeuticClassDescription \|\|[\s\S]*?fisiológicas\.'\)\}/,'{classification.therapeuticClassDescription}');fs.writeFileSync(p,s);
p=base+'MedicationPharmacokineticsSection.tsx';s=fs.readFileSync(p,'utf8').replace('Comportamento de pró-fármaco, biotransformação microssomal e clearance renal','Absorção, distribuição, metabolismo e eliminação do medicamento');fs.writeFileSync(p,s);
