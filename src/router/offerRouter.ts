import { Router } from "express";
import { createOffer, getOffer, searchOffer } from "../controllers/offer.controller";
import requireAuth from "../middleware/checkAuth";

export const offerRouter = Router();
//@ts-ignore
offerRouter.post("/create", requireAuth, createOffer);
//@ts-ignore
offerRouter.get("/id/:id", requireAuth, getOffer);
//@ts-ignore
offerRouter.get("/search", requireAuth, searchOffer);
