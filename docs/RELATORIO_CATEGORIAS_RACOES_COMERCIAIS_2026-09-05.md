# Relatório — categorias de rações comerciais

Data da pesquisa: 5 de setembro de 2026  
Mercado pesquisado: Brasil

## Resultado implementado

O visor de Rações Comerciais passou a ter dois níveis de seleção:

1. Tipo da dieta: Todas as rações, Terapêuticas ou Manutenção.
2. Categoria contextual: aparece depois da escolha do tipo e mostra somente categorias com produtos disponíveis para a espécie selecionada, com contagem de resultados.

### Categorias terapêuticas

- Suporte renal (DRC / IRIS)
- Gastrointestinal e Low Fat
- Dermatológica e hipoalergênica
- Trato urinário e dissolução de cálculos
- Hepatologia e suporte hepático
- Cardiologia e baixo sódio
- Manejo de obesidade e saciedade
- Recuperação, UTI e alta densidade
- Endocrinologia e controle glicêmico
- Articular e suporte osteoarticular
- Oncologia e suporte metabólico
- Coadjuvante clínica geral

### Categorias de manutenção

- Raças específicas
- Porte específico
- Filhotes, gestação e lactação
- Adultos — manutenção diária
- Maduros e idosos
- Castrados e vida indoor
- Cuidados específicos
- Manutenção geral

Essa taxonomia é aplicável a todas as marcas do catálogo. A Royal Canin foi usada como referência de cobertura porque organiza claramente o portfólio brasileiro por território clínico, raça, porte, fase de vida, estilo de vida e cuidado específico.

## Pesquisa oficial Royal Canin Brasil

O sitemap oficial consultado continha 145 páginas únicas de produto no mercado brasileiro:

| Linha | Cães | Gatos | Total |
|---|---:|---:|---:|
| Veterinária | 29 | 11 | 40 |
| Manutenção/varejo | 73 | 32 | 105 |
| Total | 102 | 43 | 145 |

### Produtos veterinários encontrados

| Território | Produtos oficiais encontrados |
|---|---|
| Renal | Renal Canine, Renal Canine Patê, Renal Canine Small Dog, Renal Special Canine, Renal Feline, Renal Special Feline e Renal Feline úmido |
| Gastrointestinal | Gastro Intestinal Canine seco e úmido, Low Fat seco e úmido, Moderate Calorie, High Fibre, Gastrointestinal Puppy, Gastrointestinal Feline seco e úmido |
| Dermatologia/alergias | Hypoallergenic Canine seco e patê, Hypoallergenic Small Dog, Hypoallergenic Moderate Calorie e Skin Care Adult Small Dog |
| Urinário | Urinary S/O Canine seco e úmido, Urinary S/O Small Dog e Urinary S/O Feline seco e úmido |
| Hepático | Hepatic Canine seco e úmido e Hepatic Feline |
| Cardíaco | Cardiac Canine seco e patê |
| Peso e diabetes | Satiety Canine seco, úmido e Small Dog; Diabetic Canine; Diabetic Special Low Carbohydrate úmido; Satiety Feline seco e úmido; Diabetic Feline |
| Recuperação | Recovery mousse para cães e gatos |

A página institucional veterinária da Royal Canin Brasil confirma os territórios e nomes de linha para cães. Para gatos, confirma reações adversas ao alimento, renal, urinário, gastrointestinal/hepático e controle de peso.

### Produtos de manutenção encontrados

#### Raças específicas

- Cães: Boxer, Bulldog Inglês, Bulldog Francês, Dachshund, Pastor Alemão, Golden Retriever, Labrador Retriever, Maltês, Schnauzer Miniatura, Pomeranian, Poodle, Pug, Rottweiler, Shih Tzu e Yorkshire Terrier, com variações Adult, Puppy, 8+ e/ou alimento úmido conforme a raça.
- Gatos: Persa Adult, Persa Kitten e Maine Coon Adult.

#### Porte e fase de vida

- X-Small: Puppy, Adult, Adult 8+ e Ageing 12+.
- Mini: Starter Mother & Babydog, Puppy, Adult, Adult 8+, Ageing e Ageing 12+.
- Medium: Puppy, Adult, Adult 7+ e Ageing 10+.
- Maxi: Puppy, Adult, Adult 5+ e Ageing 8+.
- Giant: Puppy, Junior e Adult.
- Felinos: Mother & Babycat, Kitten e alimentos úmidos correspondentes.

