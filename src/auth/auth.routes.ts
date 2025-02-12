import { ExpressAuth } from "@auth/express"
import { Router } from "express";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../lib/db";
import { authConfig } from "../../auth";


const router = Router();

router.use("/auth/*", ExpressAuth({ ...authConfig, adapter: PrismaAdapter({ prisma }) }))


export default router;
