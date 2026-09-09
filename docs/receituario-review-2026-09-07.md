# ConsultaVet — revisão do receituário concluída em 08/09/2026

## Estado e cobertura

Alterações locais, sem publicação. Esta revisão é uma verificação de software e conteúdo editorial; não constitui certificação clínica de todo medicamento comercial disponível.

- Os 21 modelos domiciliares e suas 67 opções foram percorridos pela interface dos componentes reais com pacientes fictícios, sem emissão clínica. A varredura final não encontrou `NaN`, `Infinity`, erro de dose nem apresentação pendente. Evidência atual: `tmp/receituario-ui-sweep-take-home-console-clean.log`.
- Os quatro pedidos do usuário estão disponíveis: asma felina, colapso de traqueia, pancreatite canina e felina, e tríade felina. Todas as opções desses modelos também passaram no aplicativo autenticado. Evidências: `tmp/auth-requested-models-sweep-final.log` e `tmp/auth-pancreatite-gato-final.log`.
- A matriz automatizada domiciliar cobriu 3.103 combinações. Foram 1.205 calculáveis, 1.898 bloqueadas por incompatibilidade ou segurança e 506 que exigem confirmação profissional; não houve erro numérico. Ver `receituario-matrix-2026-09-07.json`. Um bloqueio significa que o sistema recusou a combinação, não que ela seja uma receita aprovada.
- Os 181 testes de regressão, o typecheck e o build de produção passaram. Os testes específicos cobrem apresentação editorial, produto comercial misto, produto exclusivamente injetável, caneta de insulina, rota manual e recuperação de dados antigos.
- Cinco PDFs de teste, com nove páginas ao todo, foram gerados pelo motor real e inspecionados: asma, colapso traqueal, pancreatite canina, pancreatite felina e tríade felina. Arquivos em `tmp/pdfs/receituario-review/`.
- O fluxo autenticado foi exercitado com o usuário fornecido, incluindo salvar e reabrir. Permanecem duas receitas claramente identificadas como `TESTE QA — NÃO UTILIZAR` na conta de Luis, pois a interface não oferece exclusão segura desses registros.

O catálogo editorial testado contém 52 princípios ativos e não equivale a todos os produtos comerciais existentes no Brasil. As simulações validam cálculo, bloqueios e texto gerado para pesos fictícios; indicação, dose final, duração, comorbidades e interações continuam sob decisão do médico-veterinário.

## Correções implementadas

- Concentrações com denominador, como 4 mg/5 mL, preservadas no cabeçalho; percentuais não recebem denominador artificial.
- Todas as apresentações injetáveis foram retiradas do Receituário editorial, comercial e dos registros da clínica. Produtos mistos mantêm apenas comprimidos, cápsulas, soluções orais, tópicos e outras apresentações para casa.
- Produtos exclusivamente injetáveis, inclusive canetas de insulina e marcas como Convenia e Zycortal, não aparecem como opção nem podem ser recriados pelo atalho manual da busca.
- As vias subcutânea e intramuscular foram retiradas dos seletores. Uma via ou apresentação injetável digitada em “Outra via” bloqueia o botão de inclusão e mostra uma explicação.
- Rascunhos e medicamentos salvos anteriormente são filtrados ao reabrir; uma apresentação ou dose injetável antiga não volta ao seletor.
- Os sete modelos de diabetes com insulina foram aposentados da biblioteca de receitas domiciliares. As opções de buprenorfina baseadas em solução injetável também foram removidas dos modelos de pós-operatório, pancreatite felina e tríade felina.
- Maxicam preserva três opções domiciliares estruturadas (0,5 mg, 2 mg e solução oral 1 mg/mL) e descarta a apresentação injetável.
- Bloqueio de jatos fracionados e de espécie incompatível; unidades do modelo não são confundidas com unidades de outra dose do catálogo.
- Via da administração prevalece sobre o nome da apresentação ao organizar a receita; grupo específico para mucosa da boca.
- Etapas subsequentes de tratamento e orientações de administração preservadas após cálculo por apresentação.
- Alternativas mutuamente exclusivas não são selecionadas juntas; opção de dose agravada não é adotada implicitamente.
- Durações complexas e prazos de reavaliação preservados; removido prazo genérico de sete dias quando não existe duração cadastrada.
- Estado de carregamento substitui mensagens prematuras de ausência de apresentações/doses. Cálculo bloqueado não mostra zero como dose sugerida.
- Busca inclui nome e princípio ativo; monografia editorial com apresentações tem prioridade sobre cartão resumido duplicado.
- Paginação mantém títulos e cabeçalhos de medicamentos com o início do conteúdo seguinte, considerando linhas em branco.
- Recomendações ao tutor simplificadas sem apagar conteúdo entre parênteses; orientações profissionais mantidas separadas.
- Modelos globais atuais não são substituídos por cópias remotas antigas que perderam funções de cálculo.
- Quando uma forma oral comercial não permite fracionamento seguro, o sistema sugere manipulação individualizada com a concentração calculada para o paciente.
- A escolha automática de apresentações considera segurança, diferença da dose e praticidade da quantidade administrada.
- Ao trocar espécie ou peso, a apresentação automática é recalculada; isso impede que uma apresentação canina permaneça selecionada em uma receita felina.
- Caninsulin, Toujeo e outras insulinas não entram no Receituário porque dependem de apresentação injetável.
- Fluimucil injetável e outras soluções originalmente parenterais não são oferecidos mesmo quando uma fonte descreve uso por outra via.
- Probióticos do modelo de gastroenterite apontam para produtos cadastrados e alertam o veterinário de que cepa, rótulo e indicação dependem do produto selecionado.
- O bloco experimental de cinomose deixou de produzir automaticamente ribavirina, DMSO e vitaminas; mostra ao profissional que não há antiviral específico ou uniformemente eficaz para prescrição automática.

