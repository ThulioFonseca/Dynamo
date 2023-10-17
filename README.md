# Projeto de Automação Modular

Bem-vindo ao Projeto Dynamo ! Este é um projeto pessoal desenvolvido por Thulio Fonseca para criar um sistema de automação modular usando React.js e o framework Vite no frontend. O projeto permite a conexão com um ESP32 via WebSockets para ler dados de sensores e enviar comandos para o microcontrolador.

## Visão Geral

O Dynamo visa criar uma solução flexível e personalizável para automação e monitoramento. Este projeto oferece uma interface web baseada em React.js que se conecta a um microcontrolador ESP32 por meio de WebSockets. Isso permite monitorar sensores e controlar dispositivos remotamente.

## Tecnologias Principais

- **React.js**: O frontend do projeto é construído com React, uma biblioteca JavaScript popular para criar interfaces de usuário.

- **Vite**: Vite é um framework JavaScript/TypeScript que é usado como ambiente de desenvolvimento para criar a interface do usuário do projeto.

- **WebSockets**: A comunicação em tempo real entre o frontend e o ESP32 é realizada via WebSockets, possibilitando a troca de informações em tempo real.

## Funcionalidades

- **Leitura de Sensores**: O projeto permite a leitura de dados de sensores conectados ao ESP32, como sensores de temperatura, umidade, luminosidade e outros.

- **Controle de Dispositivos**: Os usuários podem controlar dispositivos conectados ao ESP32, como lâmpadas, relés, eletrodomésticos e muito mais, diretamente pela interface web.

- **Modularidade**: O projeto é projetado para ser modular, permitindo adicionar facilmente novos sensores e dispositivos à medida que as necessidades evoluem.

- **Personalização**: Os usuários podem personalizar a interface e as configurações de acordo com suas preferências e necessidades específicas.

## Instalação

Para executar o projeto localmente, siga as etapas abaixo:

1. Clone o repositório:

git clone https://github.com/ThulioFonseca/Dynamo.git

2. Navegue até a pasta do projeto:

cd dynamo

3. Instale as dependências:

npm install

4. Inicie o servidor de desenvolvimento:

npm run dev

5. O projeto estará disponível em `http://localhost:5173`.

## Contribuição

Este projeto é mantido por Thulio Fonseca e é desenvolvido de forma independente. No entanto, contribuições e sugestões são bem-vindas. Se você deseja contribuir, sinta-se à vontade para criar uma nova ramificação (branch) e enviar uma solicitação de pull (pull request).

## Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

---

**Nota**: Este projeto está em fase inicial de desenvolvimento e pode conter bugs ou funcionamento limitado. Se você encontrar problemas ou tiver sugestões, entre em contato com Thulio Fonseca.
