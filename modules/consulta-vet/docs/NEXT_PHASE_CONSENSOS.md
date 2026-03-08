# Próxima Fase: Consensos Reais (Supabase + Reader)

## Objetivo
Trocar a fonte local (`seed`) por dados reais com metadados em tabela e PDFs no Supabase Storage.

## Estrutura sugerida
- `supabase.consensos`
  - `id` (uuid)
  - `slug` (text, unique)
  - `title` (text)
  - `short_title` (text)
  - `source_organization` (text)
  - `year` (int)
  - `species` (`dog` | `cat` | `both`)
  - `category` (text)
  - `tags` (text[])
  - `pdf_path` (text) // caminho no bucket
  - `pdf_filename` (text)
  - `summary` (text, nullable)
  - `article_summary_rich_text` (text, nullable)
  - `admin_notes_rich_text` (text, nullable)
  - `related_disease_slugs` (text[])
  - `is_active` (boolean)
  - `created_at`, `updated_at` (timestamptz)

- Storage bucket
  - `consensos-pdf`
  - padrão de path: `consensos/<slug>/<arquivo>.pdf`

## Mudança técnica prevista
1. Criar `SupabaseConsensoRepository` implementando `ConsensoRepository`.
2. Alternar `consensoFeatureFlags.dataSource` para `supabase`.
3. Resolver URL assinada/privada do PDF no backend/edge function.
4. Trocar `pdfViewerMode` para `react-pdf` quando o reader estiver pronto.

## Reader real (react-pdf)
- Habilitar paginação, zoom e estado de carregamento.
- Persistir progresso de página por usuário.
- Fallback para abrir em nova aba quando o reader falhar.

