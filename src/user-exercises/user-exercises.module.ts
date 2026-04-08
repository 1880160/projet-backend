import { Module } from '@nestjs/common';
import { UserExercisesService } from './user-exercises.service';
import { UserExercisesController } from './user-exercises.controller';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExercise } from './entities/user-exercise.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [UserExercisesController],
  providers: [UserExercisesService],
  imports : [UsersModule, ExercisesModule,
    TypeOrmModule.forFeature([UserExercise])
  ]
})
export class UserExercisesModule {}
