import { Column, CreatedAt, DataType, Default, HasMany, IsUUID, Table, Unique, UpdatedAt, Model, PrimaryKey } from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";
import { ActivityRecord } from "./ActivityRecord";

@Table
@ObjectType()
export class User extends Model {
	@Field(() => ID)
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id: string;

	@Field(() => String)
	@Unique
	@Column(DataType.STRING)
	username!: string;

	@Field(() => String)
	@Unique
	@Column(DataType.STRING)
	email!: string;

	@Field(() => String)
	@Column(DataType.STRING)
	firstName!: string;

	@Field(() => String)
	@Column(DataType.STRING)
	lastName!: string;

	@Default(0)
	@Column
	count!: number;

	@Column
	password!: string;

	@HasMany(() => ActivityRecord)
	activityRecords: ActivityRecord[];

	@Field()
	@CreatedAt
	created: Date;

	@Field()
	@UpdatedAt
	updated: Date;
}
