# Módulo: Animais Peçonhentos (AAP2)

Este módulo fornece ferramentas clínicas para diagnóstico e tratamento de acidentes com animais peçonhentos em pequenos animais. Integrado ao projeto Vetius.

## Funcionalidades

1.  **Bulário Peçonhento**: Catálogo detalhado de animais, com fotos (IA e estáticas), sinais clínicos, e dados toxicológicos.
2.  **Ferramenta de Suspeitas**: Algoritmo de diagnóstico diferencial baseado em sinais clínicos imputados.
3.  **Protocolos de Tratamento**: Guias passo-a-passo para tratamento de acidentes botrópicos, crotálicos, elapídicos, etc.
4.  **Integração com IA**: Análise de casos clínicos e geração de imagens via Google Gemini/Imagen.

## Estrutura

- `components/`: Componentes React divididos por funcionalidade (Bulário, Suspeitas, Tratamentos).
- `data/`: Bases de dados estáticas (animais, protocolos, explicações).
- `hooks/`: Lógica de negócio reutilizável (diagnóstico, cache).
- `services/`: Comunicação com APIs externas (IA).
- `styles/`: Tokens de design e CSS específico do módulo.
- `types/`: Definições de tipos TypeScript.

## Configuração da API de IA

O serviço de IA (`services/aiService.ts`) espera endpoints de backend para processar as requisições, a fim de proteger as chaves de API.

As chamadas padrão são:
- `POST /api/analysis`: Para análise de caso clínico.
- `POST /api/image`: Para geração de imagens.

### Fallback
O serviço inclui um fallback para Netlify Functions se os endpoints acima falharem:
- `/.netlify/functions/generate-analysis`

Certifique-se de que o backend do Vetius ou as Serverless Functions estejam configurados corretamente com as credenciais do Google AI Studio.
