# ADR: Licenciamento TBCA — NutriçãoVET

## Status

Aceito — integração **bloqueada** até autorização formal.

## Contexto

A TBCA (Tabela Brasileira de Composição de Alimentos) publica dados por 100 g da parte comestível, com `NA` significando “não analisado”. A licença declarada é **CC BY-NC-ND 4.0**, que proíbe:

- reprodução total ou parcial para fins comerciais não autorizados;
- comercialização dos dados;
- alteração dos conteúdos.

## Decisão

1. **Não** raspar nem importar a TBCA na versão comercial do Vetius sem autorização escrita.
2. Implementar infraestrutura de importação (`scripts/nutrition/import-tbca.ts`) com gate:

   ```text
   TBCA_LICENSE_CONFIRMED=true
   TBCA_LICENSE_REFERENCE=<documento ou identificação da autorização>
   ```

3. Sem esses valores: abortar importação, não modificar banco, registrar `license_status = blocked`.
4. Usar **somente** arquivo/exportação oficial autorizado — nunca HTML do site.

## Consequências

- Pipeline TBCA permanece desativado por padrão.
- Alimentos humanos iniciais virão preferencialmente da USDA (domínio público) até autorização TBCA.
- ADR revisado quando houver documento de autorização arquivado em `TBCA_LICENSE_REFERENCE`.

## Referências

- [TBCA — Busca por componente](https://www.tbca.net.br/base-dados/busca_componente.php)
- Licença CC BY-NC-ND 4.0 declarada no portal TBCA
