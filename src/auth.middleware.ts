import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    sub: string;    // userId
    email?: string;
    role?: string;
  };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ error: "No token provided" });
        return;
      }
  
      const [scheme, token] = authHeader.split(" ");
      if (scheme !== "Bearer" || !token) {
        res.status(401).json({ error: "Token malformatted" });
        return;
      }
  
      const secret = process.env.AUTH_SECRET || "defaultsecret";
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
  
      req.user = {
        sub: decoded.sub || "",
        email: decoded.email,
        role: decoded.role
      };
  
      next();
    } catch (err) {
      res.status(401).json({ error: "Token invalid or expired" });
      return;
    }
  }
