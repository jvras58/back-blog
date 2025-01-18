# Blog - desafio Vlab

## 📖 Sobre o Projeto
API REST desenvolvida para um sistema de blog, utilizando Express.js com Prisma ORM para gerenciamento do banco de dados PostgreSQL.

### Padrão de projeto

- ``Model-View-Controller (MVC)`

- **Model**: Representado pelos modelos do Prisma definidos em `schema.prisma`
- **View**: Não há uma camada de visualização(pois este é um projeto de API REST) As respostas JSON servem como a "view".
- **Controller**: Implementado nos controladores, como posts.controller.ts
- **Middleware**: Para autenticação `auth.middleware.ts`
- **Configuração**: Separação de configurações de log em `logs.ts`
- **Roteamento**: Definição de rotas em `posts.routes.ts.`

## 🚀 Tecnologias e Ferramentas


| **Tecnologia**        | **Versão**       |
|-----------------------|------------------|
| **Runtime**           |                  |
| Node.js               | v20.x.x          |
| **Framework**         |                  |
| Express               | v4.x.x           |
| **Banco de Dados**    |                  |
| prisma                | v6.x.x           |
| **Devtime**           |                  |
| npm                   | v9.x.x           |

### Dependências Principais
- **jsonwebtoken** - Autenticação JWT
- **bcryptjs** - Criptografia de senhas
- **cors** - Middleware para CORS
- **morgan** - Logger de requisições HTTP
- **dotenv** - Gerenciamento de variáveis de ambiente

## Organização do Projeto:
```
    /
    ├── 📄 README.md
    ├── 📄 docker-compose.yml
    ├── {} package.json
    ├── {} tsconfig.json
    ├── .env-sample
    ├── 📁 prisma/
    │   └── schema.prisma
    |   └── 🇹 seed.ts
    └── 📁 src/
        ├── 🇹 app.ts
        ├── 🇹 auth.middleware.ts
        ├── 📁 config/
        │   └── 🇹 logs.ts
        ├── 📁 lib/
        │   └── 🇹 db.ts
        └── 📁 post/
            ├── 🇹 posts.controller.ts
            └── 🇹 posts.routes.ts

```

## 🛠️ Funcionalidades

### Posts
- ✅ Criação de posts
- 📖 Listagem de posts (público e privado)
- 📝 Atualização de posts
- 🗑️ Deleção de posts
- 🏷️ Suporte a tags e categorias

### Autenticação
- 🔐 Sistema de autenticação JWT
- 👤 Proteção de rotas
- 🔑 Middleware de autenticação

## 💻 Configuração do Ambiente de Desenvolvimento LOCAL:

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo 

```.env-sample``` para ```.env```


4. Execute o container com o postgresql:
```bash
docker run --name backend_vlab -e POSTGRES_USER=backend -e POSTGRES_PASSWORD=backend@123 -e POSTGRES_DB=backend -p 5432:5432 -d postgres
```

5. Execute as migrações do Prisma:
```bash
npm run postinstall
npm run migrate
```
> Isso aplicará todas as alterações definidas no arquivo `schema.prisma`

```bash
# Sincronize o prisma:
npm run prisma db push
```

6. Popule o banco de dados com dados iniciais:
```bash
npm run seed
```
> Esta etapa criará registros básicos necessários para testar a aplicação


7. Inicie os tests:
```bash
npm test

# ou

npm run test:coverage
```
> usar o test:coverage irá iniciar os testes em modo coverage para analise mais detalhadas.

8. Inicie o ambiente de desenvolvimento:
```bash
npm run dev
```
> O servidor será iniciado em modo de desenvolvimento com hot-reload

9. Visualize o funcionamento da API:
```
http://localhost:4000/
```
   > A página home será carregada

## 🛠️ Configuração do Ambiente de Desenvolvimento DOCKER:
Este repositório está configurado para rodar em um **compose.yml**. Siga os passos abaixo para instanciar o ambiente.

### Docker Engine

É necessário ter o Docker Engine instalado. Veja o guia de instalação para seu sistema operacional [aqui](https://docs.docker.com/engine/install/).

1. Utilize o .env:


2. Inicialize o **compose.yml**:
```bash
docker compose -f compose.dev.yml up -d
```
ou para executar em prod:
```bash
docker compose --env-file .env.prod -f compose.prod.yml up -d
```
   > As configurações faram todo o trabalho para rodar em modo detalhado: docker compose up

3. Visualize o funcionamento da API:
```
http://localhost:4000/
```
   > A página home será carregada

## 🔃 Rotas da API

### Posts
- `GET /posts/public` - Lista todos os posts (público)
- `POST /posts` - Cria novo post (autenticado)
- `GET /posts` - Lista posts do usuário (autenticado)
- `PUT /posts/:id` - Atualiza um post (autenticado)
- `DELETE /posts/:id` - Deleta um post (autenticado)

## ⚙️ Configurações

### Banco de Dados
- PostgreSQL rodando em container Docker
- Prisma como ORM para gerenciamento do banco
- Modelo de dados com suporte a usuários e posts

### Ambiente de Desenvolvimento
- TypeScript para desenvolvimento
- ts-node-dev para hot-reload
- ESLint e Prettier para padronização de código

### Logs
- Morgan para logging de requisições
- Diferentes modos de log (development/production)


### Problema com docker

Ao usar o `docker-compose.yml`, dependendo do sistema operacional, é necessário ajustar a variável `DB_HOST` nas variáveis de ambiente. 

#### Configuração no Linux:

```bash
DB_USER="backend"
DB_PASSWORD="backend123"
DB_NAME="backend"
DB_HOST="postgres"
DB_PORT="5432"

DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
```

#### Configuração no Windows:

```bash
DB_USER="backend"
DB_PASSWORD="backend123"
DB_NAME="backend"
DB_HOST="host.docker.internal"
DB_PORT="5432"

DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
```

A principal diferença é o valor da variável `DB_HOST`.