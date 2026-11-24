# Auditoria da seção de doenças — 24/11/2026

## Escopo e limites

Varredura estrutural/editorial das 86 fichas locais registradas, incluindo os resumos efetivos aplicados por diseaseOverviewOverrides. O catálogo tinha 84 fichas no início e recebeu duas inclusões durante a revisão (Chiari-like e insuficiência cardíaca congestiva), incorporadas ao inventário final. Consulta somente de leitura aos cinco registros de doenças acessíveis pela configuração pública do Supabase. Nenhuma gravação no banco ou publicação foi realizada.

Foram verificadas 774 seções clínicas das 86 fichas por renderização, sem exceções nem saída [object Object] após as correções. As nove seções de intermação também foram reavaliadas após a normalização de sign/detail. Conferência adicional não encontrou arquivos locais de figuras ausentes nem linhas de tabelas com quantidade de células divergente do cabeçalho. Esses testes não certificam a validade de todas as doses, estudos, links externos ou afirmações clínicas do acervo. A revisão bibliográfica aprofundada nesta rodada concentrou-se nas correções clínicas descritas abaixo.

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

Critérios: menos de 1.800 palavras nas nove seções clínicas, diagnóstico com menos de 100, tratamento com menos de 150, ausência de seção central ou quatro seções em texto simples. Resumos, referências e metadados não entram na contagem. Nenhuma das 86 fichas apresentou ausência de seção clínica central.

| Doença | Palavras nas seções clínicas | Motivo e foco sugerido |
|---|---:|---|
| Doença do Disco Intervertebral — Gatos | 1111 | Diagnóstico com apenas 94 palavras; ampliar diferenciais, interpretação de imagem, critérios de cirurgia, suporte urinário e acompanhamento. |
| Síndrome Cutânea Atópica Felina | 1225 | Epidemiologia e complicações muito breves; ampliar investigação de causas de prurido, exclusões diagnósticas e monitoramento do tratamento. |
| Dermatite Atópica Canina | 1380 | Epidemiologia e complicações resumidas; ampliar abordagem das recidivas, infecções secundárias e critérios de ajuste terapêutico. |
| Doença do Disco Intervertebral — Cães | 1507 | Complicações e explicação fisiopatológica breves; ampliar decisões por gravidade neurológica, reabilitação e reavaliação. |
| Hipotireoidismo adquirido (cão e gato) | 1678 | Tratamento com cerca de 129 palavras; ampliar administração, acompanhamento, interpretação da resposta e ajustes em situações especiais. |
| Complexo do granuloma eosinofílico felino | 1705 | Fisiopatologia e prevenção sucintas; ampliar investigação do gatilho, diferenciais das apresentações e acompanhamento das recidivas. |
| Síndrome de Cushing — Cão | 1764 | Patogênese curta e conduta relativamente condensada; ampliar limitações dos testes, acompanhamento e decisões diante de resposta inadequada. |
| Doença Periodontal Felina | 1770 | Fisiopatologia e prevenção breves; ampliar plano por gravidade, diferenciais, acompanhamento e cuidados domiciliares. |

## Correções aplicadas

- Preservação de listas mistas e objetos clínicos que antes eram descartados pelo renderizador.
- Renderização recursiva de conteúdo estruturado de tratamento e monitoramento, evitando [object Object].
- Compatibilidade dos sinais no formato sign/detail com a tabela clínica por sistemas e seus títulos em português.
- Preservação das quebras de linha nas explicações fisiopatológicas e no significado clínico, evitando comprimir listas em um parágrafo contínuo no desktop e no celular.
- Remoção da repetição do bloco de fármacos na ordenação do tratamento.
- Tradução de termos em inglês no texto assistencial e nos títulos: triagem, desfecho, acompanhamento, ambiente domiciliar, respiração ofegante, autolimpeza, depuração, retroalimentação, uso fora das indicações de bula, entre outros. Referências bibliográficas e identificadores técnicos foram preservados.
- Correção de concordância, redundâncias, grafia e termos incorretos, incluindo “cerâmicas” no lugar de “ceramidas” e “Pátas”.
- Retirada de instruções literais isGoldStandard: true do texto apresentado ao leitor.
- CID: explicação do consumo variável de plaquetas e fatores, sem afirmar esgotamento total obrigatório nem sangramento em todos os pacientes.
- Cushing canino: o resumo passa a explicitar falsos positivos, contexto clínico e limites da diferenciação etiológica.
- Cardiomiopatia restritiva: indicação individual de pimobendan e associação antitrombótica; retirada de garantias de ausência de obstrução, reversão de fibrose e segurança universal. Página impressa da referência consultada corrigida.

