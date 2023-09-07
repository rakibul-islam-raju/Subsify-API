import express from "express";
import { campaignController } from "../api/v1/campaign/controller";

const campaignRouter = express.Router();

// campaign routes
campaignRouter
	.get("/campaigns", campaignController.findAllItems)
	.post("/campaigns", campaignController.create)
	.get("/campaigns/:campaignId", campaignController.findSingItem)
	.patch("/campaigns/:campaignId", campaignController.updateItemPatch)
	.delete("/campaigns/:campaignId", campaignController.removeItem)
	.post("/campaigns/:campaignId/subscribe", campaignController.subscribe)
	.post("/campaigns/:campaignId/unsubscribe", campaignController.unsubscribe);

export default campaignRouter;
