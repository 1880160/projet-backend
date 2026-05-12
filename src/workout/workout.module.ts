import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { UserExercisesModule } from 'src/user-exercises/user-exercises.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService],
  imports : [TypeOrmModule.forFeature([Workout]),
    UserExercisesModule, NotificationModule]
})
export class WorkoutModule {}
