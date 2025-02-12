import "dotenv/config";
import express from "express";
import cors from "cors";
import genAiRouter from "./generetiveAi/gemini.routes";
import auth from "./auth/auth.routes";
import swaggerRoute from "./docs/docs.routes";
import { developmentLogger, errorLogger } from "./config/logs";
import { FRONTEND_URL, logMode, NODE_ENV, PORT } from "./config/env";

const app = express();


if (logMode === 'production') {
  app.use(errorLogger);
} else if (logMode === 'dev') {
  app.use(developmentLogger);
}

const corsOptions = {
  origin: [FRONTEND_URL || 'http://localhost:3000', 'https://www.getpostman.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204, 
  headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(swaggerRoute);


// Auth.js
app.use(auth);




// Rotas
app.use("/genAi", genAiRouter);

// Rota raiz
app.get("/", (_req, res) => {
  /*
      #swagger.tags = ['root']
      #swagger.summary = 'Rota raiz'
      #swagger.description = 'Rota raiz da API, retornando uma mensagem de sucesso.'
  */
  res.send("API Pibiotec online!");
});



if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;
