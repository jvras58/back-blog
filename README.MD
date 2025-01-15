# Blog - desafio Vlab

## 📖 Sobre o Projeto
API REST desenvolvida para um sistema de blog, utilizando Express.js com Prisma ORM para gerenciamento do banco de dados PostgreSQL.

## 🚀 Tecnologias e Ferramentas


Este projeto é uma aplicação web que utiliza **Next.js**, um framework React focado em renderização do lado servidor e funcionalidades modernas de desenvolvimento web.

As tecnologias utilizadas são:

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

## 💻 Como Executar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo 

```.env-sample``` para ```.env```


- Ajuste as variáveis conforme necessário

4. Inicie o banco de dados (se não tiver já iniciado no front):
```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:
```bash
npx prisma generate
npx prisma migrate dev

# Ou se já tiver iniciado no front sincronize:
npx prisma db push
```

6. Inicie o servidor:
```bash
npm run dev
```

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