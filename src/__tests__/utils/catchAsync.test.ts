import { Response, Request } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ApiError } from "../../utils/error";

describe("catchAsync", () => {
	it("should catch and handle asynchronous errors", async () => {
		const req = {} as Request;
		const res = {} as Response;
		const next = jest.fn();

		const asyncFn = async () => {
			throw new ApiError(400, "Test Error");
		};

		const asyncMiddleware = catchAsync(asyncFn);

		await asyncMiddleware(req, res, next);

		expect(next).toHaveBeenCalledWith(expect.any(Error));
		expect(next).toHaveBeenCalledWith(new Error("Test Error"));
	});
});
