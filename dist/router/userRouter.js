"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const userControllers_1 = require("../controllers/userControllers");
const express_1 = require("express");
const checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/register", userControllers_1.resgisterUser);
exports.userRouter.post("/login", userControllers_1.login);
exports.userRouter.get("/logout", userControllers_1.logout);
exports.userRouter.get("/me", checkAuth_1.default, userControllers_1.getUser);
//# sourceMappingURL=userRouter.js.map