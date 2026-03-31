/**
 * Fixtures de teste para o Catálogo V1 de Manipulados.
 * Uso: clicar em "Carregar exemplo" na tela de Manipulados para pré-preencher o editor.
 */
import { normalizeManipuladoV1, type ManipuladoV1Formula } from './manipuladosV1'

export function createAciclovirPastaOralFixture(clinicId: string): ManipuladoV1Formula {
  return normalizeManipuladoV1({
    identity: {
      id: crypto.randomUUID(),
      clinic_id: clinicId,
      slug: 'aciclovir-pasta-oral-felina',
      name: 'Aciclovir pasta oral sabor frango',
      species_scope: 'gato',
      pharmaceutical_form: 'Pasta oral',
      primary_route: 'ORAL',
      sale_classification: 'free',
      indication_summary: 'Antiviral — herpesvírus felino (FHV-1)',
      description: 'Pasta oral palatável para gatos. Dose ajustada pelo peso do animal.',
      is_active: true,
    },
    prescribing: {
      posology_mode: 'mg_per_kg_dose',
      dose_min: 10,
      dose_max: 25,
      dose_unit: 'mg',
      frequency_mode: 'q12h',
      frequency_label: 'a cada 12 horas',
      duration_value: 14,
      duration_unit: 'dias',
      duration_label: '14 dias',
      start_text: '',
      generated_usage_text: '',
      manual_usage_override: '',
      clinical_note: 'Agitar antes de usar. Manter refrigerado (2–8 °C). Utilizar seringa dosadora fornecida pela farmácia.',
    },
    pharmacy: {
      qsp_text: '60 g',
      total_quantity: '60 g',
      final_unit: 'doses',
      flavor_mode: 'Frango',
      flavor_text: '',
      base_text: 'pasta oral palatável',
      compounding_instructions: '',
      pharmaceutic_note: '',
    },
    ingredients: [
      {
        id: crypto.randomUUID(),
        name: 'Aciclovir',
        quantity: null,
        unit: 'mg',
        role: 'active',
        rule: 'per_kg',
        note: 'Dose de 10–25 mg/kg/dose. Ajustar conforme peso atual do paciente.',
        min_quantity: 10,
        max_quantity: 25,
        weight_range_text: '',
      },
      {
        id: crypto.randomUUID(),
        name: 'Pasta oral palatável sabor frango',
        quantity: null,
        unit: 'g',
        role: 'base',
        rule: 'fixed',
        note: 'Veículo palatável q.s.p. 60 g.',
        min_quantity: null,
        max_quantity: null,
        weight_range_text: '',
      },
    ],
    variants: [],
    display: {
      auto_print_line: true,
      print_line_left: '',
      print_line_right: '',
    },
  })
}
