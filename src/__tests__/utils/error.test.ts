import { ApiError } from "../../utils/error";

describe("ApiError", () => {
	it("should create an instance of ApiError", () => {
		const statusCode = 404;
		const message = "Resource not found";
		const apiError = new ApiError(statusCode, message);

		expect(apiError).toBeInstanceOf(ApiError);
		expect(apiError.statusCode).toBe(statusCode);
		expect(apiError.message).toBe(message);
	});

	it("should have a stack trace", () => {
		const statusCode = 500;
		const message = "Internal server error";
		const apiError = new ApiError(statusCode, message);

		expect(apiError).toBeInstanceOf(ApiError);
		expect(apiError.stack).toBeDefined();
	});

	it("should allow custom stack trace", () => {
		const statusCode = 400;
		const message = "Bad request";
		const customStack = "Custom stack trace";
		const apiError = new ApiError(statusCode, message, customStack);

		expect(apiError).toBeInstanceOf(ApiError);
		expect(apiError.stack).toBe(customStack);
	});
});
