# Guia de Integração - Luzaum's Guidebook

Este guia explica como integrar seus outros aplicativos veterinários ao Luzaum's Guidebook.

## 🎯 Visão Geral

O Luzaum's Guidebook foi projetado para ser o hub central de todos os seus aplicativos veterinários. Ele oferece duas formas de integração:

1. **Integração Interna**: Apps que rodam dentro do Guidebook
2. **Integração Externa**: Apps que abrem em nova aba/janela

## 🔗 Integração Externa (Recomendada)

### Para Apps Existentes (CRIVET, Neurologia, etc.)

1. **Configure o roteamento** no seu app principal para aceitar navegação externa
2. **Adicione o app** ao array `appData` no `App.tsx`:

```typescript
{
  id: 'meu-app-externo',
  name: "Meu App Externo",
  icon: <MeuIcone />,
  implemented: false,
  description: "Formulário completo de medicamentos",
  category: "Guias",
  color: 'bg-teal-100',
  externalUrl: '/MeuAppExterno', // URL do seu app
  status: 'available'
}
```

3. **Configure o servidor** para servir os apps nas rotas corretas

### Exemplo de Configuração de Servidor

```javascript
// Exemplo com Express.js
app.use('/MeuAppExterno', express.static('path/to/MeuAppExterno/dist'));
app.use('/CRIVET', express.static('path/to/CRIVET/dist'));
app.use('/Antibioticoterapia', express.static('path/to/Antibioticoterapia/dist'));
```

## 🔧 Integração Interna

### Para Novos Apps

1. **Crie o componente** seguindo a interface padrão:

```typescript
interface AppComponentProps {
  onBack: () => void;
}

const MeuApp: React.FC<AppComponentProps> = ({ onBack }) => {
  return (
    <div>
      {/* Seu app aqui */}
      <button onClick={onBack}>Voltar</button>
    </div>
  );
};
```

2. **Adicione ao App.tsx**:

```typescript
import MeuApp from './MeuApp';

// No array appData:
{
  id: 'meu-app',
  name: "Meu App",
  icon: <MeuIcone />,
  implemented: true,
  description: "Descrição do app",
  category: "Calculadoras",
  color: 'bg-green-100',
  component: MeuApp
}
```

## 🎨 Padronização Visual

### Para Manter Consistência

1. **Use os componentes Shadcn/UI** disponíveis:
   - `Button` do `./components/ui/button`
   - `Card` do `./components/ui/card`
   - `Badge` do `./components/ui/badge`

2. **Siga a paleta de cores**:
   - Verde primário: `#16a34a`
   - Azul secundário: `#2563eb`
   - Classes Tailwind: `bg-green-100`, `text-green-700`, etc.

3. **Use o Layout** para consistência:

```typescript
import Layout from './components/Layout';

const MeuApp = ({ onBack }) => {
  return (
    <Layout onBack={onBack} title="Meu App">
      {/* Conteúdo do app */}
    </Layout>
  );
};
```

## 📱 Responsividade

### Boas Práticas

1. **Use classes responsivas** do Tailwind:
   ```html
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
   ```

2. **Teste em diferentes tamanhos**:
   - Mobile: 320px - 768px
   - Tablet: 768px - 1024px
   - Desktop: 1024px+

3. **Use flexbox e grid** para layouts adaptativos

## 🔄 Estado e Navegação

### Gerenciamento de Estado

1. **Use o estado do App principal** para navegação
2. **Implemente o callback `onBack`** para voltar ao menu
3. **Mantenha o estado local** do seu app independente

### Exemplo de Navegação

```typescript
const MeuApp = ({ onBack }) => {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack(); // Volta ao menu principal
    }
  };

  return (
    <Layout onBack={handleBack} title="Meu App">
      {/* Conteúdo baseado no step */}
    </Layout>
  );
};
```

## 🚀 Deploy e Configuração

### Estrutura de Pastas Recomendada

```
projeto-principal/
├── LuzaumGuidebook/          # Hub principal
├── MeuAppExterno/           # App externo
├── CRIVET/                  # App externo
├── Antibioticoterapia/      # App externo
└── server.js                # Servidor para servir todos os apps
```

### Configuração de Build

1. **Build cada app** separadamente
2. **Configure o servidor** para servir nas rotas corretas
3. **Use um proxy reverso** (nginx) para produção

### Exemplo de nginx

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        root /path/to/LuzaumGuidebook/dist;
        try_files $uri $uri/ /index.html;
    }

    location /MeuAppExterno {
        alias /path/to/MeuAppExterno/dist;
        try_files $uri $uri/ /index.html;
    }

    location /CRIVET {
        alias /path/to/CRIVET/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

## 🧪 Testes

### Checklist de Integração

- [ ] App abre corretamente no Guidebook
- [ ] Navegação funciona (voltar ao menu)
- [ ] Design é responsivo
- [ ] Cores e estilos são consistentes
- [ ] Performance está boa
- [ ] Funciona em diferentes navegadores

## 📞 Suporte

Para dúvidas sobre integração:

1. Verifique este guia
2. Consulte o README.md principal
3. Analise os exemplos existentes no código
4. Teste a integração em ambiente de desenvolvimento

---

**Lembre-se**: O objetivo é criar uma experiência unificada e profissional para a comunidade veterinária! 🐾
