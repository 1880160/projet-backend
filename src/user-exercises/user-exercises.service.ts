import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';
import { UpdateUserExerciseDto } from './dto/update-user-exercise.dto';
import { User } from 'src/users/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExercise } from './entities/user-exercise.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Logger } from '@nestjs/common';
import { ILike } from 'typeorm';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { NotificationService } from 'src/notification/notification.service';
@Injectable()
export class UserExercisesService {
  private readonly logger = new Logger(UserExercisesService.name, { timestamp: true });
  constructor(
    @InjectRepository(UserExercise)
    private userExerciseRepository: Repository<UserExercise>,
    private readonly userService: UsersService,
    private readonly exerciseService: ExercisesService,
    private readonly notificationService: NotificationService
  ) { }



  async createUserExercise(userId: number, createUserExerciseDto: CreateUserExerciseDto) {

    const newUser: User | String = await this.userService.findOne(userId)
    if (newUser instanceof String) {
      throw new BadRequestException(newUser);
    }
    const relatedExercise = await this.exerciseService.findOne(createUserExerciseDto.exerciseId);
    if (relatedExercise instanceof String) {
      throw new BadRequestException(relatedExercise)
    }
    createUserExerciseDto.exercise = relatedExercise
    createUserExerciseDto.user = newUser;
    const newUserExercise = await this.userExerciseRepository.create(createUserExerciseDto)
    const result = await this.userExerciseRepository.save(newUserExercise);
    this.notificationService.createNotification({
      title : "Your Exercise has been created successfully",
      message: `The exercise ${createUserExerciseDto.name} has been created successfully`,
      userId: userId
    });
    return result;
  }

  async findAll(name: string = "", muscleGroup = "", category = "") {
    return await this.userExerciseRepository.createQueryBuilder('user-exercise')
      .leftJoinAndSelect("user-exercise.exercise", "exercise")
      .where("user-exercise.name like :name", { name: `%${name}%` })
      .andWhere("exercise.category like :category", { category: `%${category}%` })
      .andWhere("exercise.primaryMuscles like :muscleGroup or exercise.secondaryMuscles like :muscleGroup", { muscleGroup: `%${muscleGroup}%` })
      .orWhere("", { muscleGroup: `%${muscleGroup}%` })
      .getMany();

  }
  async getUserExerciseFilteredBy(userId: number, name = "", category = "", muscleGroup = "",) {
    return await this.userExerciseRepository.createQueryBuilder('user-exercise')
      .leftJoinAndSelect("user-exercise.exercise", "exercise")
      .leftJoin("user-exercise.user", "user")
      .where("user.userId = :id", { id: userId })
      .andWhere("user-exercise.name like :name", { name: `%${name}%` })
      .andWhere("exercise.category like :category", { category: `%${category}%` })
      .andWhere("(exercise.primaryMuscles like :muscleGroup or exercise.secondaryMuscles like :muscleGroup)", { muscleGroup: `%${muscleGroup}%` })
      .getMany();

  }

  async findMultiple(userId: number, ids: number[]) {
    return await this.userExerciseRepository.find({
      where: {
        user: { userId: userId },
        userExerciseId: In(ids)
      },

      relations: {
        user: true,
        exercise: true
      }
    })
  }

  async findOne(id: number) {
    return await this.userExerciseRepository.findOneOrFail({
      where:
      {
        userExerciseId: id

      },

      relations: {
        user: true,
        exercise: true
      }
    }
    ).catch(
      () => {
        const message: String = `couldn't find userExercise with id : ${id}`;
        this.logger.warn(message, this);
        return message;
      }
    );
  }

  async updateUserExercise(id: number, updateUserExerciseDto: Partial<UpdateUserExerciseDto>) {
    this.logger.log(updateUserExerciseDto);

    const relatedExercise = await this.exerciseService.findOne(updateUserExerciseDto.exerciseId ?? -1);
    if (relatedExercise instanceof String) {
      throw new BadRequestException(relatedExercise)
    }
    updateUserExerciseDto.exercise = relatedExercise
    updateUserExerciseDto.exerciseId = undefined
    const result = await this.userExerciseRepository.update({ userExerciseId: id }, updateUserExerciseDto);
    return result;
  }

  async deleteUserExercise(id: number) {
    return await this.userExerciseRepository.delete({ userExerciseId: id });
  }
}
