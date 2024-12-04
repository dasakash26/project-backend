import { Router } from "express";
import { createNegotiation, getNegotiations, getCurrentTerms, updateCurrentTerms, completeNegotiation } from "../controllers/negotiation.controller";
import requireAuth from "../middleware/checkAuth";

export const negotiationRouter = Router();
//@ts-ignore
negotiationRouter.post("/create", requireAuth, createNegotiation);
negotiationRouter.get("/", requireAuth, getNegotiations);
negotiationRouter.get("/:currentTermsId", requireAuth, getCurrentTerms);
negotiationRouter.post("/update/:currentTermsId", requireAuth, updateCurrentTerms);
negotiationRouter.post("/complete/:currentTermsId", requireAuth, completeNegotiation);
