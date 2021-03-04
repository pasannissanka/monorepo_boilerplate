import { BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";
import { ActivityData } from "./ActivityData";
import { User } from "./User";


@Table
@ObjectType()
export class ActivityRecord extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @Field(() => User)
  @BelongsTo(() => User)
  user: User;

  @Field(() => ActivityData)
  @HasOne(() => ActivityData)
  activityData: ActivityData;

  @Field(() => String)
  @Column
  message: string;

  @Field(() => String)
  @Column
  action: string;

  @Field()
  @CreatedAt
  created: Date;
}
