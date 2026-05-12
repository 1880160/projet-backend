import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user/user.entity';
import { ExercisesModule } from './exercises/exercises.module';
import { AuthModule } from './users/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ExercisesRequestModule } from './exercises/exercises-request/exercises-request.module';
import { UserExercisesModule } from './user-exercises/user-exercises.module';
import { WorkoutModule } from './workout/workout.module';
import { NotificationModule } from './notification/notification.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [UsersModule,
  EventEmitterModule.forRoot(
    {
  // set this to `true` to use wildcards
  wildcard: false,
  // the delimiter used to segment namespaces
  delimiter: '.',
  // set this to `true` if you want to emit the newListener event
  newListener: false,
  // set this to `true` if you want to emit the removeListener event
  removeListener: false,
  // the maximum amount of listeners that can be assigned to an event
  maxListeners: 10,
  // show event name in memory leak message when more than maximum amount of listeners is assigned
  verboseMemoryLeak: false,
  // disable throwing uncaughtException if an error event is emitted and it has no listeners
  ignoreErrors: false,
    }
  ),
  TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      autoLoadEntities : true, // autoload entites with forFeature
      synchronize: true,
    }),
  ExercisesModule,
  ExercisesRequestModule,
  UserExercisesModule,
  WorkoutModule,
  NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService,

  ],
})
export class AppModule {}
