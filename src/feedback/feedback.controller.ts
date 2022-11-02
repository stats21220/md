import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFeedbackDTO } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
	constructor(private readonly feedbackService: FeedbackService) { }

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateFeedbackDTO) {
		return await this.feedbackService.create(dto)
	}
}
