import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../models/User";

@InputType()
export class RegisterUserInput {
	@Field()
	@MaxLength(15)
	username!: string;

	@Field()
	@IsEmail()
	email!: string;

	@Field()
	@MinLength(6, {
    message: 'Password is too short',
  })
	password!: string;

	@Field()
	@MaxLength(30)
	firstName!: string;

	@Field()
	@MaxLength(30)
	lastName!: string;
	
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
}

@InputType()
export class ChangePasswordInput {
	@Field()
	oldPassword!: string;
	@Field()
	newPassword!: string;
}