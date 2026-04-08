import { Test, TestingModule } from '@nestjs/testing';
import { UserExercisesService } from './user-exercises.service';

describe('UserExercisesService', () => {
  let service: UserExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExercisesService],
    }).compile();

    service = module.get<UserExercisesService>(UserExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
