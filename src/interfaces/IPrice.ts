import { prop } from '@typegoose/typegoose';

export class IPrice {

	@prop()
	price: string;

	@prop()
	measuring: 'шт.' | 'м2' | 'упак.';
}
