import fs from 'node:fs';
import {MEDICATION_BOOK_FOUNDATIONS} from '../modules/consulta-vet/data/medicationBookFoundations';
const rows=Object.entries(MEDICATION_BOOK_FOUNDATIONS).map(([slug,v])=>`| ${slug} | ${v.plumbs?`${v.plumbs.monograph}, p. ${v.plumbs.pages}`:'—'} | ${v.bsava?`${v.bsava.monograph}, p. ${v.bsava.pages}`:v.productSource?'Virbac Brasil: informação de produto':'Sem atribuição a monografia BSAVA nesta revisão'} |`);
const fixes=JSON.parse(fs.readFileSync('tmp/medication-review/verified-reference-corrections.json','utf8'));
const old=JSON.parse(fs.readFileSync('tmp/medication-review/pubmed-audit.json','utf8')).refs;
const refs=Object.entries(fixes).flatMap(([slug,map]:any)=>Object.entries(map).map(([id,r]:any)=>`| ${slug} | ${id} | ${old.find((o:any)=>o.slug===slug&&o.id===id)?.pmid} | ${r.url} |`));
const body=`# Revisão do conteúdo de medicamentos — 19/09/2026

## Escopo entregue

Catálogo público atual: 18 fichas. Correção da interface que usava fundamentos e pilares da dipirona como conteúdo padrão para outros medicamentos. Foram adicionadas 54 explicações próprias (três por ficha), com referências de monografia e páginas impressas. Os componentes não inferem mecanismo a partir de palavras como “analgésico” ou “anticonvulsivante”.

A revisão é aplicada ao seed e após mesclagem de registros do Supabase. Não houve escrita no banco, deploy nem alteração do catálogo de Comerciais. Alterações locais anteriores em levetiracetam, catálogo público e outros arquivos foram preservadas.

## Fontes consultadas

PDFs fornecidos em C:/Users/luzau/OneDrive/Documentos/Livros. Sínteses redigidas em português, sem reprodução integral das monografias. Plumb’s foi consultado por extração local já existente com marcadores de página; BSAVA foi extraído do PDF fornecido. Páginas abaixo são impressas. Para Pronefra, a fonte específica é a página oficial do fabricante; não foi inventada uma monografia de livro para a mistura comercial.

| Ficha | Plumb’s 10 | BSAVA 10 / outra fonte |
|---|---|---|
${rows.join('\n')}

## Problemas bibliográficos confirmados

19 links PubMed apontavam para assuntos alheios. 14 referências receberam metadados e links correspondentes à publicação identificada. Cinco referências não foram confirmadas como citadas e foram retiradas, junto com os vínculos e comentários dependentes. Um vínculo interno adicional do fenobarbital apontava para referência inexistente e foi removido. Conferência de título/PMID não é auditoria dos resultados numéricos do artigo.

| Ficha | Identificador interno | PMID anterior incorreto | Publicação corrigida |
|---|---|---|---|
${refs.join('\n')}

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
- Typecheck geral: registrar resultado final abaixo; erros fora da área modificada não são validação clínica.
`;
fs.mkdirSync('docs/audits',{recursive:true});fs.writeFileSync('docs/audits/consulta-vet-medication-content-2026-09-19.md',body);
