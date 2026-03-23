# Relatório de Importação de Manipulados

## Objetivo
Gerar um JSON único, pronto para importação no VETIUS / ReceituarioVET, para preencher o cadastro de um medicamento manipulado no catálogo da clínica.

## O que o app aceita hoje
O importador da tela `Manipulados` aceita um objeto JSON em um destes formatos:

1. Objeto raiz com:
- `medication`
- `ingredients`
- `regimens`

2. Objeto embrulhado em:
- `manipulado`

3. Objeto embrulhado em:
- `bundle`

## Regras de preenchimento
- O nome da fórmula é obrigatório: `medication.name`
- A forma farmacêutica é obrigatória: `medication.pharmaceutical_form`
- Espécies aceitas na tela de manipulados:
  - `Canina`
  - `Felina`
- Classificação de venda:
  - `medication.is_controlled = true` para controlado
  - `medication.is_controlled = false` para venda livre
- `control_type` pode ser enviado como:
  - `controlled`
  - `otc`
- Ingredientes e regimes podem vir vazios, mas o ideal é enviar pelo menos:
  - 1 ingrediente
  - 1 regime recomendado

## Campos de medication
- `id`
- `name`
- `slug`
- `description`
- `pharmaceutical_form`
- `default_route`
- `species`
- `routes`
- `is_controlled`
- `control_type`
- `is_active`
- `notes`
- `manipulation_instructions`
- `default_quantity_text`
- `default_qsp_text`
- `default_flavor`
- `default_vehicle`
- `default_excipient`
- `metadata`

## Campos de ingredients[]
- `id`
- `ingredient_name`
- `ingredient_role`
- `quantity_value`
- `quantity_unit`
- `concentration_value`
- `concentration_unit`
- `per_value`
- `per_unit`
- `free_text`
- `is_controlled_ingredient`
- `notes`

## Valores aceitos para ingredient_role
- `active`
- `vehicle`
- `excipient`
- `flavor`
- `adjuvant`
- `preservative`
- `other`

## Campos de regimens[]
- `id`
- `regimen_name`
- `indication`
- `dosing_mode`
- `species`
- `route`
- `dose_min`
- `dose_max`
- `dose_unit`
- `per_weight_unit`
- `fixed_administration_value`
- `fixed_administration_unit`
- `concentration_value`
- `concentration_unit`
- `concentration_per_value`
- `concentration_per_unit`
- `frequency_value_min`
- `frequency_value_max`
- `frequency_unit`
- `frequency_label`
- `duration_mode`
- `duration_value`
- `duration_unit`
- `inherit_default_start`
- `notes`
- `allow_edit`
- `default_prepared_quantity_text`
- `default_administration_sig`

## Valores aceitos para dosing_mode
- `fixed_per_patient`
- `calculated`

## Exemplo de instrução para outra IA
“Pesquise e gere um JSON único compatível com o VETIUS para cadastro de um medicamento manipulado veterinário. Entregue somente o JSON final, usando os campos `medication`, `ingredients` e `regimens`, sem explicações extras. Preencha nome da fórmula, forma farmacêutica, vias, espécies, classificação de venda, composição, q.s.p., sabor/veículo/excipiente e ao menos um regime recomendado.”
