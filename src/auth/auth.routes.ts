import { ExpressAuth } from "@auth/express"
import { Router } from "express";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../lib/db";
import app from "../app";
import authController from "./auth.controller";

 // TODO: Qual ´é o melhor? aqui ou no auth.ts usando o ExpressAuthConfig? 
const router = Router();
// If your app is served through a proxy
// trust the proxy to allow us to read the `X-Forwarded-*` headers
app.set("trust proxy", true)
router.use("/auth/*", ExpressAuth({ ...authController, adapter: PrismaAdapter({ prisma }) }))


export default router;
