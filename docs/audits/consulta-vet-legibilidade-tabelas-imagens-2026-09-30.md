# Plano de legibilidade — ConsultaVet

## Implementado
- Todas as tabelas HTML do módulo usam ReadableTable: rolagem local, foco por teclado e aviso somente quando necessário.
- Largura mínima por célula e quebra por palavras, evitando títulos e termos fragmentados.
- Tabelas editoriais mantêm título fora da rolagem. Em áreas de até 576 px, cada linha vira um bloco com os respectivos rótulos das colunas, sem remover conteúdo.
- Tabelas especializadas (IRIS, doses, consensos e emergências) preservam a estrutura comparativa, inclusive células mescladas; usam rolagem local em telas estreitas.
- Figuras clínicas mantêm proporção natural; figuras completas não recebem limite de altura. Galerias só abrem uma segunda coluna quando cada imagem dispõe de pelo menos 448 px.
- A ampliação de figuras editoriais é acionável por botão e teclado, com indicação visível também em dispositivos de toque.

## Critérios para novos conteúdos
1. Usar ReadableTable em qualquer nova tabela; preferir EditorialClinicalTableBlock para tabelas de texto com cabeçalhos simples.
2. Não reduzir tipografia para acomodar mais colunas. Usar leitura vertical para texto e comparação horizontal para matrizes numéricas.
3. Reservar display full para algoritmos e diagramas com texto; compact para fotos simples. Não recortar imagens clínicas para igualar alturas.
4. Manter legendas próximas da imagem, fonte e descrição alternativa informativas.

## Próxima evolução
- Avaliar leitura vertical específica para cada tabela complexa, preservando unidades, cabeçalhos agrupados e relações entre linhas.
- Unificar os visualizadores de imagens de doenças e guias em um diálogo com zoom, pan e controles de foco padronizados.
- Auditar imagens de baixa resolução individualmente antes de substituí-las; registrar origem e legenda clínica.

## Verificação
- TypeScript e build de produção passaram; build informa avisos de tamanho dos bundles e importação estática/dinâmica.
- 11 testes existentes passaram, incluindo integridade de 113 figuras e preservação do conteúdo progressivo.
- Inspeção visual da tabela real de anemia em página local com os componentes de produção: 1100 px e 390 px. Em desktop, documento com 1100 px e rolagem restrita à tabela.
- Rota autenticada redirecionou para login; não foi realizada uma auditoria autenticada de todas as páginas. O preview não integra as rotas publicadas do app.
