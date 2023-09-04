import mongoose, { Document, Schema } from "mongoose";

// Define the Campaign schema
const campaignSchema = new Schema(
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
		},
	}
);

// Define the Campaign document interface
interface CampaignDocument extends Document {
	title: string;
	description: string;
	isActive: boolean;
	timestamp: Date;
}

// Create the Campaign model
const Campaign = mongoose.model<CampaignDocument>("Campaign", campaignSchema);

export default Campaign;
