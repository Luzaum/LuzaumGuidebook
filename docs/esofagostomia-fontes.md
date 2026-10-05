# Sonda esofágica (Esofagostomia Cervical) — Rastreabilidade Editorial e Fontes

Atualização completa e aprofundamento: 04/10/2026.
Guia integrado em `modules/consulta-vet/data/seed/clinicalQuickGuides.esofagostomia.seed.ts`.

---

## 1. Organização e Layout Clínico (Fluxo Vertical Contínuo)

- **Layout:** Fluxo 100% contínuo e vertical em página única (`readingTabs: undefined`), sem paginação interna ou abas que fragmentem a consulta.
- **Navegação:** Menu de índice expansível (*Table of Contents* — `showTableOfContents: true`) com âncoras diretas para os 30 capítulos e subtítulos do procedimento.
- **Distribuição de Vídeos:** O cabeçalho foi desvinculado de vídeo fixo (`youtubeVideoId: null`), evitando que um reprodutor permaneça travado no topo da tela. Os dois vídeos oficiais do ISFM foram alocados contextualmente no corpo vertical do texto:
  1. *Vídeo de Colocação Cirúrgica* (`MiNvX2pF6to`): posicionado logo após o passo a passo operatório da técnica com Carmalt e o infográfico de 6 etapas;
  2. *Vídeo de Cuidados e Alimentação* (`UsLcTZ8u8Gk`): posicionado logo após o protocolo de administração alimentar e o fluxograma de segurança de 9 passos.

---

## 2. Obras e Tratados Cirúrgicos Consultados

| Obra | Localização / Capítulo | Aplicação no Guia |
|---|---|---|
| **Bexfield N, Riggs J, eds. BSAVA Guide to Procedures in Small Animal Practice. 3ª ed., 2024** | *Oesophagostomy tube placement*, pp. 223–226 | Princípios de indicação, contraindicações, instrumental, técnica de *cut-down* com divulsão romba, manobra do flip, confirmação radiográfica no terço distal esofágico, Chinese finger trap, alimentação gradual e critérios de retirada. |
| **Hackett TB, Mazzaferro EM. Veterinary Emergency and Critical Care Procedures. 3ª ed. Wiley; 2025** | Cap. 5: *Nutritional Support and Orogastric Lavage — Esophagostomy Tubes*, pp. 157–166 | Relação cirúrgica com a veia jugular externa (acesso estritamente dorsal), técnica com Carmalt curva longa (≥ 20 cm), captura da sonda sem tecidos adjacentes, técnica com introdutor/tunelizador dedicado (ETUN). |
| **Drobatz KJ, Reineke E, Costello MF, Culp WTN, eds. Feline Emergency and Critical Care Medicine. 2ª ed. Wiley; 2023** | Cap. 9: *Nutritional Support for the Critically Ill Feline Patient* (Chan DL), pp. 83–89 | Avaliação e estabilização pré-operatória, histologia muscular (músculo liso no 1/3 distal felino vs estriado canino), calibres 12–14 Fr, fisiopatologia da Síndrome de Realimentação e desuso da faringostomia. |

---

## 3. Consensos Internacionais, Diretrizes e Artigos com Dados Epidemiológicos

