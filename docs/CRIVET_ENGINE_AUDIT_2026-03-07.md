# Auditoria CRIVET - Engine de Calculo e Dados

Data: 2026-03-07T16:34:54.146Z

## Resumo Executivo
- Total de farmacos auditados: 28
- Funcionais: 6
- Funcionais com ressalvas: 19
- Nao funcionais: 3

## Lacunas de Dados
- Sem dose indicada CRI estruturada: 5
- Sem unidade recomendada: 0
- Unidade recomendada nao suportada pela engine: 9
- Sem concentracao comercial no cadastro principal: 2
- Sem objeto de compatibilidade no cadastro: 0
- Compatibilidade sem detalhe especifico: 21

### Secoes com mais faltas (top 10)

## Resultado por Farmaco
| Farmaco | Categoria | Status | Calc Direto | Calc Preparo | Dose indicada | Unidade recomendada | Concentracao | Compatibilidade detalhada | Completude |
|---|---|---|---|---|---|---|---|---|---|
| LidocaÃ­na | AnalgÃ©sicos e AnestÃ©sicos | funcional_com_ressalvas | OK | OK | OK | mcg/kg/min (OK) | OK | Nao | 100% |
| Fentanil (citrato) | AnalgÃ©sicos e AnestÃ©sicos | funcional | OK | OK | OK | mcg/kg/h (OK) | OK | OK | 100% |
| Remifentanil | AnalgÃ©sicos e AnestÃ©sicos | funcional | OK | OK | OK | mcg/kg/min (OK) | OK | OK | 100% |
| Morfina | AnalgÃ©sicos e AnestÃ©sicos | funcional_com_ressalvas | OK | OK | OK | mg/kg/h (OK) | OK | Nao | 100% |
| Metadona | AnalgÃ©sicos e AnestÃ©sicos | funcional_com_ressalvas | OK | OK | OK | mg/kg/h (OK) | OK | Nao | 100% |
| Butorfanol | AnalgÃ©sicos e AnestÃ©sicos | funcional_com_ressalvas | OK | OK | OK | mg/kg/h (OK) | OK | Nao | 100% |
| Cetamina | AnalgÃ©sicos e AnestÃ©sicos | funcional | OK | OK | OK | mg/kg/h (OK) | OK | OK | 100% |
| Dexmedetomidina | AnalgÃ©sicos e AnestÃ©sicos | funcional_com_ressalvas | OK | OK | OK | mcg/kg/h (OK) | OK | Nao | 100% |
| Propofol | AnalgÃ©sicos e AnestÃ©sicos | nao_funcional | OK | Falha | OK | mg/kg/h (OK) | OK | Nao | 100% |
| Dobutamina | Agentes Cardiovasculares | funcional | OK | OK | OK | mcg/kg/min (OK) | OK | OK | 100% |
| Dopamina | Agentes Cardiovasculares | funcional_com_ressalvas | OK | OK | OK | mcg/kg/min (OK) | OK | Nao | 100% |
| Efedrina | Agentes Cardiovasculares | funcional_com_ressalvas | OK | OK | OK | mg/kg (NAO SUPORTADA) | OK | OK | 100% |
| Norepinefrina | Agentes Cardiovasculares | funcional | OK | OK | OK | mcg/kg/min (OK) | OK | OK | 100% |
| Nitroprussiato | Agentes Cardiovasculares | funcional_com_ressalvas | OK | OK | OK | mcg/kg/min (OK) | OK | Nao | 100% |
| Diltiazem | Agentes Cardiovasculares | funcional_com_ressalvas | OK | OK | OK | mcg/kg/min (OK) | OK | Nao | 100% |
| Esmolol | Agentes Cardiovasculares | nao_funcional | OK | Falha | OK | mcg/kg/min (OK) | OK | Nao | 100% |
| Vasopressina | Agentes Cardiovasculares | funcional_com_ressalvas | OK | Guardado | OK | mukgmin (OK) | OK | Nao | 100% |
| Ceftriaxona | Antimicrobianos | funcional_com_ressalvas | OK | OK | Nao | mg/kg (NAO SUPORTADA) | OK | Nao | 100% |
| Meropenem | Antimicrobianos | funcional_com_ressalvas | OK | OK | Nao | mg/kg (NAO SUPORTADA) | OK | Nao | 100% |
| Enrofloxacina | Antimicrobianos | funcional_com_ressalvas | OK | OK | Nao | mg/kg (NAO SUPORTADA) | OK | Nao | 100% |
| Cefalexina | Antimicrobianos | funcional_com_ressalvas | OK | OK | Nao | mg/kg (NAO SUPORTADA) | OK | Nao | 100% |
| Clindamicina | Antimicrobianos | funcional_com_ressalvas | OK | OK | Nao | mg/kg (NAO SUPORTADA) | OK | Nao | 100% |
| Metronidazol | Antimicrobianos | funcional_com_ressalvas | OK | OK | OK | mg/kg/h (OK) | OK | Nao | 100% |
| MLK (Morfina + LidocaÃ­na + Cetamina) | InfusÃµes Combinadas | funcional_com_ressalvas | OK | OK | OK | ml/kg/h (solução preparada) (NAO SUPORTADA) | Nao | Nao | 100% |
| FLK (Fentanil + LidocaÃ­na + Cetamina) | InfusÃµes Combinadas | nao_funcional | OK | Falha | OK | ml/kg/h (solução preparada) (NAO SUPORTADA) | Nao | Nao | 100% |
| Insulina Regular | EndÃ³crino | funcional_com_ressalvas | OK | OK | OK | U/kg/h (OK) | OK | Nao | 100% |
| Metoclopramida | AntiemÃ©ticos / PrÃ³-cinÃ©ticos | funcional_com_ressalvas | OK | OK | OK | mg/kg/day (NAO SUPORTADA) | OK | Nao | 100% |
| Maropitant | AntiemÃ©ticos / PrÃ³-cinÃ©ticos | funcional | OK | OK | OK | mg/kg/h (OK) | OK | OK | 100% |

