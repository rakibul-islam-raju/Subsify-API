import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../../utils/catchAsync";
import authService from "../../../../lib/auth";
import { sendResponse } from "../../../../utils/sendResponse";

export const refresh = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { refresh } = req.body;

		const tokens = await authService.refresh(refresh);

		const response = {
			code: httpStatus.OK,
			data: tokens,
			links: {
				self: req.url,
			},
		};

		sendResponse(res, response);
	}
);
