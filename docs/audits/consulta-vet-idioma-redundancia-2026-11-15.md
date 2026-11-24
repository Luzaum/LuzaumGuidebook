# Auditoria editorial — idioma e redundância

Data: 15/11/2026. Escopo: catálogo local efetivamente importado, com 82 doenças e 45 medicamentos, incluindo transformações aplicadas pelos seeds. Foram inspecionados os renderizadores e feita busca automatizada de rótulos, termos selecionados e textos idênticos com pelo menos 100 caracteres (desconsiderando espaços e tokens de referência). Não houve alteração de conteúdo clínico nem consulta ao banco de produção. A análise é editorial, não uma validação de doses ou recomendações médicas. Os arquivos locais já continham alterações de outros trabalhos; esta auditoria reflete o estado lido durante a execução.

## Achados confirmados

| Prioridade | Problema | Onde ocorre | Correção proposta |
| --- | --- | --- | --- |
| Alta | Título “Findings por System” | Cinomose, hipoadrenocorticismo e pancreatite | Mapear `findingsBySystem` explicitamente para “Sinais clínicos por sistema”. |
| Alta | Título “Físico Exame Findings” | As três doenças anteriores e colangite parasitária | Mapear `physicalExamFindings` para “Achados do exame físico”. |
| Alta | Sinais por sistema apresentados em narrativa e novamente em tabela | Cinomose: manifestações respiratórias, oculares, dermatológicas, odontológicas e neurológicas, seguidas de sete grupos em `findingsBySystem` | Consolidar os sinais, mecanismos e significado clínico em uma apresentação principal; manter fora dela somente explicações complementares, imagens e diferenças de evolução. |
| Alta | Parágrafos literalmente repetidos em seções consecutivas | Obstrução funcional do fluxo urinário: `epidemiologiaPerfilPredisposicao` e `diferenciacaoCriticaCaesVsGatos`, presentes tanto em etiologia quanto em epidemiologia | Manter perfil epidemiológico em epidemiologia e distribuir as particularidades entre espécies conforme a finalidade, sem repetir os dois parágrafos integrais. |
| Alta | A condição de precaução reaparece como sua própria explicação | Ciclosporina, ciproeptadina, clorambucil, gabapentina, maropitant, ondansetrona e sucralfato | Separar condição e justificativa quando o texto permitir. Se forem idênticas, apresentar uma única vez e não inventar uma explicação. |
| Média | Achado de estudo repetido na narrativa e no bloco de evidência | Conversão automática em `medicationBookFoundations.ts`: na ausência de metodologia, a narrativa inclui `mainFindings`, que também alimenta `summaryText` | Narrativa para desenho/contexto; resultados no bloco de evidência; conclusão apenas para interpretação prática. |
| Média | Inglês em títulos editoriais | Miastenia: “Red flags — internação”; tétano: “wound care” em dois títulos; cistite idiopática: “Top-Down” e “Bottom-Up”; intermação e brucelose: “point-of-care” | Usar “Sinais de alerta”, “cuidados com feridas”, equivalentes em português conforme o contexto e “à beira do leito/no local de atendimento”. |
| Média | Anglicismos na prosa dos medicamentos | Exemplos: `steady-state` em ceftriaxona e marbofloxacina; `washout` em meloxicam; `steady state` em metoclopramida | Preferir “estado de equilíbrio” e “intervalo de suspensão entre medicamentos”; manter inglês entre parênteses apenas quando útil à identificação técnica. |

### Detalhe da cinomose

A redundância é semântica, não simples cópia literal. A tabela volta a apresentar secreção nasal/tosse, manifestações oculares, hiperqueratose, alterações dentárias e sinais neurológicos já explicados acima. Contudo, também traz informações específicas, incluindo o grupo gastrointestinal e implicações práticas. Portanto, excluir a tabela inteira perderia conteúdo.

Proposta: uma única estrutura por sistema com sinal, mecanismo e implicação clínica; incorporar nela os detalhes exclusivos da tabela e da narrativa. As imagens devem permanecer junto ao sistema correspondente. A tabela de formas evolutivas pode permanecer se priorizar cronologia e contexto imunológico, reduzindo a repetição dos sinais. O exame físico deve se concentrar no que avaliar, em vez de reenumerar as manifestações.

### Detalhe dos medicamentos

Foram encontrados 78 textos distintos de pelo menos 100 caracteres que se repetem entre `attentionData.precautions[].condition` e `physiologicalExplanation`, distribuídos nos sete medicamentos citados. Esse número representa textos duplicados nos dados, não 78 monografias. O componente `MedicationAttentionTab` utiliza ambos os campos: a repetição aparece ao expandir “Entender o mecanismo”. A origem foi localizada em `medicationClinicalCorrections.ts`, linhas 754–755: o gerador atribui o mesmo `text` aos dois campos.

Também há cópias entre `clinicalStudiesCommented` e `clinicalFoundationsData`. Elas fazem parte de uma transformação interna e não comprovam, isoladamente, duplicação visual. O problema de leitura está no fallback que coloca os resultados na narrativa e novamente no bloco exibido abaixo dela.

## Causa e prevenção

`translateEditorialSubsectionKey` utiliza um dicionário de nomes completos e depois uma tradução palavra a palavra. Palavras desconhecidas são conservadas, produzindo os títulos híbridos. `DiseaseSectionRenderer` renderiza cada propriedade do conteúdo, sem consolidar automaticamente narrativa e tabela.

1. Completar o dicionário com traduções integrais e naturais para os campos realmente utilizados; manter as chaves internas para não quebrar importações ou dados persistidos.
2. Consolidar editorialmente as redundâncias confirmadas, começando por cinomose e obstrução funcional urinária. Preservar doses, ressalvas, diferenças entre espécies e informações exclusivas.
3. Corrigir os geradores de conteúdo dos medicamentos para não recriar duplicações após a edição dos dados.
4. Criar verificação de cobertura de rótulos e regressões para os casos confirmados. Detectores de similaridade devem gerar alertas para revisão humana, sem apagar texto automaticamente.
5. Conferir as páginas renderizadas em desktop e celular e comparar o conteúdo antes/depois. Executar typecheck, lint e build na implementação.
6. Na futura revisão de conteúdo clínico, consultar os tratados em `C:\LIVROS` conforme AGENTS.md. Manter referências a livros apenas na bibliografia.

## Limites e itens que não devem ser removidos automaticamente

- A presença conjunta de tabela e exame físico em Addison e pancreatite não demonstra, por si só, redundância: sinal, mecanismo e procedimento de avaliação têm funções distintas.
- Resumo breve seguido de aprofundamento e alertas de segurança retomados no ponto de prescrição podem ser úteis.
- Títulos originais de artigos, nomes científicos, siglas e referências bibliográficas não devem ser traduzidos indiscriminadamente.
- Imagens presentes tanto no cadastro global quanto na seção clínica podem servir a mecanismos de organização; uma cópia nos dados não comprova duas exibições.
- O Supabase pode servir conteúdo diferente do catálogo local. Antes de uma correção em produção, comparar os registros efetivamente publicados e sua estratégia de mesclagem.
- A busca de termos e repetições é uma triagem com revisão dirigida, não uma prova de ausência de outros problemas em toda a prosa.

Evidências reproduzíveis: `output/audits/editorial-language-audit-2026-11-15.ts` e arquivo JSON correspondente. O JSON inclui candidatos e duplicações internas; deve ser interpretado à luz das distinções deste relatório.
