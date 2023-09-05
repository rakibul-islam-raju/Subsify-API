import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../../utils/catchAsync";
import campaignService from "../../../../lib/campaign";
import { sendResponse } from "../../../../utils/sendResponse";

export const create: RequestHandler = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { title, description, isActive } = req.body;

		const campaign = await campaignService.create({
			title,
			description,
			isActive,
		});

		const response = {
			code: httpStatus.CREATED,
			message: "Campaign Created Successfully",
			data: campaign,
			links: {
				self: `/campaigns/${campaign?.id}`,
			},
		};

		sendResponse(res, response);
	}
);
