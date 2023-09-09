import {
	getHATEOASForAllItems,
	getPagination,
	getTransformedItems,
} from "../../utils/query";

describe("getPagination", () => {
	it("should return pagination with next and prev when applicable", () => {
		const count = 100;
		const limit = 20;
		const offset = 40;
		const pagination = getPagination({ count, limit, offset });

		expect(pagination).toEqual({
			count,
			limit,
			offset,
			next: 60,
			prev: 20,
		});
	});

	it("should return pagination without next and prev when not applicable", () => {
		const count = 15;
		const limit = 10;
		const offset = 0;
		const pagination = getPagination({ count, limit, offset });

		expect(pagination).toEqual({
			count,
			limit,
			offset,
		});
	});
});

describe("getHATEOASForAllItems", () => {
	it("should generate HATEOAS links with next and prev", () => {
		const url = "/items/limit=10&offset=10";
		const path = "/items";
		const query = { limit: 10, offset: 10 };
		const hasNext = true;
		const hasPrev = true;
		const offset = 10;
		const limit = 10;

		const links = getHATEOASForAllItems({
			url,
			path,
			query,
			hasNext,
			hasPrev,
			offset,
			limit,
		});

		expect(links).toEqual({
			self: "/items?limit=10&offset=10",
			next: "/items?limit=10&offset=20",
			prev: "/items?limit=10&offset=0",
		});
	});

	it("should generate HATEOAS links without next and prev", () => {
		const url = "/items/limit=10&offset=10";
		const path = "/items";
		const query = { limit: 10, offset: 10 };
		const hasNext = false;
		const hasPrev = false;
		const offset = 0;
		const limit = 10;

		const links = getHATEOASForAllItems({
			url,
			path,
			query,
			hasNext,
			hasPrev,
			offset,
			limit,
		});

		expect(links).toEqual({
			self: "/items?limit=10&offset=10",
		});
	});
});

describe("getTransformedItems", () => {
	it("should transform items and add links", () => {
		const items = [
			{ id: 1, name: "Item 1" },
			{ id: 2, name: "Item 2" },
		];
		const path = "/items";
		const transformedItems = getTransformedItems({ items, path });

		expect(transformedItems).toEqual([
			{ id: 1, name: "Item 1", link: "/items/1" },
			{ id: 2, name: "Item 2", link: "/items/2" },
		]);
	});

	it("should return an empty array for empty items", () => {
		const items: any = [];
		const path = "/items";
		const transformedItems = getTransformedItems({ items, path });

		expect(transformedItems).toEqual([]);
	});
});
