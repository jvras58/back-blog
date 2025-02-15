import { Router } from "express";
import { getPlanoAula, getApiGemini } from "./gemini.controller";
import { authenticatedUser } from "../../middleware";


const router = Router();


// Rotas publicas com conexão a api
router.get("/ping", getApiGemini);


// Rotas protegidas
router.get("/", authenticatedUser, getPlanoAula);


export default router;