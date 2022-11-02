import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateFeedbackDTO } from './dto/create-feedback.dto';
import { FeedbackModel } from './feedback.model';

@Injectable()
export class FeedbackService {
	constructor(@InjectModel(FeedbackModel) private readonly feedBack: ModelType<FeedbackModel>) {

	}

	async create(dto: CreateFeedbackDTO): Promise<DocumentType<FeedbackModel>> {
		return await this.feedBack.create(dto)
	}
}
