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
    const aR = ActivityRecord.build({
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