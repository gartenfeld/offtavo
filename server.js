import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";

const DEFAULT_PORT = 3010;
const port = process.env.port || DEFAULT_PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);
app.listen(port, () => console.log(`Listening on port ${port}!`));
