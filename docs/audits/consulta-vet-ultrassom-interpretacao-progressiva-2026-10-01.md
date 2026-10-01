# ConsultaVet — interpretação progressiva de ultrassom

Data: 2026-10-01.

## Escopo e organização

Revisão das 20 estruturas existentes no mini app. As medidas anteriores foram preservadas. A interface remove contagens de alterações e citações por linha; os nomes dos livros aparecem apenas em Referências. As imagens possuem créditos em uma seção final expansível, mantendo autoria, artigo e licença.

O achado apresenta uma definição breve, seguida de aparência observável, mecanismo de formação, diferenciais expansíveis e interpretação clínica. Os mecanismos dos diferenciais relacionam fisiopatologia, alteração estrutural e efeito acústico. Há descrição específica de speckle, interfaces, atenuação, resolução e ajustes para a ecotextura hepática grosseira. A busca também abrange as explicações e respeita as restrições de espécie.

Não foi convertida uma descrição de imagem em diagnóstico histológico, funcional ou hormonal. Não foram criados limites por peso, raça ou idade onde os livros não os fornecem. O catálogo é uma síntese dos padrões e causas das seções pertinentes, e não uma alegação de que todas as doenças possíveis estejam esgotadas.

## Acervo consultado

Inventário e extração dos sete títulos únicos da pasta Imaginologia; o segundo arquivo do BSAVA Ultrasonography é duplicado. Os textos extraídos estão em tmp/ultrasound-research, usados como material temporário de pesquisa.

- BSAVA Manual of Canine and Feline Ultrasonography: física, capítulos por órgão, padrões de lesão e diferenciais; referências de páginas preservadas internamente no catálogo inicial.
- Thrall’s Textbook of Veterinary Diagnostic Radiology: alterações abdominais, vasos, pancreas/adrenais, trato urinário, reprodução e intestino; trechos revistos em especial no PDF 992–1002, 1023–1039, 1049–1070, 1090–1095, 1123–1141, 1181–1193, 1205, 1237 e 1254–1255.
- Point-of-Care Ultrasound Techniques for the Small Animal Practitioner: padrões focais, halo da vesícula, coleções perirrenais, útero, disfunção cardíaca e alterações oculares. Diferenciais e interpretação foram complementados com os capítulos de órgãos.
- BSAVA Manual of Canine and Feline Thoracic Imaging: avaliação ecocardiográfica e influência de carga nos índices de função, incluindo PDF 63–69.
- BSAVA Manual of Canine and Feline Radiography and Radiology: papel complementar da radiografia simples e contrastada, sobretudo no trato urinário e gastrointestinal. Sinais radiográficos não foram apresentados como medidas ultrassonográficas.
- Atlas of Radiographic Interpretation in Small Animals: complementaridade entre técnicas na avaliação de tamanho, gás e anatomia vascular, sobretudo PDF 220–223.
- Veterinary Endoscopy for the Small Animal Practitioner: adequação/profundidade de biópsias, limites de alcance e relação entre camada alterada e escolha de amostragem; especialmente PDF 56–57 e capítulos de trato urinário.

As entradas adicionais mantêm os títulos de livros no dado de proveniência. A página fictícia de referência não é utilizada para entradas novas. A bibliografia visível omite edição, capítulo, página e autoria dos livros conforme pedido.

## Imagens

Manifesto em modules/consulta-vet/data/ultrasoundClinicalImages.ts. Arquivos locais em public/assets/consulta-vet/ultrasound-clinical. Imagens reproduzidas integralmente de artigos com CC BY 3.0 ou 4.0; nenhuma imagem de livro com direitos restritos foi copiada. Legendas em português identificam espécie, modalidade e painel.

A figura gastrointestinal é reutilizada para estômago, intestino delgado e cólon, com painéis correspondentes explicitamente identificados. A figura ovariana contém TC em A/B, ultrassom em C e peça anatômica em D. A figura de ureteres inclui radiografias A/B e ultrassom C–F. A foto renal é pós-operatória e contém nefrostomia, não é rotulada como rim normal. A imagem esplênica contém elastografia, distinguida de Doppler na legenda. As fotografias não mudam de espécie ao alternar o filtro; sua espécie real permanece indicada.

Todas as imagens foram inspecionadas visualmente; créditos adicionais de Andi Parkinson/Intrapet Imaging e CHV Fregis foram preservados. A primeira candidata de mucocele foi substituída por imagem de pesquisa primária, evitando reutilização de uma figura cedida por terceiro com permissão específica.

## Validação

- 17 testes de ultrassom: passaram. Incluem cobertura das estruturas, campos clínicos, busca, espécie, mecanismos expansíveis, ordem de leitura, ausência de citações/contagens no componente, arquivos e licenças de imagem, e preservação das medidas.
- Build de produção: passou.
- Typecheck global: os erros prévios fora do ultrassom estão registrados em tmp/ultrasound-research/typecheck-validation.log; não foram modificados arquivos de outros conteúdos para contorná-los.
- Preview local: work/ultrasound-preview.html usa a mesma página sem depender da sessão de autenticação; app na porta 5173.

Nenhum deploy, gravação remota ou reversão de alterações de outras tarefas foi realizado.
