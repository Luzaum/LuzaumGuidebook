# AGENTS.md — Guia do Repositório Vetius (`LuzaumGuidebook`)

Este arquivo fornece contexto imediato para agentes de IA (incluindo **ChatGPT Work / Codex**, **GitHub Copilot Workspace**, **Cursor** e **Antigravity**) ao editar este repositório na nuvem ou localmente.

## 1. Visão Geral do Projeto
- **Nome:** Vetius (`LuzaumGuidebook`)
- **Stack:** React 19 + TypeScript 5.8 + Vite 6 + Tailwind CSS + Shadcn/UI + Supabase (`@supabase/supabase-js`)
- **Node.js:** Versão `24` (definida em `.nvmrc` e `netlify.toml`)
- **Roteamento Principal:** `App.tsx` (React Router v7)
- **Registro de Módulos do Hub:** `modules/registry.ts`

## 2. Mapa dos Módulos Clínicos
- **NutriçãoVET (Calculadora Energética):** `modules/energia-vet/` (rota `/calculadora-energetica`)
- **Fluidoterapia Vet:** `modules/fluidoterapia-vet/` (rota `/fluidoterapia-vet`)
- **Transfusão Sanguínea:** `modules/transfusao-sanguinea/` e `pages/TransfusaoSanguineaPage.tsx` (rota `/transfusao-sanguinea`)
- **HemoGasoVet:** `modules/hemogasovet/` (rota `/hemogasovet`)
- **Escalas de Dor:** `modules/escalas-dor/` (rota `/dor`)
- **Antibioticoterapia Vet:** `modules/antibioticoterapia-vet/` (rota `/antibioticoterapia`)
- **CRI VET:** `modules/crivet/` e `pages/Crivet.tsx` (rota `/crivet`)
- **Neurologia (NeuroVet):** `modules/neurologia/` e `pages/NeurologiaPage.tsx` (rota `/neurologia`)
- **ConsultaVET & Receituário:** `modules/consulta-vet/` (rota `/consulta-vet` e sub-rotas `doencas`, `medicamentos`, `consensos`, `receituario`, `editorial`, `manejo-emergencial`, `guias-rapidos`, `referencias-rapidas`)
- **Autenticação, Perfis e Multi-Clínica (Supabase):** `src/components/`, `src/lib/`, `src/routes/`

## 3. Comandos de Setup e Validação (Quality Gate)
Ao realizar alterações pelo ChatGPT Work / Codex ou em qualquer ambiente cloud:

1. **Instalar dependências (se necessário no ambiente):**
   ```bash
   npm ci
   ```
2. **Validar tipagem TypeScript e lint rápido (obrigatório antes de finalizar qualquer tarefa):**
   ```bash
   npm run typecheck
   npm run lint
   ```
3. **Validações clínicas específicas (quando alterar os módulos correspondentes):**
   ```bash
   npm run validate:hemogasovet
   npm run validate:fluidoterapia-vet
   npm run test:receituario
   npm run test:nutrition
   npm run test:neurologia
   ```
4. **Build de produção:**
   ```bash
   npm run build
   ```

## 4. Diretrizes Importantes
- **Idioma da UI:** Português (pt-BR), preservando acentuação correta em textos clínicos e de interface.
- **Variáveis de Ambiente:** Nunca comitar chaves reais em `.env` ou `.env.local`. O cliente Supabase (`src/lib/supabaseClient.ts`) possui fallback seguro caso `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` não estejam definidos no ambiente de teste/CI.
- **Preservação Clínica:** Não remover dados clínicos, tabelas de doses ou consensos existentes sem solicitação explícita.
