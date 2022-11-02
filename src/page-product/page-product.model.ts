import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface PageProductModel extends Base { }

export class PageProductModel extends TimeStamps {
	
	@prop({unique: true})
	pageId: number;

	@prop({index: true})
	parentId: number;

	@prop()
	sortId: number

	@prop()
	title: string;

	@prop()
	description: string;

	@prop()
	seoText: string
}
