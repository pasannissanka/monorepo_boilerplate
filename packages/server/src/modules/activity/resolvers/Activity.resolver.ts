import { ApolloError } from "apollo-server-express";
import { Op } from "sequelize";
import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { ActivityData } from "../../../models/ActivityData";
import { ActivityRecord } from "../../../models/ActivityRecord";
import { User } from "../../../models/User";
import { ContextType } from "../../../modules/common/types/Context.type";
import { ActivitiesFilterParams, ActivitiesResponse } from "../types/Activity.types";

@Resolver()
export class ActivityResolver {

  @Authorized()
  @Query(() => ActivitiesResponse)
  async getActivites(
    @Arg("input") input: ActivitiesFilterParams,
    @Ctx() ctx: ContextType
  ): Promise<ActivitiesResponse> {

    try {
      const result = await ActivityRecord.findAndCountAll({
        include: [User, ActivityData],
        where: {
          userId: {
            [Op.eq]: ctx.user.uuid
          }
        },
        limit: input.limit,
        offset: input.offset
      });

      return {
        activities: result.rows,
        count: result.count
      }
    } catch (error) {
      console.log(error)
      throw new ApolloError("Internal server error");
    }
  }

}
