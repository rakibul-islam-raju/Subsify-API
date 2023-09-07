import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../../utils/catchAsync";
import campaignService from "../../../../lib/campaign";
import { sendResponse } from "../../../../utils/sendResponse";
import mongose, { ObjectId } from "mongoose";
import mongoose from "mongoose";

export const findSingItem: RequestHandler = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { campaignId } = req.params;

		const campaignObjectId = campaignId as unknown as ObjectId;
		const campaign = await campaignService.findSingleItem(campaignObjectId);

		const links = {
			self: `/campaigns/${campaign.id}`,
		};

		const response = {
			code: httpStatus.OK,
			data: campaign,
			links,
		};

		sendResponse(res, response);
	}
);
