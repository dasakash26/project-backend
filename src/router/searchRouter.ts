import { Router } from "express";
import requireAuth from "../middleware/checkAuth";
import { getInitOffers, searchOffer } from "../controllers/search.controller";

export const searchRouter = Router();
//@ts-ignore
searchRouter.get("/offer", requireAuth, searchOffer);
//@ts-ignore
searchRouter.get("/all", requireAuth, getInitOffers);
