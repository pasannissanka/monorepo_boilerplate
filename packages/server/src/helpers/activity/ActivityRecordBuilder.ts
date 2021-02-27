import { ActivityRecord } from "../../modules/activity/models/ActivityRecord.model";

export interface IActivityInput {
  action: "create" | "edit" | "delete" | "change_pw";
  message: string;
  by: number;
  data: {
    type: string;
    id: number;
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
    const aR = ActivityRecord.create({
      action: `${this.action}/${input.action}`,
      message: input.message,
      user: { id: input.by },
      activityData: {
        type: input.data.type,
        f_id: input.data.id
      }
    })

    try {
      await aR.save()
    } catch (error) {
      console.error('ACTIVITY RECORD CREATE ERROR! : ', error);
    }

    return aR;
  }
}