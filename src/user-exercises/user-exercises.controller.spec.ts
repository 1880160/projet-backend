import { Test, TestingModule } from '@nestjs/testing';
import { UserExercisesController } from './user-exercises.controller';
import { UserExercisesService } from './user-exercises.service';

describe('UserExercisesController', () => {
  let controller: UserExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExercisesController],
      providers: [UserExercisesService],
    }).compile();

    controller = module.get<UserExercisesController>(UserExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
