import { UserModel } from './user.model';
import { FIND_USER_ERROR, USER_ID_NOT_FOUND } from './user.constants';
import { 
	BadRequestException,
	Body,
	Controller, 
	HttpException, 
	HttpStatus, 
	Param, 
	Patch, 
	Post, 
	UsePipes, 
	ValidationPipe 
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {

	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: Omit<UserDTO, 'passwordHash'>) {
		const oldLogin = await this.userService.findUser(dto.login)
		if (oldLogin) {
			throw new BadRequestException(FIND_USER_ERROR) // плохой запрос 
		}
		return await this.userService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@Post('auth')
	async login(@Body() {login, password}: Pick<UserDTO, 'login' | 'password'>) {
		const {email} = await this.userService.validateUser(login, password)
		return await this.userService.login(email)
	}

	@UsePipes(new ValidationPipe())
	@Patch(':userId')
	async updateUser(@Param('userId') userId: string, @Body() dto: Omit<UserModel, 'password_hash'>) {
		const userByUpdate = await this.userService.update(userId, dto)
		if (!userByUpdate) {
			throw new HttpException(USER_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return userByUpdate
	}
}
