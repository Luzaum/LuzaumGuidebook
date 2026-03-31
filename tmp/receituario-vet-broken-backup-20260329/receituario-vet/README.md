# ReceituarioVET - B1.1 Fluxo Plantao

## Fonte de dados (feature flag)

Defina no `.env.local`:

```bash
VITE_RX_DATA_SOURCE=local
```

Valores:
- `local`: usa `rxDb.ts` + `rxStorage.ts` (padrao)
- `supabase`: usa `patients`/`tutors` com `clinic_id` ativo e RLS

## O que foi adicionado

- `PatientQuickSelect`: busca paciente com debounce e aplica paciente+tutor na receita
- `PatientCreateModal`: cria paciente com tutor existente ou novo, e aplica na receita
- `DataAdapter` com `LocalAdapter` e `SupabaseAdapter`

## Integracao incremental

- O fluxo novo foi adicionado no topo da `NovaReceitaPage.tsx`
- O fluxo legado ("Importar do banco de tutores/pacientes") foi mantido
- Autosave de rascunho foi preservado
