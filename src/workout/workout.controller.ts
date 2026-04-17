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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags("Workout")
@UseGuards(AuthGuard)
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}
  @ApiOperation({summary : "Creates a new workout to user's account"})
  @Post("/create-workout")
  async create(@Body() createWorkoutDto: CreateWorkoutDto, @UserParam() user : UserTokenLogin) {
    return this.workoutService.createWorkout(user.sub, createWorkoutDto);
  }
  @ApiOperation({summary : "Gets all the workout, only used by admin"})
  @UseGuards(AdminGuard)
  @Get()
  async findAll() {
    return await this.workoutService.findAll();
  }

  
  @ApiOperation({summary : "Get the user's workouts, filtering by name"})
  @Get("/my-workouts")
  async findAllUser(@Query('name') name : string, @UserParam() user : UserTokenLogin){
  return await this.workoutService.getAllUserWorkoutFilteredBy(name,user.sub);
  }
  @ApiOperation({summary : "Get the workout by id, only used by admin"})
  @UseGuards(AdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workoutService.findOne(+id);
  }
  @ApiOperation({summary : "Updates a workout with the corresponding id from the user's account"})
  @UseGuards(WorkoutRouteIdValidGuard)
  @Patch('/update-workout/:id')
  async update( @WorkoutParam( ) workout : Workout, @Body() updateWorkoutDto: Partial<UpdateWorkoutDto>) {
    return await this.workoutService.updateWorkout(workout, updateWorkoutDto);
  }
  @ApiOperation({summary : "Deletes a workout with the corresponding id from the user's account"})
  @UseGuards(WorkoutRouteIdValidGuard)
  @Delete('/delete-workout/:id')
  async remove(@Param('id') id: string) {
    return await this.workoutService.deleteWorkout(+id);
  }
}
