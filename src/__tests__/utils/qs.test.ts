import { describe, expect, it, test } from "@jest/globals";
import { generateQueryString } from "../../utils/qs";

describe("generateQueryString", () => {
	it("should return an empty string for an empty query object", () => {
		const query = {};
		const queryString = generateQueryString(query);
		expect(queryString).toBe("");
	});

	it("should generate a valid query string for a simple query object", () => {
		const query = {
			name: "John",
			age: 30,
		};
		const queryString = generateQueryString(query);
		expect(queryString).toBe("name=John&age=30");
	});

	it("should handle special characters in key and value", () => {
		const query = {
			"first name": "John & Jane",
			age: 30,
		};
		const queryString = generateQueryString(query);
		expect(queryString).toBe("first%20name=John%20%26%20Jane&age=30");
	});

	it("should handle comma separeted values in the query object", () => {
		const query = {
			fruits: "apple,banana,cherry",
		};
		const queryString = generateQueryString(query);
		expect(queryString).toBe("fruits=apple%2Cbanana%2Ccherry");
	});
});
