import { BadRequestException, Injectable } from '@nestjs/common';
import { ExerciseRequest } from './entities/exercise-request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { ILike } from 'typeorm';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';
import { ExercisesService } from '../exercises.service';
import { Exercise } from '../entities/exercise.entity';
import { CreateExerciseRequestDto } from './dto/create-exercise-request';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user/user.entity';
@Injectable()
export class ExercisesRequestService {
    
      constructor(
              @InjectRepository(ExerciseRequest)
              private exerciseRequestRepository : Repository<ExerciseRequest>,
                private readonly userService : UsersService 
){}

      async createExercise(createExerciseDto: CreateExerciseDto, userId : number) {
        const newUser : User | String = await this.userService.findOne(userId)
        if (newUser instanceof String ){
            throw new BadRequestException(newUser);
        }
        const newExerciseRequestDto : CreateExerciseRequestDto = createExerciseDto as CreateExerciseRequestDto
        newExerciseRequestDto.user = newUser;
        const newRequestExercise = this.exerciseRequestRepository.create(newExerciseRequestDto);
        return this.exerciseRequestRepository.save(newRequestExercise);
      }
    
      async findAll(name : string, muscleGroup : string, secondaryMuscleGroup) {
        name = name ? name : "";
        muscleGroup = muscleGroup ? muscleGroup : "";
        secondaryMuscleGroup = secondaryMuscleGroup ? secondaryMuscleGroup : "";
        return await this.exerciseRequestRepository.findBy({name : ILike(`%${name}%`), primaryMuscles : ILike(`%${muscleGroup}%`), secondaryMuscles : ILike(`%${secondaryMuscleGroup}%`)})
      }
    
      async findOne(id: number) {
        return this.exerciseRequestRepository.findOneBy({exerciseId : id})
      }
    
      async updateExercise(id: number, updateExerciseDto: Partial<UpdateExerciseDto>) {
        this.exerciseRequestRepository.update({exerciseId : id},updateExerciseDto)
      }
    
      async deleteExercise(id: number) {
        this.exerciseRequestRepository.delete({exerciseId : id});
      }
}
