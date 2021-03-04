import { ApolloError } from "apollo-server-express";
import * as argon2 from "argon2";
import { Op, UniqueConstraintError } from "sequelize";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ActivityRecordBuilder } from "../../../helpers/activity/ActivityRecordBuilder";
import { GenerateAuthTokens } from "../../../helpers/auth/auth_tokens";
import { User } from "../../../models/User";
import { ContextType } from "../../common/types/Context.type";
import {
	ChangePasswordInput,
	LoginUserInput,
	RegisterUserInput,
	UserQueryParams,
	UserQueryResponse,
	UserResponse
} from "../types/user.type";

@Resolver()
export class UserResolver {
	private ARBuilder: ActivityRecordBuilder;

	constructor() {
		this.ARBuilder = new ActivityRecordBuilder("user", "auth");
	}

	@Authorized()
	@Query(() => UserQueryResponse)
	async getUsers(
		@Arg("input") input: UserQueryParams,
	): Promise<UserQueryResponse> {

		let nameQ, emailQ, usernameQ;
		if (input.name) {
			nameQ = {
				[Op.or]: [
					{
						firstName: {
							[Op.iLike]: `%${input?.name}%`
						},
					}, {
						lastName: {
							[Op.iLike]: `%${input?.name}%`
						},
					}, {
						username: {
							[Op.iLike]: `%${input?.name}%`
						},
					}
				]
			}
		}
		if (input.email) {
			emailQ = {
				email: {
					[Op.iLike]: `%${input?.email}%`
				}
			}
		}
		if (input.username) {
			usernameQ = {
				username: {
					[Op.iLike]: `%${input?.username}%`
				}
			}
		}
		let result;
		const whereclause = !nameQ && !emailQ && !usernameQ ? {} : {
			[Op.or]: [
				{ ...nameQ }, { ...emailQ }, { ...usernameQ }
			],
		}
		try {
			result = await User.findAndCountAll({
				where: whereclause,
				limit: input.limit,
				offset: input.offset
			})
		} catch (error) {
			console.log(error)
			throw new ApolloError("Internal server error");
		}
		const { rows, count } = result;

		return {
			count: count,
			users: rows
		}
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("input") input: RegisterUserInput,
		@Ctx() ctx: ContextType
	): Promise<UserResponse> {
		const hashedPassword = await argon2.hash(input.password);
		let user: User;
		try {
			user = await User.create({
				username: input.username,
				email: input.email,
				password: hashedPassword,
				firstName: input.firstName,
				lastName: input.lastName,
			});
		} catch (error) {
			if (error instanceof UniqueConstraintError) {
				if (error.errors[0].path === "username") {
					throw new ApolloError("Username already taken");
				} else {
					throw new ApolloError("Email already exists");
				}
			} else {
				throw new ApolloError("Internal server error");
			}
		}

		const { accessToken, refreshToken } = GenerateAuthTokens(user);

		ctx.res.cookie("refresh_token", refreshToken, {
			expires: new Date(Date.now() + 86400000 * 7),
		});
		ctx.res.cookie("access_token", accessToken, {
			expires: new Date(Date.now() + 3600000),
		});

		await this.ARBuilder.create({
			action: "create",
			by: user.id,
			data: {
				id: user.id,
				type: "user"
			},
			message: "Self register"
		});

		return {
			user,
		};
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg("input") input: LoginUserInput,
		@Ctx() ctx: ContextType
	): Promise<UserResponse> {
		const user = await User.findOne({
			where: {
				[Op.or]: [
					{ username: input.emailOrUserName },
					{ email: input.emailOrUserName },
				]
			}
		});
		if (!user) {
			throw new ApolloError("Invalid username or password");
		}
		const isValid = await argon2.verify(user.password, input.password);
		if (!isValid) {
			throw new ApolloError("Invalid username or password");
		}

		const { accessToken, refreshToken } = GenerateAuthTokens(user);

		ctx.res.cookie("refresh_token", refreshToken, {
			expires: new Date(Date.now() + 86400000 * 7),
		});
		ctx.res.cookie("access_token", accessToken, {
			expires: new Date(Date.now() + 3600000),
		});

		return {
			user,
		};
	}

	@Authorized()
	@Mutation(() => String)
	async logout(@Ctx() ctx: ContextType): Promise<any> {
		const user = await User.findOne({ where: { email: ctx.user.email } });
		if (!user) {
			throw new ApolloError("User not found");
		}
		user.count += 1;
		try {
			await User.update(user, { where: { id: user.id } });
		} catch (error) {
			throw new ApolloError("Internal server error");
		}
		ctx.res.clearCookie("refresh_token");
		ctx.res.clearCookie("access_token");
		return "SUCCESS";
	}

	@Authorized()
	@Mutation(() => String)
	async changePasswordSelf(
		@Ctx() ctx: ContextType,
		@Arg("input") input: ChangePasswordInput
	): Promise<any> {
		const user = await User.findOne({ where: { email: ctx.user.email } });
		if (!user) {
			throw new ApolloError("User not found");
		}

		const isValid = await argon2.verify(user.password, input.oldPassword);
		if (!isValid) {
			throw new ApolloError("Invalid password");
		}

		const hashedPasswordNew = await argon2.hash(input.newPassword);
		user.password = hashedPasswordNew;
		try {
			await User.update(user, { where: { id: user.id } });
		} catch (error) {
			throw new ApolloError("Internal server error");
		}

		await this.ARBuilder.create({
			action: "change_pw",
			by: user.id,
			data: {
				id: user.id,
				type: "user"
			},
			message: "Self Password change"
		});

		return "SUCCESS";
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
