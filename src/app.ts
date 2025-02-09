import "dotenv/config";
import express from "express";
import cors from "cors";
import genAiRouter from "./generetiveAi/gemini.routes";
import { developmentLogger, errorLogger } from "./config/logs";

const app = express();

const logMode = process.env.LOG_MODE || 'dev';
const NODE_ENV = process.env.NODE_ENV || 'dev';

if (logMode === 'production') {
  app.use(errorLogger);
} else if (logMode === 'dev') {
  app.use(developmentLogger);
}

const corsOptions = {
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://www.getpostman.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204, 
  headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};
app.use(cors(corsOptions));

app.use(express.json());


app.use("/genAi", genAiRouter);

app.get("/", (_req, res) => {
  res.send("API do Blog ok!");
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;
