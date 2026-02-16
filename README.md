# Sistema de Cadastro de Produtos
Backend desenvolvido em Node.js + Express, com persistência em MySQL, responsável por realizar operações CRUD de produtos, incluindo upload e gerenciamento de imagens no servidor.

# Objetivo do Projeto
Construir uma API organizada seguindo boas práticas:
1. Separação de responsabilidades (Routes → Controllers → Middlewares)
2. Manipulação de arquivos (upload e exclusão de imagens)
3. Tratamento estruturado de erros
4. Organização orientada a escalabilidade

# Tecnologias utilizadas: 
1. Backend:
    Node.js
    Express
    mysql2 (Conexão)
2. Front:
    Handlebars
    CSS
    Bootstrap
3. Banco de Dados:
    MySQL
4. Outras Ferramentas:
    express-fileupload (ou similar)
    dotenv
    path
    fs  (File System)
    Eslint
    Git

# Instalação
1. Clonar o projeto:
    git clone <url-do-repositorio>
2. Instalar dependências:
    npm install
3. Estrutura do Banco de Dados:
    => Exemplo de tabela:
    CREATE TABLE produtos (
        codigo INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        valor DECIMAL(10,2) NOT NULL,
        imagem VARCHAR(255)
    );

# Funcionalidades
1. Criar Produto:
    Recebe nome, valor e imagem. Salva dados no banco, move imagem para uma pasta local chamada: "banco-imagens".
2. Listar Produtos:
    Retorna todos os produtos já cadastrados na página princiapl do projeto.
3. Atualização de produtos:
    Atualiza nome, valor ou imagem tanto no banco de dados quanto na página.
4. Deleta produtos:
    Remove registro do produto no banco e na interface, além de deletar a imagem selecionada e movida para a pasta local "banco-imagens".
5. Upload de Imagens:
    O sistema valida: Existência do arquivo, nome do arquivo, movimentação com .mv() e exclusão com fs.unlink().

# Executar o Projeto
    "npm run dev" ou "node server.js".
    Servidor rodando em: http://localhost:3000.

# Aprendizados do Projeto:
1. Conexão do banco de dados MySQL com Node.js.
2. Estruturação de códgio Handlebars.
3. Middlewares e error.
4. Construção mais ampla de arquivos do projeto.
5. Re-organização do projeto passado em aula.
6. Tratamentos de Erros.
7. Comandos SQL básicos.

# Licença
Projeto desenvolvido apenas para fins educacionais.

Obrigado pela atenção!