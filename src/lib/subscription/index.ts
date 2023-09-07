import { ApiError } from "../../utils/error";
import { ObjectId } from "mongoose";
import Subscription, { ISubscription } from "../../model/Subscription";
import campaignService from "../campaign";

const userSubscribed = async (
	email: string,
	campaignId: ObjectId
): Promise<ISubscription | false> => {
	const subscription = await Subscription.findOne({
		campaign: campaignId,
		email,
	});
	return subscription ? subscription : false;
};

const subscribe = async (
	email: string,
	campaignId: ObjectId
): Promise<ISubscription | null> => {
	await campaignService.findSingleItem(campaignId);

	const isSubscribed = await userSubscribed(email, campaignId);
	if (isSubscribed)
		throw new ApiError(400, "You already subscribed for this campaign");

	const subscription = new Subscription({
		email,
		campaign: campaignId,
	});

	subscription.save();
	return subscription.populate("campaign");
};

const unsubscribe = async (
	campaignId: ObjectId,
	email: string
): Promise<ISubscription | null> => {
	await campaignService.findSingleItem(campaignId);

	const isSubscribed = await userSubscribed(email, campaignId);
	if (!isSubscribed)
		throw new ApiError(400, "You are not subscribed to this campaign");

	return await Subscription.findOneAndDelete(isSubscribed.id);
};

export default {
	userSubscribed,
	subscribe,
	unsubscribe,
};
