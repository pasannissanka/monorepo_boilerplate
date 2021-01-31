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
				return {
					errors: [
						{
							message: "username/email already exisits",
							field: "username/email",
						},
					],
				};
			}
			return {
				errors: [
					{
						message: "Registration error",
						field: "",
					},
				],
			};
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

	@Mutation(() => UserResponse)
	async login(@Arg("input") input: LoginUserInput): Promise<UserResponse> {
		const user = await User.findOne({
			where: [
				{ email: input.emailOrUserName },
				{ username: input.emailOrUserName },
			],
		});
		if (!user) {
			return {
				errors: [
					{
						message: "user not found",
						field: "email/username",
					},
				],
			};
		}
		const isValid = await argon2.verify(user.password, input.password);
		if (!isValid) {
			return {
				errors: [
					{
						message: "invalid login",
						field: "password",
					},
				],
			};
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
		return {
			errors: [
				{
					message: "invalid login",
					field: "user",
				},
			],
		};
	}
}
