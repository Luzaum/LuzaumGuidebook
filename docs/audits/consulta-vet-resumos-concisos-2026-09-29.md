> Revisão substituída em 30/09/2026 a pedido do usuário. A reorganização e a remoção das seções foram desfeitas. Consulte `consulta-vet-resumos-progressivos-2026-09-30.md` para o comportamento vigente.

# Resumos clínicos concisos — 29/09/2026

Foram redigidas 95 sínteses próprias para o catálogo público: 68 doenças e 27 medicamentos. Cada uma contém uma definição e três pontos clínicos, com 37–55 palavras (médias: 46 para doenças e 48 para medicamentos). A fonte fica disponível em uma expansão própria.

## Aplicação

- `data/conciseClinicalSummaries.ts` contém os textos e os localizadores bibliográficos, por slug.
- Os painéis consultam essa camada também quando recebem registros remotos. O resumo curto não depende de truncamento, reticências ou limitação visual de linhas.
- Doenças: “Decisão rápida” foi removida da ficha, da navegação e do editor. Notas, lead, pilares e explicações leigas são redistribuídos por tema nos capítulos clínicos, com deduplicação exata. Fluxos aparecem em diagnóstico e tratamento; tabelas comparativas ficam no diagnóstico.
- Medicamentos: o painel contém apenas a síntese. Explicações e pilares ficam em ação farmacológica; indicações e esquemas na aba Informações; cuidados e avisos na aba Atenção. Doses, vias e durações são preservadas integralmente.
- Cartões usam a nova definição curta. Fichas desconhecidas não exibem textos superiores a 110 palavras no resumo; explicações extensas permanecem no conteúdo clínico. Novas fichas devem receber uma síntese editorial com fonte.
- Não houve migração em lote do banco nem publicação em produção. A apresentação reorganiza registros locais e remotos. O editor e a importação preservam a reorganização nos próximos salvamentos, inclusive todas as notas legadas (sem corte após a quinta), complicações e fluxos.

## Livros consultados

Acervo: `C:\Users\luzau\OneDrive\Documentos\Livros`.

- **Plumb's Veterinary Drug Handbook, 10th edition.pdf**: monografias dos princípios ativos.
- **Ettinger’s Textbook of Veterinary Internal Medicine, 9ed 2024.pdf**: capítulos de medicina interna, hematologia, infectologia, cardiologia, neurologia, endocrinologia, nefrologia, oncologia e cuidados intensivos.
- **BSAVA Manual of Canine and Feline Dermatology, 4th Edition (VetBooks.ir).pdf**: atopia e padrões de reação cutânea felina. Páginas digitalizadas conferidas visualmente.
- **BSAVA Manual of Canine and Feline Reproduction and Neonatology, 2nd Edition.pdf**: mastite.
- **BSAVA Manual of Canine and Feline Nephrology and Urology, Third Edition.pdf**: cistite enfisematosa.
- **Greenes Infectious Diseases of the Dog and Cat 5ed 2023.pdf**: giardíase, coccidiose e platinosomose.
- **Practical Guide to Canine and Feline Neurology, 3rd Edition (VetBooks.ir).pdf**: movimentos involuntários e distúrbios paroxísticos.

Os localizadores exibidos são páginas do **arquivo PDF**, que podem diferir da numeração impressa. Os textos são paráfrases editoriais, não transcrições. A referência de Pronefra sustenta o manejo do fósforo na doença renal; o resumo explicita que isso não comprova a eficácia específica da marca. Não foram inseridas doses nas novas sínteses.

## Validação

- `npm run typecheck`: passou.
- `npm run build`: passou, com aviso de chunks grandes.
- Suíte focada: 14 testes passaram (`concise-summaries`, `disease-reading-sections`, `disease-merge`), abrangendo os 95 slugs, extensão, fontes, preservação de conteúdo, organização temática, idempotência e preparação para persistência.
- Na validação inicial, execução conjunta com `medication-content-isolation.test.tsx`: 11 de 13 testes passaram. As duas falhas são em campos não alterados nesta revisão: ausência de `MEDICATION_BOOK_FOUNDATIONS.amantadina` e de `attentionData.precautions` em ciclosporina.
- Conferência visual dos componentes reais, com dados do catálogo e CSS do aplicativo, em 1440×1000 e 390×844. A rota completa redirecionou para login na sessão de teste, por isso a validação visual usou uma página local de componentes.
- Validação no navegador da conversão para o esquema de salvamento e leitura de volta das 68 doenças: todas as notas legadas preservadas, sem gravar no banco.
- Capturas: `output/playwright/concise-summaries-desktop.png` e `output/playwright/concise-summaries-mobile.png`.

Escopo: revisão dos resumos públicos; não representa uma nova auditoria integral de todas as doses, referências e textos das monografias.
