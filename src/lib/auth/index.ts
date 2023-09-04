import config from "../../config";
import { ApiError } from "../../utils/error";
import { generateToken } from "../token";
import { findUserByEmail } from "../user";
import httpStatus from "http-status";

const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const user = await findUserByEmail(email);
	if (!user) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Credentials");
	}

	const matched = user.comparePassword(password);
	if (!matched) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Credentials");
	}

	const payload = {
		id: user.id,
		email: user.email,
	};

	return generateToken(payload, config.jwtSecret, config.JWT_EXPIRES_IN);
};

export default { login };
