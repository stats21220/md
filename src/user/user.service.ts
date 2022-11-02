import { UserModel } from './user.model';
import { UserDTO } from './dto/user.dto';
import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { compare, genSalt, hash } from 'bcryptjs'
import { USER_NOT_FOUND_ERROR, USER_PASSWORD_ERROR } from './user.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>, 
		private readonly jwtService: JwtService
		) {
	}
	async create(dto: Omit<UserDTO, 'passwordHash'>) {
		const salt = await genSalt(10) // позволяет генерировать соль (10 сколько раз)
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt), // хеширую пароль
			password: dto.password,
			firstName: dto.firstName,
			lastName: dto.lastName,
			phone: dto.phone,
			city: dto.city
		})
		return newUser.save() // после создания ручного сохраняет 
	}

	async findUser(email: string) {
		return await this.userModel.findOne({email}).exec()
	}

	async validateUser(email: string, password: string) {
		const user = await this.findUser(email)
		if (!user) {
			throw new HttpException(USER_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
		const isCorrectPassword = await compare(password, user.passwordHash)
		if(!isCorrectPassword) {
			throw new UnauthorizedException(USER_PASSWORD_ERROR)
		}

		return { email }
	}

	async update(userId: string, dto: Omit<UserModel, 'password_hash'>) {
		return await this.userModel.findByIdAndUpdate(userId, dto, {new: true}).exec()
	}

	async login(email: string) {
		const payload = { email }
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}

