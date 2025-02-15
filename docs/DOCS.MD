# 🚨 Avisos e Recomendações do Projeto

## ❌ Erro de Conexão com o PostgreSQL no Docker

Durante a execução do projeto, pode ocorrer o seguinte erro ao tentar conectar-se ao banco de dados:

```bash
Error: P1001: Can't reach database server at postgres:5432
Please make sure your database server is running at postgres:5432.
```

Esse erro geralmente resulta da configuração do host. No arquivo **.env**, a variável `DB_HOST` está definida como `postgres` para facilitar a comunicação entre containers no Docker.

> **💡 Dica:**  
> Se você estiver utilizando Docker em ambientes Linux ou o banco estiver rodando em container, mantenha `DB_HOST=postgres`.  
> Em ambientes Windows ou se o banco não estiver em container, altere para `localhost`.

### Configuração Recomendada no .env

```bash
DB_USER="backend"        # Usuário do banco de dados
DB_PASSWORD="backend123" # Senha do banco
DB_NAME="backend"        # Nome do banco de dados
DB_HOST=postgres         # Em Docker/Linux; para Windows, altere para: localhost
DB_PORT="5432"

DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}"
```

## 📚  Swagger Estrutura

A Api esta configurada com o swagger-autogen para saber mais como documentar:

Confira a [Documentação do Swagger](https://swagger-autogen.github.io/docs/openapi-3/)

Artigo sobre [Documentação do Swagger OpenAPI v3](https://davibaltar.medium.com/documentação-automática-de-apis-em-node-js-com-swagger-parte-2-usando-openapi-v3-cbc371d8c5ee)



