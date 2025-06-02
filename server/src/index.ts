import express, { Request, Response } from "express";
import appRouter from "./routes/index";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());

app.use("/", appRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
