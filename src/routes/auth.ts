import express from "express";
import { authController } from "../api/v1/auth/controller";

const authRouter = express.Router();

// auth routes
authRouter.post("/auth/login", authController.login);

export default authRouter;
