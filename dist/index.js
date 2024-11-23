"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRouter_1 = require("./router/userRouter");
const prisma = new client_1.PrismaClient();
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use('/api/user', userRouter_1.userRouter);
// app.post("/signup", async (req: Request, res: Response) => {
//     await prisma.user.create({data: {email: req.body.email, password: req.body.password}});
//     res.status(201).json({message: "User created successfully!"});
// })
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
});
//# sourceMappingURL=index.js.map