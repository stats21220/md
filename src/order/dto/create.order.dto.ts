import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { IPrice } from 'src/interfaces/IPrice';

export class OrderProductDto {

	@IsString()
	product_id: string;

	@IsString()
	image: string;

	@IsString()
	title: string;

	@IsArray()
	@ValidateNested()
	@Type(() => IPrice)
	priceProduct: IPrice[];

	@IsNumber()
	count: number;
}

export class CreateOrderDto {

	@IsArray()
	@ValidateNested()
	@Type(() => OrderProductDto)
	products: OrderProductDto[];

	@IsNumber()
	amount: number;

	@IsNumber()
	userId: number;
}