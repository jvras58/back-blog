import { Request, Response, NextFunction } from "express";
import { getSession } from "@auth/express";
import { authConfig } from "./auth";


// TODO: para disponibilizar a sessão para todas as rotas > src/app.ts add: app.use(authSession)
export async function authSession(req: Request, res: Response, next: NextFunction) {
  res.locals.session = await getSession(req, authConfig);
  next();
}

export async function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = res.locals.session ?? (await getSession(req, authConfig))
  if (!session?.user) {
    res.redirect("/auth/signin")
  } else {
    next()
  }
}