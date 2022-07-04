import express from "express";
import { octavify } from "./octavify.js";
import { enrich } from "./enrich.js";

const router = express.Router();

router.post("/octavify", octavify);
router.post("/enrich", enrich);

export { router };
