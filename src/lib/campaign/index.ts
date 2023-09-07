import { IPagination } from "../../types";
import Campaign, { ICampaign } from "../../model/Campaign";
import { ApiError } from "../../utils/error";
import { pagination } from "../../utils/pagination";
import { ObjectId } from "mongoose";

const findAll = async (
	paginationOptions: Partial<IPagination>
): Promise<ICampaign[] | null> => {
	const { offset, limit, sortBy, sortType, search } =
		pagination.generatePaginationAndSortFields(paginationOptions);
	const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
	const filter = {
		title: { $regex: search, $options: "i" },
	};

	const campaigns = await Campaign.find(filter)
		.sort(sortStr)
		.skip(offset)
		.limit(limit);

	return campaigns;
};

const count = (search?: string): Promise<number | null> => {
	const filter = {
		title: { $regex: search ?? "", $options: "i" },
	};

	return Campaign.count(filter);
};

const create = async (
	title: string,
	description: string,
	isActive?: boolean
): Promise<ICampaign | null> => {
	if (!title) {
		throw new ApiError(400, "Title is required");
	}

	const article = new Campaign({
		title,
		description,
		isActive,
	});

	await article.save();
	return article;
};

const findSingleItem = async (id: ObjectId): Promise<ICampaign> => {
	if (!id) throw new ApiError(400, "Id is required");

	const campaign = await Campaign.findById(id);
	if (!campaign) {
		throw new ApiError(404, "Campaign not found");
	}

	return campaign;
};

const updateProperties = async (
	id: string,
	data: Partial<ICampaign>
): Promise<ICampaign | null> => {
	const campaign = await Campaign.findById(id);
	if (!campaign) {
		throw new ApiError(404, "Campaign not found");
	}

	Object.assign(campaign, data);

	const updatedCampaign = await campaign.save();

	return updatedCampaign;
};

const removeItem = async (id: string): Promise<ICampaign | null> => {
	const campaign = await Campaign.findById(id);
	if (!campaign) {
		throw new ApiError(404, "Campaign not found");
	}

	return await Campaign.findByIdAndDelete(id);
};

export default {
	findAll,
	create,
	count,
	findSingleItem,
	updateProperties,
	removeItem,
};
