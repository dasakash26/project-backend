import { Router } from "express";
import { createDummyOffers } from "../controllers/dummyData.controller";
import requireAuth from "../middleware/checkAuth";

export const dummyDataRouter = Router();

//@ts-ignore
dummyDataRouter.get("/offer", requireAuth, createDummyOffers);
