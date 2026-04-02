import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ExercisesService {

  constructor(
          @InjectRepository(Exercise)
          private exerciseRepository : Repository<Exercise>,
      ){}


  createExercise(createExerciseDto: CreateExerciseDto) {
    return 'This action adds a new exercise';
  }

  findAll(name : string, muscleGroup : string) {
    return this.exerciseRepository.createQueryBuilder()
    .select()
    .from(Exercise,"exercise")
    .where("exercise.name = %:exerciseName%")
    .orWhere("Exercise.primaryMuscles = %:muscleGroup%")
    .setParameters({
      "exerciseName" : name,
      "muscleGroup" : muscleGroup
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }
  getAllExerciseFilteredBy(){

  }

  updateExercise(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  deleteExercise(id: number) {
    return `This action removes a #${id} exercise`;
  }

  
}