## Observacoes Tecnicas
- LidocaÃ­na (lidocaina): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- Morfina (morfina): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- Metadona (metadona): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- Butorfanol (butorfanol): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- Dexmedetomidina (dexmedetomidina): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- Propofol (propofol): Compatibilidade sem detalhes especificos (apenas desconhecido/generico). | Preparo retornou erro: ⛔ Preparo impossível
- Dopamina (dopamina): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- Efedrina (efedrina): Unidade recomendada nao suportada pela engine: mg/kg
- Nitroprussiato (nitroprussiato): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- Diltiazem (diltiazem): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- Esmolol (esmolol): Compatibilidade sem detalhes especificos (apenas desconhecido/generico). | Preparo retornou erro: ⛔ Preparo impossível
- Vasopressina (vasopressina): Compatibilidade sem detalhes especificos (apenas desconhecido/generico). | Bloqueio de seguranca esperado para vasopressina sem pre-diluicao.
- Ceftriaxona (ceftriaxona): Unidade recomendada nao suportada pela engine: mg/kg | Faixa de dose indicada ausente para CRI (perfil/legacy). | Compatibilidade sem detalhes especificos (apenas desconhecido/generico). | Dose sintetica usada por ausencia de faixa CRI estruturada.
- Meropenem (meropenem): Unidade recomendada nao suportada pela engine: mg/kg | Faixa de dose indicada ausente para CRI (perfil/legacy). | Compatibilidade sem detalhes especificos (apenas desconhecido/generico). | Dose sintetica usada por ausencia de faixa CRI estruturada.
- Enrofloxacina (enrofloxacina): Unidade recomendada nao suportada pela engine: mg/kg | Faixa de dose indicada ausente para CRI (perfil/legacy). | Compatibilidade sem detalhes especificos (apenas desconhecido/generico). | Dose sintetica usada por ausencia de faixa CRI estruturada.
- Cefalexina (cefalexina): Unidade recomendada nao suportada pela engine: mg/kg | Faixa de dose indicada ausente para CRI (perfil/legacy). | Compatibilidade sem detalhes especificos (apenas desconhecido/generico). | Dose sintetica usada por ausencia de faixa CRI estruturada.
- Clindamicina (clindamicina): Unidade recomendada nao suportada pela engine: mg/kg | Faixa de dose indicada ausente para CRI (perfil/legacy). | Compatibilidade sem detalhes especificos (apenas desconhecido/generico). | Dose sintetica usada por ausencia de faixa CRI estruturada.
- Metronidazol (metronidazol): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- MLK (Morfina + LidocaÃ­na + Cetamina) (mlk): Unidade recomendada nao suportada pela engine: ml/kg/h (solução preparada) | Concentracao comercial ausente na lista principal; usado valor sintetico 1 mg/mL para teste. | Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- FLK (Fentanil + LidocaÃ­na + Cetamina) (flk): Unidade recomendada nao suportada pela engine: ml/kg/h (solução preparada) | Concentracao comercial ausente na lista principal; usado valor sintetico 1 mg/mL para teste. | Compatibilidade sem detalhes especificos (apenas desconhecido/generico). | Preparo retornou erro: ⛔ Preparo impossível
- Insulina Regular (insulina_regular): Compatibilidade sem detalhes especificos (apenas desconhecido/generico).
- Metoclopramida (metoclopramida): Unidade recomendada nao suportada pela engine: mg/kg/day | Compatibilidade sem detalhes especificos (apenas desconhecido/generico).