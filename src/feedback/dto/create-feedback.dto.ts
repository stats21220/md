import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateFeedbackDTO {

	@IsString()
	name: string;

	@IsPhoneNumber()
	phone: string;

	@IsEmail()
	email: string;

	@IsString()
	comment: string;
}