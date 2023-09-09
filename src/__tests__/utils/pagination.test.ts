import config from "../../config";
import {
	getPagination,
	getHATEOASForAllItems,
	getTransformedItems,
} from "../../utils/query";

describe("getPagination", () => {
	it("should return default pagination values when no options are provided", () => {
		const pagination = getPagination({});
		expect(pagination).toEqual({
			count: 0,
			limit: config.limit,
			offset: config.offset,
		});
	});

	it("should calculate 'next' and 'prev' values correctly", () => {
		const pagination = getPagination({
			count: 100,
			limit: 20,
			offset: 30,
		});
		expect(pagination).toEqual({
			count: 100,
			limit: 20,
			offset: 30,
			next: 50,
			prev: 10,
		});
	});
});

describe("getHATEOASForAllItems", () => {
	it("should generate links with no 'next' and 'prev'", () => {
		const links = getHATEOASForAllItems({
			url: "/items",
			path: "/items",
			query: {},
			hasNext: false,
			hasPrev: false,
			offset: 1,
			limit: 10,
		});
		expect(links).toEqual({
			self: "/items?",
		});
	});

	it("should generate links with 'next' and 'prev'", () => {
		const links = getHATEOASForAllItems({
			url: "/items",
			path: "/items",
			query: { limit: 10, offset: 10 },
			hasNext: true,
			hasPrev: true,
			offset: 10,
			limit: 10,
		});
		expect(links).toEqual({
			self: "/items?limit=10&offset=10",
			next: "/items?limit=10&offset=20",
			prev: "/items?limit=10&offset=0",
		});
	});
});

describe("getTransformedItems", () => {
	it("should transform items with 'link' property", () => {
		const items = [
			{ id: 1, name: "Item 1" },
			{ id: 2, name: "Item 2" },
		];
		const transformedItems = getTransformedItems({
			items,
			path: "/items",
		});
		expect(transformedItems).toEqual([
			{ id: 1, name: "Item 1", link: "/items/1" },
			{ id: 2, name: "Item 2", link: "/items/2" },
		]);
	});

	it("should return an empty array when no items are provided", () => {
		const transformedItems = getTransformedItems({
			items: [],
			path: "/items",
		});
		expect(transformedItems).toEqual([]);
	});
});
