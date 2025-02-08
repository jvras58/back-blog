import { Request, Response } from 'express';
import { getPrompt, getApiGemini } from './gemini.controller';
import { prisma } from '../lib/db';
import { model } from '../lib/gemini';

jest.mock('../lib/db', () => ({
  prisma: {
    prompt: {
      findMany: jest.fn()
    }
  }
}));

jest.mock('../lib/gemini', () => ({
  model: {
    generateContent: jest.fn()
  }
}));

describe('Gemini Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    mockReq = {
      query: {}
    };
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });


  describe('getPrompt', () => {
    it('deve buscar prompts sem userId', async () => {
      const mockPrompts = [{ id: 1, text: 'test' }];
      (prisma.prompt.findMany as jest.Mock).mockResolvedValue(mockPrompts);

      await getPrompt(mockReq as any, mockRes as Response);

      expect(prisma.prompt.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'desc' },
        include: {
          Profile: {
            include: {
              user: true
            }
          }
        }
      });
      expect(mockRes.json).toHaveBeenCalledWith(mockPrompts);
    });

    it('deve buscar prompts com userId', async () => {
      mockReq.query = { userId: 'user123' };
      const mockPrompts = [{ id: 1, text: 'test' }];
      (prisma.prompt.findMany as jest.Mock).mockResolvedValue(mockPrompts);

      await getPrompt(mockReq as any, mockRes as Response);

      expect(prisma.prompt.findMany).toHaveBeenCalledWith({
        where: { authorId: 'user123' },
        orderBy: { createdAt: 'desc' },
        include: {
          Profile: {
            include: {
              user: true
            }
          }
        }
      });
    });

    it('deve lidar com erros', async () => {
      (prisma.prompt.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

      await getPrompt(mockReq as any, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('getApiGemini', () => {
    it('deve retornar uma resposta bem-sucedida', async () => {
      const mockText = 'Pong';
      (model.generateContent as jest.Mock).mockResolvedValue({
        response: { text: () => Promise.resolve(mockText) }
      });

      await getApiGemini(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'A conexão está funcionando',
        message: mockText
      });
    });

    it('deve lidar com erros', async () => {
      (model.generateContent as jest.Mock).mockRejectedValue(new Error('API Error'));

      await getApiGemini(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'Falha na conexão',
        error: 'API Error'
      });
    });
  });
});