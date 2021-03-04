import { ApolloError } from "apollo-server-express";
import { Op } from "sequelize";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ActivityRecordBuilder } from "../../helpers/activity/ActivityRecordBuilder";
import { Post } from "../../models/Post";
import { ContextType } from "../../common/Context.type";
import { PostSearchParams, PostSearchResponse } from "./post.types";

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

		let titleQ, allQ;
		if (input.title) {
			titleQ = {
				title: {
					[Op.iLike]: `%${input?.title}%`
				}
			}
		}
		if (input.all) {
			allQ = {
				[Op.or]: [
					{
						title: {
							[Op.iLike]: `%${input?.all}%`
						}
					},
					{
						content: {
							[Op.iLike]: `%${input?.all}%`
						}
					}
				]
			}
		}
		const whereclause = !titleQ && !allQ ? {} : {
			[Op.or]: [
				{ ...titleQ }, { ...allQ }
			]
		}
		try {
			const { rows, count } = await Post.findAndCountAll({
				where: whereclause,
				limit: input.limit,
				offset: input.offset
			})
			return {
				posts: rows,
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
		// TODO check length, remove new lines
		const post = Post.build({ content, title });
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
