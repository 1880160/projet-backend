import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesRequestController } from './exercises-request.controller';
import { ExercisesRequestService } from './exercises-request.service';

describe('ExercisesRequestController', () => {
  let controller: ExercisesRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesRequestController],
      providers: [ExercisesRequestService],
    }).compile();

    controller = module.get<ExercisesRequestController>(ExercisesRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
