# NutriçãoVET — Governança de dados e licenças

| Fonte | Versão | Tipo de dado | Uso atual | Uso pretendido | Licença | Distribuir? | Alterar? | Autorização? | Ação necessária |
|-------|--------|--------------|-----------|----------------|---------|-------------|----------|--------------|-----------------|
| GENUTRI (planilha interna) | import 2026-03 | Alimentos + exigências | Bundle offline 223 alimentos | Catálogo legado + fallback | Proprietária / uso interno | Não publicar planilha | Normalização interna | Revisar com titular | Manter adapter legado |
| FEDIAF Nutritional Guidelines | 2025 | Fatores energéticos + exigências | Motor `fediaf.ts` | Mesmo motor versionado | Uso comercial restrito | Não reproduzir texto extenso | Regras interpretadas apenas | **Sim** para distribuição ampliada | Registrar referência; não copiar tabelas na UI |
| USDA FoodData Central | API atual | Composição ingredientes | Não importado ainda | Import admin server-side | Domínio público / CC0 | Sim (atribuição) | Normalização permitida | Chave API necessária | `FDC_API_KEY` só em ambiente servidor |
| TBCA | Portal atual | Composição BR | **Bloqueado** | Import após autorização | CC BY-NC-ND 4.0 | **Não** sem licença | **Não** | **Sim** | Ver ADR-nutrition-tbca-licensing |
| WSAVA Global Nutrition Guidelines | Atual | Avaliação / hospitalizados | Referência estrutural | Regras + monitoramento | Consultar WSAVA | Citação, não reprodução extensa | Interpretação | Verificar uso comercial | Referências por regra clínica |
| MAPA — IN 30/2009 | 2009 | Rotulagem garantias min/máx | Não implementado | Import comercial BR | Regulamentação pública | Metadados regulatórios | N/A | N/A | Pipeline CSV comercial |
| Fabricantes (fichas técnicas) | Variável | Produtos veterinários | Parcial no GENUTRI | Import administrativo | Contrato / fair use | Somente com permissão | Versionamento | Por fabricante | `rightsStatus` em mídia |

## Princípios operacionais

1. Valor ausente (`NA`, null) **≠** zero.
2. Garantia mínima/máxima de rótulo **≠** média analítica.
3. Alegação comercial **≠** recomendação clínica independente.
4. Nenhuma chave de API (USDA, etc.) no frontend ou repositório.
5. Supabase remoto: migrations V2 validadas **localmente** antes de qualquer deploy.

## Revisão

Próxima revisão programada: após autorização TBCA ou primeiro release comercial expandido do catálogo V2.
