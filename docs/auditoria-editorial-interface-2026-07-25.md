# Auditoria editorial da interface

Data: 25 de julho de 2026

## Escopo

A varredura cobriu os textos renderizados pelos módulos clínicos, páginas gerais, mensagens de erro, estados vazios, relatórios, fichas de doenças e medicamentos. Comentários de código, rotas, identificadores, valores de enumeração e URLs foram analisados, mas não alterados quando não chegavam à interface.

Também foi instalado um glossário contextual global. Ele identifica as siglas presentes na página aberta e mostra apenas os significados relevantes naquele conteúdo.

## Textos que tiveram alteração

| Área | Texto ou padrão anterior | Forma adotada |
| --- | --- | --- |
| Mensagens gerais | Erros com detalhes de banco, serviço, pilha ou implementação | Mensagens diretas de indisponibilidade, falha de carregamento ou tentativa novamente |
| Estados futuros | “em breve”, “por enquanto”, “em construção” e controles sem implementação | Controles indisponíveis removidos da interface; estados vazios descrevem apenas a situação atual |
| Linguagem interna | “interpretado internamente”, “idade derivada internamente”, “critérios internos” | Descrição clínica ou funcional direta, sem revelar processo de desenvolvimento |
| CRI Vet | Texto apresentando o próprio módulo e contato fictício | “Referências e segurança”, com escopo clínico e alertas objetivos |
| HemoGasoVet | `high`, `reliable`, `not_applicable`, `fraction`, `normal` e estados de domínio | “alta”, “confiável”, “não aplicável neste cenário”, “informada como fração”, “sem distúrbio dominante” e “adequado” |
| HemoGasoVet | “Correlacao”, “Confianca”, “termico”, “raciocinio”, “eletroliticos/metabolicos” | “Correlação”, “Confiança”, “térmico”, “raciocínio”, “eletrolíticos ou metabólicos” |
| HemoGasoVet | “1 achados...” | “1 achado eletrolítico ou metabólico...” |
| HemoGasoVet | Relação P/F acima de 300 descrita como comprometimento leve | Relação P/F acima de 300 descrita como dentro da faixa esperada |
| HemoGasoVet | Temperatura em `C` | Temperatura em `°C` |
| Fluidoterapia Vet | “Calc.”, “Monitor.” e rótulos sem acentuação | “Cálculo”, “Alertas” e rótulos completos em português |
| Neurologia | `Cao`, `Femea`, termos clínicos sem acentuação e estados internos | “Cão”, “Fêmea”, português revisado e notas clínicas voltadas ao usuário |
| Neurologia | “e colaboradores” | “et al.” |
| ConsultaVet | `diagn?stico`, `c?es`, `N?o`, `monitoriza??o`, `les?o`, `hipertens?o` e outras corrupções | “diagnóstico”, “cães”, “Não”, “monitorização”, “lesão”, “hipertensão” e demais formas corrigidas |
| ConsultaVet | Citações repetitivas dentro de cada parágrafo | Citação mantida apenas junto de afirmações específicas; referências completas permanecem ao final da ficha |
| Energia Vet | “Idade derivada internamente” | “Idade estimada para a curva” |
| Interface de ajuda | “Colar Texto (OCR)” | “Colar texto reconhecido” |
| Assistente clínico | “Dr. Luzaum AI” | “Dr. Luzaum IA” |

## Arquivos e grupos revisados

- Interface global: `layouts/AppLayout.tsx`, `components/ClinicalAcronymGlossaryV2.tsx` e `data/clinicalAcronyms.v2.ts`.
- ConsultaVet: páginas públicas e editoriais, fichas de doenças, princípios ativos, produtos comerciais, consensos, guias rápidos, emergências e respectivos arquivos de dados.
- HemoGasoVet: interpretador, entrada, apresentação, exportação, histórico, referências, guias, padrões, interações e casos de estudo.
- Neurologia: etapas do exame, ajuda, localização, diferenciais, relatórios e textos auxiliares.
- CRI Vet: apresentação, resultados, segurança e fichas farmacológicas.
- Fluidoterapia Vet: navegação, calculadoras, diluições, soluções de glicose e guias.
- Antibioticoterapia Vet, Energia Vet, Plantão Vet, Receituário Vet, escalas de dor, eletrólitos, dados veterinários e páginas gerais.

A normalização mecânica de acentuação alcançou 1.254 valores textuais em 81 arquivos. Depois dela, foi feita revisão manual dos resultados dinâmicos e dos conteúdos que continham caracteres corrompidos.

## Siglas

O glossário global contém mais de 300 definições clínicas e administrativas. Foram incluídas, entre outras:

- vias e frequências: VO, IV, IM, SC, BID, TID, SID e PRN;
- endocrinologia: T3, T4, fT4, cTSH e ACTH;
- cardiologia: ECG, CMH, CMD, CMR, VHS e NT-proBNP;
- nefrologia: DRC, IRIS, SDMA e RPCU;
- emergência e imagem: POCUS, FAST, AFAST, TFAST e RCP;
- hemogasometria: PaO2, PAO2, PaCO2, HCO3, BE, AG, FiO2, P/F e A-a;
- neurologia: NMS/UMN, NMI/LMN, C1-C5, C6-T2, T3-L3 e L4-S3;
- oncologia: TNM e categorias de tumor;
- diabetes: CGM, CAD, EHH e SGLT2i.

## Validação

- Compilação do aplicativo com esbuild: aprovada.
- Verificação de marcadores de conflito: aprovada.
- Servidor local na porta 5173: disponível.
- Teste responsivo móvel: ConsultaVet, Fluidoterapia Vet e HemoGasoVet.
- Teste funcional do HemoGasoVet: geração de interpretação, estados traduzidos, concordância, temperatura, glossário e classificação da relação P/F.
- Busca final por termos internos visíveis e caracteres corrompidos: sem ocorrências conhecidas na interface; correspondências restantes pertencem a comentários, URLs, rotas ou chaves de compatibilidade.
