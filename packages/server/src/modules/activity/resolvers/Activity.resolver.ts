import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { SelectQueryBuilder } from "typeorm";
import { ActivityRecordBuilder } from "../../../helpers/activity/ActivityRecordBuilder";
import { ContextType } from "../../../modules/common/types/Context.type";
import { ActivityRecord } from "../models/ActivityRecord.model";
import { ActivitiesFilterParams, ActivitiesResponse } from "../types/Activity.types";



@Resolver()
export class ActivityResolver {
  private ARBuilder: ActivityRecordBuilder;

  constructor() {
    this.ARBuilder = new ActivityRecordBuilder("activity");
  }

  @Authorized()
  @Query(() => ActivitiesResponse)
  async getActivites(
    @Arg("input") input: ActivitiesFilterParams,
    @Ctx() ctx: ContextType
  ): Promise<ActivitiesResponse> {

    let query: SelectQueryBuilder<ActivityRecord> = ActivityRecord.createQueryBuilder();
    query.leftJoinAndSelect("ActivityRecord.user", "user")
    query.leftJoinAndSelect("ActivityRecord.activityData", "activityData")

    if (input.type) {
      query.orWhere('ActivityRecord.action ILIKE :searchTerm', { searchTerm: `%${input?.type}%` });
    }
    if (input.offset) {
      query.offset(input.offset)
    }
    if (input.limit) {
      query.limit(input.limit)
    }

    // TODO: Multiple roles, (admin - all records)
    query.where("ActivityRecord.user.id = :uuid", { uuid: ctx.user.uuid });

    try {
      const [activities, count] = await query.getManyAndCount();

      // const results = await ActivityRecord.find({
      //   relations: ["user", "activityData"],
      //   where: {
      //     user: ctx.user.uuid
      //   }
      // })
      // return {
      //   activities: results,
      //   count: results.length
      // }
      return {
        activities,
        count
      }
    } catch (error) {
      throw new ApolloError("Internal server error");
    }
  }

}
