import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

interface CustomError {
	code: number;
	error: string;
	message?: string;
	data?: Record<string, any>;
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const customError: CustomError = {
		code: 500,
		error: "Internal Server Error",
	};

	if (err instanceof mongoose.Error.ValidationError) {
		customError.code = 400;
		customError.error = "Bad Request";
		customError.data = [];

		for (const field in err.errors) {
			customError.data.push({
				field,
				message: err.errors[field].message,
			});
		}
	} else if (err instanceof mongoose.Error.CastError) {
		customError.code = 400;
		customError.error = "Bad Request";
		customError.message = "Invalid ObjectId";
	} else {
		customError.message = err.message;
	}

	res.status(customError.code).json(customError);
};

export default errorHandler;
