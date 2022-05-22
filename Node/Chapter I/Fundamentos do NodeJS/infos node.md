# Fundamentos do NodeJS

- Arquitetura Event Loop
    - Call Stack (pilha: LIFO)
- Single-Thread
- Non-blocking I/O
- Módulos próprios
    - http
    - dns
    - fs (file system)
    - buffer

## Event Loop

O Event Loop é single-thread, ele fica ouvindo as requisições, mas no momento que ele recebe ele distribui para uma das quatro ou mais threads disponíveis.

## Gerenciadores de pacotes

- NPM e Yarn
- Instalar bibliotecas externas
- Disponibilizar bibliotecas

# Frameworks

- Expressa
- Egg.js (funciona junto com o Coa)
- Nest.js
- Adonis.js

## API - Application Programming Interface

### API

### REST » Representation State Transfer (Transferência Representacional de Estado)
- Modeloe de arquitetura
- 6 regras
    - `1- Client-Server` » separar as responsabilidades
    - `2- Stateless` » o cli por realizar quantas req quiser ao server, mas este não armazena nenhum estado o sessão das reqs, então precisamos passar sempre todas as infos necessárias para que ela seja processada
    - `3- Cache` » precisamos disponibilizar a possibilidade da implementação de cache
    - `4 - Iterface Uniforme` » como o server e cli vão compartilhar essa interface (como se fosse um contrato)
        - Identificação dos recursos
            - http://enderecoserver.com/products
            - http://enderecoserver.com/clients
        - Representação dos recursos (JSON, XML, HTML, ...)
        - Mensagens auto-descritivas
        - HATEOAS (Hypertext as the Engine of Application State) » retornar links dentro da requisição
    - `5 - Camadas` » permitir que existam camadas entre o cli e o server (balanceamente de cargas, segurança, etc)
    - `6 - Código sob Demanda` (opcional) » permite que  as funcionalidades do cli sejam estendidas na forma de scripts ou mini-aplicativos

### Métodos de Requisições - HTTP Verbs

- GET - leitura
- POST - criação
- PUT - atualização
- DELETE - deleção
- PATCH - atualização parcial (alterar uma info específica)

### HTTP Codes

- `1XX`: Informativo » a solicitação foi aceita ou o processo continua em andamento
- `2XX`: Confirmação
    - 200 - Requisição bem sucedida
    - 201 - Created - geralmente usado para POST após uma inserção
- `3XX`: Redirecionamento
    - 301 - Moved Permanently
    - 302 - Moved
- `4XX`: Erro do cliente
    - 400 - Bad Request
    - 401 - Unauthorized
    - 403 - Forbidden
    - 400 - Not Found
    - 422 - Unprocessable Entity
- `5XX`: Erro no servidor » o server falhou ao concluir a solicitação
    - 500 - Internal Server Error
    - 502 - Bad Gateway

### Parâmetros das Requisições

- `Header Paramns`
    ```
    authority: app.rocketseat.com.br
    methor: GET
    path: /api/journey-nodes
    scheme: https
    referer: https://app.rocketseat.com.br/node/
    ```
- `Query Params` » paginação / filtro
    - http://enderecoserver.com/v1/users?page=2&limit=50
    - Onde segue o formato: ? CHAVE1=VALOR & CHAVE2=VALOR
        Sendo & a separação de cada par de chave e valor
- `Route Params` » identificar um recurso para editar/deletar/buscar
    - http://enderecoserver.com/v1/users/{id}
- `Body Params` » os objetos para inserção/alteração (JSON)
```json
{
    "name": "Daniele",
    "username": "dani"
}
```
    - Precisa ativar o Middlweware `app.use(express.json());` nas configs do Express:
    - E enviar o header `Content-Type: application/json` :

### Boas práticas API REST

- A utilização correta dos métodos HTTP
- A utilização correta dos status no retorno das respostas
- Padrão de nomenclatura
    - Busca de users - GET
        - http://enderecoserver.com/v1/users
    - Busca de user por ID - GET
        - http://enderecoserver.com/v1/users/1
    - Busca de endereço do user - GET
        - http://enderecoserver.com/v1/users/1/address
    - Deleção de um user - DELETE
        - http://enderecoserver.com/v1/users/1
    - Alteração do status do user - PATCH
        - http://enderecoserver.com/v1/users/1/status

## Projeto fundamentos-nodejs

Pasta do projeto: `fundamentos-nodejs`
Iniciar projeto Node » dentro da pasta do projeto:
```
yarn init -y
```

Express (micro-framework)
- gerenciamento de rotas
- criar server
- middlewares

Instalar Express
```
yarn add express
```

Outros pacotes instalados
- Nodemon » yarn add nodemon -D