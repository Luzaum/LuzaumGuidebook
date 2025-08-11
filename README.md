# 🐾 Luzaum's Guidebook

**Seu companheiro clínico, anestésico e cirúrgico veterinário**

Um aplicativo web completo que reúne múltiplas ferramentas veterinárias em uma única plataforma, desenvolvido para auxiliar profissionais da medicina veterinária em suas práticas clínicas.

## ✨ Características

### 🧮 Calculadoras Clínicas
- **Calculadora Energética**: Cálculo de necessidades energéticas para cães e gatos
- **Calculadora de Fluidoterapia**: Protocolos de fluidoterapia e reidratação
- **Calculadora de Transfusão Sanguínea**: Cálculos para transfusões
- **Análise de Hemogasometria**: Interpretação de exames laboratoriais

### 🚨 Emergências
- **Guia de Emergências Veterinárias**: Protocolos de emergência integrados

### 📊 Avaliações e Escalas
- **Escalas de Dor**: Ferramentas para avaliação de dor em animais
- **Analgesia**: Guias de controle de dor

### 🔬 Ferramentas em Desenvolvimento
- Calculadora CRI (Infusão Contínua)
- Calculadora de Toxicidade
- Guia de Antibióticos
- Doses Plumb's
- Escala de Coma Glasgow
- Estadiamento IRIS
- Quiz Residência Vet

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS
- **Validação**: Zod
- **Formulários**: React Hook Form
- **Linting**: ESLint
- **Formatação**: Prettier

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/luzaum-guidebook.git
cd luzaum-guidebook
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
```

4. **Acesse o aplicativo**
```
http://localhost:5173
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza o build de produção

# Qualidade de código
npm run lint         # Executa o linter
npm run lint:fix     # Corrige problemas de linting automaticamente
npm run format       # Formata o código com Prettier
npm run type-check   # Verifica tipos TypeScript
```

## 🏗️ Estrutura do Projeto

```
luzaum-guidebook/
├── components/          # Componentes reutilizáveis
│   ├── Notification.tsx
│   └── SafeInput.tsx
├── hooks/              # Hooks personalizados
│   └── useNotification.ts
├── utils/              # Utilitários e validações
│   └── validation.ts
├── App.tsx             # Componente principal
├── CalculadoraEnergetica.tsx
├── Fluidoterapia.tsx
├── Hemogasometria.tsx
├── TransfusaoSanguinea.tsx
├── EscalasDeDorScreen.tsx
├── EmergenciasVet.tsx
└── package.json
```

## 🔒 Segurança e Validação

O aplicativo implementa várias camadas de segurança:

- **Validação de entrada**: Todos os campos numéricos são validados
- **Sanitização**: Strings são sanitizadas para prevenir XSS
- **Validação de URLs**: Imagens são validadas antes do carregamento
- **Cálculos seguros**: Funções de cálculo com tratamento de erros
- **TypeScript**: Tipagem forte para prevenir erros em runtime

## ♿ Acessibilidade

- **ARIA labels**: Elementos interativos com labels apropriados
- **Navegação por teclado**: Suporte completo para navegação sem mouse
- **Contraste**: Cores com contraste adequado
- **Screen readers**: Compatível com leitores de tela

## 🎨 Interface e UX

- **Design responsivo**: Funciona em desktop, tablet e mobile
- **Lazy loading**: Componentes carregados sob demanda
- **Error boundaries**: Tratamento elegante de erros
- **Loading states**: Indicadores de carregamento
- **Notificações**: Sistema de notificações não-intrusivo

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript para todos os novos arquivos
- Siga as regras do ESLint
- Formate o código com Prettier
- Escreva testes para novas funcionalidades
- Documente funções complexas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte, envie um email para [seu-email@exemplo.com] ou abra uma issue no GitHub.

## 🙏 Agradecimentos

- Comunidade veterinária brasileira
- Contribuidores do projeto
- Bibliotecas open source utilizadas

---

**Desenvolvido com ❤️ para a medicina veterinária brasileira**
