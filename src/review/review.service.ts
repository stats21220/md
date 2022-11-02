import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewModel } from './review.model';

// class Leak { }
// const Leaks = []

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {
	}

	async create(dto: CreateReviewDTO): Promise<DocumentType<ReviewModel> | null> {
		return await this.reviewModel.create(dto)
	}

	async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		return await this.reviewModel.findByIdAndDelete(id).exec()
	}

	async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
		// Leaks.push(new Leak())
		return await this.reviewModel.find({ product_id: productId }).exec()
	}

	async deleteByProductId(product_id: string): Promise<{ deletedCount: number }> {
		return await this.reviewModel.deleteMany({product_id}).exec()
	}

}
