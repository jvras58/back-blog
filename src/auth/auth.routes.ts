import { ExpressAuth } from "@auth/express"
import { Router } from "express";
import { authConfig } from "../../auth";


const router = Router();

router.use("/*", ExpressAuth({ ...authConfig }))


export default router;
