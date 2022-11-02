import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindLvlProductDto } from './dto/find-lvl-product.dto';
import { ProductModel } from './product.model';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {

	}
	async create(dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
		return await this.productModel.create(dto)
	}

	async deleteById(id: string): Promise<DocumentType<ProductModel> | null> {
		return await this.productModel.findByIdAndDelete(id).exec()
	}

	async getById(id: string): Promise<DocumentType<ProductModel> | null> {
		return await this.productModel.findById(id).exec()
	}

	async updateById(id: string, dto: CreateProductDto): Promise<DocumentType<ProductModel> | null> {
		return await this.productModel.findByIdAndUpdate(id, dto, {new: true}).exec()
	}

	async find(dto: FindLvlProductDto) {
		return await this.productModel.find(dto).limit(dto.limit)
	}

	
	async findByText(text: string) {
		return await this.productModel.find({$text: {$search: text, $caseSensitive: false}}, {title: 1, productId: 1, _id: 0}).exec()
	}

	async findProductIdWithReviews(productId: string) {
		return await this.productModel.aggregate([
			{
				$match: { // ищет совпадение
					product_id: productId // находим по коду продукта
				}
			},
			{
				$lookup: { // подтягивает другую таблицу(добавляет поле)
					from: 'Review', // откуда подтянуть (документ)
					localField: '_id', // поле из входных документов (в данном примере от продукта)
					foreignField: 'product_id', // поле из документов коллекции (в данном примере от отзывов)
					as: 'reviews' // алиас для поля которое будет выведенно в результате
				}
			},
			{
				$addFields: { //Добавляет новые поля в документы
					riviewsCount: {$size: '$reviews'}, // size eказвывает на размер массива (ссылается на алиас )
					reviewAvg: {$avg: '$reviews.rating'}, // расчитываем среднее заначение 
					reviews: { // перезаписываем поле
						$function: { // будут работать mongodb4.4 и выше
							body: `function (reviews) {
								reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								return reviews
							}`,
							args: ['$reviews'],
							lang: 'js'
						}
					}
				}
			}
		]).exec() as (ProductModel & {review: ReviewModel[], reviewCount: number, reviewAvg: number})[] // не забывай ставить. as позваляет костануть к какому то типу
	}
}
