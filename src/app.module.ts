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
@Module({
  imports: [UsersModule,
  TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      autoLoadEntities : true, // autoload entites with forFeature
      synchronize: true,
    }),
  ExercisesModule,
  ExercisesRequestModule

  ],
  controllers: [AppController],
  providers: [AppService,

  ],
})
export class AppModule {}
