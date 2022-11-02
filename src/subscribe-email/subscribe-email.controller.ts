import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubscribeEmailDTO } from './dto/subscribe-email.dto';
import { SubscribeEmailService } from './subscribe-email.service';

@Controller('subscribe-email')
export class SubscribeEmailController {

	constructor(private readonly subscribeEmailService: SubscribeEmailService) { }

	@UsePipes(new ValidationPipe())
	@Post('subscribe')
	async subscribe(@Body() dto: SubscribeEmailDTO) {
		return await this.subscribeEmailService.suscribe(dto)
	}
}
