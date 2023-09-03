import express, { Application } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import YAML, { load } from "yamljs";
import OpenApiValidator from "express-openapi-validator";

const swaggerDoc = YAML.load("./swagger.yaml");

const applyMiddleware = (app: Application) => {
	app.use(express.json());
	app.use(morgan("dev"));
	app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
	// app.use(
	// 	OpenApiValidator.middleware({
	// 		apiSpec: "./swagger.yaml",
	// 	})
	// );
};

export default applyMiddleware;
