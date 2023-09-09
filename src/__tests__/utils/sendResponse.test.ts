import { sendResponse } from "../../utils/sendResponse";

describe("sendResponse", () => {
	it("should send the response with the provided data", () => {
		const mockJson = jest.fn();
		const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
		const res = { status: mockStatus } as any;
		const data: { name: string } = { name: "John doe" };
		const response = {
			code: 200,
			message: "Campaign Created Successfully",
			data: data,
			meta: { limit: 5, offset: 0, count: 1 },
			links: {
				self: `/data/1`,
			},
		};

		sendResponse(res, response);

		expect(mockStatus).toHaveBeenCalledWith(response.code);
		expect(mockJson).toHaveBeenCalledWith({
			code: response.code,
			message: response.message,
			data: response.data,
			meta: response.meta,
			links: response.links,
		});
	});

	it("should handle missing data field by sending null", () => {
		const mockJson = jest.fn();
		const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
		const res = { status: mockStatus } as any; // Mock the Express Response object

		const data = {
			code: 404,
			message: "Not Found",
		};

		sendResponse(res, data);

		expect(mockStatus).toHaveBeenCalledWith(data.code);
		expect(mockJson).toHaveBeenCalledWith({
			code: data.code,
			message: data.message,
			data: null,
		});
	});
});
