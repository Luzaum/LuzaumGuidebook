# Supabase Storage - Perfil Medico (Receituario Vet)

Este modulo agora envia imagens de perfil medico para Supabase Storage antes de salvar o perfil no banco local.

## 1) Variaveis de ambiente

Defina no ambiente do app (local e deploy):

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_SUPABASE_RX_MEDIA_BUCKET=receituario-media
```

Se `VITE_SUPABASE_RX_MEDIA_BUCKET` nao for definido, o app usa `receituario-media` por padrao.

## 2) Criar bucket no Supabase

No projeto Supabase:

1. Abra `Storage`
2. Crie o bucket `receituario-media`
3. Marque como `Public` (necessario para exibir imagens em `<img src="...">`)

## 3) Policies recomendadas (SQL)

```sql
-- leitura publica dos arquivos do bucket
create policy "Public read receituario media"
on storage.objects
for select
to public
using (bucket_id = 'receituario-media');

-- upload para usuarios autenticados
create policy "Auth upload receituario media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'receituario-media');

-- remocao para usuarios autenticados
create policy "Auth delete receituario media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'receituario-media');
```

## 4) Comportamento da tela

- Ao clicar em `Salvar perfil`, qualquer imagem em formato `data:image/...` e migrada para Supabase Storage.
- O perfil passa a salvar apenas URL publica da imagem.
- Se o upload falhar, o perfil nao e persistido e a tela exibe erro claro.
