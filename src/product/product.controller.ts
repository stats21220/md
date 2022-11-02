import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FindLvlProductDto } from './dto/find-lvl-product.dto';
import { PRODUCTS_NOT_FOUND_ERROR, PRODUCT_ID_NOT_FOUND_ERROR } from './product.constants';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {

	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return await this.productService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProductId = await this.productService.deleteById(id)
		if (!deletedProductId) {
			throw new NotFoundException(PRODUCT_ID_NOT_FOUND_ERROR)
		}
		return deletedProductId
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
		const updatedByProductId = await this.productService.updateById(id, dto)
		if (!updatedByProductId) {
			throw new NotFoundException(PRODUCT_ID_NOT_FOUND_ERROR)
		}
		return updatedByProductId
	}

	@Get('findByText/:text')
	async findByText(@Param('text') text: string) {
		return await this.productService.findByText(text)
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const getByProductId = await this.productService.findProductIdWithReviews(id)
		if (!getByProductId.length) {
			throw new NotFoundException(PRODUCT_ID_NOT_FOUND_ERROR)
		}
		return getByProductId
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindLvlProductDto) {
		const findByProduct = await this.productService.find(dto)
		if (!findByProduct) {
			throw new HttpException('null', HttpStatus.BAD_REQUEST)
		} else if (findByProduct.length === 0) {
			throw new NotFoundException(PRODUCTS_NOT_FOUND_ERROR)
		}
		return findByProduct
	}
}
