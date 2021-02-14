import * as argon2 from "argon2";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import * as jwt from "jsonwebtoken";
import { ContextType } from "../../common/types/Context.type";
import {
	LoginUserInput,
	RegisterUserInput,
	UserResponse,
} from "../types/user.type";
import { ApolloError } from "apollo-server-express";

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async getAllUsers(): Promise<Array<User>> {
		return User.find();
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("input") input: RegisterUserInput
	): Promise<UserResponse> {
		const hashedPassword = await argon2.hash(input.password);
		const user = User.create({
			username: input.username,
			email: input.email,
			password: hashedPassword,
		});
		try {
			await user.save();
		} catch (error) {
			if (error.detail.includes("already exists")) {
				if (error.detail.includes("username")) {
					throw new ApolloError("Username already taken");
				} else {
					throw new ApolloError("Email already exists");
				}
			}
			throw new ApolloError("Internal server error");
		}
		const accessToken = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.SECRET_KEY as string,
			{
				algorithm: "HS256",
				expiresIn: "7d",
			}
		);
		return {
			user,
			token: accessToken,
		};
	}

	@Mutation(() => UserResponse)
	async login(@Arg("input") input: LoginUserInput): Promise<UserResponse> {
		const user = await User.findOne({
			where: [
				{ email: input.emailOrUserName },
				{ username: input.emailOrUserName },
			],
		});
		if (!user) {
			throw new ApolloError("Invalid username or password");
		}
		const isValid = await argon2.verify(user.password, input.password);
		if (!isValid) {
			throw new ApolloError("Invalid username or password");
		}
		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.SECRET_KEY as string,
			{
				expiresIn: "7d",
			}
		);
		return {
			user,
			token,
		};
	}

	@Authorized()
	@Query(() => UserResponse, { nullable: true })
	async me(@Ctx() ctx: ContextType): Promise<UserResponse> {
		const user = await User.findOne({ where: { email: ctx.user.email } });
		if (user) {
			return {
				user,
			};
		}
		throw new ApolloError("User not found");
	}
}
