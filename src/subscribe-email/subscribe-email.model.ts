import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface SubscribeEmailModel extends Base { }

export class SubscribeEmailModel extends TimeStamps {

	@prop({ unique: true })
	email: string;
}
