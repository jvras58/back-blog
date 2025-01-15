import { Router } from "express";
import { authMiddleware } from "../auth.middleware";
import { createPost, getPosts, getPublicPosts, updatePost, deletePost } from "./posts.controller";

const router = Router();

// Rota pública
router.get("/public", getPublicPosts);

// Rotas protegidas
router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;