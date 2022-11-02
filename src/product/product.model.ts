import { index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { text } from 'telegraf/typings/button';
import { IPrice } from ".././interfaces/IPrice";


export class ProductCharacteristic {

	@prop()
	name: string;

	@prop()
	value: string;
}

export interface ProductModel extends Base { }

// @index({title: 'text', productId: 'text}) позволяет вешать текстовый индекс для нескольких полей и вешать обычный индекс
@index({productId: 'text', title: 'text'})
export class ProductModel extends TimeStamps {

	@prop() //{ unique: true }
	productId: string; // код продукта 

	@prop({index: true})
	sortId: number;

	@prop({ type: () => [Number], _id: false })
	categories: number[];

	@prop()
	image: string; // нужно тоже подумать как будет храниться или ссылаться 

	@prop()
	title: string; // название товара

	@prop()
	description: string; // описание товара

	@prop()
	seoText: string

	@prop({ type: [ProductCharacteristic], _id: false }) // отключить айди для характеристик
	characteristics: ProductCharacteristic[]; // динамические характеристики ключ значение

	@prop({ type: () => [IPrice], _id: false })
	priceProduct: IPrice[]; // единица измерения и цена для нее

	@prop({ type: () => [IPrice], _id: false })
	oldPriceProduct: IPrice[]; // единица измерения и цена для нее

	@prop()
	count: number; //остаток

	@prop({ type: () => [String], _id: false }) // нужно подумать как лучше сделать(будет поиск по тегам)
	tags: string[];
}
