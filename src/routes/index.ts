import express from "express";
import authRouter from "./auth";

const router = express.Router();

// auth routes
router.use("/api/v1/auth", authRouter);

export default router;
