import { pickQueryParams } from "../../utils/pickQueryParams";

type IInputObj = {
	name?: string;
	age?: number;
	country?: string;
};

describe("pickQueryParams", () => {
	it("should pick the specified query params from the object", () => {
		const inputObject: IInputObj = {
			name: "John",
			age: 30,
			country: "USA",
		};

		const keysToPick: (keyof IInputObj)[] = ["name", "country"];
		const result = pickQueryParams(inputObject, keysToPick);

		expect(result).toEqual({
			name: "John",
			country: "USA",
		});
	});

	it("should return an empty object when no keys are provided", () => {
		const inputObject: IInputObj = {
			name: "John",
			age: 30,
			country: "USA",
		};

		const keysToPick: (keyof IInputObj)[] = [];
		const result = pickQueryParams(inputObject, keysToPick);

		expect(result).toEqual({});
	});

	it("should return an empty object when keys do not exist in the object", () => {
		const inputObject: Record<string, unknown> = {
			name: "John",
			age: 30,
			country: "USA",
		};

		const keysToPick: string[] = ["city", "language"];
		const result = pickQueryParams(inputObject, keysToPick);

		expect(result).toEqual({});
	});

	it("should work with keys in different case", () => {
		const inputObject: Record<string, unknown> = {
			name: "John",
			age: 30,
			country: "USA",
		};

		const keysToPick: string[] = ["Name", "country"];
		const result = pickQueryParams(inputObject, keysToPick);

		expect(result).toEqual({
			name: "John",
			country: "USA",
		});
	});

	it("should handle an undefined input object", () => {
		const inputObject: any = undefined;
		const keysToPick: any[] = ["name", "country"];
		const result = pickQueryParams(inputObject, keysToPick);

		expect(result).toEqual({});
	});
});
