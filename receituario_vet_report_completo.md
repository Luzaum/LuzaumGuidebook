# Relatório Arquitetural e Técnico Completo: Receituário Vet

Este documento é a versão definitiva e técnica (Deep Dive) da estrutura do módulo `receituario-vet` dentro do ecossistema Vetius. Ele foi desenhado especificamente para alimentar LLMs e sistemas automatizados com o contexto exato de Banco de Dados (Supabase), Gerenciamento de Estado, Integrações e UI/UX.

---

## 1. Topologia de Dados e Integração com Supabase

O módulo convergiu fortemente para o Supabase, utilizando o conceito de **Multi-tenancy via `clinic_id`** para garantir o isolamento de dados entre diferentes clínicas. O acesso aos dados é feito através de um **Adapter Pattern**, visando suportar transições `local -> supabase`.

### 1.1 DataAdapter (`DataAdapter.ts` / `SupabaseAdapter.ts`)
A ponte principal para CRUD de Pacientes e Tutores (Nova Receita) é instanciada via adaptador.
*   **Tutors (`tutors` table):**
    *   Mapeamento exato Supabase: `id`, `full_name`, `phone`, `email`, `document_id`, `cpf`, `rg`, `street`, `number`, `complement`, `address_complement`, `neighborhood`, `city`, `state`, `zipcode`, `notes`.
*   **Patients (`patients` table):**
    *   Mapeamento exato Supabase: `id`, `tutor_id`, `name`, `species` (Canina/Felina), `breed`, `sex`, `neutered`/`reproductive_condition`, `age_text`, `weight_kg`, `coat`, `microchip`, `anamnesis`, `notes`.
    *   **Importante:** A deleção lógica é usada ativamente (`is('deleted_at', null)`).

### 1.2 Catálogo de Medicamentos Genérico 3.0 (`Catalogo3Page.tsx`)
O Catálogo 3.0 é **100% Supabase** (não usa mais o LocalStorage). Todas as requisições passam por RPCs ou chamadas diretas às rotas do Supabase (`clinicRecords.ts`).
Tabelas Envolvidas:
*   **`medications`**: Guarda as definições brutas do ativo lógico.
    Campos chave: `name`, `is_controlled` (boolean), `species` (`text[]`), `routes` (`text[]`), e um campo JSONB `metadata` (usado para `active_ingredient`, `therapeutic_class`, e `clinical_tags`).
*   **`medication_presentations`**: Formas comercializáveis (FK `medication_id`).
    Campos chave: `pharmaceutical_form`, `concentration_text`, matriz de valores matemáticos (`value`, `value_unit`, `per_value`, `per_unit`), switches de tipo de farmácia (`pharmacy_veterinary`, `pharmacy_human`, `pharmacy_compounding`), e `metadata` JSONB (para `administration_routes`).
*   **`medication_recommended_doses`**: Regras de dose flexíveis e específicas por espécie e peso.

### 1.3 Perfil e Storage (`rxSupabaseStorage.ts`)
As imagens referentes a assinaturas e logos de clínicas prescritoras são manuseadas num bucket nativo do Supabase Storage chamado **`receituario-media`**. 
Eles são referenciados sob RLS e a URL pública da imagem é injetada no perfil local/nuvem sob as variáveis `clinicLogoDataUrl`, `signatureDataUrl` e `mapaSignatureDataUrl`.

---

## 2. Gerenciamento de Estado de Prescrições (Nova Receita 2.0)

A página `NovaReceita2Page.tsx` atua como o **State Container** de toda a emissão da receita médica. Não é utilizado Zustand nem Redux no topo, mas sim um estado React massivo (`NovaReceita2State`) acoplado com persistência paralela em `localStorage` e `sessionStorage`.

### 2.1 A Árvore de Estado (`NovaReceita2State`)
*   **`items` (PrescriptionItem[]):** O array master contendo os medicamentos escolhidos. Ele é normalizado antes da inserção e possui flags indicando sua origem:
    *   `medication_id` e `presentation_id`: Link direto à tabela Supabase do catálogo (quando oriundos de Quick Select).
    *   `is_controlled` (booleano que engatilha o fork do renderer para "Receita de Controle Especial / MAPA").
    *   Tipos de duração controlados pelo TS Union: `durationMode` (`'fixed_days' | 'until_recheck' | 'continuous_use' | 'until_finished'`).
