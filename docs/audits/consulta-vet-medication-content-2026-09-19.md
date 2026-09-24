# Revisão do conteúdo de medicamentos — 19/09/2026

## Escopo entregue

Catálogo público atual: 18 fichas. Correção da interface que usava fundamentos e pilares da dipirona como conteúdo padrão para outros medicamentos. Foram adicionadas 54 explicações próprias (três por ficha), com referências de monografia e páginas impressas. Os componentes não inferem mecanismo a partir de palavras como “analgésico” ou “anticonvulsivante”.

A revisão é aplicada ao seed e após mesclagem de registros do Supabase. Não houve escrita no banco, deploy nem alteração do catálogo de Comerciais. Alterações locais anteriores em levetiracetam, catálogo público e outros arquivos foram preservadas.

## Fontes consultadas

PDFs fornecidos em C:/Users/luzau/OneDrive/Documentos/Livros. Sínteses redigidas em português, sem reprodução integral das monografias. Plumb’s foi consultado por extração local já existente com marcadores de página; BSAVA foi extraído do PDF fornecido. Páginas abaixo são impressas. Para Pronefra, a fonte específica é a página oficial do fabricante; não foi inventada uma monografia de livro para a mistura comercial.

| Ficha | Plumb’s 10 | BSAVA 10 / outra fonte |
|---|---|---|
| acetilcisteina | Acetylcysteine, p. 12–15 | Acetylcysteine, p. 3–4 |
| amoxicilina-clavulanato | Amoxicillin/Clavulanate, p. 70–73 | Co-amoxiclav, p. 98–99 |
| ampicilina-sulbactam | Ampicillin/Sulbactam, p. 82–84 | Sem atribuição a monografia BSAVA nesta revisão |
| buprenorfina | Buprenorphine, p. 150–154 | Buprenorphine, p. 53–54 |
| capromorelina | Capromorelin, p. 182–184 | Sem atribuição a monografia BSAVA nesta revisão |
| clindamicina | Clindamycin, p. 282–286 | Clindamycin, p. 91–92 |
| dipirona | Dipyrone, p. 413–415 | Sem atribuição a monografia BSAVA nesta revisão |
| enrofloxacina | Enrofloxacin, p. 450–454 | Enrofloxacin, p. 147–148 |
| fenobarbital | Phenobarbital, p. 1006–1011 | Phenobarbital, p. 314–317 |
| hidroxido-de-aluminio | Aluminum Hydroxide, p. 44–45 | Aluminium antacids, p. 13–14 |
| levetiracetam | Levetiracetam, p. 746–748 | Levetiracetam, p. 227–228 |
| meloxicam | Meloxicam, p. 825–828 | Meloxicam, p. 250–252 |
| metadona | Methadone, p. 842–846 | Methadone, p. 254–255 |
| pradofloxacina | Pradofloxacin, p. 1048–1050 | Pradofloxacin, p. 335–336 |
| prednisolona | PrednisoLONE/Prednisone/PrednisoLONE Sodium Succinate, p. 1058–1063 | Prednisolone, p. 339–341 |
| pronefra | — | Virbac Brasil: informação de produto |
| sulfametoxazol-trimetoprima | Sulfa-/Trimethoprim, p. 1193–1196 | Trimethoprim/Sulphonamide, p. 418–419 |
| tramadol | Tramadol, p. 1261–1263 | Tramadol, p. 410–411 |

## Problemas bibliográficos confirmados

19 links PubMed apontavam para assuntos alheios. 14 referências receberam metadados e links correspondentes à publicação identificada. Cinco referências não foram confirmadas como citadas e foram retiradas, junto com os vínculos e comentários dependentes. Um vínculo interno adicional do fenobarbital apontava para referência inexistente e foi removido. Conferência de título/PMID não é auditoria dos resultados numéricos do artigo.

