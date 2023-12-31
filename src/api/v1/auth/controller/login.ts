import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../../utils/catchAsync";
import authService from "../../../../lib/auth";
import { sendResponse } from "../../../../utils/sendResponse";

export const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		const tokens = await authService.login(email, password);

		const response = {
			code: httpStatus.OK,
			message: "Login successful",
			data: tokens,
			links: {
				self: req.url,
			},
		};

		sendResponse(res, response);
	}
);
