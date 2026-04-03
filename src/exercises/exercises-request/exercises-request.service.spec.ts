import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesRequestService } from './exercises-request.service';

describe('ExercisesRequestService', () => {
  let service: ExercisesRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExercisesRequestService],
    }).compile();

    service = module.get<ExercisesRequestService>(ExercisesRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
