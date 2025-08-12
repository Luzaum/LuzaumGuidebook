# Luzaum's Guidebook

Seu companheiro clínico, anestésico e cirúrgico. Uma plataforma elegante e profissional para ferramentas veterinárias.

## 🚀 Características

- **UI Moderna**: Interface elegante construída com Shadcn/UI e Tailwind CSS
- **Dark Mode**: Suporte completo para modo escuro e claro
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Intuitiva**: Sistema de navegação fluido e organizado por categorias
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
│   └── theme-toggle.tsx    # Toggle de tema
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
- **Primária**: Azul moderno com alta acessibilidade
- **Secundária**: Tons neutros para elementos secundários
- **Acentos**: Gradientes suaves e transições elegantes
- **Dark Mode**: Paleta otimizada para modo escuro

### Componentes
- **Cards**: Design limpo com sombras sutis e hover effects
- **Botões**: Múltiplas variantes (default, outline, ghost)
- **Navegação**: Menu dropdown elegante com categorias
- **Badges**: Indicadores de status coloridos
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

### Calculadoras
- ✅ **Calculadora Energética** - Cálculo de RER e MER
- ✅ **Fluidoterapia** - Protocolos de fluidoterapia
- ✅ **Transfusão Sanguínea** - Cálculos de transfusão

### Emergências
- ✅ **Emergências Veterinárias** - Protocolos de emergência

### Avaliações
- ✅ **Analgesia e Controle de Dor** - Escalas de dor

### Exames
- ✅ **Hemogasometria** - Interpretação de exames

### Apps Externos (Integração Futura)
- 🔄 **Guia de Antibióticos** - Terapia antibiótica
- 🔄 **Bulário Veterinário** - Formulário de medicamentos
- 🔄 **CRIVET** - Compatibilidade de medicamentos
- 🔄 **Quiz Residência** - Questões de residência

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

## 🔧 Como Adicionar Novos Apps

### 1. App Interno (Componente React)

1. Crie seu componente na raiz do projeto
2. Adicione ao array `appData` no `App.tsx`:

```typescript
{
  id: 'meu-app',
  name: "Meu App",
  icon: <MeuIcone />,
  implemented: true,
  description: "Descrição do app",
  category: "Calculadoras",
  color: 'bg-primary/10',
  component: MeuComponente
}
```

### 2. App Externo (URL)

```typescript
{
  id: 'app-externo',
  name: "App Externo",
  icon: <IconeExterno />,
  implemented: false,
  description: "Descrição do app externo",
  category: "Guias",
  color: 'bg-muted',
  externalUrl: '/caminho-para-app'
}
```

## 🎯 Melhorias Implementadas

### UI/UX
- ✅ Design moderno e profissional
- ✅ Dark mode completo
- ✅ Navegação intuitiva
- ✅ Responsividade completa
- ✅ Animações suaves
- ✅ Feedback visual claro

### Arquitetura
- ✅ Componentes reutilizáveis
- ✅ Sistema de tipos TypeScript
- ✅ Estrutura modular
- ✅ Configuração centralizada
- ✅ Preparado para escalabilidade
- ✅ Sistema de temas robusto

### Performance
- ✅ Lazy loading de componentes
- ✅ Otimização de imagens
- ✅ CSS otimizado com OKLCH
- ✅ Build otimizado
- ✅ Transições suaves

## 🔮 Próximos Passos

1. **Integração de Apps Externos**: Conectar com outros projetos
2. **PWA**: Funcionalidade offline
3. **Analytics**: Métricas de uso
4. **Backend**: Sistema de usuários e dados
5. **Mais Temas**: Temas personalizados

## 📄 Licença

Este projeto é desenvolvido para uso veterinário e educacional.

---

**Desenvolvido com ❤️ para a comunidade veterinária**