## Verificação

Testes de regressão cobrem preservação de achados, objetos aninhados, monitoramento estruturado, não duplicação de protocolos e normalização de sign/detail. Os testes selecionados de doenças, linguagem simples, merge e periodontia somaram 21 aprovações na execução final. Typecheck e lint concluídos sem erros. A validação visual usa uma página temporária com os componentes reais: a rota completa do aplicativo exige autenticação. Capturas em output/playwright/disease-review-mobile.png e output/playwright/disease-review-desktop.png.

Reexecutar triagem: npx tsx scripts/audit-disease-content.ts tmp/disease-audit-final.json.

Build final de produção concluído com sucesso. Permanece o aviso de pacotes acima de 900 kB, incluindo o catálogo de doenças; otimização de carregamento não foi objeto desta revisão. As capturas de desktop (1.600 px) e celular (390 px) não apresentaram transbordamento horizontal, e a expansão da explicação no celular foi testada. A página temporária de inspeção foi removida após a validação.

## Inventário de todas as fichas locais

| Doença | Total de palavras clínicas | Diagnóstico | Tratamento | Triagem |
|---|---:|---:|---:|---|
| Doença do Disco Intervertebral — Gatos | 1111 | 94 | 311 | Ampliar/revisar |
| Síndrome Cutânea Atópica Felina | 1225 | 137 | 350 | Ampliar/revisar |
| Dermatite Atópica Canina | 1380 | 192 | 346 | Ampliar/revisar |
| Doença do Disco Intervertebral — Cães | 1507 | 201 | 334 | Ampliar/revisar |
| Hipotireoidismo adquirido (cão e gato) | 1678 | 192 | 129 | Ampliar/revisar |
| Complexo do granuloma eosinofílico felino | 1705 | 311 | 433 | Ampliar/revisar |
| Síndrome de Cushing — Cão | 1764 | 237 | 232 | Ampliar/revisar |
| Doença Periodontal Felina | 1770 | 170 | 270 | Ampliar/revisar |
| Tumores mamários em cães e gatos | 2017 | 502 | 372 | Sem alerta de extensão |
| Diabetes Mellitus Felino | 2028 | 136 | 842 | Sem alerta de extensão |
| Cardiomiopatia dilatada (CMD) | 2132 | 441 | 346 | Sem alerta de extensão |
| Erliquiose monocítica canina (Ehrlichia canis) | 2137 | 504 | 237 | Sem alerta de extensão |
| Cardiomiopatia hipertrófica (CMH) | 2147 | 420 | 480 | Sem alerta de extensão |
| Diabetes Mellitus Canino | 2151 | 143 | 933 | Sem alerta de extensão |
| Leucemia viral felina (FeLV) | 2152 | 366 | 424 | Sem alerta de extensão |
| Fístula perianal / furunculose anal | 2166 | 285 | 525 | Sem alerta de extensão |
| Doença Periodontal Canina | 2199 | 194 | 324 | Sem alerta de extensão |
| Síndrome de Cushing — Gato | 2211 | 398 | 318 | Sem alerta de extensão |
| Hipertensão arterial sistêmica (HAS) | 2221 | 531 | 163 | Sem alerta de extensão |
| Síndromes miastênicas congênitas (cão e gato) | 2224 | 362 | 456 | Sem alerta de extensão |
| Gengivoestomatite crônica felina (GECF) | 2262 | 340 | 391 | Sem alerta de extensão |
| Prostatite em cães e gatos | 2387 | 362 | 338 | Sem alerta de extensão |
| Doenças do trato urinário inferior felino (DTUIF) | 2403 | 333 | 468 | Sem alerta de extensão |
| Cardiomiopatia restritiva felina (CMR / RCM) | 2413 | 409 | 563 | Sem alerta de extensão |
| Micoplasmoses hemotrópicas (hemoplasmas) em pequenos animais | 2471 | 453 | 559 | Sem alerta de extensão |
| Hipotireoidismo congênito (cão e gato) | 2533 | 331 | 262 | Sem alerta de extensão |
| Miastenia gravis adquirida (cão e gato) | 2569 | 372 | 548 | Sem alerta de extensão |
| Leishmaniose visceral canina (leishmaniose canina por L. infantum) | 2915 | 419 | 683 | Sem alerta de extensão |
| Insulinoma em cães e gatos | 3137 | 587 | 1041 | Sem alerta de extensão |
| Vírus da imunodeficiência felina (FIV) | 3374 | 432 | 756 | Sem alerta de extensão |
| Insuficiência pancreática exócrina (IPE/EPI) | 3472 | 872 | 519 | Sem alerta de extensão |
| Doença valvar mitral degenerativa (DMVD / endocardiose) | 3617 | 897 | 1162 | Sem alerta de extensão |
| Peritonite infecciosa felina (PIF/FIP) | 3707 | 1388 | 380 | Sem alerta de extensão |
| Cistoisosporose em cães e gatos | 3726 | 954 | 1057 | Sem alerta de extensão |
| Linfoma cutâneo | 3828 | 984 | 843 | Sem alerta de extensão |
| Giardíase em cães e gatos | 3839 | 854 | 1152 | Sem alerta de extensão |
| Leishmaniose em Cães e Gatos | 4005 | 465 | 657 | Sem alerta de extensão |
| Hipertireoidismo felino | 4199 | 830 | 1154 | Sem alerta de extensão |
| Lesão Renal Aguda em Cães (LRA / IRA / AKI) | 4246 | 513 | 1301 | Sem alerta de extensão |
| Platinosomose Felina | 4462 | 765 | 1163 | Sem alerta de extensão |
| Cistite Idiopática Felina (CIF / FIC) | 4583 | 556 | 1139 | Sem alerta de extensão |
| Colapso Traqueal em Cães e Gatos | 4598 | 520 | 2130 | Sem alerta de extensão |
| Arritmias cardíacas em cães e gatos | 4621 | 1040 | 1849 | Sem alerta de extensão |
| Obstrução Funcional do Fluxo Urinário em Cães (FOO) | 4741 | 789 | 1232 | Sem alerta de extensão |
| Colangite Parasitária | 4782 | 1234 | 1041 | Sem alerta de extensão |
| Hipoadrenocorticismo (Doença de Addison) | 5045 | 1233 | 1411 | Sem alerta de extensão |
| Cistite Enfisematosa em Cães e Gatos | 5173 | 712 | 1731 | Sem alerta de extensão |
| Hiperparatireoidismo em cães e gatos | 5246 | 835 | 1189 | Sem alerta de extensão |
| Trombocitopenia em Cães e Gatos | 5253 | 1110 | 1403 | Sem alerta de extensão |
| Discinesia Paroxística em Cães e Gatos | 5400 | 920 | 1548 | Sem alerta de extensão |
| Doença renal crônica em cães (DRC canina) | 5464 | 900 | 1655 | Sem alerta de extensão |
| Brucelose em cães e gatos | 5614 | 1845 | 1079 | Sem alerta de extensão |
| Enteropatias inflamatórias crônicas em cães (CIE / antiga IBD) | 5715 | 1270 | 1557 | Sem alerta de extensão |
| Mastite em cadelas e gatas | 5756 | 935 | 1670 | Sem alerta de extensão |
| Anemia Hemolítica Imunomediada em Cães (AHIM / IMHA) | 5857 | 986 | 2191 | Sem alerta de extensão |
| Enteropatia perdedora de proteínas em cães e gatos (PLE) | 5885 | 1182 | 1725 | Sem alerta de extensão |
| Cinomose canina | 5935 | 1443 | 922 | Sem alerta de extensão |
| Megacólon | 5956 | 1005 | 1477 | Sem alerta de extensão |
| Síndrome mielodisplásica (MDS) | 6098 | 1136 | 1323 | Sem alerta de extensão |
| Cetoacidose diabética em cães e gatos | 6132 | 1099 | 2008 | Sem alerta de extensão |
| Sepse e Choque Séptico em Felinos | 6142 | 843 | 1764 | Sem alerta de extensão |
| Doença renal crônica em felinos (DRC felina) | 6222 | 1010 | 2106 | Sem alerta de extensão |
| Polirradiculoneurite Aguda em Cães e Gatos (ACP / AIP) | 6236 | 1006 | 1176 | Sem alerta de extensão |
| Asma felina | 6339 | 1882 | 1889 | Sem alerta de extensão |
| Intermação em Cães e Gatos | 6348 | 713 | 1551 | Sem alerta de extensão |
| Lesão Renal Aguda em Felinos (LRA / AKI) | 6376 | 614 | 1730 | Sem alerta de extensão |
| Tríade Felina | 6430 | 973 | 1952 | Sem alerta de extensão |
| Neoplasias intracranianas em cães (tumores encefálicos) | 6444 | 1184 | 1765 | Sem alerta de extensão |
| Paralisia Laríngea em Cães e Gatos (GOLPP / LPPN) | 6495 | 915 | 1279 | Sem alerta de extensão |
| Sepse e Choque Séptico em Cães | 6534 | 766 | 1693 | Sem alerta de extensão |
| Anemia em Cães e Gatos | 6592 | 1657 | 1093 | Sem alerta de extensão |
| Megaesôfago em Cães e Gatos | 6752 | 1305 | 3041 | Sem alerta de extensão |
| Linfoma Mediastinal em Cães e Gatos | 6856 | 1156 | 2545 | Sem alerta de extensão |
| Bronquite crônica em cães e gatos | 7081 | 1518 | 2266 | Sem alerta de extensão |
| Pancreatite em cães e gatos | 7134 | 2241 | 2335 | Sem alerta de extensão |
| Quilotórax em Gatos e Cães | 7198 | 1060 | 2395 | Sem alerta de extensão |
| Pielonefrite em Cães e Gatos (Pielonefrite Bacteriana / Fúngica) | 7198 | 1240 | 1438 | Sem alerta de extensão |
| Leucemias em cães e gatos | 7480 | 1786 | 1307 | Sem alerta de extensão |
| Tétano em Cães e Gatos (Clostridium tetani) | 8090 | 1162 | 1717 | Sem alerta de extensão |
| Piotórax em Cães e Gatos | 8219 | 1094 | 2996 | Sem alerta de extensão |
| Síndrome de Chiari-like em cães e gatos | 8250 | 1567 | 2712 | Sem alerta de extensão |
| Babesiose em cães e gatos | 8565 | 2115 | 2258 | Sem alerta de extensão |
| Coagulação intravascular disseminada (CID/DIC) | 8657 | 2159 | 2439 | Sem alerta de extensão |
| Prolapso retal em cães e gatos | 10684 | 2122 | 3549 | Sem alerta de extensão |
| Leptospirose em cães e gatos | 11147 | 3049 | 2580 | Sem alerta de extensão |
| Insuficiência cardíaca congestiva (ICC) em cães e gatos | 13035 | 3381 | 3537 | Sem alerta de extensão |

## Fontes consultadas para as correções clínicas

- Nelson RW, Couto CG. Small Animal Internal Medicine. 6ª ed. Cardiomiopatia restritiva: páginas impressas 168–169; CID: 1400–1401. Consulta direta ao PDF em C:/LIVROS.
- [Consenso ACVIM de cardiomiopatias felinas, 2020](https://onlinelibrary.wiley.com/doi/10.1111/jvim.15745).
- [AAHA: diagnóstico e monitoramento do hipercortisolismo canino, 2023](https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/diagnostic-testing-and-monitoring-2/).
