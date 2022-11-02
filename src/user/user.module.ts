import { getJWTConfig } from './../configs/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from './strategies/jwt.stratagy';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User'
				}
			}
		]),
		ConfigService,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}),
		PassportModule,
	],
	controllers: [UserController],
	providers: [UserService, JwtStratagy, ConfigService]
})
export class UserModule { }
