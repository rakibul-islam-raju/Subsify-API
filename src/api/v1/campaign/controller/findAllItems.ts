import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../../utils/catchAsync";
import { pickQueryParams } from "../../../../utils/pickQueryParams";
import campaignService from "../../../../lib/campaign";
import { sendResponse } from "../../../../utils/sendResponse";
import query from "../../../../utils/query";

export const findAllItems: RequestHandler = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const params = ["offset", "limit", "sort_type", "sort_by", "search"];
		const queryParams = pickQueryParams(req.query, params);

		const campaigns = await campaignService.findAll(queryParams);
		const count = await campaignService.count();

		const pagination = query.getPagination({
			count: Number(count ?? 0),
			limit: Number(queryParams.limit),
			offset: Number(queryParams.offset),
		});

		// HATEOAS Links
		const links = query.getHATEOASForAllItems({
			url: req.originalUrl,
			path: req.path,
			query: req.query,
			hasNext: !!pagination.next,
			hasPrev: !!pagination.prev,
			offset: Number(pagination.offset),
			limit: Number(pagination.limit),
		});

		const response = {
			code: httpStatus.OK,
			data: campaigns ?? [],
			meta: pagination,
			links,
		};

		sendResponse(res, response);
	}
);
