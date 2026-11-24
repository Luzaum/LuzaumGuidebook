# Auditoria clínica — Conversor de corticóide

Data: 23/11/2026. Escopo: comparação anti-inflamatória teórica de corticosteroides sistêmicos em cães/gatos. Não determina indicação, intervalo, via, imunossupressão, pulsoterapia, desmame ou reposição mineralocorticoide.

## Fontes locais consultadas
- C:/LIVROS/Plumb's Veterinary Drug Handbook, 10th edition.pdf: PDF 1518, impressa 1491 (Glucocorticoid Comparison Table); PDF 392, impressa 365 (dexametasona); PDF 1297, impressa 1270 (triancinolona).
- C:/LIVROS/BSAVA Small Animal Formulary, Part A, Canine and Feline, 10th Edition (VetBooks.ir).pdf: PDF 130/impressa 114 (dexametasona); PDF 212/impressa 196 (hidrocortisona); PDF 355/impressa 339 (prednisolona).

## Decisão sobre os fatores
A única fonte numérica é a coluna de DOSE EQUIVALENTE da tabela do Plumb, não a coluna de potência relativa: hidrocortisona 20; prednisolona 5; prednisona 5; metilprednisolona 4; triancinolona 4; dexametasona 0,75; betametasona 0,6; flumetasona 1,5 mg. A coluna de duração foi mantida separada. Prednisona não possui duração numérica estabelecida nesta tabela, por isso é descrita qualitativamente após ativação.

BSAVA confirma 1 mg prednisolona ≈ 0,15 mg dexametasona e 4 mg hidrocortisona ≈ 1 mg prednisolona. A potência relativa de 7,5 citada na mesma monografia não produz exatamente a relação de doses de 0,15; não misturamos os métodos. O mesmo vale para betametasona.

Há divergência muito expressiva de flumetasona entre Plumb e MSD. Mantida a dose explícita de 1,5 mg da tabela adotada, com alerta permanente quando selecionada e na metodologia. Isoflupredona não possui dose equivalente na tabela e fica bloqueada. Cortisona e deflazacorte não foram extrapoladas de tabelas humanas. Budesonida, inalatórios/tópicos, fludrocortisona e DOCP não recebem equivalência numérica. Acetonida, acetatos de depósito e apresentações locais devem ser selecionados no tipo de apresentação que bloqueia o cálculo.

## Fontes externas
- https://pmc.ncbi.nlm.nih.gov/articles/PMC6524099/ — Swann et al., ACVIM, 2019, doi:10.1111/jvim.15463. Individualização, monitorização e desmame dependem da doença e resposta; não é tabela universal.
- https://www.merckvetmanual.com/multimedia/table/relative-potencies-of-commonly-used-corticosteroids — comparação das divergências, não fonte de fatores do cálculo.

## Arte
Gerada com a ferramenta integrada image_gen. Arquivo: public/apps/conversor-corticoide.png.
Prompt: Use case: stylized-concept. Create a polished elegant medical mini-app illustration, square composition. A white scored prednisolone pill on the left is conceptually transforming through a smooth curved stream of orange liquid into the barrel of a clean transparent syringe on the right, representing dexamethasone. Clearly a surreal symbolic conversion, not a preparation instruction. Premium 3D studio rendering, soft ivory background, subtle teal accents, warm amber liquid, precise glass details, gentle shadows, centered objects with generous margins so it works as a small app card thumbnail. No text, no logos, no hands, no animals, no watermark.

A legenda deixa explícito que a cor é artística e não orienta preparo de injetáveis.
## Atualização visual — 24/11/2026

Correção da largura como filho flex, grids com minmax(0, 1fr), adaptação à largura do contêiner, controles de toque e fontes de campos de 16 px. Animação vetorial interativa com fluxo de líquido, dissolução do comprimido, preenchimento e deslocamento do êmbolo. Pausa, reinício, cancelamento ao mudar entradas e modo estático quando o sistema pede redução de movimento. Nenhuma alteração de fatores ou recomendações clínicas.

Imagem atual: public/apps/conversor-corticoide-navy.png, editada pela ferramenta integrada image_gen. Prompt: Edit image 1 (pill converting to orange liquid in syringe). Preserve the composition and realistic white scored tablet, amber orange liquid stream and transparent syringe with teal details. Replace the entire ivory/beige background and ground with the exact deep midnight navy blue background of reference image 2 (APPLE Score icon), approximately #020923, including all corners. Maintain premium 3D rendering with subtle rim lights and dark soft contact shadows, high contrast and legibility as a small mini-app icon. Do not add the apple or creature from reference image 2; it is strictly a background color reference. No text, no logo, no watermark. Square image.

Validação visual: Chromium em 320×740, 390×844, 667×375 (paisagem), 768×1024, 1024×768, 1440×1000 e 1920×1080. Sem overflow horizontal; largura do app igual à área disponível. Testados reprodução, pausa, continuidade, conclusão, reinício, alteração de dose, bloqueio de fármaco sem equivalência, tema escuro e prefers-reduced-motion. Firefox local falhou ao iniciar (exit 255), portanto não há validação deste navegador nem de dispositivos físicos iOS/Android nesta sessão. Capturas em output/playwright/corticoide-v2-*.png.
