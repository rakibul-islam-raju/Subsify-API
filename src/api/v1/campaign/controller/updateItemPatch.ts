import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../../utils/catchAsync";
import campaignService from "../../../../lib/campaign";
import { sendResponse } from "../../../../utils/sendResponse";

export const updateItemPatch: RequestHandler = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { campaignId } = req.params;

		const campaign = await campaignService.updateProperties(
			campaignId,
			req.body
		);

		const links = {
			self: `/campaigns/${campaignId}`,
		};

		const response = {
			code: httpStatus.OK,
			data: campaign,
			links,
		};

		sendResponse(res, response);
	}
);
