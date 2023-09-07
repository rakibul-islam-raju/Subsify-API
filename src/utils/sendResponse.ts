import { Response } from "express";

type IApiResponse<T> = {
	code: number;
	message?: string | null;
	data?: T | null;
	meta?: {
		limit: number;
		offset: number;
		count: number;
	};
	links?: {
		self: string;
		prev?: string;
		next?: string;
	};
};

export const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
	const responseData: IApiResponse<T> = {
		code: data.code,
		message: data.message,
		data: data.data || null,
		meta: data?.meta,
		links: data.links,
	};

	res.status(data.code).json(responseData);
};
