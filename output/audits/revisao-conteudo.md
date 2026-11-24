# Auditoria editorial — 15/11/2026

Escopo: catálogo local público (45 medicamentos e 82 doenças) e 35 medicamentos adicionais do catálogo interno usado pelo Receituário. Não inclui conteúdo remoto exclusivo do Supabase. Análise de estrutura e extensão; não equivale a validação clínica ou bibliográfica.

## Correções de linguagem

Removidas autorreferências clínicas e justificativas de implementação/licenciamento no corpo dos textos de cinomose, consensos e medicamentos. Artigos e links externos preservados. Metadados de procedência, créditos autorais e comentários de código não são recomendações clínicas e foram preservados quando necessários.

## Prioridade alta: expandir registros internos

Estes registros são muito mais curtos que as monografias públicas e vários campos de segurança têm menos de 25 palavras. Isso sinaliza necessidade de revisão manual, não ausência automática de toda informação. Não promover ao catálogo público como monografias completas sem revisão.

| Ficha | Palavras aproximadas | Referências |
|---|---:|---:|
| Propranolol | 197 | 4 |
| Esmolol | 219 | 4 |
| Sotalol | 261 | 4 |
| Atenolol | 286 | 4 |
| Brometo de ipratrópio | 317 | 2 |
| Bezafibrato (fibrato) | 322 | 3 |
| Pimobendan | 325 | 4 |
| Ácido ursodesoxicólico (UDCA) | 325 | 3 |
| N-acetilcisteína (NAC) | 333 | 2 |
| Praziquantel | 370 | 4 |
| Tiopental sódico | 398 | 2 |
| Digoxina | 418 | 4 |
| Ciprofloxacina | 425 | 5 |
| Atropina | 434 | 5 |
| Diltiazem | 497 | 7 |

Priorizar propranolol, esmolol, sotalol, atenolol e digoxina: revisar profundidade de contraindicações, interações, monitorização e diferenças entre espécies. Em seguida, pimobendan, ipratrópio, tiopental e atropina. Verificar aliases antes de criar novas fichas: n-acetilcisteina pode duplicar acetilcisteina; benzafibrato deve ser confrontado com bezafibrato.

## Doenças: candidatas a aprofundamento

| Ficha | Palavras aproximadas | Referências |
|---|---:|---:|
| Doença do Disco Intervertebral — Gatos | 2092 | 10 |
| Síndrome Cutânea Atópica Felina | 2108 | 20 |
| Dermatite Atópica Canina | 2349 | 16 |
| Hipotireoidismo adquirido (cão e gato) | 2560 | 22 |
| Doença do Disco Intervertebral — Cães | 2561 | 15 |
| Doença Periodontal Felina | 2666 | 15 |
| Complexo do granuloma eosinofílico felino | 2701 | 5 |
| Tumores mamários em cães e gatos | 2742 | 10 |
| Erliquiose monocítica canina (Ehrlichia canis) | 2745 | 6 |
| Síndrome de Cushing — Cão | 2779 | 15 |
| Leucemia viral felina (FeLV) | 2896 | 8 |
| Cardiomiopatia dilatada (CMD) | 2962 | 8 |
| Cardiomiopatia hipertrófica (CMH) | 2972 | 7 |
| Diabetes Mellitus Felino | 2974 | 15 |
| Hipertensão arterial sistêmica (HAS) | 2990 | 5 |

DDIV felina: diagnóstico e diferenciais estão presentes, porém compactos; revisar profundidade de seguimento, reabilitação e prognóstico. Atopias felina e canina: avaliar organização longitudinal e manejo de falha terapêutica. Hipotireoidismo adquirido e doença periodontal felina: conferir cobertura por espécie e acompanhamento. Não se recomenda reescrita automática apenas por serem mais curtas.

## Medicamentos públicos

| Ficha | Palavras aproximadas | Referências |
|---|---:|---:|
| Sucralfato (Sacarose Octassulfatada de Alumínio) | 5185 | 16 |
| Capromorelina (Elura™ / Entyce™) | 6094 | 12 |
| Ciproeptadina | 6225 | 16 |
| Metimazol | 6796 | 11 |
| Clorambucil (Clorambucila) | 6947 | 20 |
| Dexametasona | 7081 | 11 |
| Alopurinol | 7109 | 20 |
| Pronefra® | 7305 | 12 |
| Ciclosporina (Ciclosporina A / CsA) | 7412 | 22 |
| Amoxicilina + Clavulanato de Potássio | 7470 | 17 |

Mesmo as menores fichas públicas são extensas. Não há evidência, por extensão isolada, de necessidade de refazer sucralfato, capromorelina ou ciproeptadina. Campos de interações simples e detalhadas devem ser avaliados em conjunto; um campo opcional vazio não representa necessariamente lacuna.

## Método e limites

Contagem aproximada de palavras dos valores textuais, excluindo referências e figuras; inclui repetições entre resumo e monografia e não mede qualidade. Conteúdos menores foram inspecionados como candidatos, sem validar doses ou atualizar recomendações. A próxima revisão clínica deve consultar C:\LIVROS e fontes primárias atuais. Dados e texto integral da auditoria estão em content-audit.json; script reproduzível em audit.ts.
