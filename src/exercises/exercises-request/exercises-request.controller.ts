import { Controller, Post, Body, BadRequestException,Param, Query, Get,Patch, Delete } from '@nestjs/common';
import { ExercisesRequestService } from './exercises-request.service';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { UserParam } from 'src/users/user/user.decorator';
import { User } from 'src/users/user/user.entity';
@UseGuards(AuthGuard)
@Controller('exercises-request')
export class ExercisesRequestController {
  constructor(private readonly exercisesRequestService: ExercisesRequestService) {}
  
    @Post("/create-exercise")
    async create(@Body() createExerciseDto: CreateExerciseDto, @UserParam() user ) {
      return await this.exercisesRequestService.createExercise(createExerciseDto, user.sub).catch(() => {
        throw new BadRequestException('name is already taken')
    }
      );
    }
  
    @Get()
    async findAll(@Query('name') name : string, @Query('muscle_group') muscleGroup : string, @Query('secondary_muscle_group') secondaryMuscleGroup : string) {
      return await this.exercisesRequestService.findAll(name, muscleGroup, secondaryMuscleGroup);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.exercisesRequestService.findOne(+id);
    }
  
    @Patch('/update-exercise/:id')
    async update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
      return await this.exercisesRequestService.updateExercise(+id, updateExerciseDto);
    }
  
    @Delete('/delete-exercise/:id')
    async remove(@Param('id') id: string) {
      return await this.exercisesRequestService.deleteExercise(+id);
    }
}
