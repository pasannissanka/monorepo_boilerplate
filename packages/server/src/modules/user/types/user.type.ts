import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../models/User";

@InputType()
export class RegisterUserInput {
	@Field()
	username!: string;
	@Field()
	email!: string;
	@Field()
	password!: string;
}

@InputType()
export class LoginUserInput {
	@Field()
	emailOrUserName!: string;
	@Field()
	password!: string;
}

@ObjectType()
export class UserResponse {
	@Field(() => User, { nullable: true })
	user?: User;
	@Field(() => String, { nullable: true })
	token?: string;
}