*   **`prescriber` / `tutor` / `patient`**: Snapshots da relação com os IDs vinculados ao banco.
*   **Drafts e Recuperação (`rx_draft_v2:<clinicId>`):** O hook intercepta e grava o JSON bruto do State no LocalStorage a cada modificação, prevenindo que o médico perca o preenchimento se fechar aba (Crash Recovery).

### 2.2 Transparência entre Dados e View (`novaReceita2Adapter.ts`)
A função principal converte o `NovaReceita2State` no objeto genérico `PrintDoc`. O componente final `RxPrintView.tsx` recebe esse arquivo e agrupa os medicamentos pelos atributos `route` (ex.: Agrupa todos os "Topicos" numa sessão e "V.O." noutra). 
Medicamentos controlados são extraídos desta view e encaminhados para `NovaReceita2PrintPage.tsx`.

---

## 3. UI/UX: Design System e Componentização

A interface obedece estritamente um escopo global definido primariamente em `receituarioChrome.css`.

### 3.1 Temática e Variáveis CSS (Glassmorphism & Cyber)
Um conjunto extenso de CSS Variables com prefixo `--rxv` define os modos Claro e Escuro:
*   `--rxv-bg`, `--rxv-surface`, `--rxv-primary` (`#39ff14` - Verde neon característico).
*   Classes funcionais globais:
    *   `.rxv-card`: Efeito Glass nativo (`backdrop-filter: blur(12px)` + boxShadow + mix color).
    *   `.rxv-shimmer`: Animação infinita (`@keyframes rxvShimmer`) cortando o componente em 45 graus com um raio de luz translúcido.
    *   `.rxv-fluid-orb`: Bolhas de gradientes difusos que flutuam no background.
    *   `.rxv-fade-up`: Animações de entrada escalonadas (stagger) para listas (`animation-delay`).

### 3.2 O Ecossistema de Componentes de Formulário (`RxvComponents.tsx`)
Para todas as interações do Receituário Vet, Componentes nativos foram criados abstraindo o Tailwind e unindo-o ao layout Chrome.
Lembre-se SEMPRE de utilizá-los numa refatoração:
1.  **`<RxvField>`:** Wrapper de label para inputs.
2.  **`<RxvInput> / <RxvSelect> / <RxvTextarea>`:** Inputs estilizados, reagem dinamicamente ao focus emitindo neon sútil (`box-shadow: 0 0 0 3px rgba(57, 255, 20, 0.2)`).
3.  **`<RxvButton>`:** Abstrai interações de submit, contendo estados `loading` pre-programados.
4.  **`<RxvPillToggle> / <RxvChipsMultiSelect>`:** Usados no catálogo para múltipla marcação técnica (Vias de administração, Tags Clínicas).
5.  **`<RxvModalShell>`:** Wrapper padronizado para popups usando framer-motion de fundo.

---

## 4. Integração de Protocolos (`Protocolos3Page.tsx`)

Com o upgrade de arquitetura, protocolos funcionam como um pacote agregador de `PrsecriptionItems`.
*   O carregamento (`loadRxDb`) lê a base Local, mas a versão 3.0 migrou a escrita de volta ao Supabase para as tabelas de clínica, permitindo o compartilhamento de tratamento entre médicos da mesma assinatura.
*   A página de Protocolos pode preencher toda a `NovaReceita2State` massivamente instanciando o hook do LocalStorage ou passando via `location.state` (React Router) para a página ativa.

---

**Sumário:** Modificar ou extender qualquer tela do Receituário Vet impõe respeitar não só o Design System global (uso imperativo dos hooks/classes Rxv) mapear rigidamente requisições para o Adapter (`DataAdapter`) usando as estruturas das tabelas Supabase do ecossistema Vetius.
