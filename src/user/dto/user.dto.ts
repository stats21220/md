import { IsPhoneNumber, IsString } from "class-validator";

export class UserDTO {
	
	@IsString()
	login: string;

	@IsString()
	password: string; // просто пароль который потом будет сравниваться с хешом

	@IsString()
	passwordHash: string; //доделать под хеш	

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsPhoneNumber()
	@IsString()
	phone: string;

	@IsString()
	city: string;
}
