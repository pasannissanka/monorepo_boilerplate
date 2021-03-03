import { Field, InputType, Int, ObjectType } from "type-graphql";
import { ActivityRecord } from "../../../models/ActivityRecord";


@InputType()
export class ActivitiesFilterParams {
  @Field(() => String, { nullable: true })
  type?: string;

  // @Field(() => String, { nullable: true })
  // all?: string;
  // @Field(() => String, {nullable: true})
  // status?: string;

  @Field(() => Int, { nullable: true })
  limit?: number;
  @Field(() => Int, { nullable: true })
  offset?: number;
}

@ObjectType()
export class ActivitiesResponse {
  @Field(() => [ActivityRecord])
  activities!: ActivityRecord[];
  @Field(() => Int)
  count!: number;
}
