import { IsString, IsNumber, Min, Max } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDTO {

	@IsString()
	product_id: Types.ObjectId;

	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsNumber()
	@Min(1, { message: 'Рейтинг не может быть меньше 1' })
	@Max(5, {message: 'Рейтинг не может быть больше 5'})
	rating: number;
}