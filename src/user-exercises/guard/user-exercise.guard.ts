
import { Injectable, CanActivate, ExecutionContext, LoggerService, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { Logger } from '@nestjs/common';
import { UserExercisesService } from '../user-exercises.service';
import { User } from 'src/users/user/user.entity';
import { UserRole } from 'src/users/user/user-role/user-roles.enum';
import { UserExercise } from '../entities/user-exercise.entity';
@Injectable()
export class UserExerciseGuard implements CanActivate {
     private readonly logger = new Logger(UserExerciseGuard.name, { timestamp: true });
    constructor(private readonly usersService : UsersService,
        private readonly userExerciseService : UserExercisesService
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
   const exerciseId = parseInt(request.params["id"]);

   if (!( typeof(exerciseId) == "number")){
    this.logger.error(`exercise id : ${exerciseId}`)
    throw new BadRequestException("The exerciseid is invalid")
   }
   const userExercise = await this.userExerciseService.findOne(exerciseId)
   if (!(userExercise instanceof UserExercise)){
    this.logger.error(userExercise)
    throw new BadRequestException(userExercise)
   }
   request.userExercise = userExercise;

   if(userExercise.user && userExercise.user.userId == internalUser.userId){
    return true;
   }
   if (internalUser.userType == UserRole.USER) {return false}
    return true;
  }
}