| Ficha | Identificador interno | PMID anterior incorreto | Publicação corrigida |
|---|---|---|---|
| fenobarbital | ref-ivetf-guidelines-2015 | 26316174 | https://pubmed.ncbi.nlm.nih.gov/26316233/ |
| fenobarbital | ref-charalambous-meta-2014 | 24708785 | https://pubmed.ncbi.nlm.nih.gov/25338624/ |
| fenobarbital | ref-boothe-comp-2012 | 22452494 | https://pubmed.ncbi.nlm.nih.gov/22515627/ |
| fenobarbital | ref-thomas-epilepsy-2010 | 20207238 | https://pubmed.ncbi.nlm.nih.gov/19942062/ |
| fenobarbital | ref-podell-status-2016 | 26704770 | https://pubmed.ncbi.nlm.nih.gov/26899355/ |
| dipirona | ref-giorgi-2017 | 28164319 | https://pubmed.ncbi.nlm.nih.gov/29352476/ |
| dipirona | ref-giorgi-2018 | 29082787 | https://pubmed.ncbi.nlm.nih.gov/29164623/ |
| dipirona | ref-teixeira-2013 | 23714249 | https://pubmed.ncbi.nlm.nih.gov/26026350/ |
| dipirona | ref-imagawa-2011 | 21627732 | https://pubmed.ncbi.nlm.nih.gov/21627755/ |
| tramadol | ref-budsberg-2018-oa-dog | 29393736 | https://pubmed.ncbi.nlm.nih.gov/29393744/ |
| tramadol | ref-monteiro-2017-feline-oa | 28403212 | https://pubmed.ncbi.nlm.nih.gov/28403198/ |
| tramadol | ref-pypendop-ilkiw-2008-cat-pk | 18179574 | https://pubmed.ncbi.nlm.nih.gov/18177319/ |
| tramadol | ref-seddighi-2009-mac-tramadol | 19538466 | https://pubmed.ncbi.nlm.nih.gov/19538570/ |
| tramadol | ref-aaha-pain-guidelines | 35226750 | https://pubmed.ncbi.nlm.nih.gov/35195712/ |

Retiradas: ref-ferreira-2019, ref-steagall-2020, ref-giorgi-repeated-2018 (dipirona); ref-bailey-feline-2009, ref-gizzi-tdm-2020 (fenobarbital). Vínculo sem referência: ref-bsava-neurology-2018.

## Correções clínicas específicas

- Dipirona: retiradas extrapolações de doses orais, febre e cólica atribuídas genericamente aos livros. Permanecem regimes IV de analgesia perioperatória: cão 25 mg/kg no período perioperatório; gato 12,5 mg/kg q12h OU 25 mg/kg q24h, conforme Plumb’s p. 415. As alternativas felinas não são cumulativas. Mantida calculadora desabilitada. Removidos exemplo de receita e tabela de peso derivados dos regimes antigos.
- Dipirona: farmacocinética, interações, ressalvas e mecanismos revistos para não extrapolar achados humanos/equinos, prometer ausência de toxicidade ou atribuir doses da associação com butilescopolamina à molécula isolada.
- Fenobarbital: corrigida afirmação de que opioides agem no mesmo sítio GABA-A; removida orientação contraditória de interrupção abrupta domiciliar por reação cutânea e afirmação de ser o único anticonvulsivante seguro para gatos.
- Tramadol: retirada promessa de associação com dipirona sem toxicidade aditiva.
- Levetiracetam: resposta de uma amostra deixou de ser apresentada como garantia universal.
- Prednisolona: corrigida estrutura das particularidades por espécie para que o texto seja renderizado.
- Referências estruturadas: título/autores/ano agora aparecem mesmo sem campo citationText.

## Limites e trabalho ainda necessário

Esta entrega resolve a contaminação produzida pela interface e substitui os fundamentos clínicos por sínteses conferidas. **Não é uma revisão integral de todas as doses, durações, diluições, ajustes, contraindicações, classificações de evidência e números dos textos antigos das 18 fichas.** Há conteúdo legado extenso que exige conferência individual. Os resumos antigos ligados a referências corrigidas não foram revalidados apenas pela troca de URL. Arquivos de catálogo arquivado também não foram reativados ou revisados.

O aprofundamento solicitado para todas as seções permanece maior que o escopo clínico efetivamente validado nesta entrega. Nelson & Couto e Ettinger não foram utilizados para novas atribuições específicas nesta etapa.

## Verificação

- Testes de renderização de todas as 18 fichas, campos ausentes, fontes resolvíveis, referências alheias, dados remotos, idempotência e regimes específicos de dipirona.
- Build Vite de produção aprovado, com avisos de tamanho de chunks e importação dinâmica/estática já existentes.
- Typecheck geral: permanecem dois erros preexistentes em diseases.discinesia-paroxistica-caes-gatos.seed.ts (linhas 123 e 155, campo steps). Não restaram erros reportados nos arquivos de medicamentos.
- A limpeza dos arquivos temporários gerados foi rejeitada pela revisão automática de segurança. Permanecem em tmp/medication-review e nos scripts temporários listados pelo git; não devem integrar a publicação ou o commit. Os livros originais não foram alterados.
