import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserExercisesService } from './user-exercises.service';
import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';
import { UpdateUserExerciseDto } from './dto/update-user-exercise.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserParam } from 'src/users/user/user.decorator';
import { UserExerciseGuard } from './guard/user-exercise.guard';
import { UserExerciseParam } from './decorators/user-exercise.param';
import { UserExercise } from './entities/user-exercise.entity';
import { AdminGuard } from 'src/users/auth/admin.guard';

@UseGuards(AuthGuard)
@Controller('user-exercises')
export class UserExercisesController {
  constructor(private readonly userExercisesService: UserExercisesService) {}

  @Post("/create-user-exercise")
  async create(@Body() createUserExerciseDto: CreateUserExerciseDto, @UserParam() user  ) {
    return await this.userExercisesService.createUserExercise(user.sub, createUserExerciseDto);
  }
  @UseGuards(AdminGuard)
  @Get()
  async findAll(@Query('name') name : string) {
    return await this.userExercisesService.findAll(name);
  }

  @Get("/my-exercises")
  async findUserAll(@Query('name') name : string, @UserParam() user ){
    return await this.userExercisesService.getUserExerciseFilteredBy(name, user.sub)
  }

  @UseGuards(UserExerciseGuard)
  @Get(':id')
  async findOne(@UserExerciseParam() userExercise : UserExercise ) {
    return userExercise;
  }
  @UseGuards(UserExerciseGuard)
  @Patch('/update-user-exercise/:id')
  async update(@Body() updateUserExerciseDto: Partial<UpdateUserExerciseDto>, @UserExerciseParam() userExercise : UserExercise) {
    return await this.userExercisesService.updateUserExercise(userExercise.userExerciseId, updateUserExerciseDto);
  }
  @UseGuards(UserExerciseGuard)
  @Delete('/delete-user-exercise/:id')
  async remove(@UserExerciseParam() userExercise : UserExercise) {
    return await this.userExercisesService.deleteUserExercise(userExercise.userExerciseId);
  }
}
