import mongoose from "mongoose";
import { createUser, userExist } from "../lib/user";

const connectDB = async () => {
	await mongoose.connect(process.env.DATABASE_URL as string);
	console.log("Database connected");

	// Check if the admin user already exists
	const email = process.env.ADMIN_EMAIL || "admin@subsify.com";
	const password = process.env.ADMIN_PASS || "express1234//";
	const adminUser = await userExist(email);

	if (!adminUser) {
		// If the admin user doesn't exist, create it

		await createUser(email, password);

		console.log(`
				Admin user created successfully\n
				Email: ${email}\n
				Password: ${password}
			`);
	}
};

export default connectDB;
