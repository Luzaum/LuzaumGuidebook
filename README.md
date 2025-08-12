# Luzaum's Guidebook

Seu companheiro clínico, anestésico e cirúrgico. Uma plataforma elegante e profissional para ferramentas veterinárias.

## 🚀 Características

- **UI Moderna**: Interface elegante construída com Shadcn/UI e Tailwind CSS
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

## 📁 Estrutura do Projeto

```
LuzaumGuidebook/
├── components/
│   ├── ui/                 # Componentes Shadcn/UI
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── navigation-menu.tsx
│   ├── Layout.tsx          # Layout principal
│   ├── HeroSection.tsx     # Seção hero da página inicial
│   ├── AppCard.tsx         # Card dos aplicativos
│   └── AppIntegration.tsx  # Integração de apps externos
├── lib/
│   └── utils.ts           # Utilitários (cn function)
├── App.tsx                # Componente principal
├── index.tsx              # Entry point
├── index.css              # Estilos globais
├── tailwind.config.js     # Configuração do Tailwind
└── vite.config.ts         # Configuração do Vite
```

## 🎨 Design System

### Cores
- **Primária**: Verde (#16a34a) - Representa saúde e natureza
- **Secundária**: Azul (#2563eb) - Representa confiança e tecnologia
- **Acentos**: Gradientes suaves entre verde e azul

### Componentes
- **Cards**: Design limpo com sombras sutis e hover effects
- **Botões**: Múltiplas variantes (default, outline, ghost)
- **Navegação**: Menu dropdown elegante com categorias
- **Badges**: Indicadores de status coloridos

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
  color: 'bg-green-100',
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
  color: 'bg-blue-100',
  externalUrl: '/caminho-para-app',
  status: 'available'
}
```

## 🎯 Melhorias Implementadas

### UI/UX
- ✅ Design moderno e profissional
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

### Performance
- ✅ Lazy loading de componentes
- ✅ Otimização de imagens
- ✅ CSS otimizado
- ✅ Build otimizado

## 🔮 Próximos Passos

1. **Integração de Apps Externos**: Conectar com outros projetos
2. **Sistema de Temas**: Modo escuro/claro
3. **PWA**: Funcionalidade offline
4. **Analytics**: Métricas de uso
5. **Backend**: Sistema de usuários e dados

## 📄 Licença

Este projeto é desenvolvido para uso veterinário e educacional.

---

**Desenvolvido com ❤️ para a comunidade veterinária**
