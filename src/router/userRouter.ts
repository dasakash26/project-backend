import { getUser, login, logout, resgisterUser } from "../controllers/userControllers";
import { Router } from "express";
import requireAuth from "../middleware/checkAuth";
export const userRouter = Router();
userRouter.post("/register", resgisterUser);
userRouter.post("/login", login);
userRouter.get("/logout",logout);
userRouter.get("/me",requireAuth ,getUser);
