import { Router } from "express";
import { authMiddleware } from "../auth.middleware";
import { createPrompt, getPrompt, updatePrompt, deletePrompt, getPublicPrompt, getApiGeminiTest, chatGeneratePost } from "./gemini.controller";

const router = Router();


// Rota pública
router.get("/public", getPublicPrompt);

// Rotas publicas com conexão a api
router.get("/ping", getApiGeminiTest);



// Rotas protegidas
router.post("/", authMiddleware, createPrompt);
router.get("/", authMiddleware, getPrompt);
router.put("/:id", authMiddleware, updatePrompt);
router.delete("/:id", authMiddleware, deletePrompt);
router.post("/chat", authMiddleware, chatGeneratePost);

export default router;