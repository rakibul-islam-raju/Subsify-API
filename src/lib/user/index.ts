import User from "../../model/User";

const findUserByEmail = async (email: string) => {
	const user = await User.findOne({ email });
	return user ? user : false;
};

const userExist = async (email: string) => {
	const user = await findUserByEmail(email);
	return user ? true : false;
};

const createUser = async (email: string, password: string) => {
	const user = new User({ email, password });
	await user.save();
	return user;
};

export { userExist, createUser, findUserByEmail };
