import config from "../config";
import { generateQueryString } from "./qs";

type GetPaginationProps = {
	count: number;
	limit: number;
	offset: number;
	next?: number;
	prev?: number;
};

type PaginationOptions = {
	count?: number;
	limit?: number;
	offset?: number;
};

export const getPagination = ({
	count = 0,
	limit = config.limit,
	offset = config.offset,
}: PaginationOptions): GetPaginationProps => {
	const pagination: GetPaginationProps = {
		count,
		limit,
		offset,
	};

	if (offset + limit < count) {
		pagination.next = offset + limit;
	}

	if (offset > 0) {
		pagination.prev = Math.max(offset - limit, 0);
	}

	return pagination;
};

type ILinks = {
	self: string;
	next?: string;
	prev?: string;
};

type HATEOASForAllItemsProps = {
	url: string;
	path: string;
	query: object;
	hasNext: boolean;
	hasPrev: boolean;
	offset: number;
	limit: number;
};

const getHATEOASForAllItems = ({
	url = "/",
	path = "",
	query = {},
	hasNext = false,
	hasPrev = false,
	offset = 1,
	limit = 1,
}: HATEOASForAllItemsProps) => {
	const links: ILinks = {
		self: `${path}?${generateQueryString({ ...query })}`,
	};

	if (hasNext) {
		const queryStr = generateQueryString({ ...query, offset: offset + limit });
		links.next = `${path}?${queryStr}`;
	}
	if (hasPrev) {
		const queryStr = generateQueryString({ ...query, offset: offset - limit });
		links.prev = `${path}?${queryStr}`;
	}

	return links;
};

type TransformedItemsProps<T> = {
	items?: T[] | [] | null;
	path: string;
};

export const getTransformedItems = <T>({
	items = [],
	path = "/",
}: TransformedItemsProps<T>) => {
	if (items?.length && items?.length > 0) {
		const updatedItems: T[] = [];
		items.forEach((item: T) => {
			updatedItems.push({ ...item, link: `${path}/${(item as any).id}` });
		});

		return updatedItems;
	}
};

export default {
	getPagination,
	getHATEOASForAllItems,
	getTransformedItems,
};
