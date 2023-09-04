import express from "express";
import { authController } from "../api/v1/auth/controller";

const authRouter = express.Router();

authRouter.post("/login", authController.login);

export default authRouter;
