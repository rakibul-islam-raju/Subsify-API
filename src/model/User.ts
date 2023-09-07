import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcrypt";

export type IUser = {
	id: ObjectId;
	email: string;
	password: string;
};

export type IUserMethods = object;

export type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
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

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(this.password, saltRounds);
	this.password = hashedPassword;
	next();
});

userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