1. **Taylor S, Chan DL, Villaverde C, et al. 2022 ISFM Consensus Guidelines on Management of the Inappetent Hospitalised Cat.** *J Feline Med Surg*, 24:614–640, 2022. DOI: [10.1177/1098612X221106353](https://doi.org/10.1177/1098612X221106353). [Open Access PMC11107985](https://pmc.ncbi.nlm.nih.gov/articles/PMC11107985/).
   - Protocolo especial para Síndrome de Realimentação em felinos de alto risco (≤ 20% RER no Dia 1, progressão em 4–10 dias);
   - Critério de retirada (75–100% RER por 3–5 dias);
   - Vídeos demonstrativos oficiais de colocação e cuidados.
2. **AAHA. 2021 AAHA Nutrition and Weight Management Guidelines for Dogs and Cats: Feeding Plans for Hospitalized Patients.** [AAHA Guidelines](https://www.aaha.org/resources/2021-aaha-nutrition-and-weight-management-guidelines/feeding-plans-for-hospitalized-patients/).
   - Limiar de intervenção enteral assistida: consumo ≤ 1/3 do RER por cerca de 72 horas (contabilizando dias pré-hospitalização); contraindicação da alimentação forçada por seringa.
3. **WSAVA Global Nutrition Committee. Feeding Guide for Hospitalized Dogs and Cats.** [WSAVA PDF](https://wsava.org/wp-content/uploads/2020/08/Feeding-Guide-for-Hospitalized-Dogs-and-Cats.pdf).
   - Indicação obrigatória após 5 dias de hiporexia/anorexia (e a partir de 3–4 dias em anestesias eletivas concomitantes).
4. **Nathanson O, et al. Esophagostomy tube complications in dogs and cats: retrospective review of 225 cases.** *J Vet Intern Med*, 33:2014–2019, 2019. DOI: [10.1111/jvim.15563](https://doi.org/10.1111/jvim.15563). [Open Access PMC6766496](https://pmc.ncbi.nlm.nih.gov/articles/PMC6766496/).
   - Incidência geral de complicações (44,4%), infecção de estoma (17,8% em gatos, 13,7% em cães), taxa de eutanásia por complicação (1,3%).
5. **Breheny CR, et al. Esophageal feeding tube placement and the associated complications in 248 cats.** *J Vet Intern Med*, 33:1306–1314, 2019. DOI: [10.1111/jvim.15496](https://doi.org/10.1111/jvim.15496). [Open Access PMC6524112](https://pmc.ncbi.nlm.nih.gov/articles/PMC6524112/).
   - Complicações em 35,8% dos gatos; deslocamento (14,5%) e infecção (12,1%); uso de imunossupressores/corticoides com Odds Ratio (OR) de 3,91 para infecção de estoma.
6. **Vila Cabaleiro A, et al. Introduction and Validation of Radiographic Guidelines for Identification of Nasoesophageal and Nasogastric Tube Position in Dogs and Cats.** *Vet Radiol Ultrasound*, 67:e70138, 2026. DOI: [10.1111/vru.70138](https://doi.org/10.1111/vru.70138). [PubMed](https://pubmed.ncbi.nlm.nih.gov/41540970/).
   - Checklist radiográfico de 3 pontos do Royal Veterinary College (RVC); infográfico em PDF e módulo interativo de treinamento.
7. **Tolbert MK, Self A, Secoura P. Minimizing Small Animal Esophageal Feeding Tube Complications.** *Today's Veterinary Practice*, Jul/Ago 2025. [Acesso Online](https://todaysveterinarypractice.com/nutrition/minimizing-small-animal-esophageal-feeding-tube-complications/).
   - Abordagem contemporânea de complicações, seringa de 60 mL para desobstrução, e recomendação contra antimicrobianos profiláticos empíricos de rotina.
8. **Formaggini L. Normograde, minimally invasive technique for oesophagostomy in cats.** *J Feline Med Surg*, 11:481–486, 2009. DOI: [10.1016/j.jfms.2008.11.004](https://doi.org/10.1016/j.jfms.2008.11.004). [PMC10832833](https://pmc.ncbi.nlm.nih.gov/articles/PMC10832833/).
   - Descrição da técnica normógrada percutânea em 19 gatos.

---

## 4. Dispositivos Comerciais Catalogados

- **Tradevet Biomateriais (Brasil):** Sonda Esofágica em Silicone – Uso Veterinário (12 a 20 Fr, 45 a 60 cm, linha radiopaca, conector Luer Lock, ponta aberta atraumática). [Tradevet Biomateriais](https://www.tradevetbiomateriais.com.br/sondas/sonda-esofagica-com-conector-luer-uso-veterinario).
- **MILA International (Internacional):** Sondas em poliuretano com ponta cônica, porta Y e tunelizadores ETUN14/18. [MILA International](https://eu.milainternational.com/products/length-adjustable-polyurethane-esophagostomy-feeding-tubes).
- **Biobase Brasil & Fresenius Kabi:** Sondas de nutrição enteral em poliuretano (Freka CH/Fr 10–15).
- **Dispositivos desaconselhados:** Sonda de Levine em PVC (enrijece em 7–10 dias, 125 cm de comprimento inadequado) e sondas uretrais (látex citotóxico ou PVC rígido).

---

## 5. Recursos Multimídia e Visuais Integrados

1. **Vídeos Oficiais do YouTube (Incorporados Contextualmente):**
   - *Capítulo 13:* Técnica de colocação cirúrgica no gato (ISFM): `MiNvX2pF6to`
   - *Capítulo 19:* Cuidados, curativo e alimentação da sonda (ISFM): `UsLcTZ8u8Gk`
2. **Esquemas Vetoriais Originais (SVGs em `/public/consulta-vet/clinical-guides/esofagostomia/`):**
   - `anatomia.svg`: Relações anatômicas cervicais, esôfago médio e posicionamento dorsal à veia jugular externa.
   - `sequencia-tecnica.svg`: Infográfico em 6 etapas da colocação com Carmalt.
   - `flip.svg`: Dinâmica geométrica tridimensional da manobra do flip em 3 tempos.
   - `posicao.svg`: Confirmação radiográfica no terço distal vs 3 trajetos anormais de alarme.
   - `checklist.svg`: Fluxograma de segurança de 9 passos antes de cada alimentação.
   - `estoma.svg`: Comparativo clínico entre estoma saudável, irritação serosa, celulite bacteriana e abscesso/necrose isquêmica.
3. **Materiais exibidos no app (atualização de 04/10/2026):**
   - `wsava-feeding-guide.pdf`: documento original da [WSAVA](https://wsava.org/wp-content/uploads/2020/08/Feeding-Guide-for-Hospitalized-Dogs-and-Cats.pdf), preservado integralmente no acervo de assets. As recomendações estão explicadas em português no guia; o documento em inglês foi retirado do fluxo principal de leitura.
   - A conferência radiográfica interativa foi removida a pedido do usuário. O texto distingue os critérios estudados para sondas nasais do alvo de uma sonda de esofagostomia.
   - Fotos originais dos fabricantes, importadas sem alteração, com legendas e atribuição no guia:
     - `sonda-tradevet.jpg`: Tradevet Biomateriais, sonda esofágica de silicone. Origem: https://www.tradevetbiomateriais.com.br/sondas/sonda-esofagica-com-conector-luer-uso-veterinario
     - `sonda-mila.jpg`: MILA International, sonda de esofagostomia em poliuretano. Origem: https://eu.milainternational.com/products/length-adjustable-polyurethane-esophagostomy-feeding-tubes
     - `sonda-biobase.webp`: Biobase, sonda enteral humana com guia e peso distal. Origem: https://biobase.ind.br/produtos/sondas/sonda-para-nutricao-enteral/
     - `sonda-freka.jpg`: Fresenius Kabi, sonda enteral transnasal Freka. Origem: https://www.fresenius-kabi.com/br/produtos/dispositivos-medicos/dispositivos-nutricao-enteral/freka-transnasais/sonda-freka
   - As referências permanecem escritas no conteúdo, sem links clicáveis. Os URLs desta nota são apenas para rastreabilidade das fontes.
4. **Radiografias originais incorporadas em 04/10/2026:** o usuário forneceu os PDFs após o endereço externo retornar HTTP 403. As imagens são exibidas diretamente no capítulo “Radiografias comentadas”, com ampliação e explicações em português; sem links externos ou conferência interativa.
   - `rvc-infografico-radiografico.png`: página única do infográfico RVC, renderizada a 2400 px, preservando seu conteúdo, setas e atribuição.
   - `rvc-cao-esofago.jpg`, `rvc-gato-esofago.png`, `rvc-cao-traqueia.png`, `rvc-gato-traqueia.png`, `rvc-gato-sem-laringe.jpg`: figuras 1–5 do artigo de Vila Cabaleiro et al. (2026), extraídas sem alteração dos pixels e das marcações, páginas 3–7. As figuras 1 e 2 incluem os painéis tomográficos anatômicos originais.
   - Fonte local do infográfico: `C:/Users/luzau/Downloads/260105 RVC Infographic - Radiographic guidelines on feeding tube placment.pdf`.
   - Fonte local das figuras: `C:/Users/luzau/Downloads/Vet Radiology Ultrasound - 2026 - Vila Cabaleiro - Introduction and Validation of Radiographic Guidelines for.pdf`.
   - A segunda cópia do artigo, com sufixo `(1)`, contém as mesmas cinco figuras; não foram duplicadas no guia.
   - As legendas distinguem sondas nasais de sondas de esofagostomia. A passagem laríngea das figuras não é apresentada como critério validado para uma E-tube.
5. **Endereços das fontes, somente para rastreabilidade:**
   - [Infográfico Radiográfico RVC (PDF)](https://www.rvc.ac.uk/Media/Default/VetCompass/260105%20RVC%20Infographic%20-%20Radiographic%20guidelines%20on%20feeding%20tube%20placment.pdf)
   - [Módulo Interativo de Treinamento RVC](https://www.rvc.ac.uk/Media/Default/VetCompass/Tube%20check%20training%20module/tube-check-training.html)
