require("dotenv").config();
import http from "http";
import app from "./app";
import connectDB from "./db/connectDB";

const server = http.createServer(app);

const port = process.env.PORT || 8000;
const main = async () => {
	try {
		await connectDB();
		server.listen(port, async () => {
			console.log("Server is listening on port 8000");
		});
	} catch (e) {
		console.log("Database Error");
		console.log(e);
	}
};

main();
