import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define the User schema
const userSchema = new Schema({
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
});

// Add a pre-save middleware to hash the password before saving to the database
userSchema.pre<UserDocument>("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(this.password, saltRounds);
	this.password = hashedPassword;
	next();
});

// Create a method to compare a given password with the hashed password in the database
userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	return bcrypt.compare(candidatePassword, this.password);
};

// Define the User document interface
interface UserDocument extends Document {
	email: string;
	password: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the User model
const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
