const saltRounds = 10;
const jwtAccessSecret = "secret321//";
const jwtAccessExpiresIn = "1d";
const jwtRefreshSecret = "secret789//";
const jwtRefreshExpiresIn = "7d";

const totalItems = 0;
const limit = 10;
const offset = 0;
const sortType = "desc";
const sortBy = "updatedAt";
const search = "";

export default {
	saltRounds,
	jwtAccessSecret,
	jwtRefreshSecret,
	jwtAccessExpiresIn,
	jwtRefreshExpiresIn,
	totalItems,
	limit,
	offset,
	sortType,
	sortBy,
	search,
};
