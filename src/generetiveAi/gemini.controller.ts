import { Request, Response } from "express";
import { prisma } from "../lib/db";
import type { AuthRequest } from "../../auth.middleware";
import { model } from "../lib/gemini";

export async function getPlanoAula(req: AuthRequest, res: Response) {
  /*
      #swagger.tags = ['genAi']
      #swagger.summary = 'Busca planos de aula'
      #swagger.description = 'Retorna a lista de planos de aula cadastrados no sistema.'

      #swagger.security = [{
          "bearerAuth": []
      }] 
      
      #swagger.parameters['userId'] = {
          description: 'ID do usuário para filtrar os planos de aula',
          required: false,
      }

      #swagger.responses[200] = {
          description: 'Lista de planos de aula retornada com sucesso',
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { "$ref": "#/components/schemas/PlanoAula" }
              }
            }
          }
      }
      
      #swagger.responses[500] = { description: 'Erro interno no servidor' }
  */
  try {
    const { userId } = req.query;

    const where = userId ? { authorId: userId as string } : {};

    const prompt = await prisma.planoAula.findMany({
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
    console.error("getPlanoAula error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}


export async function getApiGemini(_req: Request, res: Response) {
  /*
      #swagger.tags = ['genAi']
      #swagger.summary = 'Testa a conexão com a API Gemini'
      #swagger.description = 'Testa a conexão com a API Gemini, retornando um "Pong" caso a conexão esteja funcionando.'
      
      #swagger.responses[200] = {
          description: 'Conexão com a API Gemini funcionando',
          content: {
            "application/json": {
              schema: {
                status: "A conexão está funcionando",
                message: "Pong"
              }
            }
          }
      }
      
      #swagger.responses[500] = { description: 'Erro interno na API Gemini' }
  */
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