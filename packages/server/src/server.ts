require("dotenv").config();
import "reflect-metadata";
import * as express from "express";
import * as jwt from "express-jwt";
import * as cors from 'cors'
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { PostResolver, UserResolver } from "./resolvers";
import { customAuthChecker } from "./modules/common/authChecker";
import { ContextType } from "./modules/common/types/Context.type";

const PORT = process.env.PORT as string;
const PATH = process.env.GRAPHQLPATH as string;

const main = async () => {
	await createConnection();

	const app = express();

	app.use(cors({
		credentials: true,
		origin: "http://localhost:3000"
	}))

	const schema = await buildSchema({
		resolvers: [PostResolver, UserResolver],
		authChecker: customAuthChecker,
	});

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req }) => {
			const context: ContextType = {
				req,
				user: (req as any).user,
			};
			return context;
		},
		debug: process.env.NODE_ENV !== "production",
	});

	app.get("/", (_, res) => {
		res.send("Hi");
	});

	app.use(
		PATH,
		jwt({
			algorithms: ["HS256"],
			secret: process.env.SECRET_KEY as string,
			credentialsRequired: false,
		})
	);

	apolloServer.applyMiddleware({ app, path: PATH, cors: false });

	app.use(function (
		err: Error,
		_: any,
		res: express.Response,
		next: express.NextFunction
	) {
		if (err) {
			res.status(401).send("Internal Server Error");
		} else {
			next(err);
		}
	});

	app.listen(PORT, () => {
		console.log(`🚀 Server started at http://localhost:${PORT}`);
		console.log(`🚀 GraphQL server at http://localhost:${PORT}${PATH}`);
	});
};

main();
