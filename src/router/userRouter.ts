import { getUser, login, logout, registerUser } from "../controllers/user.controller";
import { Router } from "express";
import requireAuth from "../middleware/checkAuth";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.get("/logout",logout);
userRouter.get("/me",requireAuth ,getUser);
