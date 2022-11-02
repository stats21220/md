import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreatePageProductDto } from './dto/create-page-product.dto';
import { PageProductModel } from './page-product.model';

@Injectable()
export class PageProductService {
	constructor(@InjectModel(PageProductModel)
	private readonly pageProductModel: ModelType<PageProductModel>) {

	}

	async create(dto: CreatePageProductDto): Promise<DocumentType<PageProductModel>> {
		return await this.pageProductModel.create(dto)
	}

	async delete(pageId: string): Promise<DocumentType<PageProductModel> | null> {
		return await this.pageProductModel.findOneAndDelete({pageId}).exec()
	}


	async getId(pageId: string) {
		return await this.pageProductModel.findOne({pageId}, {
			pageId: 1,
			description: 1,
			parentId: 1, 
			title: 1, 
			seoText: 1
		})
	}
	

	async get() {
		return await this.pageProductModel.aggregate()
		.match({})
		.group({
				_id: '$parentId',
				pagesLvlNext: {$push: {pageId:'$pageId', parentId: '$parentId', title: '$title', sortId: '$sortId'}}
		})
		.sort({
				'page.parentId': 1,
				'page.sortId': 1
			}
		)
	}

	async update(pageId: string, dto: CreatePageProductDto): Promise<DocumentType<PageProductModel> | null> {
		return await this.pageProductModel.findOneAndUpdate({pageId}, dto, {new: true})
	}
}
