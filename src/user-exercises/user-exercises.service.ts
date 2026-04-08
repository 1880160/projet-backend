import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';
import { UpdateUserExerciseDto } from './dto/update-user-exercise.dto';
import { User } from 'src/users/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExercise } from './entities/user-exercise.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Logger } from '@nestjs/common';
import { ILike } from 'typeorm';
@Injectable()
export class UserExercisesService {
  private readonly logger = new Logger(UserExercisesService.name, { timestamp: true });
      constructor(
              @InjectRepository(UserExercise)
              private userExerciseRepository : Repository<UserExercise>,
              private readonly userService : UsersService,
              private readonly exerciseService : ExercisesService
){}

  

  async createUserExercise(userId : number, createUserExerciseDto: CreateUserExerciseDto) {
        
        const newUser : User | String = await this.userService.findOne(userId)
        if (newUser instanceof String ){
            throw new BadRequestException(newUser);
        }
        const relatedExercise = await this.exerciseService.findOne(createUserExerciseDto.exerciseId);
        if (relatedExercise instanceof String){
          throw new BadRequestException(relatedExercise)
        }
        createUserExerciseDto.exercise = relatedExercise
        createUserExerciseDto.user = newUser;
        const newUserExercise = await this.userExerciseRepository.create(createUserExerciseDto)
        return await this.userExerciseRepository.save(newUserExercise);
  }

  async findAll(name : string) {
    name = name ? name : "";
    return await this.userExerciseRepository.findBy({name : ILike(`%${name}%`)})
  
  }
  async getUserExerciseFilteredBy(name : string, userId : number)
  {
    name = name ? name : "";
    return await this.userExerciseRepository.findBy({user : {userId : userId}, name: ILike(`%${name}%`)})
  }



  async findOne(id: number) {
    return await this.userExerciseRepository.findOneByOrFail({userExerciseId : id}).catch(
      () => {
        const message : String =  `couldn't find userExercise with id : ${id}`;
        this.logger.warn(message, this);
        return message;
      }
    );
  }

  async updateUserExercise(id: number, updateUserExerciseDto: Partial<UpdateUserExerciseDto>) {
    this.logger.log(updateUserExerciseDto);
    return await this.userExerciseRepository.update({userExerciseId : id},updateUserExerciseDto);
  }

  async deleteUserExercise(id: number) {
    return await this.userExerciseRepository.delete({userExerciseId : id});
  }
}