## Modelos solicitados

Asma felina e colapso traqueal foram revisados. Foram acrescentados pancreatite canina, pancreatite felina e tríade felina. Os modelos de pancreatite destinam-se à seleção individual após estabilização e não inserem antibiótico ou corticoide automaticamente. Na tríade, os componentes hepático e intestinal exigem diagnóstico e seleção individual.

Na asma, Flixotide usa 250 mcg por jato como opção inicial prática e oferece redução para 50 mcg após controle e reavaliação. O texto ensina o tutor a usar espaçador e aguardar de 7 a 10 respirações. Seretide informa ao veterinário que a evidência clínica felina é limitada e que a seleção deve ser individual. Salbutamol permanece identificado como resgate, não controlador.

## Fontes efetivamente consultadas

Arquivos locais da pasta `C:\Users\luzau\OneDrive\Desktop\Livros`; extrações de trabalho em `tmp/pdfs/receituario-review/`.

- Plumb, 10ª edição: monografias de buprenorfina, fluticasona, maropitant, ondansetrona e ursodiol. Páginas do arquivo PDF: 177–182, 579–581, 826–829, 983–985 e 1314–1316, respectivamente. Numeração do arquivo, não necessariamente paginação impressa.
- Ettinger, 9ª edição, 2024: trechos respiratórios, tríade e pancreatite; páginas PDF 1308–1329, 1400–1406 e 2018–2027.
- Nelson e Couto, 6ª edição: trechos respiratórios e pancreáticos extraídos nas páginas PDF 320–337 e 650–665. Não foi lida integralmente a coleção.
- ACVIM, consenso de pancreatite felina, 2021, DOI [10.1111/jvim.16053](https://doi.org/10.1111/jvim.16053), [texto completo consultado](https://abvp.com/wp-content/uploads/2021/09/Feline-Sept-JC-pancreatitis.pdf).
- [Bula oficial Emedron 1%, Agener](https://agener.com.br/wp-content/uploads/2022/06/4020080-BU-EMEDRON-INJ.pdf): cada mL contém equivalente a 10 mg de ondansetrona base. Consultada para corrigir concentração e distinguir apresentações.
- [Cornell — pancreatite felina](https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-pancreatitis).
- [Bula oficial Flixotide Spray, GSK](https://br.gsk.com/media/8264/flixotide-spray.pdf): apresentações brasileiras de 50 e 250 mcg por dose.
- [Bula oficial Seretide Spray, GSK](https://br.gsk.com/media/tv1pwhgp/seretide-spray.pdf): apresentações 25/50, 25/125 e 25/250 mcg por dose.
- [Cohn et al., 2010, PubMed](https://pubmed.ncbi.nlm.nih.gov/19647461/) e [revisão JFMS 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10812033/): base para fluticasona inalatória e redução após controle.
- [Leemans et al., 2012, PubMed](https://pubmed.ncbi.nlm.nih.gov/21354836/): estudo experimental da combinação fluticasona/salmeterol em gatos; a extrapolação clínica permanece limitada.
- [Merck Veterinary Manual — cinomose](https://www.merckvetmanual.com/infectious-diseases/canine-distemper/canine-distemper) e [Cornell — canine distemper virus](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/canine-distemper-virus): suporte como base do tratamento e ausência de cura antiviral específica recomendada.
- [Mangia et al., 2014, PubMed](https://pubmed.ncbi.nlm.nih.gov/25355997/): resultado in vitro com ribavirina, mantido apenas como contexto experimental.

Identificados, mas sem leitura integral confirmada: revisão nutricional JAVMA 2024 (DOI 10.2460/javma.23.11.0641), estudos respiratórios 2022/2023 e revisão de tríade 2026 (DOI 10.1016/j.cvsm.2026.01.002). Esses artigos não foram usados como validação integral das doses implementadas.

Prazos curtos de reavaliação nos novos modelos são escolhas explícitas de acompanhamento, não duração universal estabelecida para toda apresentação da doença. Nenhuma atualização torna a concentração, isoladamente, suficiente para decidir indicação, dose e duração.
