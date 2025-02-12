import { Request, Response, NextFunction } from "express";
import { getSession } from "@auth/express";
import { authConfig } from "./auth";


 
export async function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = res.locals.session ?? (await getSession(req, authConfig))
  if (!session?.user) {
    res.redirect("/login")
  } else {
    next()
  }
}