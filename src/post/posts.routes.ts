import { Router } from "express";
import { authMiddleware } from "../auth.middleware";
import { createPost, getPosts } from "./posts.controller";

const router = Router();


router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);

export default router;
