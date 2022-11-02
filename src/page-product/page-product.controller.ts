import { BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from './../user/guards/jwt.guard';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { CreatePageProductDto } from './dto/create-page-product.dto';
import { PAGE_PRODUCT_NOT_FOUND, PAGE_PRODUCT_ID_UNIQUE_ERROR } from './page-product.constants';
import { PageProductService } from './page-product.service';

@Controller('page')
export class PageProductController {
	constructor(private readonly pageProductServiec: PageProductService) {

	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreatePageProductDto) {
		try {
			return await this.pageProductServiec.create(dto)
		} catch {
			throw new BadRequestException(PAGE_PRODUCT_ID_UNIQUE_ERROR)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletePageId = await this.pageProductServiec.delete(id)
		if (!deletePageId) {
			throw new HttpException(PAGE_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deletePageId
	}

	@Get('getPage/:id')
	async getId(@Param('id') id: string) {
		const getPageId = await this.pageProductServiec.getId(id)
		if (!getPageId) {
			throw new HttpException(PAGE_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getPageId
	}

	@Get()
	async get() {
		const getPages = await this.pageProductServiec.get()
		if (!getPages) {
			throw new HttpException(PAGE_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getPages
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: CreatePageProductDto) {
		try {
			return await this.pageProductServiec.update(id, dto)
		} catch {
			throw new BadRequestException(PAGE_PRODUCT_ID_UNIQUE_ERROR)
		}
	}
}
