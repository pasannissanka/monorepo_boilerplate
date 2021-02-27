import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Post } from "../models/post";


@InputType()
export class PostSearchParams {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  all?: string;
  // @Field(() => String, {nullable: true})
  // status?: string;

  @Field(() => Int, { nullable: true })
  limit?: number;
  @Field(() => Int, { nullable: true })
  offset?: number;
}

@ObjectType()
export class PostSearchResponse {
  @Field(() => [Post])
  posts!: Post[];
  @Field(() => Int)
  count!: number;
}
