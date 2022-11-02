import { IsNumber, IsString } from "class-validator";
import { PAGE_NUMBER_ID_ERROR, PAGE_NUMBER_PARENT_ID_ERROR } from "../page-product.constants";

export class CreatePageProductDto {

	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsString()
	seoText: string

	@IsNumber({}, {message: PAGE_NUMBER_ID_ERROR})
	pageId: number;

	@IsNumber({}, {message: PAGE_NUMBER_PARENT_ID_ERROR})
	parentId: number;

	@IsNumber()
	sortId: number;
}
