import { Request, Response } from "express";
import { prisma } from "../lib/db";
import type { AuthRequest } from "../auth.middleware";
import { model } from "../lib/gemini";

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
        Profile: {
          include: {
            user: true
          }
        }
      }
    });
    
    res.json(prompt);
  } catch (err) {
    console.error("getPrompt error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}


export async function getApiGemini(_req: Request, res: Response) {
  try {
    const prompt = "Responda com Pong";

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