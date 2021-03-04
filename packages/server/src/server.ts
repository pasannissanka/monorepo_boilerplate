require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { customAuthChecker } from "./common/authChecker";
import { ContextType } from "./common/Context.type";
import { AuthenticationMiddleware } from "./helpers/auth/auth_middleware";
import { ActivityResolver, PostResolver, UserResolver } from "./resolvers";
import { sequelize } from "./sequelize";

const PORT = process.env.PORT as string;
const PATH = process.env.GRAPHQLPATH as string;

const main = async () => {
	// Create db connection
	await sequelize.sync();

	const app = express();

	app.use(
		cors({
			credentials: true,
			origin: "http://localhost:3000",
		})
	);

	const schema = await buildSchema({
		resolvers: [UserResolver, PostResolver, ActivityResolver],
		authChecker: customAuthChecker,
	});

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }) => {
			const context: ContextType = {
				req,
				res,
				user: (req as any).user,
			};
			return context;
		},
		debug: false,
	});

	app.get("/", (_, res) => {
		res.send("Hi");
	});

	app.use(cookieParser());

	// Authentication using access tokens and refresh tokens
	app.use(AuthenticationMiddleware);

	apolloServer.applyMiddleware({ app, path: PATH, cors: false });

	// Global error handler
	app.use(function (
		err: Error,
		_: any,
		res: express.Response,
		next: express.NextFunction
	) {
		if (err) {
			res.status(401).send("Internal Server Error");
		} else {
			console.log(err);
			next(err);
		}
	});

	app.listen(PORT, () => {
		console.log(`🚀 Server started at http://localhost:${PORT}`);
		console.log(`🚀 GraphQL server at http://localhost:${PORT}${PATH}`);
	});
};

main();
