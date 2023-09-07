import express from "express";
import campaignRouter from "./campaign";
import authRouter from "./auth";

const router = express.Router();

router.use("/api/v1", authRouter);
router.use("/api/v1", campaignRouter);

export default router;
