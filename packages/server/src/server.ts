require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { readFileSync } from "fs";
import { verify } from "jsonwebtoken";
import * as path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { GenerateAuthTokens, TokenPayload } from "./helpers/auth/auth_tokens";
import { User } from "./models/User";
import { customAuthChecker } from "./common/authChecker";
import { ContextType } from "./common/Context.type";
import { ActivityResolver, PostResolver, UserResolver } from "./resolvers";
import { sequelize } from "./sequelize";

const PORT = process.env.PORT as string;
const PATH = process.env.GRAPHQLPATH as string;

// Create a RSA public private keypair from http://travistidwell.com/jsencrypt/demo/
// or
// https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/
const publicKEYACCESS = readFileSync(
	path.resolve("./keys/public_access.key"),
	"utf8"
);
const publicKEYREFRESH = readFileSync(
	path.resolve("./keys/public_refresh.key"),
	"utf8"
);

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
	app.use(
		async (
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			const accessToken = req.cookies["access_token"];
			const refreshToken = req.cookies["refresh_token"];

			if (!refreshToken && !accessToken) {
				return next();
			}
			try {
				const decoded = verify(accessToken, publicKEYACCESS, {
					algorithms: ["RS256"],
				});

				(req as any).user = decoded;

				return next();
			} catch (error) { }

			if (!refreshToken) {
				return next();
			}
			let data: TokenPayload;
			try {
				data = verify(refreshToken, publicKEYREFRESH, {
					algorithms: ["RS256"],
				}) as TokenPayload;
			} catch (error) {
				return next();
			}

			const user = await User.findOne({ where: { id: data.uuid } });

			if (!user || user.count !== data.count) {
				return next();
			}

			const token = GenerateAuthTokens(user);

			res.cookie("refresh_token", token.refreshToken, {
				expires: new Date(Date.now() + 86400000 * 7),
			});
			res.cookie("access_token", token.accessToken, {
				expires: new Date(Date.now() + 3600000),
			});

			(req as any).user = data;
			return next();
		}
	);

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
