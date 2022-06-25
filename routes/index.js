import express from "express";
import { octavify } from "./octavify.js";

const router = express.Router();

router.post("/octavify", octavify);

export { router };
