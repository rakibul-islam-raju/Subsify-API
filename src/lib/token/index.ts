import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (
	payload: Record<string, unknown>,
	secret: Secret,
	expireTime: string
): string => {
	return jwt.sign(payload, secret, {
		expiresIn: expireTime,
	});
};

const decodeToken = (token: string) => {
	return jwt.decode(token);
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
	return jwt.verify(token, secret) as JwtPayload;
};

export { generateToken, decodeToken, verifyToken };
