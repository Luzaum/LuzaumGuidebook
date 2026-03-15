# Relatório: Falha na Importação de Protocolos (Protocolos 3.0) no Netlify

## 1. O Problema Relatado
A funcionalidade de "Importar Protocolo" (que no código base opera como **Duplicar Protocolo Global para a Clínica**) estava funcionando normalmente no ambiente local (`localhost`), porém apresentou falhas ao ser executada na versão de produção (hospedada no **Netlify**).

## 2. Análise Técnica (Testes e Diagnóstico)
Após investigar os arquivos responsáveis pela ação (`Protocolos3Page.tsx`, `protocolsRepo.ts` e a pasta `supabase/functions`), identifiquei que a funcionalidade "Duplicar para minha clínica" não ocorre diretamente no React, mas sim via **Supabase Edge Functions**.

O código realiza a chamada assim:
```typescript
const { data, error } = await supabase.functions.invoke('duplicate-global-protocol', {
  body: { clinicId, userId, globalProtocolId },
})
```

A Edge Function que atende essa requisição está localizada em `supabase/functions/duplicate-global-protocol/index.ts`. O comportamento de "funcionar no localhost e quebrar no Netlify" geralmente está ligado a **dois fatores cruciais** na comunicação com o Supabase:

### Erro Causa 1: Edge Function Não Implantada (Deploy)
Ao testar em `localhost`, é comum que o Supabase local e as funções viaja usando o comando local `supabase functions serve` localmente que as aciona, e passa tranquilamente. No entanto, quando o código é hospedado no Netlify, o sistema dispara a ação para o projeto em nuvem da Supabase.
Se o comando de deploy das funções na nuvem de produção (`supabase functions deploy duplicate-global-protocol`) não tiver sido executado, a chamada não encontrará o "Backend" responsável e devolverá uma falha HTTP (ex: 400 ou 404).

### Erro Causa 2: Ausência de Secrets (Chaves de Acesso) na Edge Function de Produção
No código da Edge Function nós observamos:
```typescript
const supabaseUrl = Deno.env.get('SUPABASE_URL') || Deno.env.get('VITE_SUPABASE_URL')
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Configuração Supabase incompleta para duplicate-global-protocol.')
}
```
A Edge Function exige a criação de um client de Administrador (`service_role_key`) para criar protocolos globais ou duplicar à clínica. Localmente, no seu projeto (via `.env.local`), essas chaves são resolvidas facilmente. **Porém, essas secrets de admin da Supabase e do projeto não são migradas automaticamente na Supabase Nuvem.**
Sem essa chave de serviço configurada *DENTRO* das *"Edge Secrets"* da Supabase, a chamada do Netlify tentará acionar a API e provocará erro "500 Internal Server Error / Falha".

---

## 3. Passo a Passo para Resolução

Para corrigir, será necessário repassar isso para a outra IA (ou executar no seu terminal Supabase logado no projeto de produção):

### Ação 1: Configurar a Chave Secreta na Nuvem (Service Role Key)
Defina a `supabase_service_role_key` e a url em seu projeto do Supabase online rodando o config base das secrets (Substitua os valores com os que estão em sua URL base):
```bash
supabase secrets set VITE_SUPABASE_URL="https://[seu-projeto].supabase.co"
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="[sua-service-role-key-projet-supabase]"
```

### Ação 2: Realizar o Deploy da Pasta de Funções Edge (Production)
Será necessário empurrar as pastas configuradas dentro de `/supabase/functions` da sua máquina para o Supabase Online. Execute na raiz do projeto:
```bash
supabase functions deploy duplicate-global-protocol
supabase functions deploy publish-global-protocol
supabase functions deploy delete-global-protocol
```

### Ação Alternativa Via Supabase Dashboard
Ou a IA pode orientá-lo a entrar no Supabase Dashboard → Projeto → Edge Functions e certificar-se de adicionar como **Secrets** as variáveis ambientais (`SUPABASE_SERVICE_ROLE_KEY` e `VITE_SUPABASE_URL`) se o CLI não for usado.

---

## 4. Conclusão Final
O seu frontend no Netlify está correto e validado. O sistema trava pois o front tenta charmar uma Edge Function do Supabase que **(1)** ou não existe ainda na plataforma de produção ou **(2)** não possui as variáveis e permissões (`secrets` locais de administrador) preenchidas no ambiente remoto dela, interrompendo a duplicação em nuvem.
