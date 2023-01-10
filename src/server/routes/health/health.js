import express from "express";
import health from "../../../services/health/health.js";

const router = express.Router();

router.get("/", health);

export default router;