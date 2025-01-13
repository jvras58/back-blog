import "dotenv/config";
import express from "express";
import cors from "cors";
import postsRouter from "./post/posts.routes";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
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
