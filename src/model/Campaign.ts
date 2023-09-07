import mongoose, { Model, ObjectId, Schema } from "mongoose";

export type ICampaign = {
	id: ObjectId;
	title: string;
	description: string;
	isActive: boolean;
};

export type ICampaignMethods = object;

export type CampaignModel = Model<ICampaign, object, ICampaignMethods>;

const campaignSchema = new Schema<ICampaign, CampaignModel>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{
		timestamps: true,
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

const Campaign = mongoose.model<ICampaign, CampaignModel>(
	"Campaign",
	campaignSchema
);

export default Campaign;
