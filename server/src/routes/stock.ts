import { Router } from "express";
import { create, list, remove, update } from "../controllers/stock";

const stockRouter = Router()

stockRouter.get("/", list)
stockRouter.post("/", create)
stockRouter.delete("/:id", remove)
stockRouter.put("/:id", update)

export default stockRouter;