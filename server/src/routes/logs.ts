import { Router } from "express";
import { create, list } from "../controllers/log";

const logsRouter = Router()

logsRouter.get("/", list)
logsRouter.post("/", create)
export default logsRouter;