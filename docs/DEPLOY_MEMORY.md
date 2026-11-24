# Deploy Memory

- Em 13/11/2026, `https://vetiusv0.netlify.app` e `https://vetius.netlify.app` retornavam 404. O Supabase ainda usava `https://vetius.netlify.app` como **Site URL**.
- Em **Authentication → URL Configuration** no Supabase, configure **Site URL** com a URL pública do deploy ativo. Adicione a URL desse mesmo domínio com o caminho `/auth/callback` em **Redirect URLs**.
- O login com Google retorna ao domínio em que foi iniciado. Para testar em outro domínio, adicione o `/auth/callback` desse domínio à lista. [Documentação de redirecionamentos do Supabase](https://supabase.com/docs/guides/auth/redirect-urls)
