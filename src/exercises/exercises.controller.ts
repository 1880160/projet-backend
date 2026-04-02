import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { AdminGuard } from 'src/users/auth/admin.guard';

@UseGuards(AuthGuard,AdminGuard)
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post("/create-exercise")
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.createExercise(createExerciseDto);
  }

  @Get()
  findAll(@Query('name') name : string, @Query('muscle_group') muscleGroup : string) {
    return this.exercisesService.findAll(name, muscleGroup);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }

  @Patch('/update-exercise/:id')
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.updateExercise(+id, updateExerciseDto);
  }

  @Delete('/delete-exercise/:id')
  remove(@Param('id') id: string) {
    return this.exercisesService.deleteExercise(+id);
  }

  

}
