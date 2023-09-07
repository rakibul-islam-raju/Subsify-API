import config from "../../config";
import { ApiError } from "../../utils/error";
import { generateToken, verifyToken } from "../token";
import { findUserByEmail, userExist } from "../user";
import httpStatus from "http-status";

const login = async (
	email: string,
	password: string
): Promise<{ access_token: string; refresh_token: string }> => {
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

	const tokens = {
		access_token: generateToken(
			payload,
			config.jwtAccessSecret,
			config.jwtAccessExpiresIn
		),
		refresh_token: generateToken(
			payload,
			config.jwtRefreshSecret,
			config.jwtRefreshExpiresIn
		),
	};

	return tokens;
};

const refresh = async (
	refreshToken: string
): Promise<{ access_token: string; refresh_token: string }> => {
	if (!refreshToken) {
		throw new ApiError(400, "Refresh token is required");
	}

	const tokenVerified = verifyToken(refreshToken, config.jwtRefreshSecret);

	if (!tokenVerified || !tokenVerified?.email) {
		throw new ApiError(400, "Invalid refresh token");
	}

	const user = await userExist(tokenVerified.email);

	if (!user) {
		throw new ApiError(400, "Invalid refresh token");
	}

	const payload = {
		id: user.id,
		email: user.email,
	};

	const tokens = {
		access_token: generateToken(
			payload,
			config.jwtAccessSecret,
			config.jwtAccessExpiresIn
		),
		refresh_token: generateToken(
			payload,
			config.jwtRefreshSecret,
			config.jwtRefreshExpiresIn
		),
	};

	return tokens;
};

export default { login, refresh };
