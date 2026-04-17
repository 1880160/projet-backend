import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserExercisesService } from './user-exercises.service';
import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';
import { UpdateUserExerciseDto } from './dto/update-user-exercise.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserParam } from 'src/users/user/user.decorator';
import { UserExerciseRouteIdValidGuard } from './guard/user-exercise.guard';
import { UserExerciseParam } from './decorators/user-exercise.param';
import { UserExercise } from './entities/user-exercise.entity';
import { AdminGuard } from 'src/users/auth/admin.guard';
import type { UserTokenLogin } from 'src/users/auth/auth.userlogin';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags("UserExercises")
@UseGuards(AuthGuard)
@Controller('user-exercises')
export class UserExercisesController {
  constructor(private readonly userExercisesService: UserExercisesService) {}
  @ApiOperation({summary : "Create a UserExercise on a user"})
  @Post("/create-user-exercise")
  async create(@Body() createUserExerciseDto: CreateUserExerciseDto, @UserParam() user : UserTokenLogin ) {
    return await this.userExercisesService.createUserExercise(user.sub, createUserExerciseDto);
  }
  @ApiOperation({summary : "Gets all the UserExercise, Only used by admins"})
  @UseGuards(AdminGuard)
  @Get()
  async findAll(@Query('name') name : string) {
    return await this.userExercisesService.findAll(name);
  }
  @ApiOperation({summary : "Gets all UserExercise of a user, filtering by name if possible"})
  @Get("/my-exercises")
  async findUserAll(@Query('name') name : string, @UserParam() user : UserTokenLogin ){
    return await this.userExercisesService.getUserExerciseFilteredBy(name, user.sub)
  }
  @ApiOperation({summary : "Gets an user's UserExercise by id"})
  @UseGuards(UserExerciseRouteIdValidGuard)
  @Get(':id')
  async findOne(@UserExerciseParam() userExercise : UserExercise ) {
    return userExercise;
  }
  @ApiOperation({summary : "Updates a user's UserExercise"})
  @UseGuards(UserExerciseRouteIdValidGuard)
  @Patch('/update-user-exercise/:id')
  async update(@Body() updateUserExerciseDto: Partial<UpdateUserExerciseDto>, @UserExerciseParam() userExercise : UserExercise) {
    return await this.userExercisesService.updateUserExercise(userExercise.userExerciseId, updateUserExerciseDto);
  }
  @ApiOperation({summary : "Deletes a user's UserExercise"})
  @UseGuards(UserExerciseRouteIdValidGuard)
  @Delete('/delete-user-exercise/:id')
  async remove(@UserExerciseParam() userExercise : UserExercise) {
    return await this.userExercisesService.deleteUserExercise(userExercise.userExerciseId);
  }
}
