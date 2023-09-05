import config from "../config";
import { IPagination } from "../types";

type IResult = {
	offset: number;
	limit: number;
	sortBy: string;
	sortType: string;
	search: string;
};

const generatePaginationAndSortFields = (
	options: Partial<IPagination>
): IResult => {
	const offset = Number(options?.offset || config.offset);
	const limit = Number(options?.limit || 10);
	const sortBy = options?.sortBy || config.sortBy;
	const sortType = options?.sortType || config.sortType;
	const search = options?.search || config.search;

	return {
		offset,
		limit,
		sortBy,
		sortType,
		search,
	};
};

export const pagination = {
	generatePaginationAndSortFields,
};
