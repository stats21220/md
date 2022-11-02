import { IdValidationPipe } from './../pipes/id-validation.pipe';
import { JwtAuthGuard } from './../user/guards/jwt.guard';
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
import { CreateReviewDTO } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';
import { UserEmail } from 'src/decorators/user-email.decorators';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {

	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDTO) {
		return await this.reviewService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedReviewId = await this.reviewService.delete(id)
		if (!deletedReviewId) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deletedReviewId
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) productId: string, @UserEmail() email: string) {
		return await this.reviewService.findByProductId(productId)
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:productId')
	async deleteByProductId(@Param('productId', IdValidationPipe) product_id: string) {
		return await this.reviewService.deleteByProductId(product_id)
	}
}
