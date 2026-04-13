import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { UserParam } from 'src/users/user/user.decorator';
import type { UserTokenLogin } from 'src/users/auth/auth.userlogin';
import { AdminGuard } from 'src/users/auth/admin.guard';
import { WorkoutRouteIdValidGuard } from './guard/workout.guard';
import { WorkoutParam } from './decorator/workout.param';
import { Workout } from './entities/workout.entity';
@UseGuards(AuthGuard)
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post("/create-workout")
  async create(@Body() createWorkoutDto: CreateWorkoutDto, @UserParam() user : UserTokenLogin) {
    return this.workoutService.createWorkout(user.sub, createWorkoutDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  async findAll() {
    return await this.workoutService.findAll();
  }

  //@Query('name') name : string, @UserParam() user : UserTokenLogin
  
  @Get("/my-workouts")
  async findAllUser(@Query('name') name : string, @UserParam() user : UserTokenLogin){
  return await this.workoutService.getAllUserWorkoutFilteredBy(name,user.sub);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workoutService.findOne(+id);
  }
  @UseGuards(WorkoutRouteIdValidGuard)
  @Patch('/update-workout/:id')
  async update( @WorkoutParam( ) workout : Workout, @Body() updateWorkoutDto: Partial<UpdateWorkoutDto>) {
    return await this.workoutService.updateWorkout(workout, updateWorkoutDto);
  }

  @UseGuards(WorkoutRouteIdValidGuard)
  @Delete('/delete-workout/:id')
  async remove(@Param('id') id: string) {
    return await this.workoutService.deleteWorkout(+id);
  }
}
