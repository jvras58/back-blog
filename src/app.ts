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

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:4000',
];

console.log('Origens permitidas:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS.'));
    }
  },
  credentials: true,
}));

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
