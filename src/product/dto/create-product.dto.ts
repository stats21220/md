import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { IPrice } from "src/interfaces/IPrice";


export class ProductCharacteristicsDto {

	@IsString()
	name: string;

	@IsString()
	value: string;
}

export class CreateProductDto {

	@IsString()
	productId: string; // код продукта 

	@IsNumber()
	sortId: number;

	@IsNumber({}, {each: true})
	categories: number[]

	@IsString()
	image: string; // нужно тоже подумать как будет храниться или ссылаться 

	@IsString()
	title: string; // название товара

	@IsString()
	description: string; // описание товара

	@IsString()
	seoText: string;

	@IsArray()
	@ValidateNested()
	@Type(() => ProductCharacteristicsDto)
	characteristics: ProductCharacteristicsDto[]; // динамические характеристики ключ значение

	@IsArray()
	@ValidateNested()
	@Type(() => IPrice)
	priceProduct: IPrice[]; // единица измерения и цена для нее

	@IsArray()
	@ValidateNested()
	@Type(() => IPrice)
	oldPriceProduct: IPrice[]

	@IsNumber()
	count: number; //остаток

	@IsString({each: true})
	tags: string[];
}
