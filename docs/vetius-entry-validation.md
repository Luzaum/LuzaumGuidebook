# Entrada Vetius e Mini-apps — 12/11/2026

## Comportamento

- `/` leva ao início da base clínica (`/consulta-vet`); sem sessão, exige login.
- Login e cadastro aceitam Google ou e-mail/senha; o login também mantém os nomes de usuário legados.
- `/hub` redireciona ao catálogo de Mini-apps.
- Os seis módulos mantidos conservam suas rotas e seus cálculos. Nutrição agora também exige sessão.
- A identidade visível passa a Vetius, com a logo existente; os identificadores internos e as chaves de favoritos/notas continuam compatíveis.
- Conforme a revisão solicitada, os cinco ícones originais de Antibioticoterapia, Fluidoterapia, Transfusão, Nutrição e Neurologia foram mantidos, com encaixe proporcional no catálogo. Somente Escalas de Dor usa o novo ícone.
- CRI e HemoGasoVet: removidos fonte, entradas de rota, catálogo, estilos, assets publicados e scripts exclusivos. Referências clínicas a infusões e hemogasometria permanecem nos textos do acervo.
- A migration SQL histórica de favoritos CRI foi preservada para manter o histórico de migrações já aplicadas. Nenhuma tabela remota nem dado de usuário foi apagado.

## Validação

- `npm run typecheck`: passou.
- `npm run lint`: passou, incluindo validação de payloads Supabase.
- `npm run build`: passou; avisos de tamanho de chunks do acervo permanecem.
- `npm run test:security`: 8 testes passaram.
- `npm run validate:fluidoterapia-vet`: passou.
- `npm run test:nutrition`: 258 passaram, 3 ignorados, nenhuma falha.
- `npm run test:neurologia`: 9 passaram.
- Navegador: entrada protegida; erro de senha; login redireciona ao início Vetius; seis links dos Mini-apps abrem seus módulos; cadastro com confirmação; cadastro com sessão imediata; erro OAuth preserva destino. Chamadas de autenticação simuladas nesses testes, sem criar contas reais.
- Logo e navegação: retorno ao início pelo clique na logo, recolher/expandir a barra lateral e abertura do menu no celular conferidos.

## Autenticação real

Consulta somente de leitura ao projeto Supabase configurado: e-mail habilitado, Google habilitado, cadastro habilitado, confirmação de e-mail exigida. O endpoint OAuth respondeu HTTP 302 para `accounts.google.com`.

A conclusão de login Google com uma conta real e a entrega/confirmação de um e-mail real não foram executadas. Esses itens dependem da interação com a conta e do ambiente publicado. Referência de configuração: https://supabase.com/docs/guides/auth/social-login/auth-google

Não houve deploy nem alteração de configuração remota.
