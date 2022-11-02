import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { IPrice } from '.././interfaces/IPrice';

export interface OrderModel extends Base { }

export class OrderProduct {

	@IsString()
	@prop()
	product_id: string;

	@IsString()
	@prop()
	image: string;

	@IsString()
	@prop()
	title: string;

	@IsArray()
	@prop({ type: [IPrice], _id: false })
	priceProduct: IPrice[];

	@IsNumber()
	@prop()
	count: number;
}

export class OrderModel extends TimeStamps {

	@IsArray()
	@prop({ type: () => [OrderProduct], _id: false })
	products: OrderProduct[];

	@IsNumber()
	@prop()
	amount: number;

	@IsNumber()
	@prop()
	userId: number;
}