import { IsEmail } from "class-validator";

export class SubscribeEmailDTO {

	@IsEmail()
	email: string
}