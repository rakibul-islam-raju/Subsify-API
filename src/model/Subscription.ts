import mongoose, { Document, Model, Schema } from "mongoose";
import { ObjectType } from "typescript";

export type ISubscription = {
	id: ObjectType;
	email: string;
	campaign: string;
};

export type ISubscriptionMethods = object;

export type SubscriptionModel = Model<
	ISubscription,
	object,
	ISubscriptionMethods
>;

const subscriptionSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		campaign: {
			type: Schema.Types.ObjectId,
			ref: "Campaign",
			required: true,
		},
	},
	{
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				ret.id = doc._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

const Subscription = mongoose.model<ISubscription, SubscriptionModel>(
	"Subscription",
	subscriptionSchema
);

export default Subscription;
