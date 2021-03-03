import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { ActivityRecord } from "./ActivityRecord";

@Table
@ObjectType()
export class ActivityData extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Default(DataType.UUIDV4)
	@Column(DataType.UUID)
  id: string;

  @Field(() => String)
  @Column
  type: string;

  @Field(() => Int)
  @Column
  f_id: number;

  @ForeignKey(() => ActivityRecord)
  public activityRecordId: string;

  @BelongsTo(() => ActivityRecord)
  public activityRecord: ActivityRecord;
}

