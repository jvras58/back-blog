import "dotenv/config";
import express from "express";
import cors from "cors";
import postsRouter from "./post/posts.routes";
import { developmentLogger, errorLogger } from "./config/logs";

const app = express();

const logMode = process.env.LOG_MODE || 'dev';

if (logMode === 'production') {
  app.use(errorLogger);
} else if (logMode === 'dev') {
  app.use(developmentLogger);
}

const corsOptions = {
  origin: [process.env.FRONTEND_URL || 'https://vblog-sigmal.vercel.app/', 'http://localhost:3000', 'https://www.getpostman.com'], // Allow requests only from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies, if your application uses them
  optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
  headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};
app.use(cors(corsOptions));

app.use(express.json());

// Rotas
app.use("/posts", postsRouter);

app.get("/", (_req, res) => {
  res.send("API do Blog ok!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});