from pathlib import Path
p=Path('tests/consulta-vet/concise-summaries.test.tsx');s=p.read_text(encoding='utf8');s=s.replace("import { medicationsSeed }", "import { MedicationMechanismExplanation } from '../../modules/consulta-vet/components/medication/MedicationContextSections';\nimport { medicationsSeed }")
s=s.replace("    assert.match(html, /Plano diagnóstico/);\n    assert.match(html, /Plano de tratamento/);", "    assert.doesNotMatch(html, /Plano diagnóstico|Plano de tratamento/);")
s=s.replace("test('medicamentos exibem resumo próprio e preservam informação complementar em expansão fechada'", "test('medicamentos exibem apenas a síntese e mantêm explicações na seção farmacológica'")
s=s.replace("    const supplemental = html.slice(html.indexOf('Ver indicações, cuidados e explicações complementares'));\n    assert.match(supplemental, /EXPLICACAO_EXTENSA_ANTIGA/);", "    assert.doesNotMatch(html, /EXPLICACAO_EXTENSA_ANTIGA|Ver indicações, cuidados/);\n    const explanation = renderToStaticMarkup(<MedicationMechanismExplanation medication={{ ...record, plainLanguageSummary: 'EXPLICACAO_EXTENSA_ANTIGA' }} />);\n    assert.match(explanation, /EXPLICACAO_EXTENSA_ANTIGA/);")
s+='''

test('fichas sem resumo revisado nunca usam uma monografia extensa como fallback', () => {
  const text = 'TEXTO_EXTENSO '.repeat(200);
  const disease = renderToStaticMarkup(<DiseaseQuickSummaryPanel slug="nova-doenca" quickSummary={text} data={{ lead: text }} />);
  const medication = renderToStaticMarkup(<MedicationQuickSummaryPanel medication={{ ...medicationsSeed[0], slug: 'novo-medicamento', plainLanguageSummary: text }} />);
  assert.doesNotMatch(disease + medication, /TEXTO_EXTENSO/);
});
''';p.write_text(s,encoding='utf8')
p=Path('tests/consulta-vet/medication-content-isolation.test.tsx');s=p.read_text(encoding='utf8');s="import { MedicationMechanismExplanation } from '../../modules/consulta-vet/components/medication/MedicationContextSections';\n"+s;s=s.replace('assert.match(summary, /Mecanismo específico de teste/);', "assert.doesNotMatch(summary, /Mecanismo específico de teste/);\n    const explanation = renderToStaticMarkup(<MedicationMechanismExplanation medication={{ ...medication, mechanismOfAction: 'Mecanismo específico de teste' }} />);\n    assert.match(explanation, /Mecanismo específico de teste/);");p.write_text(s,encoding='utf8')
