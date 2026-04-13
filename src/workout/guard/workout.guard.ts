
import { BadRequestException, CanActivate, ExecutionContext, Injectable, InternalServerErrorException, Logger, LoggerService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserExercise } from 'src/user-exercises/entities/user-exercise.entity';
import { UserExercisesService } from 'src/user-exercises/user-exercises.service';
import { UserRole } from 'src/users/user/user-role/user-roles.enum';
import { User } from 'src/users/user/user.entity';
import { UsersService } from 'src/users/users.service';
import { Workout } from 'src/workout/entities/workout.entity';
import { WorkoutService } from 'src/workout/workout.service';
@Injectable()
export class WorkoutRouteIdValidGuard implements CanActivate {
     private readonly logger = new Logger(WorkoutRouteIdValidGuard.name, { timestamp: true });
    constructor(
      private readonly usersService : UsersService,
      private readonly workoutService : WorkoutService
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
   const workoutId = parseInt(request.params["id"]);

   if (!( typeof(workoutId) == "number")){
    this.logger.error(`workout id : ${workoutId}`)
    throw new BadRequestException("The workoutid is invalid")
   }
   const workout = await this.workoutService.findOne(workoutId)
   if (!(workout instanceof Workout)){
    this.logger.error(workout)
    throw new BadRequestException(workout)
   }
   request.workout = workout;

   if(workout.user && workout.user.userId == internalUser.userId){
    return true;
   }
   this.logger.warn(`${workout.user} does not corresponds to ${internalUser.userId}`)
   if (internalUser.userType == UserRole.USER) {return false}
    return true;
  }
}
