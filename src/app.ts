import express, { Application, Request, Response } from "express";
import applyMiddleware from "./middleware";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";

// express app
const app: Application = express();
applyMiddleware(app);
app.use(routes);

app.get("/", (req, res) => {
	res.json({ message: "hello world!" });
});

app.use(errorHandler);

export default app;
