import mongoose, { Document, Schema } from "mongoose";

// Define the Subscription schema
const subscriptionSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	campaignId: {
		type: Schema.Types.ObjectId,
		ref: "Campaign",
		required: true,
	},
});

// Define the Subscription document interface
interface SubscriptionDocument extends Document {
	email: string;
	campaignId: mongoose.Types.ObjectId;
}

// Create the Subscription model
const Subscription = mongoose.model<SubscriptionDocument>(
	"Subscription",
	subscriptionSchema
);

export default Subscription;
