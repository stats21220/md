import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrderController } from './order.controller';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: OrderModel,
        schemaOptions: {
          collection: 'Order'
        }
      }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {

}
