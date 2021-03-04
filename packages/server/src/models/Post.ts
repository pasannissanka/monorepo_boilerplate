import { Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";

// TODO Add validation, auth decorators
@Table
@ObjectType()
export class Post extends Model {
	@Field(() => ID)
	@PrimaryKey
  @Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id: string;

	@Field(() => String)
	@Column
	title: string;

	@Field(() => String)
	@Column
	content: string;

	@Field()
	@CreatedAt
	created: Date;

	@Field()
	@UpdatedAt
	updated: Date;
}
