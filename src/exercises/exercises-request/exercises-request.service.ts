import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ExerciseRequest } from './entities/exercise-request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { ILike } from 'typeorm';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';
import { ExercisesService } from '../exercises.service';
import { CreateExerciseRequestDto } from './dto/create-exercise-request';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';
@Injectable()
export class ExercisesRequestService {
  private readonly logger = new Logger(ExercisesRequestService.name, { timestamp: true });
  constructor(
    @InjectRepository(ExerciseRequest)
    private exerciseRequestRepository: Repository<ExerciseRequest>,
    private readonly exerciseService: ExercisesService,
    private readonly userService: UsersService,
    private readonly notificationService: NotificationService
  ) { }

  async createExercise(createExerciseDto: CreateExerciseDto, userId: number) {
    const newUser: User | String = await this.userService.findOne(userId)
    if (newUser instanceof String) {
      throw new BadRequestException(newUser);
    }
    const newExerciseRequestDto: CreateExerciseRequestDto = createExerciseDto as CreateExerciseRequestDto
    newExerciseRequestDto.user = newUser;
    const newRequestExercise = this.exerciseRequestRepository.create(newExerciseRequestDto);
    const result = await this.exerciseRequestRepository.save(newRequestExercise);
    this.notificationService.createNotification({
      message: `Your exercise ${newRequestExercise.name} has been submitted for approval`,
      userId: newRequestExercise.user.userId
    })
    return result;
  }
  async getAmount() {
    return await this.exerciseRequestRepository.count();
  }
  async findAll(name: string, muscleGroup: string, secondaryMuscleGroup) {
    name = name ? name : "";
    muscleGroup = muscleGroup ? muscleGroup : "";
    secondaryMuscleGroup = secondaryMuscleGroup ? secondaryMuscleGroup : "";
    return await this.exerciseRequestRepository.find(
      {
        where: { name: ILike(`%${name}%`), primaryMuscles: ILike(`%${muscleGroup}%`), secondaryMuscles: ILike(`%${secondaryMuscleGroup}%`) },
        relations: { user: true }

      }

    )
  }

  async findOne(id: number) {
    return await this.exerciseRequestRepository.findOneOrFail(
      {
        where: {
          exerciseId: id
        },
        relations: {
          user: true
        }
      }).catch(
        () => {
          const message: String = `couldn't find exercise with id : ${id}`;
          this.logger.warn(message, this);
          throw new BadRequestException(message)
        }
      )
  }

  async updateExercise(id: number, updateExerciseDto: Partial<UpdateExerciseDto>) {
    await this.exerciseRequestRepository.update({ exerciseId: id }, updateExerciseDto)
  }

  async deleteExercise(id: number) {
    await this.exerciseRequestRepository.delete({ exerciseId: id });
  }
  async approveExercise(id: number) {
    // find one -> 
    const exerciseRequest = await this.findOne(id)
    const createdExercise = await this.exerciseService.createExercise({
      name: exerciseRequest.name,

      force: exerciseRequest.force,

      level: exerciseRequest.level,

      mechanic: exerciseRequest.mechanic,
      equipment: exerciseRequest.equipment,

      primaryMuscles: exerciseRequest.primaryMuscles,

      secondaryMuscles: exerciseRequest.secondaryMuscles,

      instructions: exerciseRequest.instructions,
      category: exerciseRequest.category
    })
    this.notificationService.createNotification({
      message: `Your exercise ${createdExercise.name} has been approved`,
      userId: exerciseRequest.user.userId
    })
    // exercise request delete
    await this.deleteExercise(id);
    return createdExercise
  }

}
