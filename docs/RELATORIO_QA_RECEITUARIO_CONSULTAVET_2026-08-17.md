# Relatório de correções e QA — Receituário do ConsultaVet

Data: 17/08/2026  
Escopo: receituário integrado em `/consulta-vet/receituario`, pesquisa de medicamentos e catálogo comercial. O antigo `receituario-vet` não faz parte do escopo.

## Resultado

Status do escopo corrigido: **aprovado nos testes específicos e no build de produção**.

Foram corrigidos os cortes silenciosos que faziam parte do catálogo comercial desaparecer, sem remover produtos, apresentações, exemplos de prescrição ou orientações. A pesquisa no receituário passou a consultar todos os resultados elegíveis e a busca da página de Comerciais passou a considerar também apresentações, composição, indicações, instruções de bula, doses e exemplos de receita.

## Correções realizadas

- Removido o limite implícito de 80 produtos do serviço comercial.
- Removidos os cortes de 24 princípios ativos, 12 resultados ativos e 8 consultas de apresentações no compositor.
- Mantido suporte a limite explícito quando uma tela realmente solicitar paginação.
- Consultas de apresentações agora usam concorrência controlada, preservando a ordem e evitando sobrecarga.
- Busca por nome comercial exato prioriza o produto correspondente e evita falsos positivos visuais; busca tolerante por princípio ativo continua funcionando.
- Corrigido o denominador de concentrações como `20 mg/5 mL`.
- Unidades `mcg`, `mg`, `g`, `UI` e doses diretas em `mL/kg` deixaram de ser tratadas indiscriminadamente como mg.
- Comprimidos respeitam a divisibilidade cadastrada; sem divisibilidade conhecida, o motor não inventa quartos.
- Cápsulas fracionárias são bloqueadas e orientam escolha de outra apresentação/manipulação.
- Peso fora da faixa plausível por espécie é bloqueado com mensagem clara.
- Regimes com calculadora desabilitada não exibem resultados numéricos enganosos.
- Alertas de sobredose pela faixa clínica têm prioridade sobre alertas de arredondamento da apresentação.
- Campos da calculadora receberam associação acessível entre rótulos e controles.

## Evidências

| Verificação | Resultado |
|---|---|
| Suíte `test:receituario` | 119 testes, 119 aprovados, 0 falhas |
| Auditoria de modelos | 29 modelos processados |
| Build Vite de produção | Aprovado, 3.523 módulos transformados |
| Verificação de conflitos do prebuild | Aprovada |
| Pesquisa por categoria dermatológica | 97 produtos únicos retornados; antigo teto era 80 |
| Pesquisa comercial `Cerenia` no navegador | 1 Cerenia, 0 falsos positivos de Simeticona após recarregar |
| Fluxo visual | Receituário, nova receita, adicionar medicamento e resultados comerciais renderizados |

Os testes de regressão adicionados cobrem catálogo acima de 80 itens, limite explícito, pesquisa em orientações/apresentações, divisibilidade de comprimidos, bloqueio de cápsulas, `mg/5 mL`, `mL/kg`, conversão `mcg` e peso implausível.

## Observação sobre TypeScript global

O comando global `typecheck` ainda não fica verde por erros preexistentes fora deste escopo, principalmente em dados/editorial de doenças e no módulo EnergiaVet. O erro introduzido durante a implementação no seletor de espécie foi corrigido. O build de produção concluiu com sucesso, embora mantenha avisos preexistentes de chaves duplicadas em arquivos editoriais não relacionados ao receituário.

## Conclusão

O problema relatado de catálogo comercial incompleto foi reproduzido, corrigido e protegido por teste automatizado. Nenhum registro comercial foi excluído ou reduzido; a mudança amplia a descoberta de informações existentes e torna os cálculos mais conservadores quando faltam metadados clínicos.
