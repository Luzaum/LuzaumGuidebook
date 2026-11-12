# SARA / SDRA — ARDSVet

Rota: `/consulta-vet/referencias-rapidas/sara`.

Base: Tabela 3 e seção 2.4.3 do consenso ARDSVet 2025
(https://pmc.ncbi.nlm.nih.gov/articles/PMC12491761/); contexto de disfunção
respiratória na Tabela 1 do consenso de sepse 2026
(https://pmc.ncbi.nlm.nih.gov/articles/PMC13490290/).

O módulo usa seleção de um método de oxigenação por avaliação, sem combinar
automaticamente medidas discordantes. Os cinco campos clínicos separam a
exclusão cardíaca da exclusão de sobrecarga. Lavado é opcional. Não há total de
pontos, prognóstico percentual ou recomendação terapêutica.

FiO₂ é digitada em porcentagem, convertida para fração no cálculo. Alto fluxo
superior a 1 L/kg/min ou 30 L/min total permite usar a FiO₂ ajustada; nos demais
casos exige confirmação de FiO₂ conhecida. As faixas usam a relação sem
arredondamento. Acima de 1.000 m aplica-se relação × pressão barométrica/760,
exatamente como a nota da tabela, com pressão local informada em mmHg.

Em ar ambiente há avaliação de relação/risco, sem atribuir automaticamente a
categoria não intubada para pequenos animais da tabela, que especifica oxigênio
suplementar. P/F em ar ambiente requer exclusão de hipercapnia para risco.
PEEP <5 impede classificação invasiva. O uso de S/F com SpO₂ >97% ou oximetria
não confiável é bloqueado. Risco exige outro critério clínico incompleto e P/F ≤300 ou SpO₂ <88%.
Limites numéricos de plausibilidade de PaO₂, pressão e PEEP são validações de
entrada, não pontos de corte adicionais do consenso.

`data/ardsVet.ts` contém o motor; `data/ardsVetHelp.ts`, as explicações;
`tests/consulta-vet/ards-vet.test.ts`, 13 cenários de fronteiras e bloqueios.
Revisão visual realizada em montagem isolada com o tema do ConsultaVET,
desktop e celular de 390 px, incluindo ajuda e cópia do exemplo P/F=200.
Ícone vetorial original em `public/consulta-vet/reference-apps/sara.svg`.
