import express, {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { userRouter } from "./router/userRouter";


const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/user',userRouter);

// app.post("/signup", async (req: Request, res: Response) => {
//     await prisma.user.create({data: {email: req.body.email, password: req.body.password}});
//     res.status(201).json({message: "User created successfully!"});
// })

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
})