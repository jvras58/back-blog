import { Request, Response } from "express";
import { prisma } from "../lib/db";
import type { AuthRequest } from "../auth.middleware";
import { model } from "../lib/gemini";

export async function createPrompt(req: AuthRequest, res: Response) {
    try {
      const { title, content, description } = req.body;
      const userId = req.user?.sub;
  
      if (!userId) {
        res.status(401).json({ error: "Unauthorized - User not authenticated" });
        return;
      }
  
      if (!title || !content || !description) {
        res.status(400).json({ 
          error: "Missing required fields: title, content, description" 
        });
        return;
      }
  
      const prompt = await prisma.prompt.create({
        data: {
          title,
          content,
          description,
          authorId: userId,
        },
      });
  
      res.status(201).json(prompt);
    } catch (err) {
      console.error("createPrompt error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  export async function getPrompt(req: AuthRequest, res: Response) {
    try {
      const { userId } = req.query;
  
      const where = userId ? {
        authorId: userId as string
      } : {};
  
      const prompt = await prisma.prompt.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          author: true
        }
      });
      
      res.json(prompt);
    } catch (err) {
      console.error("getPrompt error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

export async function getPublicPrompt(_req: Request, res: Response) {
  try {
    const prompt = await prisma.prompt.findMany({
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
    
    res.json(prompt);
  } catch (err) {
    console.error("getPublicPrompt error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updatePrompt(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { title, content, description } = req.body;
    const userId = req.user?.sub;

    const prompt = await prisma.prompt.findUnique({
      where: { id }
    });

    if (!prompt) {
      res.status(404).json({ error: "prompt não encontrado" });
      return;
    }

    if (prompt.authorId !== userId) {
      res.status(403).json({ error: "Não autorizado - Apenas o Admin pode editar este prompt" });
      return;
    }

    const updatedPrompt = await prisma.prompt.update({
      where: { id },
      data: {
        title,
        content,
        description,
      }
    });

    res.json(updatedPrompt);
  } catch (err) {
    console.error("updatePrompt error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deletePrompt(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const userId = req.user?.sub;

    const prompt = await prisma.prompt.findUnique({
      where: { id }
    });

    if (!prompt) {
      res.status(404).json({ error: "Prompt não encontrado" });
      return;
    }

    if (prompt.authorId !== userId) {
      res.status(403).json({ error: "Não autorizado - Apenas Adminstradores pode deletar prompts" });
      return;
    }

    await prisma.prompt.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (err) {
    console.error("deletePrompt error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getApiGeminiTest(_req: Request, res: Response) {
  try {
    const prompt = "Responda com Pong";

    // Faz a chamada ao modelo Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;

    const text = await response.text();

    res.status(200).json({
      status: "A conexão está funcionando",
      message: text,
    });
  } catch (error: any) {
    console.error("getApiGemini error:", error);
    res.status(500).json({
      status: "Falha na conexão",
      error: error.message,
    });
  }
}

export async function chatGeneratePost(req: AuthRequest, res: Response): Promise<any> {
  try {
    const { messages, generatePost } = req.body;
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized - User not authenticated" });
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Mensagens inválidas" });
    }

    const chatContext = messages.map((msg: any) => `${msg.role}: ${msg.content}`).join("\n");

    const prompt = `
      Gere uma postagem baseada na seguinte conversa com o usuário:
      ${chatContext}
      A postagem deve ser coerente, bem estruturada e atrativa.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedText = await response.text();

    if (!generatePost) {
      return res.json({ role: "assistant", content: generatedText });
    }


    res.status(201).json({ role: "assistant", content: generatedText });
  } catch (err) {
    console.error("chatGeneratePost error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
