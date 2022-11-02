import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { SubscribeEmailDTO } from './dto/subscribe-email.dto';
import { SubscribeEmailModel } from './subscribe-email.model';

@Injectable()
export class SubscribeEmailService {
	constructor(
		@InjectModel(SubscribeEmailModel)
		private readonly subscribeEmail: ModelType<SubscribeEmailModel>) {

	}

	async suscribe(dto: SubscribeEmailDTO): Promise<DocumentType<SubscribeEmailModel>> {
		return await this.subscribeEmail.create(dto)
	}
}
