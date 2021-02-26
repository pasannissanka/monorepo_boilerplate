import { ApolloError } from "apollo-server-express";
import * as argon2 from "argon2";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { createQueryBuilder, SelectQueryBuilder } from "typeorm";
import { GenerateAuthTokens } from "../../../helpers/auth/auth_tokens";
import { ContextType } from "../../common/types/Context.type";
import { User } from "../models/User";
import {
	ChangePasswordInput,
	LoginUserInput,
	RegisterUserInput,
	UserQueryParams,
	UserQueryResponse,
	UserResponse,
} from "../types/user.type";

@Resolver()
export class UserResolver {

	@Authorized()
	@Query(() => UserQueryResponse)
	async getUsers(
		@Arg("input") input: UserQueryParams,
	): Promise<UserQueryResponse> {

		let query: SelectQueryBuilder<any> = createQueryBuilder("user");
		if (input.name) {
			query.orWhere('User.firstName ILIKE :searchTerm', { searchTerm: `%${input?.name}%` })
				.orWhere('User.lastName ILIKE :searchTerm', { searchTerm: `%${input?.name}%` })
				.orWhere('User.username ILIKE :searchTerm', { searchTerm: `%${input?.name}%` })
		}
		if (input.email) {
			query.orWhere('User.email ILIKE :searchTerm', { searchTerm: `%${input?.email}%` })
		}
		if (input.username) {
			query.orWhere('User.username ILIKE :searchTerm', { searchTerm: `%${input?.username}%` })
		}
		if (input.offset) {
			query.offset(input.offset)
		}
		if (input.limit) {
			query.limit(input.limit)
		}

		let result;
		try {
			result = await query.getManyAndCount();
		} catch (error) {
			console.log(error)
			throw new ApolloError("Internal server error");
		}
		const [users, count] = result;

		return {
			users,
			count
		}
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("input") input: RegisterUserInput,
		@Ctx() ctx: ContextType
	): Promise<UserResponse> {
		const hashedPassword = await argon2.hash(input.password);
		const user = User.create({
			username: input.username,
			email: input.email,
			password: hashedPassword,
			firstName: input.firstName,
			lastName: input.lastName,
		});

		try {
			await user.save();
		} catch (error) {
			console.log(error);
			if (error.detail?.includes("already exists")) {
				if (error.detail.includes("username")) {
					throw new ApolloError("Username already taken");
				} else {
					throw new ApolloError("Email already exists");
				}
			}
			throw new ApolloError("Internal server error");
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

	@Mutation(() => UserResponse)
	async login(
		@Arg("input") input: LoginUserInput,
		@Ctx() ctx: ContextType
	): Promise<UserResponse> {
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
			await User.update(user.id, user);
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
			await User.update(user.id, user);
		} catch (error) {
			throw new ApolloError("Internal server error");
		}
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
