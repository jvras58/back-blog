import { Request, Response } from "express";
import { prisma } from "../lib/db";
import type { AuthRequest } from "../auth.middleware";

// Sincronizando o banco do front com o do back: npx prisma generate e npx prisma db push
export async function createPost(req: AuthRequest, res: Response) {
    try {
      const { title, content, description, category, tags } = req.body;
      const userId = req.user?.sub;
  
      if (!userId) {
        res.status(401).json({ error: "Unauthorized - User not authenticated" });
        return;
      }
  
      if (!title || !content || !description || !category) {
        res.status(400).json({ 
          error: "Missing required fields: title, content, description, category" 
        });
        return;
      }
  
      const post = await prisma.post.create({
        data: {
          title,
          content,
          description,
          category,
          tags: tags || [],
          authorId: userId,
        },
      });
  
      res.status(201).json(post);
    } catch (err) {
      console.error("createPost error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  export async function getPosts(req: AuthRequest, res: Response) {
    try {
      const { userId } = req.query;
  
      const where = userId ? {
        authorId: userId as string
      } : {};
  
      const posts = await prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          author: true
        }
      });
      
      res.json(posts);
    } catch (err) {
      console.error("getPosts error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

export async function getPublicPosts(_req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    res.json(posts);
  } catch (err) {
    console.error("getPublicPosts error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updatePost(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { title, content, description, category, tags } = req.body;
    const userId = req.user?.sub;

    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({ error: "Não autorizado - Apenas o autor pode editar este post" });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        description,
        category,
        tags: tags || [],
      }
    });

    res.json(updatedPost);
  } catch (err) {
    console.error("updatePost error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deletePost(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user?.sub;

    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({ error: "Não autorizado - Apenas o autor pode deletar este post" });
    }

    await prisma.post.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (err) {
    console.error("deletePost error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}