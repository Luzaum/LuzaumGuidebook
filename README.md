# Vetius

SEU COMPANHEIRO CLÍNICO, ANESTÉSICO E CIRÚRGICO, SEMPRE QUE PRECISAR, NA PALMA DAS MÃOS!

## 🚀 Características

- **UI Moderna**: Interface elegante construída com Shadcn/UI e Tailwind CSS
- **Dark Mode**: Suporte completo para modo escuro e claro
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Intuitiva**: Sistema de navegação fluido
- **Integração de Apps**: Preparado para integrar todos os seus aplicativos veterinários
- **Performance Otimizada**: Carregamento rápido e experiência suave

## 🛠️ Tecnologias

- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/UI** - Componentes de interface
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Vite** - Build tool
- **OKLCH Colors** - Sistema de cores moderno

## 📁 Estrutura do Projeto

```
LuzaumGuidebook/
├── components/
│   ├── ui/                 # Componentes Shadcn/UI
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── navigation-menu.tsx
│   │   └── dropdown-menu.tsx
│   ├── Layout.tsx          # Layout principal
│   ├── HeroSection.tsx     # Seção hero da página inicial
│   ├── AppCard.tsx         # Card dos aplicativos
│   ├── AppIntegration.tsx  # Integração de apps externos
│   ├── theme-provider.tsx  # Gerenciamento de tema
│   ├── theme-toggle.tsx    # Toggle de tema
│   └── Logo.tsx            # Componente de logo com fallback
├── lib/
│   └── utils.ts           # Utilitários (cn function)
├── App.tsx                # Componente principal
├── index.tsx              # Entry point
├── index.css              # Estilos globais
├── tailwind.config.js     # Configuração do Tailwind
└── vite.config.ts         # Configuração do Vite
```

## 🎨 Design System

### Cores (OKLCH)
- **Primária**: Verde de UI
- **Background**: Branco (claro) / Escuro (escuro)
- **Acentos**: Gradientes verdes e transições elegantes
- **Dark Mode**: Paleta otimizada para modo escuro

### Componentes
- **Cards**: Design limpo com sombras sutis e hover effects
- **Botões**: Múltiplas variantes (default, outline, ghost)
- **Badges**: Indicadores de status com sombra suave
- **Theme Toggle**: Seletor de tema com animações

## 🌙 Dark Mode

O aplicativo suporta três modos de tema:

1. **Light Mode**: Tema claro padrão
2. **Dark Mode**: Tema escuro para ambientes com pouca luz
3. **System**: Segue automaticamente a preferência do sistema

### Como Usar
- Clique no ícone de sol/lua no cabeçalho
- Selecione entre Light, Dark ou System
- A preferência é salva automaticamente

## 📱 Apps Integrados

- ✅ **Calculadora Energética**
- ✅ **Fluidoterapia**
- ✅ **Transfusão Sanguínea**
- ✅ **Emergências Veterinárias**
- ✅ **Analgesia e Controle de Dor**
- ✅ **Hemogasometria**

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Build para produção**:
   ```bash
   npm run build
   ```

## 🖼️ Logo do app

Coloque sua imagem em `public/logo-vetius.png` (PNG, fundo transparente recomendado). O app faz fallback automático para a logo anterior se o arquivo não existir.
