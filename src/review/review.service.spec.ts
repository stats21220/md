import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { getModelToken } from 'nestjs-typegoose';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;

  const exec = {exec: jest.fn()} // jest.fn специальный тип позволяет эмулировать мокать слушать ту или иную функцию 
  const reviewRepositoryFactory = () => ({
    find: () => exec
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {useFactory: reviewRepositoryFactory, provide: getModelToken('ReviewModel')} // фабрика 
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId working', async () => {
    const id = new Types.ObjectId().toHexString()
    reviewRepositoryFactory().find().exec.mockReturnValueOnce([{product_id: id}])
    const res = await service.findByProductId(id)
    expect(res[0].product_id).toBe(id) 
  })

});
