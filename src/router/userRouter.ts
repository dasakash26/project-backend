import {
  editProfile,
  getUser,
  login,
  logout,
  registerUser,
} from "../controllers/user.controller";
import { Router } from "express";
import requireAuth from "../middleware/checkAuth";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/me", requireAuth, getUser);
userRouter.get("/getUser", requireAuth, getUser);
userRouter.put("/edit", requireAuth, editProfile);
