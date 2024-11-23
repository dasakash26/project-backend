"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logout = exports.login = exports.resgisterUser = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const resgisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ message: "Email and password are required!" });
        return;
    }
    const { email, password } = req.body;
    try {
        const existeduser = yield prisma_1.default.user.findFirst({
            // @ts-ignore
            where: {
                email: email
            }
        });
        if (existeduser) {
            res.status(409).json({ message: "User already existed!" });
            return;
        }
        const hassedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_1.default.user.create({
            data: {
                email: req.body.email,
                password: hassedPassword,
            },
        });
        if (process.env.SECRET === undefined) {
            res.status(500).json({ message: "Internal server error!" });
            return;
        }
        const exp = Date.now() + 1000 * 60 * 5;
        const token = jsonwebtoken_1.default.sign({ sub: user.id, exp }, process.env.SECRET);
        res.cookie("Authorization", token, { httpOnly: true, secure: true });
        res.status(201).json({ message: "User created successfully!" });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error!" });
        return;
    }
});
exports.resgisterUser = resgisterUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma_1.default.user.findFirst({
        // @ts-ignore
        where: {
            email: email
        }
    });
    if (!user) {
        res.status(401).json({ message: "Invalid email or password!" });
        return;
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid email or password!" });
        return;
    }
    if (process.env.SECRET === undefined) {
        res.status(500).json({ message: "Internal server error!" });
        return;
    }
    const exp = Date.now() + 1000 * 60 * 5;
    const token = jsonwebtoken_1.default.sign({ sub: user.id, exp }, process.env.SECRET);
    res.cookie("Authorization", token, { httpOnly: true, secure: true });
    res.status(200).json({ message: "Login successfully!" });
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("Authorization");
    res.status(200).json({ message: "Logout successfully!" });
});
exports.logout = logout;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    res.status(200).json({ user });
});
exports.getUser = getUser;
//# sourceMappingURL=userControllers.js.map