#### Castrados e estilo de vida

- Gatos: Sterilised, Sterilised 7+, Ageing Sterilised 12+, Kitten Sterilised, Indoor e Indoor 7+, além de versões úmidas.
- Cães: Mini Indoor Puppy, Adult e Senior.

#### Cuidados específicos

- Cães: Dermacomfort, Light, Digestive Care, Dental Care, Coat Care, Relax Care e Maxi Joint Care, com variações de porte e/ou alimento úmido.
- Gatos: Appetite Control, Dental Care, Digestive Care, Fit, Hair & Skin, Hairball Care, Light Weight Care, Sensible, Exigent e versões úmidas correspondentes.

O inventário completo, com os 145 nomes, espécie, tipo, categoria, identificador oficial e URL de origem, foi salvo em `modules/energia-vet/data/research/royal-canin-br-official-2026-09-05.json`.

## Comparação com o banco do app

O banco ativo contém 348 rações comerciais, das quais 81 têm “Royal” no nome. Após a correção de classificação, 43 registros Royal aparecem como terapêuticos e 38 como manutenção.

A comparação não pode ser feita apenas por quantidade: o banco contém duplicatas históricas, nomes sem o identificador oficial e apresentações separadas, enquanto o site oficial usa uma página por SKU/formulação. Por isso, o arquivo de pesquisa usa `officialId` como futura chave de conciliação.

Lacunas mais evidentes:

- Cobertura de raças: o site oficial lista 34 produtos de raça; o catálogo ativo classifica apenas 4 registros Royal nessa categoria.
- Linhas X-Small e Giant praticamente ausentes do catálogo ativo.
- Variações etárias e úmidas de várias linhas Mini, Medium e Maxi ausentes.
- Cuidados Dental, Dermacomfort, Hairball, Hair & Skin e Relax incompletos ou ausentes.
- Produtos veterinários claramente ausentes ou sem correspondência inequívoca: Cardiac Canine seco, Hepatic Feline, Satiety Small Dog, Skin Care Adult Small Dog e Urinary S/O Small Dog, além de algumas apresentações úmidas.

## Correções já feitas no banco ativo

- Corrigida a espécie de sete registros Royal que estavam como cão, ambos ou desconhecida apesar de o nome identificar gato/cão.
- Corrigidos nove produtos de varejo que estavam marcados como terapêuticos: Sensible, Digestive Care, Light Weight Care, Maxi Joint Care e respectivas apresentações úmidas.
- Corrigido “Azeite de dendê”, que estava tipado como ração comercial; agora aparece corretamente entre ingredientes naturais/óleos.
- O classificador passou a priorizar `isTherapeutic` e `therapeuticIndications` do banco, usando palavras-chave apenas como complemento.
- Adicionada a categoria oncológica já existente nas indicações estruturadas do catálogo.

## Dados necessários antes de ativar produtos ausentes no cálculo

O inventário pesquisado já fornece nome oficial, espécie, linha, categoria, `officialId` e fonte. Para inserir um produto no motor de cálculo ainda é obrigatório validar, por rótulo oficial vigente:

- energia metabolizável (kcal/kg ou kcal/100 g);
- umidade e matéria seca;
- proteína bruta, extrato etéreo, fibra bruta e matéria mineral;
- cálcio, fósforo, sódio e potássio quando declarados;
- apresentação e peso da embalagem;
- indicação terapêutica e contraindicações, quando aplicável;
- imagem oficial e data de consulta.

Produtos sem esses valores devem permanecer como referência de pesquisa e não entrar silenciosamente nos cálculos. O arquivo criado está marcado como `research_reference` justamente para impedir que dados incompletos sejam tratados como composição nutricional validada.

## Fontes oficiais

- https://www.royalcanin.com/br/dogs/linha-vet
- https://www.royalcanin.com/br/cats/linha-vet
- https://www.royalcanin.com/br/dogs/products
- https://www.royalcanin.com/br/cats/products/feline-health-nutrition
- https://www.royalcanin.com/br/dogs/products/dog-size-nutrition-guide
- https://www.royalcanin.com/br/pt-br/sitemap/sitemap-products.xml
