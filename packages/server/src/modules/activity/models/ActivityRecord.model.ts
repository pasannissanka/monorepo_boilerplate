import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../modules/user/models/User";
import { ActivityData } from "./ActivityData.model";

@Entity()
@ObjectType()
export class ActivityRecord extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field(() => User)
  @ManyToOne(type => User, user => user.activityRecords, { cascade: true })
  user: User;

  @Field(() => ActivityData)
  @OneToOne(type => ActivityData, { cascade: true }) @JoinColumn()
  activityData: ActivityData;

  @Field(() => String)
  @Column()
  message: string;

  @Field(() => String)
  @Column()
  action: string;

  @Field()
  @CreateDateColumn()
  created: Date;
}
