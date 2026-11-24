import fs from 'node:fs';
const audit = JSON.parse(fs.readFileSync('tmp/disease-audit-final.json', 'utf8'));
const details = {
 'doenca-do-disco-intervertebral-gatos': 'Diagnóstico com apenas 94 palavras; ampliar diferenciais, interpretação de imagem, critérios de cirurgia, suporte urinário e acompanhamento.',
 'sindrome-cutanea-atopica-felina': 'Epidemiologia e complicações muito breves; ampliar investigação de causas de prurido, exclusões diagnósticas e monitoramento do tratamento.',
 'dermatite-atopica-canina': 'Epidemiologia e complicações resumidas; ampliar abordagem das recidivas, infecções secundárias e critérios de ajuste terapêutico.',
 'doenca-do-disco-intervertebral-caes': 'Complicações e explicação fisiopatológica breves; ampliar decisões por gravidade neurológica, reabilitação e reavaliação.',
 'hipotireoidismo-adquirido-caes-gatos': 'Tratamento com cerca de 129 palavras; ampliar administração, acompanhamento, interpretação da resposta e ajustes em situações especiais.',
 'granuloma-eosinofilico-felino': 'Fisiopatologia e prevenção sucintas; ampliar investigação do gatilho, diferenciais das apresentações e acompanhamento das recidivas.',
 'sindrome-cushing-caes': 'Patogênese curta e conduta relativamente condensada; ampliar limitações dos testes, acompanhamento e decisões diante de resposta inadequada.',
 'doenca-periodontal-gatos': 'Fisiopatologia e prevenção breves; ampliar plano por gravidade, diferenciais, acompanhamento e cuidados domiciliares.'
};
let text = `# Auditoria da seção de doenças — 24/11/2026

## Escopo e limites

Varredura estrutural/editorial das ${audit.rows.length} fichas locais registradas, incluindo os resumos efetivos aplicados por diseaseOverviewOverrides. O catálogo tinha 84 fichas no início e recebeu duas inclusões durante a revisão (Chiari-like e insuficiência cardíaca congestiva), incorporadas ao inventário final. Consulta somente de leitura aos cinco registros de doenças acessíveis pela configuração pública do Supabase. Nenhuma gravação no banco ou publicação foi realizada.

Foram verificadas 756 seções clínicas por renderização, sem exceções nem saída [object Object] após as correções iniciais. Conferência adicional não encontrou arquivos locais de figuras ausentes nem linhas de tabelas com quantidade de células divergente do cabeçalho. Esses testes não certificam a validade de todas as doses, estudos, links externos ou afirmações clínicas do acervo. A revisão bibliográfica aprofundada nesta rodada concentrou-se nas correções clínicas descritas abaixo.

A idade de uma ficha não foi inferida por número de palavras nem por uma seção ser texto simples. Os oito candidatos locais abaixo têm estrutura atual, mas menor profundidade editorial. Os limiares automatizados são uma triagem, não uma nota de qualidade médica.

## Recadastro prioritário: ficha antiga do banco

**Doença Renal Crônica — slug doenca-renal-cronica.** Registro genérico para cão e gato, com cerca de 40 palavras no tratamento, 41 em diagnostics e 33 na fisiopatologia. Contém várias seções legadas em texto simples. Existem fichas locais atuais separadas: doenca-renal-cronica-canina e doenca-renal-cronica-felina. Recomenda-se reconciliar esse cadastro genérico com as duas fichas atuais; não o substituir automaticamente por apenas uma espécie.

Outros registros do banco:

| Cadastro | Situação observada |
|---|---|
| Cinomose Canina | Registro antigo chega a mencionar “prova de conceito”; a versão local do mesmo slug prevalece no aplicativo. Não necessita recadastro da ficha local por esse motivo. |
| Leishmaniose Visceral Canina | Conteúdo remoto muito resumido; a versão local do mesmo slug prevalece. |
| Colapso Traqueal / Traqueobroncomalácia | Slug colapso-traqueal já possui alias para a ficha atual colapso-traqueal-canino. |
| Fístula perianal | Slug fistula-perianal é diferente de fistula-perianal-furunculose-anal; existe potencial duplicação de cadastro. O conteúdo remoto não foi apagado ou mesclado nesta rodada. |

## Fichas locais candidatas a ampliação ou recadastro

Critérios: menos de 1.800 palavras nas nove seções clínicas, diagnóstico com menos de 100, tratamento com menos de 150, ausência de seção central ou quatro seções em texto simples. Resumos, referências e metadados não entram na contagem. Nenhuma das ${audit.rows.length} fichas apresentou ausência de seção clínica central.

| Doença | Palavras nas seções clínicas | Motivo e foco sugerido |
|---|---:|---|
`;
for (const row of audit.rows.filter(x => x.recadastro)) {
 const detail = details[row.slug] ?? (row.title.startsWith('Hipotireoidismo adquirido') ? 'Tratamento com cerca de 129 palavras; ampliar administração, monitoramento e critérios de ajuste.' : 'Ampliar as seções mais resumidas.');
 text += `| ${row.title} | ${row.totalWords} | ${detail} |\n`;
}
text += `
## Correções aplicadas

- Preservação de listas mistas e objetos clínicos que antes eram descartados pelo renderizador.
- Renderização recursiva de conteúdo estruturado de tratamento e monitoramento, evitando [object Object].
- Compatibilidade dos sinais no formato sign/detail com a tabela clínica por sistemas e seus títulos em português.
- Remoção da repetição do bloco de fármacos na ordenação do tratamento.
- Tradução de termos em inglês no texto assistencial e nos títulos: triagem, desfecho, acompanhamento, ambiente domiciliar, respiração ofegante, autolimpeza, depuração, retroalimentação, uso fora das indicações de bula, entre outros. Referências bibliográficas e identificadores técnicos foram preservados.
- Correção de concordância, redundâncias, grafia e termos incorretos, incluindo “cerâmicas” no lugar de “ceramidas” e “Pátas”.
- Retirada de instruções literais isGoldStandard: true do texto apresentado ao leitor.
- CID: explicação do consumo variável de plaquetas e fatores, sem afirmar esgotamento total obrigatório nem sangramento em todos os pacientes.
- Cushing canino: o resumo passa a explicitar falsos positivos, contexto clínico e limites da diferenciação etiológica.
- Cardiomiopatia restritiva: indicação individual de pimobendan e associação antitrombótica; retirada de garantias de ausência de obstrução, reversão de fibrose e segurança universal. Página impressa da referência consultada corrigida.

## Verificação

Testes de regressão cobrem preservação de achados, objetos aninhados, monitoramento estruturado, não duplicação de protocolos e normalização de sign/detail. Os testes selecionados de doenças, linguagem simples, merge e periodontia somaram 21 aprovações na execução inicial. A validação visual usa uma página temporária com os componentes reais: a rota completa do aplicativo exige autenticação. Captura móvel em output/playwright/disease-review-mobile.png.

Reexecutar triagem: npx tsx scripts/audit-disease-content.ts tmp/disease-audit-final.json.

## Inventário de todas as fichas locais

| Doença | Total de palavras clínicas | Diagnóstico | Tratamento | Triagem |
|---|---:|---:|---:|---|
`;
for (const row of audit.rows) text += `| ${row.title} | ${row.totalWords} | ${row.depth.diagnosis} | ${row.depth.treatment} | ${row.recadastro ? 'Ampliar/revisar' : 'Sem alerta de extensão'} |\n`;
text += `
## Fontes consultadas para as correções clínicas

- Nelson RW, Couto CG. Small Animal Internal Medicine. 6ª ed. Cardiomiopatia restritiva: páginas impressas 168–169; CID: 1400–1401. Consulta direta ao PDF em C:/LIVROS.
- [Consenso ACVIM de cardiomiopatias felinas, 2020](https://onlinelibrary.wiley.com/doi/10.1111/jvim.15745).
- [AAHA: diagnóstico e monitoramento do hipercortisolismo canino, 2023](https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/diagnostic-testing-and-monitoring-2/).
`;
fs.writeFileSync('modules/consulta-vet/docs/AUDITORIA_DOENCAS_2026-11-24.md',text);
console.log('Relatório com '+audit.rows.length+' fichas gravado.');
