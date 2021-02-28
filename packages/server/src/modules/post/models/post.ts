import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// TODO Add validation, auth decorators
@Entity()
@ObjectType()
export class Post extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number | null = null;

	@Field(() => String)
	@Column()
	title: string;

	@Field(() => String)
	@Column()
	content: string;

	@Field()
	@CreateDateColumn()
  created: Date;

	@Field()
  @UpdateDateColumn()
  updated: Date;
}
