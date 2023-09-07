import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../../utils/catchAsync";
import campaignService from "../../../../lib/campaign";
import { sendResponse } from "../../../../utils/sendResponse";

export const removeItem: RequestHandler = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { campaignId } = req.params;

		await campaignService.removeItem(campaignId);

		const response = {
			code: httpStatus.NO_CONTENT,
		};

		sendResponse(res, response);
	}
);
