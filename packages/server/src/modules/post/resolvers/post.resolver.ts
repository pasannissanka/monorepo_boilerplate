import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SelectQueryBuilder } from "typeorm";
import { ActivityRecordBuilder } from "../../../helpers/activity/ActivityRecordBuilder";
import { ContextType } from "../../../modules/common/types/Context.type";
import { Post } from "../models/post";
import { PostSearchParams, PostSearchResponse } from "../types/post.types";

@Resolver()
export class PostResolver {
	private ARBuilder: ActivityRecordBuilder;

	constructor() {
		this.ARBuilder = new ActivityRecordBuilder("post");
	}

	@Authorized()
	@Query(() => PostSearchResponse)
	async getPosts(
		@Arg("input") input: PostSearchParams
	): Promise<PostSearchResponse> {
		let query: SelectQueryBuilder<Post> = Post.createQueryBuilder();

		if (input.title) {
			query.orWhere('Post.title ILIKE :searchTerm', { searchTerm: `%${input?.title}%` });
		}
		if (input.all) {
			query.orWhere('Post.title ILIKE :searchTerm', { searchTerm: `%${input?.all}%` });
			query.orWhere('Post.content ILIKE :searchTerm', { searchTerm: `%${input?.all}%` });
		}
		if (input.offset) {
			query.offset(input.offset)
		}
		if (input.limit) {
			query.limit(input.limit)
		}

		try {
			const [posts, count] = await query.getManyAndCount();
			return {
				posts,
				count
			}
		} catch (error) {
			throw new ApolloError("Internal server error");
		}
	}

	@Authorized()
	@Mutation(() => Post)
	async createPost(
		@Arg("title") title: string,
		@Arg("content") content: string,
		@Ctx() ctx: ContextType
	): Promise<Post> {
		const post = Post.create({ content, title });
		try {
			await post.save();
		} catch (error) {
			console.log(error);
			throw new ApolloError("Internal server error");
		}
		await this.ARBuilder.create({
			action: "create",
			by: ctx.user.uuid,
			data: {
				id: post.id!,
				type: "post"
			},
			message: "New Post Created"
		});

		return post;
	}
}
