const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    version: "1.0.0",
    title: "Pibiotec API",
    description: "API para o projeto Pibiotec",
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Servidor local'
    }
  ],
  components: {
    schemas: {
      PlanoAula: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID do plano de aula" },
          description: { type: "string", description: "descrição do plano" },
        }
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  // TODO: define globalmente a autenticação ser obrigatória  
  // security: [
  //   {
  //     bearerAuth: []
  //   }
  // ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger gerado com sucesso.');
});
