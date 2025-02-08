import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    sub: string;
    email?: string;
    name?: string;
    role?: string;
  };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ error: "Nenhum token fornecido" });
        return;
      }
  
      const [scheme, token] = authHeader.split(" ");
      if (scheme !== "Bearer" || !token) {
        res.status(401).json({ error: "Token malformatado" });
        return;
      }
  
      const secret = process.env.AUTH_SECRET || "";
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
  
      req.user = {
        sub: decoded.sub || "",
        email: decoded.email,
        role: decoded.role,
        name: decoded.name,
      };
      
      next();
    } catch (err: any) {
      if (err.code && (
        err.code.startsWith('08')
      )) {
        res.status(503).json({ error: "Erro de conexão com o banco de dados" });
        return;
      }

      res.status(498).json({ error: "Token inválido ou expirado" });
      return;
    }
  }