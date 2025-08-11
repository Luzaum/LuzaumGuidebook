import React from 'react';

/**
 * EmergenciasVet
 * 
 * Este componente exibe a página web de emergências veterinárias dentro do aplicativo usando um <iframe>.
 * É projetado para integrar a ferramenta existente sem precisar recriá-la.
 * 
 * @param {object} props - As propriedades do componente.
 * @param {() => void} props.onBack - Função para ser chamada quando o botão 'Voltar' é clicado,
 *                                    permitindo a navegação de volta para a lista de aplicativos.
 */
const EmergenciasVet = ({ onBack }: { onBack: () => void }) => {
  return (
    // O contêiner principal usa Flexbox para organizar o layout.
    // 'flex-col' empilha os filhos verticalmente.
    // 'h-screen' garante que o contêiner ocupe a altura total da tela.
    <div className="flex flex-col h-screen bg-gray-50">
      
      {/* Cabeçalho da tela, contendo o botão de voltar e o título. */}
      <header className="p-4 bg-white shadow-md flex-shrink-0">
        <div className="flex items-center max-w-4xl mx-auto">
          {/* Botão para navegar de volta à tela anterior, utiliza a função onBack passada como prop. */}
          <button 
            onClick={onBack} 
            className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
            aria-label="Voltar para a lista de aplicativos"
          >
            &larr; Voltar para a Lista
          </button>
          
          {/* Título da tela, exibido ao lado do botão de voltar. */}
          <h1 className="text-xl font-bold text-gray-800 ml-4">
            Emergências Veterinárias
          </h1>
        </div>
      </header>
      
      {/* O contêiner principal para o iframe. 'flex-grow' faz com que ele ocupe todo o espaço vertical restante. */}
      <main className="flex-grow">
        {/* O componente <iframe> é o elemento HTML padrão para incorporar documentos externos. */}
        <iframe
          // A propriedade 'src' especifica a URL da página a ser incorporada.
          src="https://emergencias-vet.netlify.app"
          // O 'title' é importante para acessibilidade, descrevendo o conteúdo do iframe para leitores de tela.
          title="Ferramenta externa de Emergências Veterinárias"
          // Classes de estilo para garantir que o iframe preencha completamente seu contêiner pai ('main').
          className="w-full h-full border-0"
        />
      </main>
    </div>
  );
};

export default EmergenciasVet;
