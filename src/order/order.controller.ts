import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { CreateOrderDto } from './dto/create.order.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { ORDER_NOT_FOUND } from './order.constants';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) { }

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateOrderDto) {
		return await this.orderService.create(dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deleteOrderId = await this.orderService.delete(id)
		if (!deleteOrderId) {
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deleteOrderId
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const getOrderId = await this.orderService.getId(id)
		if (getOrderId) {
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getOrderId
	}
}
