import { forwardRef, Global, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UsersModule } from 'src/users/users.module';
@Global()
@Module({
  imports : [TypeOrmModule.forFeature([Notification]),
  UsersModule
],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports : [NotificationService]
})
export class NotificationModule {}
