import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello"});
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
})