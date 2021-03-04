import { ActivityData } from "../../models/ActivityData";
import { ActivityRecord } from "../../models/ActivityRecord";

export interface IActivityInput {
  action: "create" | "edit" | "delete" | "change_pw";
  message: string;
  by: string;
  data: {
    type: string;
    id: string;
  }
}

export class ActivityRecordBuilder {

  private action: string;

  constructor(module: string, resolver?: string) {
    this.action = module;

    if (resolver) {
      this.action = `${this.action}/${resolver}`;
    }
  }

  async create(input: IActivityInput) {
    try {
      const aR = await ActivityRecord.create({
        action: `${this.action}/${input.action}`,
        message: input.message,
        userId: input.by,
        activityData: {
          type: input.data.type,
          f_id: input.data.id
        }
      }, {
        include: [ActivityData]
      })
      return aR;
    } catch (error) {
      console.error('ACTIVITY RECORD CREATE ERROR! : ', error);
      return null;
    }

  }
}