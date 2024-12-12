import express, {Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./router/userRouter";
import secrets from "./utils/secrets";
import { offerRouter } from "./router/offerRouter";
import { searchRouter } from "./router/searchRouter";
import { dummyDataRouter } from "./router/dummyDataRouter";
import { aiRouter } from "./router/aiRouter";
import { negotiationRouter } from "./router/negotiationRouter";
import { notificationRouter } from "./router/notificationRouter";
const app = express();

app.use(express.json());
const corsOptions ={
    origin:[
        'http://localhost:5173', 
        'https://project-frontend-olive.vercel.app'
    ],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());

//debug logger
app.use((req: Request, res: Response, next) => {
    console.log(`>> ${req.method} ${req.path}`);
    console.log(req.body);
    console.log(req.query);
    next();
})

app.use('/api/v1/user',userRouter);
app.use("/api/v1/offer", offerRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/dummy", dummyDataRouter);
app.use("/api/v1/negotiation", negotiationRouter);
app.use("/api/v1/myNotifications", notificationRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Agripact server is running...");
})

app.listen(secrets.port, () => {
    console.log(`>> App is listening on port ${secrets.port}...`);
})