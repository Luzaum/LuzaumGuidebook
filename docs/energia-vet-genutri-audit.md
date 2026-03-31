# Auditoria GENUTRI para Energia Vet

- Gerado em: `2026-03-29T01:12:25`
- Workbook: `C:\Users\Resgate\Downloads\Planilha de Formulação e Avaliação de Dietas - GENUTRI.xlsx`
- Alimentos importados: `129`
- Perfis de exigência importados: `43`
- Regras energéticas importadas: `2`

## Abas

- `Alimentos MN`: dimensão `A1:AN995`, fórmulas `297`, erros calculados `0`.
- `Alimentos MS`: dimensão `A1:AO994`, fórmulas `4821`, erros calculados `365`.
- `Formulação`: dimensão `A1:AA1000`, fórmulas `31`, erros calculados `0`.
- `Avaliação`: dimensão `A1:AB1000`, fórmulas `46`, erros calculados `0`.
- `Ficha Nutricional`: dimensão `A1:Z1011`, fórmulas `70`, erros calculados `7`.
- `Manejo Manual`: dimensão `A1:X976`, fórmulas `11`, erros calculados `0`.
- `Pesquisa`: dimensão `A1:AE1004`, fórmulas `3081`, erros calculados `202`.
- `Manejo Automatico`: dimensão `A1:X923`, fórmulas `181`, erros calculados `120`.
- `NP`: dimensão `A1:E27`, fórmulas `18`, erros calculados `0`.
- `Exigências`: dimensão `A1:BH1012`, fórmulas `2`, erros calculados `0`.
- `Contas Avaliação`: dimensão `A1:AO1000`, fórmulas `1090`, erros calculados `6`.
- `Contas Formulação`: dimensão `A1:AQ1000`, fórmulas `1044`, erros calculados `43`.
- `Exigências Energética`: dimensão `A1:Z1000`, fórmulas `0`, erros calculados `0`.

## Problemas Detectados

- [WARNING] `Alimentos MS` `M29`: Erro em célula calculada de matéria seca para 'Sachê Royal Canin Care Digestive Gato': #VALUE!. A importação usa conversão derivada do MN.
- [WARNING] `Alimentos MN` `B113`: Categoria inconsistente 'ração' normalizada para 'Ração'.
- [WARNING] `Alimentos MN` `B118`: Categoria inconsistente 'critical' normalizada para 'Critical'.
- [WARNING] `Alimentos MN` `B119`: Categoria inconsistente 'sucedaneo' normalizada para 'Sucedâneo'.
- [WARNING] `Alimentos MN` `B120`: Alimento 'Creme de Leite sem lactose - Piracanjuba' sem categoria preenchida.
- [WARNING] `Exigências` `N2`: Campo 'Fen + Tir (%)' da exigência 'Cão - %MS' veio como data (2025-03-01) e será tratado como comparação assistida/manual.
- [WARNING] `Exigências` `AW2`: Campo 'B9 -ug' da exigência 'Cão - %MS' veio como data (2025-09-29) e será tratado como comparação assistida/manual.
- [WARNING] `Exigências` `N3`: Campo 'Fen + Tir (%)' da exigência 'Gato - %MS' veio como data (2025-04-20) e será tratado como comparação assistida/manual.
- [WARNING] `Exigências` `AI3`: Campo 'FE -mg' da exigência 'Gato - %MS' veio como data (2025-07-10) e será tratado como comparação assistida/manual.
- [WARNING] `Exigências` `AO4`: Campo 'Vit. D (UI/Kg)' da exigência 'Cão - g/PV^0,75' veio como data (2025-02-15) e será tratado como comparação assistida/manual.
- [WARNING] `Exigências` `AW4`: Campo 'B9 -ug' da exigência 'Cão - g/PV^0,75' veio como data (2025-01-07) e será tratado como comparação assistida/manual.
- [WARNING] `Alimentos MS`: A aba Alimentos MS usa IFERROR e materializa zeros onde o MN está vazio. O importador recalcula matéria seca preservando null para não inventar nutrientes.
- [WARNING] `Ficha Nutricional` `B24`: A célula B24 contém 'Z', causando #VALUE! em B25:B31. O app gera plano alimentar sem replicar esse bug.
- [INFO] `Prompt`: O prompt referencia um PDF FEDIAF, mas o arquivo não foi encontrado automaticamente no diretório Downloads durante esta importação.
