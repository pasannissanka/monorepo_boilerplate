import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../modules/user/models/User";
import { ActivityData } from "./ActivityData.model";

@Entity()
@ObjectType()
export class ActivityRecord extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne(type => User, user => user.activityRecords, { cascade: true })
  user: User;

  @OneToOne(type => ActivityData, { cascade: true }) @JoinColumn()
  activityData: ActivityData;

  @Column()
  message: string;

  @Column()
  action: string;
}
