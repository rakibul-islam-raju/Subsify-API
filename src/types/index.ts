export type ITimeStamp = {
	createdAt: string;
	updatedAt: string;
};

export type IPagination = {
	limit: number;
	offset: number;
	sortType?: string;
	sortBy?: string;
	search?: string;
};
