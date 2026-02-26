# Relatorio de pendencias - Dados Veterinarios (UPA PET)

## Implementado nesta fase
- Integracao do modulo no SPA em `/dados-veterinarios`.
- Base de acesso por perfil:
  - `admin`: pode ver todas as unidades e selecionar consolidado.
  - `veterinarian`: visao limitada a sua unidade.
- Filtro de dados por unidade no `DataContext`.
- Pagina de internamento com historico cronologico (mais recente no topo).
- Pagina de unidades (admin) para adicionar/remover unidades.
- Rota de fallback `Em desenvolvimento` para acoes ainda sem fluxo final.

## Pendencias funcionais
- Backend real com Supabase + RLS multiclinca (hoje em mock).
- Login real por usuario/unidade (hoje emulacao por seletor local).
- Permissao fina por acao (RBAC completo por modulo/acao).
- Integracao de financeiro com todas as telas de lancamento clinico.
- Exportacao PDF avancada em todos os relatrios (layout final e auditoria).
- Integracao de avaliacoes Google por unidade para feedback.
- Integracao de anexos (exames, termos, internamento) via Storage.
- Fluxos completos de todos os botoes secundarios ainda com destino para `Em desenvolvimento`.
- Cadastro de medicamentos e insumos com controle de estoque por unidade.
- Mapa de execucao do paciente com protocolos completos de internamento.

## Pendencias de qualidade
- Testes automatizados (unitarios/e2e) para fluxos criticos.
- Ajustes finais de UX mobile em tabelas densas.
- Revisao de acentuacao textual em alguns labels herdados do ZIP.
