import express, {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./router/userRouter";
import secrets from "./utils/secrets";
import { offerRouter } from "./router/offerRouter";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.use((req: Request, res: Response, next) => {
//     console.log(`>> ${req.method} ${req.path}`);
//     next();
// })

app.use('/api/v1/user',userRouter);
app.use("/api/v1/offer", offerRouter);

// app.post("/signup", async (req: Request, res: Response) => {
//     await prisma.user.create({data: {email: req.body.email, password: req.body.password}});
//     res.status(201).json({message: "User created successfully!"});
// })

app.get("/", (req: Request, res: Response) => {
    res.send("Agripact server is running...");
})

app.listen(secrets.port, () => {
    console.log(`>> App is listening on port ${secrets.port}...`);
})