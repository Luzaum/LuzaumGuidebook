# Vetius (LuzaumGuidebook)

**SEU COMPANHEIRO CLÍNICO, ANESTÉSICO E CIRÚRGICO, SEMPRE QUE PRECISAR, NA PALMA DAS MÃOS!**

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Luzaum/LuzaumGuidebook?quickstart=1)
[![Open in github.dev](https://img.shields.io/badge/VS_Code_Web-Abrir_em_github.dev-007ACC?logo=visualstudiocode&logoColor=white)](https://github.dev/Luzaum/LuzaumGuidebook)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Luzaum/LuzaumGuidebook)

---

## ☁️ Como Editar e Rodar o Projeto Direto Online (Em Qualquer PC, Sem Clonar Localmente)

Este repositório já está configurado com **Dev Containers (`.devcontainer/devcontainer.json`)** e suporte automático a ambientes em nuvem no Vite (`vite.config.ts`). Você pode editar e testar o app de qualquer computador apenas usando o navegador:

### 1. GitHub Codespaces (Editor Completo + Terminal + Preview Ao Vivo)
Ideal quando você quer **editar o código e ver o app rodando ao vivo** no navegador sem instalar nada no PC:
1. Acesse [github.com/Luzaum/LuzaumGuidebook](https://github.com/Luzaum/LuzaumGuidebook) ou clique direto em **[Abrir no GitHub Codespaces](https://codespaces.new/Luzaum/LuzaumGuidebook?quickstart=1)**.
2. Ou no repositório do GitHub, clique no botão verde **`<> Code`** → aba **`Codespaces`** → **`Create codespace on main`**.
3. O ambiente na nuvem iniciará automaticamente com **Node.js 24**, rodará `npm install`, criará o `.env.local` e iniciará o servidor `npm run dev` abrindo o preview na porta `5173`.
4. Para salvar suas alterações direto no GitHub pelo navegador: use a aba **Source Control (`Ctrl+Shift+G`)** na barra lateral esquerda → digite a mensagem → clique em **Commit & Push**.

> **Dica para conectar o Supabase automaticamente em qualquer Codespace:**
> Em **[GitHub Settings → Codespaces](https://github.com/settings/codespaces)** (ou em *Settings → Secrets and variables → Codespaces* do repositório), adicione os secrets:
> - `VITE_SUPABASE_URL`
> - `VITE_SUPABASE_ANON_KEY`
>
> O script `.devcontainer/setup-cloud.mjs` gera automaticamente o arquivo `.env.local` sempre que um Codespace novo é aberto.

### 2. Editor Instantâneo no Navegador (`github.dev`)
Ideal para **edições rápidas de arquivos** em qualquer computador sem esperar container iniciar:
- Entre em [github.com/Luzaum/LuzaumGuidebook](https://github.com/Luzaum/LuzaumGuidebook) e aperte a tecla **`.` (ponto)** no teclado, **ou** acesse diretamente:
  👉 **[https://github.dev/Luzaum/LuzaumGuidebook](https://github.dev/Luzaum/LuzaumGuidebook)**
- O VS Code Web abrirá instantaneamente no navegador. Basta editar os arquivos e fazer **Commit & Push** na aba lateral de controle de versão.

### 3. Edição Direta pelo Site do GitHub
- Abra qualquer arquivo em [github.com/Luzaum/LuzaumGuidebook](https://github.com/Luzaum/LuzaumGuidebook) e clique no ícone de lápis (**Edit this file** / tecla `E`), edite e clique em **Commit changes...**.

---

## 📱 Módulos Clínicos Integrados (`modules/registry.ts`)

| Módulo | Rota Principal | Diretório | Descrição |
| :--- | :--- | :--- | :--- |
| **NutriçãoVET** | `/calculadora-energetica` | `modules/energia-vet` | Necessidades energéticas, organização de dietas e acompanhamento nutricional |
| **Fluidoterapia Vet** | `/fluidoterapia-vet` | `modules/fluidoterapia-vet` | Reposição, manutenção, perdas contínuas e protocolos de fluidoterapia |
| **Transfusão Sanguínea** | `/transfusao-sanguinea` | `modules/transfusao-sanguinea` | Planejamento transfusional, volume, compatibilidade e monitorização |
| **HemoGasoVet** | `/hemogasovet` | `modules/hemogasovet` | Interpretação de hemogasometria, equilíbrio ácido-base, eletrólitos e oxigenação |
| **Escalas de Dor** | `/dor` | `modules/escalas-dor` | Escalas de avaliação álgica e estruturação de analgesia por espécie |
| **Antibioticoterapia Vet** | `/antibioticoterapia` | `modules/antibioticoterapia-vet` | Escolha antimicrobiana por síndrome, espectro, dose, cultura e uso racional |
| **CRI VET** | `/crivet` | `modules/crivet` | Cálculo de infusões contínuas (CRI) com concentração, taxa e diluição |
| **Neurologia (NeuroVet)** | `/neurologia` | `modules/neurologia` | Exame neurológico passo a passo, neurolocalização e escala MGCS |
| **ConsultaVET & Receituário** | `/consulta-vet` | `modules/consulta-vet` | Doenças, medicamentos, apresentações comerciais, consensos, guias rápidos e receituário |

---

## 🛠️ Tecnologias Principais

- **React 19** + **TypeScript 5.8**
- **Vite 6** — Bundler e servidor de desenvolvimento com HMR
- **Tailwind CSS** + **Shadcn/UI** + **Radix UI** — Interface responsiva com suporte a Dark/Light/System Mode
- **Supabase (`@supabase/supabase-js`)** — Autenticação, banco de dados multi-clínica, consensos e catálogos clínicos
- **Three.js / React Three Fiber** — Visualizações 3D interativas
- **jsPDF / React-PDF** — Geração e leitura de documentos e receituários em PDF

---

## 📁 Estrutura do Projeto

```text
LuzaumGuidebook/
├── .devcontainer/          # Configuração do GitHub Codespaces (edição online na nuvem)
├── .github/workflows/      # CI/CD e Quality Gate (GitHub Actions)
├── components/             # Componentes globais de UI e navegação
├── layouts/                # Layouts principais da aplicação (AppLayout)
├── modules/                # Módulos clínicos especializados (ConsultaVET, CRI, Neuro, etc.)
│   └── registry.ts         # Registro centralizado de módulos ativos no Hub
├── pages/                  # Páginas de entrada (LandingPage, Hub, Neurologia, Crivet, etc.)
├── public/                 # Assets estáticos e ícones de módulos
├── scripts/                # Scripts de validação clínica, lint e automação
├── src/                    # Autenticação, cliente Supabase, rotas de conta e clínicas
├── supabase/               # Migrations e configurações do Supabase
├── tests/                  # Testes automatizados (Receituário, Nutrição, Segurança)
├── App.tsx                 # Roteamento principal da SPA
└── vite.config.ts          # Configuração do Vite (compatível com local e nuvem)
```

---

## 💻 Execução Local (Opcional)

Se estiver em um computador com o projeto clonado:

1. **Configurar variáveis de ambiente**:
   Copie `.env.example` para `.env.local` e preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Validação e Build de Produção**:
   ```bash
   npm run lint
   npm test
   npm run build
   ```
