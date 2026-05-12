
import { BadRequestException, CanActivate, ExecutionContext, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserRole } from 'src/users/user/user-role/user-roles.enum';
import { User } from 'src/users/user/user.entity';
import { UsersService } from 'src/users/users.service';
import { NotificationService } from '../notification.service';
import { Notification } from '../entities/notification.entity';
@Injectable()
export class NotificationRouteIdValidGuard implements CanActivate {
     private readonly logger = new Logger(NotificationRouteIdValidGuard.name, { timestamp: true });
    constructor(
      private readonly usersService : UsersService,
      private readonly notificationService : NotificationService
    ) {}
  async canActivate(
    context: ExecutionContext,
    ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    if (!request.user){
        this.logger.error("User was not logged")
        throw new InternalServerErrorException("An internal Error occured, please contact the admin")
    }
    const user = request.user;
    if (!request.user.sub){
      this.logger.error("User does not have a sub field")
        throw new InternalServerErrorException("An internal Error occured, please contact the admin")
    }
    const internalUser : User | String = await this.usersService.findOne(user.sub);
   if (internalUser instanceof String){
    throw new BadRequestException(internalUser)
   }
   const notificationId = parseInt(request.params["id"]);

   if (!( typeof(notificationId) == "number")){
    this.logger.error(`notification id : ${notificationId}`)
    throw new BadRequestException("The notificationId is invalid")
   }
   const notification = await this.notificationService.findOne(notificationId)
   if (!(notification instanceof Notification)){
    this.logger.error(notification)
    throw new BadRequestException(notification ?? "This notification doesn't exist")
   }
   request.notification = notification;

   if(notification.user && notification.user.userId == internalUser.userId){
    return true;
   }
   this.logger.warn(`${notification.user} does not corresponds to ${internalUser.userId}`)
   if (internalUser.userType == UserRole.USER) {return false}
    return true;
  }
}
