import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ActivityRecord } from "../../../modules/activity/models/ActivityRecord.model";

@Entity()
@ObjectType()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Field(() => String)
	@Column({ unique: true })
	username!: string;

	@Field(() => String)
	@Column({ unique: true })
	email!: string;

	@Field(() => String)
	@Column()
	firstName!: string;

	@Field(() => String)
	@Column()
	lastName!: string;

	@Column({ default: 0 })
	count!: number;

	@Column()
	password!: string;

	@OneToMany(type => ActivityRecord, activityRecords => activityRecords.user)
	activityRecords: ActivityRecord[];
}
