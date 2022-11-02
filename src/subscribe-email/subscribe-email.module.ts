import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SubscribeEmailController } from './subscribe-email.controller';
import { SubscribeEmailModel } from './subscribe-email.model';
import { SubscribeEmailService } from './subscribe-email.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SubscribeEmailModel,
        schemaOptions: {
          collection: 'SubscribeEmail'
        }
      }
    ])
  ],
  controllers: [SubscribeEmailController],
  providers: [SubscribeEmailService]
})
export class SubscribeEmailModule { }
