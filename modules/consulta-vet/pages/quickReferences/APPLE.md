# APPLE Score

Rota: `/consulta-vet/referencias-rapidas/apple`, dentro das Referências clínicas.

- `../../data/appleScore.ts`: quatro tabelas independentes, soma e regressões.
- `../../data/appleHelp.ts`: explicações dos parâmetros.
- `AppleScorePage.tsx` e `appleScore.css`: seleção, tabela, resumo, cópia e impressão.
- `tests/consulta-vet/apple-score.test.ts`: máximos, ausência de dados, pesos não monotônicos e exemplo clínico.

## Fontes e decisões de transcrição

Material fornecido pelo solicitante e figuras dos trabalhos de Hayes et al.:

- Canino: JVIM 2010;24:1034–1047. https://doi.org/10.1111/j.1939-1676.2010.0552.x
- Felino: JVIM 2011;25:26–38. https://doi.org/10.1111/j.1939-1676.2010.0648.x

A ordem das variáveis e a coluna de zero pontos são preservadas. As opções são
seleções manuais dos intervalos impressos; não há classificação automática de
valores contínuos nem interpolação dos pesos. Resultados entre limites exigem
conferência da precisão e da fonte antes de arredondamento.

O lactato canino FULL usa a figura em mg/dL (18,0 / 71,2 / 71,3 / 90,1), evitando
apresentar a conversão aproximada em mmol/L como fronteira exata. O FAST canino
segue os intervalos fornecidos: <2, 2–8, >8–10 e >10 mmol/L.
O FULL felino inicia em ureia mmol/L, como a imagem fornecida, e permite alternar
para BUN mg/dL conforme o apêndice americano. A troca muda apenas a representação
da faixa selecionada; não converte um exame numérico. As duas tabelas têm
arredondamentos próprios.

Nenhuma variável inicia preenchida. O total exige todas as variáveis; a estimativa
histórica é exibida junto com o total. A janela de 24 h e a mentação na admissão são orientações do protocolo. Não há classificação
inventada de gravidade, diagnóstico de sepse ou recomendação terapêutica.

## Verificação

Oito testes de cálculo cobrem os quatro modelos. Revisão visual com Playwright
em montagem isolada dos componentes com o tema ConsultaVET, em desktop e celular
de 390 px, nos temas claro e escuro. Foram exercitados o exemplo 32/50 (72,1%),
cópia para o clipboard, limpeza ao trocar modelo, navegação
entre a lista e o mini app e impressão A4. A autenticação de produção não foi
alterada para os testes. Quality gate: typecheck, lint e build.

## Ícone

Arquivo: `public/consulta-vet/reference-apps/apple.png`.
Gerado pela ferramenta integrada `image_gen`, sem CLI/API externa.

Prompt final:

> Use case: logo-brand. Asset type: square veterinary APPLE Score mini-app icon. Create a polished bold illustrated app icon: an angry vivid green bacterium with little microbial projections, furrowed brows and visible teeth actively biting and eating a bright RED apple. Apple silhouette reminiscent of the familiar Apple bitten-apple logo, with leaf and bite, but dimensional red fruit. Both subjects clearly readable at 64px. Dark navy background filling the square, subtle depth, premium playful 3D/cartoon rendering, compact centered composition, generous safe margins. No text, no lettering, no extra objects, no rounded outer frame.
