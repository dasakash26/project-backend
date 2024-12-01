import { Router } from "express";
import { getResponse } from "../controllers/ai.controller";

export const aiRouter = Router();

//@ts-ignore
aiRouter.get("/prompt", getResponse);
