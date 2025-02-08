import { Router } from "express";
import { authMiddleware } from "../auth.middleware";
import { getPrompt, getApiGemini } from "./gemini.controller";

const router = Router();


// Rotas publicas com conexão a api
router.get("/ping", getApiGemini);


// Rotas protegidas
router.get("/", authMiddleware, getPrompt);


export default router;