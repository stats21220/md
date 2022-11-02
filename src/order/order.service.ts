import { CreateOrderDto } from './dto/create.order.dto';
import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
	constructor(@InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>) {

	}

	async create(dto: CreateOrderDto): Promise<DocumentType<OrderModel>> {
		return await this.orderModel.create(dto)
	}

	async delete(id: string): Promise<DocumentType<OrderModel> | null> {
		return await this.orderModel.findByIdAndDelete(id).exec()
	}

	async getId(id: string): Promise<DocumentType<OrderModel> | null> {
		return await this.orderModel.findById(id).exec()
	}
}
