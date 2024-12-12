import { Router } from "express";
import requireAuth from "../middleware/checkAuth";
import { getNotification } from "../controllers/notification.controller";

export const notificationRouter = Router();
//@ts-ignore
notificationRouter.get("/", requireAuth, getNotification);
