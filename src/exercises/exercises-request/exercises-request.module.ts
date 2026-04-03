import { Module } from '@nestjs/common';
import { ExercisesRequestService } from './exercises-request.service';
import { ExercisesRequestController } from './exercises-request.controller';
import { ExercisesModule } from '../exercises.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseRequest } from './entities/exercise-request.entity';

@Module({
  controllers: [ExercisesRequestController],
  providers: [ExercisesRequestService],
  imports : [ExercisesModule, UsersModule, TypeOrmModule.forFeature([ExerciseRequest])]
})
export class ExercisesRequestModule {}
