require("dotenv").config();
import app from "./app";
import connectDB from "./db/connectDB";

const port = process.env.PORT || 8000;
const main = async () => {
	try {
		await connectDB();
		app.listen(port, async () => {
			console.log("Server is listening on port 8000");
		});
	} catch (e) {
		console.log("Database Error");
		console.log(e);
	}
};

main();
