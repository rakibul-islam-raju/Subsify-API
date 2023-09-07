import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../../utils/catchAsync";
import subscribeService from "../../../../lib/subscription";
import { sendResponse } from "../../../../utils/sendResponse";
import { ObjectId } from "mongoose";

export const unsubscribe: RequestHandler = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;
		const { campaignId } = req.params;

		const campaignObjectId = campaignId as unknown as ObjectId;
		await subscribeService.subscribe(email, campaignObjectId);

		const response = {
			code: httpStatus.NO_CONTENT,
			message: "Unsubscribed Successfully",
		};

		sendResponse(res, response);
	}
);
