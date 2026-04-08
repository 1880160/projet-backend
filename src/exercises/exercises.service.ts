import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILike } from 'typeorm';
import { Logger } from '@nestjs/common';
@Injectable()
export class ExercisesService {
private readonly logger = new Logger(ExercisesService.name, { timestamp: true });
  constructor(
          @InjectRepository(Exercise)
          private exerciseRepository : Repository<Exercise>,
      ){}


  async createExercise(createExerciseDto: CreateExerciseDto) {
    const newExercise = this.exerciseRepository.create(createExerciseDto);
    return this.exerciseRepository.save(newExercise);
  }

  async findAll(name : string, muscleGroup : string, secondaryMuscleGroup) {
    name = name ? name : "";
    muscleGroup = muscleGroup ? muscleGroup : "";
    secondaryMuscleGroup = secondaryMuscleGroup ? secondaryMuscleGroup : "";
    return await this.exerciseRepository.findBy({name : ILike(`%${name}%`), primaryMuscles : ILike(`%${muscleGroup}%`), secondaryMuscles : ILike(`%${secondaryMuscleGroup}%`)})
  }

  async findOne(id: number) {
    return this.exerciseRepository.findOneByOrFail({exerciseId : id}).catch(
      () => {
        const message : String =  `couldn't find exercise with id : ${id}`;
        this.logger.warn(message, this);
        return message;
      }
    );
  }

  async updateExercise(id: number, updateExerciseDto: Partial<UpdateExerciseDto>) {
    this.exerciseRepository.update({exerciseId : id},updateExerciseDto)
  }

  async deleteExercise(id: number) {
    this.exerciseRepository.delete({exerciseId : id});
  }

  
}
