
import { Injectable, CanActivate, ExecutionContext, LoggerService, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { Logger } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserRole } from '../user/user-role/user-roles.enum';
@Injectable()
export class AdminGuard implements CanActivate {
     private readonly logger = new Logger(AdminGuard.name, { timestamp: true });
    constructor(private readonly usersService : UsersService,
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

   if (internalUser.userType == UserRole.USER) {return false}
    return true;
  }
}
