import { Router } from "express";
import stockRouter from "./stock";
import logsRouter from "./logs";

const appRouter = Router();

appRouter.use("/stocks", stockRouter);
appRouter.use("/logs", logsRouter)


export default appRouter;