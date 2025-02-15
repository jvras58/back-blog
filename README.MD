# backBLOG - BACKEND

## 📖 Sobre o Projeto
API REST desenvolvida para ........., utilizando Express.js com Prisma ORM para gerenciamento do banco de dados PostgreSQL.

### Padrão de projeto

- **Model**: Representado pelos modelos do Prisma definido em `schema.prisma`
- **Teste Unitario**: Implementado com o jest, como `xxxxx.controller.test.ts`
- **Controller**: Implementado nos controladores, como `xxxxx.controller.ts`
- **Roteamento**: Definição de rotas em `xxxx.routes.ts.`
- **Middleware**: Para autenticação `auth.middleware.ts`
- **Configuração**: Separação de configurações de log em `logs.ts`


## 🚀 Tecnologias e Ferramentas


| **Tecnologia**        | **Versão**       |
|-----------------------|------------------|
| **Runtime**           |                  |
| Node.js               | v20.x.x          |
| **Framework**         |                  |
| Express               | v4.21.2          |
| **Banco de Dados**    |                  |
| prisma                | v6.2.1           |
| postgresql            |                  |
| **Devtime**           |                  |
| npm                   | v9.x.x           |
| docker engine         |                  |

### Dependências Principais
- **express** - Framework web para criação de APis REST
- **jsonwebtoken** - Autenticação JWT
- **bcryptjs** - Criptografia de senhas
- **cors** - Middleware para CORS
- **morgan** - Logger de requisições HTTP
- **dotenv** - Gerenciamento de variáveis de ambiente

## Organização do Projeto:
```
    /
    ├── 📄 README.md
    ├── 📄 compose.yml
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
        │   |── 🇹 logs.ts
        │   |── 🇹 env.ts
        │   └── 🇹 swagger.ts
        |
        ├── 📁 docs/
        |   └── 🇹 docs.routes.ts          
        |
        ├── 📁 modulo_exemple/
        │   |── 🇹 exemple.controller.test.ts
        |   |── 🇹 exemple.controller.ts
        |   └── 🇹 exemple.routes.ts  
        ├── 📁 lib/
        │   └── 🇹 db.ts

```

## 🛠️ Funcionalidades

### 📖 Documentação
> Documentação com Swagger Usando OpenAPI v3

### generativeAi
- ✅ Testagem com rota de ping
- 📖 Listagem

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
docker run --name postgres -e POSTGRES_USER=backend -e POSTGRES_PASSWORD=backend123 -e POSTGRES_DB=backend -p 5432:5432 -d postgres
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
> Esta etapa criará registros básicos necessários para testar a aplicação em modo dev


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

```
http://localhost:4000/docs
```
> A página do swagger será carregada

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
> As configurações faram todo o trabalho para rodar em modo detalhado: so retirar a flag -d

> já para finalizar o serviço utiliza-se a flag -f com o nome do compose rodado por exemplo: `docker compose -f compose.dev.yml down`

3. Visualize o funcionamento da API:
```
http://localhost:4000/
```
> A página home será carregada

```
http://localhost:4000/docs
```
> A página do swagger será carregada

## 🔃 Rotas da API

### Posts

- `GET /docs` - Documentação usando o swagger Openai 3.0
- `Auth /auth/signin` - Login Utilizando o Auth.js
- `Auth /auth/signout`- Logout Utilizando o Auth.js
- `GET /genAi/` - Lista planos de aula (Rota Projetida)
- `GET genAi/ping/` - Testa conexão com a generativeAI

## ⚙️ Configurações

### Banco de Dados
- PostgreSQL rodando em container Docker
- Prisma como ORM para gerenciamento do banco
- Modelo de dados com suporte a usuários e posts

### Ambiente de Desenvolvimento
- TypeScript para desenvolvimento
- ts-node para hot-reload
- ESLint e Prettier para padronização de código

### Logs
- Morgan para logging de requisições
- Diferentes modos de log (development/production)


## ⚠️ Avisos para Devs

Abaixo, confira as recomendações e orientações importantes para os desenvolvedores que farão parte do projeto:

- 📄 **Documentação para Devs:** Informações detalhadas configuração do ambiente e documentação com swagger.

Acesse a [Documentação para Devs](/docs/DOCS.MD) para mais detalhes.




