import express from "express";
import { authController } from "../api/v1/auth/controller";
import { campaignController } from "../api/v1/campaign/controller";

const router = express.Router();

// campaign routes
router
	.get("/api/v1/campaigns", campaignController.findAllItems)
	.post("/api/v1/campaigns", campaignController.create);

// auth routes
router.post("/api/v1/auth/login", authController.login);

export default router;
