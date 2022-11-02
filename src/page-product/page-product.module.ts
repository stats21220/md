import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PageProductController } from './page-product.controller';
import { PageProductModel } from './page-product.model';
import { PageProductService } from './page-product.service';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: PageProductModel,
      schemaOptions: {
        collection: 'PageProduct'
      }
    }])
  ],
  controllers: [PageProductController],
  providers: [PageProductService]
})
export class PageProductModule { }
