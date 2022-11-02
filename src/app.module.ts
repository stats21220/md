import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PageProductModule } from './page-product/page-product.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SubscribeEmailModule } from './subscribe-email/subscribe-email.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // работа с env файлами
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}), // описание моделей и связывает с базой данных
		UserModule,
		UserModule,
		PageProductModule,
		ProductModule,
		ReviewModule,
		OrderModule,
		FeedbackModule,
		SubscribeEmailModule
	]
})
export class AppModule { }
