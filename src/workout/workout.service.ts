import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/user/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { ILike, Repository } from 'typeorm';
import { UserExercisesService } from 'src/user-exercises/user-exercises.service';
import { UserExercise } from 'src/user-exercises/entities/user-exercise.entity';
import { Logger } from '@nestjs/common';
@Injectable()
export class WorkoutService {
  private readonly logger = new Logger(WorkoutService.name, { timestamp: true });
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
    private readonly userService: UsersService,
    private readonly userExerciseService: UserExercisesService
  ) { }

  async createWorkout(userId: number, createWorkoutDto: CreateWorkoutDto) {
    const newUser: User | String = await this.userService.findOne(userId)
    if (newUser instanceof String) {
      throw new BadRequestException(newUser);
    }
    createWorkoutDto.user = newUser;
    for (const userExerciseId of createWorkoutDto.userExercisesId) {
      const userExercise: String | UserExercise = await this.userExerciseService.findOne(userExerciseId)
      if ((userExercise instanceof UserExercise)) {
        createWorkoutDto.userExercises = [...createWorkoutDto.userExercises, userExercise];      }
    }
    const newWorkout = this.workoutRepository.create(createWorkoutDto);
    return this.workoutRepository.save(newWorkout);
  }

  async findAll() {
    return this.workoutRepository.find({
      relations: {
        userExercises: true
      }
    });
  }
  async getAllUserWorkoutFilteredBy(name : string, userId : number) {
    return this.workoutRepository.find({
      relations: {
        userExercises: {exercise : true},
      },
      where :
      {
        workoutName : ILike(`%${name}%`),
        user : {userId : userId}
      }
      
    });
  }

  async findOne(id: number) {
    return this.workoutRepository.findOne({ where: { workoutId: id }, relations: {user : true} }).catch(
      () => {
        const message : String =  `couldn't find workout with id : ${id}`;
        this.logger.warn(message, this);
        return message;
      }
    );
  }

  async updateWorkout(workout : Workout, updateWorkoutDto: Partial<UpdateWorkoutDto>) {
    
    if (updateWorkoutDto.userExercisesId){
      updateWorkoutDto.userExercises = []
      for (const userExerciseId of updateWorkoutDto.userExercisesId){
        const userExercise: String | UserExercise = await this.userExerciseService.findOne(userExerciseId)
        if ((userExercise instanceof UserExercise)) {
           updateWorkoutDto.userExercises.push(userExercise);
        }
      }
    }
    const newWorkout = await this.workoutRepository.merge(workout,updateWorkoutDto)
    return await this.workoutRepository.save(newWorkout);
  }
  async deleteWorkout(id: number) {
    return await this.workoutRepository.delete({workoutId : id})
  }
}
