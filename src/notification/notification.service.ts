import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/users/user/user.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name, { timestamp: true });
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private eventEmitter: EventEmitter2,
    private userService: UsersService
  ) { }



  async createNotification(createNotificationDto: CreateNotificationDto) {
    const newUser: User | String = await this.userService.findOne(createNotificationDto.userId)
    if (newUser instanceof String) {
      throw new BadRequestException(newUser);
    }
    createNotificationDto.user = newUser;
    const newNotification = this.notificationRepository.create(createNotificationDto);
    const result = await this.notificationRepository.save(newNotification)
    this.eventEmitter.emit(`sse.notification.${createNotificationDto.userId}`, {
      message: 'notifications updated'
    });
    return result;
  }

  async findAll() {
    return await this.notificationRepository.find();
  }

  async findAllUser(userId: number) {
    return await this.notificationRepository.find({
      where: {
        user: { userId: userId }
      }
    })
  }


  async findOne(id: number) {
    return await this.notificationRepository.findOne({ where: { notificationId: id }, relations : {user : true} }).catch(
      () => {
        const message: String = `couldn't find notification with id : ${id}`;
        this.logger.warn(message, this);
        return message;
      }
    );
  }



  async updateNotification(id: number, updateNotificationDto: Partial<UpdateNotificationDto>) {
    return await this.notificationRepository.update(id, updateNotificationDto)
  }
  async removeNotification(userId: number, id: number) {
    const result = await this.notificationRepository.delete({ notificationId: id });
    this.eventEmitter.emit(`sse.notification.${userId}`, {
      message: 'notifications updated'
    });
    return result;
  }



}
